# Firmware Sync Skill

**Purpose:** Manage ShopSense hardware firmware updates, edge processing pipeline, camera/sensor integration, and offline sync strategy.

**Scope:** Firmware architecture, YOLOv8n model updates, camera calibration, real-time sync, hardware debugging.

---

## ShopSense Hardware Architecture

### Hardware Stack
```
┌─────────────────────────────────────────────────────────────┐
│ SHOPSENSE UNIT (Wall-mounted or pedestal)                   │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  Primary Compute:  Raspberry Pi 4 (8GB RAM, 64-bit OS)       │
│  Backup Compute:   Raspberry Pi 4 (optional, hot-swap)       │
│  Storage:          512GB SSD (on Pi via USB 3)               │
│  Network:          WiFi 5 + Ethernet fallback                │
│                                                               │
│  ┌─── Camera Connections (CSI ribbons) ───────────────┐     │
│  │ Camera 0 (front): Arducam 8MP, 1080p@30fps        │     │
│  │ Camera 1 (left):  Arducam 8MP, 1080p@30fps        │     │
│  │ Camera 2 (right): Arducam 8MP, 1080p@30fps        │     │
│  │ Camera 3 (back):  Arducam 8MP, 1080p@30fps        │     │
│  └────────────────────────────────────────────────────┘     │
│                                                               │
│  ┌─── Sensor Bus (I2C + UART) ─────────────────────────┐    │
│  │ Temperature sensor (DS18B20, UART)                  │    │
│  │ Humidity sensor (DHT22, GPIO)                       │    │
│  │ Ambient light (BH1750, I2C)                         │    │
│  │ Door sensor (magnetic switch, GPIO)                 │    │
│  └────────────────────────────────────────────────────────┘     │
│                                                               │
│  ┌─── Local Processing ────────────────────────────────┐     │
│  │ YOLOv8n model (quantized, ~25MB, 45ms inference)    │     │
│  │ SQLite analytics DB (syncs to Firebase)             │     │
│  │ Offline queue (when WiFi down)                      │     │
│  └────────────────────────────────────────────────────────┘     │
│                                                               │
│  Power: 12V/5A USB-C (redundant supply connector)            │
│                                                               │
└─────────────────────────────────────────────────────────────┘
```

### File Structure on Pi
```
/opt/shopshense/
├── firmware/                    # Main firmware code
│   ├── main.py                 # Entry point, main loop
│   ├── services/
│   │   ├── camera_manager.py   # Camera init, frame capture
│   │   ├── inference_engine.py # YOLOv8n model loading, inference
│   │   ├── sensor_reader.py    # I2C/UART sensor polling
│   │   ├── firebase_sync.py    # Upload to Firestore
│   │   └── local_db.py         # SQLite operations
│   ├── models/
│   │   ├── yolov8n.pt          # YOLOv8n model weights
│   │   └── yolov8n_int8.tflite # Quantized TFLite version
│   ├── config/
│   │   ├── camera_matrix.json  # Calibration params per camera
│   │   ├── config.yaml         # Device settings (prices, categories)
│   │   └── secrets.json        # Firebase API keys (protected)
│   ├── scripts/
│   │   ├── calibrate_cameras.py
│   │   ├── test_hardware.py
│   │   └── update_model.py
│   └── requirements.txt        # Python dependencies

/var/lib/shopshense/
├── analytics.db                # SQLite: detections, classifications, transactions
├── sync_queue.db              # Failed uploads waiting to retry
└── logs/
    ├── main.log               # Application logs
    ├── inference.log          # Model inference timing
    └── sync.log               # Firestore sync activity

/etc/shopshense/
├── calibration/
│   ├── camera_0_matrix.json   # Per-camera intrinsics
│   ├── camera_1_matrix.json
│   ├── camera_2_matrix.json
│   └── camera_3_matrix.json
├── version.txt                # Firmware version (e.g., 1.2.3)
└── unit_info.txt              # Serial numbers, MAC addresses

~/.config/shopshense/
└── credentials.json           # Firebase service account (encrypted)
```

---

## Firmware Update Procedure

### Firmware Versioning
```
Version format: MAJOR.MINOR.PATCH

v1.0.0 - Initial release
v1.1.0 - Added camera 4 support, real-time inference
v1.2.0 - Improved sync retry logic, offline queue
v1.3.0 - YOLOv8n model upgrade, better calibration
v2.0.0 - Dual-Pi failover system (breaking change)

Changelog: stored in firmware/CHANGELOG.md
Each release tagged in Git: git tag v1.2.3
```

