import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, ChevronDown, ChevronUp, Zap, Server, Clock, Network,
  CheckCircle2, Play, Pause, ExternalLink, Activity, Users, Workflow
} from 'lucide-react';

// ============================================================================
// DATA
// ============================================================================

interface Agent {
  id: string;
  name: string;
  role: string;
  department: 'Sales' | 'Marketing' | 'Engineering' | 'Finance/Ops' | 'Web Dev' | 'Customer Success';
  status: 'Active' | 'Standby';
  triggers: string[];
  skills: string[];
  mcps: string[];
}

interface Skill {
  id: string;
  name: string;
  department: string;
  description: string;
  input: string;
  output: string;
}

interface MCPServer {
  id: string;
  name: string;
  status: 'Connected' | 'Planned';
  agents: string[];
  toolCount: number;
  tools: string[];
}

interface ScheduledTask {
  id: string;
  name: string;
  schedule: string;
  scheduleTime: string;
  description: string;
  active: boolean;
  nextRun: string;
}

interface WorkflowDef {
  id: string;
  name: string;
  steps: string[];
}

const AGENTS_DATA: Agent[] = [
  { id: 'lead-qualifier', name: 'Lead Qualifier', role: 'Scores inbound leads using BANT framework', department: 'Sales', status: 'Active', triggers: ['new registration', 'website form'], skills: ['lead-qualify', 'lead-score'], mcps: ['Apollo', 'Common Room'] },
  { id: 'outreach-drafter', name: 'Outreach Drafter', role: 'Drafts WhatsApp/email sequences', department: 'Sales', status: 'Active', triggers: ['lead scored >50'], skills: ['outreach-draft', 'whatsapp-send'], mcps: ['WhatsApp Business'] },
  { id: 'deal-closer', name: 'Deal Closer', role: 'Manages pilot to conversion pipeline', department: 'Sales', status: 'Active', triggers: ['pilot day 5+'], skills: ['proposal-draft', 'objection-handle'], mcps: ['Firebase'] },
  { id: 'pilot-manager', name: 'Pilot Manager', role: 'Tracks active pilot metrics', department: 'Sales', status: 'Active', triggers: ['pilot started'], skills: ['pilot-track', 'accuracy-monitor'], mcps: ['Firebase'] },
  { id: 'content-creator', name: 'Content Creator', role: 'Generates LinkedIn/Instagram/blog content', department: 'Marketing', status: 'Active', triggers: ['Monday content brief', 'manual'], skills: ['linkedin-post', 'instagram-caption', 'blog-draft'], mcps: ['Google Drive'] },
  { id: 'brand-guardian', name: 'Brand Guardian', role: 'Reviews all content against brand voice', department: 'Marketing', status: 'Active', triggers: ['content drafted'], skills: ['brand-review', 'voice-check'], mcps: [] },
  { id: 'seo-monitor', name: 'SEO Monitor', role: 'Tracks rankings, audits pages', department: 'Marketing', status: 'Active', triggers: ['weekly', 'page deployed'], skills: ['seo-audit', 'keyword-track'], mcps: ['Chrome', 'Google Drive'] },
  { id: 'social-scheduler', name: 'Social Scheduler', role: 'Queues approved content for publishing', department: 'Marketing', status: 'Active', triggers: ['content approved'], skills: ['schedule-post', 'analytics-pull'], mcps: ['Chrome'] },
  { id: 'code-architect', name: 'Code Architect', role: 'Reviews PRs, enforces standards', department: 'Engineering', status: 'Active', triggers: ['code pushed', 'PR created'], skills: ['code-review', 'pattern-check'], mcps: ['GitHub'] },
  { id: 'deploy-manager', name: 'Deploy Manager', role: 'Handles Vercel deploys and rollbacks', department: 'Engineering', status: 'Active', triggers: ['git push main'], skills: ['deploy-check', 'smoke-test'], mcps: ['GitHub', 'Chrome'] },
  { id: 'sprint-planner', name: 'Sprint Planner', role: 'Plans weekly sprints, tracks velocity', department: 'Engineering', status: 'Active', triggers: ['Monday 9:30AM'], skills: ['sprint-plan', 'capacity-calc'], mcps: ['GitHub'] },
  { id: 'firmware-sync', name: 'Firmware Sync', role: 'Manages Pi firmware and model updates', department: 'Engineering', status: 'Standby', triggers: ['model trained', 'manual'], skills: ['firmware-update', 'model-deploy'], mcps: ['GitHub'] },
  { id: 'bug-triager', name: 'Bug Triager', role: 'Classifies and routes reported issues', department: 'Engineering', status: 'Active', triggers: ['bug reported'], skills: ['bug-triage', 'severity-classify'], mcps: ['GitHub', 'Slack'] },
  { id: 'revenue-tracker', name: 'Revenue Tracker', role: 'Logs all incoming revenue', department: 'Finance/Ops', status: 'Active', triggers: ['payment received'], skills: ['revenue-log', 'invoice-gen'], mcps: ['Firebase', 'Razorpay'] },
  { id: 'expense-logger', name: 'Expense Logger', role: 'Categorizes all expenses', department: 'Finance/Ops', status: 'Active', triggers: ['daily close'], skills: ['expense-track', 'gst-calc'], mcps: ['Firebase'] },
  { id: 'invoice-generator', name: 'Invoice Generator', role: 'Creates GST-ready invoices', department: 'Finance/Ops', status: 'Active', triggers: ['deal closed', 'subscription due'], skills: ['invoice-gen', 'pdf-create'], mcps: ['Firebase', 'Google Drive'] },
  { id: 'compliance-monitor', name: 'Compliance Monitor', role: 'Tracks legal/regulatory requirements', department: 'Finance/Ops', status: 'Standby', triggers: ['monthly', 'revenue threshold'], skills: ['compliance-check', 'registration-track'], mcps: ['Google Drive'] },
  { id: 'web-architect', name: 'Web Architect', role: 'Maintains design system and component specs', department: 'Web Dev', status: 'Active', triggers: ['feature request'], skills: ['component-spec', 'token-manage'], mcps: ['Figma'] },
  { id: 'qa-tester', name: 'QA Tester', role: 'Runs testing checklists on deploys', department: 'Web Dev', status: 'Active', triggers: ['deploy complete'], skills: ['smoke-test', 'accessibility-check'], mcps: ['Chrome'] },
  { id: 'seo-optimizer', name: 'SEO Optimizer', role: 'Implements structured data, meta tags', department: 'Web Dev', status: 'Active', triggers: ['page created/modified'], skills: ['structured-data', 'meta-optimize'], mcps: ['Chrome'] },
  { id: 'onboarding-manager', name: 'Onboarding Manager', role: 'Guides new customers through install to go-live', department: 'Customer Success', status: 'Active', triggers: ['payment confirmed'], skills: ['onboarding-track', 'training-schedule'], mcps: ['WhatsApp', 'Firebase'] },
  { id: 'support-responder', name: 'Support Responder', role: 'Handles inbound support via WhatsApp', department: 'Customer Success', status: 'Active', triggers: ['customer message'], skills: ['issue-diagnose', 'response-draft'], mcps: ['WhatsApp', 'Firebase'] },
  { id: 'health-monitor', name: 'Health Monitor', role: 'Tracks system health for deployed customers', department: 'Customer Success', status: 'Active', triggers: ['daily', 'anomaly detected'], skills: ['health-check', 'churn-detect'], mcps: ['Firebase'] },
];

