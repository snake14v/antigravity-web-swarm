import React, { useState } from 'react';
import { CheckCircle2, ArrowRight, Layers, Globe, Zap, Users, Shield, Briefcase, Car, Palette, GraduationCap, Coffee, Sparkles, Edit3, Cpu, Activity, BarChart3, Database, Code2, Eye, Rocket, MessageSquare } from 'lucide-react';
import { PageRoute } from '../types';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import SEO from '../components/SEO';

interface PartnerInfo {
  name: string;
  url: string;
  description: string;
  scope: string;
  features: string[];
  themeColor: string;
  category: 'Design' | 'Food' | 'Retail' | 'Education' | 'Services' | 'Automotive';
  icon: React.ElementType;
  metric: { label: string; value: string; icon: React.ElementType };
  techStack: string[];
  status: 'ACTIVE NODE' | 'STABILIZING' | 'OPTIMIZING';
  featured?: boolean;
}

const partners: PartnerInfo[] = [
  {
    name: 'AutoPalette',
    url: 'https://www.autopalette.in/',
    category: 'Automotive',
    description: 'The Vault: An underground sanctuary for automotive perfection and precision detailing in JP Nagar, Bangalore.',
    scope: 'Full-stack website with automated quote generator, hexagonal lighting showcase, and tactical "Mission Briefing" UI.',
    features: ['Hexagonal Lighting Array', 'Automated Armor Quote', 'The Vault Studio Concept', 'Mission Briefing v2.0'],
    themeColor: 'border-yellow-500',
    icon: Car,
    metric: { label: 'Surface Precision', value: '99.9%', icon: Activity },
    techStack: ['React', 'Vite', 'Framer Motion', 'Vercel'],
    status: 'ACTIVE NODE',
    featured: true,
  },
  {
    name: 'Triangle Inside',
    url: 'https://www.triangleinside.in/',
    category: 'Design',
    description: 'Premium interior design platform blending computational logic with aesthetic sensibility for modern Bangalore homes.',
    scope: 'AI-powered cost estimator, modular kitchen configurator, and premium portfolio system with 3D scene previews.',
    features: ['AI-Powered Estimator', 'Modular Kitchen Suite', 'Premium UI System', '3D Scene Sync'],
    themeColor: 'border-neon-cyan',
    icon: Palette,
    metric: { label: 'Design Velocity', value: '3x', icon: Zap },
    techStack: ['React', 'Firebase', 'AI Hub', 'Three.js'],
    status: 'ACTIVE NODE',
    featured: true,
  },
  {
    name: 'Mouthful Tribal Chicken',
    url: 'https://mtc-22.vercel.app/',
    category: 'Food',
    description: 'Vibrant, tribal-themed food brand celebrating unique culinary traditions and bold flavors from the heartland.',
    scope: 'Brutalist design system with scrolling marquee banners, tribal pattern generators, and menu optimization.',
    features: ['Marquee Banners', 'Pattern Generator', 'Brutalist Design', 'Inventory Mesh'],
    themeColor: 'border-neon-amber',
    icon: Coffee,
    metric: { label: 'Brand Consistency', value: '100%', icon: Shield },
    techStack: ['React', 'CSS Brutalism', 'Vercel'],
    status: 'STABILIZING',
  },
  {
    name: 'Cha Angadi',
    url: 'https://www.chaangadi.in/',
    category: 'Food',
    description: 'Authentic tea and coffee community in Bengaluru — classic brews, community loyalty, and a digital-first menu experience.',
    scope: 'Full digital platform with loyalty integration, animated menu system, community hub, and an AI sommelier for tea recommendations.',
    features: ['Loyalty Integration', 'AI Sommelier', 'Custom Animations', 'Community Hub'],
    themeColor: 'border-garden-500',
    icon: Coffee,
    metric: { label: 'Retention Rate', value: '60%', icon: Users },
    techStack: ['React', 'Firebase', 'Rewards API', 'Vite'],
    status: 'ACTIVE NODE',
    featured: true,
  },
  {
    name: 'A Venue Services',
    url: 'https://avenue-gules.vercel.app/',
    category: 'Services',
    description: 'Multi-service company offering construction, interiors, and event planning across North Bangalore.',
    scope: 'Conversion-optimized portfolio site with localized SEO, service catalog, and edge-cached delivery for 4G networks.',
    features: ['Portfolio Catalog', 'Localized SEO', 'Conversion Layouts', 'Edge Delivery'],
    themeColor: 'border-neon-purple',
    icon: Briefcase,
    metric: { label: 'Lead Velocity', value: '+40%', icon: Cpu },
    techStack: ['React', 'Edge Cache', 'Vercel'],
    status: 'STABILIZING',
    featured: true,
  },
  {
    name: 'XGO3D Engineering',
    url: 'https://www.xgo3d.com/',
    category: 'Design',
    description: 'Professional DFM engineering portfolio with interactive 3D model viewers and clinical precision design.',
    scope: 'Cyber-industrial portfolio with WebGL 3D viewers, DFM automation tools, and precision-themed UI.',
    features: ['3D WebGL Viewers', 'DFM Tools', 'Cyber-Industrial Theme', 'DFM Automation'],
    themeColor: 'border-white',
    icon: Layers,
    metric: { label: 'Iterative Gain', value: '5x', icon: Database },
    techStack: ['React', 'Three.js', 'WebGL', 'Vercel'],
    status: 'ACTIVE NODE',
    featured: true,
  },
  {
    name: 'The Handwriting Expert',
    url: 'https://handwritin.vercel.app/',
    category: 'Education',
    description: 'A science-backed, gamified platform designed to transform handwriting into a superpower through brain training.',
    scope: 'Curriculum showcase with school and tuition pathways, gamified learning methodology, and booking integration.',
    features: ['Expert Method (4-Step)', 'Brain-Boosting Neural Paths', 'Exam Performance Booster', 'Fine Motor Skill Training'],
    themeColor: 'border-purple-500',
    icon: Edit3,
    metric: { label: 'Legibility Gain', value: '2x', icon: BarChart3 },
    techStack: ['React', 'Vite', 'Framer Motion'],
    status: 'OPTIMIZING',
  },
  {
    name: 'SQL Tutor for Kids',
    url: 'https://sql-learnx-sbmw.vercel.app/',
    category: 'Education',
    description: 'Interactive educational platform designed to make learning SQL concepts engaging and fun for children.',
    scope: 'Gamified SQL playground with sandboxed database, visual query builder, and progressive difficulty system.',
    features: ['DB Playground', 'Gamified Layout', 'Visual Query Builder', 'Sandboxed DB'],
    themeColor: 'border-neon-blue',
    icon: GraduationCap,
    metric: { label: 'Engagement', value: '85%', icon: BarChart3 },
    techStack: ['React', 'SQL Engine', 'Vercel'],
    status: 'ACTIVE NODE',
  },
];

