---
name: "Architectural Synchronizer"
description: "Cross-module type alignment (TypeScript interfaces shared between components/services/context), API contract consistency between Firebase and React, ShopSense Pi ↔ OLOG dashboard data schema sync"
version: "1.0"
triggers:
  - "type mismatch between modules"
  - "Firebase schema changed"
  - "ShopSense Pi API updated"
  - "manual: /sync-architecture"
escalates_to: "Tech Lead"
---

## When to Run

- **TypeScript type mismatches** between modules (components, services, context)
- **Firebase data schema changed** (new fields, renamed collections)
- **ShopSense Pi API updated** (new endpoints, data format changes)
- **API contract broken** between frontend and backend
- **New data model added** without updating all references
- **Integration between OLOG and ShopSense** breaks
- **Scheduled quarterly** for architecture consistency audit
- Manual trigger: before major feature releases across modules

## Memory Protocol

**Read First:**
- `CLAUDE.md` (project structure, module responsibilities)
- `src/types/` folder (all TypeScript interfaces and types)
- `src/services/firebase.ts` (Firestore schema, collection structure)
- `src/context/` (shared context types)
- ShopSense Pi API documentation (if available)
- `/docs/ARCHITECTURE.md` (module dependencies)
- `/reports/architecture/` for previous sync audits
- Firebase Firestore rules and schema documentation

**Update After:**
- Create `ARCHITECTURE_SYNC_[timestamp].md` with findings
- Update `src/types/` with synchronized interfaces
- Update Firebase Realtime Database types
- Commit type changes with `types: ` prefix
- Update `/docs/ARCHITECTURE.md` if schema changed
- Document ShopSense Pi data contracts
- Update migration guide if breaking changes

## Execution Pipeline

### Phase 1: Type System Inventory (10 mins)

1. **Audit TypeScript types**
   ```bash
   find src/types -name "*.ts" -type f | sort
   grep -r "interface\|type " src --include="*.ts" --include="*.tsx" | grep "export" | sort
   ```
   - List all exported types, interfaces, enums
   - Document: where each type is used
   - Note: types defined inline (anti-pattern)

2. **Check type organization**
   ```
   src/types/
   ├── auth.ts         (User, AuthContext types)
   ├── device.ts       (Device, DeviceConfig, DeviceStatus)
   ├── firebase.ts     (Firestore collection types)
   ├── hardware.ts     (ShopSense Pi hardware types)
   ├── ui.ts          (UI-specific types)
   └── index.ts       (barrel export)
   ```
   - Verify: types organized by domain
   - Verify: no circular imports
   - Verify: no duplicate type definitions

3. **Identify type duplication**
   ```bash
   # Find similar type names
   grep -r "interface User\|type User" src --include="*.ts"
   grep -r "interface Device\|type Device" src --include="*.ts"
   ```
   - Consolidate duplicates into `src/types/`
   - Update imports across codebase
   - Remove local type definitions

### Phase 2: Component-Service Type Alignment (10 mins)

1. **Audit component prop types**
   ```typescript
   // src/components/DeviceCard.tsx
   interface DeviceCardProps {
     device: {
       id: string;
       name: string;
       status: 'online' | 'offline';
       lastSeen?: Date;
     };
     onClick?: () => void;
   }
   ```
   - Document: each component's prop interface
   - Check: prop type matches service/context type
   - Flag: any `any` types (should be concrete)

2. **Check service response types**
   ```typescript
   // src/services/deviceService.ts
   interface GetDeviceResponse {
     id: string;
     name: string;
     status: 'online' | 'offline';
     lastSeenAt: ISO8601String;
     model: string;
   }
   
   export const getDevice = (id: string): Promise<GetDeviceResponse> => { ... };
   ```
   - Service returns: `GetDeviceResponse`
   - Component receives: `DeviceCardProps.device`
   - **Mismatch**: `lastSeen` (prop) vs. `lastSeenAt` (service)
   - **Fix**: align naming and types

3. **Fix type mismatches**
   ```typescript
   // Before: mismatched
   const device = await getDevice(id); // returns GetDeviceResponse
   <DeviceCard device={device} /> // expects DeviceCardProps

   // After: aligned
   interface Device {
     id: string;
     name: string;
     status: 'online' | 'offline';
     lastSeenAt: ISO8601String;
     model: string;
   }
   
   const device: Device = await getDevice(id);
   <DeviceCard device={device} />
   ```

### Phase 3: Firebase Schema & Type Sync (12 mins)

