import { motion } from 'framer-motion';
import { type ReactNode } from 'react';
import { animations } from '../utils/animations';

interface EmptyStateProps {
  icon: ReactNode;
  title: string;
  description: string;
  action?: ReactNode;
  className?: string;
}

export const EmptyState = ({ 
  icon, 
  title, 
  description, 
  action,
  className = '' 
}: EmptyStateProps) => {
  return (
    <motion.div 
      className={`flex flex-col items-center justify-center py-16 px-4 text-center ${className}`}
      variants={animations.staggerContainer}
      initial="initial"
      animate="animate"
    >
      <motion.div
        variants={animations.staggerItem}
        className="mb-6 text-gray-400"
        animate={{
          y: [0, -10, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        {icon}
      </motion.div>
      
      <motion.h3 
        variants={animations.staggerItem}
        className="text-xl font-semibold text-gray-900 mb-2"
      >
        {title}
      </motion.h3>
      
      <motion.p 
        variants={animations.staggerItem}
        className="text-gray-600 mb-6 max-w-md"
      >
        {description}
      </motion.p>
      
      {action && (
        <motion.div variants={animations.staggerItem}>
          {action}
        </motion.div>
      )}
    </motion.div>
  );
};
