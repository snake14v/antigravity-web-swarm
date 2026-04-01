# Customer Onboarding Skill — Ooru Logix ShopSense

## Overview
This skill manages the complete end-to-end onboarding workflow for new ShopSense customers—from payment confirmation through go-live and first-week stabilization. The goal is to transition customers from purchase to independent, confident operation within 14 days, with accuracy >90% and all staff trained.

**Target audience:** Shop owners and staff with limited tech literacy, primarily Kannada/Hindi/English speakers in Bangalore.

**Success criteria:**
- Owner can operate system independently after day 1 training
- Accuracy >90% by end of week 1
- All staff trained and confident with basic operations
- System uptime >99%, zero billing errors
- Customer ready for handoff to ongoing support by day 14

---

## Phase 1: Payment Confirmed → Kit Preparation (Days 0–2)

### Trigger
Customer has completed payment for ShopSense kit (₹25K) and monthly SaaS plan (₹2K/month).

### Responsibilities
1. **Payment Verification**
   - Confirm payment received in Firebase registrations collection
   - Update registration status to "payment_confirmed"
   - Log timestamp and transaction ID

2. **Kit Preparation Checklist** (See dedicated template below)
   - Flash latest firmware to both Raspberry Pi 4 units
   - Test all 4 cameras (power, USB connection, image quality)
   - Label serial numbers on each unit (Pi A, Pi B, Cam 1–4)
   - Pack accessories: power cables, USB extenders, ethernet cables, WiFi adapter
   - Prepare quick-start card with WiFi credentials
   - Document kit contents in database

