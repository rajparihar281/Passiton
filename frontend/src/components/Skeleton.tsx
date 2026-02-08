import { motion } from 'framer-motion';

interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'circular' | 'rectangular';
  width?: string | number;
  height?: string | number;
  count?: number;
}

export const Skeleton = ({ 
  className = '', 
  variant = 'rectangular',
  width,
  height,
  count = 1,
}: SkeletonProps) => {
  const baseStyles = 'bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-shimmer';
  
  const variantStyles = {
    text: 'h-4 rounded',
    circular: 'rounded-full',
    rectangular: 'rounded-lg',
  };
  
  const style = {
    width: width || '100%',
    height: height || (variant === 'text' ? '1rem' : variant === 'circular' ? '3rem' : '12rem'),
  };
  
  if (count > 1) {
    return (
      <div className="space-y-3">
        {Array.from({ length: count }).map((_, i) => (
          <motion.div
            key={i}
            className={`${baseStyles} ${variantStyles[variant]} ${className}`}
            style={style}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: i * 0.1 }}
          />
        ))}
      </div>
    );
  }
  
  return (
    <motion.div
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      style={style}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    />
  );
};

// Card skeleton for item/service cards
export const CardSkeleton = () => (
  <div className="bg-white rounded-2xl border border-gray-100 p-4 space-y-3">
    <Skeleton variant="rectangular" height="12rem" />
    <Skeleton variant="text" width="70%" />
    <Skeleton variant="text" width="40%" />
    <div className="flex gap-2 pt-2">
      <Skeleton variant="rectangular" height="2.5rem" className="flex-1" />
      <Skeleton variant="rectangular" height="2.5rem" width="2.5rem" />
    </div>
  </div>
);
