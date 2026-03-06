import React, { useState } from 'react';
import { ExternalLink, CheckCircle2, ArrowRight, Layers, Globe, Zap, Users, Shield, Briefcase } from 'lucide-react';
import { PageRoute } from '../types';
import { Link } from 'react-router-dom';

interface PartnerInfo {
  name: string;
  url: string;
  description: string;
  features: string[];
  themeColor: string;
  category: 'Design' | 'Food' | 'retail' | 'Education' | 'Services';
}

const partners: PartnerInfo[] = [
  {
    name: 'Triangle Inside',
    url: 'https://www.triangleinside.in/',
    category: 'Design',
    description: 'Premium interior design platform blending logic with aesthetic appeal for modern home interiors in Bangalore.',
    features: ['AI-Powered Estimator', 'Modular Kitchen Suite', 'Premium UI System'],
    themeColor: 'border-neon-cyan',
  },
  {
    name: 'Mouthful Tribal Chicken',
    url: 'https://mtc-22.vercel.app/',
    category: 'Food',
    description: 'Vibrant, tribal-themed food brand and restaurant celebrating unique culinary traditions and bold flavors.',
    features: ['Marquee Banners', 'Pattern Generator', 'Brutalist Design'],
    themeColor: 'border-neon-amber',
  },
  {
    name: 'Cha Angadi',
    url: 'https://www.chaangadi.in/',
    category: 'Food',
    description: 'Authentic tea and coffee shop in Bengaluru offering classic brews, snacks, and a community loyalty program.',
    features: ['Loyalty Integration', 'Menu Optimization', 'Custom Animations'],
    themeColor: 'border-garden-500',
  },
  {
    name: 'SQL Tutor for Kids',
    url: 'https://sql-learnx-sbmw.vercel.app/',
    category: 'Education',
    description: 'Interactive educational platform designed specifically to make learning SQL concepts engaging and fun for children.',
    features: ['DB Playground', 'Gamified Layout', 'Visual Query Builder'],
    themeColor: 'border-neon-blue',
  },
  {
    name: 'A Venue Services',
    url: 'https://avenue-gules.vercel.app/',
    category: 'Services',
    description: 'Multi-service company offering construction, interiors, and event planning in North Bangalore.',
    features: ['Portfolio Catalog', 'Localized SEO', 'Conversion Layouts'],
    themeColor: 'border-neon-purple',
  },
];

