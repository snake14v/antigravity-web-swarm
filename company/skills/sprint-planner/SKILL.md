# Sprint Planner Skill

**Purpose:** Define sprint cadence, capacity, estimation, priorities, and execution workflow for Ooru Logix engineering.

**Scope:** Sprint planning, story point estimation, chunk creation, capacity tracking, definition of done, retrospectives.

---

## Sprint Cadence

### Timeline
- **Duration:** 1 week (Monday 9 AM - Sunday 11:59 PM)
- **Planning:** Monday 9 AM (1 hour)
- **Daily standup:** Monday-Friday 5 PM (15 min, async via PROGRESS.md)
- **Demo/Retro:** Friday 5 PM (30 min, or async notes)
- **Cleanup:** Friday evening (resolve open items, update docs)

### Sprint Dates (Rolling)
```
Sprint 1:  Feb 3 - Feb 9, 2025
Sprint 2:  Feb 10 - Feb 16, 2025
Sprint 3:  Feb 17 - Feb 23, 2025
... (continues weekly)
```

---

## Capacity Calculation

### Vaishak's Available Hours
```
Total work week:        40 hours/week
Sales/Ops/Meetings:     ~5 hours/week
Available Dev time:     ~35 hours/week

Per day:  ~7 hours (Monday-Friday)

Allocation:
- Core features:       24 hours (70%)
- Tech debt/bugs:      7 hours (20%)
- Code review/PR help: 4 hours (10%)
```

### Accounting for Interruptions
```
Best case (no interruptions):    35 hours of coding
Realistic (1-2 support issues):  28-30 hours of coding
Bad week (multiple fires):        20-24 hours of coding

Sprint planning baseline: 28 hours capacity
(Assume 1 support issue or unforeseen blocker)
```

### Story Points ↔ Hours
```
1 point  = 0.5 - 1 hour     (trivial task)
2 points = 1 - 2 hours      (small task)
3 points = 2 - 4 hours      (medium task)
5 points = 4 - 8 hours      (large task)
8 points = 8 - 13 hours     (epic, should break down)
13 points = >13 hours       (break this down immediately)

Velocity target: 18-24 story points per sprint
(Based on 28 hour capacity with mix of task sizes)
```

---

## Story Point Estimation Guide

### Estimation Scale

#### 1 Point = Trivial (30 min - 1 hour)
- Fix typo or label text
- Add a simple constant or enum
- Update README
- Bump a dependency version
- Add a single console.log statement for debugging

**Example:** "Update copyright year in footer"

#### 2 Points = Small (1 - 2 hours)
- Create a new simple component (Button variant, Card)
- Add basic prop to existing component
- Write a util function (no dependencies)
- Fix simple bug (styling, alignment)
- Add unit test for existing function

**Example:** "Create PilotAvatar component"

#### 3 Points = Medium (2 - 4 hours)
- Create new feature page (with existing patterns)
- Implement form with validation
- Add Firestore query with error handling
- Create custom hook
- Refactor existing component
- Write integration test

**Example:** "Build pilot invite flow with email validation"

#### 5 Points = Large (4 - 8 hours)
- Implement full user authentication flow
- Build complex chart/visualization
- Create multi-step wizard or modal
- Implement real-time sync feature
- Refactor major component architecture
- Create comprehensive test suite for module

**Example:** "Implement device health monitoring dashboard with real-time updates"

#### 8 Points = Epic (8 - 13 hours)
- Build entire new feature area (auth, payments, reporting)
- Major refactor (move 10+ components)
- Implement new data collection system
- Create admin panel with pagination/filtering

**Should be broken into smaller stories before starting.**

**Example:** "Analytics dashboard with charts, filters, and export"
→ Break into: Detail page (3), Charts (5), Filters (3), Export (2)

#### 13+ Points = Too Large
- **Do not estimate at 13+**
- Always break down before sprint planning
- Examples of breakdown:
  ```
  "Admin dashboard" (13+ points) breaks into:
    - User management (5 points)
    - Permissions system (5 points)
    - Audit logs (3 points)
    - Notifications (3 points)
  ```

### Estimation Techniques

#### Planning Poker (team)
```
Not applicable (solo developer), but for reference:
1. Each estimator gets deck of cards (1,2,3,5,8,13)
2. Story is discussed
3. All estimate simultaneously, show cards
4. If estimates differ widely, discuss and re-estimate
5. Continue until consensus
```

#### T-Shirt Sizing (if unfamiliar with points)
```
XS    → 1 point
S     → 2 points
M     → 3 points
L     → 5 points
XL    → 8 points
XXL   → Break down!
```

