import { type ReactNode, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { animations } from '../utils/animations';

interface AnimatedCardProps {
  children: ReactNode;
  hover?: boolean;
  glass?: boolean;
  tilt?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  className?: string;
  onClick?: () => void;
}

export const AnimatedCard = ({ 
  children, 
  hover = true,
  glass = false,
  tilt = false,
  padding = 'md',
  className = '',
  onClick 
}: AnimatedCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  // Mouse position for tilt effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });
  
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7.5deg", "-7.5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7.5deg", "7.5deg"]);
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!tilt) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    
    x.set(xPct);
    y.set(yPct);
  };
  
  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  const baseStyles = 'bg-white rounded-2xl border border-gray-100 transition-all duration-300';
  
  const paddingStyles = {
    none: '',
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6',
  };
  
  const glassStyles = glass 
    ? 'bg-white/80 backdrop-blur-lg border-white/20 shadow-lg' 
    : 'shadow-card';
  
  const clickableStyles = onClick ? 'cursor-pointer' : '';
  
  return (
    <motion.div 
      className={`${baseStyles} ${paddingStyles[padding]} ${glassStyles} ${clickableStyles} ${className}`}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={tilt ? {
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      } : undefined}
      animate={hover && isHovered ? {
        y: -8,
        boxShadow: "0 20px 40px rgba(0,0,0,0.12), 0 8px 16px rgba(0,0,0,0.08)",
      } : {
        y: 0,
      }}
      transition={animations.ease.spring}
    >
      {children}
    </motion.div>
  );
};
