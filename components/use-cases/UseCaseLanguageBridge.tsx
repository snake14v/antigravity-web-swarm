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

export const UseCaseLanguageBridge: React.FC<UseCaseProps> = ({ slide }) => {
  return (
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
              <div className="text-purple-400 font-mono text-sm tracking-widest mb-2 uppercase">{slide.tag}</div>
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">{slide.title}</h3>
              <p className="text-xl text-gray-400 leading-relaxed mb-8">
                {slide.description}
              </p>
              <div className="inline-flex items-center gap-3 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm font-mono text-gray-300">
                <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse"></div>
                IMPACT: <span className="text-white font-bold">{slide.stat}</span>
              </div>
              
              <div className="mt-8">
                <Link to={PageRoute.LANGUAGE_BRIDGE} className="inline-flex items-center justify-center gap-2 bg-purple-500 text-white px-6 py-3 rounded-xl font-bold hover:bg-purple-400 transition-colors shadow-lg shadow-purple-500/20">
                   View NLP Architecture <ArrowRight size={18} />
                </Link>
              </div>
            </div>
          </div>
  );
};