const SKILLS_DATA: Skill[] = [
  { id: 'company-brain', name: 'Company Brain', department: 'Core', description: 'Central context hub for all agents', input: 'Context', output: 'Company Knowledge' },
  { id: 'lead-qualify', name: 'Lead Qualifier', department: 'Sales', description: 'Lead qualification and outreach automation', input: 'Lead Data', output: 'Scored Lead + Outreach Draft' },
  { id: 'deal-close', name: 'Deal Closer', department: 'Sales', description: 'Pipeline management and conversion', input: 'Qualified Lead', output: 'Closed Deal' },
  { id: 'content-engine', name: 'Content Engine', department: 'Marketing', description: 'Multi-channel content creation', input: 'Content Brief', output: 'Drafted Content' },
  { id: 'brand-review', name: 'Brand Guardian', department: 'Marketing', description: 'Brand voice enforcement and review', input: 'Draft Content', output: 'Reviewed Content' },
  { id: 'seo-track', name: 'SEO Monitor', department: 'Marketing', description: 'SEO tracking and optimization', input: 'Website', output: 'SEO Report' },
  { id: 'code-review', name: 'Code Architect', department: 'Engineering', description: 'Code standards and review', input: 'Code/PR', output: 'Review Report' },
  { id: 'deploy-manage', name: 'Deploy Manager', department: 'Engineering', description: 'Deployment and rollback management', input: 'Build', output: 'Deployed Site' },
  { id: 'sprint-plan', name: 'Sprint Planner', department: 'Engineering', description: 'Sprint planning and velocity tracking', input: 'Backlog', output: 'Sprint Plan' },
  { id: 'firmware-sync', name: 'Firmware Sync', department: 'Engineering', description: 'Hardware firmware and model updates', input: 'Model/Firmware', output: 'Deployed Update' },
  { id: 'finance-track', name: 'Finance Tracker', department: 'Finance', description: 'Revenue/expense tracking and reporting', input: 'Transactions', output: 'Financial Report' },
  { id: 'ops-manage', name: 'Ops Manager', department: 'Finance', description: 'Operations and vendor management', input: 'Operations Data', output: 'Ops Report' },
  { id: 'legal-comply', name: 'Legal Compliance', department: 'Finance', description: 'Indian startup legal and compliance', input: 'Compliance Check', output: 'Status Report' },
  { id: 'component-spec', name: 'Web Architect', department: 'Web Dev', description: 'Design system and component management', input: 'Design Spec', output: 'Component' },
  { id: 'web-qa', name: 'Web QA', department: 'Web Dev', description: 'Testing strategy and execution', input: 'Deploy', output: 'Test Report' },
  { id: 'web-seo', name: 'Web SEO', department: 'Web Dev', description: 'Website-specific SEO optimization', input: 'Page', output: 'SEO Optimized Page' },
  { id: 'scheduler', name: 'Task Scheduler', department: 'Automation', description: 'Scheduled workflow automation', input: 'Time Trigger', output: 'Workflow Execution' },
  { id: 'morning-brief', name: 'Morning Briefing', department: 'Automation', description: 'Daily morning briefing generation', input: 'Data Sources', output: 'Morning Brief' },
  { id: 'customer-onboard', name: 'Customer Onboarding', department: 'Customer Success', description: 'End-to-end customer onboarding', input: 'New Customer', output: 'Onboarded Customer' },
  { id: 'customer-support', name: 'Customer Support', department: 'Customer Success', description: 'Ongoing customer support', input: 'Support Ticket', output: 'Resolution' },
];

