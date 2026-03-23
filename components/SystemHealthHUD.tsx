import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, Signal, Zap, Globe, Cpu } from 'lucide-react';

const SystemHealthHUD: React.FC = () => {
  const [latency, setLatency] = useState(14);
  const [nodes, setNodes] = useState(128);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Show after 2 seconds
    const timer = setTimeout(() => setVisible(true), 2000);
    
    const interval = setInterval(() => {
      setLatency(prev => Math.max(10, Math.min(45, prev + (Math.random() * 4 - 2))));
      if (Math.random() > 0.8) setNodes(n => n + (Math.random() > 0.5 ? 1 : -1));
    }, 3000);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div 
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 100, opacity: 0 }}
          className="fixed top-24 right-6 z-[60] hidden lg:block"
        >
          <div className="glass-panel p-4 rounded-2xl border border-white/10 bg-black/40 backdrop-blur-xl shadow-2xl relative overflow-hidden group">
            {/* Background scanner line */}
            <motion.div 
              animate={{ top: ['0%', '100%', '0%'] }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              className="absolute left-0 right-0 h-px bg-neon-cyan/20 blur-[2px]"
            />

            <div className="relative z-10 space-y-4">
              <div className="flex items-center justify-between gap-8">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                  <span className="text-[10px] font-mono font-bold tracking-widest text-white/50 group-hover:text-neon-cyan transition-colors">GRID_STATUS</span>
                </div>
                <span className="text-[10px] font-mono text-green-500">STABLE</span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5 text-[9px] text-gray-500 font-mono">
                    <Signal size={10} /> LATENCY
                  </div>
                  <div className="text-sm font-mono text-white flex items-baseline gap-1">
                    {latency.toFixed(0)}
                    <span className="text-[9px] text-gray-500">ms</span>
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5 text-[9px] text-gray-500 font-mono">
                    <Globe size={10} /> NODES
                  </div>
                  <div className="text-sm font-mono text-white">
                    {nodes}
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-white/5">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[8px] font-mono text-gray-600">THROUGHPUT</span>
                  <span className="text-[8px] font-mono text-neon-cyan">8.4 GB/s</span>
                </div>
                <div className="flex gap-0.5 h-3 items-end">
                  {[...Array(15)].map((_, i) => (
                    <motion.div
                      key={i}
                      animate={{ height: [2, Math.random() * 10 + 2, 2] }}
                      transition={{ duration: 0.5 + Math.random(), repeat: Infinity }}
                      className="w-1 bg-neon-cyan/40 rounded-t-sm"
                    />
                  ))}
                </div>
              </div>

              <button 
                onClick={() => {
                   const message = "Hi Ooru Logix, I'm checking the System Health HUD. I have a question about the network architecture.";
                   window.open(`https://wa.me/919591015279?text=${encodeURIComponent(message)}`, '_blank');
                }}
                className="w-full py-2 bg-white/5 border border-white/10 rounded-lg text-[9px] font-mono text-gray-400 hover:bg-white/10 hover:text-white transition-all flex items-center justify-center gap-2"
              >
                <Zap size={10} className="text-neon-cyan" /> CONNECT_TO_NODE
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SystemHealthHUD;
