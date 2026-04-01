# Customer Support Skill — Ooru Logix ShopSense

## Overview
This skill manages ongoing customer support and success after the initial 14-day onboarding period. Goals: maintain >99% uptime, >90% accuracy, zero billing errors, detect churn risks early, and scale support efficiently via AI triage and remote diagnostics.

**Success metrics:**
- SLA compliance (P0 <1hr, P1 <4hr, P2 <24hr, P3 <1 week)
- First-contact resolution rate >70%
- Customer health score >70/100
- Churn rate <5%
- NPS >40

---

## Support Tier Framework

### Tier 1: Self-Serve (WhatsApp Chatbot / AI Agent)
**Scope:** FAQ, basic troubleshooting, status checks
**Response time:** <15 minutes
**Tools:** FAQ database, system status API, simple decision trees
**Escalation criteria:** Issue unresolved after 2 attempts, or customer requests escalation

**Typical Tier 1 issues:**
- "How do I check daily sales?" → Provide dashboard walkthrough link
- "Why is accuracy low today?" → Check if WiFi was unstable (log query)
- "How much did I save with ShopSense?" → Calculate time saved (automation report)
- "When is my next billing date?" → Query Firebase billing record

---

### Tier 2: AI Agent Diagnosis (Claude or similar LLM-based agent)
**Scope:** Technical diagnostics, hypothesis generation, remote testing
**Response time:** <4 hours
**Tools:** SSH access to Pi units, Firebase queries, diagnostic playbooks, customer context
**Escalation criteria:** Hardware defect suspected, or customer wants human, or decision tree exhausted

**Typical Tier 2 issues:**
- "Camera not detecting items" → SSH to Pi, check USB connections, verify firmware, run detection test
- "System offline" → Check WiFi status, ping gateway, restart services, upload logs
- "Accuracy suddenly dropped" → Review lighting logs, check for USB disconnects, run calibration test
- "Strange billing numbers" → Compare manual count vs. system count, verify item prices

