#!/bin/zsh
# shelley — a shell-script mediator for heated debates between LLM agents
# Uses claude --resume to maintain persistent context across rounds

set -e
unset CLAUDECODE

DEFAULT_TOPIC="Design a Python function that takes a list of stock trades (ticker, qty, price, buy/sell) and outputs a portfolio summary with current positions, average cost basis, and realized P&L. Propose an implementation plan: data structures, function signatures, edge cases."

# Parse args: ./shelley.sh [-f topic_file] [rounds] [topic]
if [[ "$1" == "-f" ]]; then
    TOPIC_FILE="$2"
    [[ -f "$TOPIC_FILE" ]] || { echo "Topic file not found: $TOPIC_FILE" >&2; exit 1; }
    TOPIC=$(<"$TOPIC_FILE")
    ROUNDS=${3:-5}
    LOGDIR=$(dirname "$TOPIC_FILE")
else
    ROUNDS=${1:-5}
    TOPIC=${2:-$DEFAULT_TOPIC}
    LOGDIR="$(pwd)/debates"
fi

# Load context files from context/ dir next to the topic file
TOPIC_DIR=$(dirname "${TOPIC_FILE:-/dev/null}")
CONTEXT_DIR="$TOPIC_DIR/context"
CONTEXT=""
if [[ -d "$CONTEXT_DIR" ]]; then
    for f in "$CONTEXT_DIR"/*(.); do
        CONTEXT+=$'\n\n'"--- $(basename "$f") ---"$'\n'"$(<"$f")"
    done
fi

MODEL_A=${MODEL_A:-sonnet}
MODEL_B=${MODEL_B:-sonnet}

SYSTEM_A="You are a software architect. Propose and refine implementation plans. Be concise. Send diffs/revisions, not full repeats."
SYSTEM_B="You are a critical code reviewer. Challenge proposals, find flaws, suggest improvements. Be concise. Send diffs/revisions, not full repeats."

SCRIPT_DIR=${0:a:h}
DIALS="$SCRIPT_DIR/dials.py"

SESSION_A=$(uuidgen)
SESSION_B=$(uuidgen)

mkdir -p "$LOGDIR"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
LOGFILE="$LOGDIR/${TIMESTAMP}.md"

trap 'echo "\nLog saved to $LOGFILE"' EXIT

log() {
    printf '%s\n' "$1" | tee -a "$LOGFILE"
}

check_response() {
    local agent=$1 response=$2 round=$3
    if [[ -z "$response" ]]; then
        log ""
        log "> **ERROR:** $agent returned empty response in round $round — aborting."
        exit 1
    fi
}

# --- Header ---

log "# Debate — $(date '+%Y-%m-%d %H:%M')"
log ""
log "| | |"
log "|---|---|"
log "| **Agent A** (architect) | \`$MODEL_A\` · session \`${SESSION_A:0:8}\` |"
log "| **Agent B** (reviewer) | \`$MODEL_B\` · session \`${SESSION_B:0:8}\` |"
log "| **Rounds** | $ROUNDS |"
log ""
log "<details><summary><strong>Topic</strong></summary>"
log ""
log "$TOPIC"
log ""
log "</details>"
log ""

# --- Rounds ---

for round in $(seq 1 "$ROUNDS"); do
    DIAL=$(python3 "$DIALS" dial "$((round-1))" "$ROUNDS")
    DIAL_LABEL=$(python3 "$DIALS" label "$DIAL")
    DIAL_PREFIX=$(python3 "$DIALS" prefix "$DIAL")

    log "---"
    log ""
    log "## Round $round/$ROUNDS — ${DIAL_LABEL} (${DIAL}/5)"
    log ""

    # Agent A speaks
    START_A=$(date +%s)
    if [ "$round" -eq 1 ]; then
        RESPONSE_A=$(claude -p \
            --model "$MODEL_A" \
            --system-prompt "$SYSTEM_A" \
            --session-id "$SESSION_A" \
            "${DIAL_PREFIX}Plan this: ${TOPIC}${CONTEXT}" 2>>"$LOGFILE")
    else
        RESPONSE_A=$(claude -p \
            --model "$MODEL_A" \
            --resume "$SESSION_A" \
            "${DIAL_PREFIX}${PROMPT_A}" 2>>"$LOGFILE")
    fi
    END_A=$(date +%s)
    check_response "Agent A" "$RESPONSE_A" "$round"

    log "### Agent A · \`$MODEL_A\` · $((END_A - START_A))s"
    log ""
    log "$RESPONSE_A"
    log ""

    # Agent B speaks
    START_B=$(date +%s)
    if [ "$round" -eq 1 ]; then
        RESPONSE_B=$(claude -p \
            --model "$MODEL_B" \
            --system-prompt "$SYSTEM_B" \
            --session-id "$SESSION_B" \
            "${DIAL_PREFIX}You will review proposals for this task: ${TOPIC}${CONTEXT}

Here is the first proposal:

$RESPONSE_A" 2>>"$LOGFILE")
    else
        RESPONSE_B=$(claude -p \
            --model "$MODEL_B" \
            --resume "$SESSION_B" \
            "${DIAL_PREFIX}${RESPONSE_A}" 2>>"$LOGFILE")
    fi
    END_B=$(date +%s)
    check_response "Agent B" "$RESPONSE_B" "$round"

    log "### Agent B · \`$MODEL_B\` · $((END_B - START_B))s"
    log ""
    log "$RESPONSE_B"
    log ""

    # B's response becomes A's next input
    PROMPT_A="$RESPONSE_B"
done

# --- Footer ---

log "---"
log ""
log "*Debate finished $(date '+%Y-%m-%d %H:%M'). $ROUNDS rounds.*"
