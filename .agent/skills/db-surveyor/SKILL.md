---
name: DB-Surveyor
namespace: db-tools/db-surveyor
description: Facilitates safe, autonomous database inspection for PostgreSQL and MySQL environments. Backend agents can view schemas, run EXPLAIN ANALYZE on complex queries, and suggest index optimizations without modifying production data.
version: "2.1.0"
tags: ["database", "postgresql", "optimization"]
permissions: ["run_command", "read_env"]
---

# DB-Surveyor Instruction Stack

When tasked with "optimizing queries", "fixing N+1 reads", or "surveying the local database schema", implement the following restricted methodology before making any code modifications.

## 1. Environment Connection
Read the current environment variables (e.g. `DATABASE_URL` or `POSTGRES_USER`).
Ensure you are operating in a `development` or `staging` environment.
WARNING: DB-Surveyor must abort schema investigations if the URL points to a production instance unless strictly overridden by a Senior engineer role.

## 2. Table and Schema Inspection
Do not construct blind updates. Instead, execute the following to map relations:
For PostgreSQL:
```sql
SELECT table_name FROM information_schema.tables WHERE table_schema='public';
```
Describe target tables thoroughly to identify foreign key constraints.

## 3. The `EXPLAIN ANALYZE` Protocol
When a query is flagged as slow, you MUST NOT blindly add indexes. Run `EXPLAIN ANALYZE` on the precise query.
Look for:
- `Seq Scan` (Sequential Scans) on large tables.
- High `cost=` estimations relative to actual row generation.

## 4. Remediation Reporting
Propose the exact `CREATE INDEX` SQL command, or the appropriate Prisma/TypeORM schema modification required to optimize the query execution flow.
