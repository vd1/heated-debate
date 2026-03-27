## Multi-Agent Tutoring System for Exam Prep

A student is preparing for a high-school history exam on the Cold War (1947-1991).
The lecture covered: origins (Truman Doctrine, Marshall Plan), key crises (Berlin,
Cuba, Korea, Vietnam), detente, arms race, and collapse of the USSR. The exam will
test both factual recall (dates, names, treaties) and analytical reasoning (causes,
consequences, compare/contrast essay questions).

Design a multi-agent system that helps the student study effectively.

### Proposed agent roster (debate whether this is right)
- **Narrator** -- presents structured summaries of each topic segment
- **Quizmaster** -- asks narrow recall questions (dates, names, events)
- **Socratic challenger** -- asks open-ended analytical questions ("Why did detente fail?")
- **Fact-checker** -- validates student answers and corrects misconceptions
- **Context agent** -- provides broader context when the student is stuck ("The Marshall Plan connects to...")
- **Progress tracker** -- monitors coverage gaps and steers the session

### Student profile and session constraints
The system should ask the student upfront:
- **Depth preference:** minimal effort (just pass) -> thorough understanding -> board-sweeping mastery
- **Time budget:** exam is tomorrow vs. next week vs. next month
- **Session structure:** single marathon vs. spaced sessions over days

These inputs should drive agent behavior: a "just pass tomorrow" student gets mostly Quizmaster + Fact-checker drilling key facts; a "deep mastery over 2 weeks" student gets more Socratic challenger + competing interpretations + spaced repetition across sessions.

### Key design questions for debate
- Is this the right set of agents, or should some be merged/split? Is six too many?
- Should agents run in a fixed sequence (narrate -> quiz -> discuss -> review) or should the student's performance dynamically route to the right agent?
- How should the system balance factual drill vs. deeper analytical questioning? What ratio, and who decides?
- When the student gives a wrong answer, which agent responds -- the fact-checker, the context agent, or the Socratic challenger? Does it depend on the type of error?
- How does the system decide the student is "ready" for the exam?
- Should there be a simulated exam agent that runs a mock test at the end?
- Should the system use gamification or prediction markets? E.g., the student bets confidence points on their answers, earning/losing points -- and the system uses those confidence signals to identify weak spots. Does this help motivation, or is it a distraction for exam prep?
- Could agents themselves use an internal prediction market to decide which topic to cover next (each agent "bids" on what it thinks the student needs most)?
- Should some agents deliberately present competing interpretations of the same events? E.g., one agent frames the Cold War as primarily an ideological struggle, another as a geopolitical power contest, another as an economic competition. This exposes the student to historiographic debate and builds critical thinking -- but does it confuse a student who just needs to pass an exam? How do you balance "multiple perspectives" with "there's a right answer on the test"?
