'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter, usePathname } from 'next/navigation';
import { 
  Home, BookOpen, BarChart3, User, Menu, X,
  Target, TrendingUp, Award, Settings
} from 'lucide-react';

interface MobileNavigationProps {
  className?: string;
}

export function MobileNavigation({ className = '' }: MobileNavigationProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Auto-hide navigation on scroll
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false); // Hide on scroll down
      } else {
        setIsVisible(true); // Show on scroll up
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const navigationItems = [
    {
      name: 'Dashboard',
      icon: Home,
      path: '/student/dashboard',
      color: 'from-blue-400 to-cyan-500'
    },
    {
      name: 'Dersler',
      icon: BookOpen,
      path: '/lessons',
      color: 'from-green-400 to-emerald-500'
    },
    {
      name: 'Quiz',
      icon: Target,
      path: '/quiz',
      color: 'from-purple-400 to-indigo-500'
    },
    {
      name: 'Analytics',
      icon: BarChart3,
      path: '/analytics',
      color: 'from-orange-400 to-red-500'
    },
    {
      name: 'Profil',
      icon: User,
      path: '/profile',
      color: 'from-pink-400 to-violet-500'
    }
  ];

  const handleNavigation = (path: string) => {
    setIsOpen(false);
    router.push(path);
  };

  const isActive = (path: string) => {
    return pathname === path;
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0.8 }}
        transition={{ duration: 0.3 }}
        onClick={() => setIsOpen(true)}
        className={`fixed top-4 right-4 z-50 w-12 h-12 bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 flex items-center justify-center hover:bg-white/20 transition-all duration-300 ${className}`}
      >
        <Menu className="w-6 h-6 text-white" />
      </motion.button>

      {/* Mobile Navigation Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="absolute right-0 top-0 h-full w-80 bg-white/10 backdrop-blur-lg border-l border-white/20"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-white/10">
                <h2 className="text-xl font-bold text-white">Menü</h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-all duration-300"
                >
                  <X className="w-5 h-5 text-white" />
                </button>
              </div>

              {/* Navigation Items */}
              <div className="p-4 space-y-2">
                {navigationItems.map((item) => {
                  const Icon = item.icon;
                  const active = isActive(item.path);
                  
                  return (
                    <motion.button
                      key={item.path}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleNavigation(item.path)}
                      className={`w-full flex items-center space-x-4 p-4 rounded-2xl transition-all duration-300 ${
                        active
                          ? 'bg-gradient-to-r ' + item.color + ' text-white shadow-lg'
                          : 'bg-white/5 text-gray-300 hover:bg-white/10'
                      }`}
                    >
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                        active ? 'bg-white/20' : 'bg-white/10'
                      }`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="font-medium">{item.name}</span>
                    </motion.button>
                  );
                })}
              </div>

              {/* Quick Actions */}
              <div className="p-4 border-t border-white/10">
                <h3 className="text-white font-semibold mb-3">Hızlı İşlemler</h3>
                <div className="space-y-2">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full flex items-center space-x-3 p-3 bg-white/5 rounded-xl text-gray-300 hover:bg-white/10 transition-all duration-300"
                  >
                    <TrendingUp className="w-5 h-5" />
                    <span className="text-sm">İlerleme Raporu</span>
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full flex items-center space-x-3 p-3 bg-white/5 rounded-xl text-gray-300 hover:bg-white/10 transition-all duration-300"
                  >
                    <Award className="w-5 h-5" />
                    <span className="text-sm">Rozetlerim</span>
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full flex items-center space-x-3 p-3 bg-white/5 rounded-xl text-gray-300 hover:bg-white/10 transition-all duration-300"
                  >
                    <Settings className="w-5 h-5" />
                    <span className="text-sm">Ayarlar</span>
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom Navigation Bar (Alternative) */}
      <motion.div
        initial={{ y: 100 }}
        animate={{ y: isVisible ? 0 : 100 }}
        transition={{ duration: 0.3 }}
        className="fixed bottom-0 left-0 right-0 z-40 md:hidden"
      >
        <div className="bg-white/10 backdrop-blur-lg border-t border-white/20">
          <div className="flex justify-around p-2">
            {navigationItems.slice(0, 4).map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);
              
              return (
                <motion.button
                  key={item.path}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleNavigation(item.path)}
                  className={`flex flex-col items-center space-y-1 p-2 rounded-xl transition-all duration-300 ${
                    active
                      ? 'bg-gradient-to-r ' + item.color + ' text-white'
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-xs font-medium">{item.name}</span>
                </motion.button>
              );
            })}
          </div>
        </div>
      </motion.div>
    </>
  );
} 