# MCP Server Architecture — Ooru Logix

> **Model Context Protocol servers: the bridges between AI agents and the outside world.**

---

## Overview

MCP servers give Ooru Logix agents the ability to **read from and write to external platforms** through authenticated, structured tool calls. Each MCP server wraps a single platform's API and exposes a set of tools that agents can invoke.

No agent ever calls a raw HTTP endpoint. Every external interaction goes through an MCP server.

---

## Server Topology

```
┌─────────────────────────────────────────────────────────────┐
│                        AI AGENTS                             │
│          Claude (Opus/Sonnet) · Antigravity (Gemini)        │
└──────┬──────┬──────┬──────┬──────┬──────┬──────┬───────────┘
       │      │      │      │      │      │      │
  ┌────▼──┐┌──▼───┐┌─▼────┐┌▼─────┐┌▼────┐┌▼────┐┌▼──────┐
  │GitHub ││Fire- ││Razor-││Whats-││Linked││G    ││Vercel │
  │MCP    ││base  ││pay   ││App   ││In   ││Drive││MCP    │
  │Server ││MCP   ││MCP   ││MCP   ││MCP  ││MCP  ││Server │
  └───┬───┘└──┬───┘└──┬───┘└──┬───┘└──┬──┘└──┬──┘└───┬───┘
      │       │       │       │       │      │       │
  ┌───▼───┐┌──▼────┐┌─▼─────┐┌▼──────┐┌▼────┐┌▼────┐┌▼─────┐
  │GitHub ││Google ││Razor- ││Meta  ││Link-││Google││Vercel│
  │API    ││Cloud  ││pay   ││Cloud ││edIn ││Drive ││API   │
  │       ││(Fire) ││API   ││API   ││API  ││API  ││      │
  └───────┘└───────┘└──────┘└──────┘└─────┘└─────┘└──────┘
```

---

## Server Specifications

### 1. GitHub MCP Server → [[GitHub MCP]]

| Property | Value |
|----------|-------|
| **Server ID** | `github-mcp` |
| **Platform** | GitHub (github.com/snake14v) |
| **Auth** | Personal Access Token (PAT) |
| **Env var** | `GITHUB_PAT` |
| **Used by agents** | GitHub Ops, Chief Architect, Sprint Driver, QA Sentinel |
| **Used by plugins** | `dev-ops` |

**Tools exposed:**
| Tool | Action | Example Use |
|------|--------|------------|
| `repo_list` | List all repos | Sprint planning inventory |
| `repo_create` | Create new repo | New project scaffolding |
| `issue_create` | Create issue | Bug tracking from QA |
| `issue_list` | List issues (filtered) | Sprint backlog |
| `pr_create` | Create pull request | Feature branch merge |
| `pr_review` | Add PR review | Code review automation |
| `pr_merge` | Merge pull request | Deploy gate |
| `actions_trigger` | Trigger GitHub Action | CI/CD pipeline |
| `release_create` | Create release | Version tagging |
| `file_read` | Read file from repo | Config checks |
| `file_write` | Write/update file | Automated doc updates |

---

### 2. Firebase MCP Server → [[Firebase MCP]]

| Property | Value |
|----------|-------|
| **Server ID** | `firebase-mcp` |
| **Platform** | Google Firebase (oorulogix project) |
| **Auth** | Service Account JSON |
| **Env var** | `FIREBASE_SERVICE_ACCOUNT` |
| **Used by agents** | Chief Architect, Client Success, Revenue Tracker |
| **Used by plugins** | `dev-ops`, `finance-hub`, `company-brain` |

**Tools exposed:**
| Tool | Action | Example Use |
|------|--------|------------|
| `firestore_read` | Read document/collection | Customer data lookup |
| `firestore_write` | Write/update document | Registration update |
| `firestore_query` | Complex query | "All customers in JP Nagar" |
| `firestore_delete` | Delete document | Data cleanup |
| `auth_list_users` | List auth users | User audit |
| `auth_create_user` | Create auth user | Client onboarding |
| `analytics_query` | Query analytics events | Website traffic data |
| `hosting_deploy` | Trigger deploy | Push new build |

---

### 3. Razorpay MCP Server → [[Razorpay MCP]]

