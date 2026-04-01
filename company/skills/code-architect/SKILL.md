# Code Architect Skill

**Purpose:** Define and enforce coding standards, architecture patterns, and quality gates for Ooru Logix web and firmware development.

**Scope:** TypeScript/React code review, architecture validation, standards enforcement, PR quality checks.

---

## Coding Standards

### TypeScript Configuration
- **Strict mode enabled:** `strict: true` in tsconfig.json
- **Target:** ES2020
- **Module:** ESNext
- **No implicit any:** `noImplicitAny: true`
- **Strict null checks:** `strictNullChecks: true`

### React Component Rules
- **Functional components only** - no class components
- **Custom hooks for reusable logic** (useFirestoreQuery, useAuth, useRealtimeDoc)
- **Props must be typed** with interfaces extending `React.FC<Props>`
- **No inline exports** - always export component at bottom of file
- **Memoization:** Use `React.memo()` only when:
  - Component receives expensive-to-create props (objects, arrays)
  - Parent re-renders frequently
  - Profiling confirms unnecessary renders
- **useCallback/useMemo:** Only when measurably preventing re-renders

### State Management Rules
```
AUTH/THEME → React Context (FirebaseAuthContext, ThemeContext)
UI STATE (modals, dropdowns, toggles) → Local useState
PERSISTENT DATA (users, pilots, analytics) → Firestore + React Context cache
REAL-TIME DATA (live counts, status updates) → Firestore listeners (onSnapshot)
TEMPORARY DATA (form drafts, pending uploads) → Local state or sessionStorage
```

### File Naming Conventions
```
Components:        src/components/[Scope]/ComponentName.tsx
Custom hooks:      src/hooks/use[HookName].ts
Context:           src/context/[ContextName]Context.tsx
Utils:             src/utils/[utilName].ts
Types:             src/types/[TypeName].ts
Pages:             src/pages/[PageName].tsx
Services:          src/services/[ServiceName].ts
Constants:         src/constants/[CONSTANT_NAME].ts
```

### Folder Structure (Atomic Design)
```
src/
├── components/
│   ├── atoms/           # Base: Button, Input, Badge
│   ├── molecules/       # Composed: FormField, Card, Modal
│   ├── organisms/       # Complex: NavBar, Footer, FormSection
│   └── templates/       # Page layouts: DashboardLayout, AuthLayout
├── pages/               # Route-level components
├── context/             # React Context providers
├── hooks/               # Custom hooks
├── services/            # Firebase, API calls, external services
├── utils/               # Helper functions
├── types/               # TypeScript interfaces and types
├── constants/           # Hard-coded values, enums
└── assets/              # Images, fonts, etc.
```

### Import Ordering
```typescript
// 1. External packages
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

// 2. Internal absolute imports
import { useAuth } from '@/context/FirebaseAuthContext';
import { Button } from '@/components/atoms/Button';

// 3. Internal relative imports
import { validateEmail } from '../utils/validators';

// 4. Side-effects/styles (last)
import './ComponentName.css';
```

### Error Handling Patterns

#### React Error Boundaries
```typescript
// Wrap feature areas, not every component
<ErrorBoundary fallback={<ErrorFallback />}>
  <FeatureSection />
</ErrorBoundary>
```

#### Async/Await with Try/Catch
```typescript
async function fetchUserData(userId: string): Promise<User | null> {
  try {
    const docRef = doc(db, 'users', userId);
    const snapshot = await getDoc(docRef);
    return snapshot.exists() ? (snapshot.data() as User) : null;
  } catch (error) {
    console.error('Failed to fetch user:', error);
    showErrorToast('Could not load user data');
    return null;
  }
}
```

#### User Feedback (Toast/Alerts)
```typescript
// Success: toast.success('Action completed');
// Error: toast.error('Something went wrong: ' + error.message);
// Info: toast.info('Please wait...');
// Use for all user-facing operations
```

#### Firestore Error Handling
```typescript
try {
  await updateDoc(docRef, updates);
  toast.success('Updated successfully');
} catch (error) {
  if (error instanceof FirebaseError) {
    if (error.code === 'permission-denied') {
      toast.error('You do not have permission to perform this action');
    } else if (error.code === 'not-found') {
      toast.error('Document not found');
    } else {
      toast.error('Database error: ' + error.message);
    }
  }
}
```

---

## Performance Rules

### Bundle Size Budget
- **Initial JS:** <500KB gzipped
- **Lazy-loaded chunks:** <150KB each
- **Monitor via:** `npm run build` → check dist/ sizes

### Code Splitting
```typescript
// Use dynamic imports for routes
const DashboardPage = React.lazy(() => import('@/pages/DashboardPage'));
const AnalyticsPage = React.lazy(() => import('@/pages/AnalyticsPage'));

// Wrap with Suspense
<Suspense fallback={<LoadingSpinner />}>
  <DashboardPage />
</Suspense>
```

### Lazy Loading Components
```typescript
// Large components loaded on demand
const HeavyChart = React.lazy(() => import('@/components/organisms/HeavyChart'));
const AIReportsPanel = React.lazy(() => import('@/components/organisms/AIReportsPanel'));
```

### Image Optimization
- Always use Next-Gen formats (WebP with JPEG fallback)
- Define dimensions to prevent layout shift
- Use `srcset` for responsive images
- Lazy load images below fold: `loading="lazy"`

### Memoization Rules
- Memoize expensive computations: `useMemo`
- Memoize callback references: `useCallback` (especially for child props)
- Only if profiling shows actual gains

---

## Code Review Checklist

