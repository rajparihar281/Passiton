import { motion } from 'framer-motion';
import { CheckCircle, Sparkles } from 'lucide-react';
import { useEffect, useState } from 'react';

interface SuccessCelebrationProps {
  show: boolean;
  title: string;
  message: string;
  onComplete?: () => void;
}

export const SuccessCelebration = ({ 
  show, 
  title, 
  message,
  onComplete 
}: SuccessCelebrationProps) => {
  const [confetti, setConfetti] = useState<Array<{ id: number; x: number; delay: number }>>([]);
  
  useEffect(() => {
    if (show) {
      // Generate confetti particles
      const particles = Array.from({ length: 20 }, (_, i) => ({
        id: i,
        x: Math.random() * 100 - 50,
        delay: Math.random() * 0.3,
      }));
      setConfetti(particles);
      
      // Auto-complete after animation
      const timer = setTimeout(() => {
        onComplete?.();
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [show, onComplete]);
  
  if (!show) return null;
  
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="relative bg-white rounded-3xl p-8 max-w-md mx-4 text-center overflow-hidden"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      >
        {/* Confetti */}
        {confetti.map(particle => (
          <motion.div
            key={particle.id}
            className="absolute top-1/2 left-1/2 w-2 h-2 rounded-full"
            style={{
              background: `hsl(${Math.random() * 360}, 70%, 60%)`,
            }}
            initial={{ 
              x: 0, 
              y: 0, 
              opacity: 1,
              scale: 0,
            }}
            animate={{ 
              x: particle.x * 4,
              y: -200 + Math.random() * 100,
              opacity: 0,
              scale: [0, 1, 0],
            }}
            transition={{ 
              duration: 1.5,
              delay: particle.delay,
              ease: "easeOut",
            }}
          />
        ))}
        
        {/* Success icon */}
        <motion.div
          className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 mb-4"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ 
            type: "spring", 
            stiffness: 200, 
            damping: 15,
            delay: 0.2,
          }}
        >
          <CheckCircle className="w-10 h-10 text-green-600" />
        </motion.div>
        
        {/* Sparkles */}
        <motion.div
          className="absolute top-8 right-8"
          animate={{
            rotate: [0, 360],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <Sparkles className="w-6 h-6 text-yellow-500" />
        </motion.div>
        
        <motion.h2
          className="text-2xl font-bold text-gray-900 mb-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {title}
        </motion.h2>
        
        <motion.p
          className="text-gray-600"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          {message}
        </motion.p>
      </motion.div>
    </motion.div>
  );
};