| Property | Value |
|----------|-------|
| **Server ID** | `razorpay-mcp` |
| **Platform** | Razorpay (payment gateway) |
| **Auth** | API Key ID + Key Secret |
| **Env vars** | `RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET` |
| **Used by agents** | Revenue Tracker, Deal Closer, Expense Logger |
| **Used by plugins** | `shopsense-sales`, `finance-hub` |

**Tools exposed:**
| Tool | Action | Example Use |
|------|--------|------------|
| `payment_link_create` | Create payment link | Send to customer for ShopSense kit |
| `payment_link_status` | Check payment status | Follow up on pending payments |
| `order_create` | Create order | Hardware order for customer |
| `order_fetch` | Fetch order details | Order status check |
| `payment_fetch` | Fetch payment details | Payment reconciliation |
| `refund_create` | Process refund | Customer refund |
| `invoice_create` | Create invoice | Generate ShopSense invoice |
| `settlement_fetch` | Fetch settlements | Cash flow tracking |

---

### 4. WhatsApp Business MCP Server → [[WhatsApp MCP]]

| Property | Value |
|----------|-------|
| **Server ID** | `whatsapp-mcp` |
| **Platform** | Meta WhatsApp Business Cloud API |
| **Auth** | System User Access Token |
| **Env vars** | `WHATSAPP_TOKEN`, `WHATSAPP_PHONE_ID` |
| **Used by agents** | Deal Closer, Client Success, Daily Dispatcher |
| **Used by plugins** | `shopsense-sales`, `company-brain` |

**Tools exposed:**
| Tool | Action | Example Use |
|------|--------|------------|
| `send_text` | Send text message | Customer reply |
| `send_template` | Send template message | Pilot follow-up Day 7 |
| `send_document` | Send document (PDF) | Proposal/invoice delivery |
| `send_image` | Send image | Product photo, data screenshot |
| `read_messages` | Read incoming messages | Lead detection |
| `mark_read` | Mark message as read | Inbox management |
| `get_media` | Download received media | Customer photos |

**Message Templates (pre-approved):**
| Template | Use Case |
|----------|----------|
| `shopsense_intro` | First contact: "Hi {{name}}, thanks for your interest in ShopSense..." |
| `pilot_day7` | Day 7 check-in: "Hi {{name}}, here's your 7-day data summary..." |
| `pilot_conversion` | Day 14 conversion: "Your 2-week pilot data shows..." |
| `payment_confirmation` | Payment received: "Payment of ₹{{amount}} received. Thank you!" |
| `support_response` | Support reply: "Hi {{name}}, regarding your issue..." |

---

### 5. LinkedIn MCP Server → [[LinkedIn MCP]]

| Property | Value |
|----------|-------|
| **Server ID** | `linkedin-mcp` |
| **Platform** | LinkedIn (Marketing API / UGC API) |
| **Auth** | OAuth 2.0 (3-legged) |
| **Env vars** | `LINKEDIN_ACCESS_TOKEN`, `LINKEDIN_ORG_ID` |
| **Used by agents** | Content Engine, Social Scheduler, Brand Guardian |
| **Used by plugins** | `content-engine` |

**Tools exposed:**
| Tool | Action | Example Use |
|------|--------|------------|
| `post_create` | Create text/image post | Publish weekly LinkedIn post |
| `post_analytics` | Get post engagement data | Content performance review |
| `profile_update` | Update profile sections | Headline/about optimization |
| `comment_reply` | Reply to comments | Engagement management |
| `connections_list` | List connections | Lead prospecting |
| `company_page_post` | Post to company page | Brand announcements |

---

### 6. Google Drive MCP Server → [[Google Drive MCP]]

| Property | Value |
|----------|-------|
| **Server ID** | `gdrive-mcp` |
| **Platform** | Google Drive (Workspace) |
| **Auth** | Service Account or OAuth 2.0 |
| **Env vars** | `GDRIVE_SERVICE_ACCOUNT` or `GDRIVE_ACCESS_TOKEN` |
| **Used by agents** | All agents (document storage) |
| **Used by plugins** | All plugins |

**Tools exposed:**
| Tool | Action | Example Use |
|------|--------|------------|
| `file_upload` | Upload file to Drive | Save generated reports |
| `file_download` | Download file | Read client documents |
| `file_search` | Search by name/type | Find proposal templates |
| `folder_create` | Create folder | New client folder structure |
| `file_share` | Set sharing permissions | Share proposal with client |
| `file_list` | List files in folder | Audit folder contents |
| `doc_create` | Create Google Doc | Generate client report |
| `sheet_read` | Read Google Sheet | Pull financial data |
| `sheet_write` | Write to Google Sheet | Update revenue tracker |

