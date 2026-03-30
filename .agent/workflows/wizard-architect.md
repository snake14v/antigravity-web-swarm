---
name: "Wizard Architect"
description: "Multi-step form flows, step validation, progress indicators, state persistence across steps, back/forward navigation, ShopSense onboarding wizard patterns"
version: "1.0"
triggers:
  - "multi-step form created"
  - "wizard state lost on reload"
  - "step validation broken"
  - "manual: /design-wizard"
escalates_to: "Product Designer"
---

## When to Run

- **New multi-step form/wizard** added to app (onboarding, setup, checkout)
- **Wizard state lost** when user refreshes page (persistence issue)
- **Step validation failing** or inconsistent across steps
- **Back/forward navigation broken** in wizard flow
- **Progress indicator** not reflecting actual step
- **Mobile wizard experience** not optimized (too many taps)
- **Scheduled monthly** for wizard UX audit
- Manual trigger: before onboarding or checkout releases

## Memory Protocol

**Read First:**
- `CLAUDE.md` (onboarding strategy, step count targets)
- Existing wizard implementations in `src/components/wizard/` or `src/pages/*Wizard.tsx`
- `/docs/WIZARD_PATTERNS.md` (if exists)
- ShopSense onboarding flow documentation
- `/reports/wizard/` for previous UX audit results
- User feedback/analytics on wizard abandonment rates
- Figma designs for wizard flows

**Update After:**
- Create `WIZARD_AUDIT_[timestamp].md` with findings
- Extract reusable wizard components to `src/components/wizard/`
- Create `.stories.tsx` files for wizard steps
- Document patterns in `/docs/WIZARD_PATTERNS.md`
- Commit with `wizard: ` prefix
- Update analytics tracking for wizard funnels

## Execution Pipeline

### Phase 1: Wizard Flow Analysis (10 mins)

1. **Map wizard steps**
   - Document: all steps in order
   - Note: decision points (conditional steps)
   - Check: step titles, descriptions, CTAs
   - Example flow:
   ```
   Step 1: Welcome + Email
   Step 2: Account Setup (password, preferences)
   Step 3: Connect Devices (ShopSense selection)
   Step 4: Configuration (device settings)
   Step 5: Review & Confirm
   ```

2. **Analyze step complexity**
   - Number of form fields per step (target: 3-5)
   - Data types: text input, select, checkbox, date, file upload
   - Conditional fields that appear/hide based on selections
   - Required vs. optional fields per step

3. **Identify bottleneck steps**
   - Where do users abandon? (from analytics)
   - Steps with most errors/validation failures
   - Steps that take longest to complete
   - Steps that are confusing (from user feedback)

### Phase 2: Wizard State Management (10 mins)

1. **Check state persistence**
   - Is wizard state saved on page reload? (localStorage, IndexedDB)
   - Recovery: can user resume from where they left?
   - Data loss: what happens if user closes browser mid-wizard?
   - Example implementation:
   ```typescript
   // Save state after each step
   const handleStepComplete = (stepData) => {
     const wizardState = { ...currentState, [step]: stepData };
     localStorage.setItem('wizardState', JSON.stringify(wizardState));
     goToNextStep();
   };

   // Recover on mount
   useEffect(() => {
     const saved = localStorage.getItem('wizardState');
     if (saved) setWizardState(JSON.parse(saved));
   }, []);
   ```

2. **Validate state structure**
   ```typescript
   interface WizardState {
     currentStep: number;
     steps: {
       email: string;
       password: string;
       devices: string[];
       settings: Record<string, any>;
     };
     completedSteps: number[]; // For progress tracking
     startTime: number; // For analytics
   }
   ```

3. **Check state transitions**
   - Can user skip steps? (usually no)
   - Can user go back and re-edit? (usually yes)
   - Does going back clear dependent steps? (e.g., select device then change it)
   - Verify: state is valid before allowing next step

### Phase 3: Form Validation Architecture (10 mins)

