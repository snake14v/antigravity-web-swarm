# 🚀 AGENT DISPATCH BOARD — Live Operations Manual

**Version:** 2.0 | **Updated:** 2026-03-29 | **Platform:** OLOG + ShopSense

---

## Executive Summary

This is the **LIVE DISPATCH BOARD** for Ooru Logix's dual-AI orchestration system. It serves as the central command hub for:
- Running agents in the correct order
- Resolving agent conflicts
- Handling emergency situations
- Maintaining system health
- Tracking work through chunks

**Three roles use this document:**
1. **Vaishak (Founder)** — assigns chunks, makes decisions, reviews output
2. **Claude** — strategy, planning, architecture, code review
3. **Antigravity** — execution, building, UI/UX, testing, file operations

---

## Part 1: Agent Registry Table

All 22 agents with their properties, triggers, and outputs.

| # | Agent Name | Department | Platform | Trigger Event | Auto-Approve | Est. Time | Output Location |
|---|---|---|---|---|---|---|---|
| 01 | security-auditor | Quality | Either | PR opened, New API endpoint, Monthly audit | No (escalates) | 45min | `security-audit-report.md` |
| 02 | performance-optimizer | Engineering | Claude | Build time >10s, Bundle >800KB, React renders | No | 60min | `perf-report.md` + code fixes |
| 03 | accessibility-auditor | Quality | Antigravity | UI changed, New page added, Release prep | No | 30min | `accessibility-report.md` |
| 04 | seo-optimizer | Marketing | Antigravity | New page created, Meta tags missing, Launch | Yes | 20min | Updated HTML + `seo-checklist.md` |
| 05 | test-engineer | Quality | Antigravity | Before PR merge, Regression detected, Release | No | 90min | Test results + coverage report |
| 06 | docs-handler | Operations | Claude | API changed, Architecture shift, Release prep | Yes | 40min | `docs/` folder + TOC update |
| 07 | state-architect | Engineering | Claude | Global state used in 5+ places, Redux/Context conflict | No | 50min | `state-design-doc.md` + refactor plan |
| 08 | responsive-scaler | Engineering | Antigravity | Mobile breakpoint issue, CSS fails QA, New component | Yes | 35min | Fixed CSS + viewport config |
| 09 | animation-choreographer | Design | Antigravity | UX polish phase, Performance concerns, Brand refresh | Yes | 45min | Framer Motion configs + demo |
| 10 | component-librarian | Engineering | Antigravity | New component pattern, Design system drift, Release | Yes | 50min | Updated Storybook + registry |
| 11 | firebase-architect | Engineering | Claude | Schema change, Security rule review, New feature | No (escalates) | 60min | Firestore design doc + rules |
| 12 | firmware-bridge | Engineering | Claude | Hardware data mismatch, New board added, Integration test | No | 75min | Bridge code + test results |
| 13 | copywriter-agent | Marketing | Claude | Campaign launch, Homepage refresh, New product | Yes | 40min | Copy + captions + email draft |
| 14 | github-agent | Operations | Antigravity | PR queue buildup, CI/CD failure, Release blocked | No | 30min | PR review + merge automation |
| 15 | ui-designer | Design | Antigravity | Visual bug reported, Brand inconsistency, New feature | Yes | 45min | Updated Figma + CSS |
| 16 | wizard-architect | Engineering | Claude | Multi-step flow needed, Flow logic error, UX audit | No | 55min | Flow diagram + component spec |
| 17 | user-flow-logic | Product | Claude | User journey broken, Conversion drop, Onboarding test | No | 50min | Journey map + recommendations |
| 18 | 3d-scene-optimizer | Engineering | Antigravity | Three.js performance dip, WebGL error, New 3D asset | Yes | 60min | Optimized scene + perf metrics |
| 19 | agent-architect | Operations | Claude | New workflow needed, Process bottleneck, Tool gap | No (escalates) | 90min | New agent workflow file |
| 20 | architectural-synchronizer | Engineering | Claude | Code diverges from architecture, Multi-target mismatch | No | 70min | Sync report + alignment plan |
| 21 | jules-meta-loop | Operations | Either | Weekly maintenance window, Pre-release, Health check | No | 120min | Health report + fixes applied |
| 22 | onboarding | Operations | Antigravity | New dev joins, Project setup needed, Docs outdated | Yes | 45min | Onboarding checklist complete |

