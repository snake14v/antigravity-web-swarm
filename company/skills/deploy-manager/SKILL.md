# Deploy Manager Skill

**Purpose:** Manage web and hardware deployments, rollbacks, environment configuration, and post-deploy verification for Ooru Logix.

**Scope:** Vercel (web) deployment pipelines, SD card flashing (hardware), environment variable management, DNS/SSL configuration, smoke testing.

---

## Pre-Deploy Checklist (Web)

### Code Quality
- [ ] **TypeScript compilation:** `npm run build` succeeds with zero errors
  ```bash
  # Run locally
  npm run build
  # Expected: No TS errors, dist/ folder created
  ```
- [ ] **No ESLint warnings:** `npm run lint` passes
- [ ] **No console.log statements** in production code (use proper logging if needed)
- [ ] **No TODO/FIXME comments** in committed code (move to GitHub issues)
- [ ] **All imports resolved** (no missing modules)

### Feature Completeness
- [ ] **Feature marked as done** in PROGRESS.md with ✅
- [ ] **All acceptance criteria met** (manual testing completed)
- [ ] **No breaking changes** to existing features
- [ ] **Backwards compatible** if API changes

### Environment Configuration
- [ ] **All required .env variables set** in `.env.local`:
  ```bash
  # Required for web:
  VITE_FIREBASE_API_KEY=...
  VITE_FIREBASE_AUTH_DOMAIN=...
  VITE_FIREBASE_PROJECT_ID=oorulogix-e2dc4
  VITE_FIREBASE_STORAGE_BUCKET=...
  VITE_FIREBASE_MESSAGING_SENDER_ID=...
  VITE_FIREBASE_APP_ID=...
  VITE_APP_ENV=development|staging|production
  ```
- [ ] **Vercel dashboard .env variables confirmed:**
  - Production environment has correct API keys
  - Preview environment has staging keys (if separate)
  - No hardcoded secrets in code

### Assets & SEO
- [ ] **og-image.png exists** (1200x630px minimum, optimized)
  - Path: `public/og-image.png`
  - Used for social sharing preview
- [ ] **robots.txt is valid** (checks `public/robots.txt`)
  ```
  User-agent: *
  Allow: /
  Disallow: /admin
  Sitemap: https://oorulogix.com/sitemap.xml
  ```
- [ ] **favicon.ico exists** (32x32px)
- [ ] **No 404s in network requests** during local dev

### Performance
- [ ] **Bundle size check:**
  ```bash
  npm run build
  # dist/index.*.js should be < 500KB gzipped
  # Use: gzip -l dist/index.*.js to check
  ```
- [ ] **Mobile responsive** (tested on simulated mobile)
- [ ] **Core Web Vitals check** (LCP, FID, CLS all green)
  - Use: Chrome DevTools → Lighthouse
- [ ] **No console errors** when running locally

### Security
- [ ] **No hardcoded API keys** in source code
- [ ] **Firebase Security Rules reviewed** for production data access
- [ ] **CORS configured correctly** (if calling external APIs)
- [ ] **HTTPS enforced** (Vercel handles this)
- [ ] **Content Security Policy headers** set (if needed)

### Database
- [ ] **Firestore Security Rules updated** if data structure changed
- [ ] **Required indexes created** in Firestore console
- [ ] **Backup of critical data** (not required for Vercel deploy, but good practice)

---

## Vercel Deployment Process (Web)

### Automated Deployment (Recommended)
```bash
# 1. Push changes to GitHub
git add .
git commit -m "Feature: Add user analytics dashboard (C-XX)"
git push origin feature/analytics-dashboard

# 2. GitHub → Vercel automatic preview
# - Vercel webhook triggers on push
# - Preview URL created automatically
# - Check preview environment for correctness

# 3. Create Pull Request
# - PR description includes testing notes
# - Reviewers test preview URL
# - Get approval

# 4. Merge to main branch
git checkout main
git pull origin main
git merge feature/analytics-dashboard
git push origin main

# 5. Vercel auto-deploys main to production
# - Deployment takes 30-60 seconds
# - Check https://oorulogix.com for changes
```

### Manual Deployment (if needed)
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy from local repo
vercel --prod

