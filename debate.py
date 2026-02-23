import argparse
import json
import time
import warnings
from dotenv import load_dotenv
from litellm import completion
from litellm.exceptions import RateLimitError

load_dotenv()

DEFAULT_TOPIC = """\
We need to design a Python function that takes a list of stock trades
(ticker, qty, price, buy/sell) and outputs a portfolio summary with
current positions, average cost basis, and realized P&L.
Propose an implementation plan: data structures, function signatures, edge cases."""

SYSTEM_A = "You are a software architect. Propose and refine implementation plans. Be concise. Send diffs/revisions, not full repeats."
SYSTEM_B = "You are a critical code reviewer. Challenge proposals, find flaws, suggest improvements. Be concise. Send diffs/revisions, not full repeats."

MAX_RETRIES = 3
RETRY_DELAY = 25  # seconds, matches typical rate-limit retry windows


def get_cost(response):
    cost = response._hidden_params.get("response_cost", None)
    if cost is None:
        warnings.warn("Cost data unavailable from litellm — reporting $0", stacklevel=2)
        return 0.0
    return cost


def call_with_retry(model, messages, temperature):
    for attempt in range(MAX_RETRIES):
        try:
            return completion(model=model, messages=messages, temperature=temperature)
        except RateLimitError:
            if attempt < MAX_RETRIES - 1:
                print(f"\n  Rate limited, retrying in {RETRY_DELAY}s... (attempt {attempt+2}/{MAX_RETRIES})")
                time.sleep(RETRY_DELAY)
            else:
                raise


def run_debate(agent_a, agent_b, rounds, topic, output_file):
    topic = topic.strip()
    history_a = [{"role": "system", "content": SYSTEM_A}]
    history_b = [{"role": "system", "content": SYSTEM_B}]

    # Both agents get the topic context
    history_a.append({"role": "user", "content": f"Plan this:\n{topic}"})
    history_b.append({"role": "user", "content": f"You will review proposals for this task:\n{topic}"})
    history_b.append({"role": "assistant", "content": "Understood. Send me the first proposal."})

    total_tokens = 0
    total_cost = 0.0
    log = []
    start = time.time()

    for round_num in range(rounds):
        # When ROUNDS=1, temperature stays at 1.0 (no cooldown applies)
        t = round_num / max(rounds - 1, 1)
        temp_a = 1.0 - 0.7 * t  # 1.0 → 0.3
        temp_b = 1.0 - 0.7 * t

        # Agent A speaks
        r_a = call_with_retry(agent_a, history_a, temp_a)
        msg_a = r_a.choices[0].message.content
        tokens_a = r_a.usage.total_tokens
        cost_a = get_cost(r_a)

        print(f"\n{'='*60}")
        print(f"ROUND {round_num+1}/{rounds}  temp={temp_a:.2f}/{temp_b:.2f}")
        print(f"{'='*60}")
        print(f"\n[Agent A - {agent_a}] ({tokens_a} tokens, ${cost_a:.4f})")
        print(msg_a)

        # Feed A's response to B
        history_b.append({"role": "user", "content": msg_a})

        # Agent B responds
        r_b = call_with_retry(agent_b, history_b, temp_b)
        msg_b = r_b.choices[0].message.content
        tokens_b = r_b.usage.total_tokens
        cost_b = get_cost(r_b)

        print(f"\n[Agent B - {agent_b}] ({tokens_b} tokens, ${cost_b:.4f})")
        print(msg_b)

        # Feed B's response back to A
        history_a.append({"role": "assistant", "content": msg_a})
        history_a.append({"role": "user", "content": msg_b})
        history_b.append({"role": "assistant", "content": msg_b})

        total_tokens += tokens_a + tokens_b
        total_cost += cost_a + cost_b
        log.append({
            "round": round_num + 1,
            "temp": [temp_a, temp_b],
            "agent_a": {"model": agent_a, "tokens": tokens_a, "cost": cost_a, "message": msg_a},
            "agent_b": {"model": agent_b, "tokens": tokens_b, "cost": cost_b, "message": msg_b},
        })

        # Save partial results after each round
        if output_file:
            with open(output_file, "w") as f:
                json.dump({"summary": {"rounds_completed": round_num + 1, "total_tokens": total_tokens, "total_cost": total_cost}, "rounds": log}, f, indent=2)

    elapsed = time.time() - start

    summary = {
        "rounds": rounds,
        "total_tokens": total_tokens,
        "total_cost": total_cost,
        "wall_time_s": round(elapsed, 1),
        "avg_round_s": round(elapsed / rounds, 1),
    }

    print(f"\n{'='*60}")
    print(f"SUMMARY")
    print(f"{'='*60}")
    for k, v in summary.items():
        print(f"  {k}: {v}")

    if output_file:
        with open(output_file, "w") as f:
            json.dump({"summary": summary, "rounds": log}, f, indent=2)
        print(f"\nFull conversation saved to {output_file}")


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Run a heated debate between two LLM agents")
    parser.add_argument("--agent-a", default="gemini/gemini-2.5-flash")
    parser.add_argument("--agent-b", default="gemini/gemini-2.5-flash")
    parser.add_argument("--rounds", type=int, default=5)
    parser.add_argument("--topic", default=DEFAULT_TOPIC)
    parser.add_argument("--output", "-o", default="debate_output.json", help="Output file for full conversation log")
    args = parser.parse_args()

    run_debate(args.agent_a, args.agent_b, args.rounds, args.topic, args.output)
