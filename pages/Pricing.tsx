import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Check, Info, Zap, Shield, Star, ArrowRight, Sparkles, 
  Menu, X, Server, Layout, MessageSquare, LineChart, 
  Search, ShieldCheck, Cpu, Database, Monitor, Globe,
  Activity, ArrowDown, ChevronRight, Play, CheckCircle2,
  Clock, Calendar, Rocket, Users
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { PageRoute } from '../types';
import BlackboxTerminal from '../components/BlackboxTerminal';
import SEO from '../components/SEO';

// --- Types & Data ---

const tiers = [
  {
    id: 'basic',
    name: 'The Basic Byte',
    monthlyPrice: 1999,
    annualPrice: 1599,
    description: 'Digital foundation for small kiosks and single-counter pop-ups.',
    note: 'Perfect for testing the waters in local markets.',
    features: ['Digital QR Menu', 'Real-time Inventory List', 'Basic Sales Reports', 'Email Support'],
    comparativeFeatures: {
      ossDashboard: 'Core Static',
      inventory: 'Manual Trigger',
      alerts: 'Email Only',
      aiVision: false,
      support: '48h Response',
      scalability: 'Single Node'
    },
    cta: 'Start with Byte',
    recommended: false,
    color: 'from-cyan-400 to-blue-500',
    textColor: 'text-cyan-400',
    glow: 'hover:shadow-[0_0_40px_rgba(6,182,212,0.3)]',
    borderFocus: 'group-hover:border-cyan-400/50',
    icon: <Zap size={28} />
  },
  {
    id: 'logic',
    name: 'The Logic Core',
    monthlyPrice: 4999,
    annualPrice: 3999,
    description: 'The standard for high-growth cafes, central kitchens, and boutique retail.',
    note: 'Our highest ROI plan. Designed for Bellandur-speed operations.',
    features: [
      'Everything in Basic',
      'Intelligent Task Management',
      'WhatsApp Velocity Alerts',
      'Predictive Burn-Rate Logic',
      'Multi-Staff Access Control'
    ],
    comparativeFeatures: {
      ossDashboard: 'Full Dynamic',
      inventory: 'Automated Predictive',
      alerts: 'Instant WhatsApp',
      aiVision: 'Lite (Heatmaps)',
      support: '6h Response',
      scalability: 'Up to 3 Nodes'
    },
    cta: 'Get Logic Core',
    recommended: true,
    color: 'from-garden-400 to-emerald-600',
    textColor: 'text-garden-400',
    glow: 'shadow-[0_0_40px_rgba(16,185,129,0.2)] hover:shadow-[0_0_60px_rgba(16,185,129,0.4)]',
    borderFocus: 'border-garden-500/50',
    icon: <Star size={28} />
  },
  {
    id: 'prime',
    name: 'Cyber-Garden Prime',
    monthlyPrice: 14999,
    annualPrice: 11999,
    description: 'The "Invisible Manager" for multi-outlet brands and luxury dining.',
    note: 'Total digital sovereignty with edge hardware acceleration.',
    features: [
      'Everything in Logic Core',
      'Ooru Vision AI (Beta)',
      'Professional Brand Reels',
      'Local SEO Context Boosting',
      'Dedicated Field Engineer'
    ],
    comparativeFeatures: {
      ossDashboard: 'Executive Command Center',
      inventory: 'Global Supply Mesh',
      alerts: 'Voice + Dashboard',
      aiVision: 'Full Edge Video AI',
      support: 'Instant (1h) + Site Visits',
      scalability: 'Unlimited Nodes'
    },
    cta: 'Go Prime',
    recommended: false,
    color: 'from-pink-400 to-purple-600',
    textColor: 'text-pink-400',
    glow: 'hover:shadow-[0_0_40px_rgba(236,72,153,0.3)]',
    borderFocus: 'group-hover:border-pink-400/50',
    icon: <Shield size={28} />
  }
];

const timelineSteps = [
  { day: 'Day 01', title: 'Context Mapping', desc: 'Our field engineers visit your site to map "Silk Board" variables (local footfall, tech density).', icon: Search },
  { day: 'Day 02', title: 'Node Installation', desc: 'Hardware bridge setup. Your first digital node goes live on the Bangalore grid.', icon: Cpu },
  { day: 'Day 03', title: 'Model Training', desc: 'Feeding 3 months of past sales into our Model Mesh (Claude/OpenAI).', icon: Database },
  { day: 'Day 05', title: 'Predictive Live', desc: 'The system begins predicting your Indiranagar weekend surge with 85%+ accuracy.', icon: Rocket },
];

