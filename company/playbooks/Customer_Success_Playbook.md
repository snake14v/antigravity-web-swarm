# Customer Success Playbook — ShopSense

What happens after a ShopSense system is deployed. This playbook prevents churn, generates referrals, and builds testimonials for fundraising.

---

## Day 0 — Installation

The customer's first experience. Get this right or they'll return the unit.

### Pre-Installation Checklist (Do 1 day before arrival)

Call/WhatsApp the shop owner and confirm:

- [ ] **Power outlets:** Counter has a dedicated outlet within 2m of where touchscreen will sit (to avoid extension cords)
- [ ] **WiFi strength:** Test signal strength at the counter (phone shows 3+ bars)
- [ ] **Counter dimensions:** Measure the exact width and depth of counter. Minimum space for touchscreen: 30cm W × 20cm D
- [ ] **Stock clearance:** Owner will clear counter space (remove items, clean surface)
- [ ] **Staff present:** Owner + 1-2 staff will be available for 2-hour window
- [ ] **Opening hours:** Confirm counter opens at 6 AM (avoid installation during rush)
- [ ] **Parking:** Confirm parking location near shop (for van)
- [ ] **Backup plan:** If anything breaks during install, where is nearest shop with WiFi for remote help?

**Send message:** "We're coming tomorrow 9 AM. Counter should be clear. See you then."

### Installation Procedure (Step-by-step, ~2 hours total)

**Phase 1: Physical Setup (20 min)**

1. Unpack both Pi units, cameras, touchscreen
2. Test touchscreen by plugging into Pi 1 (POS unit) — verify display shows boot
3. Mount Pi 1 under counter on bracket (left side)
4. Mount Pi 2 (sync unit) on bracket (right side, visible for WiFi connectivity)
5. Install 4× USB cameras on arms (over counter, angled down)
6. Route all cables behind counter to power outlet
7. Plug in power supplies
8. **Wait 60 seconds** for both Pis to boot fully

**Phase 2: Network Setup (15 min)**

1. SSH into Pi 1 from your laptop: `ssh pi@192.168.1.X`
2. Confirm WiFi is connected: `iwconfig`
3. Check model loaded: `ps aux | grep yolo`
4. If model NOT running, start it: `sudo systemctl start shopsense`
5. Test sync between Pi 1 and Pi 2: `curl localhost:8000/sync-status`
6. If sync fails, check static IP: `ip addr show wlan0`

**Phase 3: Touchscreen Calibration (10 min)**

1. Bring up calibration menu on touchscreen
2. Touch 4 corners as prompted
3. Tap "Accept"
4. Test responsiveness by tapping camera feed on screen — should show live feed from all 4 cameras

**Phase 4: Live Demo (15 min)**

1. Have shop owner stand at counter (natural position)
2. Ring up 5-10 items using touchscreen (teach billing flow)
3. Point out: "See how the system detected every item? No manual entry."
4. Show confidence scores on screen (should be >85% for real items)
5. Ask: "Do you see anything the system missed?" (identify false negatives now)

**Phase 5: Staff Training (20 min)**

Run a quick training with 2-3 staff who'll use the system:

