import React from 'react';
import { Users, Database, Globe, Network, Cpu, ArrowUpRight, GitMerge, Shield } from 'lucide-react';
import SEO from '../components/SEO';

const Manifesto: React.FC = () => {
  return (
    <div className="pt-24 min-h-screen bg-cyber-900 overflow-x-hidden">
      <SEO 
        title="Our Manifesto | Hyper-Local Intelligence & Interiors"
        description="The philosophy behind Ooru Logix: Building a sovereign data mesh for Bangalore's merchants and premium interior design professionals."
        keywords="Ooru Logix Manifesto, Bangalore Tech Philosophy, Hyper-local Data Mesh, Retail Sovereignty, JP Nagar Tech"
        canonical="https://www.oorulogix.com/manifesto"
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        <header className="mb-20 text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-garden-500/10 border border-garden-500/20 text-garden-400 text-xs font-mono mb-6">
            <span className="w-2 h-2 rounded-full bg-garden-500 animate-pulse"></span>
            SYSTEM ARCHITECTURE v2.5
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            The Sovereign Merchant <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-garden-400 to-cyan-400">Intelligence Grid</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            We don't just build websites. We construct a <strong>"Human-in-the-Loop"</strong> operating system for merchants and <strong>Premium Interior Design</strong> logic where organic intuition meets algorithmic precision.
          </p>
        </header>

        <article className="prose prose-invert prose-lg max-w-none">
          {/* Section 1: The Optimization Loop Visualization */}
          <div className="mb-32 relative">
             <div className="absolute inset-0 bg-garden-500/5 blur-3xl rounded-full opacity-20"></div>
             
             <div className="glass-panel border border-garden-500/20 rounded-3xl p-8 md:p-12 relative overflow-hidden">
                <div className="absolute inset-0 cyber-grid opacity-10 cyber-grid-animate"></div>
                
                <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
                   <div className="md:w-1/3">
                      <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                        <GitMerge className="text-garden-400" />
                        The Optimization Cycle
                      </h2>
                      <p className="text-gray-400 text-sm leading-relaxed">
                        Data flows from the chaotic reality of the street into our Logic Core, where it is refined, analyzed, and returned as actionable directives. This is a continuous, self-healing loop.
                      </p>
                   </div>
                   
                   <div className="md:w-2/3 w-full">
                      {/* Diagram of Optimization */}
                      <div className="grid grid-cols-3 gap-4 text-center relative">
                         {/* Connecting Line Background */}
                         <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-800 -translate-y-1/2 z-0">
                            <div className="h-full bg-garden-500/50 w-full animate-pulse-slow"></div>
                         </div>

                         {/* Node 1 */}
                         <div className="relative z-10 bg-cyber-950 border border-garden-500/30 p-6 rounded-xl shadow-[0_0_15px_rgba(16,185,129,0.1)] group hover:border-garden-400 transition-colors">
                            <div className="w-12 h-12 bg-gray-800 rounded-full mx-auto mb-3 flex items-center justify-center text-gray-400 group-hover:text-garden-400 group-hover:bg-garden-500/20 transition-all">
                              <Globe size={24} />
                            </div>
                            <h3 className="text-white font-bold text-sm">Input Node</h3>
                            <p className="text-xs text-gray-500 mt-1">Raw Reality</p>
                            <p className="text-xs text-garden-500/70 mt-2 font-mono">Sensors / Logs</p>
                         </div>

                         {/* Node 2 */}
                         <div className="relative z-10 bg-cyber-900 border-2 border-garden-500 p-6 rounded-xl shadow-[0_0_30px_rgba(16,185,129,0.2)] transform scale-110">
                            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-garden-500 text-cyber-900 text-[10px] font-bold px-2 py-0.5 rounded-full">PROCESSING</div>
                            <div className="w-12 h-12 bg-garden-500/20 rounded-full mx-auto mb-3 flex items-center justify-center text-garden-400 animate-pulse">
                              <Cpu size={24} />
                            </div>
                            <h3 className="text-white font-bold text-sm">Logic Core</h3>
                            <p className="text-xs text-gray-400 mt-1">Gemini 2.5 Flash</p>
                            <div className="mt-2 h-1 w-full bg-gray-800 rounded-full overflow-hidden">
                              <div className="h-full bg-garden-400 w-2/3 animate-[flow_2s_ease-in-out_infinite]"></div>
                            </div>
                         </div>

                         {/* Node 3 */}
                         <div className="relative z-10 bg-cyber-950 border border-garden-500/30 p-6 rounded-xl shadow-[0_0_15px_rgba(16,185,129,0.1)] group hover:border-garden-400 transition-colors">
                            <div className="w-12 h-12 bg-gray-800 rounded-full mx-auto mb-3 flex items-center justify-center text-gray-400 group-hover:text-garden-400 group-hover:bg-garden-500/20 transition-all">
                              <ArrowUpRight size={24} />
                            </div>
                            <h3 className="text-white font-bold text-sm">Action Node</h3>
                            <p className="text-xs text-gray-500 mt-1">Optimized State</p>
                            <p className="text-xs text-garden-500/70 mt-2 font-mono">Revenue +30%</p>
                         </div>
                      </div>
                   </div>
                </div>
             </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-24">
             <div>
                <h3 className="text-2xl font-bold text-white flex items-center gap-3 mb-6">
                  <Database className="text-blue-400" />
                  The Data Mesh Architecture
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  The Indian retail market is valued at approx $800 Billion, with 90% "unorganized". We don't try to formalize them into Western corporations. We treat every merchant as a <strong>"Sovereign Data Node"</strong>.
                </p>
                <ul className="mt-6 space-y-4">
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded bg-blue-500/10 flex items-center justify-center text-blue-400 flex-shrink-0 text-xs border border-blue-500/30">01</div>
                    <span className="text-gray-400 text-sm"><strong className="text-white">Domain-Oriented Ownership:</strong> The merchant owns their data. No platform lock-in.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded bg-blue-500/10 flex items-center justify-center text-blue-400 flex-shrink-0 text-xs border border-blue-500/30">02</div>
                    <span className="text-gray-400 text-sm"><strong className="text-white">Data as a Product:</strong> We transform juice sales logs into credit-worthy assets.</span>
                  </li>
                </ul>
             </div>
             <div>
                <h3 className="text-2xl font-bold text-white flex items-center gap-3 mb-6">
                  <Shield className="text-purple-400" />
                  The Last Moat
                </h3>
                <p className="text-gray-400 leading-relaxed">
                   Cloud computing and AI have democratized code. Any engineer can build an app. However, no one can easily replicate the <strong>Hyper-Local Trust</strong> and the <strong>Physical Presence</strong> of Ooru Logix in Bellandur.
                </p>
                <div className="mt-6 p-4 bg-purple-500/5 border border-purple-500/20 rounded-lg">
                  <p className="text-purple-300 text-sm italic">
                    "We are Anti-Fragile. We benefit from local market chaos because our software helps merchants manage it."
                  </p>
                </div>
             </div>
          </div>

          {/* New "Team" Section -> Generalized into "The Human Intelligence Mesh" */}
          <div className="mt-20 pt-10 border-t border-gray-800">
            <div className="flex items-center justify-between mb-12">
               <div>
                  <h3 className="text-3xl font-bold text-white flex items-center gap-3">
                    <Network className="text-garden-400" />
                    The Human Intelligence Mesh
                  </h3>
                  <p className="text-gray-500 mt-2">Operational Nodes & Data Guardians</p>
               </div>
               <div className="hidden md:flex items-center gap-2 text-xs font-mono text-garden-500/50">
                  <span className="w-2 h-2 bg-garden-500 rounded-full animate-pulse"></span>
                  NODES ONLINE: 5/5
               </div>
            </div>

            {/* Network Topology Visualization */}
            <div className="relative">
               {/* SVG Connections Layer (Background) */}
               <svg className="absolute inset-0 w-full h-full z-0 pointer-events-none opacity-40 hidden md:block" style={{minHeight: '600px'}}>
                  <defs>
                     <linearGradient id="line-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="rgba(16, 185, 129, 0)" />
                        <stop offset="50%" stopColor="rgba(16, 185, 129, 0.5)" />
                        <stop offset="100%" stopColor="rgba(16, 185, 129, 0)" />
                     </linearGradient>
                  </defs>
                  {/* Central Hub Connections */}
                  <path d="M50% 120 L50% 280" stroke="url(#line-gradient)" strokeWidth="2" className="data-path" />
                  <path d="M50% 120 L20% 280" stroke="url(#line-gradient)" strokeWidth="1" className="data-path" style={{animationDelay: '0.5s'}} />
                  <path d="M50% 120 L80% 280" stroke="url(#line-gradient)" strokeWidth="1" className="data-path" style={{animationDelay: '1s'}} />
                  
                  {/* Cross Connections */}
                  <path d="M20% 380 L50% 550" stroke="url(#line-gradient)" strokeWidth="1" className="data-path" style={{animationDelay: '1.2s'}} />
                  <path d="M80% 380 L50% 550" stroke="url(#line-gradient)" strokeWidth="1" className="data-path" style={{animationDelay: '1.5s'}} />
                  <path d="M50% 380 L50% 550" stroke="url(#line-gradient)" strokeWidth="2" className="data-path" style={{animationDelay: '0.2s'}} />
               </svg>

               <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
                  
                  {/* Row 1: The Architect (Center) */}
                  <div className="md:col-start-2">
                     <div className="bg-cyber-900 border border-garden-500 shadow-[0_0_25px_rgba(16,185,129,0.2)] p-6 rounded-xl text-center transform hover:scale-105 transition-transform duration-300">
                        <div className="inline-block p-3 rounded-full bg-garden-500/10 mb-4 border border-garden-500/30">
                           <Cpu size={32} className="text-garden-400" />
                        </div>
                        <h4 className="text-white font-bold text-lg">SYSTEM ARCHITECT</h4>
                        <p className="text-garden-400 font-mono text-xs mb-2">NODE: STRATEGY_CORE</p>
                        <p className="text-gray-400 text-sm">Product Vision & High-Level Directives.</p>
                     </div>
                  </div>

                  {/* Row 2: Specialists */}
                  <div className="md:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
                     <div className="bg-cyber-950 border border-gray-800 p-6 rounded-xl hover:border-garden-500/50 transition-colors group">
                        <div className="flex items-center justify-between mb-4">
                           <h4 className="text-white font-bold">GROWTH HACKER</h4>
                           <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
                        </div>
                        <p className="text-xs font-mono text-gray-500 mb-2">NODE: AUDIT_WEDGE</p>
                        <p className="text-gray-400 text-sm">Merchant Onboarding & Compliance Scoring.</p>
                        <div className="mt-4 w-full bg-gray-800 h-1 rounded-full overflow-hidden">
                           <div className="h-full bg-yellow-500 w-1/3 group-hover:w-full transition-all duration-1000"></div>
                        </div>
                     </div>

                     <div className="bg-cyber-950 border border-gray-800 p-6 rounded-xl hover:border-garden-500/50 transition-colors group">
                        <div className="flex items-center justify-between mb-4">
                           <h4 className="text-white font-bold">OPS LEAD</h4>
                           <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                        </div>
                        <p className="text-xs font-mono text-gray-500 mb-2">NODE: CLIENT_SUCCESS</p>
                        <p className="text-gray-400 text-sm">Retention, Satisfaction & Feedback Loops.</p>
                        <div className="mt-4 w-full bg-gray-800 h-1 rounded-full overflow-hidden">
                           <div className="h-full bg-blue-500 w-1/2 group-hover:w-full transition-all duration-1000"></div>
                        </div>
                     </div>

                     <div className="bg-cyber-950 border border-gray-800 p-6 rounded-xl hover:border-garden-500/50 transition-colors group">
                        <div className="flex items-center justify-between mb-4">
                           <h4 className="text-white font-bold">CREATIVE LEAD</h4>
                           <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
                        </div>
                        <p className="text-xs font-mono text-gray-500 mb-2">NODE: BRAND_IDENTITY</p>
                        <p className="text-gray-400 text-sm">Aesthetic Calibration & Visual Output.</p>
                        <div className="mt-4 w-full bg-gray-800 h-1 rounded-full overflow-hidden">
                           <div className="h-full bg-purple-500 w-2/3 group-hover:w-full transition-all duration-1000"></div>
                        </div>
                     </div>
                  </div>

                  {/* Row 3: Foundation */}
                  <div className="md:col-start-2 mt-8">
                     <div className="bg-cyber-900 border border-gray-700 p-6 rounded-xl text-center relative overflow-hidden">
                        <div className="absolute inset-0 bg-garden-500/5 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                        <h4 className="text-white font-bold text-lg">FIELD ENGINEER</h4>
                        <p className="text-gray-500 font-mono text-xs mb-2">NODE: INFRASTRUCTURE</p>
                        <p className="text-gray-400 text-sm">Firebase Deployment & Bank-Grade Security.</p>
                        <div className="mt-4 flex justify-center gap-1">
                           {[1,2,3,4,5].map(i => (
                              <div key={i} className="w-1 h-3 bg-garden-500/30 rounded-sm animate-[pulse_1s_ease-in-out_infinite]" style={{animationDelay: `${i * 0.1}s`}}></div>
                           ))}
                        </div>
                     </div>
                  </div>

               </div>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
};

export default Manifesto;