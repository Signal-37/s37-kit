---
name: attested-deliverable
description: "Produce or retrofit a deliverable that carries its own evidence: an attestation table naming what produced each load-bearing claim, inline [UNVERIFIED] tags on claims that could not be confirmed, and a printed residuals section naming what was not checked and why. The format that lets a reader weigh a document without re-doing the work. Runs standalone in two modes — write-with-attestation as you draft, or retrofit-attestation onto a finished document. Needs no corpus and no other check. USE WHEN producing a client deliverable, memo, analysis, strategy, or report that someone will act on; making a document's evidence legible; 'add the attestation table'; 'make this deliverable-ready'; 'show your work'; preparing something for review, delivery, or publication."
family: assemble
license: CC-BY-SA-4.0. See LICENSING.md.
---

# attested-deliverable

A document that carries its own evidence.

Most analysis asks the reader to trust it. An attested deliverable does something narrower and more useful: it shows, for each claim that matters, what produced it — and it names, in the document itself, what the author did not check. The reader can then weigh it without re-doing the work, and can see exactly where the floor is.

This is a format, not a check. It shapes what you produce. It does not verify anything on its own, and it does not make a claim true — it makes the basis of a claim visible, including when the basis is thin.

Two modes: write with attestation as you draft, or retrofit it onto a finished document.

## Why it earns its cost

A fluent document and a defensible document read identically. The format separates them without asking the reader to become an investigator: a claim with a named source can be spot-checked in seconds, a claim tagged `[UNVERIFIED]` is a known unknown rather than a hidden one, and a residuals section tells the reader how far the work went before it stopped.

The unusual part — and the part worth keeping — is **printing what you did not check**. Most deliverables hide their boundaries. Naming them is what makes the rest credible.

## The three elements

### 1. The attestation table

One row per load-bearing claim. A claim is load-bearing if a decision would rest on it.

| Claim | What produced it | Evidence basis |
|---|---|---|
| The figure, fact, or assertion, verbatim or closely paraphrased | The document, dataset, calculation, interview, or system that generated it — specific enough to re-check (file and line, query, source and date) | `[primary-verified]` / `[derived]` / `[reported]` / `[UNVERIFIED]` / `[estimate]` |

Evidence bases:

- **`[primary-verified]`** — the original source was read directly and says this.
- **`[derived]`** — computed from stated inputs; the inputs are named and the computation is reproducible.
- **`[reported]`** — a person or a secondary source stated it; not independently confirmed. Name who.
- **`[UNVERIFIED]`** — the claim is used but its source was not reached. Say why in the residuals.
- **`[estimate]`** — a judgment, not a measurement. Name whose, and what it rests on.

Place the table at the end of the document, or in an appendix for longer work. It is reference material, not narrative.

### 2. Inline `[UNVERIFIED]` tags

Where a load-bearing claim appears in the body and its basis is `[UNVERIFIED]` or `[estimate]`, mark it in place.

The tag goes where the reader meets the claim, not only in the table. A reader who skims the body and never opens the appendix should still see which claims are load-bearing and unconfirmed.

Do not use the tag as a hedge on claims you have verified. Its value depends entirely on being rare and meaningful.

### 3. The residuals section

A short section, near the end, stating plainly:

- what was not checked, and why — access, time, an unavailable system, a source that could not be identified
- what is out of scope by design
- what would change the conclusions if it turned out otherwise

Write it as statements, not apologies. "The underlying Jira queries were not re-run; the appendix figures were cross-checked against the body only" is a complete and useful sentence.

## Procedure — writing mode

1. **Draft normally.** Do not attest while composing; it fragments the writing.
2. **Mark the load-bearing claims.** Read the draft and identify every claim a decision would rest on — numbers, facts, attributions, comparisons, and the document's own structural promises ("defined below", "listed in the appendix").
3. **For each, name what produced it.** If nothing can be named, that is a finding about the draft, not a formatting problem. Either find the basis or tag it and say so.
4. **Assign an evidence basis** from the five above. Assign the weakest one that is honest.
5. **Tag the body** where the basis is `[UNVERIFIED]` or `[estimate]`.
6. **Write the residuals** from what step 3 and step 4 surfaced.
7. **Build the table.**

## Procedure — retrofit mode

Same steps 2 through 7, applied to a finished document. Expect step 3 to surface claims whose basis nobody can reconstruct. That is the normal outcome and the reason retrofitting is worth doing.

Do not rewrite the document's argument while attesting it. If attestation reveals the argument is unsupported, that is a finding to report, not a defect to quietly repair.

## Rules

- **Assign the weakest honest basis.** `[reported]` is not a lesser form of `[primary-verified]`; it is a different and accurate statement. Upgrading a basis you did not earn destroys the format's only value.
- **A claim with no nameable basis gets tagged, never dropped and never softened.** Softening it into vagueness hides it. The tag is the honest move.
- **Specific enough to re-check.** "Internal data" is not an attestation. "Issue tracker, `project = ACME AND issuetype = Bug AND created >= -365d`, run 2026-08-05" is.
- **Residuals are not a disclaimer.** They state the boundary of the work. A reader uses them to decide how much weight the document carries.
- **The format does not certify anything.** An attested document can be entirely wrong. It is legible, not correct — and legible is what lets someone else find the error.

## Reporting a check's findings into this format

When a verification check has run, its verdicts map onto evidence bases as follows. Nothing else needs translating.

| Check verdict | Evidence basis here | Note |
|---|---|---|
| `[verified]` | `[primary-verified]` or `[derived]` — whichever describes how it was confirmed | |
| `[unverified]` | `[UNVERIFIED]` | Say in the residuals why the source was not reached |
| `[hand-set]` | `[estimate]` | Name whose judgment it is |
| `[contradicted]` | **No basis. Fix the claim or remove it.** | A contradicted claim does not get attested and shipped with a tag. Attestation makes a basis visible; it does not launder a claim the source refutes. |

That last row is the rule that matters. The format is for claims whose support is thin or unconfirmed, not for claims already known to be wrong.

## What this does not do

- It does not verify claims — that is the claim-to-source check.
- It does not test whether reasoning constrained its conclusions — that is the specificity check.
- It does not attack the argument — that is the adversarial pass.
- It does not improve the analysis. It makes the analysis inspectable.

Each runs on its own. This one is the format the others report into, and it is useful with none of them.
