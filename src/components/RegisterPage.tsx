import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Mail, Smartphone, Check, Fingerprint, ScanFace, KeyRound } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { AnimatedBackground } from './AnimatedBackground';
import { GlowingBubbles, Sparkles } from './DiwaliEffects';
import { FingerprintScan, FaceScan, PinScan } from './ScanningAnimations';

type RegisterPageProps = {
  onNavigate: (screen: 'landing' | 'login' | 'register' | 'dashboard', name?: string, email?: string) => void;
};

type Step = 1 | 2 | 3 | 4;
type PasskeyMethod = 'fingerprint' | 'face' | 'pin' | null;

export function RegisterPage({ onNavigate }: RegisterPageProps) {
  const [currentStep, setCurrentStep] = useState<Step>(1);
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [otp, setOtp] = useState('');
  const [selectedMethod, setSelectedMethod] = useState<PasskeyMethod>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const handleNextStep = () => {
    if (currentStep < 4) {
      setCurrentStep((prev) => (prev + 1) as Step);
    }
  };

  const handleStartScanning = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      setIsComplete(true);
    }, 3000);
  };

  const handleGoToDashboard = () => {
    const name = email.split('@')[0] || 'User';
    onNavigate('dashboard', name, email);
  };

  const steps = [
    { number: 1, label: 'Enter Email/Mobile', description: 'Basic Details' },
    { number: 2, label: 'Verify OTP', description: 'Authentication' },
    { number: 3, label: 'Choose Passkey', description: 'Security Method' },
    { number: 4, label: 'Generate Passkey', description: 'Final Step' }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen relative overflow-hidden"
    >
      {/* Animated Background */}
      <AnimatedBackground />
      <GlowingBubbles />
      <Sparkles />

      {/* Back Button */}
      <motion.button
        onClick={() => onNavigate('login')}
        className="absolute top-6 left-6 flex items-center gap-2 text-gray-600 hover:text-[#E45C26] transition-colors z-20 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg"
        whileHover={{ x: -5 }}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <ArrowLeft className="w-5 h-5" />
        <span>Back to Login</span>
      </motion.button>

      {/* Main Split-Screen Container */}
      <div className="min-h-screen flex items-center justify-center px-6 py-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-6xl"
        >
          <div className="bg-white/90 backdrop-blur-2xl rounded-3xl shadow-2xl overflow-hidden border border-[#FFD700]/20">
            <div className="grid md:grid-cols-12">
              {/* Left Panel - Step Tracker */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                className="md:col-span-4 bg-gradient-to-br from-[#E45C26] to-[#FF8C42] p-8 relative overflow-hidden"
              >
                {/* Decorative Elements */}
                <div className="absolute inset-0 opacity-10">
                  {[...Array(10)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute border border-white rounded-full"
                      style={{
                        width: `${50 + i * 30}px`,
                        height: `${50 + i * 30}px`,
                        left: `${i * 10}%`,
                        top: `${i * 8}%`,
                      }}
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.6, 0.3]
                      }}
                      transition={{
                        duration: 5 + i,
                        repeat: Infinity,
                        ease: 'easeInOut'
                      }}
                    />
                  ))}
                </div>

                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-12">
                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-lg">
                      <span className="text-[#E45C26] text-xl">I</span>
                    </div>
                    <div>
                      <span className="text-white">ICICI Bank</span>
                      <p className="text-xs text-orange-100">Passkey Setup</p>
                    </div>
                  </div>

                  <h2 className="text-white mb-8">Setup Your Passkey</h2>

                  {/* Vertical Step Progress */}
                  <div className="space-y-6">
                    {steps.map((step) => (
                      <motion.div
                        key={step.number}
                        className="flex items-start gap-4"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 * step.number }}
                      >
                        <motion.div
                          className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${
                            currentStep > step.number
                              ? 'bg-white text-[#E45C26]'
                              : currentStep === step.number
                              ? 'bg-[#FFD700] text-white'
                              : 'bg-white/20 text-white/60'
                          }`}
                          animate={currentStep === step.number ? {
                            scale: [1, 1.1, 1],
                            boxShadow: [
                              '0 0 0 0 rgba(255, 215, 0, 0)',
                              '0 0 0 10px rgba(255, 215, 0, 0.3)',
                              '0 0 0 0 rgba(255, 215, 0, 0)'
                            ]
                          } : {}}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          {currentStep > step.number ? (
                            <Check className="w-6 h-6" />
                          ) : (
                            <span className="text-lg">{step.number}</span>
                          )}
                        </motion.div>
                        <div className="flex-1">
                          <p className={`${
                            currentStep >= step.number ? 'text-white' : 'text-white/60'
                          } transition-colors mb-1`}>
                            {step.label}
                          </p>
                          <p className="text-sm text-orange-100/80">{step.description}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Progress Line */}
                  <div className="absolute left-[4.5rem] top-[180px] w-0.5 h-64 bg-white/20">
                    <motion.div
                      className="w-full bg-[#FFD700]"
                      initial={{ height: 0 }}
                      animate={{ height: `${((currentStep - 1) / 3) * 100}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                </div>
              </motion.div>

              {/* Right Panel - Forms */}
              <div className="md:col-span-8 p-8 md:p-12">
                <AnimatePresence mode="wait">
                  {/* Step 1: Enter Details */}
                  {currentStep === 1 && (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -50 }}
                      className="space-y-6"
                    >
                      <div>
                        <h3 className="text-[#2C2C2C] mb-2">Enter Your Details</h3>
                        <p className="text-gray-600 text-sm">We'll use this to verify your identity</p>
                      </div>

                      <div>
                        <Label htmlFor="email">Email Address</Label>
                        <div className="relative mt-2">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <Input
                            id="email"
                            type="email"
                            placeholder="your.email@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="pl-10 h-12 bg-white"
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="mobile">Mobile Number</Label>
                        <div className="relative mt-2">
                          <Smartphone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <Input
                            id="mobile"
                            type="tel"
                            placeholder="+91 98765 43210"
                            value={mobile}
                            onChange={(e) => setMobile(e.target.value)}
                            className="pl-10 h-12 bg-white"
                          />
                        </div>
                      </div>

                      <Button
                        onClick={handleNextStep}
                        className="w-full h-12 bg-gradient-to-r from-[#E45C26] via-[#FF8C42] to-[#FFD700] hover:shadow-xl text-white"
                        disabled={!email || !mobile}
                      >
                        Continue to Verification
                      </Button>
                    </motion.div>
                  )}

                  {/* Step 2: Verify OTP */}
                  {currentStep === 2 && (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -50 }}
                      className="space-y-6"
                    >
                      <div>
                        <h3 className="text-[#2C2C2C] mb-2">Verify OTP</h3>
                        <p className="text-gray-600 text-sm">
                          We've sent a 6-digit code to {mobile}
                        </p>
                      </div>

                      <div>
                        <Label htmlFor="otp">Enter OTP</Label>
                        <Input
                          id="otp"
                          type="text"
                          placeholder="000000"
                          value={otp}
                          onChange={(e) => setOtp(e.target.value.slice(0, 6))}
                          className="h-14 text-center text-2xl tracking-widest mt-2 bg-white"
                          maxLength={6}
                        />
                      </div>

                      <div className="flex gap-3">
                        <Button
                          onClick={() => setCurrentStep(1)}
                          variant="outline"
                          className="flex-1 h-12"
                        >
                          Back
                        </Button>
                        <Button
                          onClick={handleNextStep}
                          className="flex-1 h-12 bg-gradient-to-r from-[#E45C26] via-[#FF8C42] to-[#FFD700] hover:shadow-xl text-white"
                          disabled={otp.length !== 6}
                        >
                          Verify & Continue
                        </Button>
                      </div>

                      <button className="w-full text-sm text-[#E45C26] hover:underline">
                        Resend OTP
                      </button>
                    </motion.div>
                  )}

                  {/* Step 3: Select Passkey Method */}
                  {currentStep === 3 && (
                    <motion.div
                      key="step3"
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -50 }}
                      className="space-y-6"
                    >
                      <div>
                        <h3 className="text-[#2C2C2C] mb-2">Choose Passkey Method</h3>
                        <p className="text-gray-600 text-sm">Select your preferred authentication method</p>
                      </div>

                      <div className="grid grid-cols-3 gap-4">
                        {[
                          { type: 'fingerprint' as PasskeyMethod, icon: Fingerprint, label: 'Fingerprint', color: 'from-orange-500 to-orange-600' },
                          { type: 'face' as PasskeyMethod, icon: ScanFace, label: 'Face ID', color: 'from-blue-500 to-blue-600' },
                          { type: 'pin' as PasskeyMethod, icon: KeyRound, label: 'PIN', color: 'from-purple-500 to-purple-600' }
                        ].map((method) => (
                          <motion.button
                            key={method.type}
                            onClick={() => setSelectedMethod(method.type)}
                            className={`p-6 rounded-xl border-2 transition-all ${
                              selectedMethod === method.type
                                ? 'border-transparent bg-gradient-to-br ' + method.color + ' text-white shadow-xl scale-105'
                                : 'border-gray-200 hover:border-gray-300 bg-white'
                            }`}
                            whileHover={{ y: -5, scale: selectedMethod === method.type ? 1.05 : 1.03 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <method.icon className={`w-10 h-10 mx-auto mb-2 ${
                              selectedMethod === method.type ? 'text-white' : 'text-gray-400'
                            }`} />
                            <p className={`text-sm ${
                              selectedMethod === method.type ? 'text-white' : 'text-[#2C2C2C]'
                            }`}>
                              {method.label}
                            </p>
                          </motion.button>
                        ))}
                      </div>

                      <div className="flex gap-3">
                        <Button
                          onClick={() => setCurrentStep(2)}
                          variant="outline"
                          className="flex-1 h-12"
                        >
                          Back
                        </Button>
                        <Button
                          onClick={handleNextStep}
                          className="flex-1 h-12 bg-gradient-to-r from-[#E45C26] via-[#FF8C42] to-[#FFD700] hover:shadow-xl text-white"
                          disabled={!selectedMethod}
                        >
                          Continue to Setup
                        </Button>
                      </div>
                    </motion.div>
                  )}

                  {/* Step 4: Generate Passkey with Scanning */}
                  {currentStep === 4 && (
                    <motion.div
                      key="step4"
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -50 }}
                      className="space-y-6"
                    >
                      {!isComplete ? (
                        <>
                          <div className="text-center">
                            <h3 className="text-[#2C2C2C] mb-2">Generate Secure Passkey</h3>
                            <p className="text-gray-600 text-sm">
                              {isScanning 
                                ? `Scanning your ${selectedMethod}...` 
                                : `Ready to scan your ${selectedMethod}`
                              }
                            </p>
                          </div>

                          {isScanning ? (
                            <div className="flex flex-col items-center py-12">
                              {selectedMethod === 'fingerprint' && <FingerprintScan />}
                              {selectedMethod === 'face' && <FaceScan />}
                              {selectedMethod === 'pin' && <PinScan />}
                            </div>
                          ) : (
                            <div className="flex flex-col items-center py-12">
                              <div className="w-40 h-40 bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl flex items-center justify-center mb-6">
                                {selectedMethod === 'fingerprint' && <Fingerprint className="w-20 h-20 text-gray-400" />}
                                {selectedMethod === 'face' && <ScanFace className="w-20 h-20 text-gray-400" />}
                                {selectedMethod === 'pin' && <KeyRound className="w-20 h-20 text-gray-400" />}
                              </div>
                            </div>
                          )}

                          {!isScanning && (
                            <Button
                              onClick={handleStartScanning}
                              className="w-full h-12 bg-gradient-to-r from-[#E45C26] via-[#FF8C42] to-[#FFD700] hover:shadow-xl text-white"
                            >
                              Start Scanning
                            </Button>
                          )}
                        </>
                      ) : (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="text-center py-8"
                        >
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: 'spring', damping: 10 }}
                            className="w-28 h-28 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl"
                          >
                            <Check className="w-14 h-14 text-white" />
                          </motion.div>

                          <h3 className="text-green-600 mb-2">✅ Passkey Setup Completed</h3>
                          <p className="text-gray-600 mb-2">
                            on this device using {selectedMethod}
                          </p>
                          <p className="text-sm text-gray-500 mb-8">
                            Email: <span className="text-[#E45C26]">{email}</span>
                          </p>

                          <Button
                            onClick={handleGoToDashboard}
                            className="w-full h-12 bg-gradient-to-r from-[#E45C26] via-[#FF8C42] to-[#FFD700] hover:shadow-xl text-white"
                          >
                            Go to Dashboard
                          </Button>

                          {/* Confetti */}
                          <div className="absolute inset-0 pointer-events-none overflow-hidden">
                            {[...Array(50)].map((_, i) => (
                              <motion.div
                                key={i}
                                className="absolute w-3 h-3"
                                style={{
                                  left: `${Math.random() * 100}%`,
                                  top: '30%',
                                  background: ['#E45C26', '#FFD700', '#FF8C42', '#4CAF50', '#9C27B0'][Math.floor(Math.random() * 5)]
                                }}
                                initial={{ y: 0, opacity: 1, rotate: 0 }}
                                animate={{ 
                                  y: [0, -500],
                                  x: [(Math.random() - 0.5) * 500],
                                  opacity: [1, 0],
                                  rotate: [0, 360 * (Math.random() > 0.5 ? 1 : -1)]
                                }}
                                transition={{ 
                                  duration: 2.5 + Math.random(),
                                  delay: Math.random() * 0.5,
                                }}
                              />
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
