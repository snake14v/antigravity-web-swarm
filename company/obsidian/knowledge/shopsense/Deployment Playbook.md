# ShopSense Deployment Playbook

## Pre-Install Checklist

### Hardware Assembly
- [ ] Raspberry Pi 4 (8GB RAM) inspected and tested
- [ ] Camera modules (Omnivision OV5647) verified functional
- [ ] Storage enclosures assembled
- [ ] Network cables prepared (Cat5e minimum)
- [ ] Power supplies (65W USB-C) verified
- [ ] Mounting brackets and hardware kit checked

### Firmware & Software Setup
- [ ] Latest Raspberry Pi OS flashed to SD card
- [ ] WiFi credentials configured
- [ ] Hostname set: `shopsense-[shopid]`
- [ ] YOLOv8n model (`SmokeSense`/`BrewSense`/`SnackSense`) downloaded
- [ ] Inference weights loaded and tested
- [ ] Database initialization scripts prepared

### Pre-Deploy Tests
- [ ] Camera connectivity test passed
- [ ] Model inference latency verified (< 100ms per frame)
- [ ] WiFi connectivity test passed
- [ ] Power consumption baseline recorded

---

## On-Site Installation Steps

### Phase 1: Hardware Setup (2-3 hours)

1. **Site Survey & Mount Planning**
   - [ ] High-footfall zone identified
   - [ ] Camera angle verified (30-45° view of shelf/counter)
   - [ ] Power outlet located within 5m
   - [ ] WiFi signal strength confirmed (>-70dBm)
   - [ ] Environmental conditions noted (lighting, temperature, humidity)

2. **Camera Installation**
   - [ ] Mount secured to wall/shelf bracket
   - [ ] Camera lens cleaned and adjusted for focus
   - [ ] Cable run secured (avoid damage/interference)
   - [ ] Camera test: live feed verified on preview display

3. **Raspberry Pi Node Setup**
   - [ ] Pi mounted in weatherproof enclosure
   - [ ] Power supply connected and verified
   - [ ] Ethernet/WiFi connected and tested
   - [ ] Thermal testing: temperature < 65°C under load

### Phase 2: Software & Connectivity (1-2 hours)

4. **Network Configuration**
   - [ ] WiFi network joined with fallback to failover hotspot
   - [ ] SSH access enabled and tested
   - [ ] NTP time sync verified
   - [ ] DNS resolution tested

5. **Model Calibration**
   - [ ] Model inference engine started
   - [ ] Shelf/counter object detection tested with 20+ samples
   - [ ] False positive rate baseline recorded
   - [ ] Confidence threshold tuned (mAP target: >0.85)
   - [ ] Class weights adjusted for shop-specific items

6. **Dashboard Connection**
   - [ ] Cloud API endpoint reachable
   - [ ] Device paired with customer account
   - [ ] Real-time metrics dashboard loaded
   - [ ] Historical data sync initiated

### Phase 3: Staff Training (1 hour)

7. **Staff Training Session**
   - [ ] Shop manager walkthrough of dashboard
   - [ ] Alert interpretation trained (stockout, shrinkage, motion)
   - [ ] Data export/reporting shown
   - [ ] Troubleshooting quick-start provided
   - [ ] Support contact info & escalation process shared

---

## Post-Installation Verification

### Day 0 (Go-Live)
- [ ] Live detection running and logging data
- [ ] Dashboard metrics updating in real-time
- [ ] Alerts configured and tested (dummy events)
- [ ] First 100 detections reviewed for accuracy

### Day 1
- [ ] 24-hour data collection complete
- [ ] Model inference stable (no crashes)
- [ ] No network connectivity issues reported
- [ ] Staff using dashboard independently

### Day 3
- [ ] False positive rate < 5% on baseline
- [ ] Shop manager feedback collected
- [ ] Calibration adjustments made if needed
- [ ] Customer satisfaction initial score recorded

### Day 7
- [ ] Full week of operational metrics reviewed
- [ ] Inventory shrinkage baseline established
- [ ] ROI projection shared with customer
- [ ] Any hardware issues resolved

### Day 14
- [ ] 2-week performance summary generated
- [ ] Model accuracy sustained or improved
- [ ] Upsell opportunities identified (additional cameras/features)
- [ ] Contract renewal or expansion discussion initiated

---

## Troubleshooting Guide

| Issue | Symptom | Resolution |
|-------|---------|-----------|
| No live feed | Camera dark/no video output | Check camera cable connection, reboot Pi, verify camera module enabled in raspi-config |
| High latency | Inference time > 200ms | Check CPU temp, reduce frame resolution, verify WiFi signal, restart inference engine |
| WiFi drops | Intermittent connectivity | Re-scan networks, check channel interference, move Pi closer to router, switch to 5GHz if available |
| Detection errors | High false positives (>10%) | Retrain model on shop-specific data, adjust confidence threshold, improve lighting conditions |
| Dashboard not updating | No recent data in cloud | Verify API endpoint accessible, check device auth token, review cloud sync logs on Pi |
| Model crashes | Inference engine restarts repeatedly | Check RAM availability (free memory > 1GB), reduce concurrent tasks, verify model file integrity |
| Temperature high | Pi thermal throttling | Improve ventilation around enclosure, reduce ambient temperature, apply thermal paste on processor |

---

## Support & Escalation

- **Tier 1:** Shop manager troubleshooting (quick-start guide)
- **Tier 2:** Remote support via SSH and dashboard logs
- **Tier 3:** On-site visit for hardware replacement/recalibration

---

**Tags:** #shopsense #deployment #playbook #procedures

**Related:** [[Model Accuracy Log]] | [[Pilot Tracker]]
