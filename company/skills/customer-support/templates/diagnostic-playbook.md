# Diagnostic Playbook — ShopSense Hardware & Software Troubleshooting

**For:** Tier 2 (AI Agent) and Tier 3 (Remote Support) engineers
**Purpose:** Step-by-step diagnosis and resolution for common ShopSense issues
**Format:** Symptom → Probable Cause → Diagnostic Steps → Fix Procedure → Escalation Criteria

---

## Category 1: Camera Issues

### Issue 1.1: Camera Shows Black / No Image

**Symptoms:**
- Dashboard shows black screen for one or more cameras
- When looking at live view, camera appears to be off
- USB camera LED may or may not be lit

**Probable Causes (in order of likelihood):**
1. USB cable disconnected or loose
2. Camera is powered off / defective
3. Camera USB port failed on Pi
4. Lens is covered or very dirty
5. Camera firmware issue (rare)

**Diagnostic Steps:**

```bash
# Step 1: Check physical connection
# Have customer verify: Is the USB cable visibly connected to both camera and Pi?
# Look for loose connector, kinks, or damage to cable

# Step 2: Check camera USB LED
# Have customer look at camera LED (usually small red light)
# Is it lit? If not → power issue likely

# Step 3: Verify camera is detected by Pi (SSH to Pi A or B as appropriate)
lsusb | grep -i camera
# Should show 4 USB camera devices or similar
# If missing one → USB device not detected

# Step 4: Check camera imaging
# From Pi, test if image can be captured
ffmpeg -f v4l2 -i /dev/video0 -vframes 1 /tmp/test.jpg 2>&1 | head -20
# If error → camera firmware or port issue
# If success → camera is responding, but dashboard might be misconfigured

# Step 5: Check dashboard camera assignment
# Verify dashboard is looking at correct /dev/videoX
cat /opt/shopshop/config.json | grep -i video
# Compare to actual camera mappings in lsusb output
```

**Fix Procedure (in order):**

**Fix 1: Reseat USB Cable** (Try first, takes 30 seconds)
1. Unplug camera USB from Pi
2. Wait 5 seconds
3. Firmly reconnect (should click / seat fully)
4. Wait 30 seconds for system to re-detect
5. Check dashboard: image should appear