---

## Part 2: Dispatch Decision Matrix

**"I want to do X → Run agent Y"**

### By Task Category

| **I want to...** | **Primary Agent** | **Trigger This** | **Notes** |
|---|---|---|---|
| Fix a security bug | security-auditor | Manual + escalate | Always escalate findings to Vaishak |
| Improve page load time | performance-optimizer | Manual | Gathers metrics, identifies bottlenecks |
| Make site accessible (WCAG) | accessibility-auditor | Manual before release | Automated ARIA/keyboard audit |
| Fix mobile layout | responsive-scaler | Manual | Runs breakpoint checks, CSS updates |
| Optimize SEO for new page | seo-optimizer | Manual (auto-runs after) | Meta tags, OG, schema validation |
| Write marketing copy | copywriter-agent | Manual | Creates headlines, CTAs, email |
| Add a new React component | component-librarian → ui-designer | Manual | Ensures design system compliance |
| Test a feature before release | test-engineer | Manual (release gate) | Unit + integration tests required |
| Update API documentation | docs-handler | Manual | Keeps README and code in sync |
| Fix state management conflicts | state-architect | Manual | Analyzes global state usage |
| Add animations/motion | animation-choreographer | Manual | Framer Motion, performance-aware |
| Connect new IoT board | firmware-bridge | Manual | Validates hardware integration |
| Refactor Firebase rules | firebase-architect | Manual + escalate | Security-critical, needs review |
| Create a multi-step wizard | wizard-architect | Manual | Flow diagrams, component specs |
| Analyze user journey | user-flow-logic | Manual | Conversion funnels, drop-off points |
| Optimize Three.js/WebGL | 3d-scene-optimizer | Manual | Render perf, memory optimization |
| Review PR queue | github-agent | Automated (daily) | Checks for merge conflicts, stale PRs |
| Run system health check | jules-meta-loop | Scheduled (weekly) | 4-phase sweep: code → docs → git → deploy |
| Design new agent workflow | agent-architect | Manual + escalate | Complex orchestration, needs strategy |
| Sync code to architecture | architectural-synchronizer | Manual (pre-release) | Cross-target alignment, pattern check |
| Onboard new developer | onboarding | Manual (when hired) | Setup, tooling, context, first task |

### By File Type Changed

| **File Type** | **Agent to Run** | **Auto-Trigger** |
|---|---|---|
| `.tsx` (React component) | ui-designer → component-librarian | accessibility-auditor |
| `.ts` (business logic) | performance-optimizer | test-engineer |
| `.md` (documentation) | docs-handler | No |
| `.css` / Tailwind | responsive-scaler | No |
| Firestore rule | firebase-architect | security-auditor |
| API endpoint | security-auditor | test-engineer |
| Marketing copy | copywriter-agent | seo-optimizer |
| GitHub workflow | github-agent | test-engineer |
| Agent workflow file | agent-architect | No |
| Schema / DB | state-architect | firebase-architect |

---

## Part 3: Session Startup Checklist

**Every agent must perform these steps at the start of a session:**

### ✓ Checkpoint 1: Memory Refresh (5 minutes)
- [ ] Read `PROGRESS.md` — understand completed chunks and current state
- [ ] Read `PROJECT_MEMORY.md` — load project context and decisions
- [ ] Read `company/agent-orchestration/AGENT_INSTRUCTIONS.md` — understand handoff protocol
- [ ] Scan `/company/obsidian/` vault for latest company decisions

### ✓ Checkpoint 2: Work Assignment (2 minutes)
- [ ] Identify the next `⬜ PENDING` chunk in PROGRESS.md
- [ ] Note its title, scope, and any dependencies
- [ ] Check for blockers marked `⏸️ BLOCKED` — these need Vaishak decision
- [ ] If no pending chunk, ask Vaishak for next task assignment

