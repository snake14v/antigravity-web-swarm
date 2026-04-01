# Installation Runbook — ShopSense Field Guide

**For:** Field Engineers performing on-site installations
**Duration:** ~2.5 hours per installation
**Audience:** Shop owners with limited tech literacy
**Language:** English, with Kannada/Hindi support as needed

---

## Pre-Visit Checklist (Day before or morning of install)

### Customer Information
- [ ] Shop name and address confirmed
- [ ] Owner contact number and WhatsApp
- [ ] Shop category (chai shop, kirana store, bakery, etc.)
- [ ] Store hours (when is best time to install?)
- [ ] Key contact person available on install day

### Kit Contents Verification
Before leaving the office, confirm you have:
- [ ] Raspberry Pi 4 Unit A (labeled "Pi-A")
- [ ] Raspberry Pi 4 Unit B (labeled "Pi-B")
- [ ] 4 cameras (USB-connected, labeled Cam-1 through Cam-4)
- [ ] Power cables (2x, tested)
- [ ] USB extender cables (2x, 3 meters)
- [ ] Ethernet cable (if WiFi backup needed)
- [ ] WiFi adapter (if needed)
- [ ] Mounting brackets and screws
- [ ] Calibration test checklist printed
- [ ] Quick-reference card (printed and laminated)

### Engineer Toolkit
- [ ] Laptop with SSH access to Pi firmware
- [ ] Network adapter and USB hub
- [ ] Screwdriver set (Phillips, flathead)
- [ ] Level tool (for camera alignment)
- [ ] Tape measure
- [ ] Flashlight
- [ ] Phone with WhatsApp (for photo updates)
- [ ] Print-outs: this runbook, training guide, owner sign-off sheet

### Pre-Loaded Firmware
- [ ] Verify latest firmware downloaded
- [ ] Confirm shop-specific settings pre-loaded (shop name, address, category)
- [ ] Test WiFi credentials loaded (or ready to input on-site)

---

## Phase 1: Arrival & Site Assessment (15 minutes)

### Greet the Owner
- Introduce yourself: "Namaste! I'm [NAME] from Ooru Logix. Ready to get your ShopSense system set up today?"
- Confirm available time for owner to be present for full installation and training
- Ask owner to keep shop operating normally (good for testing later)

### Power & Connectivity Assessment

**Power Outlets:**
- [ ] Identify 2+ outlets where Pi units will be placed (counter and rear area typical)
- [ ] Verify outlets are working (plug in temporary device to test)
- [ ] Note if outlet is on same power strip as refrigerator or high-draw equipment (can cause instability)
- [ ] If outlets limited, identify backup power solution (extension cable, different area)

**WiFi Connectivity:**
- [ ] Ask owner for WiFi network name and password
- [ ] Test WiFi signal strength in proposed Pi locations using phone
- [ ] If signal weak (<-70 dBm), suggest moving router or using WiFi extender
- [ ] Note: System works offline, but WiFi required for cloud sync and software updates

**Backup Connectivity:**
- [ ] If WiFi unreliable, discuss mobile hotspot or ethernet backup plan
- [ ] Document decision in install notes

### Camera Mounting Points Assessment

**Ideally:** Cameras cover all inventory areas (shelves, counter, refrigeration)

**For each proposed camera location:**
1. [ ] Check viewing angle: Can camera "see" the intended inventory area? (Test by standing where camera will be, look at area it needs to cover)
2. [ ] Check mounting surface: Is there a wall, shelf, or ceiling point sturdy enough to mount bracket?
3. [ ] Check for obstructions: Will shelves, boxes, or people block the camera view during normal operations?
4. [ ] Check lighting: Is area well-lit? If night-only problem, note that day detection may be better
5. [ ] Estimate distance: Camera should be 1–5 meters from inventory (closer = more detail, farther = wider view)

**Document the layout:**
- Sketch a simple shop floor plan with proposed camera positions (Cam-1, Cam-2, Cam-3, Cam-4)
- Label each area (front shelves, rear counter, refrigeration, snacks section, etc.)
- Note any areas that may be hard to monitor (e.g., high shelves, dark corners)

### Lighting Conditions
- [ ] Check natural light during typical operating hours (morning vs. afternoon)
- [ ] Note any areas with heavy shadows or backlight (windows behind shelves)
- [ ] If shop has artificial lighting only, ensure it's adequate (>300 lux ideal)
- [ ] If 24-hour shop, check night-time lighting (may need adjustment for night detection)

### Photos for Records
- [ ] Take photo of shop entrance and overall layout
- [ ] Take photo of each proposed camera location
- [ ] Take photo of power and WiFi areas
- [ ] Upload to customer folder in Firebase post-install

