---
description: Jules Meta-Maintenance Agent — Four-Phase system health sweep for OLOG + ShopSense
---

# 🔧 Jules Meta-Maintenance Loop v2.0

**Purpose:** Autonomous system health verification for dual-platform architecture (OLOG React app + ShopSense Raspberry Pi Python).

**Run Schedule:** Weekly (Mondays, 09:00 IST) or on-demand before releases.

**Duration:** ~2 hours | **Output:** `health-report-[DATE].md` + applied fixes

---

## Overview: Four-Phase Maintenance

```
PHASE 1: OLOG React App Health
  ├─ TypeScript compilation
  ├─ Unused imports & dead code
  ├─ Unused routes
  └─ ESLint / formatting

PHASE 2: ShopSense Python/Pi Code Health
  ├─ Import validation
  ├─ Thread safety checks
  ├─ State machine integrity
  └─ Dependencies audit

PHASE 3: Company Docs Consistency
  ├─ Obsidian vault structure
  ├─ PROGRESS.md integrity
  ├─ Agent workflow docs sync
  └─ Stale content detection

PHASE 4: Git & Deployment Readiness
  ├─ Commit hygiene
  ├─ .gitignore enforcement
  ├─ Secrets scan
  └─ CI/CD status
```

---

## Phase 1: OLOG React App Health

**Duration:** 20 minutes | **Platform:** OLOG root directory

### Step 1A: TypeScript Compilation Check

```bash
# Run production build
npm run build 2>&1 | tee phase1-build.log

# Expected output: "built successfully" with 0 errors
# If errors exist: document file + line number
```

**Check:**
- Zero TypeScript errors
- Build output size acceptable (<800KB gzipped)
- No critical warnings

**Action if issue:**
```markdown
## Build Issue in Phase 1
- **File:** [filename:line]
- **Error:** [TypeScript error message]
- **Severity:** Critical/High/Low
- **Fix:** [Specific recommendation]
```

### Step 1B: Scan for Unused Imports

```bash
# ESLint unused variable detection
npx eslint src/ --rule "no-unused-vars: error" 2>&1 | tee phase1-unused.log

# Search manually in key files
grep -r "^import.*from" src/ | grep -v "export" | head -20
```

**Check:**
- All imports are used
- No duplicate imports
- No commented-out imports

**Action if issue:**
```bash
# Remove unused import
sed -i '/import.*unused/d' <file>.tsx
git add <file>.tsx
git commit -m "chore(olog): remove unused import in <file>"
```

### Step 1C: Validate Routes (React Router)

```bash
# Scan for all route definitions
grep -r "path=" src/ | grep -v "node_modules" | tee phase1-routes.log

# Check for orphaned routes (defined but never linked)
grep -r "useNavigate\|Link\|Router" src/ | grep -c "navigate\|to="
```

**Check:**
- Every route in router config has at least one link/navigation reference
- No 404 routes (undefined paths)
- No circular navigation loops

**Action if issue:**
```markdown
## Dead Route Detected
- **Route:** `/users/:id/profile`
- **Status:** Defined in App.tsx but no links point to it
- **Action:** Either remove route OR add navigation link

**Command:**
```bash
git grep -l "usersProfile\|/users/.*profile" src/
```
```

### Step 1D: Code Formatting & Linting

```bash
# Run ESLint with strict rules
npx eslint src/ --max-warnings 0 2>&1 | tee phase1-lint.log

# Check Prettier formatting
npx prettier --check src/ 2>&1 | tee phase1-prettier.log

# If formatting issues: auto-fix
npx prettier --write src/
```

**Check:**
- No linting errors
- Code follows team style guide
- No console.log statements in production code

**Action if issue:**
```bash
# Auto-fix most issues
npx eslint src/ --fix
npx prettier --write src/

git add src/
git commit -m "chore(olog): fix linting and formatting issues"
```

### Step 1E: React Component Health

