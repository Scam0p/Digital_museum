import { useState } from 'react';
import { IntroScreen } from './components/screens/IntroScreen';
import { AuthScreen } from './components/screens/AuthScreen';
import { LoadingScreen } from './components/screens/LoadingScreen';
import { MainLayout } from './components/MainLayout';
import { databaseService } from './lib/databaseService';
import { AnimatePresence, motion } from 'framer-motion';

type ScreenState = 'intro' | 'auth' | 'loading' | 'main';

function App() {
  const [screen, setScreen] = useState<ScreenState>('intro');

  const handleIntroProceed = () => {
    setScreen('auth');
  };

  const handleAuthSuccess = () => {
    setScreen('loading');
  };

  const handleLoadingComplete = () => {
    // Go directly to Main Hero Section layout
    setScreen('main');
  };

  const handleLogout = async () => {
    await databaseService.signOut();
    setScreen('auth');
  };

  return (
    <div className="min-h-screen bg-black text-zinc-100 select-none">
      <AnimatePresence mode="wait">
        {screen === 'intro' && (
          <motion.div
            key="intro"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full min-h-screen"
          >
            <IntroScreen onProceed={handleIntroProceed} />
          </motion.div>
        )}

        {screen === 'auth' && (
          <motion.div
            key="auth"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full min-h-screen"
          >
            <AuthScreen onAuthSuccess={handleAuthSuccess} />
          </motion.div>
        )}

        {screen === 'loading' && (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full min-h-screen"
          >
            <LoadingScreen onComplete={handleLoadingComplete} />
          </motion.div>
        )}

        {screen === 'main' && (
          <motion.div
            key="main"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="w-full min-h-screen"
          >
            <MainLayout onSignOut={handleLogout} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
