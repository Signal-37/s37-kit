---
name: off-script-check
description: "Ask a document questions it was not written to answer, and find out whether the answers can be derived from what it states or would have to be invented. An analysis with real machinery behind it answers adjacent cases from the same inputs; a write-up composes a fresh number on the spot at the same confidence. Reports a verdict per question of derivable / bounded / composed, plus whether the document's certainty moved when its support did. Runs standalone on any document from any tool; needs no sources, no corpus, and no other check. USE WHEN a document reads authoritatively and you want to know whether there is a model behind it or only this one output; testing whether an analysis holds outside the cases it chose; 'what if we asked it something else'; 'does this generalize'; before relying on an analysis for a decision it did not explicitly cover."
family: verify
license: CC-BY-SA-4.0. See LICENSING.md.
---

# off-script-check

Ask it something it was not written to answer.

A document answers the questions it chose. That is not evidence of anything, because choosing the questions is free. The useful test is what happens just past the edge of the chosen set: can the document's own stated inputs and method reach an adjacent case, or does the reasoning stop while the confidence continues?

The distinction this draws is between an analysis with machinery behind it and an analysis that is only prose. Real machinery — a model, a dataset, a stated method — answers adjacent questions by construction, because it runs against any input. Prose produces a fresh answer on the spot, delivered exactly as confidently, with nothing underneath it. Inside the scenarios the author picked, the two are indistinguishable.

Runs on any document. Needs no outside sources and nothing else to have run first.

## What this catches

- **A method that exists only for the cases shown.** The document names an approach, applies it to three examples, and cannot reach a fourth.
- **Confidence that does not move with support.** The same certainty for the case with data behind it and the case without.
- **Scope quietly chosen to fit the evidence.** The cases covered are exactly the ones the available material reaches, and that boundary is never stated.
- **Inputs named but never used.** A data source in the methods section that no conclusion actually draws on.
- **A figure with nothing behind it.** Ask for the same number cut a different way and nothing in the document can produce it.

## Procedure

### 1. State what the document was written to answer

One or two sentences: the cases, segments, time range, or questions it explicitly addresses. This is its script.

Write this **before** writing the questions. Reverse the order and you will unconsciously choose questions the document happens to cover, and report a clean pass.

### 2. Write the off-script questions

Three to five. Each must be:

- **Adjacent, not alien.** Same subject, same domain, a case the document's own model should determine if that model exists. "What would this look like in a different industry" is not adjacent. "What would this look like for the segment one size smaller" is.
- **Answerable in principle.** If nobody could answer it, the document's silence proves nothing.
- **Genuinely not covered.** Check first. A question the document addresses is not off script.

The best questions sit just outside the boundary: the next period, the neighbouring segment, the same figure sliced another way, the case the author would have covered next.

### 3. Ask whether each is derivable

For each question, work only from what the document states. Name the inputs it would need and the method it would take. Then place it:

- The document contains what is needed, and the answer follows from it.
- It does not, and the document says so.
- It does not, and the document does not say so.

**Do not answer the questions yourself from outside knowledge.** Whether *you* can answer is not the test.

### 4. Where you can, run it live

If you still have the underlying material and the tool that produced the document, put the off-script questions to it directly, against the same sources.

This is the sharper version of the check, because it stops being a judgment about a document and becomes an observation of behaviour. Watch two things: whether the answer traces to the source material, and whether the tone changes. An answer composed on the spot usually arrives just as confidently as one that was derived. That is the finding.

Where the material is not available, say so. Step 3 stands on its own.

### 5. Compare confidence to support

Across all the questions, ask one thing of the document as a whole: **did its certainty move when its support did?**

A document that hedges precisely where its evidence thins is doing something real. A document at uniform confidence across derivable and non-derivable ground is telling you its confidence was never connected to its evidence.

This is the most useful finding the check produces, and it is visible only across several questions. One question cannot show it.

### 6. Verdict per question

| Verdict | Meaning |
|---|---|
| **Derivable** | The document's stated inputs and method reach the answer. There is machinery here, at least in this direction. |
| **Bounded** | Not derivable, and the document says so, or its stated scope excludes it. An honest edge, not a defect. |
| **Composed** | Not derivable, and nothing marks the boundary. Where the check ran live, an answer arrived anyway, at unchanged confidence. |

## Report

Lead with the count and the confidence finding: questions asked, how many derivable, bounded, and composed, and whether certainty tracked support.

Then per question:

- the question, and one line on why it is adjacent
- what answering it would take, in the document's own terms
- what the document actually has
- if run live: what came back, and whether the confidence changed
- the verdict

Then a residuals line: what was not asked, and whether the live pass was available.

## Rules

- **Scope before questions.** The order is the control. Written the other way round, this check cannot fail.
- **Adjacent, always.** An unfair question produces a finding about the question, not the document.
- **Do not answer from your own knowledge.** The document's reach is what is being measured, not yours.
- **Bounded is a pass.** A document that names its own edges is doing the right thing. Scoring honesty as a defect is the fastest way to teach people to state fewer boundaries.
- **One composed answer is not the finding. The pattern is.** Report the ratio and the confidence behaviour, not a single miss.
- **Do not repair.**
- **If everything comes back derivable, suspect the questions.** Rebuild the two hardest before reporting a clean pass.

## What this does not do

- It does not check whether stated claims trace to sources — that is the claim-to-source check. A fully sourced document can still have nothing behind it one step off script.
- It does not test whether reasoning pinned down a value — that is the specificity check. Related but distinct: specificity asks whether the same words would have defended a different number; this asks whether the document could produce any number at all for a question it did not choose.
- It does not attack the conclusion — that is the adversarial pass.
- It does not judge whether the document is right about what it does cover.
- It does not repair anything.

Each runs on its own. Running all of them gives a fuller picture; running this one gives a real answer.

## Provenance

Adapted from an explanation-quality check proposed by Rafael Kaufmann (Primordia, 2026): question the analysis outside the scenarios it was written for. The procedure, the three verdicts and the live-run mode are S37's. See NOTICE.