```bash
# Check for missing keys in lists
grep -r "\.map\(" src/ | grep -v "key=" | head -5

# Check for unsafe dangerouslySetInnerHTML
grep -r "dangerouslySetInnerHTML" src/

# Check for direct DOM manipulation (should use React hooks)
grep -r "document\.\|innerHTML\|appendChild" src/ | grep -v "// TODO"
```

**Check:**
- All `.map()` calls have `key=` prop
- No `dangerouslySetInnerHTML` without XSS protection
- No direct DOM manipulation

**Action if issue:**
```markdown
## React Anti-Pattern Detected
- **Pattern:** Missing key in list render (src/components/Users.tsx:42)
- **Fix:** Add key={user.id} to mapped element
```

---

## Phase 2: ShopSense Python/Pi Code Health

**Duration:** 20 minutes | **Platform:** ShopSense Python codebase (if present)

### Step 2A: Python Import Validation

```bash
# Check for invalid imports
cd shopSense/  # or relevant path
python3 -m py_compile **/*.py 2>&1 | tee phase2-imports.log

# Find unused imports
grep -r "^import\|^from.*import" **/*.py | while read line; do
  module=$(echo "$line" | cut -d' ' -f2)
  if ! grep -q "$module\." "$(echo $line | cut -d':' -f1)"; then
    echo "UNUSED: $line"
  fi
done
```

**Check:**
- All imports resolve (no ModuleNotFoundError)
- No unused imports
- No circular dependencies

**Action if issue:**
```bash
# Remove unused import
sed -i '/import unused_module/d' orchestrator.py
pip uninstall unused_module  # If external dependency

git add orchestrator.py
git commit -m "fix(shopsense): remove unused import in orchestrator"
```

### Step 2B: Thread Safety & State Machine Integrity

```bash
# Check for race conditions in Orchestrator.py
grep -n "self\.\w\+ =" orchestrator.py | tee phase2-state.log

# Count lock usage
grep -c "threading\.Lock\|acquire\|release" orchestrator.py

# Verify IDLE→SCANNING→DETECTED→CONFIRMED state machine
grep -n "self\.state =" orchestrator.py
grep -n "if self\.state ==" orchestrator.py
```

**Check:**
- Every state change is protected by locks
- State transitions follow IDLE→SCANNING→DETECTED→CONFIRMED chain
- No deadlocks (more acquires than releases)
- Callbacks properly thread-safe

**Action if issue:**
```python
# Add lock protection example:
with self.state_lock:
    if self.state == State.IDLE:
        self.state = State.SCANNING

git add orchestrator.py
git commit -m "fix(shopsense): add thread safety to state transitions"
```

### Step 2C: YOLOv8 Model & Inference Health

```bash
# Check model paths
grep -r "weights=\|model_path" **/*.py | tee phase2-models.log

# Verify inference timeout handling
grep -c "timeout\|TimeoutError" **/*.py

# Check memory cleanup after inference
grep -c "torch\.cuda\.empty_cache\|del model\|gc\.collect" **/*.py
```

**Check:**
- Model weights file exists and is accessible
- Inference has timeout protection (prevent freezes)
- Memory cleanup after each detection cycle
- GPU memory not leaking (if CUDA-enabled)

**Action if issue:**
```python
# Add GPU memory cleanup
torch.cuda.empty_cache()
gc.collect()

git add inference.py
git commit -m "fix(shopsense): add GPU memory cleanup after inference"
```

### Step 2D: Raspberry Pi Configuration Validation

```bash
# Check for hardcoded paths (should use config file)
grep -r "\/home\/pi\|\/opt\|\/root" **/*.py | tee phase2-paths.log

# Check camera/GPIO initialization
grep -n "picamera\|GPIO\|serial\." orchestrator.py | head -10

# Verify config file exists and is readable
if [ -f config.yaml ]; then
  python3 -c "import yaml; yaml.safe_load(open('config.yaml'))"
fi
```

**Check:**
- No hardcoded paths (use config.yaml)
- Camera/GPIO properly initialized
- Config validation on startup
- Error handling for missing hardware

