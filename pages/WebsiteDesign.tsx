import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { 
  Code2, MonitorSmartphone, Rocket, Zap, Search, Layout, Paintbrush, ArrowRight, 
  Terminal, Cpu, Database, Server, Box, Layers, PlayCircle, Command, Activity, 
  CheckCircle2, Star, ZapIcon, Globe, ShieldCheck, MousePointer2, Sparkles, 
  CreditCard, MousePointer, Gauge, Smartphone, Code, Globe2, Share2, Braces 
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { PageRoute } from '../types';

// --- CUSTOM HELPER COMPONENTS ---

const TypewriterText = ({ text, delay = 0, speed = 50 }: { text: string, delay?: number, speed?: number }) => {
  const [displayed, setDisplayed] = useState('');
  
  useEffect(() => {
    let i = 0;
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        setDisplayed(text.substring(0, i));
        i++;
        if (i > text.length) clearInterval(interval);
      }, speed);
      return () => clearInterval(interval);
    }, delay);
    return () => clearTimeout(timer);
  }, [text, delay, speed]);

  return <span className="font-mono">{displayed}<span className="animate-pulse opacity-70">|</span></span>;
};

const FloatingElement = ({ children, delay = 0 }: { children: React.ReactNode, delay?: number }) => (
  <motion.div
    animate={{ 
      y: [0, -10, 0],
      rotate: [0, 1, 0]
    }}
    transition={{ 
      duration: 5, 
      repeat: Infinity, 
      ease: "easeInOut",
      delay 
    }}
  >
    {children}
  </motion.div>
);

const AnimatedLighthouse = ({ score }: { score: number }) => (
  <div className="relative w-32 h-32 md:w-40 md:h-40">
    <svg className="w-full h-full transform -rotate-90 drop-shadow-[0_0_15px_rgba(74,222,128,0.4)]" viewBox="0 0 100 100">
      <circle 
        cx="50" cy="50" r="45" 
        stroke="currentColor" 
        strokeWidth="6" 
        fill="transparent" 
        className="text-gray-800"
      />
      <motion.circle 
        cx="50" cy="50" r="45" 
        stroke="currentColor" 
        strokeWidth="6" 
        fill="transparent" 
        strokeDasharray="283" 
        strokeDashoffset={283 - (283 * score) / 100}
        strokeLinecap="round"
        className="text-green-500"
        initial={{ strokeDashoffset: 283 }}
        animate={{ strokeDashoffset: 283 - (283 * score) / 100 }}
        transition={{ duration: 2, ease: "easeOut", delay: 0.5 }}
      />
    </svg>
    <div className="absolute inset-0 flex flex-col items-center justify-center">
      <motion.span 
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="text-4xl md:text-5xl font-black text-green-500"
      >
        {Math.floor(score)}
      </motion.span>
    </div>
  </div>
);

// --- MAIN PAGE COMPONENT ---

