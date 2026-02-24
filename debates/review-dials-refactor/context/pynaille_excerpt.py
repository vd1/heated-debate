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
        temp_a = get_temp(round_num, rounds)
        temp_b = temp_a
        dial = get_dial(round_num, rounds)
        prefix = dial_prefix(dial)

        # Prepend dial to the last user message for Agent A
        history_a[-1]["content"] = prefix + history_a[-1]["content"]

        # Agent A speaks
        r_a = call_with_retry(agent_a, history_a, temp_a)
        msg_a = r_a.choices[0].message.content
        tokens_a = r_a.usage.total_tokens
        cost_a = get_cost(r_a)

        # Feed A's response to B with dial prefix
        history_b.append({"role": "user", "content": prefix + msg_a})

        # Agent B responds
        r_b = call_with_retry(agent_b, history_b, temp_b)
        msg_b = r_b.choices[0].message.content
        tokens_b = r_b.usage.total_tokens
        cost_b = get_cost(r_b)

        # Feed B's response back to A
        history_a.append({"role": "assistant", "content": msg_a})
        history_a.append({"role": "user", "content": msg_b})
        history_b.append({"role": "assistant", "content": msg_b})

        total_tokens += tokens_a + tokens_b
        total_cost += cost_a + cost_b
        log.append({
            "round": round_num + 1,
            "temp": [temp_a, temp_b],
            "creativity_dial": dial,
            "agent_a": {"model": agent_a, "tokens": tokens_a, "cost": cost_a, "message": msg_a},
            "agent_b": {"model": agent_b, "tokens": tokens_b, "cost": cost_b, "message": msg_b},
        })

        # Save partial results after each round
        if output_file:
            with open(output_file, "w") as f:
                json.dump({"summary": {"rounds_completed": round_num + 1, "total_tokens": total_tokens, "total_cost": total_cost}, "rounds": log}, f, indent=2)