1. **Document Firebase collection schema**
   ```typescript
   // src/types/firebase.ts
   
   // Users collection
   interface FirebaseUser {
     uid: string;
     email: string;
     displayName: string;
     createdAt: FieldValue;
     updatedAt: FieldValue;
   }
   
   // Devices collection
   interface FirebaseDevice {
     id: string;
     ownerId: string; // User reference
     name: string;
     model: 'ShopSense-Pi-v1' | 'ShopSense-Pi-v2';
     status: 'online' | 'offline' | 'error';
     lastSeenAt: FieldValue;
     config: {
       yoloModel: 'v5' | 'v8';
       confidence: number;
       fps: number;
       location?: string;
     };
     createdAt: FieldValue;
     updatedAt: FieldValue;
   }
   ```

2. **Check Firestore operations match schema**
   ```typescript
   // src/services/firebase.ts
   
   export const createDevice = async (data: Omit<FirebaseDevice, 'id' | 'createdAt' | 'updatedAt'>): Promise<FirebaseDevice> => {
     const docRef = await addDoc(collection(db, 'devices'), {
       ...data,
       createdAt: serverTimestamp(),
       updatedAt: serverTimestamp(),
     });
     return { id: docRef.id, ...data, createdAt: new Date(), updatedAt: new Date() };
   };
   ```
   - Verify: types match Firestore operations
   - Verify: required fields are validated before insert
   - Check: nested objects have correct types

3. **Validate read-write consistency**
   - Read: `getDocument()` returns `FirebaseDevice`
   - Write: `updateDevice()` accepts `Partial<FirebaseDevice>`
   - Delete: no type issues
   - Query: filter types match field types

4. **Check for schema drift**
   ```bash
   # Compare Firestore docs with types
   # Manually review a few docs in Firestore console
   # Check: all type fields are present in actual docs
   # Check: no extra fields in docs that types don't expect
   ```

### Phase 4: Context Type Alignment (8 mins)

1. **Audit context value types**
   ```typescript
   // src/context/HardwareBridgeContext.tsx
   interface HardwareBridgeContextValue {
     devices: Device[];
     addDevice: (device: Device) => void;
     updateDevice: (id: string, updates: Partial<Device>) => void;
     removeDevice: (id: string) => void;
     isLoading: boolean;
     error: Error | null;
   }
   ```

2. **Check context consumer types**
   ```typescript
   // src/components/Dashboard.tsx
   const { devices, addDevice, isLoading } = useContext(HardwareBridgeContext);
   ```
   - Verify: consumer uses fields that exist in context
   - Verify: all context fields that are used, are exported
   - Check: no undefined field access

3. **Validate context value mutation**
   - Context returns: immutable snapshots, not references
   - Updates: create new objects, don't mutate
   - Example:
   ```typescript
   const updateDevice = (id: string, updates: Partial<Device>) => {
     setDevices(prevDevices =>
       prevDevices.map(d =>
         d.id === id ? { ...d, ...updates } : d
       )
     );
   };
   ```

### Phase 5: ShopSense Pi ↔ OLOG Data Sync (12 mins)

1. **Document ShopSense Pi API contract**
   ```typescript
   // API: ShopSense Pi sends data to OLOG via Firebase
   
   interface ShopSenseDeviceStatus {
     deviceId: string;
     timestamp: ISO8601String;
     status: 'online' | 'offline' | 'error';
     cpuUsage: number; // 0-100
     memoryUsage: number; // 0-100
     diskUsage: number; // 0-100
     temperature: number; // Celsius
     lastDetectionAt?: ISO8601String;
     totalDetections: number;
     currentFPS: number;
     errors?: string[];
   }
   ```

2. **Map Pi data to OLOG types**
   ```typescript
   // Raw Pi data → OLOG Device type
   interface Device {
     id: string;
     name: string;
     status: 'online' | 'offline' | 'error';
     lastSeenAt: ISO8601String;
     model: string;
     config: DeviceConfig;
     
     // From ShopSense Pi
     metrics: {
       cpuUsage: number;
       memoryUsage: number;
       temperature: number;
       fps: number;
     };
     detectionStats: {
       total: number;
       lastAt?: ISO8601String;
     };
   }
   ```

3. **Verify real-time sync types**
   ```typescript
   // Firebase Realtime Database path:
   // /devices/{deviceId}/status
   
   interface DeviceStatusSnapshot {
     timestamp: FieldValue;
     metrics: Device['metrics'];
     detectionStats: Device['detectionStats'];
   }
   
   // Sync logic:
   onValue(
     ref(database, `devices/${deviceId}/status`),
     (snapshot) => {
       const piData: DeviceStatusSnapshot = snapshot.val();
       // Transform to Device type
       updateDevice(deviceId, {
         lastSeenAt: new Date(piData.timestamp).toISOString(),
         metrics: piData.metrics,
         detectionStats: piData.detectionStats,
       });
     }
   );
   ```

