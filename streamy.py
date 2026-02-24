#!/usr/bin/env python3
"""streamy — test stream-json communication with claude CLI.

Quick test to understand the stream-json input/output format.
Run: python3 streamy.py
"""

import asyncio
import json
import os
import sys


async def test_basic():
    """Send a simple prompt via stream-json stdin, read stream-json stdout."""

    env = {**os.environ, "CLAUDECODE": ""}

    proc = await asyncio.create_subprocess_exec(
        "claude", "-p",
        "--model", "haiku",
        "--output-format", "stream-json",
        "--no-session-persistence",
        "Say hello in exactly 5 words. Nothing else.",
        stdin=asyncio.subprocess.PIPE,
        stdout=asyncio.subprocess.PIPE,
        stderr=asyncio.subprocess.PIPE,
        env=env,
    )

    stdout, stderr = await asyncio.wait_for(proc.communicate(), timeout=60)

    print("=== EXIT CODE ===")
    print(proc.returncode)
    print()

    if stderr:
        print("=== STDERR ===")
        print(stderr.decode()[:500])
        print()

    print("=== RAW STDOUT (first 2000 chars) ===")
    raw = stdout.decode()
    print(raw[:2000])
    print()

    # Parse each line as JSON
    print("=== PARSED MESSAGES ===")
    for i, line in enumerate(raw.strip().split("\n")):
        if not line.strip():
            continue
        try:
            msg = json.loads(line)
            print(f"[{i}] type={msg.get('type', '?')}", end="")
            if msg.get("subtype"):
                print(f"  subtype={msg['subtype']}", end="")
            # Show key fields based on type
            if msg.get("type") == "assistant":
                text = msg.get("message", {}).get("content", "")
                if isinstance(text, list):
                    text = " ".join(b.get("text", "") for b in text if b.get("type") == "text")
                print(f"  content={text[:100]}", end="")
            elif msg.get("type") == "result":
                print(f"  result={str(msg.get('result', ''))[:100]}", end="")
            elif msg.get("type") == "system" and msg.get("session_id"):
                print(f"  session_id={msg['session_id']}", end="")
            print()
        except json.JSONDecodeError:
            print(f"[{i}] RAW: {line[:100]}")

    print()
    print("=== DONE ===")


async def test_stream_input():
    """Test sending input via stream-json on stdin (multi-turn?)."""

    env = {**os.environ, "CLAUDECODE": ""}

    # Start claude with stream-json input
    proc = await asyncio.create_subprocess_exec(
        "claude", "-p",
        "--model", "haiku",
        "--input-format", "stream-json",
        "--output-format", "stream-json",
        "--no-session-persistence",
        stdin=asyncio.subprocess.PIPE,
        stdout=asyncio.subprocess.PIPE,
        stderr=asyncio.subprocess.PIPE,
        env=env,
    )

    # Try sending a user message as JSON on stdin
    msg = json.dumps({"type": "user", "content": "What is 2+2? Answer with just the number."})
    proc.stdin.write(msg.encode() + b"\n")
    await proc.stdin.drain()
    proc.stdin.close()

    stdout, stderr = await asyncio.wait_for(proc.communicate(), timeout=60)

    print("=== STREAM INPUT TEST ===")
    print(f"exit: {proc.returncode}")
    if stderr:
        print(f"stderr: {stderr.decode()[:500]}")
    print()

    raw = stdout.decode()
    print("=== RAW STDOUT ===")
    print(raw[:2000])
    print()

    # Extract just the result/text
    for line in raw.strip().split("\n"):
        if not line.strip():
            continue
        try:
            msg = json.loads(line)
            if msg.get("type") == "result":
                print(f"RESULT: {msg.get('result', '')[:200]}")
        except json.JSONDecodeError:
            pass


if __name__ == "__main__":
    test = sys.argv[1] if len(sys.argv) > 1 else "basic"
    if test == "basic":
        asyncio.run(test_basic())
    elif test == "stream":
        asyncio.run(test_stream_input())
    elif test == "both":
        asyncio.run(test_basic())
        print("\n" + "=" * 60 + "\n")
        asyncio.run(test_stream_input())
    else:
        print(f"Usage: python3 streamy.py [basic|stream|both]")
