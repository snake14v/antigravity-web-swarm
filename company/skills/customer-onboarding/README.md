# Customer Onboarding System — Ooru Logix ShopSense

## Quick Overview

This skill manages the complete customer onboarding journey from payment confirmation through go-live stabilization (14 days). The system ensures every new ShopSense customer becomes an independent, confident user with >90% accuracy and all staff trained.

## Files in This Skill

### Main Skill File
- **`SKILL.md`** (387 lines) — Complete end-to-end onboarding workflow
  - 6 phases: Payment → Kit Prep → Installation → Training → Go-Live → First-Week Monitoring
  - Hands-on protocols for each phase
  - Success criteria and metrics
  - WhatsApp message templates for customer communication
  - Troubleshooting decision tree
  - Escalation criteria

### Templates (Executable Field Guides)

1. **`templates/installation-runbook.md`** (482 lines) — Step-by-step field installation guide
   - Pre-visit checklist (kit contents, tools, customer info)
   - On-site assessment (power, WiFi, lighting, camera mounting points)
   - Hardware installation sequence (cameras, Pi units, power, network)
   - Software configuration (SSH, firmware, shop-specific settings)
   - Model calibration and owner walkthrough
   - Post-install verification
   - Common troubleshooting and escalation triggers
   - Notes template for documentation

2. **`templates/training-guide.md`** (464 lines) — Customer and staff training curriculum
   - Owner training (30 min): system overview, dashboard, daily operations, billing, support contacts
   - Staff training (15 min): camera basics, automatic billing, what NOT to do, issue reporting
   - Kannada translation of key phrases
   - FAQ in simple language
   - Training completion checklist
   - Quick-reference card content (for laminated print)

## How to Use This Skill

### For Initial Onboarding
1. **Day 0 (Payment confirmed):** Use SKILL.md Phase 1 (Payment → Kit Prep)
2. **Day 3-4 (Pre-install):** Use SKILL.md Phase 2 + installation-runbook.md (Arrival & Assessment)
3. **Day 5-7 (Installation):** Use installation-runbook.md (step-by-step field guide) + training-guide.md (training delivery)
4. **Day 8-14 (First-week monitoring):** Use SKILL.md Phase 5 (daily accuracy checks, owner calls)
5. **Day 14+ (Handoff):** Use SKILL.md Phase 6 + Link customer to ongoing support skill

### For Specific Tasks
- **"Walk me through a customer installation"** → Read installation-runbook.md
- **"How do I train the owner?"** → Read training-guide.md Part 1 (Owner Training)
- **"What should I tell the staff?"** → Read training-guide.md Part 2 (Staff Training)
- **"What's the success criteria for onboarding?"** → See SKILL.md Onboarding Success Metrics table

## Target Audience

- **Primary:** Field engineers, onboarding coordinators, Tier 2 support agents
- **Secondary:** Vaishak (oversight, escalations), customer support team (post-onboarding)
- **Delivery audience:** Shop owners with limited tech literacy (Kannada/Hindi/English speakers in Bangalore)

## Key Metrics

**Success is measured by:**
- Time to go-live: <14 days post-payment
- System accuracy at day 14: >90% (7-day average)
- System uptime: >99%
- Owner can operate independently: Yes (post-training assessment)
- All staff trained: 100%
- Zero billing errors: First month
- Churn at day 30: 0%

## Escalation Path

If you encounter issues during onboarding, use the decision tree in SKILL.md:
- **Camera/hardware not functioning** → Escalate to Tier 3 engineer → on-site visit
- **Accuracy <80% after 3 calibration attempts** → Escalate to Tier 3 → model re-training
- **WiFi impossible at site** → Escalate to Tier 3 → alternative connectivity solution
- **Customer unresponsive to training** → Escalate to sales/Vaishak → customer fit assessment

## Integration with Other Skills

**Before onboarding:** Link from sales-prospector/deal-closer skill
**After onboarding (day 14+):** Handoff to customer-support skill (monthly health checks)
**If customer churn risk:** Escalate to customer-support for Tier 3 personal intervention

## Notes for AI Agents

This skill is designed for AI agents to execute autonomously:
- Clear checklists and decision trees for each step
- Technical knowledge summarized (don't need deep Pi expertise, just follow playbooks)
- Customer communication templates pre-written (modify with actual names/dates)
- Escalation criteria explicit (when to hand off to human)
- Firebase integration points marked (where to log status, read customer data)

**Common agent workflow:**
1. Receive customer ID (after payment confirmed in Firebase)
2. Read customer info from Firebase (shop name, address, contact)
3. Follow SKILL.md Phase 1 checklist
4. When ready for installation, send Phase 2 WhatsApp to customer
5. Coordinate with field engineer using installation-runbook.md
6. Execute daily monitoring using Phase 5 protocol
7. At day 14, calculate success metrics and hand off to customer-support skill