const WebsiteDesign: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'code' | 'preview'>('preview');
  const [performanceScore, setPerformanceScore] = useState(0);
  const [activeAgentTask, setActiveAgentTask] = useState(0);
  
  const scrollRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["start start", "end end"]
  });

  const springScroll = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const scale = useTransform(springScroll, [0, 0.2], [1, 0.95]);
  const opacity = useTransform(springScroll, [0, 0.1], [1, 0.8]);
  const bigTextX = useTransform(springScroll, [0, 1], [0, -500]);

  const agentTasks = [
    "Compiling optimized React bundle...",
    "Injecting Framer Motion physical logic...",
    "Minifying Tailwind CSS utilities...",
    "Purging unused DOM nodes...",
    "Syncing with Global Edge Nodes...",
    "System check: 100% Performance Ready."
  ];

  useEffect(() => {
    // Scoring animation
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
    }, 1200);

    // Agent tasks animation
    const taskInterval = setInterval(() => {
      setActiveAgentTask(prev => (prev + 1) % agentTasks.length);
    }, 3000);

    return () => {
      clearTimeout(timer);
      clearInterval(taskInterval);
    };
  }, []);

  return (
    <div ref={scrollRef} className="bg-[#020205] text-white selection:bg-neon-cyan selection:text-black overflow-x-hidden">
      
      {/* Dynamic Background Overlays */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,255,255,0.05)_0,transparent_70%)]"></div>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-20 overflow-hidden whitespace-nowrap select-none font-black text-[30vw] text-white/5 leading-none">
          <motion.div style={{ x: bigTextX }}>
            OORU LOGIX OORU LOGIX OORU LOGIX OORU LOGIX
          </motion.div>
        </div>
      </div>

      {/* --- HERO SECTION --- */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-20 z-10 overflow-hidden">
        
        {/* Animated Background Elements */}
        <div className="absolute top-1/4 -left-20 w-64 h-64 bg-neon-cyan/20 rounded-full blur-[100px] animate-pulse"></div>
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-neon-purple/20 rounded-full blur-[120px] animate-pulse opacity-50"></div>

        <motion.div 
          style={{ scale, opacity }}
          className="max-w-6xl mx-auto text-center"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full border border-neon-cyan/30 bg-cyber-900 shadow-[0_0_30px_rgba(0,255,255,0.2)] mb-10">
               <span className="relative flex h-3 w-3">
                 <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon-cyan opacity-75"></span>
                 <span className="relative inline-flex rounded-full h-3 w-3 bg-neon-cyan"></span>
               </span>
               <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-neon-cyan">Limited Launch Expansion: 4/10 Slots Open</span>
            </div>

            <h1 className="text-6xl md:text-8xl lg:text-[9rem] font-black tracking-tighter leading-[0.8] mb-10 overflow-hidden">
              <span className="block mb-2 translate-y-2">WE ENGINEER</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan via-white to-neon-purple filter drop-shadow-[0_0_30px_rgba(0,255,255,0.3)]">DOMINANCE.</span>
            </h1>

            <p className="text-xl md:text-3xl font-light text-gray-400 max-w-4xl mx-auto leading-relaxed mb-16">
              Skip the generic templates. We build <strong className="text-white hover:text-neon-cyan transition-colors">Hyper-Performance Architectures</strong> with a Cyber-Industrial aesthetic that turns visitors into cult followers.
            </p>

            <div className="flex flex-col md:flex-row items-center justify-center gap-6">
              <Link 
                 to={PageRoute.CONTACT}
                 className="relative group p-1 rounded-full bg-gradient-to-r from-neon-cyan to-neon-purple w-full md:w-auto"
              >
                <div className="px-10 py-5 bg-black rounded-full flex items-center justify-center gap-3 font-black text-sm uppercase tracking-widest text-white group-hover:bg-transparent transition-colors duration-500">
                  Initialize Project <Rocket className="group-hover:-translate-y-2 transition-transform duration-300" />
                </div>
              </Link>
              
              <div className="flex items-center gap-4 text-left p-2">
                 <div className="relative">
                    <div className="absolute inset-0 bg-neon-magenta/40 blur-lg rounded-full animate-pulse"></div>
                    <div className="relative bg-cyber-900 border border-white/20 p-4 rounded-2xl rotate-[-3deg]">
                       <p className="text-[10px] font-mono text-gray-400 line-through">₹49,999</p>
                       <p className="text-3xl font-black text-neon-magenta tracking-tight">₹499<span className="text-xs ml-1"> limited</span></p>
                    </div>
                 </div>
                 <div className="text-gray-400 text-sm leading-tight font-mono">
                    <p>&gt; Onboarding Beta</p>
                    <p>&gt; Valid for 72h</p>
                 </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Hero Scroll Indicator */}
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 opacity-30"
        >
          <MousePointer size={32} />
        </motion.div>
      </section>

      {/* --- THE BLACKBOX INTERACTIVE CODE DEMO --- */}
      <section className="py-32 relative z-10 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            
            <div className="lg:w-1/2">
              <div className="inline-block p-2 px-4 rounded-xl bg-neon-purple/10 border border-neon-purple/30 text-neon-purple text-xs font-mono mb-6 uppercase tracking-widest">
                Developer Protocol
              </div>
              <h2 className="text-4xl md:text-6xl font-black mb-8 leading-none tracking-tight">
                Physical <span className="text-neon-purple">UI/UX</span> <br/> Logic Layers.
              </h2>
              <p className="text-xl text-gray-400 font-light leading-relaxed mb-10">
                We use an <strong className="text-white">"Agentic"</strong> build process. Our internal swarm agents optimize every interaction, ensuring buttons don't just click—they react with physical weight and feedback.
              </p>

              <div className="space-y-6">
                {agentTasks.map((task, i) => (
                  <motion.div 
                    key={i}
                    animate={{ 
                      opacity: activeAgentTask === i ? 1 : 0.3,
                      x: activeAgentTask === i ? 10 : 0
                    }}
                    className="flex items-center gap-4 text-sm font-mono"
                  >
                    <div className={`w-2 h-2 rounded-full ${activeAgentTask === i ? 'bg-neon-purple shadow-[0_0_10px_#bc13fe]' : 'bg-gray-800'}`}></div>
                    <span className={activeAgentTask === i ? 'text-white' : 'text-gray-500'}>{task}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="lg:w-1/2 w-full relative">
              <div className="absolute -inset-10 bg-neon-purple/10 blur-[100px] rounded-full"></div>
              
              <motion.div 
                className="relative glass-panel rounded-3xl overflow-hidden border border-white/10 shadow-[0_50px_100px_rgba(0,0,0,0.6)] bg-cyber-900 group"
                whileHover={{ rotateY: -5, rotateX: 2 }}
                transition={{ type: "spring", stiffness: 100 }}
              >
                {/* Visual Sandbox Header */}
                <div className="flex bg-black px-6 py-4 items-center justify-between border-b border-white/5">
                  <div className="flex gap-2">
                    <button 
                      onClick={() => setActiveTab('code')}
                      className={`px-4 py-1.5 rounded-lg text-[10px] font-mono transition-all ${activeTab === 'code' ? 'bg-neon-purple text-white shadow-[0_0_15px_rgba(188,19,254,0.4)]' : 'text-gray-500 hover:text-white'}`}
                    >
                      MAPPER.TSX
                    </button>
                    <button 
                      onClick={() => setActiveTab('preview')}
                      className={`px-4 py-1.5 rounded-lg text-[10px] font-mono transition-all ${activeTab === 'preview' ? 'bg-neon-cyan/20 text-neon-cyan' : 'text-gray-500 hover:text-white'}`}
                    >
                      RENDER.LIVE
                    </button>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
                    <span className="text-[9px] font-mono text-gray-500">60 FPS VERIFIED</span>
                  </div>
                </div>

                <div className="h-[400px]">
                  <AnimatePresence mode="wait">
                    {activeTab === 'code' ? (
                      <motion.div 
                        key="code"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="p-8 font-mono text-sm leading-relaxed overflow-x-auto text-gray-400 bg-[#0d1117] h-full"
                      >
                        <p className="text-gray-600 mb-2">// Swarm Agent: Optimization Pass</p>
                        <p><span className="text-purple-400">const</span> <span className="text-yellow-200">AnimatedCard</span> = () {'=> {'}</p>
                        <p className="pl-4"><span className="text-purple-400">return</span> (</p>
                        <p className="pl-8 text-neon-cyan">&lt;motion.div</p>
                        <p className="pl-12">whileHover={`{{ scale: 1.05 }}`}</p>
                        <p className="pl-12">transition={`{{ type: 'spring' }}`}</p>
                        <p className="pl-12">className=<span className="text-green-300">"glass-effect"</span></p>
                        <p className="pl-8 text-neon-cyan">/&gt;</p>
                        <p className="pl-4">);</p>
                        <p>{'};'}</p>
                      </motion.div>
                    ) : (
                      <motion.div 
                        key="preview"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.1 }}
                        className="h-full flex flex-col items-center justify-center p-8 bg-[radial-gradient(circle_at_center,rgba(0,255,255,0.05)_0,transparent_100%)]"
                      >
                        <motion.div 
                          whileHover={{ scale: 1.05, rotateZ: 1 }}
                          whileTap={{ scale: 0.95 }}
                          className="bg-black/60 border-2 border-neon-cyan/30 rounded-2xl p-10 backdrop-blur-xl shadow-[0_0_50px_rgba(0,255,255,0.1)] relative overflow-hidden group/card cursor-pointer w-full max-w-sm"
                        >
                          <div className="absolute inset-0 bg-gradient-to-tr from-neon-cyan/10 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity"></div>
                          <div className="relative z-10 text-center">
                            <div className="w-16 h-16 bg-neon-cyan/10 rounded-2xl border border-neon-cyan/40 flex items-center justify-center mx-auto mb-6 group-hover/card:scale-110 group-hover/card:rotate-6 transition-transform">
                              <Sparkles className="text-neon-cyan" size={32} />
                            </div>
                            <h3 className="text-2xl font-black text-white mb-3">Cyber-Scale UI</h3>
                            <p className="text-gray-400 text-sm mb-6">Built to withstand traffic bursts and maintain cinematic style.</p>
                            <div className="py-2 px-4 rounded-lg bg-neon-cyan text-black font-black text-[10px] uppercase tracking-widest inline-block group-hover/card:bg-white transition-colors">
                              Initialize Build
                            </div>
                          </div>
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            </div>

          </div>

        </div>
      </section>

      {/* --- LIGHTHOUSE PERFORMANCE HUD --- */}
      <section className="py-32 relative z-10 px-6 border-y border-white/5 bg-black/40">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/30 text-green-400 text-xs font-mono mb-8">
                <Gauge size={16} />
                PERFORMANCE SCORE: VERIFIED
              </div>
              <h2 className="text-5xl md:text-7xl font-black mb-8 tracking-tighter leading-none">
                Zero <span className="text-green-500">Latency.</span> <br/> 
                Pure <span className="text-white">Velocity.</span>
              </h2>
              <p className="text-xl text-gray-400 font-light leading-relaxed mb-10">
                Lighthouse scores aren't just vanity metrics. They are direct indicators of <strong>Google Ranking Power</strong>. We strip every unnecessary byte to ensure your platform loads in under <span className="text-white font-bold">800ms</span>.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { label: "FID", val: "< 10ms", desc: "First Input Delay" },
                  { label: "LCP", val: "0.6s", desc: "Largest Content Paint" },
                  { label: "CLS", val: "0.00", desc: "Zero Layout Shift" },
                  { label: "SIZE", val: "42kb", desc: "Gzipped Bundle" }
                ].map((stat, i) => (
                  <div key={i} className="bg-white/5 border border-white/10 p-6 rounded-2xl group hover:border-green-500/50 transition-colors">
                    <p className="text-[10px] font-mono text-gray-500 uppercase mb-1">{stat.desc}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-black text-white">{stat.val}</span>
                      <span className="text-green-500 text-xs font-mono">100%</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <div className="flex justify-center relative">
               <div className="absolute inset-0 bg-green-500/10 rounded-full blur-[100px] animate-pulse"></div>
               <motion.div
                 initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                 whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                 viewport={{ once: true }}
                 className="relative z-10 p-8 glass-panel border-2 border-green-500/30 rounded-[3rem] shadow-2xl bg-[#0a100a] w-full max-w-md"
               >
                 <div className="flex justify-between items-center mb-10">
                    <div className="flex items-center gap-2 font-mono text-[10px] text-gray-500">
                      <Terminal size={12}/> AGENT_AUDIT_REPORT
                    </div>
                    <div className="text-[9px] bg-green-500/20 text-green-400 px-3 py-1 rounded-full uppercase tracking-[0.2em] font-black">
                       PASSED
                    </div>
                 </div>

                 <div className="flex flex-wrap justify-center gap-10">
                    {[
                      { l: "Perf", s: performanceScore },
                      { l: "Access", s: 100 },
                      { l: "Best", s: 100 },
                      { l: "SEO", s: 100 }
                    ].map((m, i) => (
                      <div key={i} className="flex flex-col items-center">
                        <AnimatedLighthouse score={m.s} />
                        <span className="mt-4 font-black tracking-widest text-[10px] uppercase text-gray-400">{m.l}</span>
                      </div>
                    ))}
                 </div>

                 <div className="mt-12 p-4 bg-black/50 border border-green-500/20 rounded-xl">
                    <p className="text-[10px] font-mono text-green-500 mb-2">&gt; ANALYZING ASSETS...</p>
                    <p className="text-[10px] font-mono text-gray-500 italic">"This platform is ready for enterprise-scale traffic."</p>
                 </div>
               </motion.div>
            </div>

          </div>
        </div>
      </section>

      {/* --- CORE STACK FEATURE GRID --- */}
      <section className="py-32 relative z-10 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
            <h2 className="text-5xl md:text-8xl font-black tracking-tighter leading-none mb-6">THE <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-purple to-neon-orange">TECH STACK</span></h2>
            <p className="text-gray-400 text-xl font-light max-w-2xl mx-auto">Commercial-grade engineering. We only use technologies trusted by the Fortune 500.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Braces, color: "text-blue-400", title: "React Lifecycle", desc: "Advanced hook-driven logic for high-performance state syncing." },
              { icon: Layers, color: "text-purple-400", title: "Global Context", desc: "Decoupled state management allowing components to share data instantly." },
              { icon: Smartphone, color: "text-orange-400", title: "Adaptive Grids", desc: "Mobile-first scaling that looks perfect on everything from a 4K Pro Display to an iPhone." },
              { icon: Braces, color: "text-emerald-400", title: "Edge Analytics", desc: "Behavioral tracking without cookie-bloat. Privacy-first by design." }
            ].map((f, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -10 }}
                className="bg-white/5 border border-white/10 p-8 rounded-3xl group transition-all hover:bg-white/10"
              >
                <div className={`w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform ${f.color}`}>
                   <f.icon size={28} />
                </div>
                <h4 className="text-xl font-black mb-3 text-white">{f.title}</h4>
                <p className="text-gray-400 text-sm leading-relaxed mb-6">{f.desc}</p>
                <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                   <motion.div 
                     initial={{ width: 0 }}
                     whileInView={{ width: "100%" }}
                     transition={{ duration: 1.5, delay: i * 0.1 }}
                     className={`h-full bg-gradient-to-r from-transparent to-white/30`}
                   />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- MASSIVE SALES CLOSER --- */}
      <section className="py-40 relative z-10 px-6 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-neon-magenta to-transparent"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_100%,rgba(255,0,255,0.1)_0,transparent_50%)]"></div>

        <motion.div 
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto"
        >
          <div className="glass-panel border-4 border-neon-magenta/30 rounded-[4rem] p-12 md:p-24 text-center relative overflow-hidden bg-black/60 shadow-[0_0_100px_rgba(255,0,255,0.1)]">
            
            {/* Countdown / Pressure Element */}
            <div className="absolute top-8 left-1/2 -translate-x-1/2 font-mono text-[10px] text-neon-magenta tracking-[0.5em] flex items-center gap-3">
               <span className="w-1.5 h-1.5 rounded-full bg-neon-magenta animate-ping"></span>
               ACTIVE SLOTS: 4 REMAINING
            </div>

            <h2 className="text-6xl md:text-9xl font-black text-white tracking-widest leading-none mb-10 uppercase">
              OWN THE <br/><span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-neon-magenta">PLATFORM.</span>
            </h2>
            
            <p className="text-xl md:text-3xl font-light text-gray-300 max-w-3xl mx-auto mb-16 leading-relaxed">
              We are offering a complete Enterprise Build—normally priced at <strong>₹49,999</strong>—for just <strong>₹499</strong>. This is strictly limited to our first 10 beta partners. 
            </p>

            <div className="flex flex-col items-center gap-10">
               <div className="bg-black border-2 border-white/20 p-8 px-12 rounded-[2rem] shadow-2xl skew-x-[-10deg] group hover:skew-x-0 transition-transform cursor-pointer">
                  <span className="text-neon-magenta font-mono text-sm tracking-widest block mb-1">Launch Subscription</span>
                  <div className="flex items-center gap-4">
                     <span className="text-3xl text-gray-600 line-through">₹49k</span>
                     <span className="text-7xl font-black text-white tracking-tighter">₹499</span>
                  </div>
               </div>

               <Link
                to={PageRoute.CONTACT}
                className="w-full md:w-auto px-16 py-8 bg-neon-magenta text-white font-black text-2xl rounded-full uppercase tracking-tighter shadow-[0_0_60px_rgba(255,0,255,0.4)] hover:scale-105 active:scale-95 transition-all text-center flex items-center justify-center gap-4 group"
               >
                 Book My Slot <Rocket className="group-hover:translate-x-2 transition-transform" />
               </Link>
            </div>

            <div className="mt-16 flex items-center justify-center gap-12 border-t border-white/10 pt-10">
               <div className="flex items-center gap-2 text-gray-500 font-mono text-xs">
                  <ShieldCheck size={16} className="text-green-500" /> Secure Checkout
               </div>
               <div className="flex items-center gap-2 text-gray-500 font-mono text-xs">
                  <Star size={16} className="text-yellow-500" /> Rated 10/10
               </div>
            </div>

          </div>
        </motion.div>
      </section>

      {/* --- FOOTER BUFFER --- */}
      <div className="h-20 bg-black"></div>

    </div>
  );
};

export default WebsiteDesign;
