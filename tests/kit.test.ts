// The Verification Kit as published: the zero-install URLs resolve to files in this repository, every check
// can be routed on, and every agent's plugin file names the same plugin at the same version.
import { describe, expect, test } from "bun:test";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { frontmatter, json, read, ROOT, skills, VERSION } from "./helpers";

describe("zero-install path", () => {
  test("every raw URL points at this repository's main branch, and each one resolves to a file here", () => {
    const text = read("manifest.md");
    const base = "https://raw.githubusercontent.com/Signal-37/s37-kit/main/";
    const urls = [...text.matchAll(/https:\/\/raw\.githubusercontent\.com\/[^\s`)]+/g)].map((m) => m[0]);
    expect(urls.length).toBeGreaterThan(6);
    for (const u of urls) {
      expect(`${u}: ${u.startsWith(base)}`).toBe(`${u}: true`);
      const path = u.slice(base.length);
      if (path && !path.endsWith("/")) expect(`${path}: ${existsSync(join(ROOT, path))}`).toBe(`${path}: true`);
    }
  });

  test("every check is listed with its raw URL", () => {
    const text = read("manifest.md");
    for (const s of skills()) expect(text).toContain(`/main/skills/${s}/SKILL.md`);
  });
});

describe("the checks", () => {
  test("six checks, each with a name equal to its folder and a description an agent can route on", () => {
    expect(skills().length).toBe(6);
    for (const s of skills()) {
      const head = frontmatter(read(`skills/${s}/SKILL.md`));
      expect(head).toMatch(new RegExp(`^name: ${s}$`, "m"));
      expect(head).toMatch(/^description: .{40,}/m);
    }
  });
});

describe("one plugin, the same in every agent", () => {
  test("Claude Code, Codex and Gemini CLI name s37-kit at the version in VERSION", () => {
    expect(VERSION).toMatch(/^\d+\.\d+\.\d+$/);
    for (const f of [".claude-plugin/plugin.json", ".codex-plugin/plugin.json", "gemini-extension.json"]) {
      const p = json(f);
      expect(`${f}: ${p.name} ${p.version}`).toBe(`${f}: s37-kit ${VERSION}`);
    }
  });

  test("the Claude Code and Codex catalogues are s37-verification-kit, listing the plugin at the repository root", () => {
    const claude = json(".claude-plugin/marketplace.json");
    expect(claude.name).toBe("s37-verification-kit");
    expect(claude.plugins.map((p: { name: string; source: string }) => [p.name, p.source])).toEqual([["s37-kit", "./"]]);
    const codex = json(".agents/plugins/marketplace.json");
    expect(codex.name).toBe("s37-verification-kit");
    expect(codex.plugins.map((p: { name: string; source: { path: string } }) => [p.name, p.source.path])).toEqual([["s37-kit", "./"]]);
  });

  test("Codex reads the same skills folder", () => {
    expect(json(".codex-plugin/plugin.json").skills).toBe("./skills/");
  });

  test("the newest version in the changelog is the plugin version", () => {
    const heading = read("CHANGELOG.md").split("\n").find((l) => /^#{2,4} .*\d+\.\d+\.\d+/.test(l));
    expect(heading).toContain(VERSION);
  });

  test("the tree says it is generated", () => {
    expect(read(".generated")).toContain("DO NOT HAND-EDIT");
  });
});
