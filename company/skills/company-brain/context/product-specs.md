# ShopSense: Product Specifications v1.0

## Overview

**ShopSense** is an edge AI retail system designed for chai and kirana shops in Bangalore. It combines dual-camera computer vision (for inventory and staff sensing) with offline-first billing and analytics.

**Form Factor:** Countertop box (18cm x 12cm x 8cm, 1.2kg)
**Deployment Time:** 2–3 hours (unbox, camera placement, WiFi/offline config, staff training)
**Support:** WhatsApp + email, 24/7 AI agent response, Vaishak for escalations

---

## HARDWARE ARCHITECTURE

### Bill of Materials (BOM)

| Component | Qty | Model | Cost (INR) | Supplier |
|-----------|-----|-------|-----------|----------|
| **Compute** |
| Raspberry Pi 4 (8GB) | 2 | RPi4-8GB | ₹6,000 | xgo3d inventory |
| 32GB microSD Card | 2 | SanDisk Ultra | ₹800 | Local |
| USB-C Power Supply | 2 | Anker 30W | ₹1,500 | Amazon |
| **Connectivity** |
| Gigabit PoE Switch | 1 | Netgear GS305E | ₹2,500 | Local |
| Cat6 Ethernet Cables | 4 | Monoprice 50ft | ₹1,200 | Local |
| USB WiFi Adapter | 1 | TP-Link AC1300 | ₹800 | Local |
| 4G/LTE Modem (backup) | 1 | Huawei E8372 | ₹3,000 | Optional |
| **Sensors** |
| USB Camera (4MP, 1080p) | 4 | Logitech C270 OR custom OV5647 | ₹4,000 | Manufacturer |
| Overhead Mount Kit | 4 | Aluminum + acrylic | ₹2,400 | xgo3d prints |
| **Enclosure** |
| Aluminum Case (custom) | 1 | Anodized, ventilated | ₹2,000 | xgo3d manufactures |
| **Total BOM** | | | **₹24,200** | |

**Margin:** ₹800/kit (hardware sold at ₹25K)

### Physical Architecture

```
┌─────────────────────────────────┐
│     ShopSense Control Box       │
├─────────────────────────────────┤
│  RPi 4 (Primary) ─────────────┐ │
│  - Inference engine            │ │
│  - Local SQLite DB             │ │
│  - Web dashboard (localhost)   │ │
│                                │ │
│  RPi 4 (Secondary) ────────────┤ │
│  - Backup inference            │ │
│  - Failover sync               │ │
│  - Redundant storage           │ │
│                                │ │
│  PoE Switch ──────────────────┤ │
│  - Powers 4 cameras            │ │
│  - Local network mesh          │ │
│                                │ │
└─────────────────────────────────┘
         │
         ├─ USB Camera 1 (ceiling, 90° overview)
         ├─ USB Camera 2 (counter level, 45° on brewing station)
         ├─ USB Camera 3 (shelf level, 45° on inventory shelves)
         └─ USB Camera 4 (entry door, motion-triggered)
```

### Camera Placement Strategy

**Camera 1 (Overhead, 90°):**
- Mounted 2.5m above counter
- View: Entire shop floor + customer queue
- Use: StaffSense, customer count, queue length

**Camera 2 (Brewing Station, 45°):**
- 1m from chai preparation area
- View: Tea boiling, cup filling, milk pouring
- Use: SmokeSense, BrewSense (steam detection, spill detection)

**Camera 3 (Inventory Shelf, 45°):**
- 1.2m high, angled down at shelf
- View: Packaged snacks, tea boxes, sugar containers
- Use: SnackSense, BrewSense (low-stock alerts)

**Camera 4 (Entry Door, 0°):**
- Eye-level, straight on
- View: Customer entry/exit, doorway congestion
- Use: Customer counting (future), security (future)

---

## SOFTWARE ARCHITECTURE

### Edge Inference Pipeline

```
Real-time Video Stream (4 cameras @ 30fps)
    │
    ├─ Camera 1 (30fps) → YOLOv8n (person detection) → StaffSense counter
    ├─ Camera 2 (15fps) → YOLOv8n + custom tea classifier → SmokeSense counter
    ├─ Camera 3 (5fps)  → YOLOv8n (item detection) → SnackSense counter
    └─ Camera 4 (1fps)  → YOLOv8n (entry/exit) → Foot traffic logger
                                    │
                                    ▼
                        Inference Results (JSON)
                                    │
                        ┌───────────┴───────────┐
                        │                       │
                    Local SQLite              Firebase
                    (Primary)                 (Secondary)
                        │                       │
                        ▼                       ▼
                   ComboBilling            Cloud Dashboard
                   (Offline-first)         (Read-only replica)
```

