import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Home, Cloud, Zap, Cpu, Settings, Smartphone, 
  Lightbulb, Thermometer, Wind, Database,
  ArrowRight, ArrowLeft, Terminal, Activity,
  Maximize2, Power, Globe, Sparkles
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { PageRoute } from '../types';
import SEO from '../components/SEO';
import BlackboxTerminal from '../components/BlackboxTerminal';

const HomeAutomation: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    houseType: 'Apartment (2BHK/3BHK)',
    automationLevel: 'Full Integration'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleWhatsAppSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const message = `Hi Ooru Logix, I'm interested in Home Automation help for my home in Bangalore.
Details:
- Name: ${formData.name}
- Phone: ${formData.phone}
- House Type: ${formData.houseType}
- Automation Level: ${formData.automationLevel}`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/919591015279?text=${encodedMessage}`;

    setTimeout(() => {
      window.open(whatsappUrl, '_blank');
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <div className="bg-[#020205] text-white selection:bg-neon-purple selection:text-white min-h-screen overflow-x-hidden">
      <SEO 
        title="Home Automation Bangalore | Ooru Logix | Smart Homes JP Nagar"
        description="Transform your Bangalore home with Ooru Logix. Zero-latency automation, smart lighting, and AI-driven climate control for modern living."
        keywords="Home Automation Bangalore, Smart Home JP Nagar, Kothnur Home Automation, IoT Bangalore"
        canonical="https://www.oorulogix.com/home-automation"
      />

      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(189,0,255,0.05)_0,transparent_70%)]"></div>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px]"></div>
      </div>

      <main className="relative z-10 pt-32 pb-24 px-6 max-w-7xl mx-auto">
        
        {/* Navigation */}
        <div className="mb-12">
          <Link to={PageRoute.FEATURES} className="inline-flex items-center gap-2 text-gray-400 hover:text-neon-purple transition-colors group px-4 py-2 bg-white/5 backdrop-blur-md rounded-full border border-white/10">
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
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-neon-purple/10 border border-neon-purple/30 text-neon-purple text-[10px] font-mono mb-8 uppercase tracking-[0.3em]">
              <Sparkles size={12} className="animate-pulse" />
              LIVING_LOGIC_v2.0
            </div>
            
            <h1 className="text-5xl md:text-7xl font-black mb-8 leading-tight tracking-tighter">
              HYPER-LOCAL <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-purple via-white to-neon-blue">HOME OS.</span>
            </h1>

            <p className="text-xl text-gray-400 font-light leading-relaxed mb-10 max-w-xl">
              Your home shouldn't just be smart; it should be <strong className="text-white">Aware</strong>. Ooru Logix brings enterprise-grade automation to your living room, optimized for the unique power and weather cycles of Bangalore.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
              {[
                { icon: Lightbulb, title: "Lumina Logic", desc: "Adaptive lighting that syncs with outdoor brightness." },
                { icon: Wind, title: "Climate Mesh", desc: "Smart AC & Fan control based on real IMD weather data." },
                { icon: Power, title: "Energy Vampire", desc: "Auto-kill ghost power drains during sleeping hours." },
                { icon: Smartphone, title: "Unified Control", desc: "One interface for every node in your household." }
              ].map((item, i) => (
                <div key={i} className="p-6 bg-white/5 border border-white/10 rounded-2xl group hover:bg-white/10 transition-all">
                  <div className="w-10 h-10 rounded-xl bg-neon-purple/10 flex items-center justify-center text-neon-purple mb-4 group-hover:scale-110 transition-transform">
                    <item.icon size={20} />
                  </div>
                  <h3 className="text-white font-bold mb-2">{item.title}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>

            {/* Smart Home Dashboard Simulation */}
            <div className="glass-panel border border-white/10 rounded-3xl overflow-hidden bg-black/40 shadow-2xl relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-neon-purple/10 blur-[60px] rounded-full pointer-events-none"></div>
              <div className="p-6 border-b border-white/5 flex justify-between items-center">
                <div className="flex items-center gap-3">
                   <div className="p-2 bg-neon-purple/20 rounded-lg text-neon-purple">
                      <Home size={18} />
                   </div>
                   <div>
                      <h4 className="text-xs font-black uppercase tracking-widest text-white">Main Dashboard</h4>
                      <p className="text-[9px] font-mono text-gray-500">RES_NODE_KOTHNUR_04</p>
                   </div>
                </div>
                <div className="flex gap-2">
                   <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center hover:bg-white/10 cursor-pointer">
                      <Settings size={14} className="text-gray-400" />
                   </div>
                </div>
              </div>
              <div className="p-6 grid grid-cols-2 gap-4">
                 {[
                   { l: "Living Room", v: "24°C", s: "ON", i: <Thermometer size={14}/>, color: "text-neon-cyan" },
                   { l: "Master Bed", v: "60%", s: "OFF", i: <Lightbulb size={14}/>, color: "text-gray-500" },
                   { l: "Main Gate", v: "Locked", s: "SEC", i: <Maximize2 size={14}/>, color: "text-garden-500" },
                   { l: "Energy", v: "0.4kW", s: "LOW", i: <Zap size={14}/>, color: "text-neon-amber" }
                 ].map((stat, i) => (
                   <div key={i} className="p-4 bg-white/5 border border-white/10 rounded-xl hover:border-neon-purple/30 transition-colors">
                      <div className="flex justify-between items-start mb-3">
                         <div className={`p-1.5 rounded-md bg-white/5 ${stat.color}`}>
                            {stat.i}
                         </div>
                         <span className={`text-[8px] font-bold px-1.5 py-0.5 rounded ${stat.color} bg-white/5`}>{stat.s}</span>
                      </div>
                      <p className="text-[10px] text-gray-500 uppercase font-mono">{stat.l}</p>
                      <p className="text-lg font-black text-white">{stat.v}</p>
                   </div>
                 ))}
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
              <div className="absolute top-0 right-0 w-full h-1 bg-gradient-to-l from-neon-purple to-transparent"></div>
              
              <div className="mb-10 text-right">
                <h2 className="text-3xl font-black text-white mb-2">Request Audit</h2>
                <p className="text-gray-500 text-sm">Deploy hyper-local automation to your living node.</p>
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
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-neon-purple focus:ring-1 focus:ring-neon-purple transition-all"
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
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-neon-purple focus:ring-1 focus:ring-neon-purple transition-all"
                      placeholder="+91 XXXXX XXXXX"
                    />
                  </div>

                  <div>
                    <label htmlFor="houseType" className="block text-[10px] font-mono uppercase tracking-widest text-gray-500 mb-2">Dwelling Type</label>
                    <select 
                      id="houseType"
                      value={formData.houseType}
                      onChange={handleInputChange}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-neon-purple focus:ring-1 focus:ring-neon-purple transition-all appearance-none"
                    >
                      <option className="bg-[#0a0a0f]">Apartment (2BHK/3BHK)</option>
                      <option className="bg-[#0a0a0f]">Penthouse / Villa</option>
                      <option className="bg-[#0a0a0f]">Independent House</option>
                      <option className="bg-[#0a0a0f]">Luxury Workspace</option>
                      <option className="bg-[#0a0a0f]">Studio Apartment</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="automationLevel" className="block text-[10px] font-mono uppercase tracking-widest text-gray-500 mb-2">Automation Mesh Tier</label>
                    <select 
                      id="automationLevel"
                      value={formData.automationLevel}
                      onChange={handleInputChange}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-neon-purple focus:ring-1 focus:ring-neon-purple transition-all appearance-none"
                    >
                      <option className="bg-[#0a0a0f]">Lighting & Logic Only</option>
                      <option className="bg-[#0a0a0f]">Climate & Air Logic</option>
                      <option className="bg-[#0a0a0f]">Security & Vision Integration</option>
                      <option className="bg-[#0a0a0f]">Full Integration (Node-Zero)</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-neon-purple text-white font-black py-5 rounded-2xl uppercase tracking-[0.2em] shadow-[0_0_30px_rgba(189,0,255,0.3)] hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 group"
                >
                  {isSubmitting ? (
                    <>
                      <Cpu size={18} className="animate-spin" />
                      SYNCHRONIZING...
                    </>
                  ) : (
                    <>
                      INITIALIZE DEPLOYMENT <ArrowRight className="group-hover:translate-x-2 transition-transform" size={18} />
                    </>
                  )}
                </button>

                <div className="p-4 bg-white/5 rounded-2xl border border-white/5 text-right">
                  <p className="text-[10px] font-mono text-gray-500 leading-relaxed italic">
                    "Syncing with Ooru Home Cloud... Please ensure you are within your local Bangalore network."
                  </p>
                </div>
              </form>
            </div>

            <div className="mt-8">
               <BlackboxTerminal type="sync" title="HOME_SYNC_AUDIT" className="h-40" />
            </div>
          </motion.div>
        </div>
      </main>

      {/* Footer Buffer */}
      <div className="h-24 bg-black"></div>
    </div>
  );
};

export default HomeAutomation;
