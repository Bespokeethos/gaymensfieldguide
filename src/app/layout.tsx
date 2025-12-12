import ImpactMeter from '../components/Antigravity/ImpactMeter';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './globals.css';

export const metadata = {
  title: 'Gay Mens Field Guide | Vibe Coding Editorial',
  description: 'The editorial home for the Vibe Coding Lifestyle.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="antialiased">
      <body className="min-h-screen bg-paper dark:bg-paper-dark text-industrial-900 dark:text-industrial-50 bg-noise selection:bg-banana selection:text-black">
        <Header />
        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 min-h-[calc(100vh-3.5rem)]">
           {children}
        </main>
        <Footer />
        <ImpactMeter />
      </body>
    </html>
  );
}
