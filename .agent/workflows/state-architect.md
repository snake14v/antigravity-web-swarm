---
name: "State Architect"
description: "React Context audit, useReducer patterns, global state anti-patterns, Firebase real-time sync state, HardwareBridgeContext, re-render cascades"
version: "1.0"
triggers:
  - "re-render cascade detected"
  - "context splitting needed"
  - "Firebase sync state added"
  - "manual: /audit-state"
escalates_to: "Architecture Review Agent"
---

## When to Run

- **Re-render cascades** detected (components render 3+ times per interaction)
- **New global state** added without context split strategy
- **Firebase real-time listeners** added to Context (potential sync issues)
- **useReducer** patterns need validation across flows
- **HardwareBridgeContext** expanded with new device types
- **Scheduled quarterly** for global state architecture review
- Manual trigger: after state management refactoring

## Memory Protocol

**Read First:**
- `CLAUDE.md` (state management strategy, Context split rules)
- `src/context/*.tsx` (all context providers)
- `src/hooks/useReducer*` patterns (all reducer hooks)
- `.github/workflows/` for any state-related tests
- `/reports/architecture/` for previous state audits
- Firebase configuration and Realtime Database structure
- Component dependency graph (React DevTools Profiler exports)

**Update After:**
- Create `STATE_AUDIT_[timestamp].md` with findings
- Update `docs/STATE_MANAGEMENT.md` with new patterns
- Refactor Context if splitting needed (with `refactor: ` commits)
- Add reducer tests if new patterns introduced
- Document Firebase sync strategy in `/docs/FIREBASE_SYNC.md`

## Execution Pipeline

### Phase 1: Context API Inventory (10 mins)

1. **List all Context providers**
   ```bash
   find src/context -name "*.tsx" -type f | sort
   ```
   - Document: context name, purpose, values provided, consumers count

2. **Analyze Context usage patterns**
   - For each context, list all `useContext()` calls
   - Identify consumers: which components use which values
   - Flag: consumers that use only 1-2 values (split candidate)
   - Measure: context re-renders per interaction

3. **Check Context value structure**
   ```typescript
   // Good: split by concern
   const AuthContext = createContext<{ user: User | null }>(...);
   const UserPrefsContext = createContext<{ theme: string; lang: string }>(...);

   // Bad: mega-context
   const AppContext = createContext<{
     user: User;
     theme: string;
     notifications: Notification[];
     devices: Device[];
     ...
   }>(...);
   ```
   - Flag: contexts with >5 properties
   - Verify: each consumer uses <3 values from context

### Phase 2: Re-render Cascade Audit (12 mins)

1. **Profile with React DevTools Profiler**
   - Record user interactions: click buttons, fill forms, navigate
   - Open Profiler, identify components rendering 2+ times per gesture
   - Export profiler data as JSON

2. **Identify re-render causes**
   - Context value reference changes (new object created each render)
   - Parent re-renders trigger child re-renders unnecessarily
   - useCallback/useMemo missing on prop callbacks
   - Context not memoized (context value created inline)

3. **Document cascade patterns**
   ```
   InteractionCascade:
   - User clicks button
   - AppContext updates (new object created)
   - All AppContext consumers re-render: 12 components
   - Total time: 250ms
   - Flag: >100ms is slow
   ```

### Phase 3: useReducer Pattern Validation (10 mins)

