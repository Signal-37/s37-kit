# Scaffolding: getting the model the right ground

The quality of what an AI assistant writes is set before it writes anything, by what it reads. A model working from a well-kept set of source material produces drafts a domain expert finishes; the same model working from a scattered one produces fluent guesses. Scaffolding is the discipline of keeping the ground under the model in order, and it is arranged so that the habits do the work, not the software. There is nothing to install.

The checks in this kit examine what came *out* of the model. This guide is about what goes *in*. They are independent: you can adopt either without the other. Together they close the loop.

## One home per project

Everything a project receives lives in one place, named consistently. Not "mostly one place." One.

The reason is not tidiness. When material scatters, the assistant works from whatever subset it happens to see, and its output carries no signal about what it did not see. A confident summary built from a third of the record reads exactly like one built from all of it. One home is what makes "what did the model read?" an answerable question.

Practical form:

- One folder per project or engagement. Sources in one part, work in progress in another, finished work in a third.
- Review notes, annotations, and drafts-about-sources sit *beside* the sources, never mixed in among them. A folder where originals and commentary are interleaved stops being a record of what you received.
- Old versions move to an archive folder rather than being deleted or left to sit beside current ones with `-final-v2` names.

## Keep a register

A register is a short running record of what the project holds: what each item is, who sent it, when, and anything about its sensitivity or how it may be used. A table in one file is enough.

This is the habit that feels bureaucratic and pays for itself first. Without it, "did we ever get the June numbers?" is an archaeology project; with it, the question takes ten seconds. It is also what lets an assistant say "the record contains no source for this claim" and be right — and when someone sends material with conditions attached (not for sharing, personal information, a draft they may retract), the register is where that condition is written down *at arrival*, which is the only moment anyone reliably remembers it.

When material arrives in mixed forms, note in the register which items are readable text, which are scans that need OCR, and which are audio or video that needs transcription. An item the model cannot read is an item the model did not read, and the register should say so rather than let it pass silently as covered.

## The memory file

Keep one small file of standing facts and rules the assistant should always have: the project's key decisions, corrections it should not repeat, conventions it should follow. This file is the assistant's long-term memory, and its usefulness depends on it staying small and current.

Three rules keep it working:

- **Every entry is dated and actionable.** "The client prefers X" is a fact that helps. "Worked on the report today" is a diary line that does not. If an entry cannot be phrased as something the assistant should *do* differently, it is not memory.
- **Curate on write.** Before adding an entry, read the file. Merge duplicates, delete what a completed project made stale, move long detail to its own note and keep one line pointing at it. A memory file that only grows becomes a file nobody reads, including the model.
- **Cap it.** Pick a length limit — a page or two — and hold it. The limit is what forces the curation, and the curation is what keeps the file true.

The same principle governs context generally: **assemble what the model reads for each task; do not accumulate it.** Handing an assistant everything, every time, feels thorough and works worse. The productive move is the specific one — this source, this earlier decision, this format exemplar — chosen for the task at hand.

## Make recurring work a recipe

The first time a project produces a deliverable — a report, a proposal, an analysis — the route is improvised. If the deliverable will recur, write the route down as a recipe: inputs, steps, output shape. The next run starts at the recipe instead of from zero, and each run improves it.

What a workable recipe records:

- **Inputs, tiered.** What is required, what is strongly wanted, what is merely nice. Include the authoritative reference for the deliverable — the template, the submission rules, the rubric it will be judged against — and, wherever they exist, successful past examples. The model imitates well; give it winners to imitate.
- **The anchor first.** Every substantial deliverable has one section that governs the rest — the summary page, the thesis, the recommendation. Draft that first, get a human sign-off on it, and only then expand. Iterating one page is cheap; discovering the frame is wrong at page thirty is not.
- **A coverage pass.** Before a draft is called done, walk it against the authoritative reference and mark what is addressed and what is missing.
- **The gaps list.** Every draft ends with an explicit list of what the source material did not cover and any assumptions made. Two rules feed it: the model uses only what the project actually holds, and where the record is silent, the gap is *named*, never quietly filled with something plausible.

## Whose hands it ends up in

Scaffolding is built to be handed over. The working pattern has three steps: someone runs the recipe for you on your real material while you watch; you run the next one with them checking; then your team owns it. If a process only works while an outside expert is driving, it is not infrastructure yet — it is a service with extra steps.

## Where to start

Not with all of it. Pick the one project with the most at stake and give it a home, a register, and a memory file this week — an afternoon of work. Add the first recipe when the next recurring deliverable comes due, and let the practice spread by being visibly useful rather than by mandate.

## What this is not

- It is not software, and nothing here depends on a particular tool. It survives changing assistants.
- It does not make the model's output correct. It makes the output *traceable to ground*, which is what the checks in this kit need in order to tell you whether it is correct.
- It is not a filing standard to impose on a whole organization. It is a working discipline for the projects where the output matters.
