# 📅 Daily Standup Protocol — Ooru Logix

## Overview

Every work session (whether human or AI) follows this protocol to maintain memory continuity and prevent drift.

---

## Standup Flow (5 minutes)

### 1. Read Memory (30 seconds)
```
Read: PROGRESS.md → PROJECT_MEMORY.md → company/obsidian/Home.md
```

### 2. Check Status (1 minute)
- What chunks are ✅ COMPLETE since last session?
- What chunks are 🔄 IN PROGRESS?
- Are there any ⏸️ BLOCKED items?
- Any handoff notes from the other AI agent?

### 3. Plan Session (2 minutes)
- What's the highest priority ⬜ PENDING chunk?
- Does Vaishak have any override assignments?
- What tools/files will be needed?

### 4. Claim & Execute (1 minute)
- Mark the chunk as 🔄 IN PROGRESS in PROGRESS.md
- Add agent name (Claude/Antigravity) and date
- Begin execution

### 5. End-of-Session Update (1 minute)
- Mark completed chunks as ✅ COMPLETE
- Write handoff note if work continues
- Define next chunks if scope expanded
- Update any modified file references

---

## Session Types

### Engineering Session
```
Focus: Code changes, feature building, bug fixes
Tools: IDE, terminal, browser
Files: src/, components/, pages/
Update: PROGRESS.md, relevant docs
```

### Marketing Session
```
Focus: Content creation, social media, outreach
Tools: Writing, image generation, browser
Files: company/marketing/, company/obsidian/marketing/
Update: Content calendar status
```

### Operations Session
```
Focus: Infrastructure, deployment, documentation
Tools: Terminal, file management
Files: company/obsidian/operations/, docs/
Update: PROGRESS.md, operational docs
```

### Strategy Session
```
Focus: Planning, architecture decisions, research
Tools: Research, analysis, writing
Files: company/obsidian/, architecture docs
Update: Company vault, PROGRESS.md
```

---

## Agent-Specific Protocols

### Claude Session Start
```
1. Read PROGRESS.md
2. Check for Antigravity handoff notes
3. Review any Vaishak comments in chat
4. Pick highest-priority strategic/planning task
5. Execute with focus on reasoning and quality
```

### Antigravity Session Start
```
1. Read PROGRESS.md
2. Check for Claude handoff notes
3. Review any Vaishak comments in chat
4. Pick highest-priority execution/building task
5. Execute with focus on speed and shipping
```

---

## Emergency Protocols

### If Agents Conflict on Same File
1. STOP immediately
2. Add ⚠️ note to PROGRESS.md
3. Vaishak resolves conflict manually
4. Loser rewrites their changes on top of winner

### If Critical Bug Found
1. Mark as 🔴 CRITICAL in PROGRESS.md
2. Create emergency chunk: C-XX-HOTFIX
3. Drop current work, fix immediately
4. Document root cause

### If Vaishak Is Unavailable
1. Continue only on ⬜ PENDING chunks marked "auto-approve"
2. Never deploy to production
3. Never modify authentication/security
4. Document all work done for review

---

## Tags
#operations #standup #protocol #daily
