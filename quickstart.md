# How to use these checks

Six things that make AI-assisted work inspectable. Each runs on its own. Take one, take all six, take them in any order.

There is nothing to install and nothing to maintain. Each is a set of instructions you invoke by name against a document you already have.

---

## Start here

Pick one document your team produced with AI assistance and has not yet acted on. A strategy, a plan, an analysis, a memo. Run **claim-to-source** against it.

That is the whole first step. It takes minutes, and what comes back will tell you whether the rest of this is worth your time.

---

## What each one does

**claim-to-source** — Every number and factual claim in the document: where did it come from, and does the source actually say that? Returns a table tagging each claim verified, unverified, contradicted, or hand-set, plus a list of what could not be checked.

*Use it when* a document is about to inform a decision and you want to know what is holding it up.

**adversarial-pass** — Argues the opposite of what the document concludes, using only the document's own evidence, and counts what breaks. A conclusion you can reverse without contradicting a single stated fact was not established by the evidence.

*Use it when* a document recommends a course of action and you want to know whether the argument holds or merely reads well.

**off-script-check** — Asks the document questions it was not written to answer, and reports whether they can be answered from what it states or would have to be invented. Real machinery answers adjacent cases from the same inputs; prose composes a fresh number on the spot, just as confidently.

*Use it when* a document reads authoritatively and you want to know whether there is a model behind it or only this one output.

**specificity-check** — Substitutes different values into the conclusions and re-reads the reasoning. If the same paragraphs would have defended a different number just as comfortably, the number was chosen and the reasoning arranged behind it.

*Use it when* a figure looks confident — an estimate, a forecast, a margin, a rating — and you want to know whether the precision is earned.

**attested-deliverable** — A format rather than a check. Produces a document that carries its own evidence: a table naming what produced each claim, tags on claims that could not be confirmed, and a section stating plainly what was not checked.

*Use it when* you are sending work to someone who will act on it, and you want them to be able to weigh it without redoing it.

**prediction-log** — Write down what you expect before you act, and what would prove you wrong. Go back later and record what happened. Over twenty or so entries, you learn where your judgement runs consistently high or low.

*Use it when* you are making an estimate or a bet that will be settled later. This is the only one that gets more useful the longer you use it.

---

## An order that works

If you are checking one document before acting on it:

1. **claim-to-source** — does it trace?
2. **specificity-check** — is the precision earned?
3. **off-script-check** — is there a model behind it, or only this one output?
4. **adversarial-pass** — does the argument hold?

Then, if you are sending the corrected version onward, run **attested-deliverable** to give it the evidence table.

Each of the four asks a different question and they do not overlap. A document can be perfectly sourced and completely reversible. A conclusion can be well argued and rest on a number nobody derived. An analysis can be airtight inside the three cases it chose and have nothing behind it in the fourth.

You do not need all four. Running one gives a real answer.

---

## What comes back, and how to read it

Every check reports what it did **not** cover. That section is not an apology — it is the boundary of the work, and you need it to know how much weight the result carries.

Expect findings. A competent document typically comes back with several claims unverified and at least one conclusion unconstrained. That is the normal condition of confident writing, not evidence that someone did a bad job. The checks are calibrated to surface things, and a document that comes back completely clean on the first run more likely means the check ran shallow than that the document is flawless.

Three distinctions worth holding on to:

- **Unverified is not wrong.** It means the source was not reached. It is a statement about what is known, not an accusation.
- **Unconstrained is not wrong either.** It means the document did not establish the conclusion, which is different from the conclusion being false.
- **Bounded is a pass.** A document that names the edge of what it can answer is doing the right thing. Only an unmarked edge is a finding.

---

## What these will not do

- They will not tell you whether a claim is true. They tell you what the document did to earn it.
- They will not fix anything. Every check reports and stops; repair is yours.
- They will not replace someone who knows the subject. They make it faster for that person to see where to look.
- They will not run themselves. You invoke them.

---

## If you only do one thing

Run **claim-to-source** on a document you already trust.

That is the test worth running first, because the interesting result is the uncomfortable one.
