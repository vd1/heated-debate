import time
from dotenv import load_dotenv
from litellm import completion

load_dotenv()

AGENT_A = "gemini/gemini-2.5-flash"
AGENT_B = "gemini/gemini-2.5-flash"
ROUNDS = 5

TOPIC = """
We need to design a Python function that takes a list of stock trades
(ticker, qty, price, buy/sell) and outputs a portfolio summary with
current positions, average cost basis, and realized P&L.
Propose an implementation plan: data structures, function signatures, edge cases.
"""

SYSTEM_A = "You are a software architect. Propose and refine implementation plans. Be concise. Send diffs/revisions, not full repeats."
SYSTEM_B = "You are a critical code reviewer. Challenge proposals, find flaws, suggest improvements. Be concise. Send diffs/revisions, not full repeats."


def run_debate():
    history_a = [{"role": "system", "content": SYSTEM_A}]
    history_b = [{"role": "system", "content": SYSTEM_B}]

    # Agent A opens with the topic
    history_a.append({"role": "user", "content": f"Plan this:\n{TOPIC}"})

    total_tokens = 0
    total_cost = 0.0
    start = time.time()

    for round_num in range(ROUNDS):
        t = round_num / max(ROUNDS - 1, 1)
        temp_a = 1.0 - 0.7 * t  # 1.0 → 0.3
        temp_b = 1.0 - 0.7 * t

        # Agent A speaks
        r_a = completion(model=AGENT_A, messages=history_a, temperature=temp_a)
        msg_a = r_a.choices[0].message.content
        tokens_a = r_a.usage.total_tokens
        cost_a = r_a._hidden_params.get("response_cost", 0) or 0

        print(f"\n{'='*60}")
        print(f"ROUND {round_num+1}/{ROUNDS}  temp={temp_a:.2f}/{temp_b:.2f}")
        print(f"{'='*60}")
        print(f"\n[Agent A - {AGENT_A}] ({tokens_a} tokens, ${cost_a:.4f})")
        print(msg_a)

        # Feed A's response to B
        history_b.append({"role": "user", "content": msg_a})

        # Agent B responds
        r_b = completion(model=AGENT_B, messages=history_b, temperature=temp_b)
        msg_b = r_b.choices[0].message.content
        tokens_b = r_b.usage.total_tokens
        cost_b = r_b._hidden_params.get("response_cost", 0) or 0

        print(f"\n[Agent B - {AGENT_B}] ({tokens_b} tokens, ${cost_b:.4f})")
        print(msg_b)

        # Feed B's response back to A
        history_a.append({"role": "assistant", "content": msg_a})
        history_a.append({"role": "user", "content": msg_b})
        history_b.append({"role": "assistant", "content": msg_b})

        total_tokens += tokens_a + tokens_b
        total_cost += cost_a + cost_b

    elapsed = time.time() - start

    print(f"\n{'='*60}")
    print(f"SUMMARY")
    print(f"{'='*60}")
    print(f"Rounds:       {ROUNDS}")
    print(f"Total tokens: {total_tokens:,}")
    print(f"Total cost:   ${total_cost:.4f}")
    print(f"Wall time:    {elapsed:.1f}s")
    print(f"Avg/round:    {elapsed/ROUNDS:.1f}s")


if __name__ == "__main__":
    run_debate()
