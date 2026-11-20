#!/bin/sh
# Install the S37 Verification Kit (six checks) into every supported agent on this machine:
# Claude Code, Codex, Gemini CLI and Kimi Code.
#
#   sh install.sh              install or update the Verification Kit in each agent found
#   sh install.sh --uninstall  remove it from each agent
#   --yes                      answer the agents' own install prompts (for scripted runs only;
#                              interactively, you answer Gemini's folder-trust prompt yourself)
#
# Each agent does its own installing (`claude plugin`, `codex plugin`, `gemini extensions`), so
# this script never edits their settings. Kimi Code reads skills from a folder, so the checks are
# copied there, each with a marker file: uninstall removes only the folders this script put there,
# and install never overwrites a skill of yours with the same name.
#
# Run from a clone, it installs that clone. Run from anywhere else, Claude Code and Codex install
# from GitHub, and Gemini CLI and Kimi Code are skipped, because they install from files on disk.
# One agent failing does not stop the others. The summary at the end says what happened in each,
# and the exit status is non-zero if any agent failed. Nothing here needs bun or node.
set -u

REPO="Signal-37/s37-kit"
MARKET="s37-verification-kit"
PLUGIN="s37-kit"
LOOP_URL="https://github.com/Signal-37/s37-learning-loop"
KIMI_MARKER=".installed-by-s37"

say() { printf '%s\n' "$*"; }
warn() { printf 's37-kit install: %s\n' "$*" >&2; }

mode=install; yes=false
for a in "$@"; do
  case "$a" in
    --uninstall) mode=uninstall ;;
    --yes) yes=true ;;
    -h|--help) sed -n '2,8p' "$0" | sed 's/^# \{0,1\}//'; exit 0 ;;
    *) warn "unknown option: $a (use --uninstall, --yes or --help)"; exit 2 ;;
  esac
done

here=$(cd "$(dirname "$0")" 2>/dev/null && pwd || echo "")
if [ -n "$here" ] && [ -f "$here/.claude-plugin/marketplace.json" ] && [ -d "$here/skills" ]; then
  checkout="$here"; source="$here"
else
  checkout=""; source="$REPO"
fi
kimi_skills="${KIMI_CODE_HOME:-$HOME/.kimi-code}/skills"

have() { command -v "$1" >/dev/null 2>&1; }
summary=""; failed=0; installed_any=false
record() {   # $1 = agent, $2 = what happened
  summary="$summary
  $1: $2"
}

# Every check reads the agent's JSON output or its documented folders, never a human-readable
# listing (Gemini's listing starts each line with a glyph that broke a pattern match once).
claude_installed() { claude plugin list --json 2>/dev/null | grep -qE "\"id\": *\"$PLUGIN@$MARKET\""; }
claude_market() { claude plugin marketplace list --json 2>/dev/null | grep -qE "\"name\": *\"$MARKET\""; }
codex_installed() { codex plugin list --json 2>/dev/null | grep -qE "\"pluginId\": *\"$PLUGIN@$MARKET\""; }
codex_market() { codex plugin marketplace list --json 2>/dev/null | grep -qE "\"name\": *\"$MARKET\""; }
gemini_installed() { [ -d "$HOME/.gemini/extensions/$PLUGIN" ]; }

# ── install legs: each prints what it did and returns 0 (done), 1 (failed) or 2 (skipped) ──

claude_install() {
  if claude_market; then
    claude plugin marketplace update "$MARKET" >/dev/null || { warn "Claude Code: couldn't update the $MARKET marketplace"; return 1; }
  else
    claude plugin marketplace add "$source" >/dev/null || { warn "Claude Code: couldn't add the marketplace from $source"; return 1; }
  fi
  if claude_installed; then
    claude plugin update "$PLUGIN@$MARKET" >/dev/null 2>&1 || true
    verb=updated
  else
    claude plugin install "$PLUGIN@$MARKET" >/dev/null || { warn "Claude Code: couldn't install $PLUGIN"; return 1; }
    verb=installed
  fi
}

codex_install() {
  if codex_market; then
    # Only a Git-backed marketplace can be upgraded; a local one (a clone) is read in place.
    if codex plugin marketplace list --json 2>/dev/null | grep -qE '"sourceType": *"git"'; then
      codex plugin marketplace upgrade "$MARKET" >/dev/null 2>&1 || { warn "Codex: couldn't update the $MARKET marketplace"; return 1; }
    fi
  else
    codex plugin marketplace add "$source" >/dev/null 2>&1 || { warn "Codex: couldn't add the marketplace from $source"; return 1; }
  fi
  if codex_installed; then
    codex plugin add "$PLUGIN@$MARKET" >/dev/null 2>&1 || true
    verb=updated
  else
    codex plugin add "$PLUGIN@$MARKET" >/dev/null 2>&1 || { warn "Codex: couldn't install $PLUGIN"; return 1; }
    verb=installed
  fi
}

