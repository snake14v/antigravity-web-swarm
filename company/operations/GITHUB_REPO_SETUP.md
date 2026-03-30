# GitHub Private Repository Setup

**Status:** gh CLI not available in environment
**Alternative:** Manual setup instructions below

---

## Prerequisites

Before starting, ensure you have:
1. GitHub account at https://github.com (use vaishakrn or xgo3d account)
2. Git installed locally (`git --version`)
3. SSH key configured for GitHub (or use HTTPS with personal access token)

---

## Step 1: Create Repository on GitHub

1. Go to https://github.com/new
2. **Repository name:** `ooru-logix-company-architecture`
3. **Description:** "Private repository containing company strategy, agent orchestration, marketing, operations, and business planning documents for Ooru Logix."
4. **Privacy:** Select **Private**
5. **Initialize this repository with:** Leave unchecked (we'll push existing code)
6. Click **Create repository**

You'll see a page with git commands. Copy the repository URL (SSH or HTTPS).

---

## Step 2: Add Remote & Push

In your local terminal, navigate to the repo directory:

```bash
cd /sessions/amazing-epic-ptolemy/company-architecture
```

Add the GitHub remote:

```bash
git remote add origin git@github.com:snake14v/ooru-logix-company-architecture.git
```

*Note: Replace `snake14v` with your actual GitHub username if different.*

Verify the remote was added:

```bash
git remote -v
```

---

## Step 3: Stage & Commit

```bash
git add .
git commit -m "feat(company): initial company architecture commit — strategy, financials, brand, operations docs"
```

---

## Step 4: Push to GitHub

```bash
git branch -M main
git push -u origin main
```

This pushes to the `main` branch (best practice for new repos).

---

## Step 5: Verify

Go to https://github.com/yourusername/ooru-logix-company-architecture

You should see:
- All company/ subdirectories
- README.md in the root
- Full commit history

---

## Step 6: Configure GitHub Settings

1. **Go to repo Settings** (top right)
2. **Privacy**: Confirm **Private** is selected
3. **Collaborators**: Add team members as needed
   - Settings → Collaborators and teams → Add people
   - Assign role: Admin, Maintain, Write, or Read
4. **Branch protection** (optional):
   - Settings → Branches → Add rule for `main`
   - Require pull request reviews before merge
5. **Code security** (optional):
   - Enable "Dependabot alerts"
   - Enable "Secret scanning"

---

## Ongoing Workflow

### Push New Changes

```bash
git add .
git commit -m "feat(strategy): update GTM strategy with Q3 milestones"
git push origin main
```

### Pull Latest Changes

```bash
git pull origin main
```

### Clone Repository (for other machines)

```bash
git clone git@github.com:snake14v/ooru-logix-company-architecture.git
cd ooru-logix-company-architecture
```

---

## Security Notes

- **Keep it private:** Never share the repo URL publicly
- **No API keys in docs:** Don't commit AWS keys, tokens, or passwords to this repo
- **Use .gitignore:** If adding sensitive files, create `.gitignore` to exclude them
- **Require SSH or tokens:** Avoid pushing with plain-text passwords
- **Invite collaborators carefully:** Only share with trusted team members / investors on NDA

---

## Troubleshooting

### "Permission denied" when pushing

**Cause:** SSH key not configured or HTTPS credentials wrong

**Fix:**
```bash
# Try HTTPS with personal access token
git remote set-url origin https://github.com/snake14v/ooru-logix-company-architecture.git
# When prompted, use your GitHub username + personal access token (not password)
```

### "Repository not found" error

**Cause:** Typo in GitHub username or repo name

**Fix:**
- Double-check the repo URL
- Verify the repo exists on GitHub
- Re-check your GitHub username

### "fatal: not a git repository"

**Cause:** Not in the right directory

**Fix:**
```bash
cd /sessions/amazing-epic-ptolemy/company-architecture
git status  # Should show repo status, not error
```

---

## Next Steps

1. Complete Step 1–4 above
2. Verify repo is live on GitHub
3. Share repo URL with investors (if needed)
4. Set up team access in GitHub Settings
5. Use this repo as single source of truth for company docs

---

**For questions:** Contact vaishakrn@gmail.com
