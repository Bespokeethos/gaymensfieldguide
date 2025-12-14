import { ReactNode } from 'react';
import MarketingCTA from '@/components/MarketingCTA';

export default function BlogRootLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <div className="prose-content min-h-screen">
          {children}
      </div>
      <MarketingCTA />
    </>
  );
}
