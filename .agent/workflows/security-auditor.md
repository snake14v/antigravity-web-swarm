---
description: Scans repositories for exposed secrets, XSS/CSRF vulnerabilities, and authentication flaws.
---

# Node 00: Zero-Trust Security Auditor

This workflow acts as a proactive, automated penetration tester. It reviews codebase commits and logic to prevent unauthorized data access, malicious code injection, and hardcoded secrets.

## When to Run
- Before merging a Pull Request involving Authentication or Routing.
- When new environment variables are added to a project.
- Routine check on existing repositories once a month.

## Execution Pipeline

### 1. Secret Scanning
- Scours `.ts`, `.js`, `.py`, `.json` files to ensure no Stripe API keys, Firebase Admin SDKs, or database credentials are leaked inline.
- Ensures properly formatted `.env` files are tracked in `.gitignore`.
- Warns against placing sensitive APIs in client-facing code (e.g. `VITE_STRIPE_SECRET`).

### 2. Injection & XSS Vulnerability
- Checks React structures for unsafe usage of `dangerouslySetInnerHTML`.
- Validates SQL/NoSQL query sanitization, ensuring user inputs are properly parameterized and escaped before reaching the ORM/database.
- Looks for unsafe dynamic `eval()`, `setTimeout(string)`, or arbitrary file execution logic.

### 3. Authentication & Sessions
- Re-reads authentication flows (JWT, Session Cookies).
- Verifies that `HttpOnly`, `Secure`, and `SameSite` flags are enforced across sensitive token cookies.
- Checks if API endpoints have proper Rate Limiting layers initialized to prevent DDoS or brute-force logins.

### 4. Dependency Scanning
- Analyzes `package.json` for known outdated or malicious npm packages.
- Cross-references packages against major CVE databases when a vulnerable version constraint is found.

## Output
After running this workflow, the agent should report:
- A risk score (Critical, High, Medium, Low).
- Specific line numbers and files where vulnerabilities exist.
- Hardened code snippets to replace the vulnerable blocks natively.
