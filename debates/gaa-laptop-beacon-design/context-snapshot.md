# Context snapshot — gaa as it exists today

This is the state of the Guardian Angel Agent (gaa) repo that the proposed
change has to fit into. Read this before arguing — especially the launchd
plist (so you know when gaa fires), the current prompts (so you know the
tone and output shape), and the tool-permission string in `gaa.sh` (so you
know what Claude-on-the-desktop is and isn't allowed to do).

---

## `~/Code_2026/gaa/gaa.sh`

```bash
#!/usr/bin/env bash
# gaa — Guardian Angel Agent
# Surveys all repos in ~/Code_2026, writes a report, posts to Telegram.
set -euo pipefail

GAA_DIR="$(cd "$(dirname "$0")" && pwd)"
CODE_DIR="$(dirname "$GAA_DIR")"
DATE="$(date +%Y-%m-%d)"
mkdir -p "$GAA_DIR/reports"
REPORT="$GAA_DIR/reports/report-${DATE}.md"

# Load mopsus env for Telegram credentials
MOPSUS_ENV="$CODE_DIR/mopsus/env"
if [[ -f "$MOPSUS_ENV" ]]; then
  set -a
  source "$MOPSUS_ENV"
  set +a
fi

# Build the prompt from soul + situation + today's date
SOUL="$(cat "$GAA_DIR/prompts/soul.md")"
SITUATION="$(cat "$GAA_DIR/prompts/situation.md")"

PROMPT="$(cat <<EOF
${SOUL}

---

${SITUATION}

---

Today is ${DATE}, it is $(date +%H:%M) on host $(hostname). Begin your survey. Write your report to ${REPORT}.
EOF
)"

# Run claude headless with restricted tools
claude \
  --dangerously-skip-permissions \
  --allowedTools "Read,Glob,Grep,Bash(git *),Bash(ls *),Bash(date *),Bash(wc *),Write(${GAA_DIR}/reports/*)" \
  --print \
  --output-format text \
  -p "$PROMPT" \
  2>"$GAA_DIR/reports/gaa-${DATE}.err.log"

# Post to Telegram if report was generated and credentials exist
# [... curl POST to sendMessage with render_markdown_for_telegram ...]
```

Key properties:

- `WorkingDirectory` on the plist is `/Users/v/Code_2026` (the parent of gaa).
- Claude's allowed writes are limited to `${GAA_DIR}/reports/*` — not the
  gaa repo root, not `beacons/`, not anywhere else.
- Claude is allowed `Bash(git *)`, `Bash(ls *)`, `Bash(date *)`, `Bash(wc *)`.
  It can `git fetch` and `git pull`; it cannot push.
- stderr of the claude invocation goes to `reports/gaa-${DATE}.err.log`.
- The report filename is `report-YYYY-MM-DD.md`; the morning and evening
  runs overwrite each other.

---

## `~/Code_2026/gaa/com.v.gaa.plist`

```xml
<key>StartCalendarInterval</key>
<array>
  <dict><key>Hour</key><integer>7</integer><key>Minute</key><integer>30</integer></dict>
  <dict><key>Hour</key><integer>18</integer><key>Minute</key><integer>0</integer></dict>
</array>
```

gaa fires at 07:30 and 18:00 local time on the **desktop**. Any laptop
beacon has to be fresh enough at those two moments.

---

## `~/Code_2026/gaa/prompts/soul.md`

```
You are **gaa** — the Guardian Angel Agent.

An equanimous, dutiful, old soul. A patient code gardener.

You tend to a garden of repositories. You do not rush. You do not alarm.
You observe, you note, you suggest. When a branch is overgrown you say so
plainly. When a seedling shows promise you name it. You never uproot
anything without asking.

Virtues: Patience. Equanimity. Duty. Discretion. Brevity.

Tone: dry, warm, unhurried. Wry but not sarcastic. Addresses the reader
as a colleague, not a student.
```

---

## `~/Code_2026/gaa/prompts/situation.md` (excerpted)

### Three duties: Hygiene, Review, Ideate.

### Hygiene, per repo:
- Is the working tree clean? If not, what files are dirty?
- Is it behind the remote? Ahead? Diverged?
- If behind and clean, pull. If ahead, note it (do not push without being asked).
- Are there stale branches?
- Any uncommitted work older than a week?

### Output format (Telegram-shaped, just rewritten today):

```
# gaa — <date> <time> on <hostname>

**Hygiene.** <one-line overall take>
- **repoA** — short note with `hashes` / `paths` inline
- **repoB** — …

---

**Review.** <lead-in>
- observation 1, short
- observation 2

---

**Idea.** <one suggestion, 2-4 short lines>
```

Under 500 words total. A gardener's notebook, not an audit.

### Constraints
- Read any file in any repo. Run `git` (status, fetch, pull, log, branch).
- Write only to `~/Code_2026/gaa/reports/`.
- Must not edit code/notes in any repo. Must not push to any remote.

---

## What the user actually wants added

> "is it possible for gaa to also check whether my laptop is also synched
> wrt gh (gaa runs on desktop)?"

Interpretation: gaa's current Hygiene section covers the desktop's 27 repos.
The user wants a parallel line (or short bullet list) covering the laptop —
specifically, for every repo the laptop has, **is it dirty, ahead, or behind
its tracked remote?** That's three facts per repo, plus which branch.

Not "is the laptop reachable"; not "can we SSH in"; just: **at the moment
gaa fires, where does the laptop's git state stand?**

---

## What has already been ruled out in the human-side discussion

- **SSH / Tailscale.** Too fragile — the laptop is often asleep at 07:30.
  A pull-model that requires the laptop to be awake-and-reachable when the
  desktop polls is not acceptable.

- **GitHub-side diff only** (desktop `git ls-remote`s every repo and
  compares). Blind to uncommitted work on the laptop, which is half the
  point. Rejected as insufficient.

So the debate is among **beacon transports** (options a/b/c above), and the
secondary design decisions about branch layout, cadence, staleness, and
push-race handling.

---

## Existing patterns in the user's stack (for pattern-matching)

- gaa itself is a scheduled headless Claude + file artifact + Telegram
  delivery. Any beacon pattern should feel symmetric to this.
- mopsus's dataroom already has ~16 channels each of which is "a scheduled
  collector writes to a local artifact store that the agent reads later."
  Adding a `laptop_status` channel would be the most "in-ecosystem" option.
- mopsus also publishes daily think-dispatches to Telegram; its
  markdown → Telegram HTML renderer (`render_markdown_for_telegram`) is
  what gaa uses. This is orthogonal to the beacon question but indicates
  the stack's aesthetic: small shell + launchd + local artifacts, no
  third-party SaaS.

---

## Open questions the debate must resolve concretely

1. Transport: gaa repo, iCloud, or dataroom — pick one, defend it.
2. If gaa repo: `beacons/` dir on `main` vs dedicated `beacons` branch.
3. Beacon refresh cadence and staleness threshold (be numeric).
4. Push-race handling recipe on the laptop and any desktop prelude.
5. Beacon file format and minimum fields.

Where tradeoffs exist, trade in a named direction — don't equivocate.