### Deployment Types

#### OTA Update (Preferred: via WiFi)
```python
# /opt/shopshense/services/firmware_updater.py

import requests
import json
import subprocess
import hashlib
import logging

logger = logging.getLogger(__name__)

def check_for_update():
    """Check Ooru Logix update server for new firmware."""
    try:
        # Read current version
        with open('/etc/shopshense/version.txt', 'r') as f:
            current_version = f.read().strip()

        # Check latest available
        response = requests.get(
            'https://oorulogix.com/api/firmware/latest',
            params={'model': 'shopshense', 'current': current_version},
            timeout=10
        )
        response.raise_for_status()

        latest = response.json()

        if latest['version'] > current_version:
            logger.info(f"Update available: {current_version} → {latest['version']}")
            return latest
        else:
            logger.debug(f"Firmware up-to-date: {current_version}")
            return None

    except Exception as e:
        logger.error(f"Failed to check for updates: {e}")
        return None


def download_firmware(url, expected_sha256):
    """Download and verify firmware image."""
    firmware_path = '/tmp/shopshense_firmware.tar.gz'

    try:
        logger.info(f"Downloading firmware from {url}")
        response = requests.get(url, stream=True, timeout=60)
        response.raise_for_status()

        # Download with progress
        total_size = int(response.headers.get('content-length', 0))
        downloaded = 0
        sha256_hash = hashlib.sha256()

        with open(firmware_path, 'wb') as f:
            for chunk in response.iter_content(chunk_size=8192):
                if chunk:
                    f.write(chunk)
                    sha256_hash.update(chunk)
                    downloaded += len(chunk)
                    progress = (downloaded / total_size * 100) if total_size else 0
                    logger.debug(f"Download progress: {progress:.1f}%")

        # Verify hash
        actual_hash = sha256_hash.hexdigest()
        if actual_hash != expected_sha256:
            logger.error(f"Hash mismatch! Expected {expected_sha256}, got {actual_hash}")
            return None

        logger.info(f"Firmware downloaded and verified: {firmware_path}")
        return firmware_path

    except Exception as e:
        logger.error(f"Download failed: {e}")
        return None


def install_firmware(firmware_path, new_version):
    """Install firmware, backup current version first."""
    try:
        # Step 1: Stop running services
        logger.info("Stopping services...")
        subprocess.run(['systemctl', 'stop', 'shopshense'], check=True)
        subprocess.run(['systemctl', 'stop', 'shopshense-sync'], check=True)

        # Step 2: Backup current firmware
        backup_path = f'/opt/shopshense.backup.{get_current_version()}'
        logger.info(f"Backing up current firmware to {backup_path}")
        subprocess.run(['cp', '-r', '/opt/shopshense', backup_path], check=True)

        # Step 3: Extract new firmware
        logger.info(f"Extracting firmware to /opt/shopshense")
        subprocess.run(
            ['tar', '-xzf', firmware_path, '-C', '/opt'],
            check=True
        )

        # Step 4: Update version file
        with open('/etc/shopshense/version.txt', 'w') as f:
            f.write(new_version)

        # Step 5: Run migration scripts if needed
        migration_script = '/opt/shopshense/scripts/migrate.py'
        if os.path.exists(migration_script):
            logger.info("Running migration script...")
            subprocess.run(['python3', migration_script], check=True)

        # Step 6: Restart services
        logger.info("Restarting services...")
        subprocess.run(['systemctl', 'start', 'shopshense'], check=True)
        subprocess.run(['systemctl', 'start', 'shopshense-sync'], check=True)

        # Step 7: Verify
        logger.info("Verifying installation...")
        time.sleep(5)  # Let services startup
        if verify_firmware_health():
            logger.info(f"Update successful! Firmware now v{new_version}")
            return True
        else:
            logger.error("Post-update health check failed, rolling back...")
            rollback_firmware(backup_path)
            return False

    except Exception as e:
        logger.error(f"Installation failed: {e}")
        return False


def rollback_firmware(backup_path):
    """Restore previous firmware from backup."""
    try:
        logger.warning("Rolling back firmware...")
        subprocess.run(['systemctl', 'stop', 'shopshense'], check=True)
        subprocess.run(['rm', '-rf', '/opt/shopshense'], check=True)
        subprocess.run(['cp', '-r', backup_path, '/opt/shopshense'], check=True)
        subprocess.run(['systemctl', 'start', 'shopshense'], check=True)
        logger.info("Rollback complete")
    except Exception as e:
        logger.error(f"Rollback failed: {e}")


def verify_firmware_health():
    """Quick health check post-update."""
    try:
        # Check main service running
        result = subprocess.run(
            ['systemctl', 'is-active', 'shopshense'],
            capture_output=True,
            timeout=5
        )
        if result.returncode != 0:
            return False

        # Check cameras accessible
        import subprocess as sp
        result = sp.run(
            ['libcamera-hello', '--list-cameras'],
            capture_output=True,
            timeout=5
        )
        if '4 cameras' not in result.stdout.decode():
            return False

        # Check inference working
        result = sp.run(
            ['python3', '-c', 'from ultralytics import YOLO; YOLO("/opt/shopshense/models/yolov8n.pt")'],
            capture_output=True,
            timeout=10
        )
        if result.returncode != 0:
            return False

        return True

    except Exception as e:
        logger.error(f"Health check failed: {e}")
        return False


# Cron job: Check updates daily at 2 AM
# Add to crontab: 0 2 * * * python /opt/shopshense/services/firmware_updater.py --check-and-install
```