---

## Phase 2: Hardware Installation (45 minutes)

### Mount Cameras

**Camera 1 (Typically: Front of shop, upper left)**
1. [ ] Using level tool, mark mounting point on wall/ceiling at ~2 meters height
2. [ ] Drill/screw mounting bracket (ensure bracket is level)
3. [ ] Insert camera into bracket (USB connector should face downward or toward rear)
4. [ ] Connect USB cable to Pi Unit A (will plug in during Pi setup phase)
5. [ ] Do NOT power on yet; leave cable loose
6. [ ] Document camera 1 position in notes and photo

**Repeat for Cameras 2, 3, 4:**
- Typical positions: front-upper-right, rear-left, rear-right (or adapt based on shop layout)
- Cameras should cover all inventory zones with minimal overlap
- Ensure each camera has clear line of sight to its designated area

### Install Raspberry Pi Units

**Pi Unit A (Primary, typically at counter):**
1. [ ] Choose power outlet near front of shop (visible, but not in way)
2. [ ] Place Pi Unit A on counter or nearby shelf (not inside a hot enclosure)
3. [ ] Leave 10 cm clearance on all sides for ventilation
4. [ ] Do NOT plug in power yet

**Pi Unit B (Secondary, typically at rear):**
1. [ ] Choose power outlet at rear of shop (near inventory or secondary counter)
2. [ ] Place Pi Unit B in similar position (not too hot, ventilation clearance)
3. [ ] Do NOT plug in power yet

### Connect Power

**Power Up Sequence (Important: do this step by step)**
1. [ ] Plug in Pi Unit A (LED should light red, then blue after ~30 seconds)
2. [ ] Wait 60 seconds for Pi A to fully boot
3. [ ] Verify Pi A blue LED is steady (indicates OS running)
4. [ ] Plug in Pi Unit B
5. [ ] Wait 60 seconds for Pi B to fully boot
6. [ ] Verify both units have steady blue LED
7. [ ] Note: Both units will be quiet (no fans); no noise is normal

### Connect Cameras to Pi Units

**Camera Layout Example (Adapt based on shop):**
- Pi A (Front): Cameras 1 & 2 (front of shop)
- Pi B (Rear): Cameras 3 & 4 (rear/inventory area)

**For each camera:**
1. [ ] Trace USB cable from camera to assigned Pi unit
2. [ ] Insert USB connector fully (should click)
3. [ ] Verify LED on camera lights up (power indicator)
4. [ ] Test: briefly cover camera lens with hand, observe on Pi (should see black on camera preview)

### Network Configuration

**Wired Network (Preferred, if available):**
1. [ ] Connect ethernet cable from shop router to Pi A (Ethernet port)
2. [ ] Wait 30 seconds for connection
3. [ ] Verify ethernet LED on Pi A blinks (indicates activity)

**Wireless Network (If wired not available):**
1. [ ] Connect WiFi adapter to Pi A USB port
2. [ ] Using your laptop (or Pi A directly), connect to shop WiFi network
3. [ ] Log WiFi credentials into system (will persist across reboots)
4. [ ] Verify both Pi units show connected status on your diagnostic tool

---

## Phase 3: Software Configuration (30 minutes)

### Access Pi Units via SSH

Using your laptop:
```
ssh pi-a.local (or IP address if DHCP not available)
Password: [standard Pi password]
```

If SSH not responding, wait another 30 seconds and retry.

### Verify & Update Firmware

1. [ ] Check current firmware version: `cat /opt/shopshop/version.txt`
2. [ ] If version older than today, update: `sudo /opt/shopshop/update.sh`
3. [ ] Reboot after update: `sudo reboot`
4. [ ] Wait 60 seconds, then reconnect and verify: `systemctl status shopshop-detector`
   - Should show "active (running)"

### Load Shop-Specific Configuration

1. [ ] Edit config file: `sudo nano /opt/shopshop/config.json`
2. [ ] Verify these fields are set:
   ```json
   {
     "shop_name": "[Shop name from booking]",
     "shop_address": "[Address from booking]",
     "timezone": "Asia/Kolkata",
     "wifi_ssid": "[Shop WiFi name]",
     "offline_mode": true,
     "sync_interval_hours": 2
   }
   ```
3. [ ] Save and exit (Ctrl+X, Y, Enter)
4. [ ] Restart detector: `sudo systemctl restart shopshop-detector`

### Repeat for Pi Unit B

- SSH into pi-b.local
- Verify firmware version and update if needed
- Load shop configuration (same as Pi A)
- Note: Pi B may have slightly delayed update; this is normal

### Verify Dashboard Access

