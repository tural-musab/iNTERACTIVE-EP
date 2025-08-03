'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface MobileOptimizationsProps {
  children: React.ReactNode;
  className?: string;
}

// Hook for mobile detection
export function useMobileDetection() {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [screenSize, setScreenSize] = useState({
    width: 0,
    height: 0
  });

  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      setScreenSize({ width, height });
      setIsMobile(width < 768);
      setIsTablet(width >= 768 && width < 1024);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  return { isMobile, isTablet, screenSize };
}

// Hook for viewport optimization
export function useViewportOptimization() {
  const [viewport, setViewport] = useState({
    width: 0,
    height: 0,
    orientation: 'portrait' as 'portrait' | 'landscape'
  });

  useEffect(() => {
    const updateViewport = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const orientation = width > height ? 'landscape' : 'portrait';
      
      setViewport({ width, height, orientation });
    };

    updateViewport();
    window.addEventListener('resize', updateViewport);
    window.addEventListener('orientationchange', updateViewport);
    
    return () => {
      window.removeEventListener('resize', updateViewport);
      window.removeEventListener('orientationchange', updateViewport);
    };
  }, []);

  return viewport;
}

// Mobile optimized container
export function MobileContainer({ children, className = '' }: MobileOptimizationsProps) {
  const { isMobile } = useMobileDetection();

  return (
    <div className={`${isMobile ? 'px-4' : 'px-6'} ${className}`}>
      {children}
    </div>
  );
}

// Mobile optimized grid
interface MobileGridProps {
  children: React.ReactNode;
  cols?: {
    mobile?: number;
    tablet?: number;
    desktop?: number;
  };
  gap?: {
    mobile?: number;
    tablet?: number;
    desktop?: number;
  };
  className?: string;
}

export function MobileGrid({ 
  children, 
  cols = { mobile: 1, tablet: 2, desktop: 3 },
  gap = { mobile: 4, tablet: 6, desktop: 8 },
  className = '' 
}: MobileGridProps) {
  const gridCols = `grid-cols-${cols.mobile} md:grid-cols-${cols.tablet} lg:grid-cols-${cols.desktop}`;
  const gridGap = `gap-${gap.mobile} md:gap-${gap.tablet} lg:gap-${gap.desktop}`;

  return (
    <div className={`grid ${gridCols} ${gridGap} ${className}`}>
      {children}
    </div>
  );
}

// Mobile optimized card
interface MobileCardProps {
  children: React.ReactNode;
  className?: string;
  padding?: 'sm' | 'md' | 'lg';
  shadow?: boolean;
}

export function MobileCard({ 
  children, 
  className = '', 
  padding = 'md',
  shadow = true 
}: MobileCardProps) {
  const paddingClasses = {
    sm: 'p-3 md:p-4',
    md: 'p-4 md:p-6',
    lg: 'p-6 md:p-8'
  };

  const shadowClass = shadow ? 'shadow-lg' : '';

  return (
    <div className={`bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 ${paddingClasses[padding]} ${shadowClass} ${className}`}>
      {children}
    </div>
  );
}

// Mobile optimized button
interface MobileButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  disabled?: boolean;
}

