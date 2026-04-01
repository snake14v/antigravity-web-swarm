# Customer Training Guide — ShopSense

**For:** Shop owners and staff after hardware installation
**Delivery:** In-person, in Kannada/Hindi/English
**Duration:** Owner (30 min) + Staff (15 min)

---

## Owner Training (30 minutes)

### Session Setup
- **When:** Day 1 post-installation, ideally afternoon (after lunch rush)
- **Where:** Shop counter or quiet corner
- **Who:** Shop owner (or manager making purchasing decisions)
- **Materials:** Laptop or tablet showing dashboard, printed quick-reference card, training guide
- **Tone:** Friendly, reassuring. Acknowledge that the owner is busy; keep it practical and short.

---

### Part 1: System Overview (5 minutes)

**Goal:** Owner understands *what* ShopSense does and *why* it helps.

#### What It Does
"ShopSense is a system that automatically counts your inventory using cameras. Every time a customer buys something, the system detects it and adds it to your sales list. At the end of the month, we count everything that sold and give you an accurate bill. No guessing, no manual counting."

#### Why It Helps
1. **Saves Time**
   - "Instead of spending 30–40 minutes counting shelves manually, the system does it automatically"
   - "Your staff can focus on customers instead of being tied up with inventory"

2. **Reduces Errors**
   - "Manual counting is error-prone. Wrong counts lead to wrong bills. Our system is accurate >90%"
   - "You'll know exactly what sold, when, and how much"

3. **Prevents Shrinkage**
   - "If items disappear from cameras (not sold to customers), you know about it immediately"
   - "You can check for theft or damage before losses pile up"

4. **Helps with Ordering**
   - "Accurate sales data = better ordering decisions"
   - "You'll know which items sell fast and which ones sit"

**Use analogy:** "It's like having a very reliable, tireless assistant watching your shop 24/7 and taking notes on everything that happens."

---

### Part 2: Daily Startup Routine (5 minutes)

**Goal:** Owner can independently start the system each morning.

#### The Physical System
Show the owner the two Raspberry Pi units:
- "These two small boxes are the 'brain' of ShopSense. They watch the cameras and count inventory."
- Point to cameras: "These four cameras capture images of your shop. They're always on (24/7)."
- Explain: "You don't need to do anything with the cameras. They just sit there and watch."

#### Startup Steps (Practice together)

**Morning (When shop opens):**
1. "First, turn on the Pi box at the front (point to Pi A). You'll see a red light, then a blue light. Wait a moment."
2. "Then turn on the Pi box at the back (point to Pi B). Same thing—red, then blue."
3. "Wait about 2 minutes for both to fully start up. During this time, don't turn off the power."
4. "The system is now ready. It's automatically counting everything."

**Evening (When shop closes, optional):**
- "If you want, you can turn off the Pi boxes at the end of the day. Or you can leave them on 24/7—your choice."
- "If you leave them on, the system keeps working (good for night deliveries or theft detection)."
- "Just don't unplug them suddenly. Turn them off normally."

#### The Dashboard
"Once the Pis are on, open this page on any phone or computer:"
- Show them the dashboard URL: `[LINK_TO_DASHBOARD]`
- "You might need to ask your WiFi router for the password first time."
- "After that, it's just a bookmark—one click and you see your inventory."

**Practice:** Have them open the dashboard on their phone/tablet right now. Point out the main screens they'll see every day.

---

### Part 3: Reading the Dashboard (10 minutes)

**Goal:** Owner can navigate the dashboard and understand the key numbers.

#### Screen 1: Live View
Open dashboard and click "Cameras" or similar.

"This shows what the cameras see right now. Four images, one from each camera. If any area looks blocked or unclear, let us know and we'll adjust."

**Check:** Point to each camera view. "Can you see your main areas? Front shelves? Counter? Fridge?"

#### Screen 2: Current Inventory Count
Navigate to "Inventory" or "Live Count" screen.

"This is your current inventory. All the items in your shop, counted by the system right now. The number updates every 60 seconds—super fast."

**Walk through example:**
- "See 'Snacks'? The system says you have 47 items on the snacks shelf right now."
- "See 'Beverages'? 120 bottles."
- "These numbers change as customers buy things and as you restock."

**Confidence Indicator:**
"Next to each count, you see a percentage like 92% or 88%. This is how *confident* the system is about that number. >90% is great. <80% means the system is unsure (maybe camera angle is off, or bad lighting). If you see a low number, call us and we'll adjust."

