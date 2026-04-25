# Couples That Code — Product Design (v1)

**Status:** Draft, brainstorm output (2026-04-25)
**Working name:** Couples That Code (placeholder; "hubby&B" considered and parked)
**Type:** Two-sided marketplace (asset-light) bundling lodging + facilitated agentic-coding workshop for romantic/life partners.

---

## 1. One-line concept

A weekend retreat marketplace where couples book a curated property outfitted for two-person coding, paired with a facilitated "shipping ritual" that helps them ship something together using modern agentic-AI tooling.

## 2. What we are / are not

**We are:**
- A *bundled experience* (lodging + workshop + tools), sold as a single SKU.
- A curator: every property meets a hardware + privacy spec.
- A facilitator: every booking includes a 1-on-2 kickoff + demo cadence.
- A token reseller (pass-through with markup) for couples who want managed AI.

**We are not (in v1):**
- Airbnb with a tag.
- A multi-vertical "pair activity" platform (the wider concept; we wedge into one cult-shaped product first).
- A cohort/lodge model with multiple couples per property.
- An open instructor marketplace.
- A property owner/operator at scale.

## 3. Persona

**Primary:** A romantically-paired couple, both code professionally or semi-professionally, who want to spend a weekend shipping a personal/side project together using AI-augmented dev workflows.

Sub-segments:
- **Skill levels mix:** v1 serves both beginners-to-agentic and pros. The workshop adapts via intake form; format does not change.
- **Project type:** typically side projects (low IP-risk). Some pros may bring work-related code; the privacy guarantee is for them.
- **Frequency intent:** 2–4 weekends per year per couple, with light social cohort awareness (alumni community is roadmap, not v1).

## 4. The product (a single weekend SKU)

**"Couples Code Camp" — Friday evening through Sunday evening.**

Included in one price:
- 2 nights at a curated property (private, solo-couple).
- Dual external monitors at a single pair-coding station, universal dock (USB-C / Thunderbolt / HDMI / DisplayPort, Mac+PC), two ergonomic chairs, real desk for two.
- Privacy guarantee in workspace: no smart cameras, no always-listening devices, optional Ethernet, signed kit list visible in property.
- Friday-evening 1-on-2 facilitated kickoff (~60–90 min) covering:
  1. Property tour (kit walkthrough — dock, displays, network, privacy posture)
  2. Goal-setting for the weekend (what they want to ship; what "done" looks like)
  3. Tooling sync (Claude Code / Cursor / agent-loop primer for beginners; design conversation + tool tips for pros — content adapts to skill levels reported in intake)
- Optional Saturday mid-point sync (~30 min) — couples can decline at booking.
- Sunday-evening demo (~30 min) — couples present what they shipped to the facilitator.

Add-ons billed at-cost or near-cost:
- AI tokens via a managed key (we provision; bill consumption + ~20% markup post-stay), OR couples bring their own keys.

## 5. Brand pillars

- **Quietly nerdy.** Not a "tech bro" aesthetic. Calm, focused, romantic.
- **Privacy-first.** "Your IP stays yours." A defensible, signal-rich claim.
- **Ritual over hospitality.** The kickoff + demo cadence is the magic, not throw pillows.
- **Bundled, opinionated.** One SKU, one promise. No price-shopping.

## 6. Supply model

**Phase 1 (launch):** 5–10 hand-built lighthouse properties. Either:
- Sub-leased and outfitted by us, or
- Partnered with a small set of hosts who agree to our full kit + privacy spec and pricing.

Goal of Phase 1 is to set the visual + experiential standard (the "look" of a Couples That Code property) and generate press / word-of-mouth.

**Phase 2 (scale):** Open a certification track. Existing short-term-rental hosts can apply, install the kit (~$1.5–3K capex), pass a privacy audit, and list. We earn a take rate on bookings + ongoing certification fee.

We *do not* launch overlay-first. Order matters: lighthouse properties define the standard; certification scales it.

## 7. Operations

**Workshop facilitators:**
- Founders teach the first ~50 weekends. This doubles as user research and a forcing function for tight kickoff/demo templates.
- After 50, recruit a small in-house facilitator team (W-2 or long-term contract). Do NOT open a third-sided instructor marketplace in v1.

