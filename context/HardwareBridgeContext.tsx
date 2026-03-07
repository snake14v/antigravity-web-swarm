import React, { createContext, useContext, useState, useEffect } from 'react';

// Definitions for the hardware/backend data models
interface NodeMetrics {
  nodeId: string;
  uptime: number;
  cpuTemp: number;
  activeConnections: number;
  lastPing: string;
}

interface DynamicPricingData {
  time: string;
  demand: number;
  price: number;
}

interface TranslationLog {
  id: number;
  source: string;
  target: string;
  time: string;
  status: 'processing' | 'translated';
}

interface HardwareBridgeState {
  nodes: NodeMetrics[];
  pricingSeries: DynamicPricingData[];
  liveTranslations: TranslationLog[];
  isConnected: boolean;
}

const HardwareBridgeContext = createContext<HardwareBridgeState>({
  nodes: [],
  pricingSeries: [],
  liveTranslations: [],
  isConnected: false
});

export const useHardwareBridge = () => useContext(HardwareBridgeContext);

const initialTranslations: TranslationLog[] = [
  { id: 1, source: "1x Masala Dosa, No Onion", target: "ಒಂದು ಮಸಾಲೆ ದೋಸೆ, ಈರುಳ್ಳಿ ಬೇಡ", time: new Date(Date.now() - 120000).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit', second:'2-digit'}), status: "translated" },
  { id: 2, source: "2x Filter Coffee, Extra Strong", target: "ಎರಡು ಫಿಲ್ಟರ್ ಕಾಫಿ, ಸ್ಟ್ರಾಂಗ್ ಆಗಿ", time: new Date(Date.now() - 60000).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit', second:'2-digit'}), status: "translated" },
];

export const HardwareBridgeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isConnected, setIsConnected] = useState(false);
  
  const [nodes, setNodes] = useState<NodeMetrics[]>([
    { nodeId: "ND-BELLANDUR-01", uptime: 99.9, cpuTemp: 45, activeConnections: 120, lastPing: new Date().toISOString() },
    { nodeId: "ND-KORAMANGALA-02", uptime: 98.4, cpuTemp: 48, activeConnections: 85, lastPing: new Date().toISOString() },
  ]);

  const [pricingSeries, setPricingSeries] = useState<DynamicPricingData[]>([]);
  const [liveTranslations, setLiveTranslations] = useState<TranslationLog[]>(initialTranslations);

  useEffect(() => {
    // 1. Simulate initial TCP/WebSocket handshake delay
    const connectionTimer = setTimeout(() => setIsConnected(true), 1500);

    // 2. Initialize initial pricing array 
    setPricingSeries(Array.from({ length: 12 }).map((_, i) => ({
      time: `${i + 9}:00`,
      demand: 40 + Math.random() * 60,
      price: 100 + Math.random() * 20 - (i > 8 ? (i - 8) * 15 : 0)
    })));

    // 3. Simulate continuous WebSocket / MQTT incoming data streams
    const pricingInterval = setInterval(() => {
      setPricingSeries(Array.from({ length: 12 }).map((_, i) => ({
        time: `${i + 9}:00`,
        demand: 40 + Math.random() * 60,
        price: 100 + Math.random() * 20 - (i > 8 ? (i - 8) * 15 : 0)
      })));
    }, 5000); // 5 sec update rate for UI charts

    // 4. Simulate Translation Streaming from Indic-NLP Backend Models
    const phrases = [
      { s: "1x Gobi Manchurian, Dry", t: "ಒಂದು ಗೋಬಿ ಮಂಚೂರಿಯನ್, ಡ್ರೈ" },
      { s: "3x Idli Vada Mix", t: "ಮೂರು ಇಡ್ಲಿ ವಡೆ ಮಿಕ್ಸ್" },
      { s: "1x Roti Curry, Less Spicy", t: "ಒಂದು ರೊಟ್ಟಿ ಪಲ್ಯ, ಖಾರ ಕಡಿಮೆ" },
      { s: "2x Cold Coffee, No Sugar", t: "ಎರಡು ಕೋಲ್ಡ್ ಕಾಫಿ, ಸಕ್ಕರೆ ಬೇಡ" }
    ];
    let count = 3;
    
    const translationInterval = setInterval(() => {
       const phrase = phrases[count % phrases.length];
       const newLog: TranslationLog = {
         id: count,
         source: phrase.s,
         target: phrase.t,
         time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit', second:'2-digit'}),
         status: 'processing'
       };
       
       setLiveTranslations(prev => [newLog, ...prev.slice(0, 3)]); // Keep last 4
       
       // Simulate NLP Processing Latency
       setTimeout(() => {
         setLiveTranslations(prev => 
            prev.map(p => p.id === count ? { ...p, status: 'translated' } : p)
         );
         count++;
       }, 2000);

    }, 7000); // New POS order every 7 seconds

    // 5. Simulate Generic IoT Hardware Heartbeats
    const heartbeatInterval = setInterval(() => {
       setNodes(prev => prev.map(n => ({
         ...n,
         cpuTemp: 40 + Math.random() * 15,
         activeConnections: Math.max(0, Math.floor(n.activeConnections + (Math.random() * 10 - 5))),
         lastPing: new Date().toISOString()
       })));
    }, 2000);

    return () => {
      clearTimeout(connectionTimer);
      clearInterval(pricingInterval);
      clearInterval(translationInterval);
      clearInterval(heartbeatInterval);
    };
  }, []);

  return (
    <HardwareBridgeContext.Provider value={{ nodes, pricingSeries, liveTranslations, isConnected }}>
      {children}
    </HardwareBridgeContext.Provider>
  );
};