const MCP_SERVERS_DATA: MCPServer[] = [
  // VERIFIED WORKING — tested live 2026-04-10
  { id: 'apollo', name: 'Apollo', status: 'Connected', agents: ['Lead Qualifier', 'Outreach Drafter'], toolCount: 7, tools: ['enrich-lead', 'prospect', 'sequence-load', 'contacts-search', 'contacts-create', 'orgs-enrich', 'campaigns'] },
  { id: 'figma', name: 'Figma', status: 'Connected', agents: ['Web Architect', 'QA Tester'], toolCount: 6, tools: ['design-context', 'screenshot', 'search-design-system', 'variables', 'metadata', 'code-connect'] },
  { id: 'googledrive', name: 'Google Drive', status: 'Connected', agents: ['Content Creator', 'SEO Monitor', 'Invoice Gen', 'Compliance'], toolCount: 3, tools: ['fetch', 'search', 'upload'] },
  { id: 'chrome', name: 'Chrome Browser', status: 'Connected', agents: ['SEO Monitor', 'Social Scheduler', 'Deploy Manager', 'QA Tester'], toolCount: 7, tools: ['navigate', 'read-page', 'screenshot', 'javascript', 'form-input', 'find', 'file-upload'] },
  { id: 'tavily', name: 'Tavily Research', status: 'Connected', agents: ['Content Creator', 'SEO Monitor', 'Market Researcher'], toolCount: 5, tools: ['search', 'crawl', 'extract', 'research', 'map'] },
  { id: 'exasearch', name: 'Exa Search', status: 'Connected', agents: ['Content Creator', 'SEO Monitor'], toolCount: 2, tools: ['web-search', 'web-fetch'] },
  { id: 'huggingface', name: 'Hugging Face', status: 'Connected', agents: ['Firmware Sync', 'Code Architect'], toolCount: 5, tools: ['hub-search', 'paper-search', 'space-search', 'doc-fetch', 'model-query'] },
  { id: 'desktopcommander', name: 'Desktop Commander', status: 'Connected', agents: ['Code Architect', 'Deploy Manager'], toolCount: 6, tools: ['read-file', 'write-file', 'start-process', 'list-processes', 'search', 'edit-block'] },
  { id: 'kubernetes', name: 'Kubernetes', status: 'Connected', agents: ['Deploy Manager', 'Health Monitor'], toolCount: 6, tools: ['kubectl-get', 'kubectl-apply', 'kubectl-logs', 'describe', 'helm-install', 'port-forward'] },
  { id: 'vibeprospecting', name: 'Vibe Prospecting', status: 'Connected', agents: ['Lead Qualifier', 'Deal Closer'], toolCount: 5, tools: ['enrich-business', 'enrich-prospects', 'match-business', 'fetch-entities', 'export-csv'] },
  { id: 'scheduledtasks', name: 'Scheduled Tasks', status: 'Connected', agents: ['Scheduler', 'All Automated Workflows'], toolCount: 3, tools: ['create-task', 'list-tasks', 'update-task'] },
];