**AI Agent knowledge required:**
- Basic Raspberry Pi troubleshooting (SSH, file system, services)
- Camera/USB connectivity diagnostics
- Log file interpretation (detection accuracy, sync failures)
- Firebase schema and queries
- Customer context (shop type, install date, calibration baseline)
- Diplomatic communication (don't blame customer, problem-solve together)

---

### Tier 3: Remote Support (Vaishak or senior engineer)
**Scope:** Complex diagnostics, firmware updates, advanced calibration, escalation management
**Response time:** <8 hours (or scheduled for next business day)
**Tools:** All Tier 2 tools, plus firmware flashing, remote desktop if needed, external database access
**Escalation criteria:** Tier 2 unable to resolve, or hardware replacement needed, or customer churn risk detected

**Typical Tier 3 issues:**
- "Accuracy still <80% after recalibration" → Remote desktop into Pi, analyze model logs, consider re-training
- "WiFi keeps dropping" → Analyze connection logs, suggest hardware upgrades (mesh network, extender)
- "Multiple errors in billing" → Audit month's transaction log, adjust prices if wrong, issue refund
- "Customer threatening to cancel" → Personal call, understand root cause, negotiate resolution

---

### Tier 4: On-Site Support
**Scope:** Hardware replacement, physical recalibration, complex environment issues, customer relationship rescue
**Response time:** Scheduled, typically within 2–3 business days
**Tools:** All tools, plus physical diagnostics, camera replacement, Pi replacement
**Escalation criteria:** Hardware is physically defective, or site environmental factors, or customer satisfaction critical

**Typical Tier 4 issues:**
- "Camera is cracked/won't power on" → Replace camera hardware
- "Pi unit won't boot after firmware update" → Physical inspection, SD card replacement if needed
- "Lighting completely changed in shop (new store, renovation)" → On-site recalibration with new lighting
- "VIP customer at churn risk" → CEO visit, comprehensive assessment, white-glove resolution

---

## Issue Classification Taxonomy

**Hardware:**
- Power/electricity (Pi won't turn on, intermittent power)
- USB connectivity (camera won't detect, loose cable)
- Physical damage (cracked camera, overheating Pi)
- Network adapter issues

**Software:**
- Firmware version outdated or corrupted
- Service not running (detector, sync)
- Dashboard won't load
- Data storage full

**Accuracy:**
- Detection confidence too low (<85%)
- Systematic undercounting or overcounting
- Night mode not working
- New item type not recognized

**Billing:**
- Monthly bill higher/lower than expected
- Missing transactions from system
- Duplicate charges
- Price discrepancy

**Connectivity:**
- WiFi drops frequently
- Cloud sync failing
- Offline mode not buffering correctly
- Mobile hotspot not working

**User Error:**
- Customer expectation mismatch
- Misunderstanding of features
- Accidental misconfiguration
- Blocked camera (not realizing impact)

---

## SLA Definitions

| Priority | Definition | Response Time | Resolve Time | Example |
|----------|-----------|---|---|---|
| **P0** | System completely down, no inventory tracking possible | <1 hour | <4 hours | Both Pi units offline for >2 hours, or all 4 cameras black |
| **P1** | Major functionality degraded, accuracy <70% or unacceptable uptime | <4 hours | <24 hours | Accuracy dropped suddenly; one camera not detecting |
| **P2** | Minor functionality issue, accuracy 70–85%, or non-critical feature broken | <24 hours | <3 days | Accuracy lower than baseline; dashboard slow |
| **P3** | Enhancement, documentation, or low-impact question | <1 week | <1 week (if accepted) | "How do I export a report?"; feature request |

**SLA starts:** When issue is first reported (WhatsApp, call, email)
**SLA ends:** When issue is fully resolved and customer confirms working

---

## Diagnostic Decision Tree (First-Contact Triage)

```
Customer Issue Reported
│
├─ "System is completely offline / I can't see any cameras"
│  ├─ Verify: Is WiFi connected? (Have owner check router lights)
│  │  ├─ No → Restart router, reconnect, re-test in 5 min
│  │  └─ Yes → Continue
│  ├─ Verify: Are both Pi units powered on? (Should have blue LED)
│  │  ├─ No → Have owner restart both, wait 2 min
│  │  └─ Yes → Continue
│  ├─ Verify: Can you ping Pi A? (SSH attempt)
│  │  ├─ No → SSH failure, likely network issue → Escalate to Tier 3
│  │  └─ Yes → Continue
│  └─ Check: Is systemctl service running?
│     ├─ No → Restart service, re-test
│     └─ Yes → Check logs for errors → Escalate to Tier 3
│
├─ "Cameras are working but accuracy is very low (>20% off manual count)"
│  ├─ Check: Has anything changed physically in the shop?
│  │  └─ Yes (new lighting, camera moved, shelves rearranged) → Recalibrate cameras
│  ├─ Check: Is WiFi stable? (Check for disconnects in log)
│  │  └─ No → Stabilize WiFi first, re-test
│  ├─ Test: Do a manual count in one area, compare to dashboard
│  │  ├─ Manual count: 20 items; System: 8 items → Likely camera angle issue
│  │     └─ Adjust camera angle, recalibrate
│  │  └─ Manual count: 20 items; System: 15 items → Likely confidence threshold too high
│  │     └─ Lower threshold, re-test
│  └─ If still low after recalibration → Escalate to Tier 3
│
├─ "Monthly bill is wrong (too high or too low)"
│  ├─ Ask: Are you comparing to manual count, or to your estimate?
│  │  └─ If estimate → Explain system counts actual items, not estimate
│  ├─ Do a manual count in a major area (e.g., snacks section)
│  │  ├─ System count matches manual (>90%) → Bill is correct based on accurate count
│  │  └─ System count doesn't match (<85%) → Investigate accuracy issue (see above)
│  ├─ If customer still disputes, escalate to Tier 3 → Finance review
│  └─ If clear system error → Issue credit for overcharge
│
├─ "WiFi keeps dropping, system goes offline and comes back"
│  ├─ Check: WiFi signal strength at Pi location (from logs)
│  │  ├─ Weak (<-70 dBm) → Suggest moving Pi closer to router, or WiFi extender
│  │  └─ Strong (>-60 dBm) → Router issue likely → Restart router, test 24 hours
│  ├─ If drops continue → Escalate to Tier 3 (may need different WiFi solution)
│  └─ Document: System is working as designed (offline buffering); customer can add WiFi booster
│
├─ "One camera is showing black/no image"
│  ├─ Check: Is the camera powered? (USB LED should be lit)
│  │  ├─ No → Check USB connection, reseat firmly
│  │  └─ Yes → Continue
│  ├─ Check: Is the lens clean? (Dust/dirt can cause black image)
│  │  ├─ Dirty → Have customer gently clean with dry cloth
│  │  └─ Clean → Continue
│  ├─ Test: Can you see the camera in lsusb output? (from SSH)
│  │  ├─ No → USB connection lost, try different USB port on Pi
│  │  └─ Yes → Continue
│  ├─ If still black → Camera may be defective → Escalate to Tier 4 → Replace camera
│  └─ If fixed → Re-run calibration (accuracy may have drifted)
│
└─ "General question (not technical issue)"
   └─ Refer to FAQ, provide dashboard walkthrough link, or schedule follow-up call
```

---

## Remote Troubleshooting Protocol (Tier 2 Agent)

### SSH Access & Basic Checks

```bash
# Connect to Pi A
ssh pi-a.local (or IP address if DHCP not available)
# Password: [Standard Pi password]

# Verify system is running
systemctl status shopshop-detector
systemctl status shopshop-sync

# Check all cameras connected
lsusb | grep -i camera
# Should show 4 devices or similar

# Check storage (should be >50% free)
df -h

# Check temperature (should be <70°C)
vcgencmd measure_temp

# Check WiFi connection
iwconfig wlan0 (or similar)
# Should show SSID, link quality, signal level

# View recent error logs
tail -100 /var/log/shopshop/detector.log | grep -i error

# Restart detector service (if unresponsive)
sudo systemctl restart shopshop-detector

# Monitor logs in real-time
tail -f /var/log/shopshop/detector.log
```

### Remote Diagnostics Playbook

**For accuracy issues:**
```bash
# Check model inference logs
grep "confidence" /var/log/shopshop/detector.log | tail -20

# If confidence <85% across all items:
# - Likely lighting issue or camera misalignment
# - Ask customer: "Have you noticed any change in shop lighting or camera position?"
# - Solution: Recalibrate (see training guide) or adjust camera angle

# If confidence is low only for specific items:
# - Likely those items are new or poorly lit
# - Solution: Add item to training set (if available) or adjust camera
```

**For connectivity issues:**
```bash
# Check WiFi stability
wpa_cli status
# Should show "wpa_state=COMPLETED"

# Check sync status (should succeed every 2–5 minutes if WiFi available)
grep "sync" /var/log/shopshop/sync.log | tail -20

# If syncs are failing:
# - Check DNS resolution: ping 8.8.8.8
# - Check if WiFi password changed on router
# - Suggest: Forget WiFi, re-connect, re-enter password
```

**For hardware issues:**
```bash
# Check if USB ports are overloaded
lsusb
# Count devices; if >10, may be power issue

# Check Pi temperature
vcgencmd measure_temp
# If >75°C, check for blocked vents or high ambient temp

# If Pi won't boot
# - Check power supply with multimeter (should be 5.1V)
# - Check SD card corruption: try booting from backup SD
# - If still failing → Escalate (likely SD card or CPU issue)
```

---

## Customer Health Scoring

### Health Score Formula (0–100)

```
Health Score = (0.3 * Uptime) + (0.25 * Accuracy) + (0.2 * Engagement) + (0.15 * Billing) + (0.1 * Support)

Where:
- Uptime: % of time system was running (target: >99% = 100 points)
- Accuracy: Average confidence score (target: >90% = 100 points)
- Engagement: Dashboard usage frequency (daily = 100, weekly = 50, <monthly = 0)
- Billing: No errors in last 3 months (no errors = 100, minor discrepancy = 50, major issue = 0)
- Support: Support tickets resolved (low tickets = 100, many tickets = lower score)
```

### Health Score Tiers & Actions

| Score | Status | Action |
|-------|--------|--------|
| 80–100 | Thriving | Monthly health check, gather for testimonial/referral |
| 60–79 | Healthy | Monthly health check, proactive outreach quarterly |
| 40–59 | At-Risk | Weekly check-ins, identify pain points, offer support |
| 0–39 | Critical | Immediate outreach, executive escalation, save-the-account plan |

---

## Churn Risk Detection

### Warning Signals (Red Flags)

Monitor for patterns. If **3+ of these** appear within 7 days, flag as churn risk:

1. **Usage drop >20%** (e.g., dashboard accessed 20 times/week → 10 times/week)
2. **Accuracy declining** (e.g., 92% → 88% → 84% over 2 weeks)
3. **Support tickets increasing** (more than usual for customer)
4. **Negative feedback** ("I'm not happy with accuracy"; "Too many issues")
5. **Late payment** (payment due date missed by 3+ days)
6. **Infrequent social engagement** (no response to promotional emails/messages)
7. **Long system offline periods** (>4 hours offline, not due to WiFi)
8. **Known competitive contact** (customer mentioned competitor in call notes)

### Churn Prevention Actions

**When churn risk detected:**

1. **Same-day outreach**
   - Call customer (not WhatsApp): "Hi [Name], I noticed a few issues with your system. Can we hop on a quick call to troubleshoot?"
   - Listen actively. Don't defend the product; listen for pain.

2. **Root cause discovery**
   - "What's been the biggest frustration with ShopSense?"
   - "If you could change one thing, what would it be?"
   - "Are you comparing us to another vendor? If yes, what are they offering?"

3. **Immediate action**
   - If technical issue (accuracy, uptime): Escalate to Tier 3 for urgent fix
   - If accuracy issue: Offer free on-site recalibration
   - If billing issue: Offer manual audit and credit if warranted
   - If expectation mismatch: Reset expectations or offer training refresher

4. **Follow-up plan**
   - Schedule follow-up call for 3 days (after action taken)
   - Daily check-ins for 1 week (by phone, not WhatsApp)
   - Offer discount on next month if customer is on fence

5. **Escalate if still at-risk**
   - Involve Vaishak (CEO or co-founder) for personal call
   - Offer special terms (e.g., 3-month pause instead of cancellation, or discount)

---

## Proactive Outreach Triggers

### Automated Outreach (Check daily)

**Trigger: Usage drop >20%**
```
Condition: Dashboard access last 7 days < 80% of previous 7 days
Action: Send WhatsApp: "We noticed you haven't checked the dashboard recently. Everything OK? Just want to make sure the system is working well for you. Call if you need anything!"
Escalate if no response in 24 hours → Tier 3 → Call
```

**Trigger: Accuracy below 85%**
```
Condition: 3-day rolling average accuracy <85%
Action: Check if legitimate cause (lighting change, WiFi drops, etc.) or actual issue
If issue: Send WhatsApp: "We've noticed some accuracy drift this week. We'll investigate and fix. Expect a call from us within 4 hours."
Escalate to Tier 2 → Diagnose & fix
```

**Trigger: No activity for 3+ days**
```
Condition: No transactions recorded in system for 3+ consecutive days (and shop should be open)
Action: Check if shop is closed (holiday, closed for renovation) or system is offline
If offline: Treat as P0 → Immediate Tier 2 diagnosis
If offline & customer not aware: P0 + escalate to Tier 3 → On-site if needed
```

**Trigger: Payment not received by day 5 post-billing**
```
Condition: Invoice generated on day 1 of month; payment not received by day 5
Action: Send reminder WhatsApp: "Payment for [Month] ShopSense subscription (₹2K) is due. Invoice details: [LINK]. Please pay by [DUE_DATE]. Any questions?"
If payment still not received by day 10: Call customer, offer payment plan if needed
If payment not received by day 15: Consider service suspension (discuss with Vaishak first)
```

---

## Monthly Health Check Protocol

### Scheduled Monthly Check-In (Same date each month, e.g., 5th)

**Pre-call prep (15 minutes):**
1. Pull customer data from Firebase:
   - Uptime (last 30 days)
   - Accuracy (last 30 days, daily average)
   - Number of support tickets
   - Most recent feedback/NPS
   - Payment status
   - Usage frequency

2. Calculate health score
3. Identify 2–3 specific wins to mention ("Your accuracy has improved to 92%! Great work.")
4. Prepare 1–2 questions or suggestions

**Call (10–15 minutes):**

1. **Open warmly** (2 min)
   - "Hi [Name]! It's [YOUR_NAME] from Ooru Logix. Just checking in on how ShopSense is doing for you!"

2. **Celebrate wins** (2 min)
   - "Your system has been rock-solid this month—99.2% uptime and 92% accuracy. That's excellent."
   - "You've saved about [X hours/days] of manual inventory work this month. Nice!"

3. **Ask about pain** (3 min)
   - "Anything bugging you about the system lately?"
   - "Any features you wish we had?"
   - "How's the team handling the auto-billing?"
   - Listen. Don't interrupt.

4. **Share recommendations** (3 min)
   - If accuracy slightly low: "I noticed accuracy at 88% last week. Might be lighting change or camera angle. Want us to check it out?"
   - If low engagement: "You haven't checked the dashboard in 2 weeks. If there's anything confusing, happy to walk you through it again."
   - If all good: "Keep doing what you're doing! You're a model customer."

5. **Schedule next check** (1 min)
   - "Great chat. Let's do this again next month on the [DATE]. You all set?"

6. **Document** (5 min post-call)
   - Log feedback in Firebase (customer_health_check collection)
   - Update NPS if customer mentioned satisfaction
   - Flag any new issues for Tier 2 follow-up
   - Schedule next check (auto-calendar reminder)

---

## WhatsApp Support Templates

### Template 1: Issue Received (Tier 1 acknowledgment)
"Hi [Name]! Thanks for reporting that. We're looking into it. You should hear back from us within [TIME]. If urgent, call us at [PHONE]."

### Template 2: Diagnosis Update (Tier 2 in-progress)
"Hi [Name]! We've diagnosed the issue. Here's what we found: [BRIEF_EXPLANATION]. We're working on a fix now. Expect resolution by [TIME]. Let me know if you have questions!"

### Template 3: Resolved (Tier 2 complete)
"All fixed! [ISSUE] is now resolved. We've tested it on our end and everything looks good. Please test on your end and let us know if you see any issues. Thanks for your patience!"

### Template 4: Follow-Up (Post-resolution)
"Quick follow-up: Did the fix we implemented work for you? Let us know if you're still seeing any issues. Want to make sure everything is perfect!"

### Template 5: Proactive Check-In (Health monitoring)
"Hi [Name]! Just wanted to check in and make sure everything's running smoothly. Anything you'd like us to look at or any questions? Happy to help!"

### Template 6: Escalation (Tier 3 soft handoff)
"Hi [Name]! This one needs some deeper investigation. One of our senior engineers, [NAME], will reach out to you within [TIME] to take over. Thanks!"

---

## Escalation Path & Decision Tree

```
Tier 1: Self-Serve
├─ Resolved? YES → Document & close
├─ Resolved? NO → Escalate to Tier 2
│
Tier 2: AI Agent
├─ Resolved? YES → Document & close
├─ Resolved? NO & Hardware suspected? → Escalate to Tier 3
├─ Resolved? NO & Churn risk detected? → Escalate to Tier 3
├─ Resolved? NO & Customer wants human? → Escalate to Tier 3
└─ Resolved? NO & Can't diagnose remotely? → Escalate to Tier 3
   │
   Tier 3: Remote Support (Vaishak)
   ├─ Resolved? YES → Document & close
   ├─ Resolved? NO & Hardware defect? → Escalate to Tier 4
   ├─ Resolved? NO & On-site visit needed? → Schedule Tier 4
   └─ Resolved? NO & Customer satisfaction critical? → Tier 4 + personal involvement
      │
      Tier 4: On-Site Visit
      └─ Physical fix + personal relationship management → Close
```

---

## Support Skills & Knowledge Required

1. **Technical Skills**
   - SSH into Raspberry Pi, file navigation
   - Log file analysis (grep, tail, patterns)
   - USB and network diagnostics
   - Firmware understanding (detection models, accuracy thresholds)
   - Firebase queries (customer records, transaction logs)

2. **Customer Communication**
   - Active listening (not jumping to solutions)
   - Empathy ("This must be frustrating")
   - Clear technical explanations for non-technical people
   - Kannada/Hindi basic phrases (to build rapport)
   - De-escalation (if customer is angry)

3. **Process & Tools**
   - SLA tracking (response time adherence)
   - Firebase CRM operations
   - Decision tree navigation
   - Diagnostic playbook reference
   - Health score calculation

4. **Business Acumen**
   - Churn prevention (recognize early warning signs)
   - Upsell opportunities (WiFi extender, additional cameras)
   - Customer segmentation (VIP vs. standard)
   - ROI talking points (time saved, errors prevented)

---

## Metrics & Dashboards

### Daily Support Metrics
- [ ] P0 issues: count, resolution time, still open?
- [ ] P1 issues: count, resolution time, still open?
- [ ] Average response time (should be <15 min for Tier 1, <4 hours for Tier 2)
- [ ] First-contact resolution rate (goal: >70%)
- [ ] Churn risk flags detected this week

### Weekly Health Report
- [ ] Customers dropped below health score 60 (target: 0)
- [ ] Proactive outreach sent: [COUNT] (goal: 5–10 per week)
- [ ] Average health score (target: >75)
- [ ] New testimonials or 9–10 NPS responses

### Monthly Review
- [ ] SLA compliance: Tier 2 <4hr response (goal: >95%)
- [ ] Churn rate (goal: <5%)
- [ ] Customer retention rate (goal: >95%)
- [ ] NPS (goal: >40)
- [ ] Support ticket volume trend (should be stable or declining with AI improvements)

---

## Files & Resources

- **Diagnostic Playbook:** `templates/diagnostic-playbook.md`
- **Health Scorecard Template:** `templates/health-scorecard.md`
- **Firebase Collections:** `customers`, `support_tickets`, `health_checks`, `transactions`
- **Escalation Contact:** Vaishak [PHONE], [EMAIL]
- **Support Hours:** [DEFINE: 9 AM–6 PM IST weekdays, on-call for P0 24/7]

