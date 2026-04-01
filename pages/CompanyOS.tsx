import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Activity,
  Zap,
  Server,
  Clock,
  Network,
  Search,
  ChevronDown,
  ChevronUp,
  Dot,
  ExternalLink,
  AlertCircle,
  CheckCircle2,
  Play,
  Pause,
  Github,
  Database,
  MessageSquare,
  Mail,
  FileText,
  TrendingUp,
  Users,
  Workflow,
} from 'lucide-react';
import SEO from '../components/SEO';

// ============================================================================
// DATA DEFINITIONS
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
  path: string;
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

interface Workflow {
  id: string;
  name: string;
  steps: string[];
}

const AGENTS_DATA: Agent[] = [
  {
    id: 'lead-qualifier',
    name: 'Lead Qualifier',
    role: 'Scores inbound leads using BANT framework',
    department: 'Sales',
    status: 'Active',
    triggers: ['new registration', 'website form'],
    skills: ['lead-qualify', 'lead-score'],
    mcps: ['Apollo', 'Common Room'],
  },
  {
    id: 'outreach-drafter',
    name: 'Outreach Drafter',
    role: 'Drafts WhatsApp/email sequences',
    department: 'Sales',
    status: 'Active',
    triggers: ['lead scored >50'],
    skills: ['outreach-draft', 'whatsapp-send'],
    mcps: ['WhatsApp Business'],
  },
  {
    id: 'deal-closer',
    name: 'Deal Closer',
    role: 'Manages pilot→conversion pipeline',
    department: 'Sales',
    status: 'Active',
    triggers: ['pilot day 5+'],
    skills: ['proposal-draft', 'objection-handle'],
    mcps: ['Firebase'],
  },
  {
    id: 'pilot-manager',
    name: 'Pilot Manager',
    role: 'Tracks active pilot metrics',
    department: 'Sales',
    status: 'Active',
    triggers: ['pilot started'],
    skills: ['pilot-track', 'accuracy-monitor'],
    mcps: ['Firebase'],
  },
  {
    id: 'content-creator',
    name: 'Content Creator',
    role: 'Generates LinkedIn/Instagram/blog content',
    department: 'Marketing',
    status: 'Active',
    triggers: ['Monday content brief', 'manual'],
    skills: ['linkedin-post', 'instagram-caption', 'blog-draft'],
    mcps: ['Google Drive'],
  },
  {
    id: 'brand-guardian',
    name: 'Brand Guardian',
    role: 'Reviews all content against brand voice',
    department: 'Marketing',
    status: 'Active',
    triggers: ['content drafted'],
    skills: ['brand-review', 'voice-check'],
    mcps: [],
  },
  {
    id: 'seo-monitor',
    name: 'SEO Monitor',
    role: 'Tracks rankings, audits pages',
    department: 'Marketing',
    status: 'Active',
    triggers: ['weekly', 'page deployed'],
    skills: ['seo-audit', 'keyword-track'],
    mcps: ['Chrome', 'Google Drive'],
  },
  {
    id: 'social-scheduler',
    name: 'Social Scheduler',
    role: 'Queues approved content for publishing',
    department: 'Marketing',
    status: 'Active',
    triggers: ['content approved'],
    skills: ['schedule-post', 'analytics-pull'],
    mcps: ['Chrome'],
  },
  {
    id: 'code-architect',
    name: 'Code Architect',
    role: 'Reviews PRs, enforces standards',
    department: 'Engineering',
    status: 'Active',
    triggers: ['code pushed', 'PR created'],
    skills: ['code-review', 'pattern-check'],
    mcps: ['GitHub'],
  },
  {
    id: 'deploy-manager',
    name: 'Deploy Manager',
    role: 'Handles Vercel deploys and rollbacks',
    department: 'Engineering',
    status: 'Active',
    triggers: ['git push main'],
    skills: ['deploy-check', 'smoke-test'],
    mcps: ['GitHub', 'Chrome'],
  },
  {
    id: 'sprint-planner',
    name: 'Sprint Planner',
    role: 'Plans weekly sprints, tracks velocity',
    department: 'Engineering',
    status: 'Active',
    triggers: ['Monday 9:30AM'],
    skills: ['sprint-plan', 'capacity-calc'],
    mcps: ['GitHub'],
  },
  {
    id: 'firmware-sync',
    name: 'Firmware Sync',
    role: 'Manages Pi firmware and model updates',
    department: 'Engineering',
    status: 'Standby',
    triggers: ['model trained', 'manual'],
    skills: ['firmware-update', 'model-deploy'],
    mcps: ['GitHub'],
  },
  {
    id: 'bug-triager',
    name: 'Bug Triager',
    role: 'Classifies and routes reported issues',
    department: 'Engineering',
    status: 'Active',
    triggers: ['bug reported'],
    skills: ['bug-triage', 'severity-classify'],
    mcps: ['GitHub', 'Slack'],
  },
  {
    id: 'revenue-tracker',
    name: 'Revenue Tracker',
    role: 'Logs all incoming revenue',
    department: 'Finance/Ops',
    status: 'Active',
    triggers: ['payment received'],
    skills: ['revenue-log', 'invoice-gen'],
    mcps: ['Firebase', 'Razorpay'],
  },
  {
    id: 'expense-logger',
    name: 'Expense Logger',
    role: 'Categorizes all expenses',
    department: 'Finance/Ops',
    status: 'Active',
    triggers: ['daily close'],
    skills: ['expense-track', 'gst-calc'],
    mcps: ['Firebase'],
  },
  {
    id: 'invoice-generator',
    name: 'Invoice Generator',
    role: 'Creates GST-ready invoices',
    department: 'Finance/Ops',
    status: 'Active',
    triggers: ['deal closed', 'subscription due'],
    skills: ['invoice-gen', 'pdf-create'],
    mcps: ['Firebase', 'Google Drive'],
  },
  {
    id: 'compliance-monitor',
    name: 'Compliance Monitor',
    role: 'Tracks legal/regulatory requirements',
    department: 'Finance/Ops',
    status: 'Standby',
    triggers: ['monthly', 'revenue threshold'],
    skills: ['compliance-check', 'registration-track'],
    mcps: ['Google Drive'],
  },
  {
    id: 'web-architect',
    name: 'Web Architect',
    role: 'Maintains design system and component specs',
    department: 'Web Dev',
    status: 'Active',
    triggers: ['feature request'],
    skills: ['component-spec', 'token-manage'],
    mcps: ['Figma'],
  },
  {
    id: 'qa-tester',
    name: 'QA Tester',
    role: 'Runs testing checklists on deploys',
    department: 'Web Dev',
    status: 'Active',
    triggers: ['deploy complete'],
    skills: ['smoke-test', 'accessibility-check'],
    mcps: ['Chrome'],
  },
  {
    id: 'seo-optimizer',
    name: 'SEO Optimizer',
    role: 'Implements structured data, meta tags',
    department: 'Web Dev',
    status: 'Active',
    triggers: ['page created/modified'],
    skills: ['structured-data', 'meta-optimize'],
    mcps: ['Chrome'],
  },
  {
    id: 'onboarding-manager',
    name: 'Onboarding Manager',
    role: 'Guides new customers through install→training→go-live',
    department: 'Customer Success',
    status: 'Active',
    triggers: ['payment confirmed'],
    skills: ['onboarding-track', 'training-schedule'],
    mcps: ['WhatsApp', 'Firebase'],
  },
  {
    id: 'support-responder',
    name: 'Support Responder',
    role: 'Handles inbound support via WhatsApp',
    department: 'Customer Success',
    status: 'Active',
    triggers: ['customer message'],
    skills: ['issue-diagnose', 'response-draft'],
    mcps: ['WhatsApp', 'Firebase'],
  },
  {
    id: 'health-monitor',
    name: 'Health Monitor',
    role: 'Tracks system health for deployed customers',
    department: 'Customer Success',
    status: 'Active',
    triggers: ['daily', 'anomaly detected'],
    skills: ['health-check', 'churn-detect'],
    mcps: ['Firebase'],
  },
];

