# Ooru Logix Sales Agent System - Complete Skills Package
**Product:** ShopSense (₹25-35K edge AI retail hardware)
**Target:** Bangalore chai shops & kirana stores
**Status:** Ready for AI agent execution
**Last Updated:** April 1, 2026

---

## Overview

This directory contains a complete, actionable sales system for automating the ShopSense sales pipeline. It covers lead prospecting through deal closure, with emphasis on WhatsApp-first engagement and 7-day pilots as the core conversion mechanism.

**Sales Motion:**
1. **Prospect** (Sales Prospector skill) → Identify, qualify, score leads
2. **Outreach** (WhatsApp sequences) → Engage, build interest
3. **Demo & Pilot Offer** (Proposal template) → Convert to commitment
4. **Pilot Execution** (Deal Closer + Pilot Tracker) → Prove value in 7 days
5. **Conversion** (Deal Closer) → Negotiate terms, close deal
6. **Handoff** (to Onboarding) → Install permanently, go live

---

## File Structure

### Core Skills

#### **1. Sales Prospector Skill**
**Path:** `/sales-prospector/SKILL.md` (20 KB)

**Contains:**
- Lead qualification framework (BANT adapted for SMB retail)
- Lead scoring rubric (0-100 scale with weighted factors)
- Outreach templates (cold WhatsApp, follow-up sequences, walk-in script)
- Objection handling matrix (5 key objections with scripts)
- Demo preparation checklist
- Instructions for using Apollo MCP (lead enrichment) and Common Room MCP (account research)
- CRM/Firestore logging protocol

**Execution:** Use this skill first when given a list of prospects or target area. Output: Qualified lead list with scores.

---

#### **2. Deal Closer Skill**
**Path:** `/deal-closer/SKILL.md` (27 KB)

