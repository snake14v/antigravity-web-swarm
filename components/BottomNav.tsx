import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Grid, CreditCard, Info, FileText, Share2 } from 'lucide-react';
import { PageRoute } from '../types';
import { OoruLogixLogo } from './Logo';

const BottomNav: React.FC = () => {
  const location = useLocation();

  const navItems = [
    { icon: OoruLogixLogo, label: 'Home', path: PageRoute.HOME, isLogo: true },
    { icon: Grid, label: 'Features', path: PageRoute.FEATURES },
    { icon: CreditCard, label: 'Pricing', path: PageRoute.PRICING },
    { icon: Info, label: 'About', path: PageRoute.ABOUT },
    { icon: Share2, label: 'Partners', path: PageRoute.PARTNERS },
    { icon: FileText, label: 'Manifesto', path: PageRoute.MANIFESTO },
  ];

  return (
    <div className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 w-[95%] max-w-lg z-50">
      <div className="glass-pill rounded-full px-4 py-3 flex justify-between items-center shadow-[0_10px_40px_rgba(0,0,0,0.5)] border border-white/10">
        {navItems.map((item, idx) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={idx}
              to={item.path}
              className={`flex flex-col items-center gap-1.5 transition-all duration-300 flex-1 ${
                isActive ? 'text-neon-cyan scale-110' : 'text-gray-400 hover:text-white'
              }`}
            >
              <div className="relative">
                {item.isLogo ? (
                  <item.icon 
                    className={`w-6 h-6 transition-all ${isActive ? 'drop-shadow-[0_0_8px_rgba(6,182,212,0.8)]' : ''}`} 
                    color={isActive ? "#00ffff" : "#9ca3af"}
                  />
                ) : (
                  <item.icon size={20} className={isActive ? 'drop-shadow-[0_0_8px_rgba(6,182,212,0.8)]' : ''} />
                )}
                {isActive && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-neon-cyan rounded-full"></span>
                )}
              </div>
              <span className={`text-[9px] font-bold tracking-tighter uppercase transition-opacity ${isActive ? 'opacity-100' : 'opacity-70'}`}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNav;
