#!/usr/bin/env python3
"""Optuna-based hyperparameter optimization for shelley.ts debates."""

import argparse
import json
import os
import subprocess
import tempfile

import optuna


def make_objective(topic_file: str, reps: int):
    """Return an Optuna objective that runs shelley.ts and scores via panel."""

    def objective(trial: optuna.Trial) -> float:
        dial_exponent = trial.suggest_float("dial_exponent", 0.5, 3.0)
        rounds = trial.suggest_int("rounds", 3, 7)
        moderator_level = trial.suggest_int("moderator_level", 1, 3)
        moderator_model = trial.suggest_categorical(
            "moderator_model",
            ["claude:claude-haiku-4-5", "codex:gpt-5.4-mini"],
        )
        model_a = trial.suggest_categorical(
            "model_a",
            ["claude:claude-opus-4-6", "claude:claude-sonnet-4-6"],
        )
        model_b = trial.suggest_categorical(
            "model_b",
            ["codex:gpt-5.4", "codex:gpt-5.3-codex", "claude:claude-sonnet-4-6"],
        )

        scores: list[float] = []
        for rep in range(reps):
            panel_path = os.path.join(
                tempfile.gettempdir(),
                f"shelley_panel_t{trial.number}_r{rep}.json",
            )

            env = os.environ.copy()
            env.update(
                {
                    "MODEL_A": model_a,
                    "MODEL_B": model_b,
                    "MODERATOR": moderator_model,
                    "MODERATOR_LEVEL": str(moderator_level),
                    "DIAL_EXPONENT": str(dial_exponent),
                    "PANEL": "claude:claude-opus-4-6",
                    "PANEL_OUTPUT": panel_path,
                }
            )

            try:
                result = subprocess.run(
                    ["bun", "shelley.ts", "-f", topic_file, str(rounds)],
                    env=env,
                    timeout=900,
                    capture_output=True,
                )
                if result.returncode != 0:
                    return 0.0
            except (subprocess.TimeoutExpired, OSError):
                return 0.0

            try:
                with open(panel_path) as f:
                    panel = json.load(f)
                scores.append(float(panel["overallScore"]))
            except (FileNotFoundError, KeyError, json.JSONDecodeError, ValueError):
                return 0.0

        return sum(scores) / len(scores)

    return objective


def main() -> None:
    parser = argparse.ArgumentParser(
        description="Optimize shelley.ts debate parameters with Optuna"
    )
    parser.add_argument(
        "--topic", required=True, help="Path to topic file, e.g. debates/stock-trades/topic.md"
    )
    parser.add_argument("--trials", type=int, default=20, help="Number of Optuna trials")
    parser.add_argument(
        "--reps",
        type=int,
        default=1,
        help="Repetitions per config for averaging (2-3 to handle non-determinism)",
    )
    args = parser.parse_args()

    study = optuna.create_study(
        study_name="shelley-optimization",
        direction="maximize",
        sampler=optuna.samplers.TPESampler(seed=42),
        storage="sqlite:///optuna_shelley.db",
        load_if_exists=True,
    )

    objective = make_objective(args.topic, args.reps)
    study.optimize(objective, n_trials=args.trials)

    best = study.best_trial
    print(f"\nBest score: {best.value}")
    print("Best params:")
    for k, v in best.params.items():
        print(f"  {k}: {v}")


if __name__ == "__main__":
    main()
