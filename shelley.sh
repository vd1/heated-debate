#!/bin/zsh
# shelley — a shell-script mediator for heated debates between LLM agents
# Uses claude --resume to maintain persistent context across rounds

set -e
unset CLAUDECODE

ROUNDS=${1:-5}
TOPIC=${2:-"Design a Python function that takes a list of stock trades (ticker, qty, price, buy/sell) and outputs a portfolio summary with current positions, average cost basis, and realized P&L. Propose an implementation plan: data structures, function signatures, edge cases."}

MODEL_A=${MODEL_A:-sonnet}
MODEL_B=${MODEL_B:-sonnet}

SYSTEM_A="You are a software architect. Propose and refine implementation plans. Be concise. Send diffs/revisions, not full repeats."
SYSTEM_B="You are a critical code reviewer. Challenge proposals, find flaws, suggest improvements. Be concise. Send diffs/revisions, not full repeats."

SESSION_A=$(uuidgen)
SESSION_B=$(uuidgen)

LOGDIR="$(pwd)/debates"
mkdir -p "$LOGDIR"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
LOGFILE="$LOGDIR/debate_${TIMESTAMP}.md"

trap 'echo "\nLog saved to $LOGFILE"' EXIT

log() {
    printf '%s\n' "$1" | tee -a "$LOGFILE"
}

check_response() {
    local agent=$1 response=$2 round=$3
    if [[ -z "$response" ]]; then
        log "**ERROR: $agent returned empty response in round $round — aborting.**"
        exit 1
    fi
}

log "# Heated Debate — $TIMESTAMP"
log ""
log "**Model A (architect):** $MODEL_A  session: $SESSION_A"
log "**Model B (reviewer):** $MODEL_B  session: $SESSION_B"
log "**Rounds:** $ROUNDS"
log ""
log "## Topic"
log ""
log "$TOPIC"
log ""

for round in $(seq 1 "$ROUNDS"); do
    log "---"
    log ""
    log "## Round $round/$ROUNDS"
    log ""

    # Agent A speaks
    START_A=$(date +%s)
    if [ "$round" -eq 1 ]; then
        RESPONSE_A=$(claude -p \
            --model "$MODEL_A" \
            --system-prompt "$SYSTEM_A" \
            --session-id "$SESSION_A" \
            "Plan this: $TOPIC" 2>>"$LOGFILE")
    else
        RESPONSE_A=$(claude -p \
            --model "$MODEL_A" \
            --resume "$SESSION_A" \
            "$PROMPT_A" 2>>"$LOGFILE")
    fi
    END_A=$(date +%s)
    check_response "Agent A" "$RESPONSE_A" "$round"

    log "### Agent A ($MODEL_A) — $((END_A - START_A))s"
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
            "You will review proposals for this task: $TOPIC

Here is the first proposal:

$RESPONSE_A" 2>>"$LOGFILE")
    else
        RESPONSE_B=$(claude -p \
            --model "$MODEL_B" \
            --resume "$SESSION_B" \
            "$RESPONSE_A" 2>>"$LOGFILE")
    fi
    END_B=$(date +%s)
    check_response "Agent B" "$RESPONSE_B" "$round"

    log "### Agent B ($MODEL_B) — $((END_B - START_B))s"
    log ""
    log "$RESPONSE_B"
    log ""

    # B's response becomes A's next input
    PROMPT_A="$RESPONSE_B"
done

log "---"
log ""
END_TIME=$(date +%Y%m%d_%H%M%S)
log "*Debate complete. $ROUNDS rounds. Finished $END_TIME.*"
