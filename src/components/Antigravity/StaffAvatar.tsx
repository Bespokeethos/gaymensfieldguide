
import React from 'react';

interface StaffAvatarProps {
  id: string;
  initial: string;
  role: 'architect' | 'scout' | 'mirror';
}

export default function StaffAvatar({ id, initial, role }: StaffAvatarProps) {
  
  // Unique color/geo logic per role
  const getStyles = () => {
    switch (role) {
      case 'architect':
        return {
          bg: 'bg-industrial-900',
          accent: 'text-white',
          border: 'border-white/20',
          icon: (
            <svg viewBox="0 0 24 24" className="w-12 h-12 stroke-[0.5] stroke-white fill-none opacity-50 absolute">
              <rect x="2" y="2" width="20" height="20" />
              <line x1="2" y1="2" x2="22" y2="22" />
              <line x1="22" y1="2" x2="2" y2="22" />
            </svg>
          )
        };
      case 'scout':
        return {
          bg: 'bg-banana-500',
          accent: 'text-black',
          border: 'border-black/10',
          icon: (
            <svg viewBox="0 0 24 24" className="w-12 h-12 stroke-[0.5] stroke-black fill-none opacity-30 absolute animate-pulse-slow">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="2" x2="12" y2="22" />
              <line x1="2" y1="12" x2="22" y2="12" />
            </svg>
          )
        };
      case 'mirror':
        return {
          bg: 'bg-industrial-200 dark:bg-industrial-800',
          accent: 'text-industrial-900 dark:text-white',
          border: 'border-industrial-400/30',
          icon: (
             <svg viewBox="0 0 24 24" className="w-12 h-12 stroke-[0.5] stroke-current fill-none opacity-20 absolute">
               <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
             </svg>
          )
        };
      default:
        return { bg: 'bg-gray-500', accent: 'text-white', border: '', icon: null };
    }
  };

  const style = getStyles();

  return (
    <div className={`relative w-20 h-20 ${style.bg} ${style.border} border-2 rounded-sm flex items-center justify-center overflow-hidden mb-6 transition-all group-hover:scale-105 duration-500`}>
      {/* Background Tech */}
      {style.icon}
      
      {/* Noise Granularity */}
      <div className="absolute inset-0 bg-noise opacity-20 mix-blend-overlay" />
      
      {/* Technical Crosshairs */}
      <div className="absolute top-1 left-1 w-1 h-1 bg-current opacity-50" />
      <div className="absolute top-1 right-1 w-1 h-1 bg-current opacity-50" />
      <div className="absolute bottom-1 left-1 w-1 h-1 bg-current opacity-50" />
      <div className="absolute bottom-1 right-1 w-1 h-1 bg-current opacity-50" />

      {/* The Initial */}
      <span className={`relative z-10 font-mono text-4xl font-bold ${style.accent}`}>
        {initial}
      </span>
      
      {/* Glitch Overlay (Active on Hover) */}
      <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 pointer-events-none" />
    </div>
  );
}
