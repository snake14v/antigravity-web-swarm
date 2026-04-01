import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Brain, Network, Zap, Cloud, Database, Eye } from 'lucide-react';

interface SwarmAgentData {
  id: string;
  role: string;
  icon: React.FC<any>;
  color: string;
  x: number;
  y: number;
}

const agents: SwarmAgentData[] = [
  { id: 'master', role: 'Logic Core', icon: Brain, color: '#bd00ff', x: 50, y: 50 },
  { id: 'data', role: 'Data Mesh', icon: Database, color: '#00ccff', x: 20, y: 30 },
  { id: 'eyes', role: 'Sensory Input', icon: Eye, color: '#10b981', x: 80, y: 25 },
  { id: 'sync', role: 'Sync Node', icon: Network, color: '#f59e0b', x: 25, y: 75 },
  { id: 'compute', role: 'Cloud Compute', icon: Cloud, color: '#ec4899', x: 75, y: 80 },
];

export const SwarmAgentConcept: React.FC<{ children?: React.ReactNode, title?: string, description?: string, customHeight?: string }> = ({ children, title = "Agent Swarm Interoperability", description, customHeight = "min-h-[400px]" }) => {
  const [activePaths, setActivePaths] = useState<number[]>([]);

  useEffect(() => {
    // Randomly flash communication paths between agents
    const interval = setInterval(() => {
      const p1 = Math.floor(Math.random() * agents.length);
      const p2 = Math.floor(Math.random() * agents.length);
      if (p1 !== p2) {
        setActivePaths([p1, p2]);
        setTimeout(() => setActivePaths([]), 800);
      }
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`relative w-full ${customHeight} bg-cyber-950 rounded-2xl border border-white/10 overflow-hidden group`}>
      {/* Background Grid */}
      <div className="absolute inset-0 cyber-grid opacity-20 group-hover:opacity-40 transition-opacity duration-1000"></div>
      
      {/* Central Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-neon-purple/5 blur-[100px] rounded-full pointer-events-none"></div>

      {/* Title & Overlay Layer */}
      <div className="absolute top-0 left-0 w-full p-6 z-20 pointer-events-none">
        <h3 className="text-xl md:text-2xl font-bold text-white mb-2 flex items-center gap-2">
          <Zap className="text-neon-pink" size={24} />
          {title}
        </h3>
        {description && (
          <p className="text-sm text-gray-400 max-w-xl backdrop-blur-sm bg-cyber-950/30 rounded p-2">
            {description}
          </p>
        )}
      </div>

      {/* SVG Connections */}
      <svg className="absolute inset-0 w-full h-full z-0 pointer-events-none">
        <defs>
          <linearGradient id="laser" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#bd00ff" />
            <stop offset="50%" stopColor="#00ccff" />
            <stop offset="100%" stopColor="#00ffff" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        {agents.map((a1, i) => 
          agents.map((a2, j) => {
            if (i >= j) return null; // No duplicate lines
            const isActive = activePaths.includes(i) && activePaths.includes(j);
            return (
              <motion.line
                key={`line-${i}-${j}`}
                x1={`${a1.x}%`} y1={`${a1.y}%`}
                x2={`${a2.x}%`} y2={`${a2.y}%`}
                stroke={isActive ? "url(#laser)" : "rgba(255,255,255,0.05)"}
                strokeWidth={isActive ? 2 : 1}
                strokeDasharray={isActive ? "none" : "4 4"}
                initial={{ opacity: 0 }}
                animate={{ opacity: isActive ? 1 : 0.3 }}
                transition={{ duration: 0.3 }}
                filter={isActive ? "url(#glow)" : "none"}
              />
            );
          })
        )}
      </svg>

      {/* Floating Agent Nodes */}
      {agents.map((agent, i) => {
        const isActive = activePaths.includes(i);
        return (
          <motion.div
            key={agent.id}
            className="absolute z-10"
            style={{ left: `${agent.x}%`, top: `${agent.y}%`, x: '-50%', y: '-50%' }}
            animate={{
              y: ["-50%", "-60%", "-50%"],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <div className="relative group/node cursor-pointer">
              {/* Agent Ping Ring */}
              {isActive && (
                <span className="absolute -inset-4 rounded-full opacity-75 animate-ping bg-neon-cyan duration-1000"></span>
              )}
              
              {/* Hardware Casing */}
              <div 
                className="w-12 h-12 rounded-xl flex items-center justify-center border shadow-2xl backdrop-blur-md transition-all duration-300"
                style={{
                  backgroundColor: `${agent.color}20`,
                  borderColor: isActive ? agent.color : `${agent.color}50`,
                  boxShadow: isActive ? `0 0 20px ${agent.color}50` : 'none'
                }}
              >
                <agent.icon size={20} color={agent.color} className={isActive ? "animate-pulse" : ""} />
              </div>

              {/* Holographic Tooltip */}
              <div className="absolute top-14 left-1/2 -translate-x-1/2 opacity-0 group-hover/node:opacity-100 transition-opacity bg-black/80 border border-white/20 p-2 rounded text-xs font-mono whitespace-nowrap z-30 flex flex-col items-center">
                <span style={{ color: agent.color }}>{agent.role}</span>
                <span className="text-[8px] text-gray-500 mt-1">NODE_{agent.id.toUpperCase()}</span>
              </div>
            </div>
          </motion.div>
        );
      })}

      {/* Content Injection Area */}
      {children && (
        <div className="relative z-20 w-full h-full p-8 pt-24 flex items-center justify-center">
          {children}
        </div>
      )}
    </div>
  );
};
