import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, Grid, CreditCard, Info, Share2, 
  Search, Rocket, Activity, Cpu, Globe, Zap,
  LogOut, LayoutDashboard, User
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { PageRoute } from '../types';
import { OoruLogixLogo } from './Logo';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const BottomNav: React.FC = () => {
  const location = useLocation();
  const [showMenu, setShowMenu] = useState(false);
  const { user, isAdmin, logout } = useAuth();

  const primaryItems = [
    { icon: OoruLogixLogo, label: 'Root', path: PageRoute.HOME, isLogo: true },
    { icon: Grid, label: 'Grid', path: PageRoute.FEATURES },
    { icon: Zap, label: 'Design', path: PageRoute.WEBSITE_DESIGN },
    { icon: Activity, label: 'Track', path: PageRoute.TRACK },
  ];

  const handleLogout = async () => {
    await logout();
    toast.success('System Disconnected');
    setShowMenu(false);
  };

  const menuItems = [
    { label: 'Partners', path: PageRoute.PARTNERS, icon: Share2, color: 'text-neon-cyan' },
    { label: 'Pricing', path: PageRoute.PRICING, icon: CreditCard, color: 'text-neon-amber' },
    { label: 'About', path: PageRoute.ABOUT, icon: Info, color: 'text-neon-purple' },
    isAdmin ? { label: 'Admin', path: PageRoute.DASHBOARD, icon: LayoutDashboard, color: 'text-neon-cyan' } : null,
    user 
      ? { label: 'Logout', path: '#', onClick: handleLogout, icon: LogOut, color: 'text-red-400' }
      : { label: 'Login', path: PageRoute.LOGIN, icon: Cpu, color: 'text-white' },
  ].filter(Boolean) as any[];

  return (
    <div className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 w-[94%] max-w-xl z-[60]">
      
      {/* Central Menu Overlay */}
      <AnimatePresence>
        {showMenu && (
          <motion.div 
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            className="absolute bottom-[110%] left-0 w-full grid grid-cols-2 gap-3 p-4 bg-cyber-900 border border-white/10 rounded-[2rem] shadow-[0_20px_60px_rgba(0,0,0,0.8)] glass-panel"
          >
            {menuItems.map((item) => (
              item.onClick ? (
                <button
                  key={item.label}
                  onClick={item.onClick}
                  className="flex items-center gap-3 p-4 rounded-2xl bg-white/5 border border-white/5 active:bg-white/10 text-left w-full"
                >
                  <item.icon className={item.color} size={18} />
                  <span className="text-[10px] font-mono tracking-widest text-white uppercase">{item.label}</span>
                </button>
              ) : (
                <Link
                  key={item.label}
                  to={item.path}
                  onClick={() => setShowMenu(false)}
                  className="flex items-center gap-3 p-4 rounded-2xl bg-white/5 border border-white/5 active:bg-white/10"
                >
                  <item.icon className={item.color} size={18} />
                  <span className="text-[10px] font-mono tracking-widest text-white uppercase">{item.label}</span>
                </Link>
              )
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="glass-pill rounded-full p-2 flex justify-between items-center shadow-[0_15px_40px_rgba(0,0,0,0.6)] border border-white/10 relative overflow-hidden backdrop-blur-2xl">
        
        {/* Nav Items */}
        <div className="flex-1 flex justify-around items-center px-4">
          {primaryItems.map((item, idx) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={idx}
                to={item.path}
                className={`flex flex-col items-center gap-1.5 transition-all duration-300 ${
                  isActive ? 'text-neon-cyan' : 'text-gray-500'
                }`}
              >
                <div className="relative">
                  {item.isLogo ? (
                    <item.icon 
                      className={`w-6 h-6 transition-all ${isActive ? 'drop-shadow-[0_0_8px_rgba(0,255,255,0.6)]' : ''}`} 
                      color={isActive ? "#00ffff" : "#6b7280"}
                    />
                  ) : (
                    <item.icon size={20} className={isActive ? 'drop-shadow-[0_0_8px_rgba(0,255,255,0.6)]' : ''} />
                  )}
                  {isActive && (
                    <motion.span 
                      layoutId="activeDot"
                      className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-neon-cyan rounded-full"
                    />
                  )}
                </div>
                <span className="text-[8px] font-mono font-bold tracking-[0.2em] uppercase opacity-70">
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>

        {/* Action Button - FAB style */}
        <button
          onClick={() => setShowMenu(!showMenu)}
          className={`relative w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg ${
            showMenu ? 'bg-neon-magenta rotate-45' : 'bg-white text-black'
          }`}
        >
          {showMenu ? <Grid size={24} className="text-white" /> : <Rocket size={24} />}
          <div className="absolute inset-0 rounded-full animate-ping bg-white/20 -z-10"></div>
        </button>

      </div>
    </div>
  );
};

export default BottomNav;