const SKILLS_DATA: Skill[] = [
  {
    id: 'company-brain',
    name: 'Company Brain',
    department: 'Core',
    description: 'Central context hub for all agents',
    input: 'Context',
    output: 'Company Knowledge',
    path: 'skills/company-brain.ts',
  },
  {
    id: 'lead-qualify',
    name: 'Lead Qualifier',
    department: 'Sales',
    description: 'Lead qualification and outreach automation',
    input: 'Lead Data',
    output: 'Scored Lead + Outreach Draft',
    path: 'skills/sales/lead-qualify.ts',
  },
  {
    id: 'deal-close',
    name: 'Deal Closer',
    department: 'Sales',
    description: 'Pipeline management and conversion',
    input: 'Qualified Lead',
    output: 'Closed Deal',
    path: 'skills/sales/deal-close.ts',
  },
  {
    id: 'content-engine',
    name: 'Content Engine',
    department: 'Marketing',
    description: 'Multi-channel content creation',
    input: 'Content Brief',
    output: 'Drafted Content',
    path: 'skills/marketing/content-engine.ts',
  },
  {
    id: 'brand-review',
    name: 'Brand Guardian',
    department: 'Marketing',
    description: 'Brand voice enforcement and review',
    input: 'Draft Content',
    output: 'Reviewed Content',
    path: 'skills/marketing/brand-review.ts',
  },
  {
    id: 'seo-track',
    name: 'SEO Monitor',
    department: 'Marketing',
    description: 'SEO tracking and optimization',
    input: 'Website',
    output: 'SEO Report',
    path: 'skills/marketing/seo-track.ts',
  },
  {
    id: 'code-review',
    name: 'Code Architect',
    department: 'Engineering',
    description: 'Code standards and review',
    input: 'Code/PR',
    output: 'Review Report',
    path: 'skills/engineering/code-review.ts',
  },
  {
    id: 'deploy-manage',
    name: 'Deploy Manager',
    department: 'Engineering',
    description: 'Deployment and rollback management',
    input: 'Build',
    output: 'Deployed Site',
    path: 'skills/engineering/deploy-manage.ts',
  },
  {
    id: 'sprint-plan',
    name: 'Sprint Planner',
    department: 'Engineering',
    description: 'Sprint planning and velocity tracking',
    input: 'Backlog',
    output: 'Sprint Plan',
    path: 'skills/engineering/sprint-plan.ts',
  },
  {
    id: 'firmware-sync',
    name: 'Firmware Sync',
    department: 'Engineering',
    description: 'Hardware firmware and model updates',
    input: 'Model/Firmware',
    output: 'Deployed Update',
    path: 'skills/engineering/firmware-sync.ts',
  },
  {
    id: 'finance-track',
    name: 'Finance Tracker',
    department: 'Finance',
    description: 'Revenue/expense tracking and reporting',
    input: 'Transactions',
    output: 'Financial Report',
    path: 'skills/finance/finance-track.ts',
  },
  {
    id: 'ops-manage',
    name: 'Ops Manager',
    department: 'Finance',
    description: 'Operations and vendor management',
    input: 'Operations Data',
    output: 'Ops Report',
    path: 'skills/finance/ops-manage.ts',
  },
  {
    id: 'legal-comply',
    name: 'Legal Compliance',
    department: 'Finance',
    description: 'Indian startup legal and compliance',
    input: 'Compliance Check',
    output: 'Status Report',
    path: 'skills/finance/legal-comply.ts',
  },
  {
    id: 'component-spec',
    name: 'Web Architect',
    department: 'Web Dev',
    description: 'Design system and component management',
    input: 'Design Spec',
    output: 'Component',
    path: 'skills/web/component-spec.ts',
  },
  {
    id: 'web-qa',
    name: 'Web QA',
    department: 'Web Dev',
    description: 'Testing strategy and execution',
    input: 'Deploy',
    output: 'Test Report',
    path: 'skills/web/web-qa.ts',
  },
  {
    id: 'web-seo',
    name: 'Web SEO',
    department: 'Web Dev',
    description: 'Website-specific SEO optimization',
    input: 'Page',
    output: 'SEO Optimized Page',
    path: 'skills/web/web-seo.ts',
  },
  {
    id: 'scheduler',
    name: 'Task Scheduler',
    department: 'Automation',
    description: 'Scheduled workflow automation',
    input: 'Time Trigger',
    output: 'Workflow Execution',
    path: 'skills/automation/scheduler.ts',
  },
  {
    id: 'morning-brief',
    name: 'Morning Briefing',
    department: 'Automation',
    description: 'Daily morning briefing generation',
    input: 'Data Sources',
    output: 'Morning Brief',
    path: 'skills/automation/morning-brief.ts',
  },
  {
    id: 'customer-onboard',
    name: 'Customer Onboarding',
    department: 'Customer Success',
    description: 'End-to-end customer onboarding',
    input: 'New Customer',
    output: 'Onboarded Customer',
    path: 'skills/customer/customer-onboard.ts',
  },
  {
    id: 'customer-support',
    name: 'Customer Support',
    department: 'Customer Success',
    description: 'Ongoing customer support',
    input: 'Support Ticket',
    output: 'Resolution',
    path: 'skills/customer/customer-support.ts',
  },
];