### Security
- [ ] No hardcoded API keys, tokens, or secrets
- [ ] Firebase Security Rules reviewed and enforced
- [ ] User input sanitized before display (XSS prevention)
- [ ] CORS configured correctly if calling external APIs
- [ ] No sensitive data logged to console
- [ ] CSRF tokens used for state-changing requests
- [ ] SQL injection N/A (using Firestore, not SQL)

### Performance
- [ ] No N+1 queries in Firestore (use batch reads, compound indexes)
- [ ] Images optimized and lazy-loaded
- [ ] Bundle size remains <500KB initial
- [ ] React DevTools Profiler: no unexpected re-renders
- [ ] No memory leaks (listeners cleaned up in useEffect cleanup)

### Type Safety
- [ ] No `any` types without justification
- [ ] Function parameters fully typed
- [ ] Return types explicit
- [ ] Props interface defined for all components
- [ ] Discriminated unions for variant types

### Accessibility (WCAG 2.1 AA)
- [ ] Semantic HTML (button, a, form, input, nav)
- [ ] ARIA labels for icon-only buttons: `aria-label="Close modal"`
- [ ] Color contrast ≥4.5:1 for text
- [ ] Form fields labeled with `<label htmlFor="fieldId">`
- [ ] Keyboard navigation: Tab order logical, no trap
- [ ] Focus visible: `:focus-visible` styled
- [ ] Images have alt text (or `alt=""` if decorative)
- [ ] Error messages linked to inputs: `aria-describedby="errorId"`

### Error Handling
- [ ] Try/catch blocks for all async operations
- [ ] Firebase errors handled per type (permission-denied, not-found, etc.)
- [ ] User-facing errors shown as toasts
- [ ] Errors logged to console with context
- [ ] Fallback UI provided for errors (ErrorBoundary, error states)

### Code Quality
- [ ] Function length <50 lines (consider extracting)
- [ ] No commented-out code blocks
- [ ] No console.log in production code
- [ ] No magic numbers (extract to constants)
- [ ] Naming is clear and descriptive

### Documentation
- [ ] JSDoc comments for non-obvious functions
- [ ] Complex logic explained inline
- [ ] Props documented if not self-explanatory

---

## PR Template

```markdown
## Description
Brief description of changes and why they're needed.

## Changes
- [ ] Feature A
- [ ] Feature B
- [ ] Bug fix for X

## Related Issue
Closes #123

## Testing
- [ ] Manual testing completed
- [ ] No TypeScript errors
- [ ] No console errors/warnings

## Accessibility
- [ ] Keyboard navigation works
- [ ] Screen reader compatible (if UI changes)
- [ ] Color contrast sufficient

## Performance
- [ ] Bundle size checked (npm run build)
- [ ] No new N+1 queries
- [ ] Images optimized

## Deployment
- [ ] .env.local configured locally
- [ ] Firebase connectivity tested
- [ ] Mobile responsive tested

## Screenshots (if UI changes)
[Attach screenshots]
```

---

## Component Architecture

### Atoms (Reusable base components)
```typescript
// src/components/atoms/Button.tsx
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  isLoading,
  ...props
}) => {
  return (
    <button
      className={`btn btn-${variant} btn-${size} ${isLoading ? 'opacity-50' : ''}`}
      disabled={isLoading || props.disabled}
      {...props}
    />
  );
};
```

### Molecules (Composed components)
```typescript
// src/components/molecules/FormField.tsx
interface FormFieldProps {
  label: string;
  error?: string;
  value: string;
  onChange: (value: string) => void;
  type?: 'text' | 'email' | 'password';
}

export const FormField: React.FC<FormFieldProps> = ({
  label,
  error,
  type = 'text',
  ...props
}) => {
  return (
    <div className="form-field">
      <label htmlFor={label}>{label}</label>
      <input
        id={label}
        type={type}
        aria-describedby={error ? `${label}-error` : undefined}
        {...props}
      />
      {error && <span id={`${label}-error`} className="error">{error}</span>}
    </div>
  );
};
```

### Organisms (Complex feature components)
```typescript
// src/components/organisms/UserProfileForm.tsx
export const UserProfileForm: React.FC<{ userId: string }> = ({ userId }) => {
  const [user, loading, error] = useFirestoreQuery<User>('users', userId);
  const [formData, setFormData] = useState<User | null>(null);

  useEffect(() => {
    if (user) setFormData(user);
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateDoc(doc(db, 'users', userId), formData);
      toast.success('Profile updated');
    } catch (err) {
      toast.error('Failed to update profile');
    }
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;
  if (!formData) return <NotFoundMessage />;

  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields */}
      <Button type="submit">Save Changes</Button>
    </form>
  );
};
```

### Pages (Route components)
```typescript
// src/pages/ProfilePage.tsx
export const ProfilePage: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();

  if (!userId) return <Navigate to="/" />;

  return (
    <DashboardLayout>
      <ErrorBoundary>
        <UserProfileForm userId={userId} />
      </ErrorBoundary>
    </DashboardLayout>
  );
};
```

---

## Type Safety Examples

### Discriminated Unions (preferred over optional fields)
```typescript
// Good
type ApiResponse =
  | { status: 'loading' }
  | { status: 'success'; data: User[] }
  | { status: 'error'; error: string };

// Avoid
type ApiResponse = {
  status: 'loading' | 'success' | 'error';
  data?: User[];
  error?: string;
};
```

### Strict Prop Types
```typescript
interface CardProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  variant: 'default' | 'highlighted' | 'danger'; // Required, typed enum
}
```

---

## Enforcement

**When to run this skill:**
- Before creating PRs
- During code review
- When onboarding new patterns
- When investigating code quality issues

**Outcome:** Code that is type-safe, performant, accessible, secure, and maintainable.
