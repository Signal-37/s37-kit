// Gemini CLI. Gemini installs an extension by copying a folder whose root holds
// gemini-extension.json. The installer hands it a folder with only the extension in it, and reads
// whether the Verification Kit is installed from Gemini's documented extensions folder, never from its
// human-readable listing (whose leading glyph once broke a pattern match: S37 Learning Loop
// d572e01). These run against a stand-in `gemini`, so every runner tests them.
import { beforeAll, describe, expect, test } from "bun:test";
import { copyFileSync, existsSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { GEMINI_STUB, INSTALL, json, ROOT, run, skills, stub, SYSTEM_PATH, tmp, VERSION } from "./helpers";

describe("the Gemini extension", () => {
  test("gemini-extension.json names s37-kit at the plugin version", () => {
    const g = json("gemini-extension.json");
    expect([g.name, g.version]).toEqual(["s37-kit", VERSION]);
    expect(g.version).toBe(json(".claude-plugin/plugin.json").version);
  });
});

describe("the installer's Gemini leg", () => {
  const bin = tmp("kitgem-bin-"), home = tmp("kitgem-home-"), capture = tmp("kitgem-cap-");
  stub(bin, "gemini", GEMINI_STUB);
  const env = { PATH: `${bin}:${SYSTEM_PATH}`, HOME: home, CAPTURE: capture };
  const install = (...args: string[]) => run("sh", [INSTALL, "--yes", ...args], env);
  const installed = join(home, ".gemini", "extensions", "s37-kit");
  let first: ReturnType<typeof install>;
  beforeAll(() => { first = install(); });

  test("hands Gemini a folder holding the extension, the six checks and the terms, and nothing else", () => {
    expect(first.status).toBe(0);
    const staged = join(capture, "staged");
    expect(readdirSync(staged).sort()).toEqual(["LICENSE", "LICENSING.md", "NOTICE", "gemini-extension.json", "skills"]);
    expect(readdirSync(join(staged, "skills")).sort()).toEqual(skills());
    expect(readdirSync(join(installed, "skills")).sort()).toEqual(skills());
  });

  test("a first install says installed, though the listing already claims s37-kit", () => {
    expect(first.stdout).toContain("Gemini CLI: installed");
  });

  test("a second run says updated", () => {
    const r = install();
    expect(r.status).toBe(0);
    expect(r.stdout).toContain("Gemini CLI: updated");
  });

  test("uninstall removes the extension folder", () => {
    const r = install("--uninstall");
    expect(r.status).toBe(0);
    expect(r.stdout).toContain("Gemini CLI: removed");
    expect(existsSync(installed)).toBe(false);
    expect(install("--uninstall").stdout).toContain("Gemini CLI: nothing to remove");
  });

  test("run from outside a clone, Gemini is skipped, not failed", () => {
    const elsewhere = tmp("kitgem-copy-");
    const copy = join(elsewhere, "install.sh");
    copyFileSync(INSTALL, copy);
    const r = run("sh", [copy, "--yes"], env);
    expect(r.stdout).toMatch(/Gemini CLI: skipped: run this script from a clone/);
    expect(existsSync(installed)).toBe(false);
    expect(r.status).toBe(0);
  });
});

// The repository root is itself a Gemini extension folder, so its files must be at the root.
test("the extension's files sit at the repository root", () => {
  for (const f of ["gemini-extension.json", "LICENSE", "LICENSING.md", "NOTICE", "skills"]) expect(existsSync(join(ROOT, f))).toBe(true);
});
