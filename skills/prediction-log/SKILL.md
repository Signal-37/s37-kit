---
name: prediction-log
description: "Write down what you expect before you act, then go back and check whether it happened. Each entry carries an expectation, what would prove it wrong, and when to look again; reviewing them builds a running record of where your judgement runs consistently high or low. One markdown file, no tooling. Catches the failure no single-document check can see: an estimate that is wrong the same way every time. Runs standalone. USE WHEN making an estimate, forecast, sizing, or bet that will be settled later; before committing to a plan whose assumptions could be wrong; 'log what we expect'; 'check the log'; 'what did we predict'; reviewing whether past expectations held."
family: verify
license: CC-BY-SA-4.0. See LICENSING.md.
---

# prediction-log

The only check here that gets better the longer you use it.

Every other check inspects one document. This one inspects the person, across many. It works by writing expectations down before the answer is known, then going back to see what happened. No single entry is worth much. After twenty, a pattern shows: where your judgement is reliable, and where it runs off in the same direction every time.

One markdown file. No tooling, no setup.

## The failure it catches

Checking a document can only tell you whether that document holds together. It cannot see a habit.

The common case: time estimates that run long. Each one looks careful, each is defensible on its own, and the last fourteen all came in at half the projected time. Nothing you can do to a single estimate reveals that. Only the record does.

The log turns "I keep getting this wrong" into a number you can correct for.

## An entry

Three parts, written **before** the answer is known:

**What you expect.** Specific enough to check later. "About three weeks" can be checked. "This should go well" cannot.

**What would prove it wrong.** Write this even when it seems obvious. Without it, whatever happens tends to get read as roughly what you meant.

**When to look again.** A date, or an event that will definitely occur. "When the pilot ships" works. "Later" does not.

Optional and useful: how sure you are, roughly, as a percentage. Over time that is what tells you whether your confidence tracks your accuracy, which is a different thing from being right.

### Format

One file, added to over time. Newest at the top or the bottom, consistently.

### Where the file lives

One log per project, so the entries can be found again.

- If the user names a file, use it.
- If they don't, look for `predictions.md` in the project's folder and use that.
- If there is none, create `predictions.md` in the project's folder, and say where you put it.

Whenever you add or mark an entry, say which file you wrote to. Asked to "check the log" with no file named, look for `predictions.md` in the project's folder first; if it isn't there, say so and ask where the log is. Don't start a second one.

```markdown
## 014 · Config migration effort
- **Expected:** 3 weeks of one person's time (2026-08-05)
- **How sure:** ~70%
- **Wrong if:** it takes more than 5 weeks, or fewer than 1
- **Look again:** when the migration closes
- **What happened:** [open]
```

When the time comes, replace the last line:

```markdown
- **What happened:** RIGHT — closed in 3.5 weeks (2026-09-02), inside the range.
```

Use `RIGHT`, `WRONG`, or `PARTLY`. Add a sentence on what actually occurred where it is not obvious.

## Procedure

### Writing an entry

1. **Before acting on an estimate or a bet, write it down.** What you expect, what would prove it wrong, when to look again.
2. **Do not log everything.** Log what a decision rests on. A file full of trivia never gets reviewed, and an unreviewed file is worth nothing.
3. **Write the wrong-if line before you are attached to the answer.** This is the whole discipline, and it cannot be done afterwards.

### Checking it

4. **At the time you set, go back and mark it.** `RIGHT` / `WRONG` / `PARTLY`, plus what happened.
5. **Judge it against the wrong-if line as written**, not against a reinterpretation. If that line was badly chosen, say so in the outcome and write a better one next time. Do not quietly move it.
6. **Record the wrong ones plainly.** A file that only holds successes is advertising.

### Reading the record

7. **Every ten to twenty entries, read the whole file.** You are looking for direction, not score: are the misses scattered, or all on one side?
8. **A one-sided pattern is a correction you can apply, not a flaw.** "Time estimates run about double" is usable. Apply it to the next estimate on purpose, and note that you did.
9. **Watch where confidence and outcome part company.** Being right when you felt certain and right when you felt unsure are different things, and only one of them is skill.

## Rules

- **Written before the answer, or it is not an entry.** Recorded afterwards, it is a memory, and memory reshapes itself around what happened.
- **The wrong-if line is not optional.** Without it, every outcome can be read as a success.
- **Never edit an entry after the fact.** If your view changes, add a new one. The original stands.
- **A file nobody goes back to is a to-do list.** All the value is in returning. If entries pile up unchecked, write fewer of them.
- **Small and dull beats thorough and abandoned.** Ten entries you went back to are worth more than a hundred you did not.

## Provenance

This is the forecasting practice, applied to working judgment rather than geopolitics: write the expectation and its falsifier before the outcome is known, score it afterward, and read the record rather than the memory. The research tradition it comes from is Philip Tetlock's work on expert political judgment and the forecasting-tournament literature that followed it. Nothing here is novel; the contribution is making it small enough to actually keep.

It is also the ground truth that verification checks approximate. Those checks can run *before* outcomes land, which matters because forward-testing is slow and yields few, noisy samples. This log is the slow thing itself. Run alongside the checks, it is what eventually tells you whether they were worth running.

## What this does not do

- It does not check a document — that is the claim-to-source check.
- It does not test whether an argument constrained its conclusion — that is the specificity check. The two connect: an estimate that survived a wide range of substitutes, logged and then checked, is how you find out the range was real.
- It does not attack an argument — that is the adversarial pass.
- It does not tell you whether any single expectation was reasonable. It tells you, eventually, whether you are.

Runs on its own and works with nothing else installed.
