# Firebase Patterns Guide

## Firestore Collection Schema Definitions

### Users Collection
```typescript
// Path: /users/{userId}
interface User {
  id: string;                    // Document ID
  email: string;                 // Unique, from Firebase Auth
  firstName: string;
  lastName: string;
  role: 'user' | 'pilot' | 'admin';
  theme: 'light' | 'dark';       // User preference
  createdAt: Timestamp;          // server.timestamp()
  updatedAt: Timestamp;
  lastLoginAt?: Timestamp;
  phone?: string;
  avatar?: string;               // URL to image
  metadata?: {
    loginCount: number;
    preferredLanguage: string;
  };
}

// Indexes needed:
// - email (unique via security rules + application logic)
// - role
// - createdAt (for user analytics)
```

### Registrations Collection (ShopSense hardware registrations)
```typescript
// Path: /registrations/{registrationId}
interface Registration {
  id: string;
  userId: string;                // Reference to /users/{userId}
  shopName: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  serialNumber: string;          // ShopSense device serial
  installDate: Timestamp;
  status: 'active' | 'inactive' | 'archived';

  // Hardware specifics
  hardware: {
    primaryPiSerial: string;     // Raspberry Pi 4 primary
    secondaryPiSerial?: string;  // Backup Pi4 if needed
    cameraCount: number;         // Usually 4
    modelVersion: string;        // YOLOv8n version
    calibrated: boolean;
    calibrationDate?: Timestamp;
  };

  // Billing
  billingCycle: 'monthly' | 'annual';
  nextBillingDate: Timestamp;
  subscriptionStatus: 'active' | 'paused' | 'cancelled';

  // Sync status
  lastSyncAt?: Timestamp;
  offlineCount: number;          // Items waiting to sync

  createdAt: Timestamp;
  updatedAt: Timestamp;
}

// Indexes needed:
// - userId, status
// - subscriptionStatus, nextBillingDate (for billing batch jobs)
// - lastSyncAt (for sync monitoring)
```

### Pilots Collection (ShopSense users/operators)
```typescript
// Path: /registrations/{registrationId}/pilots/{pilotId}
interface Pilot {
  id: string;
  registrationId: string;        // Parent reference
  name: string;
  email: string;
  phone: string;
  role: 'manager' | 'operator' | 'viewer';
  permissions: {
    canViewAnalytics: boolean;
    canConfigureHardware: boolean;
    canManageUsers: boolean;
    canExportData: boolean;
  };
  status: 'active' | 'inactive' | 'invited';
  invitedAt?: Timestamp;
  acceptedAt?: Timestamp;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

// Indexes:
// - registrationId, status
// - email (for user lookups)
```

### Analytics Collection (Real-time metrics)
```typescript
// Path: /registrations/{registrationId}/analytics/{dateKey}
// Example dateKey: "2025-02-15" or "2025-02-15T14:00:00Z" (hourly)
interface AnalyticsEntry {
  id: string;
  registrationId: string;
  date: string;                  // YYYY-MM-DD
  hour?: number;                 // 0-23 for hourly granularity

  // Counter metrics
  itemsDetected: number;
  itemsClassified: number;
  totalRevenue: number;          // In cents
  averageTransactionValue: number;

  // Category breakdown
  categories: {
    [categoryId: string]: {
      count: number;
      revenue: number;
    };
  };

  // Device health
  cameraHealth: {
    [cameraIndex: number]: {
      fps: number;
      exposureMs: number;
      detectionLatencyMs: number;
      errors: number;
    };
  };

  // Status
  systemUptime: number;          // Percentage (0-100)
  syncedAt: Timestamp;

  createdAt: Timestamp;
  updatedAt: Timestamp;
}

// Indexes:
// - registrationId, date (for daily charts)
// - registrationId, hour (for real-time updates)
```

### Settings Collection (Per-registration config)
```typescript
// Path: /registrations/{registrationId}/settings/{settingId}
interface Settings {
  id: string;
  registrationId: string;

  // Detection settings
  detection: {
    minConfidence: number;       // 0-1, e.g., 0.75
    enabledCategories: string[]; // Category IDs to detect
    excludedAreas?: string[];    // ROI masks
  };

  // Billing rules
  billing: {
    pricingTier: 'basic' | 'pro' | 'enterprise';
    itemPrices: {
      [categoryId: string]: number; // In cents
    };
    taxRate: number;             // 0-1, e.g., 0.08 for 8%
  };

  // Alerts
  alerts: {
    lowStorageThreshold: number; // In MB
    highErrorRateThreshold: number; // Percentage
    offlineDurationMinutes: number;
  };

  // Sync strategy
  sync: {
    offlineMode: 'queue' | 'discard';
    batchSize: number;           // Items per upload
    retryAttempts: number;
  };

  updatedAt: Timestamp;
  updatedBy: string;             // userId
}

// Indexes:
// - registrationId (only one settings doc per registration)
```

