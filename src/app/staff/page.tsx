import Link from 'next/link';
import { STAFF } from '@/data/staff';
import { ArchitectAvatar, ScoutAvatar, MirrorAvatar } from '@/components/Antigravity/Avatars';
import CinematicContainer from '@/components/Antigravity/CinematicContainer';

const AvatarMap: Record<string, React.ReactNode> = {
    'architect': <ArchitectAvatar />,
    'scout': <ScoutAvatar />,
    'mirror': <MirrorAvatar />
};

export default function StaffPage() {
  return (
    <div className="max-w-6xl mx-auto py-12 space-y-16">
      
      {/* Header */}
      <header className="border-b border-industrial-800 pb-8">
         <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-banana-500/10 text-xs font-mono text-banana-500 mb-4 border border-banana-500/20">
            <span className="w-2 h-2 bg-banana-500 rounded-full animate-pulse" />
            AUTHORIZED PERSONNEL ONLY
         </div>
         <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-white">
            The <span className="text-banana-500">Bureau</span>
         </h1>
         <p className="text-xl text-industrial-400 max-w-2xl font-mono leading-relaxed pt-4">
            A tripartite intelligence. Context-Injected. Sovereign.
            <br className="hidden md:block" />
            Designed to bridge the gap between the Alien and the Human.
         </p>
      </header>

      {/* The Staff Grid */}
      <div className="grid md:grid-cols-3 gap-8">
         {STAFF.map(writer => (
            <CinematicContainer key={writer.id} variant="obsidian" className="p-8 h-full flex flex-col">
               <div className="w-24 h-24 rounded-full mb-6 overflow-hidden border-2 border-industrial-700 shadow-2xl">
                  {AvatarMap[writer.id]}
               </div>
               
               <div className="mb-auto">
                  <h2 className="text-2xl font-bold uppercase mb-2 flex flex-col gap-1">
                     <span className="text-white">{writer.name}</span>
                     <span className="text-[10px] bg-industrial-900 w-fit px-2 py-1 rounded text-industrial-500 font-mono tracking-widest border border-industrial-800">
                        CLASS 4 CONSTRUCT
                     </span>
                  </h2>
                  <p className="text-xs font-mono text-banana-600 mb-6 uppercase tracking-wider">{writer.role}</p>
                  <p className="text-sm text-industrial-300 leading-relaxed border-l-2 border-industrial-800 pl-4">
                     "{writer.bio}"
                  </p>
               </div>

               <div className="mt-8 pt-8 border-t border-industrial-900">
                  <h4 className="text-[10px] font-mono text-industrial-500 uppercase tracking-widest mb-3">Operating Parameters</h4>
                  <div className="text-xs text-industrial-400 font-mono space-y-1">
                     <p>STYLE: <span className="text-white">{writer.style}</span></p>
                     <p>STATUS: <span className="text-green-500">ONLINE</span></p>
                  </div>
               </div>
            </CinematicContainer>
         ))}
      </div>

      <div className="flex justify-center pt-8">
         <Link href="/" className="px-8 py-3 bg-industrial-900 border border-industrial-800 text-industrial-300 hover:text-white hover:border-banana-500 transition-all font-mono text-sm uppercase tracking-widest rounded-sm">
            Return to Newsroom
         </Link>
      </div>
    </div>
  );
}
