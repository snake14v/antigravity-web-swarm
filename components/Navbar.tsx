import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LogIn, LogOut, LayoutDashboard, User } from 'lucide-react';
import toast from 'react-hot-toast';
import { PageRoute } from '../types';
import Logo from './Logo';
import { useAuth } from '../context/AuthContext';
import { auth, signOut } from '../services/firebase';

const Navbar: React.FC = () => {
  const [activeSection, setActiveSection] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAdmin } = useAuth();

  // Scroll Spy Logic
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['features', 'manifesto', 'pricing'];
      const scrollPosition = window.scrollY + 150; // Offset

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
      await signOut(auth);
      toast.success('Logged out successfully');
      navigate(PageRoute.HOME);
    } catch (err) {
      console.error('Logout error:', err);
      toast.error('Failed to log out');
    }
  };

  const navLinks = [
    { name: 'Features', id: PageRoute.FEATURES, type: 'route' },
    { name: 'Manifesto', id: 'manifesto', type: 'hash' },
    { name: 'Pricing', id: 'pricing', type: 'hash' },
    { name: 'About Us', id: PageRoute.ABOUT, type: 'route' },
    { name: 'Partners', id: PageRoute.PARTNERS, type: 'route' },
    { name: 'Track Status', id: PageRoute.TRACK, type: 'route' },
  ];

  return (
    <>
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 w-[92%] max-w-6xl z-50 transition-all duration-300 rounded-full hidden md:block">
        <div className="glass-pill px-6 py-3 transition-all duration-300 rounded-full">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" onClick={() => window.scrollTo(0,0)} className="flex items-center gap-2 group">
               <Logo className="h-8 w-auto" />
            </Link>
            
            {/* Desktop Links */}
            <div className="hidden md:flex items-center space-x-1">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => handleNavClick(link)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    (link.type === 'hash' && activeSection === link.id) || (link.type === 'route' && location.pathname === link.id)
                      ? 'text-white bg-white/10'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {link.name}
                </button>
              ))}
              
              {isAdmin && (
                <Link
                  to={PageRoute.DASHBOARD}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${
                    location.pathname === PageRoute.DASHBOARD
                      ? 'text-neon-cyan bg-neon-cyan/10'
                      : 'text-gray-400 hover:text-neon-cyan hover:bg-neon-cyan/5'
                  }`}
                >
                  <LayoutDashboard size={14} />
                  ATS
                </Link>
              )}
            </div>

            {/* Auth & CTA */}
            <div className="hidden md:flex items-center gap-4">
              {user ? (
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-gray-300">
                    <User size={14} className="text-neon-purple" />
                    <span className="max-w-[100px] truncate">{user.email}</span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="p-2 rounded-full bg-white/5 border border-white/10 text-gray-400 hover:text-red-400 hover:bg-red-400/10 transition-all"
                    title="Logout"
                  >
                    <LogOut size={18} />
                  </button>
                </div>
              ) : (
                <Link
                  to={PageRoute.LOGIN}
                  className="text-gray-400 hover:text-white text-sm font-medium px-4 py-2 flex items-center gap-2"
                >
                  <LogIn size={18} />
                  Login
                </Link>
              )}
              
              <Link
                to={PageRoute.CONTACT}
                className="bg-white text-black hover:bg-garden-400 transition-colors px-5 py-2 rounded-full text-sm font-bold flex items-center gap-2"
              >
                Register Interest
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;