1. **Define step validation rules**
   ```typescript
   const stepValidation = {
     step1: {
       email: [
         (val) => !!val || 'Email required',
         (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val) || 'Invalid email',
       ],
     },
     step2: {
       password: [
         (val) => val.length >= 8 || 'Min 8 characters',
         (val) => /[A-Z]/.test(val) || 'Must contain uppercase',
         (val) => /[0-9]/.test(val) || 'Must contain number',
       ],
     },
   };
   ```

2. **Implement validation pipeline**
   - Client-side: immediate feedback
   - Server-side: duplicate email check, passwords, etc.
   - Async validation: availability checks (username, device ID)
   - Real-time: show validation errors as user types

3. **Handle validation errors gracefully**
   - Show errors below field with red text
   - Disable "Next" button until valid
   - Auto-focus first invalid field
   - Summary of errors on step (if multiple)

### Phase 4: Navigation & Progress (10 mins)

1. **Implement step navigation**
   ```typescript
   const handleNext = async () => {
     if (!validateStep(currentStep)) {
       setErrors(validationErrors);
       return;
     }
     saveStepData();
     setCurrentStep(currentStep + 1);
   };

   const handleBack = () => {
     setCurrentStep(Math.max(0, currentStep - 1));
   };

   const handleSkip = () => {
     // Only if step is optional
     setCurrentStep(currentStep + 1);
   };
   ```

2. **Design progress indicator**
   - Show: current step, total steps (e.g., "Step 2 of 5")
   - Visual: progress bar, step dots, or linear indicator
   - Clickable steps: allow jumping back to previous steps
   - Completed steps: show checkmark or filled circle
   - Example:
   ```jsx
   <div className="flex justify-between mb-6">
     {[1, 2, 3, 4, 5].map((step) => (
       <button
         key={step}
         onClick={() => currentStep > step && goToStep(step)}
         className={step === currentStep ? 'active' : step < currentStep ? 'completed' : 'pending'}
       >
         {step < currentStep ? '✓' : step}
       </button>
     ))}
   </div>
   ```

3. **Mobile progress optimization**
   - Smaller progress indicator on mobile (less screen space)
   - Linear progress bar instead of step circles
   - Step count at top (e.g., "2/5")
   - Large "Next" button at bottom (thumb-friendly)

### Phase 5: UX Patterns & Best Practices (10 mins)

1. **Optimize steps for completion**
   - Limit fields per step: 3-5 fields max
   - One primary action per step (one "Next" button)
   - Default values where possible (reduce data entry)
   - Smart defaults: remember previous choices if similar
   - Example: "Use same address as shipping" checkbox

2. **Handle optional fields**
   - Mark optional fields clearly: "(optional)" text
   - Don't require fields unless critical
   - Allow skipping steps if all fields optional
   - But: required step must have at least one required field

3. **Error recovery**
   - Clear error messages (not technical jargon)
   - Suggest fix: "Email already registered - login or use different email"
   - Link to help: "Why do we need your phone number?"
   - Don't lose data: pre-fill field on error

4. **Mobile-specific patterns**
   - Bottom sheet modal for wizard on small screens
   - Keyboard: auto-focus input, pop keyboard on step load
   - Navigation: large back button accessible with thumb
   - Save progress: maybe show "Saved" confirmation
   - Orientation: handle portrait→landscape rotation without data loss

### Phase 6: Edge Cases & Recovery (8 mins)

1. **Handle incomplete wizards**
   - User closes browser mid-wizard
   - User navigates away and comes back
   - Session timeout (logged out)
   - Recovery: show "Resume wizard" prompt with current progress

2. **Handle back button / navigation**
   - Browser back button: should go to previous step, not previous page
   - Warn if leaving wizard: "You'll lose unsaved progress"
   - Example:
   ```typescript
   useEffect(() => {
     const handleBeforeUnload = (e) => {
       if (hasUnsavedData && !isWizardComplete) {
         e.preventDefault();
         e.returnValue = '';
       }
     };
     window.addEventListener('beforeunload', handleBeforeUnload);
     return () => window.removeEventListener('beforeunload', handleBeforeUnload);
   }, [hasUnsavedData, isWizardComplete]);
   ```