const Partners: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  
  const categories = ['All', 'Design', 'Food', 'Education', 'Services'];
  
  const filteredPartners = activeCategory === 'All' 
    ? partners 
    : partners.filter(p => p.category === activeCategory);

  return (
    <div className="pt-24 pb-20 min-h-screen bg-cyber-950 relative overflow-hidden">
      
      {/* Mesh Background Diagram */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
        <svg className="w-full h-full" viewBox="0 0 1000 1000">
          <defs>
            <pattern id="dotGrid" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1.5" fill="rgba(255,255,255,0.1)" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dotGrid)" />
          {/* Subtle connecting lines */}
          <path d="M100 200 L400 300 L700 100 M200 600 L500 800 L800 500" stroke="#00ffff" strokeWidth="0.5" fill="none" className="animate-pulse" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* B2B Hero Section */}
        <div className="text-center max-w-4xl mx-auto mb-20 animate-in fade-in slide-in-from-top-8 duration-700">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-pill border border-white/10 text-neon-cyan text-xs font-mono mb-8 tracking-[0.2em]">
            <Globe className="animate-spin-slow" size={14} />
            THE GLOBAL MESH ECOSYSTEM
          </div>
          <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter mb-8 leading-[0.9]">
            SCALING <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan via-white to-neon-purple animate-gradient">TRUST</span> TOGETHER
          </h1>
          <p className="text-xl text-gray-400 font-light max-w-2xl mx-auto">
            Ooru Logix isn't just a platform; it's a collaborative intelligence network. Join 500+ local nodes transforming Bangalore's digital skyline.
          </p>
        </div>

        {/* Integration Value Props */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24">
          {[
            { icon: Layers, title: 'Mesh Integration', desc: 'Plug into our localized data API for real-time inventory and logistics sync.' },
            { icon: Shield, title: 'Data Sovereignty', desc: 'Maintain 100% ownership of your customer data with our decentralized protocols.' },
            { icon: Zap, title: 'Zero Latency', desc: 'Edge-cached performance ensuring your brand loads instantly on 4G networks.' }
          ].map((item, i) => (
            <div key={i} className="bento-card p-8 rounded-3xl border border-white/5 hover:bg-white/5 transition-all group">
              <item.icon className="text-neon-cyan mb-6 group-hover:scale-110 transition-transform" size={40} />
              <h3 className="text-xl font-bold text-white mb-3 tracking-tight">{item.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Categories & Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2.5 rounded-full text-xs font-bold tracking-widest uppercase transition-all border ${
                activeCategory === cat 
                ? 'bg-neon-cyan text-black border-neon-cyan shadow-[0_0_20px_rgba(0,255,255,0.4)]' 
                : 'bg-white/5 text-gray-400 border-white/10 hover:border-white/30'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Partner Ecosystem Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-32">
          {filteredPartners.map((partner, index) => (
            <div 
              key={index}
              className={`flex flex-col h-full bg-cyber-900 border-t-2 ${partner.themeColor} rounded-3xl p-8 hover:-translate-y-2 transition-all duration-500 shadow-2xl relative overflow-hidden group`}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none" />
              
              <div className="flex justify-between items-start mb-8">
                <div className="px-3 py-1 bg-white/5 rounded-lg border border-white/10 text-[10px] font-mono text-gray-400 uppercase tracking-widest">
                  {partner.category}
                </div>
                <a 
                  href={partner.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 text-gray-400 hover:text-neon-cyan hover:bg-neon-cyan/10 transition-all"
                >
                  <ExternalLink size={18} />
                </a>
              </div>
              
              <h3 className="text-2xl font-black tracking-tighter text-white mb-4 group-hover:text-neon-cyan transition-colors">{partner.name}</h3>
              <p className="text-sm text-gray-400 mb-8 leading-relaxed font-medium">
                {partner.description}
              </p>
              
              <div className="space-y-3 pt-6 border-t border-white/5">
                {partner.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-neon-cyan opacity-40" />
                    <span className="text-[11px] font-mono text-gray-300 uppercase tracking-wide">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Onboarding CTA section */}
        <div className="relative rounded-[3rem] overflow-hidden bg-white/5 border border-white/10 p-12 md:p-24 text-center">
           <div className="absolute inset-0 bg-gradient-to-r from-neon-purple/20 via-transparent to-neon-cyan/20 blur-3xl" />
           <div className="relative z-10">
              <Users className="text-neon-cyan mx-auto mb-8 animate-bounce" size={64} />
              <h2 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tighter">BECOME A NODE IN THE MESH</h2>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-12 font-light leading-relaxed">
                Ready to transform your business with the most advanced hyper-local operating system in Bangalore? Our integration team is standing by.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-6">
                 <Link 
                   to={PageRoute.CONTACT}
                   className="px-10 py-5 bg-white text-black rounded-full font-black text-sm uppercase tracking-widest hover:scale-105 transition-all shadow-2xl flex items-center justify-center gap-3"
                 >
                   Request Onboarding <ArrowRight size={20} />
                 </Link>
                 <button className="px-10 py-5 bg-white/5 text-white border border-white/10 rounded-full font-black text-sm uppercase tracking-widest hover:bg-white/10 transition-all flex items-center justify-center gap-3">
                   <Briefcase size={20} className="text-neon-purple" /> Partner Deck
                 </button>
              </div>
           </div>
        </div>
        
      </div>
    </div>
  );
};

export default Partners;
