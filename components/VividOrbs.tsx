import React from 'react';

const VividOrbs: React.FC = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-[-5]">
      {/* Orb 1: Fuchsia/Pink - Top Left Floating */}
      <div 
        className="absolute w-[600px] h-[600px] rounded-full mix-blend-screen filter blur-[100px] opacity-40 animate-[float_15s_ease-in-out_infinite]"
        style={{
          background: 'radial-gradient(circle, rgba(232,28,255,1) 0%, rgba(255,0,255,0.4) 50%, rgba(0,0,0,0) 70%)',
          top: '-10%',
          left: '-10%'
        }}
      />
      
      {/* Orb 2: Cyan/Blue - Bottom Right Pulsing */}
      <div 
        className="absolute w-[700px] h-[700px] rounded-full mix-blend-screen filter blur-[120px] opacity-40 animate-[float_20s_ease-in-out_infinite_reverse]"
        style={{
          background: 'radial-gradient(circle, rgba(0,255,255,1) 0%, rgba(0,102,255,0.4) 50%, rgba(0,0,0,0) 70%)',
          bottom: '-20%',
          right: '-10%'
        }}
      />

      {/* Orb 3: Deep Purple - Center Core Slow Drift */}
      <div 
        className="absolute w-[800px] h-[800px] rounded-full mix-blend-screen filter blur-[140px] opacity-30 animate-[pulse_10s_ease-in-out_infinite]"
        style={{
          background: 'radial-gradient(circle, rgba(138,43,226,1) 0%, rgba(75,0,130,0.5) 50%, rgba(0,0,0,0) 70%)',
          top: '20%',
          left: '20%',
          transform: 'translate(-50%, -50%)'
        }}
      />
      
      {/* Orb 4: Amber/Orange Accent - Mid Right */}
      <div 
        className="absolute w-[400px] h-[400px] rounded-full mix-blend-screen filter blur-[80px] opacity-20 animate-[float_18s_ease-in-out_infinite]"
        style={{
          background: 'radial-gradient(circle, rgba(255,191,0,1) 0%, rgba(255,69,0,0.5) 50%, rgba(0,0,0,0) 70%)',
          top: '40%',
          right: '5%'
        }}
      />
    </div>
  );
};

export default VividOrbs;
