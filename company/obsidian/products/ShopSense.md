# ☕ ShopSense — Product Brief

> **AI-powered billing, detection, and ops intelligence for chai angadis.**
> Built by Ooru Logix (AI/Software) | Hardware by xgo3d Engineering

---

## Product Summary

ShopSense uses two Raspberry Pi 4 nodes and four cameras to automate billing and operations monitoring across the full chai angadi counter. No barcodes. No typing. No cloud dependency. No monthly fees.

---

## Core Modules

| Module | What It Detects | Hardware |
|--------|----------------|----------|
| **SmokeSense** | Cigarette brand + count | Pi 1, CSI Camera |
| **BrewSense** | Drink type + serving count | Pi 2, CSI Camera |
| **SnackSense** | Snack/biscuit SKU + count | Pi 2, ESP32-S3 |
| **StaffSense** | Staff presence + idle time | Pi 2, ESP32-S3 |
| **ComboBilling** | Cross-counter combo deals | Shared dashboard |

---

## Key Differentiators

1. **Camera-based POS** — No barcode scanners, no manual entry
2. **Works offline** — Local WiFi only, no internet required
3. **No monthly fees** — One-time hardware cost
4. **Combo detection** — Auto-suggests deals (chai + cigarette within 3 min)
5. **Staff monitoring** — Alerts if counter unmanned > 2 min
6. **Open source** — MIT licensed, community-strengthened

---

## Technical Stack

| Layer | Technology |
|-------|-----------|
| Vision | YOLOv8n (3 models) + MobileNet SSD |
| UI | PyQt5 touchscreen |
| API | Flask (master node) |
| Database | SQLite (all transactions) |
| Inter-Pi | REST over local WiFi |
| Dashboard | Mobile HTML at `http://shopsense.local` |

---

## Hardware BOM (Per Shop)

| Component | Qty | Est. Cost (₹) |
|-----------|-----|--------|
| Raspberry Pi 4 8GB | 2 | ~12,000 |
| Pi Camera Module 3 | 2 | ~5,000 |
| ESP32-S3-EYE | 2 | ~3,000 |
| 7" DSI Touchscreen | 1 | ~3,000 |
| OLED Display | 1 | ~300 |
| Active Buzzer + LEDs | 1 | ~200 |
| 3D Printed Enclosure (xgo3d) | 1 | ~1,500 |
| **Total** | | **~₹25,000** |

---

## Go-to-Market Status

| Phase | Status |
|-------|--------|
| Core architecture + agents | ✅ Complete |
| Obsidian documentation | ✅ Complete |
| Training notebooks | 🔄 In Progress |
| GitHub open source release | 🔄 In Progress |
| LinkedIn launch post | ✅ Draft Ready |
| First pilot at chai angadi | ⬜ Pending |
| Production enclosure design | ⬜ Pending |

---

## Detailed Docs
→ See [[ShopSense Obsidian Vault|/chaisense/docs/obsidian/Home.md]] for complete 31-file documentation vault

---

## Tags
#product #shopsense #vision #hardware #edgeai