### ✓ Checkpoint 3: Environment Validation (3 minutes)
- [ ] Verify Git repository status: `git status`
- [ ] Confirm branch is `main` or `dev` (NOT a detached state)
- [ ] Check `.env.local` exists and has required keys
- [ ] Verify `node_modules` is clean: `npm list` (no unresolved dependencies)

### ✓ Checkpoint 4: Conflict Check (3 minutes)
- [ ] Search PROGRESS.md for concurrent work on same files
- [ ] Check if another agent left a `🔄 IN PROGRESS` marker
- [ ] If conflict exists, escalate to Vaishak via note

### ✓ Checkpoint 5: Dependencies (2 minutes)
- [ ] If chunk depends on another, verify dependency is `✅ COMPLETE`
- [ ] If dependency is `⏸️ BLOCKED`, wait or escalate
- [ ] If dependency is `🔄 IN PROGRESS`, coordinate with other agent

### ✓ Checkpoint 6: Output Setup (1 minute)
- [ ] Create output directory for this chunk if needed
- [ ] Ensure write permissions to `company/` and `.agent/` folders
- [ ] Note the expected output file (from PROGRESS.md)

---

## Part 4: Chunk Execution Protocol

**How to execute a chunk from start to finish.**

### Phase A: Claim & Prepare (5 minutes)

1. Update PROGRESS.md:
   ```markdown
   | C-XX | Title | 🔄 IN PROGRESS | Agent Name | 2026-03-29 | [Brief note] |
   ```
   Commit this change: `git commit -m "chore: start chunk C-XX"`

2. Create a working branch if major code changes:
   ```bash
   git checkout -b feature/c-xx-title
   ```

3. Document your plan in a scratch file (if complex):
   ```
   /company/scratch/C-XX-plan.md
   ```

### Phase B: Execute (variable)

1. **Break work into sub-tasks** — use the agent's workflow file (e.g., `/security-auditor.md`)
2. **Test frequently** — don't accumulate changes before validating
3. **Update memory incrementally** — if a sub-task completes, log it
4. **Communicate blockers early** — don't wait until the end

### Phase C: Validate (10 minutes)

Before marking complete:

- [ ] All code passes TypeScript: `npm run build` (should have 0 errors)
- [ ] No new console warnings: `npm run dev` and check console
- [ ] Git history is clean: `git log --oneline -5` (conventional commits)
- [ ] No files left untracked: `git status` (should show clean or staged changes)
- [ ] All output files created and in correct locations
- [ ] No secrets leaked: grep for API keys, tokens, passwords

### Phase D: Handoff (5 minutes)

1. **Merge branch (if created):**
   ```bash
   git checkout main
   git merge feature/c-xx-title
   ```

2. **Update PROGRESS.md:**
   ```markdown
   | C-XX | Title | ✅ COMPLETE | Agent Name | 2026-03-29 | [Handoff summary] |
   ```

3. **Write handoff note** (see template below):
   ```markdown
   ## 🔄 Handoff Note (C-XX → C-YY)
   **From:** [Claude/Antigravity]
   **To:** [Next Agent]
   **Done:** [What was delivered]
   **Next:** [What C-YY should do]
   **Blockers:** [Any issues]
   **Files:** [List of changed files]
   ```

4. **Commit and push:**
   ```bash
   git add PROGRESS.md
   git commit -m "chore: complete chunk C-XX (handoff to [next])"
   git push origin main
   ```

### Output Validation Checklist

Before handoff, verify:

| Item | Check | Status |
|---|---|---|
| Feature works as specified | Run manual test | ✓ |
| No TypeScript errors | `npm run build` | ✓ |
| No security issues | grep for secrets | ✓ |
| Documentation updated | Relevant .md files | ✓ |
| Git history clean | 5-10 conventional commits | ✓ |
| All output files created | Per PROGRESS.md | ✓ |
| No untracked files | `git status` clean | ✓ |
| Tests passing (if tests written) | `npm run test` | ✓ |

---

## Part 5: Agent Conflict Resolution

**What to do if two agents edited the same file.**

### Scenario 1: Concurrent Edit (One file, two agents)

