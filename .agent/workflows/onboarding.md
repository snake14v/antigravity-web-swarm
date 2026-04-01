---
description: New developer onboarding — validates environment and introduces project structure
---

# New Developer Onboarding Workflow

Run this workflow when a new developer (human or AI) joins the project.

## Steps

// turbo-all

1. **Validate Environment**
   ```bash
   python scripts/dev_health_check.py
   ```
   Review the output. Fix any ❌ FAIL items before proceeding.

2. **Install Firmware Toolchain**
   ```bash
   pip install platformio
   ```

3. **Install Cloud Dependencies**
   ```bash
   cd cloud/aws && npm ci
   ```

4. **Download Go Modules**
   ```bash
   cd cloud/agwire && go mod download
   ```

5. **Test Firmware Build (MGH board)**
   ```bash
   cd firmware/active_boards/mgh_board && pio run
   ```

6. **Test Go Build**
   ```bash
   cd cloud/agwire && go build ./... && go vet ./...
   ```

7. **Start Development Session**
   ```bash
   python scripts/session_logger.py start "Developer Name" "Onboarding & environment setup"
   ```

8. **Read Critical Documentation**
   The following files MUST be read before making any changes:
   - `docs/specifications/AG_Agent_Swarm_V7_Unified.md` — Master architecture
   - `docs/specifications/ATECC608B_Slot_Map.md` — Hardware crypto config
   - `docs/specifications/Master_Project_Outline.md` — Full project overview
   - `CONTRIBUTING.md` — Code style and workflow rules
   - `.agent/SKILL.md` — AI agent context and locked decisions

9. **End Onboarding Session**
   ```bash
   python scripts/session_logger.py end "Onboarding complete, environment validated"
   ```
