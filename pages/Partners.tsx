import React from 'react';
import { ExternalLink, CheckCircle2 } from 'lucide-react';
import { PageRoute } from '../types';

interface PartnerInfo {
  name: string;
  url: string;
  description: string;
  features: string[];
  themeColor: string;
}

const partners: PartnerInfo[] = [
  {
    name: 'Triangle Inside',
    url: 'https://www.triangleinside.in/',
    description: 'Premium interior design platform blending logic with aesthetic appeal for modern home interiors in Bangalore.',
    features: [
      'AI-Powered Home Cost Estimator',
      'Modular Kitchen Design Suite',
      'Premium UI/UX System',
    ],
    themeColor: 'border-[#6366F1]',
  },
  {
    name: 'Mouthful Tribal Chicken',
    url: 'https://mtc-22.vercel.app/',
    description: 'Vibrant, tribal-themed food brand and restaurant celebrating unique culinary traditions and bold flavors.',
    features: [
      'Custom Animated Marquee Banners',
      'Dynamic Tribal Pattern Generator',
      'Stylized Brutalist Design Interface',
    ],
    themeColor: 'border-[#FFEB00]',
  },
  {
    name: 'Cha Angadi',
    url: 'https://www.chaangadi.in/',
    description: 'Authentic tea and coffee shop in Bengaluru offering classic brews, snacks, and a community loyalty program.',
    features: [
      'Fully Integrated Loyalty Program',
      'Performance-Optimized Menu Layout',
      'Custom Animations & Interactions',
    ],
    themeColor: 'border-[#FFC800]',
  },
  {
    name: 'SQL Tutor for Kids',
    url: 'https://sql-learnx-sbmw.vercel.app/',
    description: 'Interactive educational platform designed specifically to make learning SQL concepts engaging and fun for children.',
    features: [
      'Interactive Database Playground',
      'Kid-Friendly Gamified Layout',
      'Visual Query Builder Components',
    ],
    themeColor: 'border-[#22d3ee]',
  },
  {
    name: 'A Venue Services',
    url: 'https://avenue-gules.vercel.app/',
    description: 'Multi-service company in Yelahanka offering construction, interiors, event planning, and manpower solutions.',
    features: [
      'Multi-Service Portfolio Catalog',
      'Localized SEO Search Optimization',
      'High-Conversion Service Layouts',
    ],
    themeColor: 'border-[#e879f9]',
  },
];

const Partners: React.FC = () => {
  return (
    <div className="pt-32 pb-20 min-h-screen bg-cyber-950 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-neon-cyan/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-neon-purple/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-20 animate-in fade-in slide-in-from-bottom-8 duration-700">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neon-purple/10 border border-neon-purple/20 text-neon-purple text-xs font-mono mb-6">
            <span className="w-2 h-2 rounded-full bg-neon-purple animate-pulse" />
            CLIENT SHOWCASE
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-white tracking-tighter mb-6">
            OUR <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-purple to-neon-cyan drop-shadow-[0_0_15px_rgba(168,85,247,0.5)]">PARTNERS</span>
          </h1>
          <p className="text-lg text-gray-400 font-medium">
            Discover the custom digital solutions and unique features we have engineered for our diverse network of clients across different industries.
          </p>
        </div>

        {/* Partners Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {partners.map((partner, index) => (
            <div 
              key={index}
              className={`flex flex-col h-full bg-cyber-900 border-t border-l border-r border-b-4 ${partner.themeColor} border-t-white/10 border-l-white/10 border-r-white/10 rounded-2xl p-6 md:p-8 hover:-translate-y-2 transition-transform duration-300 shadow-xl`}
            >
              <div className="flex justify-between items-start mb-6">
                <h3 className="text-2xl font-bold tracking-tight text-white mb-2">{partner.name}</h3>
                <a 
                  href={partner.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2 -mr-2 -mt-2 rounded-full bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
                  aria-label={`Visit ${partner.name} external website`}
                >
                  <ExternalLink size={20} />
                </a>
              </div>
              
              <p className="text-sm text-gray-300 mb-8 leading-relaxed flex-grow">
                {partner.description}
              </p>
              
              <div className="mt-auto">
                <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">Custom Features</h4>
                <ul className="space-y-3">
                  {partner.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <CheckCircle2 size={16} className={`shrink-0 mt-0.5 opacity-80 ${partner.themeColor.replace('border-', 'text-')}`} />
                      <span className="text-sm font-medium text-gray-200">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
        
      </div>
    </div>
  );
};

export default Partners;
