---
name: claim-to-source
description: "Trace every load-bearing claim in a document back to a source and report what does not hold. For each number, fact, or attributed statement: name the source, check what the source actually says, and tag the claim [verified] / [unverified] / [contradicted] / [hand-set]. Produces an attestation table plus a residuals list naming what was not checked and why. Runs standalone on any document from any tool; needs no prior analysis, no corpus, and no other check. USE WHEN verifying an AI-assisted analysis, memo, strategy, plan, or report before acting on it or sending it; checking whether a document's numbers hold up; auditing claims; 'does this actually say that'; 'where did this number come from'; preparing a document for review or delivery."
family: verify
license: CC-BY-SA-4.0. See LICENSING.md.
---

# claim-to-source

Verify what a document asserts against what its sources actually say.

A fluent document and a defensible document look identical from the outside. This check separates them by doing the one thing reading cannot: going back to the source for every claim that carries weight, and reporting the ones that do not survive the trip.

Runs on any document, from any tool, with or without a corpus. Nothing else has to run first.

## What this catches

The failure modes are ordinary and expensive:

- **A number nothing produced.** It appears in the document, it is used in an argument, and no input generates it. It was composed to fit the sentence.
- **A source that does not say that.** The citation is real, the source exists, and it supports something adjacent to the claim rather than the claim.
- **Arithmetic that does not reconcile.** Totals against components, capacity against demand, budget against plan.
- **A statistic doing the wrong job.** Real, correctly quoted, and not about what the sentence uses it for.
- **An attribution nobody made.** A position assigned to a person, team, or document that did not take it.
- **A claim that changed between drafts** without its source changing.

## Procedure

### 1. Extract the load-bearing claims

Read the document and list every claim that an action or a decision would rest on. Include:

- every number, rate, count, date, duration, and currency amount
- every factual assertion about the world, the organization, or a system
- every attribution ("the team decided", "the report found", "X said")
- every comparison and superlative ("faster than", "the largest", "unlike")
- **every structural promise the document makes about itself** — "defined below", "named in writing", "listed in the appendix", "neither is optional", "any figure can be re-checked". These are claims whose source is the document itself, and they are checked by going to the place named and confirming the thing is there. In practice this category surfaces the most consequential findings: an owner who is never named, deprioritized work that is never listed, a total that does not reconcile against its own parts, a placeholder never filled.

Exclude claims that carry no weight: framing sentences, transitions, and statements the document itself marks as speculative. If in doubt, include it. Over-inclusion costs a line; omission is a miss.

State the count before proceeding. If the document has more than roughly forty load-bearing claims, verify the highest-consequence twenty and say plainly which ones you did not reach — a partial check that says so beats a complete-looking check that quietly sampled.

### 2. Name the source for each claim

For each claim, identify what should produce it:

- a document, file, dataset, or system the claim cites or implies
- a calculation, with its inputs
- a person, meeting, or decision record
- nothing identifiable

**A claim whose source cannot be named is already a finding.** Do not skip it, and do not guess a plausible source on the claim's behalf.

### 3. Go to the source

For each claim with a named source, check it directly. Read the passage, run the arithmetic, open the file, query the data.

Two rules:

- **Read the primary source, not a summary of it.** A derivative that agrees with the claim proves the derivative agrees, not that the claim is true.
- **Recompute rather than accept.** If the claim is a calculation, do the calculation from the stated inputs. If the result differs, the claim is contradicted even when the difference is small.

Where the source cannot be reached — access, time, a system not available — that is a residual, not a verification. Record it as unchecked.

### 4. Tag each claim

| Tag | Meaning |
|---|---|
| `[verified]` | The source was reached and says what the claim says. |
| `[unverified]` | The source could not be reached, or no source could be named. Not an accusation; a statement about what is known. |
| `[contradicted]` | The source was reached and does not support the claim, or the arithmetic does not reconcile. |
| `[hand-set]` | The value could not be derived from any stated input. Someone chose it. Legitimate when disclosed, a defect when presented as derived. |

Distinguish `[unverified]` from `[contradicted]` carefully. The first says nothing about whether the claim is true. Reporting one as the other destroys the value of both.

### 5. Report

Produce two things.

**The attestation table.** One row per load-bearing claim:

| Claim | Source | What the source says | Tag |
|---|---|---|---|
| Verbatim or close paraphrase | The file, dataset, calculation, or person | What was actually found, quoted where it matters | `[verified]` etc. |

**The residuals list.** What was not checked, and why. Access, time, an unavailable system, a claim whose source could not be named. This is not an apology; it is the boundary of the check, and a reader needs it to know how much the check is worth.

Lead the report with the count that matters: how many load-bearing claims, how many verified, how many contradicted, how many unchecked.

## Rules

- **Report contradictions plainly, without softening.** A number that does not reconcile is a number that does not reconcile. Judgment about whether it matters belongs to the reader.
- **Never repair the document while checking it.** The output is a verdict, not a rewrite. Fixing and checking in one pass hides which claims failed.
- **State uncertainty as uncertainty.** "I could not reach this source" is a complete and useful finding. "This appears roughly correct" is not.
- **The check's own claims follow the same rule.** Every finding names the source that produced it. A verification that cannot be verified is worth nothing.
- **A clean pass on the first attempt is suspicious.** Real documents contain hand-set numbers. If nothing surfaces, check whether the extraction step was too shallow before concluding the document is sound.

## Provenance

Adapted from an explanation-quality check proposed by Rafael Kaufmann (Primordia, 2026): rebuild each figure from its stated inputs, and treat a figure that won't rebuild as set by hand. The extraction procedure, the four tags and the structural-promise category are S37's. See NOTICE.

## What this does not do

- It does not judge whether the reasoning is sound. A document can be perfectly sourced and badly argued.
- It does not check whether the conclusion was constrained by the evidence — that is the specificity check.
- It does not attack the argument — that is the adversarial pass.
- It does not repair anything.

Each of those runs on its own. Running them together gives a fuller picture; running this one gives a real answer.