1. **Audit useReducer implementations**
   ```typescript
   // Good pattern
   const reducer = (state: State, action: Action): State => {
     switch (action.type) {
       case 'ADD_ITEM':
         return { ...state, items: [...state.items, action.payload] };
       case 'REMOVE_ITEM':
         return { ...state, items: state.items.filter(i => i.id !== action.payload.id) };
       default:
         return state;
     }
   };
   ```
   - Verify: immutable state updates (use spread, don't mutate)
   - Check: action types are constants (not strings)
   - Verify: reducer is pure function (no side effects)

2. **Check action creator patterns**
   - Flag: actions created inline in event handlers
   - Recommend: factory functions for complex actions
   - Verify: action payload structure is consistent

3. **Test reducer with edge cases**
   - Test: empty state, null payloads, missing data
   - Verify: reducer handles all action types
   - Verify: reducer is deterministic

### Phase 4: Firebase Real-time Sync Strategy (12 mins)

1. **Audit Firebase listeners in Context**
   - Find: all `db.ref().on()` or `.onSnapshot()` calls
   - Verify: listeners attached in useEffect with cleanup
   - Example pattern:
   ```typescript
   useEffect(() => {
     const unsubscribe = onSnapshot(
       collection(db, 'devices'),
       (snapshot) => {
         setDevices(snapshot.docs.map(doc => doc.data()));
       }
     );
     return () => unsubscribe();
   }, []);
   ```

2. **Check Firebase sync conflict handling**
   - Verify: optimistic updates don't conflict with server data
   - Check: merge strategy for concurrent updates
   - Flag: race conditions between local and remote state

3. **Validate HardwareBridgeContext sync**
   - Devices syncing from ShopSense Pi (Firebase Realtime)
   - Verify: device list updates without full re-render cascade
   - Check: single device update doesn't re-render all devices
   - Pattern: consider splitting device-specific state

### Phase 5: Context Splitting Strategy (10 mins)

1. **Identify split candidates**
   ```typescript
   // Before: mega-context
   const AppContext = createContext<{
     user: User;
     theme: string;
     notifications: Notification[];
     devices: Device[];
   }>(...);

   // After: split by concern
   const AuthContext = createContext<{ user: User | null }>(...);
   const UIContext = createContext<{ theme: string }>(...);
   const NotificationContext = createContext<{ notifications: Notification[] }>(...);
   const HardwareContext = createContext<{ devices: Device[] }>(...);
   ```
   - Split by update frequency (theme rarely changes, notifications often)
   - Split by consumer count (some components only need user, not all state)
   - Split by concern (auth, UI, notifications, hardware are separate domains)

2. **Plan Context extraction**
   - Identify which consumers use which split contexts
   - Verify no circular dependencies
   - Plan provider hierarchy in App root

3. **Validate memoization**
   ```typescript
   // Good: context value is memoized
   const contextValue = useMemo(
     () => ({ user, setUser }),
     [user]
   );
   
   return (
     <AuthContext.Provider value={contextValue}>
       {children}
     </AuthContext.Provider>
   );
   ```

### Phase 6: Anti-Pattern Detection (8 mins)

1. **Detect common anti-patterns**
   - **Mega-context**: >5 unrelated properties → split
   - **Inline value creation**: `value={{ user: currentUser }}` → memoize
   - **Missing cleanup**: Firebase listeners without unsubscribe → add cleanup
   - **Context in reducer**: useContext inside reducer → pass as parameter
   - **Unnecessary context**: state used in 1 component only → use useState

2. **Check for unnecessary re-renders**
   - Context value changes but consumers don't use changed property
   - Example: theme changes, user-only components re-render
   - Solution: split AuthContext and UIContext

3. **Validate selector pattern** (optional, if using)
   ```typescript
   // Good: selector hook
   const useUserName = () => {
     const { user } = useContext(AuthContext);
     return user?.name;
   };
   // Component only re-renders if user.name changes, not all user properties
   ```

### Phase 7: Redux/Zustand Evaluation (6 mins)

1. **Assess if Context is appropriate**
   - Context works well for: auth state, UI theme, language, low-update-frequency data
   - Context struggles with: high-frequency updates, complex state logic
   - Consider alternatives: Redux, Zustand, Recoil if:
     - Multiple async actions need orchestration
     - DevTools/time-travel debugging critical
     - Very deep component trees (Context consumer prop drilling)

2. **Document decision**
   - If staying with Context: implement splitting strategy
   - If migrating: plan migration path (don't refactor all at once)

## Output Section

**Deliverables:**
1. **State Audit Report** (`STATE_AUDIT_[timestamp].md`)
   - Context inventory: name, purpose, consumers, re-render frequency
   - Re-render cascade analysis: trigger → affected components → duration
   - useReducer pattern validation: immutability, edge cases, tests
   - Firebase sync strategy: listener count, cleanup verification
   - Anti-pattern findings: mega-context, missing memoization, etc.
   - Splitting recommendations: which contexts to extract
   - Priority action items

2. **Context Refactoring Plan** (if needed)
   - New Context structure with splits
   - Provider hierarchy diagram
   - Migration steps for existing consumers
   - Testing strategy for refactoring

3. **Code Changes**
   - Split Context implementations with memoization
   - Updated hooks using split contexts
   - Firebase listener cleanup fixes
   - useReducer improvements

**Success Criteria:**
- No re-render cascades (1 re-render per interaction max)
- All Context values memoized with useMemo
- All Firebase listeners have cleanup functions
- All useReducer implementations are pure and deterministic
- All anti-patterns eliminated
- Context split by concern (max 3-4 properties per context)

## Escalation Rules

**Escalate if:**
- Re-render cascades cannot be fixed with Context splitting
- Firebase sync conflicts require custom reconciliation logic
- State logic too complex for Context/useReducer
- Performance degradation requires alternative state library (Redux)
- Context usage spans >50 components (scaling issue)

**Auto-escalate if:**
- Profiler shows >500ms interaction time due to re-renders
- Memory leaks detected in Firebase listeners (multiple subscriptions)
- State mutation happening in reducer (immutability violated)
- Context creates circular dependencies in provider hierarchy
