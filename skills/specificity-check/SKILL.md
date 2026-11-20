---
name: specificity-check
description: "Test whether a document's reasoning actually constrained its conclusions, or would have defended different ones just as comfortably. For each load-bearing conclusion, substitute plausible alternative values and re-read the supporting argument: count what breaks. Nothing breaks means the value was chosen and then decorated, not derived. Reports a constraint range per conclusion and a verdict of constrained / unconstrained / constrained-by-something-else. Runs standalone on any document from any tool; needs no sources, no corpus, and no other check. USE WHEN a number, estimate, forecast, recommendation, or risk rating looks confident and you want to know whether it is earned; checking whether prose is doing real work or decorating a guess; 'is this precision real'; 'would this argument have supported a different answer'; reviewing estimates, projections, sizing, prioritization, or a recommendation before acting on it."
family: verify
license: CC-BY-SA-4.0. See LICENSING.md.
---

# specificity-check

Ask what else the same words would have defended.

A document states 40 percent. The paragraphs around it are fluent, cite real inputs, and read as reasoning. The question this check answers is narrow and awkward: **if the number were 25 percent instead, would any of those paragraphs have to change?** If not, the reasoning did not produce the number. The number was chosen, and the reasoning was arranged behind it.

This is the check for confident prose. It says nothing about whether a claim is true or sourced — a perfectly sourced figure can be entirely unconstrained by the argument that presents it. It measures only whether the document earned the precision it displays.

Runs on any document. Needs no sources, no corpus, and nothing else to have run first.

## What this catches

- **Single-point estimates that would have defended any point.** Effort, cost, timeline, headcount. The reasoning lists considerations; the number appears; the considerations would have sat equally well beneath half or double.
- **Precision without derivation.** A margin, a percentage, a confidence level stated to a decimal the argument cannot reach.
- **Recommendations the evidence does not select.** The same considerations, honestly weighed, would have supported the opposite recommendation. Common when a document lists pros and cons and then concludes.
- **Risk and priority ratings** that float free of their justification — "high" where the surrounding text argues no more strongly than it would for "moderate."
- **Rankings whose order nothing establishes.** Reorder the list; if no sentence breaks, the order was asserted.
- **A right answer with a decorative argument.** The value is defensible, but not by the reasoning given. Worth catching separately: the conclusion survives, the document's credibility should not.

## Procedure

### 1. List the load-bearing conclusions

Find the claims a decision would rest on. Typically:

- quantities and estimates (effort, cost, duration, headcount, capacity)
- probabilities, confidence levels, margins, ranges
- recommendations and selections among options
- risk, priority, and severity ratings
- rankings and orderings
- directional claims ("this will increase X")

Ignore the descriptive body. This check is about what the document concludes, not what it reports.

### 2. Generate plausible substitutes

For each conclusion, name two or three alternatives a competent reader might have expected instead.

**Plausible is the operative word.** Substituting 1000 percent for 40 percent proves nothing; nobody would have written it. Use adjacent values — roughly half and roughly double for magnitudes, the next category up and down for ratings, the runner-up for a selection, reversed for a direction.

State the substitutes explicitly before testing them. A substitute chosen after seeing the result is not a test.

### 3. Re-read the supporting reasoning with the substitute in place

This is the whole check. Take the argument as written, replace the conclusion with the substitute, and read it again.

Look for a **specific** break:

- a sentence that now contradicts itself
- a number elsewhere that no longer reconciles
- a stated input that no longer produces the output
- a comparison that inverts
- a named consequence that no longer follows

"Reads differently" is not a break. "Feels less right" is not a break. A break is a place you can point to where the text and the substitute cannot both stand.

### 4. Count what breaks, and find the range

For each conclusion, report **how far the value can move before anything breaks.** That range is the specificity.

- 40 percent, and the argument survives 20 through 65 unchanged → the constraint is that wide range, not the stated point.
- Twelve weeks, and the argument survives six through twenty-four → same.
- Recommendation A, and the argument supports B just as well → the recommendation is unconstrained.

Where something does break, name what broke. That is the load-bearing part of the document, and it is worth knowing.

### 5. Verdict per conclusion

| Verdict | Meaning |
|---|---|
| **Constrained** | Substitutes break the reasoning. The value is earned. Name what broke. |
| **Unconstrained** | Substitutes pass without breaking anything. The value was chosen, and the reasoning arranged behind it. Report the range over which the argument is indifferent. |
| **Constrained elsewhere** | The value is defensible, but not by the argument given — a different derivation supports it, and the document's stated reasoning does not. The conclusion stands; the justification does not. |
| **Unstated** | There is no value to test. A placeholder was left unfilled, or the conclusion is gestured at without being given. Not a specificity finding — a more basic one, and it outranks the others. Report it and move on. |

That third verdict matters. A document can arrive at a correct number by a route it did not describe, and a reader who trusts the described route is trusting something that does not hold.

**Constraints are usually one-sided, and the verdict word alone will hide that.** A figure often survives doubling but breaks on halving, or holds at four of five list positions and floats at the fifth. When a constraint is asymmetric, say so in the verdict cell itself — "Constrained (upper bound only)", "Constrained (4 of 5 members)" — because a reader skimming the column will otherwise read a one-sided constraint as a symmetric one. The range column carries the detail; the verdict must carry the shape.

## Report

Lead with the count: how many load-bearing conclusions, how many constrained, unconstrained, constrained-elsewhere.

Then one entry per conclusion:

| Conclusion | Substitutes tested | What broke | Constraint range | Verdict |
|---|---|---|---|---|

Then a residuals line: conclusions you did not test and why.

## Rules

- **Name the substitutes before testing them.** Otherwise the test is unfalsifiable in both directions.
- **A break must be pointable.** Quote the sentence or the arithmetic that fails. An unconstrained verdict is a serious finding and requires the absence of a specific break, not an impression.
- **Do not judge whether the value is right.** That is outside this check and stating an opinion about it will get the finding dismissed along with the opinion. The finding is about what the document earned, not about the truth of the world.
- **Arithmetic on the document's own stated inputs is in scope; outside data is not.** If a document gives you a sample size and a proportion, computing what interval those inputs imply is fair — you are testing whether the stated reasoning produces the stated number, which is the whole check. Bringing in a figure the document never states is not. When you do compute, say which inputs you used, so the boundary stays visible.
- **Do not repair.** Report the range; the author decides whether to narrow the claim or strengthen the argument.
- **Expect unconstrained conclusions in competent documents.** This is the normal condition of confident writing, not evidence of bad faith. Report it flatly.
- **If every conclusion comes back constrained, suspect the test.** The likely cause is substitutes too close to the original to break anything. Widen them and re-run before reporting a clean pass.

## What this does not do

- It does not check whether claims trace to sources — that is the claim-to-source check.
- It does not attack the argument or supply counter-cases — that is the adversarial pass.
- It does not tell you the correct value. It tells you whether the document earned the one it gave.
- It does not repair anything.

Each of those runs on its own. Running them together gives a fuller picture; running this one gives a real answer.

## Provenance

Adapted from an explanation-quality check proposed by Rafael Kaufmann (Primordia, 2026): ask what other conclusions the same reasoning would have defended just as comfortably. The procedure, verdicts and range reporting are S37's. See NOTICE.
