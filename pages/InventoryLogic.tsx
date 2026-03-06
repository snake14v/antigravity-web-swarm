import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, TrendingUp, ShoppingBag, Zap, Activity, BarChart3, PieChart, Info } from 'lucide-react';
import { PageRoute } from '../types';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar } from 'recharts';

const data = [
  { name: 'Mon', burn: 4000, revenue: 2400, amt: 2400 },
  { name: 'Tue', burn: 3000, revenue: 1398, amt: 2210 },
  { name: 'Wed', burn: 2000, revenue: 9800, amt: 2290 },
  { name: 'Thu', burn: 2780, revenue: 3908, amt: 2000 },
  { name: 'Fri', burn: 1890, revenue: 4800, amt: 2181 },
  { name: 'Sat', burn: 2390, revenue: 3800, amt: 2500 },
  { name: 'Sun', burn: 3490, revenue: 4300, amt: 2100 },
];

const InventoryLogic: React.FC = () => {
  return (
    <div className="pt-24 min-h-screen bg-cyber-950 text-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-neon-purple/5 to-transparent"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-neon-cyan/5 rounded-full blur-[160px]"></div>
        <div className="absolute inset-0 cyber-grid opacity-10"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <Link to={PageRoute.HOME} className="inline-flex items-center gap-2 text-gray-400 hover:text-neon-cyan transition-colors mb-8 group">
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          Back to Systems
        </Link>

        <header className="mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neon-purple/10 border border-neon-purple/20 text-neon-purple text-xs font-mono mb-6">
            <Activity size={14} />
            ANALYTICS_CORE v4.2
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
            Inventory Burn <span className="text-neon-purple">vs.</span> Revenue
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl leading-relaxed">
            Understanding the correlation between stock depletion and financial performance. We turn raw logistics into a predictive growth engine.
          </p>
        </header>

        {/* Main Chart Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          <div className="lg:col-span-2 glass-panel border border-white/10 rounded-3xl p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-6 opacity-10">
              <BarChart3 size={120} className="text-neon-purple" />
            </div>
            <div className="relative z-10">
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h2 className="text-2xl font-bold text-white">Performance Correlation</h2>
                  <p className="text-sm text-gray-500">Weekly burn-to-revenue ratio analysis</p>
                </div>
                <div className="flex gap-4">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-neon-purple"></div>
                    <span className="text-xs text-gray-400">Inventory Burn</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-neon-cyan"></div>
                    <span className="text-xs text-gray-400">Revenue</span>
                  </div>
                </div>
              </div>

              <div className="h-[400px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={data}>
                    <defs>
                      <linearGradient id="colorBurn" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#a855f7" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#a855f7" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                    <XAxis 
                      dataKey="name" 
                      stroke="#666" 
                      fontSize={12} 
                      tickLine={false} 
                      axisLine={false} 
                    />
                    <YAxis 
                      stroke="#666" 
                      fontSize={12} 
                      tickLine={false} 
                      axisLine={false} 
                      tickFormatter={(value) => `$${value}`}
                    />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#0a0a0a', border: '1px solid #333', borderRadius: '12px' }}
                      itemStyle={{ fontSize: '12px' }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="burn" 
                      stroke="#a855f7" 
                      strokeWidth={3}
                      fillOpacity={1} 
                      fill="url(#colorBurn)" 
                    />
                    <Area 
                      type="monotone" 
                      dataKey="revenue" 
                      stroke="#06b6d4" 
                      strokeWidth={3}
                      fillOpacity={1} 
                      fill="url(#colorRev)" 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="glass-panel border border-white/10 rounded-3xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-neon-cyan/10 rounded-lg text-neon-cyan">
                  <TrendingUp size={20} />
                </div>
                <h3 className="font-bold text-white">Efficiency Score</h3>
              </div>
              <div className="text-4xl font-bold text-neon-cyan mb-2">94.2%</div>
              <p className="text-sm text-gray-400 leading-relaxed">
                Your inventory utilization is optimal. Minimal wastage detected in the Koramangala node.
              </p>
            </div>

            <div className="glass-panel border border-white/10 rounded-3xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-neon-purple/10 rounded-lg text-neon-purple">
                  <ShoppingBag size={20} />
                </div>
                <h3 className="font-bold text-white">Burn Velocity</h3>
              </div>
              <div className="text-4xl font-bold text-neon-purple mb-2">1.4x</div>
              <p className="text-sm text-gray-400 leading-relaxed">
                Inventory is moving 40% faster than the city average. Consider increasing stock for "Nandini Milk".
              </p>
            </div>

            <div className="glass-panel border border-white/10 rounded-3xl p-6 bg-gradient-to-br from-cyber-900 to-neon-cyan/5">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-white/10 rounded-lg text-white">
                  <Zap size={20} />
                </div>
                <h3 className="font-bold text-white">AI Insight</h3>
              </div>
              <p className="text-sm text-gray-300 italic leading-relaxed">
                "Correlation suggests that a 10% increase in stock for 'Fresh Buns' on Friday will lead to a 15% revenue spike in Indiranagar."
              </p>
            </div>
          </div>
        </div>

        {/* Explanation Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-white mb-6">How to Read the Data</h2>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-cyber-800 flex items-center justify-center text-neon-cyan flex-shrink-0 border border-white/5">
                  <Info size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-white mb-1">The Burn Rate</h4>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    This represents the speed at which your inventory is consumed. A high burn rate with low revenue indicates wastage or theft. A high burn rate with high revenue indicates a healthy, fast-moving business.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-cyber-800 flex items-center justify-center text-neon-purple flex-shrink-0 border border-white/5">
                  <PieChart size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-white mb-1">Revenue Correlation</h4>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    We map every sale back to the specific inventory item. This allows us to calculate the exact ROI for every SKU in your store.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-4 bg-neon-cyan/10 blur-2xl rounded-full opacity-50"></div>
            {/* Animated Vector Graphic: Dashboard */}
            <div className="w-full aspect-video bg-cyber-900 rounded-2xl border border-white/10 shadow-2xl relative z-10 p-6 flex flex-col gap-4 overflow-hidden">
              <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.05)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none"></div>
              
              {/* Top Bar */}
              <div className="flex justify-between items-center border-b border-white/10 pb-4">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                </div>
                <div className="h-2 w-24 bg-white/10 rounded-full animate-pulse"></div>
              </div>

              {/* Main Content Area */}
              <div className="flex-1 grid grid-cols-3 gap-4">
                {/* Left Column (Charts) */}
                <div className="col-span-2 flex flex-col gap-4">
                  <div className="flex-1 bg-cyber-950 rounded-xl border border-white/5 p-4 flex items-end gap-2 relative overflow-hidden">
                    {[30, 50, 40, 70, 60, 90, 80].map((h, i) => (
                      <div key={i} className="flex-1 bg-neon-cyan/20 rounded-t-sm relative group">
                        <div 
                          className="absolute bottom-0 left-0 w-full bg-neon-cyan transition-all duration-1000"
                          style={{ height: `${h}%`, animation: `pulse-height 3s infinite alternate ${i * 0.3}s` }}
                        ></div>
                      </div>
                    ))}
                  </div>
                  <div className="h-1/3 bg-cyber-950 rounded-xl border border-white/5 p-4 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full border-4 border-neon-purple/30 border-t-neon-purple animate-spin"></div>
                    <div className="flex-1 space-y-2">
                      <div className="h-2 w-full bg-white/10 rounded-full"></div>
                      <div className="h-2 w-2/3 bg-white/10 rounded-full"></div>
                    </div>
                  </div>
                </div>

                {/* Right Column (Stats) */}
                <div className="col-span-1 flex flex-col gap-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex-1 bg-cyber-950 rounded-xl border border-white/5 p-4 flex flex-col justify-center relative overflow-hidden">
                      <div className={`absolute right-0 top-0 w-16 h-16 bg-${i === 1 ? 'neon-cyan' : i === 2 ? 'neon-purple' : 'neon-pink'}/10 rounded-bl-full`}></div>
                      <div className="h-2 w-12 bg-white/20 rounded-full mb-2"></div>
                      <div className="h-4 w-20 bg-white/40 rounded-full animate-pulse" style={{ animationDelay: `${i * 0.2}s` }}></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InventoryLogic;