#### Reference Stories (use existing items for calibration)
```
Reference 2-pointer: "Fix Button hover color"
Reference 3-pointer: "Create user settings page"
Reference 5-pointer: "Add real-time analytics sync"

New story similar to 3-pointer? Estimate as 3.
```

### Common Estimation Mistakes to Avoid

```
❌ "Testing takes 0 time" → Add 20% buffer for testing
❌ "Happy path only" → Account for error states, edge cases
❌ "No dependencies" → Check for auth, APIs, data fetches
❌ "No learning curve" → First time using Firebase? Add 1 point
❌ "Code review doesn't count" → Budget 1-2 hours for reviews
```

---

## Priority Framework

### Priority Levels

#### P0 - Blocking Revenue (Do immediately)
- **Impact:** Business-critical, prevents sales or loses customers
- **Timeline:** Hours to 1 day
- **Examples:**
  - Registrations page down
  - Firebase Auth broken
  - Device sync failing completely
  - Security vulnerability

#### P1 - Customer-Facing (Do this sprint)
- **Impact:** Improves customer experience, supports current sales
- **Timeline:** This week
- **Examples:**
  - Add analytics dashboard
  - Implement device calibration UI
  - Fix user-reported bugs
  - Improve mobile responsiveness
  - Add export functionality

#### P2 - Internal Tooling (Schedule next sprint)
- **Impact:** Improves team efficiency, tech debt
- **Timeline:** Next 1-2 sprints
- **Examples:**
  - Improve admin dashboard pagination
  - Add test suite for auth module
  - Refactor UseCasesGrid component
  - Set up CI/CD pipeline
  - Document API patterns

#### P3 - Nice-to-Have (Backlog)
- **Impact:** Incremental improvements, future-proofing
- **Timeline:** When capacity allows
- **Examples:**
  - Dark mode theme toggle
  - Advanced filtering on charts
  - Performance optimizations
  - Design system documentation

### Priority Assignment Rules
```
1. Always complete P0 before anything else
2. Fill sprint with P1 items (customer value)
3. Add P2 items if capacity remains (prevent debt buildup)
4. P3 backlog only if sprint is < 50% capacity (rare)
5. Prioritize by revenue impact first, effort second
```

---

## Sprint Planning Template

### Sprint Goal (1 sentence)
```
"Implement real-time device monitoring so pilots can track
 shop floor activity in the web dashboard."
```

### Committed Items (Must complete)
```
The following items are committed for completion by Friday EOD.
All should be at P1 priority unless blocking (P0).

C-42: Create analytics page layout (3 points) - DOM + CSS
C-43: Implement Firestore analytics listener (5 points) - useRealtimeDoc
C-44: Build real-time counter component (3 points) - React component
C-45: Add error handling for analytics API (2 points) - Error states
C-46: Test analytics on mobile (1 point) - Responsive check

Total: 14 points (50% of 28 hour capacity)
Rationale: Remaining 50% reserved for code review, support, unexpected issues
```

### Stretch Items (If ahead of schedule)
```
Bonus items if committed items finish early (likely not needed).
Low priority but valuable.

C-47: Add chart visualization (5 points)
C-48: Implement export to CSV (3 points)

Total: 8 points
Rationale: Only start if committed items complete by Wednesday
```

### Carry-Over from Previous Sprint
```
Items not completed last sprint (reasons + resolution):

C-40: Device calibration flow (5 points) - BLOCKED on hardware feedback
  Resolution: Unblock this sprint with test Pi4
  Re-prioritize: YES, moving to committed

C-41: Admin dashboard pagination (3 points) - Lower priority
  Resolution: Deferring to next sprint (P2 item)
  Re-prioritize: NO
```

### Sprint Planning Checklist
- [ ] Review PROGRESS.md for past metrics (velocity, issues)
- [ ] Identify P0 items (blocking issues)
- [ ] Review GitHub issues for P1 items (customer features)
- [ ] Add tech debt/P2 items (20-30% of capacity)
- [ ] Estimate all items using story points
- [ ] Ensure total capacity = ~50% of available hours
- [ ] Write clear acceptance criteria for each item
- [ ] Assign story IDs (C-XX chunk format)
- [ ] Create GitHub issues linked to chunks
- [ ] Share sprint goal with stakeholders

---

## Chunk (C-XX) Creation Protocol