**Drive Folder Structure:**
```
Ooru Logix/
├── Clients/
│   ├── [Client Name]/
│   │   ├── Proposals/
│   │   ├── Invoices/
│   │   ├── Reports/
│   │   └── Communications/
├── Finance/
│   ├── Invoices/
│   ├── Receipts/
│   └── Tax/
├── Marketing/
│   ├── Content Calendar/
│   ├── Assets/
│   └── Analytics/
├── Engineering/
│   ├── Architecture/
│   ├── Documentation/
│   └── Release Notes/
└── Legal/
    ├── Contracts/
    ├── Registrations/
    └── Compliance/
```

---

### 7. Vercel MCP Server → [[Vercel MCP]]

| Property | Value |
|----------|-------|
| **Server ID** | `vercel-mcp` |
| **Platform** | Vercel (hosting/deployment) |
| **Auth** | API Token |
| **Env var** | `VERCEL_TOKEN` |
| **Used by agents** | GitHub Ops, Chief Architect |
| **Used by plugins** | `dev-ops` |

**Tools exposed:**
| Tool | Action | Example Use |
|------|--------|------------|
| `deploy_trigger` | Trigger deployment | Push new build to production |
| `deploy_status` | Check deploy status | Verify successful deploy |
| `deploy_list` | List recent deployments | Audit deploy history |
| `env_set` | Set environment variable | Update API keys |
| `env_list` | List env variables | Audit configs |
| `domain_list` | List domains | Verify oorulogix.com, xgo3d.com |
| `project_list` | List projects | Inventory of deployments |
| `logs_fetch` | Fetch runtime logs | Debug production issues |

---

## Configuration File

All MCP servers are configured in a single JSON file that agents read at session start:

**File:** `company/mcp-config.json`

```json
{
  "mcpServers": {
    "github-mcp": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "${GITHUB_PAT}"
      }
    },
    "firebase-mcp": {
      "command": "npx",
      "args": ["-y", "@anthropic/firebase-mcp-server"],
      "env": {
        "FIREBASE_SERVICE_ACCOUNT": "${FIREBASE_SERVICE_ACCOUNT}"
      }
    },
    "gdrive-mcp": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-gdrive"],
      "env": {
        "GDRIVE_SERVICE_ACCOUNT": "${GDRIVE_SERVICE_ACCOUNT}"
      }
    },
    "razorpay-mcp": {
      "command": "node",
      "args": ["./mcp-servers/razorpay/index.js"],
      "env": {
        "RAZORPAY_KEY_ID": "${RAZORPAY_KEY_ID}",
        "RAZORPAY_KEY_SECRET": "${RAZORPAY_KEY_SECRET}"
      }
    },
    "whatsapp-mcp": {
      "command": "node",
      "args": ["./mcp-servers/whatsapp/index.js"],
      "env": {
        "WHATSAPP_TOKEN": "${WHATSAPP_TOKEN}",
        "WHATSAPP_PHONE_ID": "${WHATSAPP_PHONE_ID}"
      }
    },
    "linkedin-mcp": {
      "command": "node",
      "args": ["./mcp-servers/linkedin/index.js"],
      "env": {
        "LINKEDIN_ACCESS_TOKEN": "${LINKEDIN_ACCESS_TOKEN}",
        "LINKEDIN_ORG_ID": "${LINKEDIN_ORG_ID}"
      }
    },
    "vercel-mcp": {
      "command": "npx",
      "args": ["-y", "@vercel/mcp-server"],
      "env": {
        "VERCEL_TOKEN": "${VERCEL_TOKEN}"
      }
    }
  }
}
```

---

## Health Monitoring

Each MCP server has a health check that runs at session start:

| Check | Pass Criteria | Fail Action |
|-------|--------------|-------------|
| Auth valid | Token not expired, API responds 200 | Alert Vaishak, skip server |
| Rate limit OK | <80% of rate limit consumed | Throttle requests |
| Permissions | Required scopes present | Alert + document missing scopes |
| Connectivity | Platform reachable | Retry 3x, then alert |

---

## Tags
#mcp #architecture #integrations #servers #api
