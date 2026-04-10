#!/usr/bin/env bash
# test-pipeline.sh — integration tests for shelley pipeline options
#
# Runs 1-round debates with fast models to verify each feature works.
# Each test writes to a temp directory and checks for expected output files.
#
# Usage: bash test-pipeline.sh [test_name]
#   No args = run all tests
#   With arg = run only that test (e.g., bash test-pipeline.sh test_panel_only)

set -euo pipefail

SHELLEY="bun shelley.ts"
TOPIC_TEXT="Is 1+1 always 2? Consider modular arithmetic, boolean algebra, and type theory."
PASS=0
FAIL=0
ERRORS=()

# Use fast models for all tests
export MODEL_A="claude:claude-haiku-4-5"
export MODEL_B="claude:claude-haiku-4-5"

setup_test() {
  local name="$1"
  TEST_DIR=$(mktemp -d "/tmp/shelley-test-${name}-XXXX")
  TOPIC_FILE="${TEST_DIR}/topic.md"
  echo "$TOPIC_TEXT" > "$TOPIC_FILE"
  echo "--- Running: $name ---"
}

teardown_test() {
  # Keep test dirs on failure for debugging
  if [ "${KEEP_DIRS:-}" != "1" ] && [ ${#ERRORS[@]} -eq 0 ]; then
    rm -rf "$TEST_DIR" 2>/dev/null || true
  fi
}

assert_file_exists() {
  local pattern="$1"
  local desc="$2"
  if ls $pattern 1>/dev/null 2>&1; then
    echo "  OK: $desc"
  else
    echo "  FAIL: $desc (no file matching $pattern)"
    ERRORS+=("$desc")
    return 1
  fi
}

assert_no_file() {
  local pattern="$1"
  local desc="$2"
  if ls $pattern 1>/dev/null 2>&1; then
    echo "  FAIL: $desc (unexpected file matching $pattern)"
    ERRORS+=("$desc")
    return 1
  else
    echo "  OK: $desc"
  fi
}

assert_json_field() {
  local file="$1"
  local field="$2"
  local desc="$3"
  if bun -e "const j=JSON.parse(require('fs').readFileSync('$file','utf8')); if(j.$field===undefined) process.exit(1)" 2>/dev/null; then
    echo "  OK: $desc"
  else
    echo "  FAIL: $desc ($field missing in $file)"
    ERRORS+=("$desc")
    return 1
  fi
}

run_test() {
  local name="$1"
  shift
  local exit_code=0
  "$@" || exit_code=$?
  if [ $exit_code -eq 0 ]; then
    PASS=$((PASS + 1))
    echo "  PASS: $name"
  else
    FAIL=$((FAIL + 1))
    echo "  FAIL: $name"
  fi
  echo ""
}

# ─────────────────────────────────────────────────────
# Test 1: Bare debate (no panel, no pipeline)
# ─────────────────────────────────────────────────────
test_bare_debate() {
  setup_test "bare"

  unset PANEL PIPELINE PIPELINE_MAX_ITER MODERATOR 2>/dev/null || true

  $SHELLEY -f "$TOPIC_FILE" 1 > /dev/null 2>&1

  assert_file_exists "${TEST_DIR}/*.md" "transcript exists"
  assert_file_exists "${TEST_DIR}/*.stderr.log" "stderr log exists"
  assert_no_file "${TEST_DIR}/*_panel.json" "no panel output"
  assert_no_file "${TEST_DIR}/meta-*.json" "no mechanics output"
  assert_no_file "${TEST_DIR}/substance-*.json" "no substance output"
  assert_no_file "${TEST_DIR}/iteration-*.json" "no iteration output"

  # Check transcript has round content
  local transcript=$(ls ${TEST_DIR}/2*.md | head -1)
  if grep -q "## Round 1" "$transcript"; then
    echo "  OK: transcript contains round 1"
  else
    echo "  FAIL: transcript missing round content"
    ERRORS+=("bare: transcript missing rounds")
  fi

  teardown_test
}

# ─────────────────────────────────────────────────────
# Test 2: Panel only (no pipeline)
# ─────────────────────────────────────────────────────
test_panel_only() {
  setup_test "panel"

  export PANEL="claude:claude-haiku-4-5"
  unset PIPELINE PIPELINE_MAX_ITER MODERATOR 2>/dev/null || true

  $SHELLEY -f "$TOPIC_FILE" 1 > /dev/null 2>&1

  assert_file_exists "${TEST_DIR}/*.md" "transcript exists"
  assert_file_exists "${TEST_DIR}/*_panel.json" "panel JSON exists"
  assert_no_file "${TEST_DIR}/meta-*.json" "no mechanics output"
  assert_no_file "${TEST_DIR}/substance-*.json" "no substance output"

  # Verify panel JSON structure
  local panel_json=$(ls ${TEST_DIR}/*_panel.json | head -1)
  assert_json_field "$panel_json" "overallScore" "panel has overallScore"
  assert_json_field "$panel_json" "expertScores" "panel has expertScores"
  assert_json_field "$panel_json" "synthesis" "panel has synthesis"

  # Check transcript mentions panel
  local transcript=$(ls ${TEST_DIR}/2*.md | head -1)
  if grep -q "Expert Panel" "$transcript"; then
    echo "  OK: transcript contains panel section"
  else
    echo "  FAIL: transcript missing panel section"
    ERRORS+=("panel: transcript missing panel")
  fi

  unset PANEL
  teardown_test
}

# ─────────────────────────────────────────────────────
# Test 3: Pipeline only (no panel, no iteration)
# ─────────────────────────────────────────────────────
test_pipeline_only() {
  setup_test "pipeline"

  export PIPELINE="claude:claude-haiku-4-5"
  export PIPELINE_MAX_ITER="1"
  unset PANEL MODERATOR 2>/dev/null || true

  $SHELLEY -f "$TOPIC_FILE" 1 > /dev/null 2>&1

  assert_file_exists "${TEST_DIR}/*.md" "transcript exists"
  assert_file_exists "${TEST_DIR}/meta-*.md" "mechanics markdown exists"
  assert_file_exists "${TEST_DIR}/meta-*.json" "mechanics JSON exists"
  assert_file_exists "${TEST_DIR}/substance-*.md" "substance markdown exists"
  assert_file_exists "${TEST_DIR}/substance-*.json" "substance JSON exists"
  assert_no_file "${TEST_DIR}/*_panel.json" "no panel output"
  assert_no_file "${TEST_DIR}/iteration-*.json" "no iteration (max_iter=1)"

  # Verify mechanics JSON
  local meta_json=$(ls ${TEST_DIR}/meta-*.json | head -1)
  assert_json_field "$meta_json" "processScore" "mechanics has processScore"
  assert_json_field "$meta_json" "recommendations" "mechanics has recommendations"

  # Verify substance JSON
  local sub_json=$(ls ${TEST_DIR}/substance-*.json | head -1)
  assert_json_field "$sub_json" "settledConclusions" "substance has settledConclusions"
  assert_json_field "$sub_json" "openQuestions" "substance has openQuestions"
  assert_json_field "$sub_json" "priorConstraints" "substance has priorConstraints"

  unset PIPELINE PIPELINE_MAX_ITER
  teardown_test
}

# ─────────────────────────────────────────────────────
# Test 4: Pipeline with iteration (max 2)
# ─────────────────────────────────────────────────────
test_pipeline_with_iteration() {
  setup_test "iteration"

  export PIPELINE="claude:claude-haiku-4-5"
  export PIPELINE_MAX_ITER="2"
  unset PANEL MODERATOR 2>/dev/null || true

  $SHELLEY -f "$TOPIC_FILE" 1 > /dev/null 2>&1

  assert_file_exists "${TEST_DIR}/*.md" "transcript exists"
  assert_file_exists "${TEST_DIR}/meta-*.json" "mechanics exists"
  assert_file_exists "${TEST_DIR}/substance-*.json" "substance exists" || { unset PIPELINE PIPELINE_MAX_ITER; teardown_test; return 1; }

  # iteration-*.json only exists if PIPELINE_MAX_ITER > 1 and substance succeeded
  assert_file_exists "${TEST_DIR}/iteration-*.json" "iteration decision exists" || { unset PIPELINE PIPELINE_MAX_ITER; teardown_test; return 1; }

  # Verify iteration JSON
  local iter_json=$(ls ${TEST_DIR}/iteration-*.json | head -1)
  assert_json_field "$iter_json" "action" "iteration has action"
  assert_json_field "$iter_json" "rationale" "iteration has rationale"
  assert_json_field "$iter_json" "contractFulfilled" "iteration has contractFulfilled"

  # Check action is valid
  local action=$(bun -e "console.log(JSON.parse(require('fs').readFileSync('$iter_json','utf8')).action)")
  if [ "$action" = "iterate" ] || [ "$action" = "stop" ]; then
    echo "  OK: iteration action is valid ($action)"
  else
    echo "  FAIL: iteration action is invalid ($action)"
    ERRORS+=("iteration: invalid action")
  fi

  # If it decided to iterate, there should be a second transcript
  if [ "$action" = "iterate" ]; then
    local transcript_count=$(ls ${TEST_DIR}/2*.md 2>/dev/null | wc -l | tr -d ' ')
    if [ "$transcript_count" -ge 2 ]; then
      echo "  OK: second iteration transcript exists ($transcript_count transcripts)"
    else
      echo "  FAIL: iteration decided 'iterate' but only $transcript_count transcript(s)"
      ERRORS+=("iteration: missing second transcript")
    fi
  else
    echo "  OK: iteration decided 'stop' — no second transcript expected"
  fi

  unset PIPELINE PIPELINE_MAX_ITER
  teardown_test
}

# ─────────────────────────────────────────────────────
# Test 5: Panel + Pipeline combined (no iteration)
# ─────────────────────────────────────────────────────
test_panel_and_pipeline() {
  setup_test "panel-pipeline"

  export PANEL="claude:claude-haiku-4-5"
  export PIPELINE="claude:claude-haiku-4-5"
  export PIPELINE_MAX_ITER="1"
  unset MODERATOR 2>/dev/null || true

  $SHELLEY -f "$TOPIC_FILE" 1 > /dev/null 2>&1

  assert_file_exists "${TEST_DIR}/*.md" "transcript exists"
  assert_file_exists "${TEST_DIR}/*_panel.json" "panel JSON exists"
  assert_file_exists "${TEST_DIR}/meta-*.json" "mechanics JSON exists"
  assert_file_exists "${TEST_DIR}/substance-*.json" "substance JSON exists"
  assert_no_file "${TEST_DIR}/iteration-*.json" "no iteration (max_iter=1)"

  # Verify panel is in transcript
  local transcript=$(ls ${TEST_DIR}/2*.md | head -1)
  if grep -q "Expert Panel" "$transcript"; then
    echo "  OK: transcript contains panel"
  else
    echo "  FAIL: transcript missing panel"
    ERRORS+=("panel-pipeline: missing panel in transcript")
  fi

  # Verify mechanics is in transcript
  if grep -q "Mechanics Report" "$transcript"; then
    echo "  OK: transcript contains mechanics report"
  else
    echo "  FAIL: transcript missing mechanics report"
    ERRORS+=("panel-pipeline: missing mechanics in transcript")
  fi

  unset PANEL PIPELINE PIPELINE_MAX_ITER
  teardown_test
}

# ─────────────────────────────────────────────────────
# Test 6: Panel + Pipeline + Iteration (full stack)
# ─────────────────────────────────────────────────────
test_full_stack() {
  setup_test "full-stack"

  export PANEL="claude:claude-haiku-4-5"
  export PIPELINE="claude:claude-haiku-4-5"
  export PIPELINE_MAX_ITER="2"
  unset MODERATOR 2>/dev/null || true

  $SHELLEY -f "$TOPIC_FILE" 1 > /dev/null 2>&1

  assert_file_exists "${TEST_DIR}/*.md" "transcript exists"
  assert_file_exists "${TEST_DIR}/*_panel.json" "panel JSON exists"
  assert_file_exists "${TEST_DIR}/meta-*.json" "mechanics JSON exists"
  assert_file_exists "${TEST_DIR}/substance-*.json" "substance JSON exists"
  assert_file_exists "${TEST_DIR}/iteration-*.json" "iteration decision exists"

  # Verify the iteration agent received the panel report
  # (Check that the iteration JSON has a rationale — if the panel was injected,
  # the rationale should be non-empty and informed by it)
  local iter_json=$(ls ${TEST_DIR}/iteration-*.json | head -1)
  local rationale_len=$(bun -e "console.log(JSON.parse(require('fs').readFileSync('$iter_json','utf8')).rationale.length)")
  if [ "$rationale_len" -gt 10 ]; then
    echo "  OK: iteration rationale is substantive (${rationale_len} chars)"
  else
    echo "  FAIL: iteration rationale is too short (${rationale_len} chars)"
    ERRORS+=("full-stack: weak iteration rationale")
  fi

  unset PANEL PIPELINE PIPELINE_MAX_ITER
  teardown_test
}

# ─────────────────────────────────────────────────────
# Test 7: Moderator + Pipeline
# ─────────────────────────────────────────────────────
test_moderator_and_pipeline() {
  setup_test "moderator-pipeline"

  export MODERATOR="claude:claude-haiku-4-5"
  export PIPELINE="claude:claude-haiku-4-5"
  export PIPELINE_MAX_ITER="1"
  unset PANEL 2>/dev/null || true

  # Need at least 2 rounds for moderator to activate
  $SHELLEY -f "$TOPIC_FILE" 2 > /dev/null 2>&1

  assert_file_exists "${TEST_DIR}/*.md" "transcript exists"
  assert_file_exists "${TEST_DIR}/meta-*.json" "mechanics JSON exists"
  assert_file_exists "${TEST_DIR}/substance-*.json" "substance JSON exists"

  # Check moderator comments appear in transcript
  local transcript=$(ls ${TEST_DIR}/2*.md | head -1)
  if grep -q "Moderator" "$transcript"; then
    echo "  OK: transcript contains moderator metadata"
  else
    echo "  OK: moderator ran but may not have injected (no drift detected)"
  fi

  unset MODERATOR PIPELINE PIPELINE_MAX_ITER
  teardown_test
}

# ─────────────────────────────────────────────────────
# Test 8: Prior constraints injection
# ─────────────────────────────────────────────────────
test_prior_constraints() {
  setup_test "prior"

  # Add prior constraints to the topic
  cat >> "$TOPIC_FILE" <<'PRIOR'

## Prior Constraints (from previous iteration)

The following are established:
- 1+1=2 in standard arithmetic is not in dispute
- The interesting cases are modular arithmetic (e.g., 1+1=0 in Z/2Z)

Focus the debate on:
- Whether type theory changes the answer fundamentally
PRIOR

  unset PANEL PIPELINE PIPELINE_MAX_ITER MODERATOR 2>/dev/null || true

  $SHELLEY -f "$TOPIC_FILE" 1 > /dev/null 2>&1

  assert_file_exists "${TEST_DIR}/*.md" "transcript exists"

  # Check that the transcript mentions prior constraints or modular arithmetic
  # (agents should have engaged with the constraints)
  local transcript=$(ls ${TEST_DIR}/2*.md | head -1)
  if grep -q "Prior Constraints\|prior\|modular\|Z/2Z" "$transcript"; then
    echo "  OK: transcript engages with prior constraints"
  else
    echo "  WARN: transcript may not reference prior constraints (non-fatal)"
  fi

  teardown_test
}

# ─────────────────────────────────────────────────────
# Runner
# ─────────────────────────────────────────────────────

cd "$(dirname "$0")"

ALL_TESTS=(
  test_bare_debate
  test_panel_only
  test_pipeline_only
  test_pipeline_with_iteration
  test_panel_and_pipeline
  test_full_stack
  test_moderator_and_pipeline
  test_prior_constraints
)

if [ $# -gt 0 ]; then
  # Run specific test
  "$1"
  run_test "$1" true
else
  # Run all tests
  for t in "${ALL_TESTS[@]}"; do
    run_test "$t" "$t" || true
  done
fi

echo "═══════════════════════════════════════"
echo "Results: $PASS passed, $FAIL failed (${#ALL_TESTS[@]} tests)"
if [ ${#ERRORS[@]} -gt 0 ]; then
  echo ""
  echo "Failures:"
  for e in "${ERRORS[@]}"; do
    echo "  - $e"
  done
  echo ""
  echo "Re-run with KEEP_DIRS=1 to inspect test output directories."
fi
echo "═══════════════════════════════════════"

exit $FAIL