3. **Customer Communication**
   - Send WhatsApp message (Template 1): "Payment received! We're preparing your ShopSense kit. Installation scheduled for [DATE]. Reply with your preferred time window. Namaste!"
   - Confirm customer WhatsApp number in Firebase users collection
   - Schedule follow-up call to confirm logistics (if customer doesn't respond within 4 hours)

4. **Installation Scheduling**
   - Coordinate with site for preferred installation date (ideally day 5–7 post-payment)
   - Confirm: shop hours, WiFi availability, backup power, key contact person
   - Dispatch engineer ~2 days before scheduled install
   - Send WhatsApp reminder (Template 2): "Installation confirmed for [DATE] at [TIME]. Our team will arrive with your kit. Please keep the shop owner available. Contact [PHONE] if any changes needed."

---

## Phase 2: On-Site Installation (Day 5–7, typically)

### Pre-Visit Preparation
- Review site survey completed during scheduling
- Load shop-specific parameters (shop name, address, category: chai/kirana)
- Prepare firmware with shop settings pre-loaded
- Pack engineer toolkit (See installation runbook template)

### On-Site Installation Protocol (See dedicated template below)
The field engineer executes the following in sequence:

1. **Site Assessment (15 min)**
   - Verify power outlets, WiFi availability, mounting points
   - Check lighting conditions (day/night, natural light, shadows)
   - Identify inventory zones and high-traffic areas
   - Take photos of site for records

2. **Hardware Installation (45 min)**
   - Mount cameras at optimal angles for inventory coverage
   - Connect both Pi units (one at counter, one at rear)
   - Wire power and network connectivity
   - Test each component for functionality

3. **Software Configuration (30 min)**
   - Connect Pis to local WiFi network
   - Verify firmware version on both units
   - Set shop-specific parameters (working hours, item categories)
   - Configure offline-first data storage

4. **Model Calibration (20 min)**
   - Point cameras at inventory
   - Run detection test
   - Adjust confidence thresholds for shop environment
   - Verify accuracy on known items (10 items manually counted vs. system count)

5. **Owner Walkthrough (30 min)** (See training guide template)
   - Demonstrate dashboard access and key metrics
   - Show how to interpret daily inventory report
   - Explain how billing is generated (automatic, not manual)
   - Teach daily startup/shutdown routine
   - Get owner sign-off on system readiness

### Post-Install Verification
- Run full billing cycle (simulate transactions)
- Compare system count to manual count (should match >95%)
- Document baseline accuracy and uptime
- Upload installation photos and calibration logs to Firebase

### Field Engineer Reports Back
- Update Firebase: installation status → "installed", install_date, engineer notes
- Send WhatsApp (Template 3): "Installation complete! Your system is live and monitoring inventory. We'll check in daily for the next 7 days. Call [PHONE] if you have any questions. Thank you!"

---

## Phase 3: Owner & Staff Training (Day 1–2 Post-Installation)

### Owner Training Session (30 minutes, typically day 1 afternoon)

**Agenda:**
1. System Overview (5 min)
   - What ShopSense does: automatic inventory count, tracks sales, detects shrinkage
   - How it helps: saves 30+ minutes/day, reduces billing errors, improves ordering

2. Daily Startup Routine (5 min)
   - Power on both Pi units (Pi A first, wait 2 min, then Pi B)
   - Wait for WiFi indicator (blue LED on Pi A)
   - Open dashboard on shop tablet/phone: [LINK_TO_DASHBOARD]
   - Note: system starts counting inventory at this point

3. Reading the Dashboard (10 min)
   - Current inventory count (updated every 60 sec)
   - Daily sales by category
   - Items flagged as low-stock or missing
   - Accuracy confidence score (should be >90%)
   - Timestamp of last cloud sync (when WiFi connected)

4. Daily Accuracy Check (5 min)
   - Compare dashboard count of one section (e.g., snacks shelf) with manual count
   - If accuracy <85%, adjust camera angle or lighting
   - Log the check in notes (optional, but helpful for support)

5. How Billing Works (3 min)
   - System automatically counts items sold (no manual data entry needed)
   - At end of month, system generates bill: actual items sold × unit price
   - Billing errors near zero because system is automated
   - Payment due within 5 days (handled separately)

6. Who to Call & When (2 min)
   - Camera not detecting items → call [PHONE]
   - System down/offline → call [PHONE]
   - Billing question → email [EMAIL]
   - Before 9 AM or after 9 PM → leave WhatsApp message

**Delivery mode:** In-person at shop, led by onboarding engineer. Use laptop/tablet to show dashboard. Speak in Kannada or Hindi as appropriate. Keep notes simple and visual.

### Staff Training Session (15 minutes, ideally on day 1 evening)

**Audience:** Shop assistants, helpers (typically 2–4 staff)

**Agenda:**
1. What the Cameras Do (3 min)
   - Four cameras monitor inventory automatically
   - NO manual counting needed from staff
   - System is always watching and recording (for security + accuracy)

2. How Automatic Billing Works (3 min)
   - When an item leaves the shelf (sold), cameras detect it
   - System automatically adds to daily sales list
   - At month-end, owner gets bill based on actual sales
   - Staff don't need to enter data; system is automatic

3. What NOT to Do (5 min)
   - DO NOT block cameras with boxes, bags, or bodies
   - DO NOT move cameras or adjust angles (call us if you think alignment is wrong)
   - DO NOT cover the Pi units or their vents (they can overheat)
   - DO NOT unplug anything unless told to do so

4. How to Report Issues (4 min)
   - If a camera looks blocked or dusty → tell the owner, who will call us
   - If Pi unit is beeping or hot → turn it off and call us immediately
   - If system is offline → check WiFi connection, or call us
   - Owner has contact card with our number; stick it on the counter

**Delivery mode:** In-person at shop, keep it brief and casual. Use visual examples (point to cameras, show the Pi units). Speak in Kannada or Hindi. Hand out laminated quick-reference card.

### Quick Reference Card (For Print)
A4 laminated card (simple visual guide, placed next to cash counter):
- Icon + text: "Cameras are watching inventory—thank you for not blocking them!"
- Icon + text: "System is automatic—no manual counting needed"
- Icon + text: "Questions? Call [PHONE] or WhatsApp [WHATSAPP]"
- Icons for: camera, Pi units, power, WiFi
- Kannada translation of key phrases underneath each section

### Training Completion Checklist
- [ ] Owner understands dashboard
- [ ] Owner can explain how billing works
- [ ] Owner knows who to call for issues
- [ ] Staff understand camera importance
- [ ] Staff know what not to do
- [ ] Laminated quick-ref card is visible in shop
- [ ] Owner has engineer contact card

---

## Phase 4: Go-Live (Day 7–8)

### Go-Live Readiness Checklist
Before marking system as "live," verify:
- [ ] All 4 cameras detecting items in real-time
- [ ] Dashboard shows accurate counts (>90% match with manual check)
- [ ] Billing data is being generated (at least 2 test transactions recorded)
- [ ] WiFi connection stable for >2 hours
- [ ] Both Pi units running at normal temperature (<70°C)
- [ ] Owner confident with basic dashboard operations
- [ ] Staff aware of system and basic do's/don'ts
- [ ] All contact info (WhatsApp, phone, email) confirmed

### Go-Live Communication
- Send WhatsApp (Template 4): "Go-live confirmed! Your system is now fully operational and monitoring inventory 24/7. We'll call you daily for the next 7 days to ensure everything is working perfectly. Nannige all the best!"
- Update Firebase: onboarding_status → "live", go_live_date, baseline_accuracy
- Copy customer into monthly support schedule

---

## Phase 5: First-Week Monitoring (Days 8–14)

### Daily Monitoring Routine
**For each of the 7 days post-go-live:**

1. **Accuracy Check (Morning, ~9 AM)**
   - Query Firebase for previous day's accuracy score
   - If accuracy <85%, flag for investigation
   - Check for pattern (e.g., always inaccurate in a specific zone)

2. **Daily Owner Call (Afternoon, ~2 PM)**
   - "Good afternoon! Just checking in on your ShopSense system. Everything working well?"
   - Listen for issues: cameras not detecting, accuracy concerns, billing questions
   - If issue reported, follow diagnostic playbook (See support skill template)
   - If no issue, reassure and remind them we're here to help
   - Duration: 2–5 minutes, friendly tone

3. **Adjustment & Escalation**
   - If camera angle is clearly wrong (e.g., pointing at wall), schedule minor adjustment
   - If accuracy remains <85% after 3 days, escalate to engineer for recalibration
   - If system is offline >2 hours, investigate connectivity issue immediately

### End-of-Week Review (Day 14)
- Pull comprehensive report: uptime, accuracy trend, customer usage, any issues
- If all metrics green (uptime >99%, accuracy >90%, zero issues): proceed to handoff
- If any metrics concerning: extend monitoring for another week
- Update Firebase: onboarding_status → "stable" or "extended_monitoring"

---

## Phase 6: Handoff to Ongoing Support (Day 14+)

### Prerequisites for Handoff
- System uptime >99%
- Accuracy >90% (measured over 7 days)
- Owner can operate system independently
- Staff trained and confident
- Zero critical issues outstanding
- Customer has paid first month's SaaS fee

### Handoff Activities
1. **Schedule Monthly Health Check**
   - Enroll customer in monthly check-in schedule (See support skill template)
   - Set calendar reminder for same date each month (e.g., 5th of month)

2. **Final Handoff Communication**
   - Send WhatsApp (Template 5): "Your system has been running perfectly for 2 weeks. You're now officially 'live' and part of the ShopSense family! We'll call you monthly to keep things running smooth. Thank you for being an awesome customer!"
   - Update Firebase: onboarding_complete = true, handoff_date, final_accuracy, final_uptime

3. **Customer Feedback**
   - Brief NPS survey (1 question): "How likely are you to recommend ShopSense to another shop owner? 1–10"
   - Log feedback in Firebase for future reference

4. **Archive Onboarding Docs**
   - Store installation notes, training materials, calibration logs in customer folder
   - Clean up temporary test data from Firebase

---

## Onboarding Success Metrics

| Metric | Target | How to Measure |
|--------|--------|-----------------|
| Time to go-live | <14 days post-payment | go_live_date - payment_date |
| Accuracy at go-live | >85% | Manual count vs. system count |
| Accuracy at day 14 | >90% | 7-day average from Firebase |
| Uptime | >99% | Firebase timestamp logs |
| Owner confidence | Owner can operate independently | Post-training assessment |
| Staff training | 100% of staff trained | Training completion checklist |
| Billing accuracy | Zero errors in first month | Finance review post-month-end |
| Time saved (perceived) | >30 min/day | Owner feedback during calls |
| Churn at day 30 | 0% | Payment status in Firebase |

---

## WhatsApp Onboarding Message Sequence

### Template 1: Payment Confirmation (Day 0)
"Namaste! Payment received for your ShopSense kit. We're preparing your system now. Installation scheduled for [DATE]. Please reply with your preferred time (morning/afternoon). Thank you for choosing Ooru Logix!"

### Template 2: Pre-Installation Reminder (Day 3–4)
"Installation confirmed for [DATE] at [TIME]. Our team will arrive with your complete ShopSense kit. Please keep the shop open and ensure WiFi is available. Questions? Call [PHONE]."

### Template 3: Installation Complete (Day 7, evening)
"Installation complete! Your system is live and monitoring inventory. We'll check in daily for the next week. Any issues, call [PHONE]. Thank you!"

### Template 4: Go-Live Confirmation (Day 8, morning)
"Go-live confirmed! Your ShopSense system is now fully operational 24/7. Expect daily check-in calls. All the best with your new system!"

### Template 5: Handoff to Support (Day 14+)
"2 weeks down, unlimited success ahead! Your system is running perfectly. You're now officially 'live'. We'll check in monthly. Call us anytime if you need help. Thank you for trusting Ooru Logix!"

---

## Troubleshooting During Onboarding

### Common Issues & Resolution

**Issue: Customer unavailable for training**
- Send WhatsApp asking to reschedule
- Offer evening training (after shop hours)
- If still unavailable after 2 attempts, proceed with text-only training guide + follow-up call

**Issue: WiFi too weak at shop**
- Suggest moving Pi unit closer to router
- Offer WiFi extender (if in kit)
- If no solution, escalate to engineer for alternative connectivity (e.g., mobile hotspot)

**Issue: Accuracy <85% after installation**
- Check if cameras are actually detecting items (test with hand in front of camera)
- Adjust camera angles by 5–10 degrees
- Check lighting conditions (is it too dark? too much shadow?)
- Run calibration test again
- If still <85% after re-calibration, escalate to engineer for model re-training

**Issue: Customer reports billing discrepancy in first week**
- Clarify: are they comparing system count to their estimate, or to a manual count?
- Run manual count in one section with them present to verify accuracy
- If accuracy >90%, educate customer on expected billing accuracy
- If accuracy <85%, investigate as technical issue (see diagnostic playbook in support skill)

---

## Decision Tree: When to Escalate

```
Customer Issue During Onboarding
├─ Hardware not functioning (camera dead, Pi won't boot)
│  └─ Escalate to Engineer → On-site visit
├─ Accuracy <80% after 3 calibration attempts
│  └─ Escalate to Engineer → Re-calibrate or replace unit
├─ WiFi connectivity impossible at shop
│  └─ Escalate to Support Lead → Problem-solve alternative connectivity
├─ Customer requests 3+ rescheduled training sessions
│  └─ Escalate to Support Lead → May indicate customer fit issue
└─ Everything else
   └─ Continue standard onboarding
```

---

## Onboarding Skills & Knowledge Required

To successfully execute this skill, the agent must have:

1. **Technical Knowledge**
   - Raspberry Pi 4 basics (power, booting, network config)
   - Camera connectivity (USB, power requirements)
   - Edge AI model basics (inference, accuracy, thresholds)
   - Offline-first data sync concepts

2. **Customer Communication**
   - Patient, clear explanations for non-technical users
   - Ability to speak Kannada/Hindi basics (greetings, key instructions)
   - Empathy for shop owners' concerns (will this break my shop? how much time will it take?)

3. **Process Management**
   - Tracking customer state through Firebase
   - Coordinating multi-step workflows
   - Scheduling logistics (installation dates, follow-up calls)

4. **Problem-Solving**
   - Diagnostic thinking (if accuracy is low, what are the possible causes?)
   - Collaborative approach (work with customer to find solution, not blame them)

---

## Files & Resources

- **Installation Runbook:** `templates/installation-runbook.md`
- **Training Guide:** `templates/training-guide.md`
- **Firebase Collections:** `registrations`, `users`, `pilots`
- **Support Skill:** `../customer-support/SKILL.md` (for escalations)
- **Contact Info:** [To be populated with actual phone, email, WhatsApp numbers]

