import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { OoruLogixLogo } from '../components/Logo';

const FadeInWhenVisible: React.FC<{ children: React.ReactNode; delay?: number }> = ({ children, delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

const FaqItem: React.FC<{ question: string; answer: string }> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-white/10 py-6">
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="w-full flex justify-between items-center text-left hover:text-neon-cyan transition-colors group"
      >
        <h3 className="text-2xl md:text-3xl pr-8">{question}</h3>
        <span className="text-3xl font-bold text-gray-500 group-hover:text-neon-cyan transition-colors">
          {isOpen ? '[-]' : '[+]'}
        </span>
      </button>
      <div 
        className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-96 opacity-100 mt-6' : 'max-h-0 opacity-0'}`}
      >
        <p className="text-xl text-gray-400 leading-relaxed border-l-2 border-neon-cyan pl-4">{answer}</p>
      </div>
    </div>
  );
};

const AboutUs: React.FC = () => {
  const [offsetY, setOffsetY] = useState(0);
  const handleScroll = () => setOffsetY(window.pageYOffset);

  useEffect(() => {
    // SEO Meta Tags
    document.title = "About Us | Ooru Logix - Hyper-Local Data Intelligence";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", "Ooru Logix provides hyper-local data intelligence and a powerful merchant OS for Bangalore retail tech. Empowering local businesses with sovereign data and AI.");
    } else {
      const desc = document.createElement('meta');
      desc.name = "description";
      desc.content = "Ooru Logix provides hyper-local data intelligence and a powerful merchant OS for Bangalore retail tech. Empowering local businesses with sovereign data and AI.";
      document.head.appendChild(desc);
    }

    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) {
      metaKeywords.setAttribute("content", "hyper-local data intelligence, merchant OS, Bangalore retail tech, Ooru Logix, retail AI, sovereign data");
    } else {
      const keywords = document.createElement('meta');
      keywords.name = "keywords";
      keywords.content = "hyper-local data intelligence, merchant OS, Bangalore retail tech, Ooru Logix, retail AI, sovereign data";
      document.head.appendChild(keywords);
    }

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white font-vt323 uppercase selection:bg-neon-cyan selection:text-black relative overflow-hidden text-xl pb-24">
      {/* Dotted background overlay */}
      <div 
        className="fixed inset-0 z-0 opacity-20 pointer-events-none" 
        style={{ 
          backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', 
          backgroundSize: '24px 24px',
          backgroundPosition: '0 0'
        }}
      ></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-16">
        
        {/* Header with prominent logo - centered */}
        <div className="flex flex-col items-center justify-center border-b border-white/20 pb-12 mb-20 text-center">
          <h1 className="text-6xl md:text-9xl font-normal tracking-widest mb-10" style={{ textShadow: '0 0 10px rgba(255,255,255,0.3)' }}>
            ABOUT US
          </h1>
          <div className="flex flex-col items-center gap-6 group">
            <div className="relative">
              <div className="absolute -inset-8 bg-neon-cyan/20 blur-2xl rounded-full group-hover:bg-neon-cyan/40 transition-colors"></div>
              <OoruLogixLogo className="w-32 h-32 md:w-48 md:h-48 relative z-10 animate-pulse-slow" color="white" />
            </div>
            <div className="flex flex-col items-center">
              <span className="text-neon-cyan text-sm tracking-[0.5em] mb-2">ESTABLISHED_NODE: 01</span>
              <span className="text-white text-3xl font-bold tracking-[0.2em]">OORU LOGIX | LAUNCH_DEC_2025</span>
            </div>
          </div>
        </div>

        {/* Content Grid */}
        <div className="space-y-24">
          
          {/* Item 1 */}
          <FadeInWhenVisible>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start border-b border-white/10 pb-20">
              <div className="md:col-span-3">
                <div className="text-gray-500 mb-2 tracking-widest">[/] THE_SPIRIT</div>
                <h2 className="text-3xl md:text-5xl font-normal tracking-wider leading-tight">
                  OORU MEET LOGIX<br/>
                  DEC 2025 <span className="inline-block w-4 h-4 bg-white ml-2 animate-pulse"></span>
                </h2>
              </div>
              
              <div className="md:col-span-9">
                <div className="text-gray-500 mb-2 tracking-widest">[/] ARCHITECTURE_OF_TRUST</div>
                <p className="text-xl md:text-2xl leading-relaxed text-gray-300 mb-6 max-w-3xl">
                  IN BANGALORE, THE "OORU" (CITY) IS NOT JUST A GEOGRAPHIC LOCATION; IT IS A LIVING, BREATHING NETWORK OF TRANSACTIONS, TRUST, AND TRADITION. OORU LOGIX WAS BORN FROM THE NECESSITY TO FUSE THIS TRADITIONAL KNOWLEDGE WITH FRONTIER COMPUTATIONAL LOGIC. WE ARE BUILDING AN OPERATING SYSTEM FOR THE CITY ITSELF.
                </p>
                <div className="text-lg text-gray-500 space-y-1 tracking-wider">
                  <p>COLLECTIVE: OORU LOGIX ENGINEERING & DESIGN -----</p>
                  <p>STACK: HYPER-LOCAL MESH, REAL-TIME INGESTION, SOVEREIGN AI</p>
                  <p>DEPLOYMENT_PHASE: GLOBAL_GRID_ALPHA</p>
                </div>
              </div>
            </div>
          </FadeInWhenVisible>

          {/* Item 2: Mission & Values */}
          <FadeInWhenVisible delay={200}>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start border-b border-white/10 pb-20 relative">
              <div className="md:col-span-3 relative z-10">
                <div className="text-gray-500 mb-2 tracking-widest">[/] MISSION</div>
                <h2 className="text-3xl md:text-5xl font-normal tracking-wider leading-tight text-neon-cyan" style={{ textShadow: '0 0 15px rgba(0,255,255,0.5)' }}>
                  SOVEREIGN<br/>
                  COMMERCE <span className="inline-block w-4 h-4 bg-white ml-2"></span>
                </h2>
              </div>
              
              <div className="md:col-span-9 relative z-10">
                <div className="text-gray-500 mb-2 tracking-widest">[/] CORE PRINCIPLES</div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
                  <div className="bg-white/5 border border-white/10 p-6 rounded-none hover:border-neon-cyan transition-colors transform hover:-translate-y-2 duration-300">
                    <h3 className="text-2xl text-neon-cyan mb-2">01. ABSOLUTE SOVEREIGNTY</h3>
                    <p className="text-lg text-gray-400">Merchants are the bedrock of the economy. We ensure they own every byte of their data, protected by local-first encryption protocols.</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-6 rounded-none hover:border-neon-pink transition-colors transform hover:-translate-y-2 duration-300">
                    <h3 className="text-2xl text-neon-pink mb-2">02. CONTEXTUAL INTELLIGENCE</h3>
                    <p className="text-lg text-gray-400">AI without local context is noise. We feed our models the pulse of Bangalore—weather, traffic, and neighborhood sentiment.</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-6 rounded-none hover:border-garden-400 transition-colors transform hover:-translate-y-2 duration-300">
                    <h3 className="text-2xl text-garden-400 mb-2">03. SYSTEMIC RESILIENCE</h3>
                    <p className="text-lg text-gray-400">Our OS thrives in unpredictability. Built to operate seamlessly through Bangalore's monsoon storms and power fluctuations.</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-6 rounded-none hover:border-yellow-500 transition-colors transform hover:-translate-y-2 duration-300">
                    <h3 className="text-2xl text-yellow-500 mb-2">04. COGNITIVE EQUITY</h3>
                    <p className="text-lg text-gray-400">Levelling the playing field by providing small-scale merchants with analytical power that rivals global corporations.</p>
                  </div>
                </div>
              </div>

              {/* Overlay Text Graphic with Parallax */}
              <div 
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center pointer-events-none z-0 opacity-30 mix-blend-screen"
                style={{ transform: `translate(-50%, calc(-50% + ${offsetY * 0.25}px))` }}
              >
                <h3 className="text-7xl md:text-9xl font-bold text-transparent leading-none" style={{ WebkitTextStroke: '2px white', letterSpacing: '-0.1em' }}>
                  THE CITY IS OUR<br/>OPERATING SYSTEM
                </h3>
              </div>
            </div>
          </FadeInWhenVisible>

          {/* Item 3: Evolution logs */}
          <FadeInWhenVisible delay={200}>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start border-b border-white/10 pb-20">
              <div className="md:col-span-3">
                <div className="text-gray-500 mb-2 tracking-widest">[/] TIMELINE</div>
                <h2 className="text-3xl md:text-5xl font-normal tracking-wider leading-tight">
                  LOGIX<br/>
                  MILESTONES <span className="inline-block w-4 h-4 bg-neon-cyan ml-2 animate-pulse"></span>
                </h2>
              </div>
              
              <div className="md:col-span-9">
                <div className="text-gray-500 mb-6 tracking-widest">[/] DEPLOYMENT_HISTORY</div>
                
                <div className="relative border-l-2 border-white/20 pl-8 space-y-12">
                  
                  {/* Milestone 1 */}
                  <div className="relative transform transition-all hover:translate-x-2 duration-300">
                    <div className="absolute -left-[41px] top-1 w-5 h-5 bg-black border-2 border-neon-cyan rounded-full"></div>
                    <div className="text-neon-cyan text-2xl mb-1">Q1 2025: MESH FORMATION</div>
                    <h4 className="text-white text-xl mb-2">PHASE 1: BANGALORE GRID ALPHA</h4>
                    <p className="text-gray-400 text-lg">
                      Initial research and mapping of Koramangala and Indiranagar. Established the foundational peer-to-peer data mesh protocol.
                    </p>
                  </div>

                  {/* Milestone 2 */}
                  <div className="relative transform transition-all hover:translate-x-2 duration-300">
                    <div className="absolute -left-[41px] top-1 w-5 h-5 bg-black border-2 border-neon-pink rounded-full"></div>
                    <div className="text-neon-pink text-2xl mb-1">Q2 2025: BETA PROPAGATION</div>
                    <h4 className="text-white text-xl mb-2">SHOPSMART-OS LIVE TEST</h4>
                    <p className="text-gray-400 text-lg">
                      Deployed ShopSmart-OS to 100 select merchants across HSR Layout. Finalized the real-time context-aware AI suggestion engine.
                    </p>
                  </div>

                  {/* Milestone 3 */}
                  <div className="relative transform transition-all hover:translate-x-2 duration-300">
                    <div className="absolute -left-[41px] top-1 w-5 h-5 bg-black border-2 border-garden-400 rounded-full"></div>
                    <div className="text-garden-400 text-2xl mb-1">DEC 2025: FULL ACTIVATION</div>
                    <h4 className="text-white text-xl mb-2">THE SOVEREIGN NETWORK LAUNCH</h4>
                    <p className="text-gray-400 text-lg">
                      Official launch of the Ooru Logix ecosystem. Scaling the decentralized trust mesh across greater Bangalore and establishing global data sovereignty standards.
                    </p>
                  </div>

                </div>
              </div>
            </div>
          </FadeInWhenVisible>

          {/* Item 4: FAQ Section */}
          <FadeInWhenVisible delay={200}>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start pb-20">
              <div className="md:col-span-3">
                <div className="text-gray-500 mb-2 tracking-widest">[/] KNOWLEDGE_CORE</div>
                <h2 className="text-3xl md:text-5xl font-normal tracking-wider leading-tight text-neon-pink" style={{ textShadow: '0 0 15px rgba(255,0,255,0.5)' }}>
                  CLIENT<br/>
                  INTEL <span className="inline-block w-4 h-4 bg-white ml-2"></span>
                </h2>
              </div>
              
              <div className="md:col-span-9">
                <div className="text-gray-500 mb-6 tracking-widest">[/] QUERY_LOG</div>
                
                <div className="space-y-2">
                  <FaqItem 
                    question="HOW IS SHOPSMART-OS DIFFERENT FROM EXISTING ERPs?" 
                    answer="Traditional ERPs are static. ShopSmart-OS is dynamic. It ingests thousands of hyper-local data points—from traffic bottlenecks to weather spikes—to provide real-time operational directives that actually matter for a merchant's bottom line in Bangalore."
                  />
                  <FaqItem 
                    question="WHAT DO YOU MEAN BY SOVEREIGN DATA?" 
                    answer="Sovereign data means you are the absolute owner. Your data never leaves your 'Sovereign Node' without your explicit permission. We provide the intelligence without the extraction, unlike aggregator platforms that harvest your customer relationships."
                  />
                  <FaqItem 
                    question="IS THE 2025 STACK COMPLIANT WITH NEW REGULATIONS?" 
                    answer="Yes. Our 2025 architecture is built from the ground up to exceed DPDP 2026 standards. Security and privacy are not features; they are foundational primitives of our mesh networking system."
                  />
                  <FaqItem 
                    question="HOW DO WE ONBOARD?" 
                    answer="Onboarding is as simple as scanning a code. Our deployment team handles the digital mesh integration, and within 24 hours, your store becomes a sovereign node in the Bangalore intelligence grid."
                  />
                </div>
              </div>
            </div>
          </FadeInWhenVisible>

        </div>
      </div>
    </div>
  );
};

export default AboutUs;