#### Screen 3: Daily Sales
Navigate to "Today's Sales" or "Daily Report".

"This shows everything that left your shop today. Automatically recorded by the cameras."

**Example:**
- "8:15 AM — 2 packs of biscuits removed"
- "9:45 AM — 1 cold drink removed"
- "2:30 PM — 3 snacks removed"

"At the end of the month, we add up all of these and calculate your bill. No surprises."

**Key point:** "You don't enter anything. The system records it automatically. Even if your staff forget to press buttons, the system remembers."

#### Screen 4: Monthly Summary (if available)
"At the end of each month, you'll see a summary: how many items sold, by category, with total value. This is the basis of your monthly bill."

---

### Part 4: Daily Accuracy Check (5 minutes)

**Goal:** Owner can verify system accuracy and knows when to call for help.

#### Why Accuracy Matters
"The system should be >90% accurate. That means if you manually count 100 items, the system should count 90–100. But sometimes, due to bad lighting or camera angle, accuracy drops. If you notice that, we want to know."

#### How to Check (Daily, takes 2 minutes)

1. "Every morning or afternoon, pick one section (e.g., snacks shelf)."
2. "Manually count items in that section. Write down the number."
3. "Open the dashboard. Find that section. Write down the system count."
4. "Compare: if they're within 5%, we're good. If different by more than 10%, note it and call us."

**Example:**
- Manual count: 25 items on snacks shelf
- System count: 24 items
- Difference: 1 item, or 4%
- **Result:** Good! No action needed.

**Another example:**
- Manual count: 25 items
- System count: 18 items
- Difference: 7 items, or 28%
- **Result:** Call us. Something's wrong with camera angle or lighting.

#### When to Report
"If you notice accuracy dropping for 2+ days in a row, or if a specific area is consistently wrong, call us. We'll adjust the camera angle or look at other issues. This usually takes 20 minutes."

---

### Part 5: How Billing Works (3 minutes)

**Goal:** Owner understands there are no surprises in billing; it's automatic and transparent.

#### Automatic, Not Manual
"Here's the beautiful part: billing is completely automatic. We don't ask you to enter anything. The system counts what sold, multiplies by the unit price, and generates your bill."

#### How Much Does It Cost?
"You've already paid the upfront cost (₹25K for the kit). Every month, you pay ₹2K for the software subscription. That's it. No hidden fees."

#### How Billing is Calculated
"At the end of the month:
1. System sums up all items sold (from Daily Sales screens)
2. We multiply quantity × unit price for each item
3. We add it all up = your monthly bill"

#### Why Billing Errors Are Near Zero
"Because it's automatic:
- No manual data entry (no typos)
- Cameras don't forget (unlike people)
- Same rules applied every day (no inconsistency)
- You can audit it anytime by checking the dashboard"

#### When You Disagree
"If you think the bill is wrong, here's what you do:
1. Do a manual count of a major section (e.g., snacks, drinks)
2. Compare to the system count for that section on the dashboard
3. If there's a big mismatch, call us and we'll investigate"

**Reassurance:** "We stand behind our accuracy. If the system is systematically undercounting (making us charge you less), we'll refund the difference. If it's overcounting, you get a credit."

---

### Part 6: Who to Call and When (2 minutes)

**Goal:** Owner knows the support hierarchy and when to escalate.

#### Support Channels
"You have multiple ways to reach us:

1. **WhatsApp (fastest):** Send a message anytime, day or night. We respond within 1 hour usually.
2. **Phone:** Call [PHONE] during business hours (9 AM–6 PM).
3. **Email:** For billing questions, email [EMAIL]. We respond within 24 hours."

#### When to Call
- "Camera not detecting items?" → Call immediately
- "System is completely offline?" → Call immediately
- "Accuracy has dropped significantly?" → Call same day
- "Question about bill?" → Call/email anytime, no rush
- "General question about dashboard?" → WhatsApp is fine, not urgent