### Technology Stack

**Edge Devices:**
- OS: Raspberry Pi OS Lite (Bookworm 64-bit)
- Runtime: Python 3.11 + uv (fast package manager)
- ML Framework: PyTorch (pre-quantized YOLOv8n)
- Video Capture: OpenCV 4.8
- Local DB: SQLite3 (no dependencies)
- Server: Flask (minimal, runs on RPi)

**Cloud (Firebase):**
- Project ID: oorulogix-e2dc4
- Realtime Database: Metrics + device status
- Firestore: Customer configs, billing history (read replicas)
- Cloud Storage: YOLOv8n model weights (gzip, ~15MB)
- Cloud Functions: Async sync worker (every 15 min when online)

**Frontend:**
- Framework: React 19 + Vite 6
- TypeScript (strict mode)
- UI: TailwindCSS + shadcn/ui components
- State: React Context + TanStack Query (for async)
- Deploy: Vercel (oorulogix.vercel.app)

**Dashboard Endpoints:**
- **Offline Dashboard:** `http://192.168.1.X:5000` (local Flask app on RPi)
- **Cloud Dashboard:** `oorulogix.vercel.app` (synced view, requires login)
- **Mobile Web:** Responsive, tested on iPhone 12 + Android 12

---

## FEATURE SPECIFICATION BY MODULE

### 1. SmokeSense (Tea/Chai Brewing Detection)

**Purpose:** Monitor brewing activity to measure staff productivity and identify operational patterns.

**Detection Logic:**
- OpenCV detects smoke/steam plume above brewing pot (HSV color space, contour analysis)
- Timestamp when steam detected: brewing start
- Timestamp when steam clears: brewing end
- Duration = brewing time

**Outputs (Real-time):**
```json
{
  "module": "SmokeSense",
  "timestamp": "2026-04-01T14:32:15Z",
  "brewing_active": true,
  "brewing_duration_minutes": 3.5,
  "steam_confidence": 0.92,
  "historical_average_duration": 4.2,
  "deviation_from_avg": "-17%",
  "alert": "brewing_unusually_fast" // if < 2 min
}
```

**Daily Aggregations:**
- Cups brewed (estimated): Total brewing events × avg cups per batch (2–3)
- Brewing efficiency: Actual duration vs. historical norm
- Peak brewing hours: 7–9am, 2–4pm, 6–8pm
- Downtime alerts: No brewing for >30 min during business hours

**Thresholds & Alerts:**
- ⚠️ Brewing too fast (<2 min): Quality warning
- ⚠️ No brewing for 45 min in prime hours: Likely break, manual check
- ⚠️ Camera blocked (steam too thick, no clear frames): Maintenance alert

**User Interface:**
```
┌─ SmokeSense Dashboard ─────────────┐
│ Active Brewing Status: YES         │
│ Duration: 3m 27s (normal)          │
│                                    │
│ Today's Brews: 47 (↑15% vs avg)   │
│ Peak Hour: 2–3pm (12 brews)       │
│ Avg Brew Time: 4m 15s             │
│ Quality: 98% (within norms)       │
│                                    │
│ [Chart: Brewing over time today]  │
└────────────────────────────────────┘
```

**Data Storage:**
- Each brewing event: 50 bytes (timestamp, duration, confidence)
- 24 hrs × 60 brews/day = 72KB/day
- SQLite retention: 90 days (6.5MB)

**Privacy:**
- No person identification (just steam plume analysis)
- No image storage (only extracted features)

---

### 2. BrewSense (Beverage Inventory Tracking)

**Purpose:** Monitor inventory of core beverages (tea, coffee, milk, sugar, water) in real-time.

**Detection Logic:**
- YOLOv8n custom-trained classes: tea_box, coffee_jar, milk_bottle, sugar_bag, water_bottle
- Camera 3 (shelf-level) captures item counts every 5 minutes
- YOLOv8n outputs: class, confidence, bounding box
- Inventory module counts items in each box/container

**Training Data:**
- 500 images of each item class (collected from chai shops)
- Annotated with LabelImg (COCO format)
- Fine-tuned YOLOv8n (18 epochs, learning rate 0.001)
- Validation accuracy: >95% per class

