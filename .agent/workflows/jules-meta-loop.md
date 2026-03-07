---
description: Jules Autonomous Meta-Agent Loop - Executes the Four-Phase maintenance sweep.
---
# Jules Autonomous Meta-Agent Verification Loop

This workflow is intended to be run by the Jules AI agent during its scheduled maintenance window. It systematically verifies firmware synchronization, memory safety, UI integrity, and documentation.

## Phase 1: Architectural Synchronization
1. Scan `firmware/active_boards/akm_touch_board/src/main.cpp`
// turbo
2. Search for the string "SysTick_Handler" to verify LVGL ticks are bound.
// turbo
3. Scan `firmware/active_boards/akm_dial_board/src/main.cpp`
// turbo
4. Search for the string "SysTick_Handler" to verify LVGL ticks are bound in the dial variant.
// turbo
5. Search for the string "ag_ui" across all `main.cpp` files to ensure UI managers are executing inside the `while(1)` loops.

## Phase 2: Memory & Security Sentinel
// turbo
1. Run a `grep_search` across `firmware/` for standard string functions (`strcmp`, `strcpy`, `strlen`).
2. Identify the files containing these functions and verify they `#include <string.h>`.
// turbo
3. Run a `grep_search` across `firmware/` for the identifier `NULL`.
4. Identify the files containing this identifier and verify they `#include <stddef.h>`.

## Phase 3: GUI Memory Polisher
1. Scan `firmware/active_boards/akm_touch_board/src/touch/ui_manager_touch.cpp`.
// turbo
2. Search for `lv_scr_load` and ensure all created screens have a pathway to being managed or deleted.
3. Compare the color palettes in `touch` versus `dial` screens (e.g., `screen_touch_keypad` vs `screen_dial_keypad`). Identify any drift in hex codes.

## Phase 4: Git & Documentation Commitment
// turbo 
1. Run `git status` to verify the working tree.
2. If changes were made during this loop, update `PROGRESS.md` with the specific details.
3. Commit changes using conventional scopes (e.g., `git commit -m "fix(sync): Realigned LVGL ticks"`).
