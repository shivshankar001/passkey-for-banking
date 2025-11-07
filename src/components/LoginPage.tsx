import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Lock, Mail, Fingerprint, ScanFace, KeyRound, Loader2, Shield } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { PasskeyModal } from './PasskeyModal';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { AnimatedBackground } from './AnimatedBackground';
import { GlowingBubbles, Sparkles } from './DiwaliEffects';

type LoginPageProps = {
  onNavigate: (screen: 'landing' | 'login' | 'register' | 'dashboard', name?: string, email?: string) => void;
};

type PasskeyMethod = 'fingerprint' | 'face' | 'pin';

export function LoginPage({ onNavigate }: LoginPageProps) {
  const [activeTab, setActiveTab] = useState('passkey');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState<PasskeyMethod | null>(null);
  const [showPasskeyModal, setShowPasskeyModal] = useState(false);

  const handlePasswordLogin = () => {
    if (email && password) {
      setIsAuthenticating(true);
      setTimeout(() => {
        const name = email.split('@')[0] || 'User';
        onNavigate('dashboard', name, email);
      }, 1500);
    }
  };

  const handlePasskeyMethodSelect = (method: PasskeyMethod) => {
    setSelectedMethod(method);
    setShowPasskeyModal(true);
  };

  const handlePasskeySuccess = () => {
    const name = email || 'User';
    onNavigate('dashboard', name, email);
  };

  const passkeyMethods = [
    {
      type: 'fingerprint' as PasskeyMethod,
      icon: Fingerprint,
      label: 'Fingerprint',
      color: 'from-orange-500 to-orange-600',
      description: 'Touch sensor to login'
    },
    {
      type: 'face' as PasskeyMethod,
      icon: ScanFace,
      label: 'Face ID',
      color: 'from-blue-500 to-blue-600',
      description: 'Look at camera to login'
    },
    {
      type: 'pin' as PasskeyMethod,
      icon: KeyRound,
      label: 'PIN',
      color: 'from-purple-500 to-purple-600',
      description: 'Enter secure PIN'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen relative overflow-hidden"
    >
      {/* Animated Background */}
      <AnimatedBackground />
      <GlowingBubbles />
      <Sparkles />

      {/* Background Blur Overlays */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
            rotate: [0, 90, 0]
          }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-gradient-to-br from-[#E45C26]/20 to-orange-300/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ 
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.5, 0.3],
            rotate: [0, -90, 0]
          }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute -bottom-40 -left-40 w-[600px] h-[600px] bg-gradient-to-br from-orange-300/20 to-[#E45C26]/20 rounded-full blur-3xl"
        />
      </div>

      {/* Back Button */}
      <motion.button
        onClick={() => onNavigate('landing')}
        className="absolute top-6 left-6 flex items-center gap-2 text-gray-600 hover:text-[#E45C26] transition-colors z-20 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full"
        whileHover={{ x: -5, scale: 1.05 }}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <ArrowLeft className="w-5 h-5" />
        <span>Back to Home</span>
      </motion.button>

      {/* Main Content */}
      <div className="min-h-screen flex items-center justify-center px-6 py-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-6xl"
        >
          <div className="grid md:grid-cols-2 gap-8">
            {/* Left Side - Illustration */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="relative hidden md:flex flex-col justify-center p-12 bg-gradient-to-br from-[#E45C26] to-orange-600 rounded-3xl overflow-hidden"
            >
              {/* Animated Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                {[...Array(20)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute border border-white rounded-lg"
                    style={{
                      width: `${50 + i * 20}px`,
                      height: `${50 + i * 20}px`,
                      left: `${i * 5}%`,
                      top: `${i * 3}%`,
                    }}
                    animate={{
                      rotate: [0, 360],
                      scale: [1, 1.2, 1],
                    }}
                    transition={{
                      duration: 20 + i * 2,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  />
                ))}
              </div>

              <div className="relative z-10 text-center">
                <motion.div
                  animate={{ 
                    rotate: [0, 5, -5, 0],
                    scale: [1, 1.05, 1]
                  }}
                  transition={{ 
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="mb-8"
                >
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1585079374502-415f8516dcc3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiaW9tZXRyaWMlMjBhdXRoZW50aWNhdGlvbiUyMHNlY3VyaXR5fGVufDF8fHx8MTc2MjQwODM0MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                    alt="Secure Authentication"
                    className="w-72 h-72 object-cover rounded-2xl shadow-2xl mx-auto"
                  />
                </motion.div>

                <h3 className="text-white mb-3">Secure Login</h3>
                <p className="text-orange-100">
                  Your biometrics are your password.<br />
                  Fast. Secure. Simple.
                </p>

                {/* Floating Security Icons */}
                {[Lock, Shield, Fingerprint].map((Icon, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-12 h-12 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center"
                    style={{
                      left: `${20 + i * 30}%`,
                      top: `${60 + i * 10}%`,
                    }}
                    animate={{
                      y: [0, -20, 0],
                      rotate: [0, 10, -10, 0]
                    }}
                    transition={{
                      duration: 3 + i,
                      repeat: Infinity,
                      delay: i * 0.5
                    }}
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right Side - Login Form */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="bg-white/90 backdrop-blur-2xl p-8 md:p-12 rounded-3xl shadow-2xl border border-white/20"
            >
              <div className="flex items-center gap-2 mb-8">
                <div className="w-10 h-10 bg-gradient-to-br from-[#E45C26] to-[#FF8C42] rounded-lg flex items-center justify-center">
                  <span className="text-white">I</span>
                </div>
                <span className="text-[#2C2C2C]">ICICI Bank</span>
              </div>

              <h2 className="text-[#2C2C2C] mb-2">Welcome Back to ICICI Bank</h2>
              <p className="text-gray-600 mb-8">Choose your preferred login method</p>

              {/* Tab Switcher */}
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-8 bg-gray-100 p-1 rounded-xl">
                  <TabsTrigger 
                    value="passkey"
                    className="rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#E45C26] data-[state=active]:to-[#FF8C42] data-[state=active]:text-white transition-all"
                  >
                    <Lock className="w-4 h-4 mr-2" />
                    Passkey Login
                  </TabsTrigger>
                  <TabsTrigger 
                    value="password"
                    className="rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#E45C26] data-[state=active]:to-[#FF8C42] data-[state=active]:text-white transition-all"
                  >
                    <Mail className="w-4 h-4 mr-2" />
                    Password Login
                  </TabsTrigger>
                </TabsList>

                <AnimatePresence mode="wait">
                  {/* Passkey Login Tab */}
                  <TabsContent value="passkey" className="mt-0">
                    <motion.div
                      key="passkey-tab"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-6"
                    >
                      <p className="text-center text-gray-600 mb-6">
                        Login using your registered Passkey method
                      </p>

                      <div className="grid grid-cols-3 gap-4">
                        {passkeyMethods.map((method, index) => (
                          <motion.button
                            key={method.type}
                            onClick={() => handlePasskeyMethodSelect(method.type)}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 * index }}
                            whileHover={{ y: -5, scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="relative group p-6 bg-white border-2 border-gray-200 hover:border-transparent rounded-2xl transition-all overflow-hidden"
                          >
                            <div className={`absolute inset-0 bg-gradient-to-br ${method.color} opacity-0 group-hover:opacity-10 transition-opacity`} />
                            
                            <motion.div
                              className={`w-16 h-16 mx-auto mb-3 rounded-xl bg-gradient-to-br ${method.color} flex items-center justify-center relative overflow-hidden`}
                              animate={{
                                boxShadow: [
                                  '0 0 20px rgba(228, 92, 38, 0.3)',
                                  '0 0 40px rgba(228, 92, 38, 0.5)',
                                  '0 0 20px rgba(228, 92, 38, 0.3)'
                                ]
                              }}
                              transition={{ duration: 2, repeat: Infinity }}
                            >
                              {/* Scanning Animation */}
                              <motion.div
                                className="absolute inset-0 bg-gradient-to-b from-white/0 via-white/40 to-white/0"
                                animate={{ y: ['-100%', '100%'] }}
                                transition={{ 
                                  duration: 2,
                                  repeat: Infinity,
                                  ease: "linear"
                                }}
                              />
                              <method.icon className="w-8 h-8 text-white relative z-10" />
                            </motion.div>

                            <p className="text-sm text-[#2C2C2C] mb-1">{method.label}</p>
                            <p className="text-xs text-gray-500">{method.description}</p>
                          </motion.button>
                        ))}
                      </div>

                      <div className="relative my-8">
                        <div className="absolute inset-0 flex items-center">
                          <div className="w-full border-t border-gray-300" />
                        </div>
                        <div className="relative flex justify-center text-sm">
                          <span className="px-4 bg-white/90 text-gray-500">New to Passkey?</span>
                        </div>
                      </div>

                      <Button
                        onClick={() => onNavigate('register')}
                        variant="outline"
                        className="w-full h-12 border-2 hover:border-[#E45C26] hover:text-[#E45C26]"
                      >
                        Register New User
                      </Button>
                    </motion.div>
                  </TabsContent>

                  {/* Password Login Tab */}
                  <TabsContent value="password" className="mt-0">
                    <motion.div
                      key="password-tab"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-6"
                    >
                      <div>
                        <Label htmlFor="email">Email or Mobile Number</Label>
                        <div className="relative mt-2">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <Input
                            id="email"
                            type="text"
                            placeholder="your.email@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="pl-10 h-12 border-gray-300 focus:border-[#E45C26] focus:ring-[#E45C26] bg-white"
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="password">Password</Label>
                        <div className="relative mt-2">
                          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <Input
                            id="password"
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="pl-10 h-12 border-gray-300 focus:border-[#E45C26] focus:ring-[#E45C26] bg-white"
                            onKeyPress={(e) => e.key === 'Enter' && handlePasswordLogin()}
                          />
                        </div>
                        <div className="mt-2 text-right">
                          <button className="text-sm text-[#E45C26] hover:underline">
                            Forgot Password?
                          </button>
                        </div>
                      </div>

                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Button
                          onClick={handlePasswordLogin}
                          disabled={!email || !password || isAuthenticating}
                          className="w-full h-12 bg-gradient-to-r from-[#E45C26] to-[#FF8C42] hover:shadow-xl text-white relative overflow-hidden group"
                        >
                          {isAuthenticating ? (
                            <>
                              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                              Authenticating...
                            </>
                          ) : (
                            <>
                              <motion.div
                                className="absolute inset-0 bg-white/20"
                                initial={{ x: '-100%' }}
                                whileHover={{ x: '100%' }}
                                transition={{ duration: 0.5 }}
                              />
                              <span className="relative z-10">Login Securely</span>
                            </>
                          )}
                        </Button>
                      </motion.div>

                      <div className="relative my-6">
                        <div className="absolute inset-0 flex items-center">
                          <div className="w-full border-t border-gray-300" />
                        </div>
                        <div className="relative flex justify-center text-sm">
                          <span className="px-4 bg-white/90 text-gray-500">Don't have an account?</span>
                        </div>
                      </div>

                      <Button
                        onClick={() => onNavigate('register')}
                        variant="outline"
                        className="w-full h-12 border-2 hover:border-[#E45C26] hover:text-[#E45C26]"
                      >
                        Register New User
                      </Button>
                    </motion.div>
                  </TabsContent>
                </AnimatePresence>
              </Tabs>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Passkey Modal */}
      {showPasskeyModal && (
        <PasskeyModal
          selectedMethod={selectedMethod}
          onClose={() => setShowPasskeyModal(false)}
          onSuccess={handlePasskeySuccess}
        />
      )}
    </motion.div>
  );
}
