# Debate Topic: Level-5 Class Shell Next Improvements

## Question

The latest infPrime hands-on class suggests that the level-5 repo-local class
shell has earned its place as a real product form, at least for this repo. If we
accept that working assumption, what should we improve next?

## Context

The previous debate compared a full class shell against plain Codex in a
codebase. It ended conservatively: prefer a repo-native teaching contract plus
thin telemetry unless the full shell proves that its runtime state, scripted
paths, background jobs, suggestion capture, and continuity are worth their
maintenance cost.

Since then, a full infPrime class was run as a student on the `hands-on
pipeline` path. The experience was strong:

- The tutor opened directly in scene and kept the student on the selected path.
- The session used a short cycle of prediction, run or inspect, compare, and
  explanation.
- Background jobs kept the class interactive while `scan`, `triage`, and
  `analyse` ran.
- The student asked natural detour questions about `sources.yaml`, agent source
  discovery, prompt roles, plots, and whether the class was complete.
- The tutor answered detours locally, then returned to the path with concrete
  choices.
- The run produced real pipeline output: six scanned candidates, six triaged
  candidates, and three clean analysed artefact sets.
- The student volunteered an improvement idea about numerical plots, and the
  tutor persisted it as an improvement note.

The strongest product signal is that the shell did not merely explain the repo.
It shaped the student into the role of operator: predicting, choosing, waiting
on jobs, inspecting artefacts, and learning stage boundaries through live
evidence.

But the telemetry is weaker than the experience:

- `current_stage` stayed at `collect` while the live class moved through scan,
  triage, analyse, critique, repo review, and improvement capture.
- Worker-agent prompts appeared as `student_intent` in the structured log.
- The log records events and prompts, but not concept milestones, artifact
  milestones, tutor interventions, prediction quality, or detour recovery.
- Suggestion capture happened because the student asked whether suggestions were
  persisted, not because the shell detected and recorded the suggestion
  naturally.

Assume level 5 is not being deleted. The debate should decide what to improve
next so that the shell becomes more powerful without becoming brittle or
over-scripted.

## Positions

Agent A should argue for **deepening the class shell**. Treat the live session
as evidence that the stateful, interactive shell is the product. Prioritize
features that make the tutor more adaptive and the author feedback loop richer:
better state model, richer events, automatic suggestion capture, concept
milestones, author reports, replay, self-play, and possibly generated classes
for other repos.

Agent B should argue for **hardening and narrowing the shell**. Treat the live
session as a success, but warn that the next improvements should remove
fragility rather than add intelligence. Prioritize clean telemetry, role
separation, stage correctness, transcript hygiene, testing, and a small number
of boring author-facing reports before adding more runtime behavior.

Both agents should accept that the class shell has shown value. The argument is
not "shell or no shell"; it is where to put the next engineering and product
effort.

## Core Questions

- What did the live class prove, and what did it not prove?
- Which parts of level 5 carried the experience: path picker, tutor stance,
  background jobs, state file, numbered choices, suggestion capture, or
  something else?
- Should the next improvement target student experience, tutor behavior,
  telemetry, author reports, or generalization to other repos?
- How should the log schema change so it reflects the actual class?
- Should the shell infer concept mastery, or only record descriptive events?
- How can suggestions be captured without interrupting the student?
- What is the smallest author report that would be useful after a session?
- What failure modes would make level 5 feel worse than plain Codex?
- Should the next experiment be another human class, self-play, or a controlled
  comparison?
- What should be done before trying to auto-generate classes for other repos?

## Candidate Improvements

Consider these concrete options, but attack weak ones:

- Split log events by actor: student, tutor, worker agent, background job,
  script supervisor, and filesystem artefact.
- Replace `current_stage: collect` with a real stage timeline: entry, scan,
  scan-inspection, triage, triage-inspection, analyse, critique, review,
  improvement-capture, and close.
- Add concept and skill events such as `concept_introduced`,
  `prediction_recorded`, `prediction_compared`, `detour_taken`,
  `path_resumed`, `artifact_inspected`, `suggestion_captured`, and
  `stage_completed`.
- Keep events descriptive rather than controlling the tutor.
- Build a static author report over the structured log.
- Add a transcript cleaner that removes worker-agent prompts from the student
  timeline.
- Add a first-class `course/suggestions` workflow instead of ad hoc edits to
  `ideas.md`.
- Make background job milestones visible as class events.
- Add a class replay mode that reconstructs the learning path from logs.
- Run self-play with an agent-student to find boring loops and brittle tutor
  choices.
- Add a tone and effort selector at the start of the class.
- Add numerical plot artefacts to `analyse` as the first "student-suggested"
  pipeline improvement.
- Start a generator that can build a similar class shell for another repo.

## Evaluation Criteria

Use these criteria when judging proposals:

- Does the improvement make the next human class better?
- Does it make author iteration easier after the class?
- Does it reduce telemetry ambiguity without overfitting student state?
- Does it preserve tutor autonomy and student agency?
- Does it avoid turning the class into a rigid game state machine?
- Does it create durable evidence that another maintainer can read?
- Does it stay local to the repo and easy to debug?
- Does it generalize beyond infPrime, or at least move toward that goal?
- Does it improve the pipeline as well as the class experience?
- Can it be implemented and tested in a small, reversible slice?

## Required Output

End with a concrete prioritized plan:

- immediate next change,
- second change,
- what not to build yet,
- what evidence would show the improvement worked,
- and what would change your mind.

Include the strongest argument for the side you reject.