const featureRows = [
  { name: 'Unified OS Dashboard', key: 'ossDashboard' },
  { name: 'Inventory Management', key: 'inventory' },
  { name: 'Communication Channel', key: 'alerts' },
  { name: 'Ooru AI Vision', key: 'aiVision' },
  { name: 'Support SLA', key: 'support' },
  { name: 'Node Scalability', key: 'scalability' },
];

// --- Sub-Components ---

const WorkflowAnimation = () => {
  return (
    <div className="relative w-full max-w-4xl mx-auto h-[400px] glass-panel rounded-3xl overflow-hidden border border-white/10 bg-cyber-900/50 p-8 flex items-center justify-center">
      <div className="absolute inset-0 cyber-grid opacity-20"></div>
      
      <div className="relative z-10 w-full flex justify-between items-center max-w-2xl">
        {/* Source: Your Outlet */}
        <div className="flex flex-col items-center gap-4">
          <div className="w-20 h-20 rounded-2xl bg-white/5 border border-white/20 flex items-center justify-center relative">
            <Layout className="text-white" size={32} />
            <motion.div 
              animate={{ opacity: [0, 1, 0], scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute -top-1 -right-1 w-4 h-4 bg-neon-pink rounded-full blur-[4px]" 
            />
          </div>
          <span className="text-[10px] font-mono font-bold tracking-widest text-gray-500">YOUR_OUTLET</span>
        </div>

        {/* Processing Node */}
        <div className="flex-1 px-4 relative">
          <svg className="w-full h-20" viewBox="0 0 200 40">
            <motion.path 
              d="M 10 20 L 190 20" 
              fill="none" 
              stroke="rgba(255,255,255,0.1)" 
              strokeWidth="2" 
              strokeDasharray="4 4" 
            />
            <motion.circle 
              r="4" 
              fill="#00ffff"
              animate={{ cx: [10, 190] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            />
          </svg>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
             <div className="w-16 h-16 rounded-full bg-cyber-950 border border-neon-cyan/50 flex items-center justify-center relative overflow-hidden group">
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 bg-[conic-gradient(from_0deg,transparent,rgba(0,255,255,0.2))] "
                />
                <Cpu className="text-neon-cyan animate-pulse" size={24} />
             </div>
          </div>
        </div>

        {/* Output: Directives */}
        <div className="flex flex-col items-center gap-4">
          <div className="w-20 h-20 rounded-2xl bg-neon-cyan/10 border border-neon-cyan/30 flex items-center justify-center relative">
            <MessageSquare className="text-neon-cyan" size={32} />
            <motion.div 
              animate={{ y: [-10, 10, -10] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute -bottom-2 -left-2 p-2 bg-black rounded-lg border border-white/10 text-[8px] font-mono text-white"
            >
              ORDER_MILK!
            </motion.div>
          </div>
          <span className="text-[10px] font-mono font-bold tracking-widest text-neon-cyan">DIRECTIVE_MESH</span>
        </div>
      </div>

      <div className="absolute bottom-10 left-10">
        <BlackboxTerminal type="intelligence" title="WORKFLOW_ENGINE_v4" className="w-64 scale-75 border-0 bg-transparent opacity-60" />
      </div>
    </div>
  );
};

const GanttChart = () => {
  return (
    <div className="w-full overflow-x-auto">
      <div className="min-w-[600px] glass-panel rounded-3xl p-8 border border-white/10 bg-cyber-900/30">
        <div className="flex mb-8 items-center justify-between">
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <Clock className="text-neon-pink" size={20} /> Deployment Roadmap
          </h3>
          <div className="flex items-center gap-4 text-[10px] font-mono text-gray-400">
             <div className="flex items-center gap-2"><div className="w-3 h-3 bg-neon-pink rounded-sm" /> FIELD_STATED</div>
             <div className="flex items-center gap-2"><div className="w-3 h-3 bg-neon-cyan rounded-sm" /> CLOUD_SETUP</div>
          </div>
        </div>

        <div className="space-y-6">
          {timelineSteps.map((step, idx) => (
            <div key={idx} className="relative">
              <div className="flex items-center mb-2">
                <div className="w-24 text-sm font-mono text-neon-pink">{step.day}</div>
                <div className="flex-1 h-2 bg-white/5 rounded-full relative overflow-hidden">
                   <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: idx < 2 ? '40%' : '100%' }}
                    transition={{ duration: 1, delay: idx * 0.2 }}
                    className={`h-full rounded-full ${idx % 2 === 0 ? 'bg-neon-pink' : 'bg-neon-cyan'}`}
                    style={{ marginLeft: `${idx * 15}%` }}
                   />
                </div>
              </div>
              <div className="flex pl-24 gap-4">
                 <div className="p-2 bg-white/5 rounded-lg border border-white/10">
                    <step.icon size={16} className="text-gray-400" />
                 </div>
                 <div>
                    <h4 className="text-white text-sm font-bold">{step.title}</h4>
                    <p className="text-gray-500 text-[10px] sm:text-xs">{step.desc}</p>
                 </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// --- Main Page ---

const Pricing: React.FC = () => {
  const [isAnnual, setIsAnnual] = useState(true);

  return (
    <div className="pt-32 pb-24 min-h-screen bg-cyber-950 relative overflow-hidden">
      <SEO 
        title="Pricing | Hyper-Local Intelligence & Interiors"
        description="Choose the right plan for your business. Affordable AI-driven operating systems and premium interior design packages in Bangalore."
        keywords="Ooru Logix Pricing, Interiors JP Nagar Cost, Bangalore Interior Packages, Retail AI Pricing"
        canonical="https://www.oorulogix.com/pricing"
      />
      {/* Background Ambient Glows */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px]"></div>
        <div className="absolute top-[20%] right-[-10%] w-96 h-96 bg-pink-500/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] left-[40%] w-96 h-96 bg-garden-500/10 rounded-full blur-[120px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Section */}
        <div className="text-center mb-16 animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-gray-300 text-sm font-mono mb-6 backdrop-blur-sm">
            <Sparkles size={16} className="text-yellow-400" />
            <span>Operational Leverage for Modern Merchants</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
            The <span className="text-transparent bg-clip-text bg-gradient-to-r from-garden-400 to-cyan-400">Logic</span> Menu
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-10">
            Stop guessing. Start orchestrating. High-precision monthly plans tailored for the density and margins of <strong className="text-white">Bengaluru's Commercial Grids</strong>.
          </p>
          
          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <span className={`text-sm font-bold tracking-wider uppercase ${!isAnnual ? 'text-white' : 'text-gray-500'}`}>Monthly Rate</span>
            <button 
              onClick={() => setIsAnnual(!isAnnual)}
              className="relative w-20 h-10 rounded-full bg-cyber-900 border border-white/20 p-1 transition-colors hover:border-white/40"
            >
              <div 
                className={`w-8 h-8 rounded-full bg-gradient-to-r from-garden-400 to-cyan-400 transition-transform duration-300 shadow-lg ${isAnnual ? 'translate-x-10' : 'translate-x-0'}`}
              ></div>
            </button>
            <span className={`text-sm font-bold tracking-wider uppercase flex items-center gap-2 ${isAnnual ? 'text-white' : 'text-gray-500'}`}>
              Annual Burn <span className="bg-garden-500/20 text-garden-400 text-[10px] px-2 py-1 rounded-full border border-garden-500/30">SAVE 20%</span>
            </span>
          </div>

          <div className="inline-flex items-center gap-2 bg-yellow-500/10 text-yellow-400 px-5 py-3 rounded-xl text-sm border border-yellow-500/20 shadow-[0_0_20px_rgba(234,179,8,0.1)]">
            <Info size={18} className="shrink-0" />
            <span className="text-left"><strong>Founder's Priority:</strong> Only 10 merchant slots remain for the Bangalore Beta. Lock in current rates for life.</span>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto items-stretch mb-32">
          {tiers.map((tier, index) => (
            <div 
              key={tier.name} 
              className={`group relative rounded-3xl p-8 transition-all duration-500 backdrop-blur-xl bg-cyber-900/40 border border-white/10 flex flex-col ${tier.borderFocus} ${tier.glow} ${
                tier.recommended ? 'md:-translate-y-4 scale-105 z-20 bg-cyber-800/60 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)]' : 'hover:-translate-y-2 z-10'
              }`}
              style={{ animationDelay: `${index * 150}ms` }}
            >
              {/* Top Gradient Line */}
              <div className={`absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r ${tier.color} rounded-t-3xl opacity-80 group-hover:opacity-100 transition-opacity`}></div>

              {tier.recommended && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-garden-400 to-emerald-600 text-cyber-950 font-bold px-4 py-1 rounded-full text-xs tracking-widest uppercase shadow-lg">
                  Most Optimized ROI
                </div>
              )}

              <div className="flex justify-between items-start mb-6">
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-white mb-2">{tier.name}</h3>
                  <p className="text-gray-400 text-xs leading-relaxed italic pr-4">{tier.note}</p>
                </div>
                <div className={`p-3 rounded-2xl bg-white/5 border border-white/10 ${tier.textColor} shadow-lg shadow-black/40`}>
                  {tier.icon}
                </div>
              </div>
              
              <div className="mb-4">
                  <p className="text-gray-400 text-sm leading-relaxed">{tier.description}</p>
              </div>

              <div className="mb-8">
                <div className="flex items-baseline gap-1">
                  <span className="text-gray-400 text-2xl">₹</span>
                  <span className="text-5xl font-bold text-white tracking-tight">
                    {(isAnnual ? tier.annualPrice : tier.monthlyPrice).toLocaleString('en-IN')}
                  </span>
                  <span className="text-gray-500 ml-1">/mo</span>
                </div>
                {isAnnual && (
                  <div className="text-sm text-garden-400 mt-2 font-mono">
                    Billed ₹{(tier.annualPrice * 12).toLocaleString('en-IN')} yearly
                  </div>
                )}
              </div>

              <div className="space-y-4 mb-10 flex-1">
                <div className="w-full h-px bg-white/5 my-4"></div>
                {tier.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3 list-none">
                    <div className={`mt-0.5 rounded-full p-0.5 ${tier.recommended ? 'bg-garden-500/20 text-garden-400' : 'bg-white/10 text-gray-400 group-hover:' + tier.textColor + ' group-hover:bg-white/20'} transition-colors`}>
                      <CheckCircle2 size={14} />
                    </div>
                    <span className="text-gray-300 text-xs leading-relaxed">{feature}</span>
                  </li>
                ))}
              </div>

              <Link 
                to={PageRoute.CONTACT}
                className={`block w-full text-center py-4 rounded-xl font-bold tracking-wide transition-all duration-300 flex items-center justify-center gap-2 ${
                  tier.recommended 
                    ? `bg-gradient-to-r ${tier.color} text-cyber-950 hover:shadow-lg hover:scale-[1.02]` 
                    : 'bg-white/5 text-white hover:bg-white/10 border border-white/10 hover:border-white/20'
                }`}
              >
                {tier.cta}
                <ArrowRight size={18} className={tier.recommended ? 'group-hover:translate-x-1 transition-transform' : ''} />
              </Link>
            </div>
          ))}
        </div>

        {/* Plan Comparison Matrix */}
        <section className="mb-32">
          <div className="text-center mb-12">
             <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Feature Convergence</h2>
             <p className="text-gray-400">Deep dive into the architecture of each operational tier.</p>
          </div>
          
          <div className="glass-panel rounded-[2.5rem] border border-white/10 bg-cyber-950/50 p-1 overflow-hidden">
             <div className="overflow-x-auto">
               <table className="w-full text-left border-collapse">
                 <thead>
                   <tr className="bg-white/5">
                     <th className="px-8 py-6 text-sm font-mono text-gray-500 uppercase tracking-widest border-b border-white/10">Architecture Feature</th>
                     {tiers.map(t => (
                       <th key={t.id} className="px-8 py-6 text-sm font-bold text-white border-b border-white/10">
                         <div className="flex items-center gap-2">
                           <span className={t.textColor}>{t.name}</span>
                         </div>
                       </th>
                     ))}
                   </tr>
                 </thead>
                 <tbody className="divide-y divide-white/5">
                   {featureRows.map((row, idx) => (
                     <tr key={idx} className="hover:bg-white/5 transition-colors group">
                       <td className="px-8 py-6 text-sm text-gray-400 font-medium">{row.name}</td>
                       {tiers.map(t => {
                         const val = (t.comparativeFeatures as any)[row.key];
                         return (
                           <td key={t.id} className="px-8 py-6">
                             {typeof val === 'boolean' ? (
                               val ? <div className="text-garden-400"><Check size={18}/></div> : <div className="text-gray-700 font-mono text-xs">NOT_ENABLED</div>
                             ) : (
                               <div className="text-white text-xs font-mono group-hover:text-neon-cyan transition-colors">{val}</div>
                             )}
                           </td>
                         );
                       })}
                     </tr>
                   ))}
                   <tr className="bg-cyber-900/50">
                      <td className="px-8 py-10 text-sm font-bold text-white italic">The Verdict</td>
                      <td className="px-8 py-10">
                         <p className="text-[10px] text-gray-500 leading-relaxed uppercase tracking-tighter">Minimum viable Digitization for tiny stalls.</p>
                      </td>
                      <td className="px-8 py-10 bg-garden-500/5">
                         <p className="text-[10px] text-garden-400 font-bold leading-relaxed uppercase tracking-tighter">Recommended for 90% of Merchants. Full autonomy at a coffee price.</p>
                      </td>
                      <td className="px-8 py-10">
                         <p className="text-[10px] text-pink-400 font-bold leading-relaxed uppercase tracking-tighter">The ultimate hardware + AI edge. Total digital sovereignty.</p>
                      </td>
                   </tr>
                 </tbody>
               </table>
             </div>
          </div>
        </section>

        {/* Workflow Animation Section */}
        <section className="mb-32">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Reactive Autonomy</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">How our Model Mesh orchestrates your outlet behind the scenes.</p>
          </div>
          <WorkflowAnimation />
        </section>

        {/* Gantt / Timeline Section */}
        <section className="mb-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
               <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neon-pink/10 border border-neon-pink/30 text-neon-pink text-[10px] font-mono mb-6">
                 <Calendar size={12} /> ONBOARDING_FLOW
               </div>
               <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">Zero-Touch <br/><span className="text-neon-pink">Deployment</span></h2>
               <p className="text-lg text-gray-400 leading-relaxed mb-8">
                 We don't just sell software. We deploy engineers. From site audit to predictive logic being <strong>Live</strong> takes less than a week. No development required on your end.
               </p>
               <div className="space-y-6">
                 {[
                   { label: 'Merchant downtime during setup', val: '0 Minutes' },
                   { label: 'Field Engineer visits included', val: 'Unlimited during Onboarding' },
                   { label: 'Data ingestion speed', val: 'Instant Cloud Sync' }
                 ].map((item, i) => (
                   <div key={i} className="flex justify-between items-center p-4 bg-white/5 rounded-2xl border border-white/5">
                      <span className="text-gray-300 text-sm">{item.label}</span>
                      <span className="text-neon-pink font-mono text-sm font-bold">{item.val}</span>
                   </div>
                 ))}
               </div>
            </div>
            <GanttChart />
          </div>
        </section>

        {/* Trust / FAQ Section Upgraded */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-b from-cyber-800/50 to-cyber-900/50 border border-white/10 rounded-3xl p-8 md:p-12 backdrop-blur-sm relative overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-garden-500/50 to-transparent"></div>
            
            <div className="flex flex-col md:flex-row items-center gap-10 mb-12">
               <div className="shrink-0">
                  <div className="w-24 h-24 rounded-full bg-garden-500/10 border border-garden-500/30 flex items-center justify-center p-2 relative">
                     <Users className="text-garden-400" size={40} />
                     <div className="absolute -top-1 -right-1 w-6 h-6 bg-garden-500 rounded-full flex items-center justify-center text-[10px] text-cyber-950 font-bold">10+</div>
                  </div>
               </div>
               <div className="text-center md:text-left">
                  <h3 className="text-2xl font-bold text-white mb-3">Become a Grid Partner</h3>
                  <p className="text-gray-400 leading-relaxed">
                    We are currently onboarding a selective cohort of <strong>10 flagship merchants</strong> in Bellandur and Indiranagar. This is more than a subscription; it's a partnership to build the city's OS.
                  </p>
               </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
              <div className="p-6 bg-black/20 rounded-2xl border border-white/5 relative group hover:border-white/20 transition-colors">
                <Shield className="text-garden-400 mb-4" size={24} />
                <h4 className="text-white font-bold mb-2 text-sm">Cancel Anytime</h4>
                <p className="text-[10px] text-gray-500 leading-relaxed uppercase">No long-term lock-ins. You own the data. We earn the subscription Every single month.</p>
              </div>
              <div className="p-6 bg-black/20 rounded-2xl border border-white/5 group hover:border-white/20 transition-colors">
                <Zap className="text-cyan-400 mb-4" size={24} />
                <h4 className="text-white font-bold mb-2 text-sm">Field Support</h4>
                <p className="text-[10px] text-gray-500 leading-relaxed uppercase">Real humans on scooters. If a node fails, we are at your outlet within 4 hours. Guaranteed.</p>
              </div>
              <div className="p-6 bg-black/20 rounded-2xl border border-white/5 group hover:border-white/20 transition-colors">
                <Star className="text-pink-400 mb-4" size={24} />
                <h4 className="text-white font-bold mb-2 text-sm">DPDP Ready</h4>
                <p className="text-[10px] text-gray-500 leading-relaxed uppercase">Fully compliant with India's latest Data Protection laws. Your customer list is your asset.</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Pricing;
