import { motion } from 'motion/react';

export function FingerprintScan() {
  return (
    <div className="relative w-40 h-40">
      {/* Fingerprint Icon Base */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
          <path
            d="M60 20C42.3 20 28 34.3 28 52C28 69.7 42.3 84 60 84C77.7 84 92 69.7 92 52C92 34.3 77.7 20 60 20Z"
            stroke="#E45C26"
            strokeWidth="2"
            fill="none"
          />
          <path
            d="M60 30C47.85 30 38 39.85 38 52C38 64.15 47.85 74 60 74C72.15 74 82 64.15 82 52C82 39.85 72.15 30 60 30Z"
            stroke="#E45C26"
            strokeWidth="2"
            fill="none"
          />
          <path
            d="M60 40C53.4 40 48 45.4 48 52C48 58.6 53.4 64 60 64C66.6 64 72 58.6 72 52C72 45.4 66.6 40 60 40Z"
            stroke="#E45C26"
            strokeWidth="2"
            fill="none"
          />
        </svg>
      </motion.div>

      {/* Pulsing Rings */}
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute inset-0 rounded-full border-2 border-blue-500"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{
            scale: [0.8, 1.5],
            opacity: [0.8, 0]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: i * 0.5,
            ease: 'easeOut'
          }}
        />
      ))}

      {/* Scanning Fill Effect */}
      <motion.div
        className="absolute inset-0 rounded-full bg-gradient-to-t from-blue-500/30 to-transparent"
        initial={{ clipPath: 'inset(100% 0 0 0)' }}
        animate={{ clipPath: 'inset(0% 0 0 0)' }}
        transition={{ duration: 2, ease: 'easeInOut' }}
      />
    </div>
  );
}

export function FaceScan() {
  return (
    <div className="relative w-40 h-40">
      {/* Face Outline */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <svg width="100" height="120" viewBox="0 0 100 120" fill="none">
          <ellipse cx="50" cy="60" rx="40" ry="50" stroke="#4F46E5" strokeWidth="2" fill="none" />
          <circle cx="35" cy="50" r="5" fill="#4F46E5" />
          <circle cx="65" cy="50" r="5" fill="#4F46E5" />
          <path d="M35 75 Q50 85 65 75" stroke="#4F46E5" strokeWidth="2" fill="none" />
        </svg>
      </motion.div>

      {/* Scanning Grid */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
        <defs>
          <linearGradient id="scanGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(79, 70, 229, 0)" />
            <stop offset="50%" stopColor="rgba(79, 70, 229, 0.5)" />
            <stop offset="100%" stopColor="rgba(79, 70, 229, 0)" />
          </linearGradient>
        </defs>
        <motion.rect
          x="0"
          y="0"
          width="100"
          height="5"
          fill="url(#scanGradient)"
          initial={{ y: 0 }}
          animate={{ y: [0, 95, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
        />
      </svg>

      {/* Rotating Scan Dots */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-blue-500 rounded-full"
          style={{
            left: '50%',
            top: '50%',
            marginLeft: '-4px',
            marginTop: '-4px',
          }}
          animate={{
            x: Math.cos((i * Math.PI) / 6) * 60,
            y: Math.sin((i * Math.PI) / 6) * 60,
            scale: [0, 1, 1, 0],
            opacity: [0, 1, 1, 0]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: i * 0.1,
            ease: 'easeInOut'
          }}
        />
      ))}
    </div>
  );
}

export function PinScan() {
  return (
    <div className="relative w-40 h-40 flex items-center justify-center">
      {/* Rotating Digits */}
      <div className="relative">
        {['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'].map((digit, i) => (
          <motion.div
            key={i}
            className="absolute inset-0 flex items-center justify-center text-4xl font-bold text-purple-600"
            initial={{ scale: 0, rotate: -180, opacity: 0 }}
            animate={{
              scale: i === 9 ? 1 : 0,
              rotate: i === 9 ? 0 : -180,
              opacity: i === 9 ? 1 : 0
            }}
            transition={{
              duration: 0.3,
              delay: i * 0.2,
              ease: 'backOut'
            }}
          >
            {digit}
          </motion.div>
        ))}
      </div>

      {/* Lock Symbol Formation */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 2, duration: 0.5 }}
      >
        <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
          <rect x="20" y="35" width="40" height="35" rx="5" stroke="#9333EA" strokeWidth="3" fill="none" />
          <path
            d="M30 35V25C30 19.5 34.5 15 40 15C45.5 15 50 19.5 50 25V35"
            stroke="#9333EA"
            strokeWidth="3"
            fill="none"
          />
          <circle cx="40" cy="52" r="5" fill="#9333EA" />
        </svg>
      </motion.div>

      {/* Circular Progress */}
      <motion.div
        className="absolute inset-0 rounded-full border-4 border-purple-500"
        style={{ borderRightColor: 'transparent' }}
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
      />
    </div>
  );
}