**Action if issue:**
```yaml
# Create config.yaml if missing:
camera:
  device: 0
  resolution: [1280, 720]
  fps: 30

gpio:
  relay_pin: 17
  status_led_pin: 27

model:
  weights: ./weights/yolov8s-drinks.pt
  confidence_threshold: 0.5
```

### Step 2E: Dependencies & Version Compatibility

```bash
# Check requirements.txt
if [ -f requirements.txt ]; then
  python3 -m pip check 2>&1 | tee phase2-deps.log
fi

# Verify Python version
python3 --version  # Should be 3.8+

# Check for deprecated packages
grep -E "tensorflow<2\|torch<1\.9" requirements.txt
```

**Check:**
- All dependencies installed and compatible
- No deprecated packages
- Python version 3.8+
- No security vulnerabilities in deps

**Action if issue:**
```bash
# Update requirements.txt
pip install --upgrade -r requirements.txt
pip freeze > requirements.txt

git add requirements.txt
git commit -m "chore(shopsense): update Python dependencies"
```

---

## Phase 3: Company Docs Consistency

**Duration:** 15 minutes | **Platform:** company/ directory

### Step 3A: Obsidian Vault Structure

```bash
# Check vault exists and has required structure
test -d company/obsidian || mkdir -p company/obsidian

# Count files
find company/obsidian -name "*.md" | wc -l  # Should be 20+

# Check for orphaned files (not linked anywhere)
grep -r "^\[\[" company/obsidian | wc -l  # Should be 50+

# List all .md files
find company/obsidian -name "*.md" | sort
```

**Check:**
- `company/obsidian/` exists with subdirs: agents/, products/, marketing/, operations/, team/
- Each subdirectory has index.md
- No orphaned .md files (all should be linked)
- Minimum 20 documents

**Action if issue:**
```bash
# Create missing index
cat > company/obsidian/agents/index.md << 'EOF'
# Agent Registry

[[security-auditor]]
[[performance-optimizer]]
...
EOF

git add company/obsidian/agents/index.md
git commit -m "docs: create agents index"
```

### Step 3B: PROGRESS.md Integrity Check

```bash
# Verify PROGRESS.md structure
grep -c "^| C-" PROGRESS.md  # Should be 15+

# Check for orphaned chunks (marked IN PROGRESS but not recent)
grep "🔄 IN PROGRESS" PROGRESS.md | tee phase3-blocks.log

# Verify all status symbols are valid
grep -E "✅|🔄|⬜|⏸️" PROGRESS.md | wc -l

# Check handoff notes exist
grep "## 🔄 Handoff" PROGRESS.md | wc -l  # Should be several
```

**Check:**
- All chunks have valid status (✅/🔄/⬜/⏸️)
- No `🔄 IN PROGRESS` chunks older than 24 hours
- Handoff notes present for completed chunks
- No duplicate chunk IDs

**Action if issue:**
```markdown
## Phase 3 Finding: Stale Chunk
- **Chunk:** C-15 (In Progress since 2026-03-27)
- **Action:** Contact agent or mark as BLOCKED
- **Fix:** Update PROGRESS.md with current status
```

### Step 3C: Agent Workflow Sync

```bash
# Compare agents in .agent/workflows/ with company/obsidian/agents/
ls -1 .agent/workflows/ | sed 's/\.md//' > workflows_list.txt
ls -1 company/obsidian/agents/ | sed 's/\.md//' > obsidian_list.txt

# Find differences
diff workflows_list.txt obsidian_list.txt
```

**Check:**
- Every workflow in `.agent/workflows/` has a corresponding card in `company/obsidian/agents/`
- Card describes purpose, triggers, auto-approve status
- No missing or orphaned agents

**Action if issue:**
```bash
# Create missing agent card
cp company/obsidian/agents/_template.md company/obsidian/agents/new-agent.md
# (Edit template with agent details)

git add company/obsidian/agents/new-agent.md
git commit -m "docs: add agent card for new-agent"
```