3. **Handle submission failures**
   - Network error: show retry button, don't lose data
   - Server validation error: show which step failed, link to fix it
   - Timeout: auto-save state, offer resume
   - Success: show confirmation, clear state, prevent back navigation

### Phase 7: ShopSense Onboarding Integration (10 mins)

1. **Device selection step**
   - ShopSense Pi devices: show available devices from Firebase
   - Device naming: user-friendly names vs. hardware IDs
   - Device already in use: show warning, allow reassignment
   - New device: show pairing instructions

2. **Configuration step**
   - YOLO model selection: v5, v8 (fast, accurate trade-off)
   - Camera settings: resolution, FPS
   - Detection parameters: confidence threshold, overlap
   - Location assignment: where is device deployed

3. **Review step**
   - Show: all selections from all steps
   - Device will be added to: Dashboard > Devices
   - Test connection: ping device to verify connectivity
   - Allow edit: go back to specific step if needed

### Phase 8: Analytics & Testing (8 mins)

1. **Track wizard metrics**
   ```typescript
   // Log step completion
   const logStepComplete = (step, timeSpent) => {
     analytics.event('wizard_step_complete', {
       step_number: step,
       step_name: STEP_NAMES[step],
       time_spent_seconds: timeSpent,
       has_errors: hasValidationErrors,
     });
   };

   // Log wizard completion
   const logWizardComplete = () => {
     analytics.event('wizard_complete', {
       total_time: totalWizardTime,
       steps_completed: completedSteps.length,
       device_added: true,
     });
   };
   ```

2. **Analyze abandonment**
   - Which step has highest abandonment?
   - Time to complete: average, median, distribution
   - Error rates by step
   - User segments: first-time vs. returning

3. **A/B test improvements**
   - Test step count: 3 steps vs. 5 steps
   - Test field count: 3 fields/step vs. 5 fields/step
   - Test CTAs: "Next" vs. "Continue", "Back" vs. "Previous"
   - Test defaults: with vs. without smart defaults

## Output Section

**Deliverables:**
1. **Wizard Audit Report** (`WIZARD_AUDIT_[timestamp].md`)
   - Step inventory: names, fields, validation rules
   - State management: persistence, recovery strategy
   - Navigation: back/forward, progress indicator
   - Mobile optimization: screen size tests
   - Edge case handling: errors, timeouts, recovery
   - Analytics: tracking events, abandonment data
   - UX recommendations: bottleneck steps, improvements

2. **Wizard Architecture**
   - Reusable `WizardContainer` component (state, navigation)
   - Reusable `WizardStep` component (layout, validation)
   - Custom hook: `useWizardForm` (state, validation, persistence)
   - Types: `WizardState`, `WizardStep`, `ValidationRules`

3. **Implementation**
   - New wizard components in `src/components/wizard/`
   - Wizard stories in Storybook (preview at each step)
   - Tests: happy path, error states, navigation
   - Documentation in `/docs/WIZARD_PATTERNS.md`

**Success Criteria:**
- State persists across page reloads
- Validation prevents invalid submissions
- Progress indicator accurate
- Back/forward navigation works
- Mobile: no horizontal scroll, 44px targets
- No data loss on errors or browser close
- Analytics tracking all key events
- >80% wizard completion rate (target)

## Escalation Rules

**Escalate if:**
- Wizard complexity requires complex state management (Redux)
- Conditional steps create circular logic
- Integration with external APIs has race conditions
- Mobile UX requires significant redesign
- A/B testing shows <50% completion rate

**Auto-escalate if:**
- Data loss on form submission
- State corruption (missing or invalid fields)
- Browser back button breaks wizard flow
- Mobile: horizontal scroll or invisible fields
- More than 7 steps in wizard (too long)
