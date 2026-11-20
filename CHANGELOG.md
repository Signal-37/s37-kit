# Changelog

Commit hashes are in brackets. They point to the history before 0.1.0, which is kept privately. The public repository starts at 0.1.0 with a single commit. Versions are numbered MAJOR.MINOR.PATCH: the middle number rises for a new check or a change in behaviour, the last for wording fixes, and 1.0.0 marks committed stable behaviour.

## Releases

### 0.1.1, 2026-11-20: documents say the Kit is released and public

- The README, `SUPPORT.md`, `GOVERNANCE.md`, `LICENSING.md` and this changelog said the Kit had no versioned release. They now say it is released.
- The README, `SUPPORT.md` and `manifest.md` said the zero-install URLs worked only for people with access to a private repository. That sentence is removed. The repository is public.
- `LICENSING.md` records 0.1.0 and 0.1.1 in its Releases section.
- Changes documents only. The checks, the installer and the tests are unchanged.

### 0.1.0, 2026-11-20: release documents, installer, tests

- The first public release.
- `install.sh` installs the Verification Kit into every supported agent it finds: Claude Code, Codex, Gemini CLI and Kimi Code. `sh install.sh --uninstall` removes it. One agent failing does not stop the others; the summary says what happened in each.
- The plugin files for Codex (`.codex-plugin/plugin.json`, `.agents/plugins/marketplace.json`) and Gemini CLI (`gemini-extension.json`) are added. The plugin is `s37-kit` in every agent.
- Each check's `SKILL.md` states its licence in its frontmatter.
- Adds a test suite (`tests/`), CI on Linux and macOS, and a test report generator (`scripts/test-report.ts`). Code is Apache-2.0 (`LICENSE-CODE`).
- The plugin version comes from one file, `VERSION`.
- README: a clearer opening, the install paths, Limits, Supported models and a list of files.
- Adds `SECURITY.md`, `SUPPORT.md`, `CONTRIBUTING.md`, `GOVERNANCE.md` and this changelog.
- Supported models: the release test of 2026-11-12 on Claude Sonnet 5.5, Claude Opus 5.5 and Claude Fable 5.2 in Claude Code, and in Codex. The earlier text named models that are no longer current.
- Limits now say that a check can report a finding in a sound document, and that three checks vary between identical runs on one. It was stated only under Supported models.
- The word-list waivers file and the NOTICE no longer describe the author's own build.
- `manifest.md` uses the README's own description of each check, shows the installer, and repeats the limits that apply to it.
- `prediction-log` now says where the log lives: the file the user names, or `predictions.md` in the project's folder. It used to say only "one markdown file".
- Renamed the S37 Verification Kit. The marketplace is now `s37-verification-kit`, so it no longer clashes with the S37 Learning Loop's `s37`; install with `claude plugin install s37-kit@s37-verification-kit`.
- The plugin file names the author as Joshua Shane and the licence as CC BY-SA 4.0.
- Corrects the off-script-check description in the manifest and NOTICE, and a count in the quickstart.

## Pre-release

Builds before 0.1.0.

### 2026-09-28: credit

- Rafael Kaufmann is credited once in `NOTICE`, and with one line in each of the four checks adapted from his explanation-quality checks: `claim-to-source`, `off-script-check`, `adversarial-pass` and `specificity-check`. `adversarial-pass` gains the credit it lacked, and `prediction-log` no longer names him [a6ead9f].

### 2026-09-25: licensing

- `LICENSE` is now the full CC BY-SA 4.0 legal text. Joshua Shane is the sole copyright holder. The licence map in `LICENSING.md` matches the rest of the S37 release: code Apache-2.0, the learning loop AGPL-3.0 [3fd95d7].

### 2026-09-16: licence files and the zero-install manifest

- Adds `LICENSE`, `NOTICE` and `LICENSING.md`, under CC BY-SA 4.0 [8a12a9c, 37c4425].
- Adds `manifest.md`: use the checks in any chat session with nothing installed [4f94a69].
- Adds `.kit-waivers`, a build file [15d42d9].

### 2026-08-10

- Fixed: a duplicate "What this does not do" heading in `attested-deliverable` [b047916].

### 2026-08-06: off-script-check, the marketplace and scaffolding

- Adds `off-script-check`, the sixth check: ask the document questions it was not written to answer [8076878].
- The repository is installable as a single-plugin marketplace [153078a].
- Adds `scaffolding.md`, the guide to keeping the ground under the model in order [90398b0].

### 2026-08-05: first build

- Five checks as a Claude Code plugin, version 0.1.0 in `plugin.json`: `claim-to-source`, `specificity-check`, `adversarial-pass`, `attested-deliverable` and `prediction-log`, with the quickstart. No hooks, monitors or binaries [faa9533].
- Provenance lines: `claim-to-source` credits Rafael Kaufmann, and `prediction-log` names the forecasting tradition it comes from [fdbf131].
