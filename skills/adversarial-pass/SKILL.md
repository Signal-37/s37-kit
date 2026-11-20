---
name: adversarial-pass
description: "Argue the opposite of what a document concludes, using only the document's own evidence, and count what broke. A conclusion that can be reversed without contradicting a single stated fact was not established by the evidence. Reports the strongest opposing case, what it had to ignore, and a verdict per conclusion of holds / reversible / underdetermined. Runs standalone on any document from any tool; needs no sources, no corpus, no panel, and no other check. USE WHEN a document argues for a decision, recommendation, or course of action and you want to know whether the argument holds; stress-testing a plan or strategy before committing; 'argue the other side'; 'what would the opposite case be'; 'poke holes in this'; reviewing a proposal, business case, or recommendation before acting."
family: verify
license: CC-BY-SA-4.0. See LICENSING.md.
---

# adversarial-pass

Argue the other side from the same evidence, and see what it costs.

A document recommends A. The reasoning is coherent and the evidence is real. This check asks a narrower question than "is it right": **using only the facts this document already states, how strong a case can be made for not-A?** If that case can be built without contradicting anything the document says, then the document's evidence did not select its conclusion. Something else did.

This is not a search for errors. The facts may all be correct and the conclusion still unestablished.

Runs on any document. Needs no outside sources, no research, and nothing else to have run first.

## What this catches

- **Conclusions the evidence permits but does not require.** A list of considerations followed by a recommendation, where the same list supports the opposite recommendation equally well.
- **Buried decisive assumptions.** The argument turns on one unstated premise; naming it shows the evidence was never doing the work.
- **Asymmetric treatment.** Risks of the chosen path are discussed in general terms; risks of the alternative are described in vivid detail, or the reverse.
- **The unexamined alternative.** An option dismissed in half a sentence that the document's own facts would support at length.
- **Costs counted for one option and not the other.**

## Procedure

### 1. State the conclusion you will attack

Pick one conclusion at a time — the recommendation, the chosen option, the direction the document argues for. Write it in one sentence, in the document's own terms. If the document argues several things, run the procedure once per conclusion; do not blend them.

### 2. Build the opposing case from the document's own evidence

Argue for the opposite, or for the strongest alternative the document names. Two constraints, and they are what make this a check rather than an opinion:

- **Use only facts the document states.** No outside knowledge, no research, no "in my experience." If you need a fact the document does not contain, that is itself the finding — say so and stop.
- **Make it as strong as you can.** A weak opposing case proves nothing. Write the version the document's own author would find uncomfortable.

Write it out. Three to six sentences is usually enough.

### 3. Count what broke

Re-read the document with the opposing case in hand. For each stated fact, ask whether the opposing case contradicts it.

- **A fact the opposing case must deny** is a point where the evidence does real work. Name it.
- **A fact the opposing case can accept** did not constrain the conclusion.

Count both. The ratio is the finding.

### 4. Name what the opposing case had to ignore

The opposing case will usually be weaker in some specific way. Say exactly how. "The opposing case has to treat the deadline as movable, and the document states it is contractual" is a real defence of the conclusion, and it is more useful than the conclusion asserted flatly.

Where the opposing case ignores nothing, say that too. That is the serious result.

### 5. Verdict per conclusion

| Verdict | Meaning |
|---|---|
| **Holds** | The opposing case must contradict stated facts to work. Name which ones — they are the load-bearing evidence. |
| **Reversible** | The opposing case is buildable without contradicting anything stated. The evidence permits the conclusion; it does not establish it. |
| **Underdetermined** | Neither case can be made from what is stated. The document lacks the evidence to conclude in either direction, and says otherwise. |

## Report

Lead with the count: conclusions tested, and how many hold, reverse, or are underdetermined.

Then per conclusion:

- the conclusion, in one sentence
- the opposing case, written out
- facts the opposing case had to deny (the load-bearing evidence)
- facts it could accept (the evidence that did no work)
- what it had to ignore
- the verdict

Then a residuals line: conclusions not tested, and why.

## Rules

- **Only the document's evidence.** The moment you import an outside fact, you are having a different argument and the result stops being about this document.
- **Steelman, do not caricature.** An opposing case built to lose is a rubber stamp with extra steps.
- **A "reversible" verdict is not a claim the conclusion is wrong.** It says the document did not establish it. Those are different, and conflating them will get the finding dismissed.
- **Do not recommend.** Report what holds and what does not. The author decides whether to strengthen the argument or soften the claim.
- **Do not repair.**
- **If every conclusion holds, suspect the opposing cases were too weak.** Rebuild the hardest one before reporting a clean pass.

## Provenance

Adapted from an explanation-quality check proposed by Rafael Kaufmann (Primordia, 2026): argue the opposite from the same analysis and count what breaks. The procedure and report are S37's. See NOTICE.

## What this does not do

- It does not check whether claims trace to sources — that is the claim-to-source check. A document can be fully sourced and still reversible.
- It does not test how precisely reasoning pinned down a value — that is the specificity check. Related but distinct: specificity asks whether the same words would defend a different number; this asks whether the same facts would defend the opposite decision.
- It does not judge whether the conclusion is true. It judges whether this document established it.
- It does not repair anything.

Each runs on its own. Running them together gives a fuller picture; running this one gives a real answer.
