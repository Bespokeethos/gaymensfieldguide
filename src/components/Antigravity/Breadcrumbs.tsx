import Link from 'next/link';
import React from 'react';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className="mb-8">
      <ol className="flex items-center gap-2 font-mono text-xs text-industrial-500" itemScope itemType="https://schema.org/BreadcrumbList">
        {items.map((item, index) => (
          <li key={index} className="flex items-center gap-2" itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
            {item.href ? (
              <>
                <Link 
                  href={item.href} 
                  className="hover:text-banana-600 dark:hover:text-banana-400 transition-colors"
                  itemProp="item"
                >
                  <span itemProp="name">{item.label}</span>
                </Link>
                <meta itemProp="position" content={String(index + 1)} />
              </>
            ) : (
              <span className="text-industrial-900 dark:text-industrial-50 font-bold" itemProp="name" aria-current="page">
                {item.label}
              </span>
            )}
            {index < items.length - 1 && (
              <span className="text-industrial-400" aria-hidden="true">/</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
