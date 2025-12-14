import { ReactNode } from 'react';
import Breadcrumbs from '@/components/Antigravity/Breadcrumbs';

export default function ArticleLayout({ children }: { children: ReactNode }) {
  return (
    <article className="max-w-4xl mx-auto px-6 py-16">
      {children}
    </article>
  );
}