const MCP_SERVERS_DATA: MCPServer[] = [
  {
    id: 'github',
    name: 'GitHub',
    status: 'Connected',
    agents: ['Code Architect', 'Deploy Manager', 'Sprint Planner', 'Firmware Sync', 'Bug Triager'],
    toolCount: 4,
    tools: ['repos', 'PRs', 'issues', 'commits'],
  },
  {
    id: 'firebase',
    name: 'Firebase',
    status: 'Connected',
    agents: ['Deal Closer', 'Pilot Manager', 'Revenue Tracker', 'Expense Logger', 'Invoice Gen', 'Onboarding', 'Support', 'Health Monitor'],
    toolCount: 3,
    tools: ['auth', 'firestore', 'analytics'],
  },
  {
    id: 'apollo',
    name: 'Apollo',
    status: 'Connected',
    agents: ['Lead Qualifier'],
    toolCount: 2,
    tools: ['enrich-lead', 'prospect', 'sequence-load'],
  },
  {
    id: 'commonroom',
    name: 'Common Room',
    status: 'Connected',
    agents: ['Lead Qualifier'],
    toolCount: 2,
    tools: ['account-research', 'contact-research', 'prospect'],
  },
  {
    id: 'slack',
    name: 'Slack',
    status: 'Connected',
    agents: ['Bug Triager'],
    toolCount: 3,
    tools: ['messaging', 'search', 'channel-digest'],
  },
  {
    id: 'googledrive',
    name: 'Google Drive',
    status: 'Connected',
    agents: ['Content Creator', 'SEO Monitor', 'Invoice Gen', 'Compliance Monitor'],
    toolCount: 3,
    tools: ['fetch', 'search', 'upload'],
  },
  {
    id: 'figma',
    name: 'Figma',
    status: 'Connected',
    agents: ['Web Architect'],
    toolCount: 4,
    tools: ['get-design-context', 'screenshot', 'search-design-system', 'variables'],
  },
  {
    id: 'chrome',
    name: 'Chrome',
    status: 'Connected',
    agents: ['SEO Monitor', 'Social Scheduler', 'Deploy Manager', 'QA Tester', 'SEO Optimizer'],
    toolCount: 4,
    tools: ['navigate', 'read-page', 'screenshot', 'javascript'],
  },
  {
    id: 'razorpay',
    name: 'Razorpay',
    status: 'Planned',
    agents: ['Revenue Tracker'],
    toolCount: 2,
    tools: ['payment-verify', 'subscription-manage'],
  },
  {
    id: 'whatsapp',
    name: 'WhatsApp Business',
    status: 'Planned',
    agents: ['Outreach Drafter', 'Onboarding Manager', 'Support Responder'],
    toolCount: 2,
    tools: ['send-message', 'template-send'],
  },
];

