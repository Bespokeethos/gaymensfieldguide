'use client';

export default function SkipLink() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[9999] focus:bg-banana-500 focus:text-black focus:px-4 focus:py-2 focus:font-mono focus:text-sm focus:font-bold focus:uppercase focus:tracking-widest focus:shadow-lg focus:outline-none focus:ring-4 focus:ring-banana-600"
      aria-label="Skip to main content"
    >
      Skip to main content
    </a>
  );
}
