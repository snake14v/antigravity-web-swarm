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
            <h3 className="text-xl font-bold text-white mb-3 tracking-tighter">SHOPSMART<span className="text-garden-500">LOGIX</span></h3>
            <p className="text-gray-400 text-xs leading-relaxed mb-4">
              The Hyper-Local Data Intelligence Agency. <br/>
              Building the operating system for the next 100 years of Bangalore's commercial life.
            </p>
            <div className="flex space-x-3 text-gray-400">
                <a href="#" className="hover:text-neon-cyan transition-colors"><Linkedin size={18}/></a>
                <a href="#" className="hover:text-neon-pink transition-colors"><Twitter size={18}/></a>
                <a href="#" className="hover:text-white transition-colors"><Github size={18}/></a>
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
            <h3 className="text-[10px] font-bold text-garden-400 tracking-widest uppercase mb-4">Operational HQ</h3>
            <div className="flex items-start space-x-2 text-gray-400 text-xs mb-2">
              <MapPin size={14} className="mt-0.5 flex-shrink-0 text-garden-500" />
              <p>Green Glen Layout,<br/>Bellandur, Bangalore 560103</p>
            </div>
            <div className="flex items-center space-x-2 text-gray-400 text-xs">
              <Mail size={14} className="text-garden-500" />
              <a href="mailto:hello@oorulogix.com" className="hover:text-white transition-colors">hello@oorulogix.com</a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-white/5 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center gap-3">
            <p className="text-[10px] text-gray-600">
              © {new Date().getFullYear()} Ooru Logix. All rights reserved.
            </p>
            <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                <span className="text-[10px] text-gray-500 font-mono">SYSTEM STATUS: OPERATIONAL</span>
            </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;