import { motion } from 'framer-motion';
import { Shield, Star, Flame, Award, TrendingUp } from 'lucide-react';

interface TrustBadgeProps {
  type: 'verified' | 'trusted' | 'streak' | 'top' | 'trending';
  value?: number;
  size?: 'sm' | 'md' | 'lg';
  animated?: boolean;
}

export const TrustBadge = ({ 
  type, 
  value, 
  size = 'md',
  animated = true 
}: TrustBadgeProps) => {
  const icons = {
    verified: Shield,
    trusted: Star,
    streak: Flame,
    top: Award,
    trending: TrendingUp,
  };
  
  const colors = {
    verified: 'bg-blue-100 text-blue-700 border-blue-200',
    trusted: 'bg-green-100 text-green-700 border-green-200',
    streak: 'bg-orange-100 text-orange-700 border-orange-200',
    top: 'bg-purple-100 text-purple-700 border-purple-200',
    trending: 'bg-pink-100 text-pink-700 border-pink-200',
  };
  
  const sizes = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm',
    lg: 'px-4 py-2 text-base',
  };
  
  const Icon = icons[type];
  
  return (
    <motion.div
      className={`inline-flex items-center gap-1.5 rounded-full border font-medium ${colors[type]} ${sizes[size]}`}
      initial={animated ? { scale: 0, opacity: 0 } : undefined}
      animate={animated ? { scale: 1, opacity: 1 } : undefined}
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
    >
      <Icon className="w-3.5 h-3.5" />
      {value !== undefined && <span>{value}</span>}
    </motion.div>
  );
};

interface ReputationRingProps {
  level: number;
  maxLevel?: number;
  size?: number;
}

export const ReputationRing = ({ 
  level, 
  maxLevel = 10,
  size = 80 
}: ReputationRingProps) => {
  const progress = (level / maxLevel) * 100;
  const circumference = 2 * Math.PI * 35;
  const strokeDashoffset = circumference - (progress / 100) * circumference;
  
  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r="35"
          stroke="currentColor"
          strokeWidth="6"
          fill="none"
          className="text-gray-200"
        />
        {/* Progress circle */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r="35"
          stroke="url(#gradient)"
          strokeWidth="6"
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0EA5E9" />
            <stop offset="100%" stopColor="#A855F7" />
          </linearGradient>
        </defs>
      </svg>
      <motion.div 
        className="absolute inset-0 flex items-center justify-center"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.5, type: "spring" }}
      >
        <span className="text-lg font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
          {level}
        </span>
      </motion.div>
    </div>
  );
};