const SCHEDULED_TASKS_DATA: ScheduledTask[] = [
  { id: 'morning-briefing', name: 'Morning Briefing', schedule: 'Daily', scheduleTime: '8:00 AM', description: 'Morning priorities, pipeline, metrics, blockers', active: true, nextRun: 'Tomorrow 8:00 AM' },
  { id: 'sales-pipeline-check', name: 'Sales Pipeline Check', schedule: 'Daily', scheduleTime: '8:30 AM', description: 'New registrations, lead scoring, follow-up drafts', active: true, nextRun: 'Tomorrow 8:30 AM' },
  { id: 'daily-standup', name: 'Daily Standup', schedule: 'Daily', scheduleTime: '9:00 AM', description: 'Yesterday/today/blockers from PROGRESS.md', active: true, nextRun: 'Tomorrow 9:00 AM' },
  { id: 'content-queue-check', name: 'Content Queue Check', schedule: 'Daily', scheduleTime: '12:00 PM', description: 'Content drafting, brand review, scheduling', active: true, nextRun: 'Tomorrow 12:00 PM' },
  { id: 'daily-close', name: 'Daily Close', schedule: 'Daily', scheduleTime: '5:00 PM', description: 'Revenue/expense logging, cash position, tomorrow prep', active: true, nextRun: 'Tomorrow 5:00 PM' },
  { id: 'weekly-business-review', name: 'Weekly Business Review', schedule: 'Weekly', scheduleTime: 'Friday 4:00 PM', description: 'KPIs, financials, strategy check, gate progress', active: true, nextRun: 'Friday 4:00 PM' },
  { id: 'sprint-planning', name: 'Sprint Planning', schedule: 'Weekly', scheduleTime: 'Monday 9:30 AM', description: 'Backlog review, estimation, sprint commitment', active: true, nextRun: 'Monday 9:30 AM' },
  { id: 'monthly-financial-close', name: 'Monthly Financial Close', schedule: 'Monthly', scheduleTime: '1st 10:00 AM', description: 'P&L reconciliation, runway, compliance check', active: true, nextRun: 'May 1st 10:00 AM' },
];

