import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Mic, Smartphone, Brain, Volume2, Globe, Activity, Terminal } from 'lucide-react';
import { PageRoute } from '../types';
import { motion, AnimatePresence } from 'framer-motion';

const translationLogs = [
  { id: 1, source: "1x Masala Dosa, No Onion", target: "ಒಂದು ಮಸಾಲೆ ದೋಸೆ, ಈರುಳ್ಳಿ ಬೇಡ", time: "10:14:02 AM", status: "translated" },
  { id: 2, source: "2x Filter Coffee, Extra Strong", target: "ಎರಡು ಫಿಲ್ಟರ್ ಕಾಫಿ, ಸ್ಟ್ರಾಂಗ್ ಆಗಿ", time: "10:15:45 AM", status: "translated" },
  { id: 3, source: "1x Gobi Manchurian, Dry", target: "ಒಂದು ಗೋಬಿ ಮಂಚೂರಿಯನ್, ಡ್ರೈ", time: "10:18:22 AM", status: "processing" }
];

const LanguageBridge: React.FC = () => {
  const [activeLog, setActiveLog] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveLog((prev) => (prev + 1) % translationLogs.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const currentLog = translationLogs[activeLog];

  return (
    <div className="pt-24 min-h-screen bg-cyber-950 text-white relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-purple-600/10 rounded-full blur-[160px]"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-indigo-600/5 rounded-full blur-[120px]"></div>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(168,85,247,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(168,85,247,0.03)_1px,transparent_1px)] bg-[size:30px_30px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <Link to={PageRoute.HOME} className="inline-flex items-center gap-2 text-gray-400 hover:text-purple-400 transition-colors mb-8 group">
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          Back to Systems
        </Link>

        <header className="mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-400 text-xs font-mono mb-6"
          >
            <Activity size={14} className="animate-pulse" />
            NLP_TRANSLATION_CORE v1.8
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold mb-6 tracking-tight leading-tight"
          >
            Staff Language <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400">Bridge</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-400 max-w-3xl leading-relaxed"
          >
            Eliminate miscommunications between the front-of-house and the kitchen. The system listens to POS notes in English/Hindi and instantly converts them to localized audio alerts for the cooking staff.
          </motion.p>
        </header>

        {/* Translation Architecture UI */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-20">
          
          {/* FOH (Front of House) Input */}
          <motion.div 
             initial={{ opacity: 0, x: -20 }}
             animate={{ opacity: 1, x: 0 }}
             transition={{ delay: 0.3 }}
             className="lg:col-span-4 glass-panel border border-white/10 rounded-3xl p-8 bg-cyber-900 flex flex-col items-center justify-center text-center relative overflow-hidden group"
          >
             <div className="absolute inset-0 bg-blue-500/5 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500"></div>
             <div className="w-20 h-20 rounded-full bg-blue-500/10 border border-blue-500/30 flex items-center justify-center mb-6 relative z-10">
                <Smartphone className="text-blue-400" size={32} />
             </div>
             <h3 className="text-xl font-bold text-white mb-2 relative z-10">FOH Terminal</h3>
             <p className="text-sm text-gray-400 mb-8 relative z-10">Waiter inputs custom request into the POS device.</p>
             
             <div className="w-full bg-black/40 border border-white/5 rounded-xl p-4 text-left relative z-10 box-shadow-inner text-sm font-mono text-gray-300">
                <span className="text-blue-400 font-bold border-b border-blue-500/30 pb-2 flex mb-2">RAW_INPUT</span>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentLog.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    aria-live="polite"
                    aria-atomic="true"
                  >
                    "{currentLog.source}"
                  </motion.div>
                </AnimatePresence>
             </div>
          </motion.div>

          {/* AI Neural Network Bridge */}
          <motion.div 
             initial={{ opacity: 0, scale: 0.9 }}
             animate={{ opacity: 1, scale: 1 }}
             transition={{ delay: 0.4 }}
             className="lg:col-span-4 flex flex-col items-center justify-center relative py-12 lg:py-0"
          >
             <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-blue-500/50 via-purple-500 to-indigo-500/50 -z-10 hidden lg:block border-dashed border-b border-white/20"></div>
             
             <div className="w-32 h-32 rounded-full bg-cyber-950 border-4 border-purple-500/30 flex items-center justify-center relative shadow-[0_0_50px_rgba(168,85,247,0.3)]">
                <div className="absolute inset-0 rounded-full border border-purple-400/50 animate-[spin_4s_linear_infinite]"></div>
                <div className="absolute inset-2 rounded-full border border-indigo-400/50 animate-[spin_6s_linear_infinite_reverse]"></div>
                <Brain className="text-purple-400 animate-pulse" size={48} />
             </div>
             
             <div className="mt-6 flex flex-col items-center gap-2">
                <div className="flex items-center gap-2 text-xs font-mono text-purple-400 bg-purple-500/10 px-3 py-1 rounded border border-purple-500/20">
                  <Globe size={14} />
                  INDIC-NLP MODEL
                </div>
                <span className="text-[10px] text-gray-500 tracking-widest uppercase text-center block max-w-[200px]">Contextual Nuance Extraction</span>
             </div>
          </motion.div>

          {/* BOH (Back of House) Output */}
          <motion.div 
             initial={{ opacity: 0, x: 20 }}
             animate={{ opacity: 1, x: 0 }}
             transition={{ delay: 0.5 }}
             className="lg:col-span-4 glass-panel border border-white/10 rounded-3xl p-8 bg-cyber-900 flex flex-col items-center justify-center text-center relative overflow-hidden group"
          >
             <div className="absolute inset-0 bg-indigo-500/5 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500"></div>
             <div className="w-20 h-20 rounded-full bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center mb-6 relative z-10">
                <Volume2 className="text-indigo-400" size={32} />
             </div>
             <h3 className="text-xl font-bold text-white mb-2 relative z-10">KDS Audio Speaker</h3>
             <p className="text-sm text-gray-400 mb-8 relative z-10">Kitchen Display System reads out the translated order.</p>
             
             <div className="w-full bg-black/40 border border-white/5 rounded-xl p-4 text-left relative z-10 box-shadow-inner text-sm font-mono text-gray-300">
                <span className="text-indigo-400 font-bold border-b border-indigo-500/30 pb-2 flex justify-between mb-2">
                   <span>KANNADA_AUDIO_OUT</span>
                   <Mic size={16} className="animate-pulse" />
                </span>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentLog.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-white"
                    aria-live="assertive"
                    aria-atomic="true"
                  >
                    {currentLog.status === 'processing' ? (
                       <span className="text-gray-500 flex items-center gap-2">
                         <Terminal size={12} className="animate-ping" /> Synchronizing...
                       </span>
                    ) : (
                       `"${currentLog.target}"`
                    )}
                  </motion.div>
                </AnimatePresence>
             </div>
          </motion.div>
        </div>

        {/* Live Translation Feed */}
        <motion.div 
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 0.6 }}
           className="glass-panel border border-white/10 rounded-3xl overflow-hidden"
        >
           <div className="px-6 py-4 border-b border-white/5 bg-white/5 flex items-center justify-between">
              <h3 className="font-bold text-white flex items-center gap-2">
                <Terminal size={18} className="text-purple-400" /> System Logs 
              </h3>
              <div className="flex gap-2">
                 <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50"></div>
                 <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50"></div>
                 <div className="w-3 h-3 rounded-full bg-green-500/50 border border-green-500 shadow-[0_0_10px_#22c55e]"></div>
              </div>
           </div>
           
           <div className="p-6">
              <div 
                 className="space-y-4 font-mono text-sm max-h-[300px] overflow-y-auto custom-scrollbar"
                 role="log"
                 aria-live="polite"
              >
                 {translationLogs.map((log) => (
                    <div key={log.id} className={`grid grid-cols-12 gap-4 p-3 rounded-xl border ${log.id === currentLog.id ? 'bg-purple-500/10 border-purple-500/30' : 'bg-transparent border-white/5'}`}>
                       <div className="col-span-2 text-gray-500 text-xs flex items-center">{log.time}</div>
                       <div className="col-span-4 text-blue-300">{log.source}</div>
                       <div className="col-span-1 flex justify-center text-gray-600">→</div>
                       <div className="col-span-4 text-indigo-300">{log.status === 'processing' ? <span className="text-purple-400 animate-pulse">Running Neural Inferencing...</span> : log.target}</div>
                       <div className="col-span-1 text-right">
                          <span className={`text-[10px] px-2 py-1 rounded border ${log.status === 'translated' ? 'text-green-400 border-green-500/30 bg-green-500/10' : 'text-purple-400 border-purple-500/30 bg-purple-500/10'}`}>
                             {log.status.toUpperCase()}
                          </span>
                       </div>
                    </div>
                 ))}
              </div>
           </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LanguageBridge;
