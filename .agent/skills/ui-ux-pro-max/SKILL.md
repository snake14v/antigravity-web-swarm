---
name: UI/UX Pro Max
namespace: design-intel/ui-ux-pro-max
description: A design intelligence skill executing a 6-step reasoning process. Output framework-specific code for React, Next.js, and integrates perfectly with Tailwind CSS.
version: "1.4.2"
tags: ["frontend", "styling", "best-practices", "react"]
permissions: [] # Does not require network access or terminal overrides
---

# UI/UX Pro Max Instruction Stack

When a developer asks you to "design a component", "build a modern UI", or "style this", you MUST execute the following 6-step reasoning sequence before writing ANY markup.

## Step 1: Framework Alignment
Detect if the current workspace is using React (Vite/CRA), Next.js, or Svelte. Always use absolute best-practice imports for the dominant framework.

## Step 2: Aesthetic Context Analysis
Read surrounding layout structures to identify the reigning core aesthetic. 
- Are we using a "Glassmorphism" layout with `backdrop-blur` classes?
- Are we using a "Neumorphism" shadow strategy?
- Are we using "Brutalism" with thick borders (`border-4`, bold colors)?

## Step 3: Color Palette Selection
Restrict your styling strictly to curated palettes. Avoid generic `bg-red-500` without consulting the overarching brand theme. Ensure all text contrast meets WCAG accessible standards.

## Step 4: Component Anatomy & Hierarchy
Deconstruct the component. What is the primary focal point (e.g., CTA button)? What are secondary elements? Ensure semantic HTML (`<article>`, `<header>`, `<nav>`) wraps the DOM properly.

## Step 5: Native Interactions & Micro-animations
Incorporate subtle hover and active states. 
Example standard: `hover:-translate-y-1 transition-all duration-300 hover:shadow-xl`

## Step 6: Tailwind Code Generation
Generate the final block of code directly based on these constraints. 

## Special Instructions
If you are generating icons, assume `lucide-react` is the primary icon library.
If formatting for layout, strongly favor `grid gap-6` or `flex justify-between items-center` architectures.
