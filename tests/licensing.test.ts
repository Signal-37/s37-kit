// Licensing. Class: an installable unit that ships without its licence terms, or with terms that
// contradict the licence map. A check copied out on its own still states its terms, and every
// top-level path is covered by the map in LICENSING.md.
import { describe, expect, test } from "bun:test";
import { createHash } from "node:crypto";
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { frontmatter, json, read, ROOT, skills } from "./helpers";

const sha = (p: string) => createHash("sha256").update(readFileSync(join(ROOT, p))).digest("hex");

// The official texts (creativecommons.org legalcode.txt and apache.org, fetched 2026-09-25).
const OFFICIAL = {
  "CC-BY-SA-4.0": "28a9529c7d0bb4dc51f4bf5c116a3d16ef247a052f7591466768ddf563fd1cf5",
  "Apache-2.0": "cfc7749b96f63bd31c3c42b5c471bf756814053e847c10f3eb003417bc523d30",
};
const LICENSE_LINE = "license: CC-BY-SA-4.0. See LICENSING.md.";

const CODE = /\.(sh|ts|js|ya?ml)$/;
const hasCode = (p: string): boolean => statSync(p).isDirectory()
  ? readdirSync(p).some((f) => hasCode(join(p, f)))
  : CODE.test(p);
// Top-level entries, discovered. Version control and installed dependencies are not shipped.
const entries = readdirSync(ROOT).filter((f) => ![".git", "node_modules", ".DS_Store"].includes(f));

describe("licence texts are the official ones", () => {
  test("LICENSE is CC BY-SA 4.0 and LICENSE-CODE is Apache-2.0", () => {
    expect(sha("LICENSE")).toBe(OFFICIAL["CC-BY-SA-4.0"]);
    expect(sha("LICENSE-CODE")).toBe(OFFICIAL["Apache-2.0"]);
  });
});

describe("every installable unit states its terms", () => {
  test("every check carries the licence line in its frontmatter, once", () => {
    for (const s of skills()) {
      const head = frontmatter(read(`skills/${s}/SKILL.md`));
      expect(`${s}: ${head.split("\n").filter((l) => l.startsWith("license:")).join("|")}`).toBe(`${s}: ${LICENSE_LINE}`);
    }
  });

  test("the plugin files for each agent name the content licence and the author", () => {
    for (const f of [".claude-plugin/plugin.json", ".codex-plugin/plugin.json"]) {
      const p = json(f);
      expect(`${f}: ${p.license}`).toBe(`${f}: CC-BY-SA-4.0`);
      expect(p.author).toEqual({ name: "Joshua Shane" });
    }
  });

  test("the files the installer copies into each agent include the terms", () => {
    for (const f of ["LICENSE", "LICENSING.md", "NOTICE"]) expect(existsSync(join(ROOT, f))).toBe(true);
  });
});

describe("the map and the holder", () => {
  test("LICENSING.md names the licence of every top-level path that holds code", () => {
    const map = read("LICENSING.md");
    const code = entries.filter((e) => hasCode(join(ROOT, e))).map((e) => statSync(join(ROOT, e)).isDirectory() ? `${e}/` : e);
    expect(code).toContain("install.sh");
    expect(code).toContain("tests/");
    for (const path of code) expect(`${path}: ${map.includes(`\`${path}\``)}`).toBe(`${path}: true`);
    expect(map).toContain("Apache-2.0");
    expect(map).toContain("`LICENSE-CODE`");
  });

  test("no licensing file names MIT or a company as the holder", () => {
    for (const f of ["LICENSING.md", "NOTICE"]) {
      const text = read(f);
      expect(`${f}: ${/\|\s*MIT\s*\||\bunder MIT\b/.test(text)}`).toBe(`${f}: false`);
      expect(`${f}: ${/Copyright \(c\) 2026 [^\n]*Signal 37/.test(text)}`).toBe(`${f}: false`);
      expect(text).toContain("Joshua Shane");
    }
  });
});
