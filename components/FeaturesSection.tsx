import React, { useState, useEffect } from 'react';
import { Camera, ClipboardCheck, TrendingUp, RefreshCcw, Zap, Server, Brain, LayoutDashboard, ShoppingBag, UserCheck, BarChart3, AlertCircle, ArrowUpRight, ChevronDown, ChevronUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PageRoute } from '../types';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell } from 'recharts';

const FeaturesSection: React.FC = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<null | {
    customers: number;
    queue: boolean;
    hazard: string;
    suggestion: string;
  }>(null);

  // Accordion state
  const [expandedFeatures, setExpandedFeatures] = useState<Record<string, boolean>>({
    inventory: false,
    vision: false,
    analytics: false
  });

  const toggleFeature = (feature: string) => {
    setExpandedFeatures(prev => ({
      ...prev,
      [feature]: !prev[feature]
    }));
  };

  // Simulation Data for Recharts
  const [chartData, setChartData] = useState([
    { name: 'M', value: 40 },
    { name: 'T', value: 65 },
    { name: 'W', value: 34 },
    { name: 'T', value: 89 },
    { name: 'F', value: 23 },
    { name: 'S', value: 56 },
    { name: 'S', value: 78 },
  ]);
  
  // Simulation State for Live Tasks
  const [tasks, setTasks] = useState([
    { id: 1, name: 'Restock Curd', status: 'done' },
    { id: 2, name: 'Clean Table 4', status: 'pending' },
    { id: 3, name: 'Check Temp', status: 'pending' },
  ]);

  // Simulation: Live Data Updates
  useEffect(() => {
    const interval = setInterval(() => {
      setChartData(prev => prev.map(item => ({
        ...item,
        value: Math.min(100, Math.max(10, item.value + (Math.random() - 0.5) * 20))
      })));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // Simulation: Task Updates
  useEffect(() => {
    const interval = setInterval(() => {
      setTasks(prev => {
        const newTasks = [...prev];
        const pendingIndex = newTasks.findIndex(t => t.status === 'pending');
        if (pendingIndex !== -1) {
          newTasks[pendingIndex].status = 'done';
        } else {
          return [
             { id: 1, name: 'Restock Curd', status: 'pending' },
             { id: 2, name: 'Clean Table 4', status: 'pending' },
             { id: 3, name: 'Check Temp', status: 'pending' },
          ];
        }
        return newTasks;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const simulateAnalysis = () => {
    setIsAnalyzing(true);
    setAnalysisResult(null);
    setTimeout(() => {
      setAnalysisResult({
        customers: 22,
        queue: true,
        hazard: "None detected",
        suggestion: "High queue latency at Indiranagar outlet. Trigger 'Buy 1 Get 1 Coffee' offer to sustain engagement."
      });
      setIsAnalyzing(false);
    }, 2500);
  };

  return (
    <section id="features" className="py-24 bg-cyber-950/30 backdrop-blur-lg text-white overflow-hidden border-t border-white/5 relative">
      {/* Background Glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-neon-blue/5 rounded-full blur-[128px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-neon-pink/5 rounded-full blur-[128px] pointer-events-none"></div>

      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20 text-center relative z-10">
        <div className="inline-block p-1.5 px-4 rounded-full bg-neon-blue/10 border border-neon-blue/30 text-neon-blue text-xs font-mono mb-6 tracking-widest uppercase">
          System Architecture
        </div>
        <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">The ShopSmart-OS Pipeline</h2>
        <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
          From street-level sensors in Jayanagar to boardroom-level insights in UB City. A complete data pipeline powered by a <span className="text-white font-semibold">Model Mesh</span> (Claude, Gemini, OpenAI, Kimi).
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Feature 1: Inventory & Real-time Log */}
        <div className="glass-panel rounded-3xl border border-white/10 overflow-hidden bg-cyber-900/50">
          <button 
            onClick={() => toggleFeature('inventory')}
            className="w-full px-8 py-6 flex items-center justify-between hover:bg-white/5 transition-colors"
          >
            <div className="flex items-center gap-6">
              <div className="p-3 bg-neon-pink/10 rounded-2xl text-neon-pink border border-neon-pink/20 shadow-[0_0_20px_rgba(244,114,182,0.1)]">
                <ClipboardCheck size={28} />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-white text-left">Modular Inventory <span className="text-neon-pink">Burn-Rate Logic</span></h2>
            </div>
            {expandedFeatures.inventory ? <ChevronUp size={28} className="text-gray-400" /> : <ChevronDown size={28} className="text-gray-400" />}
          </button>
          
          {expandedFeatures.inventory && (
            <div className="px-8 pb-12 pt-6 border-t border-white/5 animate-in slide-in-from-top-4 fade-in duration-300">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <div className="relative z-10">
                  <p className="text-lg text-gray-400 mb-8 leading-relaxed">
                    Stop guessing. Our logic engine tracks every gram across all your Bangalore outlets, predicting depletion before it happens.
                  </p>
                  <ul className="space-y-6 mb-10">
                    <li className="flex items-start gap-4">
                      <div className="mt-1.5 w-2 h-2 rounded-full bg-neon-pink flex-shrink-0 shadow-[0_0_15px_#f472b6]"></div>
                      <div>
                        <strong className="text-white text-lg block mb-1">Predictive Depletion</strong> 
                        <p className="text-gray-400 leading-relaxed">We know that Idli Batter depletes 40% faster on Sunday mornings in Malleshwaram.</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-4">
                      <div className="mt-1.5 w-2 h-2 rounded-full bg-neon-pink flex-shrink-0 shadow-[0_0_15px_#f472b6]"></div>
                      <div>
                        <strong className="text-white text-lg block mb-1">Dynamic Thresholding</strong> 
                        <p className="text-gray-400 leading-relaxed">Firebase listeners alert you when "Milk" supply hits a 2-hour limit based on current city-wide demand.</p>
                      </div>
                    </li>
                  </ul>
                  <Link 
                    to={PageRoute.INVENTORY_LOGIC}
                    className="inline-flex items-center gap-2 text-neon-pink font-bold hover:underline group"
                  >
                    Explore Burn-Rate Logic <ArrowUpRight size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </Link>
                </div>
                
                <div className="relative group">
                  <div className="absolute -inset-4 bg-neon-pink/20 blur-3xl rounded-full opacity-30 group-hover:opacity-50 transition-opacity"></div>
                  <div className="relative glass-panel rounded-3xl overflow-hidden border border-white/10 shadow-2xl flex flex-col bg-cyber-900">
                    {/* Animated Vector Graphic: Server Nodes */}
                    <div className="w-full aspect-square md:aspect-video flex items-center justify-center p-8 pb-24 relative overflow-hidden group-hover:scale-105 transition-transform duration-700">
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(244,114,182,0.1)_0%,transparent_70%)]"></div>
                      <div className="grid grid-cols-3 gap-4 w-full max-w-[240px] relative z-10">
                        {[...Array(9)].map((_, i) => (
                          <div key={i} className="aspect-square rounded-xl border border-neon-pink/30 bg-cyber-950 flex items-center justify-center relative overflow-hidden">
                            <div className={`absolute inset-0 bg-neon-pink/10 ${i % 2 === 0 ? 'animate-pulse' : ''}`} style={{ animationDelay: `${i * 0.2}s` }}></div>
                            <Server size={24} className={`text-neon-pink/50 ${i === 4 ? 'text-neon-pink animate-bounce' : ''}`} />
                            <div className={`absolute bottom-2 right-2 w-1.5 h-1.5 rounded-full ${i % 3 === 0 ? 'bg-garden-500' : 'bg-neon-pink'} animate-ping`} style={{ animationDelay: `${i * 0.3}s` }}></div>
                          </div>
                        ))}
                      </div>
                      {/* Connecting lines */}
                      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20" xmlns="http://www.w3.org/2000/svg">
                        <line x1="20%" y1="20%" x2="80%" y2="80%" stroke="#f472b6" strokeWidth="2" strokeDasharray="4 4" className="animate-[dash_3s_linear_infinite]" />
                        <line x1="80%" y1="20%" x2="20%" y2="80%" stroke="#f472b6" strokeWidth="2" strokeDasharray="4 4" className="animate-[dash_3s_linear_infinite_reverse]" />
                      </svg>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-cyber-950 via-transparent to-transparent pointer-events-none"></div>
                    
                    {/* Floating Live Monitor */}
                    <div className="relative z-20 -mt-24 mx-6 mb-6 glass-panel p-6 rounded-2xl border border-white/20 backdrop-blur-xl shadow-2xl">
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="text-sm font-bold text-white uppercase tracking-widest">Live Monitor</h3>
                        <span className="text-[10px] bg-neon-pink text-black px-2 py-0.5 rounded-full font-bold animate-pulse">SYNCING</span>
                      </div>
                      <div className="space-y-4">
                        {[
                          { label: "Nandini Milk", val: 12, color: "#ef4444" },
                          { label: "Fresh Buns", val: 85, color: "#10b981" }
                        ].map((item, i) => (
                          <div key={i}>
                            <div className="flex justify-between text-[10px] text-gray-400 mb-1.5 font-mono">
                              <span>{item.label}</span>
                              <span>{item.val}%</span>
                            </div>
                            <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                              <div className="h-full transition-all duration-1000" style={{ width: `${item.val}%`, backgroundColor: item.color }}></div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Feature 2: ShopSmart-Vision */}
        <div className="glass-panel rounded-3xl border border-white/10 overflow-hidden bg-cyber-900/50">
          <button 
            onClick={() => toggleFeature('vision')}
            className="w-full px-8 py-6 flex items-center justify-between hover:bg-white/5 transition-colors"
          >
            <div className="flex items-center gap-6">
              <div className="p-3 bg-neon-cyan/10 rounded-2xl text-neon-cyan border border-neon-cyan/20 shadow-[0_0_20px_rgba(6,182,212,0.1)]">
                <Camera size={28} />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-white text-left">ShopSmart-Vision <span className="text-neon-cyan">Edge Intelligence</span></h2>
            </div>
            {expandedFeatures.vision ? <ChevronUp size={28} className="text-gray-400" /> : <ChevronDown size={28} className="text-gray-400" />}
          </button>
          
          {expandedFeatures.vision && (
            <div className="px-8 pb-12 pt-6 border-t border-white/5 animate-in slide-in-from-top-4 fade-in duration-300">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <div className="order-2 lg:order-1 relative group">
                  <div className="absolute -inset-4 bg-neon-cyan/20 blur-3xl rounded-full opacity-30 group-hover:opacity-50 transition-opacity"></div>
                  <div className="relative glass-panel rounded-3xl overflow-hidden border border-white/10 shadow-2xl flex flex-col bg-cyber-900">
                    {/* Animated Vector Graphic: Edge Vision */}
                    <div className="w-full aspect-square md:aspect-video flex items-center justify-center p-8 pb-32 relative overflow-hidden group-hover:scale-105 transition-transform duration-700">
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.1)_0%,transparent_70%)]"></div>
                      
                      {/* Scanning Grid */}
                      <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.1)_1px,transparent_1px)] bg-[size:20px_20px] opacity-30"></div>
                      
                      {/* Scanner Line */}
                      <div className="absolute top-0 left-0 w-full h-1 bg-neon-cyan shadow-[0_0_15px_#06b6d4] animate-[scan_3s_ease-in-out_infinite]"></div>

                      <div className="relative z-10 flex items-center justify-center w-48 h-48 rounded-full border-2 border-neon-cyan/30 border-dashed animate-[spin_10s_linear_infinite]">
                        <div className="absolute inset-2 rounded-full border border-neon-cyan/20 animate-[spin_15s_linear_infinite_reverse]"></div>
                      </div>
                      
                      <div className="absolute z-20 text-neon-cyan drop-shadow-[0_0_10px_rgba(6,182,212,0.8)]">
                        <Camera size={64} className="animate-pulse" />
                      </div>
                      
                      {/* Bounding Boxes */}
                      <div className="absolute top-1/4 left-1/4 w-16 h-16 border border-neon-cyan/50 bg-neon-cyan/5 animate-pulse">
                        <div className="absolute -top-4 left-0 text-[8px] font-mono text-neon-cyan">PERSON_01</div>
                      </div>
                      <div className="absolute bottom-1/3 right-1/4 w-20 h-24 border border-neon-cyan/50 bg-neon-cyan/5 animate-pulse" style={{ animationDelay: '0.5s' }}>
                        <div className="absolute -top-4 left-0 text-[8px] font-mono text-neon-cyan">PERSON_02</div>
                      </div>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-cyber-950 via-transparent to-transparent pointer-events-none"></div>
                    
                    {/* Interactive Vision Overlay */}
                    <div className="relative z-20 -mt-32 mx-6 mb-6 flex flex-col items-center justify-center">
                      {isAnalyzing ? (
                        <div className="text-center">
                          <div className="w-16 h-16 border-4 border-neon-cyan border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
                          <p className="text-neon-cyan font-mono text-sm tracking-[0.2em] uppercase">Processing Edge Frame...</p>
                        </div>
                      ) : analysisResult ? (
                        <div className="w-full space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                          <div className="glass-panel p-4 rounded-xl border border-neon-cyan/30 flex justify-between items-center">
                            <span className="text-xs text-gray-400 uppercase tracking-widest flex items-center gap-2"><UserCheck size={14}/> Occupancy</span>
                            <span className="text-white font-bold text-xl">{analysisResult.customers} Pax</span>
                          </div>
                          <div className="glass-panel p-4 rounded-xl border border-neon-cyan/30 bg-neon-cyan/10">
                            <p className="text-[10px] text-neon-cyan font-bold mb-2 uppercase tracking-widest">Consensus Intelligence</p>
                            <p className="text-white text-sm leading-relaxed">{analysisResult.suggestion}</p>
                          </div>
                        </div>
                      ) : (
                        <button 
                          onClick={simulateAnalysis}
                          className="bg-neon-cyan text-black px-8 py-4 rounded-full font-bold text-lg flex items-center gap-3 hover:scale-105 transition-all shadow-[0_0_30px_rgba(6,182,212,0.4)]"
                        >
                          <Camera size={20} /> Start Vision Audit
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                <div className="order-1 lg:order-2 relative z-10">
                  <p className="text-lg text-gray-400 mb-8 leading-relaxed">
                    We don't stream 24/7 video. We use triggered sampling. A local frame is captured every 30 seconds, metadata is extracted, and our <strong>Model Mesh</strong> (Claude, Gemini, OpenAI, Kimi) provides high-level reasoning.
                  </p>
                  <div className="p-6 bg-cyber-900 rounded-2xl border border-white/10 font-mono text-sm text-neon-cyan shadow-inner relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-10">
                      <Brain size={48} />
                    </div>
                    <p className="opacity-40 text-gray-500 mb-2">// System Prompt</p>
                    <p className="mb-1">"Analyze this frame from 12th Main Indiranagar.</p>
                    <p className="mb-1">1. Count customers in the seating area.</p>
                    <p className="mb-1">2. Are there customers waiting at the counter?</p>
                    <p>3. Identify any visible safety hazards."</p>
                  </div>
                  <div className="mt-8">
                    <Link 
                      to={PageRoute.INVENTORY_LOGIC}
                      className="inline-flex items-center gap-2 text-neon-cyan font-bold hover:underline group"
                    >
                      Explore Vision Architecture <ArrowUpRight size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Feature 3: Analytics & Staffing */}
        <div className="glass-panel rounded-3xl border border-white/10 overflow-hidden bg-cyber-900/50">
          <button 
            onClick={() => toggleFeature('analytics')}
            className="w-full px-8 py-6 flex items-center justify-between hover:bg-white/5 transition-colors"
          >
            <div className="flex items-center gap-6">
              <div className="p-3 bg-neon-purple/10 rounded-2xl text-neon-purple border border-neon-purple/20 shadow-[0_0_20px_rgba(168,85,247,0.1)]">
                <BarChart3 size={28} />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-white text-left">Inventory Burn <span className="text-neon-purple">vs. Revenue</span></h2>
            </div>
            {expandedFeatures.analytics ? <ChevronUp size={28} className="text-gray-400" /> : <ChevronDown size={28} className="text-gray-400" />}
          </button>
          
          {expandedFeatures.analytics && (
            <div className="px-8 pb-12 pt-6 border-t border-white/5 animate-in slide-in-from-top-4 fade-in duration-300">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <div className="relative z-10">
                  <p className="text-lg text-gray-400 mb-8 leading-relaxed">
                    Understand the pulse of your business. We correlate stock depletion with real-time revenue to give you a true efficiency score.
                  </p>
                  <div className="glass-panel p-6 rounded-2xl border border-white/10 mb-8">
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="text-sm font-bold text-white uppercase tracking-widest">Efficiency Index</h3>
                      <div className="flex gap-2">
                        <div className="w-2 h-2 rounded-full bg-neon-purple"></div>
                        <div className="w-2 h-2 rounded-full bg-white/10"></div>
                      </div>
                    </div>
                    
                    {/* Recharts Bar Chart */}
                    <div className="h-48 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={chartData}>
                          <XAxis dataKey="name" hide />
                          <YAxis hide />
                          <Tooltip 
                            cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                            contentStyle={{ backgroundColor: '#0a0a0a', border: '1px solid #333', borderRadius: '8px' }}
                          />
                          <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                            {chartData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#a855f7' : '#3b82f6'} fillOpacity={0.8} />
                            ))}
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="mt-4 flex justify-between text-[10px] text-gray-500 font-mono tracking-widest">
                      <span>MON</span><span>TUE</span><span>WED</span><span>THU</span><span>FRI</span><span>SAT</span><span>SUN</span>
                    </div>
                  </div>
                  <Link 
                    to={PageRoute.INVENTORY_LOGIC}
                    className="inline-flex items-center gap-2 text-neon-purple font-bold hover:underline group"
                  >
                    Deep Dive into Analytics <ArrowUpRight size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </Link>
                </div>
                
                <div className="relative group">
                  <div className="absolute -inset-4 bg-neon-purple/20 blur-3xl rounded-full opacity-30 group-hover:opacity-50 transition-opacity"></div>
                  <div className="relative glass-panel rounded-3xl overflow-hidden border border-white/10 shadow-2xl flex flex-col bg-cyber-900">
                    {/* Animated Vector Graphic: Data Flow */}
                    <div className="w-full aspect-square md:aspect-video flex items-center justify-center p-8 pb-32 relative overflow-hidden group-hover:scale-105 transition-transform duration-700">
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.1)_0%,transparent_70%)]"></div>
                      
                      <div className="relative z-10 w-full max-w-[280px] h-48 flex items-end justify-between gap-2">
                        {[40, 70, 45, 90, 65, 85, 50].map((height, i) => (
                          <div key={i} className="w-full bg-cyber-950 border border-neon-purple/30 rounded-t-md relative overflow-hidden group/bar" style={{ height: '100%' }}>
                            <div 
                              className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-neon-purple/80 to-neon-purple/20 transition-all duration-1000 ease-in-out"
                              style={{ height: `${height}%`, animation: `pulse-height 2s infinite alternate ${i * 0.2}s` }}
                            ></div>
                            <div className="absolute top-2 left-1/2 -translate-x-1/2 text-[10px] font-mono text-neon-purple opacity-0 group-hover/bar:opacity-100 transition-opacity">
                              {height}%
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Floating Data Particles */}
                      {[...Array(15)].map((_, i) => (
                        <div 
                          key={i} 
                          className="absolute w-1 h-1 bg-neon-purple rounded-full shadow-[0_0_5px_#a855f7] animate-[float-up_3s_linear_infinite]"
                          style={{ 
                            left: `${Math.random() * 100}%`, 
                            bottom: '-10px',
                            animationDelay: `${Math.random() * 3}s`,
                            animationDuration: `${2 + Math.random() * 2}s`
                          }}
                        ></div>
                      ))}
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-cyber-950 via-transparent to-transparent pointer-events-none"></div>
                    
                    {/* Floating Task Queue */}
                    <div className="relative z-20 -mt-32 mx-6 mb-6 glass-panel p-6 rounded-2xl border border-white/20 backdrop-blur-xl shadow-2xl">
                      <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-4 flex items-center gap-2">
                        <ShoppingBag size={14} className="text-neon-amber" /> Live Task Queue
                      </h3>
                      <div className="space-y-3">
                        {tasks.map((task) => (
                          <div key={task.id} className="flex items-center justify-between bg-white/5 p-2.5 rounded-xl border border-white/5">
                            <span className="text-xs text-gray-300">{task.name}</span>
                            <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-tighter ${
                              task.status === 'done' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400 animate-pulse'
                            }`}>
                              {task.status}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

      </div>
    </section>
  );
};

export default FeaturesSection;
