import React, { Suspense, lazy, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Activity, ShieldCheck, Zap, CloudLightning, Map, Lock, Database, Cpu, Wifi } from 'lucide-react';
import { PageRoute } from '../types';
import IntroScreen from '../components/IntroScreen';
import Logo, { OoruLogixLogo } from '../components/Logo';
import VividOrbs from '../components/VividOrbs';
import PixelText from '../components/PixelText';
import { SwarmAgentConcept } from '../components/SwarmAgentConcept';
import BlackboxTerminal from '../components/BlackboxTerminal';

const FeaturesSection = lazy(() => import('../components/FeaturesSection'));
const ManifestoSection = lazy(() => import('../components/ManifestoSection'));
const PricingSection = lazy(() => import('../components/PricingSection'));

import Skeleton from '../components/Skeleton';

const SectionSkeleton = () => (
  <div className="w-full py-16 px-4">
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-64 bg-white/5 border border-white/10 rounded-2xl relative overflow-hidden">
            <Skeleton variant="rect" className="absolute inset-0" />
            <div className="absolute bottom-0 left-0 p-6 w-full space-y-4">
              <Skeleton variant="text" width="60%" height="24px" />
              <Skeleton variant="text" width="90%" height="16px" />
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const Home: React.FC = () => {
  const [showIntro, setShowIntro] = useState(true);
  const [animateHero, setAnimateHero] = useState(false);
  const [globalFlip, setGlobalFlip] = useState(false);

  useEffect(() => {
    // If the intro finishes, trigger the hero animations
    if (!showIntro) {
      setTimeout(() => setAnimateHero(true), 100); // Slight delay for smoothness
    }
  }, [showIntro]);

  useEffect(() => {
    if (!animateHero) return;
    
    // Initial state after assembly
    setGlobalFlip(true);

    const interval = setInterval(() => {
      setGlobalFlip(prev => !prev);
    }, 4000);
    
    return () => clearInterval(interval);
  }, [animateHero]);

  return (
    <div className="flex flex-col min-h-screen relative bg-cyber-950 overflow-hidden">
      
      {showIntro && (
        <IntroScreen onComplete={() => setShowIntro(false)} />
      )}
      
      {/* Dynamic Vivid Background - Defer until hero ready */}
      <div className={`fixed inset-0 z-[-10] pointer-events-none transition-all duration-1000 ${animateHero ? 'opacity-100' : 'opacity-0'}`}>
        {animateHero && <VividOrbs />}
        <div className={`absolute inset-0 cyber-grid transition-all duration-[1500ms] ${animateHero ? 'opacity-30 scale-100 translate-y-0' : 'opacity-0 scale-110 -translate-y-[100px]'}`}></div>
      </div>

      {/* Hero Section - Assembling Tech Components */}
      <section className={`relative pt-24 pb-16 overflow-hidden z-10 flex flex-col justify-center min-h-[85vh]`}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
          
          {/* Logo drops in from top */}
          <div className={`mb-8 transform transition-all duration-[1000ms] ease-[cubic-bezier(0.25,0.8,0.25,1)] delay-100 ${animateHero ? 'translate-y-0 opacity-100 scale-100' : '-translate-y-40 opacity-0 scale-150'}`}>
            <Logo className="h-16 md:h-20 w-auto" />
          </div>

          <div className={`inline-flex items-center gap-3 px-4 py-2 rounded-full border border-white/10 bg-white/5 text-gray-200 text-xs font-mono mb-8 backdrop-blur-md shadow-lg shadow-garden-500/10 transform transition-all duration-[800ms] ease-out delay-300 ${animateHero ? 'translate-y-0 opacity-100' : '-translate-y-20 opacity-0'}`}>
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-garden-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-garden-500" />
            </span>
            <span className="tracking-widest">BANGALORE GRID: <span className="text-garden-400 font-bold">ONLINE</span></span>
            <span className="text-gray-500 hidden sm:inline">|</span>
            <span className="text-gray-400 hidden sm:inline">NODES: 1,402 ACTIVE</span>
          </div>
          
          {/* Main Headline - Dot Matrix Pixel Assembly in Pitch Black Pill */}
          <div className={`flex flex-col md:block items-center justify-center mb-6 sm:mb-10 transform transition-all duration-[900ms] ease-[cubic-bezier(0.25,0.8,0.25,1)] delay-300 ${animateHero ? 'translate-x-0 opacity-100 blur-none' : '-translate-x-[100vw] opacity-0 blur-md'}`}>
            <div className="flex justify-center w-full mb-4 sm:mb-6 px-4">
              <div className="relative group">
                {/* Pitch Black Pill Background - Scaled for Mobile */}
                <div className="absolute -inset-x-4 sm:-inset-x-8 -inset-y-3 sm:-inset-y-4 bg-black rounded-full border border-white/10 shadow-[0_0_40px_rgba(0,0,0,0.8)] z-0 overflow-hidden">
                  {/* Internal Sparkles / Starfield */}
                  <div className="absolute inset-0 opacity-30">
                    {[...Array(6)].map((_, i) => (
                      <div 
                        key={i}
                        className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
                        style={{
                          top: `${Math.random() * 100}%`,
                          left: `${Math.random() * 100}%`,
                          animationDelay: `${i * 0.5}s`,
                          boxShadow: '0 0 5px #fff'
                        }}
                      />
                    ))}
                  </div>
                </div>

                {/* PixelText inside the pill - Scaled down for mobile */}
                <div className="relative z-10 px-1 sm:px-4 flex justify-center overflow-hidden">
                  <PixelText 
                    text="ShopSmart" 
                    triggerAnimation={animateHero} 
                    pixelSize="w-1 h-1 sm:w-2 sm:h-2 md:w-3 md:h-3 lg:w-4 lg:h-4 lg:w-5 lg:h-5" 
                    gap="gap-[1px] sm:gap-0.5 md:gap-1" 
                    externalFlip={globalFlip}
                  />
                </div>

                {/* Floating SVG Sparkles - hidden on smallest screens to save space */}
                <div className="absolute -top-6 -right-6 w-6 h-6 sm:w-8 sm:h-8 text-yellow-400 animate-bounce opacity-80 hidden xs:block">
                  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l1.5 6h6l-5 4 2 7-4.5-5-4.5 5 2-7-5-4h6z"/></svg>
                </div>
                <div className="absolute -bottom-4 -left-6 w-5 h-5 sm:w-6 sm:h-6 text-cyan-400 animate-pulse opacity-60 hidden xs:block">
                   <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l1.5 6h6l-5 4 2 7-4.5-5-4.5 5 2-7-5-4h6z"/></svg>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center justify-center sm:inline-flex mt-4 sm:mt-6 md:mt-0 gap-3 sm:gap-0">
               <span className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl text-gray-300 font-light sm:mr-4 align-middle">by</span>
               
               {/* Carbon Fiber / PCB Theme Assembly for Ooru Logix */}
               <div className="inline-flex relative items-center justify-center align-middle h-14 sm:h-16">
                 <div className={`flex items-center justify-center gap-3 sm:gap-4 transform transition-all duration-[800ms] ease-[cubic-bezier(0.175,0.885,0.32,1.275)] delay-[800ms] ${animateHero ? 'scale-100 opacity-100 filter-none translate-x-0' : 'scale-90 opacity-0 blur-xl translate-x-[50px]'} bg-black border border-gray-800 rounded-lg px-3 sm:px-5 py-2 sm:py-2.5 shadow-[0_0_30px_rgba(0,0,0,0.9)] relative overflow-hidden group max-w-[90vw]`}>
                    
                    {/* Background patterns and SVG icons omitted for brevity, keeping same logic */}
                    <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#333_1px,transparent_1px)] [background-size:4px_4px] mix-blend-overlay"></div>
                    <div className="absolute inset-0 opacity-20 bg-[linear-gradient(45deg,#111_25%,transparent_25%,transparent_75%,#111_75%,#111),linear-gradient(45deg,#111_25%,transparent_25%,transparent_75%,#111_75%,#111)] [background-size:10px_10px] [background-position:0_0,5px_5px]"></div>
                    
                    <div className="absolute top-0 right-0 w-12 h-12 sm:w-16 sm:h-16 opacity-30 pointer-events-none">
                      <svg viewBox="0 0 100 100" fill="none" stroke="#4ade80" strokeWidth="1">
                         <path d="M100 20 L80 20 L70 30 L70 50" />
                         <circle cx="70" cy="50" r="3" fill="#4ade80"/>
                         <path d="M100 40 L90 40 L80 50 L80 80" />
                         <circle cx="80" cy="80" r="3" fill="#4ade80"/>
                      </svg>
                    </div>

                    <div className={`relative z-10 hidden xs:flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8 transition-all duration-1000 delay-[1000ms] ${animateHero ? 'opacity-100' : 'opacity-0'}`}>
                       <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-[0_0_5px_rgba(255,255,255,0.3)]">
                         <path d="M50 10 L50 90" stroke="white" strokeWidth="2" />
                         <path d="M30 40 L50 40 M35 30 L50 30 M40 20 L50 20 M25 50 L50 50 M20 60 L50 60 M15 70 L50 70 M10 80 L50 80" stroke="white" strokeWidth="2" strokeLinecap="square" />
                         <path d="M30 40 L40 30 M25 50 L35 40 M20 60 L30 50 M15 70 L25 60 M10 80 L20 70" stroke="white" strokeWidth="2" />
                         <path d="M50 50 L65 35 L75 35 M65 35 L65 20 M50 60 L70 60 L80 50 M50 70 L60 80 L70 80 M60 80 L60 95" stroke="#4ade80" strokeWidth="2" strokeLinejoin="round" />
                         <circle cx="75" cy="35" r="3" fill="#4ade80" />
                         <circle cx="65" cy="20" r="3" fill="#4ade80" />
                         <circle cx="80" cy="50" r="3" fill="#4ade80" />
                         <circle cx="70" cy="80" r="3" fill="#4ade80" />
                         <circle cx="60" cy="95" r="3" fill="#4ade80" />
                       </svg>
                    </div>
                    
                    {/* Alternating Flip for Ooru Logix (Inverted from ShopSmart) */}
                    <div className="font-mono text-lg sm:text-2xl md:text-3xl font-bold tracking-tight relative z-10 flex items-center shrink-0">
                      <PixelText 
                        text="Ooru" 
                        triggerAnimation={animateHero} 
                        pixelSize="w-[1px] h-[1px] xs:w-1 xs:h-1 sm:w-1.5 sm:h-1.5 md:w-2 md:h-2"
                        gap="gap-[1px]"
                        className="mr-1 sm:mr-2"
                        externalFlip={!globalFlip}
                      />
                      <span className="text-gray-500 mx-1 sm:mx-2 animate-pulse">_</span>
                      <PixelText 
                        text="Logix" 
                        triggerAnimation={animateHero} 
                        pixelSize="w-[1px] h-[1px] xs:w-1 xs:h-1 sm:w-1.5 sm:h-1.5 md:w-2 md:h-2"
                        gap="gap-[1px]"
                        className="ml-1 sm:ml-2"
                        externalFlip={!globalFlip}
                      />
                    </div>
                 </div>
               </div>
            </div>
          </div>
          
          {/* Expanded Subtext - Slides in aggressively from right */}
          <div className={`space-y-4 sm:space-y-6 mb-8 sm:mb-12 transform transition-all duration-[900ms] ease-[cubic-bezier(0.25,0.8,0.25,1)] delay-500 ${animateHero ? 'translate-x-0 opacity-100 blur-none' : 'translate-x-[100vw] opacity-0 blur-xl'}`}>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-200 leading-relaxed font-light max-w-3xl mx-auto px-2">
              From the chaotic traffic of <strong>Silk Board</strong> to the bustling breweries of <strong>Indiranagar</strong>, we digitize the pulse of the city. 
            </p>
            <p className="text-sm sm:text-base md:text-lg text-gray-400 leading-relaxed max-w-2xl mx-auto px-4">
              Ooru Logix creates a unified data mesh for Bangalore's 12 million residents. We turn hyper-local variables into precise, real-time operational directives.
            </p>
            <p className={`text-[10px] sm:text-xs md:text-sm text-gray-500 font-mono bg-white/5 inline-block px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg border border-white/10 transform transition-all duration-[800ms] delay-[900ms] ${animateHero ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-50 translate-y-10'}`}>
              COVERAGE: KORAMANGALA • WHITEFIELD • JAYANAGAR • HSR LAYOUT
            </p>
          </div>
          
          {/* CTA Buttons - Rocket up from bottom */}
          <div className={`flex flex-col sm:flex-row justify-center gap-4 transform transition-all duration-[800ms] ease-out delay-[700ms] w-full sm:w-auto px-6 sm:px-0 ${animateHero ? 'translate-y-0 opacity-100' : 'translate-y-[200px] opacity-0'}`}>
            <Link
              to={PageRoute.CONTACT}
              className="bg-white text-black hover:bg-neon-cyan hover:text-black hover:scale-105 px-6 sm:px-8 py-3 sm:py-4 rounded-full font-bold text-sm sm:text-base transition-all flex items-center justify-center gap-2 group shadow-[0_0_25px_rgba(0,255,255,0.4)] w-full sm:w-auto overflow-hidden relative"
              aria-label="Start City Audit - Navigate to Contact Page"
              role="button"
            >
              <span className="relative z-10 flex items-center gap-2">Start City Audit <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" aria-hidden="true" /></span>
              <div className="absolute inset-0 bg-gradient-to-r from-neon-cyan to-white opacity-0 group-hover:opacity-20 transition-opacity" aria-hidden="true"></div>
            </Link>
            <button
              onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-white/5 hover:bg-white/10 border border-neon-purple/50 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-sm sm:text-base transition-colors backdrop-blur-sm flex items-center justify-center gap-2 w-full sm:w-auto shadow-[0_0_15px_rgba(188,19,254,0.2)]"
              aria-label="View System Architecture Features"
            >
              <Cpu size={18} className="text-neon-purple" aria-hidden="true" /> View Architecture
            </button>
          </div>

        </div>

        {/* Repeating Features Pattern Bar */}
        <div className="absolute bottom-10 left-0 w-full overflow-hidden opacity-30 group">
          <div className="flex animate-marquee gap-8 whitespace-nowrap">
            {[...Array(10)].map((_, i) => (
              <Link 
                key={i}
                to={PageRoute.FEATURES} 
                className="inline-flex items-center gap-2 font-mono text-[10px] text-gray-400 hover:text-white transition-colors"
              >
                <Zap size={10} className="text-neon-cyan" /> 
                ACCESS_FULL_SYSTEM_LOGS &gt; 
              </Link>
            ))}
          </div>
        </div>

        {/* Decorative Code/Data Elements to Fill Space - Slide in from sides - hidden on tablet/mobile */}
        <div className={`absolute left-8 top-1/3 hidden xl:block text-left opacity-30 pointer-events-none transform transition-all duration-1000 ease-out delay-[800ms] ${animateHero ? 'translate-x-0' : '-translate-x-[200px]'}`}>
           <BlackboxTerminal type="optimization" title="OPTIMIZATION_NODE_01" className="w-64" />
           <div className="font-mono text-[10px] text-neon-pink space-y-1 mt-4">
              <p className="animate-pulse">Network_Latency: 12ms</p>
              <p>Region: Asia-South1</p>
              <p>Zone: KA-BLR-01</p>
              <p>Encryption: AES-256</p>
           </div>
        </div>
        <div className={`absolute right-8 bottom-1/3 hidden lg:block text-right opacity-30 pointer-events-none transform transition-all duration-1000 ease-out delay-[800ms] ${animateHero ? 'translate-x-0' : 'translate-x-[200px]'}`}>
           <div className="font-mono text-[10px] text-neon-cyan space-y-1">
              <p>Ingesting: Traffic_API</p>
              <p>Ingesting: IMD_Weather</p>
              <p>Ingesting: UPI_Switch</p>
              <p className="animate-pulse">Status: Synchronized</p>
           </div>
        </div>
      </section>

      {/* Live Data Ticker - Pan Bangalore */}
      <div className="w-full bg-cyber-900/90 border-y border-white/20 py-2 overflow-hidden z-10 relative backdrop-blur-md shadow-lg">
        <div className="flex animate-marquee whitespace-nowrap gap-12 text-xs font-mono tracking-wide">
          <span className="flex items-center gap-2 text-neon-pink font-bold"><Activity size={14}/> HSR LAYOUT: Inventory Critical (Milk &lt; 10%)</span>
          <span className="flex items-center gap-2 text-neon-cyan font-bold"><CloudLightning size={14}/> WHITEFIELD: Heavy Rain Alert &rarr; Swiggy Surge Active</span>
          <span className="flex items-center gap-2 text-neon-amber font-bold"><Zap size={14}/> INDIRANAGAR: Footfall Spike (Friday Night Mode)</span>
          <span className="flex items-center gap-2 text-garden-400 font-bold"><ShieldCheck size={14}/> MG ROAD: Compliance Audit Passed</span>
          <span className="flex items-center gap-2 text-purple-400 font-bold"><Wifi size={14}/> KORAMANGALA: Network Optimization Active</span>
          <span className="flex items-center gap-2 text-neon-pink font-bold"><Activity size={14}/> JAYANAGAR: Stock Reorder Triggered</span>
        </div>
        <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-cyber-950 to-transparent z-10"></div>
        <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-cyber-950 to-transparent z-10"></div>
      </div>

      {/* Dynamic Swarm Concept Component */}
      <section className="py-16 relative z-10 bg-cyber-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Multi-Agent Autonomy</h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg hover:text-white transition-colors">Our core architecture is built upon an orchestrated hive mind. Specialized AI agents continuously orchestrate, compute, and negotiate your operational workflows seamlessly.</p>
          </div>
          <SwarmAgentConcept customHeight="min-h-[500px]" />
        </div>
      </section>

      {/* Bento Grid Section - Dense & Detailed */}
      <section className="py-16 relative z-10 bg-cyber-950/20 backdrop-blur-md border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-6 h-auto md:h-[600px]">
            
            {/* Box 1: Hyper-Local Context */}
            <div className="bento-card md:col-span-2 md:row-span-2 rounded-2xl p-8 relative overflow-hidden group border-t-2 border-t-neon-blue/50 flex flex-col justify-between">
              <div className="absolute top-0 right-0 p-4 opacity-30 group-hover:opacity-80 transition-opacity bg-neon-blue/10 rounded-bl-2xl">
                <Map className="text-neon-blue" size={32} />
              </div>
              <div className="relative z-10 mb-6">
                 <h3 className="text-2xl font-bold text-white mb-3">Hyper-Local Intelligence</h3>
                 <p className="text-gray-300 text-sm leading-relaxed max-w-md">
                   Our OS distinguishes between a "Bandh" in Central Bangalore and a "Power Cut" in Whitefield. We aggregate real-time data from 50,000+ localized sensors, traffic cameras, and weather stations to build a living context map of the city.
                 </p>
              </div>
              {/* Visual Representation */}
              <div className="bg-black/60 rounded-xl p-4 border border-white/10 backdrop-blur-md relative z-10 mt-auto">
                 <div className="flex justify-between items-center mb-3 border-b border-white/5 pb-2">
                    <span className="text-xs font-mono text-gray-400 flex items-center gap-2">
                      <span className="w-2 h-2 bg-neon-pink rounded-full animate-ping"></span>
                      LIVE: INDIRANAGAR 12TH MAIN
                    </span>
                    <span className="text-[10px] bg-red-500/20 text-red-400 px-2 py-1 rounded border border-red-500/20 font-bold tracking-wider">CRITICAL TRAFFIC</span>
                 </div>
                 <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-300">Traffic Density</span>
                      <div className="w-32 h-1.5 bg-gray-700 rounded-full overflow-hidden">
                         <div className="h-full bg-gradient-to-r from-orange-500 to-red-500 w-[92%] animate-pulse"></div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-300">Precipitation (mm)</span>
                      <div className="w-32 h-1.5 bg-gray-700 rounded-full overflow-hidden">
                         <div className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 w-[12%]"></div>
                      </div>
                    </div>
                    <div className="p-2 bg-neon-cyan/5 rounded border border-neon-cyan/20 mt-2">
                       <p className="text-[10px] text-neon-cyan font-mono">
                         &gt; AI RECOMMENDATION: Delay restocking trucks by 45 mins due to gridlock on 100ft Road.
                       </p>
                    </div>
                 </div>
              </div>
            </div>

            {/* Box 2: Inventory Logic */}
            <Link 
              to={PageRoute.INVENTORY_LOGIC}
              className="bento-card md:col-span-1 md:row-span-2 rounded-2xl p-6 relative overflow-hidden group border-t-2 border-t-neon-pink/50 hover:border-neon-pink transition-colors flex flex-col"
            >
               <div className="absolute top-0 right-0 p-4 opacity-30 group-hover:opacity-80 transition-opacity bg-neon-pink/10 rounded-bl-2xl">
                <Database className="text-neon-pink" size={24} />
               </div>
               <h3 className="text-xl font-bold text-white mb-2">Burn-Rate Logic</h3>
               <p className="text-gray-400 text-xs mb-6 leading-relaxed">
                 Predictive depletion based on Bangalore's unique consumption patterns. We know that Idli batter runs out faster on Sunday mornings in Malleshwaram.
               </p>
               
               <div className="flex flex-col gap-4 mt-auto">
                 {[
                   { label: "Idli Batter", val: 80, color: "bg-garden-500" },
                   { label: "Nandini Milk", val: 30, color: "bg-yellow-500" },
                   { label: "Packaging", val: 12, color: "bg-red-500" }
                 ].map((item, i) => (
                   <div key={i} className="group/item">
                     <div className="flex justify-between text-[10px] text-gray-300 mb-1 font-mono uppercase tracking-wide">
                       <span>{item.label}</span>
                       <span>{item.val}%</span>
                     </div>
                     <div className="w-full bg-gray-700 h-1.5 rounded-full overflow-hidden">
                       <div className={`h-full ${item.color} transition-all duration-1000`} style={{width: `${item.val}%`}}></div>
                     </div>
                   </div>
                 ))}
               </div>
            </Link>

            {/* Box 3: Sovereign Data */}
            <div className="bento-card md:col-span-1 md:row-span-1 rounded-2xl p-6 relative overflow-hidden flex flex-col justify-center border-t-2 border-t-neon-purple/50 bg-gradient-to-br from-cyber-900 to-neon-purple/10">
               <Lock className="text-neon-purple mb-3" size={28} />
               <h3 className="text-lg font-bold text-white mb-2">Sovereign Data</h3>
               <p className="text-gray-400 text-xs leading-relaxed">
                 Your data stays on your node. Full DPDP 2026 compliance. No platform lock-in. You own your customer relationships, not Swiggy or Zomato.
               </p>
            </div>

            {/* Box 4: Zero Latency */}
            <div className="bento-card md:col-span-1 md:row-span-1 rounded-2xl p-6 relative overflow-hidden flex flex-col justify-center border-t-2 border-t-neon-amber/50 bg-gradient-to-br from-cyber-900 to-neon-amber/10">
               <Zap className="text-neon-amber mb-3" size={28} />
               <h3 className="text-lg font-bold text-white mb-2">Zero Latency</h3>
               <p className="text-gray-400 text-xs leading-relaxed">
                 Local-first PWA architecture. Works seamlessly even when the internet fluctuates during the monsoon rains.
               </p>
            </div>

          </div>

          <div className="mt-16 flex flex-wrap justify-center gap-4 px-4">
            {[...Array(6)].map((_, i) => (
              <Link 
                key={i} 
                to={PageRoute.FEATURES}
                className="px-6 py-2 bg-white/5 border border-white/10 rounded-full text-[10px] font-mono hover:bg-neon-cyan hover:text-black hover:border-neon-cyan transition-all uppercase tracking-widest flex items-center gap-2 group whitespace-nowrap"
              >
                <Zap size={12} className="group-hover:animate-pulse text-neon-cyan group-hover:text-black" /> Explore Features
              </Link>
            ))}
          </div>

        </div>
      </section>

      {/* Web Design Promo */}
      <section className="py-24 relative z-10 bg-cyber-950 border-y border-white/5 overflow-hidden">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-neon-cyan/5 rounded-full blur-[100px] animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-[400px] h-[300px] bg-neon-purple/5 rounded-full blur-[80px]"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-neon-cyan/5 border border-neon-cyan/30 text-neon-cyan text-[10px] font-mono mb-8 tracking-[0.2em] shadow-[0_0_20px_rgba(0,255,255,0.15)]">
             <span className="w-2 h-2 rounded-full bg-neon-cyan animate-pulse"></span>
             LIMITED TIME LAUNCH PRICING
          </div>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-black text-white tracking-tighter mb-4">
            ENTERPRISE <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan to-neon-purple">WEB DESIGN</span>
          </h2>
          
          <div className="inline-flex items-center justify-center my-6 relative">
            <div className="absolute inset-0 bg-neon-magenta/20 blur-xl rounded-full"></div>
            <div className="relative bg-cyber-900 border-2 border-neon-magenta/50 px-8 py-4 rounded-3xl transform -rotate-2 hover:rotate-0 transition-transform">
               <span className="text-gray-400 font-mono text-sm line-through mr-3">₹49,999</span>
               <span className="text-4xl md:text-5xl font-black text-neon-magenta tracking-tight">₹499<span className="text-sm text-neon-magenta/70 font-mono tracking-normal ml-1">/project</span></span>
            </div>
          </div>

          <p className="text-lg md:text-xl text-gray-400 font-light max-w-2xl mx-auto leading-relaxed mb-6 mt-6">
            Get a high-performance React architecture for just <span className="text-white font-bold">₹499</span>. Now onboarding beta clients in <span className="text-white">JP Nagar</span>, <span className="text-white">Bellandur</span>, and <span className="text-white">Jayanagar</span>.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 mb-10 opacity-60">
            {["JP Nagar", "Bellandur", "Jayanagar", "Whitefield"].map((loc, i) => (
              <span key={i} className="text-[10px] font-mono border border-white/10 px-3 py-1 rounded-md uppercase tracking-widest">{loc}</span>
            ))}
          </div>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to={PageRoute.WEBSITE_DESIGN}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-black font-black text-sm uppercase tracking-widest hover:scale-105 transition-all shadow-[0_0_30px_rgba(255,255,255,0.3)] rounded-full group"
            >
              Explore Portfolio <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to={PageRoute.CONTACT}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-neon-magenta/10 border border-neon-magenta/50 text-neon-magenta font-black text-sm uppercase tracking-widest hover:bg-neon-magenta/20 transition-all rounded-full"
            >
              Lock in ₹499 Price
            </Link>
          </div>
        </div>
      </section>

      {/* Infinite Scrolling Features Link */}
      <Link to={PageRoute.FEATURES} className="block w-full bg-neon-cyan text-black py-4 overflow-hidden relative group hover:bg-white transition-colors cursor-pointer z-10">
        <div className="flex whitespace-nowrap animate-marquee group-hover:[animation-play-state:paused] items-center text-lg font-black tracking-[0.2em]">
          {[...Array(10)].map((_, i) => (
            <span key={i} className="flex items-center mx-4">
              EXPLORE FULL SYSTEM FEATURES <ArrowRight size={20} className="ml-4" />
            </span>
          ))}
        </div>
      </Link>

      {/* Components */}
      <Suspense fallback={<SectionSkeleton />}>
        <FeaturesSection />
      </Suspense>
      <Suspense fallback={<SectionSkeleton />}>
        <ManifestoSection />
      </Suspense>
      <Suspense fallback={<SectionSkeleton />}>
        <PricingSection />
      </Suspense>

      {/* Aesthetic Spacer removed to prevent footer overlap */}
    </div>
  );
};

export default Home;