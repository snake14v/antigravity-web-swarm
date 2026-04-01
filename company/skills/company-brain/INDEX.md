# Company Brain: Master Index

This is the master navigation guide for all Ooru Logix company knowledge.

## Start Here (If You're New)

1. **README.md** - 5-minute quick start (structure, decision rules, Q&A templates)
2. **SKILL.md** - 10-minute deep dive (full company context, how to use this skill)
3. **QUICK-REFERENCE.md** - 2-minute cheat sheet (key facts, quick answers)

Then reference specific files as needed for your task.

---

## File Map by Use Case

### "I Need to Respond to a Customer"
- **Primary:** QUICK-REFERENCE.md (key facts, Q&A templates)
- **Secondary:** brand-voice.md (tone, templates, examples)
- **If asking about product:** product-specs.md (technical details)
- **If asking about competitors:** competitive-intel.md (battlecards)
- **If asking about pricing:** financials.md (pricing philosophy)

### "I Need to Make a Decision About Opportunity X"
- **Primary:** SKILL.md sections:
  - "Product Focus Policy" - Is this within scope?
  - "Decision Frameworks" - Should I say YES/NO/escalate?
  - "Revenue Gates" - Does this unlock growth?
- **If still unsure:** README.md "Escalation Checklist"

### "I'm Building a Proposal or Pitch Deck"
- **Primary:** SKILL.md (company identity, mission, product, metrics)
- **Secondary:** competitive-intel.md (positioning, battlecards)
- **For metrics:** financials.md (unit economics, projections)
- **For brand:** brand-voice.md (tone, messaging, taglines)

### "I'm Writing Customer-Facing Copy"
- **Primary:** brand-voice.md (voice attributes, tone by channel, templates, examples)
- **For product details:** product-specs.md (specs, deployment, guarantees)
- **For positioning:** competitive-intel.md (why ShopSense > alternatives)

### "I'm Answering a Technical Question"
- **Primary:** product-specs.md (hardware, software, 5 modules, architecture, deployment)
- **For specs/features:** SKILL.md "Product Catalog" section

### "I'm Discussing Pricing or Revenue"
- **Primary:** financials.md (pricing, unit economics, projections, break-even)
- **For context:** SKILL.md "Revenue Model" section

### "I'm Understanding the Market & Competition"
- **Primary:** competitive-intel.md (landscape, competitors, positioning, battlecards)
- **For ICP:** SKILL.md "Ideal Customer Profile" section

### "I'm Reviewing Company Performance"
- **Primary:** SKILL.md "Key Metrics to Track" section
- **For financials:** financials.md "Financial Dashboard"

### "I'm Escalating a Decision to Vaishak"
- **Primary:** README.md "Escalation Checklist"
- **Secondary:** QUICK-REFERENCE.md "Escalation Template"
- **For context:** Relevant context file (product-specs, competitive-intel, etc.)

---

## File Details

| File | Lines | Best For | Time |
|------|-------|----------|------|
| **README.md** | 150 | Quick start, structure, decision rules, Q&A | 5 min |
| **SKILL.md** | 386 | Full company knowledge, decision frameworks | 10 min |
| **QUICK-REFERENCE.md** | 250 | Key facts, cheat sheet, when in a hurry | 2 min |
| **product-specs.md** | 679 | Technical details, hardware, deployment | 15 min |
| **brand-voice.md** | 419 | Tone, templates, messaging, examples | 10 min |
| **competitive-intel.md** | 483 | Competitors, positioning, battlecards | 12 min |
| **financials.md** | 511 | Pricing, unit economics, projections | 12 min |

---

## Common Questions & Where to Find Answers

| Question | File | Section |
|----------|------|---------|
| What is ShopSense? | SKILL.md | "Product Catalog" |
| What's the price? | QUICK-REFERENCE.md | "Product: ShopSense" |
| Who is our customer? | SKILL.md | "Ideal Customer Profile" |
| How do I respond in brand voice? | brand-voice.md | "Do's and Don'ts" or "Email Templates" |
| Should I say YES to [opportunity]? | SKILL.md | "Decision Frameworks" |
| What about [competitor]? | competitive-intel.md | "[Competitor] Analysis" section |
| When do we break even? | financials.md | "Break-Even Analysis" |
| What's our runway? | financials.md | "Operating Expenses & Burn Rate" |
| What metrics should I track? | SKILL.md | "Key Metrics to Track" |
| When should I escalate? | README.md | "Escalation Checklist" or QUICK-REFERENCE.md | "Escalation Template" |
| How do we compare to Khatabook? | competitive-intel.md | "How We Position vs Khatabook" |
| What is the hardware BOM? | product-specs.md | "Bill of Materials" |
| How do offline syncing work? | product-specs.md | "Offline-First Architecture Details" |

