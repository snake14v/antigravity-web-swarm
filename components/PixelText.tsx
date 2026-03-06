import React, { useEffect, useState } from 'react';

// A simple 5x7 pixel font map for characters
// 1 = solid pixel, 0 = empty space
const pixelFont: Record<string, number[][]> = {
  'S': [
    [0,1,1,1,1],
    [1,0,0,0,0],
    [1,0,0,0,0],
    [0,1,1,1,0],
    [0,0,0,0,1],
    [0,0,0,0,1],
    [1,1,1,1,0],
  ],
  'h': [
    [1,0,0,0,0],
    [1,0,0,0,0],
    [1,0,1,1,0],
    [1,1,0,0,1],
    [1,0,0,0,1],
    [1,0,0,0,1],
    [1,0,0,0,1],
  ],
  'o': [
    [0,0,0,0,0],
    [0,0,0,0,0],
    [0,1,1,1,0],
    [1,0,0,0,1],
    [1,0,0,0,1],
    [1,0,0,0,1],
    [0,1,1,1,0],
  ],
  'p': [
    [0,0,0,0,0],
    [0,0,0,0,0],
    [1,1,1,1,0],
    [1,0,0,0,1],
    [1,1,1,1,0],
    [1,0,0,0,0],
    [1,0,0,0,0],
  ],
  'm': [
    [0,0,0,0,0],
    [0,0,0,0,0],
    [1,1,0,1,1],
    [1,0,1,0,1],
    [1,0,0,0,1],
    [1,0,0,0,1],
    [1,0,0,0,1],
  ],
  'a': [
    [0,0,0,0,0],
    [0,0,0,0,0],
    [0,1,1,1,0],
    [0,0,0,0,1],
    [0,1,1,1,1],
    [1,0,0,0,1],
    [0,1,1,1,1],
  ],
  'r': [
    [0,0,0,0,0],
    [0,0,0,0,0],
    [1,0,1,1,0],
    [1,1,0,0,1],
    [1,0,0,0,0],
    [1,0,0,0,0],
    [1,0,0,0,0],
  ],
  't': [
    [0,1,0,0,0],
    [0,1,0,0,0],
    [1,1,1,0,0],
    [0,1,0,0,0],
    [0,1,0,0,0],
    [0,1,0,0,0],
    [0,0,1,1,0],
  ],
  'O': [
    [0,1,1,1,0],
    [1,0,0,0,1],
    [1,0,0,0,1],
    [1,0,0,0,1],
    [1,0,0,0,1],
    [1,0,0,0,1],
    [0,1,1,1,0],
  ],
  'u': [
    [0,0,0,0,0],
    [0,0,0,0,0],
    [1,0,0,0,1],
    [1,0,0,0,1],
    [1,0,0,0,1],
    [1,0,0,0,1],
    [0,1,1,1,1],
  ],
  'L': [
    [1,0,0,0,0],
    [1,0,0,0,0],
    [1,0,0,0,0],
    [1,0,0,0,0],
    [1,0,0,0,0],
    [1,0,0,0,0],
    [1,1,1,1,1],
  ],
  'g': [
    [0,0,0,0,0],
    [0,0,0,0,0],
    [0,1,1,1,1],
    [1,0,0,0,1],
    [0,1,1,1,1],
    [0,0,0,0,1],
    [0,1,1,1,0],
  ],
  'i': [
    [0,0,1,0,0],
    [0,0,0,0,0],
    [0,1,1,0,0],
    [0,0,1,0,0],
    [0,0,1,0,0],
    [0,0,1,0,0],
    [0,1,1,1,0],
  ],
  'x': [
    [0,0,0,0,0],
    [0,0,0,0,0],
    [1,0,0,0,1],
    [0,1,0,1,0],
    [0,0,1,0,0],
    [0,1,0,1,0],
    [1,0,0,0,1],
  ],
  'b': [
    [1,0,0,0,0],
    [1,0,0,0,0],
    [1,1,1,1,0],
    [1,0,0,0,1],
    [1,0,0,0,1],
    [1,0,0,0,1],
    [1,1,1,1,0],
  ],
  'y': [
    [0,0,0,0,0],
    [0,0,0,0,0],
    [1,0,0,0,1],
    [1,0,0,0,1],
    [1,0,0,0,1],
    [0,1,1,1,1],
    [1,0,0,0,0],
    [0,1,1,1,0]
  ],
  ' ': [
    [0,0,0],
    [0,0,0],
    [0,0,0],
    [0,0,0],
    [0,0,0],
    [0,0,0],
    [0,0,0],
  ]
};

// Fallback for missing characters
const fallbackChar = [
  [1,1,1,1],
  [1,0,0,1],
  [1,0,0,1],
  [1,0,0,1],
  [1,0,0,1],
  [1,0,0,1],
  [1,1,1,1],
];

