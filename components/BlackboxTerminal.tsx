import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Cpu, Zap, Activity, Database, ShieldCheck, Globe } from 'lucide-react';

interface LogLine {
  id: string;
  text: string;
  type: 'info' | 'success' | 'warning' | 'error';
  timestamp: string;
}

interface BlackboxTerminalProps {
  type?: 'optimization' | 'intelligence' | 'sync' | 'security';
  title?: string;
  className?: string;
}

const LOG_TEMPLATES = {
  optimization: [
    "RE-ROUTING_SILK_BOARD_TRAFFIC...",
    "FLATTENING_DEMAND_CURVE_v4",
    "PURGING_EXPIRED_INVENTORY_METADATA",
    "SCALING_COMPUTE_NODE_BLR_02",
    "OPTIMIZING_DELIVERY_VECTORS",
    "CACHE_HIT_RATE_98.2%",
    "LOAD_BALANCING_KORAMANGALA_CLUSTER"
  ],
  intelligence: [
    "PROCESSING_VISUAL_MESH_FRAME",
    "CONSENSUS_REACHED_MODEL_v2.1",
    "ANOMALY_DETECTED_IN_FOOTFALL",
    "UPDATING_PREDICTIVE_BURN_RATE",
    "TRIGGERING_DYNAMIC_OFFER_v12",
    "CLASSIFYING_CUSTOMER_BEHAVIOR",
    "SENTIMENT_ANALYSIS_SYNCED"
  ],
  sync: [
    "HANDSHAKE_NODE_HSR_LAYOUT",
    "PEER_SYNC_IN_PROGRESS_v90",
    "RESOLVING_DATA_CONFLICT_402",
    "FETCHING_REALTIME_IMD_WEATHER",
    "UPI_WEBHOOK_HANDLED_ID_88",
    "DATABASE_REPLICATION_SUCCESS",
    "GRID_STATUS_STABLE_1402_NODES"
  ],
  security: [
    "ROTATING_ENCRYPTION_KEYS",
    "SCANNING_ACCESS_LOGS_v2",
    "ENFORCING_SOVEREIGN_DATA_POLICY",
    "THREAT_LEVEL_MINIMAL",
    "VERIFYING_DPDP_COMPLIANCE",
    "ISOLATING_EDGE_NODE_SANDBOX",
    "FIREWALL_RULES_UPDATED"
  ]
};

const BlackboxTerminal: React.FC<BlackboxTerminalProps> = ({ 
  type = 'optimization', 
  title = 'CORE_SYSTEM_LOG',
  className = ''
}) => {
  const [logs, setLogs] = useState<LogLine[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  
  const getIcon = () => {
    switch (type) {
      case 'optimization': return <Zap size={14} className="text-neon-cyan" />;
      case 'intelligence': return <Cpu size={14} className="text-neon-purple" />;
      case 'sync': return <Globe size={14} className="text-neon-amber" />;
      case 'security': return <ShieldCheck size={14} className="text-garden-400" />;
      default: return <Terminal size={14} />;
    }
  };

  const addLog = () => {
    const templates = LOG_TEMPLATES[type] || LOG_TEMPLATES.optimization;
    const text = templates[Math.floor(Math.random() * templates.length)];
    const id = Math.random().toString(36).substr(2, 9);
    const timestamp = new Date().toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' });
    
    const statusType: ('info' | 'success' | 'warning' | 'error')[] = ['info', 'success', 'info', 'info'];
    const typeSelected = statusType[Math.floor(Math.random() * statusType.length)];

    setLogs(prev => {
      const newLogs = [...prev, { id, text, timestamp, type: typeSelected }];
      return newLogs.slice(-6); // Keep only last 6 for performance
    });
  };

  useEffect(() => {
    // Initial logs
    for (let i = 0; i < 3; i++) {
      setTimeout(addLog, i * 400);
    }

    const interval = setInterval(addLog, 4000); // Slower interval for stability
    return () => clearInterval(interval);
  }, [type]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <div className={`bg-black/80 border border-white/10 rounded-xl overflow-hidden font-mono shadow-2xl backdrop-blur-xl group ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between px-3 py-2 border-b border-white/5 bg-white/5">
        <div className="flex items-center gap-2">
          {getIcon()}
          <span className="text-[10px] font-bold text-gray-400 tracking-widest uppercase">{title}</span>
        </div>
        <div className="flex gap-1">
          <div className="w-1.5 h-1.5 rounded-full bg-white/10"></div>
          <div className="w-1.5 h-1.5 rounded-full bg-white/10"></div>
          <div className="w-1.5 h-1.5 rounded-full bg-white/20 animate-pulse"></div>
        </div>
      </div>

      {/* Log Body */}
      <div 
        ref={scrollRef}
        className="p-3 h-32 overflow-hidden relative flex flex-col gap-1.5"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/30 pointer-events-none z-10"></div>
        
        <AnimatePresence initial={false}>
          {logs.map((log) => (
            <motion.div
              key={log.id}
              initial={{ opacity: 0, x: -10, filter: 'blur(5px)' }}
              animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, scale: 0.95, filter: 'blur(5px)' }}
              className="flex items-start gap-2 group/line"
            >
              <span className="text-[10px] text-gray-600 shrink-0">{log.timestamp}</span>
              <span className="text-[10px] text-gray-500 shrink-0">&gt;</span>
              <span className={`text-[10px] leading-tight break-all ${
                log.type === 'success' ? 'text-garden-400' : 
                log.type === 'warning' ? 'text-neon-amber' : 
                log.type === 'error' ? 'text-neon-pink' : 
                'text-gray-300'
              }`}>
                {log.text}
              </span>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Scanline Effect */}
        <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.02),rgba(0,255,0,0.01),rgba(0,0,255,0.02))] bg-[size:100%_2px,3px_100%] opacity-20"></div>
      </div>

      {/* Footer Footer */}
      <div className="px-3 py-1 border-t border-white/5 bg-black/40 flex justify-between items-center">
        <div className="flex items-center gap-1.5">
          <Activity size={10} className="text-garden-500 animate-pulse" />
          <span className="text-[8px] text-gray-600 uppercase font-bold">Latency: 12ms</span>
        </div>
        <span className="text-[8px] text-gray-700">v0.1.2-ALPHA</span>
      </div>
    </div>
  );
};

export default BlackboxTerminal;
