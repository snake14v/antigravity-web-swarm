# Customer Support Skill — Ooru Logix ShopSense

## Quick Overview

This skill manages ongoing customer support and success after the initial 14-day onboarding period. Goals: maintain >99% uptime, >90% accuracy, zero billing errors, detect churn risks early, and scale support efficiently via AI triage, remote diagnostics, and proactive health monitoring.

**Support tiers:** Self-serve (Tier 1) → AI diagnosis (Tier 2) → Remote expert (Tier 3) → On-site (Tier 4)

## Files in This Skill

### Main Skill File
- **`SKILL.md`** (554 lines) — Complete support framework and processes
  - Support tier definitions (Tier 1–4, scope, response times)
  - Issue classification taxonomy (hardware, software, accuracy, billing, connectivity, user error)
  - SLA definitions (P0–P3 priorities with response/resolve times)
  - Diagnostic decision tree (first-contact triage for common issues)
  - Remote troubleshooting protocol (SSH, logs, system checks)
  - Customer health scoring (formula, tiers, actions)
  - Churn risk detection (warning signals, prevention actions)
  - Proactive outreach triggers (automated checks daily/weekly)
  - Monthly health check protocol (script, talking points)
  - WhatsApp support templates (6 message types)
  - Escalation path and decision tree
  - Required skills and knowledge

### Templates (Operational Guides)