**Contains:**
- Complete pipeline stages (Lead → Qualified → Demo'd → Pilot → Negotiating → Won/Lost)
- Stage transition criteria
- Pilot success metrics (accuracy >90%, time saved >30%, zero complaints)
- Conversion playbook with Day 7 decision call script
- Pricing negotiation guardrails (floor prices, payment plans, subscription options)
- Post-sale handoff to onboarding
- CRM update protocols for Firestore

**Execution:** Use this skill once a lead is in the Pilot Active stage. Output: Deal closed or lost, customer handed off to onboarding.

---

### Templates (Supporting Assets)

#### **3. WhatsApp Sequences Template**
**Path:** `/sales-prospector/templates/whatsapp-sequences.md` (13 KB)

**Contains:**
- Cold outreach (English + Kannada variants)
- 3-day, 7-day, 14-day follow-ups
- Post-demo follow-up
- Pilot kickoff messages
- Daily pilot check-ins (Days 1, 3, 5, 7)
- Conversion ask
- Win-back sequences (for dropped leads)
- Seasonal/behavioral trigger messages
- A/B testing variants
- Tone & timing guidelines

**Use:** Copy + paste into WhatsApp, personalize with owner name and specific pain point.

---

#### **4. Pilot Proposal Template**
**Path:** `/sales-prospector/templates/proposal-template.md` (14 KB)

**Contains:**
- Executive summary
- Problem statement (customizable per shop)
- Proposed solution with technical specs
- Implementation timeline
- Pricing & ROI projection
- 7-day pilot terms & conditions
- FAQ during pilot
- Appendix comparing to alternatives

**Use:** Customize this template for each prospect after demo. Send via WhatsApp or email before pilot date.

---

#### **5. Pilot Tracker Template**
**Path:** `/deal-closer/templates/pilot-tracker.md` (16 KB)

**Contains:**
- Pilot header (ID, dates, shop details)
- Hardware allocation & pre-installation checklist
- Baseline metrics (captured during demo)
- Installation checklist (Day 0)
- Daily metric logs (Days 1, 3, 5, 7)
- Pilot success criteria tracking
- Day 7 decision call script
- Post-decision outcome recording
- Learnings & performance rating

**Use:** Create a new pilot tracker for each pilot. Update daily during pilot week. Final tracker becomes deal record.

---

## Quick Reference: When to Use Each Skill

### Scenario 1: "I have a list of 10 prospects in JP Nagar"
1. Use **Sales Prospector** skill → Score each lead, output top 5 for outreach
2. Use **WhatsApp Sequences** template → Send Day 0 cold intro
3. Set reminders for Days 3, 7, 14 follow-ups

### Scenario 2: "A prospect responded positively and we demo'd"
1. Use **Proposal Template** → Customize and send
2. Lock in pilot date (typically next Saturday)
3. Use **Deal Closer** skill → Prepare for pilot week

### Scenario 3: "Pilot week is active (Days 1-7)"
1. Use **Pilot Tracker** → Create new tracker for this pilot
2. Use **Deal Closer** skill → Daily check-ins, metric gathering
3. Day 7 morning → Execute decision call (script in Pilot Tracker)

### Scenario 4: "Owner said Yes to buying"
1. Use **Deal Closer** negotiation guardrails → Confirm terms
2. Send invoice + agreement (from Proposal Template)
3. Handoff to onboarding team
4. Update Firestore deal record with "WON" status

### Scenario 5: "Owner said No during pilot"
1. Uninstall hardware same day (professional)
2. Log outcome in Pilot Tracker
3. Wait 3 months → Win-back sequence (from WhatsApp Templates)

---

## MCP Integration Points

### Apollo MCP
**Skill: `apollo:prospect` and `apollo:enrich-lead`**

Used in Sales Prospector skill to:
- Find chai/kirana shop owners by location + title
- Enrich prospects with email, phone, LinkedIn
- Load prospects into automated outreach sequences

**Example workflow:**
```
Target: "Chai shop owners in JP Nagar, Bangalore"
→ Apollo returns 20-50 verified leads with contact info
→ Enrich with emails, LinkedIn profiles
→ Feed into WhatsApp sequence automation
```

### Common Room MCP
**Skill: `common-room:prospect`, `common-room:account-research`, `common-room:compose-outreach`**

Used in Sales Prospector skill to:
- Research specific shops for pain signals (billing issues, growth signals)
- Find mentions of POS, billing problems, customer service complaints
- Generate personalized outreach hooks based on account signals

**Example workflow:**
```
Prospect: "JP Nagar Chai House"
→ Common Room finds Google review: "Long billing lines during lunch"
→ Personalize outreach: "I noticed you get busy during lunch..."
→ Conversion rate increases vs. generic outreach
```

### Slack & Google Drive (Optional)
- Log pilot results to Slack channel for team visibility
- Store deal tracker PDFs in Google Drive for historical record

---

## Key Metrics to Track

### Prospecting Phase
- Leads identified & scored: Target 20+/week
- Leads contacted (WhatsApp sent): Target 20+/week
- Response rate: Target 25%+
- Demo scheduled rate: Target 70% of Tier A leads
- Lead quality (Tier A+B %): Target 40%+

### Pilot Phase
- Pilots initiated (after demo): Target 1-3/month
- Pilot completion rate: Target 100% (all pilots run full 7 days)
- Pilot success rate (accuracy >90%): Target 80%+
- Owner engagement (daily app usage): Target 90%+

### Conversion Phase
- Pilot-to-deal conversion: Target 70%+
- Average deal value: ₹25K (Starter) or ₹35K (Pro)
- Average negotiation discount: <₹2K
- Payment plan compliance: 95%+ on-time payments
- Time from first contact to deal: 3-4 weeks

### Post-Sale
- Onboarding completion rate: 95%+
- Post-install satisfaction: 4.5+/5 stars
- 12-month churn rate: <5%

---

## Customization Guide

### For Different Regions
Replace "JP Nagar, Jayanagar, BTM Layout, Koramangala, Banashankari" with your target neighborhoods. Update:
- Kannada phrases (or use local language)
- Travel time estimates
- Local business hours & rush times
- Area-specific pain points

### For Different ICP
If targeting different shop types (clothing stores, restaurants, pharmacies):
- Update baseline metrics (transaction count, average billing time)
- Adjust pain point language (e.g., "inventory discrepancies" for retailers vs. "customer wait time" for food)
- Modify demo talking points
- Adjust ROI calculations

### For Different Product Features
If adding new ShopSense capabilities (e.g., inventory tracking, customer loyalty):
- Add to "Proposed Solution" section of proposal
- Highlight in demo talking points
- Update ROI projections
- Add to Day 3-5 pilot check-ins

---

## Implementation Checklist

- [ ] Sales Prospector skill → AI agent can execute lead scoring
- [ ] Apollo MCP connected → Can enrich leads with contact info
- [ ] Common Room MCP connected → Can research account signals
- [ ] WhatsApp channel ready → Can send outreach messages
- [ ] Firestore database → Can log prospects, deals, pilot metrics
- [ ] Hardware available → 2-3 pilot kits ready to deploy
- [ ] First prospect identified → Ready to run first pilot
- [ ] Vaishak available → Demo + installation capacity confirmed

---

## Success Playbook (First Month)

### Week 1: Setup & First Prospect
- [ ] Apollo + Common Room MCPs connected and tested
- [ ] Firestore database schema set up
- [ ] WhatsApp channel ready (Vaishak's number configured)
- [ ] Identified first 5 target prospects in JP Nagar
- [ ] Scored prospects (using Sales Prospector skill)
- [ ] Sent Day 0 WhatsApp cold intros to top 3

### Week 2: First Response & Demo
- [ ] Day 3 follow-ups sent to non-respondents
- [ ] Got first positive response (target: 1+)
- [ ] Scheduled first demo
- [ ] Prepared demo materials + pitch
- [ ] First demo executed (Vaishak met with owner)

### Week 3: First Pilot
- [ ] Proposal sent to prospect
- [ ] Pilot agreement signed
- [ ] First installation happened (Saturday morning)
- [ ] Day 1-3 check-ins completed, metrics logged
- [ ] Day 5 check-in done, owner engaged

### Week 4: First Conversion
- [ ] Day 7 decision call happened
- [ ] Owner said "Yes" to buy (target outcome)
- [ ] Terms negotiated, agreement signed
- [ ] Payment received (or first installment)
- [ ] Deal logged as "WON" in Firestore
- [ ] Handoff to onboarding team
- [ ] Final installation scheduled

---

## Support & Debugging

### If leads aren't responding to WhatsApp:
- Check timing (9am vs. 3pm sends get different response rates)
- Verify personalization (generic messages get 10% response, personalized get 25%+)
- Try Kannada variant (cultural relevance helps)
- Try different hook angle (problem-first vs. curiosity-first)

### If pilots are failing (accuracy <90%):
- Check camera angle (usually just needs 2-inch adjustment)
- Verify WiFi strength (backup router may be needed)
- Confirm staff are actually using the system (engagement issue, not product issue)
- Consider running 2-3 extra days (learning curve on Days 1-2)

### If deals aren't closing at 70%:
- Review objections from pilots (is it price? support? reliability?)
- Adjust proposal ROI section to match their specific baseline metrics
- Offer payment plan more aggressively (reduce upfront barrier)
- Consider subscription option (₹3K/month for no upfront cost)

---

## Next Phase: Scaling

Once you've completed 3-5 successful pilots:
1. Document a case study (anonymized) from first win
2. Use case study in future prospects ("Another JP Nagar shop reduced billing errors by 95%...")
3. Build referral incentive (₹2K off next kit if you refer another shop)
4. Automate WhatsApp sequences via Apollo once patterns are clear
5. Hire second salesperson (follow same sales motion, could handle 2-3 pilots/month)

---

## Files Summary

| File | Size | Purpose |
|------|------|---------|
| sales-prospector/SKILL.md | 20 KB | Lead qualification, scoring, objection handling |
| sales-prospector/templates/whatsapp-sequences.md | 13 KB | Outreach message templates (Day 0-14) |
| sales-prospector/templates/proposal-template.md | 14 KB | Customizable pilot proposal (problem + ROI) |
| deal-closer/SKILL.md | 27 KB | Pipeline management, conversion playbook, negotiation guardrails |
| deal-closer/templates/pilot-tracker.md | 16 KB | Daily pilot log, decision tracking, outcome record |
| **TOTAL** | **90 KB** | **Complete sales system** |

---

## Quick Links

- **Full Sales Prospector Skill:** `/sales-prospector/SKILL.md`
- **Full Deal Closer Skill:** `/deal-closer/SKILL.md`
- **WhatsApp Message Templates:** `/sales-prospector/templates/whatsapp-sequences.md`
- **Pilot Proposal (Customizable):** `/sales-prospector/templates/proposal-template.md`
- **Daily Pilot Tracker:** `/deal-closer/templates/pilot-tracker.md`

---

**Created:** April 1, 2026
**Target ICP:** Bangalore chai shops & kirana stores (50-200 daily orders, manual/no billing system)
**Product:** ShopSense (2-4 AI cameras, edge processing, offline-capable)
**Pricing:** ₹25K (Starter, 2 cameras) to ₹35K (Pro, 4 cameras)
**Sales Cycle:** 3-4 weeks (first contact → conversion)
**Pilot Duration:** 7 days (proof of value before purchase)

---

**System Status:** Ready for AI agent execution. All skills are actionable, templates are customizable, and MCPs are integrated.