# This triggers production deployment without merge
# Use only in emergencies
```

### Deployment Configuration (vercel.json)
```json
{
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/node"
    }
  ],
  "env": {
    "VITE_FIREBASE_PROJECT_ID": "oorulogix-e2dc4"
  },
  "redirects": [
    {
      "source": "/old-page",
      "destination": "/new-page",
      "permanent": true
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ]
}
```

### Environment Variables in Vercel Dashboard
**Path:** Project → Settings → Environment Variables

**Required for production:**
```
VITE_FIREBASE_API_KEY = [production API key]
VITE_FIREBASE_AUTH_DOMAIN = oorulogix.firebaseapp.com
VITE_FIREBASE_PROJECT_ID = oorulogix-e2dc4
VITE_FIREBASE_STORAGE_BUCKET = oorulogix-e2dc4.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID = [sender ID]
VITE_FIREBASE_APP_ID = [app ID]
VITE_APP_ENV = production
```

---

## Rollback Procedure (Web)

### If production has critical bug:

**Option 1: Revert last commit (preferred)**
```bash
# If bad commit is the most recent
git revert HEAD --no-edit
git push origin main

# OR if bad commit is further back
git log --oneline # Find bad commit hash, e.g., a1b2c3d
git revert a1b2c3d --no-edit
git push origin main

# Vercel detects push, re-deploys automatically
# Production reverted in 1-2 minutes
```

**Option 2: Deploy previous version directly**
```bash
# If revert isn't possible
git checkout [commit-hash-before-bad-commit]
vercel --prod

# Warn team: This bypasses CI/CD, use only in emergency
```

**Option 3: Use Vercel Dashboard Deployments**
- Go to Vercel Dashboard → Project → Deployments
- Find last known good deployment
- Click the three dots → Promote to Production
- Instant rollback, no git changes needed

### Post-Rollback
1. Create incident issue on GitHub
2. Document what broke
3. Fix the issue in new feature branch
4. Test thoroughly before re-deploying
5. Post mortem (if significant)

---

## Environment Variable Management

### .env.local (Local development only)
```bash
# Never commit this file
# Copy from .env.example or team's secure storage

VITE_FIREBASE_API_KEY=AIzaSyXxxxxxxxxxxx
VITE_FIREBASE_AUTH_DOMAIN=oorulogix.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=oorulogix-e2dc4
VITE_FIREBASE_STORAGE_BUCKET=oorulogix-e2dc4.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abcdef123456
VITE_APP_ENV=development
```

### .env.example (Committed to repo)
```bash
# Use this as template
# Replace actual values with XXX placeholders

VITE_FIREBASE_API_KEY=XXX
VITE_FIREBASE_AUTH_DOMAIN=oorulogix.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=oorulogix-e2dc4
VITE_FIREBASE_STORAGE_BUCKET=oorulogix-e2dc4.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=XXX
VITE_FIREBASE_APP_ID=XXX
VITE_APP_ENV=development
```

### Accessing env vars in React (Vite)
```typescript
// Only variables prefixed with VITE_ are exposed to client
const apiKey = import.meta.env.VITE_FIREBASE_API_KEY;
const appEnv = import.meta.env.VITE_APP_ENV;

// Type-safe env access
const config = {
  firebaseApiKey: import.meta.env.VITE_FIREBASE_API_KEY ?? '',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID ?? 'oorulogix-e2dc4',
  appEnv: (import.meta.env.VITE_APP_ENV as 'development' | 'staging' | 'production') ?? 'development',
};
```

### Vercel Environment Variable Hierarchy
```
Production URL (oorulogix.com):
  Uses: VITE_FIREBASE_API_KEY [production value]

Preview URLs (*.vercel.app):
  Uses: VITE_FIREBASE_API_KEY [staging value, if configured]
  Or: Falls back to production if no preview values

Development (localhost):
  Uses: .env.local values
```

**Best practice:**
- Use same Firebase project for all environments (oorulogix-e2dc4)
- Use different API keys only if testing critical auth changes
- Always test preview deployment before merging to main

---

## Domain Configuration

### oorulogix.com DNS & SSL

**DNS Configuration (managed in domain registrar)**
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com

Type: CNAME
Name: (root/apex)
Value: cname.vercel-dns.com

Type: TXT (optional, for domain verification)
Value: [Vercel's verification token from dashboard]
```

