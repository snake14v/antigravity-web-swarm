# Mission: Antigravity Swarm Architecture Modernization

This document acts as the absolute source of truth for the mission, tracking various project phases, roadmap items, and completion checklists as defined by the "Manus Protocol". Our goal is to evolve the Antigravity Web Swarm into a fully autonomous, secure, and multi-agent topology compliant with the advanced Google Antigravity ecosystem standards.

## Phase 1: Context Engineering & State Management
- [x] Establish the rigid 3-file pattern (`task_plan.md`, `findings.md`, `progress.md`).
- [ ] Establish operational hooks:
  - [ ] `PreToolUse` hook (forces AI to re-read task_plan.md to prevent goal drift).
  - [ ] `PostToolUse` hook (reminds agent to update status files).
  - [ ] `Stop` hook (verifies all checklist phases are complete).
- [ ] Implement Automated Session Recovery & Catchup Reports mechanism.

## Phase 2: Inter-Agent Communication (JSON Mailbox Routing)
- [ ] Scaffold the `.swarm/mailboxes/` directory structure.
  - [ ] `inbox/` for each agent.
  - [ ] `processed/` for each agent.
- [ ] Define the strict JSON messaging schema (`from`, `to`, `subject`, `body`, `timestamp`).
- [ ] Implement prompt injection tags: `<<SEND_MESSAGE>>` and `<<BROADCAST>>`.
- [ ] Build the message polling mechanism (`poll_interval_ms: 1000`).

## Phase 3: Swarm Configurations & Specialized Topologies
- [ ] Create global `swarm-config.yaml`.
- [ ] Define specialized agent roles: 
  - [ ] `Oracle` (Senior systems architect, deep debugging)
  - [ ] `Frontend` (UI/UX, React/Next.js, Tailwind, accessibility)
  - [ ] `Junior` (Repetitive tasks, boilerplate, minor bugs)
  - [ ] `Multimodal` (Visual QA, DOM analysis)
  - [ ] `Doc_Writer` (READMEs, OpenAPI, comments)
  - [ ] `Quality_Validator` (Terminal verification, unit testing)
- [ ] Create swarm deployment presets: 
  - [ ] `fullstack` (Oracle + Frontend + Junior running parallel; Quality_Validator running serial).
  - [ ] `analysis` (Prometheus + Momus + Librarian).
- [ ] Architect the Swarm Orchestrator's Ultrawork Loop (Plan -> Act -> Verify).

## Phase 4: ClawHub Skill Ecosystem Integration
- [x] Port 17 base generic agents into the workspace.
- [ ] Architect `.agent/skills/` (Workspace Skills) and `~/.antigravity/skills/` (Global Skills) systems.
- [ ] Build or simulate `clawhub install <namespace>/<skill>` CLI capability.
- [ ] Integrate/Build priority ClawHub skills from ecosystem:
  - [ ] `UI/UX Pro Max`
  - [ ] `React Component Generator`
  - [ ] `DB-Surveyor`
  - [ ] `API Route Builder`
  - [ ] `Playwright MCP / Scraper`
  - [ ] `TranscriptAPI`
  - [ ] `CodeSentry`
  - [ ] `DeployMate / CI-CD Configurator`

## Phase 5: Zero-Trust Security Hardening (ClawHavoc Mitigation)
- [ ] Enforce DevContainer Sandboxing isolating agent shell access.
- [ ] Implement Execution Guardrails in `swarm-config.yaml` (`permission_mode: ask|deny|auto`).
- [ ] Enable continuous behavioral auditing (`audit_enabled: true` -> append-only JSONL audit trail).
- [ ] Implement Behavioral Code Insight Scanning preventing malicious `SKILL.md` ingestion (CVE-2026-25253 defense).
