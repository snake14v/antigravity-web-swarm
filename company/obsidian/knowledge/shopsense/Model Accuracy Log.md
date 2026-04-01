# Model Accuracy Log

## SmokeSense Model Tracking

| Model Version | Date | mAP@50 | mAP@75 | Inference Time (ms) | Classes | Dataset Size | Notes |
|---------------|------|--------|--------|-------------------|---------|--------------|-------|
| v1.0 | — | — % | — % | — | — | — | — |
| v1.1 | — | — % | — % | — | — | — | — |
| v2.0 | — | — % | — % | — | — | — | — |

## BrewSense Model Tracking

| Model Version | Date | mAP@50 | mAP@75 | Inference Time (ms) | Classes | Dataset Size | Notes |
|---------------|------|--------|--------|-------------------|---------|--------------|-------|
| v1.0 | — | — % | — % | — | — | — | — |
| v1.1 | — | — % | — % | — | — | — | — |
| v2.0 | — | — % | — % | — | — | — | — |

## SnackSense Model Tracking

| Model Version | Date | mAP@50 | mAP@75 | Inference Time (ms) | Classes | Dataset Size | Notes |
|---------------|------|--------|--------|-------------------|---------|--------------|-------|
| v1.0 | — | — % | — % | — | — | — | — |
| v1.1 | — | — % | — % | — | — | — | — |
| v2.0 | — | — % | — % | — | — | — | — |

---

## Field Accuracy By Shop

### SmokeSense Deployments

| Pilot ID | Shop Name | Model Version | Field mAP@50 | False Positive Rate | False Negative Rate | Date Tested | Issues |
|----------|-----------|---------------|-------------|-------------------|------------------|------------|--------|
| — | — | — | — % | — % | — % | — | — |
| — | — | — | — % | — % | — % | — | — |
| — | — | — | — % | — % | — % | — | — |

### BrewSense Deployments

| Pilot ID | Shop Name | Model Version | Field mAP@50 | False Positive Rate | False Negative Rate | Date Tested | Issues |
|----------|-----------|---------------|-------------|-------------------|------------------|------------|--------|
| — | — | — | — % | — % | — % | — | — |
| — | — | — | — % | — % | — % | — | — |
| — | — | — | — % | — % | — % | — | — |

### SnackSense Deployments

| Pilot ID | Shop Name | Model Version | Field mAP@50 | False Positive Rate | False Negative Rate | Date Tested | Issues |
|----------|-----------|---------------|-------------|-------------------|------------------|------------|--------|
| — | — | — | — % | — % | — % | — | — |
| — | — | — | — % | — % | — % | — | — |
| — | — | — | — % | — % | — % | — | — |

---

## Model Improvement Log

### Performance Improvements

| Date | Model | Metric | Before | After | Change | Root Cause / Improvement |
|------|-------|--------|--------|-------|--------|------------------------|
| — | — | — | — | — | +— % | — |
| — | — | — | — | — | +— % | — |
| — | — | — | — | — | +— % | — |

### Known Limitations

| Model | Issue | Impact | Workaround | Priority |
|-------|-------|--------|-----------|----------|
| — | — | — | — | — |
| — | — | — | — | — |
| — | — | — | — | — |

---

## YOLOv8n Architecture Notes

**Base Model:** YOLOv8 Nano (lightweight, ~3.2M parameters)

- **Inference Latency Target:** < 100ms per frame on Raspberry Pi 4
- **Model Size:** ~6.3 MB (quantized)
- **Hardware:** Raspberry Pi 4 (4-8GB RAM), USB camera or CSI
- **Framework:** PyTorch with ONNX export option

**Optimization Techniques Applied:**
- Model quantization (INT8)
- Pruning non-essential layers
- Frame skipping (process every 2nd frame)
- Batch inference (multiple streams)

---

**Tags:** #shopsense #ml #models #accuracy #yolo

**Related:** [[Deployment Playbook]] | [[Pilot Tracker]]
