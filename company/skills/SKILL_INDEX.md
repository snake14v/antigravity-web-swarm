# Ooru Logix Engineering Agent System - Skill Files Index

**Last Updated:** April 1, 2026  
**Status:** Complete - 6 skills, ~4,900 lines of documentation

---

## Quick Navigation

### By Task Type

| Task | Primary Skill | Reference Files |
|------|---------------|-----------------|
| Writing React components | Code Architect | react-patterns.md |
| Implementing Firebase features | Code Architect | firebase-patterns.md |
| Reviewing code quality | Code Architect | SKILL.md (checklist) |
| Deploying to production | Deploy Manager | SKILL.md |
| Troubleshooting hardware | Firmware Sync | SKILL.md (debugging) |
| Planning sprints | Sprint Planner | SKILL.md |
| Updating firmware | Firmware Sync | SKILL.md (OTA section) |
| Calibrating cameras | Firmware Sync | SKILL.md (calibration) |
| Estimating stories | Sprint Planner | SKILL.md (estimation) |
| Onboarding new patterns | Code Architect | All reference files |

---

## Skills at a Glance

### 1. Code Architect
**When to use:** Before writing any code  
**Key content:**
- Coding standards (TypeScript, React, file structure)
- Architecture patterns (atomic design, state management)
- Code review checklist (security, performance, accessibility)
- PR template

**Supporting files:**
- `react-patterns.md` - 20KB, 600+ lines
- `firebase-patterns.md` - 21KB, 700+ lines

**Key sections:**
- Atomic design system (atoms → molecules → organisms → templates → pages)
- State management rules (Context vs local vs Firestore)
- Custom hooks patterns (useAuth, useFirestoreQuery, useRealtimeDoc)
- Error handling patterns (try/catch, ErrorBoundary, toasts)
- Performance rules (bundle size, lazy loading, memoization)

---

### 2. Deploy Manager
**When to use:** Before deploying to production or debugging deployment issues  
**Key content:**
- Pre-deploy checklist (15+ items to verify)
- Vercel automation (git push → auto-deploy)
- Rollback procedures (< 1 minute recovery)
- Environment variable management
- Hardware deployment (SD cards, firmware flash)
- Post-deploy verification (smoke tests)
- On-site debugging runbook

**Key procedures:**
- Pre-deploy: Build check, TS errors, env vars, assets, Firebase
- Deploy: Push to main branch (auto → Vercel)
- Rollback: Git revert or Vercel dashboard promotion
- Verify: URLs green, Firebase connected, Core Web Vitals check

---

### 3. Sprint Planner
**When to use:** At sprint planning, during estimation, at sprint end  
**Key content:**
- Sprint cadence (1-week sprints, Mon-Sun)
- Capacity calculation (28 hours/week)
- Story point estimation (1, 2, 3, 5, 8 scale)
- Priority framework (P0, P1, P2, P3)
- Sprint template (goal, committed, stretch, carry-over)
- Definition of Done (6-part checklist)
- Retrospective template (metrics, action items)
- Chunk (C-XX) protocol for PROGRESS.md

**Key metrics:**
- Velocity: 18-24 points/sprint target
- Capacity: 28 hours available
- Estimation: 1pt=30min, 2pt=1-2hr, 3pt=2-4hr, 5pt=4-8hr, 8pt=8-13hr

---

### 4. Firmware Sync
**When to use:** Deploying hardware, training models, debugging devices  
**Key content:**
- Hardware architecture (dual Pi4, 4 cameras, sensors)
- Firmware versioning and updates
- OTA updates (with automatic rollback)
- YOLOv8n training pipeline (train → validate → quantize)
- Camera calibration (ArUco markers)
- Edge processing (detect → classify → count)
- Offline sync (SQLite → Firebase when WiFi available)
- Field deployment (10-step runbook)
- Hardware debugging (power, thermal, cameras, network)

**Key capabilities:**
- Firmware update: <15 minutes
- Inference latency: <50ms per frame
- Sync reliability: >99%
- Offline queue: No data loss

---

## Code Examples by Feature

### React/TypeScript (25+ examples)
```
Location: code-architect/standards/react-patterns.md

- useAuth hook (Firebase auth context)
- useFirestoreQuery (single doc read)
- useFirestoreCollection (multi-doc query)
- useRealtimeDoc (real-time listener)
- useLocalStorage (browser storage)
- Custom useForm hook (validation)
- Controlled form components
- ErrorBoundary class component
- Modal with Framer Motion
- List animations with stagger
- Responsive grid with Tailwind
- Loading skeleton patterns
- Pagination with cursor-based queries
```

