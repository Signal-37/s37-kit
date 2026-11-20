// The installer. Two parts:
// 1. Its own behaviour, against stand-in agent commands, so every runner tests it: it carries on
//    past a failed agent, summarises, exits non-zero if any agent failed, exits 0 when no agent is
//    found, and never overwrites a Kimi skill of the user's own.
// 2. Install, update and uninstall through the real agent CLIs, into throwaway config folders
//    (CLAUDE_CONFIG_DIR, CODEX_HOME, HOME, KIMI_CODE_HOME), so the user's own agent settings are
//    never touched. Skipped only when Claude Code isn't installed; CI installs it and fails if
//    these tests were skipped.
import { beforeAll, describe, expect, test } from "bun:test";
import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { frontmatter, GEMINI_STUB, has, INSTALL, run, skills, stub, SYSTEM_PATH, tmp } from "./helpers";

const POINTER = "The S37 Learning Loop: https://github.com/Signal-37/s37-learning-loop";
const lastLine = (s: string) => s.trimEnd().split("\n").pop();

// Kimi Code reads skills from <KIMI_CODE_HOME>/skills. A skill of the user's own is planted first.
function kimiHome() {
  const k = tmp("kitkimi-");
  mkdirSync(join(k, "skills", "my-own-skill"), { recursive: true });
  writeFileSync(join(k, "skills", "my-own-skill", "SKILL.md"), "mine\n");
  return k;
}

describe("installer behaviour (stand-in agents)", () => {
  test("no agent found: nothing changes, exit 0, and the message says so", () => {
    const bin = tmp("kitbin-"), home = tmp("kithome-");
    expect(run("sh", ["-c", "command -v claude || command -v codex || command -v gemini || command -v kimi"], { PATH: SYSTEM_PATH }).status).not.toBe(0);
    const r = run("sh", [INSTALL], { PATH: `${bin}:${SYSTEM_PATH}`, HOME: home });
    expect(r.status).toBe(0);
    expect(r.stdout).toContain("No supported agent found");
    expect(r.stdout).toContain("Nothing was changed.");
    expect(lastLine(r.stdout)).toBe(POINTER);
    expect(readdirSync(home)).toEqual([]);
  });

  test("a failed agent doesn't stop the others; the summary names each; the exit is non-zero", () => {
    const bin = tmp("kitbin-"), home = tmp("kithome-"), kimi = kimiHome();
    stub(bin, "claude", "exit 1");
    stub(bin, "kimi", "exit 0");
    const r = run("sh", [INSTALL], { PATH: `${bin}:${SYSTEM_PATH}`, HOME: home, KIMI_CODE_HOME: kimi });
    expect(r.status).toBe(1);
    expect(r.stdout).toContain("Claude Code: FAILED");
    expect(r.stdout).toContain("Codex: not found");
    expect(r.stdout).toContain("Gemini CLI: not found");
    expect(r.stdout).toContain("Kimi Code: installed");
    expect(r.stderr).toContain("Claude Code: couldn't add the marketplace");
    expect(readdirSync(join(kimi, "skills")).sort()).toEqual([...skills(), "my-own-skill"].sort());
    expect(lastLine(r.stdout)).toBe(POINTER);
  });

  test("Kimi: a same-named skill of the user's own is never overwritten, and the other agents still install", () => {
    const bin = tmp("kitbin-"), home = tmp("kithome-"), kimi = kimiHome();
    stub(bin, "kimi", "exit 0");
    stub(bin, "gemini", GEMINI_STUB);
    mkdirSync(join(kimi, "skills", "claim-to-source"));
    writeFileSync(join(kimi, "skills", "claim-to-source", "SKILL.md"), "the user's own\n");
    const r = run("sh", [INSTALL, "--yes"], { PATH: `${bin}:${SYSTEM_PATH}`, HOME: home, KIMI_CODE_HOME: kimi });
    expect(r.status).toBe(1);
    expect(r.stderr).toContain("already have a skill named claim-to-source");
    expect(r.stdout).toContain("Kimi Code: FAILED");
    expect(r.stdout).toContain("Gemini CLI: installed");
    expect(readFileSync(join(kimi, "skills", "claim-to-source", "SKILL.md"), "utf8")).toBe("the user's own\n");
    expect(readdirSync(join(kimi, "skills")).sort()).toEqual(["claim-to-source", "my-own-skill"]);
  });

  test("Kimi uninstall removes only the folders the installer put there", () => {
    const bin = tmp("kitbin-"), home = tmp("kithome-"), kimi = kimiHome();
    stub(bin, "kimi", "exit 0");
    const env = { PATH: `${bin}:${SYSTEM_PATH}`, HOME: home, KIMI_CODE_HOME: kimi };
    expect(run("sh", [INSTALL], env).status).toBe(0);
    expect(run("sh", [INSTALL], env).stdout).toContain("Kimi Code: updated");
    const r = run("sh", [INSTALL, "--uninstall"], env);
    expect(r.status).toBe(0);
    expect(r.stdout).toContain(`Kimi Code: removed (${skills().length} checks)`);
    expect(readdirSync(join(kimi, "skills"))).toEqual(["my-own-skill"]);
    expect(readFileSync(join(kimi, "skills", "my-own-skill", "SKILL.md"), "utf8")).toBe("mine\n");
  });

  test("an unknown option is refused before anything runs", () => {
    const r = run("sh", [INSTALL, "--kit-only"], { PATH: SYSTEM_PATH, HOME: tmp("kithome-") });
    expect(r.status).toBe(2);
    expect(r.stderr).toContain("unknown option: --kit-only");
  });
});

