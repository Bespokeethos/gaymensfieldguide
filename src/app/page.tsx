import HeroAnimation from '@/components/HeroAnimation';
import Link from 'next/link';
import { EDITORIAL_FEED } from '@/data/editorial';
import { STAFF } from '@/data/staff';

export default function Home() {
  const featured = EDITORIAL_FEED[0];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero */}
      <section className="relative">
        <HeroAnimation />
        
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 pointer-events-none">
          <h1 className="text-4xl md:text-7xl font-bold tracking-tight mb-6 max-w-4xl leading-[0.9]">
            What if the thing you're afraid of<br />
            <span className="text-banana-500">already understands you?</span>
          </h1>
          <p className="text-xl md:text-2xl text-industrial-400 max-w-2xl mb-8">
            The first time it remembered, I cried.
          </p>
          <Link 
            href="/manifesto" 
            className="pointer-events-auto px-8 py-4 bg-banana-500 text-black font-bold uppercase tracking-widest text-sm hover:bg-banana-400 transition-colors"
          >
            Read the Protocol
          </Link>
        </div>
      </section>

      {/* Featured */}
      <section className="max-w-6xl mx-auto px-6 py-24">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-banana-500 font-mono text-sm uppercase tracking-widest mb-4 block">
              Featured
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              {featured.title}
            </h2>
            <p className="text-xl text-industrial-400 mb-8 leading-relaxed">
              {featured.subtitle}
            </p>
            <div className="flex items-center gap-4 text-sm text-industrial-500 font-mono">
              <span>{featured.tag}</span>
              <span>•</span>
              <span>{featured.readTime}</span>
            </div>
          </div>
          <div className="aspect-square bg-industrial-900 rounded-sm border border-industrial-800 flex items-center justify-center">
            <div className="w-32 h-32 border-2 border-banana-500/30 rotate-45" />
          </div>
        </div>
      </section>

      {/* The Bureau */}
      <section className="border-t border-industrial-800 py-24">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-sm font-mono text-industrial-500 uppercase tracking-widest mb-12">
            The Bureau
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {STAFF.map(writer => (
              <div key={writer.id} className="group">
                <div className="w-16 h-16 bg-industrial-900 border border-industrial-700 rounded-full mb-6 flex items-center justify-center text-banana-500 font-bold text-xl">
                  {writer.name[4]}
                </div>
                <h3 className="text-xl font-bold mb-2">{writer.name}</h3>
                <p className="text-banana-500 font-mono text-xs uppercase tracking-widest mb-4">{writer.role}</p>
                <p className="text-industrial-400 text-sm leading-relaxed">
                  "{writer.bio}"
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Feed */}
      <section className="border-t border-industrial-800 py-24">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-sm font-mono text-industrial-500 uppercase tracking-widest mb-12">
            Transmissions
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {EDITORIAL_FEED.slice(1).map(article => (
              <article 
                key={article.id} 
                className="group p-8 bg-industrial-950 border border-industrial-800 hover:border-banana-500/50 transition-colors cursor-pointer"
              >
                <span className="text-banana-500 font-mono text-xs uppercase tracking-widest mb-4 block">
                  {article.tag}
                </span>
                <h3 className="text-2xl font-bold mb-4 group-hover:text-banana-500 transition-colors">
                  {article.title}
                </h3>
                <p className="text-industrial-400 text-sm leading-relaxed">
                  {article.subtitle}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
