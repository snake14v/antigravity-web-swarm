import React, { useState } from 'react';
import { ExternalLink, CheckCircle2, ArrowRight, Layers, Globe, Zap, Users, Shield, Briefcase, Car, Palette, ShoppingBag, GraduationCap, Coffee, Sparkles, Edit3, Cpu, Activity, BarChart3, Database } from 'lucide-react';
import { PageRoute } from '../types';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import SEO from '../components/SEO';

interface PartnerInfo {
  name: string;
  url: string;
  description: string;
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
    description: 'The Vault: A high-end underground sanctuary for automotive perfection and precision detailing in Bangalore.',
    features: ['Hexagonal Lighting Array', 'Automated Armor Quote', 'The Vault Studio Concept', 'Mission Briefing v2.0'],
    themeColor: 'border-yellow-500',
    icon: Car,
    metric: { label: 'Surface Precision', value: '99.9%', icon: Activity },
    techStack: ['Mesh Lighting', 'Armor API', 'React'],
    status: 'ACTIVE NODE',
    featured: true,
  },
  {
    name: 'Triangle Inside',
    url: 'https://www.triangleinside.in/',
    category: 'Design',
    description: 'Premium interior design platform blending logic with aesthetic appeal for modern home interiors.',
    features: ['AI-Powered Estimator', 'Modular Kitchen Suite', 'Premium UI System', '3D Scene Sync'],
    themeColor: 'border-neon-cyan',
    icon: Palette,
    metric: { label: 'Design Velocity', value: '3x Faster', icon: Zap },
    techStack: ['AI Hub', '3D Sync', 'Firebase'],
    status: 'ACTIVE NODE',
    featured: true,
  },
  {
    name: 'Mouthful Tribal Chicken',
    url: 'https://mtc-22.vercel.app/',
    category: 'Food',
    description: 'Vibrant, tribal-themed food brand celebrating unique culinary traditions and bold flavors.',
    features: ['Marquee Banners', 'Pattern Generator', 'Brutalist Design', 'Inventory Mesh'],
    themeColor: 'border-neon-amber',
    icon: Coffee,
    metric: { label: 'Consistency', value: '100%', icon: Shield },
    techStack: ['Inventory Mesh', 'Sales Predict'],
    status: 'STABILIZING',
  },
  {
    name: 'Cha Angadi',
    url: 'https://www.chaangadi.in/',
    category: 'Food',
    description: 'Authentic tea and coffee community in Bengaluru offering classic brews and loyalty programs.',
    features: ['Loyalty Integration', 'Menu Optimization', 'Custom Animations', 'Community Hub'],
    themeColor: 'border-garden-500',
    icon: Coffee,
    metric: { label: 'Retention', value: '60%', icon: Users },
    techStack: ['Rewards API', 'Community Hub'],
    status: 'ACTIVE NODE',
    featured: true,
  },
  {
    name: 'A Venue Services',
    url: 'https://avenue-gules.vercel.app/',
    category: 'Services',
    description: 'Multi-service company offering construction, interiors, and event planning in North Bangalore.',
    features: ['Portfolio Catalog', 'Localized SEO', 'Conversion Layouts', 'Edge Delivery'],
    themeColor: 'border-neon-purple',
    icon: Briefcase,
    metric: { label: 'Sourcing Speed', value: '40%', icon: Cpu },
    techStack: ['Marketplace API', 'Edge Cache'],
    status: 'STABILIZING',
    featured: true,
  },
  {
    name: 'XGO3D Engineering',
    url: 'https://www.xgo3d.com/',
    category: 'Design',
    description: 'Professional engineering portfolio with interactive 3D model viewers and industrial design.',
    features: ['3D WebGL Viewers', 'DFM Tools', 'Cyber-Industrial Theme', 'DFM Automation'],
    themeColor: 'border-white',
    icon: Layers,
    metric: { label: 'Iterative Gain', value: '5x', icon: Database },
    techStack: ['WebGL 3.0', 'DFM Auto', 'Three.js'],
    status: 'ACTIVE NODE',
    featured: true,
  },
  {
    name: 'The Handwriting Expert',
    url: 'https://handwritin.vercel.app/',
    category: 'Education',
    description: 'A science-backed, gamified platform designed to transform handwriting into a superpower through brain training.',
    features: ['Expert Method (4-Step)', 'Brain-Boosting Neural Paths', 'Exam Performance Booster', 'Fine Motor Skill Training'],
    themeColor: 'border-purple-500',
    icon: Edit3,
    metric: { label: 'Legibility Gain', value: '2x', icon: BarChart3 },
    techStack: ['Neural Logic', 'Gamify Engine', 'Vite'],
    status: 'OPTIMIZING',
  },
  {
    name: 'SQL Tutor for Kids',
    url: 'https://sql-learnx-sbmw.vercel.app/',
    category: 'Education',
    description: 'Interactive educational platform designed to make learning SQL concepts engaging for children.',
    features: ['DB Playground', 'Gamified Layout', 'Visual Query Builder', 'Sandboxed DB'],
    themeColor: 'border-neon-blue',
    icon: GraduationCap,
    metric: { label: 'Engagement', value: '85%', icon: BarChart3 },
    techStack: ['Query Parser', 'Sandboxed DB'],
    status: 'ACTIVE NODE',
  },
];