**Symptom:** Both Claude and Antigravity modified `components/Button.tsx` in their last sessions.

**Resolution:**
1. **DO NOT MERGE immediately** — identify the conflict
2. Run: `git log --oneline --graph -- components/Button.tsx`
3. Review both changes: `git diff <commit1> <commit2> -- components/Button.tsx`
4. Choose the approach:
   - **Merge semantically:** Keep both changes if they don't overlap
   - **Use one version:** If conflicting, pick the better one and document why
   - **Escalate:** If unclear, add to PROGRESS.md as blocker for Vaishak

Example:
```markdown
## ⚠️ Conflict: Button.tsx

**Claude's change (C-25):** Added loading state animation
**Antigravity's change (C-26):** Refactored accessibility props

**Resolution:** Merge both — Claude's animation uses Antigravity's accessible button base.
**Commit:** `git merge --no-ff feature/c-26-button-a11y` with merge commit message
```

### Scenario 2: File Lock (Needed by multiple agents)

**Symptom:** Agent A is working on `state.ts`, but Agent B needs to add a new reducer.

**Solution:**
1. Check PROGRESS.md — is Agent A's chunk still `🔄 IN PROGRESS`?
2. **YES:** Wait for Agent A to finish. Document in your chunk: `⏸️ BLOCKED (waiting for C-XX)`
3. **NO (stale):** Check the last timestamp. If >4 hours old, escalate to Vaishak
4. **Move to different file:** If independent, split the work:
   - Agent A: `state/user.ts`
   - Agent B: `state/vault.ts`

### Scenario 3: Memory File Conflict (PROGRESS.md)

**Symptom:** Both agents tried to update PROGRESS.md simultaneously.

**Prevention:** Memory files are APPEND-ONLY during active work.

**Resolution (if it happens):**
```bash
git pull origin main  # Get latest
# If conflict, edit PROGRESS.md — keep ALL entries, resolve timestamps
git add PROGRESS.md
git commit -m "chore: resolve PROGRESS.md conflict"
git push origin main
```

---

## Part 6: Health Check Runbook

**Run this weekly (or before major release) to ensure system health.**

**Duration:** ~2 hours | **Agent:** `jules-meta-loop` OR manual

### Week 1: Code Health
```bash
# Check for TypeScript errors
npm run build 2>&1 | tee build-health.log

# Check for unused imports
npx eslint --max-warnings 0 . 2>&1 | tee lint-health.log

# Check for console warnings
npm run dev &
# (load every page manually, screenshot console)

# Check for dead routes
grep -r "useNavigate\|Link to=" src/ | grep -i "404\|undefined"
```

**Output:** `health-reports/code-health-week1.md`

### Week 2: Documentation Health
```bash
# Check Obsidian vault consistency
# (Verify every .md file in company/obsidian/ is findable and linked)

# Check code comments match implementation
grep -r "TODO\|FIXME\|HACK" src/ | tee todos.md

# Check README is up to date
# (Last updated date, feature list accuracy)
```

**Output:** `health-reports/docs-health-week2.md`

### Week 3: Architecture Health
**Run:** `architectural-synchronizer` agent

```bash
# Check all component exports are in index files
find src/components -name "index.ts" | wc -l

# Check state shape matches reality
grep -r "interface.*State" src/ | wc -l

# Check test coverage
npm run test -- --coverage 2>&1 | grep "Lines\|Branches"
```

**Output:** `health-reports/architecture-health-week3.md`

### Week 4: Deployment Health
**Run:** `github-agent` + `firebase-architect`

```bash
# Check Firebase security rules
# (Review rules in Firestore console — match src/firebase/rules)

# Check environment variables
# (All secrets in .env.local, nothing in code)

# Check Git history
git log --oneline -20 | grep -i "fix\|feature\|chore"

# Check CI/CD status
# (GitHub Actions last 10 runs — all green?)
```

**Output:** `health-reports/deployment-health-week4.md`

### Summary Report

