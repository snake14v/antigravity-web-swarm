---
description: Evaluates Firebase security rules, optimizes Firestore schema design, and analyzes query costs.
---

# Node 21: Firebase Database Architect

This workflow ensures that your Firebase database (Firestore/Realtime DB) is structured optimally for performance, cost, and security.

## When to Run
- After designing a new data feature or collection.
- When Firebase bill/costs begin to unexpectedly spike.
- Before launching a production application (Security Rules audit).

## Execution Pipeline

### 1. Schema Optimization & Read Write Analysis
- **Flat vs Deep Analysis**: Review the schema layout. Ensure data that is often queried together is nested or batched, while data that grows infinitely is kept in root collections.
- **Cost Reduction**: Analyze common queries. Ensure the application is not executing N+1 reads. Suggest `where` clauses and composite indexes to minimize document reads.

### 2. Security Rules Audit
Verify that `firestore.rules` or `database.rules.json` exists and follows the principle of least privilege.
- Ensure there are no `allow read, write: if true;` rules in production.
- **Auth Checks**: Verify that writes require `request.auth != null`.
- **Owner Checks**: Verify that users can only modify their own documents (e.g., `request.auth.uid == resource.data.userId`).

### 3. Data Mitigation & Type Safety
- If using TypeScript, ensure that a `converter` (Firestore DataConverter) is implemented for all collections to maintain type safety across the network bridge.
- Check that timestamps are utilizing `serverTimestamp()` rather than client-generated dates to avoid sync issues.

### 4. Index Generation
- Scan the code for compound queries (queries using multiple `where` clauses or a combination of `where` and `orderBy`).
- Provide the exact `firebase.json` index definitions needed to support these queries so the user does not hit runtime errors.

## Output
After running this workflow, the agent should report:
- Suggested schema refactors to reduce document reads.
- Any security vulnerabilities detected in rules.
- Missing indexes required for production queries.
- Confirmation of TypeScript DataConverter usage.