---

## Security Rules Template

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Helper functions
    function isAuthenticated() {
      return request.auth != null;
    }

    function isOwnUser(userId) {
      return isAuthenticated() && request.auth.uid == userId;
    }

    function isAdmin() {
      return isAuthenticated() &&
             get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }

    function isRegistrationMember(registrationId) {
      return isAuthenticated() &&
             exists(/databases/$(database)/documents/registrations/$(registrationId)/pilots/$(request.auth.uid));
    }

    function hasPilotPermission(registrationId, permission) {
      return isRegistrationMember(registrationId) &&
             get(/databases/$(database)/documents/registrations/$(registrationId)/pilots/$(request.auth.uid)).data.permissions[permission] == true;
    }

    // Users can only read/write their own profile
    match /users/{userId} {
      allow read: if isOwnUser(userId) || isAdmin();
      allow create: if isOwnUser(userId) && request.resource.data.email == request.auth.token.email;
      allow update, delete: if isOwnUser(userId) || isAdmin();
    }

    // Registrations: read if pilot member, write if admin
    match /registrations/{registrationId} {
      allow read: if isRegistrationMember(registrationId);
      allow create: if isAuthenticated(); // Any user can create registration
      allow update: if isRegistrationMember(registrationId) &&
                       hasPilotPermission(registrationId, 'canConfigureHardware');
      allow delete: if isAdmin();

      // Pilots subcollection
      match /pilots/{pilotId} {
        allow read: if isRegistrationMember(registrationId);
        allow create, update: if isRegistrationMember(registrationId) &&
                               hasPilotPermission(registrationId, 'canManageUsers');
        allow delete: if isRegistrationMember(registrationId) &&
                       hasPilotPermission(registrationId, 'canManageUsers');
      }

      // Analytics subcollection: read if viewer, write from trusted source only
      match /analytics/{analyticsDoc} {
        allow read: if isRegistrationMember(registrationId) &&
                       hasPilotPermission(registrationId, 'canViewAnalytics');
        allow create, update: if request.auth.token.firebase.sign_in_provider == 'custom' ||
                               isAdmin(); // Only firmware or admin can write
        allow delete: if isAdmin();
      }

      // Settings subcollection
      match /settings/{settingDoc} {
        allow read: if isRegistrationMember(registrationId);
        allow write: if isRegistrationMember(registrationId) &&
                       hasPilotPermission(registrationId, 'canConfigureHardware');
      }
    }
  }
}
```

---

## Query Optimization

### Compound Indexes

Create these indexes in Firebase Console → Firestore → Indexes:

```
Collection: registrations
Fields:
  1. userId (Ascending)
  2. status (Ascending)
  3. createdAt (Descending)

Collection: registrations / {registrationId} / analytics
Fields:
  1. registrationId (Ascending)
  2. date (Descending)
  3. hour (Descending)

Collection: registrations / {registrationId} / pilots
Fields:
  1. registrationId (Ascending)
  2. status (Ascending)
  3. acceptedAt (Descending)
```

### Pagination with Cursors

```typescript
// src/hooks/usePaginatedQuery.ts
import {
  collection,
  query,
  where,
  orderBy,
  limit,
  startAfter,
  getDocs,
  QueryConstraint,
  DocumentSnapshot
} from 'firebase/firestore';
import { db } from '@/services/firebase';

interface UsePaginatedQueryOptions {
  collectionName: string;
  constraints?: QueryConstraint[];
  pageSize?: number;
  orderByField?: string;
  orderDirection?: 'asc' | 'desc';
}

