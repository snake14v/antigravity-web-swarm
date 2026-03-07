import React from 'react';
import { motion } from 'framer-motion';
import { Code2, MonitorSmartphone, Rocket, Zap, Search, Layout, Paintbrush, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PageRoute } from '../types';

const WebsiteDesign: React.FC = () => {
  return (
    <div className="pt-24 pb-20 min-h-screen bg-cyber-950 relative overflow-hidden text-gray-100">
      {/* Background Ambience */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-neon-cyan/5 rounded-full blur-[150px]"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-neon-purple/5 rounded-full blur-[120px]"></div>
        <svg className="w-full h-full opacity-[0.03]" viewBox="0 0 100 100" preserveAspectRatio="none">
          <pattern id="grid" x="0" y="0" width="4" height="4" patternUnits="userSpaceOnUse">
            <path d="M 4 0 L 0 0 0 4" fill="none" stroke="white" strokeWidth="0.1" />
          </pattern>
          <rect width="100" height="100" fill="url(#grid)" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto mb-20 pt-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-pill border border-neon-cyan/30 text-neon-cyan text-xs font-mono mb-8 tracking-[0.2em] shadow-[0_0_20px_rgba(0,255,255,0.2)]">
            <Layout size={14} className="animate-pulse" />
            BESPOKE DIGITAL EXPERIENCES
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-8 leading-[1.1]">
            WE BUILD <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan to-neon-purple">WEBSITES</span> THAT COMMAND ATTENTION.
          </h1>
          <p className="text-xl text-gray-400 font-light max-w-2xl mx-auto leading-relaxed">
            Forget WordPress templates. Experience high-octane React architecture, immersive WebGL/3D, and clinical conversion funnels engineered for dominance.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
             <Link 
               to={PageRoute.CONTACT}
               className="px-8 py-4 bg-white text-black rounded-full font-black text-sm uppercase tracking-widest hover:scale-105 transition-all shadow-[0_0_30px_rgba(255,255,255,0.3)] flex items-center justify-center gap-2 group"
             >
               Start a Project <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
             </Link>
             <a href="#portfolio" className="px-8 py-4 bg-white/5 border border-white/10 rounded-full font-black text-white text-sm uppercase tracking-widest hover:bg-white/10 transition-colors">
               View Systems
             </a>
          </div>
        </motion.div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
          {[
            {
              icon: Zap,
              color: "text-yellow-400",
              bgColor: "bg-yellow-400/10",
              title: "Hyper-Performance UI",
              desc: "100/100 Lighthouse scores. We use Vite, Next.js, and global edge CDNs ensuring pages load natively under 800ms."
            },
            {
              icon: Paintbrush,
              color: "text-neon-purple",
              bgColor: "bg-neon-purple/10",
              title: "Cyber-Industrial Aesthetic",
              desc: "Premium glassmorphism, fluid micro-animations, and aggressive typography that feels like software from 2030."
            },
            {
              icon: MonitorSmartphone,
              color: "text-neon-cyan",
              bgColor: "bg-neon-cyan/10",
              title: "Adaptive Breakpoints",
              desc: "Flawless mobile-first rendering. No hidden scrollbars. Your platform looks identical and perfect on a 4K monitor and an iPhone 13."
            },
            {
              icon: Search,
              color: "text-garden-400",
              bgColor: "bg-garden-400/10",
              title: "Deep Technical SEO",
              desc: "Semantic HTML5, automated SSR, dynamic Open Graph tags, and auto-generated XML sitemaps to secure Page 1 Google Authority."
            },
            {
              icon: Code2,
              color: "text-orange-400",
              bgColor: "bg-orange-400/10",
              title: "Custom CMS Architecture",
              desc: "We ditch heavy plugins. Integrated securely with headless setups like Sanity or Firebase for zero-friction content management."
            },
            {
              icon: Rocket,
              color: "text-red-400",
              bgColor: "bg-red-400/10",
              title: "Conversion Engineering",
              desc: "Heat-map verified button placements. Call-to-actions wrapped in precise behavioral psychology to guarantee maximum ROI."
            }
          ].map((feature, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className="bento-card p-8 rounded-3xl border border-white/5 hover:bg-white/[0.02] hover:border-white/20 transition-all group flex flex-col h-full"
            >
              <div className={`w-14 h-14 rounded-2xl ${feature.bgColor} flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform`}>
                 <feature.icon className={feature.color} size={28} />
              </div>
              <h3 className="text-xl font-bold text-white mb-3 tracking-tight">{feature.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed font-medium">{feature.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Development Process */}
        <div className="mb-32 relative">
          <div className="absolute top-1/2 left-0 w-full h-px bg-white/5 -translate-y-1/2 hidden lg:block" />
          <h2 className="text-3xl md:text-5xl font-black text-center text-white mb-16 tracking-tight">THE OS-LEVEL <span className="text-neon-cyan">DEPLOYMENT</span> PIPELINE</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
             {[
               { step: "01", title: "Strategy & UX Audit", desc: "Mapping user journeys, defining brand archetypes, and drafting Wireframes." },
               { step: "02", title: "Visual Prototyping", desc: "Figma high-fidelity components establishing the design token system and palette." },
               { step: "03", title: "React Development", desc: "Connecting Tailwind grids, Framer Motion springs, and functional React components." },
               { step: "04", title: "Launch & CI/CD", desc: "Zero-downtime Vercel/Netlify deployment with automated testing coverage." }
             ].map((phase, i) => (
               <motion.div
                 key={i}
                 initial={{ opacity: 0, scale: 0.9 }}
                 whileInView={{ opacity: 1, scale: 1 }}
                 viewport={{ once: true }}
                 transition={{ delay: i * 0.15, duration: 0.5 }}
                 className="relative z-10 bg-cyber-900 border border-white/10 p-8 rounded-3xl text-center shadow-xl group hover:-translate-y-2 transition-transform"
               >
                 <div className="text-5xl font-black text-white/5 absolute top-4 right-4 group-hover:text-white/10 transition-colors pointer-events-none">{phase.step}</div>
                 <div className="text-neon-cyan font-mono text-sm tracking-widest mb-4">PHASE {phase.step}</div>
                 <h4 className="text-xl font-bold text-white mb-3">{phase.title}</h4>
                 <p className="text-sm text-gray-400 leading-relaxed">{phase.desc}</p>
               </motion.div>
             ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default WebsiteDesign;