**SSL Certificate (auto-managed by Vercel)**
- Vercel automatically provisions and renews SSL certificates
- No action needed from developer
- Check Project → Settings → SSL/TLS to see cert details

### URL Redirects
```bash
# In vercel.json:
"redirects": [
  {
    "source": "/old-product",
    "destination": "/products",
    "permanent": true
  },
  {
    "source": "/blog/:slug",
    "destination": "https://blog.oorulogix.com/:slug",
    "permanent": false
  }
]
```

### Custom Domain Management (Vercel Dashboard)
1. Go to Project → Settings → Domains
2. Add oorulogix.com
3. Vercel provides DNS configuration instructions
4. Update registrar's DNS records
5. Wait for propagation (5 min - 48 hours)
6. Verify in dashboard when propagated

---

## Post-Deploy Verification (Web)

### Smoke Tests (run immediately after deploy)
```bash
# Test production URLs
curl -I https://oorulogix.com
# Expected: HTTP 200

curl -I https://oorulogix.com/about
curl -I https://oorulogix.com/dashboard

# Check critical API calls
curl https://oorulogix.com/api/health
# Expected: healthy response
```

### Manual Spot Checks
- [ ] **Homepage loads** without errors: https://oorulogix.com
- [ ] **Auth flow works:**
  - Sign in with existing account
  - Check user menu shows correct user
- [ ] **Dashboard loads:** https://oorulogix.com/dashboard
- [ ] **Firebase connectivity verified:**
  - Can fetch users data
  - No "Permission denied" errors
  - Real-time updates working
- [ ] **Mobile responsive:** Test on phone or DevTools mobile mode
- [ ] **Network tab clean:** No 404s, no blocked requests

### Core Web Vitals Check
```bash
# Use Lighthouse in Chrome DevTools
# Open DevTools → Lighthouse → Generate report
# Check:
# - LCP (Largest Contentful Paint): < 2.5s
# - FID (First Input Delay): < 100ms
# - CLS (Cumulative Layout Shift): < 0.1
```

### Firebase Connectivity
```typescript
// Add this to a test page or console
import { getDoc, doc } from 'firebase/firestore';
import { db } from '@/services/firebase';

const testFirebase = async () => {
  try {
    const testDoc = await getDoc(doc(db, 'registrations', 'test-doc-id'));
    console.log('Firebase OK:', testDoc.exists());
  } catch (error) {
    console.error('Firebase error:', error);
  }
};
```

### Monitor Errors
1. Check **Vercel Dashboard → Monitoring → Errors** for runtime errors
2. Monitor **Firebase Console → Firestore → Usage** for quota issues
3. Set up alerts if available

---

## Hardware Deployment (ShopSense)

### Pre-Deployment Checklist

- [ ] **SD card formatted** (FAT32 or ext4)
- [ ] **Raspberry Pi OS imaged** (latest stable release)
  ```bash
  # Use Raspberry Pi Imager (official tool)
  # Select: Raspberry Pi OS (64-bit)
  # Configure: SSH enabled, password set, WiFi SSID/password
  ```
- [ ] **YOLOv8n model quantized** (converted for Raspberry Pi)
- [ ] **Camera drivers installed** and tested
- [ ] **Firmware code committed** to repo with version tag
- [ ] **Local testing done** on development Pi

### SD Card Preparation

```bash
# On Raspberry Pi Imager (GUI):
1. Choose OS → Raspberry Pi OS (64-bit)
2. Choose Storage → Select SD card
3. Advanced Options (gear icon):
   - Enable SSH: yes
   - Set hostname: shopsense-01 (or unit-specific)
   - Set username/password
   - Configure WiFi: SSID + password
   - Set locale, keyboard

4. Write and wait 10 minutes

# On SD card, verify files:
ls /boot/
# Should see: bootcode.bin, start.elf, kernel8.img

ls /home/
# Should see: [username] folder
```

### Firmware Flashing