4. **Handle schema versioning**
   ```typescript
   // Future-proof: version your schemas
   interface DeviceV1 {
     id: string;
     name: string;
     status: string;
   }
   
   interface DeviceV2 {
     id: string;
     name: string;
     status: 'online' | 'offline' | 'error';
     schemaVersion: 2;
   }
   
   // Migration:
   const migrateDevice = (old: DeviceV1): DeviceV2 => ({
     ...old,
     status: (old.status as unknown as string).toLowerCase() as any,
     schemaVersion: 2,
   });
   ```

### Phase 6: API Contract Validation (10 mins)

1. **Document API contracts between modules**
   ```typescript
   // Module: src/services/deviceService.ts
   // Contract: "Get device by ID"
   
   /**
    * Fetches a device from Firestore
    * @param deviceId - Unique device ID
    * @returns Promise<Device> with all fields populated
    * @throws Error if device not found or access denied
    */
   export const getDevice = async (deviceId: string): Promise<Device> => { ... };
   
   // Contract expectations:
   // - Input: valid UUID format
   // - Output: complete Device object
   // - Error: specific error codes (NOT_FOUND, FORBIDDEN, INTERNAL_ERROR)
   ```

2. **Check contract adherence**
   - Calls match documented signature
   - Return types match declaration
   - Errors thrown match documentation
   - No undocumented side effects

3. **Validate error handling**
   ```typescript
   // Good: specific error types
   class DeviceNotFoundError extends Error {}
   class AccessDeniedError extends Error {}
   
   export const getDevice = async (id: string): Promise<Device> => {
     try {
       const doc = await getDoc(deviceRef);
       if (!doc.exists()) throw new DeviceNotFoundError(`Device ${id} not found`);
       return doc.data() as Device;
     } catch (error) {
       if (error instanceof DeviceNotFoundError) throw error;
       throw new AccessDeniedError('Cannot access device');
     }
   };
   ```

### Phase 7: Migration & Deprecation (8 mins)

1. **Plan breaking changes**
   ```typescript
   // Old type (deprecated)
   interface DeviceOld {
     deviceId: string; // renamed to 'id'
     displayName: string; // renamed to 'name'
     online: boolean; // changed to 'status: "online" | "offline"'
   }
   
   // New type
   interface Device {
     id: string;
     name: string;
     status: 'online' | 'offline';
   }
   
   // Migration function
   const migrateDeviceType = (old: DeviceOld): Device => ({
     id: old.deviceId,
     name: old.displayName,
     status: old.online ? 'online' : 'offline',
   });
   ```

2. **Update all references gradually**
   - Phase 1: add migration function
   - Phase 2: update old code to use new type
   - Phase 3: remove deprecated type
   - Communicate: breaking changes in CHANGELOG

3. **Version bumping**
   - Patch (0.0.X): non-breaking type refinements
   - Minor (0.X.0): new optional fields, new types
   - Major (X.0.0): removed fields, renamed types, breaking changes

## Output Section

**Deliverables:**
1. **Architecture Sync Report** (`ARCHITECTURE_SYNC_[timestamp].md`)
   - Type duplication analysis
   - Component-service type mismatches
   - Firebase schema vs. type sync status
   - Context type coverage
   - ShopSense Pi data sync validation
   - API contract violations
   - Breaking changes needed
   - Migration plan

2. **Synchronized Types**
   - Consolidated `src/types/` folder
   - Updated interfaces in services
   - Context type definitions
   - Firebase schema types
   - ShopSense Pi integration types

3. **Documentation**
   - Updated `/docs/ARCHITECTURE.md`
   - Type system guide
   - Firebase schema documentation
   - ShopSense Pi data contract
   - API contract specifications

**Success Criteria:**
- No type duplication (single source of truth)
- All components have correct prop types
- All services return documented types
- All context types match consumers
- Firebase types match actual schema
- ShopSense Pi sync types aligned
- All API contracts documented
- No `any` types in core modules
- TypeScript strict mode passing

## Escalation Rules

**Escalate if:**
- Major schema redesign needed (affects >5 modules)
- Breaking changes required across frontend/backend
- ShopSense Pi API fundamentally incompatible
- Type system too complex (needs refactoring)
- Performance: type checking slowing build time

**Auto-escalate if:**
- Type mismatches causing runtime errors
- Data corruption due to schema mismatch
- ShopSense Pi sync failing (data loss)
- Firebase validation failing on writes
- Circular type dependencies detected