const SCHEDULED_TASKS_DATA: ScheduledTask[] = [
  {
    id: 'morning-briefing',
    name: 'Morning Briefing',
    schedule: 'Daily',
    scheduleTime: '8:00 AM',
    description: 'Morning priorities, pipeline, metrics, blockers',
    active: true,
    nextRun: 'Today 8:00 AM',
  },
  {
    id: 'sales-pipeline-check',
    name: 'Sales Pipeline Check',
    schedule: 'Daily',
    scheduleTime: '8:30 AM',
    description: 'New registrations, lead scoring, follow-up drafts',
    active: true,
    nextRun: 'Today 8:30 AM',
  },
  {
    id: 'daily-standup',
    name: 'Daily Standup',
    schedule: 'Daily',
    scheduleTime: '9:00 AM',
    description: 'Yesterday/today/blockers from PROGRESS.md',
    active: true,
    nextRun: 'Today 9:00 AM',
  },
  {
    id: 'content-queue-check',
    name: 'Content Queue Check',
    schedule: 'Daily',
    scheduleTime: '12:00 PM',
    description: 'Content drafting, brand review, scheduling',
    active: true,
    nextRun: 'Today 12:00 PM',
  },
  {
    id: 'daily-close',
    name: 'Daily Close',
    schedule: 'Daily',
    scheduleTime: '5:00 PM',
    description: 'Revenue/expense logging, cash position, tomorrow prep',
    active: true,
    nextRun: 'Today 5:00 PM',
  },
  {
    id: 'weekly-business-review',
    name: 'Weekly Business Review',
    schedule: 'Weekly',
    scheduleTime: 'Friday 4:00 PM',
    description: 'KPIs, financials, strategy check, gate progress',
    active: true,
    nextRun: 'Friday 4:00 PM',
  },
  {
    id: 'sprint-planning',
    name: 'Sprint Planning',
    schedule: 'Weekly',
    scheduleTime: 'Monday 9:30 AM',
    description: 'Backlog review, estimation, sprint commitment',
    active: true,
    nextRun: 'Monday 9:30 AM',
  },
  {
    id: 'monthly-financial-close',
    name: 'Monthly Financial Close',
    schedule: 'Monthly',
    scheduleTime: '1st 10:00 AM',
    description: 'P&L reconciliation, runway, compliance check',
    active: true,
    nextRun: 'May 1st 10:00 AM',
  },
];

