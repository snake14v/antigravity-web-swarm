---
description: Automatically evaluates the codebase to propose, design, and bootstrap missing Swarm Agents to manage system complexity.
---

# Agent Architect (Meta-Swarm Spawner)

This workflow is executed by the Master Agent to analyze the project's current state and automatically design secondary workflow files for specialized sub-agents. 

## 1. Project Analysis
- [ ] Read `PROJECT_MEMORY.md` to understand context and constraints.
- [ ] Read `PROGRESS.md` to identify the current Chunk phase.
- [ ] Analyze the `./src` or equivalent directory to map domains (UI, Hardware, State, Crypto).

## 2. Capability Gap Identification
- Identify areas lacking dedicated coverage. 
- Example domains: **CSS/Tailwind Aesthetics**, **Memory Bounds Checking**, **Cloud IAM/Policy Guardrails**, **React Hook Performance**.

## 3. Spawning Swarm Members
For each identified gap, create a new workflow file in `.agent/workflows/` with:
- A clear, specific `description`.
- A 3-to-4 step checklist defining how the sub-agent should evaluate the code.
- Explicit instructions on how the sub-agent should update `PROGRESS.md` when it finds and fixes issues.
// turbo
- `echo "Agent Spawn completed"` 

## 4. Human-in-the-Loop Hand-off
Once the new `.md` files to instruct the swarm are written, append exactly ONE `TODO_HUMAN` action item inside `PROGRESS.md` asking the human developer to approve the new agents.
