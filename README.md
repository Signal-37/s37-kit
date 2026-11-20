# The S37 Verification Kit

The S37 Verification Kit is six standalone checks that make AI-assisted work inspectable. Each check is a set of instructions an AI assistant follows against a document you already have, and each reports what it found and what it did not cover. Each runs on its own: none needs the others, a corpus, or any other part of S37.

First released 2026-11-20 as 0.1.0. `VERSION` holds the current version. Before you rely on it, read the [Limits](#limits).

## What's in the Verification Kit

Two things, each useful alone:

- **Six checks** that make AI-assisted work inspectable. Start with the [quickstart](quickstart.md).
- **[Scaffolding](scaffolding.md):** keeping the ground under the model in order, so what comes out is traceable to what went in.

| Check | What it does |
|---|---|
| `claim-to-source` | Traces every load-bearing claim back to a source and tags each one verified, unverified, contradicted or hand-set, with a list of what could not be checked. |
| `specificity-check` | Substitutes plausible alternative values into the conclusions and re-reads the reasoning, to show whether the precision was earned. |
| `off-script-check` | Asks the document questions it was not written to answer, and reports whether the answers follow from what it states or would have to be invented. |
| `adversarial-pass` | Argues the opposite of the document's conclusion using only the document's own evidence, and counts what breaks. |
| `attested-deliverable` | A format, not a check: produces or retrofits a document that carries its own evidence table, tags on unconfirmed claims, and a section on what was not checked. |
| `prediction-log` | Records what you expect before you act and what would prove you wrong, so you can go back later and see where your judgement runs high or low. |

If you are unsure where to start, run `claim-to-source` on a document your team produced with AI help and has not yet acted on.

## Install

There are five ways to get the checks. The instructions in each check are the same in all of them.

### Into every agent you have

From a clone of this repository:

```
git clone https://github.com/Signal-37/s37-kit.git
sh s37-kit/install.sh
```

The installer looks for Claude Code, Codex, Gemini CLI and Kimi Code and installs the Verification Kit into each one it finds, as the plugin `s37-kit`. Each agent does its own installing, except Kimi Code, whose skills folder the installer copies the checks into. It never overwrites a Kimi skill of yours with the same name. If one agent fails, the others still install, and the summary at the end says what happened in each. It needs only a POSIX shell. `sh s37-kit/install.sh --uninstall` removes the Verification Kit from each agent. `--yes` answers the agents' own prompts, for scripted runs.

### With nothing installed

Paste [`manifest.md`](manifest.md) into a chat assistant, or point it at the file, and say "Fetch the required files below and follow them." The manifest lists a raw URL for each check, so you can fetch only the one you need.

### Into an agent's skills folder

Each check is a folder under `skills/` with a `SKILL.md`, for agents that read the Agent Skills standard. Copy the folders you want into your agent's skills folder. For Claude Code, that is `~/.claude/skills/`:

```
git clone https://github.com/Signal-37/s37-kit.git
cp -R s37-kit/skills/* ~/.claude/skills/
```

`cp` replaces a folder of the same name if one is already there. Check first if you have a skill of your own with the same name as a check.

### As a Claude Code plugin

```
claude --plugin-dir /path/to/s37-kit
```

The repository is also a single-plugin marketplace. `.claude-plugin/marketplace.json` names the marketplace `s37-verification-kit` and the plugin `s37-kit`:

```
claude plugin marketplace add Signal-37/s37-kit
claude plugin install s37-kit@s37-verification-kit
```

### With the S37 Learning Loop

The S37 Learning Loop is a separate S37 product: https://github.com/Signal-37/s37-learning-loop. Its installer offers to install this Kit as well, by running the installer above.

## Limits

- A check tells you what it found and what it could not check. None of them certifies a document as correct. A clean pass means no problem of that kind was found, never that none exists.
- The checks do not tell you whether a claim is true, do not fix anything, and do not replace someone who knows the subject. The four checks that examine a document tell the agent to report and not to repair it.
- The checks are instructions, not programs. How well they work depends on the model that carries them out; see [Supported models](#supported-models).
- A check can report a finding in a sound document. The checks are told to look hard and to distrust a clean result. For the three that turn on judgement (`adversarial-pass`, `specificity-check` and `off-script-check`), the result on a sound document varied between identical runs in testing. Treat one finding as a place to look, not as a verdict. Where it matters, run the check again.
- The checks run only when an agent follows them. They have no hooks or programs. The repository's code (the installer, the tests, the test report generator and the CI workflow) installs and tests the checks. Claude Code and Codex keep a copy of the whole repository when they install the plugin, including that code, but neither runs it. An agent may still load a check without being asked by name when your request matches the check's description.
- `claim-to-source` and the live mode of `off-script-check` need the underlying sources. Where a source cannot be reached, `claim-to-source` records it as unchecked, not verified, and `off-script-check` says the live pass was not available.
- On a document with more than roughly forty load-bearing claims, `claim-to-source` checks the highest-consequence twenty and names the ones it did not reach.
- `prediction-log` tells you little from a single entry. The pattern it is for shows only after many entries have been checked against what happened.
- The tests check the installer, the plugin files for each agent, the licence terms, and that every zero-install URL points at a file in this repository. Nothing here tests what a check finds when an agent runs it.
- The zero-install manifest fetches each check from a GitHub raw URL on this repository's `main` branch, so an assistant follows whatever is there at that moment.

## Supported models

The checks are instructions the model carries out, so how well they work depends on the model. They are designed for the top tiers of Claude models as of November 2026. Smaller models, such as Claude Haiku 5.5, have not been tested with the Verification Kit and are not supported.

Each version gets an automated release test. Every check runs on a document with planted defects and on a clean twin that must not trip it. For the three checks that turn on judgement (`adversarial-pass`, `specificity-check` and `off-script-check`) the clean twin's result varies between identical runs, so it is scored as the majority of three runs.

On 2026-11-12 the test ran in Claude Code on Claude Sonnet 5.5, Claude Opus 5.5 and Claude Fable 5.2. On each, every check caught its planted defects and held on its clean twin. It also ran in Codex with Codex's own default model, which the test doesn't record. There, two clean-twin cases failed on the first run and passed when rerun. In one of them Codex said it had written the deliverable and had not.

`claim-to-source` was also tested inside the S37 Practice Skills, on Claude Sonnet 5 and Claude Opus 5.5, on 2026-11-03.

## Roadmap

These are plans, and they will change. None of it is built yet; what gets built, and in what order, follows what testing and use show matters most.

- **The same verdict every time on a sound document.** For `adversarial-pass`, `specificity-check` and `off-script-check`, the result on a sound document varied between identical runs in testing. The aim is a result that holds from run to run.
- **Tests of what the checks find.** Today's tests cover the installer, the plugin files for each agent, the licence terms and the zero-install links. Next, a published test that runs each check on documents with planted defects and on their sound twins, and checks the verdicts.
- **The zero-install route pinned to a release.** The manifest fetches each check from the `main` branch at that moment. Next, it fetches the release you chose.
- **Long documents checked in full.** On a document with more than about forty load-bearing claims, `claim-to-source` checks the highest-consequence twenty and names the rest. Next, it covers them all.

## Files

```
skills/<check>/SKILL.md     the six checks
quickstart.md               where to start, and an order that works
manifest.md                 the zero-install path
scaffolding.md              the scaffolding guide
install.sh                  the installer for Claude Code, Codex, Gemini CLI and Kimi Code
tests/, scripts/, .github/  the tests, the test report generator and the CI workflow
VERSION                     the plugin version, used in every agent's plugin file
LICENSE, LICENSING.md       the content licence text, and which files take which licence
LICENSE-CODE                the code licence text (Apache-2.0)
NOTICE                      authorship, attribution and provenance
SECURITY.md                 what the checks touch, and how to report a problem
SUPPORT.md                  what it's tested on, and how to get help
CONTRIBUTING.md             issues and sign-off
GOVERNANCE.md               who decides what
CHANGELOG.md                release history
```

## Licence

The Verification Kit's content is licensed under CC BY-SA 4.0 and its code under Apache-2.0. Copyright (c) 2026 Joshua Shane. Credit "The S37 Verification Kit, Joshua Shane" with a link to the licence and a note of any changes. See [LICENSING.md](LICENSING.md) and [NOTICE](NOTICE).