const WORKFLOWS_DATA: WorkflowDef[] = [
  { id: 'daily-ops', name: 'Daily Operations', steps: ['Morning Briefing', 'Pipeline Check', 'Standup', 'Content Queue', 'Daily Close', 'Night Review'] },
  { id: 'sales-pipeline', name: 'Sales Pipeline', steps: ['Lead Detected', 'Qualify (Apollo)', 'Score', 'Outreach', 'Demo', 'Pilot', 'Convert/Drop'] },
  { id: 'content-calendar', name: 'Content Calendar', steps: ['Monday Brief', 'Tuesday Draft', 'Wednesday Review', 'Thursday Schedule', 'Friday Metrics'] },
  { id: 'weekly-business-review', name: 'Weekly Business Review', steps: ['Collect KPIs', 'Variance Analysis', 'Strategy Check', 'WBR Document', 'Action Items'] },
  { id: 'client-onboard', name: 'Client Onboarding', steps: ['Payment', 'Kit Prep', 'Install', 'Train', 'Go-Live', 'Monitor', 'Handoff'] },
];

const DEPARTMENT_COLORS: Record<string, string> = {
  Sales: 'text-amber-400',
  Marketing: 'text-purple-400',
  Engineering: 'text-cyan-400',
  'Finance/Ops': 'text-green-400',
  'Web Dev': 'text-pink-400',
  'Customer Success': 'text-emerald-400',
  Core: 'text-cyan-400',
  Automation: 'text-pink-400',
  Finance: 'text-green-400',
};

const DEPARTMENT_BORDER: Record<string, string> = {
  Sales: 'border-amber-500/30',
  Marketing: 'border-purple-500/30',
  Engineering: 'border-cyan-500/30',
  'Finance/Ops': 'border-green-500/30',
  'Web Dev': 'border-pink-500/30',
  'Customer Success': 'border-emerald-500/30',
  Core: 'border-cyan-500/30',
  Automation: 'border-pink-500/30',
  Finance: 'border-green-500/30',
};

// ============================================================================
// STAT BAR (shared across all tabs)
// ============================================================================

export const CompanyOSStats: React.FC = () => (
  <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 mb-8">
    {[
      { label: 'Agents', value: '24', color: 'text-neon-cyan' },
      { label: 'Skills', value: '20', color: 'text-neon-purple' },
      { label: 'MCPs', value: '10', color: 'text-green-400' },
      { label: 'Tasks', value: '8', color: 'text-amber-400' },
      { label: 'Workflows', value: '5', color: 'text-pink-400' },
      { label: 'Knowledge', value: '90+', color: 'text-emerald-400' },
    ].map((s) => (
      <div key={s.label} className="bg-cyber-900/50 border border-white/10 rounded-xl p-3 text-center">
        <div className={`text-xl font-bold font-mono ${s.color}`}>{s.value}</div>
        <div className="text-[9px] text-gray-500 uppercase tracking-widest font-mono mt-1">{s.label}</div>
      </div>
    ))}
  </div>
);

// ============================================================================
// AGENTS VIEW
// ============================================================================

