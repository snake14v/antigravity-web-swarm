# React Patterns Reference

## Custom Hook Patterns

### useAuth Hook (Firebase Auth)
```typescript
// src/hooks/useAuth.ts
import { useContext } from 'react';
import { FirebaseAuthContext } from '@/context/FirebaseAuthContext';

export const useAuth = () => {
  const context = useContext(FirebaseAuthContext);
  if (!context) {
    throw new Error('useAuth must be used within FirebaseAuthProvider');
  }
  return context;
};

// Usage:
const { user, loading, signIn, signOut } = useAuth();
```

### useFirestoreQuery Hook (Single Document)
```typescript
// src/hooks/useFirestoreQuery.ts
import { useState, useEffect } from 'react';
import { doc, getDoc, FirebaseError } from 'firebase/firestore';
import { db } from '@/services/firebase';

type UseFirestoreQueryReturn<T> = [T | null, boolean, string | null];

export const useFirestoreQuery = <T,>(
  collection: string,
  id: string
): UseFirestoreQueryReturn<T> => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const snapshot = await getDoc(doc(db, collection, id));
        setData(snapshot.exists() ? (snapshot.data() as T) : null);
        setError(null);
      } catch (err) {
        setError(err instanceof FirebaseError ? err.message : 'Unknown error');
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchData();
    }
  }, [collection, id]);

  return [data, loading, error];
};

// Usage:
const [user, loading, error] = useFirestoreQuery<User>('users', userId);
```

### useFirestoreCollection Hook (Multiple Documents with Query)
```typescript
// src/hooks/useFirestoreCollection.ts
import { useState, useEffect } from 'react';
import { collection, query, where, getDocs, QueryConstraint } from 'firebase/firestore';
import { db } from '@/services/firebase';

type UseFirestoreCollectionReturn<T> = [T[], boolean, string | null];

export const useFirestoreCollection = <T,>(
  collectionName: string,
  constraints?: QueryConstraint[]
): UseFirestoreCollectionReturn<T> => {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const q = query(collection(db, collectionName), ...(constraints || []));
        const snapshots = await getDocs(q);
        setData(snapshots.docs.map((doc) => ({ id: doc.id, ...doc.data() } as T)));
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [collectionName, constraints]);

  return [data, loading, error];
};

// Usage:
const [pilots, loading] = useFirestoreCollection<Pilot>(
  'pilots',
  [where('status', '==', 'active')]
);
```

### useRealtimeDoc Hook (Real-time Listener)
```typescript
// src/hooks/useRealtimeDoc.ts
import { useEffect, useState } from 'react';
import { doc, onSnapshot, FirebaseError } from 'firebase/firestore';
import { db } from '@/services/firebase';

type UseRealtimeDocReturn<T> = [T | null, boolean, string | null];

export const useRealtimeDoc = <T,>(
  collection: string,
  id: string
): UseRealtimeDocReturn<T> => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const unsubscribe = onSnapshot(
      doc(db, collection, id),
      (snapshot) => {
        setData(snapshot.exists() ? (snapshot.data() as T) : null);
        setError(null);
        setLoading(false);
      },
      (err) => {
        console.error('Realtime listener error:', err);
        setError(err instanceof FirebaseError ? err.message : 'Unknown error');
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [collection, id]);

  return [data, loading, error];
};

// Usage: Real-time count updates, live status
const [liveCount, loading] = useRealtimeDoc<{ count: number }>('analytics', 'today');
```

### useLocalStorage Hook
```typescript
// src/hooks/useLocalStorage.ts
import { useState, useEffect } from 'react';

export const useLocalStorage = <T,>(key: string, initialValue: T) => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue] as const;
};

// Usage:
const [theme, setTheme] = useLocalStorage<'light' | 'dark'>('theme', 'light');
```

---

## Component Composition Patterns

### Composition over Props Drilling
```typescript
// Bad: Props drilling
<PageLayout>
  <Header user={user} notifications={notifications} theme={theme} />
  <Content user={user} notifications={notifications} theme={theme} />
  <Footer theme={theme} />
</PageLayout>

// Good: Context + composition
<FirebaseAuthProvider>
  <ThemeProvider>
    <PageLayout>
      <Header />
      <Content />
      <Footer />
    </PageLayout>
  </ThemeProvider>
</FirebaseAuthProvider>

// In Header.tsx:
const { user } = useAuth();
const { theme } = useTheme();
```

