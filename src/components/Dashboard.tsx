import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Home, CreditCard, DollarSign, TrendingUp, Settings, 
  Bell, User, LogOut, Smartphone, Laptop, Fingerprint,
  ScanFace, KeyRound, X, ChevronRight, ArrowUpRight, ArrowDownLeft,
  Send, Receipt, Zap, PiggyBank
} from 'lucide-react';
import { Button } from './ui/button';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Card } from './ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { GlowingBubbles, Sparkles, LightRays } from './DiwaliEffects';

type DashboardProps = {
  userName: string;
  userEmail: string;
  onNavigate: (screen: 'landing' | 'login' | 'register' | 'dashboard', name?: string, email?: string) => void;
};

type Device = {
  name: string;
  type: 'fingerprint' | 'face' | 'pin';
  icon: typeof Fingerprint;
  deviceIcon: typeof Smartphone;
  lastUsed: string;
};

export function Dashboard({ userName, userEmail, onNavigate }: DashboardProps) {
  const [showProfilePanel, setShowProfilePanel] = useState(false);
  const [activeTab, setActiveTab] = useState('home');
  const [balance, setBalance] = useState(0);
  const [devices, setDevices] = useState<Device[]>([
    {
      name: 'iPhone 15',
      type: 'fingerprint',
      icon: Fingerprint,
      deviceIcon: Smartphone,
      lastUsed: '2 mins ago'
    },
    {
      name: 'Windows Laptop',
      type: 'pin',
      icon: KeyRound,
      deviceIcon: Laptop,
      lastUsed: '1 hour ago'
    },
    {
      name: 'Pixel 8',
      type: 'face',
      icon: ScanFace,
      deviceIcon: Smartphone,
      lastUsed: 'Yesterday'
    }
  ]);

  // Animated balance counter
  useEffect(() => {
    const targetBalance = 245680;
    const duration = 2000;
    const steps = 60;
    const increment = targetBalance / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= targetBalance) {
        setBalance(targetBalance);
        clearInterval(timer);
      } else {
        setBalance(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, []);

  const handleRemoveDevice = (deviceName: string) => {
    setDevices(devices.filter(d => d.name !== deviceName));
  };

  const handleAddDevice = () => {
    onNavigate('register');
  };

  const transactions = [
    { type: 'debit', name: 'Amazon Purchase', amount: 2499, time: '10:30 AM', category: 'Shopping' },
    { type: 'credit', name: 'Salary Credit', amount: 85000, time: 'Yesterday', category: 'Income' },
    { type: 'debit', name: 'Netflix Subscription', amount: 649, time: '2 days ago', category: 'Entertainment' },
    { type: 'debit', name: 'Electricity Bill', amount: 1250, time: '3 days ago', category: 'Utilities' },
  ];

  const chartData = [
    { month: 'Jan', spending: 32000 },
    { month: 'Feb', spending: 28000 },
    { month: 'Mar', spending: 35000 },
    { month: 'Apr', spending: 31000 },
    { month: 'May', spending: 29000 },
    { month: 'Jun', spending: 32450 },
  ];

  const menuItems = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'accounts', icon: DollarSign, label: 'Accounts' },
    { id: 'cards', icon: CreditCard, label: 'Cards' },
    { id: 'investments', icon: TrendingUp, label: 'Investments' },
    { id: 'settings', icon: Settings, label: 'Settings' },
  ];

  const quickActions = [
    { icon: Send, label: 'Send Money', color: 'from-blue-500 to-blue-600' },
    { icon: Receipt, label: 'Pay Bills', color: 'from-green-500 to-green-600' },
    { icon: Zap, label: 'Recharge', color: 'from-yellow-500 to-yellow-600' },
    { icon: PiggyBank, label: 'Save Money', color: 'from-purple-500 to-purple-600' }
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-orange-50/30 to-gray-50">
        {/* Floating Geometric Shapes */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              width: `${80 + i * 30}px`,
              height: `${80 + i * 30}px`,
              left: `${10 + i * 15}%`,
              top: `${15 + i * 12}%`,
            }}
            animate={{
              y: [0, -30, 0],
              rotate: [0, 180, 360],
              opacity: [0.05, 0.1, 0.05]
            }}
            transition={{
              duration: 15 + i * 3,
              repeat: Infinity,
              ease: 'linear'
            }}
          >
            <div className="w-full h-full border-2 border-orange-300/20 rounded-xl" />
          </motion.div>
        ))}

        {/* Hexagonal Network Animation */}
        <svg className="absolute inset-0 w-full h-full opacity-5" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="hexagons" x="0" y="0" width="100" height="86.6" patternUnits="userSpaceOnUse">
              <motion.polygon
                points="50,0 100,25 100,75 50,100 0,75 0,25"
                fill="none"
                stroke="#E45C26"
                strokeWidth="1"
                animate={{ opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 4, repeat: Infinity }}
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hexagons)" />
        </svg>

        {/* Diwali Effects */}
        <GlowingBubbles />
        <Sparkles />
        <LightRays />
      </div>

      {/* Top Navbar */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="bg-white/90 backdrop-blur-xl border-b border-gray-200 sticky top-0 z-40 shadow-sm relative"
      >
        <div className="max-w-[1600px] mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-[#E45C26] to-[#FF8C42] rounded-lg flex items-center justify-center">
              <span className="text-white">I</span>
            </div>
            <div>
              <span className="text-[#2C2C2C]">ICICI Bank</span>
              <p className="text-xs text-gray-500">Secure Dashboard</p>
            </div>
          </div>

          {/* Search Bar (Center) */}
          <div className="hidden md:block flex-1 max-w-md mx-8">
            <input
              type="text"
              placeholder="Search transactions, accounts..."
              className="w-full px-4 py-2 rounded-full bg-gray-100 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#E45C26]/20 text-sm"
            />
          </div>

          <div className="flex items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="relative p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <Bell className="w-5 h-5 text-gray-600" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-[#E45C26] rounded-full" />
            </motion.button>

            <motion.button
              onClick={() => setShowProfilePanel(true)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <Avatar>
                <AvatarFallback className="bg-gradient-to-br from-[#E45C26] to-[#FF8C42] text-white">
                  {userName[0].toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <span className="text-sm text-[#2C2C2C] hidden md:block">{userName}</span>
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Main Content */}
      <div className="max-w-[1600px] mx-auto px-6 py-8 relative z-10">
        <div className="grid grid-cols-12 gap-6">
          {/* Left Sidebar */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="col-span-12 lg:col-span-2"
          >
            <Card className="p-4 bg-white/90 backdrop-blur-sm sticky top-24">
              <nav className="space-y-2">
                {menuItems.map((item, index) => (
                  <motion.button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ x: 5 }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                      activeTab === item.id
                        ? 'bg-gradient-to-r from-[#E45C26] to-[#FF8C42] text-white shadow-lg'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <item.icon className="w-5 h-5" />
                    <span className="text-sm">{item.label}</span>
                  </motion.button>
                ))}
              </nav>
            </Card>
          </motion.div>

          {/* Center Dashboard Area */}
          <div className="col-span-12 lg:col-span-7 space-y-6">
            {/* Welcome Banner */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="bg-gradient-to-r from-[#E45C26] via-[#FF8C42] to-[#FFD700] text-white p-8 relative overflow-hidden border-2 border-[#FFD700]/30">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
                <div className="absolute inset-0 pointer-events-none">
                  {[...Array(5)].map((_, i) => (
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
                        delay: i * 0.4,
                      }}
                    >
                      <span className="text-2xl">✨</span>
                    </motion.div>
                  ))}
                </div>
                <div className="relative z-10">
                  <h2 className="mb-2">Welcome back, {userName}! 👋</h2>
                  <p className="text-orange-100 mb-1">Your account is secured with Passkey authentication</p>
                  {userEmail && <p className="text-sm text-white/80">Logged in as: <span className="text-[#FFD700]">{userEmail}</span></p>}
                </div>
              </Card>
            </motion.div>

            {/* Account Balance Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="bg-gradient-to-br from-blue-600 to-blue-700 text-white p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 opacity-10">
                  <DollarSign className="w-48 h-48" />
                </div>
                <div className="relative z-10">
                  <p className="text-blue-100 mb-2">Total Balance</p>
                  <motion.h1
                    className="mb-4"
                    key={balance}
                  >
                    ₹{balance.toLocaleString()}
                  </motion.h1>
                  <div className="flex items-center gap-2 text-blue-100">
                    <TrendingUp className="w-4 h-4" />
                    <span className="text-sm">+12.5% from last month</span>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Stats Cards */}
            <div className="grid md:grid-cols-2 gap-6">
              {[
                { title: 'This Month', amount: '₹85,000', change: '+8.2%', color: 'from-green-500 to-green-600', icon: TrendingUp },
                { title: 'Expenses', amount: '₹32,450', change: '-5.3%', color: 'from-purple-500 to-purple-600', icon: Receipt },
              ].map((card, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                >
                  <Card className={`bg-gradient-to-br ${card.color} text-white p-6 relative overflow-hidden`}>
                    <div className="absolute top-0 right-0 opacity-10">
                      <card.icon className="w-32 h-32" />
                    </div>
                    <div className="relative z-10">
                      <p className="text-sm text-white/80 mb-2">{card.title}</p>
                      <h3 className="mb-2">{card.amount}</h3>
                      <p className="text-sm text-white/90">{card.change} from last month</p>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Spending Trends Chart */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <Card className="p-6 bg-white/90 backdrop-blur-sm">
                <h3 className="text-[#2C2C2C] mb-6">Spending Trends</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="month" stroke="#666" />
                    <YAxis stroke="#666" />
                    <Tooltip
                      contentStyle={{
                        background: 'rgba(255, 255, 255, 0.9)',
                        border: 'none',
                        borderRadius: '8px',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="spending"
                      stroke="#E45C26"
                      strokeWidth={3}
                      dot={{ fill: '#E45C26', r: 5 }}
                      activeDot={{ r: 7 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </Card>
            </motion.div>

            {/* Recent Transactions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <Card className="p-6 bg-white/90 backdrop-blur-sm">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-[#2C2C2C]">Recent Transactions</h3>
                  <button className="text-sm text-[#E45C26] hover:underline">View All</button>
                </div>
                <div className="space-y-4">
                  {transactions.map((transaction, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.8 + index * 0.05 }}
                      whileHover={{ x: 5, backgroundColor: '#FFF7ED' }}
                      className="flex items-center justify-between p-4 rounded-xl transition-all cursor-pointer"
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                          transaction.type === 'debit' 
                            ? 'bg-red-100' 
                            : 'bg-green-100'
                        }`}>
                          {transaction.type === 'debit' ? (
                            <ArrowUpRight className="w-6 h-6 text-red-600" />
                          ) : (
                            <ArrowDownLeft className="w-6 h-6 text-green-600" />
                          )}
                        </div>
                        <div>
                          <p className="text-sm text-[#2C2C2C]">{transaction.name}</p>
                          <p className="text-xs text-gray-500">{transaction.time} • {transaction.category}</p>
                        </div>
                      </div>
                      <span className={`${
                        transaction.type === 'debit' ? 'text-red-600' : 'text-green-600'
                      }`}>
                        {transaction.type === 'debit' ? '-' : '+'}₹{transaction.amount.toLocaleString()}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </Card>
            </motion.div>
          </div>

          {/* Right Panel */}
          <div className="col-span-12 lg:col-span-3 space-y-6">
            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Card className="p-6 bg-white/90 backdrop-blur-sm">
                <h3 className="text-[#2C2C2C] mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  {quickActions.map((action, index) => (
                    <motion.button
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 + index * 0.05 }}
                      whileHover={{ x: 5, scale: 1.02 }}
                      className="w-full flex items-center gap-3 p-4 rounded-xl bg-gradient-to-br from-gray-50 to-white hover:shadow-lg transition-all border border-gray-100"
                    >
                      <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${action.color} flex items-center justify-center`}>
                        <action.icon className="w-5 h-5 text-white" />
                      </div>
                      <span className="text-sm text-gray-700">{action.label}</span>
                      <ChevronRight className="w-4 h-4 text-gray-400 ml-auto" />
                    </motion.button>
                  ))}
                </div>
              </Card>
            </motion.div>

            {/* Profile Overview */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
            >
              <Card className="p-6 bg-white/90 backdrop-blur-sm">
                <h3 className="text-[#2C2C2C] mb-4">Profile</h3>
                <div className="flex items-center gap-3 mb-4 p-4 bg-gradient-to-r from-orange-50 to-orange-100/50 rounded-xl">
                  <Avatar className="w-12 h-12">
                    <AvatarFallback className="bg-gradient-to-br from-[#E45C26] to-[#FF8C42] text-white">
                      {userName[0].toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm text-[#2C2C2C]">{userName}</p>
                    <p className="text-xs text-gray-500">Last login: 2 mins ago</p>
                  </div>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Account Type:</span>
                    <span className="text-[#2C2C2C]">Premium</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Passkey Method:</span>
                    <span className="text-[#2C2C2C]">Fingerprint</span>
                  </div>
                </div>
                <Button
                  onClick={() => setShowProfilePanel(true)}
                  variant="outline"
                  className="w-full mt-4 border-[#E45C26] text-[#E45C26] hover:bg-orange-50"
                >
                  Manage Devices
                </Button>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 mt-20 bg-gradient-to-r from-[#E45C26] to-[#FF8C42] text-white py-8">
        <div className="max-w-[1600px] mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-white rounded flex items-center justify-center">
                <span className="text-[#E45C26] text-sm">I</span>
              </div>
              <span className="text-sm">Hum Hai Na — Securing Your Digital Future</span>
            </div>
            <div className="flex gap-6 text-sm text-orange-100">
              <a href="#" className="hover:text-white transition-colors">Support</a>
              <a href="#" className="hover:text-white transition-colors">Contact</a>
              <a href="#" className="hover:text-white transition-colors">Privacy</a>
              <a href="#" className="hover:text-white transition-colors">Terms</a>
            </div>
            <div className="text-sm text-orange-100">
              © 2025 ICICI Bank Ltd. All Rights Reserved.
            </div>
          </div>
        </div>
      </footer>

      {/* Profile Panel (Sliding from right) */}
      <AnimatePresence>
        {showProfilePanel && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
              onClick={() => setShowProfilePanel(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25 }}
              className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-50 overflow-y-auto"
            >
              <div className="p-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-[#2C2C2C]">Profile & Devices</h2>
                  <motion.button
                    onClick={() => setShowProfilePanel(false)}
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-2 hover:bg-gray-100 rounded-full"
                  >
                    <X className="w-5 h-5" />
                  </motion.button>
                </div>

                {/* User Info */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col gap-4 p-6 bg-gradient-to-r from-[#E45C26] via-[#FF8C42] to-[#FFD700] rounded-2xl mb-8 text-white border-2 border-[#FFD700]/30 relative overflow-hidden"
                >
                  <div className="absolute inset-0 pointer-events-none">
                    {[...Array(3)].map((_, i) => (
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
                          delay: i * 0.6,
                        }}
                      >
                        <span className="text-xl">✨</span>
                      </motion.div>
                    ))}
                  </div>
                  <div className="flex items-center gap-4 relative z-10">
                    <Avatar className="w-16 h-16">
                      <AvatarFallback className="bg-white text-[#E45C26] text-2xl">
                        {userName[0].toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h3 className="mb-1">{userName}</h3>
                      <p className="text-sm text-orange-100">Passkey Enabled ✓</p>
                      {userEmail && <p className="text-xs text-white/80 mt-1">{userEmail}</p>}
                    </div>
                  </div>
                </motion.div>

                {/* Devices Section */}
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-[#2C2C2C]">Registered Devices</h3>
                    <Button 
                      onClick={handleAddDevice}
                      variant="outline" 
                      className="text-sm h-8 text-[#E45C26] border-[#E45C26] hover:bg-orange-50"
                    >
                      + Add Device
                    </Button>
                  </div>

                  <AnimatePresence>
                    <div className="space-y-3">
                      {devices.map((device, index) => (
                        <motion.div
                          key={device.name}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 100, height: 0 }}
                          transition={{ delay: index * 0.1 }}
                          whileHover={{ scale: 1.02, x: 5 }}
                          className="p-4 border border-gray-200 rounded-xl hover:border-[#E45C26] transition-all bg-gradient-to-br from-white to-orange-50/30"
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex items-start gap-3 flex-1">
                              <div className="w-10 h-10 bg-gradient-to-br from-orange-100 to-orange-200 rounded-lg flex items-center justify-center">
                                <device.deviceIcon className="w-5 h-5 text-[#E45C26]" />
                              </div>
                              <div className="flex-1">
                                <p className="text-sm text-[#2C2C2C] mb-1">{device.name}</p>
                                <div className="flex items-center gap-2 text-xs text-gray-500">
                                  <device.icon className="w-3 h-3" />
                                  <span className="capitalize">{device.type}</span>
                                  <span>•</span>
                                  <span>{device.lastUsed}</span>
                                </div>
                              </div>
                            </div>
                            <motion.button
                              onClick={() => handleRemoveDevice(device.name)}
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              className="text-red-500 hover:text-red-600 text-xs"
                            >
                              Remove
                          </motion.button>
                        </div>
                      </motion.div>
                    ))}
                    </div>
                  </AnimatePresence>
                </div>

                {/* Logout Button */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <Button
                    onClick={() => onNavigate('landing')}
                    variant="outline"
                    className="w-full h-12 border-red-300 text-red-600 hover:bg-red-50 hover:border-red-400"
                  >
                    <LogOut className="w-5 h-5 mr-2" />
                    Logout
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
