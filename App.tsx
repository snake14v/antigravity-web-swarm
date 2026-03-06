import React, { useEffect, Suspense, lazy } from 'react';
import { HashRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import BottomNav from './components/BottomNav';
import Footer from './components/Footer';
import { PageRoute } from './types';
import { AuthProvider, useAuth } from './context/AuthContext';

// Lazy load pages
const Home = lazy(() => import('./pages/Home'));
const Contact = lazy(() => import('./pages/Contact'));
const Careers = lazy(() => import('./pages/Careers'));
const Legal = lazy(() => import('./pages/Legal'));
const Press = lazy(() => import('./pages/Press'));
const Manifesto = lazy(() => import('./pages/Manifesto'));
const Pricing = lazy(() => import('./pages/Pricing'));
const Sitemap = lazy(() => import('./pages/Sitemap'));
const InventoryLogic = lazy(() => import('./pages/InventoryLogic'));
const Login = lazy(() => import('./pages/Login'));
const Signup = lazy(() => import('./pages/Signup'));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));
const AboutUs = lazy(() => import('./pages/AboutUs'));
const Features = lazy(() => import('./pages/Features'));
const Partners = lazy(() => import('./pages/Partners'));
const UserConsole = lazy(() => import('./pages/UserConsole'));

// Loading Fallback with Skeleton
const PageLoader = () => (
  <div className="min-h-screen bg-cyber-950 flex flex-col pt-24 px-4 sm:px-6 lg:px-8">
    <div className="max-w-4xl mx-auto w-full flex flex-col items-center">
      <div className="w-48 h-12 bg-white/5 rounded-full animate-pulse mb-8" />
      <div className="w-full h-8 bg-white/5 rounded-lg animate-pulse mb-4" />
      <div className="w-3/4 h-8 bg-white/5 rounded-lg animate-pulse mb-12" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
        <div className="h-64 bg-white/5 rounded-2xl animate-pulse" />
        <div className="h-64 bg-white/5 rounded-2xl animate-pulse" />
      </div>
    </div>
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
      <div className="w-8 h-8 border-2 border-neon-cyan border-t-transparent rounded-full animate-spin" />
      <p className="text-neon-cyan font-mono text-[10px] tracking-widest animate-pulse uppercase">Syncing_Nodes...</p>
    </div>
  </div>
);

const ScrollToTop = () => {
  const { pathname, hash } = useLocation();
  
  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);
  
  return null;
};

const HashScroll = () => {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [hash]);

  return null;
}

const ProtectedRoute: React.FC<{ children: React.ReactNode; adminOnly?: boolean }> = ({ children, adminOnly }) => {
  const { user, loading, isAdmin } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-cyber-950 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-neon-cyan border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to={PageRoute.LOGIN} />;
  }

  if (adminOnly && !isAdmin) {
    return <Navigate to={PageRoute.HOME} />;
  }

  return <>{children}</>;
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen bg-cyber-900 text-gray-100 pb-20 md:pb-0">
          <ScrollToTop />
          <HashScroll />
          <Toaster 
            position="top-right"
            toastOptions={{
              style: {
                background: '#0a0a0a',
                color: '#fff',
                border: '1px solid rgba(255,255,255,0.1)',
              },
              success: {
                iconTheme: {
                  primary: '#06b6d4',
                  secondary: '#0a0a0a',
                },
              },
            }}
          />
          <Navbar />
          <main className="flex-grow">
            <Suspense fallback={<PageLoader />}>
              <Routes>
                <Route path={PageRoute.HOME} element={<Home />} />
                <Route path={PageRoute.FEATURES} element={<Features />} />
                <Route path={PageRoute.CONTACT} element={<Contact />} />
                <Route path={PageRoute.CAREERS} element={<Careers />} />
                <Route path={PageRoute.LEGAL} element={<Legal />} />
                <Route path={PageRoute.PRESS} element={<Press />} />
                <Route path={PageRoute.MANIFESTO} element={<Manifesto />} />
                <Route path={PageRoute.PRICING} element={<Pricing />} />
                <Route path={PageRoute.SITEMAP} element={<Sitemap />} />
                <Route path={PageRoute.INVENTORY_LOGIC} element={<InventoryLogic />} />
                <Route path={PageRoute.LOGIN} element={<Login />} />
                <Route path={PageRoute.SIGNUP} element={<Signup />} />
                <Route path={PageRoute.ABOUT} element={<AboutUs />} />
                <Route path={PageRoute.PARTNERS} element={<Partners />} />
                <Route path={PageRoute.TRACK} element={<UserConsole />} />
                <Route 
                  path={PageRoute.DASHBOARD} 
                  element={
                    <ProtectedRoute adminOnly>
                      <AdminDashboard />
                    </ProtectedRoute>
                  } 
                />
              </Routes>
            </Suspense>
          </main>
          <Footer />
          <BottomNav />
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
