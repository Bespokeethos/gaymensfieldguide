import Link from 'next/link';
import { Suspense } from 'react';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-industrial-200 dark:border-industrial-800 bg-paper/80 dark:bg-paper-dark/80 backdrop-blur-xl">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="h-6 w-6 bg-banana rounded-sm group-hover:bg-banana-500 transition-colors" />
            <span className="font-mono font-bold text-industrial-900 dark:text-industrial-50 text-sm uppercase tracking-wider">
              GMFG <span className="text-industrial-400">/</span> FIELD GUIDE
            </span>
          </Link>
          
          <div className="hidden md:flex h-4 w-[1px] bg-industrial-300 dark:bg-industrial-700 mx-2" />
          
          <nav className="hidden md:flex items-center gap-6">
            <NavLink href="/manifesto" label="Manifesto" />
            <NavLink href="/arsenal" label="Arsenal" />
            <NavLink href="/blog" label="Transmission" />
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-industrial-500">
             <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
             <span>SYSTEM ONLINE</span>
          </div>
          <button className="bg-industrial-900 text-white dark:bg-white dark:text-black px-3 py-1.5 text-xs font-mono font-bold uppercase hover:opacity-80 transition-opacity">
            Connect
          </button>
        </div>
      </div>
    </header>
  );
}

function NavLink({ href, label }: { href: string; label: string }) {
  return (
    <Link 
      href={href} 
      className="text-xs font-mono uppercase tracking-wide text-industrial-600 dark:text-industrial-400 hover:text-banana-600 dark:hover:text-banana-300 transition-colors"
    >
      {label}
    </Link>
  );
}
