import React, { useState, useEffect } from 'react';
import { Users, Database, Globe, Network, Cpu, ArrowUpRight, GitMerge, Shield, Brain, Activity, Zap } from 'lucide-react';
import { SwarmAgentConcept } from './SwarmAgentConcept';
import { ResponsiveContainer, AreaChart, Area, LineChart, Line } from 'recharts';

const ManifestoSection: React.FC = () => {
  const [activeModel, setActiveModel] = useState<'frontier' | 'open' | null>(null);
  const [activeNode, setActiveNode] = useState<string | null>(null);
  const [activeCycle, setActiveCycle] = useState<string | null>(null);
  const [meshData, setMeshData] = useState([
    { time: '00:00', load: 30, latency: 120 },
    { time: '04:00', load: 45, latency: 150 },
    { time: '08:00', load: 85, latency: 210 },
    { time: '12:00', load: 95, latency: 250 },
    { time: '16:00', load: 70, latency: 180 },
    { time: '20:00', load: 60, latency: 160 },
    { time: '24:00', load: 40, latency: 130 },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setMeshData(prev => prev.map(item => ({
        ...item,
        load: Math.min(100, Math.max(10, item.load + (Math.random() - 0.5) * 20)),
        latency: Math.min(300, Math.max(50, item.latency + (Math.random() - 0.5) * 30))
      })));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="manifesto" className="py-16 bg-cyber-900/30 backdrop-blur-lg overflow-x-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        <header className="mb-12 text-center max-w-4xl mx-auto relative">
          {/* Dashboard Header Elements */}
          <div className="absolute top-0 left-0 w-32 h-24 bg-cyber-950 border border-white/10 rounded-xl p-3 hidden md:flex flex-col justify-between shadow-[0_0_15px_rgba(0,204,255,0.1)]">
            <div className="flex justify-between items-center">
              <span className="text-[10px] text-gray-500 font-mono">SYS_LOAD</span>
              <Activity size={12} className="text-neon-cyan" />
            </div>
            <div className="text-xl font-bold text-neon-cyan">42.8%</div>
            <div className="w-full bg-white/10 h-1 rounded-full overflow-hidden">
              <div className="h-full bg-neon-cyan w-[42.8%]"></div>
            </div>
          </div>
          
          <div className="absolute top-0 right-0 w-32 h-24 bg-cyber-950 border border-white/10 rounded-xl p-3 hidden md:flex flex-col justify-between shadow-[0_0_15px_rgba(255,0,255,0.1)]">
            <div className="flex justify-between items-center">
              <span className="text-[10px] text-gray-500 font-mono">NET_SYNC</span>
              <Zap size={12} className="text-neon-pink" />
            </div>
            <div className="text-xl font-bold text-neon-pink">99.9%</div>
            <div className="w-full bg-white/10 h-1 rounded-full overflow-hidden">
              <div className="h-full bg-neon-pink w-[99.9%]"></div>
            </div>
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-garden-500/10 border border-garden-500/20 text-garden-400 text-[10px] font-mono mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-garden-500 animate-pulse"></span>
            SYSTEM ARCHITECTURE v2.5
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight">
            The Sovereign Merchant <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-garden-400 to-cyan-400">Intelligence Grid</span>
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            We don't just build websites. We construct a "Human-in-the-Loop" operating system where organic intuition meets algorithmic precision.
          </p>
        </header>

        <article className="prose prose-invert prose-lg max-w-none">
          {/* Section 1: The Optimization Loop Visualization */}
          <div className="mb-16 relative">
             <div className="absolute inset-0 bg-garden-500/5 blur-3xl rounded-full opacity-20"></div>
             
             <div className="glass-panel border border-garden-500/20 rounded-2xl p-8 relative overflow-hidden">
                <div className="absolute inset-0 cyber-grid opacity-10 cyber-grid-animate"></div>
                
                <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                   <div className="md:w-1/3">
                      <h2 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                        <GitMerge className="text-garden-400" size={20} />
                        The Optimization Cycle
                      </h2>
                      <p className="text-gray-400 text-sm leading-relaxed">
                        Data flows from the chaotic reality of the street into our Logic Core, where it is refined, analyzed, and returned as actionable directives. This is a continuous, self-healing loop.
                      </p>
                   </div>
                   
                   <div className="md:w-2/3 w-full">
                      {/* Diagram of Optimization */}
                      <div className="grid grid-cols-3 gap-3 text-center relative">
                         {/* Connecting Line Background */}
                         <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-800 -translate-y-1/2 z-0">
                            <div className="h-full bg-garden-500/50 w-full animate-pulse-slow"></div>
                         </div>

                         {/* Node 1 */}
                         <div 
                           className={`relative z-10 bg-cyber-950 border ${activeCycle === 'input' ? 'border-neon-blue shadow-[0_0_20px_rgba(0,204,255,0.3)]' : 'border-neon-blue/30 shadow-[0_0_15px_rgba(0,204,255,0.1)] hover:border-neon-blue'} p-4 rounded-xl transition-all cursor-pointer group`}
                           onClick={() => setActiveCycle(activeCycle === 'input' ? null : 'input')}
                         >
                            <div className="w-10 h-10 bg-gray-800 rounded-full mx-auto mb-2 flex items-center justify-center text-gray-400 group-hover:text-neon-blue group-hover:bg-neon-blue/20 transition-all">
                              <Globe size={20} />
                            </div>
                            <div className="flex items-center justify-center gap-1">
                              <h3 className="text-white font-bold text-xs">Input Node</h3>
                              <ArrowUpRight size={12} className={`text-neon-blue transition-transform ${activeCycle === 'input' ? 'rotate-45' : 'group-hover:translate-x-0.5 group-hover:-translate-y-0.5'}`} />
                            </div>
                            <p className="text-[10px] text-gray-500 mt-1">Raw Reality</p>
                            <p className="text-[10px] text-neon-blue/70 mt-1 font-mono">Sensors / Logs</p>
                            
                            {activeCycle === 'input' && (
                              <div className="mt-3 pt-3 border-t border-neon-blue/20 text-left animate-in fade-in slide-in-from-top-2">
                                <p className="text-[10px] text-gray-300">
                                  Captures unstructured data from the physical world: foot traffic, inventory levels, and transaction logs.
                                </p>
                              </div>
                            )}
                         </div>

                         {/* Node 2 */}
                         <div 
                           className={`relative z-10 bg-cyber-900 border-2 ${activeCycle === 'logic' ? 'border-neon-purple shadow-[0_0_40px_rgba(189,0,255,0.4)]' : 'border-neon-purple shadow-[0_0_30px_rgba(189,0,255,0.2)]'} p-4 rounded-xl transform scale-105 cursor-pointer transition-all group`}
                           onClick={() => setActiveCycle(activeCycle === 'logic' ? null : 'logic')}
                         >
                            <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-neon-purple text-white text-[8px] font-bold px-2 py-0.5 rounded-full">PROCESSING</div>
                            <div className="w-10 h-10 bg-neon-purple/20 rounded-full mx-auto mb-2 flex items-center justify-center text-neon-purple animate-pulse">
                              <Cpu size={20} />
                            </div>
                            <div className="flex items-center justify-center gap-1">
                              <h3 className="text-white font-bold text-xs">Logic Core</h3>
                              <ArrowUpRight size={12} className={`text-neon-purple transition-transform ${activeCycle === 'logic' ? 'rotate-45' : 'group-hover:translate-x-0.5 group-hover:-translate-y-0.5'}`} />
                            </div>
                            <p className="text-[10px] text-gray-400 mt-1">Model Mesh</p>
                            
                            {activeCycle === 'logic' && (
                              <div className="mt-3 pt-3 border-t border-neon-purple/20 text-left animate-in fade-in slide-in-from-top-2">
                                <p className="text-[10px] text-gray-300">
                                  Our proprietary ensemble of LLMs processes the raw data, identifies patterns, and formulates strategic directives.
                                </p>
                              </div>
                            )}

                            <div className="mt-2 h-0.5 w-full bg-gray-800 rounded-full overflow-hidden">
                              <div className="h-full bg-neon-purple w-2/3 animate-[flow_2s_ease-in-out_infinite]"></div>
                            </div>
                         </div>

                         {/* Node 3 */}
                         <div 
                           className={`relative z-10 bg-cyber-950 border ${activeCycle === 'action' ? 'border-garden-400 shadow-[0_0_20px_rgba(16,185,129,0.3)]' : 'border-garden-500/30 shadow-[0_0_15px_rgba(16,185,129,0.1)] hover:border-garden-400'} p-4 rounded-xl transition-all cursor-pointer group`}
                           onClick={() => setActiveCycle(activeCycle === 'action' ? null : 'action')}
                         >
                            <div className="w-10 h-10 bg-gray-800 rounded-full mx-auto mb-2 flex items-center justify-center text-gray-400 group-hover:text-garden-400 group-hover:bg-garden-500/20 transition-all">
                              <ArrowUpRight size={20} />
                            </div>
                            <div className="flex items-center justify-center gap-1">
                              <h3 className="text-white font-bold text-xs">Action Node</h3>
                              <ArrowUpRight size={12} className={`text-garden-400 transition-transform ${activeCycle === 'action' ? 'rotate-45' : 'group-hover:translate-x-0.5 group-hover:-translate-y-0.5'}`} />
                            </div>
                            <p className="text-[10px] text-gray-500 mt-1">Optimized State</p>
                            <p className="text-[10px] text-garden-500/70 mt-1 font-mono">Revenue +30%</p>
                            
                            {activeCycle === 'action' && (
                              <div className="mt-3 pt-3 border-t border-garden-500/20 text-left animate-in fade-in slide-in-from-top-2">
                                <p className="text-[10px] text-gray-300">
                                  Directives are executed in the real world: dynamic pricing, inventory reordering, and targeted promotions.
                                </p>
                              </div>
                            )}
                         </div>
                      </div>
                   </div>
                </div>
             </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
             <div>
                <h3 className="text-xl font-bold text-white flex items-center gap-2 mb-4">
                  <Database className="text-neon-blue" size={20}/>
                  The Data Mesh Architecture
                </h3>
                <p className="text-gray-400 leading-relaxed text-sm mb-6">
                  The Indian retail market is valued at approx $800 Billion, with 90% "unorganized". We don't try to formalize them into Western corporations. We treat every merchant as a <strong>"Sovereign Data Node"</strong>.
                </p>
                
                {/* Dashboard Component: Market Share */}
                <div className="bg-cyber-950 border border-white/10 rounded-xl p-4 mb-6">
                   <div className="flex justify-between items-center mb-4">
                     <span className="text-xs text-gray-400 font-mono">MARKET_DISTRIBUTION</span>
                     <span className="text-xs text-neon-blue font-bold">$800B TOTAL</span>
                   </div>
                   <div className="flex h-4 rounded-full overflow-hidden mb-2">
                     <div className="bg-neon-blue w-[10%] flex items-center justify-center text-[8px] font-bold text-cyber-950">10%</div>
                     <div className="bg-neon-purple w-[90%] flex items-center justify-center text-[8px] font-bold text-white">90% UNORGANIZED</div>
                   </div>
                   <div className="flex justify-between text-[10px] text-gray-500">
                     <span>Organized Retail</span>
                     <span>Sovereign Nodes</span>
                   </div>
                </div>

                <ul className="mt-4 space-y-3">
                  <li className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded bg-blue-500/10 flex items-center justify-center text-blue-400 flex-shrink-0 text-[10px] border border-blue-500/30">01</div>
                    <span className="text-gray-400 text-sm"><strong className="text-white">Domain-Oriented Ownership:</strong> The merchant owns their data. No platform lock-in.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded bg-blue-500/10 flex items-center justify-center text-blue-400 flex-shrink-0 text-[10px] border border-blue-500/30">02</div>
                    <span className="text-gray-400 text-sm"><strong className="text-white">Data as a Product:</strong> We transform juice sales logs into credit-worthy assets.</span>
                  </li>
                </ul>
             </div>
             <div>
                <h3 className="text-xl font-bold text-white flex items-center gap-2 mb-4">
                  <Shield className="text-neon-pink" size={20}/>
                  The Last Moat
                </h3>
                <p className="text-gray-400 leading-relaxed text-sm mb-6">
                   Cloud computing and AI have democratized code. Any engineer can build an app. However, no one can easily replicate the <strong>Hyper-Local Trust</strong> and the <strong>Physical Presence</strong> of Ooru Logix in Bellandur.
                </p>
                
                {/* Dashboard Component: Trust Metric */}
                <div className="bg-cyber-950 border border-white/10 rounded-xl p-4 mb-4">
                   <div className="flex justify-between items-center mb-4">
                     <span className="text-xs text-gray-400 font-mono">LOCAL_TRUST_INDEX</span>
                     <span className="text-xs text-neon-pink font-bold">+85% MoM</span>
                   </div>
                   <div className="h-24 w-full">
                     <ResponsiveContainer width="100%" height="100%">
                       <AreaChart data={meshData}>
                         <defs>
                           <linearGradient id="colorTrust" x1="0" y1="0" x2="0" y2="1">
                             <stop offset="5%" stopColor="#ff00ff" stopOpacity={0.3}/>
                             <stop offset="95%" stopColor="#ff00ff" stopOpacity={0}/>
                           </linearGradient>
                         </defs>
                         <Area type="monotone" dataKey="load" stroke="#ff00ff" fillOpacity={1} fill="url(#colorTrust)" />
                       </AreaChart>
                     </ResponsiveContainer>
                   </div>
                </div>

                <div className="mt-4 p-3 bg-neon-pink/5 border border-neon-pink/20 rounded-lg">
                  <p className="text-neon-pink/80 text-xs italic">
                    "We are Anti-Fragile. We benefit from local market chaos because our software helps merchants manage it."
                  </p>
                </div>
              </div>
            </div>

            {/* Swarm Architecture Injection */}
            <div className="mb-16 mt-8">
              <SwarmAgentConcept 
                title="Swarm Interoperability Grid" 
                description="Our proprietary agent mesh allows real-time decision making across multiple operational vectors. Nodes communicate autonomously to optimize the entire business ecosystem."
              />
            </div>

            {/* Multi-Model Intelligence Section */}
            <div className="mb-16 glass-panel border border-white/10 rounded-2xl p-8 bg-gradient-to-r from-cyber-900 to-cyber-950">
              <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="md:w-1/2">
                  <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                    <Brain className="text-neon-cyan" size={24} />
                    Model Mesh Architecture
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed mb-6">
                    We don't rely on a single point of failure. Our <strong>Consensus Engine</strong> routes every query through a specialized mesh of frontier and open-source models to ensure the highest accuracy and lowest latency.
                  </p>
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div 
                      className={`p-3 rounded-xl border cursor-pointer transition-all relative overflow-hidden group ${activeModel === 'frontier' ? 'bg-neon-cyan/10 border-neon-cyan' : 'bg-white/5 border-white/10 hover:border-neon-cyan/50'}`}
                      onClick={() => setActiveModel(activeModel === 'frontier' ? null : 'frontier')}
                    >
                      <div className="flex justify-between items-start mb-1">
                        <p className="text-neon-cyan font-bold text-xs">Frontier Models</p>
                        <ArrowUpRight size={14} className={`text-neon-cyan transition-transform ${activeModel === 'frontier' ? 'rotate-45' : 'group-hover:translate-x-0.5 group-hover:-translate-y-0.5'}`} />
                      </div>
                      <p className="text-[10px] text-gray-500">Claude 3.5, Gemini 1.5 Pro, GPT-4o, Kimi-Latest</p>
                      <div className={`absolute bottom-0 left-0 h-0.5 bg-neon-cyan transition-all duration-300 ${activeModel === 'frontier' ? 'w-full' : 'w-0 group-hover:w-full'}`}></div>
                    </div>
                    <div 
                      className={`p-3 rounded-xl border cursor-pointer transition-all relative overflow-hidden group ${activeModel === 'open' ? 'bg-neon-pink/10 border-neon-pink' : 'bg-white/5 border-white/10 hover:border-neon-pink/50'}`}
                      onClick={() => setActiveModel(activeModel === 'open' ? null : 'open')}
                    >
                      <div className="flex justify-between items-start mb-1">
                        <p className="text-neon-pink font-bold text-xs">Open Weights</p>
                        <ArrowUpRight size={14} className={`text-neon-pink transition-transform ${activeModel === 'open' ? 'rotate-45' : 'group-hover:translate-x-0.5 group-hover:-translate-y-0.5'}`} />
                      </div>
                      <p className="text-[10px] text-gray-500">Llama 3.1, Mistral Large, DeepSeek-V3, Qwen-2.5</p>
                      <div className={`absolute bottom-0 left-0 h-0.5 bg-neon-pink transition-all duration-300 ${activeModel === 'open' ? 'w-full' : 'w-0 group-hover:w-full'}`}></div>
                    </div>
                  </div>

                  {/* Expandable Content */}
                  {activeModel === 'frontier' && (
                    <div className="mb-6 p-4 bg-neon-cyan/5 border border-neon-cyan/20 rounded-xl animate-in fade-in slide-in-from-top-2">
                      <h4 className="text-neon-cyan font-bold text-xs mb-2">Frontier Models: Complex Reasoning</h4>
                      <p className="text-gray-400 text-[10px] mb-3">
                        Used for high-level strategic tasks, complex data extraction from unstructured receipts, and generating nuanced merchant insights. These models provide the "heavy lifting" for our cognitive engine.
                      </p>
                      <div className="flex gap-2">
                        <span className="px-2 py-1 bg-neon-cyan/10 text-neon-cyan text-[8px] rounded font-mono">HIGH_ACCURACY</span>
                        <span className="px-2 py-1 bg-neon-cyan/10 text-neon-cyan text-[8px] rounded font-mono">DEEP_CONTEXT</span>
                      </div>
                    </div>
                  )}

                  {activeModel === 'open' && (
                    <div className="mb-6 p-4 bg-neon-pink/5 border border-neon-pink/20 rounded-xl animate-in fade-in slide-in-from-top-2">
                      <h4 className="text-neon-pink font-bold text-xs mb-2">Open Weights: Edge & Speed</h4>
                      <p className="text-gray-400 text-[10px] mb-3">
                        Deployed for rapid classification, intent routing, and local processing. These models ensure our system remains fast, cost-effective, and resilient even when cloud connectivity is unstable.
                      </p>
                      <div className="flex gap-2">
                        <span className="px-2 py-1 bg-neon-pink/10 text-neon-pink text-[8px] rounded font-mono">LOW_LATENCY</span>
                        <span className="px-2 py-1 bg-neon-pink/10 text-neon-pink text-[8px] rounded font-mono">COST_EFFICIENT</span>
                      </div>
                    </div>
                  )}

                  {/* Dashboard Component: Latency Chart */}
                  <div className="bg-cyber-950 border border-white/10 rounded-xl p-4">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-xs text-gray-400 font-mono">MESH_LATENCY (ms)</span>
                      <span className="text-xs text-neon-cyan font-bold">AVG: 165ms</span>
                    </div>
                    <div className="h-24 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={meshData}>
                          <Line type="monotone" dataKey="latency" stroke="#00ffff" strokeWidth={2} dot={false} isAnimationActive={false} />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
                <div className="md:w-1/2 w-full">
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 p-3 bg-cyber-800 rounded-xl border border-white/5">
                      <div className="w-8 h-8 rounded-lg bg-neon-blue/20 flex items-center justify-center text-neon-blue font-bold text-xs">01</div>
                      <div>
                        <p className="text-white font-bold text-xs">Intent Routing</p>
                        <p className="text-[10px] text-gray-500">Mistral-7B classifies the request complexity.</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 p-3 bg-cyber-800 rounded-xl border border-white/5">
                      <div className="w-8 h-8 rounded-lg bg-neon-purple/20 flex items-center justify-center text-neon-purple font-bold text-xs">02</div>
                      <div>
                        <p className="text-white font-bold text-xs">Parallel Execution</p>
                        <p className="text-[10px] text-gray-500">Claude and Gemini generate independent solutions.</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 p-3 bg-cyber-800 rounded-xl border border-white/5">
                      <div className="w-8 h-8 rounded-lg bg-neon-pink/20 flex items-center justify-center text-neon-pink font-bold text-xs">03</div>
                      <div>
                        <p className="text-white font-bold text-xs">Consensus Audit</p>
                        <p className="text-[10px] text-gray-500">GPT-4o verifies the final directive for safety.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          {/* Human Intelligence Mesh */}
          <div className="mt-12 pt-8 border-t border-gray-800">
            <div className="flex items-center justify-between mb-8">
               <div>
                  <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                    <Network className="text-garden-400" size={24}/>
                    The Human Intelligence Mesh
                  </h3>
                  <p className="text-gray-500 mt-1 text-sm">Operational Nodes & Data Guardians</p>
               </div>
               <div className="hidden md:flex items-center gap-2 text-[10px] font-mono text-garden-500/50">
                  <span className="w-1.5 h-1.5 bg-garden-500 rounded-full animate-pulse"></span>
                  NODES ONLINE: 5/5
               </div>
            </div>

            {/* Network Topology Visualization */}
            <div className="relative">
               {/* SVG Connections Layer */}
               <svg className="absolute inset-0 w-full h-full z-0 pointer-events-none opacity-40 hidden md:block" style={{minHeight: '400px'}} viewBox="0 0 800 400" preserveAspectRatio="xMidYMid slice">
                  <defs>
                     <linearGradient id="line-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="rgba(16, 185, 129, 0)" />
                        <stop offset="50%" stopColor="rgba(16, 185, 129, 0.5)" />
                        <stop offset="100%" stopColor="rgba(16, 185, 129, 0)" />
                     </linearGradient>
                  </defs>
                  {/* Adjusted paths for denser layout */}
                  <path d="M 400 80 L 400 200" stroke="url(#line-gradient)" strokeWidth="2" className="data-path" />
                  <path d="M 400 80 L 160 200" stroke="url(#line-gradient)" strokeWidth="1" className="data-path" style={{animationDelay: '0.5s'}} />
                  <path d="M 400 80 L 640 200" stroke="url(#line-gradient)" strokeWidth="1" className="data-path" style={{animationDelay: '1s'}} />
                  <path d="M 160 280 L 400 350" stroke="url(#line-gradient)" strokeWidth="1" className="data-path" style={{animationDelay: '1.2s'}} />
                  <path d="M 640 280 L 400 350" stroke="url(#line-gradient)" strokeWidth="1" className="data-path" style={{animationDelay: '1.5s'}} />
                  <path d="M 400 280 L 400 350" stroke="url(#line-gradient)" strokeWidth="2" className="data-path" style={{animationDelay: '0.2s'}} />
               </svg>

               <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
                  
                  {/* Row 1: The Architect (Center) */}
                  <div className="md:col-start-2">
                     <div 
                       className={`bg-cyber-900 border ${activeNode === 'architect' ? 'border-garden-400 shadow-[0_0_30px_rgba(16,185,129,0.4)]' : 'border-garden-500 shadow-[0_0_25px_rgba(16,185,129,0.2)]'} p-4 rounded-xl text-center transform hover:scale-105 transition-all duration-300 cursor-pointer`}
                       onClick={() => setActiveNode(activeNode === 'architect' ? null : 'architect')}
                     >
                        <div className="flex items-center justify-center gap-2 mb-3">
                           <div className="inline-block p-2 rounded-full bg-garden-500/10 border border-garden-500/30">
                              <Cpu size={24} className="text-garden-400" />
                           </div>
                           <ArrowUpRight size={16} className={`text-garden-400 transition-transform ${activeNode === 'architect' ? 'rotate-45' : ''}`} />
                        </div>
                        <h4 className="text-white font-bold text-base">SYSTEM ARCHITECT</h4>
                        <p className="text-garden-400 font-mono text-[10px] mb-1">NODE: STRATEGY_CORE</p>
                        <p className="text-gray-400 text-xs">Product Vision & High-Level Directives.</p>
                        
                        {activeNode === 'architect' && (
                          <div className="mt-4 pt-4 border-t border-garden-500/30 text-left animate-in fade-in slide-in-from-top-2">
                            <p className="text-[10px] text-gray-300 mb-2">
                              Responsible for the overarching architecture of the Sovereign Merchant grid. Defines the rules of engagement and the core algorithms that govern data flow.
                            </p>
                            <div className="flex justify-between items-center text-[8px] font-mono text-garden-400">
                              <span>UPTIME: 99.99%</span>
                              <span>STATUS: OPTIMAL</span>
                            </div>
                          </div>
                        )}
                     </div>
                  </div>

                  {/* Row 2: Specialists */}
                  <div className="md:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                     <div 
                       className={`bg-cyber-950 border ${activeNode === 'growth' ? 'border-yellow-500 shadow-[0_0_20px_rgba(234,179,8,0.2)]' : 'border-gray-800 hover:border-garden-500/50'} p-4 rounded-xl transition-all cursor-pointer group`}
                       onClick={() => setActiveNode(activeNode === 'growth' ? null : 'growth')}
                     >
                        <div className="flex items-center justify-between mb-2">
                           <h4 className="text-white font-bold text-sm">GROWTH HACKER</h4>
                           <div className="flex items-center gap-2">
                             <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full animate-pulse"></div>
                             <ArrowUpRight size={14} className={`text-yellow-500 transition-transform ${activeNode === 'growth' ? 'rotate-45' : 'group-hover:translate-x-0.5 group-hover:-translate-y-0.5'}`} />
                           </div>
                        </div>
                        <p className="text-[10px] font-mono text-gray-500 mb-1">NODE: AUDIT_WEDGE</p>
                        <p className="text-gray-400 text-xs mb-3">Merchant Onboarding & Compliance Scoring.</p>
                        
                        {activeNode === 'growth' && (
                          <div className="mb-3 pt-3 border-t border-yellow-500/20 animate-in fade-in slide-in-from-top-2">
                            <p className="text-[10px] text-gray-300">
                              Identifies high-value nodes in the unorganized sector. Deploys rapid onboarding protocols and establishes initial trust vectors.
                            </p>
                          </div>
                        )}

                        <div className="w-full bg-gray-800 h-1 rounded-full overflow-hidden">
                           <div className="h-full bg-yellow-500 w-1/3 group-hover:w-full transition-all duration-1000"></div>
                        </div>
                     </div>

                     <div 
                       className={`bg-cyber-950 border ${activeNode === 'ops' ? 'border-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.2)]' : 'border-gray-800 hover:border-garden-500/50'} p-4 rounded-xl transition-all cursor-pointer group`}
                       onClick={() => setActiveNode(activeNode === 'ops' ? null : 'ops')}
                     >
                        <div className="flex items-center justify-between mb-2">
                           <h4 className="text-white font-bold text-sm">OPS LEAD</h4>
                           <div className="flex items-center gap-2">
                             <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse"></div>
                             <ArrowUpRight size={14} className={`text-blue-500 transition-transform ${activeNode === 'ops' ? 'rotate-45' : 'group-hover:translate-x-0.5 group-hover:-translate-y-0.5'}`} />
                           </div>
                        </div>
                        <p className="text-[10px] font-mono text-gray-500 mb-1">NODE: CLIENT_SUCCESS</p>
                        <p className="text-gray-400 text-xs mb-3">Retention, Satisfaction & Feedback Loops.</p>
                        
                        {activeNode === 'ops' && (
                          <div className="mb-3 pt-3 border-t border-blue-500/20 animate-in fade-in slide-in-from-top-2">
                            <p className="text-[10px] text-gray-300">
                              Maintains node health. Monitors sentiment, resolves localized friction, and ensures the continuous flow of high-quality data back to the core.
                            </p>
                          </div>
                        )}

                        <div className="w-full bg-gray-800 h-1 rounded-full overflow-hidden">
                           <div className="h-full bg-blue-500 w-1/2 group-hover:w-full transition-all duration-1000"></div>
                        </div>
                     </div>

                     <div 
                       className={`bg-cyber-950 border ${activeNode === 'creative' ? 'border-purple-500 shadow-[0_0_20px_rgba(168,85,247,0.2)]' : 'border-gray-800 hover:border-garden-500/50'} p-4 rounded-xl transition-all cursor-pointer group`}
                       onClick={() => setActiveNode(activeNode === 'creative' ? null : 'creative')}
                     >
                        <div className="flex items-center justify-between mb-2">
                           <h4 className="text-white font-bold text-sm">CREATIVE LEAD</h4>
                           <div className="flex items-center gap-2">
                             <div className="w-1.5 h-1.5 bg-purple-500 rounded-full animate-pulse"></div>
                             <ArrowUpRight size={14} className={`text-purple-500 transition-transform ${activeNode === 'creative' ? 'rotate-45' : 'group-hover:translate-x-0.5 group-hover:-translate-y-0.5'}`} />
                           </div>
                        </div>
                        <p className="text-[10px] font-mono text-gray-500 mb-1">NODE: BRAND_IDENTITY</p>
                        <p className="text-gray-400 text-xs mb-3">Aesthetic Calibration & Visual Output.</p>
                        
                        {activeNode === 'creative' && (
                          <div className="mb-3 pt-3 border-t border-purple-500/20 animate-in fade-in slide-in-from-top-2">
                            <p className="text-[10px] text-gray-300">
                              Translates raw data and system capabilities into compelling visual narratives. Ensures the interface between human and machine is intuitive and engaging.
                            </p>
                          </div>
                        )}

                        <div className="w-full bg-gray-800 h-1 rounded-full overflow-hidden">
                           <div className="h-full bg-purple-500 w-2/3 group-hover:w-full transition-all duration-1000"></div>
                        </div>
                     </div>
                  </div>

                  {/* Row 3: Foundation */}
                  <div className="md:col-start-2 mt-6">
                     <div 
                       className={`bg-cyber-900 border ${activeNode === 'engineer' ? 'border-garden-500 shadow-[0_0_20px_rgba(16,185,129,0.2)]' : 'border-gray-700'} p-4 rounded-xl text-center relative overflow-hidden cursor-pointer transition-all`}
                       onClick={() => setActiveNode(activeNode === 'engineer' ? null : 'engineer')}
                     >
                        <div className="absolute inset-0 bg-garden-500/5 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                        <div className="flex items-center justify-center gap-2 mb-1">
                          <h4 className="text-white font-bold text-base">FIELD ENGINEER</h4>
                          <ArrowUpRight size={14} className={`text-garden-500 transition-transform ${activeNode === 'engineer' ? 'rotate-45' : ''}`} />
                        </div>
                        <p className="text-gray-500 font-mono text-[10px] mb-1">NODE: INFRASTRUCTURE</p>
                        <p className="text-gray-400 text-xs">Firebase Deployment & Bank-Grade Security.</p>
                        
                        {activeNode === 'engineer' && (
                          <div className="mt-3 pt-3 border-t border-gray-700 text-left animate-in fade-in slide-in-from-top-2">
                            <p className="text-[10px] text-gray-300">
                              The bedrock of the system. Ensures zero-downtime deployments, manages the physical-to-digital bridge, and hardens the network against localized disruptions.
                            </p>
                          </div>
                        )}

                        <div className="mt-3 flex justify-center gap-1">
                           {[1,2,3,4,5].map(i => (
                              <div key={i} className="w-1 h-2 bg-garden-500/30 rounded-sm animate-[pulse_1s_ease-in-out_infinite]" style={{animationDelay: `${i * 0.1}s`}}></div>
                           ))}
                        </div>
                     </div>
                  </div>

               </div>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
};

export default ManifestoSection;