import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Camera, Shield, AlertTriangle, Eye, Activity, 
  Terminal, Cpu, Zap, ArrowRight, ArrowLeft,
  Lock, Bell, Smartphone, Monitor, Database
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { PageRoute } from '../types';
import SEO from '../components/SEO';
import BlackboxTerminal from '../components/BlackboxTerminal';

const Surveillance: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    location: '',
    requirements: 'CCTV Installation'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleWhatsAppSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const message = `Hi Ooru Logix, I'm interested in Tactical Surveillance help.
Details:
- Name: ${formData.name}
- Phone: ${formData.phone}
- Location: ${formData.location}
- Requirements: ${formData.requirements}`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/919591015279?text=${encodedMessage}`;

    setTimeout(() => {
      window.open(whatsappUrl, '_blank');
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <div className="bg-[#020205] text-white selection:bg-neon-cyan selection:text-black min-h-screen overflow-x-hidden">
      <SEO 
        title="Tactical Surveillance Bangalore | Ooru Logix | JP Nagar & Kothnur"
        description="Next-gen AI-powered surveillance and loss prevention for Bangalore merchants. Secure your perimeter with Ooru Logix Edge Vision."
        keywords="CCTV Bangalore, Surveillance JP Nagar, Loss Prevention Kothnur, AI Security Bangalore"
        canonical="https://www.oorulogix.com/surveillance"
      />

      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,255,255,0.05)_0,transparent_70%)]"></div>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
      </div>

      <main className="relative z-10 pt-32 pb-24 px-6 max-w-7xl mx-auto">
        
        {/* Navigation */}
        <div className="mb-12">
          <Link to={PageRoute.FEATURES} className="inline-flex items-center gap-2 text-gray-400 hover:text-neon-cyan transition-colors group px-4 py-2 bg-white/5 backdrop-blur-md rounded-full border border-white/10">
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            <span className="text-xs font-mono tracking-widest uppercase">Back to Grid</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          
          {/* Content side */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-neon-cyan/10 border border-neon-cyan/30 text-neon-cyan text-[10px] font-mono mb-8 uppercase tracking-[0.3em]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon-cyan opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-neon-cyan"></span>
              </span>
              Active Monitoring: Enabled
            </div>
            
            <h1 className="text-5xl md:text-7xl font-black mb-8 leading-tight tracking-tighter">
              TACTICAL <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan to-white">SURVEILLANCE.</span>
            </h1>

            <p className="text-xl text-gray-400 font-light leading-relaxed mb-10 max-w-xl">
              Don't just record crime; prevent it. Ooru Logix integrates <strong className="text-white">Edge AI</strong> with your perimeter defense, identifying anomalies before they become losses.
            </p>

            <div className="space-y-6 mb-12">
              {[
                { icon: Eye, title: "Loss Prevention", desc: "Identify internal and external theft patterns in real-time." },
                { icon: Shield, title: "Intrusion Detection", desc: "Smart alerts for unauthorized zone access post-hours." },
                { icon: Bell, title: "Logic-Based Alerts", desc: "Get WhatsApp notifications for exactly what matters." }
              ].map((item, i) => (
                <div key={i} className="flex gap-5 group">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-neon-cyan group-hover:border-neon-cyan/50 transition-colors shrink-0">
                    <item.icon size={24} />
                  </div>
                  <div>
                    <h3 className="text-white font-bold mb-1">{item.title}</h3>
                    <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Live Feed Simulator */}
            <div className="glass-panel border border-white/10 rounded-3xl overflow-hidden bg-black/40 shadow-2xl relative">
              <div className="absolute top-0 left-0 w-full h-1 bg-neon-cyan shadow-[0_0_15px_#00ffff]"></div>
              <div className="p-4 bg-white/5 border-b border-white/5 flex justify-between items-center">
                <div className="flex items-center gap-2 text-[10px] font-mono text-gray-500">
                  <Activity size={12} /> CAMERA_NODE_01_ACTIVE
                </div>
                <div className="text-[9px] bg-red-500/20 text-red-500 px-2 py-0.5 rounded font-black animate-pulse uppercase">
                  REC
                </div>
              </div>
              <div className="aspect-video relative overflow-hidden bg-[#0a0a0f]">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,255,0.05)_1px,transparent_1px)] bg-[size:100%_4px] opacity-20 pointer-events-none"></div>
                <div className="absolute inset-0 flex items-center justify-center opacity-30">
                  <Monitor size={120} className="text-neon-cyan/20" />
                </div>
                <div className="absolute top-4 left-4 p-2 bg-black/60 backdrop-blur-md rounded border border-white/10">
                  <p className="text-[10px] font-mono text-neon-cyan">FRAME: {Math.floor(Math.random()*10000)}</p>
                  <p className="text-[10px] font-mono text-white">OBJ_DET: PERSON (98.2%)</p>
                </div>
                {/* Bounding box animation */}
                <motion.div 
                  animate={{ 
                    x: [100, 200, 150, 250, 100],
                    y: [50, 100, 70, 120, 50]
                  }}
                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                  className="absolute w-20 h-32 border-2 border-neon-cyan border-dashed bg-neon-cyan/5"
                >
                   <div className="absolute -top-5 left-0 px-1 bg-neon-cyan text-black text-[8px] font-bold">SEC-ALPHA</div>
                </motion.div>
                
                <div className="absolute bottom-4 right-4 text-[8px] font-mono text-gray-500">
                  GPS: 12.9141° N, 77.5946° E (JP NAGAR)
                </div>
              </div>
            </div>
          </motion.div>

          {/* Form Side */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:sticky lg:top-32"
          >
            <div className="glass-panel border-2 border-white/10 rounded-[2.5rem] p-8 md:p-10 shadow-2xl bg-black/60 relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-neon-cyan to-transparent"></div>
              
              <div className="mb-10">
                <h2 className="text-3xl font-black text-white mb-2">Initialize Help</h2>
                <p className="text-gray-500 text-sm">Deploy tactical intelligence to your physical node.</p>
              </div>

              <form onSubmit={handleWhatsAppSubmit} className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-[10px] font-mono uppercase tracking-widest text-gray-500 mb-2">Identifier (Name)</label>
                    <input 
                      type="text" 
                      id="name" 
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-neon-cyan focus:ring-1 focus:ring-neon-cyan transition-all"
                      placeholder="Your Name"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-[10px] font-mono uppercase tracking-widest text-gray-500 mb-2">Comm Link (WhatsApp Number)</label>
                    <input 
                      type="tel" 
                      id="phone" 
                      required
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-neon-cyan focus:ring-1 focus:ring-neon-cyan transition-all"
                      placeholder="+91 XXXXX XXXXX"
                    />
                  </div>

                  <div>
                    <label htmlFor="location" className="block text-[10px] font-mono uppercase tracking-widest text-gray-500 mb-2">Target Node Location</label>
                    <input 
                      type="text" 
                      id="location" 
                      required
                      value={formData.location}
                      onChange={handleInputChange}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-neon-cyan focus:ring-1 focus:ring-neon-cyan transition-all"
                      placeholder="e.g. JP Nagar 4th Phase"
                    />
                  </div>

                  <div>
                    <label htmlFor="requirements" className="block text-[10px] font-mono uppercase tracking-widest text-gray-500 mb-2">Service Protocol</label>
                    <select 
                      id="requirements"
                      value={formData.requirements}
                      onChange={handleInputChange}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-neon-cyan focus:ring-1 focus:ring-neon-cyan transition-all appearance-none"
                    >
                      <option className="bg-[#0a0a0f]">CCTV Installation</option>
                      <option className="bg-[#0a0a0f]">Loss Prevention Audit</option>
                      <option className="bg-[#0a0a0f]">Night Vision Defense</option>
                      <option className="bg-[#0a0a0f]">Face-ID Loyalty Integration</option>
                      <option className="bg-[#0a0a0f]">Full Tactical Suite</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-neon-cyan text-black font-black py-5 rounded-2xl uppercase tracking-[0.2em] shadow-[0_0_30px_rgba(0,255,255,0.3)] hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 group"
                >
                  {isSubmitting ? (
                    <>
                      <Terminal size={18} className="animate-spin" />
                      SYNCHRONIZING...
                    </>
                  ) : (
                    <>
                      INITIALIZE DEPLOYMENT <RocketIcon className="group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" size={18} />
                    </>
                  )}
                </button>

                <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                  <p className="text-[10px] font-mono text-gray-500 leading-relaxed italic">
                    "This action will initiate a direct secure tunnel to our deployment team via WhatsApp. Please be ready with your node layout."
                  </p>
                </div>
              </form>
            </div>

            <div className="mt-8">
               <BlackboxTerminal type="security" title="SEC_OPS_MONITOR" className="h-40" />
            </div>
          </motion.div>
        </div>
      </main>

      {/* Footer Buffer */}
      <div className="h-24 bg-black"></div>
    </div>
  );
};

// Simple Rocket Icon
const RocketIcon = ({ className, size }: { className?: string, size?: number }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size || 24} 
    height={size || 24} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
    <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
    <path d="M9 12H4s.55-3.03 2-5c1.62-2.2 5-3 5-3" />
    <path d="M12 15v5s3.03-.55 5-2c2.2-1.62 3-5 3-5" />
  </svg>
);

export default Surveillance;