### Step 3D: Stale Content Detection

```bash
# Find files not modified in 30+ days
find company/obsidian -name "*.md" -mtime +30 | tee phase3-stale.log

# Check for TODO/FIXME markers
grep -r "TODO\|FIXME\|TBD\|XXX" company/obsidian | wc -l

# Look for outdated date references
grep -r "2026-0[1-2]" company/obsidian | head -5
```

**Check:**
- Active files updated within last 2 weeks
- No unresolved TODOs blocking progress
- Date references are current

**Action if issue:**
```markdown
## Stale Document Found
- **File:** company/obsidian/marketing/LinkedIn Launch Plan.md
- **Last Updated:** 2026-02-01
- **Action:** Review and refresh, or mark deprecated
```

### Step 3E: PROJECT_MEMORY.md Freshness

```bash
# Check project memory exists and recent
test -f PROJECT_MEMORY.md && echo "✓ Exists"

# Count decision entries
grep -c "## \[" PROJECT_MEMORY.md  # Should be 10+

# Check for outdated decisions
grep "Status:.*Deprecated\|Status:.*Under Review" PROJECT_MEMORY.md
```

**Check:**
- PROJECT_MEMORY.md exists
- Contains 10+ documented decisions
- Deprecated items are marked clearly
- Last update within 1 month

**Action if issue:**
```markdown
## Update PROJECT_MEMORY.md
Add new decision entry:

## Firebase Schema — Last Updated: 2026-03-29
- **Decision:** Split users into sub-collection by region
- **Why:** Faster queries, regional compliance
- **Status:** Active, implemented in v2.1
```

---

## Phase 4: Git & Deployment Readiness

**Duration:** 15 minutes | **Platform:** Git repository

### Step 4A: Commit Hygiene

```bash
# Check recent commits follow conventional format
git log --oneline -20 | tee phase4-commits.log

# Pattern: type(scope): message
# Valid types: feat, fix, chore, docs, refactor, test, perf, ci

# Count commits by type
git log --oneline --all --grep="^feat\|^fix\|^chore" | wc -l
```

**Check:**
- Recent commits use conventional format: `type(scope): message`
- All commits have meaningful messages (>10 chars)
- No commits with messages like "wip", "asdf", "test"

**Action if issue:**
```bash
# Squash and rewrite bad commits
git rebase -i HEAD~5
# (In editor, mark bad commits as 'reword', then fix messages)

git push origin main --force-with-lease
```

### Step 4B: .gitignore Enforcement

```bash
# Check .gitignore exists
test -f .gitignore && echo "✓ Exists" || echo "✗ Missing"

# Find files that should be ignored but aren't
git status --ignored | head -10

# Check for critical patterns
grep -E "\.env|node_modules|\.DS_Store|\.idea" .gitignore
```

**Check:**
- .gitignore exists and is comprehensive
- No `.env` files tracked in Git
- No `node_modules/` tracked
- No IDE config files tracked
- No OS files tracked (.DS_Store, Thumbs.db)

**Action if issue:**
```bash
# Add missing patterns to .gitignore
echo "*.env" >> .gitignore
echo "node_modules/" >> .gitignore
echo ".DS_Store" >> .gitignore

git rm --cached .env 2>/dev/null || true
git add .gitignore
git commit -m "chore: fix gitignore"
```

### Step 4C: Secrets Scan

```bash
# Scan for common secrets patterns
grep -r "password\|secret\|key\|token\|credential" src/ | \
  grep -v "// TODO\|VITE_PUBLIC" | tee phase4-secrets.log

# Check for hardcoded API keys
grep -rE "[A-Za-z0-9]{20,}|sk_live_|sk_test_|AIzaSy" src/ \
  --include="*.ts" --include="*.tsx" | head -5

# Scan git history for secrets (recent commits only)
git log -p --all -S "password=" | head -20 || true
```

**Check:**
- No hardcoded passwords, API keys, or tokens in code
- All secrets in `.env` or secrets manager
- No Firebase Admin SDK in client code
- No database credentials exposed

