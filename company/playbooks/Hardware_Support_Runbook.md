# Hardware Support Runbook — ShopSense

The "3 AM Pi is dead and the shop opens at 5 AM" playbook. One of the top risks from analysis: solo founder hits a wall at 10-15 deployments without documented support procedures.

---

## Hardware Inventory Management

Maintain this spare parts stock to enable rapid swaps (target: 24-48 hour resolution).

### Recommended Spare Parts

| Component | Quantity | Cost/Unit | Total Cost | Notes |
|---|---|---|---|---|
| Raspberry Pi 4 (8GB) | 1 unit | ₹6,500 | ₹6,500 | Swap if main unit unresponsive |
| USB Camera (IMX219) | 2 units | ₹1,200 | ₹2,400 | Easy swap, high failure rate |
| CSI Camera (OV5647) | 2 units | ₹1,000 | ₹2,000 | Counter camera, more robust |
| SD Card (64GB, pre-flashed) | 2 units | ₹800 | ₹1,600 | Quick boot recovery |
| Power Supply (USB-C, 27W) | 2 units | ₹1,500 | ₹3,000 | Pi 4 draws consistent power |
| 7-inch DSI Touchscreen | 1 unit | ₹4,500 | ₹4,500 | Expensive, keep 1 spare |
| DSI/HDMI Ribbon Cable | 2 units | ₹300 | ₹600 | Fragile, easy to disconnect |
| Micro HDMI Cable | 2 units | ₹200 | ₹400 | Connection to external monitor |
| USB Hubs (powered, 4-port) | 1 unit | ₹1,800 | ₹1,800 | For camera connections |
| Network Cable + connectors | 2 units | ₹150 | ₹300 | Ethernet backup for WiFi down |

**Total Spare Parts Cost:** ₹23,200 (~₹23K)

**Storage:** Keep spares in a labeled box. Track condition quarterly. Rotate stock every 6 months.

### Deployment Hardware Checklist

**Before shipping to a new shop, verify:**

- [ ] Pi 1 (POS) boots cleanly from SD card
- [ ] Pi 2 (sync) boots cleanly and connects to Pi 1
- [ ] All 4 USB cameras detect and stream video
- [ ] Touchscreen powers on and calibration is accurate
- [ ] WiFi connects and maintains stable link for 1 hour
- [ ] Model runs and detects test items at >85% confidence
- [ ] Database has sample data and can be queried
- [ ] Backup mechanism (daily DB dump) is working

---

## Failure Scenarios by Severity

### P0 — Shop Cannot Operate (Customer bleeding money)

**Scenario 1: Pi 1 (POS) completely unresponsive**

Symptoms:
- Touchscreen powered but shows no display
- SSH connection times out
- No lights on Pi (or lights stuck at 1 state)

**Diagnosis (5 min):**
```bash
# From your laptop, try SSH
ssh pi@[shop-static-ip]
# If no response:
ping [shop-ip]  # Should get replies
# If no ping: power issue or network disconnected
```

**Resolution (Priority order):**

1. **Step 1: Power cycle** (2 min)
   - Tell shop owner: "Turn off the power strip. Wait 30 seconds. Turn it back on."
   - Wait 60 seconds for boot
   - Try SSH again
   - **Success ETA: 30 sec** if it was a hang

2. **Step 2: Reseat SD card** (5 min on-site)
   - Power off
   - Open Pi case
   - Remove SD card, check for dust
   - Reseat firmly
   - Power on
   - Wait 60 sec, test SSH
   - **Success ETA: 10 min**

3. **Step 3: Swap SD card** (10 min on-site)
   - Grab pre-flashed spare SD from inventory
   - Power off, swap card
   - Power on, wait boot
   - Check if model runs: `ps aux | grep yolo`
   - **Success ETA: 15 min** (if spare is ready-to-go)

4. **Step 4: Swap entire unit** (30 min on-site)
   - Grab spare Pi 4 8GB (should be fully tested)
   - Swap all cables to spare unit
   - Power on
   - SSH and verify boot
   - Restore database from backup: `rsync [backup] /var/lib/shopsense/data.db`
   - Start model: `sudo systemctl start shopsense`
   - **Success ETA: 45 min**

**Total resolution target: 2 hours. If >2 hours unresolved remotely → dispatch same day.**

---

**Scenario 2: Touchscreen black (no display at all)**

