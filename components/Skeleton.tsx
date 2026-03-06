import React from 'react';

interface SkeletonProps {
  variant?: 'text' | 'rect' | 'circle';
  width?: string | number;
  height?: string | number;
  className?: string;
  animate?: boolean;
}

const Skeleton: React.FC<SkeletonProps> = ({
  variant = 'rect',
  width,
  height,
  className = '',
  animate = true,
}) => {
  const baseStyles = 'bg-white/5 overflow-hidden relative';
  const animationStyles = animate ? 'before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent' : '';
  
  const shapeStyles = {
    text: 'h-4 w-full rounded',
    rect: 'rounded-lg',
    circle: 'rounded-full',
  };

  const style = {
    width: width,
    height: height,
  };

  return (
    <div
      className={`${baseStyles} ${shapeStyles[variant]} ${animationStyles} ${className}`}
      style={style}
    />
  );
};

export default Skeleton;

// Add this to your global CSS or index.html style tag:
/**
@keyframes shimmer {
  100% {
    transform: translateX(100%);
  }
}
*/
