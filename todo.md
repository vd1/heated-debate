# TODO

## Topic framing matters

Debate topics must be phrased as reviews, not tasks. When the topic says "port shelley.sh to shelley.ts," agents interpret it as a work order and try to implement — even when the system prompts say "propose plans" / "review proposals." The imperative framing overrides the system prompt.

**Observed in:** `debates/plan-porting-shelley/20260224_232149.md` — agents completed plan review by round 2, then spent rounds 3+ trying to write `shelley.ts` and hitting permission walls.

**Fix:** Topic should say "Review this plan for porting shelley.sh to shelley.ts" not "Port shelley.sh to shelley.ts." System prompts alone aren't enough to constrain behavior when the topic is a direct instruction.
