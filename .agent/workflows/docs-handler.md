---
description: Final documentation sweep — runs after all code changes to ensure docs stay consistent
---

# Node 51: Docs Handler Agent (Final Pass)

This workflow runs **after all code/cloud fixes are complete** to ensure every documentation file accurately reflects the current state of the codebase. It is the final step before any git commit.

## When to Run
- After ANY code fix session (firmware, cloud, or infrastructure)
- After ANY new file is created
- Before ANY commit to GitHub

## Checklist

### 1. Audit Report Sync
// turbo
Check that all audit reports reflect the current fix status:
```powershell
git diff --name-only HEAD~1 | Select-String "docs/audits/"
```
- If audit files were modified, verify fix labels match the code comments
- If new findings were resolved, update the relevant audit report tables

### 2. Cross-Reference Validation
For every file modified in this session:
- Check if the file is referenced in any `.md` documentation
- If the file's behavior changed, update the referencing docs
- Key docs to check:
  - `README.md` — repo structure, getting started
  - `docs/specifications/Master_Project_Outline.md` — status tables
  - `docs/specifications/Project_Timeline.md` — sprint deliverables
  - `docs/onboarding/Firmware_Engineer_Onboarding.md` — file paths, baud rates
  - `docs/hardware/C-25_PCB_Specs_BOM.md` — component specs
  - `docs/hardware/C-38_FCC_CE_Compliance_Guide.md` — regulatory status
  - `PROGRESS.md` — build tracker

### 3. New File Registration
For every NEW file created:
- Add to `README.md` repo structure tree if it's a major file
- Add to `Master_Project_Outline.md` repository map if applicable
- If it's a new spec, reference it from `docs/specifications/` index
- If it's a new audit, link from `PROGRESS.md`

### 4. Fix Label Consistency
Scan all modified files for fix labels (e.g., `H-01 FIX`, `Node 27 FIX`):
```powershell
git diff --unified=0 | Select-String "(H-\d+|M-\d+|L-\d+|C-\d+|Node \d+) FIX"
```
- Verify each fix label matches the canonical audit report numbering
- If Claude or another agent renumbered fixes, update audit reports to match

### 5. V7 Swarm Consistency Check
If any agent spec was modified:
- Verify `AG_Agent_Swarm_V7_Unified.md` is still the canonical reference
- Check that no older V1-V6 spec was edited instead of V7
- Rule: **If V7 contradicts any older file, V7 wins. Always.**

### 6. Handoff Document Update
After all fixes, update or create a handoff summary:
- What was fixed in this session
- What remains for the next session
- Any new cascading issues discovered
- Update `docs/audits/V5_V7_HANDOFF_FOR_ANTIGRAVITY.md` if applicable

### 7. PROGRESS.md Update
Add a bullet point to PROGRESS.md summarizing:
- Number of fixes applied
- Files modified
- Agent nodes that contributed
- Remaining work count

### 8. Final Git Status Check
// turbo
Before committing, verify no untracked files were forgotten:
```powershell
git status --short
```
- All new files should be staged
- No temporary/scratch files should be committed
- `.gitignore` should cover build artifacts

## Output
After running this workflow, the documentation should be:
- ✅ Consistent with all code changes
- ✅ All fix labels matching audit reports
- ✅ All new files registered in docs
- ✅ PROGRESS.md updated
- ✅ Ready for clean git commit
