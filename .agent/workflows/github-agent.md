---
description: GitHub repository health agent — ensures repo organization, CI/CD, and GitHub-specific files are complete and current
---

# Node 52: GitHub Repository Agent

This workflow ensures the GitHub repository is professionally organized, all GitHub-specific files are present and updated, and the commit/push workflow follows best practices. Run this after significant changes or before any major release milestone.

## When to Run
- After creating new directories or major files
- Before tagging a release
- After any sprint milestone
- When the user says "push to GitHub" or "update GitHub"

## Pre-Flight Checks

### 1. Verify .gitignore Completeness
// turbo
```powershell
git status --short | Select-String "^\?\?"
```
- Ensure no build artifacts, IDE files, or secrets are being tracked
- Check for `node_modules/`, `.pio/`, `cdk.out/`, `*.env`, `*.key`, `*.pem` patterns
- Verify `desktop.ini` is gitignored (Windows artifact)

### 2. Clean Tracked desktop.ini Files
// turbo
Check for tracked `desktop.ini` files that shouldn't be in the repo:
```powershell
git ls-files | Select-String "desktop.ini"
```
If any are found, remove them:
```powershell
git rm --cached desktop.ini **/desktop.ini 2>$null
```

### 3. Verify GitHub Metadata Files
Check that these files exist in the repo root:
- `README.md` — Project overview with build instructions
- `.gitignore` — Comprehensive ignore rules
- `LICENSE` — Appropriate license for the project
- `CONTRIBUTING.md` — Contribution guidelines
- `SECURITY.md` — Security vulnerability reporting
- `.github/ISSUE_TEMPLATE/bug_report.md` — Bug report template
- `.github/ISSUE_TEMPLATE/feature_request.md` — Feature request template
- `.github/pull_request_template.md` — PR template
- `.github/CODEOWNERS` — Code ownership for reviews

### 4. Verify README Quality
The README must include:
- [ ] Project title and description
- [ ] Architecture overview
- [ ] Repository structure tree
- [ ] Build/compile instructions for all targets
- [ ] Link to onboarding docs
- [ ] Link to project timeline
- [ ] Badge/status indicators (optional)

### 5. Commit Message Quality
All commits should follow this convention:
```
<SCOPE>: <SUMMARY> (max 72 chars)

<BODY — what changed and why>

<FILES — key files modified>
```

Valid scopes: `FIX`, `FEAT`, `DOCS`, `REFACTOR`, `SEC`, `CLOUD`, `FW`, `HW`, `AUDIT`, `CI`

### 6. Branch Hygiene
// turbo
```powershell
git branch -a
```
- `master` / `main` — production-ready code
- Feature branches should be deleted after merge
- No stale branches older than 30 days

### 7. Tag Milestones
Major milestones should be tagged:
```
v0.1.0 — First MQTT heartbeat (Sprint 3)
v0.2.0 — First fingerprint unlock (Sprint 5)
v0.3.0 — ATECC608B provisioned (Sprint 7)
v0.4.0 — 10 units assembled (Sprint 11)
v1.0.0 — Investor Demo Day (Sprint 12)
```

### 8. Security Scan
Ensure no secrets are committed:
// turbo
```powershell
git log --all --diff-filter=A --summary | Select-String -Pattern "\.(key|pem|env|secret|credential)" -CaseSensitive:$false
```
- No API keys, certificates, or secrets in the repo
- All secrets should be in AWS Secrets Manager or environment variables
- `.env` files must be in `.gitignore`

### 9. Final Push Verification
// turbo
After pushing, verify the remote is up to date:
```powershell
git log --oneline -5
```
- Confirm latest commit hash matches what was just pushed
- Verify commit message is descriptive

## Output
After running this workflow, the GitHub repository should be:
- ✅ All metadata files present (README, LICENSE, CONTRIBUTING, SECURITY, templates)
- ✅ .gitignore comprehensive and no artifacts tracked
- ✅ No secrets in commit history
- ✅ Clean commit messages with proper scopes
- ✅ Release tags on milestones
- ✅ desktop.ini files removed from tracking
