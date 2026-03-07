import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, TrendingUp, Clock, Zap, Percent, Activity, Tag, BarChart3 } from 'lucide-react';
import { PageRoute } from '../types';
import { motion, AnimatePresence } from 'framer-motion';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

const generatePricingData = () => {
  return Array.from({ length: 12 }).map((_, i) => ({
    time: `${i + 9}:00`,
    demand: 40 + Math.random() * 60,
    price: 100 + Math.random() * 20 - (i > 8 ? (i - 8) * 15 : 0) // Prices drop late
  }));
};

const DynamicPricing: React.FC = () => {
  const [data, setData] = useState(generatePricingData());
  const [activeItem, setActiveItem] = useState('biryani');

  useEffect(() => {
    const interval = setInterval(() => {
      setData(generatePricingData());
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const items = {
    biryani: { name: 'Mutton Biryani', basePrice: 350, currentPrice: 280, discount: 20, timeToExpiry: '2h 15m', tag: 'Perishable' },
    croissant: { name: 'Butter Croissant', basePrice: 150, currentPrice: 105, discount: 30, timeToExpiry: '1h 30m', tag: 'High-Risk' },
    coffee: { name: 'Cold Brew', basePrice: 220, currentPrice: 220, discount: 0, timeToExpiry: '48h', tag: 'Stable' }
  };

  const current = items[activeItem as keyof typeof items];

  return (
    <div className="pt-24 min-h-screen bg-cyber-950 text-white relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-500/10 rounded-full blur-[128px]"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-[128px]"></div>
        <div className="absolute inset-0 cyber-grid opacity-10"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <Link to="/features#features" className="inline-flex items-center gap-2 text-gray-400 hover:text-red-400 transition-colors mb-8 group">
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          Back to Systems
        </Link>

        <header className="mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-mono mb-6"
          >
            <Activity size={14} className="animate-pulse" />
            YIELD_OPTIMIZATION v2.1
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold mb-6 tracking-tight"
          >
            Dynamic <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-400">Pricing Engine</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-400 max-w-3xl leading-relaxed"
          >
            Airlines and Ubers use algorithms to maximize yield. Why shouldn't your cafe? Our engine drops prices on perishables automatically to ensure zero waste by closing time.
          </motion.p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-2 glass-panel border border-white/10 rounded-3xl p-8"
          >
             <div className="flex justify-between items-center mb-8">
               <div>
                 <h2 className="text-2xl font-bold text-white mb-1 flex items-center gap-2">
                   <TrendingUp className="text-red-400" />
                   Real-Time Price vs. Demand
                 </h2>
                 <p className="text-gray-500 text-sm">Simulated data for a typical 12-hour cycle</p>
               </div>
               <div className="flex gap-4">
                 <div className="flex items-center gap-2">
                   <div className="w-3 h-3 rounded-full bg-orange-400 border border-orange-300"></div>
                   <span className="text-xs text-gray-400 font-mono">DEMAND_INDEX</span>
                 </div>
                 <div className="flex items-center gap-2">
                   <div className="w-3 h-3 rounded-full bg-red-500 border border-red-400"></div>
                   <span className="text-xs text-gray-400 font-mono">PRICE_CURVE</span>
                 </div>
               </div>
             </div>
             
             <div className="h-[350px] w-full mt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorDemand" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#fb923c" stopOpacity={0.4}/>
                        <stop offset="95%" stopColor="#fb923c" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#ef4444" stopOpacity={0.4}/>
                        <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#222" vertical={false} />
                    <XAxis dataKey="time" stroke="#666" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="#666" fontSize={12} tickLine={false} axisLine={false} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#0a0a0a', border: '1px solid #333', borderRadius: '12px', color: '#fff' }}
                    />
                    <Area type="monotone" dataKey="demand" stroke="#fb923c" strokeWidth={3} fillOpacity={1} fill="url(#colorDemand)" />
                    <Area type="monotone" dataKey="price" stroke="#ef4444" strokeWidth={3} fillOpacity={1} fill="url(#colorPrice)" />
                  </AreaChart>
                </ResponsiveContainer>
             </div>
          </motion.div>

          <div className="space-y-6">
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="glass-panel border border-white/10 rounded-3xl p-6"
            >
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Tag className="text-orange-400" />
                Live Terminal
              </h3>
              
              <div className="flex gap-2 mb-6 bg-cyber-900 p-1 rounded-xl" role="tablist" aria-label="Menu Items">
                {Object.keys(items).map(key => (
                  <button
                    key={key}
                    onClick={() => setActiveItem(key)}
                    role="tab"
                    aria-selected={activeItem === key}
                    aria-controls={`panel-${key}`}
                    id={`tab-${key}`}
                    className={`flex-1 py-2 text-xs font-bold rounded-lg capitalize transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-red-500 focus-visible:ring-offset-cyber-900 ${activeItem === key ? 'bg-white/10 text-white shadow-md' : 'text-gray-500 hover:text-gray-300'}`}
                  >
                    {key}
                  </button>
                ))}
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeItem}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  role="tabpanel"
                  id={`panel-${activeItem}`}
                  aria-labelledby={`tab-${activeItem}`}
                  className="bg-cyber-900/50 border border-white/5 p-4 rounded-2xl relative overflow-hidden"
                >
                  {current.discount > 0 && (
                    <div className="absolute -right-6 top-4 bg-red-500 text-white text-[10px] font-bold py-1 px-8 rotate-45">
                      -{current.discount}% AUTO
                    </div>
                  )}
                  
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-bold text-lg text-white">{current.name}</h4>
                    <span className="text-[10px] bg-white/10 text-gray-400 px-2 py-0.5 rounded border border-white/10">{current.tag}</span>
                  </div>
                  
                  <div className="flex items-end gap-2 my-4 relative z-10">
                    <span className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-400">
                      ₹{current.currentPrice}
                    </span>
                    {current.discount > 0 && (
                      <span className="text-lg text-gray-500 line-through mb-1">₹{current.basePrice}</span>
                    )}
                  </div>

                  <div className="flex items-center gap-2 text-xs text-gray-400 mt-2 p-2 bg-red-500/10 border border-red-500/20 rounded-lg">
                    <Clock size={14} className="text-red-400" />
                    <span>Expires in <strong className="text-white">{current.timeToExpiry}</strong></span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </motion.div>
            
            <motion.div 
               initial={{ opacity: 0, x: 20 }}
               animate={{ opacity: 1, x: 0 }}
               transition={{ delay: 0.5 }}
               className="glass-panel border border-white/10 rounded-3xl p-6 bg-gradient-to-br from-cyber-900 to-red-500/10"
            >
               <div className="flex items-center gap-3 mb-4">
                 <div className="p-2 bg-red-500/20 rounded-lg text-red-400">
                   <Percent size={20} />
                 </div>
                 <h3 className="font-bold text-white">Wastage Averted</h3>
               </div>
               <div className="text-4xl font-bold text-white mb-2">~18%</div>
               <p className="text-sm text-gray-300 leading-relaxed">
                 Average reduction in thrown-away food for participating Bellandur nodes using this module.
               </p>
            </motion.div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default DynamicPricing;
