# 🔗 LinkedIn Launch — Ready-to-Post Content

## Post 1: THE LAUNCH POST ⭐
**Status:** ✅ Ready to publish
**Best time:** Tuesday or Thursday, 8:00 AM IST
**Format:** Long-form text post

---

So we built a thing.

For the past few months at Ooru Logix, we've been working on a problem that sounds deceptively simple — can you automate billing at a chai angadi using just cameras and a couple of Raspberry Pis?

Turns out you can. And today we're open-sourcing the whole thing.

It's called ShopSense. Two Pi 4 boards, four cameras, and a bunch of YOLOv8 models that can tell the difference between a Gold Flake Kings and a Classic Milds from an overhead tray shot. One Pi sits at the POS counter doing cigarette detection. The other sits at the brew station spotting chai, coffee, snacks — even tracks whether someone's actually manning the counter.

The system bills automatically. Customer grabs a pack, the camera picks it up, identifies the brand, shows it on a 7-inch touchscreen, and the cashier just taps confirm. If someone orders a chai with their cigarette, it catches the combo and suggests a deal. No barcodes, no typing, no nothing.

We trained the models on Colab, exported to ONNX, and they run inference in about 380ms per frame right on the Pi. Not blazing fast, but fast enough for a shop where people don't mind waiting three seconds.

Some things that made this tricky:
→ Getting two Pis to stay in sync over WiFi without dropping events (bounded retry queues, exponential backoff)
→ Making the touchscreen UI actually usable in a dimly lit cafe with greasy fingers (big buttons, high contrast, dark theme)
→ Handling the case where a camera just dies mid-shift (system degrades gracefully, falls back to manual entry)

The whole thing runs offline on local WiFi. No cloud. No monthly fee. That was a hard requirement — most of these shops don't have reliable internet, and they're definitely not paying a SaaS subscription.

Everything's on GitHub now — all the agents, the training notebooks, deployment scripts, even an Obsidian vault documenting the full architecture. MIT licensed.

🔗 github.com/snake14v/shopsense

If you're into edge AI or retail tech, take a look. We'd genuinely love feedback — this is our first time putting something like this out there. PRs welcome, obviously.

Hardware by xgo3d Engineering
Software by Ooru Logix

#OpenSource #EdgeAI #ComputerVision #RaspberryPi #RetailTech #YOLOv8 #MadeInIndia #BuildInPublic

---

## Post 2: THE ARCHITECTURE POST
**Status:** ✅ Ready to publish
**Best time:** Wednesday, 12:00 PM IST
**Format:** Text post with system diagram image

---

Here's how two $35 computers run an entire shop.

The complete ShopSense architecture — 11 agents, 58 message types, zero cloud dependency.

Pi 1 — POS Counter (Master):
• Overhead CSI camera → cigarette brand detection (YOLOv8n, ~380ms)
• ESP32-S3-EYE → box rack cross-verification via MJPEG
• 7" DSI touchscreen → cashier UI (PyQt5, big buttons, dark theme)
• Flask API on :5000 → master dashboard + Pi 2 event receiver

Pi 2 — Brew Station (Node):
• Overhead CSI camera → drink type detection (tumbler/glass classification)
• ESP32-S3-EYE → snack detection + staff presence monitoring
• MobileNet SSD → person detection at 120ms (always-on)
• Syncs all events to Pi 1 via REST POST over local WiFi

The secret sauce is a thread-safe message bus running on Pi 1. Each of the 11 agents runs in its own thread, publishes typed events, and subscribes to relevant channels. The orchestrator manages a state machine: IDLE → SCANNING → DETECTED → CONFIRMED → COOLDOWN.

Billing runs in three modes:
1. INSTANT — detect → confirm → done
2. TAB — items accumulate → checkout all at once
3. COMBO — chai + cigarette within 3 min → auto-suggest deal

Why separate models instead of one big one?
→ Faster training (retrain cigarettes without touching snacks)
→ Smaller memory per model on a resource-constrained Pi
→ Easier to debug false positives per category
→ Can update one model without redeploying the whole system

Full architecture docs + source code: github.com/snake14v/shopsense

#SystemDesign #Architecture #EdgeAI #RaspberryPi #SoftwareEngineering #IoT

---

## Post 3: THE PERSONAL STORY
**Status:** ✅ Ready to publish
**Best time:** Friday, 6:00 PM IST
**Format:** Personal narrative

---

I watched a chai shop owner count cigarette packs by memory for the third time this week.

He gets it wrong sometimes. Loses ₹50–100 a day. That's ₹1,500–3,000 a month — significant when your total monthly revenue is around ₹60,000.