Combine all four reports:
```markdown
# System Health Report — Week of [DATE]

## Code ✅ / ⚠️ / 🔴
- TypeScript errors: 0
- Lint warnings: 2 (non-critical)
- Unused imports: 1 file
- Dead routes: None
- Console errors on homepage: None

## Docs ✅ / ⚠️ / 🔴
- Obsidian vault: 20 files, all linked
- TODOs in code: 3 (tracked in backlog)
- README: Updated 2026-03-25 ✅

## Architecture ✅ / ⚠️ / 🔴
- Component exports: All indexed ✅
- State shape: Matches interfaces ✅
- Test coverage: 74% (target: 80%)

## Deployment ✅ / ⚠️ / 🔴
- Firebase rules: Synced ✅
- Env secrets: Secure ✅
- Git history: Clean ✅
- CI/CD: Last 10 runs all green ✅

## Action Items
1. [If any issues detected]
2. [Priority by impact]

## Approved By
Vaishak — [Date]
```

---

## Part 7: Trigger → Agent Mapping

**Automatic + manual triggers that fire agents.**

### GitHub-Based Triggers

| Trigger | Agent(s) | Auto-Run | When |
|---|---|---|---|
| PR opened | test-engineer → security-auditor | No | Any .ts/.tsx/.json change |
| PR labeled `a11y` | accessibility-auditor | Yes | Auto-runs, blocks merge if issues |
| PR labeled `security` | security-auditor | Yes | Auto-runs, escalates to Vaishak |
| Commit to `main` | github-agent (merge log) | Yes | Logs PR summary for review |
| Release tag created | test-engineer → github-agent | No | Triggers release build |

### Time-Based Triggers

| Schedule | Agent(s) | Task |
|---|---|---|
| Weekly (Monday 09:00) | jules-meta-loop | Full system health check |
| Monthly (1st) | security-auditor | Complete codebase security audit |
| Before release | All QA agents | Pre-release gate checklist |
| When hired | onboarding | New dev setup |

### Manual Triggers

| Command | Agent | Use |
|---|---|---|
| `npm run audit:perf` | performance-optimizer | Check load time / bundle |
| `npm run audit:a11y` | accessibility-auditor | WCAG compliance check |
| `npm run audit:seo` | seo-optimizer | Meta tags and schema |
| `npm run audit:security` | security-auditor | Secrets and vulnerabilities |
| `npm run test` | test-engineer | Unit + integration tests |

---

## Part 8: Memory File Protocol

**How to update PROGRESS.md and PROJECT_MEMORY.md correctly.**

### PROGRESS.md — Chunk Tracker

**Purpose:** Track all chunks (C-XX) from start to completion.

**When to update:**
- Start a chunk: Mark as `🔄 IN PROGRESS`
- Complete a chunk: Mark as `✅ COMPLETE`, add date
- Block a chunk: Mark as `⏸️ BLOCKED`, add reason

**Format (always append to the table):**
```markdown
| C-XX | Title | Status | Agent | Date | Notes |
|------|-------|--------|-------|------|-------|
```

**Example:**
```markdown
| C-27 | Firebase Rules Refactor | ✅ COMPLETE | Claude | 2026-03-29 | Split rules by collection, improved performance |
| C-28 | ShopSense Dash Update | 🔄 IN PROGRESS | Antigravity | 2026-03-29 | Building real-time stats panel |
| C-29 | Archive Old Customers | ⏸️ BLOCKED | — | — | Waiting for Vaishak to approve data deletion policy |
```

**Handoff note (always append after completing a chunk):**
```markdown
---
## 🔄 Handoff Note (C-XX → C-YY)
**From:** Claude
**To:** Antigravity
**What was done:**
- Created security audit report (12 findings, 2 critical)
- Patched Firebase rules to use `.uid` validation
- Updated security.md with new best practices

**What's next:**
- C-YY: Implement rate limiting on auth endpoints
- Depends on: Firebase rules deployed (C-XX complete) ✅

**Blockers:**
- None

**Files changed:**
- `firebase/rules/firestore.rules`
- `company/obsidian/engineering/Security.md`
- `security-audit-report.md`
```

### PROJECT_MEMORY.md — Context & Decisions

**Purpose:** Persistent context that doesn't change per chunk.