Symptoms:
- Power light on Pi is green
- Can SSH into Pi successfully
- But touchscreen shows nothing (completely black)
- Power cable to touchscreen verified connected

**Diagnosis (5 min):**
```bash
ssh pi@[shop-ip]
# Check if display is detected
i2cdetect -y 1
# Should show address 0x45 for touch controller
lsusb | grep -i display  # Check for USB displays if using HDMI
```

**Resolution (Priority order):**

1. **Step 1: Check DSI ribbon cable** (2 min)
   - Power off Pi
   - Open case
   - Inspect DSI ribbon connection on both ends (Pi and display)
   - Reseat firmly (pull clip, slide in, push clip)
   - Power on, test
   - **Success ETA: 5 min**

2. **Step 2: Check display power** (2 min)
   - Confirm 5V USB power to touchscreen is connected
   - Use multimeter: should read 5V ±0.5V
   - If <4V: power supply is weak, swap it
   - **Success ETA: 5 min**

3. **Step 3: Swap display** (10 min on-site)
   - Power off
   - Unplug DSI ribbon from old display
   - Plug into new display (from spare kit)
   - Connect power
   - Power on, test touch responsiveness
   - **Success ETA: 20 min**

**Total resolution target: 30 min on-site.**

---

**Scenario 3: Camera feed dead (counter camera not streaming)**

Symptoms:
- SSH works, Pi responsive
- Touchscreen shows live feed from 3 cameras but 1 is black/no signal
- Shop owner says: "The counter camera isn't working"

**Diagnosis (5 min):**
```bash
ssh pi@[shop-ip]
# List camera devices
ls -la /dev/video*
# Should show /dev/video0, /dev/video1, /dev/video2, /dev/video3
# If missing one: that camera is disconnected or dead
v4l2-ctl --list-devices  # Shows which USB cameras are detected
```

**Resolution (Priority order):**

1. **Step 1: Reseat CSI connection** (3 min)
   - Power off
   - Open camera connection clip on Pi (pull gently)
   - Remove ribbon, inspect for dust
   - Reseat firmly
   - Power on, wait 10 sec
   - Check: `ls /dev/video*`
   - **Success ETA: 5 min**

2. **Step 2: Check cable for damage** (2 min)
   - Inspect entire ribbon length for bends, crimps, or cuts
   - If damaged: swap cable from spare kit
   - **Success ETA: 5 min**

3. **Step 3: Swap camera unit** (5 min on-site)
   - Unplug USB (if USB camera) or reseat ribbon (if CSI)
   - Install spare camera
   - Power on, verify detection
   - Run quick test: `ffplay /dev/video2`
   - **Success ETA: 10 min**

**Total resolution target: 20 min on-site.**

---

### P1 — System Degraded (Customer still operating but with friction)

**Scenario 1: Model confidence low (wrong detections, false positives spiking)**

Symptoms:
- Shop owner says: "System is detecting things that weren't bought"
- Dashboard shows confidence <70% on many items
- Error rate this week: 20%+ (should be <10%)

**Diagnosis (15 min remote):**
```bash
ssh pi@[shop-ip]
# Pull recent logs and check confidence scores
tail -500 /var/log/shopsense/app.log | grep confidence | tail -20
# Average should be >85%. If <75%: model retraining needed.

# Check recent false positives
sqlite3 /var/lib/shopsense/data.db "SELECT * FROM false_positives ORDER BY created_at DESC LIMIT 10;"
```

**Resolution:**

1. **Immediate (same day):** Collect data
   - Have shop owner photograph next 5 false positives
   - Save photos to WhatsApp/Drive
   - Note the actual item (was it a shadow? a reflection?)

2. **Short-term (24-48 hours):** Retrain model
   - Download photos of false positives
   - Label correctly in training dataset
   - Run retraining script: `python /opt/shopsense/retrain.py --shop [shop-id]`
   - Test new model against test set
   - If accuracy improved: push new model to Pi

3. **Push new model to shop** (20 min remote)
   - SSH into Pi
   - Download new model: `wget [model-url]`
   - Swap into /var/lib/shopsense/models/
   - Restart service: `sudo systemctl restart shopsense`
   - Send message: "Updated model deployed. Should see fewer false positives today."

**Resolution ETA: 24-48 hours (model retraining is the bottleneck)**

---

**Scenario 2: WiFi sync between Pi 1 and Pi 2 failing**

Symptoms:
- Pi 1 is running but Pi 2 (sync unit) isn't receiving data
- Shop owner says: "The second Pi isn't getting the data"
- Dashboard shows only Pi 1 events, Pi 2 events are missing