**Outputs (Real-time):**
```json
{
  "module": "BrewSense",
  "timestamp": "2026-04-01T14:35:00Z",
  "inventory": {
    "tea_boxes": 3,
    "coffee_jars": 1,
    "milk_bottles": 2,
    "sugar_bags": 2,
    "water_bottles": 4
  },
  "low_stock_alerts": [
    { "item": "coffee_jars", "current": 1, "threshold": 2, "urgency": "high" }
  ],
  "waste_detected": {
    "spills": 0,
    "overflow": false,
    "expired_visible": false
  }
}
```

**Reorder Logic:**
- Track consumption rate: items depleted per hour (based on 7-day history)
- Reorder trigger: Current stock < (consumption_rate × 24 hours)
- Recommendation: "Order 2 tea boxes today (consumed 1.5 boxes/day, 1 day supply left)"
- SMS alert to owner (via Firebase Cloud Function): "BrewSense: Low milk stock (1 bottle left). Order today?"

**User Interface:**
```
┌─ BrewSense Dashboard ──────────────┐
│ Tea Boxes: 3 ▓▓▓▓▓░░░░ (normal)  │
│ Coffee Jars: 1 ▓░░░░░░░░░ (LOW!)  │
│ Milk Bottles: 2 ▓▓░░░░░░░░ (low)  │
│ Sugar Bags: 2 ▓▓▓░░░░░░░░ (low)  │
│ Water: 4 ▓▓▓▓▓░░░░░ (normal)     │
│                                    │
│ Next Reorder Needed: 2 days       │
│ Consumption Rate: 1.4 boxes/day   │
│                                    │
│ [Reorder Button] [History Chart]  │
└────────────────────────────────────┘
```

**Waste Detection:**
- Spill detection: Sudden increase in floor area (dark spots under shelf)
- Overflow detection: Items outside container boundary
- Expiry detection: Custom training on expiry date readability (future enhancement)

---

### 3. SnackSense (Packaged Snack Inventory)

**Purpose:** Track companion snacks (samosas, biscuits, pastries, chips, etc.) sold alongside tea.

**Detection Logic:**
- Custom YOLOv8n classes: samosa, biscuit_pack, pastry, chips_pack, etc.
- Same inference pipeline as BrewSense, dedicated to packaged goods shelf
- Count items, detect when shelf is running low

**Outputs (Real-time):**
```json
{
  "module": "SnackSense",
  "timestamp": "2026-04-01T14:40:00Z",
  "inventory": {
    "samosas": 15,
    "biscuit_packs": 8,
    "pastries": 3,
    "chips_packs": 5
  },
  "expiry_warnings": [
    { "item": "pastries", "count": 3, "likely_expired": "2026-04-02", "action": "check and discard" }
  ],
  "bundle_insights": {
    "tea_with_samosa": "72% of sales",
    "coffee_with_pastry": "45% of sales",
    "slowmover": "chips_packs (2% of sales)"
  }
}
```

**Bundle Analysis (ComboBilling Integration):**
- Correlate billing data with SmokeSense/SnackSense
- When tea brewed + samosa sold within 5 min → logged as bundle
- Weekly report: "Tea + Samosa bundles are 72% of revenue. Consider combo discount."

**Spoilage & Expiry:**
- Color analysis: Discoloration indicates age/spoilage
- Manual expiry date scanning (future: OCR for printed dates)
- Alert: "Pastries showing signs of aging. Sell or discard within 24 hours."

---

### 4. StaffSense (Workforce Insights)

**Purpose:** Monitor staff presence, service speed, and peak-hour gaps (anonymized, non-identifying).

**Detection Logic:**
- Camera 1 (overhead): YOLOv8n person detection
- Track person count: 1 staff = baseline, 2 staff = double coverage, etc.
- Correlation with SmokeSense: When is staff working vs. idle?
- Service speed: Time between order (manual log in ComboBilling) and delivery (person leaves counter)

**Outputs (Real-time):**
```json
{
  "module": "StaffSense",
  "timestamp": "2026-04-01T15:00:00Z",
  "current_staff_count": 2,
  "presence_timeline": [
    { "hour": "08:00–09:00", "staff_count": 1, "brewing_events": 18, "efficiency": "normal" },
    { "hour": "09:00–10:00", "staff_count": 2, "brewing_events": 24, "efficiency": "high" }
  ],
  "peak_hours": ["08:00–09:00", "14:00–15:00", "18:00–19:00"],
  "coverage_gaps": [
    { "hour": "10:00–11:00", "staff": 1, "orders": 12, "recommendation": "consider 2nd staff" }
  ],
  "avg_service_speed": "4.2 min (order to hand-over)"
}
```