const WORKFLOWS_DATA: Workflow[] = [
  {
    id: 'daily-ops',
    name: 'Daily Operations',
    steps: [
      'Morning Briefing',
      'Pipeline Check',
      'Standup',
      'Content Queue',
      'Daily Close',
      'Night Review',
    ],
  },
  {
    id: 'sales-pipeline',
    name: 'Sales Pipeline',
    steps: [
      'Lead Detected',
      'Qualify (Apollo)',
      'Score',
      'Outreach',
      'Demo',
      'Pilot',
      'Convert/Drop',
    ],
  },
  {
    id: 'content-calendar',
    name: 'Content Calendar',
    steps: [
      'Monday Brief',
      'Tuesday Draft',
      'Wednesday Review',
      'Thursday Schedule',
      'Friday Metrics',
    ],
  },
  {
    id: 'weekly-business-review',
    name: 'Weekly Business Review',
    steps: [
      'Collect KPIs',
      'Variance Analysis',
      'Strategy Check',
      'WBR Document',
      'Action Items',
    ],
  },
  {
    id: 'client-onboard',
    name: 'Client Onboarding',
    steps: [
      'Payment',
      'Kit Prep',
      'Install',
      'Train',
      'Go-Live',
      'Monitor',
      'Handoff',
    ],
  },
];

// ============================================================================
// DEPARTMENT METADATA
// ============================================================================

const DEPARTMENT_COLORS: Record<string, string> = {
  Sales: 'text-neon-amber',
  Marketing: 'text-neon-purple',
  Engineering: 'text-neon-cyan',
  'Finance/Ops': 'text-garden-400',
  'Web Dev': 'text-neon-pink',
  'Customer Success': 'text-garden-500',
  Core: 'text-neon-cyan',
  Automation: 'text-neon-pink',
};

const DEPARTMENT_BG: Record<string, string> = {
  Sales: 'bg-amber-950/30',
  Marketing: 'bg-purple-950/30',
  Engineering: 'bg-cyan-950/30',
  'Finance/Ops': 'bg-green-950/30',
  'Web Dev': 'bg-pink-950/30',
  'Customer Success': 'bg-green-950/40',
  Core: 'bg-cyan-950/30',
  Automation: 'bg-pink-950/30',
};

// ============================================================================
// MAIN COMPONENT
// ============================================================================

