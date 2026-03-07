# Project Memory & Swarm Context

## 🌟 Legacy Context: The Lineage
This project is part of a lineage of developments that build upon physical and cyber engineering systems:

1. **XGO3D Engineering (XGO3DX22)**
   - **Goal:** Built a cyber-physical portfolio website featuring a "Cyber-Industrial" aesthetic.
   - **Tech Stack:** React 19 + Vite, TailwindCSS 4, Framer Motion, Firebase.
   - **Highlights:** Instant Quoting Engine with native STL client-side parsing (volume, weight calc), Dynamic Pricing, User Auth.
   - **Status:** Phase 2 Complete, highly robust visual identity.

2. **AurumGuard MK II - Lockbox Firmware**
   - **Goal:** 4-Board high-security modular safe system.
   - **Tech Stack:** STM32/ESP32, FreeRTOS, ATECC608B mTLS, AWS serverless, Go Backend.
   - **Highlights:** multi-node `<500ms` SRAM zeroization SLA, Tamper Mesh, Touch/Dial GUIs using LVGL, RS-485 AGWire V2 custom protocol.
   - **Status:** 100% Software Complete, Swarm Audited by 53 Jules AI nodes. Proceeding to Phase 1 alpha fabrication.

## 🚀 Current Project: OLOG
- **Definition:** An AI Studio integrated app derived from Gemini API usage.
- **Tech Stack:** React + Vite, Node.js.
- **Goal:** Provide a seamless conversational or agentic workflow UI for AI model integration.
- **Local Dev Loop:** Runs on `npm run dev`. Requires `.env.local` configured with `GEMINI_API_KEY`.

## 🤖 The Swarm Architecture
To maintain the immense complexity handled in AurumGuard, OLOG institutes an "Agent Swarm" mechanism right from the start.
- Agents act autonomously as defined in `.agent/workflows`. 
- **Meta-Agent:** Orchestrates defining missing needs and spawning new workflows.
- **Memory Continuity:** `PROGRESS.md` tracks all chunks globally across the swarm.

## 🛠 Operation Philosophy
- **Zero Configuration Drift:** Every infrastructure change must be logged.
- **Parallel Swarm Evaluation:** Before any large feature is finalized, specialized swarm elements (Memory Safety, Performance, Design) must sign off.
- **Incremental Chunks:** Work in C-XX batches as defined in `PROGRESS.md`.