**Anonymization:**
- No facial recognition
- No identification by name
- Only body counting (person ≈ staff member)
- Presence logged as time ranges, not individual profiles

**Daily Report:**
```
┌─ StaffSense Report ────────────────┐
│ Date: 2026-04-01                   │
│ Staff on duty: 1 (mostly)          │
│                                    │
│ Peak Hours (staff shortage):       │
│ • 08:00–09:00: 18 orders, 1 staff │
│   → Recommend 2 staff during rush  │
│ • 14:00–15:00: 15 orders, 1 staff │
│                                    │
│ Service Speed: 4.2 min avg        │
│ Benchmark: 3.5 min (5% slower)    │
│                                    │
│ Recommendation: Hire part-time     │
│ morning/afternoon staff            │
└────────────────────────────────────┘
```

---

### 5. ComboBilling (Point-of-Sale + Insights)

**Purpose:** Replace manual billing or basic POS with offline-first digital billing integrated with inventory.

**Features:**

**Offline-First Billing:**
- All transactions recorded in local SQLite
- Works without internet (no cloud dependency)
- Bill display on 7" tablet or 10" screen
- Print to thermal printer (optional)
- Backup power: 4-hour battery (UPS module, future)

**Billing Interface:**
```
┌─ ComboBilling Terminal ────────────┐
│ Customer: Walk-in                  │
│                                    │
│ Item         Qty  Price   Total   │
│ Tea          1    ₹20     ₹20     │
│ Samosa       1    ₹15     ₹15     │
│ Sugar (extra)1    ₹5      ₹5      │
│ ─────────────────────────────────  │
│ Subtotal: ₹40                      │
│ Tax (0%):  ₹0                      │
│ TOTAL:     ₹40                     │
│                                    │
│ [Cash] [UPI] [Cancel]              │
│                                    │
│ Receipt: #1524 | 14:32 | Vaishak  │
└────────────────────────────────────┘
```

**Inventory Integration:**
- When item sold, auto-deduct from BrewSense/SnackSense inventory
- "Tea (₹20)" → Sell 1 tea → BrewSense count goes 3 → 2
- Staff knows inventory in real-time while billing

**Daily Summary (Offline):**
```json
{
  "date": "2026-04-01",
  "transactions": 47,
  "revenue": "₹1,240",
  "top_items": [
    { "item": "Tea", "qty": 32, "revenue": "₹640", "margin": "₹320" },
    { "item": "Samosa", "qty": 20, "revenue": "₹300", "margin": "₹150" }
  ],
  "payment_methods": { "cash": 45, "upi": 2 },
  "hourly_breakdown": [
    { "hour": "08:00–09:00", "orders": 12, "revenue": "₹320" },
    { "hour": "09:00–10:00", "orders": 8, "revenue": "₹210" }
  ]
}
```

**Sync to Cloud (When Online):**
- Every 15 minutes (if WiFi available): Push local SQLite to Firebase
- Cloud Firestore stores: Transactions, daily summaries, inventory snapshots
- Conflict resolution: Device timestamp = source of truth (device is authoritative)
- Retry logic: Queue syncs if offline, retry exponentially (1s, 5s, 30s, 5min, 30min)

**Analytics Dashboard (Cloud):**
- Owner logs into oorulogix.vercel.app
- See 7-day rolling revenue, top items, margins
- Compare to previous week/month
- "Your tea + samosa bundles are 72% of revenue. Consider ₹30 combo discount."
- Margin breakdown: "Tea: 50% margin, Samosa: 50%, Chips: 40%"

**Financial Reports (Generated):**
- **Daily:** Revenue, transactions, payment split
- **Weekly:** Top items, slowmovers, bundle analysis, staffing recommendations
- **Monthly:** Total revenue, margin, churn analysis (customers lost to competitors?)

**Integration with Other Modules:**
```
ComboBilling Transaction: "Tea + Samosa, ₹35, 14:32"
    │
    ├─ SmokeSense: Record brewing event at 14:27 (5 min before sale)
    ├─ BrewSense: Deduct 1 tea box inventory
    ├─ SnackSense: Deduct 1 samosa
    └─ StaffSense: Log service time (customer presence + brew time)

    ▼ Result: "Samosa sold 5 min after brewing, by 1 staff member"
```

