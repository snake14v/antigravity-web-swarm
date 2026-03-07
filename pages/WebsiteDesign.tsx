import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Code2, MonitorSmartphone, Rocket, Zap, Search, Layout, Paintbrush, ArrowRight, Terminal, Cpu, Database, Server, Box, Layers, PlayCircle, Command, Activity, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PageRoute } from '../types';

const TypewriterText = ({ text, delay = 0 }: { text: string, delay?: number }) => {
  const [displayed, setDisplayed] = useState('');
  
  useEffect(() => {
    let i = 0;
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        setDisplayed(text.substring(0, i));
        i++;
        if (i > text.length) clearInterval(interval);
      }, 50);
      return () => clearInterval(interval);
    }, delay);
    return () => clearTimeout(timer);
  }, [text, delay]);

  return <span>{displayed}<span className="animate-pulse">_</span></span>;
};

const WebsiteDesign: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'code' | 'preview'>('preview');
  const [performanceScore, setPerformanceScore] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      let score = 0;
      const interval = setInterval(() => {
        score += 2;
        if (score >= 100) {
          score = 100;
          clearInterval(interval);
        }
        setPerformanceScore(score);
      }, 30);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="pt-24 pb-20 min-h-screen bg-cyber-950 relative overflow-hidden text-gray-100">
      {/* Deep Cyber Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 right-1/4 w-[800px] h-[800px] bg-neon-cyan/5 rounded-full blur-[150px] animate-pulse"></div>
        <div className="absolute bottom-0 left-1/4 w-[600px] h-[600px] bg-neon-purple/5 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:32px_32px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Terminal Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-5xl mx-auto mb-20 pt-12"
        >
          <div className="flex justify-center mb-8">
            <div className="inline-flex flex-col items-center bg-black/50 border border-white/10 rounded-xl overflow-hidden shadow-[0_0_30px_rgba(0,255,255,0.1)] backdrop-blur-md max-w-sm w-full">
              <div className="w-full bg-white/5 px-4 py-2 border-b border-white/10 flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                <span className="ml-2 text-xs font-mono text-gray-500 flex-1 text-center pr-8">terminal</span>
              </div>
              <div className="w-full p-4 text-left font-mono text-sm">
                <p className="text-neon-cyan"><TypewriterText text="npx create-ooru-stack@latest my-app" /></p>
                <p className="text-gray-400 mt-2 opacity-0 animate-[fade-in_0.1s_ease-out_1.5s_fill-mode-forwards]">✔ Initializing ultra-fast React core...</p>
                <p className="text-gray-400 mt-1 opacity-0 animate-[fade-in_0.1s_ease-out_2s_fill-mode-forwards]">✔ Injecting Cyber-Industrial aesthetics...</p>
                <p className="text-neon-pink font-bold mt-2 opacity-0 animate-[fade-in_0.1s_ease-out_2.5s_fill-mode-forwards]">&gt; SYSTEM ONLINE.</p>
              </div>
            </div>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white tracking-tighter mb-8 leading-[1]">
            WE BUILD <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan via-white to-neon-purple animate-[shimmer_3s_linear_infinite] bg-[length:200%_auto]">WEBSITES</span><br/>THAT COMMAND.
          </h1>
          <p className="text-xl text-gray-400 font-light max-w-3xl mx-auto leading-relaxed">
            Forget WordPress templates. Experience high-octane React architectures, precise WebGL interactions, and clinical conversion funnels engineered for dominance.
          </p>
          <div className="mt-12 flex flex-col sm:flex-row justify-center gap-6">
             <Link 
               to={PageRoute.CONTACT}
               className="px-8 py-4 bg-white text-black rounded-full font-black text-sm uppercase tracking-widest hover:scale-105 transition-all shadow-[0_0_30px_rgba(255,255,255,0.3)] flex items-center justify-center gap-2 group"
             >
               Start Build Protocol <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
             </Link>
             <button onClick={() => document.getElementById('engine')?.scrollIntoView({ behavior: 'smooth' })} className="px-8 py-4 bg-white/5 border border-white/10 rounded-full font-black text-white text-sm uppercase tracking-widest hover:bg-white/10 transition-colors flex items-center justify-center gap-2">
               <Cpu size={18} className="text-neon-purple"/> Inspect Engine
             </button>
          </div>
        </motion.div>

        {/* The Blackbox UI Sandbox */}
        <section id="engine" className="mb-32">
          <div className="mb-12 text-center">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">The <span className="text-neon-cyan">Blackbox</span> Sandbox</h2>
            <p className="text-gray-400">Real-time compilation. Component-driven architecture mapping perfectly to layout logic.</p>
          </div>
          
          <div className="relative glass-panel border border-white/10 rounded-3xl overflow-hidden bg-cyber-900 shadow-2xl">
            {/* Header controls */}
            <div className="flex bg-black/40 border-b border-white/10 p-4">
              <div className="flex gap-2">
                <button 
                  onClick={() => setActiveTab('code')}
                  className={`px-4 py-1.5 rounded-lg text-sm font-mono transition-colors flex items-center gap-2 ${activeTab === 'code' ? 'bg-white/10 text-white' : 'text-gray-500 hover:text-white'}`}
                >
                  <Code2 size={16}/> Component.tsx
                </button>
                <button 
                  onClick={() => setActiveTab('preview')}
                  className={`px-4 py-1.5 rounded-lg text-sm font-mono transition-colors flex items-center gap-2 ${activeTab === 'preview' ? 'bg-neon-cyan/10 text-neon-cyan' : 'text-gray-500 hover:text-white'}`}
                >
                  <PlayCircle size={16}/> Live Preview
                </button>
              </div>
              <div className="ml-auto flex items-center gap-3 hidden sm:flex">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                <span className="text-xs font-mono text-gray-500">HMR Active • 0ms</span>
              </div>
            </div>

            {/* Content Area */}
            <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[400px]">
              
              {/* Code Pane */}
              <div className={`p-6 bg-[#0d1117] font-mono text-sm overflow-x-auto ${activeTab === 'preview' ? 'hidden lg:block border-r border-white/5' : ''}`}>
                <div className="flex items-center text-gray-500 mb-4 opacity-50">
                   <Command size={14} className="mr-2"/> <span className="text-xs">React Component Mapping</span>
                </div>
                <pre className="text-gray-300">
                  <code>