**Booking intake form (set at booking):**
- Skill level with Claude Code / Cursor / agent loops (1–5 each)
- Project goal in 1–2 sentences
- Stack / language preference
- Token model preference (managed key with markup vs BYO key)
- Dietary, accessibility, mid-point sync opt-in

**Token billing:**
- Managed mode: we provision a dedicated API key per stay, capture usage at end of weekend, bill consumption + 20% to the booking card.
- BYO mode: no markup, no billing event, couples handle their own keys.
- Either way, the workshop content does NOT depend on which mode the couple picks.

## 8. Monetization

- Single bundled price per weekend (lodging + kit + workshop). Target: premium positioning (~2–3× a comparable Airbnb in the same location).
- Token margin (managed mode only) as a small secondary line.
- Phase 2: take rate on certified-host bookings + annual certification fee.

Revenue mix in v1 will be ~95% bundled-stay, ~5% tokens. Tokens are a margin enhancer and a story ("we even handle the AI"), not a primary line.

## 9. Geography (open question for planning)

Launch in a single metro-adjacent zone — ideally a 2–3 hour drive from one major tech hub with a strong couples-who-code population. Candidate hubs:
- SF Bay Area → Sonoma / Tahoe / Santa Cruz
- NYC → Hudson Valley / Catskills
- Berlin → Brandenburg countryside
- London → Cotswolds / Sussex coast

Pick one in planning. Concentration matters more than coverage in v1.

## 10. What is explicitly out-of-scope for v1

- Multiple couples per property / cohort weekends (Phase 2+).
- Open instructor marketplace.
- Mobile app (responsive web is enough; bookings are infrequent and considered).
- Property ownership at scale.
- Other pair-activity verticals (sex, study, music, etc. — explicit roadmap, not v1).
- International launch.
- Self-service host certification (Phase 2).

## 11. Risks and known unknowns

- **Demand-side density.** Couples-who-both-code-professionally is a thin slice. Need to validate that the addressable population in the chosen launch metro is ≥10K couples.
- **Bundled SKU resistance.** Some couples will want "stay only." Holding the line preserves brand; relaxing kills it. Resist for at least 12 months.
- **Privacy claim must be defensible.** A single incident (a couple discovers a camera; a token leak) destroys the moat. Privacy posture needs an explicit checklist + audit.
- **Founder-taught workshops cap growth.** This is fine — desired, even — for v1, but plan a facilitator hiring path for month ~6.
- **Token-pass-through legal/billing model.** Re-billing API consumption with markup may have terms-of-service or tax implications; legal review needed before launch.
- **Tension between "secops persona" and "agentic workshop."** Pros may resist sending code to third-party APIs. Resolved by: (a) BYO key option, (b) framing the workshop as side-project-friendly, (c) optional opt-out of the managed AI mode.

## 12. Success criteria for v1 (first 6 months)

- 5+ lighthouse properties live and bookable.
- 50 weekends booked and delivered.
- ≥40% of post-stay surveys say they would book again within 12 months.
- ≥1 piece of organic press or notable social-media moment.
- Founder-led workshop template stable enough that a non-founder facilitator could deliver weekend #51.

## 13. Suggested first concrete workstreams (input to writing-plans)

1. **Brand + landing + waitlist** — name lock, single-page site, waitlist with intake form, basic positioning copy.
2. **Property sourcing playbook** — kit spec PDF, privacy checklist, host pitch deck, target list for Phase 1 metro.
3. **Workshop curriculum v0** — kickoff script, intake-form-driven content branches, demo-night template.
4. **Booking stack** — minimal viable booking flow (could be Cal.com + Stripe + a CMS for property pages; no custom platform required for v1).
5. **Token billing pipeline** — managed-key provisioning + usage capture + post-stay invoicing. Investigate provider terms first.
6. **Legal review** — token re-billing, short-term-rental compliance per launch metro, privacy claim phrasing.

These are the natural decomposition for the implementation plan; each can be its own sub-plan if needed.