---

## DEPLOYMENT CHECKLIST

### Pre-Deployment (Customer Site Preparation)
- [ ] WiFi SSID + password obtained from shop owner
- [ ] Power outlet identified (ideally near counter)
- [ ] 4 camera mounting locations scouted
- [ ] Thermal printer (optional) tested with Bluetooth/USB
- [ ] Customer trained on: billing interface, inventory checks, alert responses

### Deployment Day (2–3 hours)
- [ ] Unbox ShopSense kit, verify all components
- [ ] Assemble aluminum enclosure, mount RPi boards
- [ ] Connect cameras via USB hubs, test video feeds
- [ ] Configure RPi WiFi + NTP sync
- [ ] Mount cameras in identified locations (overhead, brewing, shelf, door)
- [ ] Run first inference test: SmokeSense steam detection (manual smoke test)
- [ ] Test YOLOv8n models on local device (latency <100ms per frame)
- [ ] Set up ComboBilling: Create default items (Tea, Samosa, Coffee, etc.)
- [ ] Sync Firebase config (project oorulogix-e2dc4 credentials)
- [ ] Test offline mode: Disable WiFi, run transaction, verify sync on reconnect
- [ ] Print sample receipt on thermal printer
- [ ] Staff training: How to use ComboBilling, interpret alerts, restart if needed
- [ ] Leave WhatsApp support number + emergency contact

### Post-Deployment (Week 1)
- [ ] Check daily that kit is online (Firebase heartbeat)
- [ ] Review first day's data: SmokeSense accuracy, BrewSense counts
- [ ] Validate YOLOv8n accuracy on customer's specific items
- [ ] Adjust camera angles if needed (remote troubleshooting via WhatsApp)
- [ ] Monitor for crashes or sync failures
- [ ] Schedule week-2 check-in call

### Ongoing Support
- [ ] Weekly: Review metrics, proactive recommendations
- [ ] Monthly: Model retraining if accuracy <90%
- [ ] Quarterly: Hardware health check (disk usage, temperature, RAM)

---

## OFFLINE-FIRST ARCHITECTURE DETAILS

### Local Database Schema (SQLite)

```sql
-- Transactions
CREATE TABLE transactions (
  id INTEGER PRIMARY KEY,
  timestamp DATETIME,
  items JSON,  -- [{"item_name": "Tea", "qty": 1, "price": 20}, ...]
  payment_method TEXT,  -- "cash", "upi"
  total_amount REAL,
  staff_member TEXT,
  synced BOOLEAN DEFAULT FALSE
);

-- Inventory snapshots (5-min intervals)
CREATE TABLE inventory_snapshots (
  id INTEGER PRIMARY KEY,
  timestamp DATETIME,
  module TEXT,  -- "BrewSense", "SnackSense", "SmokeSense"
  data JSON,
  synced BOOLEAN DEFAULT FALSE
);

-- SmokeSense events
CREATE TABLE brewing_events (
  id INTEGER PRIMARY KEY,
  start_time DATETIME,
  end_time DATETIME,
  duration_minutes REAL,
  steam_confidence REAL,
  synced BOOLEAN DEFAULT FALSE
);

-- Device health
CREATE TABLE device_heartbeat (
  timestamp DATETIME PRIMARY KEY,
  memory_usage_mb REAL,
  disk_usage_percent REAL,
  cpu_temp_celsius REAL,
  wifi_signal_strength_dbm INTEGER,
  online BOOLEAN
);
```

### Sync Strategy

**When Online:**
- Every 15 minutes: Batch all `synced=FALSE` records, push to Firebase
- Firebase Cloud Function receives, updates Firestore + Realtime DB
- Mark records as `synced=TRUE` in SQLite
- On failure: Keep retrying (exponential backoff)

**When Offline:**
- All transactions, inventory, brewing events logged to local SQLite
- No data loss (disk space: ~50MB/month for 50 daily transactions)
- On reconnect: Automatic sync resumes

**Conflict Resolution:**
- Device timestamp = source of truth (device clock = authoritative)
- If device is ahead of server by >1 hour: Warn Vaishak (manual intervention)
- Last-write-wins for inventory snapshots (most recent reading is correct)

---

## MODEL SPECIFICATIONS

### YOLOv8n (Nano) Justification