const hasClaude = has("claude");
const hasCodex = has("codex");
const hasGemini = has("gemini");

describe.skipIf(!hasClaude)("install, update, uninstall (real agent CLIs)", () => {
  const config = tmp("kitcfg-"), codexHome = tmp("kitcodex-"), home = tmp("kithome-"), kimi = kimiHome(), bin = tmp("kitbin-");
  // Kimi is a stand-in on every runner: the installer only needs `kimi` to exist, then copies files.
  stub(bin, "kimi", "exit 0");
  const env = { ...process.env, PATH: `${bin}:${process.env.PATH}`, CLAUDE_CONFIG_DIR: config, CODEX_HOME: codexHome, HOME: home, KIMI_CODE_HOME: kimi };
  const install = (...args: string[]) => run("sh", [INSTALL, "--yes", ...args], env);
  const claudePlugins = () => JSON.parse(run("claude", ["plugin", "list", "--json"], env).stdout || "[]") as { id: string; installPath: string }[];
  const codexPlugins = () => hasCodex ? (JSON.parse(run("codex", ["plugin", "list", "--json"], env).stdout || "{}").installed ?? []).map((p: { pluginId: string }) => p.pluginId) : [];
  const geminiExtensions = () => existsSync(join(home, ".gemini", "extensions")) ? readdirSync(join(home, ".gemini", "extensions")).filter((f) => f.startsWith("s37-")) : [];
  let first: ReturnType<typeof install>;

  beforeAll(() => {
    first = install();
    if (first.status !== 0) throw new Error(`install failed: ${first.stderr}${first.stdout}`);
  }, 240_000);

  test("the Verification Kit is installed from this clone in every agent present, as s37-kit", () => {
    expect(claudePlugins().map((p) => p.id)).toEqual(["s37-kit@s37-verification-kit"]);
    if (hasCodex) expect(codexPlugins()).toEqual(["s37-kit@s37-verification-kit"]);
    if (hasGemini) expect(geminiExtensions()).toEqual(["s37-kit"]);
    expect(readdirSync(join(kimi, "skills")).sort()).toEqual([...skills(), "my-own-skill"].sort());
    for (const agent of ["Claude Code", "Kimi Code", ...(hasCodex ? ["Codex"] : []), ...(hasGemini ? ["Gemini CLI"] : [])]) {
      expect(first.stdout).toContain(`${agent}: installed`);
    }
    expect(lastLine(first.stdout)).toBe(POINTER);
  });

  test("the installed copy holds the six checks, each stating its licence", () => {
    const dir = claudePlugins()[0].installPath;
    expect(readdirSync(join(dir, "skills")).sort()).toEqual(skills());
    for (const s of skills()) expect(frontmatter(readFileSync(join(dir, "skills", s, "SKILL.md"), "utf8"))).toContain("license: CC-BY-SA-4.0. See LICENSING.md.");
  });

  test("running the installer again updates in place", () => {
    const r = install();
    expect(r.status).toBe(0);
    expect(r.stdout).toContain("Claude Code: updated");
    if (hasCodex) expect(r.stdout).toContain("Codex: updated");
    if (hasGemini) expect(r.stdout).toContain("Gemini CLI: updated");
    expect(r.stdout).toContain("Kimi Code: updated");
    expect(claudePlugins().length).toBe(1);
  }, 240_000);

  test("uninstall removes the plugin and the catalogue from every agent and keeps the user's own Kimi skill", () => {
    const r = install("--uninstall");
    if (r.status !== 0 || typeof r.stdout !== "string") throw new Error(`uninstall: ${JSON.stringify({ status: r.status, signal: r.signal, stdout: r.stdout, stderr: r.stderr })}`);
    expect(claudePlugins()).toEqual([]);
    expect(run("claude", ["plugin", "marketplace", "list", "--json"], env).stdout).not.toContain("s37-verification-kit");
    const settings = join(config, "settings.json");
    if (existsSync(settings)) expect(readFileSync(settings, "utf8")).not.toMatch(/s37/);
    expect(codexPlugins()).toEqual([]);
    if (hasCodex) expect(run("codex", ["plugin", "marketplace", "list", "--json"], env).stdout).not.toContain("s37-verification-kit");
    expect(geminiExtensions()).toEqual([]);
    expect(readdirSync(join(kimi, "skills"))).toEqual(["my-own-skill"]);
  }, 240_000);
});