```bash
# Copy firmware code to Pi (via SSH)
scp -r ./firmware/* pi@shopsense-01.local:/home/pi/firmware/

# Or clone from GitHub
ssh pi@shopsense-01.local
cd /home/pi
git clone https://github.com/oorulogix/shopshense-firmware.git

# Install dependencies
cd firmware
pip install -r requirements.txt

# Verify hardware
python scripts/test_hardware.py
# Expected output: Cameras OK, Sensors OK, Network OK
```

### OTA Firmware Update (Over-The-Air via WiFi)

```bash
# On device, setup auto-update (monthly or manual)
# src/firmware/services/firmware_updater.py

import requests
import subprocess

def check_firmware_update():
    """Check for new firmware version and update if available."""
    try:
        response = requests.get('https://oorulogix.com/api/firmware/latest')
        latest = response.json()

        with open('/etc/shopshense/version.txt', 'r') as f:
            current = f.read().strip()

        if latest['version'] > current:
            print(f"Update available: {latest['version']}")
            download_url = latest['download_url']

            # Download firmware
            subprocess.run(['wget', download_url, '-O', '/tmp/firmware.zip'], check=True)

            # Backup current firmware
            subprocess.run(['cp', '-r', '/opt/shopshense', '/opt/shopshense.backup'], check=True)

            # Extract and install
            subprocess.run(['unzip', '/tmp/firmware.zip', '-d', '/opt/'], check=True)

            # Restart service
            subprocess.run(['systemctl', 'restart', 'shopshense'], check=True)

            print(f"Updated to {latest['version']}")

    except Exception as e:
        print(f"Update failed: {e}")
        # Fallback to backup
        subprocess.run(['cp', '-r', '/opt/shopshense.backup', '/opt/shopshense'], check=True)
        subprocess.run(['systemctl', 'restart', 'shopshense'], check=True)

# Schedule this in crontab
# 0 2 * * 0 python /home/pi/firmware/services/firmware_updater.py
```

### Manual SD Card Swap (Fallback)

If WiFi OTA fails:
```bash
# 1. Prepare new SD card with updated firmware (on dev machine)
# 2. Power off ShopSense unit
# 3. Remove old SD card
# 4. Insert new SD card with updated firmware
# 5. Power on, wait 2 minutes for boot
# 6. Verify cameras in web dashboard
```

### Camera Calibration

```bash
# On Raspberry Pi (after first setup)
python /home/pi/firmware/scripts/calibrate_cameras.py

# This:
# 1. Activates each camera
# 2. Captures calibration images
# 3. Computes intrinsic parameters
# 4. Saves calibration.json
# 5. Stores in /etc/shopshense/calibration/

# Output expected:
# Camera 0: calibrated ✓
# Camera 1: calibrated ✓
# Camera 2: calibrated ✓
# Camera 3: calibrated ✓
```

### Network Configuration

```bash
# SSH into Pi
ssh pi@shopsense-01.local

# Check WiFi status
sudo nmtui
# Select WiFi network, enter password

# Verify connectivity
ping 8.8.8.8
ping oorulogix.com

# Set static IP (optional, for on-site networks)
sudo nano /etc/dhcpcd.conf
# Add:
# interface wlan0
# static ip_address=192.168.1.100/24
# static routers=192.168.1.1

sudo reboot
```

---

## Hardware Debugging Checklist

### Power & Thermal
- [ ] **Pi 5V USB supply** delivering stable 5V (use multimeter or check dmesg)
- [ ] **No thermal throttling:**
  ```bash
  vcgencmd measure_temp
  # Should be < 80°C under load
  ```
- [ ] **All power LEDs** on Pi and cameras lit
- [ ] **No burnt smell** from components

### Camera Feed
```bash
# Test each camera
libcamera-hello --camera 0
# Opens preview window showing camera 0

# Capture test image
libcamera-jpeg -o test_cam0.jpg --camera 0

# Verify all 4 cameras
for i in {0..3}; do
  echo "Testing camera $i..."
  libcamera-jpeg -o test_cam$i.jpg --camera $i
done

# Expected: 4 JPEG files created, no errors
```

