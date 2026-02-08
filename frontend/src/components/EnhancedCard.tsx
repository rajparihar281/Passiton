import { type ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  hover?: boolean;
  glass?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  className?: string;
  onClick?: () => void;
}

export const Card = ({ 
  children, 
  hover = false,
  glass = false,
  padding = 'md',
  className = '',
  onClick 
}: CardProps) => {
  const baseStyles = 'bg-white rounded-2xl border border-gray-100 transition-all duration-300';
  
  const paddingStyles = {
    none: '',
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6',
  };
  
  const hoverStyles = hover 
    ? 'hover:shadow-card-hover hover:-translate-y-1 cursor-pointer' 
    : 'shadow-card';
  
  const glassStyles = glass 
    ? 'bg-white/80 backdrop-blur-lg border-white/20' 
    : '';
  
  const clickableStyles = onClick ? 'cursor-pointer' : '';
  
  return (
    <div 
      className={`${baseStyles} ${paddingStyles[padding]} ${hoverStyles} ${glassStyles} ${clickableStyles} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};