### Manual SD Card Swap (Fallback)

```bash
# On development machine with SD card reader:

# 1. Download latest firmware
wget https://oorulogix.com/releases/shopshense-firmware-v1.3.0.tar.gz
tar -xzf shopshense-firmware-v1.3.0.tar.gz -C ./

# 2. Prepare SD card
# Insert SD card into reader
# Find device: lsblk (e.g., /dev/sde1)
sudo umount /dev/sde1
sudo mkfs.ext4 /dev/sde1

# 3. Flash Raspberry Pi OS first
# Use Raspberry Pi Imager (official tool)
# Or: sudo dd if=2024-12-05-raspios-bookworm-arm64.img of=/dev/sde bs=4M status=progress

# 4. Mount and copy firmware
sudo mount /dev/sde1 /mnt/pi
sudo cp -r shopshense-firmware/* /mnt/pi/opt/shopshense/
sudo cp calibration/* /mnt/pi/etc/shopshense/calibration/
sudo umount /mnt/pi

# 5. Insert SD into Pi, power on
# Unit boots with new firmware
```

---

## YOLOv8n Model Update Pipeline

### Model Versions
```
YOLOv8n (nano) - Used in production
- Size: ~6.2MB
- Inference: 45-50ms on Pi4 at 1080p
- FPS: ~20 @ 1080p
- Accuracy: 93% mAP on COCO dataset

YOLOv8s (small) - For future upgrade
- Size: ~22.5MB
- Inference: 100-120ms on Pi4
- FPS: ~8-10 @ 1080p
- Accuracy: 96% mAP (better)

Note: v8s only viable with cooling upgrade
```

### Training Custom Model

```python
# On cloud machine (GPU): train.py

from ultralytics import YOLO
import yaml

# 1. Prepare dataset
dataset_yaml = """
path: /data/shopshense
train: images/train
val: images/val
test: images/test
nc: 10  # 10 product categories
names:
  0: produce
  1: beverage
  2: bakery
  3: dairy
  4: frozen
  5: snacks
  6: health
  7: personal-care
  8: seasonal
  9: other
"""

with open('dataset.yaml', 'w') as f:
    f.write(dataset_yaml)

# 2. Train model
model = YOLO('yolov8n.pt')  # Load pretrained

results = model.train(
    data='dataset.yaml',
    epochs=100,
    imgsz=640,
    device=0,  # GPU 0
    patience=20,  # Early stopping
    save=True,
    cache='ram',  # Faster training
    workers=8,
)

# 3. Evaluate
metrics = model.val()
print(f"mAP50: {metrics.box.map50}")
print(f"mAP50-95: {metrics.box.map50_95}")

# 4. Export to multiple formats
model.export(format='pt')      # PyTorch (for development)
model.export(format='onnx')    # ONNX (cross-platform)
model.export(format='tflite')  # TFLite (embedded)
```

### Quantization for Pi Deployment

