import React from 'react';

export const OoruLogixLogo: React.FC<{ className?: string; color?: string }> = ({ 
  className = "w-4 h-4", 
  color = "#1f2937" 
}) => {
  return (
    <div className={`${className} shrink-0`}>
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-sm">
         {/* Left Side: Temple/City (Traditional) */}
         <path d="M50 10 L50 90" stroke={color} strokeWidth="3" />
         <path d="M30 40 L50 40 M35 30 L50 30 M40 20 L50 20 M25 50 L50 50 M20 60 L50 60 M15 70 L50 70 M10 80 L50 80" stroke={color} strokeWidth="3" strokeLinecap="square" />
         {/* Roofs */}
         <path d="M30 40 L40 30 M25 50 L35 40 M20 60 L30 50 M15 70 L25 60 M10 80 L20 70" stroke={color} strokeWidth="3" />
         
         {/* Right Side: PCB/Tree (Innovation) with vibrant green */}
         <path d="M50 50 L65 35 L75 35 M65 35 L65 20 M50 60 L70 60 L80 50 M50 70 L60 80 L70 80 M60 80 L60 95" stroke="#10b981" strokeWidth="3" strokeLinejoin="round" />
         <circle cx="75" cy="35" r="4" fill="#10b981" />
         <circle cx="65" cy="20" r="4" fill="#10b981" />
         <circle cx="80" cy="50" r="4" fill="#10b981" />
         <circle cx="70" cy="80" r="4" fill="#10b981" />
         <circle cx="60" cy="95" r="4" fill="#10b981" />
         
         {/* QR Code / Matrix box representing the square block */}
         <rect x="35" y="65" width="10" height="10" stroke={color} strokeWidth="1.5" />
         <rect x="37" y="67" width="2" height="2" fill={color} />
         <rect x="41" y="70" width="2" height="2" fill={color} />
      </svg>
    </div>
  );
};

const Logo: React.FC<{ className?: string }> = ({ className = "h-8 w-auto" }) => {
  return (
    <div className={`flex items-center gap-3 group relative ${className}`}>
      {/* RESTORED Logo (Tech Core / Heartbeat style) */}
      <div className="h-full w-auto relative z-10 p-0.5 sm:p-1 flex-shrink-0">
        <svg
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-full w-auto animate-logo-power-up drop-shadow-md"
        >
          {/* Core Ring */}
          <circle 
            cx="50" cy="50" r="40" 
            stroke="url(#neon-gradient-base)" 
            strokeWidth="2"
            className="animate-stroke-draw opacity-0"
            strokeDasharray="250"
            style={{ animationDelay: '0.2s' }}
          />
          
          {/* Outer Tech Ring */}
          <circle 
            cx="50" cy="50" r="46" 
            stroke="url(#neon-gradient-blue)" 
            strokeWidth="1.5" 
            strokeDasharray="4 8"
            className="animate-[spin_20s_linear_infinite]"
          />

          {/* Central Hexagon Core */}
          <path
            d="M50 20 L75 35 L75 65 L50 80 L25 65 L25 35 Z"
            fill="rgba(0, 204, 255, 0.15)"
            stroke="url(#neon-gradient-blue)"
            strokeWidth="2.5"
            strokeLinejoin="round"
            className="animate-stroke-draw opacity-0"
            style={{ animationDelay: '0.5s' }}
          />
          
          {/* Circuit Traces */}
          <path
            d="M10 50 H25 M50 10 V20 M90 50 H75 M50 90 V80 M35 30 L25 20 M65 30 L75 20 M35 70 L25 80 M65 70 L75 80"
            stroke="#bd00ff"
            strokeWidth="2"
            strokeLinecap="round"
            className="animate-stroke-draw opacity-0"
            style={{ animationDelay: '0.8s' }}
          />

          {/* Data Pulse Line */}
          <path
            d="M20 50 L35 50 L42 35 L58 65 L65 50 L80 50"
            stroke="#00ffff"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="animate-stroke-draw opacity-0"
            style={{ animationDelay: '1.2s' }}
          />

          {/* Core Node */}
          <circle 
            cx="50" cy="50" r="5" 
            fill="#ff00ff" 
            className="animate-pulse-fast" 
          />

          <defs>
            <linearGradient id="neon-gradient-base" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ff00ff" stopOpacity="0.8"/>
              <stop offset="100%" stopColor="#0055ff" stopOpacity="0.8"/>
            </linearGradient>
            <linearGradient id="neon-gradient-blue" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#00ccff" />
              <stop offset="100%" stopColor="#0000ff" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Text Container */}
      <div className="flex flex-col justify-center leading-none relative z-10 flex-shrink-0">
        <span className="text-white font-black text-lg sm:text-xl md:text-2xl tracking-tight leading-tight uppercase group-hover:text-neon-cyan transition-colors">
          Ooru Logix
        </span>
        <div className="flex items-center gap-1 sm:gap-1.5 mt-0.5 whitespace-nowrap">
          <span className="text-gray-400 font-bold font-mono text-[8px] sm:text-[10px] md:text-[11px] tracking-widest uppercase">
            Hyper-Local Systems
          </span>
          <OoruLogixLogo className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5" color="#10b981" />
        </div>
      </div>
    </div>
  );
};

export default Logo;