Not because he's bad at math. Because he's serving 200+ customers between 5 AM and 9 PM, making chai, handling cash, and answering phone orders all at the same time.

These shops don't have barcode scanners. They don't have POS systems. They've never heard of inventory management software. And they're NOT going to pay ₹2,000/month for a SaaS tool that needs internet they barely have.

So we built ShopSense.

A camera watches the cigarette tray from above. YOLOv8 identifies the brand. A 7-inch touchscreen shows the bill. The owner just taps confirm.

Another camera at the brew station detects chai vs coffee vs milk. A third and fourth handle snacks and staff presence.

Total hardware cost: ~₹25,000. One-time.
No cloud. No subscription. No internet required.

That ₹25,000 pays for itself in about 3 months of prevented shrinkage.

12 million small shops in India have never touched a computer for billing. We're starting with the chai angadis because that's what we know. That's where we eat breakfast.

This is what edge AI should be for.

🔗 github.com/snake14v/shopsense

#EdgeAI #RetailTech #India #StartupStory #MadeInIndia #SmallBusiness #BuildInPublic

---

## Post 4: THE AI COMPANY POST
**Status:** ✅ Ready to publish
**Best time:** Monday, 10:00 AM IST
**Format:** Thought leadership

---

We're a 1-person company that ships like a 10-person team. Here's how.

At Ooru Logix, I'm the only human. But I have a full engineering team — it just happens to be AI.

Claude handles architecture, code review, and strategic planning.
Antigravity (Google Gemini) handles feature building, file operations, and UI/UX.
They share a workspace folder and take turns working in a chunk-based system.

Here's what "AI team members" actually looks like in practice:

1. Every work unit is a "chunk" (C-01, C-02, etc.) tracked in PROGRESS.md
2. Each agent reads the memory file before starting
3. They claim the next pending chunk, execute it, and leave handoff notes
4. I set priorities, review output, and make final decisions

We have 22 specialized workflow agents:
• Security Auditor (OWASP scans before every deploy)
• Performance Optimizer (bundle size, render cycles)
• UI/UX Designer (brand enforcement, responsive scaling)
• Copywriter (marketing content, headlines, CTAs)
• Documentation Lead (keeps all docs in sync)
• And 17 more...

The AurumGuard Lockbox firmware was swarm-audited by 53 Jules AI nodes. ShopSense has 11 distributed agents running in their own threads on Pi hardware.

I'm not saying AI replaces humans. I'm saying a solo founder with the right AI orchestration can build products that used to need a funded team.

The code, architecture, agents, and documentation — all built this way.

Is AI a team member or a tool? At Ooru Logix, the line doesn't exist.

#AIFirst #BuildInPublic #StartupLife #SoloFounder #AIEngineering #MadeInIndia

---

## Post 5: TECHNICAL DECISION
**Status:** ✅ Ready to publish
**Best time:** Thursday, 9:00 AM IST
**Format:** Technical analysis

---

Why we chose YOLOv8n over YOLOv5 for a ₹25K device — and why model selection on edge devices is a survival exercise, not a benchmarking one.

We tested four options on Raspberry Pi 4 8GB:

• YOLOv5n: ~450ms/frame, older arch, reasonable accuracy
  → Eliminated: slower, no significant accuracy advantage

• YOLOv8n: ~380ms/frame, better mAP at same parameter count
  → Winner for detection tasks

• YOLOv8s: ~900ms/frame, better accuracy
  → Eliminated: too slow for real-time billing (customer waits 6+ seconds)

• MobileNet SSD (TFLite): ~120ms/frame, poor accuracy on small brands
  → Winner for staff presence only (where speed > accuracy)

Key insight that changed our approach: separate models > one big model.

A cigarette classifier doesn't need to know what a samosa looks like. We run 3 independent YOLOv8n models:

1. Cigarette model → Pi 1 CSI camera (9 classes, 380ms)
2. Drinks model → Pi 2 CSI camera (8 classes, 380ms)
3. Snacks model → Pi 2 ESP32 feed (11 classes, 380ms)

Plus MobileNet SSD for staff presence detection (always-on, 120ms).

Benefits of model separation:
→ Retrain one class without touching others
→ Smaller memory footprint per inference
→ Easier to debug false positives
→ Can update one model without full redeployment
→ Each model gets dedicated camera angle optimization

Running 3 YOLO models across 2 Pis at 380ms each is totally workable. A counter transaction takes 15-30 seconds anyway.

Full model docs: github.com/snake14v/shopsense/docs

#MachineLearning #YOLOv8 #EdgeAI #ModelOptimization #ComputerVision #DeepLearning
