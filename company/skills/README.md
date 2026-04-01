# Ooru Logix Engineering Agent System - Skills Library

This directory contains the complete skills library for the Ooru Logix Engineering Agent System, enabling autonomous execution of engineering tasks across web and hardware development.

## Skills Overview

### 1. Code Architect (`code-architect/`)
**Purpose:** Define and enforce coding standards, architecture patterns, and quality gates.

**Key Files:**
- `SKILL.md` - Main skill definition (425 lines)
  - TypeScript/React coding standards
  - Component architecture (atomic design)
  - State management patterns
  - Error handling and performance rules
  - Code review checklist and PR template

- `standards/react-patterns.md` - React implementation guide
  - Custom hooks patterns (Firebase, real-time, local storage)
  - Component composition patterns
  - Form handling with validation
  - Framer Motion animation configs
  - Responsive design patterns (mobile-first)
  - Loading/error/empty state patterns

- `standards/firebase-patterns.md` - Firebase implementation guide
  - Firestore collection schema definitions
  - Security rules template
  - Query optimization with indexes
  - Real-time listener patterns
  - Auth flows (email/password + Google OAuth)
  - Error handling for Firebase operations

**Use When:**
- Creating new components or features
- Reviewing code quality and architecture
- Debugging type safety issues
- Implementing Firebase features
- Setting up animations or forms

---

### 2. Deploy Manager (`deploy-manager/`)
**Purpose:** Manage web (Vercel) and hardware (Raspberry Pi) deployments, rollbacks, and environment configuration.

**Key Content:**
- Pre-deploy checklist (code quality, assets, environment vars)
- Vercel deployment automation (git push → auto-deploy)
- Rollback procedures (revert commit, Vercel dashboard promotion)
- Environment variable management (.env.local vs Vercel dashboard)
- Domain configuration (oorulogix.com DNS, SSL)
- Post-deploy smoke tests (URLs, Firebase connectivity, Core Web Vitals)
- Hardware deployment (SD card prep, firmware flash, calibration)
- Debugging checklists (power, thermal, cameras, sensors, storage)
- Field deployment runbook (10-step on-site installation)

**Use When:**
- Preparing to deploy to production
- Configuring environment variables
- Troubleshooting deployment failures
- Rolling back bad releases
- Setting up new hardware units
- Debugging on-site hardware issues

---

### 3. Sprint Planner (`sprint-planner/`)
**Purpose:** Define sprint cadence, capacity planning, story point estimation, and agile execution workflow.

**Key Content:**
- Sprint cadence: 1-week sprints (Mon-Sun)
- Capacity calculation: 28 hours/week (35 available - interruptions)
- Story point estimation guide (1=trivial, 2=small, 3=medium, 5=large, 8=epic)
- Priority framework (P0=blocking revenue, P1=customer-facing, P2=tech debt, P3=nice-to-have)
- Sprint planning template (goal, committed items, stretch items, carry-over)
- Chunk (C-XX) creation protocol for PROGRESS.md tracking
- Definition of Done checklist (6 criteria: code quality, testing, review, docs, deployment, metrics)
- Retrospective template (what went well, what didn't, action items, metrics)
- Velocity tracking (measure and use for planning)

**Use When:**
- Planning a new sprint
- Estimating story points
- Creating GitHub issues linked to chunks
- Running end-of-sprint retrospectives
- Tracking velocity and capacity
- Managing prioritization discussions

---

### 4. Firmware Sync (`firmware-sync/`)
**Purpose:** Manage ShopSense hardware firmware, edge AI processing pipeline, and offline data sync.

**Key Content:**
- Hardware architecture (dual Pi4, 4x USB cameras, sensors, edge AI)
- Firmware versioning and update procedures
- OTA updates (Over-The-Air via WiFi with rollback)
- Manual SD card flashing (fallback method)
- YOLOv8n model training pipeline (train → validate → quantize)
- Camera calibration protocol (ArUco markers, distortion correction)
- Edge processing pipeline (capture → detect → classify → count → bill)
- Real-time inference code (multi-threaded, centroid tracking)
- SQLite schema for offline queue
- Batch sync with Firebase (upload when WiFi available, retry logic)
- Hardware debugging checklist (power, thermal, cameras, sensors, storage, network)
- Field deployment runbook (unpacking, network setup, calibration, registration)

**Use When:**
- Updating firmware on deployed devices
- Training custom YOLOv8n models
- Calibrating cameras on new units
- Debugging on-site hardware issues
- Implementing edge processing features
- Troubleshooting sync failures

---

## File Structure

```
skills/
├── code-architect/
│   ├── SKILL.md
│   └── standards/
│       ├── react-patterns.md
│       └── firebase-patterns.md
├── deploy-manager/
│   └── SKILL.md
├── sprint-planner/
│   └── SKILL.md
├── firmware-sync/
│   └── SKILL.md
└── README.md (this file)
```

---

## How to Use These Skills

### For Individual Engineers / AI Agents
1. **Before starting work:** Read the relevant skill file
2. **During implementation:** Reference specific sections (patterns, examples, checklists)
3. **Before submitting code:** Use the code review checklist from Code Architect
4. **Before deploying:** Run through Deploy Manager pre-deploy checklist
5. **End of sprint:** Follow Sprint Planner retrospective template

### For AI Agents (Autonomous Execution)
1. Load the appropriate skill based on task type
2. Follow step-by-step procedures in order
3. Reference code snippets and templates as templates
4. Use checklists to verify completion
5. Document handoffs in PROGRESS.md using C-XX chunk format

### Integration with PROGRESS.md
- Chunks (C-XX) are tracked in PROGRESS.md
- Each chunk references relevant skill(s)
- Handoffs between AI sessions note which skill section was being used
- Retrospectives reference patterns from Sprint Planner

---

## Key Technologies Covered

### Web Stack
- React 19 + TypeScript 5.8
- Vite 6.2 + TailwindCSS 4
- Firebase (Auth + Firestore)
- Framer Motion (animations)
- Lucide React (icons)
- Recharts (data visualization)
- Vercel (deployment)

### Hardware Stack
- Raspberry Pi 4 (primary + backup)
- 4x USB cameras (Arducam 8MP)
- YOLOv8n (edge AI inference)
- Python firmware
- SQLite (local database)
- Firebase Firestore (cloud sync)

---

## Metrics & Success Criteria

### Code Quality (Code Architect)
- TypeScript strict mode: 100% compliance
- ESLint: 0 warnings in production code
- Bundle size: <500KB initial JS
- Lighthouse score: ≥90 (mobile + desktop)
- Test coverage: Core business logic

### Deployment (Deploy Manager)
- Pre-deploy checklist: 100% items verified
- Deployment time: <2 minutes (Vercel)
- Rollback time: <1 minute
- Post-deploy tests: All URLs green
- Uptime: 99.9%+

### Sprint Execution (Sprint Planner)
- Sprint velocity: 18-24 story points/week
- Committed items completed: 80%+
- Definition of Done adherence: 100%
- Retrospective action items: Tracked and closed
- Code review cycles: <2 iterations

### Hardware (Firmware Sync)
- Firmware update time: <15 minutes
- Camera inference latency: <50ms per frame
- Sync reliability: >99% message delivery
- Offline queue handling: No data loss
- Hardware uptime: >99.5%

---

## Last Updated
February 2025

## Maintenance
- Skills reviewed quarterly
- New patterns added as discovered
- Code examples kept current with latest versions
- Handoff notes between AI sessions track evolving patterns
