
import React from 'react';

interface GenPlaceholderProps {
  label?: string;
  className?: string;
  seed?: number;
}

export default function GenPlaceholder({ label = "IMG_GENERATION_PENDING", className = "", seed = 1 }: GenPlaceholderProps) {
  // Simulate a low-res distinctive look based on seed
  const hue = (seed * 137) % 360;
  
  return (
    <div className={`relative overflow-hidden bg-industrial-900 flex items-center justify-center ${className}`}>
      {/* Abstract Digital Noise / Low Res Gradient */}
      <div 
        className="absolute inset-0 opacity-30" 
        style={{
          backgroundImage: `linear-gradient(${hue}deg, #1a1a1a 0%, #333 100%)`,
        }}
      />
      
      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:20px_20px] opacity-20" />
      
      {/* "GPT-2.5" Style Placeholder Text */}
      <div className="relative z-10 text-center p-4 border border-industrial-700 bg-black/50 backdrop-blur-sm rounded-sm">
        <div className="w-8 h-8 mx-auto mb-2 border-2 border-dashed border-industrial-500 rounded-full animate-spin-slow" />
        <p className="font-mono text-[10px] uppercase tracking-widest text-industrial-400">
          {label}
        </p>
        <p className="font-mono text-[8px] text-industrial-600 mt-1">
          MODEL: GPT-2.5_LATENT
        </p>
      </div>

      {/* Technical Corners */}
      <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-industrial-500" />
      <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-industrial-500" />
    </div>
  );
}