- Opening the app (home screen)
- Ringing up items (tap or scan barcode)
- Modifying quantity (if customer bought 2 of same item)
- Handling false positives (if system detected something that wasn't bought)
- Power cycle recovery (if touchscreen freezes)

**Key point:** Keep training simple. Most staff will learn by doing, not by listening.

### Go-Live Checklist (Before you leave)

Verify these before leaving the shop:

- [ ] Touchscreen shows live camera feed from all 4 angles
- [ ] At least 1 test transaction completed and saved to database
- [ ] Owner can see today's transaction count on dashboard
- [ ] WiFi sync between Pi 1 and Pi 2 confirmed (check LED on Pi 2)
- [ ] Owner has my WhatsApp number saved
- [ ] Owner knows to call if anything breaks before Day 1 check-in
- [ ] Power is stable (no breaker flips, monitor lights steady)
- [ ] Logs are being written: `tail -f /var/log/shopsense/app.log`

### WhatsApp Welcome Message Template

Send immediately after leaving the shop:

```
Namaste [Owner Name]! Welcome to ShopSense.

Your system is live. You'll see a summary every evening at 8 PM.

Quick tips:
- If touchscreen goes black: press the power button on Pi 1 (left side)
- If you see wrong items: tell me, I'll fix the model
- Any issues: call me anytime

I'm checking in tomorrow 8 AM to see how the first morning went.

See you then! 🙏
[Your WhatsApp]
```

---

## Day 1 — First Day Check-in

The critical 24-hour window. This determines if the customer succeeds or returns the unit.

### Morning Call (8 AM)

Call the shop owner. Script:

"Good morning! How was the morning rush? I'm checking in to see if ShopSense caught everything."

**Listen for:**
1. Any missed detections ("I rang up a [item] but the system didn't catch it")
2. False positives ("It detected something that wasn't actually bought")
3. Touchscreen responsiveness issues
4. Staff confusion about the workflow

**Your response:**
- Missed detection → Log it. Collect a photo of the item. Retrain model with better data.
- False positive → Likely a shadow or reflection. Adjust camera angle or lighting.
- Touchscreen slow → Check if model is running. Restart service if needed.
- Staff confusion → Offer to do a 10-minute remote training call with the team.

**Reassure:** "This is normal. Every shop is slightly different. I'm collecting data to make the model better for you."

### Remote Monitoring Checklist

While on the call, SSH into the Pi and verify:

- [ ] Process running: `ps aux | grep yolo`
- [ ] No crash logs: `tail -20 /var/log/shopsense/app.log | grep -i error`
- [ ] Database OK: `sqlite3 /var/lib/shopsense/data.db "SELECT COUNT(*) FROM transactions;"`
- [ ] WiFi stable: `iwconfig wlan0` (check signal quality)

### Day 1 Report Template

**Send to customer that evening (8 PM):**

```
ShopSense Daily Report — [Date]

📊 Today's Stats
- Transactions detected: [COUNT]
- Average detection time: [X] seconds
- False positive rate: [X]%
- Staff completed: [X] transactions without errors

✅ What's working great
- [Observation from today]
- [Observation from today]

⚠️ To improve
- [One specific thing to adjust tomorrow]

💡 Next steps
- I'll check in again tomorrow morning
- Keep taking photos of any missed items
- Text me anytime if something breaks

Questions? Hit me up. 🙏
```

---

## Week 1 — Data Gathering Phase

The system is learning the shop. Your job is to collect data for model improvement.

### Daily Log Template

Create a simple spreadsheet (Google Sheets, shared with owner):

| Date | Transactions | Avg Accuracy | False Positives | Issues | Notes |
|------|---|---|---|---|---|
| Day 1 | 45 | 87% | 2 | None | Great first day |
| Day 2 | 52 | 89% | 1 | Touchscreen slow 2 PM | Restarted service |
| Day 3 | 48 | 91% | 0 | None | Model improving |

**Owner fills this in** (or staff if they're tech-comfortable). Goal: build a habit of daily review.

### Data to Collect from Each Unit

At end of each day, pull:

1. **Transaction count** — compare detected vs actual (owner knows actual from cash drawer)
2. **False positives** — items the system thought were bought but weren't
3. **Missed items** — items bought but not detected (owner provides photos)
4. **Model confidence scores** — are detections confident? (>85% is good)
5. **System uptime** — was Pi up the entire day?

**Script to pull data remotely:**
```bash
ssh pi@[shop-ip]
sqlite3 /var/lib/shopsense/data.db "SELECT COUNT(*) FROM transactions WHERE created_at > date('now', '-1 day');"
tail -100 /var/log/shopsense/app.log | grep confidence
```

### Week 1 Issues to Watch For

| Issue | Cause | Fix | Urgency |
|---|---|---|---|
| False positives increasing | Lighting change (rain, clouds) | Adjust camera, retrain on local data | P1 |
| Missed detections | Small items not in training data | Take photos, retrain model | P1 |
| Touchscreen slow (>5s response) | Model running slowly. Load avg high? | Check RAM usage, optimize model | P1 |
| WiFi sync failing | Connection drops during day | Assign static IP, check router | P1 |
| Transactions not saving to DB | SQLite locked or full | Restart service, check disk space | P0 |

### Week 1 Feedback Call (Friday)

**Schedule:** Friday evening, 30 min call

**Agenda:**
1. Show owner the data: "Week 1 shows 89% accuracy on average"
2. Ask: "What surprised you this week?"
3. Ask: "Any items we got wrong multiple times?"
4. Share your model improvement plan: "I'm collecting all the misses and retraining"
5. Preview Week 2: "Next week we measure actual ₹ savings"

---

## Week 2 — Pilot Assessment & Conversion

The conversion moment. Time to prove ROI and ask for the sale.

### Net Promoter Score Question

**Send via WhatsApp on Day 8:**

"Quick question: On a scale of 1-10, how likely are you to recommend ShopSense to another shop owner?"

**Score interpretation:**
- 9-10 = Promoter (they'll evangelize)
- 7-8 = Passive (they like it but won't push others)
- 0-6 = Detractor (they have concerns)

**If score ≤6:** Call immediately. "I see you're not totally happy. What's not working? Let's fix it."

### ROI Calculation Presentation

**Do this on Day 12-14. Create a PDF slide with their data:**

```
ShopSense ROI — [Owner Name] — Week 1 Results

📊 The Numbers
- Transactions detected: 342
- Manual errors prevented: ~30 (from false positives + misses)
- Error rate: 8.8% (down from industry 15-20%)
- Estimated ₹ savings: 30 × ₹50 (avg item value) = ₹1,500/week

💰 Your ROI Math
- System cost: ₹25,000
- Payback period: 25,000 ÷ 1,500 = 16.7 weeks (~4 months)
- Year 1 gross savings: ₹78,000 (52 weeks × ₹1,500)

⚠️ Conservative estimate (assumes only 30 errors/week prevented)
- In reality: likely 50-80 errors/week prevented
- Real savings: ₹100,000+/year

Next: We make this permanent?
```

**Important:** Use THEIR data, not industry averages. Show your math.

### Conversion Conversation (Day 14)

**Script (adapt to their style):**

"[Owner Name], we've been running for 2 weeks. You've saved approximately ₹1,500 already. Here's what I'm proposing:

**Option 1:** Keep it as a permanent installation. ₹25,000 one-time. I support it for 6 months free, then ₹500/month for ongoing updates + support.

**Option 2:** Return the system today. No hard feelings. But you'll be back to the old way of losing ₹300+/day.

Which makes more sense for your shop?"

**Their response:**
- YES → Go to "Post-Conversion Support" section
- "I need to think" → Set callback date (max 3 days). Don't leave it open.
- NO → Ask: "What would change your mind?" (collect feedback for future pilots)

### Conversion Objection Handling

**Objection: "₹25,000 is too much"**
Response: "I understand. Let's look at the numbers. You've saved ₹1,500 in 2 weeks. In 4 months, you'll have saved ₹26,000. You're breaking even in month 4, and profiting ₹50K+ a year after that. Can you afford to NOT do this?"

**Objection: "What if it breaks?"**
Response: "I've got spare parts in Bangalore. If anything major breaks, I'll swap it out same day. You're covered for 6 months free. After that, ₹500/month includes updates + support."

**Objection: "Can I try another week?"**
Response: "Sure. But honestly, the pilot window is ending tomorrow. If we extend, I'll need to commit the unit to another shop after. Do you want to move forward, or should I start the next pilot?"

---

## Post-Conversion Support

What happens after the customer pays.

### Monthly Check-in Cadence

**WhatsApp check:** 1st Sunday of every month (5 min)
- "How's ShopSense running?"
- "Any issues?"
- "Any staff changes?"

**Visit:** Every quarter (once per 3 months, 1 hour)
- Walk through the shop
- Check physical connections (cameras, power)
- Check on staff training (new staff added?)
- Ask: "Do you know anyone else who'd benefit?"

### Model Update Protocol

**When to retrain:**
- Weekly: Collect false positives and missed items
- Monthly: Retrain model on shop-specific data

**How to push new model:**
```bash
ssh pi@[shop-ip]
cd /var/lib/shopsense/models
wget [new-model-url]
sudo systemctl restart shopsense
```

**Communication to customer:**
"I've improved the model based on your data. Pushing an update tonight. You'll see fewer mistakes starting tomorrow."

### Referral Request

**After month 1 of payment:**

"[Owner], you've been a great customer. Your data helped me improve the model. Do you know any other shop owners nearby who'd benefit? I'd be happy to do a demo."

**If they say yes:** "Great. What's their number? I'll call them and mention your name."

**If they say no:** "No problem. If you think of anyone, just let me know."

---

## Customer Health Score

Simple system to flag at-risk customers early.

### Health Score Calculation

Measure these weekly:

**Daily Usage Rate:**
- 90%+ operating (on 6+ days/week) → Healthy (2 points)
- 60-90% → Watch (1 point)
- <60% → At Risk (0 points)

**NPS Score:**
- 9-10 (Promoter) → Healthy (2 points)
- 7-8 (Passive) → Watch (1 point)
- <7 (Detractor) → At Risk (0 points)

**Support Tickets This Month:**
- 0 tickets → Healthy (2 points)
- 1-2 tickets → Normal (1 point)
- 3+ tickets → Watch (0 points)

**Total Score:**
- 5-6 points = Healthy (green)
- 3-4 points = Watch (yellow) → schedule visit
- 0-2 points = At Risk (red) → call immediately

### At-Risk Response

If any customer scores red:

1. Call that day (don't wait)
2. Ask: "How's everything going? I noticed [specific issue]"
3. Listen to their real concern (often not what you expected)
4. Offer: "I'm coming by tomorrow to check the system. Let's fix this."
5. Visit within 24 hours with spare parts if needed

---

## Churn Prevention Checklist

**Monthly:** Review all customers against this list.

- [ ] Each customer still has <60 day payment outstanding?
- [ ] Model is being retrained monthly with their data?
- [ ] Did you call them this month?
- [ ] Did you ask them for a referral?
- [ ] Are they still using the system daily?
- [ ] Have you celebrated a win with them? ("You've saved ₹50K so far!")

**If ANY check fails:** Take action that week.