**Diagnosis (10 min remote):**
```bash
ssh pi@[shop-ip]
# Check if sync service is running
systemctl status shopsense-sync

# Check network connectivity between Pis
# From Pi 1:
ping 192.168.1.X  # IP of Pi 2
# Should get replies

# Check if port 8000 is listening
netstat -tlnp | grep 8000
# Should show 0.0.0.0:8000 LISTEN
```

**Resolution (Priority order):**

1. **Step 1: Restart Flask service** (2 min remote)
   ```bash
   ssh pi@[shop-ip]
   sudo systemctl restart shopsense
   sudo systemctl restart shopsense-sync
   sleep 10
   # Test sync
   curl localhost:8000/sync-status
   ```
   - **Success ETA: 5 min** if it was a hang

2. **Step 2: Check router** (5 min)
   - Confirm both Pis are connected to WiFi
   - Check router: are both Pis showing in connected devices?
   - If one is missing: restart WiFi on that Pi
   ```bash
   sudo systemctl restart networking
   ```
   - Wait 30 sec, check status
   - **Success ETA: 10 min**

3. **Step 3: Assign static IP** (10 min)
   - If WiFi is unstable, assign static IPs to both Pis
   - Edit `/etc/dhcpcd.conf` on each Pi
   - Restart networking
   - Test sync again
   - **Success ETA: 15 min**

**Resolution ETA: 15 min remote.**

---

**Scenario 3: Database corruption (SQLite)**

Symptoms:
- Touchscreen shows an error: "Database error"
- SSH shows process crash: `sudo systemctl status shopsense` → Failed
- Error log shows: `sqlite3.DatabaseError: database disk image is malformed`

**Diagnosis (5 min remote):**
```bash
ssh pi@[shop-ip]
sqlite3 /var/lib/shopsense/data.db "PRAGMA integrity_check;"
# If output is NOT "ok": database is corrupted
```

**Resolution:**

1. **Restore from backup** (10 min)
   ```bash
   # Backup current (corrupted) database
   sudo mv /var/lib/shopsense/data.db /var/lib/shopsense/data.db.corrupt

   # Restore from daily backup
   sudo cp /var/lib/shopsense/backups/data-latest.db.gz /tmp/
   sudo gunzip /tmp/data-latest.db.gz
   sudo mv /tmp/data-latest.db /var/lib/shopsense/data.db

   # Restart service
   sudo systemctl restart shopsense
   ```
   - **Success ETA: 10 min**
   - **Data loss:** Only transactions since last backup (usually <24 hours)

2. **If backup is also corrupted:** Restart fresh
   - Clear database
   - Restart service
   - Shop loses transaction history for that day, but system is operational

**Resolution ETA: 10 min remote.**

---

### P2 — Inconvenience (System works, but not smoothly)

**Scenario 1: Touchscreen unresponsive to touch**

Symptoms:
- Display shows correct image
- But taps don't register or respond very slowly
- Swipes don't work

**Resolution:**

1. **Calibrate touch** (5 min)
   - Bring up calibration menu
   - Touch 4 corners of screen as prompted
   - Save calibration
   - Test responsiveness
   - **Success ETA: 5 min**

2. **Clean screen** (2 min)
   - Dust and fingerprints can affect capacitive touch
   - Use microfiber cloth with isopropyl alcohol
   - Dry completely
   - **Success ETA: 2 min**

3. **Check USB connection** (3 min)
   - Touchscreen connects via USB for touch data (separate from DSI video)
   - Reseat USB cable
   - Test responsiveness
   - **Success ETA: 3 min**

**Resolution ETA: 5-10 min.**

---

## Remote Support Protocol

How to help customers without being on-site.

### Access & Authentication

**SSH Access:**
- Port: 22 (standard)
- User: `pi`
- Password: [stored in password manager, not in docs]
- IP: Static IP assigned at install (e.g., 192.168.1.50)

**Secure tunnel (if remote network is restrictive):**
- Option A: ngrok tunnel setup at install
  ```bash
  # On Pi:
  ngrok tcp 22
  # Gives you: ngrok-url:port
  # SSH from anywhere: ssh -p [port] pi@[ngrok-url]
  ```
- Option B: TeamViewer (installed at install, licensed)

### Health Check Command

Run this weekly to monitor all deployed units:

```bash
#!/bin/bash
# Check health of [shop-ip]

ssh pi@[shop-ip] << 'EOF'
echo "=== System Health ==="
uptime
df -h /  # Disk space
free -h  # Memory
ps aux | grep -i yolo | grep -v grep  # Model running?
echo "=== Network ==="
ping -c 1 8.8.8.8  # Internet connectivity
iwconfig wlan0 | grep -i quality  # WiFi signal
echo "=== Database ==="
sqlite3 /var/lib/shopsense/data.db "SELECT COUNT(*) FROM transactions;"
echo "=== Logs (last 5 errors) ==="
tail -20 /var/log/shopsense/app.log | grep -i error
EOF
```

### Status Check Commands

| Check | Command | Good Output |
|---|---|---|
| Is Pi responsive? | `ping [ip]` | Reply time <50ms |
| Is model running? | `ps aux \| grep yolo` | Process visible |
| Is database OK? | `sqlite3 /var/lib/shopsense/data.db "PRAGMA integrity_check;"` | "ok" |
| Is WiFi stable? | `iwconfig wlan0` | Signal ≥70% |
| Is disk space OK? | `df -h /` | ≥20% free |
| Recent errors? | `tail -50 /var/log/shopsense/app.log` | No ERROR or CRITICAL lines |

### Restart Service (Remote)

```bash
ssh pi@[shop-ip]
sudo systemctl restart shopsense
sleep 5
ps aux | grep shopsense  # Verify it's running
```

---

## Escalation: When to Dispatch On-Site

Decision matrix:

| Scenario | Diagnosis Time | Typical Fix | Escalate to On-Site? |
|---|---|---|---|
| P0: Pi completely unresponsive | 5 min | Power cycle → SD swap → Pi swap | YES, if >30 min remote fails |
| P0: Touchscreen dead | 5 min | Reseat ribbon → Swap display | YES, if >15 min remote fails |
| P0: Camera dead | 5 min | Reseat → Swap camera | YES, if >15 min remote fails |
| P1: Model low confidence | 10 min | Collect data → Retrain → Push model | NO, handle remote |
| P1: WiFi sync failing | 10 min | Restart service → Check router → Assign static IPs | NO, handle remote |
| P1: Database corrupt | 5 min | Restore from backup | NO, handle remote |
| P2: Touchscreen unresponsive | 5 min | Calibrate → Clean → Reseat USB | NO, walk through remote |

**Dispatch Same Day If:**
- P0 unresolved after 30 min remote troubleshooting
- Critical customer (high revenue, potential churn)
- Requires physical inspection (water damage, loose connections, etc.)

**Dispatch Next Morning If:**
- P1 unresolved after 2 hours remote
- Can be scheduled; not urgent

**Schedule Visit If:**
- P2 repeatedly occurs (suggests deeper issue)
- Quarterly maintenance (camera alignment, dust, cable inspection)
- New staff training needed

---

## Warranty & Support Pricing

Clear policy to set expectations.

### Months 0-6 (Warranty Period)

- **Parts:** Free (Ooru Logix pays)
- **Labor:** Free (your time)
- **Support:** Unlimited (calls, remote, on-site visits)

**Note:** Customer is probably not stable on the system yet. Invest in their success.

### Months 6-12

- **Parts:** Customer pays cost + 20% (e.g., ₹1,200 camera → customer pays ₹1,440)
- **Labor:** Free for remote, ₹500/visit for on-site
- **Support:** Unlimited (calls, remote), on-site visits ₹500/visit

### Post-12 Months

- **Parts:** Customer pays full cost
- **Labor:** ₹500/call (remote), ₹1,000/visit (on-site, includes 1 hour)
- **Support:** ₹500/month retainer for unlimited support, or à la carte

---

## Preventive Maintenance Schedule

**Monthly:** Verify remotely
- [ ] All Pis are running
- [ ] No ERROR lines in logs
- [ ] Database integrity OK
- [ ] WiFi signal stable

**Quarterly:** Visit on-site
- [ ] Visually inspect camera alignment
- [ ] Clean all optical surfaces (cameras, touchscreen)
- [ ] Check cable connections (no loose connectors)
- [ ] Verify power supply (no signs of overheating)
- [ ] Run a full model inference test

**Annually:** Full audit
- [ ] Reload OS on both Pis (fresh SD cards)
- [ ] Verify all hardware is still functioning
- [ ] Backup all customer data
- [ ] Update model if significant retraining done
