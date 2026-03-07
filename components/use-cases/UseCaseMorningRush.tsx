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

export const UseCaseMorningRush: React.FC<UseCaseProps> = ({ slide }) => {
  return (
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
              <div className="text-orange-400 font-mono text-sm tracking-widest mb-2 uppercase">{slide.tag}</div>
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">{slide.title}</h3>
              <p className="text-xl text-gray-400 leading-relaxed mb-8">
                {slide.description}
              </p>
              <div className="inline-flex items-center gap-3 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm font-mono text-gray-300">
                <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></div>
                IMPACT: <span className="text-white font-bold">{slide.stat}</span>
              </div>

              <div className="mt-8">
                <Link to={PageRoute.INVENTORY_LOGIC} className="inline-flex items-center justify-center gap-2 bg-orange-500 text-black px-6 py-3 rounded-xl font-bold hover:bg-orange-400 transition-colors shadow-lg shadow-orange-500/20">
                   View Inventory Engine Details <ArrowRight size={18} />
                </Link>
              </div>
            </div>
          </div>
  );
};
