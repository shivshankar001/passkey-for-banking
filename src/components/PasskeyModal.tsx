import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check } from 'lucide-react';
import { FingerprintScan, FaceScan, PinScan } from './ScanningAnimations';

type PasskeyModalProps = {
  selectedMethod?: 'fingerprint' | 'face' | 'pin' | null;
  onClose: () => void;
  onSuccess: () => void;
};

type Status = 'verifying' | 'success';

export function PasskeyModal({ selectedMethod: initialMethod, onClose, onSuccess }: PasskeyModalProps) {
  const [selectedMethod] = useState<'fingerprint' | 'face' | 'pin' | null>(initialMethod || null);
  const [status, setStatus] = useState<Status>('verifying');

  useEffect(() => {
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';

    // Auto start verification
    setTimeout(() => {
      setStatus('success');
      setTimeout(() => {
        onSuccess();
      }, 2000);
    }, 2500);

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [onSuccess]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/70 backdrop-blur-lg flex items-center justify-center z-50 p-6"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: 'spring', damping: 25 }}
          className="bg-white/95 backdrop-blur-2xl rounded-3xl p-12 max-w-md w-full shadow-2xl border border-white/30 relative overflow-hidden"
        >
          {/* Glow Effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-purple-500/10 pointer-events-none" />

          {status === 'verifying' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center py-8 relative z-10"
            >
              <div className="mb-6">
                {selectedMethod === 'fingerprint' && <FingerprintScan />}
                {selectedMethod === 'face' && <FaceScan />}
                {selectedMethod === 'pin' && <PinScan />}
              </div>
              <h3 className="text-[#2C2C2C] mb-2">Secure Verification...</h3>
              <p className="text-gray-600">
                {selectedMethod === 'fingerprint' && 'Scanning fingerprint'}
                {selectedMethod === 'face' && 'Scanning face'}
                {selectedMethod === 'pin' && 'Verifying PIN'}
              </p>
            </motion.div>
          )}

          {status === 'success' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center py-12 relative z-10"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', damping: 10, stiffness: 200 }}
                className="w-28 h-28 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mb-6 relative shadow-xl"
              >
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: [1, 1.5], opacity: [1, 0] }}
                  transition={{ duration: 1, delay: 0.2 }}
                  className="absolute inset-0 bg-green-400 rounded-full"
                />
                <Check className="w-14 h-14 text-white relative z-10" />
              </motion.div>

              <motion.h3
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-green-600 mb-2 text-center"
              >
                ✅ Authenticated Successfully!
              </motion.h3>
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-gray-600"
              >
                Redirecting to your dashboard...
              </motion.p>

              {/* Confetti + Glow Effect */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {[...Array(30)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-3 h-3"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: '50%',
                      borderRadius: Math.random() > 0.5 ? '50%' : '0%',
                      background: ['#E45C26', '#FFD700', '#FF8C42', '#4CAF50', '#00BCD4'][Math.floor(Math.random() * 5)]
                    }}
                    initial={{ y: 0, opacity: 1, scale: 0, rotate: 0 }}
                    animate={{ 
                      y: [0, -300, -500],
                      x: [(Math.random() - 0.5) * 300],
                      opacity: [1, 1, 0],
                      scale: [0, 1.5, 0.5],
                      rotate: [0, 360 * (Math.random() > 0.5 ? 1 : -1)]
                    }}
                    transition={{ 
                      duration: 2.5,
                      delay: Math.random() * 0.3,
                      ease: 'easeOut'
                    }}
                  />
                ))}

                {/* Glowing Particles */}
                {[...Array(10)].map((_, i) => (
                  <motion.div
                    key={`glow-${i}`}
                    className="absolute"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                    }}
                    animate={{
                      scale: [0, 1.5, 0],
                      opacity: [0, 1, 0]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: Math.random() * 2
                    }}
                  >
                    <div className="w-2 h-2 bg-[#FFD700] rounded-full blur-sm" />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