1. **`templates/diagnostic-playbook.md`** (1099 lines) — Hardware/software troubleshooting guide
   - **5 issue categories:**
     1. Camera issues (black, blurry, wrong angle, night mode)
     2. Raspberry Pi issues (won't boot, service not running, overheating)
     3. Detection accuracy issues (sudden drops, low from start, wild swings)
     4. Billing issues (higher/lower than expected, missing transactions)
     5. Connectivity issues (WiFi drops, sync failures)
   - **For each issue:** Symptoms → Probable causes → Diagnostic steps → Fix procedure → Escalation criteria
   - Step-by-step SSH commands (ready to copy/paste)
   - Escalation summary table
   - Designed for Tier 2 AI agents to execute autonomously

2. **`templates/health-scorecard.md`** (431 lines) — Monthly customer health assessment
   - Customer profile section (name, ID, install date, plan)
   - System metrics (uptime, accuracy, transactions, WiFi sync)
   - Business metrics (time saved, billing errors, low-stock alerts)
   - Engagement metrics (dashboard usage, support tickets, NPS)
   - Health score calculation (weighted formula: 0–100)
   - Risk indicators (red/yellow/green flags)
   - Recommended actions by health tier (thriving/healthy/at-risk/critical)
   - Call script for monthly check-in (warm, specific, actionable)
   - Post-call documentation and follow-up tasks
   - Quarterly trend tracking

## How to Use This Skill

### For Daily Support

**Incoming issue workflow:**
1. **Tier 1 (Self-serve):** Read customer issue, provide FAQ link or simple troubleshooting
2. **Tier 2 (AI diagnosis):** Use diagnostic-playbook.md + SKILL.md decision tree
   - SSH into customer's Pi, run diagnostic commands
   - Follow fix procedures step-by-step
   - Escalate if hardware suspected or unresolved
3. **Tier 3 (Remote expert):** Complex diagnostics, firmware updates, personal customer intervention
4. **Tier 4 (On-site):** Hardware replacement, physical recalibration, relationship rescue

### For Monthly Health Checks

**Process (day of month, e.g., 5th):**
1. Retrieve customer data from Firebase (uptime, accuracy, usage, payment status)
2. Use health-scorecard.md to calculate health score
3. Identify red/yellow flags
4. Call customer using provided call script
5. Document feedback and recommended actions
6. Follow up on any issues

### For Churn Prevention

**Proactive triggers** (check daily):
- Usage drop >20% → Send WhatsApp check-in
- Accuracy <85% → Notify support team, schedule recalibration
- No activity for 3 days → Investigate (offline? shop closed?)
- Payment late by 5 days → Send reminder
- Multiple support tickets → Call to understand root issue

**At-risk response:**
1. Same-day call to customer
2. Listen for pain points (don't defend product)
3. Immediate action (fix technical issue, offer training, negotiate resolution)
4. Daily follow-ups for 1 week
5. If still at-risk → Escalate to Vaishak for executive intervention

### For Specific Tasks

- **"Customer says system is offline"** → Use diagnostic-playbook.md Category 2 (Pi issues) or Category 5 (Connectivity)
- **"Accuracy is suddenly low"** → Use diagnostic-playbook.md Category 3, Issue 3.1
- **"Customer billing is wrong"** → Use diagnostic-playbook.md Category 4
- **"Monthly health check"** → Use health-scorecard.md template
- **"Customer at churn risk"** → Use SKILL.md Churn Risk Detection section

## Support SLAs

| Priority | Response Time | Resolve Time | Examples |
|----------|---|---|---|
| P0 | <1 hour | <4 hours | System completely down, all cameras offline |
| P1 | <4 hours | <24 hours | Accuracy <70%, major feature broken |
| P2 | <24 hours | <3 days | Minor issue, accuracy 70–85% |
| P3 | <1 week | <1 week | Question, enhancement request |

## Target Audience

- **Primary:** Tier 2 AI agents (autonomous diagnosis), Tier 3 engineers (Vaishak)
- **Secondary:** Customer support team (WhatsApp responses), finance (billing audits)
- **Delivery audience:** Shop owners with limited tech literacy (post-onboarding support)

## Key Metrics

**Support team success is measured by:**
- SLA compliance: >95% (especially P0/P1)
- First-contact resolution: >70% (issue resolved without escalation)
- Customer health score: >75/100 average
- Churn rate: <5% (customers don't leave due to poor support)
- NPS: >40 (promoter ratio - detractor ratio)

## Escalation Path

**When to escalate:**

| Situation | Escalate To | Reason |
|-----------|---|---|
| Hardware defect suspected | Tier 3 → Tier 4 | Needs on-site visit |
| Accuracy <70% unresolved | Tier 3 | Requires model re-training |
| WiFi fundamentally unstable | Tier 3 | May need hardware upgrade recommendation |
| Customer threatening to churn | Tier 3 + Vaishak | Executive relationship management |
| Billing discrepancy >₹1K | Tier 3 + Finance | Needs senior review + refund/credit |
| Multiple P0 issues unresolved | Vaishak | System stability or product issue |

## Integration with Other Skills

**Incoming from:** customer-onboarding skill (day 14+, handoff to monthly support schedule)
**Outgoing to:** customer-onboarding skill (if customer needs re-training)
**Coordination:** finance-tracker skill (billing audits, refund processing)

## Notes for AI Agents

This skill is designed for AI agents (Tier 2) to:
1. Triage incoming issues using diagnostic decision tree
2. Execute remote diagnostics (SSH, logs, system queries)
3. Follow fix procedures step-by-step
4. Know when to escalate (explicit criteria provided)
5. Communicate clearly with non-technical customers

**Common agent workflow:**

```
Customer WhatsApp: "System not working"
↓
Agent: Read SKILL.md diagnostic decision tree
↓
Agent: "Is system completely offline, or just one camera?"
↓
Customer: "Both cameras at front are black"
↓
Agent: Use diagnostic-playbook.md Category 1, Issue 1.1
  → Run lsusb to check camera detection
  → Reseat USB cables
  → Try different USB port
  → If still black: Escalate to Tier 3 (camera replacement)
```

## Seasonal Considerations

**Monsoon/humidity:** Increased chance of Pi overheating, water damage. Monitor temperature logs.

**Peak seasons (diwali, new year):** Higher transaction volumes; may impact sync speed. Monitor bandwidth.

**WiFi instability in monsoon:** More WiFi dropouts due to weather. Recommend WiFi extender proactively.