**Action if issue (CRITICAL):**
```bash
# If secret leaked:
1. STOP and escalate to Vaishak immediately
2. Rotate the compromised key
3. Force-push to remove from history:
   git push origin main --force-with-lease
4. Add secret pattern to .gitignore
```

### Step 4D: Branch & Remote Status

```bash
# Check current branch
git branch -v

# Verify main branch is clean
git checkout main
git pull origin main

# Check for stale branches (>30 days)
git branch -a --format='%(refname:short) %(committerdate:short)' | \
  awk -F' ' '{print $2, $1}' | sort | head -10

# Check remote
git remote -v
```

**Check:**
- Currently on `main` or `dev` branch (not detached)
- Latest changes pulled from origin
- No stale branches in remote (>30 days old)
- Origin URL is correct (github.com/snake14v/...)

**Action if issue:**
```bash
# Delete stale branch
git push origin --delete feature/old-feature

# Update from remote
git fetch origin
git pull origin main

git add .
git commit -m "chore: sync with remote"
git push origin main
```

### Step 4E: CI/CD & Deployment Status

```bash
# Check GitHub Actions status (if available)
# (Requires gh CLI or GitHub API access)
# gh run list -L 5

# Check for uncommitted changes
git status  # Should be clean

# Verify build is deployable
npm run build && echo "✓ Build ready" || echo "✗ Build failed"

# Check for test coverage
npm run test 2>&1 | grep -i "coverage\|passing" || echo "No test results"
```

**Check:**
- Working tree is clean
- Build succeeds
- No uncommitted changes
- Last commit passed CI/CD

**Action if issue:**
```bash
# Commit pending changes
git add .
git commit -m "chore: [describe changes]"
git push origin main

# Verify CI/CD passes before deployment
# (Check GitHub Actions tab)
```

---

## Output: Health Report Generation

### Report Template