const Partners: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  
  const categories = ['All', 'Design', 'Food', 'Education', 'Services', 'Automotive'];
  
  const featuredPartners = partners.filter(p => p.featured);
  const regularPartners = partners.filter(p => !p.featured);
  
  const filteredRegular = activeCategory === 'All' 
    ? regularPartners 
    : regularPartners.filter(p => p.category === activeCategory);

  // Custom theme configs for featured partners
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
        <div className="text-center max-w-5xl mx-auto mb-24">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-3 px-5 py-2 rounded-full glass-pill border border-white/10 text-neon-cyan text-[10px] font-black tracking-[0.3em] mb-10"
          >
            <div className="w-2 h-2 rounded-full bg-neon-cyan animate-ping" />
            REAL-TIME MESH STATUS: FULLY SYNCHRONIZED
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-8xl md:text-[10rem] font-black text-white tracking-tighter mb-8 leading-[0.8] uppercase"
          >
            Digital <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan via-white to-neon-purple animate-gradient">Frontiers</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-xl md:text-2xl text-gray-400 font-light max-w-4xl mx-auto leading-relaxed"
          >
            The Ooru Logix Mesh is a hyper-connected network of visionary brands. Each node represents a breakthrough in localized digital intelligence.
          </motion.p>
        </div>

        {/* ═══════════════════════════════════════════════════════ */}
        {/* FEATURED SHOWCASE — Custom Hero Cards */}
        {/* ═══════════════════════════════════════════════════════ */}
        <div className="mb-32">
          <div className="flex items-center gap-4 mb-12">
            <div className="w-3 h-3 rounded-full bg-neon-cyan animate-pulse" />
            <h2 className="text-sm font-black text-white uppercase tracking-[0.3em]">Flagship Nodes</h2>
            <div className="flex-1 h-px bg-gradient-to-r from-white/10 to-transparent" />
          </div>

          <div className="space-y-12">
            {featuredPartners.map((partner, idx) => {
              const theme = featuredThemes[partner.name];
              if (!theme) return null;
              return (
                <motion.article
                  key={partner.name}
                  initial={{ opacity: 0, y: 60 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ duration: 0.7, delay: idx * 0.15 }}
                  className={`group relative rounded-[4rem] overflow-hidden bg-gradient-to-r ${theme.gradient} border border-white/10 hover:border-white/20 transition-all duration-700 hover:shadow-[0_80px_120px_-30px_rgba(0,0,0,0.9)]`}
                >
                  {/* Ambient glow */}
                  <div className={`absolute -top-40 -right-40 w-[500px] h-[500px] ${theme.glow} blur-[150px] rounded-full opacity-40 group-hover:opacity-70 transition-opacity duration-1000`} />
                  <div className={`absolute -bottom-20 -left-20 w-60 h-60 ${theme.glow} blur-[100px] rounded-full opacity-30`} />
                  
                  <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12">
                    {/* Left: Brand Identity */}
                    <div className="lg:col-span-7 p-12 md:p-16 flex flex-col">
                      {/* Header */}
                      <div className="flex items-start justify-between mb-10">
                        <div className="flex items-center gap-5">
                          <div className={`p-5 ${theme.glow} rounded-3xl border border-white/10 group-hover:scale-110 transition-transform duration-500`}>
                            <partner.icon className={theme.accent} size={40} />
                          </div>
                          <div>
                            <div className={`text-[9px] font-black ${theme.accent} uppercase tracking-[0.3em] mb-2`}>{theme.tagline}</div>
                            <h3 className="text-4xl md:text-5xl font-black tracking-tighter text-white uppercase leading-none">{partner.name}</h3>
                          </div>
                        </div>
                        <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/10">
                          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                          <span className="text-[9px] font-black text-green-400 uppercase tracking-widest">{partner.status}</span>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-lg text-gray-300 mb-12 leading-relaxed font-medium max-w-xl">
                        {partner.description}
                      </p>

                      {/* Feature Grid */}
                      <div className="grid grid-cols-2 gap-4 mb-12">
                        {partner.features.map((feature, fidx) => (
                          <div key={fidx} className="flex items-center gap-3 bg-white/5 p-4 rounded-2xl border border-white/5 group-hover:border-white/15 transition-all">
                            <CheckCircle2 size={16} className={theme.accent} />
                            <span className="text-xs font-bold text-gray-200 uppercase tracking-tight">{feature}</span>
                          </div>
                        ))}
                      </div>

                      {/* CTA */}
                      <div className="mt-auto flex items-center gap-6">
                        <a 
                          href={partner.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className={`inline-flex items-center gap-4 py-5 px-12 ${theme.ctaColor} rounded-full font-black text-xs uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-2xl`}
                        >
                          Enter Experience <ArrowRight size={20} />
                        </a>
                        <span className="text-[9px] font-black text-gray-500 uppercase tracking-widest hidden md:block">OORU LOGIX × {partner.name.toUpperCase()}</span>
                      </div>
                    </div>

                    {/* Right: Intelligence Panel */}
                    <div className="lg:col-span-5 bg-white/[0.03] p-12 md:p-16 border-l border-white/5 flex flex-col justify-between">
                      <div>
                        <div className={`text-[10px] font-black ${theme.accent} uppercase tracking-widest mb-8 pb-3 border-b border-white/5`}>
                          Intelligence Dashboard
                        </div>
                        
                        {/* Big Metric */}
                        <div className={`p-8 rounded-[2.5rem] bg-cyber-950/80 border ${partner.themeColor} flex flex-col items-center text-center mb-10 group-hover:scale-105 transition-transform duration-500`}>
                          <partner.metric.icon className={`${theme.accent} mb-4`} size={32} />
                          <div className="text-6xl font-black text-white mb-2 tracking-tighter">{partner.metric.value}</div>
                          <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{partner.metric.label}</div>
                        </div>

                        {/* Tech Stack */}
                        <div className="mb-8">
                          <div className="text-[9px] font-black text-gray-600 uppercase tracking-widest mb-4">Integrated Stack</div>
                          <div className="flex flex-wrap gap-3">
                            {partner.techStack.map((tech, i) => (
                              <span key={i} className={`px-4 py-2 ${theme.glow} border border-white/10 rounded-xl text-[10px] font-black text-white/70 group-hover:text-white transition-colors uppercase tracking-tight`}>
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Category */}
                        <div className="flex items-center gap-3">
                          <span className="text-[9px] font-black text-gray-600 uppercase tracking-widest">Category</span>
                          <span className={`px-4 py-1.5 ${theme.glow} rounded-full text-[9px] font-black ${theme.accent} uppercase tracking-widest border border-white/10`}>
                            {partner.category}
                          </span>
                        </div>
                      </div>

                      <div className="mt-10 pt-6 border-t border-white/5">
                        <div className="flex items-center justify-between">
                          <div className="text-[8px] font-black text-gray-500 uppercase tracking-widest">Protocol</div>
                          <div className={`text-[8px] font-black ${theme.accent} uppercase tracking-widest`}>Hyper-Local V4.2</div>
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
        <div className="mb-40">
          <div className="flex items-center gap-4 mb-12">
            <div className="w-3 h-3 rounded-full bg-white/30" />
            <h2 className="text-sm font-black text-white uppercase tracking-[0.3em]">Network Nodes</h2>
            <div className="flex-1 h-px bg-gradient-to-r from-white/10 to-transparent" />
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-3 mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-8 py-3 rounded-2xl text-[10px] font-black tracking-[0.15em] uppercase transition-all duration-300 border ${
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
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode='popLayout'>
              {filteredRegular.map((partner) => (
                <motion.article 
                  layout
                  key={partner.name}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className={`group relative flex flex-col bg-cyber-900/40 backdrop-blur-2xl border border-white/10 border-t-4 ${partner.themeColor} rounded-[2.5rem] p-8 hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.6)] transition-all duration-500 overflow-hidden`}
                >
                  <div className={`absolute -top-20 -right-20 w-52 h-52 ${partner.themeColor.replace('border-', 'bg-')} opacity-5 blur-[100px] rounded-full group-hover:opacity-15 transition-opacity duration-700`} />

                  <div className="flex items-center gap-4 mb-6 relative z-10">
                    <div className="p-3 bg-white/5 rounded-2xl border border-white/10 group-hover:bg-white/10 transition-colors">
                      <partner.icon className="text-white" size={28} />
                    </div>
                    <div>
                      <h3 className="text-xl font-black tracking-tighter text-white uppercase">{partner.name}</h3>
                      <div className="flex items-center gap-2 mt-0.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                        <span className="text-[8px] font-black text-gray-500 uppercase tracking-widest">{partner.status}</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-sm text-gray-400 mb-6 leading-relaxed font-medium relative z-10 line-clamp-2">
                    {partner.description}
                  </p>

                  <div className="space-y-2 mb-8 relative z-10">
                    {partner.features.slice(0, 3).map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <CheckCircle2 size={10} className="text-neon-cyan" />
                        <span className="text-[10px] font-bold text-gray-300 uppercase tracking-tight">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Mini Metric */}
                  <div className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl border border-white/5 mb-8 relative z-10">
                    <partner.metric.icon size={18} className="text-neon-cyan" />
                    <div>
                      <div className="text-xl font-black text-white">{partner.metric.value}</div>
                      <div className="text-[8px] font-bold text-gray-500 uppercase tracking-widest">{partner.metric.label}</div>
                    </div>
                  </div>

                  <div className="mt-auto relative z-10">
                    <a 
                      href={partner.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center justify-between group/btn py-2"
                    >
                      <span className="text-[10px] font-black tracking-[0.2em] text-white group-hover/btn:text-neon-cyan transition-colors uppercase">Visit Experience</span>
                      <div className="w-9 h-9 flex items-center justify-center rounded-full bg-white/5 group-hover/btn:bg-neon-cyan group-hover/btn:text-black transition-all rotate-[-45deg] group-hover/btn:rotate-0">
                        <ArrowRight size={16} />
                      </div>
                    </a>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>


        {/* Global Connection Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 mb-40">
          {[
            { label: 'Mesh Integration Nodes', value: '742', icon: Globe },
            { label: 'Hyper-Local Throughput', value: '1.2PB', icon: Zap },
            { label: 'Neural Path Syncs', value: '98%', icon: Activity },
            { label: 'Edge Latency', value: '0.4ms', icon: Globe }
          ].map((stat, i) => (
            <div key={i} className="relative group">
              <div className="text-6xl font-black text-white mb-3 tracking-tighter group-hover:text-neon-cyan transition-colors">{stat.value}</div>
              <div className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em] leading-relaxed">{stat.label}</div>
              <div className="absolute -top-4 -left-4 w-12 h-12 bg-white/1 rounded-full blur-xl group-hover:bg-neon-cyan/10 transition-all" />
            </div>
          ))}
        </div>

        {/* Onboarding CTA section */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative rounded-[5rem] overflow-hidden bg-white text-black p-16 md:p-32 text-center group"
        >
           <div className="absolute inset-0 bg-gradient-to-r from-neon-purple/30 via-transparent to-neon-cyan/30 opacity-20 group-hover:opacity-40 transition-opacity duration-1000" />
           <div className="relative z-10">
              <Sparkles className="mx-auto mb-10 text-neon-purple" size={80} />
              <h2 className="text-6xl md:text-9xl font-black mb-10 tracking-tighter leading-[0.8] uppercase">Join the <br/>Mesh Network</h2>
              <p className="text-xl md:text-2xl text-gray-700 max-w-4xl mx-auto mb-20 font-medium leading-relaxed">
                Connect your business to the most advanced hyper-local operating system in existence. Let's architect your digital destiny.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-10">
                 <button 
                   onClick={() => {
                     const message = "Hi Ooru Logix, I'm interested in integrating my brand into the Mesh Network. What's the protocol for onboarding?";
                     window.open(`https://wa.me/919591015279?text=${encodeURIComponent(message)}`, '_blank');
                   }}
                   className="px-16 py-8 bg-black text-white rounded-[2.5rem] font-black text-xs uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] flex items-center justify-center gap-5"
                 >
                   Initiate Onboarding <ArrowRight size={28} />
                 </button>
                 <button 
                  onClick={() => {
                    const message = "Hi Ooru Logix, please send me the Mesh Protocol Deck for Bangalore.";
                    window.open(`https://wa.me/919591015279?text=${encodeURIComponent(message)}`, '_blank');
                    toast.success('Protocol deck broadcast sent!');
                  }}
                  className="px-16 py-8 bg-white border-4 border-black rounded-[2.5rem] font-black text-xs uppercase tracking-widest hover:bg-black hover:text-white transition-all flex items-center justify-center gap-5"
                >
                   <Briefcase size={26} /> Get Mesh Deck
                 </button>
              </div>
           </div>
        </motion.div>
        
      </div>
    </div>
  );
};

export default Partners;