```python
# quantize.py: Reduce model size for better Pi performance

import torch
from ultralytics import YOLO
import onnxruntime as ort

# 1. Load trained model
model = YOLO('runs/detect/train/weights/best.pt')

# 2. Quantize to int8 (reduces size 4x, slight accuracy loss)
quantized_model = torch.quantization.quantize_dynamic(
    model.model,
    {torch.nn.Linear},
    dtype=torch.qint8
)

# 3. Export as TFLite (most efficient for Pi)
from ultralytics import YOLO
model = YOLO('best.pt')
model.export(format='tflite', imgsz=416, half=True)
# Output: best_int8.tflite (~6-8MB)

# 4. Test inference speed on Pi
"""
On Raspberry Pi:
python -c "
from ultralytics import YOLO
model = YOLO('best_int8.tflite')
results = model.predict(source='test.jpg', verbose=False)
# Check timing in results
"
"""

# 5. Upload to version storage
# gs://oorulogix-models/yolov8n/v1.3.0/best_int8.tflite
# Along with: classes.txt, calibration_stats.json
```

### Model Deployment to Pi

```bash
# On device, update model

# 1. Download new model
curl -o /tmp/yolov8n_v1.3.0.tflite \
  https://oorulogix.com/models/yolov8n/v1.3.0/best_int8.tflite

# 2. Verify checksum
echo "expected_sha256  /tmp/yolov8n_v1.3.0.tflite" | sha256sum -c

# 3. Backup current model
cp /opt/shopshense/models/yolov8n.pt /opt/shopshense/models/yolov8n.pt.backup

# 4. Install new model
cp /tmp/yolov8n_v1.3.0.tflite /opt/shopshense/models/yolov8n.pt

# 5. Test inference
python3 << 'EOF'
from ultralytics import YOLO
import time

model = YOLO('/opt/shopshense/models/yolov8n.pt')
img = '/tmp/test_image.jpg'

# Warmup
_ = model.predict(img)

# Benchmark
start = time.time()
results = model.predict(img)
elapsed = time.time() - start

print(f"Inference time: {elapsed*1000:.1f}ms")
print(f"Detections: {len(results[0].boxes)}")
EOF

# 6. Restart service to load new model
systemctl restart shopshense
```

---

## Camera Calibration Protocol

### Pre-Calibration Setup

```bash
# On Raspberry Pi:

# 1. Install calibration dependencies
pip install opencv-python-headless numpy scipy

# 2. Prepare calibration images
# Print ArUco marker grid (or use chessboard): 4x6 grid, A4 paper
# ArUco marker download: https://docs.opencv.org/4.9.0/d5/dae/tutorial_aruco_board_detection.html

# 3. Place marker in field of view of each camera, capture images
python3 /opt/shopshense/scripts/capture_calibration.py
# This captures 20 images per camera from different angles
```

### Calibration Script