### Compound Components Pattern
```typescript
// src/components/molecules/FormGroup.tsx
interface FormGroupContextType {
  error?: string;
  helperText?: string;
}

const FormGroupContext = React.createContext<FormGroupContextType>({});

export const FormGroup: React.FC<{ children: React.ReactNode; error?: string }> = ({
  children,
  error,
}) => (
  <FormGroupContext.Provider value={{ error }}>
    {children}
  </FormGroupContext.Provider>
);

FormGroup.Label = ({ children }: { children: string }) => (
  <label className="form-label">{children}</label>
);

FormGroup.Input = (props: React.InputHTMLAttributes<HTMLInputElement>) => {
  const { error } = React.useContext(FormGroupContext);
  return <input className={error ? 'error' : ''} {...props} />;
};

FormGroup.Error = () => {
  const { error } = React.useContext(FormGroupContext);
  return error ? <span className="error-message">{error}</span> : null;
};

// Usage:
<FormGroup error={emailError}>
  <FormGroup.Label>Email</FormGroup.Label>
  <FormGroup.Input type="email" value={email} onChange={handleEmailChange} />
  <FormGroup.Error />
</FormGroup>
```

### Render Props Pattern (for conditional rendering)
```typescript
// src/components/molecules/AuthGuard.tsx
interface AuthGuardProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  requiredRole?: string;
}

export const AuthGuard: React.FC<AuthGuardProps> = ({
  children,
  fallback = <Navigate to="/login" />,
  requiredRole,
}) => {
  const { user, loading } = useAuth();

  if (loading) return <LoadingSpinner />;

  const hasAccess = user && (!requiredRole || user.role === requiredRole);

  return hasAccess ? <>{children}</> : <>{fallback}</>;
};

// Usage:
<AuthGuard requiredRole="admin" fallback={<AccessDenied />}>
  <AdminPanel />
</AuthGuard>
```

---

## Form Handling Patterns

### Controlled Components with Validation
```typescript
// src/components/organisms/RegistrationForm.tsx
interface FormData {
  firstName: string;
  email: string;
  password: string;
}

interface FormErrors {
  firstName?: string;
  email?: string;
  password?: string;
}

export const RegistrationForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = (): FormErrors => {
    const newErrors: FormErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }

    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      newErrors.email = 'Valid email required';
    }

    if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    return newErrors;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = validateForm();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      setIsSubmitting(true);
      await registerUser(formData);
      toast.success('Account created successfully');
      // Redirect or reset
    } catch (error) {
      toast.error('Registration failed: ' + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormField
        label="First Name"
        name="firstName"
        value={formData.firstName}
        onChange={handleChange}
        error={errors.firstName}
      />
      <FormField
        label="Email"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        error={errors.email}
      />
      <FormField
        label="Password"
        name="password"
        type="password"
        value={formData.password}
        onChange={handleChange}
        error={errors.password}
      />
      <Button type="submit" isLoading={isSubmitting}>
        Create Account
      </Button>
    </form>
  );
};
```

### Form Hook Pattern (useReducer for complex forms)
```typescript
// src/hooks/useForm.ts
interface UseFormOptions<T> {
  initialValues: T;
  onSubmit: (values: T) => Promise<void>;
  validate?: (values: T) => Record<keyof T, string | undefined>;
}

export const useForm = <T extends Record<string, any>>({
  initialValues,
  onSubmit,
  validate,
}: UseFormOptions<T>) => {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Record<keyof T, string | undefined>>({} as any);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [touched, setTouched] = useState<Record<keyof T, boolean>>({} as any);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (validate) {
      const newErrors = validate(values);
      setErrors(newErrors);
      if (Object.values(newErrors).some((err) => err)) return;
    }

    try {
      setIsSubmitting(true);
      await onSubmit(values);
    } finally {
      setIsSubmitting(false);
    }
  };

  return { values, errors, handleChange, handleBlur, handleSubmit, isSubmitting, touched };
};
```

---

## Animation Patterns

### Framer Motion Standard Configs
```typescript
// src/constants/ANIMATION_CONFIGS.ts
export const ANIMATION_CONFIGS = {
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.3 },
  },
  slideInUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 20 },
    transition: { duration: 0.3 },
  },
  slideInDown: {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.3 },
  },
  scaleIn: {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 },
    transition: { duration: 0.2 },
  },
  bounce: {
    animate: { scale: [1, 1.05, 1] },
    transition: { duration: 0.5, repeat: Infinity, repeatDelay: 2 },
  },
};

// Usage:
<motion.div {...ANIMATION_CONFIGS.fadeIn}>
  <YourComponent />
</motion.div>
```

### Modal/Dialog Animation
```typescript
// src/components/molecules/Modal.tsx
import { motion, AnimatePresence } from 'framer-motion';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50"
          />

          {/* Modal content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 flex items-center justify-center"
          >
            <div className="bg-white rounded-lg p-6 max-w-md w-full">
              <h2 className="text-lg font-bold mb-4">{title}</h2>
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
```

### List Item Animations
```typescript
// src/components/organisms/PilotList.tsx
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export const PilotList: React.FC<{ pilots: Pilot[] }> = ({ pilots }) => {
  return (
    <motion.ul
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-2"
    >
      {pilots.map((pilot) => (
        <motion.li key={pilot.id} variants={itemVariants}>
          <PilotCard pilot={pilot} />
        </motion.li>
      ))}
    </motion.ul>
  );
};
```

---

## Responsive Design Patterns

