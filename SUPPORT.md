# Support

The S37 Verification Kit is a pre-release. There is no versioned release yet, no service-level commitment, and no paid support. Help is best effort. Questions, bugs and suggestions go in the repository's issues; see `CONTRIBUTING.md`. Security problems go privately, as `SECURITY.md` says.

## What it's tested on

The tests in `tests/` run with `bun test`, and CI runs them on Linux and macOS on every push. They check:

- the installer, through the real Claude Code, Codex and Gemini CLI commands, in throwaway config folders: install, a second run that updates, and uninstall. Kimi Code is tested with a stand-in command, because the installer only copies files into its skills folder;
- the installer's own behaviour with stand-in agents: it carries on past an agent that fails, exits non-zero when one did, exits 0 when no agent is found, and never overwrites a Kimi skill of yours;
- the plugin files for each agent (same name, same version), the licence terms, and that every zero-install URL points at a file in this repository.

Nothing here tests what a check finds when an agent runs it. `TEST-REPORT.md`, where present, is generated from a CI run and gives its counts and skips; `scripts/test-report.ts` writes it.

### Models

The checks are instructions the model carries out, so how well they work depends on the model. They are designed for the top tiers of Claude models as of November 2026.

| Model | All six checks |
|---|---|
| Claude Sonnet 5.5 | Passed the release test in Claude Code, 2026-11-12. |
| Claude Opus 5.5 | Passed the release test in Claude Code, 2026-11-12. |
| Claude Fable 5.2 | Passed the release test in Claude Code, 2026-11-12. |
| Codex's default model (not recorded by the test) | Two clean-document cases failed on the first run and passed when rerun, 2026-11-12. |
| Claude Haiku 5.5 and other smaller models | Not tested. Not supported. |
| Other models | Not tested. |

The release test runs every check on a document with planted defects and on a clean twin; the README's "Supported models" section says how it is scored.

### Agents

| How you use it | Status |
|---|---|
| Claude Code, as a skill | `claim-to-source` was tested in Claude Code sessions on macOS, inside the S37 Practice Skills. |
| Claude Code, Codex, Gemini CLI, through `install.sh` | Installing, updating and uninstalling are tested in CI on Linux and macOS. Running a check inside these agents is not tested here. |
| Kimi Code, through `install.sh` | Copying the checks into Kimi's skills folder, and removing them, is tested with a stand-in `kimi` command. Kimi itself is not tested here. |
| Other agents that read the Agent Skills standard | Expected to work, because each check is a plain folder with a `SKILL.md`. Not tested here. |
| Any chat assistant, through `manifest.md` | Not tested here. The assistant needs to be able to fetch a URL, or you paste the checks in. |

### Platforms

The checks are text and need no particular operating system. `install.sh` and the install commands in the README need a POSIX shell with `git` and `cp`; the installer is tested on Linux and macOS. Running the tests needs [bun](https://bun.sh).

## Requirements

- For the zero-install path: a chat assistant and the `manifest.md` URL. While the repository is private, the raw URLs work only for people with access to it.
- For the skills-folder path: an agent that loads skills from a folder.
- For the plugin path: Claude Code.
- For `install.sh`: at least one of Claude Code, Codex, Gemini CLI or Kimi Code, on your PATH. Gemini CLI and Kimi Code are installed only when the script runs from a clone.