1. [ ] From your laptop, open browser: `http://pi-a.local:8000/dashboard`
2. [ ] Confirm dashboard loads (should show live camera feeds from all 4 cameras)
3. [ ] Check camera feeds: each camera should show its area of shop
4. [ ] If any camera shows black or snow (noise), double-check USB connection and lens clarity

### Test Offline Mode

1. [ ] Disconnect WiFi/ethernet from Pi A
2. [ ] Confirm dashboard still accessible (should work from local network)
3. [ ] Perform transaction test (see below), offline data should buffer locally
4. [ ] Reconnect WiFi, verify sync completes within 30 seconds

---

## Phase 4: Model Calibration (20 minutes)

### Pre-Calibration Preparation

Explain to owner: "We're now teaching the system to recognize your inventory. We'll run a test count to make sure the cameras are aligned correctly."

### Calibration Test: Shelf Count

Choose one area to calibrate (e.g., snacks shelf, or front counter):

1. [ ] Manually count items in chosen area (let's say: 15 items on snacks shelf)
2. [ ] Open dashboard camera view for that area
3. [ ] Run system count: click "Scan Area" button in dashboard
4. [ ] Wait 15 seconds for AI inference to complete
5. [ ] Compare results:
   - If system count is 14–16 (within 1 of manual): **PASS** — accuracy is good
   - If system count is 10–13 or 17–20: **RECALIBRATE** — adjust camera angle

### If Count is Off: Adjust Camera Angle

1. [ ] Loosen camera mounting bracket
2. [ ] Move camera by 5–10 degrees in direction of error:
   - System count too low? Move camera to see more inventory
   - System count too high? Camera may be double-counting; move to clearer angle
3. [ ] Retighten bracket (ensure level)
4. [ ] Wait 30 seconds for system to re-analyze
5. [ ] Run count test again
6. [ ] If still off, repeat adjustment (max 2–3 iterations per camera)

### Final Calibration Check

After camera adjustments, run confidence threshold test:
1. [ ] System should show confidence score of >85% on each item detected
2. [ ] If confidence <85%, note in report; may indicate poor lighting or camera alignment

### Document Baseline Accuracy

In install notes, record:
```
Calibration Test Results:
- Area tested: [Snacks shelf / Counter / etc.]
- Manual count: [X items]
- System count: [Y items]
- Accuracy: [(Y/X) * 100]%
- Cameras adjusted: [Yes/No] [How many times?]
- Final confidence: [>85% / 85% / <85%]
```

---

## Phase 5: Owner Walkthrough & Sign-Off (30 minutes)

### Dashboard Demo (15 minutes)

1. [ ] Open dashboard on a tablet or phone (owner should follow on their device if possible)
2. [ ] Show the four main screens:
   - **Live View:** "These are your 4 cameras watching inventory right now"
   - **Inventory Count:** "Total items in stock, updated every 60 seconds"
   - **Daily Sales:** "Items that left the shop today, tracked automatically"
   - **Accuracy Report:** "How confident the system is (should be >90%)"

3. [ ] Explain billing in simple terms:
   - "At end of month, system counts all items that left your shop and multiplies by price. That's your bill. No guessing."
   - "Errors near zero because system is automatic, not manual"

4. [ ] Show daily startup routine:
   - "Every morning, turn on these two boxes (point to Pi units)"
   - "Wait 2 minutes"
   - "Open dashboard—should show your current inventory"
   - "Scroll down to see yesterday's sales"

5. [ ] Explain offline resilience:
   - "If WiFi drops, system keeps counting. When WiFi comes back, it syncs automatically."
   - "Your data is safe even if there's a power cut."

### Testing Transaction (10 minutes)

Demonstrate that billing actually works:

1. [ ] Ask owner to remove 2–3 items from a monitored shelf
2. [ ] Check dashboard: items should disappear from count within 10–15 seconds
3. [ ] Refresh daily sales view: should show those items as "sold today"
4. [ ] Reassure: "This is automatic. Your staff doesn't need to press anything."

### Troubleshooting Basics (5 minutes)

Teach owner these basic checks:
- "**Cameras not detecting?** Check that nothing is blocking them. If still not working, call us."
- "**System offline?** Check WiFi router lights. If everything looks fine, call us."
- "**Strange count?** Take a manual count of one area and compare. Call us if different."

### Sign-Off Sheet

Have owner sign simple confirmation:
```
INSTALLATION SIGN-OFF

Shop: [Name]
Date: [Date]
Installer: [Your name]

I confirm that:
☐ All 4 cameras are installed and working
☐ I understand how to use the dashboard
☐ I understand how billing works
☐ I know who to call if there are issues
☐ I'm ready for the 7-day monitoring period

Owner Signature: ________________  Date: _____
```

Upload signed sheet to Firebase customer folder.

---

## Phase 6: Post-Install Verification (15 minutes, can be next day)

### Log System State

Run these commands from your laptop (SSH into Pi A):

```bash
# Check both Pi units are running
systemctl status shopshop-detector
systemctl status shopshop-sync

# Verify all 4 cameras connected
lsusb | grep -i camera

# Check storage space (should be >50% free)
df -h

# Check temperature (should be <70°C)
vcgencmd measure_temp

# View recent logs
tail -50 /var/log/shopshop/detector.log
```

### Full Billing Cycle Test (Optional but recommended)

1. [ ] Ask owner to perform 5 mock transactions (remove 5 different items from shelf)
2. [ ] Observe dashboard: all 5 should appear in "Daily Sales"
3. [ ] Re-shelve the items
4. [ ] Run system count: should return to original count
5. [ ] Verify accuracy >95% on this test

### Upload Documentation to Firebase

In customer's folder in Firebase, create these records:
- Installation date and time
- Calibration test results (accuracy, cameras adjusted)
- Shop layout diagram (hand-drawn or photo is fine)
- Baseline uptime and accuracy
- Owner sign-off sheet (photo or PDF)
- Any special notes (e.g., "WiFi is weak, monitor stability")

---

## Common Troubleshooting During Installation

| Issue | Symptom | Fix |
|-------|---------|-----|
| Camera not detected | USB device not appearing in `lsusb` | Reseat USB connector firmly; try different USB port on Pi |
| Pi not booting | No blue LED after 60 sec | Check power supply; try different outlet |
| Dashboard not loading | Browser can't reach `pi-a.local:8000` | Verify Pi is on same WiFi network as laptop; check firewall settings |
| Accuracy <80% on calibration | System count significantly off from manual count | Adjust camera angle 5–10 degrees; check lighting; verify camera lens is clean |
| WiFi very weak | Dashboard sluggish, sync taking >5 min | Move Pi closer to router; suggest WiFi extender; document for future support |
| Shop has no spare power outlet | Need to power both Pi units, but only 1 outlet available | Use power strip or extension cable; ensure total power draw <500W |
| Owner not available during install | Can't do walkthrough/training | Reschedule installation to time owner can be present; training is critical |

---

## Escalation Criteria

**Stop installation and escalate to support if:**
- Hardware is defective (Pi or camera won't power on despite troubleshooting)
- Shop has no viable WiFi (and no mobile hotspot available)
- Camera accuracy <70% after 3 calibration attempts (may indicate poor camera quality or impossible lighting)
- Owner refuses to sign off (indicates fit issue; escalate to sales for refund/renegotiation)
- Estimated total time >3 hours (something is wrong; call support)

**Continue with installation if:**
- Accuracy >85% on calibration
- Owner is confident with basic operations
- All hardware is functional
- WiFi is usable (even if not perfect)

---

## Post-Installation Handoff

Before leaving the shop:

1. [ ] Leave this runbook with owner (for reference)
2. [ ] Leave laminated quick-reference card (on counter)
3. [ ] Leave engineer contact card with phone and WhatsApp
4. [ ] Confirm owner WhatsApp number for daily check-in calls
5. [ ] Send WhatsApp message (Template from main skill): "Installation complete! We'll check in daily. Thank you!"
6. [ ] Call support team to confirm installation status in Firebase

---

## Notes Template

Use this template to document installation in Firebase:

```
INSTALLATION NOTES

Shop: [Name]
Date: [Date]  Time: [Time]
Address: [Full address]
Installer: [Your name]

SITE ASSESSMENT:
- Power: [Outlets available, quality]
- WiFi: [Network name, signal strength dBm]
- Lighting: [Natural/artificial, adequacy]
- Layout: [Brief description of shop layout]

CAMERA PLACEMENT:
- Cam 1: [Location, height, viewing area]
- Cam 2: [Location, height, viewing area]
- Cam 3: [Location, height, viewing area]
- Cam 4: [Location, height, viewing area]

FIRMWARE & CONFIG:
- Version: [X.X.X]
- Updated: [Yes/No]
- WiFi configured: [Yes/No]
- Offline mode tested: [Yes/No]

CALIBRATION:
- Area tested: [Description]
- Manual count: [X]
- System count: [Y]
- Accuracy: [Z%]
- Adjustments made: [Describe any camera angle changes]

OWNER FEEDBACK:
- Confidence level: [High/Medium/Low]
- Questions asked: [Summarize]
- Sign-off obtained: [Yes/No]

ISSUES NOTED:
- [List any issues, however minor]
- Follow-up needed: [Yes/No] [What?]

```