### Chunk Structure in PROGRESS.md
```markdown
## Sprints & Progress

### Sprint 3 (Feb 17 - Feb 23)
**Goal:** Real-time analytics dashboard for pilots.
**Capacity:** 28 hours available
**Status:** IN PROGRESS

#### Committed Items

**C-42: Create analytics page layout**
- Points: 3
- Priority: P1
- Status: IN PROGRESS
- Owner: Vaishak (AI assist: Claude)
- Timeline: Mon-Tue
- Description: Build page layout with header, sidebar, main metrics area
- Acceptance Criteria:
  - [ ] Page routes correctly to /dashboard/analytics
  - [ ] Layout responsive (mobile, tablet, desktop)
  - [ ] Sidebar navigation working
  - [ ] Placeholder cards for metrics
- GitHub Issue: #234
- Related Chunks: C-43, C-44
- Notes:
  - Using existing DashboardLayout component
  - Mobile-first approach with Tailwind breakpoints
  - Review: @Vaishak, due Tue EOD

**C-43: Implement Firestore analytics listener**
- Points: 5
- Priority: P1
- Status: BLOCKED (waiting on C-42 layout)
- Owner: Vaishak (AI assist: Antigravity)
- Timeline: Tue-Wed
- Description: Create useRealtimeDoc hook to listen to /analytics/{dateKey}
- Acceptance Criteria:
  - [ ] Hook connects to Firestore without auth errors
  - [ ] Real-time updates trigger re-renders
  - [ ] Error states handled (permission denied, offline)
  - [ ] Cleanup unsubscribes on unmount
  - [ ] Unit tests pass
- GitHub Issue: #235
- Code Review Checklist:
  - [ ] TypeScript strict mode (no any)
  - [ ] Error boundary for fallback UI
  - [ ] No memory leaks in useEffect cleanup
- Notes:
  - Reference: /code-architect/standards/firebase-patterns.md
  - Test with: debug/test-analytics.json
  - Performance: Profile with React DevTools

...

#### Carry-Over Items

**C-40: Device calibration flow** (BLOCKED → RESCHEDULED)
- Original Points: 5
- Status: BLOCKED
- Reason: Missing hardware test fixture
- Resolution: Procure test Pi4 ($35), expected delivery Wed
- Rescheduled to: Sprint 4
- Blocking: Camera setup features

---

### Definition of Done Checklist
**Every chunk must satisfy ALL criteria before marking DONE:**

#### Code Quality
- [ ] TypeScript compiles with zero errors
- [ ] ESLint passes (no warnings in changed files)
- [ ] No hardcoded values or magic numbers
- [ ] Clear, descriptive variable names
- [ ] Functions < 50 lines (extract if longer)

#### Testing
- [ ] Manual testing completed in local env
- [ ] Edge cases tested (empty states, errors, loading)
- [ ] Mobile responsive tested
- [ ] Network errors handled gracefully
- [ ] Console clear (no errors, no debug logs)

#### Code Review
- [ ] Code review completed and approved (self-review acceptable)
- [ ] Feedback addressed
- [ ] No review comments outstanding

#### Documentation
- [ ] Inline comments for complex logic
- [ ] JSDoc for exported functions
- [ ] README updated if adding new patterns
- [ ] API/component changes documented

#### Deployment
- [ ] Code merged to main branch
- [ ] Deployed to preview (Vercel)
- [ ] Smoke tests pass on preview
- [ ] Merged to production OR scheduled for next deploy

#### Metrics
- [ ] Bundle size impact checked
- [ ] Performance acceptable (no >100ms regressions)
- [ ] Lighthouse score maintained or improved
```

### Chunk Handoff Format (between AI sessions)
```markdown
**C-43: Implement Firestore analytics listener** → Claude to Antigravity handoff

**Current Status:** Custom hook created, needs Firebase integration testing
**Last Work:** Set up useRealtimeDoc hook signature and argument types
**Next Steps:**
  1. Connect to Firestore onSnapshot
  2. Handle error states (permission-denied, offline)
  3. Test with mock data in storybook
  4. Write integration test

**Blockers:** None currently
**Code Location:** src/hooks/useRealtimeDoc.ts
**Tests Location:** src/hooks/__tests__/useRealtimeDoc.test.ts
**References:** firebase-patterns.md, C-42 (layout prerequisite)
**Review Checklist:** Memory leaks, error handling, type safety
**AI Preference:** Antigravity excels at Firebase integration
```

### GitHub Integration
```
Create issue template that matches chunks:

Title: [C-XX] Brief description
Labels: p1, sprint-3, feature-analytics
Projects: Ooru Logix Sprint Board
Assignee: @vaishak (or AI agent if autonomous)

Body:
## Chunk ID
C-42

## Description
[From PROGRESS.md chunk]

## Acceptance Criteria
- [ ] ...

## Definition of Done
- [ ] TypeScript clean
- [ ] Code review approved
- [ ] Deployed to preview

## Related Chunks
- #C-43 (dependency)
- #C-44 (related)
```

---

## Retrospective Template

