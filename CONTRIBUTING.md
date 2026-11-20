# Contributing

Thank you for wanting to help. For now we take issues, not pull requests. The Verification Kit has one author, Joshua Shane, and changes go through him. The files in this repository are also generated from the author's master copy (see `.generated`), so a change made here directly would be overwritten at the next build.

## Opening an issue

Useful issues say:

- which check, or which other file;
- how you used it: `install.sh` (and into which agent), the zero-install path, a skills folder, the plugin, or through the S37 Learning Loop's installer;
- the agent and the model you ran it with;
- what kind of document you ran it on, what came back, and what you expected, with anything sensitive removed or replaced;
- whether you can reproduce it.

A wrong result is the most useful report we can get: a claim tagged verified that the source does not support, a conclusion called reversible that the document's facts do establish, a clean pass on a document with a known problem.

## Text you propose

If an issue includes text you'd like us to use, you certify the [Developer Certificate of Origin](https://developercertificate.org/): that you wrote it, or have the right to contribute it, under the Verification Kit's licence: CC BY-SA 4.0 for the checks and documentation, Apache-2.0 for code (the installer, tests, scripts and CI workflow). `LICENSING.md` says which files take which licence, and why.

Add a line to the issue:

```
Signed-off-by: Your Name <you@example.com>
```

If we later accept patches, each commit will need the same sign-off (`git commit -s`).

## Tests

If you report a problem with the installer, it helps to say what `bun test` reports on your machine, run from a clone. The tests install into throwaway folders, not your own agent settings. CI runs the same tests on Linux and macOS on every push; a test that is skipped is listed with its reason in `TEST-REPORT.md`, where present.

## Security problems

Don't open a public issue for a vulnerability. Report it privately, as `SECURITY.md` says.
