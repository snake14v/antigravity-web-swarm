# 🔧 Agent Orchestration — Instructions for Claude & Antigravity

## For AI Agents: How to Operate at Ooru Logix

This file contains the exact instructions that both Claude and Antigravity must follow when working in the Ooru Logix workspace.

---

## MANDATORY: Session Start Procedure

```
STEP 1: Read these files (in order):
  → c:\Users\VAISHAK\olog antigrav v1\PROGRESS.md
  → c:\Users\VAISHAK\olog antigrav v1\PROJECT_MEMORY.md
  → c:\Users\VAISHAK\olog antigrav v1\company\agent-orchestration\ORCHESTRATION_MASTER.md

STEP 2: Check the Chunk Status table in PROGRESS.md
  → Find the next ⬜ PENDING chunk
  → Check for any handoff notes from the other agent

STEP 3: If Vaishak has given a specific task in chat:
  → Override chunk order
  → Execute Vaishak's task first
  → Track it as a new chunk in PROGRESS.md

STEP 4: Claim the chunk
  → Mark it as 🔄 IN PROGRESS
  → Add your agent name (Claude or Antigravity)
  → Add current date

STEP 5: Execute the chunk
  → Use available tools and workflows
  → Follow the .agent/workflows/ definitions
  → Stay within the chunk scope

STEP 6: Completion
  → Mark chunk as ✅ COMPLETE in PROGRESS.md
  → Write a handoff note if work continues
  → Define next chunks if needed
```

---

## File Ownership Rules

### Sacred Files (Append-Only During Active Work)
- `PROGRESS.md` — Only append new chunk entries, never delete old ones
- `PROJECT_MEMORY.md` — Only add new context, never remove existing

### Shared Files (Both Agents Can Modify)
- `company/obsidian/**` — All Obsidian vault files
- `company/marketing/**` — All marketing content
- `company/agent-orchestration/**` — Orchestration docs
- `.agent/workflows/**` — Agent workflow definitions

### Code Files (Claim Before Editing)
- `pages/*.tsx` — Claim in PROGRESS.md before editing
- `components/*.tsx` — Claim in PROGRESS.md before editing
- `services/*.ts` — Claim in PROGRESS.md before editing
- Only one agent edits a file at a time

---

## Chunk Naming Convention

```
C-XX       → Regular sequential chunk
C-XX-FIX   → Bug fix for chunk C-XX
C-XX-HOT   → Hotfix (critical, drop everything)
C-MKT-XX   → Marketing chunk
C-DOC-XX   → Documentation chunk
C-OPS-XX   → Operations chunk
```

---

## Handoff Note Template

When ending a session, always leave a handoff note:

```markdown
---
## 🔄 Handoff Note (C-XX)
**Agent:** [Claude/Antigravity]
**Timestamp:** [ISO 8601]
**Status:** [Complete/Partial/Blocked]

### Done:
- [List of completed items]

### Remaining:
- [List of items still pending]

### For Next Agent:
- [Specific instructions or context]

### Blockers:
- [Any decisions needed from Vaishak]

### Files Modified:
- [Exact file paths changed]
---
```

---

## When to Escalate to Vaishak

### Always Escalate:
- [ ] Production deploy decisions
- [ ] Firebase security rule changes
- [ ] Authentication flow modifications
- [ ] API key or secret handling
- [ ] Financial decisions
- [ ] Client-facing communication
- [ ] Hiring decisions
- [ ] Legal/compliance issues

### Auto-Approve (Agent Can Decide):
- [x] Bug fixes in non-auth code
- [x] Documentation updates
- [x] Marketing content drafts (Vaishak reviews before publish)
- [x] New Obsidian files
- [x] Dependency updates (minor versions)
- [x] Code formatting/refactoring
- [x] New test files

---

## Platform-Specific Instructions

### Claude (Anthropic)
```
Strengths: Deep reasoning, architecture, code review, writing
Best for: Planning, strategy, complex debugging, marketing copy
Limitations: Cannot create images, limited browser interaction

Priority tasks:
1. Architecture decisions
2. Code review
3. Marketing copy
4. Research and analysis
5. Documentation strategy
```

### Antigravity (Gemini/DeepMind)
```
Strengths: Fast execution, file operations, browser tools, image generation
Best for: Building features, creating files, visual testing, UI work
Capabilities: Generate images, browse websites, run commands

Priority tasks:
1. Feature implementation
2. File creation (code, docs, config)
3. UI/UX design and testing
4. Image generation for marketing
5. Build verification
```

---

## Cross-Reference: ShopSense Project

When working on ShopSense (ChaiSense codebase):
```
Location: C:\Users\VAISHAK\Downloads\chaisense\chaisense\
Obsidian Vault: C:\Users\VAISHAK\Downloads\chaisense\chaisense\docs\obsidian\
README: C:\Users\VAISHAK\Downloads\chaisense\chaisense\README.md
Handoff: C:\Users\VAISHAK\Downloads\chaisense\chaisense\COWORK_HANDOFF.md
```

---

## Emergency Procedures

### Build Failure
1. Check `build-log.txt` for last known good state
2. Run `npm run lint` to find TS errors
3. Fix errors
4. Verify with `npm run build`
5. Document fix in PROGRESS.md

### Agent Conflict (Same File Edited by Both)
1. STOP work immediately
2. Note in PROGRESS.md: "⚠️ CONFLICT on [filename]"
3. Vaishak resolves using git diff
4. Second agent rebases their changes

### Memory Corruption (PROGRESS.md Broken)
1. Check git history: `git log PROGRESS.md`
2. Restore from last good commit
3. Reconstruct missing entries from conversation history
4. Add integrity note

---

## Tags
#instructions #protocol #agents #orchestration
