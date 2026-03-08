import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LogIn, LogOut, LayoutDashboard, User, Search, 
  Terminal, Globe, Zap, Menu, X, ArrowUpRight,
  Command, Cpu, Activity
} from 'lucide-react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import toast from 'react-hot-toast';
import { PageRoute } from '../types';
import Logo from './Logo';
import { useAuth } from '../context/AuthContext';

const Navbar: React.FC = () => {
  const [activeSection, setActiveSection] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAdmin, logout } = useAuth();
  const { scrollY } = useScroll();

  const navOpacity = useTransform(scrollY, [0, 50], [0, 1]);
  const navBlur = useTransform(scrollY, [0, 50], [0, 20]);
  const navY = useTransform(scrollY, [0, 50], [0, -10]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      const sections = ['features', 'manifesto', 'pricing'];
      const scrollPosition = window.scrollY + 150;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element && element.offsetTop <= scrollPosition && (element.offsetTop + element.offsetHeight) > scrollPosition) {
          setActiveSection(section);
          return;
        }
      }
      setActiveSection('');
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (link: { id: string, type: string }) => {
    if (link.type === 'route') {
      navigate(link.id);
    } else {
      if (location.pathname !== '/') {
        navigate('/#' + link.id);
      } else {
        const element = document.getElementById(link.id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      toast.success('Logged out successfully');
      navigate(PageRoute.HOME);
    } catch (err) {
      console.error('Logout error:', err);
      toast.error('Failed to log out');
    }
  };

  const navLinks = [
    { name: 'Features', id: PageRoute.FEATURES, type: 'route' },
    { name: 'Web Design', id: PageRoute.WEBSITE_DESIGN, type: 'route' },
    { name: 'Pricing', id: PageRoute.PRICING, type: 'route' },
    { name: 'Partners', id: PageRoute.PARTNERS, type: 'route' },
    { name: 'Track', id: PageRoute.TRACK, type: 'route' },
    { name: 'About', id: PageRoute.ABOUT, type: 'route' },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-50 px-4 py-6 pointer-events-none hidden md:block">
      <motion.nav 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        style={{ 
          backdropFilter: `blur(${isScrolled ? '20px' : '0px'})`,
          backgroundColor: isScrolled ? 'rgba(2, 6, 23, 0.7)' : 'transparent',
          borderColor: isScrolled ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
        }}
        className={`pointer-events-auto max-w-7xl mx-auto flex items-center justify-between px-6 py-3 rounded-full border transition-all duration-500 ${isScrolled ? 'shadow-[0_20px_50px_rgba(0,0,0,0.5)]' : ''}`}
      >
        {/* Logo Section */}
        <div className="flex items-center gap-8">
          <Link to="/" onClick={() => window.scrollTo(0,0)} className="relative z-10">
            <Logo className="h-8 sm:h-9 w-auto" />
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-1 relative">
            {navLinks.map((link, idx) => {
              const isActive = (link.type === 'hash' && activeSection === link.id) || (link.type === 'route' && location.pathname === link.id);
              return (
                <button
                  key={link.name}
                  onMouseEnter={() => setHoveredIdx(idx)}
                  onMouseLeave={() => setHoveredIdx(null)}
                  onClick={() => handleNavClick(link)}
                  className={`relative px-4 py-2 rounded-full text-xs font-mono tracking-widest uppercase transition-colors duration-300 ${isActive ? 'text-neon-cyan' : 'text-gray-400 hover:text-white'}`}
                >
                  {isActive && (
                    <motion.div 
                      layoutId="navActive"
                      className="absolute inset-0 bg-white/5 border border-white/10 rounded-full -z-10"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  {hoveredIdx === idx && !isActive && (
                    <motion.div 
                      layoutId="navHover"
                      className="absolute inset-0 bg-white/5 rounded-full -z-10"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  {link.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* Action Section */}
        <div className="flex items-center gap-3">
          {/* Status Indicator - Desktop Only */}
          <div className="hidden xl:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-cyber-900/50 border border-white/5 font-mono text-[9px] text-gray-500">
             <span className="flex h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse"></span>
             SYSTEM_LIVE: 99.9%
          </div>

          <div className="hidden md:flex items-center gap-2">
            {user ? (
              <div className="flex items-center gap-2 pr-2 border-r border-white/10 mr-2">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-neon-purple/5 border border-neon-purple/20 text-[10px] font-mono text-gray-300">
                  <User size={12} className="text-neon-purple" />
                  <span className="max-w-[80px] truncate">{user.email?.split('@')[0]}</span>
                </div>
                {isAdmin && (
                  <Link to={PageRoute.DASHBOARD} className="p-2 rounded-full hover:bg-neon-cyan/10 text-neon-cyan transition-colors" title="Admin Terminal">
                    <Terminal size={18} />
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className="p-2 rounded-full hover:bg-red-500/10 text-gray-500 hover:text-red-500 transition-all"
                  title="Disconnect"
                >
                  <LogOut size={16} />
                </button>
              </div>
            ) : (
              <Link
                to={PageRoute.LOGIN}
                className="flex items-center gap-2 px-4 py-2 text-xs font-mono tracking-widest text-gray-400 hover:text-white transition-colors"
              >
                <LogIn size={14} /> LOGIN
              </Link>
            )}

            <Link
              to={PageRoute.CONTACT}
              className="relative group overflow-hidden px-6 py-2.5 bg-white text-black rounded-full font-black text-[10px] tracking-[0.2em] uppercase transition-all hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(255,255,255,0.2)]"
            >
              <span className="relative z-10 flex items-center gap-2">
                SYNC_NODE <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-neon-cyan group-hover:opacity-10 transition-opacity"></div>
            </Link>
          </div>
          
          {/* Mobile Menu Button - though we have BottomNav, this can be extra or for specialized tools */}
          <button className="md:hidden p-2 text-gray-400 hover:text-white transition-colors">
            <Menu size={24} />
          </button>
        </div>
      </motion.nav>

      {/* Breadcrumb Context Bar - Shown on scroll */}
      <AnimatePresence>
        {isScrolled && (
          <motion.div 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            className="pointer-events-auto max-w-fit mx-auto mt-4 px-4 py-1.5 bg-cyber-900/80 border border-white/10 rounded-full flex items-center gap-3 shadow-xl hidden md:flex"
          >
             <div className="flex items-center gap-1.5 font-mono text-[9px] text-gray-500 tracking-widest uppercase">
                <Globe size={10} className="text-neon-cyan" /> 
                Bangalore
             </div>
             <div className="w-1 h-1 rounded-full bg-white/20"></div>
             <div className="font-mono text-[9px] text-neon-cyan tracking-widest uppercase">
                {location.pathname === '/' ? 'RootNode' : location.pathname.replace('/', '').replace('-', '_')}
             </div>
             {activeSection && (
               <>
                 <div className="w-1 h-1 rounded-full bg-white/20"></div>
                 <div className="font-mono text-[9px] text-white tracking-widest uppercase">
                   #{activeSection}
                 </div>
               </>
             )}
          </motion.div>
        )}
      </AnimatePresence>

    </header>
  );
};

export default Navbar;