import React from 'react';
import { Link } from 'react-router-dom';
import { PageRoute } from '../types';
import { 
  Coffee, CloudRain, TrendingUp, Truck, Mic, ShieldAlert, 
  Menu, UserCheck, Battery, MessageSquare, AlertTriangle, Search, FileText, 
  Users, Award, Recycle, MapPin, DollarSign, Brain, CloudLightning, Smartphone, Clock, ArrowDownRight, ArrowRight
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

import { slides, expandedSlides, remainingSlides } from './use-cases/useCasesData';

const UseCasesGrid: React.FC = () => {
  const { ref: headerRef, inView: headerInView } = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <section className="py-24 bg-cyber-950 relative overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          ref={headerRef}
          initial={{ opacity: 0, y: 20 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <div className="inline-block p-1.5 px-3 rounded-full bg-neon-purple/10 border border-neon-purple/30 text-neon-purple text-xs font-mono mb-4">
             CASE SCENARIOS
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">18 Reasons Why</h2>
          <p className="text-gray-400 text-xl max-w-3xl mx-auto">Real-world operational logic deployed in Bangalore today. We don't just provide software; we provide <span className="text-white font-bold">a cognitive upgrade for your business</span>.</p>
        </motion.div>

        {/* Expanded Top 3 Use Cases */}
        <div className="space-y-32 mb-32">
          
          {/* Use Case 1: Morning Rush */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1 relative group">
              <div className="absolute -inset-4 bg-orange-500/20 blur-3xl rounded-full opacity-30 group-hover:opacity-50 transition-opacity"></div>
              <div className="relative glass-panel rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-cyber-900 p-8">
                <div className="flex flex-col gap-8">
                  {/* Data Sources */}
                  <div className="flex justify-between items-center px-4">
                    <div className="flex flex-col items-center gap-2 animate-bounce" style={{ animationDuration: '3s' }}>
                      <div className="p-3 bg-blue-500/20 rounded-xl border border-blue-500/30 text-blue-400"><CloudRain size={24} /></div>
                      <span className="text-xs font-mono text-gray-400">Weather API</span>
                    </div>
                    <div className="h-0.5 w-16 bg-gradient-to-r from-blue-500/50 to-orange-500/50 relative">
                      <div className="absolute top-1/2 -translate-y-1/2 left-0 w-2 h-2 bg-white rounded-full animate-[move-right_2s_linear_infinite]"></div>
                    </div>
                    <div className="flex flex-col items-center gap-2 animate-bounce" style={{ animationDuration: '3.5s' }}>
                      <div className="p-3 bg-green-500/20 rounded-xl border border-green-500/30 text-green-400"><TrendingUp size={24} /></div>
                      <span className="text-xs font-mono text-gray-400">Sales History</span>
                    </div>
                  </div>
                  
                  {/* AI Core */}
                  <div className="flex justify-center relative">
                    <div className="absolute inset-0 bg-orange-500/20 blur-xl rounded-full animate-pulse"></div>
                    <div className="p-6 bg-cyber-950 rounded-full border-2 border-orange-500/50 relative z-10 shadow-[0_0_30px_rgba(249,115,22,0.3)]">
                      <Brain size={48} className="text-orange-400 animate-pulse" />
                    </div>
                  </div>

                  {/* Action */}
                  <div className="flex justify-center">
                    <div className="h-12 w-0.5 bg-gradient-to-b from-orange-500/50 to-transparent relative">
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-orange-400 rounded-full animate-[move-down_2s_linear_infinite]"></div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center bg-white/5 p-4 rounded-2xl border border-white/10">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-red-500/20 rounded-xl text-red-400"><AlertTriangle size={24} /></div>
                      <div>
                        <p className="text-xs text-gray-400">Prediction</p>
                        <p className="text-sm font-bold text-white">Milk depletion by 8:15 AM</p>
                      </div>
                    </div>
                    <ArrowRight className="text-gray-600" />
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-orange-500/20 rounded-xl text-orange-400"><Truck size={24} className="animate-[drive_3s_linear_infinite]" /></div>
                      <div>
                        <p className="text-xs text-gray-400">Action</p>
                        <p className="text-sm font-bold text-white">Auto-order via Dunzo</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <div className="inline-flex items-center justify-center p-4 bg-orange-500/10 rounded-2xl text-orange-400 mb-6 border border-orange-500/20">
                <Coffee size={32} />
              </div>
              <div className="text-orange-400 font-mono text-sm tracking-widest mb-2 uppercase">{expandedSlides[0].tag}</div>
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">{expandedSlides[0].title}</h3>
              <p className="text-xl text-gray-400 leading-relaxed mb-8">
                {expandedSlides[0].description}
              </p>
              <div className="inline-flex items-center gap-3 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm font-mono text-gray-300">
                <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></div>
                IMPACT: <span className="text-white font-bold">{expandedSlides[0].stat}</span>
              </div>

              <div className="mt-8">
                <Link to={PageRoute.INVENTORY_LOGIC} className="inline-flex items-center justify-center gap-2 bg-orange-500 text-black px-6 py-3 rounded-xl font-bold hover:bg-orange-400 transition-colors shadow-lg shadow-orange-500/20">
                   View Inventory Engine Details <ArrowRight size={18} />
                </Link>
              </div>
            </div>
          </div>

          {/* Use Case 2: Rainy Day Protocol */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center justify-center p-4 bg-blue-500/10 rounded-2xl text-blue-400 mb-6 border border-blue-500/20">
                <CloudRain size={32} />
              </div>
              <div className="text-blue-400 font-mono text-sm tracking-widest mb-2 uppercase">{expandedSlides[1].tag}</div>
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">{expandedSlides[1].title}</h3>
              <p className="text-xl text-gray-400 leading-relaxed mb-8">
                {expandedSlides[1].description}
              </p>
              <div className="inline-flex items-center gap-3 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm font-mono text-gray-300">
                <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
                IMPACT: <span className="text-white font-bold">{expandedSlides[1].stat}</span>
              </div>
            </div>
            <div className="relative group">
              <div className="absolute -inset-4 bg-blue-500/20 blur-3xl rounded-full opacity-30 group-hover:opacity-50 transition-opacity"></div>
              <div className="relative glass-panel rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-cyber-900 p-8">
                <div className="flex flex-col gap-6">
                  {/* Rain Animation Header */}
                  <div className="flex items-center justify-center py-8 relative overflow-hidden rounded-2xl bg-gradient-to-b from-blue-900/40 to-transparent border border-blue-500/20">
                    <CloudLightning size={64} className="text-blue-400 relative z-10 animate-pulse" />
                    {/* Raindrops */}
                    {[...Array(20)].map((_, i) => (
                      <div 
                        key={i} 
                        className="absolute w-0.5 h-4 bg-blue-400/40 rounded-full"
                        style={{
                          left: `${Math.random() * 100}%`,
                          top: `-${Math.random() * 20}%`,
                          animation: `rain ${0.5 + Math.random() * 0.5}s linear infinite`,
                          animationDelay: `${Math.random()}s`
                        }}
                      ></div>
                    ))}
                    <div className="absolute bottom-4 left-4 bg-black/50 px-3 py-1 rounded-full border border-blue-500/30 text-xs font-mono text-blue-300 backdrop-blur-sm">
                      SENSOR: RAIN DETECTED
                    </div>
                  </div>

                  {/* Automated Actions */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white/5 p-4 rounded-2xl border border-white/10 relative overflow-hidden group/card">
                      <div className="absolute inset-0 bg-blue-500/5 translate-y-full group-hover/card:translate-y-0 transition-transform"></div>
                      <Clock size={20} className="text-blue-400 mb-3" />
                      <p className="text-xs text-gray-400 mb-1">Prep Time Buffer</p>
                      <div className="flex items-end gap-2">
                        <span className="text-xl font-bold text-white line-through opacity-50">15m</span>
                        <span className="text-2xl font-bold text-blue-400">30m</span>
                      </div>
                    </div>
                    <div className="bg-white/5 p-4 rounded-2xl border border-white/10 relative overflow-hidden group/card">
                      <div className="absolute inset-0 bg-blue-500/5 translate-y-full group-hover/card:translate-y-0 transition-transform"></div>
                      <Smartphone size={20} className="text-blue-400 mb-3" />
                      <p className="text-xs text-gray-400 mb-1">Push Notification</p>
                      <p className="text-sm font-bold text-white">"Chai & Pakoda Weather!"</p>
                      <div className="mt-2 text-[10px] text-blue-400 font-mono">SENT TO 450 LOCALS</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Use Case 3: The Biryani Index */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1 relative group">
              <div className="absolute -inset-4 bg-red-500/20 blur-3xl rounded-full opacity-30 group-hover:opacity-50 transition-opacity"></div>
              <div className="relative glass-panel rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-cyber-900 p-8">
                <div className="flex flex-col gap-6">
                  {/* Clock and Status */}
                  <div className="flex justify-between items-center bg-red-500/10 p-4 rounded-2xl border border-red-500/20">
                    <div className="flex items-center gap-3">
                      <Clock size={24} className="text-red-400 animate-pulse" />
                      <div>
                        <p className="text-xs text-red-400/70 font-mono">CURRENT TIME</p>
                        <p className="text-xl font-bold text-red-400 tracking-wider">09:30 PM</p>
                      </div>
                    </div>
                    <div className="px-3 py-1 bg-red-500 text-white text-xs font-bold rounded-full animate-pulse">
                      DYNAMIC PRICING ACTIVE
                    </div>
                  </div>

                  {/* Price Drop Visualization */}
                  <div className="relative h-48 w-full bg-cyber-950 rounded-2xl border border-white/5 p-4 overflow-hidden">
                    {/* Grid */}
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:20px_20px]"></div>
                    
                    {/* Graph Line */}
                    <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
                      <path d="M 0 20 Q 25 20 50 50 T 100 80" fill="none" stroke="#f87171" strokeWidth="3" className="animate-[dash_2s_ease-out_forwards]" strokeDasharray="200" strokeDashoffset="200" />
                      {/* Points */}
                      <circle cx="0" cy="20" r="3" fill="#f87171" />
                      <circle cx="50" cy="50" r="3" fill="#f87171" />
                      <circle cx="100" cy="80" r="3" fill="#f87171" />
                    </svg>

                    {/* Labels */}
                    <div className="absolute top-4 left-4 bg-black/80 px-2 py-1 rounded text-xs font-mono text-gray-400 border border-white/10">
                      9:00 PM: ₹250
                    </div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black/80 px-2 py-1 rounded text-xs font-mono text-red-400 border border-red-500/30">
                      9:30 PM: ₹225 (-10%)
                    </div>
                    <div className="absolute bottom-4 right-4 bg-black/80 px-2 py-1 rounded text-xs font-mono text-red-500 border border-red-500/50">
                      10:00 PM: ₹200 (-20%)
                    </div>
                  </div>

                  {/* Inventory Status */}
                  <div className="flex justify-between items-center px-2">
                    <span className="text-sm text-gray-400">Biryani Portions Left:</span>
                    <div className="flex items-center gap-2">
                      <span className="text-xl font-bold text-white">12</span>
                      <ArrowDownRight size={16} className="text-red-400" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <div className="inline-flex items-center justify-center p-4 bg-red-500/10 rounded-2xl text-red-400 mb-6 border border-red-500/20">
                <TrendingUp size={32} />
              </div>
              <div className="text-red-400 font-mono text-sm tracking-widest mb-2 uppercase">{expandedSlides[2].tag}</div>
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">{expandedSlides[2].title}</h3>
              <p className="text-xl text-gray-400 leading-relaxed mb-8">
                {expandedSlides[2].description}
              </p>
              <div className="inline-flex items-center gap-3 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm font-mono text-gray-300">
                <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
                IMPACT: <span className="text-white font-bold">{expandedSlides[2].stat}</span>
              </div>
              
              <div className="mt-8">
                <Link to={PageRoute.DYNAMIC_PRICING} className="inline-flex items-center justify-center gap-2 bg-red-500 text-white px-6 py-3 rounded-xl font-bold hover:bg-red-400 transition-colors shadow-lg shadow-red-500/20">
                   View Dynamic Pricing Engine <ArrowRight size={18} />
                </Link>
              </div>
            </div>
          </div>

          {/* Use Case 4: Vendor Auto-Negotiation */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center justify-center p-4 bg-green-500/10 rounded-2xl text-green-400 mb-6 border border-green-500/20">
                <Truck size={32} />
              </div>
              <div className="text-green-400 font-mono text-sm tracking-widest mb-2 uppercase">{expandedSlides[3].tag}</div>
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">{expandedSlides[3].title}</h3>
              <p className="text-xl text-gray-400 leading-relaxed mb-8">
                {expandedSlides[3].description}
              </p>
              <div className="inline-flex items-center gap-3 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm font-mono text-gray-300">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                IMPACT: <span className="text-white font-bold">{expandedSlides[3].stat}</span>
              </div>
            </div>
            <div className="relative group">
              <div className="absolute -inset-4 bg-green-500/20 blur-3xl rounded-full opacity-30 group-hover:opacity-50 transition-opacity"></div>
              <div className="relative glass-panel rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-cyber-900 p-8">
                <div className="flex flex-col gap-6">
                  {/* Network Graph */}
                  <div className="relative h-48 flex items-center justify-center">
                    {/* Central Node */}
                    <div className="absolute z-10 p-4 bg-green-500/20 border border-green-500/50 rounded-full animate-pulse shadow-[0_0_20px_rgba(34,197,94,0.4)]">
                      <Brain size={32} className="text-green-400" />
                    </div>
                    {/* Cafe Nodes */}
                    {[...Array(5)].map((_, i) => {
                      const angle = (i * 2 * Math.PI) / 5;
                      const x = Math.cos(angle) * 80;
                      const y = Math.sin(angle) * 80;
                      return (
                        <div key={i} className="absolute" style={{ transform: `translate(${x}px, ${y}px)` }}>
                          <div className="w-8 h-8 bg-cyber-800 border border-gray-600 rounded-full flex items-center justify-center z-20 relative">
                            <Coffee size={14} className="text-gray-400" />
                          </div>
                          {/* Connecting Line */}
                          <svg className="absolute top-1/2 left-1/2 w-24 h-24 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0" style={{ transform: `translate(-50%, -50%) rotate(${angle}rad)` }}>
                            <line x1="16" y1="48" x2="80" y2="48" stroke="#22c55e" strokeWidth="2" strokeDasharray="4 4" className="animate-[data-stream_1s_linear_infinite]" opacity="0.5" />
                          </svg>
                        </div>
                      );
                    })}
                  </div>
                  {/* Negotiation Result */}
                  <div className="bg-white/5 p-4 rounded-2xl border border-white/10 flex justify-between items-center">
                    <div>
                      <p className="text-xs text-gray-400">Aggregated Volume</p>
                      <p className="text-lg font-bold text-white">120kg Tomatoes</p>
                    </div>
                    <ArrowRight className="text-green-400" />
                    <div className="text-right">
                      <p className="text-xs text-gray-400">Negotiated Rate</p>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-500 line-through">₹40/kg</span>
                        <span className="text-xl font-bold text-green-400">₹34/kg</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Use Case 5: Staff Language Bridge */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1 relative group">
              <div className="absolute -inset-4 bg-purple-500/20 blur-3xl rounded-full opacity-30 group-hover:opacity-50 transition-opacity"></div>
              <div className="relative glass-panel rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-cyber-900 p-8">
                <div className="flex flex-col gap-8">
                  {/* Input Side */}
                  <div className="bg-white/5 p-4 rounded-2xl border border-white/10 relative">
                    <div className="absolute -top-3 -left-3 p-2 bg-cyber-950 border border-white/10 rounded-full">
                      <Smartphone size={16} className="text-gray-400" />
                    </div>
                    <p className="text-xs text-gray-500 mb-2">WAITER (POS INPUT)</p>
                    <div className="font-mono text-sm text-white bg-black/50 p-3 rounded border border-gray-800">
                      1x Masala Dosa<br/>
                      <span className="text-purple-400">Note: Less Spicy, Extra Chutney</span>
                    </div>
                  </div>
                  
                  {/* Translation Core */}
                  <div className="flex justify-center relative py-2">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-px h-full bg-gradient-to-b from-purple-500/50 to-purple-500/50 border-l border-dashed border-purple-500/30"></div>
                    </div>
                    <div className="p-3 bg-purple-500/20 rounded-xl border border-purple-500/50 relative z-10 flex items-center gap-2 backdrop-blur-md">
                      <Brain size={20} className="text-purple-400 animate-pulse" />
                      <span className="text-xs font-bold text-purple-300 tracking-widest">NLP TRANSLATION</span>
                    </div>
                  </div>

                  {/* Output Side */}
                  <div className="bg-purple-500/10 p-4 rounded-2xl border border-purple-500/30 relative">
                    <div className="absolute -top-3 -right-3 p-2 bg-cyber-950 border border-purple-500/30 rounded-full">
                      <Mic size={16} className="text-purple-400" />
                    </div>
                    <p className="text-xs text-purple-400/70 mb-2 text-right">CHEF (KDS AUDIO)</p>
                    <div className="flex items-center justify-end gap-3">
                      <div className="flex gap-1">
                        {[...Array(5)].map((_, i) => (
                          <div key={i} className="w-1 bg-purple-400 rounded-full animate-[pulse-height_1s_ease-in-out_infinite]" style={{ animationDelay: `${i * 0.1}s`, height: `${10 + Math.random() * 20}px` }}></div>
                        ))}
                      </div>
                      <div className="font-mono text-sm text-white bg-black/50 p-3 rounded border border-purple-500/20">
                        "Swalpa Khara, Extra Chutney"
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <div className="inline-flex items-center justify-center p-4 bg-purple-500/10 rounded-2xl text-purple-400 mb-6 border border-purple-500/20">
                <Mic size={32} />
              </div>
              <div className="text-purple-400 font-mono text-sm tracking-widest mb-2 uppercase">{expandedSlides[4].tag}</div>
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">{expandedSlides[4].title}</h3>
              <p className="text-xl text-gray-400 leading-relaxed mb-8">
                {expandedSlides[4].description}
              </p>
              <div className="inline-flex items-center gap-3 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm font-mono text-gray-300">
                <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse"></div>
                IMPACT: <span className="text-white font-bold">{expandedSlides[4].stat}</span>
              </div>
              
              <div className="mt-8">
                <Link to={PageRoute.LANGUAGE_BRIDGE} className="inline-flex items-center justify-center gap-2 bg-purple-500 text-white px-6 py-3 rounded-xl font-bold hover:bg-purple-400 transition-colors shadow-lg shadow-purple-500/20">
                   View NLP Architecture <ArrowRight size={18} />
                </Link>
              </div>
            </div>
          </div>

          {/* Use Case 6: The 'Bandh' Shield */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center justify-center p-4 bg-yellow-500/10 rounded-2xl text-yellow-400 mb-6 border border-yellow-500/20">
                <ShieldAlert size={32} />
              </div>
              <div className="text-yellow-400 font-mono text-sm tracking-widest mb-2 uppercase">{expandedSlides[5].tag}</div>
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">{expandedSlides[5].title}</h3>
              <p className="text-xl text-gray-400 leading-relaxed mb-8">
                {expandedSlides[5].description}
              </p>
              <div className="inline-flex items-center gap-3 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm font-mono text-gray-300">
                <div className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse"></div>
                IMPACT: <span className="text-white font-bold">{expandedSlides[5].stat}</span>
              </div>
            </div>
            <div className="relative group">
              <div className="absolute -inset-4 bg-yellow-500/20 blur-3xl rounded-full opacity-30 group-hover:opacity-50 transition-opacity"></div>
              <div className="relative glass-panel rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-cyber-900 p-8">
                <div className="flex flex-col gap-6">
                  <div className="flex justify-between gap-4">
                    {/* Fake News Stream */}
                    <div className="flex-1 bg-red-500/5 border border-red-500/20 rounded-xl p-4 relative overflow-hidden">
                      <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(239,68,68,0.1)_50%,transparent_75%)] bg-[length:20px_20px] animate-[flow_2s_linear_infinite]"></div>
                      <p className="text-[10px] text-red-400 font-bold mb-3 relative z-10">UNVERIFIED SOURCES</p>
                      <div className="space-y-2 relative z-10">
                        <div className="bg-black/50 p-2 rounded text-xs text-gray-400 border border-red-500/30 line-through decoration-red-500">WhatsApp: "Total shutdown today!"</div>
                        <div className="bg-black/50 p-2 rounded text-xs text-gray-400 border border-red-500/30 line-through decoration-red-500">Twitter: "Riots near MG Road"</div>
                      </div>
                    </div>
                    
                    {/* Shield Core */}
                    <div className="flex items-center justify-center px-2">
                      <div className="w-12 h-12 rounded-full bg-yellow-500/20 border-2 border-yellow-500 flex items-center justify-center shadow-[0_0_15px_rgba(234,179,8,0.5)] z-20">
                        <ShieldAlert size={24} className="text-yellow-400" />
                      </div>
                    </div>

                    {/* Verified Stream */}
                    <div className="flex-1 bg-green-500/5 border border-green-500/20 rounded-xl p-4">
                      <p className="text-[10px] text-green-400 font-bold mb-3">POLICE API TICKER</p>
                      <div className="space-y-2">
                        <div className="bg-black/50 p-2 rounded text-xs text-white border border-green-500/30 flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                          "Section 144 lifted. Normalcy restored."
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* System Directive */}
                  <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4 text-center">
                    <p className="text-xs text-yellow-400/70 font-mono mb-1">SYSTEM DIRECTIVE</p>
                    <p className="text-lg font-bold text-yellow-400">SAFE TO OPEN. IGNORING RUMORS.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Use Case 7: Smart-Menu Engineering */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1 relative group">
              <div className="absolute -inset-4 bg-pink-500/20 blur-3xl rounded-full opacity-30 group-hover:opacity-50 transition-opacity"></div>
              <div className="relative glass-panel rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-cyber-900 p-8">
                <div className="flex flex-col gap-6">
                  {/* Traffic Gauge */}
                  <div className="flex items-center justify-between bg-white/5 p-4 rounded-2xl border border-white/10">
                    <div>
                      <p className="text-xs text-gray-400 font-mono">CURRENT TRAFFIC</p>
                      <p className="text-xl font-bold text-pink-400">PEAK HOUR (1:30 PM)</p>
                    </div>
                    <div className="w-24 h-4 bg-gray-800 rounded-full overflow-hidden border border-gray-700">
                      <div className="h-full bg-gradient-to-r from-green-500 via-yellow-500 to-pink-500 w-[90%] animate-pulse"></div>
                    </div>
                  </div>

                  {/* Menu Items */}
                  <div className="space-y-3">
                    <div className="bg-cyber-950 p-3 rounded-xl border border-gray-700 flex justify-between items-center">
                      <div>
                        <p className="text-sm font-bold text-white">Quick Thali</p>
                        <p className="text-[10px] text-green-400">Prep: 2 mins • Margin: High</p>
                      </div>
                      <div className="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded font-bold">PROMOTED</div>
                    </div>
                    <div className="bg-cyber-950 p-3 rounded-xl border border-gray-700 flex justify-between items-center">
                      <div>
                        <p className="text-sm font-bold text-white">Filter Coffee</p>
                        <p className="text-[10px] text-green-400">Prep: 1 min • Margin: High</p>
                      </div>
                      <div className="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded font-bold">PROMOTED</div>
                    </div>
                    <div className="bg-cyber-950/50 p-3 rounded-xl border border-gray-800 flex justify-between items-center opacity-50 grayscale">
                      <div>
                        <p className="text-sm font-bold text-gray-400">Exotic Sizzler</p>
                        <p className="text-[10px] text-red-400">Prep: 25 mins • Margin: Low</p>
                      </div>
                      <div className="px-2 py-1 bg-red-500/20 text-red-400 text-xs rounded font-bold">HIDDEN</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <div className="inline-flex items-center justify-center p-4 bg-pink-500/10 rounded-2xl text-pink-400 mb-6 border border-pink-500/20">
                <Menu size={32} />
              </div>
              <div className="text-pink-400 font-mono text-sm tracking-widest mb-2 uppercase">{expandedSlides[6].tag}</div>
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">{expandedSlides[6].title}</h3>
              <p className="text-xl text-gray-400 leading-relaxed mb-8">
                {expandedSlides[6].description}
              </p>
              <div className="inline-flex items-center gap-3 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm font-mono text-gray-300">
                <div className="w-2 h-2 rounded-full bg-pink-500 animate-pulse"></div>
                IMPACT: <span className="text-white font-bold">{expandedSlides[6].stat}</span>
              </div>
            </div>
          </div>

          {/* Use Case 8: Customer 'Face-Pay' */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center justify-center p-4 bg-cyan-500/10 rounded-2xl text-cyan-400 mb-6 border border-cyan-500/20">
                <UserCheck size={32} />
              </div>
              <div className="text-cyan-400 font-mono text-sm tracking-widest mb-2 uppercase">{expandedSlides[7].tag}</div>
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">{expandedSlides[7].title}</h3>
              <p className="text-xl text-gray-400 leading-relaxed mb-8">
                {expandedSlides[7].description}
              </p>
              <div className="inline-flex items-center gap-3 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm font-mono text-gray-300">
                <div className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse"></div>
                IMPACT: <span className="text-white font-bold">{expandedSlides[7].stat}</span>
              </div>
            </div>
            <div className="relative group">
              <div className="absolute -inset-4 bg-cyan-500/20 blur-3xl rounded-full opacity-30 group-hover:opacity-50 transition-opacity"></div>
              <div className="relative glass-panel rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-cyber-900 p-8">
                <div className="flex flex-col gap-6 items-center">
                  {/* Face Scan UI */}
                  <div className="relative w-40 h-40 rounded-full border-2 border-dashed border-cyan-500/50 flex items-center justify-center overflow-hidden">
                    <div className="absolute inset-0 bg-cyan-500/10 animate-pulse"></div>
                    <div className="absolute top-0 left-0 w-full h-1 bg-cyan-400 shadow-[0_0_10px_#22d3ee] animate-[scan_2s_ease-in-out_infinite]"></div>
                    <UserCheck size={64} className="text-cyan-400 relative z-10" />
                  </div>
                  
                  {/* Match Result */}
                  <div className="w-full bg-cyan-500/10 border border-cyan-500/30 rounded-xl p-4 text-center animate-in fade-in zoom-in duration-500">
                    <p className="text-xs text-cyan-400 font-mono mb-2">MATCH: VIP CUSTOMER #4092</p>
                    <div className="flex justify-between items-center bg-black/50 p-3 rounded-lg border border-cyan-500/20">
                      <div className="text-left">
                        <p className="text-[10px] text-gray-400">USUAL ORDER</p>
                        <p className="text-sm font-bold text-white">Large Cappuccino</p>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] text-gray-400">CREDITS</p>
                        <p className="text-sm font-bold text-cyan-400">₹150 Applied</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Use Case 9: Energy Vampire Hunter */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1 relative group">
              <div className="absolute -inset-4 bg-lime-500/20 blur-3xl rounded-full opacity-30 group-hover:opacity-50 transition-opacity"></div>
              <div className="relative glass-panel rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-cyber-900 p-8">
                <div className="flex flex-col gap-6">
                  {/* Floor Plan Grid */}
                  <div className="grid grid-cols-2 gap-4 h-48">
                    {/* Zone 1: Active */}
                    <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex flex-col justify-between relative overflow-hidden">
                      <div className="absolute top-2 right-2 w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <p className="text-xs font-mono text-gray-400">ZONE A: SEATING</p>
                      <div className="flex justify-between items-end">
                        <div className="text-white"><Users size={20} className="mb-1"/> <span className="text-sm">12 Pax</span></div>
                        <div className="text-lime-400 text-right"><Battery size={20} className="mb-1 ml-auto"/> <span className="text-sm">100% AC</span></div>
                      </div>
                    </div>
                    {/* Zone 2: Empty */}
                    <div className="bg-red-500/5 border border-red-500/20 rounded-xl p-4 flex flex-col justify-between relative overflow-hidden">
                      <div className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></div>
                      <p className="text-xs font-mono text-gray-400">ZONE B: PATIO</p>
                      <div className="flex justify-between items-end opacity-50">
                        <div className="text-gray-500"><Users size={20} className="mb-1"/> <span className="text-sm">0 Pax</span></div>
                        <div className="text-red-400 text-right"><Battery size={20} className="mb-1 ml-auto"/> <span className="text-sm">AC OFF</span></div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Status Bar */}
                  <div className="bg-lime-500/10 border border-lime-500/30 rounded-xl p-3 flex justify-between items-center">
                    <span className="text-xs text-lime-400 font-mono">SMART PLUGS: ACTIVE</span>
                    <span className="text-sm font-bold text-lime-400">-2.4 kWh Saved Today</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <div className="inline-flex items-center justify-center p-4 bg-lime-500/10 rounded-2xl text-lime-400 mb-6 border border-lime-500/20">
                <Battery size={32} />
              </div>
              <div className="text-lime-400 font-mono text-sm tracking-widest mb-2 uppercase">{expandedSlides[8].tag}</div>
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">{expandedSlides[8].title}</h3>
              <p className="text-xl text-gray-400 leading-relaxed mb-8">
                {expandedSlides[8].description}
              </p>
              <div className="inline-flex items-center gap-3 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm font-mono text-gray-300">
                <div className="w-2 h-2 rounded-full bg-lime-500 animate-pulse"></div>
                IMPACT: <span className="text-white font-bold">{expandedSlides[8].stat}</span>
              </div>
            </div>
          </div>

          {/* Use Case 10: The 'Review Ambulance' */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center justify-center p-4 bg-indigo-500/10 rounded-2xl text-indigo-400 mb-6 border border-indigo-500/20">
                <MessageSquare size={32} />
              </div>
              <div className="text-indigo-400 font-mono text-sm tracking-widest mb-2 uppercase">{expandedSlides[9].tag}</div>
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">{expandedSlides[9].title}</h3>
              <p className="text-xl text-gray-400 leading-relaxed mb-8">
                {expandedSlides[9].description}
              </p>
              <div className="inline-flex items-center gap-3 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm font-mono text-gray-300">
                <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></div>
                IMPACT: <span className="text-white font-bold">{expandedSlides[9].stat}</span>
              </div>
            </div>
            <div className="relative group">
              <div className="absolute -inset-4 bg-indigo-500/20 blur-3xl rounded-full opacity-30 group-hover:opacity-50 transition-opacity"></div>
              <div className="relative glass-panel rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-cyber-900 p-8">
                <div className="flex flex-col gap-6">
                  {/* Review Alert */}
                  <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-2 bg-red-500 text-white text-[10px] font-bold rounded-bl-xl">1 STAR ALERT</div>
                    <div className="flex gap-1 mb-2 text-red-500">★☆☆☆☆</div>
                    <p className="text-sm text-gray-300 italic">"Food was cold by the time it arrived. Very disappointed."</p>
                    <p className="text-xs text-gray-500 mt-2">- Rahul K. (via Google Maps)</p>
                  </div>

                  {/* AI Processing */}
                  <div className="flex justify-center">
                    <div className="w-px h-8 bg-indigo-500/50"></div>
                  </div>
                  <div className="flex items-center justify-center gap-3 bg-indigo-500/10 border border-indigo-500/30 rounded-full py-2 px-4 mx-auto w-max">
                    <Brain size={16} className="text-indigo-400 animate-pulse" />
                    <span className="text-xs font-mono text-indigo-300">AI DRAFTING RESPONSE...</span>
                  </div>
                  <div className="flex justify-center">
                    <div className="w-px h-8 bg-indigo-500/50"></div>
                  </div>

                  {/* AI Response */}
                  <div className="bg-white/5 border border-white/10 rounded-xl p-4 relative">
                    <div className="absolute -left-3 top-4 p-1.5 bg-indigo-500 rounded-full border border-cyber-900">
                      <MessageSquare size={12} className="text-white" />
                    </div>
                    <p className="text-xs text-indigo-400 font-mono mb-2">AUTO-DRAFTED REPLY</p>
                    <p className="text-sm text-gray-300">"Hi Rahul, we're so sorry your food arrived cold. That's not our standard. We've sent a 100% refund to your original payment method and a ₹200 voucher for your next visit. We hope you give us another chance!"</p>
                    <div className="mt-4 flex gap-2">
                      <button className="flex-1 bg-indigo-500 hover:bg-indigo-600 text-white text-xs font-bold py-2 rounded transition-colors">APPROVE & SEND</button>
                      <button className="flex-1 bg-white/10 hover:bg-white/20 text-white text-xs font-bold py-2 rounded transition-colors">EDIT</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Use Case 11: Inventory Theft Pattern */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1 relative group">
              <div className="absolute -inset-4 bg-rose-500/20 blur-3xl rounded-full opacity-30 group-hover:opacity-50 transition-opacity"></div>
              <div className="relative glass-panel rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-cyber-900 p-8">
                <div className="flex flex-col gap-6">
                  {/* Data Streams */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
                      <p className="text-[10px] text-gray-400 font-mono mb-2">POS SALES DATA</p>
                      <p className="text-2xl font-bold text-white">10</p>
                      <p className="text-xs text-gray-500">Coffees Sold</p>
                      <p className="text-xs text-green-400 mt-2">Expected Beans: 200g</p>
                    </div>
                    <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
                      <p className="text-[10px] text-gray-400 font-mono mb-2">IOT WEIGHT SENSOR</p>
                      <p className="text-2xl font-bold text-white">1.0<span className="text-sm">kg</span></p>
                      <p className="text-xs text-gray-500">Beans Depleted</p>
                      <p className="text-xs text-rose-400 mt-2">Actual Beans: 1000g</p>
                    </div>
                  </div>

                  {/* Logic Core Comparison */}
                  <div className="relative flex justify-center py-4">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-dashed border-rose-500/30"></div>
                    </div>
                    <div className="bg-cyber-950 border-2 border-rose-500/50 rounded-full p-3 relative z-10 shadow-[0_0_15px_rgba(244,63,94,0.3)]">
                      <AlertTriangle size={24} className="text-rose-500 animate-pulse" />
                    </div>
                  </div>

                  {/* Anomaly Alert */}
                  <div className="bg-rose-500/10 border border-rose-500/30 rounded-xl p-4 text-center">
                    <p className="text-xs text-rose-400 font-mono mb-1">ANOMALY DETECTED</p>
                    <p className="text-lg font-bold text-rose-500">800g Discrepancy Flagged</p>
                    <p className="text-xs text-gray-400 mt-2">CCTV timestamp (14:30 - 15:00) saved for review.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <div className="inline-flex items-center justify-center p-4 bg-rose-500/10 rounded-2xl text-rose-400 mb-6 border border-rose-500/20">
                <AlertTriangle size={32} />
              </div>
              <div className="text-rose-400 font-mono text-sm tracking-widest mb-2 uppercase">{expandedSlides[10].tag}</div>
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">{expandedSlides[10].title}</h3>
              <p className="text-xl text-gray-400 leading-relaxed mb-8">
                {expandedSlides[10].description}
              </p>
              <div className="inline-flex items-center gap-3 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm font-mono text-gray-300">
                <div className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></div>
                IMPACT: <span className="text-white font-bold">{expandedSlides[10].stat}</span>
              </div>
            </div>
          </div>

          {/* Use Case 12: Hyper-Local SEO Bot */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center justify-center p-4 bg-sky-500/10 rounded-2xl text-sky-400 mb-6 border border-sky-500/20">
                <Search size={32} />
              </div>
              <div className="text-sky-400 font-mono text-sm tracking-widest mb-2 uppercase">{expandedSlides[11].tag}</div>
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">{expandedSlides[11].title}</h3>
              <p className="text-xl text-gray-400 leading-relaxed mb-8">
                {expandedSlides[11].description}
              </p>
              <div className="inline-flex items-center gap-3 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm font-mono text-gray-300">
                <div className="w-2 h-2 rounded-full bg-sky-500 animate-pulse"></div>
                IMPACT: <span className="text-white font-bold">{expandedSlides[11].stat}</span>
              </div>
            </div>
            <div className="relative group">
              <div className="absolute -inset-4 bg-sky-500/20 blur-3xl rounded-full opacity-30 group-hover:opacity-50 transition-opacity"></div>
              <div className="relative glass-panel rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-cyber-900 p-8">
                <div className="flex flex-col gap-6">
                  {/* Trigger */}
                  <div className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-xl p-4">
                    <div className="p-3 bg-orange-500/20 rounded-full text-orange-400">
                      <Coffee size={20} />
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 font-mono">KITCHEN TRIGGER</p>
                      <p className="text-sm font-bold text-white">Batch #42 (Samosas) Ready</p>
                    </div>
                  </div>

                  {/* Automation Flow */}
                  <div className="flex justify-center">
                    <div className="w-px h-6 bg-sky-500/50 relative">
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-sky-400 rounded-full animate-[move-down_1s_linear_infinite]"></div>
                    </div>
                  </div>

                  {/* Google Post Preview */}
                  <div className="bg-white rounded-xl overflow-hidden text-gray-900">
                    <div className="bg-gray-100 p-3 border-b border-gray-200 flex items-center gap-2">
                      <div className="w-8 h-8 bg-sky-500 rounded-full flex items-center justify-center text-white font-bold text-xs">G</div>
                      <div>
                        <p className="text-xs font-bold">Google Business Profile</p>
                        <p className="text-[10px] text-gray-500">Auto-posted just now</p>
                      </div>
                    </div>
                    <div className="p-4">
                      <p className="text-sm mb-3">🔥 Hot & Fresh! A new batch of our famous Samosas just came out of the fryer. Grab them while they last!</p>
                      <div className="h-24 bg-orange-100 rounded-lg border border-orange-200 flex items-center justify-center">
                        <span className="text-orange-500 text-xs font-bold">[Auto-Generated Image]</span>
                      </div>
                    </div>
                  </div>

                  {/* Result */}
                  <div className="bg-sky-500/10 border border-sky-500/30 rounded-xl p-3 flex justify-between items-center">
                    <span className="text-xs text-sky-400 font-mono">SEARCH VISIBILITY</span>
                    <span className="text-sm font-bold text-sky-400 flex items-center gap-1"><TrendingUp size={14}/> Spiking in 2km radius</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Use Case 13: Compliance Autopilot */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1 relative group">
              <div className="absolute -inset-4 bg-emerald-500/20 blur-3xl rounded-full opacity-30 group-hover:opacity-50 transition-opacity"></div>
              <div className="relative glass-panel rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-cyber-900 p-8">
                <div className="flex flex-col gap-4">
                  {/* Log Header */}
                  <div className="flex justify-between items-center border-b border-emerald-500/20 pb-4 mb-2">
                    <div>
                      <p className="text-xs text-emerald-400 font-mono">FSSAI DIGITAL AUDIT LOG</p>
                      <p className="text-sm font-bold text-white">Station 2: Deep Fryer</p>
                    </div>
                    <div className="px-2 py-1 bg-emerald-500/20 text-emerald-400 text-[10px] font-bold rounded border border-emerald-500/30">
                      VERIFIED
                    </div>
                  </div>

                  {/* Log Entries */}
                  <div className="space-y-3 font-mono text-xs">
                    <div className="flex items-start gap-3 p-2 bg-white/5 rounded border border-white/5">
                      <span className="text-gray-500">14:00</span>
                      <div className="flex-1">
                        <p className="text-gray-300">Scheduled Cleaning Required</p>
                        <p className="text-emerald-500/50 text-[10px]">System Prompt</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-2 bg-emerald-500/5 rounded border border-emerald-500/20">
                      <span className="text-emerald-400">14:05</span>
                      <div className="flex-1">
                        <p className="text-emerald-300">Cleaning Activity Detected</p>
                        <p className="text-emerald-500/70 text-[10px]">Source: CCTV Cam #4 (Vision AI)</p>
                      </div>
                      <ShieldAlert size={14} className="text-emerald-400" />
                    </div>
                    <div className="flex items-start gap-3 p-2 bg-white/5 rounded border border-white/5">
                      <span className="text-gray-500">14:15</span>
                      <div className="flex-1">
                        <p className="text-gray-300">Oil Temp Normal (175°C)</p>
                        <p className="text-emerald-500/50 text-[10px]">Source: IoT Sensor</p>
                      </div>
                    </div>
                  </div>

                  {/* Blockchain/Hash visualization */}
                  <div className="mt-4 pt-4 border-t border-emerald-500/20">
                    <p className="text-[8px] text-gray-500 font-mono break-all">
                      HASH: 0x8f2a...c91b (Tamper-Proof Record Generated)
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <div className="inline-flex items-center justify-center p-4 bg-emerald-500/10 rounded-2xl text-emerald-400 mb-6 border border-emerald-500/20">
                <FileText size={32} />
              </div>
              <div className="text-emerald-400 font-mono text-sm tracking-widest mb-2 uppercase">{expandedSlides[12].tag}</div>
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">{expandedSlides[12].title}</h3>
              <p className="text-xl text-gray-400 leading-relaxed mb-8">
                {expandedSlides[12].description}
              </p>
              <div className="inline-flex items-center gap-3 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm font-mono text-gray-300">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                IMPACT: <span className="text-white font-bold">{expandedSlides[12].stat}</span>
              </div>
            </div>
          </div>

          {/* Use Case 14: Dynamic Staffing */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center justify-center p-4 bg-amber-500/10 rounded-2xl text-amber-400 mb-6 border border-amber-500/20">
                <Users size={32} />
              </div>
              <div className="text-amber-400 font-mono text-sm tracking-widest mb-2 uppercase">{expandedSlides[13].tag}</div>
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">{expandedSlides[13].title}</h3>
              <p className="text-xl text-gray-400 leading-relaxed mb-8">
                {expandedSlides[13].description}
              </p>
              <div className="inline-flex items-center gap-3 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm font-mono text-gray-300">
                <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></div>
                IMPACT: <span className="text-white font-bold">{expandedSlides[13].stat}</span>
              </div>
            </div>
            <div className="relative group">
              <div className="absolute -inset-4 bg-amber-500/20 blur-3xl rounded-full opacity-30 group-hover:opacity-50 transition-opacity"></div>
              <div className="relative glass-panel rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-cyber-900 p-8">
                <div className="flex flex-col gap-6">
                  {/* Demand Graph */}
                  <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                    <div className="flex justify-between items-center mb-4">
                      <p className="text-xs text-gray-400 font-mono">PREDICTED DEMAND (TONIGHT)</p>
                      <span className="px-2 py-1 bg-amber-500/20 text-amber-400 text-[10px] font-bold rounded">SURGE DETECTED</span>
                    </div>
                    <div className="h-16 flex items-end gap-1">
                      {[40, 50, 60, 150, 160, 140, 70, 40].map((h, i) => (
                        <div key={i} className={`flex-1 rounded-t-sm ${h > 100 ? 'bg-amber-500 animate-pulse' : 'bg-gray-700'}`} style={{ height: `${(h/160)*100}%` }}></div>
                      ))}
                    </div>
                    <div className="flex justify-between mt-2 text-[10px] text-gray-500 font-mono">
                      <span>6 PM</span>
                      <span className="text-amber-400">8 PM - 10 PM</span>
                      <span>11 PM</span>
                    </div>
                  </div>

                  {/* Action */}
                  <div className="flex justify-center">
                    <ArrowDownRight size={20} className="text-amber-500/50" />
                  </div>

                  {/* Freelancer Alert */}
                  <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4 flex items-center gap-4">
                    <div className="p-3 bg-amber-500/20 rounded-full">
                      <Smartphone size={24} className="text-amber-400 animate-pulse" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-white">Alerting Freelance Pool</p>
                      <p className="text-xs text-gray-400">Requesting 2 Waiters for 4hr shift (7 PM - 11 PM)</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Use Case 15: Bangalore OG Badge */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1 relative group">
              <div className="absolute -inset-4 bg-fuchsia-500/20 blur-3xl rounded-full opacity-30 group-hover:opacity-50 transition-opacity"></div>
              <div className="relative glass-panel rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-cyber-900 p-8">
                <div className="flex flex-col items-center gap-6">
                  {/* NFT Badge */}
                  <div className="relative w-48 h-48 flex items-center justify-center">
                    {/* Glowing background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-500 to-purple-600 rounded-full blur-xl opacity-50 animate-pulse"></div>
                    {/* Coin/Badge */}
                    <div className="relative w-32 h-32 bg-cyber-950 rounded-full border-4 border-fuchsia-500 flex items-center justify-center shadow-[inset_0_0_20px_rgba(217,70,239,0.5)] z-10 overflow-hidden">
                      <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.1)_50%,transparent_75%)] bg-[length:20px_20px] animate-[flow_2s_linear_infinite]"></div>
                      <div className="text-center relative z-10">
                        <Award size={40} className="text-fuchsia-400 mx-auto mb-1" />
                        <p className="text-[10px] font-bold text-white tracking-widest">BLR OG</p>
                        <p className="text-[8px] text-fuchsia-300 font-mono mt-1">#042/100</p>
                      </div>
                    </div>
                  </div>

                  {/* Perks List */}
                  <div className="w-full bg-white/5 border border-white/10 rounded-xl p-4">
                    <p className="text-xs text-gray-400 font-mono mb-3 text-center">UNLOCKS SECRET MENU</p>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm text-gray-300">
                        <div className="w-1.5 h-1.5 bg-fuchsia-500 rounded-full"></div>
                        Truffle Fries (Not on public menu)
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-300">
                        <div className="w-1.5 h-1.5 bg-fuchsia-500 rounded-full"></div>
                        Priority Seating on Weekends
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <div className="inline-flex items-center justify-center p-4 bg-fuchsia-500/10 rounded-2xl text-fuchsia-400 mb-6 border border-fuchsia-500/20">
                <Award size={32} />
              </div>
              <div className="text-fuchsia-400 font-mono text-sm tracking-widest mb-2 uppercase">{expandedSlides[14].tag}</div>
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">{expandedSlides[14].title}</h3>
              <p className="text-xl text-gray-400 leading-relaxed mb-8">
                {expandedSlides[14].description}
              </p>
              <div className="inline-flex items-center gap-3 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm font-mono text-gray-300">
                <div className="w-2 h-2 rounded-full bg-fuchsia-500 animate-pulse"></div>
                IMPACT: <span className="text-white font-bold">{expandedSlides[14].stat}</span>
              </div>
            </div>
          </div>

          {/* Use Case 16: Waste-to-Wealth */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1 relative group">
              <div className="absolute -inset-4 bg-teal-500/20 blur-3xl rounded-full opacity-30 group-hover:opacity-50 transition-opacity"></div>
              <div className="relative glass-panel rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-cyber-900 p-8">
                <div className="flex flex-col gap-6">
                  {/* Time Trigger */}
                  <div className="flex justify-between items-center bg-teal-500/10 p-4 rounded-2xl border border-teal-500/20">
                    <div className="flex items-center gap-3">
                      <Clock size={24} className="text-teal-400 animate-pulse" />
                      <div>
                        <p className="text-xs text-teal-400/70 font-mono">SYSTEM TRIGGER</p>
                        <p className="text-xl font-bold text-teal-400 tracking-wider">10:00 PM</p>
                      </div>
                    </div>
                    <div className="px-3 py-1 bg-teal-500 text-white text-xs font-bold rounded-full animate-pulse">
                      AUTO-LISTING
                    </div>
                  </div>

                  {/* Marketplace UI */}
                  <div className="bg-cyber-950 rounded-xl border border-white/10 p-4 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/10 rounded-full blur-2xl"></div>
                    <p className="text-[10px] text-gray-400 font-mono mb-3">LOCAL MARKETPLACE API</p>
                    
                    <div className="space-y-3">
                      <div className="bg-white/5 border border-white/10 rounded-lg p-3 flex justify-between items-center">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-teal-500/20 rounded text-teal-400">
                            <Recycle size={16} />
                          </div>
                          <div>
                            <p className="text-sm font-bold text-white">Mixed Veg Scraps</p>
                            <p className="text-[10px] text-gray-400">For Composting • 5kg</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-teal-400 font-bold">₹50</p>
                          <p className="text-[10px] text-gray-500">Listed</p>
                        </div>
                      </div>
                      
                      <div className="bg-white/5 border border-white/10 rounded-lg p-3 flex justify-between items-center">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-teal-500/20 rounded text-teal-400">
                            <Recycle size={16} />
                          </div>
                          <div>
                            <p className="text-sm font-bold text-white">Leftover Rice</p>
                            <p className="text-[10px] text-gray-400">For Piggery • 12kg</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-teal-400 font-bold">₹120</p>
                          <p className="text-[10px] text-gray-500">Listed</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Revenue Impact */}
                  <div className="flex justify-between items-center px-2">
                    <span className="text-sm text-gray-400">Disposal Cost Avoided:</span>
                    <div className="flex items-center gap-2">
                      <span className="text-xl font-bold text-teal-400">+₹170</span>
                      <TrendingUp size={16} className="text-teal-400" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <div className="inline-flex items-center justify-center p-4 bg-teal-500/10 rounded-2xl text-teal-400 mb-6 border border-teal-500/20">
                <Recycle size={32} />
              </div>
              <div className="text-teal-400 font-mono text-sm tracking-widest mb-2 uppercase">{expandedSlides[15].tag}</div>
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">{expandedSlides[15].title}</h3>
              <p className="text-xl text-gray-400 leading-relaxed mb-8">
                {expandedSlides[15].description}
              </p>
              <div className="inline-flex items-center gap-3 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm font-mono text-gray-300">
                <div className="w-2 h-2 rounded-full bg-teal-500 animate-pulse"></div>
                IMPACT: <span className="text-white font-bold">{expandedSlides[15].stat}</span>
              </div>
            </div>
          </div>

          {/* Use Case 17: Competitor Watch */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center justify-center p-4 bg-violet-500/10 rounded-2xl text-violet-400 mb-6 border border-violet-500/20">
                <MapPin size={32} />
              </div>
              <div className="text-violet-400 font-mono text-sm tracking-widest mb-2 uppercase">{expandedSlides[16].tag}</div>
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">{expandedSlides[16].title}</h3>
              <p className="text-xl text-gray-400 leading-relaxed mb-8">
                {expandedSlides[16].description}
              </p>
              <div className="inline-flex items-center gap-3 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm font-mono text-gray-300">
                <div className="w-2 h-2 rounded-full bg-violet-500 animate-pulse"></div>
                IMPACT: <span className="text-white font-bold">{expandedSlides[16].stat}</span>
              </div>
            </div>
            <div className="relative group">
              <div className="absolute -inset-4 bg-violet-500/20 blur-3xl rounded-full opacity-30 group-hover:opacity-50 transition-opacity"></div>
              <div className="relative glass-panel rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-cyber-900 p-8">
                <div className="flex flex-col gap-6">
                  {/* Radar Map */}
                  <div className="relative w-full aspect-video bg-cyber-950 rounded-xl border border-violet-500/30 overflow-hidden flex items-center justify-center">
                    {/* Radar Grid */}
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(139,92,246,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.1)_1px,transparent_1px)] bg-[size:20px_20px]"></div>
                    
                    {/* Radar Sweep */}
                    <div className="absolute inset-0 border-2 border-violet-500/20 rounded-full animate-[spin_4s_linear_infinite]">
                      <div className="w-1/2 h-full bg-gradient-to-r from-transparent to-violet-500/20 origin-right"></div>
                    </div>
                    
                    {/* Your Location */}
                    <div className="absolute z-10 p-2 bg-white/10 rounded-full border border-white/30">
                      <div className="w-3 h-3 bg-white rounded-full shadow-[0_0_10px_white]"></div>
                    </div>
                    
                    {/* Competitor Location */}
                    <div className="absolute z-10 top-1/4 right-1/4 animate-pulse">
                      <div className="relative">
                        <div className="absolute -inset-2 bg-red-500/40 rounded-full blur-md"></div>
                        <MapPin size={24} className="text-red-500 relative z-10" />
                      </div>
                      <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 bg-red-500/20 border border-red-500/50 px-2 py-0.5 rounded text-[8px] font-mono text-red-400 whitespace-nowrap">
                        NEW CAFE DETECTED
                      </div>
                    </div>
                    
                    {/* Distance Line */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
                      <line x1="50" y1="50" x2="75" y2="25" stroke="#8b5cf6" strokeWidth="0.5" strokeDasharray="2 2" />
                      <text x="62" y="35" fill="#8b5cf6" fontSize="4" fontFamily="monospace">450m</text>
                    </svg>
                  </div>

                  {/* Tactical Response */}
                  <div className="bg-violet-500/10 border border-violet-500/30 rounded-xl p-4">
                    <p className="text-[10px] text-violet-400 font-mono mb-2">TACTICAL RESPONSE GENERATED</p>
                    <div className="bg-black/50 p-3 rounded-lg border border-white/5">
                      <p className="text-sm text-white font-bold mb-1">Launch "Loyalty Week"</p>
                      <p className="text-xs text-gray-400">Targeting top 20% customers with 2x points to prevent churn during competitor launch.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Use Case 18: The 'Exit Strategy' */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1 relative group">
              <div className="absolute -inset-4 bg-green-500/20 blur-3xl rounded-full opacity-30 group-hover:opacity-50 transition-opacity"></div>
              <div className="relative glass-panel rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-cyber-900 p-8">
                <div className="flex flex-col gap-6">
                  {/* Valuation Header */}
                  <div className="text-center mb-4">
                    <p className="text-xs text-gray-400 font-mono mb-1">LIVE VALUATION ESTIMATE</p>
                    <h4 className="text-4xl font-bold text-green-400 tracking-tight">₹4.2 Cr</h4>
                    <p className="text-[10px] text-green-500/70 mt-1">+12% vs Last Quarter</p>
                  </div>

                  {/* Metrics Grid */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
                      <p className="text-[10px] text-gray-500 font-mono mb-1">VERIFIED CASH FLOW</p>
                      <p className="text-lg font-bold text-white">₹1.4 Cr/yr</p>
                    </div>
                    <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
                      <p className="text-[10px] text-gray-500 font-mono mb-1">MARKET MULTIPLE</p>
                      <p className="text-lg font-bold text-white">3.0x</p>
                    </div>
                  </div>

                  {/* Report Generation */}
                  <div className="mt-4 bg-green-500/10 border border-green-500/30 rounded-xl p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-green-500/20 rounded-lg text-green-400">
                        <FileText size={20} />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-white">Investor Pitch Deck</p>
                        <p className="text-[10px] text-gray-400">Auto-generated from OS data</p>
                      </div>
                    </div>
                    <button className="px-3 py-1.5 bg-green-500 text-black text-xs font-bold rounded-lg hover:bg-green-400 transition-colors">
                      DOWNLOAD
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <div className="inline-flex items-center justify-center p-4 bg-green-500/10 rounded-2xl text-green-500 mb-6 border border-green-500/20">
                <DollarSign size={32} />
              </div>
              <div className="text-green-500 font-mono text-sm tracking-widest mb-2 uppercase">{expandedSlides[17].tag}</div>
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">{expandedSlides[17].title}</h3>
              <p className="text-xl text-gray-400 leading-relaxed mb-8">
                {expandedSlides[17].description}
              </p>
              <div className="inline-flex items-center gap-3 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm font-mono text-gray-300">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                IMPACT: <span className="text-white font-bold">{expandedSlides[17].stat}</span>
              </div>
            </div>
          </div>

        </div>

        {/* Divider */}
        <div className="flex items-center gap-4 mb-16">
          <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent flex-grow"></div>
          <span className="text-gray-500 font-mono text-sm tracking-widest uppercase">More Use Cases</span>
          <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent flex-grow"></div>
        </div>

        {/* Remaining Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {remainingSlides.map((slide, i) => (
            <motion.div 
              key={slide.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`bento-card rounded-2xl p-6 border border-white/5 hover:border-${slide.color.split('-')[1]}-500/50 transition-all group flex flex-col h-full`}
            >
              <div className="flex items-center gap-4 mb-4">
                <div className={`p-3 rounded-xl ${slide.bgColor} ${slide.borderColor} border group-hover:scale-110 transition-transform`}>
                  <slide.icon size={24} className={slide.color} />
                </div>
                <div>
                  <span className={`text-[10px] font-bold tracking-widest uppercase ${slide.color}`}>
                    {slide.tag}
                  </span>
                  <h3 className="text-white font-bold text-lg leading-tight">
                    {slide.title}
                  </h3>
                </div>
              </div>
              
              <p className="text-gray-400 text-sm leading-relaxed mb-6 flex-grow">
                {slide.description}
              </p>

              <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-2 text-garden-400 font-mono text-[10px]">
                  <div className="w-1.5 h-1.5 bg-garden-500 rounded-full animate-pulse"></div>
                  {slide.stat}
                </div>
                {(slide.tag === "SECURITY" || slide.tag === "COST SAVING") && (
                  <Link 
                    to={slide.tag === "SECURITY" ? PageRoute.SURVEILLANCE : PageRoute.HOME_AUTOMATION}
                    className={`text-[10px] font-bold uppercase tracking-widest ${slide.color} hover:underline flex items-center gap-1`}
                  >
                    Configure Deployment <ArrowRight size={10} />
                  </Link>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UseCasesGrid;
