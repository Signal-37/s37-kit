# The S37 Verification Kit: zero-install manifest

Use the checks in any chat session, on any machine, with nothing installed.

Paste this whole file to an assistant, or point it here:

```
https://raw.githubusercontent.com/Signal-37/s37-kit/main/manifest.md
```

Then say: **"Fetch the required files below and follow them."**

---

## Required

Six checks. Each stands alone, so fetch only the one you need.

| Check | What it does | Raw URL |
|---|---|---|
| claim-to-source | Traces every load-bearing claim back to a source and tags each one verified, unverified, contradicted or hand-set, with a list of what could not be checked. | `https://raw.githubusercontent.com/Signal-37/s37-kit/main/skills/claim-to-source/SKILL.md` |
| specificity-check | Substitutes plausible alternative values into the conclusions and re-reads the reasoning, to show whether the precision was earned. | `https://raw.githubusercontent.com/Signal-37/s37-kit/main/skills/specificity-check/SKILL.md` |
| off-script-check | Asks the document questions it was not written to answer, and reports whether the answers follow from what it states or would have to be invented. | `https://raw.githubusercontent.com/Signal-37/s37-kit/main/skills/off-script-check/SKILL.md` |
| adversarial-pass | Argues the opposite of the document's conclusion using only the document's own evidence, and counts what breaks. | `https://raw.githubusercontent.com/Signal-37/s37-kit/main/skills/adversarial-pass/SKILL.md` |
| attested-deliverable | A format, not a check: produces or retrofits a document that carries its own evidence table, tags on unconfirmed claims, and a section on what was not checked. | `https://raw.githubusercontent.com/Signal-37/s37-kit/main/skills/attested-deliverable/SKILL.md` |
| prediction-log | Records what you expect before you act and what would prove you wrong, so you can go back later and see where your judgement runs high or low. | `https://raw.githubusercontent.com/Signal-37/s37-kit/main/skills/prediction-log/SKILL.md` |

If you are unsure where to start, fetch the quickstart: `https://raw.githubusercontent.com/Signal-37/s37-kit/main/quickstart.md`

## Optional

| File | When to fetch it |
|---|---|
| `scaffolding.md` | You want the other half: keeping the ground under the model in order, so what comes out is traceable to what went in |
| `LICENSING.md` | You are redistributing or adapting |

Raw base: `https://raw.githubusercontent.com/Signal-37/s37-kit/main/`

---

## If you would rather install it

From a clone of the repository, the installer puts the Verification Kit into each of Claude Code, Codex, Gemini CLI and Kimi Code that it finds:

```
git clone https://github.com/Signal-37/s37-kit.git
sh s37-kit/install.sh
```

The README lists the other ways. Installed or fetched, the instructions in each check are the same.

## Limits

- A check tells you what it found and what it could not check. None of them certifies a document as correct. A clean pass means no problem of that kind was found, never that none exists.
- A check can also report a finding in a sound document. Treat one finding as a place to look, not as a verdict.
- This file fetches each check from this repository's `main` branch, so an assistant follows whatever is there at that moment.
- The full list is in the README.

Licensed CC BY-SA 4.0. See LICENSE and NOTICE.