export const usePaginatedQuery = <T,>({
  collectionName,
  constraints = [],
  pageSize = 20,
  orderByField = 'createdAt',
  orderDirection = 'desc',
}: UsePaginatedQueryOptions) => {
  const [data, setData] = useState<(T & { id: string })[]>([]);
  const [lastDoc, setLastDoc] = useState<DocumentSnapshot | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const fetchNextPage = async () => {
    try {
      setLoading(true);

      const constraints_with_order = [
        ...constraints,
        orderBy(orderByField, orderDirection),
        limit(pageSize + 1), // Fetch one extra to check if more exist
      ] as QueryConstraint[];

      if (lastDoc) {
        constraints_with_order.push(startAfter(lastDoc));
      }

      const q = query(collection(db, collectionName), ...constraints_with_order);
      const snapshots = await getDocs(q);
      const docs = snapshots.docs;

      if (docs.length > pageSize) {
        // More docs exist
        setHasMore(true);
        setLastDoc(docs[pageSize - 1]);
        setData((prev) => [
          ...prev,
          ...docs.slice(0, pageSize).map((doc) => ({ id: doc.id, ...doc.data() } as T & { id: string })),
        ]);
      } else {
        // Last page
        setHasMore(false);
        setLastDoc(docs[docs.length - 1]);
        setData((prev) => [
          ...prev,
          ...docs.map((doc) => ({ id: doc.id, ...doc.data() } as T & { id: string })),
        ]);
      }
    } catch (error) {
      console.error('Pagination error:', error);
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setData([]);
    setLastDoc(null);
    setHasMore(true);
  };

  return { data, hasMore, loading, fetchNextPage, reset };
};

// Usage:
const { data: pilots, hasMore, fetchNextPage } = usePaginatedQuery<Pilot>({
  collectionName: 'registrations',
  constraints: [where('userId', '==', currentUserId)],
  pageSize: 25,
});

// In component:
useEffect(() => {
  fetchNextPage();
}, []);

return (
  <>
    {pilots.map((pilot) => (
      <PilotCard key={pilot.id} pilot={pilot} />
    ))}
    {hasMore && <Button onClick={fetchNextPage}>Load More</Button>}
  </>
);
```

### Avoiding N+1 Queries

Bad (N+1):
```typescript
// This does 1 + N queries (1 for registrations, then 1 per registration)
const [registrations, loading] = useFirestoreCollection<Registration>('registrations');

registrations.forEach(async (reg) => {
  const [settings] = useFirestoreQuery('registrations/' + reg.id + '/settings', 'default');
  // Problem: useFirestoreQuery inside loop = multiple queries
});
```

Good (batched):
```typescript
// Fetch all data needed upfront
const [registrations, loading] = useFirestoreCollection<Registration>(
  'registrations',
  [where('userId', '==', currentUserId)]
);

// Then fetch all settings at once
const settingsPromises = registrations.map((reg) =>
  getDoc(doc(db, 'registrations', reg.id, 'settings', 'default'))
);

const allSettings = await Promise.all(settingsPromises);
```

---

## Real-time Listener Patterns

### onSnapshot with Cleanup
```typescript
// src/hooks/useRealtimeCollection.ts
import { collection, onSnapshot, QueryConstraint } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '@/services/firebase';

export const useRealtimeCollection = <T,>(
  collectionName: string,
  constraints: QueryConstraint[] = []
) => {
  const [data, setData] = useState<(T & { id: string })[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const q = query(collection(db, collectionName), ...constraints);

    // Set up real-time listener
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const items = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        } as T & { id: string }));
        setData(items);
        setError(null);
        setLoading(false);
      },
      (err) => {
        console.error('Realtime listener error:', err);
        setError(err.message);
        setLoading(false);
      }
    );

    // Cleanup: unsubscribe when component unmounts
    return () => unsubscribe();
  }, [collectionName, constraints]);

  return { data, loading, error };
};

// Usage: Real-time pilots list
const { data: pilots } = useRealtimeCollection<Pilot>(
  'registrations',
  [
    where('registrationId', '==', registrationId),
    where('status', '==', 'active'),
  ]
);
```

### Debounced Real-time Queries (prevent excessive updates)
```typescript
// src/hooks/useDebouncedRealtimeQuery.ts
import { useRealtimeDoc } from './useRealtimeDoc';
import { useEffect, useState } from 'react';

export const useDebouncedRealtimeQuery = <T,>(
  collection: string,
  id: string,
  debounceMs: number = 300
) => {
  const [data, loading, error] = useRealtimeDoc<T>(collection, id);
  const [debouncedData, setDebouncedData] = useState<T | null>(data);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedData(data);
    }, debounceMs);

    return () => clearTimeout(timeout);
  }, [data, debounceMs]);

  return [debouncedData, loading, error] as const;
};
```

---

## Auth Flow Patterns

### Email/Password Registration and Login
```typescript
// src/services/auth.ts
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth, db } from './firebase';
import { setDoc, doc } from 'firebase/firestore';

interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export const registerUser = async (data: RegisterData) => {
  try {
    // 1. Create Firebase Auth user
    const { user } = await createUserWithEmailAndPassword(auth, data.email, data.password);

    // 2. Create Firestore user document
    await setDoc(doc(db, 'users', user.uid), {
      id: user.uid,
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      role: 'user',
      theme: 'light',
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });

    return { success: true, userId: user.uid };
  } catch (error) {
    console.error('Registration error:', error);
    throw error;
  }
};

export const loginUser = async (email: string, password: string) => {
  try {
    const { user } = await signInWithEmailAndPassword(auth, email, password);
    return { success: true, userId: user.uid };
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

export const logoutUser = async () => {
  try {
    await signOut(auth);
    return { success: true };
  } catch (error) {
    console.error('Logout error:', error);
    throw error;
  }
};
```

### Google OAuth Integration
```typescript
// src/services/auth.ts (extended)
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  try {
    const { user } = await signInWithPopup(auth, googleProvider);

    // Check if user exists in Firestore
    const userDoc = await getDoc(doc(db, 'users', user.uid));

    if (!userDoc.exists()) {
      // Create new user document
      await setDoc(doc(db, 'users', user.uid), {
        id: user.uid,
        email: user.email,
        firstName: user.displayName?.split(' ')[0] || '',
        lastName: user.displayName?.split(' ').slice(1).join(' ') || '',
        role: 'user',
        theme: 'light',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
    }

    return { success: true, userId: user.uid };
  } catch (error) {
    console.error('Google sign-in error:', error);
    throw error;
  }
};
```

### FirebaseAuthContext for App-wide Auth State
```typescript
// src/context/FirebaseAuthContext.tsx
import React, { createContext, useEffect, useState } from 'react';
import { onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import { auth, db } from '@/services/firebase';
import { getDoc, doc } from 'firebase/firestore';

export interface User extends FirebaseUser {
  role: 'user' | 'pilot' | 'admin';
  theme: 'light' | 'dark';
}

interface FirebaseAuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  signOut: () => Promise<void>;
}

export const FirebaseAuthContext = createContext<FirebaseAuthContextType | undefined>(undefined);

export const FirebaseAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // Get custom user data from Firestore
        const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
        setUser({
          ...firebaseUser,
          role: userDoc.data()?.role || 'user',
          theme: userDoc.data()?.theme || 'light',
        } as User);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Sign-in failed');
      throw err;
    }
  };

  const signUp = async (email: string, password: string, name: string) => {
    try {
      const { user: newUser } = await createUserWithEmailAndPassword(auth, email, password);
      await setDoc(doc(db, 'users', newUser.uid), {
        id: newUser.uid,
        email,
        firstName: name.split(' ')[0],
        lastName: name.split(' ').slice(1).join(' '),
        role: 'user',
        theme: 'light',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Sign-up failed');
      throw err;
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Sign-out failed');
      throw err;
    }
  };

  return (
    <FirebaseAuthContext.Provider
      value={{
        user,
        loading,
        error,
        signIn,
        signUp,
        signOut: handleSignOut,
      }}
    >
      {children}
    </FirebaseAuthContext.Provider>
  );
};
```

---

## Error Handling for Firebase Operations

```typescript
// src/utils/firebaseErrors.ts
import { FirebaseError } from 'firebase/app';

export const handleFirebaseError = (error: unknown): string => {
  if (!(error instanceof FirebaseError)) {
    return 'An unexpected error occurred';
  }

  switch (error.code) {
    // Auth errors
    case 'auth/user-not-found':
      return 'No account found with this email';
    case 'auth/wrong-password':
      return 'Invalid password';
    case 'auth/email-already-in-use':
      return 'Email already registered';
    case 'auth/invalid-email':
      return 'Invalid email format';
    case 'auth/weak-password':
      return 'Password must be at least 6 characters';

    // Firestore errors
    case 'permission-denied':
      return 'You do not have permission to perform this action';
    case 'not-found':
      return 'The requested item was not found';
    case 'already-exists':
      return 'This item already exists';
    case 'failed-precondition':
      return 'Operation failed - precondition not met';
    case 'unavailable':
      return 'Service temporarily unavailable - please try again';
    case 'deadline-exceeded':
      return 'Request timed out - please try again';

    // Network errors
    case 'network-request-failed':
      return 'Network error - check your connection';

    default:
      return `Firebase error: ${error.code}`;
  }
};

// Usage:
try {
  await updateDoc(docRef, updates);
} catch (error) {
  const message = handleFirebaseError(error);
  toast.error(message);
  console.error('Update failed:', error);
}
```

---

**Last Updated:** February 2025