<span className="text-purple-400">import</span> {'{'} motion {'}'} <span className="text-purple-400">from</span> <span className="text-green-300">'framer-motion'</span>;<br/><br/>
<span className="text-blue-400">export const</span> <span className="text-yellow-200">HeroCard</span> = () {`=> {`}<br/>
  <span className="text-purple-400">return</span> (<br/>
    &lt;<span className="text-red-400">motion.div</span><br/>
      <span className="text-blue-300">whileHover</span>={`{{ scale: 1.05 }}`}<br/>
      <span className="text-blue-300">className</span>=<span className="text-green-300">"glass-panel rounded-2xl p-8"</span><br/>
    &gt;<br/>
      &lt;<span className="text-red-400">h2</span> <span className="text-blue-300">className</span>=<span className="text-green-300">"text-neon-cyan font-bold"</span>&gt;<br/>
        Cyber-Grade UI<br/>
      &lt;/<span className="text-red-400">h2</span>&gt;<br/>
      &lt;<span className="text-red-400">p</span> <span className="text-blue-300">className</span>=<span className="text-green-300">"text-gray-400 mt-2"</span>&gt;<br/>
        Zero compromises on performance.<br/>
      &lt;/<span className="text-red-400">p</span>&gt;<br/>
    &lt;/<span className="text-red-400">motion.div</span>&gt;<br/>
  );<br/>
{`}`};
                  </code>
                </pre>
              </div>

              {/* Preview Pane */}
              <div className={`bg-[radial-gradient(circle_at_center,rgba(0,255,255,0.05)_0,transparent_100%)] p-8 flex items-center justify-center relative ${activeTab === 'code' ? 'hidden lg:flex' : ''}`}>
                <div className="absolute top-4 right-4 text-[10px] font-mono text-neon-cyan/50 border border-neon-cyan/20 px-2 py-1 rounded">RENDERED OUTPUT</div>
                
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  className="bg-black/60 border border-white/10 rounded-2xl p-8 shadow-[0_0_30px_rgba(0,255,255,0.1)] backdrop-blur-xl relative overflow-hidden group w-full max-w-sm"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-neon-cyan/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-75"></div>
                  <div className="relative z-10">
                    <div className="w-12 h-12 bg-neon-cyan/20 rounded-xl flex items-center justify-center mb-6 border border-neon-cyan/30 text-neon-cyan">
                      <Layout size={24} />
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-2 tracking-tight group-hover:text-neon-cyan transition-colors">Cyber-Grade UI</h2>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      Zero compromises on performance. Micro-interactions optimized at 60fps natively mapping to the DOM.
                    </p>
                    <div className="mt-6 pt-6 border-t border-white/10 flex justify-between items-center">
                      <span className="text-[10px] font-mono text-gray-500 uppercase">Status: Live</span>
                      <div className="w-2 h-2 rounded-full bg-neon-cyan animate-pulse"></div>
                    </div>
                  </div>
                </motion.div>

              </div>
            </div>
          </div>
        </section>

        {/* Lighthouse Performance Dashboard */}
        <section className="mb-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-mono mb-6">
                <Activity size={14} className="animate-pulse" />
                PERFORMANCE MATTERS
              </div>
              <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">Engineered for <br/> Perfect <span className="text-green-400">Vitals</span>.</h2>
              <p className="text-gray-400 leading-relaxed mb-8 text-lg">
                We obsess over Core Web Vitals. Because a 100ms delay in load time can drop conversion rates by 7%. Our proprietary tech stack strips out bloat, serving content from edge nodes globally.
              </p>
              
              <ul className="space-y-4 mb-8">
                {[
                  "Cumulative Layout Shift (CLS) = 0.00",
                  "Largest Contentful Paint (LCP) < 0.8s",
                  "First Input Delay (FID) < 10ms"
                ].map((item, i) => (
                  <motion.li 
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    key={i} 
                    className="flex items-center gap-3 text-sm font-mono text-gray-300 bg-white/5 border border-white/5 p-3 rounded-xl"
                  >
                    <CheckCircle2 size={16} className="text-green-400 shrink-0" />
                    {item}
                  </motion.li>
                ))}
              </ul>
            </div>

            <div className="relative group perspective-1000">
              <div className="absolute -inset-4 bg-green-500/20 blur-3xl rounded-full opacity-30 group-hover:opacity-50 transition-opacity"></div>
              
              <motion.div 
                className="relative glass-panel rounded-3xl p-8 border border-white/10 shadow-2xl bg-cyber-900 overflow-hidden transform-gpu"
                initial={{ rotateY: 15, rotateX: 5 }}
                whileInView={{ rotateY: 0, rotateX: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1, type: "spring" }}
              >
                {/* Simulated Lighthouse Report */}
                <div className="flex items-center justify-between mb-10 pb-4 border-b border-white/10">
                  <span className="font-mono text-sm text-gray-400">Lighthouse Analysis</span>
                  <span className="font-mono text-[10px] bg-green-500/20 text-green-400 px-2 py-1 rounded">URL: audited successfully</span>
                </div>

                <div className="flex flex-wrap justify-center gap-6 sm:gap-10">
                  {[
                    { label: "Performance", score: performanceScore, color: "text-green-400", stroke: "#4ade80" },
                    { label: "Accessibility", score: performanceScore === 100 ? 100 : performanceScore + 5 > 100 ? 100 : performanceScore + 5, color: "text-green-400", stroke: "#4ade80" },
                    { label: "Best Practices", score: performanceScore === 100 ? 100 : performanceScore - 2 < 0 ? 0 : performanceScore - 2, color: "text-green-400", stroke: "#4ade80" },
                    { label: "SEO", score: 100, color: "text-green-400", stroke: "#4ade80" }
                  ].map((metric, idx) => (
                    <div key={idx} className="flex flex-col items-center">
                      <div className="relative w-24 h-24 mb-4">
                        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                          <circle cx="18" cy="18" r="16" fill="none" className="stroke-gray-800" strokeWidth="2.5"></circle>
                          <circle 
                            cx="18" cy="18" r="16" fill="none" 
                            stroke={metric.stroke}
                            strokeWidth="2.5" 
                            strokeDasharray="100" 
                            strokeDashoffset={100 - metric.score}
                            className="transition-all duration-300 ease-out"
                            strokeLinecap="round"
                          ></circle>
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className={`text-2xl font-black ${metric.color}`}>{Math.floor(metric.score)}</span>
                        </div>
                      </div>
                      <span className="text-xs font-mono text-gray-400">{metric.label}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-10 bg-black/40 rounded-xl p-4 border border-white/5 font-mono text-xs text-green-400/80">
                  &gt; Build optimized. Production bundle size: 42kB gzipped.
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* The Core Stack 3D Visualizer */}
        <div className="mb-32">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">The <span className="text-neon-purple">Ooru Modular Stack</span></h2>
            <p className="text-gray-400 max-w-2xl mx-auto">Decoupled architecture. Frontend scales infinitely at the edge, while backend logic runs cleanly in isolated microservices.</p>
          </div>

          <div className="flex flex-col items-center justify-center py-10 relative">
            <div className="absolute top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-neon-purple/50 to-transparent -z-10 animate-pulse"></div>

            {/* Stack Layer 1: Client Edge */}
            <motion.div 
               initial={{ opacity: 0, y: -20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               className="bg-black border border-white/20 p-6 rounded-2xl w-full max-w-lg mb-8 shadow-[0_10px_40px_rgba(188,19,254,0.2)] transform -rotate-x-[10deg] rotate-y-[-5deg] perspective-1000 flex items-center gap-6 relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-neon-purple/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl"></div>
              <div className="p-4 bg-neon-purple/20 rounded-xl text-neon-purple border border-neon-purple/40">
                <MonitorSmartphone size={32} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-1">Global Edge Delivery</h3>
                <p className="text-xs text-gray-400 font-mono">React / React Three Fiber / Tailwind</p>
              </div>
            </motion.div>

            {/* Connectors */}
            <div className="h-10 border-l-2 border-dashed border-white/20 mb-8 -mt-2 animate-[pulse-height_2s_ease-in-out_infinite]"></div>

            {/* Stack Layer 2: API Gateway */}
            <motion.div 
               initial={{ opacity: 0, y: -20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: 0.2 }}
               className="bg-[#0a0a0f] border border-white/10 p-6 rounded-2xl w-full max-w-lg mb-8 shadow-xl transform -rotate-x-[10deg] rotate-y-[-5deg] perspective-1000 flex items-center gap-6 relative group"
            >
              <div className="p-4 bg-yellow-500/10 rounded-xl text-yellow-500 border border-yellow-500/20">
                <Server size={32} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-1">Serverless Logic Layer</h3>
                <p className="text-xs text-gray-400 font-mono">Node.js / Express / GraphQL</p>
              </div>
            </motion.div>

            {/* Connectors */}
            <div className="h-10 border-l-2 border-dashed border-white/20 mb-8 -mt-2"></div>

            {/* Stack Layer 3: Database */}
            <motion.div 
               initial={{ opacity: 0, y: -20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: 0.4 }}
               className="bg-[#050508] border border-white/5 p-6 rounded-2xl w-full max-w-lg shadow-xl transform -rotate-x-[10deg] rotate-y-[-5deg] perspective-1000 flex items-center gap-6 relative group"
            >
              <div className="p-4 bg-blue-500/10 rounded-xl text-blue-500 border border-blue-500/20">
                <Database size={32} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-1">Distributed Storage</h3>
                <p className="text-xs text-gray-400 font-mono">PostgreSQL / Redis / Firebase</p>
              </div>
            </motion.div>

          </div>
        </div>

        {/* Feature Grid - Minimal */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-32">
          {[
            { icon: Paintbrush, color: "text-neon-pink", bg: "bg-neon-pink/10", title: "Figma to Code", desc: "Pixel-perfect translation of bespoke designs into robust React components." },
            { icon: Search, color: "text-garden-400", bg: "bg-garden-400/10", title: "Technical SEO API", desc: "Automated schema.org generation and dynamic Open Graph tag injection." },
            { icon: Box, color: "text-orange-400", bg: "bg-orange-400/10", title: "3D/WebGL Integration", desc: "Interactive Three.js canvas environments seamlessly blended into HTML layouts." }
          ].map((feature, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white/5 border border-white/10 p-8 rounded-3xl hover:bg-white/10 transition-colors"
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 ${feature.bg}`}>
                 <feature.icon className={feature.color} size={24} />
              </div>
              <h4 className="text-xl font-bold text-white mb-3">{feature.title}</h4>
              <p className="text-sm text-gray-400 leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default WebsiteDesign;
