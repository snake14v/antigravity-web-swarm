import React from 'react';
import { Link } from 'react-router-dom';
import { PageRoute } from '../types';
import { Map, ChevronRight, Globe, Shield, Zap, MessageSquare, Briefcase, Newspaper, FileText, DollarSign } from 'lucide-react';

const Sitemap: React.FC = () => {
  const sections = [
    {
      title: "Main Navigation",
      icon: <Globe className="text-neon-cyan" size={20} />,
      links: [
        { name: "Home", path: PageRoute.HOME, icon: <Zap size={14} /> },
        { name: "Manifesto", path: PageRoute.MANIFESTO, icon: <FileText size={14} /> },
        { name: "Pricing", path: PageRoute.PRICING, icon: <DollarSign size={14} /> },
        { name: "Contact", path: PageRoute.CONTACT, icon: <MessageSquare size={14} /> },
      ]
    },
    {
      title: "Company",
      icon: <Briefcase className="text-neon-purple" size={20} />,
      links: [
        { name: "Careers", path: PageRoute.CAREERS, icon: <Briefcase size={14} /> },
        { name: "Press & Media", path: PageRoute.PRESS, icon: <Newspaper size={14} /> },
      ]
    },
    {
      title: "Legal & Compliance",
      icon: <Shield className="text-garden-400" size={20} />,
      links: [
        { name: "Privacy Policy", path: PageRoute.LEGAL, icon: <Shield size={14} /> },
        { name: "Terms of Service", path: PageRoute.LEGAL, icon: <FileText size={14} /> },
        { name: "DPDP Compliance", path: PageRoute.LEGAL, icon: <Shield size={14} /> },
      ]
    }
  ];

  return (
    <div className="pt-24 min-h-screen bg-cyber-950 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-neon-cyan/5 rounded-full blur-[128px]"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-neon-purple/5 rounded-full blur-[128px]"></div>
        <div className="absolute inset-0 cyber-grid opacity-10"></div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <header className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neon-cyan/10 border border-neon-cyan/20 text-neon-cyan text-xs font-mono mb-6">
            <Map size={14} />
            DIRECTORY_MAP v1.0
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
            Sitemap
          </h1>
          <p className="text-gray-400 max-w-2xl">
            A comprehensive index of the ShopSmart by Ooru Logix digital infrastructure.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {sections.map((section, idx) => (
            <div key={idx} className="glass-panel border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-colors">
              <div className="flex items-center gap-3 mb-6">
                {section.icon}
                <h2 className="text-lg font-bold text-white uppercase tracking-widest text-sm">{section.title}</h2>
              </div>
              <ul className="space-y-4">
                {section.links.map((link, lIdx) => (
                  <li key={lIdx}>
                    <Link 
                      to={link.path} 
                      className="flex items-center justify-between group p-3 rounded-xl hover:bg-white/5 transition-all border border-transparent hover:border-white/5"
                    >
                      <div className="flex items-center gap-3 text-gray-300 group-hover:text-white transition-colors">
                        <span className="text-gray-500 group-hover:text-neon-cyan transition-colors">
                          {link.icon}
                        </span>
                        <span className="text-sm font-medium">{link.name}</span>
                      </div>
                      <ChevronRight size={14} className="text-gray-600 group-hover:text-neon-cyan group-hover:translate-x-1 transition-all" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 pt-8 border-t border-white/5 text-center">
          <p className="text-xs text-gray-500 font-mono uppercase tracking-widest">
            End of Directory • Ooru Logix Systems
          </p>
        </div>
      </div>
    </div>
  );
};

export default Sitemap;
