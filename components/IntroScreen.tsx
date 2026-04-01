import React, { useEffect, useState } from 'react';
import Logo from './Logo';

interface IntroScreenProps {
  onComplete: () => void;
}

const IntroScreen: React.FC<IntroScreenProps> = ({ onComplete }) => {
  const [isFading, setIsFading] = useState(false);
  const [initText, setInitText] = useState('');
  
  const textFrames = [
    'CONNECTING TO BANGALORE GRID...',
    'INITIALIZING HYPER-LOCAL SENSORS...',
    'SYNCING MONSOON DATA MAP...',
    'LOADING OORU LOGIX OS...',
    'SYSTEM ONLINE.'
  ];

  useEffect(() => {
    // Typewriter effect for the initialization text
    let frameIndex = 0;
    const interval = setInterval(() => {
      if (frameIndex < textFrames.length) {
        setInitText(textFrames[frameIndex]);
        frameIndex++;
      } else {
        clearInterval(interval);
      }
    }, 400);

    // Trigger fade out after exactly 2.5s (matching logo animation length)
    const fadeTimer = setTimeout(() => {
      setIsFading(true);
    }, 2500);

    // Remove component from DOM after fade completes
    const removeTimer = setTimeout(() => {
      onComplete();
    }, 3000);

    return () => {
      clearInterval(interval);
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, [onComplete]);

  return (
    <div 
      className={`fixed inset-0 z-[100] bg-cyber-950 flex flex-col items-center justify-center transition-opacity duration-500 overflow-hidden ${
        isFading ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Background Ambience */}
      <div className="absolute inset-0 cyber-grid opacity-20" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-neon-cyan/5 rounded-full blur-[100px]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-neon-purple/10 rounded-full blur-[80px] animate-pulse-slow" />

      {/* Main Animated Logo */}
      <div className="relative z-10 scale-150 mb-12">
        <Logo className="h-16 w-auto" />
      </div>

      {/* Terminal Loading Text */}
      <div className="relative z-10 flex flex-col items-center gap-4 mt-8">
        <div className="w-64 h-1 bg-white/10 rounded-full overflow-hidden">
          <div className="h-full bg-neon-cyan animate-pulse-height w-full origin-left" style={{ animation: 'stroke-draw 2s linear forwards' }} />
        </div>
        <p className="font-mono text-neon-cyan text-xs tracking-[0.2em] uppercase min-h-[20px]">
          {initText}
        </p>
      </div>
      
    </div>
  );
};

export default IntroScreen;
