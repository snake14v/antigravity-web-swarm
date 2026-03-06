import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Grid, CreditCard, Menu, X, Info, Phone, FileText } from 'lucide-react';
import { PageRoute } from '../types';

const BottomNav: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { icon: Home, label: 'Home', path: PageRoute.HOME },
    { icon: Grid, label: 'Features', path: PageRoute.FEATURES },
    { icon: CreditCard, label: 'Pricing', path: PageRoute.PRICING },
  ];

  const menuItems = [
    { icon: Info, label: 'About Us', path: PageRoute.ABOUT },
    { icon: FileText, label: 'Manifesto', path: PageRoute.MANIFESTO },
    { icon: Info, label: 'Partners', path: PageRoute.PARTNERS },
    { icon: Phone, label: 'Contact', path: PageRoute.CONTACT },
  ];

  return (
    <>
      {/* Pop-up Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 bg-cyber-950/80 backdrop-blur-sm md:hidden flex items-end justify-center pb-24">
          <div className="bg-cyber-900 border border-white/10 rounded-3xl p-6 w-[90%] max-w-sm shadow-2xl animate-in slide-in-from-bottom-8">
            <div className="flex justify-between items-center mb-6 border-b border-white/10 pb-4">
              <h3 className="text-white font-bold text-lg">Menu</h3>
              <button onClick={() => setIsMenuOpen(false)} className="text-gray-400 hover:text-white">
                <X size={24} />
              </button>
            </div>
            <div className="space-y-2">
              {menuItems.map((item, idx) => (
                <Link
                  key={idx}
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center gap-4 text-gray-300 hover:text-white hover:bg-white/5 p-4 rounded-xl transition-colors"
                >
                  <item.icon size={20} className="text-neon-cyan" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Bottom Navigation Bar */}
      <div className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-sm z-50">
        <div className="glass-pill rounded-full px-6 py-3 flex justify-between items-center shadow-[0_10px_40px_rgba(0,0,0,0.5)] border border-white/10">
          {navItems.map((item, idx) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={idx}
                to={item.path}
                className={`flex flex-col items-center gap-1 transition-colors ${
                  isActive ? 'text-neon-cyan' : 'text-gray-400 hover:text-white'
                }`}
              >
                <item.icon size={20} className={isActive ? 'drop-shadow-[0_0_8px_rgba(6,182,212,0.8)]' : ''} />
                <span className="text-[10px] font-medium">{item.label}</span>
              </Link>
            );
          })}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`flex flex-col items-center gap-1 transition-colors ${
              isMenuOpen ? 'text-neon-cyan' : 'text-gray-400 hover:text-white'
            }`}
          >
            <Menu size={20} className={isMenuOpen ? 'drop-shadow-[0_0_8px_rgba(6,182,212,0.8)]' : ''} />
            <span className="text-[10px] font-medium">More</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default BottomNav;
