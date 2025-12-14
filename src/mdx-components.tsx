import type { MDXComponents } from 'mdx/types'
import Image from 'next/image'
import Link from 'next/link'

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children }) => <h1 className="text-4xl font-black tracking-tight mb-8 mt-12">{children}</h1>,
    h2: ({ children }) => <h2 className="text-3xl font-bold tracking-tight mb-6 mt-12 text-industrial-900 dark:text-white border-b border-banana-500/20 pb-2">{children}</h2>,
    h3: ({ children }) => <h3 className="text-2xl font-bold mb-4 mt-8">{children}</h3>,
    p: ({ children }) => <p className="text-lg leading-relaxed text-industrial-700 dark:text-industrial-300 mb-6 font-medium">{children}</p>,
    ul: ({ children }) => <ul className="list-disc list-outside ml-6 mb-6 space-y-2 text-industrial-700 dark:text-industrial-300">{children}</ul>,
    ol: ({ children }) => <ol className="list-decimal list-outside ml-6 mb-6 space-y-2 text-industrial-700 dark:text-industrial-300">{children}</ol>,
    li: ({ children }) => <li className="pl-2">{children}</li>,
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-banana-500 pl-6 py-2 my-8 italic text-xl text-industrial-600 dark:text-industrial-400 bg-industrial-50 dark:bg-industrial-900/50">
        {children}
      </blockquote>
    ),
    a: ({ href, children }) => (
      <Link href={href as string} className="text-banana-600 dark:text-banana-400 font-bold hover:underline decoration-2 underline-offset-2">
        {children}
      </Link>
    ),
    img: (props) => (
       <span className="block my-8 relative rounded-sm overflow-hidden border border-industrial-200 dark:border-industrial-800 bg-industrial-100 dark:bg-industrial-900">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img {...props} className="w-full h-auto" loading="lazy" />
       </span>
    ),
    // Allow custom components to be passed through
    ...components,
  }
}