### Timing
- **When:** Friday 5 PM (end of sprint)
- **Duration:** 30 minutes (can be async)
- **Owner:** Vaishak (reflection)

### Format

```markdown
## Sprint 3 Retrospective (Feb 17 - Feb 23)

### Completed
- C-42: Analytics page layout ✅
- C-43: Firestore listener ✅
- C-44: Counter component ✅
- C-45: Error handling ✅
- C-46: Mobile testing ✅
- Plus: C-47 (chart) completed early!

**Velocity:** 17 points
**Capacity utilized:** 18/28 hours (64%)
**Notes:** Strong week, good focus

### Incomplete
- C-48: CSV export (deprioritized, moved to Sprint 4)
- C-49: Advanced filtering (stretch item, not committed)

### What Went Well
1. Clear sprint goal kept focus sharp
2. Using chunks helped track progress daily
3. Firestore pattern docs prevented bugs
4. Mobile testing caught responsive issues early
5. Real-time listener performed well (no lag)

### What Didn't Go Well
1. Underestimated chart complexity (5 points felt like 8)
2. Mobile simulator != real device (found phone bug late)
3. Firebase Security Rules changes delayed deploy by 2 hours
4. Documentation comment process slow (used JSDoc instead)

### Action Items
1. Next sprint: Add +2 points buffer to "visualization" tasks
2. Add actual iPhone testing to Definition of Done
3. Pre-test Firestore rules changes before deploy
4. Create JSDoc template file for copy/paste efficiency

### Metrics
| Metric | Value | Trend |
|--------|-------|-------|
| Velocity (points) | 17 | ↑ +3 from Sprint 2 |
| Completed on-time | 5/5 | ✅ 100% |
| Code review cycles | 1.2 avg | ↓ (was 2.0) |
| Production bugs | 0 | ✅ |
| TypeScript errors | 0 | ✅ |
| Lighthouse score | 92 | → (stable) |

### Next Sprint Focus
- Prioritize visualization estimation better
- Add physical device testing step
- Continue current velocity (good place to be)
```

---

## Sprint Velocity Tracking

### How to Calculate Velocity
```
Velocity = Sum of story points of completed items per sprint

Sprint 1: 14 points completed
Sprint 2: 14 points completed
Sprint 3: 17 points completed

Average velocity: (14 + 14 + 17) / 3 = 15 points/sprint
Trend: Improving ↑
```

### Using Velocity for Planning
```
If average velocity = 15 points/sprint:

Next sprint planning:
- Commit 12 points (80% of velocity = conservative)
- Include 3-5 points as stretch items
- Reserve 5 points capacity for support/blockers

Total planned: 12 + 4 + 5 = 21 points available to assign
(But commit only 12 to be safe)
```

### When Velocity Drops
```
Week with velocity = 8 points (vs avg 15):

Likely causes:
1. Unexpected support issue (P0 bug, customer escalation)
2. Estimation too optimistic (2-3 pointers took 5+ hours)
3. Blocker (hardware not available, API down)
4. Scope creep (feature grew mid-sprint)

Action:
- Document the reason in PROGRESS.md
- Adjust next sprint's committed items
- Extract learnings to retrospective
- Don't panic (velocity varies week-to-week)
```

---

## Sprint Cadence Rules

### Commitment
- Once committed, items rarely move out of sprint
- If item becomes impossible, escalate immediately (don't hide it)
- Stretch items only start if committed items complete

### Updates
- Daily standup: 1-2 sentence async update in PROGRESS.md
  ```
  **Monday 5 PM standup:**
  - Completed C-42 (layout done, responsive tested)
  - In progress: C-43 (Firestore integration, 50% done)
  - Blocker: Firebase rules need updating (will do tomorrow)
  ```

### Scope Control
- Mid-sprint requests = next sprint (unless P0)
- Scope creep tracked in retro
- Over-commitment avoided by using 60-70% of capacity

### Feedback Loop
- Velocity metric guides future planning
- Retrospectives surface process improvements
- Patterns (e.g., Firebase always takes longer) inform estimation

---

**Last Updated:** February 2025

---

## Quick Reference

| Aspect | Value |
|--------|-------|
| Sprint duration | 1 week (Mon-Sun) |
| Available capacity | 28 hours/week (conservative) |
| Story points/week target | 18-24 points |
| Estimation scale | 1, 2, 3, 5, 8 (no 13+) |
| Priority levels | P0, P1, P2, P3 |
| Definition of Done | 6-part checklist (see above) |
| Retrospective cadence | Weekly, Friday 5 PM |
| Chunk tracking | PROGRESS.md, C-XX format |
| Team size | 1 developer + AI assistance |