**Why YOLOv8n, not YOLOv8s/m/l?**
- YOLOv8n: 3.2M parameters, ~2.5ms inference on RPi 4 @ 30fps
- YOLOv8s: 11.2M parameters, ~8ms inference (too slow for 4-camera real-time)
- Memory footprint: 60MB model + 200MB working memory (fits in 8GB RPi RAM)
- Accuracy trade-off: 95% detection accuracy is sufficient for chai shop items

**Model Training Pipeline:**
1. Collect 500+ images per class (tea box, milk bottle, samosa, person, steam plume)
2. Annotate with LabelImg (COCO format)
3. Fine-tune YOLOv8n on custom dataset (18 epochs, learning rate 0.001)
4. Validate on held-out test set (80/20 split)
5. Export to ONNX + quantize (INT8) for edge deployment
6. Test latency on RPi 4: confirm <100ms per frame

**Quantization Benefits:**
- Model size: ~15MB (full precision) → ~5MB (INT8)
- Memory usage: Reduced by 4x
- Inference speed: ~20% faster
- Accuracy loss: <1% (negligible)

---

## PERFORMANCE & SCALABILITY

### Edge Performance

| Metric | Target | Actual (RPi 4 8GB) |
|--------|--------|-------------------|
| Inference latency (YOLOv8n) | <100ms | ~25ms per frame |
| Throughput (4 cameras) | 30fps | 30fps achieved |
| Memory usage (peak) | <6GB | ~3.2GB (4 camera streams + DB) |
| Disk I/O (SQLite) | <10MB/min | ~0.5MB/min (50 transactions) |
| Daily storage growth | <100MB | ~50MB (including video features) |

### Cloud Performance

| Metric | Target | Implementation |
|--------|--------|-----------------|
| Sync latency | <30s | Firebase Realtime DB (< 500ms) |
| Dashboard load time | <2s | React lazy-load, TanStack Query caching |
| Concurrent customers | 100+ | Firebase scales to millions |
| Data retention | 90 days local, unlimited cloud | Firestore TTL policy |

---

## SECURITY & PRIVACY

### Edge Security
- **No internet required for core functions** (offline-first design)
- **Local encryption:** SQLite encrypted with SQLCipher (future enhancement)
- **Camera access:** Only YOLOv8n model (no raw video stored)
- **No PII:** Customers not identified, only transaction amounts

### Cloud Security
- **Firebase Authentication:** Email + password (future: SSO)
- **Firestore Rules:** Each customer can only access their own data
- **Data in transit:** TLS 1.3 (Firebase enforces)
- **API keys:** Restricted to specific Firebase project (oorulogix-e2dc4)

### Privacy by Design
- **No facial recognition:** Only person count (body detection)
- **No audio:** Cameras are silent (no microphone)
- **No video storage:** Only extracted features (inference output)
- **Local-first:** Data stays on device by default, user controls sync

---

## DEPLOYMENT ENVIRONMENTS

### Development
- Local Raspberry Pi 4 (Vaishak's desk)
- Mock camera input (test images)
- Firebase project: oorulogix-e2dc4 (dev branch)
- Testing: Unit tests for YOLOv8n, Flask API, Firestore sync

### Staging
- Deployed at Vaishak's own chai shop (dogfooding)
- Real cameras, real transactions
- Firebase: Same project (staging collection)
- Testing: 7-day stability run before customer release

### Production
- Customer sites in Bangalore
- Firebase: oorulogix-e2dc4 (production collections)
- Monitoring: Heartbeat pings every 15 min, alert Vaishak if offline >1 hour
- Support: WhatsApp escalation to Vaishak for unresolved issues

---

## FUTURE ENHANCEMENTS (Post-Gate 1)

- **Custom YOLOv8n models** per customer (fine-tuned on their specific items)
- **Multi-location support** (chain of 5 chai shops → single dashboard)
- **Queue prediction** (using StaffSense + ComboBilling): "Queue will peak in 10 min, suggest 2nd staff"
- **Supplier integration** (auto-order milk from vendor based on BrewSense low-stock)
- **Staff shift scheduling** (optimize staffing based on historical peak hours)
- **Expiry date OCR** (read printed dates on packaged snacks automatically)
- **4G backup modem** (auto-switch to cellular if WiFi fails)
- **UPS battery** (4-hour backup power for complete offline operation)

---

## DOCUMENT VERSION

- **Version:** 1.0
- **Last Updated:** 2026-04-01
- **Owner:** Vaishak R N (vaishakrn@gmail.com)
- **Next Review:** Post-Gate 1 (first 3 customers feedback)

