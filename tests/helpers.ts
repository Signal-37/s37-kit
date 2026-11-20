// Shared test fixtures: the repository root, its files, and stand-in agent commands.
import { spawnSync } from "node:child_process";
import { mkdtempSync, readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

export const ROOT = join(import.meta.dir, "..");
export const INSTALL = join(ROOT, "install.sh");
export const read = (p: string) => readFileSync(join(ROOT, p), "utf8");
export const json = (p: string) => JSON.parse(read(p));
export const VERSION = read("VERSION").trim();
export const has = (cmd: string) => spawnSync("sh", ["-c", `command -v ${cmd}`]).status === 0;
export const tmp = (prefix: string) => mkdtempSync(join(tmpdir(), prefix));

// The checks, discovered from skills/ rather than listed.
export const skills = () => readdirSync(join(ROOT, "skills")).filter((d) => statSync(join(ROOT, "skills", d)).isDirectory()).sort();

// The YAML frontmatter of a Markdown file, as text (between the first two `---` lines).
export function frontmatter(md: string): string {
  const m = /^---\n([\s\S]*?)\n---\n/.exec(md);
  if (!m) throw new Error("no frontmatter");
  return m[1];
}

// A system PATH with no agent on it, for runs that must see only stand-ins.
export const SYSTEM_PATH = "/usr/bin:/bin";

export function stub(dir: string, name: string, body: string) {
  writeFileSync(join(dir, name), `#!/bin/sh\n${body}\n`, { mode: 0o755 });
}

// A stand-in Gemini CLI. It installs by copying the folder it is given into
// $HOME/.gemini/extensions/<name>, and keeps a copy of that folder in $CAPTURE when set. Its
// listing always claims s37-kit is installed, with a leading glyph, the way the real listing's
// format once misled an installer that read it.
export const GEMINI_STUB = `case "$1 $2" in
  "extensions install")
    name=$(sed -n 's/.*"name": *"\\([^"]*\\)".*/\\1/p' "$3/gemini-extension.json" | head -1)
    mkdir -p "$HOME/.gemini/extensions" && rm -rf "$HOME/.gemini/extensions/$name" && cp -R "$3" "$HOME/.gemini/extensions/$name"
    if [ -n "\${CAPTURE:-}" ]; then rm -rf "$CAPTURE/staged"; cp -R "$3" "$CAPTURE/staged"; fi ;;
  "extensions uninstall") rm -rf "$HOME/.gemini/extensions/$3" ;;
  "extensions list") echo "✓ s37-kit (0.1.0)" ;;
esac
exit 0`;

export function run(cmd: string, args: string[], env: Record<string, string | undefined>, input = "") {
  return spawnSync(cmd, args, { env, input, encoding: "utf8", timeout: 240_000 });
}
