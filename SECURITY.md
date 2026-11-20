# Security

## What the Verification Kit is

Six checks written as instructions for an AI agent, and a guide. The checks are Markdown. They contain no scripts, programs, hooks or binaries, and nothing in them opens a network connection, runs on its own, or sends data anywhere.

The repository also holds code that installs and tests the checks: `install.sh`, the tests in `tests/`, a test report generator in `scripts/`, and a CI workflow in `.github/`. Only `install.sh` is meant for you to run; see "The installer" below. The agent you use the checks in, and the model behind it, are where your documents go; their terms govern that, not the Verification Kit's.

## What the checks read and write

The checks run nothing and write nothing themselves. An agent that follows one uses its own tools and its own permissions. The table says what each check tells the agent to read and to produce. No check names a command, a file path or a network address. Which files and systems the agent touches depends on the document and on the access you give the agent.

| Check | Tells the agent to read | Tells the agent to produce |
|---|---|---|
| `claim-to-source` | The document, and for each load-bearing claim the source it cites or implies: "Read the passage, run the arithmetic, open the file, query the data." | A report: an attestation table, quoting the sources where it matters, and a list of what was not checked. It tells the agent never to repair the document while checking it. |
| `specificity-check` | The document only. Arithmetic on the document's own stated inputs is in scope; outside data is not. | A report. It tells the agent not to repair the document. |
| `off-script-check` | The document only, and not the agent's own knowledge. Optionally, where you still have the underlying material and the tool that produced the document, it has the agent put its questions to that tool against the same sources. | A report. It tells the agent not to repair the document. |
| `adversarial-pass` | The document only. No outside sources or research. | A report. It tells the agent not to repair the document. |
| `attested-deliverable` | The draft or finished document. For each load-bearing claim, it has the agent name what produced it, specific enough to re-check. | The document itself, with an attestation table, inline `[UNVERIFIED]` tags and a residuals section. In retrofit mode these are added to a finished document, and the agent is told not to rewrite its argument. |
| `prediction-log` | Its log file. | One Markdown file, added to over time. An entry is not edited after the fact, except to fill in what happened. |

`scaffolding.md` is a guide for people. It tells an agent to do nothing.

### The plugin files

`.claude-plugin/` (Claude Code), `.codex-plugin/` and `.agents/plugins/` (Codex), and `gemini-extension.json` (Gemini CLI) describe the plugin: its name, description, version and author. They declare no hooks, commands, agents or servers. Installed as a plugin, the Verification Kit adds the six checks as skills and nothing else. Claude Code and Codex keep a copy of the whole repository, including the code, but they do not run it.

### The installer

`install.sh` runs each agent's own install commands (`claude plugin`, `codex plugin`, `gemini extensions`) and does not edit their settings files. For Gemini CLI it copies the extension's files to a temporary folder, hands that folder to Gemini, and deletes it. For Kimi Code it copies each check into Kimi's skills folder (`$KIMI_CODE_HOME/skills`, by default `~/.kimi-code/skills`) with a marker file, removes only folders with that marker on uninstall, and stops without changing anything for Kimi if you already have a skill with a check's name. Run outside a clone, Claude Code and Codex fetch the Verification Kit from GitHub. The installer itself downloads nothing else and sends nothing anywhere. Read it before you run it.

### The tests and CI

The tests run only when you run `bun test`. They install into throwaway folders, never your own agent settings. CI runs them on GitHub's hosted runners with read-only access to the repository.

### When a check loads

Each check's description says when to use it. An agent that chooses skills by description may load a check when your request matches, without your naming it.

### The zero-install path

`manifest.md` has an assistant fetch each check from `raw.githubusercontent.com`, from this repository's `main` branch.

## What it protects, and what it doesn't

The checks make a document's support visible: where its claims came from, what its reasoning established, and what was not checked. They are not a security control, and a check that finds nothing has not shown the document is correct.

## Residual risks

These are known and not closed.

- An agent following `claim-to-source` may open files, follow citations or query systems to reach a source. It does so with whatever access you have given it. Decide that access before you run the check.
- `claim-to-source` reports quote the sources they checked. Share a report only as far as you would share its sources.
- A prediction log can hold your estimates and the reasons for them. It is a plain Markdown file wherever you keep it.
- The zero-install path is fetched live from the `main` branch, so what an assistant follows is whatever is there at that moment.
- Nothing in the Verification Kit is signed. Plugin installs come from a clone or from GitHub through the agent's own plugin system.
- `install.sh` runs with your permissions and calls whichever `claude`, `codex`, `gemini` and `kimi` commands are first on your PATH.

## Reporting a vulnerability

Report it privately to Joshua Shane at joshua@s37.ai, not in a public issue. Say which check or file is affected, how you were using it (through `install.sh`, copied into a skills folder, as a plugin, or through the zero-install path), the agent and model, and what happened. Remove anything sensitive from documents or reports first.
