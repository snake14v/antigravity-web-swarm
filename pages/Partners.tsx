import React, { useState } from 'react';
import { ExternalLink, CheckCircle2, ArrowRight, Layers, Globe, Zap, Users, Shield, Briefcase, Car, Palette, ShoppingBag, GraduationCap, Coffee, Sparkles, Edit3, Cpu, Activity, BarChart3, CloudConnect, Database } from 'lucide-react';
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
  },
];

const Partners: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  
  const categories = ['All', 'Design', 'Food', 'Education', 'Services', 'Automotive'];
  
  const filteredPartners = activeCategory === 'All' 
    ? partners 
    : partners.filter(p => p.category === activeCategory);

  return (
    <div className="pt-24 pb-20 min-h-screen bg-cyber-950 relative overflow-hidden">
      <SEO 
        title="Partners | Ooru Logix Mesh Ecosystem"
        description="Our ecosystem of partners transforming Bangalore's digital and physical skyline. Discover innovative brands using Ooru Logix intelligence."
        keywords="Ooru Logix Partners, Bangalore Tech Ecosystem, AutoPalette, Triangle Inside, Cha Angadi"
        canonical="https://www.oorulogix.com/partners"
      />
      
      {/* Mesh Background with Animated Nodes */}
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
        
        {/* Advanced Hero Section */}
        <div className="text-center max-w-5xl mx-auto mb-20">
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

        {/* Dynamic Nav */}
        <div className="flex flex-wrap justify-center gap-4 mb-20 px-4">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-10 py-4 rounded-3xl text-[10px] font-black tracking-[0.2em] uppercase transition-all duration-500 border ${
                activeCategory === cat 
                ? 'bg-white text-black border-white shadow-[0_20px_40px_rgba(255,255,255,0.1)] scale-110' 
                : 'bg-white/5 text-gray-500 border-white/5 hover:border-white/20 hover:bg-white/10 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Enhanced Partner Gallery */}
        <motion.div layout className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-40">
          <AnimatePresence mode='popLayout'>
            {filteredPartners.map((partner) => (
              <motion.article 
                layout
                key={partner.name}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className={`group relative grid grid-cols-1 md:grid-cols-12 bg-cyber-900/40 backdrop-blur-3xl border border-white/10 border-l-8 ${partner.themeColor} rounded-[3rem] overflow-hidden hover:shadow-[0_60px_100px_-20px_rgba(0,0,0,0.8)] transition-all duration-700`}
              >
                {/* Visual Accent */}
                <div className={`absolute -top-40 -left-40 w-80 h-80 ${partner.themeColor.replace('border-', 'bg-')} opacity-5 blur-[120px] rounded-full group-hover:opacity-10 transition-opacity duration-1000`} />
                
                {/* Left Section: Context & Core Info */}
                <div className="md:col-span-7 p-10 flex flex-col">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="p-4 bg-white/5 rounded-2xl border border-white/10 group-hover:bg-white/10 transition-colors">
                      <partner.icon className="text-white" size={32} />
                    </div>
                    <div>
                      <h3 className="text-3xl font-black tracking-tighter text-white uppercase group-hover:text-neon-cyan transition-colors">{partner.name}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                        <span className="text-[9px] font-black text-gray-500 uppercase tracking-widest">{partner.status}</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-400 mb-10 leading-relaxed font-medium line-clamp-3 text-sm">
                    {partner.description}
                  </p>

                  <div className="grid grid-cols-2 gap-4 mb-10">
                    {partner.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-3 bg-white/5 p-3 rounded-xl border border-white/5 group-hover:border-white/10 transition-all">
                        <CheckCircle2 size={12} className="text-neon-cyan" />
                        <span className="text-[10px] font-bold text-gray-300 uppercase tracking-tight">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-auto">
                    <a 
                      href={partner.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-4 py-3 px-8 bg-white text-black rounded-full font-black text-[10px] uppercase tracking-widest hover:scale-105 transition-all shadow-xl"
                    >
                      Enter Experience <ArrowRight size={18} />
                    </a>
                  </div>
                </div>

                {/* Right Section: Data & Tech Metrics */}
                <div className="md:col-span-5 bg-white/5 p-10 border-l border-white/5 flex flex-col justify-between">
                  <div>
                    <div className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-6 border-b border-white/5 pb-2">Mesh Intelligence Analytics</div>
                    
                    {/* Unique Metric Bento */}
                    <div className={`p-6 rounded-[2rem] bg-cyber-950 border ${partner.themeColor} border-opacity-20 flex flex-col items-center text-center mb-10 group-hover:scale-105 transition-transform duration-500`}>
                      <partner.metric.icon className="text-neon-cyan mb-3" size={24} />
                      <div className="text-4xl font-black text-white mb-1">{partner.metric.value}</div>
                      <div className="text-[9px] font-bold text-gray-500 uppercase tracking-widest">{partner.metric.label}</div>
                    </div>

                    <div className="space-y-4">
                      <div className="text-[9px] font-black text-gray-600 uppercase tracking-widest">Integrated Stack</div>
                      <div className="flex flex-wrap gap-2">
                        {partner.techStack.map((tech, i) => (
                          <span key={i} className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-[9px] font-bold text-white/50 group-hover:text-white transition-colors uppercase tracking-tight">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-10 pt-6 border-t border-white/5">
                    <div className="flex items-center justify-between opacity-50 group-hover:opacity-100 transition-opacity">
                      <div className="text-[8px] font-black text-gray-500 uppercase tracking-widest">Protocol Type</div>
                      <div className="text-[8px] font-black text-neon-cyan uppercase tracking-widest">Hyper-Local V4.2</div>
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Global Connection Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 mb-40">
          {[
            { label: 'Mesh Integration Nodes', value: '742', icon: CloudConnect },
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
