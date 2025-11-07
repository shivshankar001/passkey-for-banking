import { motion } from 'motion/react';

export function DiwaliDiyas() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            left: `${Math.random() * 100}%`,
            bottom: '-50px',
          }}
          animate={{
            y: [0, -window.innerHeight - 100],
            x: [0, (Math.random() - 0.5) * 100],
            opacity: [0, 1, 1, 0],
            scale: [0.8, 1, 1, 0.8]
          }}
          transition={{
            duration: 15 + Math.random() * 10,
            repeat: Infinity,
            delay: Math.random() * 10,
            ease: 'linear'
          }}
        >
          {/* Diya/Flame */}
          <div className="relative">
            <div className="w-8 h-8 bg-gradient-to-t from-orange-600 via-orange-400 to-yellow-300 rounded-full blur-sm" />
            <motion.div
              className="absolute inset-0 w-8 h-8 bg-gradient-to-t from-orange-500 to-yellow-200 rounded-full"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.8, 1, 0.8]
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
            />
          </div>
        </motion.div>
      ))}
    </div>
  );
}

export function GlowingBubbles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: `${20 + Math.random() * 60}px`,
            height: `${20 + Math.random() * 60}px`,
            left: `${Math.random() * 100}%`,
            bottom: '-100px',
            background: `radial-gradient(circle, ${
              i % 3 === 0 
                ? 'rgba(255, 215, 0, 0.3)' 
                : i % 3 === 1 
                ? 'rgba(228, 92, 38, 0.2)' 
                : 'rgba(255, 140, 66, 0.25)'
            } 0%, transparent 70%)`,
            boxShadow: `0 0 ${20 + Math.random() * 30}px ${
              i % 3 === 0 ? '#FFD700' : '#FF8C42'
            }`,
          }}
          animate={{
            y: [0, -window.innerHeight - 200],
            x: [0, (Math.random() - 0.5) * 200],
            scale: [1, 1.3, 1],
            opacity: [0, 0.8, 0]
          }}
          transition={{
            duration: 20 + Math.random() * 15,
            repeat: Infinity,
            delay: Math.random() * 10,
            ease: 'easeInOut'
          }}
        />
      ))}
    </div>
  );
}

export function Sparkles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(30)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            scale: [0, 1, 0],
            opacity: [0, 1, 0],
            rotate: [0, 180, 360]
          }}
          transition={{
            duration: 2 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: 'easeInOut'
          }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M8 0L9.5 6.5L16 8L9.5 9.5L8 16L6.5 9.5L0 8L6.5 6.5L8 0Z"
              fill="#FFD700"
              opacity="0.8"
            />
          </svg>
        </motion.div>
      ))}
    </div>
  );
}

export function LightRays() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            width: '200%',
            height: '2px',
            background: 'linear-gradient(90deg, transparent, #FFD700, transparent)',
            left: '-50%',
            top: `${i * 20}%`,
            transformOrigin: 'center',
          }}
          animate={{
            x: ['0%', '100%'],
            opacity: [0, 0.5, 0]
          }}
          transition={{
            duration: 8 + i * 2,
            repeat: Infinity,
            delay: i * 1.5,
            ease: 'linear'
          }}
        />
      ))}
    </div>
  );
}
