#!/usr/bin/env bun
// Generate TEST-REPORT.md from the repository itself: the CI results for this commit on Linux and
// macOS (pass, skip and fail counts), every skip condition in the tests and its reason, and what
// each test file covers. Never written by hand: the report carries a hash of its own body, and
// `--check` fails if the body was edited or the report describes another tree.
//
// It does not list defects that testing caught. This repository is generated from a master copy
// whose history has no record linking each fix to the test that guards it, so there is nothing
// reliable to list, and the report says so.
//
//   bun scripts/test-report.ts                write TEST-REPORT.md (reads CI through `gh`)
//   bun scripts/test-report.ts --out <file>   write the report somewhere else
//   bun scripts/test-report.ts --dry-run      print the report without CI results; writes nothing
//   bun scripts/test-report.ts --check        exit 1 if TEST-REPORT.md is stale or hand-edited
//
// Release order: commit the code, let CI pass on it, then generate the report and commit it alone.
// The tree hash leaves out the report itself, so the report describes exactly the commit CI tested.

import { spawnSync } from "node:child_process";
import { createHash } from "node:crypto";
import { existsSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ROOT = join(import.meta.dir, "..");
const REPORT = join(ROOT, "TEST-REPORT.md");
const sh = (cmd: string, args: string[]) => spawnSync(cmd, args, { cwd: ROOT, encoding: "utf8", maxBuffer: 64 << 20 });
const sha = (s: string) => createHash("sha256").update(s).digest("hex");
export const NO_CI = "**No successful CI run for this commit.** A release needs one; run `--check` to confirm.";
export const DRY_RUN = "**Dry run: CI results were not read.** This text is never a release report.";

// Every skip condition in the tests, and why it's legitimate. An unknown condition fails the
// report, so a new skip can't appear without a stated reason.
export const SKIP_REASONS: Record<string, string> = {
  "!hasClaude": "the real install lifecycle needs Claude Code installed; CI installs it, with Codex and Gemini CLI, and fails if these tests were skipped",
};

// The tree the report describes: every tracked file except the report itself, by content.
export function treeHash(): string {
  const files = sh("git", ["ls-files", "-s"]).stdout.split("\n").filter((l) => l && !l.endsWith("\tTEST-REPORT.md"));
  return sha(files.join("\n")).slice(0, 16);
}

// Real skips are method calls (describe.skipIf / test.skipIf), so only a call with a leading dot
// counts; a skipIf( inside a string, like this generator's own test fixtures, doesn't.
export function skips(found = sh("grep", ["-rhoE", "\\.skipIf\\([^)]*\\)", "tests"]).stdout.split("\n").filter(Boolean)) {
  const counts = new Map<string, number>();
  for (const m of found) { const c = m.replace(/^\./, "").slice(7, -1); counts.set(c, (counts.get(c) ?? 0) + 1); }
  return [...counts].map(([condition, count]) => {
    const reason = SKIP_REASONS[condition];
    if (!reason) throw new Error(`test-report: skip condition "${condition}" has no stated reason; add it to SKIP_REASONS`);
    return { condition, count, reason };
  });
}

// What each test file covers: its opening comment, up to the first blank or code line.
export function coverage(dir = join(ROOT, "tests")) {
  return readdirSync(dir).filter((f) => f.endsWith(".test.ts")).sort().map((f) => {
    const lines: string[] = [];
    for (const l of readFileSync(join(dir, f), "utf8").split("\n")) { if (!l.startsWith("//")) break; lines.push(l.replace(/^\/\/ ?/, "")); }
    if (!lines.length) throw new Error(`test-report: tests/${f} has no opening comment saying what it covers`);
    return { file: `tests/${f}`, covers: lines.join(" ").replace(/\s+/g, " ").trim() };
  });
}

// The workflow's steps as [name, first line of its `run:`], so a log line can be matched to its step.
export function ciSteps(yml: string): [string, string][] {
  return [...yml.matchAll(/- name: (.+)\n\s+run: (?:\|\n\s+)?(.+)/g)].map((m) => [m[1].trim(), m[2].trim()]);
}

// Some `gh` versions label every log line UNKNOWN STEP. Each step's output opens with
// `##[group]Run <its first run line>`, so the step name is recovered from that marker.
export function relabel(log: string, steps: [string, string][]): string {
  const current = new Map<string, string>();
  return log.split("\n").map((l) => {
    const [job, step, ...rest] = l.split("\t");
    if (step !== "UNKNOWN STEP" || !rest.length) return l;
    const text = rest.join("\t");
    const marker = /##\[group\]Run (.+)$/.exec(text);
    if (marker) current.set(job, steps.find(([, run]) => marker[1].trim().startsWith(run))?.[0] ?? "UNKNOWN STEP");
    return [job, current.get(job) ?? step, text].join("\t");
  }).join("\n");
}

// Counts per platform from a CI log (`gh run view --log`: job, step and line, tab-separated).
export function counts(log: string, os: string) {
  const lines = log.split("\n").filter((l) => l.startsWith(`test (${os})\t`));
  const count = (step: string, what: string) => {
    const hit = lines.filter((x) => x.includes(`\t${step}\t`)).map((x) => new RegExp(`(\\d+) ${what}\\s*$`).exec(x.trim())).find(Boolean);
    return hit ? Number(hit[1]) : 0;
  };
  return { pass: count("Tests", "pass"), skip: count("Tests", "skip"), fail: count("Tests", "fail"), install: count("The install tests must have run, not skipped", "pass") };
}

function ci(): { run: string; rows: string[] } | null {
  const head = sh("git", ["rev-parse", "HEAD"]).stdout.trim();
  const runs = sh("gh", ["run", "list", "--commit", head, "--workflow", "ci.yml", "--json", "databaseId,conclusion,url", "--limit", "1"]);
  if (runs.status !== 0) return null;
  const run = JSON.parse(runs.stdout || "[]")[0];
  if (!run || run.conclusion !== "success") return null;
  const log = relabel(sh("gh", ["run", "view", String(run.databaseId), "--log"]).stdout, ciSteps(readFileSync(join(ROOT, ".github", "workflows", "ci.yml"), "utf8")));
  const rows = [["ubuntu-latest", "Linux"], ["macos-latest", "macOS"]].map(([os, name]) => {
    const c = counts(log, os);
    if (!c.pass) throw new Error(`test-report: no passing tests found for ${name} in ${run.url}; the CI log wasn't read`);
    return `| ${name} | ${c.pass} | ${c.skip} | ${c.fail} | ${c.install} |`;
  });
  return { run: run.url, rows };
}

export function body(results: string): string {
  return [
    "## What this report covers",
    "",
    "The CI results for this commit on Linux and macOS, every condition under which a test is skipped and why, and what each test file checks. It is generated from the repository and its CI run, never written by hand.",
    "",
    "It does not list defects that testing caught. The files here are generated from a master copy whose history does not link each fix to the test that guards it, so there is nothing reliable to list.",
    "",
    "## Results by platform",
    "",
    results,
    "",
    "## Skipped tests, and why",
    "",
    "| Condition | Suites | Why |", "|---|---|---|",
    ...skips().map((s) => `| \`${s.condition}\` | ${s.count} | ${s.reason} |`),
    "",
    "## What the tests check",
    "",
    "| File | What it checks |", "|---|---|",
    ...coverage().map((c) => `| \`${c.file}\` | ${c.covers.replace(/\|/g, "\\|")} |`),
    "",
    "## Limits",
    "",
    "The tests check the installer, the plugin files, the licence terms and the zero-install links. None of them tests what a check finds when an agent runs it on a document: the checks are instructions a model carries out, and the README's Limits and Supported models sections say what is and isn't known about that.",
  ].join("\n");
}

function results(dry: boolean): string {
  if (dry) return DRY_RUN;
  const c = ci();
  return c
    ? `From CI run ${c.run}.\n\n| Platform | Pass | Skip | Fail | Install tests (Claude Code, Codex, Gemini CLI, Kimi Code) |\n|---|---|---|---|---|\n${c.rows.join("\n")}`
    : NO_CI;
}

export function render(b: string, tree = treeHash(), date = new Date().toISOString().slice(0, 10)): string {
  return `# Test report\n\nGenerated ${date} for tree \`${tree}\`. Body hash \`${sha(b).slice(0, 16)}\`. Generated by \`scripts/test-report.ts\`; don't edit by hand.\n\n${b}\n`;
}

export function check(text: string, tree = treeHash()): string | null {
  const m = /^# Test report\n\nGenerated \S+ for tree `([0-9a-f]+)`\. Body hash `([0-9a-f]+)`\.[^\n]*\n\n([\s\S]*)\n$/.exec(text);
  if (!m) return "TEST-REPORT.md isn't in the generated format";
  if (sha(m[3]).slice(0, 16) !== m[2]) return "TEST-REPORT.md was edited by hand (its body hash doesn't match)";
  if (m[1] !== tree) return "TEST-REPORT.md is for a different tree; regenerate it";
  if (m[3].includes(NO_CI) || m[3].includes(DRY_RUN)) return "TEST-REPORT.md has no CI results";
  return null;
}

if (import.meta.main) {
  const args = process.argv.slice(2);
  if (args.includes("--check")) {
    const problem = existsSync(REPORT) ? check(readFileSync(REPORT, "utf8")) : "no TEST-REPORT.md";
    if (problem) { console.error(`test-report: ${problem}`); process.exit(1); }
    console.log("test-report: current");
  } else if (args.includes("--dry-run")) {
    process.stdout.write(render(body(results(true))));
  } else {
    const i = args.indexOf("--out");
    const out = i >= 0 ? args[i + 1] : REPORT;
    if (!out) { console.error("test-report: --out needs a file"); process.exit(2); }
    const text = render(body(results(false)));
    if (text.includes(NO_CI)) { console.error("test-report: no successful CI run for this commit; nothing written"); process.exit(1); }
    writeFileSync(out, text);
    console.log(`test-report: wrote ${out}`);
  }
}