#### Before You Call
"To help us help you faster, have this info ready:
1. What exactly is wrong? (e.g., 'Front camera shows black screen')
2. When did it start? (e.g., 'This morning after I turned it on')
3. What have you already tried? (e.g., 'I checked the cable, it's plugged in')
4. Is the system completely offline, or just one camera?"

**Leave them contact card with all details. Laminated, stuck on counter.**

---

### Part 7: Q&A (varies)

**Likely questions:**

**Q: What if WiFi goes out?**
A: "The system keeps counting offline. When WiFi comes back, it syncs automatically. Your data is safe."

**Q: Do the cameras record video?**
A: "The cameras see live images, but we don't store video (to protect privacy). We only store counts of items, not footage."

**Q: Can my staff see the dashboard?**
A: "Yes, if you want. But only you need to check it daily. Staff don't need access."

**Q: What if I want to add a new item type?**
A: "Tell us the item name and price. We update the system and it starts tracking immediately."

**Q: What if I move to a new shop?**
A: "The hardware stays with you. We reinstall and recalibrate at the new location. Quick process, ~2 hours."

---

## Staff Training (15 minutes)

### Session Setup
- **When:** Day 1 post-installation, evening (after shop hours or during slow time)
- **Who:** All shop assistants, helpers, cashiers (typically 2–4 people)
- **Where:** Shop counter or quiet corner
- **Materials:** Laminated quick-reference card, this guide
- **Tone:** Casual, brief. Staff is busy; respect their time.

---

### Part 1: What the Cameras Do (3 minutes)

**Goal:** Staff understand cameras are monitoring inventory, not them personally.

#### Simple Explanation
"See these four cameras? They watch the shelves and count inventory automatically. Every time a customer buys something, the cameras detect it."

#### Not Security Cameras
"These are NOT for watching you or checking if you're working. These are for counting items. Different purpose."

#### Always On
"The cameras are always running (24/7). Don't think about them. They just sit there and watch the shelves."

---

### Part 2: How Automatic Billing Works (3 minutes)

**Goal:** Staff understand that they don't need to do anything; system is automatic.

#### No Manual Entry
"You DON'T need to:
- Write down what you sold
- Enter anything into a computer
- Count items
- Do anything special when a customer buys something"

#### How It Works
"When a customer buys an item:
1. They hand it to you (or take it themselves)
2. Camera detects it left the shelf
3. System automatically adds it to the 'sold' list
4. That's it. No more steps."

#### Why This Is Good
"Less work for you. Less chance for errors. And accurate billing for the owner."

---

### Part 3: What NOT to Do (5 minutes)

**Goal:** Staff know exactly which behaviors can break the system.

#### DO NOT BLOCK CAMERAS
**This is critical.** Emphasize:

"If you stack boxes, shelves, or your body in front of a camera, it can't see the inventory. The system won't count correctly, and the owner has to call for adjustments."

**Examples of blocking:**
- Stacking cardboard boxes in front of a camera (for storage)
- Shelving items right in front of a camera
- Leaning against a camera or moving it accidentally

**What to do if camera gets blocked:**
- "Tell the owner immediately. Don't fix it yourself."
- "We'll come and adjust."

#### DO NOT MOVE OR ADJUST CAMERAS
"The cameras are positioned and angled carefully. If you move one, even slightly, accuracy drops and the owner has to call for recalibration."

**If a camera looks wrong:**
- "Tell the owner. Don't adjust it yourself."

#### DO NOT UNPLUG OR COVER THE PI BOXES
"The two small boxes in the shop are the 'brain.' Don't:
- Unplug them suddenly
- Cover them or block their vents (they can overheat)
- Move them
- Put them near heat sources"

**If a Pi box looks strange (beeping, very hot, LED not on):**
- "Tell the owner or call [PHONE]. Don't try to fix it."

#### DO NOT TURN OFF POWER RANDOMLY
"The Pis need to shut down properly, not just be unplugged. The owner handles power on/off."

**Exception:** "If there's a genuine emergency (fire, electrical problem), turn off the power and get to safety first."

---

### Part 4: How to Report Issues (4 minutes)

**Goal:** Staff know the escalation path for problems.

#### What to Report
"Tell the owner (or the person who hired you) if you notice:
- A camera looks blocked or dirty
- A Pi box is beeping or very hot
- The system seems offline (dashboard won't load)
- You see a physical problem (loose cable, water damage, etc.)"

#### How to Report
"Don't call the engineers directly. Tell the owner. The owner will call us if needed. But in a real emergency (fire, serious damage), call [EMERGENCY_PHONE] directly."

#### What Info to Provide
"When you tell the owner, be specific:
- 'The front-left camera looks blocked by boxes'
- 'The back Pi box is very hot and beeping'
- 'I tried to load the dashboard but it won't load'

Specifics help us solve it fast."

---

### Quick Reference Card (For Print & Laminate)

**A4 Card, simple icons + text, placed at cash counter:**

```
SHOPSHOP SYSTEM — QUICK REFERENCE FOR STAFF

YOUR JOB: Serve customers. System does the counting.

CAMERAS ARE WATCHING
✓ Let them watch inventory
✗ Don't block them
✗ Don't move them
✗ Don't cover them

PI BOXES ARE WORKING
✓ They're the brain of the system
✗ Don't unplug them suddenly
✗ Don't cover their vents
✗ Don't move them

SOMETHING LOOKS WRONG?
→ Tell the owner or [SHOP_MANAGER]
→ Don't try to fix it yourself
→ In emergency, call [PHONE]

OWNER'S CONTACT:
WhatsApp: [WHATSAPP]
Phone: [PHONE]
Email: [EMAIL]
```

**Kannada Translation (below English):**
```
ಕ್ಯಾಮರಾ ಸಿಸ್ಟಮ್ — ಸ್ಟಾಫ್ ದ್ರುತ ಉಲ್ಲೇಖ

ನಿಮ್ಮ ಕೆಲಸ: ಗ್ರಾಹಕರನ್ನು ಸೇವೆ ಮಾಡುವುದು. ವ್ಯವಸ್ಥೆ ಎಣಿಸುವುದು.

ಕ್ಯಾಮರಾ ದೃಶ್ಯ ಪಟ್ಟಿ ನೋಡುತ್ತಿಲ್ಲೆ
✓ ಅದನ್ನು ನೋಡಲಿರಿ
✗ ಅದನ್ನು ನಿರ್ಬಂಧಿಸಬೇಡಿ
✗ ಅದನ್ನು ಸರಿಸಬೇಡಿ

ಸಮಸ್ಯೆ ಕಾಣುತ್ತಿದ್ದರೆ?
→ ಮಾಲಿಕರಿಗೆ ಹೇಳಿ
→ ಸ್ವತಃ ಸರಿಪಡಿಸಬೇಡಿ
→ ಅರ್ಜೆಂಸಿ: [PHONE]
```

---

## FAQs in Simple Language

**Q: Will the system work if WiFi is bad?**
A: "Yes. The system keeps working offline and syncs when WiFi comes back. But good WiFi is better."

**Q: What if a camera breaks?**
A: "Tell the owner. We'll send someone to fix or replace it. Usually same-day if reported early."

**Q: What if I accidentally block a camera?**
A: "Unblock it and tell the owner. The owner will call us if needed. Don't worry, it's fixable."

**Q: Do the cameras record video?**
A: "No. They just count items. No video stored."

**Q: Can I see the dashboard too?**
A: "If the owner allows, yes. But it's mostly for the owner to check daily."

**Q: What if the system counts wrong?**
A: "Tell the owner. Might be a camera angle issue or lighting. We'll fix it."

**Q: Do I need to do anything special?**
A: "Nope. Just don't block cameras or move the Pi boxes. That's it."

---

## Training Completion Checklist

**Owner Training:**
- [ ] Owner understands system saves time and reduces errors
- [ ] Owner can perform daily startup routine
- [ ] Owner can navigate dashboard and read main screens
- [ ] Owner knows how to do a daily accuracy check
- [ ] Owner understands billing is automatic
- [ ] Owner has contact info and knows when to call
- [ ] Owner can answer: "How do I turn on the system?" and "Where do I check what sold today?"
- [ ] Owner has laminated quick-reference card and training guide

**Staff Training:**
- [ ] Staff understand cameras watch shelves, not them
- [ ] Staff know NOT to block cameras
- [ ] Staff know NOT to move Pi boxes
- [ ] Staff know who to tell if something seems wrong
- [ ] Staff have laminated quick-reference card at counter
- [ ] Staff can answer: "What do I do if a camera looks blocked?" (Answer: Tell the owner)

---

## Post-Training Support

**If owner has questions after training:**
- Send WhatsApp with link to FAQ (this document)
- Offer a quick 5-minute call to clarify

**If staff seem confused:**
- Owner should do a brief re-teach (5 minutes, focused on the one confused point)
- Or we can do a quick call with the staff member

**If owner wants different training approach:**
- We offer alternative: video walkthrough (sent via WhatsApp)
- Or: written guide with screenshots (printed or PDF)
- Or: follow-up training session (paid as optional add-on)

