import { type ReactNode } from 'react';

interface BadgeProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'trending' | 'new' | 'trusted';
  size?: 'sm' | 'md' | 'lg';
  glow?: boolean;
  pulse?: boolean;
  className?: string;
}

export const Badge = ({ 
  children, 
  variant = 'primary', 
  size = 'md',
  glow = false,
  pulse = false,
  className = '' 
}: BadgeProps) => {
  const baseStyles = 'inline-flex items-center gap-1 font-medium rounded-full transition-all duration-200';
  
  const sizeStyles = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-1.5 text-base',
  };
  
  const variantStyles = {
    primary: 'bg-primary-100 text-primary-700 border border-primary-200',
    secondary: 'bg-secondary-100 text-secondary-700 border border-secondary-200',
    success: 'bg-green-100 text-green-700 border border-green-200',
    warning: 'bg-yellow-100 text-yellow-700 border border-yellow-200',
    error: 'bg-red-100 text-red-700 border border-red-200',
    trending: 'bg-gradient-to-r from-orange-100 to-pink-100 text-orange-700 border border-orange-200',
    new: 'bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-700 border border-blue-200',
    trusted: 'bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 border border-green-200',
  };
  
  const glowStyles = glow ? {
    primary: 'shadow-glow-primary',
    secondary: 'shadow-glow-secondary',
    success: 'shadow-glow-primary',
    warning: 'shadow-glow-accent',
    error: 'shadow-glow-accent',
    trending: 'shadow-glow-accent',
    new: 'shadow-glow-primary',
    trusted: 'shadow-glow-primary',
  }[variant] : '';
  
  const pulseClass = pulse ? 'animate-pulse-soft' : '';
  
  return (
    <span className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${glowStyles} ${pulseClass} ${className}`}>
      {children}
    </span>
  );
};