**Update when:**
- Architecture decision is made
- New team member joins
- Tool/tech stack changes
- Project scope shifts

**Format:**
```markdown
## [Topic] — [Last Updated: DATE]
- **Decision:** [What was chosen]
- **Why:** [Rationale]
- **Impact:** [What changed]
- **Status:** [Active/Deprecated/Under Review]
```

**Example:**
```markdown
## Database Choice — Last Updated: 2026-03-25

- **Decision:** Firestore (Google Cloud)
- **Why:** Real-time sync, built-in auth, good free tier
- **Impact:** All queries must use `.where()` chaining, no complex joins
- **Status:** Active, decision final

**Alternatives considered:**
- PostgreSQL: Too much ops overhead for early stage
- MongoDB: Atlas pricing higher, less real-time support
```

---

## Part 9: Emergency Procedures

**What to do when things go wrong.**

### Emergency 1: Build Fails (`npm run build` errors >5)

**Symptom:** TypeScript compilation errors, code won't run.

**Immediate Actions:**
```bash
git status  # Check what changed
git log --oneline -3  # Check recent commits
npm install  # Rebuild node_modules
npm run build  # Get full error list
```

**Resolution Path:**
1. **If errors are in your current chunk:** Fix them. That's your job.
2. **If errors appeared after someone else's commit:**
   - Add blocker to PROGRESS.md: `⏸️ BLOCKED (build broken by C-XX)`
   - Notify other agent via note
   - Revert their commit: `git revert <commit-hash>`
   - Escalate to Vaishak

**Example:**
```markdown
## ⚠️ Emergency: Build Broken

**Error:** `Type 'User' not found in state.ts:45`
**Cause:** C-26 deleted UserState interface
**Action:** Reverted C-26, added to blocker list
**Next:** Merge C-26 properly (needs state audit first)

Commit: `git revert abc123def`
```

### Emergency 2: Agent Conflict (Two agents modifying same file)

**Symptom:** Git merge conflict, PROGRESS.md shows two agents on same file.

**Resolution:**
1. Check timestamps in PROGRESS.md
2. Determine which agent started first (has priority)
3. Second agent should `⏸️ BLOCK` and wait
4. First agent merges, second agent rebases

**Example:**
```bash
git rebase origin/main  # Get latest changes
# Resolve conflicts in your favor
git add .
git rebase --continue
git push origin feature/c-xx-title --force-with-lease
```

### Emergency 3: Secret Leaked (API key in code)

**Symptom:** API key, password, or token committed to Git.

**Immediate Actions:**
1. **DO NOT PUSH** — stop immediately
2. Check if pushed already: `git log --oneline -5 | grep push`
3. **If not pushed yet:**
   ```bash
   git reset HEAD~1  # Undo the commit
   git checkout -- <file>  # Remove the secret
   echo "SECRET" >> .env.local  # Move to .env
   git add .
   git commit -m "chore: remove secret, use .env"
   ```
4. **If already pushed:**
   - Escalate to Vaishak immediately
   - Rotate the compromised key in production
   - Force-push to remove history: `git push origin main --force-with-lease`
   - Add to `.gitignore`: patterns for any file with secrets

**Example:**
```markdown
## 🚨 Emergency: Firebase Key Leaked

**File:** src/config/firebase.ts (line 12)
**Status:** Committed and pushed to origin/main
**Action Taken:**
1. Revoked old Firebase key in Google Cloud Console
2. Generated new key
3. Force-pushed cleaned history
4. Updated .env.local with new key

**Commit:** `git push origin main --force-with-lease`
**Blocker:** All developers must pull and update .env.local
```

### Emergency 4: Data Loss / Accidental Delete

**Symptom:** File deleted, directory removed, or data structure corrupted.

**Recovery:**
```bash
git reflog  # See all recent commits
git checkout <commit-hash> -- <file>  # Restore file from old commit
git add <file>
git commit -m "chore: restore deleted file"
```

**If database:** Firestore has automatic backups (Google Cloud). Escalate to Vaishak.

### Emergency 5: Memory File Corruption

