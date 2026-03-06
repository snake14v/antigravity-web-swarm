import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';

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
        
        {/* Header */}
        <h1 className="text-6xl md:text-8xl font-normal tracking-widest mb-20 border-b border-white/20 pb-8" style={{ textShadow: '0 0 10px rgba(255,255,255,0.3)' }}>
          ABOUT US
        </h1>

        {/* Content Grid */}
        <div className="space-y-24">
          
          {/* Item 1 */}
          <FadeInWhenVisible>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start border-b border-white/10 pb-20">
              <div className="md:col-span-3">
                <div className="text-gray-500 mb-2 tracking-widest">[/] ENTITY</div>
                <h2 className="text-3xl md:text-5xl font-normal tracking-wider leading-tight">
                  OORU LOGIX<br/>
                  2024 <span className="inline-block w-4 h-4 bg-white ml-2 animate-pulse"></span>
                </h2>
              </div>
              
              <div className="md:col-span-9">
                <div className="text-gray-500 mb-2 tracking-widest">[/] INFO</div>
                <p className="text-xl md:text-2xl leading-relaxed text-gray-300 mb-6 max-w-3xl">
                  OUR RAPIDLY CHANGING WORLD AND INTERCONNECTED SOCIETIES ARE IN NEED OF SYSTEMS THAT COLLABORATE ACROSS BORDERS. BUT HOW DO YOU, AS A MERCHANT, GET STARTED? WHAT TOOLS CAN YOU USE, AND HOW CAN YOU COLLABORATE EFFECTIVELY ACROSS BORDERS? FIND ALL THE ANSWERS IN THIS LOGIX.
                </p>
                <div className="text-lg text-gray-500 space-y-1 tracking-wider">
                  <p>DESIGN: OORU LOGIX DESIGN CREW  -----</p>
                  <p>TECH: FRONTEND, BACKEND, CANVAS, MATTERJS, REACT-SPRING</p>
                  <p>HTTPS://OORULOGIX.COM/</p>
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
                  MERCHANTS <span className="inline-block w-4 h-4 bg-white ml-2"></span>
                </h2>
              </div>
              
              <div className="md:col-span-9 relative z-10">
                <div className="text-gray-500 mb-2 tracking-widest">[/] CORE VALUES</div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
                  <div className="bg-white/5 border border-white/10 p-6 rounded-none hover:border-neon-cyan transition-colors transform hover:-translate-y-2 duration-300">
                    <h3 className="text-2xl text-neon-cyan mb-2">01. DATA SOVEREIGNTY</h3>
                    <p className="text-lg text-gray-400">Merchants own their data. We build the pipes, they hold the keys. No platform lock-in, ever.</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-6 rounded-none hover:border-neon-pink transition-colors transform hover:-translate-y-2 duration-300">
                    <h3 className="text-2xl text-neon-pink mb-2">02. HYPER-LOCAL TRUST</h3>
                    <p className="text-lg text-gray-400">Algorithms fail without context. We combine AI with physical presence to build unshakeable local networks.</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-6 rounded-none hover:border-garden-400 transition-colors transform hover:-translate-y-2 duration-300">
                    <h3 className="text-2xl text-garden-400 mb-2">03. ANTI-FRAGILITY</h3>
                    <p className="text-lg text-gray-400">We don't just survive chaos; we thrive on it. Our systems adapt to the unpredictable nature of unorganized retail.</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-6 rounded-none hover:border-yellow-500 transition-colors transform hover:-translate-y-2 duration-300">
                    <h3 className="text-2xl text-yellow-500 mb-2">04. COGNITIVE LEVERAGE</h3>
                    <p className="text-lg text-gray-400">Democratizing frontier AI models to give small merchants the analytical power of multinational corporations.</p>
                  </div>
                </div>
              </div>

              {/* Overlay Text Graphic with Parallax */}
              <div 
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center pointer-events-none z-0 opacity-30 mix-blend-screen"
                style={{ transform: `translate(-50%, calc(-50% + ${offsetY * 0.25}px))` }}
              >
                <h3 className="text-7xl md:text-9xl font-bold text-transparent leading-none" style={{ WebkitTextStroke: '2px white', letterSpacing: '-0.05em' }}>
                  THE CREATOR HAS<br/>A MASTER PLAN
                </h3>
              </div>
            </div>
          </FadeInWhenVisible>

          {/* Item 3: Timeline */}
          <FadeInWhenVisible delay={200}>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start border-b border-white/10 pb-20">
              <div className="md:col-span-3">
                <div className="text-gray-500 mb-2 tracking-widest">[/] TIMELINE</div>
                <h2 className="text-3xl md:text-5xl font-normal tracking-wider leading-tight">
                  EVOLUTION<br/>
                  LOGS <span className="inline-block w-4 h-4 bg-neon-cyan ml-2 animate-pulse"></span>
                </h2>
              </div>
              
              <div className="md:col-span-9">
                <div className="text-gray-500 mb-6 tracking-widest">[/] MILESTONES</div>
                
                <div className="relative border-l-2 border-white/20 pl-8 space-y-12">
                  
                  {/* Milestone 1 */}
                  <div className="relative transform transition-all hover:translate-x-2 duration-300">
                    <div className="absolute -left-[41px] top-1 w-5 h-5 bg-black border-2 border-neon-cyan rounded-full"></div>
                    <div className="text-neon-cyan text-2xl mb-1">Q1 2024: INCEPTION</div>
                    <h4 className="text-white text-xl mb-2">THE BELLANDUR PROTOCOL</h4>
                    <p className="text-gray-400 text-lg">
                      Initial deployment of the ShopSmart-OS prototype in Bellandur. First 50 merchants onboarded. Established the baseline for the Hyper-Local Trust metric.
                    </p>
                  </div>

                  {/* Milestone 2 */}
                  <div className="relative transform transition-all hover:translate-x-2 duration-300">
                    <div className="absolute -left-[41px] top-1 w-5 h-5 bg-black border-2 border-neon-pink rounded-full"></div>
                    <div className="text-neon-pink text-2xl mb-1">Q2 2024: MESH ACTIVATION</div>
                    <h4 className="text-white text-xl mb-2">MULTI-MODEL CONSENSUS ENGINE</h4>
                    <p className="text-gray-400 text-lg">
                      Integrated Claude 3.5 and Gemini 1.5 Pro into the Logic Core. Achieved 99.9% accuracy in unstructured receipt parsing and intent routing.
                    </p>
                  </div>

                  {/* Milestone 3 */}
                  <div className="relative transform transition-all hover:translate-x-2 duration-300">
                    <div className="absolute -left-[41px] top-1 w-5 h-5 bg-black border-2 border-garden-400 rounded-full"></div>
                    <div className="text-garden-400 text-2xl mb-1">Q3 2024: EXPANSION</div>
                    <h4 className="text-white text-xl mb-2">THE SOVEREIGN NETWORK</h4>
                    <p className="text-gray-400 text-lg">
                      Scaling operations across Bangalore. Launching the decentralized data marketplace, allowing merchants to monetize their anonymized transaction logs.
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
                <div className="text-gray-500 mb-2 tracking-widest">[/] KNOWLEDGE BASE</div>
                <h2 className="text-3xl md:text-5xl font-normal tracking-wider leading-tight text-neon-pink" style={{ textShadow: '0 0 15px rgba(255,0,255,0.5)' }}>
                  SYSTEM<br/>
                  F.A.Q. <span className="inline-block w-4 h-4 bg-white ml-2"></span>
                </h2>
              </div>
              
              <div className="md:col-span-9">
                <div className="text-gray-500 mb-6 tracking-widest">[/] QUERIES</div>
                
                <div className="space-y-2">
                  <FaqItem 
                    question="WHAT EXACTLY IS SHOPSMART-OS?" 
                    answer="ShopSmart-OS is a hyper-local merchant operating system designed specifically for the unorganized retail sector in Bangalore. It replaces fragmented tools (billing, inventory, CRM) with a single, AI-driven unified mesh that understands local context like weather, traffic, and neighborhood events."
                  />
                  <FaqItem 
                    question="HOW DO YOU ENSURE DATA SOVEREIGNTY AND SECURITY?" 
                    answer="Unlike aggregator platforms that hoard your customer data, Ooru Logix operates on a 'Sovereign Node' architecture. Your transaction data, customer lists, and inventory metrics are encrypted locally. We only process anonymized metadata to train our hyper-local models. You own the keys."
                  />
                  <FaqItem 
                    question="WHAT ARE THE PRICING TIERS?" 
                    answer="We offer three main tiers: 'The Basic Byte' (₹1,999/mo) for digital menus and basic inventory, 'The Logic Core' (₹4,999/mo) which includes the full OS and predictive depletion, and 'Cyber-Garden Prime' (₹14,999/mo) for total domination including AI insights and local SEO. No setup fees, ever."
                  />
                  <FaqItem 
                    question="DOES IT WORK OFFLINE OR DURING POWER CUTS?" 
                    answer="Yes. The system is built with an Anti-Fragile, local-first PWA architecture. It continues to log transactions and manage inventory during internet outages or power cuts, automatically syncing with the central mesh once connectivity is restored."
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
