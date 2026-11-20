// The test report generator (scripts/test-report.ts): a report can't be hand-edited, can't
// describe a different tree, can't pass without CI results, and refuses a skip with no stated
// reason or a test file that doesn't say what it covers.
import { describe, expect, test } from "bun:test";
import { mkdtempSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { ROOT } from "./helpers";

const { body, check, ciSteps, counts, coverage, DRY_RUN, NO_CI, relabel, render, skips } = await import(join(ROOT, "scripts", "test-report.ts"));

describe("the published test report", () => {
  const good = render("## What this report covers\n\nbody\n\n## Results by platform\n\nFrom CI run x.", "abc123", "2026-10-20");
  test("a generated report checks as current for its own tree", () => {
    expect(check(good, "abc123")).toBeNull();
  });
  test("a hand edit is caught", () => {
    expect(check(good.replace("body", "better body"), "abc123")).toContain("edited by hand");
  });
  test("a report for a different tree is stale", () => {
    expect(check(good, "def456")).toContain("different tree");
  });
  test("a report without CI results, or a dry run, can't pass", () => {
    expect(check(render(NO_CI, "abc123"), "abc123")).toContain("no CI results");
    expect(check(render(DRY_RUN, "abc123"), "abc123")).toContain("no CI results");
  });
  test("anything not in the generated format is refused", () => {
    expect(check("# Test report\n\nhand-written\n", "abc123")).toContain("generated format");
  });
  test("the report says it does not list caught defects", () => {
    expect(body(DRY_RUN)).toContain("It does not list defects that testing caught.");
  });
});

describe("CI counts", () => {
  test("are read per platform and per step", () => {
    const log = [
      "test (ubuntu-latest)\tTests\t2026-10-20T00:00:00Z  30 pass",
      "test (ubuntu-latest)\tTests\t2026-10-20T00:00:00Z  1 skip",
      "test (ubuntu-latest)\tTests\t2026-10-20T00:00:00Z  0 fail",
      "test (ubuntu-latest)\tThe install tests must have run, not skipped\t2026-10-20T00:00:00Z  9 pass",
      "test (macos-latest)\tTests\t2026-10-20T00:00:00Z  31 pass",
    ].join("\n");
    expect(counts(log, "ubuntu-latest")).toEqual({ pass: 30, skip: 1, fail: 0, install: 9 });
    expect(counts(log, "macos-latest")).toEqual({ pass: 31, skip: 0, fail: 0, install: 0 });
  });

  test("are still read when gh labels every line UNKNOWN STEP", () => {
    const steps = ciSteps("      - name: Tests\n        run: bun test --timeout 300000\n      - name: The install tests must have run, not skipped\n        run: |\n          bun test tests/install.test.ts 2>&1 | tee install.log\n");
    const log = [
      "test (ubuntu-latest)\tUNKNOWN STEP\t2026-10-20T00:00:00Z ##[group]Run bun test --timeout 300000",
      "test (ubuntu-latest)\tUNKNOWN STEP\t2026-10-20T00:00:00Z  40 pass",
      "test (ubuntu-latest)\tUNKNOWN STEP\t2026-10-20T00:00:00Z ##[group]Run bun test tests/install.test.ts 2>&1 | tee install.log",
      "test (ubuntu-latest)\tUNKNOWN STEP\t2026-10-20T00:00:00Z  9 pass",
    ].join("\n");
    expect(counts(relabel(log, steps), "ubuntu-latest")).toEqual({ pass: 40, skip: 0, fail: 0, install: 9 });
    expect(counts(log, "ubuntu-latest").pass).toBe(0);   // the unlabelled log is what produced the zeros
  });
});

describe("skips and coverage", () => {
  test("every skip condition has a stated reason, and an unknown one is refused", () => {
    expect(skips(["skipIf(!hasClaude)", "skipIf(!hasClaude)"])).toEqual([expect.objectContaining({ condition: "!hasClaude", count: 2 })]);
    expect(() => skips(["skipIf(onFridays)"])).toThrow(/has no stated reason/);
  });
  test("the repository's own skips all have reasons", () => {
    expect(() => skips()).not.toThrow();
  });
  test("every test file says what it covers, and one that doesn't is refused", () => {
    expect(coverage().length).toBeGreaterThan(3);
    const dir = mkdtempSync(join(tmpdir(), "kitreport-"));
    writeFileSync(join(dir, "bare.test.ts"), "import { test } from \"bun:test\";\n");
    expect(() => coverage(dir)).toThrow(/no opening comment/);
  });
});
