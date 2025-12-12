'use client';

export default function HeroAnimation() {
  return (
    <div className="relative w-full h-[60vh] min-h-[400px] flex items-center justify-center overflow-hidden bg-black">
      {/* Ambient glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(234,179,8,0.15)_0%,_transparent_70%)]" />
      
      {/* The Cube - CSS 3D */}
      <div 
        className="relative w-[200px] h-[200px] md:w-[280px] md:h-[280px]"
        style={{ perspective: '1000px' }}
      >
        <div 
          className="w-full h-full relative animate-spin-slow"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Cube faces */}
          <div className="absolute inset-0 border-2 border-banana-500/30 bg-black/80 shadow-[inset_0_0_60px_rgba(234,179,8,0.1)]" style={{ transform: 'translateZ(100px)' }} />
          <div className="absolute inset-0 border-2 border-banana-500/30 bg-black/80 shadow-[inset_0_0_60px_rgba(234,179,8,0.1)]" style={{ transform: 'rotateY(180deg) translateZ(100px)' }} />
          <div className="absolute inset-0 border-2 border-banana-500/30 bg-black/80 shadow-[inset_0_0_60px_rgba(234,179,8,0.1)]" style={{ transform: 'rotateY(90deg) translateZ(100px)' }} />
          <div className="absolute inset-0 border-2 border-banana-500/30 bg-black/80 shadow-[inset_0_0_60px_rgba(234,179,8,0.1)]" style={{ transform: 'rotateY(-90deg) translateZ(100px)' }} />
          <div className="absolute inset-0 border-2 border-banana-500/30 bg-black/80 shadow-[inset_0_0_60px_rgba(234,179,8,0.1)]" style={{ transform: 'rotateX(90deg) translateZ(100px)' }} />
          <div className="absolute inset-0 border-2 border-banana-500/30 bg-black/80 shadow-[inset_0_0_60px_rgba(234,179,8,0.1)]" style={{ transform: 'rotateX(-90deg) translateZ(100px)' }} />
        </div>
      </div>

      {/* Glow ring */}
      <div className="absolute w-[400px] h-[400px] rounded-full border border-banana-500/10 animate-pulse" />
    </div>
  );
}