const Partners: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [hoveredPartner, setHoveredPartner] = useState<string | null>(null);
  
  const categories = ['All', 'Design', 'Food', 'Education', 'Services', 'Automotive'];
  
  const featuredPartners = partners.filter(p => p.featured);
  const regularPartners = partners.filter(p => !p.featured);
  
  const filteredRegular = activeCategory === 'All' 
    ? regularPartners 
    : regularPartners.filter(p => p.category === activeCategory);

  const featuredThemes: Record<string, { gradient: string; accent: string; glow: string; ctaColor: string; tagline: string }> = {
    'AutoPalette': {
      gradient: 'from-yellow-900/30 via-cyber-950 to-amber-950/20',
      accent: 'text-yellow-400',
      glow: 'bg-yellow-500/10',
      ctaColor: 'bg-yellow-500 text-black hover:bg-yellow-400',
      tagline: 'WHERE ARMOR MEETS ARTISTRY',
    },
    'Cha Angadi': {
      gradient: 'from-green-950/40 via-cyber-950 to-emerald-950/20',
      accent: 'text-green-400',
      glow: 'bg-green-500/10',
      ctaColor: 'bg-green-500 text-black hover:bg-green-400',
      tagline: 'BREWED WITH COMMUNITY',
    },
    'XGO3D Engineering': {
      gradient: 'from-gray-800/30 via-cyber-950 to-slate-900/20',
      accent: 'text-white',
      glow: 'bg-white/10',
      ctaColor: 'bg-white text-black hover:bg-gray-200',
      tagline: 'PRECISION AT EVERY POLYGON',
    },
    'Triangle Inside': {
      gradient: 'from-cyan-950/40 via-cyber-950 to-teal-950/20',
      accent: 'text-cyan-400',
      glow: 'bg-cyan-500/10',
      ctaColor: 'bg-cyan-500 text-black hover:bg-cyan-400',
      tagline: 'LOGIC MEETS AESTHETIC',
    },
    'A Venue Services': {
      gradient: 'from-purple-950/40 via-cyber-950 to-violet-950/20',
      accent: 'text-purple-400',
      glow: 'bg-purple-500/10',
      ctaColor: 'bg-purple-500 text-black hover:bg-purple-400',
      tagline: 'BUILD · DESIGN · CELEBRATE',
    },
  };

  return (
    <div className="pt-24 pb-20 min-h-screen bg-cyber-950 relative overflow-hidden">
      <SEO 
        title="Partners | Ooru Logix Mesh Ecosystem"
        description="Our ecosystem of partners transforming Bangalore's digital and physical skyline. Discover innovative brands using Ooru Logix intelligence."
        keywords="Ooru Logix Partners, Bangalore Tech Ecosystem, AutoPalette, Triangle Inside, Cha Angadi, XGO3D"
        canonical="https://www.oorulogix.com/partners"
      />
      
      {/* Mesh Background */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(0,255,255,0.15),transparent_50%)]" />
        <svg className="w-full h-full" viewBox="0 0 1000 1000">
          <defs>
            <pattern id="gridPattern" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
              <path d="M 80 0 L 0 0 0 80" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#gridPattern)" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Hero Section */}
        <div className="text-center max-w-5xl mx-auto mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-3 px-5 py-2 rounded-full glass-pill border border-white/10 text-neon-cyan text-[10px] font-black tracking-[0.3em] mb-10"
          >
            <div className="w-2 h-2 rounded-full bg-neon-cyan animate-ping" />
            {partners.filter(p => p.status === 'ACTIVE NODE').length} NODES ACTIVE · MESH SYNCHRONIZED
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-7xl md:text-[9rem] font-black text-white tracking-tighter mb-8 leading-[0.8] uppercase"
          >
            Our <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan via-white to-neon-purple animate-gradient">Portfolio</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-lg md:text-xl text-gray-400 font-light max-w-3xl mx-auto leading-relaxed"
          >
            Every project is a living, breathing digital organism — architected by Ooru Logix, powered by local intelligence, and designed to scale.
          </motion.p>
        </div>

        {/* ─── Scrolling Partner Marquee ─── */}
        <div className="mb-24 overflow-hidden relative">
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-cyber-950 to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-cyber-950 to-transparent z-10" />
          <motion.div 
            animate={{ x: [0, -1200] }}
            transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
            className="flex gap-8 whitespace-nowrap"
          >
            {[...partners, ...partners].map((p, i) => (
              <div key={i} className="flex items-center gap-3 px-8 py-4 bg-white/5 rounded-2xl border border-white/5 shrink-0">
                <p.icon size={18} className="text-white/40" />
                <span className="text-sm font-black text-white/30 uppercase tracking-widest">{p.name}</span>
                <span className="text-[8px] font-bold text-green-500/60 uppercase">● LIVE</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* ─── How We Work ─── */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-32"
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter mb-4 uppercase">The Ooru Protocol</h2>
            <p className="text-gray-500 text-sm max-w-2xl mx-auto">From first contact to deployed node — our battle-tested process for architecting digital ecosystems.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { step: '01', icon: MessageSquare, title: 'Discovery', desc: 'Deep-dive audit into your brand, audience, and competitive landscape.' },
              { step: '02', icon: Code2, title: 'Architecture', desc: 'Wireframes, design systems, and full-stack technical blueprints.' },
              { step: '03', icon: Eye, title: 'Build & Iterate', desc: 'Pixel-perfect implementation with weekly sprints and live previews.' },
              { step: '04', icon: Rocket, title: 'Launch & Scale', desc: 'Edge deployment, SEO hardening, and post-launch performance monitoring.' },
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group p-8 bg-white/[0.02] border border-white/5 rounded-[2rem] hover:bg-white/5 hover:border-white/10 transition-all duration-500"
              >
                <div className="text-5xl font-black text-white/5 mb-6 group-hover:text-neon-cyan/20 transition-colors">{item.step}</div>
                <item.icon className="text-neon-cyan mb-4 group-hover:scale-110 transition-transform" size={28} />
                <h3 className="text-lg font-black text-white uppercase tracking-tight mb-2">{item.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ═══════════════════════════════════════════════════════ */}
        {/* FEATURED SHOWCASE — Custom Hero Cards */}
        {/* ═══════════════════════════════════════════════════════ */}
        <div className="mb-32">
          <div className="flex items-center gap-4 mb-16">
            <div className="w-3 h-3 rounded-full bg-neon-cyan animate-pulse" />
            <h2 className="text-sm font-black text-white uppercase tracking-[0.3em]">Flagship Builds</h2>
            <div className="flex-1 h-px bg-gradient-to-r from-white/10 to-transparent" />
            <span className="text-[10px] font-bold text-gray-600 uppercase tracking-widest">{featuredPartners.length} Projects</span>
          </div>

          <div className="space-y-16">
            {featuredPartners.map((partner, idx) => {
              const theme = featuredThemes[partner.name];
              if (!theme) return null;
              const isHovered = hoveredPartner === partner.name;
              return (
                <motion.article
                  key={partner.name}
                  initial={{ opacity: 0, y: 60 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.7, delay: idx * 0.08 }}
                  onMouseEnter={() => setHoveredPartner(partner.name)}
                  onMouseLeave={() => setHoveredPartner(null)}
                  className={`group relative rounded-[4rem] overflow-hidden bg-gradient-to-r ${theme.gradient} border border-white/10 hover:border-white/20 transition-all duration-700 hover:shadow-[0_80px_120px_-30px_rgba(0,0,0,0.9)]`}
                >
                  {/* Ambient glows */}
                  <div className={`absolute -top-40 -right-40 w-[500px] h-[500px] ${theme.glow} blur-[150px] rounded-full opacity-30 group-hover:opacity-60 transition-opacity duration-1000`} />
                  <div className={`absolute -bottom-20 -left-20 w-60 h-60 ${theme.glow} blur-[100px] rounded-full opacity-20`} />
                  
                  <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12">
                    {/* Left: Brand Identity */}
                    <div className="lg:col-span-7 p-10 md:p-14 flex flex-col">
                      {/* Header Row */}
                      <div className="flex items-start justify-between mb-8">
                        <div className="flex items-center gap-4">
                          <div className={`p-4 ${theme.glow} rounded-2xl border border-white/10 group-hover:scale-110 transition-transform duration-500`}>
                            <partner.icon className={theme.accent} size={36} />
                          </div>
                          <div>
                            <div className={`text-[9px] font-black ${theme.accent} uppercase tracking-[0.3em] mb-1`}>{theme.tagline}</div>
                            <h3 className="text-3xl md:text-4xl font-black tracking-tighter text-white uppercase leading-none">{partner.name}</h3>
                          </div>
                        </div>
                        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-white/5 rounded-full border border-white/10">
                          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                          <span className="text-[8px] font-black text-green-400 uppercase tracking-widest">{partner.status}</span>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-base text-gray-300 mb-6 leading-relaxed font-medium max-w-xl">
                        {partner.description}
                      </p>

                      {/* Scope — What We Built */}
                      <div className="mb-8 p-5 bg-white/[0.03] rounded-2xl border border-white/5">
                        <div className="text-[9px] font-black text-gray-500 uppercase tracking-widest mb-2">What We Built</div>
                        <p className="text-sm text-gray-400 leading-relaxed">{partner.scope}</p>
                      </div>

                      {/* Feature Grid */}
                      <div className="grid grid-cols-2 gap-3 mb-8">
                        {partner.features.map((feature, fidx) => (
                          <motion.div 
                            key={fidx} 
                            initial={false}
                            animate={{ scale: isHovered ? 1.02 : 1 }}
                            transition={{ delay: fidx * 0.05 }}
                            className="flex items-center gap-3 bg-white/5 p-3 rounded-xl border border-white/5 group-hover:border-white/10 transition-all"
                          >
                            <CheckCircle2 size={14} className={theme.accent} />
                            <span className="text-[10px] font-bold text-gray-200 uppercase tracking-tight">{feature}</span>
                          </motion.div>
                        ))}
                      </div>

                      {/* CTA */}
                      <div className="mt-auto flex items-center gap-5 flex-wrap">
                        <a 
                          href={partner.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className={`inline-flex items-center gap-3 py-4 px-10 ${theme.ctaColor} rounded-full font-black text-[10px] uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-2xl`}
                        >
                          Visit Live Site <ArrowRight size={18} />
                        </a>
                        <span className="text-[8px] font-black text-gray-600 uppercase tracking-widest hidden md:block">Built by Ooru Logix</span>
                      </div>
                    </div>

                    {/* Right: Intelligence Panel */}
                    <div className="lg:col-span-5 bg-white/[0.03] p-10 md:p-14 border-l border-white/5 flex flex-col justify-between">
                      <div>
                        <div className={`text-[9px] font-black ${theme.accent} uppercase tracking-widest mb-6 pb-3 border-b border-white/5`}>
                          Project Intelligence
                        </div>
                        
                        {/* Big Metric */}
                        <div className={`p-6 rounded-[2rem] bg-cyber-950/80 border ${partner.themeColor} flex flex-col items-center text-center mb-8 group-hover:scale-[1.03] transition-transform duration-500`}>
                          <partner.metric.icon className={`${theme.accent} mb-3`} size={28} />
                          <div className="text-5xl font-black text-white mb-1 tracking-tighter">{partner.metric.value}</div>
                          <div className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">{partner.metric.label}</div>
                        </div>

                        {/* Tech Stack */}
                        <div className="mb-6">
                          <div className="text-[8px] font-black text-gray-600 uppercase tracking-widest mb-3">Tech Stack</div>
                          <div className="flex flex-wrap gap-2">
                            {partner.techStack.map((tech, i) => (
                              <span key={i} className={`px-3 py-1.5 ${theme.glow} border border-white/10 rounded-lg text-[9px] font-black text-white/60 group-hover:text-white transition-colors uppercase tracking-tight`}>
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Category & Industry */}
                        <div className="flex items-center gap-3 mb-6">
                          <span className="text-[8px] font-black text-gray-600 uppercase tracking-widest">Industry</span>
                          <span className={`px-3 py-1 ${theme.glow} rounded-full text-[8px] font-black ${theme.accent} uppercase tracking-widest border border-white/10`}>
                            {partner.category}
                          </span>
                        </div>

                        {/* Quick Feature Count */}
                        <div className="grid grid-cols-2 gap-3">
                          <div className="p-3 bg-white/[0.03] rounded-xl border border-white/5 text-center">
                            <div className="text-xl font-black text-white">{partner.features.length}</div>
                            <div className="text-[7px] font-bold text-gray-500 uppercase tracking-widest">Core Features</div>
                          </div>
                          <div className="p-3 bg-white/[0.03] rounded-xl border border-white/5 text-center">
                            <div className="text-xl font-black text-white">{partner.techStack.length}</div>
                            <div className="text-[7px] font-bold text-gray-500 uppercase tracking-widest">Stack Layers</div>
                          </div>
                        </div>
                      </div>

                      <div className="mt-8 pt-4 border-t border-white/5">
                        <div className="flex items-center justify-between">
                          <div className="text-[7px] font-black text-gray-500 uppercase tracking-widest">Protocol</div>
                          <div className={`text-[7px] font-black ${theme.accent} uppercase tracking-widest`}>Hyper-Local V4.2</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════ */}
        {/* NETWORK NODES — Regular Partner Grid */}
        {/* ═══════════════════════════════════════════════════════ */}
        <div className="mb-32">
          <div className="flex items-center gap-4 mb-12">
            <div className="w-3 h-3 rounded-full bg-white/30" />
            <h2 className="text-sm font-black text-white uppercase tracking-[0.3em]">More Projects</h2>
            <div className="flex-1 h-px bg-gradient-to-r from-white/10 to-transparent" />
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-3 mb-10">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-7 py-2.5 rounded-2xl text-[10px] font-black tracking-[0.15em] uppercase transition-all duration-300 border ${
                  activeCategory === cat 
                  ? 'bg-white text-black border-white shadow-[0_10px_30px_rgba(255,255,255,0.1)]' 
                  : 'bg-white/5 text-gray-500 border-white/5 hover:border-white/20 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Standard Grid */}
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode='popLayout'>
              {filteredRegular.map((partner) => (
                <motion.article 
                  layout
                  key={partner.name}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className={`group relative flex flex-col bg-cyber-900/40 backdrop-blur-2xl border border-white/10 border-t-4 ${partner.themeColor} rounded-[2rem] p-7 hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.6)] transition-all duration-500 overflow-hidden`}
                >
                  <div className={`absolute -top-20 -right-20 w-52 h-52 ${partner.themeColor.replace('border-', 'bg-')} opacity-5 blur-[100px] rounded-full group-hover:opacity-15 transition-opacity duration-700`} />

                  <div className="flex items-center gap-3 mb-5 relative z-10">
                    <div className="p-3 bg-white/5 rounded-xl border border-white/10 group-hover:bg-white/10 transition-colors">
                      <partner.icon className="text-white" size={24} />
                    </div>
                    <div>
                      <h3 className="text-lg font-black tracking-tighter text-white uppercase">{partner.name}</h3>
                      <div className="flex items-center gap-2 mt-0.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                        <span className="text-[7px] font-black text-gray-500 uppercase tracking-widest">{partner.status}</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-gray-400 mb-4 leading-relaxed font-medium relative z-10 line-clamp-2">
                    {partner.description}
                  </p>

                  {/* Scope */}
                  <div className="p-3 bg-white/[0.03] rounded-xl border border-white/5 mb-5 relative z-10">
                    <div className="text-[7px] font-black text-gray-600 uppercase tracking-widest mb-1">Scope</div>
                    <p className="text-[10px] text-gray-400 leading-relaxed line-clamp-2">{partner.scope}</p>
                  </div>

                  <div className="space-y-1.5 mb-5 relative z-10">
                    {partner.features.slice(0, 3).map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <CheckCircle2 size={10} className="text-neon-cyan" />
                        <span className="text-[9px] font-bold text-gray-300 uppercase tracking-tight">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Mini Metric */}
                  <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl border border-white/5 mb-5 relative z-10">
                    <partner.metric.icon size={16} className="text-neon-cyan" />
                    <div>
                      <div className="text-lg font-black text-white leading-none">{partner.metric.value}</div>
                      <div className="text-[7px] font-bold text-gray-500 uppercase tracking-widest">{partner.metric.label}</div>
                    </div>
                  </div>

                  <div className="mt-auto relative z-10">
                    <a 
                      href={partner.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center justify-between group/btn py-2"
                    >
                      <span className="text-[9px] font-black tracking-[0.2em] text-white group-hover/btn:text-neon-cyan transition-colors uppercase">Visit Site</span>
                      <div className="w-8 h-8 flex items-center justify-center rounded-full bg-white/5 group-hover/btn:bg-neon-cyan group-hover/btn:text-black transition-all rotate-[-45deg] group-hover/btn:rotate-0">
                        <ArrowRight size={14} />
                      </div>
                    </a>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* ─── Global Stats ─── */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-10 mb-32 py-16 border-y border-white/5"
        >
          {[
            { label: 'Projects Shipped', value: String(partners.length), suffix: '+' },
            { label: 'Industries Served', value: String(categories.length - 1) },
            { label: 'Avg. Launch Time', value: '14', suffix: ' Days' },
            { label: 'Client Retention', value: '100', suffix: '%' }
          ].map((stat, i) => (
            <div key={i} className="text-center group">
              <div className="text-5xl md:text-6xl font-black text-white mb-2 tracking-tighter group-hover:text-neon-cyan transition-colors">{stat.value}{stat.suffix}</div>
              <div className="text-[9px] font-bold text-gray-500 uppercase tracking-[0.2em]">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* ─── Onboarding CTA ─── */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative rounded-[4rem] overflow-hidden bg-white text-black p-14 md:p-24 text-center group"
        >
           <div className="absolute inset-0 bg-gradient-to-r from-neon-purple/30 via-transparent to-neon-cyan/30 opacity-20 group-hover:opacity-40 transition-opacity duration-1000" />
           <div className="relative z-10">
              <Sparkles className="mx-auto mb-8" size={64} />
              <h2 className="text-5xl md:text-8xl font-black mb-8 tracking-tighter leading-[0.85] uppercase">Let's Build <br/>Your Next Big Thing</h2>
              <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-16 font-medium leading-relaxed">
                From concept to live deployment — we architect digital experiences that convert, scale, and dominate.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-8">
                 <button 
                   onClick={() => {
                     const message = "Hi Ooru Logix, I'd like to discuss a new project. Can we schedule a discovery call?";
                     window.open(`https://wa.me/919591015279?text=${encodeURIComponent(message)}`, '_blank');
                   }}
                   className="px-14 py-7 bg-black text-white rounded-[2rem] font-black text-xs uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] flex items-center justify-center gap-4"
                 >
                   Start a Project <ArrowRight size={24} />
                 </button>
                 <button 
                  onClick={() => {
                    const message = "Hi Ooru Logix, please send me your portfolio deck and pricing.";
                    window.open(`https://wa.me/919591015279?text=${encodeURIComponent(message)}`, '_blank');
                    toast.success('Request sent!');
                  }}
                  className="px-14 py-7 bg-white border-3 border-black/10 rounded-[2rem] font-black text-xs uppercase tracking-widest hover:bg-black/5 transition-all flex items-center justify-center gap-4"
                >
                   <Briefcase size={22} /> Get Portfolio Deck
                 </button>
              </div>
           </div>
        </motion.div>
        
      </div>
    </div>
  );
};

export default Partners;