gemini_install() {
  [ -n "$checkout" ] || { skip_reason="run this script from a clone of $REPO; Gemini CLI installs extensions from a folder"; return 2; }
  # Gemini copies the folder it installs from, so it gets a folder with only what the extension
  # needs, not the whole clone with its tests.
  stage=$(mktemp -d 2>/dev/null) || { warn "Gemini CLI: couldn't make a temporary folder"; return 1; }
  mkdir "$stage/$PLUGIN" && cp "$checkout/gemini-extension.json" "$checkout/LICENSE" "$checkout/LICENSING.md" "$checkout/NOTICE" "$stage/$PLUGIN/" \
    && cp -R "$checkout/skills" "$stage/$PLUGIN/skills" || { rm -rf "$stage"; warn "Gemini CLI: couldn't prepare the extension folder"; return 1; }
  if gemini_installed; then gemini extensions uninstall "$PLUGIN" < /dev/null >/dev/null 2>&1 || true; verb=updated; else verb=installed; fi
  if $yes; then printf 'y\n' | gemini extensions install "$stage/$PLUGIN" --consent >/dev/null 2>&1; rc=$?
  else gemini extensions install "$stage/$PLUGIN"; rc=$?; fi
  rm -rf "$stage"
  [ "$rc" -eq 0 ] && gemini_installed || { warn "Gemini CLI: couldn't install $PLUGIN"; return 1; }
}

kimi_install() {
  [ -n "$checkout" ] || { skip_reason="run this script from a clone of $REPO; Kimi Code reads skills from a folder"; return 2; }
  for d in "$checkout"/skills/*/; do
    name=$(basename "$d")
    if [ -d "$kimi_skills/$name" ] && [ ! -f "$kimi_skills/$name/$KIMI_MARKER" ]; then
      warn "Kimi Code: you already have a skill named $name that this installer didn't put there; nothing was changed for Kimi. Rename or remove it, then run this again."
      return 1
    fi
  done
  mkdir -p "$kimi_skills" || { warn "Kimi Code: couldn't create $kimi_skills"; return 1; }
  verb=installed
  for d in "$checkout"/skills/*/; do
    name=$(basename "$d")
    [ -d "$kimi_skills/$name" ] && verb=updated
    rm -rf "$kimi_skills/$name" && cp -R "$d" "$kimi_skills/$name" && : > "$kimi_skills/$name/$KIMI_MARKER" \
      || { warn "Kimi Code: couldn't copy $name"; return 1; }
  done
}

# ── uninstall legs ──

claude_uninstall() {
  verb="nothing to remove"
  if claude_installed; then claude plugin uninstall "$PLUGIN@$MARKET" >/dev/null || { warn "Claude Code: couldn't remove $PLUGIN"; return 1; }; verb=removed; fi
  if claude_market; then claude plugin marketplace remove "$MARKET" >/dev/null || { warn "Claude Code: couldn't remove the $MARKET marketplace"; return 1; }; verb=removed; fi
}

codex_uninstall() {
  verb="nothing to remove"
  if codex_installed; then codex plugin remove "$PLUGIN@$MARKET" >/dev/null 2>&1 || { warn "Codex: couldn't remove $PLUGIN"; return 1; }; verb=removed; fi
  if codex_market; then codex plugin marketplace remove "$MARKET" >/dev/null 2>&1 || { warn "Codex: couldn't remove the $MARKET marketplace"; return 1; }; verb=removed; fi
}

gemini_uninstall() {
  verb="nothing to remove"
  if gemini_installed; then
    gemini extensions uninstall "$PLUGIN" < /dev/null >/dev/null 2>&1
    gemini_installed && { warn "Gemini CLI: couldn't remove $PLUGIN"; return 1; }
    verb=removed
  fi
}

kimi_uninstall() {
  verb="nothing to remove"
  [ -d "$kimi_skills" ] || return 0
  n=0
  for d in "$kimi_skills"/*/; do
    [ -f "$d$KIMI_MARKER" ] || continue
    rm -rf "$d" || { warn "Kimi Code: couldn't remove $d"; return 1; }
    n=$((n + 1))
  done
  [ "$n" -gt 0 ] && verb="removed ($n checks)"
  return 0
}

# ── run each leg for each agent found ──

run_leg() {   # $1 = display name, $2 = command, $3 = leg function
  if ! have "$2"; then record "$1" "not found"; return; fi
  verb=""; skip_reason=""
  "$3"; rc=$?
  case "$rc" in
    0) record "$1" "$verb"; [ "$mode" = install ] && installed_any=true ;;
    2) record "$1" "skipped: $skip_reason" ;;
    *) record "$1" "FAILED (see the message above)"; failed=$((failed + 1)) ;;
  esac
}

if ! have claude && ! have codex && ! have gemini && ! have kimi; then
  say "No supported agent found: none of Claude Code (claude), Codex (codex), Gemini CLI (gemini) or"
  say "Kimi Code (kimi) is installed or on your PATH. Nothing was changed. Install one, then run this again."
  [ "$mode" = install ] && { say ""; say "The S37 Learning Loop: $LOOP_URL"; }
  exit 0
fi

run_leg "Claude Code" claude "claude_$mode"
run_leg "Codex" codex "codex_$mode"
run_leg "Gemini CLI" gemini "gemini_$mode"
run_leg "Kimi Code" kimi "kimi_$mode"

if [ "$mode" = uninstall ]; then
  say "S37 Verification Kit, uninstall:$summary"
else
  say "S37 Verification Kit ($PLUGIN), install:$summary"
  if $installed_any; then
    say ""
    say "Start a new session, then ask the agent to run claim-to-source on a document you have not acted on yet."
  fi
  say ""
  say "The S37 Learning Loop: $LOOP_URL"
fi
[ "$failed" -eq 0 ] || exit 1
exit 0
