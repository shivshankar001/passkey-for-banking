import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Lock, Fingerprint, Shield, ArrowRight, Key, Globe, ChevronDown } from 'lucide-react';
import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { AnimatedBackground, ParticleField } from './AnimatedBackground';
import { DiwaliDiyas, GlowingBubbles, Sparkles, LightRays } from './DiwaliEffects';

type LandingPageProps = {
  onNavigate: (screen: 'landing' | 'login' | 'register' | 'dashboard', name?: string, email?: string) => void;
};

export function LandingPage({ onNavigate }: LandingPageProps) {
  const [language, setLanguage] = useState('EN');
  const [showLangDropdown, setShowLangDropdown] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const floatingIcons = [
    { Icon: Fingerprint, delay: 0, position: { top: '20%', left: '10%' } },
    { Icon: Lock, delay: 1, position: { top: '60%', left: '15%' } },
    { Icon: Shield, delay: 2, position: { top: '40%', right: '10%' } },
    { Icon: Key, delay: 1.5, position: { top: '70%', right: '20%' } },
    { Icon: Shield, delay: 0.5, position: { top: '30%', right: '25%' } },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background */}
      <AnimatedBackground />
      <ParticleField />
      <DiwaliDiyas />
      <GlowingBubbles />
      <Sparkles />
      <LightRays />

      {/* Glassmorphic Navbar with Scroll Effect */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="fixed top-0 w-full z-50"
      >
        <div className="mx-4 mt-4">
          <motion.div
            animate={{
              backgroundColor: scrolled 
                ? 'rgba(228, 92, 38, 0.95)' 
                : 'rgba(255, 255, 255, 0.7)',
              backdropFilter: 'blur(25px)'
            }}
            transition={{ duration: 0.3 }}
            className="max-w-7xl mx-auto px-6 py-4 rounded-2xl border border-white/20 shadow-xl"
          >
            <div className="flex items-center justify-between">
              {/* Logo */}
              <motion.div 
                className="flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
              >
                <div className="w-10 h-10 bg-gradient-to-br from-[#E45C26] to-[#FF8C42] rounded-lg flex items-center justify-center shadow-lg relative overflow-hidden">
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                    animate={{ x: ['-100%', '200%'] }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                  />
                  <span className="text-white relative z-10">I</span>
                </div>
                <span className={scrolled ? 'text-white' : 'text-[#2C2C2C]'}>ICICI Bank</span>
              </motion.div>
              
              {/* Center Menu */}
              <div className="hidden md:flex items-center gap-8">
                {['Home', 'About Passkey', 'Security', 'Help', 'Contact'].map((item, index) => (
                  <motion.a
                    key={item}
                    href="#"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index }}
                    className={`${scrolled ? 'text-white' : 'text-[#2C2C2C]'} hover:text-[#FFD700] transition-colors relative group`}
                  >
                    {item}
                    <motion.span
                      className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#FFD700] group-hover:w-full transition-all duration-300"
                    />
                  </motion.a>
                ))}
              </div>

              {/* Right Side */}
              <div className="flex items-center gap-4">
                {/* Language Switcher */}
                <div className="relative">
                  <motion.button
                    onClick={() => setShowLangDropdown(!showLangDropdown)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg ${
                      scrolled ? 'hover:bg-white/20' : 'hover:bg-gray-100'
                    } transition-colors`}
                    whileHover={{ scale: 1.05 }}
                  >
                    <Globe className={`w-4 h-4 ${scrolled ? 'text-white' : 'text-gray-600'}`} />
                    <span className={`text-sm ${scrolled ? 'text-white' : 'text-gray-700'}`}>{language}</span>
                    <ChevronDown className={`w-4 h-4 ${scrolled ? 'text-white' : 'text-gray-600'}`} />
                  </motion.button>

                  {showLangDropdown && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute top-full mt-2 right-0 bg-white/95 backdrop-blur-xl rounded-lg shadow-xl border border-white/20 overflow-hidden min-w-[120px]"
                    >
                      {['EN', 'हिंदी'].map((lang) => (
                        <button
                          key={lang}
                          onClick={() => {
                            setLanguage(lang);
                            setShowLangDropdown(false);
                          }}
                          className="w-full px-4 py-2 text-left hover:bg-orange-50 transition-colors text-sm"
                        >
                          {lang}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </div>

                {/* Login Button */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button 
                    onClick={() => onNavigate('login')}
                    className="bg-gradient-to-r from-[#E45C26] to-[#FF8C42] hover:shadow-2xl hover:shadow-orange-500/50 text-white rounded-full px-6 transition-all duration-300 border-2 border-[#FFD700]/30 relative overflow-hidden group"
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                      animate={{ x: ['-100%', '200%'] }}
                      transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                    />
                    <span className="relative z-10">Login</span>
                  </Button>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-6 pt-40 pb-20 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-100 to-orange-50 rounded-full mb-6 border border-[#FFD700]/30"
            >
              <Shield className="w-4 h-4 text-[#E45C26]" />
              <span className="text-[#E45C26]">Secure Your Banking — The Passkey Way</span>
            </motion.div>

            <motion.h1 
              className="text-[#2C2C2C] mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              Login Smarter with <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E45C26] via-[#FF8C42] to-[#FFD700]">Passkey</span>
            </motion.h1>
            
            <motion.p 
              className="text-gray-600 mb-8 text-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              Experience the future of passwordless authentication with biometric security. 
              Login instantly using your fingerprint, face, or secure PIN - making banking faster, safer, and simpler than ever.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              whileHover={{ scale: 1.05, boxShadow: '0 20px 60px rgba(228, 92, 38, 0.4)' }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                onClick={() => onNavigate('login')}
                className="bg-gradient-to-r from-[#E45C26] via-[#FF8C42] to-[#FFD700] hover:shadow-2xl text-white rounded-full px-8 py-6 text-lg group relative overflow-hidden border-2 border-[#FFD700]/50"
              >
                <motion.div
                  className="absolute inset-0 bg-white/20"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '100%' }}
                  transition={{ duration: 0.6 }}
                />
                <span className="relative z-10 flex items-center">
                  Experience Passkey Now
                  <ArrowRight className="ml-2 group-hover:translate-x-2 transition-transform" />
                </span>
              </Button>
            </motion.div>

            {/* Feature Pills */}
            <div className="flex flex-wrap gap-4 mt-8">
              {[
                { icon: Shield, text: 'Bank-Grade Security', color: 'from-blue-500 to-blue-600' },
                { icon: Fingerprint, text: 'Biometric Login', color: 'from-purple-500 to-purple-600' },
                { icon: Lock, text: 'Zero Passwords', color: 'from-green-500 to-green-600' }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                  whileHover={{ y: -5, scale: 1.05 }}
                  className="flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-lg border border-white/20"
                >
                  <div className={`w-6 h-6 rounded-full bg-gradient-to-br ${item.color} flex items-center justify-center`}>
                    <item.icon className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-sm text-gray-700">{item.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Illustration */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative"
          >
            <div className="relative">
              {/* Main Image */}
              <motion.div 
                className="relative rounded-3xl overflow-hidden shadow-2xl"
                animate={{ 
                  y: [0, -20, 0],
                }}
                transition={{ 
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1696013910376-c56f76dd8178?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHwzZCUyMHZhdWx0JTIwc2VjdXJpdHl8ZW58MXx8fHwxNzYyNDA5NDYxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="3D Vault Security"
                  className="w-full h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-[#E45C26]/30 via-[#FFD700]/20 to-transparent" />
              </motion.div>

              {/* Floating Icons with Parallax */}
              {floatingIcons.map(({ Icon, delay, position }, index) => (
                <motion.div
                  key={index}
                  className="absolute w-16 h-16 bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl flex items-center justify-center border border-[#FFD700]/30"
                  style={position}
                  animate={{ 
                    y: [0, -30, 0],
                    rotate: [0, 10, -10, 0],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ 
                    duration: 4 + index,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: delay
                  }}
                >
                  <Icon className="w-8 h-8 text-[#E45C26]" />
                </motion.div>
              ))}

              {/* Glow Effect */}
              <motion.div
                className="absolute -inset-4 bg-gradient-to-r from-[#E45C26]/20 via-[#FFD700]/30 to-[#FF8C42]/20 rounded-3xl blur-3xl -z-10"
                animate={{
                  opacity: [0.5, 0.8, 0.5],
                  scale: [0.95, 1.05, 0.95]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-6 py-20 relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center text-[#2C2C2C] mb-12"
        >
          Why Choose Passkey?
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: Shield,
              title: 'Enhanced Security',
              description: 'Multi-layer biometric authentication keeps your account protected 24/7 with military-grade encryption',
              gradient: 'from-blue-500 to-blue-600',
              delay: 0.1
            },
            {
              icon: Fingerprint,
              title: 'Instant Access',
              description: 'Login in milliseconds with your fingerprint, face, or secure PIN - no typing required',
              gradient: 'from-purple-500 to-purple-600',
              delay: 0.2
            },
            {
              icon: Lock,
              title: 'Password-Free',
              description: 'Eliminate password fatigue forever. Your biometrics are the only key you need',
              gradient: 'from-orange-500 to-orange-600',
              delay: 0.3
            }
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: feature.delay }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="bg-white/80 backdrop-blur-xl p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all border border-[#FFD700]/20 relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-orange-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className={`w-14 h-14 bg-gradient-to-br ${feature.gradient} rounded-xl flex items-center justify-center mb-4 relative z-10`}>
                <feature.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-[#2C2C2C] mb-3 relative z-10">{feature.title}</h3>
              <p className="text-gray-600 relative z-10">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 mt-20">
        <div className="relative">
          {/* Animated Wave Separator with Sparkles */}
          <svg className="w-full h-24" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <motion.path
              d="M0,0 Q300,60 600,30 T1200,30 L1200,120 L0,120 Z"
              fill="url(#footerGradient)"
              animate={{
                d: [
                  "M0,0 Q300,60 600,30 T1200,30 L1200,120 L0,120 Z",
                  "M0,30 Q300,0 600,50 T1200,20 L1200,120 L0,120 Z",
                  "M0,0 Q300,60 600,30 T1200,30 L1200,120 L0,120 Z"
                ]
              }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            />
            <defs>
              <linearGradient id="footerGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#E45C26" />
                <stop offset="50%" stopColor="#FFD700" />
                <stop offset="100%" stopColor="#FF8C42" />
              </linearGradient>
            </defs>
          </svg>

          <div className="bg-gradient-to-r from-[#E45C26] via-[#FF8C42] to-[#E45C26] text-white py-12 relative overflow-hidden">
            {/* Floating Sparkles in Footer */}
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(10)].map((_, i) => (
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
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.3,
                  }}
                >
                  <span className="text-2xl">✨</span>
                </motion.div>
              ))}
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
              <div className="grid md:grid-cols-4 gap-8 mb-8">
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 bg-white rounded flex items-center justify-center">
                      <span className="text-[#E45C26] text-sm">I</span>
                    </div>
                    <span>ICICI Bank</span>
                  </div>
                  <p className="text-orange-100 text-sm">
                    Hum Hai Na — Securing Your Digital Future
                  </p>
                </div>

                <div>
                  <h4 className="mb-4">Quick Links</h4>
                  <ul className="space-y-2 text-sm text-orange-100">
                    <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                    <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                    <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                  </ul>
                </div>

                <div>
                  <h4 className="mb-4">Support</h4>
                  <ul className="space-y-2 text-sm text-orange-100">
                    <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                    <li><a href="#" className="hover:text-white transition-colors">Security Tips</a></li>
                    <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                  </ul>
                </div>

                <div>
                  <h4 className="mb-4">Follow Us</h4>
                  <div className="flex gap-3">
                    {['L', 'T', 'I'].map((social) => (
                      <motion.a
                        key={social}
                        href="#"
                        whileHover={{ scale: 1.1, y: -2 }}
                        className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors border border-[#FFD700]/30"
                      >
                        <span className="text-sm">{social}</span>
                      </motion.a>
                    ))}
                  </div>
                </div>
              </div>

              <div className="border-t border-white/20 pt-6 text-center text-sm text-orange-100">
                © 2025 ICICI Bank Ltd. All Rights Reserved.
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
