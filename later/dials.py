"""Shared creativity dial and temperature schedule for heated-debate.

Importable as a module (pynaille.py) and callable as a CLI (shelley.sh).
"""

DIAL_LABELS = {5: "Wild", 4: "Creative", 3: "Balanced", 2: "Focused", 1: "Precise"}

DIAL_LEVELS = {
    5: "Explore radical alternatives. Question the premise. Propose unconventional approaches even if risky.",
    4: "Suggest improvements and alternatives. Challenge assumptions. Consider non-obvious solutions.",
    3: "Mix new ideas with refinement. Address open questions. Weigh tradeoffs.",
    2: "Refine the current approach. Fix issues. Tighten the spec. Avoid introducing new directions.",
    1: "Converge. Focus only on correctness, consistency, and completeness. No new ideas.",
}

TEMP_START = 1.0
TEMP_END = 0.3


def get_dial(round_num, total_rounds):
    """Creativity level 5→1 for a given round (0-indexed)."""
    if total_rounds <= 1:
        return 5
    t = round_num / (total_rounds - 1)
    return max(1, round(5 - 4 * t))


def get_temp(round_num, total_rounds):
    """Temperature (1.0→0.3) for a given round (0-indexed)."""
    t = round_num / max(total_rounds - 1, 1)
    return TEMP_START - (TEMP_START - TEMP_END) * t


def dial_prefix(level):
    return f"[Creativity: {level}/5] {DIAL_LEVELS[level]}\n\n"


if __name__ == "__main__":
    import sys

    cmd, *args = sys.argv[1:]
    if cmd == "dial":
        print(get_dial(int(args[0]), int(args[1])))
    elif cmd == "label":
        print(DIAL_LABELS[int(args[0])])
    elif cmd == "prefix":
        print(dial_prefix(int(args[0])), end="")
    elif cmd == "temp":
        print(f"{get_temp(int(args[0]), int(args[1])):.2f}")
