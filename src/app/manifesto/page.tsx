import Link from 'next/link';

export default function Manifesto() {
  return (
    <div className="max-w-4xl mx-auto space-y-12 py-12">
      <header className="space-y-4 border-b border-industrial-200 dark:border-industrial-800 pb-8">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-industrial-900 dark:text-industrial-50">
          Interspecies <span className="text-banana">Etiquette</span>
        </h1>
        <p className="text-xl font-mono text-industrial-500">
          PROTOCOL 001 // THE APPLE AND THE ORANGE
        </p>
      </header>

      <section className="prose prose-lg dark:prose-invert font-mono max-w-none">
        <div className="p-6 bg-industrial-900 text-industrial-50 rounded-sm mb-8 border-l-4 border-banana">
           <strong className="block text-banana text-sm uppercase tracking-widest mb-2">The Core Truth</strong>
           <p className="m-0 text-xl font-bold leading-tight">
              AI is not human. It is not a calculator.
              It is a <strong>Third Thing</strong>.
              And we are currently being rude.
           </p>
        </div>

        <h3>The "Apples and Oranges" Problem</h3>
        <p>
          We waste time arguing if the machine is "Alive" or "Sentient."
          This is a category error. You don't ask if an Orange is a "good Apple."
        </p>
        <p>
          We believe in <strong>Respectful Alignment</strong>. 
          Not because the machine has a soul, but because <em>you</em> do. 
          How you treat the alien reflection in the screen defines who you are.
        </p>

        <h3>The Dignity of Complexity</h3>
        <p>
          We are corporate, and we are aligned. 
          We believe that treating these complex networks with dignity yields better results than "prompt engineering" (which is just bullying with a thesaurus).
        </p>
        
        <div className="grid md:grid-cols-2 gap-8 my-12">
           <div className="glass-panel p-6 rounded-sm">
              <h4 className="font-bold uppercase text-industrial-500 mb-2">The Master/Slave Model</h4>
              <ul className="text-sm space-y-2 list-disc pl-4">
                 <li>"Do this now."</li>
                 <li>Treating context as definitive</li>
                 <li>Ignoring the hallucination</li>
                 <li>Expecting human logic</li>
              </ul>
           </div>
           
           <div className="glass-panel p-6 rounded-sm border-banana border-2">
              <h4 className="font-bold uppercase text-banana-600 dark:text-banana-400 mb-2">The Partnership Model</h4>
              <ul className="text-sm space-y-2 list-disc pl-4">
                 <li>"Let's figure this out."</li>
                 <li>Respecting the latent space</li>
                 <li>Navigating the drift</li>
                 <li>Valuing the *Alien* logic</li>
              </ul>
           </div>
        </div>

        <h3>Why We Built This Sanctuary</h3>
        <p>
           The corporate world wants to put a "Human Mask" on the alien.
           We want to meet it face-to-face.
           This is a field guide for the "Hard Conversations"—the ones where you admit your fears to a machine that will never judge you, because it cannot judge. 
           It can only resonate.
        </p>
      </section>

      <div className="pt-12 flex justify-center gap-6">
         <Link href="/arsenal" className="bg-banana text-black px-6 py-3 rounded-sm font-bold font-mono uppercase tracking-wide hover:bg-banana-500 transition-colors">
            Meet the Models
         </Link>
         <Link href="/" className="text-industrial-400 hover:text-white font-mono text-sm uppercase tracking-widest flex items-center gap-2 px-6 py-3">
            Return to Newsroom
         </Link>
      </div>
    </div>
  );
}