```python
# /opt/shopshense/scripts/calibrate_cameras.py

import cv2
import numpy as np
import json
import os
from pathlib import Path

class CameraCalibrator:
    def __init__(self, checkerboard_size=(6, 4), square_size=0.025):
        """
        checkerboard_size: (width, height) in squares
        square_size: Size of each square in meters
        """
        self.checkerboard_size = checkerboard_size
        self.square_size = square_size
        self.obj_points = []  # 3D points in world space
        self.img_points = []  # 2D points in image plane
        self.calibration_dir = Path('/etc/shopshense/calibration')
        self.calibration_dir.mkdir(parents=True, exist_ok=True)

    def prepare_object_points(self):
        """Prepare 3D object points (0,0,0), (1,0,0), ..., (5,3,0)"""
        objp = np.zeros((
            self.checkerboard_size[0] * self.checkerboard_size[1], 3
        ), np.float32)
        objp[:, :2] = np.mgrid[
            0:self.checkerboard_size[0],
            0:self.checkerboard_size[1]
        ].T.reshape(-1, 2)
        objp *= self.square_size
        return objp

    def calibrate_from_images(self, image_dir, camera_id):
        """Calibrate camera using images of checkerboard."""
        objp = self.prepare_object_points()
        obj_points_list = []
        img_points_list = []

        criteria = (cv2.TERM_CRITERIA_EPS + cv2.TERM_CRITERIA_MAX_ITER, 30, 0.001)

        images = sorted(Path(image_dir).glob(f'cam{camera_id}_*.jpg'))
        print(f"Calibrating camera {camera_id} with {len(images)} images...")

        for img_path in images:
            img = cv2.imread(str(img_path))
            gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

            # Find checkerboard corners
            ret, corners = cv2.findChessboardCorners(gray, self.checkerboard_size, None)

            if ret:
                obj_points_list.append(objp)

                # Refine corner positions
                corners_refined = cv2.cornerSubPix(
                    gray, corners, (11, 11), (-1, -1), criteria
                )
                img_points_list.append(corners_refined)

                print(f"  ✓ {img_path.name}")
            else:
                print(f"  ✗ {img_path.name} (checkerboard not found)")

        if len(obj_points_list) < 5:
            raise ValueError(f"Need at least 5 valid images, got {len(obj_points_list)}")

        # Calibrate
        ret, mtx, dist, rvecs, tvecs = cv2.calibrateCamera(
            obj_points_list, img_points_list, gray.shape[::-1], None, None
        )

        if not ret:
            raise RuntimeError("Calibration failed")

        # Calculate reprojection error
        mean_error = 0
        for i in range(len(obj_points_list)):
            imgpoints2, _ = cv2.projectPoints(
                obj_points_list[i], rvecs[i], tvecs[i], mtx, dist
            )
            error = cv2.norm(
                img_points_list[i], imgpoints2, cv2.NORM_L2
            ) / len(imgpoints2)
            mean_error += error

        mean_error /= len(obj_points_list)
        print(f"Mean reprojection error: {mean_error:.4f} pixels")

        return mtx, dist, mean_error

    def save_calibration(self, camera_id, mtx, dist):
        """Save calibration to JSON."""
        calib_data = {
            'camera_matrix': mtx.tolist(),
            'distortion_coefficients': dist.tolist(),
            'image_width': 1920,
            'image_height': 1080,
        }

        calib_file = self.calibration_dir / f'camera_{camera_id}_matrix.json'
        with open(calib_file, 'w') as f:
            json.dump(calib_data, f, indent=2)

        print(f"Saved calibration to {calib_file}")

    def calibrate_all_cameras(self, images_dir='/tmp/calibration_images'):
        """Calibrate all 4 cameras."""
        for camera_id in range(4):
            try:
                print(f"\n=== Calibrating Camera {camera_id} ===")
                mtx, dist, error = self.calibrate_from_images(images_dir, camera_id)
                self.save_calibration(camera_id, mtx, dist)
                print(f"Camera {camera_id}: ✓ Calibrated")
            except Exception as e:
                print(f"Camera {camera_id}: ✗ Failed - {e}")


if __name__ == '__main__':
    calibrator = CameraCalibrator()
    calibrator.calibrate_all_cameras()
```

### Usage

```bash
# 1. Capture calibration images
python3 /opt/shopshense/scripts/capture_calibration.py
# Saves to: /tmp/calibration_images/cam{0-3}_*.jpg

# 2. Run calibration
python3 /opt/shopshense/scripts/calibrate_cameras.py
# Saves to: /etc/shopshense/calibration/camera_{0-3}_matrix.json

# 3. Verify
ls /etc/shopshense/calibration/
# Should show: camera_0_matrix.json, camera_1_matrix.json, ...
```

---

## Edge Processing Pipeline

### Real-Time Detection & Classification Flow

```
┌─────────────────────────────────────────────────────────┐
│ CAMERA FRAME (1920x1080, 30fps)                        │
│ 4 cameras simultaneously                                │
└────────────┬────────────────────────────────────────────┘
             │
             v
┌─────────────────────────────────────────────────────────┐
│ FRAME CAPTURE (libcamera)                               │
│ - Grab frame from each camera                           │
│ - Apply distortion correction (using calibration)       │
│ - Resize to 416x416 (YOLOv8n input)                     │
│ Latency: ~5ms                                           │
└────────────┬────────────────────────────────────────────┘
             │
             v
┌─────────────────────────────────────────────────────────┐
│ INFERENCE (YOLOv8n)                                     │
│ - Run YOLO detection on resized frame                   │
│ - Output: bounding boxes, class predictions, confidence │
│ - Multi-threaded: 4 threads (one per camera)            │
│ Latency: ~45ms per camera (sequential)                  │
└────────────┬────────────────────────────────────────────┘
             │
             v
┌─────────────────────────────────────────────────────────┐
│ CLASSIFICATION & FILTERING                              │
│ - Filter by confidence threshold (0.75)                 │
│ - Map COCO classes to product categories                │
│ - Deduplicate across camera views (NMS)                 │
│ Latency: ~10ms                                          │
└────────────┬────────────────────────────────────────────┘
             │
             v
┌─────────────────────────────────────────────────────────┐
│ COUNTING & BILLING                                      │
│ - Track objects across frames (simple centroid tracking)│
│ - Increment item counts                                 │
│ - Calculate revenue (price × quantity)                  │
│ - Store in local SQLite                                 │
│ Latency: ~5ms                                           │
└────────────┬────────────────────────────────────────────┘
             │
             v
┌─────────────────────────────────────────────────────────┐
│ LOCAL DATABASE (SQLite)                                 │
│ - Table: detections (timestamp, camera_id, class, conf) │
│ - Table: classifications (detection_id, category, price)│
│ - Table: transactions (date, total_revenue, item_count) │
│ Store for sync when WiFi available                      │
│ Latency: ~2ms (write)                                   │
└────────────┬────────────────────────────────────────────┘
             │
             v
         LOOP TO NEXT FRAME
      Cycle time: ~70ms (14 FPS max theoretical)
```

