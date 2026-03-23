import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Mail, Linkedin, Twitter, Github } from 'lucide-react';
import { PageRoute } from '../types';

const Footer: React.FC = () => {
  return (
    <footer className="bg-cyber-950 border-t border-white/10 mt-auto relative z-20">
      <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          <div className="col-span-1 md:col-span-1">
            <h3 className="text-xl font-bold text-white mb-3 tracking-tighter">OORU<span className="text-garden-500">LOGIX</span></h3>
            <p className="text-gray-400 text-xs leading-relaxed mb-4">
              The Hyper-Local Data Intelligence & <strong>Premium Interiors</strong> Agency. <br/>
              Building the operating system for Bangalore's retail and design excellence.
            </p>
            <div className="flex space-x-3 text-gray-400">
                <a href="https://linkedin.com/company/oorulogix" target="_blank" rel="noopener noreferrer" className="hover:text-neon-cyan transition-colors"><Linkedin size={18}/></a>
                <a href="https://twitter.com/oorulogix" target="_blank" rel="noopener noreferrer" className="hover:text-neon-pink transition-colors"><Twitter size={18}/></a>
                <a href="https://github.com/oorulogix" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors"><Github size={18}/></a>
            </div>
          </div>

          <div>
            <h3 className="text-[10px] font-bold text-neon-cyan tracking-widest uppercase mb-4">Company</h3>
            <ul className="space-y-2 text-xs text-gray-400">
              <li><Link to="/careers" className="hover:text-white transition-colors">Careers</Link></li>
              <li><Link to="/manifesto" className="hover:text-white transition-colors">Manifesto</Link></li>
              <li><Link to="/press" className="hover:text-white transition-colors">Press & Media</Link></li>
              <li><Link to={PageRoute.PARTNERS} className="hover:text-white transition-colors">Our Partners</Link></li>
              <li><Link to="/sitemap" className="hover:text-white transition-colors">Sitemap</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-[10px] font-bold text-neon-purple tracking-widest uppercase mb-4">Legal</h3>
            <ul className="space-y-2 text-xs text-gray-400">
              <li><Link to="/legal" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link to="/legal" className="hover:text-white transition-colors">Terms of Service</Link></li>
              <li><Link to="/legal" className="hover:text-white transition-colors">DPDP Compliance</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-[10px] font-bold text-garden-400 tracking-widest uppercase mb-4">Active Coverage</h3>
            <div className="flex flex-wrap gap-2">
              {["JP Nagar", "Kothnur", "HSR", "Koramangala", "Indiranagar"].map(loc => (
                <span key={loc} className="text-[9px] px-2 py-0.5 border border-white/10 rounded-full text-gray-500 font-mono uppercase">{loc}</span>
              ))}
            </div>
          </div>
        </div>
        
        <div className="border-t border-white/5 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center gap-3">
            <p className="text-[10px] text-gray-600">
              © {new Date().getFullYear()} Ooru Logix. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
                <a 
                  href="https://wa.me/919591015279?text=Hi%20Ooru%20Logix%2C%20I%20need%20support%20with%20my%20node%20synchronization." 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 hover:text-white transition-all text-garden-400 group"
                >
                    <span className="text-[10px] font-mono font-bold tracking-widest border border-garden-500/30 px-2 py-0.5 rounded-md group-hover:bg-garden-500/10">WHATSAPP_SUPPORT</span>
                </a>
                <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                    <span className="text-[10px] text-gray-500 font-mono">SYSTEM STATUS: OPERATIONAL</span>
                </div>
            </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;