**Symptom:** PROGRESS.md or PROJECT_MEMORY.md has conflicting/invalid entries.

**Recovery:**
```bash
git log --oneline PROGRESS.md | head -5
git show <commit-hash>:PROGRESS.md > temp.md  # Show old version
# Compare and keep correct version
git checkout -- PROGRESS.md
# Manually re-add your updates
git add PROGRESS.md
git commit -m "chore: restore PROGRESS.md integrity"
```

### Emergency 6: CI/CD Pipeline Broken

**Symptom:** GitHub Actions failing, deployment blocked.

**Triage:**
1. Check GitHub Actions tab for error message
2. Check the workflow file: `.github/workflows/main.yml`
3. **If test failure:** Run `npm run test` locally to reproduce
4. **If deploy failure:** Check Firebase/Vercel console for actual error

**Resolution:**
```bash
# Fix locally, test, commit
npm run test
git add .
git commit -m "fix(ci): [describe the issue]"
git push origin main
```

### Emergency 7: Agent Memory Loss (Session timeout)

**Symptom:** Agent asks "what were we working on?" or memory file is blank.

**Recovery:**
1. Check PROGRESS.md for last active chunk
2. Check Git history: `git log --oneline -10`
3. Check last handoff note in PROGRESS.md
4. Ask Vaishak for context if unclear

**Prevention:**
- Read PROGRESS.md first thing every session
- Leave detailed handoff notes
- Commit often (not just at chunk end)

---

## Part 10: Success Criteria

An agent is doing their job correctly when:

- [ ] Reads memory files before starting work
- [ ] Claims chunks explicitly in PROGRESS.md
- [ ] Builds succeed with zero errors
- [ ] All output files are created and validated
- [ ] Commit history is clean (conventional commits)
- [ ] Handoff notes are detailed and actionable
- [ ] No merge conflicts left unresolved
- [ ] No secrets leaked
- [ ] No untracked files left behind
- [ ] Next agent can pick up immediately without questions

---

## Quick Reference Commands

```bash
# Start a chunk
git checkout -b feature/c-xx-description
# ... do work ...
git add .
git commit -m "feat(c-xx): description"

# Update memory before committing
# (edit PROGRESS.md, add handoff note)

# Finish a chunk
git checkout main
git merge feature/c-xx-description
git push origin main

# Emergency: revert last commit
git revert HEAD

# Emergency: check what changed
git diff origin/main

# Health check: build test
npm run build

# Health check: lint
npx eslint . --max-warnings 0
```

---

## File Structure Reference

```
olog antigrav v1/
├── PROGRESS.md                          ← Chunk tracker (append-only)
├── PROJECT_MEMORY.md                    ← Context & decisions
├── company/
│   ├── agent-orchestration/
│   │   ├── AGENT_DISPATCH.md           ← YOU ARE HERE
│   │   ├── AGENT_INSTRUCTIONS.md       ← Handoff protocol
│   │   └── ORCHESTRATION_MASTER.md     ← Architecture
│   ├── obsidian/                        ← Company vault
│   │   ├── agents/                      ← Agent profile cards (22 files)
│   │   └── ...
│   └── marketing/
├── .agent/
│   └── workflows/                       ← 22 agent definitions
└── src/                                 ← Application code
```

---

## Support & Escalation

| Issue | Escalate To | Method |
|---|---|---|
| Confused about next chunk | Vaishak | Add note to PROGRESS.md |
| Blocker on architectural decision | Vaishak | Mark chunk `⏸️ BLOCKED` + detailed reason |
| Potential security issue | Vaishak | Flag immediately, DO NOT MERGE |
| Merge conflict with other agent | Other agent first, then Vaishak | Message in PROGRESS.md |
| Performance degradation detected | Vaishak + performance-optimizer | Create issue, run agent |
| New tech stack question | Vaishak + claude | Discuss in PROJECT_MEMORY.md |

---

**Version History:**
- v2.0 (2026-03-29): Generalized for OLOG + ShopSense, added emergency procedures
- v1.0 (2026-03-08): Initial AurumGuard firmware version

**Tags:** #dispatch #operations #protocol #orchestration