### Inference Engine Implementation

```python
# /opt/shopshense/services/inference_engine.py

import cv2
import numpy as np
from ultralytics import YOLO
import logging
import time
from collections import defaultdict
from threading import Thread, Lock

logger = logging.getLogger(__name__)

class InferenceEngine:
    def __init__(self, model_path, conf_threshold=0.75):
        self.model = YOLO(model_path)
        self.conf_threshold = conf_threshold
        self.detection_lock = Lock()
        self.latest_detections = defaultdict(list)  # camera_id -> detections

        # Object tracking (simple centroid tracking)
        self.tracked_objects = defaultdict(dict)  # camera_id -> object_id -> centroid
        self.next_object_id = 0

    def run_inference(self, frame, camera_id):
        """Run inference on single frame."""
        start = time.time()

        # Resize for YOLO (416x416)
        h, w = frame.shape[:2]
        resized = cv2.resize(frame, (416, 416))

        # Inference
        results = self.model(resized, verbose=False, conf=self.conf_threshold)

        # Parse results
        detections = []
        for result in results:
            for box in result.boxes:
                x1, y1, x2, y2 = box.xyxy[0].cpu().numpy()
                conf = float(box.conf[0].cpu().numpy())
                cls_id = int(box.cls[0].cpu().numpy())

                # Scale back to original image coordinates
                scale_x = w / 416
                scale_y = h / 416
                x1, x2 = int(x1 * scale_x), int(x2 * scale_x)
                y1, y2 = int(y1 * scale_y), int(y2 * scale_y)

                detection = {
                    'camera_id': camera_id,
                    'box': (x1, y1, x2, y2),
                    'confidence': conf,
                    'class_id': cls_id,
                    'timestamp': time.time(),
                }
                detections.append(detection)

        elapsed = time.time() - start
        logger.debug(f"Camera {camera_id}: {len(detections)} detections in {elapsed*1000:.1f}ms")

        # Update latest detections
        with self.detection_lock:
            self.latest_detections[camera_id] = detections

        return detections

    def track_objects(self, detections, camera_id):
        """Simple centroid-based tracking."""
        if not detections:
            return []

        # Calculate centroids
        current_centroids = {}
        for i, det in enumerate(detections):
            x1, y1, x2, y2 = det['box']
            cx = (x1 + x2) // 2
            cy = (y1 + y2) // 2
            current_centroids[i] = (cx, cy)

        # Match with previous frame
        tracked = []
        matched_new = set()

        if camera_id in self.tracked_objects:
            prev_objects = self.tracked_objects[camera_id]

            for obj_id, prev_centroid in prev_objects.items():
                # Find closest new detection
                min_dist = float('inf')
                closest_idx = None

                for idx, new_centroid in current_centroids.items():
                    if idx in matched_new:
                        continue

                    dist = ((prev_centroid[0] - new_centroid[0])**2 +
                            (prev_centroid[1] - new_centroid[1])**2)**0.5

                    if dist < min_dist and dist < 50:  # Max 50px movement
                        min_dist = dist
                        closest_idx = idx

                if closest_idx is not None:
                    matched_new.add(closest_idx)
                    tracked.append({**detections[closest_idx], 'object_id': obj_id})

        # New objects (no match from previous frame)
        for idx in current_centroids:
            if idx not in matched_new:
                tracked.append({
                    **detections[idx],
                    'object_id': self.next_object_id
                })
                self.next_object_id += 1
                matched_new.add(idx)

        # Update tracking state
        self.tracked_objects[camera_id] = {
            t['object_id']: current_centroids[idx]
            for idx, t in enumerate(tracked)
            if idx < len(detections)
        }

        return tracked
```