**Fix 2: Check Lens** (If reseat didn't work)
1. Have customer check if lens is covered (dust cap still on, or dirt)
2. Gently clean lens with dry, soft cloth (no liquids)
3. Check dashboard again

**Fix 3: Try Different USB Port** (If still black)
1. Unplug camera from current Pi USB port
2. Plug into different USB port on same Pi (or different Pi if available)
3. SSH to Pi, run lsusb again to confirm detection
4. Update config if port assignment changed
5. Restart detector service: `sudo systemctl restart shopshop-detector`
6. Check dashboard

**Fix 4: Restart Pi** (If still black after USB change)
1. Have customer power off Pi (the one with the black camera)
2. Wait 10 seconds
3. Power back on
4. Wait 2 minutes for full boot
5. Check dashboard

**Escalation Criteria:**
- If black persists after all above steps → Camera is likely defective
- [ ] **Escalate to Tier 3/4:** Camera replacement needed (field engineer visit to swap)

**Customer Communication:**
"The camera isn't responding. We've tried a few things remotely. At this point, we need to either replace the camera or do some deeper diagnostics on-site. I'm going to escalate this to our engineers, and they'll reach out to schedule a replacement visit. Should be within 2–3 days."

---

### Issue 1.2: Camera Image is Blurry / Out of Focus

**Symptoms:**
- Camera is showing an image, but it's blurry or soft
- Details are hard to make out (can't clearly see items on shelf)
- Blur is consistent (not intermittent)

**Probable Causes (in order):**
1. Camera lens needs focusing adjustment (most common)
2. Camera is too close to objects (depth of field issue)
3. Lens is dirty / dusty
4. Camera is moving / vibrating
5. Lens is physically damaged

**Diagnostic Steps:**

```bash
# Step 1: Have customer visually inspect the camera
# Look at the lens through the dashboard camera view
# Is there visible dust, dirt, or smudging on the lens?

# Step 2: Ask customer about camera distance
# "How far is the camera from the nearest shelf?"
# Optimal: 1–3 meters. Too close (<30cm) → blurry
# Too far (>5m) → loses detail

# Step 3: Check for vibration
# Have customer gently touch the camera mount/bracket
# Is it loose? Does it move when pressed?

# Step 4: Check detection accuracy
# If image is blurry but detection still works (>85% confidence)
# → Blur may be acceptable; image quality ≠ detection quality

# Step 5: Check firmware / camera model
# Some cameras have manual focus; others are fixed-focus
# Check config: cat /opt/shopshop/config.json | grep camera
```

**Fix Procedure (in order):**

**Fix 1: Clean the Lens** (Simplest, do first)
1. Have customer turn off camera (unplug USB)
2. Gently wipe lens with soft, dry cloth (no water, no chemicals)
3. Plug camera back in
4. Wait 10 seconds, check dashboard

**Fix 2: Adjust Camera Distance** (If still blurry)
1. If camera is <50cm from objects: move it farther (to 1–2 meters)
2. If camera is >4 meters away: move closer (to 2–3 meters)
3. Wait 30 seconds for system to refocus
4. Check dashboard image clarity

**Fix 3: Adjust Camera Angle/Tilt** (If distance adjustment helped but still blurry)
1. Loosen camera mounting bracket slightly
2. Tilt camera up/down and side-to-side by small increments (5–10 degrees)
3. Tighten bracket
4. Check dashboard image clarity
5. Repeat until sharp (may take 2–3 iterations)

**Fix 4: Adjust Focus (if camera has manual focus ring)**
1. Look at camera barrel (some cameras have a focus ring near the lens)
2. If present, gently rotate focus ring while watching dashboard image
3. Rotate slowly until image becomes sharp
4. Stop and tighten (if focus ring has lock)

**Escalation Criteria:**
- If blurry after cleaning, distance adjustment, and angle adjustment → Likely lens defect
- [ ] **Escalate to Tier 3/4:** Camera replacement, or send replacement lens if available

**Customer Communication:**
"The camera image is a bit soft. Let's try a few things: clean the lens, make sure it's at the right distance from the items, and adjust the angle. Most of the time, this clears it up. If it's still blurry after that, we can send a replacement camera."

---

### Issue 1.3: Camera is Pointing Wrong Direction / Bad Angle

**Symptoms:**
- Camera is visibly misaligned (pointing at wall instead of shelf, pointing down instead of forward)
- Detection accuracy very low for that camera's area (e.g., 20% vs. expected 90%)
- Customer reports: "Camera seems to be in the wrong spot"

**Probable Causes:**
1. Camera mount bracket loosened (due to vibration, age, or tampering)
2. Customer or staff accidentally moved camera
3. Camera was mounted incorrectly initially
4. Shelves were rearranged (camera position is now incorrect for new layout)

**Diagnostic Steps:**

```bash
# Step 1: Ask customer visually
# "Is the camera pointing at the right area of the shop?"
# Have them describe what camera should see vs. what it does see

# Step 2: Check detection logs for that camera
# Does system show detection activity from the intended area?
# Or is it detecting empty wall?
grep "camera_1" /var/log/shopshop/detector.log | tail -20
# Look for confidence scores; if all very low → likely angle issue

# Step 3: Compare to baseline
# Look at installation notes: what angle/height was camera installed at?
# Current position different? → Likely moved
```

**Fix Procedure:**

**Fix 1: Visually Align Camera** (Takes 5–10 minutes)
1. Have customer describe the area the camera should monitor (e.g., "snacks shelf, middle section")
2. Help customer loosen the camera mounting bracket (turning bracket screws 1–2 turns counterclockwise)
3. Manually adjust camera direction to point at the intended area
4. Use level tool to ensure camera is vertical/horizontal as appropriate (depends on mount)
5. Tighten bracket firmly (but not over-tight)
6. Wait 30 seconds for system to re-analyze
7. Check dashboard: does the camera now show the intended area?

**Fix 2: Test Detection on New Angle** (After physical adjustment)
1. Have customer place a known item (e.g., a snack package) in the camera's view
2. Check dashboard: does system detect the item?
3. If yes (within 5–10 seconds) → Angle fix is working
4. If no → May still be misaligned, or accuracy still needs tuning

**Fix 3: Run Calibration Test on Adjusted Camera** (To verify accuracy)
1. Have customer manually count items in the camera's view area (e.g., 15 items)
2. Open dashboard, run "Scan" for that area
3. System should report ~15 items
4. If within 10%: alignment is fixed
5. If not: may need another small adjustment, or accuracy tuning

**Escalation Criteria:**
- If camera angle adjusted but accuracy still <70% → May need on-site recalibration
- If camera mount is physically broken (cracked bracket, stripped screw holes) → Escalate to Tier 4

**Customer Communication:**
"The camera seems to have shifted position. Let's adjust it back to pointing at [AREA]. This should take about 5 minutes. I'll walk you through it."

---

### Issue 1.4: Night Mode Not Working / Low Detection at Night

**Symptoms:**
- Camera works fine during day (>90% accuracy)
- At night, detection drops sharply (<50% accuracy)
- Night-time image on dashboard appears dark or noisy

**Probable Causes (in order):**
1. Shop lighting is insufficient at night (or lights are off)
2. Camera doesn't have night mode, or it's not enabled
3. Camera is backlit (light source behind objects, shadows in front)
4. Night mode exposure settings are wrong

**Diagnostic Steps:**

```bash
# Step 1: Check shop lighting at night
# Have customer describe shop lighting after dark
# "Are store lights on? Bright? Dim? Off?"

# Step 2: Check detection logs for night-time period
# grep "night" /var/log/shopshop/detector.log
# Or filter by time: grep "22:00\|23:00\|00:00" /var/log/shopshop/detector.log
# Look for low confidence scores during night hours

# Step 3: Check if night mode is available on camera
# cat /opt/shopshop/camera_config.json | grep -i "night\|infrared"
# Some cameras have night mode (infrared), others don't

# Step 4: Manual test: Night image quality
# Have customer take screenshot of dashboard camera view at night
# Is the image completely black, or can details be seen?
```

**Fix Procedure:**

**Fix 1: Improve Night-Time Lighting** (First and most common solution)
1. If shop lights are off at night: turn them on (or leave on if 24-hour shop)
2. If lights are dim: add supplemental lighting near cameras (LED strips, spotlights)
3. Light should evenly illuminate the areas cameras are monitoring
4. Wait 30 seconds for system to re-analyze
5. Check accuracy during night-time hours → should improve

**Fix 2: Adjust Camera Exposure Settings** (If lighting improved but still dark)
1. SSH to Pi, edit camera config: `sudo nano /opt/shopshop/camera_config.json`
2. Increase exposure value (if parameter exists): `"exposure": 50` → `"exposure": 80`
3. Save and restart: `sudo systemctl restart shopshop-detector`
4. Test detection accuracy at night
5. If still poor, increase more (up to 100)

**Fix 3: Reposition Light or Camera** (If above didn't fully solve)
1. If backlit issue (light behind products, shadow in front):
   - Move light source to side or in front of products
   - Or tilt camera to reduce backlight
2. Test detection accuracy after repositioning

**Escalation Criteria:**
- If night-time accuracy still <70% after lighting improvement → May need infrared-capable camera
- [ ] **Escalate to Tier 3/4:** Recommend infrared camera upgrade for 24/7 shops

**Customer Communication:**
"Night-time detection is tricky without good lighting. The best fix is to add lights or keep existing lights on at night. If that's not possible, we have infrared cameras that work in the dark. Let's try the lighting fix first, and if it doesn't help, we can discuss upgrading to infrared."

---

## Category 2: Raspberry Pi Issues

### Issue 2.1: Pi Won't Boot / No Power Indicator

**Symptoms:**
- Pi is plugged in, but no LED lights up (no red or blue light)
- System is completely unresponsive (SSH fails)
- No response when powered on

**Probable Causes (in order):**
1. Power supply defective or unplugged
2. SD card is corrupted or not fully inserted
3. Pi hardware is defective (rare)

**Diagnostic Steps:**

```bash
# Step 1: Verify power supply
# Check if power cable is firmly plugged into both outlet and Pi
# Check if outlet has power (plug in lamp to test)
# Measure voltage on power supply (should be 5.1V): use multimeter if available

# Step 2: Check power indicator LED
# With power on, should see red LED immediately
# If no red LED → power supply issue

# Step 3: Check SD card (if accessible)
# Some Pi units have SD card visible from bottom
# Check if SD card is fully inserted (should click, not loose)
# Gently push SD card in if it appears loose

# Step 4: Listen for activity
# After powering on, listen for fan noise or click sounds (may indicate boot attempt)
# Complete silence → power not reaching Pi
```

**Fix Procedure:**

**Fix 1: Check Power Supply** (Do first)
1. Unplug power cable from Pi
2. Plug power supply into different outlet (to rule out bad outlet)
3. Plug back into Pi
4. Wait 10 seconds: should see red LED
5. If red LED appears → power supply was fine, may be intermittent outlet issue
6. If still no LED → Move to Fix 2

**Fix 2: Reseat SD Card** (If power is good but Pi not booting)
1. Unplug power from Pi
2. Locate SD card slot on Pi (usually bottom or side)
3. Gently push SD card fully in (should hear a click)
4. Plug power back in
5. Wait 30 seconds: should see red LED, then blue LED after 30–60 seconds
6. If blue LED appears → Pi is booting; wait 2 min for full boot

**Fix 3: Check for Physical Damage** (If still not booting)
1. Unplug power
2. Visually inspect Pi for:
   - Corrosion on connectors (green/white deposits)
   - Liquid damage (residue on circuit board)
   - Burnt smell or dark spots
3. If visible damage: Pi is likely defective → Escalate to Tier 4 (replacement)
4. If no visible damage → Try different power supply if available

**Escalation Criteria:**
- If Pi won't boot after power/SD card troubleshooting → **Tier 3/4:** Hardware replacement
- If water damage suspected → **Tier 4:** Immediate replacement (do not attempt to dry/repair)

**Customer Communication:**
"The Pi isn't responding to power. Let's check a few things: the power supply, the outlet, and the SD card. If none of those are the issue, the Pi unit may be defective and we'll need to replace it. I'll stay on the line while we try these steps."

---

### Issue 2.2: Pi Boots but System Service Not Running

**Symptoms:**
- Pi has blue LED (is powered and booting)
- SSH connection works (can log in to Pi)
- But `systemctl status shopshop-detector` shows "inactive" or "failed"
- Dashboard won't load, no detections happening

**Probable Causes (in order):**
1. Service crashed during boot (check logs for error)
2. SD card storage full (can't write logs, services fail)
3. Firmware is corrupted or incomplete
4. Recent update failed partway through

**Diagnostic Steps:**

```bash
# Step 1: Check service status
systemctl status shopshop-detector
# Look for "inactive", "failed", or error messages

# Step 2: Check logs
journalctl -u shopshop-detector -n 50
# Or: tail -100 /var/log/shopshop/detector.log
# Look for error messages, stack traces

# Step 3: Check disk space
df -h
# If "/" partition is >95% full → space issue

# Step 4: Check if files are present
ls -la /opt/shopshop/
# Should see detector binary, config files, etc.
# If missing → firmware corrupted or incomplete
```

**Fix Procedure:**

**Fix 1: Restart Service** (Try first, often clears transient errors)
```bash
sudo systemctl restart shopshop-detector
# Wait 30 seconds
systemctl status shopshop-detector
# Should show "active (running)"
```

**Fix 2: Free Up Disk Space** (If disk is >90% full)
```bash
# Find large files/directories
du -sh /var/log/ /tmp/ /home/*
# Move or delete old logs
sudo rm -rf /var/log/shopshop/*.old
sudo rm -rf /tmp/*
# Restart service
sudo systemctl restart shopshop-detector
```

**Fix 3: Check Firmware Integrity** (If restart didn't help)
```bash
# Verify firmware version
cat /opt/shopshop/version.txt
# Compare to current expected version (from Firebase or docs)

# If version is old or missing, update
sudo /opt/shopshop/update.sh
# Wait for update to complete (5–10 minutes)
# Reboot: sudo reboot
# Wait 2 minutes for boot
# Check status: systemctl status shopshop-detector
```

**Fix 4: Check Logs for Specific Errors** (If still failing)
```bash
tail -200 /var/log/shopshop/detector.log | grep -i "error\|failed\|exception"
# Common errors:
# - "Can't find camera" → USB issue (see Camera section)
# - "Permission denied" → File permissions issue
# - "Model not found" → Firmware corrupted (need re-flash)
```

**Escalation Criteria:**
- If service won't start after restart + disk cleanup → Likely firmware corruption
- [ ] **Escalate to Tier 3:** Remote firmware re-flash or Pi replacement

**Customer Communication:**
"The Pi booted but the detection service isn't running. I can see the error in the logs. Let me try restarting the service, and if that doesn't work, I may need to update the firmware or do a more thorough diagnostic. Shouldn't take long."

---

### Issue 2.3: Pi Overheating (>75°C)

**Symptoms:**
- Customer reports Pi is hot to touch
- Thermal throttling (system slowing down unexpectedly)
- Pi shuts down or reboots due to heat
- `vcgencmd measure_temp` shows >75°C

**Probable Causes (in order):**
1. Vents are blocked (box around Pi, dust accumulation)
2. Ambient temperature very high (shop is too warm)
3. Pi is in direct sunlight or near heat source
4. Thermal paste is dried out (very rare, doesn't apply to new Pi 4)

**Diagnostic Steps:**

```bash
# Step 1: Check temperature
vcgencmd measure_temp
# Normal: <60°C
# Warm: 60–70°C (OK, but monitor)
# Hot: >70°C (concerning)
# Overheating: >80°C (action needed)

# Step 2: Monitor temperature trend
# Check logs for temperature pattern
# Is it hot only during peak times, or all day?

# Step 3: Check thermal throttling
# vcgencmd get_throttled
# Output: 0x0 = no throttling (good)
# Output: 0x80000 or higher = thermal throttling active (bad)

# Step 4: Visually inspect Pi
# Is Pi in an enclosure? Is there airflow around it?
# Are vents/heatsink covered with dust?
```

**Fix Procedure:**

**Fix 1: Improve Airflow** (Do first, most common fix)
1. If Pi is in a box/enclosure: remove it (or add large vents)
2. Make sure at least 10 cm clearance on all sides
3. Keep Pi away from direct sunlight
4. Keep Pi away from heat sources (warm pipes, electrical panels)
5. Monitor temperature: should drop within 30 minutes
6. Check status: `vcgencmd measure_temp`

**Fix 2: Clean Heatsink/Dust** (If still hot)
1. Power off Pi
2. Using compressed air or soft brush, gently remove dust from heatsink (copper fins on top of Pi)
3. Power back on, wait 5 minutes
4. Check temperature

**Fix 3: Improve Shop Ventilation** (If ambient temperature is very high)
1. If shop has air conditioning: make sure it's working, or turn it on
2. If shop doesn't have A/C: ensure fans or windows provide ventilation
3. Consider relocating Pi to a cooler spot in shop (not in sun, not near appliances)
4. Monitor temperature trend

**Escalation Criteria:**
- If temperature remains >75°C despite good airflow and cool ambient temperature → Possible Pi hardware issue or inadequate heatsink
- [ ] **Escalate to Tier 3:** Consider Pi replacement or add external cooling solution

**Customer Communication:**
"The Pi is running a bit hot. The fix is usually easy—make sure it has space around it and isn't in direct sun or near heat sources. Let's move it if needed and see if the temperature drops. If it's still hot after that, we may need to add a fan or upgrade."

---

## Category 3: Detection Accuracy Issues

### Issue 3.1: Accuracy Suddenly Drops (>15% drop from baseline)

**Symptoms:**
- System was working well (>90% accuracy)
- Over a few hours or days, accuracy drops to <75%
- Drop is sudden, not gradual

**Probable Causes (in order):**
1. Camera angle shifted (bracket loosened, or staff moved camera)
2. Lighting changed (lights went out, or new light source added)
3. Shop layout changed (items rearranged, shelves moved)
4. Calibration thresholds drifted (needs re-tuning)
5. Camera is partially blocked or dirty
6. Firmware corruption (rare)

**Diagnostic Steps:**

```bash
# Step 1: Ask customer about recent changes
# "Did anything change in the shop recently?"
# - Shelves rearranged?
# - Lighting added or removed?
# - New items or product types?
# - Camera moved?

# Step 2: Compare to baseline
# Check installation notes: baseline accuracy was X%
# Current accuracy: Y%
# Change: Y - X

# Step 3: Check logs for patterns
# grep "confidence" /var/log/shopshop/detector.log | tail -50
# Look for when accuracy dropped
# Are all cameras affected, or just one?

# Step 4: Manual accuracy test
# Have customer manually count one area
# Compare to system count
# Where is the mismatch?
```

**Fix Procedure:**

**Fix 1: Check for Physical Changes** (Ask customer first)
1. "Has anything in the shop changed since we installed the system?"
   - Lights on/off?
   - Shelves rearranged?
   - New paint or decorations?
   - Items moved closer/farther from cameras?
2. If changes made: reverse them, or re-calibrate system to new layout

**Fix 2: Verify Camera Alignment** (If no obvious change)
1. Visually inspect each camera (especially the one with lowest accuracy)
2. Is camera still pointing at the right area?
3. If not: adjust angle (see Issue 1.3: Camera Wrong Angle)
4. If yes: continue

**Fix 3: Check Lighting** (If alignment is OK)
1. Ask customer: "Is shop lighting the same as before?"
2. Have customer turn on/off lights and observe dashboard: does accuracy change?
3. If accuracy improves with lights on: lighting is the issue
   - Solution: leave lights on, or improve lighting (see Issue 1.4)
4. If accuracy doesn't change with lights: lighting is not the issue

**Fix 4: Recalibrate System** (If no single cause found)
1. Run calibration test (same as training phase):
   - Manually count items in a major area (e.g., 20 items)
   - Run system scan of same area
   - Compare: should be within 10%
2. If close: system is fine, no action needed
3. If off by >15%:
   - Adjust camera angle slightly (3–5 degrees)
   - Re-run calibration test
   - Repeat until accuracy is >90%

**Escalation Criteria:**
- If accuracy still <80% after all adjustments → Escalate to Tier 3 (remote firmware re-calibration)
- If accuracy drops repeatedly (>2 times in one month) → Escalate (may indicate environmental instability)

**Customer Communication:**
"Your accuracy has dropped from 92% to 75%. This usually happens if something in the shop changed—lighting, camera position, or layout. Let's do a quick accuracy test and see if we can pinpoint the issue. I'll walk you through it."

---

### Issue 3.2: Accuracy Low But Consistent (<80% from day 1)

**Symptoms:**
- System installed and configured
- Accuracy never reached expected >90%
- Calibration test showed low accuracy from the start
- Issue is consistent, not intermittent

**Probable Causes (in order):**
1. Camera angles are suboptimal for shop layout (common in first installs)
2. Lighting conditions are poor or uneven
3. Items in the shop are hard to distinguish (transparent, reflective, similar colors)
4. Detection model wasn't properly tuned for shop's specific items
5. Camera is too far or too close to inventory

**Diagnostic Steps:**

```bash
# Step 1: Review baseline calibration notes
# What was accuracy when installed? Was it <80% from the start?
# (If so, should have been caught during installation)

# Step 2: Check if specific items are the problem
# Run detection on different sections
# Is accuracy low everywhere, or just specific areas?
# Low everywhere → likely camera angle or lighting
# Low in one area → likely that area has issues (e.g., dark corner, transparent items)

# Step 3: Analyze detection logs
# grep "confidence" /var/log/shopshop/detector.log
# Look for patterns: are confidence scores consistently low for specific item types?

# Step 4: Manual testing
# Place known items one-by-one in camera view
# Can system consistently detect each one?
# Or do some items consistently not detect?
```

**Fix Procedure:**

**Fix 1: Adjust Camera Angles** (Takes 20–30 minutes)
1. Test detection in each camera's area with manual count
2. If one camera is the culprit:
   - Loosen its mounting bracket
   - Adjust angle 5–10 degrees toward inventory area
   - Tighten bracket
   - Re-test accuracy
   - Repeat until >85%
3. If all cameras are consistently low: check lighting instead

**Fix 2: Improve Lighting** (If camera angles are OK)
1. Check if shop areas are evenly lit
2. Identify dark areas: add supplemental lighting (LED strips, spotlights)
3. Avoid harsh shadows: adjust light position to illuminate items, not create shadows
4. After lighting change, re-run accuracy calibration test
5. Accuracy should improve

**Fix 3: Recalibrate Detection Model** (If angle + lighting are good but accuracy still <80%)
1. This is a more advanced procedure (requires Tier 3)
2. Involves running the model on multiple labeled images from this specific shop
3. AI/ML engineer reviews what items the model is struggling with
4. Reconfigures thresholds for this shop's specific item types
5. Results in >90% accuracy (usually)

**Escalation Criteria:**
- If accuracy <80% after camera angle and lighting adjustments → Escalate to Tier 3 (model re-training)
- If accuracy improves briefly but regresses → Escalate (may indicate unstable environment)

**Customer Communication:**
"The accuracy is lower than expected. This can happen if the cameras need better angles, or if lighting needs adjustment. Let's start with some quick tweaks—repositioning cameras and improving lighting. If that doesn't get us to >90%, I'll escalate to our ML engineers for more advanced tuning."

---

### Issue 3.3: Accuracy Varies Wildly (50–95% day to day)

**Symptoms:**
- On good days: >90% accuracy
- On bad days: <60% accuracy
- Pattern is unpredictable or correlated with time of day

**Probable Causes (in order):**
1. WiFi connection is unstable (system can't sync properly, affects re-training)
2. Lighting changes throughout the day (sun position, lights on/off)
3. Shop layout changes daily (staff rearranges shelves, different arrangements)
4. Ambient light intensity changes (rainy days darker, sunny days brighter)

**Diagnostic Steps:**

```bash
# Step 1: Check WiFi stability
# grep "sync" /var/log/shopshop/sync.log | tail -50
# Look for sync failures or long gaps between syncs
# If syncs are frequent (every 2–5 min) → WiFi is stable
# If syncs are rare or irregular → WiFi is unstable

# Step 2: Correlate accuracy to time of day
# Pull accuracy logs by hour
# grep "accuracy" /var/log/shopshop/detector.log | sort -k 1
# Is accuracy consistently lower at certain times (e.g., 6–8 AM when sun comes in, 8 PM when lights out)?

# Step 3: Ask customer about daily changes
# "Do the shop shelves change layout daily? Do lights get turned on/off at specific times?"
# "Is there natural sunlight through windows that changes throughout the day?"

# Step 4: Check ambient light sensor (if available)
# Some systems log ambient light level
# grep "ambient_light\|lux" /var/log/shopshop/detector.log
# Look for correlation between low light and low accuracy
```

**Fix Procedure:**

**Fix 1: Stabilize Lighting** (If accuracy varies by time of day)
1. Identify the times when accuracy is worst
2. Check what's causing lighting change at those times:
   - Sunlight coming through windows → adjust cameras or add sun blinds
   - Lights turn off/on → keep lights on consistently
   - Shadows move → reposition lights to avoid shadows
3. Test after changes: accuracy should become more consistent

**Fix 2: Stabilize WiFi** (If sync logs show failures)
1. Check WiFi signal strength at Pi location: `-60 dBm` or better is good
2. If weak (<-70 dBm): move router closer or add WiFi extender
3. Check if other devices on WiFi are causing interference (e.g., microwave, neighbor's WiFi)
4. If interference: switch to different WiFi channel (in router settings)
5. Monitor sync logs: syncs should be regular and successful

**Fix 3: Educate on Shelf Stability** (If staff are rearranging shelves)
1. Explain to owner/staff: frequent rearrangement makes system's learning harder
2. Recommend: keep main shelf locations stable, only adjust as needed
3. If rearrangement is necessary: manually re-calibrate after major layout change
4. Accuracy should stabilize after this

**Escalation Criteria:**
- If accuracy is still highly variable after stabilizing lighting + WiFi + layout → Escalate to Tier 3 (system stability analysis)
- If WiFi is legitimately unstable (customer can't improve) → Offer WiFi extender or mesh network upgrade

**Customer Communication:**
"Your accuracy is jumping around a lot day-to-day. This usually means something in the environment is changing—lighting, WiFi, or shelf layout. Let's work on stabilizing those factors, and the accuracy should level out to >90% consistently."

---

## Category 4: Billing Issues

### Issue 4.1: Monthly Bill is Higher Than Expected

**Symptoms:**
- Customer received bill for month, amount seems too high
- Customer expected lower bill based on their estimate
- System count is higher than customer's manual estimate

**Probable Causes (in order):**
1. Customer's manual estimate was inaccurate (normal; humans underestimate sales)
2. System is accurate, and customer is selling more than they thought
3. System is overcounting (false positives: counts items removed that weren't sold)
4. Price configuration is wrong (unit prices entered incorrectly during setup)

**Diagnostic Steps:**

```bash
# Step 1: Understand customer's expectation
# Ask: "What were you expecting the bill to be?"
# Ask: "What's your basis for that estimate? Manual count, previous billing, etc.?"

# Step 2: Run accuracy test
# Have customer do a manual count of a major category (e.g., all beverages: 200 items)
# Check system count for same category on dashboard
# Calculate accuracy: (system_count / manual_count) * 100

# Step 3: Verify prices in system
# Check config: cat /opt/shopshop/config.json | grep -i price
# Do prices match the unit prices customer is selling items for?
# Example: if a snack sells for ₹10, is it configured as ₹10 in system?

# Step 4: Audit month's transactions
# Query Firebase for all transactions in the month
# Sum up quantities and values
# Compare to customer's records (if they keep any)
```

**Fix Procedure:**

**Fix 1: Do Accuracy Check** (With customer, takes 15 minutes)
1. Pick a major product category (snacks, drinks, daily items)
2. Have customer manually count all items in that category
3. Check dashboard: what does system say for that category?
4. Calculate accuracy:
   - If accuracy >90%: system is accurate, bill is correct
     - Explanation: "Your system is accurately tracking sales. You're selling more than you estimated."
   - If accuracy 70–90%: system is mostly accurate, minor adjustments may be warranted
     - Explanation: "System is working well, but let's verify a couple more categories."
   - If accuracy <70%: system may be overcounting
     - Action: Investigate false positives (see Issue 3.1 & 3.2)

**Fix 2: Verify Price Configuration** (If accuracy is good but customer disputes bill)
1. Ask customer: "What prices are you charging for each item?"
2. Check system config: `cat /opt/shopshop/config.json`
3. Compare prices in config to customer's stated prices
4. If mismatch: update config
   - Edit config: `sudo nano /opt/shopshop/config.json`
   - Update prices
   - Restart detector: `sudo systemctl restart shopshop-detector`
   - Recalculate bill for the month with correct prices
   - Issue credit for overcharge (if any)

**Fix 3: Manual Audit** (If accuracy and prices are OK)
1. Pull transaction log from Firebase for the month
2. Categorize by item type and tally quantities
3. Compare to customer's records (if they kept any)
4. If system is >95% accurate to an independent record: bill is correct
5. Educate customer: "System is actually very accurate; you're just selling more than expected!"

**Escalation Criteria:**
- If accuracy is <70% → Escalate to Tier 3 (accuracy issue, see Category 3)
- If prices are wrong → Correct prices and issue credit; escalate to finance for refund processing
- If customer is still unhappy after audit shows accuracy: Escalate to Tier 3 for personal call + possible goodwill discount

**Customer Communication:**
"Let's audit the bill together. I'll help you do an accuracy check—compare our system count to a manual count. That'll tell us if the bill is correct or if there's an issue. Most of the time, customers find that they're actually selling more than they estimated, which is great news!"

---

### Issue 4.2: Monthly Bill is Lower Than Expected / Missing Transactions

**Symptoms:**
- Customer expected a higher bill
- Customer manually tracked sales and system count is lower
- Some transactions seem to be missing from the system count

**Probable Causes (in order):**
1. System missed some items (detection accuracy <90%)
2. WiFi was down and offline buffer didn't sync properly
3. Camera was blocked during the day (staff didn't realize)
4. Items were added to shelf from back room (system didn't see them, only sees removals)
5. System was offline for a period and didn't capture those transactions

**Diagnostic Steps:**

```bash
# Step 1: Check system uptime for the month
# Query logs: how many hours was system offline or degraded?

# Step 2: Check WiFi sync status
# grep "sync.*success\|sync.*fail" /var/log/shopshop/sync.log
# Were there periods when system couldn't sync?

# Step 3: Run accuracy test on current state
# Do manual count in one area, compare to system
# If accuracy is low now → likely has been low all month

# Step 4: Check offline buffer
# What's the state of the local database on Pi?
# Did it properly save transactions while offline?
# grep "buffer\|offline" /var/log/shopshop/detector.log

# Step 5: Visual inspection
# Are there any notes in the logs about cameras being blocked?
# Were any cameras offline during the month?
```

**Fix Procedure:**

**Fix 1: Verify Current Accuracy** (If undercounting is recent)
1. Do a manual count test (see Issue 3.1)
2. If accuracy is good (>90%): undercounting was a temporary issue, system should be correct going forward
3. If accuracy is low (<85%): undercounting is ongoing, need to fix accuracy (see Issue 3.1 or 3.2)

**Fix 2: Check for Extended Offline Periods** (If accuracy is good but transactions missing)
1. Review logs: was system offline for extended periods during the month?
   - Check: `grep "offline\|disconnected" /var/log/shopshop/detector.log`
2. If yes: how long? Offline mode should buffer, but if offline >24 hours, may lose data
3. Solution going forward: ensure WiFi is more stable (see Issue 2.2 in Category 2)

**Fix 3: Investigate Camera Blockages** (If specific time periods show missing data)
1. Ask customer: "Was any area of the shop blocked or rearranged during the month?"
2. If yes: recount manual sales for that period (if possible)
3. Adjust bill to include undercounted period (if reasonable to estimate)

**Escalation Criteria:**
- If undercounting is due to accuracy issues: Escalate to Tier 3 (fix accuracy, recalculate bill)
- If undercounting is due to system being offline: Escalate to Tier 3 (investigate stability, adjust bill for missing period)
- If customer lost sales due to system failure: Escalate to Vaishak for credit/refund decision

**Customer Communication:**
"It looks like some transactions may have been missed. Let's figure out why. I'll check if there were accuracy issues or if the system was offline. Once I know the cause, I can recalculate the bill fairly and make sure this doesn't happen again."

---

## Category 5: Connectivity Issues

### Issue 5.1: WiFi Drops Frequently (>3 times per day)

**Symptoms:**
- System goes offline multiple times daily
- Dashboard briefly becomes unresponsive
- Sync logs show frequent disconnections
- WiFi symbol on router drops and reconnects

**Probable Causes (in order):**
1. WiFi signal is weak at Pi location (<-70 dBm)
2. WiFi channel is congested (interference from neighbor's WiFi or other devices)
3. Router has an issue (firmware bug, heat, age)
4. Pi WiFi adapter is defective (rare)

**Diagnostic Steps:**

```bash
# Step 1: Check WiFi signal strength at Pi
# From Pi: iwconfig wlan0 | grep "Signal level"
# Measure signal strength dBm: >-60 is good, -60 to -70 is OK, <-70 is weak

# Step 2: Check WiFi channel
# From router admin page: what channel is WiFi on?
# Use WiFi analyzer (phone app) to check for interference from neighbors
# If many networks on same channel → congestion

# Step 3: Check router health
# Is router getting hot? Does it have airflow?
# Are lights blinking normally? (or stuck/flashing irregularly?)
# How old is the router? (>5 years = consider replacement)

# Step 4: Monitor disconnections
# tail -f /var/log/shopshop/sync.log
# Watch for patterns: do disconnections happen at specific times?
# Or random throughout the day?

# Step 5: Check for WiFi credential issues
# Did WiFi password recently change at the shop?
# Is Pi still using old password?
```

**Fix Procedure:**

**Fix 1: Improve WiFi Signal** (If signal is weak)
1. Move Pi closer to WiFi router (within 5 meters ideally)
2. Ensure line of sight (no walls blocking between router and Pi)
3. Check if obstacles are blocking signal (metal shelving, large appliances)
4. If can't improve signal: add WiFi extender or mesh network (more robust)
5. Test after move: signal should improve to >-60 dBm

**Fix 2: Change WiFi Channel** (If signal is OK but interference)
1. Log into router admin interface (usually 192.168.1.1 or 192.168.0.1)
2. Find WiFi settings → Channel
3. If currently on channel 6 (congested): switch to channel 1 or 11 (less congested in most areas)
4. Save and reboot router
5. Pi should auto-reconnect on new channel
6. Monitor logs: disconnections should reduce

**Fix 3: Restart Router** (If lots of random disconnections)
1. Power off router (unplug for 10 seconds)
2. Power back on
3. Wait for all lights to stabilize (2–3 minutes)
4. Pi should automatically reconnect
5. Monitor for 24 hours: if disconnections reduced, issue was temporary glitch

**Fix 4: Update WiFi Password** (If customer recently changed password)
1. Ask customer: did you change WiFi password recently?
2. If yes: Pi still has old password in config
3. SSH to Pi: `sudo nano /opt/shopshop/config.json`
4. Edit `wifi_password` field with new password
5. Save and restart: `sudo systemctl restart shopshop-sync`
6. System should reconnect on new password

**Escalation Criteria:**
- If WiFi drops persist despite signal improvement and router troubleshooting → Escalate to Tier 3 (may be Pi WiFi adapter defect)
- If customer's ISP/router is fundamentally unstable → Recommend WiFi extender or mesh network (offer as upsell)
- If shop has zero option for better WiFi → Propose mobile hotspot as backup (involves data cost)

**Customer Communication:**
"WiFi drops are frustrating. Usually, it's a signal strength or interference issue. Let's reposition the router or Pi, and I'll check what channel the WiFi is on. If drops persist, we can add a WiFi extender or a more robust mesh network. What works best for you?"

---

### Issue 5.2: System Works Offline But Doesn't Sync When WiFi Returns

**Symptoms:**
- System was offline for a period
- WiFi comes back, but system doesn't sync
- Old data is still on Pi, not uploaded to cloud
- Dashboard shows stale data

**Probable Causes:**
1. Sync service crashed while offline (didn't auto-recover when WiFi came back)
2. Cloud API endpoint is unreachable (server down, or network blocking access)
3. WiFi authentication failed (password changed, or Pi has old credentials)

**Diagnostic Steps:**

```bash
# Step 1: Check sync service status
systemctl status shopshop-sync
# Should show "active (running)"
# If "inactive" or "failed" → service crashed

# Step 2: Check WiFi connection
# iwconfig wlan0 | grep ESSID
# Should show shop's WiFi name

# Step 3: Test internet connectivity
ping 8.8.8.8
# Should get responses
# If no responses → WiFi is connected but internet is down

# Step 4: Check sync logs
tail -100 /var/log/shopshop/sync.log | grep -i "error\|fail\|timeout"
# Look for what went wrong

# Step 5: Manually test API connectivity
curl -I https://api.ooru-logix.com/health
# Should return 200 OK
# If error → API server is unreachable
```

**Fix Procedure:**

**Fix 1: Restart Sync Service** (If service is inactive)
```bash
sudo systemctl restart shopshop-sync
# Wait 30 seconds
systemctl status shopshop-sync
# Should show "active (running)"

# Monitor logs
tail -f /var/log/shopshop/sync.log
# Should see "Attempting sync..." followed by "Sync complete" within 1 minute
```

**Fix 2: Test Internet Connectivity** (If service is running but not syncing)
```bash
ping 8.8.8.8
# If fails: WiFi is connected but internet is down
# Solution: restart router (power off 10 sec, power on)
# Or contact shop's ISP if internet is down

# If ping succeeds, test API endpoint
curl -v https://api.ooru-logix.com/sync
# Should return 200 OK or expected response
# If error → API server may be down
```

**Fix 3: Verify WiFi Credentials** (If internet works but sync doesn't)
1. SSH to Pi
2. Check current WiFi connection: `iwconfig wlan0`
3. If not connected to expected SSID: WiFi password may have changed
4. Reconnect to WiFi with correct password:
   ```bash
   sudo nmcli con down [SSID_NAME]
   sudo nmcli con up [SSID_NAME]
   # Enter password when prompted
   ```
5. Try sync again: `sudo systemctl restart shopshop-sync`

**Fix 4: Force Sync** (Manual trigger)
```bash
# If auto-sync isn't working, manually trigger
sudo /opt/shopshop/sync-now.sh
# Wait for output; should show success or specific error

# If success: system is synced, may just need service restart to schedule next auto-sync
# If failure: check logs for specific error message
```

**Escalation Criteria:**
- If API server is down: Escalate to DevOps/backend team (not customer issue)
- If sync keeps failing even after service restart and credential check: Escalate to Tier 3 (may need deeper diagnostics)

**Customer Communication:**
"The system worked offline, but it didn't sync when WiFi came back. Let me restart the sync service and check connectivity. This is usually a quick fix."

---

## Escalation Summary

| Issue | Typical Tier | If Unresolved, Escalate to |
|-------|-------------|---------------------------|
| Camera black | 2 | 3 (diagnostics) → 4 (replacement) |
| Camera blurry | 1 | 2 (remote adjustment) → 4 (if defect) |
| Camera angle wrong | 1 | 2 (if can't be adjusted remotely) |
| Pi won't boot | 2 | 3 (firmware) → 4 (hardware replacement) |
| Service not running | 2 | 3 (firmware re-flash) |
| Pi overheating | 2 | 3 (cooling solution) → 4 (if defect) |
| Accuracy drop sudden | 2 | 3 (recalibration) → 4 (if environment issue) |
| Accuracy low from start | 2 | 3 (model re-training) |
| Accuracy varies wildly | 2 | 3 (stability analysis) |
| Bill higher than expected | 2 | 3 (finance audit) → Vaishak (credit decision) |
| Bill lower than expected | 2 | 3 (investigation, bill adjustment) |
| WiFi drops frequent | 2 | 3 (hardware upgrade recommendation) |
| Sync not working | 2 | 3 (if API/backend issue) |

