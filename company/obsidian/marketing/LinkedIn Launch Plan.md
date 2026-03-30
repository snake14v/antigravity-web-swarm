# 🔗 LinkedIn Launch Plan — Ooru Logix

## Strategy Overview

**Goal:** Establish Ooru Logix as a credible AI + hardware company building real products for Indian retail. Position ShopSense as a breakthrough in edge AI for unorganized retail.

**Target Audience:**
- Indian tech founders and builders
- Edge AI / computer vision engineers
- Retail tech investors and enthusiasts
- Bangalore startup ecosystem
- Open source community
- Hardware/embedded systems engineers

**Tone:** Engineering-authentic, no fluff, builder-first. Show real work, real architecture, real decisions.

**Posting Cadence:** 3–4 posts per week for 30 days

---

## LinkedIn Profile Optimization

### Profile Checklist
- [ ] **Headline:** `Founder @ Ooru Logix | Building AI-Powered Retail Intelligence | Edge AI · Computer Vision · Open Source`
- [ ] **Banner:** Ooru Logix logo banner with ShopSense system diagram
- [ ] **About Section:** (below)
- [ ] **Experience:** Add Ooru Logix as company page
- [ ] **Featured:** Pin ShopSense repo + LinkedIn launch post
- [ ] **Skills:** Edge AI, Computer Vision, YOLOv8, Raspberry Pi, React, Python, Firebase

### About Section Copy

```
Building Ooru Logix — an AI + hardware company that turns cameras into billing systems.

Our first product, ShopSense, uses two Raspberry Pi 4s and four cameras to automate billing at chai angadis (small Indian coffee shops). No barcodes, no scanners, no cloud, no monthly fees.

The system detects cigarette brands from overhead tray shots, identifies drink types from tumbler shapes and colors, spots snacks by packet classification, and even monitors if staff are at the counter — all running YOLOv8 inference at ~380ms per frame, completely offline on local WiFi.

Previously built XGO3DX22 (cyber-physical engineering portfolio) and AurumGuard MK II (4-board high-security modular safe system with <500ms SRAM zeroization).

Tech: React/Vite · Python · YOLOv8 · Raspberry Pi 4 · ESP32-S3 · Firebase · TailwindCSS · PyQt5
Hardware: xgo3d Engineering (3D printing, enclosures, custom PCBs)

Currently looking for: Pilot test sites in Bangalore, feedback from edge AI engineers, and people who think retail should be smarter.
```

---

## 30-Day Content Calendar

### Week 1: The Launch (Awareness)

#### Day 1 — THE LAUNCH POST ⭐
**Type:** Long-form story post
**Hook:** `So we built a thing.`

```
So we built a thing.

For the past few months at Ooru Logix, we've been working on a problem that sounds deceptively simple — can you automate billing at a chai angadi using just cameras and a couple of Raspberry Pis?

Turns out you can. And today we're open-sourcing the whole thing.

It's called ShopSense. Two Pi 4 boards, four cameras, and a bunch of YOLOv8 models that can tell the difference between a Gold Flake Kings and a Classic Milds from an overhead tray shot.

One Pi sits at the POS counter doing cigarette detection. The other sits at the brew station spotting chai, coffee, snacks — even tracks whether someone's actually manning the counter.

The system bills automatically. Customer grabs a pack, the camera picks it up, identifies the brand, shows it on a 7-inch touchscreen, and the cashier just taps confirm. If someone orders a chai with their cigarette, it catches the combo and suggests a deal.

No barcodes, no typing, no nothing.

We trained on Colab, exported to ONNX, running inference in ~380ms per frame right on the Pi. Not blazing fast, but fast enough for a shop where people don't mind waiting three seconds.

Some things that made this tricky:
→ Getting two Pis to stay in sync over WiFi without dropping events
→ Making UI usable in a dimly lit cafe with greasy fingers
→ Handling camera failures gracefully (falls back to manual entry)

The whole thing runs offline on local WiFi. No cloud. No monthly fee.

Everything's on GitHub — agents, training notebooks, deployment scripts, Obsidian vault. MIT licensed.

🔗 github.com/snake14v/shopsense

Hardware by xgo3d Engineering | Software by Ooru Logix

#OpenSource #EdgeAI #ComputerVision #RaspberryPi #RetailTech #YOLOv8 #MadeInIndia
```

---

#### Day 2 — System Architecture Deep Dive
**Type:** Carousel/Document post
**Hook:** `Here's how two $35 computers run an entire shop.`

```
The complete ShopSense architecture — explained in one post.

Two Raspberry Pi 4s. Four cameras. Eleven distributed agents. Zero cloud dependency.

Pi 1 (POS Counter):
- Overhead camera → cigarette brand detection (YOLOv8n)
- ESP32-S3-EYE → box rack cross-verification
- 7" touchscreen → cashier UI
- Flask API → master dashboard

Pi 2 (Brew Station):
- Overhead camera → drink type detection
- ESP32-S3-EYE → snack + staff presence
- Syncs to Pi 1 via REST over WiFi

The secret sauce: a thread-safe message bus with 58 typed message types. Each agent runs in its own thread, publishes/subscribes to events, and the whole system orchestrates itself.

Billing modes: Instant (tap to confirm), Tab (accumulate), Combo (auto-detect deals).

Full architecture docs: github.com/snake14v/shopsense/docs

#SystemDesign #EdgeAI #Architecture #IoT #RaspberryPi
```

