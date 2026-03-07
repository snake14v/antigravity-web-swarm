---
description: Analyzes and optimizes Three.js, React Three Fiber, and WebGL structures to maximize framerates.
---

# Node 88: 3D WebGL Scene Optimizer

This workflow is used when rendering high-fidelity 3D assets (`.obj`, `.stl`, `.glb`) on a web browser or React application via Three.js. It ensures framerates stay near 60fps even on mobile devices, and that the GPU is not overloaded.

## When to Run
- After importing new models or large texture maps into the application.
- When an end-user reports a drop in framerates, jitter, or device overheating.
- During the development of interactive WebGL configurators or animated product viewers.

## Execution Pipeline

### 1. Geometry Analysis & Instancing
- Evaluates the polygon/vertex count across all loaded models. 
- Suggests `InstancedMesh` usage when rendering multiple copies of the same geometry.
- Identifies and recommends `draco` compression algorithms to reduce `.glb` payload size.

### 2. Texture Load & Resolution
- Checks for heavily mapped textures (4K or larger). Suggests downsampling to 1K/2K, and mipmap optimization based on camera distance.
- Ensures all heavy textures are compressed using KTX2 / Basis Universal if possible.
- Verifies that `useGLTF.preload()` is correctly utilized to avoid T-Posing or loading flashes.

### 3. Lighting & Shadow Management
- Audits ambient, directional, and point lights. Suggests utilizing baked lighting or lightmaps rather than real-time shadow casting (which is GPU intensive).
- Assesses shadow map resolutions and limits the `receiveShadow` and `castShadow` booleans only strictly where necessary. 

### 4. Post-Processing Load
- If `EffectComposer` is used, identifies heavy shaders (Bloom, SSAO, Anti-aliasing).
- Suggests optimized pipelines and verifies `dpr` (device pixel ratio) scaling on the `<Canvas>` to save rendering power on high-resolution Retina screens.
- Avoids rendering the canvas when out of the viewport.

## Output
After running this workflow, the agent should report:
- Draw call counts and memory footprint suggestions.
- Render loop inefficiencies causing garbage collection spikes.
- A compressed `.glb` workflow strategy, keeping the total 3D load under 5MB per scene.
