import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-industrial-200 dark:border-industrial-800 bg-industrial-50 dark:bg-industrial-900 mt-20">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          
          {/* Brand & Manifest */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold uppercase tracking-tighter">
              The <span className="text-banana-600 dark:text-banana-400">Field Guide</span>
            </h2>
            <div className="font-mono text-xs text-industrial-500 space-y-2 leading-relaxed max-w-sm">
              <p>
                <span className="text-banana-600 dark:text-banana-400 font-bold">SYSTEM NOTE:</span> This entire site was built from the inside out.
              </p>
              <p>
                Generated using <strong>Deep Context</strong> provided by The Staff (AI/Human Hybrids). 
                Accelerated by <strong>Parallel Processing</strong> and sent into <strong>Antigravity OverDrive</strong>.
              </p>
            </div>
          </div>

          {/* Links */}
          <div className="grid grid-cols-2 gap-8 text-sm font-mono uppercase tracking-widest">
             <div className="space-y-4">
                <h3 className="text-industrial-400">Bureau</h3>
                <ul className="space-y-2">
                   <li><Link href="/staff" className="hover:text-banana-600 transition-colors">The Staff</Link></li>
                   <li><Link href="/manifesto" className="hover:text-banana-600 transition-colors">Manifesto</Link></li>
                   <li><Link href="/arsenal" className="hover:text-banana-600 transition-colors">Arsenal</Link></li>
                </ul>
             </div>
             <div className="space-y-4">
                <h3 className="text-industrial-400">Protocol</h3>
                <ul className="space-y-2">
                   <li><a href="#" className="hover:text-banana-600 transition-colors cursor-not-allowed opacity-50">Vibe Check</a></li>
                   <li><a href="#" className="hover:text-banana-600 transition-colors cursor-not-allowed opacity-50">Sovereign Key</a></li>
                   <li><a href="#" className="hover:text-banana-600 transition-colors cursor-not-allowed opacity-50">Radio Silence</a></li>
                </ul>
             </div>
          </div>
        </div>

        <div className="border-t border-industrial-200 dark:border-industrial-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-mono text-industrial-400">
           <div>
              NO COPYRIGHT INTENDED. STEAL THIS CODE.
           </div>
           <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              ANTIGRAVITY ENGINE: ACTIVE
           </div>
        </div>
      </div>
    </footer>
  );
}