---

#### Day 3 — The "Why" Post
**Type:** Personal story
**Hook:** `I watched a chai shop owner count cigarette packs by memory for the third time this week.`

```
I watched a chai shop owner count cigarette packs by memory for the third time this week.

He gets it wrong sometimes. Loses ₹50–100 a day. Not because he's bad at math — because he's serving 200+ customers in the time it takes most of us to finish our morning meeting.

These shops don't have barcode scanners. They don't have POS systems. They've never heard of inventory management software. And they're not going to pay ₹2,000/month for a SaaS tool that needs internet they don't have.

So we built ShopSense. A camera that watches the tray and knows what brand it is. A system that runs on a Pi, offline, and costs about ₹25,000 to set up — once.

That ₹25,000 pays for itself in about 3 months of prevented shrinkage.

This is what edge AI should be for. Not just demos and papers — but solving actual problems for actual people who'll never attend a tech conference.

#EdgeAI #RetailTech #India #StartupStory #MadeInIndia
```

---

#### Day 5 — Technical Decision Post
**Type:** Lessons learned
**Hook:** `Why we chose YOLOv8n over YOLOv5 for a ₹25K device.`

```
Choosing the right model for a Raspberry Pi is not a benchmarking exercise — it's a survival exercise.

We tested:
- YOLOv5n: ~450ms inference, older architecture
- YOLOv8n: ~380ms inference, better mAP at same size
- YOLOv8s: ~900ms — too slow for real-time billing
- TFLite MobileNet: ~120ms but poor accuracy on small brands

We went with YOLOv8n for detection (3 separate models) and MobileNet SSD specifically for staff presence (where accuracy matters less than speed).

Key insight: separate models > one big model.

A cigarette classifier doesn't need to know what a samosa looks like. Keeping models independent means:
- Faster training iterations
- Smaller memory footprint per model
- Can update one without touching others
- Easier to debug false positives

Running 3 YOLO models across 2 Pis at ~380ms each is totally workable for a counter where transactions take 15-30 seconds anyway.

Full model details in our docs: github.com/snake14v/shopsense

#MachineLearning #YOLO #EdgeAI #ModelOptimization #ComputerVision
```

---

### Week 2: Deep Dives (Credibility)

#### Day 8 — Multi-Pi Sync Challenge
**Hook:** `The hardest part of ShopSense wasn't the AI. It was keeping two Raspberry Pis talking to each other.`
**Topics:** REST sync, retry queues, exponential backoff, event deduplication

#### Day 10 — UI for Real Conditions
**Hook:** `Your user has greasy fingers, bad lighting, and 3 seconds of patience.`
**Topics:** PyQt5 design decisions, big buttons, high contrast, dark theme

#### Day 12 — The Combo Detection Algorithm
**Hook:** `How we taught a computer to suggest "chai + cigarette" deals.`
**Topics:** Time-window matching, cross-counter events, configurable combos

---

### Week 3: Building in Public (Community)

#### Day 15 — Open Source Decision
**Hook:** `We open-sourced our entire product. Here's why that's not as scary as it sounds.`

#### Day 17 — Contributors Wanted
**Hook:** `5 ways you can contribute to ShopSense without writing a single line of code.`

#### Day 19 — Obsidian Documentation
**Hook:** `We documented our entire system in 31 Obsidian files with 150+ wikilinks. Here's the vault structure.`

---

### Week 4: Scale & Vision (Growth)

#### Day 22 — India Retail Opportunity
**Hook:** `There are 12 million small shops in India. Most have never used a computer for billing.`

#### Day 24 — What's Next: Remote Dashboard
**Hook:** `Phase 3: A React dashboard where shop owners can check sales from their phone anywhere.`

#### Day 26 — Hiring Post
**Hook:** `We're a 1-person company that ships like a 10-person team. Here's how.`
**Topics:** AI agents as team members, Claude + Antigravity orchestration

#### Day 29 — Month 1 Retrospective
**Hook:** `30 days of building in public. Here's what happened.`

---

## Engagement Strategy

### Comment Replies
- Always reply to every comment within 4 hours
- Ask follow-up questions to drive conversation
- Tag relevant people in discussions about edge AI / retail tech

### Cross-Posting
- Share ShopSense posts to relevant LinkedIn groups
- Tag #BuildInPublic #MadeInIndia #IndianStartups

### Connection Strategy
- Connect with 10 relevant people daily (edge AI, retail tech, Indian VCs)
- Personalize connection notes: "Building an open-source edge AI POS system for Indian shops"

---

## Content Creation Workflow (AI Agent)

```
1. Vaishak identifies topic or AI agent proposes from calendar
2. Claude drafts post copy (primary copywriter)
3. Antigravity generates supporting images/diagrams if needed
4. Vaishak reviews and approves
5. Post to LinkedIn
6. Monitor engagement → feed insights back to content strategy
```

---

## Tags
#marketing #linkedin #content #launch
