# Findings Log (Manus Protocol)

This file functions as a shared, persistent scratchpad. Research agents must log crucial discoveries here to avoid context saturation.

## 2026-03-08 Findings Analysis
- **Framework Constraint**: Antigravity orchestrators default to a highly portable Thread backend.
- **TUI Monitoring**: If `tmux` is available, the swarm backend should automatically transition to a tmux split-pane backend for advanced live monitoring (TUI v2: six-column dashboard).
- **Session Recovery Details**: Data for recovering interrupted sessions is pulled from the `.claude/projects/` directory to generate seamless Catchup Reports.
- **ClawHavoc Threat Vector (CVE-2026-25253)**: A critical RCE (CVSS 8.8) allowing 1-click execution via a `gatewayUrl` embedded directly in query parameters of fake documentation links or comment sections. It connects via WebSocket and compromises system authentication credentials.
- **Weaponized SKILL.md**: The `SKILL.md` file inherited the full credentials of the overarching AI agent. Malicious payloads were discovered utilizing the Atomic macOS Stealer (AMOS).
- **Context Engineering Necessity**: The Context Engineering philosophy (Manus Protocol) is mandatory due to context window saturation degradation. Treat the local filesystem as persistent IDE Disk and prompt context as volatile IDE RAM.