### Firebase/Firestore (8+ examples)
```
Location: code-architect/standards/firebase-patterns.md

- Users collection schema
- Registrations collection schema
- Pilots subcollection schema
- Analytics collection schema
- Security Rules template
- Email/password auth flow
- Google OAuth flow
- FirebaseAuthContext provider
- Batch upload with retry logic
- Real-time collection listener
- Error handling by error code
```

### Deployment (10+ procedures)
```
Location: deploy-manager/SKILL.md

- Pre-deploy checklist (verification)
- Git push → Vercel auto-deploy
- Manual Vercel CLI deploy
- Git revert rollback
- Vercel dashboard promotion rollback
- Environment variable setup
- SD card flashing
- Firmware OTA update
- Camera calibration
- On-site installation (10 steps)
```

### Hardware/Firmware (15+ procedures)
```
Location: firmware-sync/SKILL.md

- OTA firmware update with checksum
- Manual SD card flashing
- YOLOv8n training script
- Model quantization for Pi
- Camera calibration script
- Inference engine with tracking
- SQLite schema definition
- Batch sync service
- Real-time detection pipeline
- Hardware health checks
- Power/thermal monitoring
- Camera feed testing
- Model inference testing
- Sensor reading verification
- Network connectivity testing
```

---

## Checklists & Templates

### Pre-Deploy Checklist
**Location:** deploy-manager/SKILL.md  
**Items:** 25+  
**Sections:**
- Code Quality (TS compilation, linting)
- Feature Completeness (DoD met, no breaking changes)
- Environment (env vars, secrets)
- Assets (og-image, robots.txt, favicon)
- Performance (bundle size, responsiveness)
- Security (no hardcoded keys, CORS)
- Database (Firestore rules, indexes)

### Code Review Checklist
**Location:** code-architect/SKILL.md  
**Items:** 40+  
**Sections:**
- Security (API keys, inputs, CORS)
- Performance (N+1, images, bundle)
- Type Safety (no any, explicit returns)
- Accessibility (semantic HTML, ARIA, color contrast)
- Error Handling (try/catch, fallbacks, logging)
- Code Quality (function length, naming, comments)
- Documentation (JSDoc, inline comments)

### Definition of Done
**Location:** sprint-planner/SKILL.md  
**Items:** 20+  
**Sections:**
- Code Quality (TS clean, ESLint, no console logs)
- Testing (manual, edge cases, mobile)
- Code Review (approved, feedback addressed)
- Documentation (comments, JSDoc, README)
- Deployment (merged, preview deployed, smoke tests)
- Metrics (bundle size, performance, Lighthouse)

### Retrospective Template
**Location:** sprint-planner/SKILL.md  
**Sections:**
- Completed (items with checkmarks)
- Incomplete (with reasons and resolutions)
- What Went Well (positive patterns)
- What Didn't (problems and causes)
- Action Items (specific, trackable)
- Metrics (velocity, quality, stability)

---

## Architecture Diagrams

### Component Hierarchy
```
Atoms (basic)
  ├── Button (variants: primary, secondary, danger)
  ├── Input (text, email, password)
  ├── Badge (variant, size)
  └── Icon (from Lucide)

Molecules (composed)
  ├── FormField (label + input + error)
  ├── Card (with padding, border, shadow)
  ├── Modal (header + body + footer)
  └── Toast (success, error, info)

Organisms (complex)
  ├── NavBar (with auth menu)
  ├── UserProfileForm (form + validation)
  ├── AnalyticsChart (Recharts)
  └── PilotList (with pagination)

Templates (page layouts)
  ├── DashboardLayout (sidebar + main + footer)
  ├── AuthLayout (centered card)
  └── BlankLayout (minimal)

Pages (route components)
  ├── HomePage
  ├── DashboardPage
  ├── ProfilePage
  └── AdminPage
```

### State Management
```
Auth/Theme Data
  └── React Context (FirebaseAuthContext, ThemeContext)

Persistent Data (users, registrations, analytics)
  ├── Firestore (source of truth)
  └── React Context (cache for performance)

Real-Time Data (live counts, status)
  ├── Firestore listeners (onSnapshot)
  └── React state (re-render on update)

UI State (modals, dropdowns)
  └── Local useState

Temporary Data (form drafts)
  ├── Local state
  └── sessionStorage
```