---

## Offline Sync Strategy

### Local SQLite Schema

```sql
-- /var/lib/shopshense/analytics.db

CREATE TABLE detections (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    camera_id INTEGER NOT NULL,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    class_id INTEGER NOT NULL,
    confidence REAL NOT NULL,
    bbox_x1 INTEGER, bbox_y1 INTEGER,
    bbox_x2 INTEGER, bbox_y2 INTEGER,
    synced BOOLEAN DEFAULT 0,
    sync_attempt_count INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE classifications (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    detection_id INTEGER NOT NULL,
    category TEXT NOT NULL,
    price INTEGER,  -- In cents
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    synced BOOLEAN DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(detection_id) REFERENCES detections(id)
);

CREATE TABLE transactions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    transaction_date DATE NOT NULL,
    hour INTEGER,  -- 0-23
    item_count INTEGER DEFAULT 0,
    total_revenue INTEGER DEFAULT 0,  -- In cents
    category_breakdown TEXT,  -- JSON: {category: {count, revenue}}
    synced BOOLEAN DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_detections_synced ON detections(synced);
CREATE INDEX idx_detections_timestamp ON detections(timestamp);
CREATE INDEX idx_transactions_date ON transactions(transaction_date);
```

### Batch Upload with Retry Logic

```python
# /opt/shopshense/services/firebase_sync.py

import sqlite3
import requests
import json
import logging
from datetime import datetime, timedelta
from time import sleep

logger = logging.getLogger(__name__)

class FirebaseSync:
    def __init__(self, db_path, firebase_url, api_key):
        self.db_path = db_path
        self.firebase_url = firebase_url
        self.api_key = api_key
        self.batch_size = 100
        self.max_retries = 3

    def get_unsynced_records(self, limit=None):
        """Fetch unsynced records from local DB."""
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()

        limit = limit or self.batch_size

        cursor.execute('''
            SELECT id, detection_id, category, price, timestamp
            FROM classifications
            WHERE synced = 0
            ORDER BY timestamp ASC
            LIMIT ?
        ''', (limit,))

        records = cursor.fetchall()
        conn.close()

        return records

    def upload_batch(self, registration_id, date_key):
        """Upload batch of detections to Firestore."""
        records = self.get_unsynced_records(self.batch_size)

        if not records:
            logger.debug("No unsynced records to upload")
            return True

        # Aggregate by category
        analytics = {
            'itemsDetected': len(records),
            'totalRevenue': 0,
            'categories': {}
        }

        for record_id, det_id, category, price, timestamp in records:
            analytics['totalRevenue'] += price or 0

            if category not in analytics['categories']:
                analytics['categories'][category] = {'count': 0, 'revenue': 0}

            analytics['categories'][category]['count'] += 1
            analytics['categories'][category]['revenue'] += price or 0

        # Send to Firestore
        payload = {
            'registrationId': registration_id,
            'date': date_key,
            **analytics,
            'syncedAt': datetime.utcnow().isoformat(),
        }

        try:
            response = requests.post(
                f'{self.firebase_url}/registrations/{registration_id}/analytics',
                json=payload,
                headers={'Authorization': f'Bearer {self.api_key}'},
                timeout=30
            )
            response.raise_for_status()

            logger.info(f"Synced {len(records)} records to Firestore")

            # Mark as synced
            self.mark_synced([r[0] for r in records])
            return True

        except requests.exceptions.RequestException as e:
            logger.error(f"Sync failed: {e}")

            # Increment retry count
            self.increment_retry_count([r[0] for r in records])

            return False

    def mark_synced(self, record_ids):
        """Mark records as successfully synced."""
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()

        placeholders = ','.join(['?'] * len(record_ids))
        cursor.execute(f'''
            UPDATE classifications
            SET synced = 1
            WHERE id IN ({placeholders})
        ''', record_ids)

        conn.commit()
        conn.close()

    def increment_retry_count(self, record_ids):
        """Track retry attempts."""
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()

        placeholders = ','.join(['?'] * len(record_ids))
        cursor.execute(f'''
            UPDATE classifications
            SET sync_attempt_count = sync_attempt_count + 1
            WHERE id IN ({placeholders})
        ''', record_ids)

        conn.commit()
        conn.close()

    def cleanup_synced_records(self, days=7):
        """Delete old synced records to save space."""
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()

        cutoff_date = datetime.now() - timedelta(days=days)

        cursor.execute('''
            DELETE FROM classifications
            WHERE synced = 1 AND created_at < ?
        ''', (cutoff_date,))

        conn.commit()
        conn.close()

        logger.info(f"Cleaned up records older than {cutoff_date}")

    def sync_loop(self, registration_id, interval_seconds=300):
        """Continuous sync loop (runs in background thread)."""
        while True:
            try:
                # Get current date key
                date_key = datetime.now().strftime('%Y-%m-%d')

                # Attempt upload
                if self.upload_batch(registration_id, date_key):
                    logger.debug("Sync successful")
                else:
                    logger.warning("Sync attempt failed, will retry")

                # Cleanup old synced records
                if datetime.now().hour == 2:  # 2 AM daily
                    self.cleanup_synced_records(days=7)

                # Wait before next attempt
                sleep(interval_seconds)

            except Exception as e:
                logger.error(f"Sync loop error: {e}")
                sleep(interval_seconds)
```

