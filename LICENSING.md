# Licensing

Copyright (c) 2026 Joshua Shane. Revised 2026-10-20.

The Verification Kit's content ships under **CC BY-SA 4.0** (`LICENSE`), and its code under **Apache-2.0** (`LICENSE-CODE`). This file says which files take which licence, records why, and how that relates to the other licences in the S37 release.

## Which files take which licence

| Path | What it is | Licence |
|---|---|---|
| `skills/` | The six checks | CC BY-SA 4.0 |
| The Markdown files at the root | The guides and the documentation | CC BY-SA 4.0 |
| `.claude-plugin/`, `.codex-plugin/`, `.agents/`, `gemini-extension.json` | The files that describe the plugin to each agent | CC BY-SA 4.0 |
| `install.sh` | The installer | Apache-2.0 |
| `tests/` | The test suite | Apache-2.0 |
| `scripts/` | The test report generator | Apache-2.0 |
| `.github/` | The CI workflow | Apache-2.0 |

Each check's `SKILL.md` also states its licence in its frontmatter, so a check copied out on its own still carries its terms.

## Why a content licence, and why share-alike

The Checks are prose: method, not machinery. They carry no runtime, no dependencies and no code to lift, so a software licence would be the wrong instrument. A content licence with **share-alike** keeps derivative method packs open, which matters because a verification method gets more valuable when other people extend it in public rather than folding it into something closed. Share-alike doesn't restrict commercial use: a team running these Checks internally is unconstrained, because internal use isn't distribution. The constraint applies only to redistributing derivatives.

The posture behind this is adoption rather than protection. Nothing in this Kit is durably proprietary, and the advantage is better spent on authorship and practice than held in reserve.

## The map across the release

Licences are assigned by artifact type, not by subject, and where a file could be read either way the licence follows its function, not its extension. This structure follows J. Scott King's licensing for the SynthesisLadder (ruled 2026-08-08).

| What | Licence |
|---|---|
| **This Kit**: the Checks and their documentation | **CC BY-SA 4.0** |
| Other method content and documentation in the release | CC BY-SA 4.0 |
| Code: the kernel, installers, guard and leak-scan tooling | Apache-2.0, for its explicit patent grant |
| The S37 Learning Loop, every file in it | AGPL-3.0, because it's the one component someone could plausibly run as a hosted service without contributing back |
| Standalone written discipline (whitepaper, surveys, practice record) | CC BY 4.0 |
| J. Scott King's components, including the synthesis ladder | His own terms, in his own LICENSING and NOTICE |

The checks themselves contain no code. They are invoke-only by design, with no hooks, monitors or binaries. The code in this repository installs and tests them and is Apache-2.0, as the table at the top says.

## Retained rights

The copyright holder is **Joshua Shane, individually**. These public licences are non-exclusive, so they don't exhaust his rights: he can grant different terms directly, in parallel. If a licence here doesn't fit your situation, ask. The public licence is the floor, not the ceiling.

## Attribution

CC BY-SA 4.0 requires attribution. Credit **"The S37 Verification Kit, Joshua Shane"** with a link to the licence and a note of any changes. Adaptations carry CC BY-SA 4.0 forward. `NOTICE` holds the authorship and provenance record.

## Version and scope

These terms attach to the Verification Kit as distributed, identified by the version it carries. Public licences are irrevocable for the copies released under them: a copy received under these terms stays under them. Later releases may carry different terms, so always cite the version you received.

## Releases

Append-only. The authoritative record of which release shipped under which terms.

Copies built after these terms were adopted but before the first versioned release are pre-release builds, and the grant in this document applies to them.

- **0.1.0**, released 2026-11-20. The first public release. Content under CC BY-SA 4.0, code under Apache-2.0, as this document assigns them.
- **0.1.1**, released 2026-11-20. Content under CC BY-SA 4.0, code under Apache-2.0, as this document assigns them. Changes documents only.