const CompanyOS: React.FC = () => {
  const [activeTab, setActiveTab] = useState('agents');
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedDept, setExpandedDept] = useState<string | null>('Sales');
  const [skillFilter, setSkillFilter] = useState<string>('All');

  // Filtered data
  const filteredAgents = useMemo(() => {
    return AGENTS_DATA.filter(
      (agent) =>
        agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        agent.role.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const agentsByDept = useMemo(() => {
    const grouped: Record<string, Agent[]> = {
      Sales: [],
      Marketing: [],
      Engineering: [],
      'Finance/Ops': [],
      'Web Dev': [],
      'Customer Success': [],
    };
    filteredAgents.forEach((agent) => {
      if (grouped[agent.department]) {
        grouped[agent.department].push(agent);
      }
    });
    return grouped;
  }, [filteredAgents]);

  const filteredSkills = useMemo(() => {
    return SKILLS_DATA.filter(
      (skill) =>
        (skillFilter === 'All' || skill.department === skillFilter) &&
        skill.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [skillFilter, searchTerm]);

  const deptOptions = ['All', ...new Set(SKILLS_DATA.map((s) => s.department))];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <>
      <SEO title="Company OS" noIndex />
      <div className="min-h-screen bg-cyber-950 text-white font-sans">
        {/* HEADER */}
        <div className="border-b border-neon-cyan/20 bg-gradient-to-b from-cyber-900 to-cyber-950 p-6 sm:p-8">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="flex items-center gap-2">
                  <Dot className="w-4 h-4 text-neon-cyan animate-pulse" />
                  <span className="text-xs font-mono text-neon-cyan font-semibold">
                    OPERATIONAL
                  </span>
                </div>
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold font-mono bg-gradient-to-r from-neon-cyan via-neon-purple to-neon-pink bg-clip-text text-transparent mb-2">
                COMPANY OS
              </h1>
              <p className="text-neon-cyan/70 font-mono text-sm">
                Agent Orchestration Command Center
              </p>
            </motion.div>

            {/* STAT CARDS */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3"
            >
              {[
                { label: 'Total Agents', value: '24' },
                { label: 'Active Skills', value: '20' },
                { label: 'MCP Servers', value: '7' },
                { label: 'Scheduled Tasks', value: '8' },
                { label: 'Workflows', value: '5' },
                { label: 'Knowledge Files', value: '90+' },
              ].map((stat) => (
                <motion.div
                  key={stat.label}
                  variants={itemVariants}
                  className="bento-card bg-cyber-900/50 border border-neon-cyan/20 p-4 text-center hover:border-neon-cyan/50 transition-colors"
                >
                  <div className="text-2xl sm:text-3xl font-bold text-neon-cyan font-mono">
                    {stat.value}
                  </div>
                  <div className="text-xs text-neon-cyan/60 font-mono mt-1">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* TAB NAVIGATION */}
        <div className="border-b border-neon-cyan/20 bg-cyber-900/50 px-6 sm:px-8 py-4">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-wrap gap-3">
              {['agents', 'skills', 'mcp-servers', 'scheduled-tasks', 'workflows'].map(
                (tab) => {
                  const labels: Record<string, string> = {
                    agents: 'Agents',
                    skills: 'Skills',
                    'mcp-servers': 'MCP Servers',
                    'scheduled-tasks': 'Scheduled Tasks',
                    workflows: 'Workflows',
                  };
                  const icons: Record<string, React.ReactNode> = {
                    agents: <Users className="w-4 h-4" />,
                    skills: <Zap className="w-4 h-4" />,
                    'mcp-servers': <Server className="w-4 h-4" />,
                    'scheduled-tasks': <Clock className="w-4 h-4" />,
                    workflows: <Workflow className="w-4 h-4" />,
                  };
                  return (
                    <motion.button
                      key={tab}
                      onClick={() => {
                        setActiveTab(tab);
                        setSearchTerm('');
                      }}
                      className={`glass-pill px-4 py-2 flex items-center gap-2 font-mono text-sm transition-all ${
                        activeTab === tab
                          ? 'bg-neon-cyan/20 border-neon-cyan/50 text-neon-cyan shadow-lg shadow-neon-cyan/30'
                          : 'bg-cyber-900/30 border-neon-cyan/10 text-neon-cyan/60 hover:border-neon-cyan/30'
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {icons[tab]}
                      {labels[tab]}
                    </motion.button>
                  );
                }
              )}
            </div>
          </div>
        </div>

        {/* TAB CONTENT */}
        <div className="p-6 sm:p-8">
          <div className="max-w-7xl mx-auto">
            <AnimatePresence mode="wait">
              {/* AGENTS TAB */}
              {activeTab === 'agents' && (
                <motion.div
                  key="agents"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="mb-6 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                    <div className="relative w-full sm:w-64">
                      <Search className="absolute left-3 top-3 w-4 h-4 text-neon-cyan/50" />
                      <input
                        type="text"
                        placeholder="Search agents..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 bg-cyber-900/50 border border-neon-cyan/20 rounded-lg text-sm text-white placeholder-neon-cyan/40 focus:outline-none focus:border-neon-cyan/50"
                      />
                    </div>
                    <div className="text-sm font-mono text-neon-cyan/60">
                      {filteredAgents.length} agents active
                    </div>
                  </div>

                  <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="space-y-4"
                  >
                    {Object.entries(agentsByDept).map(([dept, agents]) => (
                      <motion.div
                        key={dept}
                        variants={itemVariants}
                        className={`bento-card border ${
                          agents.length > 0
                            ? 'border-neon-cyan/20 bg-cyber-900/30'
                            : 'border-neon-cyan/10 bg-cyber-900/10'
                        } overflow-hidden`}
                      >
                        <motion.button
                          onClick={() =>
                            setExpandedDept(expandedDept === dept ? null : dept)
                          }
                          className="w-full p-4 flex items-center justify-between hover:bg-cyber-900/20 transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className={`text-sm font-bold font-mono ${DEPARTMENT_COLORS[dept]}`}
                            >
                              {dept}
                            </div>
                            <div className="text-xs text-neon-cyan/50 font-mono">
                              {agents.length} agents
                            </div>
                          </div>
                          {expandedDept === dept ? (
                            <ChevronUp className="w-4 h-4 text-neon-cyan/50" />
                          ) : (
                            <ChevronDown className="w-4 h-4 text-neon-cyan/50" />
                          )}
                        </motion.button>

                        <AnimatePresence>
                          {expandedDept === dept && agents.length > 0 && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              className="border-t border-neon-cyan/10 divide-y divide-neon-cyan/10"
                            >
                              {agents.map((agent) => (
                                <div
                                  key={agent.id}
                                  className="p-4 bg-cyber-900/50 hover:bg-cyber-900/70 transition-colors"
                                >
                                  <div className="flex items-start justify-between mb-3">
                                    <div className="flex-1">
                                      <h3 className="font-mono font-bold text-white mb-1">
                                        {agent.name}
                                      </h3>
                                      <p className="text-sm text-neon-cyan/70">
                                        {agent.role}
                                      </p>
                                    </div>
                                    <div className="flex items-center gap-2 ml-4">
                                      <Dot
                                        className={`w-3 h-3 ${
                                          agent.status === 'Active'
                                            ? 'text-neon-cyan animate-pulse'
                                            : 'text-neon-amber'
                                        }`}
                                      />
                                      <span className="text-xs font-mono text-neon-cyan/60">
                                        {agent.status}
                                      </span>
                                    </div>
                                  </div>

                                  <div className="space-y-2 text-sm">
                                    <div>
                                      <div className="text-xs font-mono text-neon-cyan/50 mb-1">
                                        TRIGGERS
                                      </div>
                                      <div className="flex flex-wrap gap-2">
                                        {agent.triggers.map((trigger) => (
                                          <span
                                            key={trigger}
                                            className="px-2 py-1 bg-cyber-800/50 border border-neon-cyan/20 rounded text-xs text-neon-cyan/70 font-mono"
                                          >
                                            {trigger}
                                          </span>
                                        ))}
                                      </div>
                                    </div>

                                    <div>
                                      <div className="text-xs font-mono text-neon-cyan/50 mb-1">
                                        SKILLS
                                      </div>
                                      <div className="flex flex-wrap gap-2">
                                        {agent.skills.map((skill) => (
                                          <span
                                            key={skill}
                                            className={`px-2 py-1 rounded text-xs font-mono ${DEPARTMENT_BG[dept]} border border-neon-cyan/20 text-neon-cyan/80`}
                                          >
                                            {skill}
                                          </span>
                                        ))}
                                      </div>
                                    </div>

                                    {agent.mcps.length > 0 && (
                                      <div>
                                        <div className="text-xs font-mono text-neon-cyan/50 mb-1">
                                          MCP INTEGRATIONS
                                        </div>
                                        <div className="flex flex-wrap gap-2">
                                          {agent.mcps.map((mcp) => (
                                            <span
                                              key={mcp}
                                              className="px-2 py-1 bg-cyber-800/50 border border-neon-purple/20 rounded text-xs text-neon-purple/70 font-mono"
                                            >
                                              {mcp}
                                            </span>
                                          ))}
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    ))}
                  </motion.div>
                </motion.div>
              )}

              {/* SKILLS TAB */}
              {activeTab === 'skills' && (
                <motion.div
                  key="skills"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="mb-6 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                    <div className="relative w-full sm:w-64">
                      <Search className="absolute left-3 top-3 w-4 h-4 text-neon-cyan/50" />
                      <input
                        type="text"
                        placeholder="Search skills..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 bg-cyber-900/50 border border-neon-cyan/20 rounded-lg text-sm text-white placeholder-neon-cyan/40 focus:outline-none focus:border-neon-cyan/50"
                      />
                    </div>
                    <select
                      value={skillFilter}
                      onChange={(e) => setSkillFilter(e.target.value)}
                      className="px-4 py-2 bg-cyber-900/50 border border-neon-cyan/20 rounded-lg text-sm text-white focus:outline-none focus:border-neon-cyan/50 font-mono"
                    >
                      {deptOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>

                  <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid gap-4 md:grid-cols-2 lg:grid-cols-3"
                  >
                    {filteredSkills.map((skill) => (
                      <motion.div
                        key={skill.id}
                        variants={itemVariants}
                        className="bento-card bg-cyber-900/30 border border-neon-cyan/20 p-5 hover:border-neon-cyan/50 transition-colors"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <h3 className="font-mono font-bold text-white text-sm">
                            {skill.name}
                          </h3>
                          <span
                            className={`text-xs font-mono font-bold px-2 py-1 rounded ${DEPARTMENT_COLORS[skill.department]} ${DEPARTMENT_BG[skill.department]} border border-current/20`}
                          >
                            {skill.department}
                          </span>
                        </div>
                        <p className="text-sm text-neon-cyan/70 mb-4">{skill.description}</p>
                        <div className="space-y-2 text-xs font-mono">
                          <div>
                            <span className="text-neon-cyan/50">INPUT:</span>{' '}
                            <span className="text-neon-cyan/80">{skill.input}</span>
                          </div>
                          <div>
                            <span className="text-neon-cyan/50">OUTPUT:</span>{' '}
                            <span className="text-neon-cyan/80">{skill.output}</span>
                          </div>
                          <div className="pt-2 border-t border-neon-cyan/10">
                            <span className="text-neon-cyan/50">PATH:</span>{' '}
                            <span className="text-neon-purple/70 break-all">{skill.path}</span>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                </motion.div>
              )}

              {/* MCP SERVERS TAB */}
              {activeTab === 'mcp-servers' && (
                <motion.div
                  key="mcp-servers"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid gap-4 md:grid-cols-2"
                  >
                    {MCP_SERVERS_DATA.map((mcp) => (
                      <motion.div
                        key={mcp.id}
                        variants={itemVariants}
                        className="bento-card bg-cyber-900/30 border border-neon-cyan/20 p-5 hover:border-neon-cyan/50 transition-colors"
                      >
                        <div className="flex items-start justify-between mb-4">
                          <h3 className="font-mono font-bold text-white text-lg">
                            {mcp.name}
                          </h3>
                          <div className="flex items-center gap-2">
                            <Dot
                              className={`w-3 h-3 ${
                                mcp.status === 'Connected'
                                  ? 'text-neon-cyan'
                                  : 'text-neon-amber'
                              }`}
                            />
                            <span className="text-xs font-mono text-neon-cyan/60">
                              {mcp.status}
                            </span>
                          </div>
                        </div>

                        <div className="space-y-3 text-sm">
                          <div>
                            <div className="text-xs font-mono text-neon-cyan/50 mb-2">
                              CONNECTED AGENTS ({mcp.agents.length})
                            </div>
                            <div className="flex flex-wrap gap-2">
                              {mcp.agents.map((agent) => (
                                <span
                                  key={agent}
                                  className="px-2 py-1 bg-cyber-800/50 border border-neon-cyan/20 rounded text-xs text-neon-cyan/70 font-mono"
                                >
                                  {agent}
                                </span>
                              ))}
                            </div>
                          </div>

                          <div className="pt-3 border-t border-neon-cyan/10">
                            <div className="text-xs font-mono text-neon-cyan/50 mb-2">
                              TOOLS ({mcp.toolCount})
                            </div>
                            <div className="flex flex-wrap gap-1">
                              {mcp.tools.map((tool) => (
                                <span
                                  key={tool}
                                  className="px-2 py-1 bg-neon-cyan/10 border border-neon-cyan/20 rounded text-xs text-neon-cyan/60 font-mono"
                                >
                                  {tool}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                </motion.div>
              )}

              {/* SCHEDULED TASKS TAB */}
              {activeTab === 'scheduled-tasks' && (
                <motion.div
                  key="scheduled-tasks"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="glass-panel border border-neon-cyan/20 overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-neon-cyan/20 bg-cyber-900/50">
                            <th className="px-6 py-4 text-left text-xs font-mono text-neon-cyan/60">
                              TASK NAME
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-mono text-neon-cyan/60">
                              SCHEDULE
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-mono text-neon-cyan/60">
                              DESCRIPTION
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-mono text-neon-cyan/60">
                              NEXT RUN
                            </th>
                            <th className="px-6 py-4 text-center text-xs font-mono text-neon-cyan/60">
                              STATUS
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-neon-cyan/10">
                          {SCHEDULED_TASKS_DATA.map((task) => (
                            <motion.tr
                              key={task.id}
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              className="hover:bg-cyber-900/30 transition-colors"
                            >
                              <td className="px-6 py-4">
                                <div className="font-mono font-semibold text-white text-sm">
                                  {task.name}
                                </div>
                              </td>
                              <td className="px-6 py-4">
                                <div className="text-sm font-mono text-neon-cyan/70">
                                  {task.schedule}
                                  <br />
                                  <span className="text-xs text-neon-cyan/50">
                                    {task.scheduleTime}
                                  </span>
                                </div>
                              </td>
                              <td className="px-6 py-4">
                                <div className="text-sm text-neon-cyan/70 max-w-xs">
                                  {task.description}
                                </div>
                              </td>
                              <td className="px-6 py-4">
                                <div className="text-sm font-mono text-neon-cyan/70">
                                  {task.nextRun}
                                </div>
                              </td>
                              <td className="px-6 py-4 text-center">
                                <button className="p-2 rounded hover:bg-cyber-900/50 transition-colors">
                                  {task.active ? (
                                    <Play className="w-4 h-4 text-neon-cyan" />
                                  ) : (
                                    <Pause className="w-4 h-4 text-neon-amber" />
                                  )}
                                </button>
                              </td>
                            </motion.tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* WORKFLOWS TAB */}
              {activeTab === 'workflows' && (
                <motion.div
                  key="workflows"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="space-y-6"
                  >
                    {WORKFLOWS_DATA.map((workflow) => (
                      <motion.div
                        key={workflow.id}
                        variants={itemVariants}
                        className="bento-card bg-cyber-900/30 border border-neon-cyan/20 p-6"
                      >
                        <h3 className="font-mono font-bold text-white text-lg mb-4">
                          {workflow.name}
                        </h3>
                        <div className="bg-cyber-900/50 border border-neon-cyan/20 p-4 rounded font-mono text-sm overflow-x-auto">
                          <pre className="text-neon-cyan/70">
                            {workflow.steps.join(' → ')}
                          </pre>
                        </div>
                        <div className="mt-4 text-xs text-neon-cyan/50 font-mono">
                          {workflow.steps.length} steps • Automated workflow
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* FOOTER */}
        <div className="border-t border-neon-cyan/20 bg-cyber-950 px-6 sm:px-8 py-6">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-neon-cyan/50">
            <div>OORULOGIX COMPANY OS v1.0</div>
            <div>
              Last updated:{' '}
              <span className="text-neon-cyan/70">
                {new Date().toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CompanyOS;