export const AgentsView: React.FC = () => {
  const [search, setSearch] = useState('');
  const [expandedDept, setExpandedDept] = useState<string | null>('Sales');

  const filtered = useMemo(() => {
    if (!search) return AGENTS_DATA;
    const q = search.toLowerCase();
    return AGENTS_DATA.filter(a => a.name.toLowerCase().includes(q) || a.role.toLowerCase().includes(q));
  }, [search]);

  const grouped = useMemo(() => {
    const g: Record<string, Agent[]> = {};
    filtered.forEach(a => {
      if (!g[a.department]) g[a.department] = [];
      g[a.department].push(a);
    });
    return g;
  }, [filtered]);

  return (
    <div>
      <div className="flex items-center justify-between mb-6 gap-4">
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600" size={16} />
          <input
            type="text"
            placeholder="Search agents..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full bg-cyber-900 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-neon-cyan transition-colors"
          />
        </div>
        <span className="text-xs font-mono text-gray-500">{filtered.length} agents</span>
      </div>

      <div className="space-y-3">
        {Object.entries(grouped).map(([dept, agents]) => (
          <div key={dept} className={`bg-cyber-900/30 border border-white/10 rounded-2xl overflow-hidden`}>
            <button
              onClick={() => setExpandedDept(expandedDept === dept ? null : dept)}
              className="w-full px-5 py-3.5 flex items-center justify-between hover:bg-white/5 transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className={`text-sm font-bold font-mono ${DEPARTMENT_COLORS[dept] || 'text-gray-400'}`}>{dept}</span>
                <span className="text-[10px] bg-white/5 border border-white/10 px-2 py-0.5 rounded text-gray-400 font-mono">{agents.length}</span>
              </div>
              {expandedDept === dept ? <ChevronUp size={16} className="text-gray-500" /> : <ChevronDown size={16} className="text-gray-500" />}
            </button>

            <AnimatePresence>
              {expandedDept === dept && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="border-t border-white/5"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 p-4">
                    {agents.map(agent => (
                      <div key={agent.id} className="bg-cyber-950/50 border border-white/5 rounded-xl p-4 hover:border-neon-cyan/30 transition-colors">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h4 className="text-sm font-bold text-white font-mono">{agent.name}</h4>
                            <p className="text-xs text-gray-500 mt-0.5">{agent.role}</p>
                          </div>
                          <span className={`text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full border ${
                            agent.status === 'Active' ? 'text-green-400 border-green-500/30 bg-green-500/10' : 'text-yellow-400 border-yellow-500/30 bg-yellow-500/10'
                          }`}>{agent.status}</span>
                        </div>
                        <div className="flex flex-wrap gap-1 mt-3">
                          {agent.triggers.map(t => (
                            <span key={t} className="text-[9px] px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-gray-400 font-mono">{t}</span>
                          ))}
                        </div>
                        {agent.mcps.length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-2">
                            {agent.mcps.map(m => (
                              <span key={m} className="text-[9px] px-1.5 py-0.5 rounded bg-neon-cyan/5 border border-neon-cyan/20 text-neon-cyan font-mono">{m}</span>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
};

// ============================================================================
// SKILLS VIEW
// ============================================================================

export const SkillsView: React.FC = () => {
  const [filter, setFilter] = useState('All');
  const deptOptions = ['All', ...Array.from(new Set(SKILLS_DATA.map(s => s.department)))];

  const filtered = useMemo(() => {
    if (filter === 'All') return SKILLS_DATA;
    return SKILLS_DATA.filter(s => s.department === filter);
  }, [filter]);

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-6">
        {deptOptions.map(d => (
          <button
            key={d}
            onClick={() => setFilter(d)}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold font-mono uppercase tracking-widest transition-all ${
              filter === d ? 'bg-neon-cyan text-black' : 'bg-white/5 border border-white/10 text-gray-500 hover:text-white'
            }`}
          >
            {d}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
        {filtered.map(skill => (
          <div key={skill.id} className={`bg-cyber-900/30 border rounded-2xl p-4 hover:bg-cyber-900/50 transition-colors ${DEPARTMENT_BORDER[skill.department] || 'border-white/10'}`}>
            <div className="flex items-start justify-between mb-2">
              <h4 className="text-sm font-bold text-white font-mono">{skill.name}</h4>
              <span className={`text-[9px] font-mono ${DEPARTMENT_COLORS[skill.department] || 'text-gray-400'}`}>{skill.department}</span>
            </div>
            <p className="text-xs text-gray-500 mb-3">{skill.description}</p>
            <div className="flex items-center gap-2 text-[9px] font-mono text-gray-600">
              <span className="px-1.5 py-0.5 bg-white/5 rounded border border-white/10">{skill.input}</span>
              <span className="text-neon-cyan">-&gt;</span>
              <span className="px-1.5 py-0.5 bg-neon-cyan/5 rounded border border-neon-cyan/20 text-neon-cyan">{skill.output}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ============================================================================
// MCP SERVERS VIEW
// ============================================================================

export const McpServersView: React.FC = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    {MCP_SERVERS_DATA.map(mcp => (
      <div key={mcp.id} className={`bg-cyber-900/30 border rounded-2xl p-5 ${
        mcp.status === 'Connected' ? 'border-green-500/30' : 'border-yellow-500/30'
      }`}>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <Server size={18} className={mcp.status === 'Connected' ? 'text-green-400' : 'text-yellow-400'} />
            <h4 className="text-base font-bold text-white font-mono">{mcp.name}</h4>
          </div>
          <span className={`text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full border ${
            mcp.status === 'Connected'
              ? 'text-green-400 border-green-500/30 bg-green-500/10'
              : 'text-yellow-400 border-yellow-500/30 bg-yellow-500/10'
          }`}>{mcp.status}</span>
        </div>
        <div className="mb-3">
          <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">Tools ({mcp.toolCount})</span>
          <div className="flex flex-wrap gap-1 mt-1">
            {mcp.tools.map(t => (
              <span key={t} className="text-[9px] px-1.5 py-0.5 rounded bg-neon-cyan/5 border border-neon-cyan/20 text-neon-cyan font-mono">{t}</span>
            ))}
          </div>
        </div>
        <div>
          <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">Connected Agents</span>
          <div className="flex flex-wrap gap-1 mt-1">
            {mcp.agents.map(a => (
              <span key={a} className="text-[9px] px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-gray-400 font-mono">{a}</span>
            ))}
          </div>
        </div>
      </div>
    ))}
  </div>
);

// ============================================================================
// SCHEDULED TASKS VIEW
// ============================================================================

export const ScheduledTasksView: React.FC = () => (
  <div className="space-y-3">
    {SCHEDULED_TASKS_DATA.map(task => (
      <div key={task.id} className="bg-cyber-900/30 border border-white/10 rounded-2xl p-5 flex items-center gap-5 hover:border-neon-cyan/30 transition-colors">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
          task.active ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'
        }`}>
          {task.active ? <Play size={18} /> : <Pause size={18} />}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-1">
            <h4 className="text-sm font-bold text-white font-mono">{task.name}</h4>
            <span className="text-[9px] px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-gray-400 font-mono">{task.schedule}</span>
          </div>
          <p className="text-xs text-gray-500 truncate">{task.description}</p>
        </div>
        <div className="text-right shrink-0">
          <div className="text-xs font-mono text-neon-cyan font-bold">{task.scheduleTime}</div>
          <div className="text-[9px] font-mono text-gray-600 mt-0.5">Next: {task.nextRun}</div>
        </div>
      </div>
    ))}
  </div>
);

// ============================================================================
// WORKFLOWS VIEW
// ============================================================================

export const WorkflowsView: React.FC = () => (
  <div className="space-y-6">
    {WORKFLOWS_DATA.map(wf => (
      <div key={wf.id} className="bg-cyber-900/30 border border-white/10 rounded-2xl p-5">
        <h4 className="text-base font-bold text-white font-mono mb-4 flex items-center gap-2">
          <Network size={16} className="text-neon-cyan" />
          {wf.name}
        </h4>
        <div className="flex flex-wrap items-center gap-2">
          {wf.steps.map((step, i) => (
            <React.Fragment key={step}>
              <div className="px-3 py-2 bg-cyber-950/50 border border-white/10 rounded-xl text-xs font-mono text-white hover:border-neon-cyan/30 transition-colors">
                <span className="text-neon-cyan mr-1.5">{i + 1}.</span>
                {step}
              </div>
              {i < wf.steps.length - 1 && (
                <span className="text-neon-cyan text-xs font-mono">&#8594;</span>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    ))}
  </div>
);
