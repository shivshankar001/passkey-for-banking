import { useState } from 'react';
import { LandingPage } from './components/LandingPage';
import { LoginPage } from './components/LoginPage';
import { RegisterPage } from './components/RegisterPage';
import { Dashboard } from './components/Dashboard';

type Screen = 'landing' | 'login' | 'register' | 'dashboard';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('landing');
  const [userName, setUserName] = useState('User');
  const [userEmail, setUserEmail] = useState('');

  const navigateTo = (screen: Screen, name?: string, email?: string) => {
    if (name) setUserName(name);
    if (email) setUserEmail(email);
    setCurrentScreen(screen);
  };

  return (
    <div className="min-h-screen">
      {currentScreen === 'landing' && <LandingPage onNavigate={navigateTo} />}
      {currentScreen === 'login' && <LoginPage onNavigate={navigateTo} />}
      {currentScreen === 'register' && <RegisterPage onNavigate={navigateTo} />}
      {currentScreen === 'dashboard' && <Dashboard userName={userName} userEmail={userEmail} onNavigate={navigateTo} />}
    </div>
  );
}