---

## Decision Trees

### "Should I Say YES to This?"

```
Is it ShopSense for chai/kirana shops?
  → NO: Say NO (refer to alternative)
  → YES: Continue

Does it fit within Vaishak's 50 hrs/week?
  → NO: Say NO (capacity constrained)
  → YES: Continue

Does it move toward next revenue gate?
  → NO: Recommend not prioritizing it
  → YES: Continue

Is the revenue commitment >₹50K?
  → YES: Escalate to Vaishak
  → NO: Say YES, execute

Is it a legal/financial/partnership decision?
  → YES: Escalate to Vaishak
  → NO: Say YES, execute
```

### "Should I Escalate This?"

```
Is it operational (support, content, data)?
  → YES: You can handle it
  → NO: Continue

Is it strategic (new products, partnerships, pricing, hiring)?
  → YES: Escalate to Vaishak
  → NO: Continue

Is the revenue commitment >₹50K?
  → YES: Escalate to Vaishak
  → NO: You can handle it

Does it conflict with focus policy?
  → YES: Escalate to Vaishak
  → NO: You can handle it

Are you confident in your decision?
  → YES: Execute
  → NO: Escalate to Vaishak
```

---

## Monthly Review Checklist

Use these files monthly to review company health:

**Metrics Dashboard (SKILL.md):**
- [ ] Pilots (target: 10 by Dec)
- [ ] MRR (target: ₹20K by Dec)
- [ ] Churn (target: <5%)
- [ ] NPS (target: >30 at Gate 3)

**Financial Dashboard (financials.md):**
- [ ] Revenue vs projection
- [ ] Burn rate vs budget
- [ ] Gross margin vs target
- [ ] Customer LTV vs estimate

**Operational Health (SKILL.md):**
- [ ] Support response time
- [ ] Feature deployment cycle
- [ ] Model accuracy
- [ ] Deployment success rate

**Competitive (competitive-intel.md):**
- [ ] Any new competitors?
- [ ] Existing competitors making moves?
- [ ] Customer feedback on alternatives?

---

## Updating This Skill

When to update each file:

| File | When to Update | Owner |
|------|---|---|
| SKILL.md | Post-Gate milestone, major pivot | Vaishak |
| product-specs.md | After deployment, model improvements | Vaishak + Tech team |
| brand-voice.md | After customer feedback, channel changes | Vaishak + Marketing |
| competitive-intel.md | Quarterly (Q1, Q2, Q3, Q4) | Vaishak + Sales |
| financials.md | Monthly (after reviewing KPIs) | Vaishak + Finance |
| README.md | When structure changes | Vaishak |
| QUICK-REFERENCE.md | When key facts change | Vaishak |

---

## Version History

**v1.0 (2026-04-01):** Initial Company Brain. Covers pre-Gate 1 to Gate 4 planning.

**Next versions:**
- v1.1: Post-Gate 1 (add first customer case study)
- v1.2: Post-Gate 2 (refine product-specs with real-world data)
- v2.0: Post-Gate 3 (add FastServe product roadmap)

---

## Quick Links

- **Main reference:** SKILL.md
- **Tech details:** product-specs.md
- **Communications:** brand-voice.md
- **Market position:** competitive-intel.md
- **Business metrics:** financials.md
- **Quick answers:** QUICK-REFERENCE.md
- **How to use:** README.md
- **Navigation:** INDEX.md (this file)

---

## Need Help?

- **Product questions?** → product-specs.md
- **Tone/messaging questions?** → brand-voice.md
- **Pricing questions?** → financials.md
- **Competitive questions?** → competitive-intel.md
- **Decision questions?** → SKILL.md "Decision Frameworks"
- **Still unsure?** → Read full SKILL.md + README.md, then escalate to Vaishak

---

Last updated: 2026-04-01 | v1.0

