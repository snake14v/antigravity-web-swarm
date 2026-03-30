import React, { useState } from 'react';
import { ExternalLink, CheckCircle2, ArrowRight, Layers, Globe, Zap, Users, Shield, Briefcase, Car, Palette, ShoppingBag, GraduationCap, Coffee, Sparkles } from 'lucide-react';
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
}

const partners: PartnerInfo[] = [
  {
    name: 'AutoPalette',
    url: 'https://www.autopalette.in/',
    category: 'Automotive',
    description: 'The Vault: A high-end underground sanctuary for automotive perfection and precision detailing in Bangalore.',
    features: ['Signature Hexagonal Lighting', 'Automated Armor Quote', 'The Vault Studio Concept', 'Mission Briefing v2.0'],
    themeColor: 'border-yellow-500',
    icon: Car,
  },
  {
    name: 'Triangle Inside',
    url: 'https://www.triangleinside.in/',
    category: 'Design',
    description: 'Premium interior design platform blending logic with aesthetic appeal for modern home interiors.',
    features: ['AI-Powered Estimator', 'Modular Kitchen Suite', 'Premium UI System'],
    themeColor: 'border-neon-cyan',
    icon: Palette,
  },
  {
    name: 'Mouthful Tribal Chicken',
    url: 'https://mtc-22.vercel.app/',
    category: 'Food',
    description: 'Vibrant, tribal-themed food brand celebrating unique culinary traditions and bold flavors.',
    features: ['Marquee Banners', 'Pattern Generator', 'Brutalist Design'],
    themeColor: 'border-neon-amber',
    icon: Coffee,
  },
  {
    name: 'Cha Angadi',
    url: 'https://www.chaangadi.in/',
    category: 'Food',
    description: 'Authentic tea and coffee community in Bengaluru offering classic brews and loyalty programs.',
    features: ['Loyalty Integration', 'Menu Optimization', 'Custom Animations'],
    themeColor: 'border-garden-500',
    icon: Coffee,
  },
  {
    name: 'SQL Tutor for Kids',
    url: 'https://sql-learnx-sbmw.vercel.app/',
    category: 'Education',
    description: 'Interactive educational platform designed to make learning SQL concepts engaging for children.',
    features: ['DB Playground', 'Gamified Layout', 'Visual Query Builder'],
    themeColor: 'border-neon-blue',
    icon: GraduationCap,
  },
  {
    name: 'A Venue Services',
    url: 'https://avenue-gules.vercel.app/',
    category: 'Services',
    description: 'Multi-service company offering construction, interiors, and event planning in North Bangalore.',
    features: ['Portfolio Catalog', 'Localized SEO', 'Conversion Layouts'],
    themeColor: 'border-neon-purple',
    icon: Briefcase,
  },
  {
    name: 'XGO3D Engineering',
    url: 'https://www.xgo3d.com/',
    category: 'Design',
    description: 'Professional engineering portfolio with interactive 3D model viewers and industrial design.',
    features: ['3D WebGL Viewers', 'DFM Tools', 'Cyber-Industrial Theme'],
    themeColor: 'border-white',
    icon: Layers,
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
      
      {/* Dynamic Grid Background */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,255,255,0.1),transparent_70%)]" />
        <svg className="w-full h-full" viewBox="0 0 1000 1000">
          <defs>
            <pattern id="dotGrid" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1.5" fill="rgba(255,255,255,0.15)" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dotGrid)" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Animated Hero Section */}
        <div className="text-center max-w-5xl mx-auto mb-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-pill border border-white/10 text-neon-cyan text-xs font-mono mb-8 tracking-[0.2em]"
          >
            <Globe className="animate-spin-slow" size={14} />
            THE GLOBAL MESH ECOSYSTEM
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-7xl md:text-9xl font-black text-white tracking-tighter mb-8 leading-[0.85] uppercase"
          >
            Synergy <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan via-white to-neon-purple animate-gradient">Unleashed</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="text-xl md:text-2xl text-gray-400 font-light max-w-3xl mx-auto leading-relaxed"
          >
            We don't just build websites; we architect digital ecosystems. Explore the visionary nodes that power our hyper-local intelligence network.
          </motion.p>
        </div>

        {/* Filter Navigation */}
        <div className="flex flex-wrap justify-center gap-3 mb-16 px-4">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-8 py-3 rounded-2xl text-xs font-bold tracking-widest uppercase transition-all duration-300 border ${
                activeCategory === cat 
                ? 'bg-white text-black border-white shadow-[0_0_30px_rgba(255,255,255,0.2)] scale-105' 
                : 'bg-white/5 text-gray-400 border-white/10 hover:border-white/30 hover:bg-white/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Partner Ecosystem Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-32"
        >
          <AnimatePresence mode='popLayout'>
            {filteredPartners.map((partner) => (
              <motion.article 
                layout
                key={partner.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className={`group relative flex flex-col h-full bg-cyber-900/40 backdrop-blur-2xl border border-white/10 border-t-4 ${partner.themeColor} rounded-[2.5rem] p-8 hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.6)] transition-all duration-500 overflow-hidden`}
              >
                {/* Decorative Background Elements */}
                <div className={`absolute -top-24 -right-24 w-64 h-64 ${partner.themeColor.replace('border-', 'bg-')} opacity-5 blur-[100px] rounded-full group-hover:opacity-20 transition-opacity duration-700`} />
                <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent pointer-events-none" />

                <div className="flex justify-between items-start mb-10 relative z-10">
                  <div className="p-4 bg-white/5 rounded-3xl border border-white/10 group-hover:scale-110 transition-transform duration-500 group-hover:bg-white/10">
                    <partner.icon className="text-white" size={32} />
                  </div>
                  <div className="px-4 py-1.5 bg-white/5 rounded-full border border-white/10 text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">
                    {partner.category}
                  </div>
                </div>
                
                <h3 className="text-3xl font-black tracking-tighter text-white mb-4 relative z-10">
                  {partner.name}
                </h3>
                <p className="text-gray-400 mb-8 leading-relaxed font-medium relative z-10 line-clamp-3">
                  {partner.description}
                </p>
                
                <div className="space-y-4 mb-10 relative z-10">
                  <div className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2">Key Features</div>
                  {partner.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-neon-cyan animate-pulse" />
                      <span className="text-xs font-mono text-gray-300 uppercase tracking-tight group-hover:text-white transition-colors">{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-auto pt-8 border-t border-white/5 relative z-10">
                  <a 
                    href={partner.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center justify-between group/btn py-2"
                  >
                    <span className="text-sm font-black tracking-[0.2em] text-white group-hover/btn:text-neon-cyan transition-colors">VISIT EXPERIENCE</span>
                    <div className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 group-hover/btn:bg-neon-cyan group-hover/btn:text-black transition-all rotate-[-45deg] group-hover/btn:rotate-0">
                      <ArrowRight size={20} />
                    </div>
                  </a>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Global Connection Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-32">
          {[
            { label: 'Network Nodes', value: '500+' },
            { label: 'Daily Requests', value: '2.4M' },
            { label: 'Uptime', value: '99.98%' },
            { label: 'Global Reach', value: '12 Cities' }
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-4xl font-black text-white mb-2 font-mono">{stat.value}</div>
              <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Onboarding CTA section */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative rounded-[4rem] overflow-hidden bg-white text-black p-12 md:p-24 text-center group"
        >
           <div className="absolute inset-0 bg-gradient-to-r from-neon-purple/20 via-transparent to-neon-cyan/20 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
           <div className="relative z-10">
              <Sparkles className="mx-auto mb-8 animate-pulse" size={64} />
              <h2 className="text-5xl md:text-7xl font-black mb-8 tracking-tighter leading-none uppercase">Join the <br/>Intelligence Mesh</h2>
              <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-16 font-medium leading-relaxed">
                Ready to transform your business with the most advanced hyper-local operating system in the world? Let's build your future together.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-8">
                 <button 
                   onClick={() => {
                     const message = "Hi Ooru Logix, I'm interested in becoming a partner node in the mesh ecosystem. How do I start the onboarding process?";
                     window.open(`https://wa.me/919591015279?text=${encodeURIComponent(message)}`, '_blank');
                   }}
                   className="px-12 py-6 bg-black text-white rounded-[2rem] font-black text-sm uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-2xl flex items-center justify-center gap-4"
                 >
                   Inquire Now <ArrowRight size={24} />
                 </button>
                 <button 
                  onClick={() => {
                    const message = "Hi Ooru Logix, please send me the Partner Deck for the Bangalore Mesh Ecosystem.";
                    window.open(`https://wa.me/919591015279?text=${encodeURIComponent(message)}`, '_blank');
                    toast.success('Partner deck broadcast sent!');
                  }}
                  className="px-12 py-6 bg-white border-2 border-black/10 rounded-[2rem] font-black text-sm uppercase tracking-widest hover:bg-black/5 transition-all flex items-center justify-center gap-4"
                >
                   <Briefcase size={22} /> Get Partner Deck
                 </button>
              </div>
           </div>
        </motion.div>
        
      </div>
    </div>
  );
};

export default Partners;