### Model Inference
```bash
# Test YOLOv8n model
python /home/pi/firmware/scripts/test_model.py

# Expected output:
# Loading model: /opt/shopshense/models/yolov8n.pt
# Running inference on test image...
# Detections:
#   - person: 0.95 confidence
#   - bottle: 0.87 confidence
# Inference time: 45ms
```

### Sensor Readings
```bash
# Test I2C/UART sensors (temperature, humidity, etc.)
python /home/pi/firmware/services/sensor_reader.py

# Expected output:
# Temperature: 23.5°C
# Humidity: 45%
# CO2: 450ppm
```

### Storage & SQLite
```bash
# Check disk usage
df -h /

# Monitor SQLite database
sqlite3 /var/lib/shopshense/analytics.db
sqlite> .tables
# Should list: detections, classifications, transactions

# Check for database locks
lsof /var/lib/shopshense/analytics.db
```

---

## Field Deployment Runbook

### On-Site Installation Sequence

1. **Unbox & Inspect (5 min)**
   - Check Pi4, cameras, power supply, network cable
   - No visible damage or corrosion

2. **Power Up & Network (5 min)**
   - Connect USB-C power to Pi4
   - Wait for LED blinking (boot sequence)
   - Connect Ethernet OR configure WiFi

3. **Verify Network (2 min)**
   ```bash
   ssh pi@shopsense-01.local
   ping oorulogix.com
   # If successful, WiFi/network ready
   ```

4. **Camera Activation (5 min)**
   - Open browser to: http://shopsense-01.local:5000
   - Navigate to: Settings → Cameras
   - Verify all 4 cameras show live feed
   - Adjust mounts for correct angle

5. **Calibration (10 min)**
   ```bash
   ssh pi@shopsense-01.local
   python /home/pi/firmware/scripts/calibrate_cameras.py
   ```

6. **Register in Dashboard (3 min)**
   - Go to oorulogix.com/dashboard
   - Add New Device → Select registration
   - Enter serial number (on Pi): `cat /etc/machine-id`
   - Verify device appears as "Connected"

7. **Configure Billing Rules (10 min)**
   - Dashboard → Device Settings
   - Set item prices per category
   - Enable/disable detection categories
   - Set alert thresholds

8. **Run Test Detection (5 min)**
   - Place objects in field of view
   - Verify counts appear in real-time dashboard
   - Check that local SQLite is recording

9. **Verify Sync (2 min)**
   - Dashboard → Device → Last Sync
   - Should show recent timestamp (within 5 minutes)
   - Check Firestore analytics for today's counts

10. **Sign-off & Documentation (5 min)**
    - Take photo of installed unit
    - Record serial numbers (Pi, cameras, network MAC)
    - Note WiFi network name and channel
    - Leave installation manual on site

### Troubleshooting On-Site

**Issue: Cameras not showing**
```bash
libcamera-hello --camera 0
# If this fails, cameras not detected
# Solutions:
# 1. Reseat camera ribbon cables
# 2. Reboot Pi: sudo reboot
# 3. Check firmware: uname -a
# 4. Swap cable if one camera works, one doesn't
```

**Issue: Network unavailable**
```bash
ping 8.8.8.8
# If fails:
# 1. Check WiFi SSID visible: nmcli device wifi list
# 2. Reconnect: nmtui → select network → enter password
# 3. Or use Ethernet cable temporarily
```

**Issue: Inference slow (>100ms per frame)**
```bash
# Check thermal throttling
vcgencmd measure_temp
# If >80°C, increase cooling (fan, heatsink)

# Check GPU memory
vcgencmd get_mem gpu
# Should be 256MB+ allocated

# Monitor CPU usage
top
# Looking for runaway processes
```

**Issue: Sync failing (analytics not uploading)**
```bash
# Check Firebase connectivity
curl -X POST https://oorulogix.firebaseio.com/.json \
  -H "Authorization: Bearer $FIREBASE_TOKEN" \
  -d '{"test": "data"}'

# Check local queue
sqlite3 /var/lib/shopshense/analytics.db
sqlite> SELECT COUNT(*) FROM detections WHERE synced = 0;
# High number = sync backlog

# Manual sync attempt
python /home/pi/firmware/services/firebase_sync.py --force
```

---

**Last Updated:** February 2025
