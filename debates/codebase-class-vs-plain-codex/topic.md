# Debate Topic: Codebase Class Shell vs Plain Codex

## Question

Is a repo-local interactive class shell meaningfully better than opening Codex in a codebase and asking it to explain the repo?

## Context

We are experimenting with an infPrime class shell around an existing agentic programming pipeline. The class shell adds a launcher, tutor instructions, scripted paths, session logs, local suggestion cards, background jobs, and a small amount of supervised continuity. The student experiences it from inside Codex or Claude Code, at their own pace, with room for questions and detours.

The competing approach is simpler: open Codex in the repository and ask it to review the architecture, explain the code, propose a walkthrough, and guide the student through changes.

The debate should decide whether the class shell is a real product form or mostly ceremony around capabilities the coding agent already has.

## Positions

Agent A should argue for the class shell. Treat it as a scalable distribution format for interactive technical knowledge: more like a tutorial video that can answer questions, run code, react to confusion, and preserve a deliberate teaching arc.

Agent B should argue for plain Codex in the repo. Treat the class shell as extra machinery that risks hiding the real system, increasing maintenance, constraining the tutor, and duplicating what a capable agent can do from a direct prompt.

Both agents should attack weak claims from the other side. Avoid polite convergence until there is a clear reason to converge.

## Core Questions

- Which learning outcomes require structure beyond plain Codex?
- Which class-shell features are necessary, and which are ceremony?
- What evidence would prove the class shell is better?
- What is the minimum viable experiment?
- When does the class shell hurt learning?
- How should tutor autonomy be guided without making the class feel scripted?
- Can this become a general way to distribute codebase knowledge across humans and agents?

## Evaluation Criteria

Use these criteria when judging the two approaches:

- Student time to first successful run.
- Student ability to explain the architecture after a delay.
- Student ability to make a small safe change and validate it.
- Quality of student questions during the session.
- Retention and transfer to a different codebase.
- Setup friction and failure modes.
- Tutor drift, jargon, and recovery after confusion.
- Maintenance cost for course authors.
- Whether session logs and suggestion cards create useful feedback loops.

## Required Output

End with a concrete recommendation:

- keep investing in the class shell,
- collapse the work back into plain Codex guidance,
- or run a controlled experiment before deciding.

Include the strongest argument for the side you reject, and specify what would change your mind.
