import { motion } from 'motion/react';

export function AnimatedBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Gradient Waves */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(135deg, #FFF5EB 0%, #FFFFFF 25%, #FFE4CC 50%, #FFFFFF 75%, #FFF5EB 100%)',
          backgroundSize: '400% 400%'
        }}
        animate={{
          backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: 'linear'
        }}
      />

      {/* Floating Orbs */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full blur-3xl"
          style={{
            width: `${200 + i * 50}px`,
            height: `${200 + i * 50}px`,
            background: `radial-gradient(circle, ${i % 2 === 0 ? 'rgba(228, 92, 38, 0.1)' : 'rgba(255, 140, 66, 0.1)'} 0%, transparent 70%)`,
            left: `${i * 20}%`,
            top: `${i * 15}%`,
          }}
          animate={{
            x: [0, 100, -50, 0],
            y: [0, -100, 50, 0],
            scale: [1, 1.2, 0.8, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{
            duration: 20 + i * 5,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 2
          }}
        />
      ))}

      {/* Geometric Shapes */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={`geo-${i}`}
          className="absolute border-2 border-orange-200/20"
          style={{
            width: '100px',
            height: '100px',
            left: `${10 + i * 15}%`,
            top: `${20 + i * 10}%`,
            borderRadius: i % 3 === 0 ? '50%' : '20%'
          }}
          animate={{
            rotate: [0, 360],
            x: [0, 50, -30, 0],
            y: [0, -50, 30, 0],
            opacity: [0.1, 0.3, 0.1]
          }}
          transition={{
            duration: 30 + i * 3,
            repeat: Infinity,
            ease: 'linear'
          }}
        />
      ))}
    </div>
  );
}

export function ParticleField() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(30)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-orange-400/30 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, Math.random() * 20 - 10, 0],
            opacity: [0, 1, 0],
            scale: [0, 1, 0]
          }}
          transition={{
            duration: 3 + Math.random() * 4,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: 'easeInOut'
          }}
        />
      ))}
    </div>
  );
}
