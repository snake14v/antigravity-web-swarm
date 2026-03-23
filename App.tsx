import React, { useEffect, Suspense, lazy } from 'react';
import { HashRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import BottomNav from './components/BottomNav';
import Footer from './components/Footer';
import { PageRoute } from './types';
import { AuthProvider, useAuth } from './context/AuthContext';
import { HardwareBridgeProvider } from './context/HardwareBridgeContext';
import CustomCursor from './components/CustomCursor';

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
const DynamicPricing = lazy(() => import('./pages/DynamicPricing'));
const LanguageBridge = lazy(() => import('./pages/LanguageBridge'));
const WebsiteDesign = lazy(() => import('./pages/WebsiteDesign'));
const Surveillance = lazy(() => import('./pages/Surveillance'));
const HomeAutomation = lazy(() => import('./pages/HomeAutomation'));

const RandomLoader = lazy(() => import('./components/RandomLoader'));

// Loading Fallback with Randomized Themes
const PageLoader = () => (
  <Suspense fallback={<div className="min-h-screen bg-cyber-950" />}>
    <RandomLoader />
  </Suspense>
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
    return <PageLoader />;
  }

  const location = useLocation();
  if (!user) {
    return <Navigate to={PageRoute.LOGIN} state={{ from: location }} replace />;
  }

  if (adminOnly && !isAdmin) {
    return <Navigate to={PageRoute.HOME} />;
  }

  return <>{children}</>;
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <HardwareBridgeProvider>
        <Router>
        <div className="flex flex-col min-h-screen bg-cyber-900 text-gray-100 pb-20 md:pb-0">
          <ScrollToTop />
          <HashScroll />
          <CustomCursor />
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
                <Route 
                  path={PageRoute.TRACK} 
                  element={
                    <ProtectedRoute>
                      <UserConsole />
                    </ProtectedRoute>
                  } 
                />
                <Route path={PageRoute.DYNAMIC_PRICING} element={<DynamicPricing />} />
                <Route path={PageRoute.LANGUAGE_BRIDGE} element={<LanguageBridge />} />
                <Route path={PageRoute.WEBSITE_DESIGN} element={<WebsiteDesign />} />
                <Route path={PageRoute.SURVEILLANCE} element={<Surveillance />} />
                <Route path={PageRoute.HOME_AUTOMATION} element={<HomeAutomation />} />
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
      </HardwareBridgeProvider>
    </AuthProvider>
  );
};

export default App;