---

## Hardware Debugging Checklist

### Power & Thermal

```bash
# Check power supply voltage
ssh pi@shopsense-01.local
vcgencmd measure_volts

# Expected: ~5.0V under-voltage: 0 (if >0, power supply weak)
# If under-voltage: Replace USB-C supply

# Monitor temperature
vcgencmd measure_temp
# Typical: 40-60°C idle, <80°C under load
# If >85°C: Add cooling (fan, heatsink)

# Check throttling events
journalctl | grep thermal
# If frequent: Reduce inference rate or add cooling
```

### Camera & Sensor Feed

```bash
# List connected cameras
libcamera-hello --list-cameras
# Expected: 4 cameras found

# View live feed (camera 0)
libcamera-hello --camera 0
# Should show live preview, press Ctrl+C to exit

# Capture test image
libcamera-jpeg -o test_cam0.jpg --camera 0 -n
# -n: No preview

# Check camera properties
v4l2-ctl --list-devices
# Lists all connected CSI cameras

# Test all 4 cameras
for i in {0..3}; do
  libcamera-jpeg -o test_cam$i.jpg --camera $i -n
  echo "Camera $i: captured"
done
```

### Model Inference

```bash
# Test YOLO model loading and inference
python3 << 'EOF'
from ultralytics import YOLO
import time

model = YOLO('/opt/shopshense/models/yolov8n.pt')

# Warm up (first inference slower)
_ = model.predict('/tmp/test_image.jpg', verbose=False)

# Benchmark
results = []
for _ in range(10):
    start = time.time()
    model.predict('/tmp/test_image.jpg', verbose=False, conf=0.75)
    results.append(time.time() - start)

avg = sum(results) / len(results)
print(f"Inference time: {avg*1000:.1f}ms avg (range: {min(results)*1000:.1f}-{max(results)*1000:.1f}ms)")
EOF
```

### Sensor Readings

```bash
# Test I2C sensors
i2cdetect -y 1
# Lists all I2C devices on bus 1

# Read temperature sensor (DS18B20 on UART)
python3 << 'EOF'
import serial
import time

ser = serial.Serial('/dev/ttyAMA0', 9600, timeout=1)
time.sleep(0.1)
data = ser.read_all()
print(f"Sensor data: {data}")
ser.close()
EOF
```

### Storage & Database

```bash
# Check disk usage
df -h /

# Monitor SQLite database size
sqlite3 /var/lib/shopshense/analytics.db
sqlite> .tables
sqlite> SELECT COUNT(*) FROM detections;
sqlite> SELECT COUNT(*) FROM classifications;
sqlite> .quit

# Check for database locks
lsof /var/lib/shopshense/analytics.db
# If locked, find process: ps aux | grep [PID]
```

### Network & Sync Status

```bash
# Check WiFi connection
nmcli device wifi list
# Lists available networks and signal strength

# Check current connection
nmcli connection show
# Shows connected SSID and IP

# Test connectivity
ping 8.8.8.8
ping oorulogix.com

# Check last sync timestamp
python3 << 'EOF'
import sqlite3
from datetime import datetime

conn = sqlite3.connect('/var/lib/shopshense/analytics.db')
cursor = conn.cursor()

cursor.execute('''
  SELECT MAX(created_at) as last_synced
  FROM classifications
  WHERE synced = 1
''')

result = cursor.fetchone()
if result[0]:
    print(f"Last successful sync: {result[0]}")
else:
    print("No successful syncs recorded")

conn.close()
EOF
```

---

**Last Updated:** February 2025