export function MobileButton({ 
  children, 
  onClick, 
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false 
}: MobileButtonProps) {
  const baseClasses = 'font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const variantClasses = {
    primary: 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:from-blue-600 hover:to-cyan-600 focus:ring-blue-500',
    secondary: 'bg-gradient-to-r from-purple-500 to-indigo-500 text-white hover:from-purple-600 hover:to-indigo-600 focus:ring-purple-500',
    outline: 'bg-white/10 border border-white/20 text-white hover:bg-white/20 focus:ring-white/50'
  };

  const sizeClasses = {
    sm: 'px-3 py-2 text-sm rounded-lg',
    md: 'px-4 py-3 text-base rounded-xl',
    lg: 'px-6 py-4 text-lg rounded-2xl'
  };

  const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105 active:scale-95';

  return (
    <motion.button
      whileHover={!disabled ? { scale: 1.02 } : {}}
      whileTap={!disabled ? { scale: 0.98 } : {}}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${disabledClasses} ${className}`}
    >
      {children}
    </motion.button>
  );
}

// Mobile optimized text
interface MobileTextProps {
  children: React.ReactNode;
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'body' | 'caption';
  className?: string;
}

export function MobileText({ 
  children, 
  variant = 'body',
  className = '' 
}: MobileTextProps) {
  const variantClasses = {
    h1: 'text-2xl md:text-3xl lg:text-4xl font-bold',
    h2: 'text-xl md:text-2xl lg:text-3xl font-bold',
    h3: 'text-lg md:text-xl lg:text-2xl font-semibold',
    h4: 'text-base md:text-lg lg:text-xl font-medium',
    body: 'text-sm md:text-base',
    caption: 'text-xs md:text-sm text-gray-300'
  };

  return (
    <div className={`${variantClasses[variant]} ${className}`}>
      {children}
    </div>
  );
}

// Mobile optimized spacing
interface MobileSpacingProps {
  children: React.ReactNode;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export function MobileSpacing({ 
  children, 
  size = 'md',
  className = '' 
}: MobileSpacingProps) {
  const spacingClasses = {
    xs: 'space-y-2 md:space-y-3',
    sm: 'space-y-3 md:space-y-4',
    md: 'space-y-4 md:space-y-6',
    lg: 'space-y-6 md:space-y-8',
    xl: 'space-y-8 md:space-y-12'
  };

  return (
    <div className={`${spacingClasses[size]} ${className}`}>
      {children}
    </div>
  );
}

// Mobile optimized loading skeleton
interface MobileSkeletonProps {
  variant?: 'card' | 'text' | 'button' | 'avatar';
  className?: string;
}

export function MobileSkeleton({ 
  variant = 'card',
  className = '' 
}: MobileSkeletonProps) {
  const variantClasses = {
    card: 'h-32 md:h-40 bg-white/10 rounded-2xl animate-pulse',
    text: 'h-4 md:h-5 bg-white/10 rounded animate-pulse',
    button: 'h-10 md:h-12 bg-white/10 rounded-xl animate-pulse',
    avatar: 'w-10 h-10 md:w-12 md:h-12 bg-white/10 rounded-full animate-pulse'
  };

  return (
    <div className={`${variantClasses[variant]} ${className}`} />
  );
}

// Mobile optimized modal
interface MobileModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  className?: string;
}

export function MobileModal({ 
  isOpen, 
  onClose, 
  children, 
  title,
  className = '' 
}: MobileModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-11/12 max-w-md bg-white/10 backdrop-blur-lg rounded-3xl border border-white/20 ${className}`}
            onClick={(e) => e.stopPropagation()}
          >
            {title && (
              <div className="p-6 border-b border-white/10">
                <h2 className="text-xl font-bold text-white">{title}</h2>
              </div>
            )}
            <div className="p-6">
              {children}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Mobile optimized list
interface MobileListProps {
  items: Array<{
    id: string;
    title: string;
    subtitle?: string;
    icon?: React.ReactNode;
    onClick?: () => void;
  }>;
  className?: string;
}

export function MobileList({ items, className = '' }: MobileListProps) {
  return (
    <div className={`space-y-2 ${className}`}>
      {items.map((item) => (
        <motion.div
          key={item.id}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={item.onClick}
          className="p-4 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300 cursor-pointer"
        >
          <div className="flex items-center space-x-3">
            {item.icon && (
              <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
                {item.icon}
              </div>
            )}
            <div className="flex-1">
              <h3 className="text-white font-medium">{item.title}</h3>
              {item.subtitle && (
                <p className="text-gray-300 text-sm">{item.subtitle}</p>
              )}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
} 