```markdown
# System Health Report — [DATE]

## Executive Summary
- **Status:** ✅ HEALTHY / ⚠️ DEGRADED / 🔴 CRITICAL
- **Issues Found:** [N]
- **Issues Resolved:** [N]
- **Recommendations:** [N]

---

## Phase 1: OLOG React App Health ✅ / ⚠️ / 🔴

### TypeScript Build
- Status: ✅ Zero errors, 0 warnings
- Build size: 450KB gzipped
- Duration: 12 seconds

### Code Quality
- Unused imports: ✅ None found
- Dead routes: ✅ None found
- ESLint warnings: ✅ 0
- Prettier issues: ✅ 0

### React Best Practices
- Missing keys in lists: ✅ None
- dangerouslySetInnerHTML usage: ✅ None
- Direct DOM manipulation: ✅ None

---

## Phase 2: ShopSense Python/Pi Health ✅ / ⚠️ / 🔴

### Python Imports
- Syntax errors: ✅ None
- Unused imports: ✅ None
- Missing modules: ✅ None

### State Machine (Orchestrator)
- State transitions: ✅ Thread-safe
- Locks used correctly: ✅ Yes
- IDLE→SCANNING→DETECTED→CONFIRMED: ✅ Valid

### YOLOv8 & Inference
- Model weights found: ✅ Yes
- Timeout handling: ✅ Enabled
- GPU memory cleanup: ✅ Implemented

### Hardware Config
- Pi config file: ✅ Valid config.yaml
- Paths hardcoded: ✅ None found
- Camera/GPIO: ✅ Properly initialized

### Dependencies
- All installed: ✅ Yes
- Deprecated packages: ✅ None
- Security vulnerabilities: ✅ None

---

## Phase 3: Company Docs Consistency ✅ / ⚠️ / 🔴

### Obsidian Vault
- Structure: ✅ Complete (5 subdirs)
- Total docs: 22 files
- Orphaned docs: ✅ None found
- Links integrity: ✅ All valid

### PROGRESS.md
- Chunks tracked: 29 entries
- Status format: ✅ Valid
- Stale IN_PROGRESS: ✅ None
- Handoff notes: 8 entries

### Agent Registry Sync
- Workflows defined: 22
- Agent cards: 22 (✅ 1:1 match)
- Missing docs: ✅ None

### Content Freshness
- Files <30 days old: 18/22
- Files 30-60 days: 4/22
- TODO/FIXME count: 3 (acceptable)

### PROJECT_MEMORY.md
- Exists: ✅ Yes
- Decision entries: 12
- Deprecated entries: 2 (marked)
- Last updated: 2026-03-27 ✅

---

## Phase 4: Git & Deployment Readiness ✅ / ⚠️ / 🔴

### Commit History
- Recent commits (20): ✅ All conventional format
- Message quality: ✅ All >10 chars
- Bad messages: ✅ None found

### .gitignore
- File exists: ✅ Yes
- .env excluded: ✅ Yes
- node_modules excluded: ✅ Yes
- IDE files excluded: ✅ Yes

### Secret Safety
- Hardcoded secrets: ✅ None found
- API keys exposed: ✅ None found
- Credentials in code: ✅ None found

### Remote & Branches
- Current branch: main (clean)
- Origin status: ✅ Up to date
- Stale branches: ✅ None found
- Build status: ✅ Passes

---

## Issues Found

### Critical (Must Fix)
None

### High Priority
None

### Medium Priority
None

### Low Priority
- Suggestion: Update Firebase rules documentation (last updated 2026-02-15)

---

## Recommendations

1. ✅ Continue current practices — system is healthy
2. 📋 Schedule Firebase rules audit next month
3. 🧪 Add E2E tests for critical user flows
4. 📊 Monitor GPU memory usage on Pi (current: 60% free)

---

## Actions Taken This Session

- ✅ Fixed 2 unused imports in components/
- ✅ Auto-formatted code with Prettier
- ✅ Updated requirements.txt to latest versions
- ✅ Archived 1 stale branch

---

## Next Health Check

**Scheduled:** 2026-04-05 (One week)

**Assigned Agent:** Jules Meta-Loop (automatic)

---

**Generated by:** Jules Meta-Loop v2.0
**Timestamp:** 2026-03-29T10:30:00+05:30
**Duration:** 1h 48m
```

### Commit Health Report

```bash
# Save report
cat > health-report-$(date +%Y-%m-%d).md << 'EOF'
[Content from template above]
EOF

# Commit if changes made
git add health-report-*.md
if [ -n "$(git status --porcelain)" ]; then
  git commit -m "chore: health check report $(date +%Y-%m-%d)"
  git push origin main
fi
```

---

## Failure Scenarios & Recovery

### Scenario 1: Build Fails

```bash
npm run build  # Error output

# Check for recent commits that broke it
git log --oneline -5

# Revert if needed
git revert <commit-hash>
git push origin main
```

### Scenario 2: Python Import Error

```bash
python3 -m py_compile orchestrator.py
# ModuleNotFoundError: No module named 'X'

# Fix
pip install X
pip freeze > requirements.txt
git add requirements.txt
git commit -m "fix(shopsense): add missing dependency X"
```

### Scenario 3: Out-of-Sync Memory Files

```bash
# PROGRESS.md shows conflict
git pull origin main  # Get latest
# Resolve conflicts manually, keeping all entries
git add PROGRESS.md
git commit -m "chore: resolve PROGRESS.md"
git push origin main
```

---

## Success Criteria

Jules Meta-Loop is working correctly when:

- ✅ Report generated within 2 hours
- ✅ All 4 phases execute without critical errors
- ✅ Zero TypeScript errors in OLOG
- ✅ Zero Python syntax errors in ShopSense
- ✅ PROGRESS.md integrity verified
- ✅ No unresolved secrets in codebase
- ✅ Report published and committed to main
- ✅ Next check scheduled automatically

---

## Tags
#maintenance #automation #health-check #orchestration #olog #shopsense

