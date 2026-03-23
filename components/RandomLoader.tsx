import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Database, Cpu, Globe, Zap, Shield, Search } from 'lucide-react';

const CyberTerminal = () => {
  const [logs, setLogs] = useState<string[]>([]);
  const potentialLogs = [
    "INITIALIZING_CORE_ENGINE...",
    "SYNCING_LOCAL_NODES...",
    "ENCRYPTING_DATA_STREAMS...",
    "BOOTING_VISION_AI...",
    "CONNECTING_TO_BENGALURU_STRATUM...",
    "OPTIMIZING_RENDER_PIPELINE...",
    "SECURITY_HANDSHAKE_COMPLETE",
    "BYPASSING_FIREWALL...",
    "LOADING_OORU_ASSETS..."
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setLogs(prev => [...prev.slice(-4), potentialLogs[Math.floor(Math.random() * potentialLogs.length)]]);
    }, 400);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center gap-6 p-8 font-mono text-neon-cyan">
      <div className="w-16 h-16 border-2 border-neon-cyan border-t-transparent rounded-full animate-spin shadow-[0_0_15px_rgba(6,182,212,0.3)]"></div>
      <div className="bg-black/50 border border-neon-cyan/30 p-4 rounded-lg min-w-[300px]">
        {logs.map((log, i) => (
          <div key={i} className="text-[10px] whitespace-nowrap overflow-hidden">
            <span className="opacity-50 text-white">&gt; </span>{log}
          </div>
        ))}
        <div className="w-2 h-4 bg-neon-cyan animate-pulse inline-block ml-1"></div>
      </div>
    </div>
  );
};

const GridScanner = () => (
  <div className="relative w-64 h-64 border border-white/10 rounded-2xl overflow-hidden bg-cyber-950">
    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:32px_32px]"></div>
    <motion.div 
      animate={{ y: [0, 256, 0] }}
      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
      className="absolute top-0 left-0 w-full h-[2px] bg-neon-cyan shadow-[0_0_20px_#06b6d4]"
    />
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="text-center">
        <Cpu size={48} className="text-neon-cyan mb-4 animate-pulse mx-auto" />
        <p className="font-mono text-[10px] tracking-[0.2em] text-gray-400 uppercase">Scanning_Network</p>
      </div>
    </div>
  </div>
);

const PulseRadial = () => (
  <div className="flex flex-col items-center gap-12">
    <div className="relative">
      <motion.div 
        animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.1, 0.3] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute inset-0 bg-neon-purple rounded-full blur-3xl w-32 h-32 -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2"
      />
      <div className="relative z-10 w-24 h-24 rounded-full border border-neon-purple/50 flex items-center justify-center bg-black/40 backdrop-blur-xl">
        <Globe size={40} className="text-neon-purple animate-[spin_10s_linear_infinite]" />
      </div>
    </div>
    <div className="text-center">
      <h3 className="text-neon-purple font-black tracking-[0.3em] uppercase mb-2">Global Sync</h3>
      <p className="text-gray-500 text-[9px] font-mono tracking-widest">ESTABLISHING_PEER_CONNECTION</p>
    </div>
  </div>
);

const MatrixRain = () => {
  const [chars, setChars] = useState<string[]>([]);
  useEffect(() => {
    setChars(Array.from({ length: 40 }, () => String.fromCharCode(0x30A0 + Math.random() * 96)));
  }, []);

  return (
    <div className="flex flex-col items-center gap-8 bg-black p-12 rounded-3xl border border-green-900/30">
      <div className="flex gap-2 h-20 overflow-hidden opacity-30">
        {chars.map((char, i) => (
          <motion.div 
            key={i}
            animate={{ y: [-100, 100], opacity: [0, 1, 0] }}
            transition={{ duration: 1 + Math.random() * 2, repeat: Infinity, delay: Math.random() }}
            className="text-green-500 font-mono text-xs"
          >
            {char}
          </motion.div>
        ))}
      </div>
      <div className="text-center">
        <Database size={32} className="text-green-500 mb-4 animate-bounce mx-auto" />
        <p className="text-green-500 font-mono text-[10px] tracking-widest uppercase">Database_Ingress</p>
      </div>
    </div>
  );
};

const DataPulse = () => (
   <div className="flex flex-col items-center overflow-hidden">
      <div className="flex gap-1 items-end h-8 mb-6">
         {[...Array(12)].map((_, i) => (
            <motion.div 
               key={i}
               animate={{ height: [4, 32, 4] }}
               transition={{ duration: 1, repeat: Infinity, delay: i * 0.1 }}
               className="w-1.5 bg-neon-cyan rounded-full shadow-[0_0_10px_#06b6d4]"
            />
         ))}
      </div>
      <div className="text-neon-cyan font-mono text-[10px] tracking-[0.4em] uppercase">Processing_Flux</div>
   </div>
);

const ShieldLoader = () => (
  <div className="flex flex-col items-center gap-6">
    <div className="relative">
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        className="w-24 h-24 border-b-2 border-r-2 border-neon-cyan rounded-full p-2"
      />
      <motion.div 
        animate={{ rotate: -360 }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 border-t-2 border-l-2 border-white/20 rounded-full"
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <Shield size={24} className="text-neon-cyan animate-pulse" />
      </div>
    </div>
    <div className="text-center">
      <p className="text-white font-bold text-xs tracking-widest uppercase">Securing_Connection</p>
      <div className="flex justify-center gap-1 mt-2">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="w-1 h-1 bg-neon-cyan rounded-full animate-bounce" style={{ animationDelay: `${i * 0.2}s` }}></div>
        ))}
      </div>
    </div>
  </div>
);

const MinimalistLoader = () => (
  <div className="flex flex-col items-center gap-4 w-48">
    <div className="h-0.5 w-full bg-white/10 rounded-full overflow-hidden">
      <motion.div 
        animate={{ x: [-192, 192] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        className="h-full w-full bg-white shadow-[0_0_10px_white]"
      />
    </div>
    <p className="text-[10px] font-mono tracking-[0.5em] text-gray-500 uppercase text-center ml-2">Loading_Logix</p>
  </div>
);

const loaders = [
  <CyberTerminal />,
  <GridScanner />,
  <PulseRadial />,
  <MatrixRain />,
  <DataPulse />,
  <ShieldLoader />,
  <MinimalistLoader />
];

const RandomLoader: React.FC<{ className?: string; fullScreen?: boolean }> = ({ className = "", fullScreen = true }) => {
  const [loaderIdx, setLoaderIdx] = useState<number | null>(null);

  useEffect(() => {
    setLoaderIdx(Math.floor(Math.random() * loaders.length));
  }, []);

  if (loaderIdx === null) return null;

  return (
    <div className={`${fullScreen ? 'min-h-screen' : 'py-12'} bg-transparent flex flex-col items-center justify-center ${className}`}>
       <motion.div 
         initial={{ opacity: 0, scale: 0.9 }}
         animate={{ opacity: 1, scale: 1 }}
         transition={{ duration: 0.5 }}
       >
          {loaders[loaderIdx]}
       </motion.div>
    </div>
  );
};

export default RandomLoader;