interface PixelTextProps {
  text: string;
  triggerAnimation: boolean;
  pixelSize?: string;
  gap?: string;
  className?: string;
  periodicFlip?: boolean;
  externalFlip?: boolean;
}

const PixelText: React.FC<PixelTextProps> = ({ 
  text, 
  triggerAnimation, 
  pixelSize = 'w-2 h-2', 
  gap = 'gap-0.5',
  className = '',
  periodicFlip = true,
  externalFlip
}) => {
  const [pixelsActive, setPixelsActive] = useState<boolean[][]>([]);
  const [internalFlip, setInternalFlip] = useState(false);
  const [hueOffset, setHueOffset] = useState(0);

  // Use externalFlip if provided, otherwise use internalFlip
  const isFlipped = externalFlip !== undefined ? externalFlip : internalFlip;

  useEffect(() => {
    // Sync with parent's trigger for initial assembly
    if (triggerAnimation) {
      setInternalFlip(true);
    }
  }, [triggerAnimation]);

  useEffect(() => {
    // Only run internal interval if externalFlip is NOT provided
    if (!periodicFlip || !triggerAnimation || externalFlip !== undefined) return;

    // Periodic flip interval
    const flipInterval = setInterval(() => {
      setInternalFlip(prev => !prev);
    }, 4000); // Toggle every 4 seconds

    // Smooth color (hue) cycle
    const hueInterval = setInterval(() => {
      setHueOffset(prev => (prev + 3) % 360);
    }, 50);

    return () => {
      clearInterval(flipInterval);
      clearInterval(hueInterval);
    };
  }, [periodicFlip, triggerAnimation]);

  useEffect(() => {
    // Generate the full matrix for the given text
    const newMatrix: boolean[][] = [];
    
    // Each character is 7 rows high
    for (let row = 0; row < 7; row++) {
      const rowPixels: boolean[] = [];
      
      for (let i = 0; i < text.length; i++) {
        const char = text[i];
        let map = pixelFont[char];
        
        // Handle 'y', 'g', 'p' which go below baseline or have special shapes
        if (!map) {
          map = fallbackChar;
        }

        // Add the pixels for this character's row
        if (map[row]) {
           rowPixels.push(...map[row].map(val => val === 1));
        } else {
           // Empty space if row doesn't exist
           rowPixels.push(...Array(map[0].length).fill(false));
        }

        // Add 1 pixel gap between characters
        if (i < text.length - 1) {
          rowPixels.push(false);
        }
      }
      newMatrix.push(rowPixels);
    }
    
    setPixelsActive(newMatrix);
  }, [text]);

  if (!pixelsActive.length) return null;

  return (
    <div className={`flex flex-col ${gap} ${className}`}>
      {pixelsActive.map((row, rowIndex) => (
        <div key={`row-${rowIndex}`} className={`flex ${gap}`}>
          {row.map((isActive, colIndex) => {
            // Generate a sweep delay effect
            const waveDelay = (colIndex * 30) + (rowIndex * 40); 
            
            return (isActive ? (
              <div 
                key={`pixel-${rowIndex}-${colIndex}`} 
                className={`${pixelSize} rounded-sm`}
                style={{
                  perspective: '400px'
                }}
              >
                <div 
                  className={`w-full h-full relative preserve-3d transition-transform duration-[1000ms] ${isFlipped ? '[transform:rotateX(180deg)]' : '[transform:rotateX(0deg)]'}`}
                  style={{
                    transitionDelay: `${waveDelay}ms`
                  }}
                >
                  {/* Front Face (Off/Old style subtle state) */}
                  <div className="absolute inset-0 backface-hidden bg-white/10 border border-white/20 rounded-sm"></div>
                  
                  {/* Back Face (On state - VIBGYOR Rainbow flowing - High Brightness) */}
                  <div 
                    className="absolute inset-0 backface-hidden [transform:rotateX(180deg)] rounded-sm shadow-[0_0_20px_currentColor]"
                    style={{
                      // Use hueOffset + spatial offset to create the VIBGYOR rainbow flow
                      backgroundColor: `hsl(${(hueOffset + colIndex * 15 + rowIndex * 10) % 360}, 100%, 70%)`,
                      color: `hsl(${(hueOffset + colIndex * 15 + rowIndex * 10) % 360}, 100%, 70%)`,
                    }}
                  ></div>
                </div>
              </div>
            ) : (
              <div key={`empty-${rowIndex}-${colIndex}`} className={`${pixelSize} bg-transparent`} />
            ));
          })}
        </div>
      ))}
    </div>
  );
};

export default PixelText;
