import React from 'react';

interface CinematicContainerProps {
  children: React.ReactNode;
  variant?: 'holo' | 'obsidian' | 'voltage';
  className?: string;
}

export default function CinematicContainer({ children, variant = 'holo', className = '' }: CinematicContainerProps) {
  const baseStyles = "relative overflow-hidden transition-all duration-700 group isolate";
  
  const variants = {
    holo: "bg-industrial-900/60 backdrop-blur-xl border border-white/10 shadow-2xl hover:shadow-[0_0_50px_rgba(255,255,255,0.05)]",
    obsidian: "bg-black border border-industrial-800 shadow-[inset_0_0_100px_rgba(0,0,0,1)] hover:border-industrial-600",
    voltage: "bg-industrial-950/80 backdrop-blur-md border-l-[6px] border-banana-500 shadow-[0_0_30px_rgba(234,179,8,0.1)] hover:shadow-[0_0_50px_rgba(234,179,8,0.2)]"
  };

  return (
    <div className={`${baseStyles} ${variants[variant]} ${className}`}>
      {/* Cinematic Glitch / Shine (Global) */}
      <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-1000 mix-blend-overlay">
         <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-45 translate-x-[-150%] group-hover:animate-shine-slow" />
      </div>

      {/* Voltage Arcs (Voltage Variant) */}
      {variant === 'voltage' && (
         <div className="absolute top-0 left-0 w-[2px] h-full bg-banana-400 opacity-50 shadow-[0_0_15px_#EAB308]" />
      )}

      {/* Obsidian Depth (Obsidian Variant) */}
      {variant === 'obsidian' && (
         <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />
      )}

      {/* Noise Texture Overlay */}
      <div className="absolute inset-0 opacity-[0.03] bg-noise pointer-events-none" />

      <div className="relative z-10 w-full h-full">
         {children}
      </div>
    </div>
  );
}
