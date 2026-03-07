import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { PageRoute } from '../../types';
import { 
  Coffee, CloudRain, TrendingUp, Truck, Mic, ShieldAlert, 
  Menu, UserCheck, Battery, MessageSquare, AlertTriangle, Search, FileText, 
  Users, Award, Recycle, MapPin, DollarSign, Brain, CloudLightning, Smartphone, Clock, ArrowDownRight, ArrowRight
} from 'lucide-react';

interface Slide {
  id: number;
  icon: any;
  color: string;
  bgColor: string;
  borderColor: string;
  title: string;
  description: string;
  tag: string;
  stat: string;
}

interface UseCaseProps {
  slide: Slide;
}

export const UseCaseVendorNegotiation: React.FC<UseCaseProps> = ({ slide }) => {
  return (
    {/* Use Case 4: Vendor Auto-Negotiation */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center justify-center p-4 bg-green-500/10 rounded-2xl text-green-400 mb-6 border border-green-500/20">
                <Truck size={32} />
              </div>
              <div className="text-green-400 font-mono text-sm tracking-widest mb-2 uppercase">{slide.tag}</div>
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">{slide.title}</h3>
              <p className="text-xl text-gray-400 leading-relaxed mb-8">
                {slide.description}
              </p>
              <div className="inline-flex items-center gap-3 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm font-mono text-gray-300">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                IMPACT: <span className="text-white font-bold">{slide.stat}</span>
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
  );
};