### Mobile-First with Tailwind Breakpoints
```typescript
// Breakpoints: sm=640px, md=768px, lg=1024px, xl=1280px, 2xl=1536px
// Always write mobile styles first, then add breakpoints

// Good: Mobile-first
<div className="flex flex-col gap-4 md:flex-row md:gap-8 lg:gap-12">
  <Sidebar className="hidden md:block" />
  <MainContent />
</div>

// Bad: Desktop-first (avoid)
<div className="flex flex-row gap-12 sm:flex-col sm:gap-4">
```

### Responsive Grid
```typescript
// src/components/organisms/PilotGrid.tsx
export const PilotGrid: React.FC<{ pilots: Pilot[] }> = ({ pilots }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {pilots.map((pilot) => (
        <PilotCard key={pilot.id} pilot={pilot} />
      ))}
    </div>
  );
};
```

### Responsive Typography
```typescript
// src/components/atoms/Heading.tsx
interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  level: 1 | 2 | 3 | 4;
}

export const Heading: React.FC<HeadingProps> = ({ level, children, ...props }) => {
  const sizes = {
    1: 'text-2xl md:text-3xl lg:text-4xl',
    2: 'text-xl md:text-2xl lg:text-3xl',
    3: 'text-lg md:text-xl',
    4: 'text-base md:text-lg',
  };

  const Component = (`h${level}` as any) as React.ElementType;

  return (
    <Component className={`${sizes[level]} font-bold`} {...props}>
      {children}
    </Component>
  );
};
```

---

## Loading/Error/Empty State Patterns

### Loading State
```typescript
// src/components/molecules/DataLoader.tsx
interface DataLoaderProps<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  children: (data: T) => React.ReactNode;
  loadingFallback?: React.ReactNode;
  errorFallback?: (error: string) => React.ReactNode;
  emptyFallback?: React.ReactNode;
}

export const DataLoader = <T,>({
  data,
  loading,
  error,
  children,
  loadingFallback = <LoadingSpinner />,
  errorFallback = (err) => <ErrorMessage message={err} />,
  emptyFallback = <EmptyMessage />,
}: DataLoaderProps<T>) => {
  if (loading) return <>{loadingFallback}</>;
  if (error) return <>{errorFallback(error)}</>;
  if (!data) return <>{emptyFallback}</>;
  return <>{children(data)}</>;
};

// Usage:
<DataLoader data={user} loading={loading} error={error}>
  {(userData) => <UserProfile user={userData} />}
</DataLoader>
```

### Skeleton Loading
```typescript
// src/components/atoms/Skeleton.tsx
export const Skeleton: React.FC<{ width?: string; height?: string }> = ({
  width = 'w-full',
  height = 'h-4',
}) => (
  <div className={`${width} ${height} bg-gray-200 rounded animate-pulse`} />
);

// Usage:
{loading ? (
  <div className="space-y-2">
    <Skeleton height="h-8" />
    <Skeleton height="h-4" width="w-3/4" />
    <Skeleton height="h-4" width="w-1/2" />
  </div>
) : (
  <UserCard user={user} />
)}
```

### Error Boundary with Recovery
```typescript
// src/components/organisms/ErrorBoundary.tsx
interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  ErrorBoundaryState
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error('Error boundary caught:', error, info);
    // Send to error tracking service (e.g., Sentry)
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-4 bg-red-50 border border-red-200 rounded">
          <h2 className="text-red-800 font-bold">Something went wrong</h2>
          <p className="text-red-600 text-sm mt-2">{this.state.error?.message}</p>
          <button
            onClick={this.handleReset}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Try Again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
```

---

## Conditional Rendering Patterns

### Ternary Operator (simple conditions)
```typescript
{isLoading ? <Spinner /> : <Content />}
```

### Logical AND (show if true)
```typescript
{hasPermission && <AdminPanel />}
```

### Early Return (components)
```typescript
export const UserCard: React.FC<{ userId: string }> = ({ userId }) => {
  if (!userId) return <p>No user selected</p>;

  const [user, loading, error] = useFirestoreQuery('users', userId);

  if (loading) return <Skeleton />;
  if (error) return <ErrorMessage message={error} />;
  if (!user) return <p>User not found</p>;

  return <div>{user.name}</div>;
};
```

### Switch for Multiple States
```typescript
switch (status) {
  case 'idle':
    return <Button onClick={handleStart}>Start</Button>;
  case 'loading':
    return <Spinner />;
  case 'success':
    return <SuccessMessage />;
  case 'error':
    return <ErrorMessage message={error} />;
  default:
    return null;
}
```

---

## Hook Rules and Best Practices

### Do
- Call hooks at top level of component
- Use hooks in same order every render
- Name custom hooks with `use` prefix
- Clean up subscriptions in useEffect cleanup

### Don't
- Call hooks conditionally
- Call hooks in loops
- Extract hooks to separate files until reused
- Ignore ESLint warnings about hooks

---

**Last Updated:** February 2025