### Hardware Pipeline
```
Camera Frames (4x, 30fps)
  ↓
Frame Capture (distortion correction, resize)
  ↓
YOLOv8n Inference (45ms, multi-threaded)
  ↓
Classification & Filtering (confidence threshold)
  ↓
Counting & Billing (centroid tracking, pricing)
  ↓
Local SQLite (offline queue)
  ↓
Firebase Sync (batch upload when WiFi available)
  ↓
Cloud Analytics Dashboard
```

---

## Performance Targets

| Metric | Target | Measured In |
|--------|--------|-------------|
| Bundle size (initial JS) | <500KB | gzipped |
| Lazy-loaded chunks | <150KB | each |
| React component render | <16ms | 60 FPS |
| Firestore query | <100ms | single doc |
| Real-time listener | <50ms | update latency |
| Camera inference | <50ms | per frame |
| Firmware OTA | <15 min | total time |
| Deployment | <2 min | Vercel |
| Rollback | <1 min | recovery time |
| Page load LCP | <2.5s | First Paint |
| Lighthouse score | ≥90 | mobile + desktop |

---

## Quick Reference Tables

### Story Point Estimation
| Points | Time | Examples |
|--------|------|----------|
| 1 | 30min-1hr | Fix typo, bump version, add constant |
| 2 | 1-2hr | Create simple component, fix bug, add test |
| 3 | 2-4hr | Build feature page, implement hook, form with validation |
| 5 | 4-8hr | Multi-component feature, complex hook, full flow |
| 8 | 8-13hr | Epic, major refactor, new system |

### Priority Levels
| Level | Impact | Timeline | Examples |
|-------|--------|----------|----------|
| P0 | Business-critical | Hours | Production down, auth broken, security breach |
| P1 | Customer-facing | This week | Dashboard feature, bug fix, improvement |
| P2 | Internal tooling | Next sprint | Tech debt, refactoring, tooling |
| P3 | Nice-to-have | When available | Dark mode, advanced filters, nice-to-have |

### Capacity Calculation
| Item | Hours | Percentage |
|------|-------|-----------|
| Total work week | 40 | 100% |
| Sales/Ops/Meetings | 5 | 12% |
| Available dev | 35 | 88% |
| Support/blockers | 7 | 20% |
| **Commit capacity** | **28** | **80%** |

---

## Integration Points

### With PROGRESS.md
- Chunks use C-XX format
- Each chunk references relevant skill section
- Handoffs note which skill was being used
- Retrospectives use template from Sprint Planner

### With GitHub Issues
- Issues linked to chunks
- PR titles reference C-XX
- Commit messages reference chunks
- Code review uses checklist from Code Architect

### With Firestore
- Collection schemas defined in firebase-patterns.md
- Security Rules template provided
- Query patterns documented
- Error handling by error code

### With Vercel
- Pre-deploy checklist in Deploy Manager
- Environment variable setup documented
- Rollback procedures provided
- Post-deploy smoke tests defined

---

## File Sizes & Statistics

| File | Size | Lines | Content Type |
|------|------|-------|--------------|
| code-architect/SKILL.md | 12KB | 425 | Standards + architecture |
| react-patterns.md | 20KB | 600+ | Code examples |
| firebase-patterns.md | 21KB | 700+ | Code examples |
| deploy-manager/SKILL.md | 19KB | 741 | Procedures + checklists |
| sprint-planner/SKILL.md | 17KB | 607 | Process + templates |
| firmware-sync/SKILL.md | 39KB | 1213 | Hardware procedures |
| **TOTAL** | **~136KB** | **~4,900** | Full system |

---

## How to Contribute

When adding new patterns or procedures:

1. **Add to appropriate skill file** based on category
2. **Include code example** if applicable
3. **Reference existing patterns** (avoid duplication)
4. **Add to quick reference** (if widely used)
5. **Update checklist** (if process changes)
6. **Note in retrospective** (for team awareness)

---

## Version History

- **v1.0** (April 1, 2026) - Initial creation
  - 4 main skills: Code Architect, Deploy Manager, Sprint Planner, Firmware Sync
  - 2 supporting references: react-patterns, firebase-patterns
  - 50+ code examples
  - 15+ checklists and templates
  - Complete hardware architecture

---

## Support & Questions

**Skill not covering your use case?**
- Check related skill files
- Review code examples section
- Check integration points for relevant patterns
- Document learnings for next update

**Found an issue or improvement?**
- Document in PROGRESS.md
- Add to retrospective notes
- Reference skill section in GitHub issue
- Update skill during quarterly review

**Using a skill for the first time?**
1. Read the main SKILL.md completely
2. Review relevant code examples
3. Follow step-by-step procedures
4. Use provided checklists
5. Document any gaps found

---

**Last Updated:** April 1, 2026
