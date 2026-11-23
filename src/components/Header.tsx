import { useState } from 'react';
import { Menu, X } from 'lucide-react';

interface HeaderProps {
  onBookClick: () => void;
}

export default function Header({ onBookClick }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: 'Services', href: '#services' },
    { label: 'Showcase', href: '#showcase' },
    { label: 'Reviews', href: '#reviews' },
    { label: 'Vendors', href: '#vendors' },
    { label: 'Contact', href: '#contact' },
  ];

  const handleNavClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 border-b border-stone-200/80 bg-[#FAF9F6]/90 backdrop-blur-md transition-colors dark:border-zinc-800/80 dark:bg-[#0B0B0D]/90">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-8 px-4 sm:px-6 lg:px-8">
        {/* Zone 1: Single-element Brand wordmark */}
        <a
          href="#top"
          className="font-display text-lg font-bold tracking-tight text-stone-900 whitespace-nowrap shrink-0 dark:text-stone-100 sm:text-xl"
        >
          King of Management
        </a>

        {/* Zone 2: 4 concise single-line nav links */}
        <nav
          aria-label="Primary Navigation"
          className="hidden md:flex items-center gap-7 text-sm font-medium text-stone-600 dark:text-stone-300"
        >
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="relative py-1 whitespace-nowrap shrink-0 transition-colors hover:text-amber-700 dark:hover:text-amber-400 after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-amber-700 after:transition-all hover:after:w-full dark:after:bg-amber-400"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={onBookClick}
            className="hidden sm:inline-flex items-center justify-center rounded-lg bg-amber-700 px-4 py-2 text-sm font-semibold text-white whitespace-nowrap shrink-0 transition-colors hover:bg-amber-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-700 dark:bg-amber-500 dark:text-zinc-950 dark:hover:bg-amber-400"
          >
            Book Event
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
            className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-stone-200 text-stone-700 transition-colors hover:bg-stone-100 md:hidden dark:border-zinc-800 dark:text-stone-200 dark:hover:bg-zinc-900"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Compact mobile navigation drawer */}
      {mobileMenuOpen && (
        <div className="border-t border-stone-200 bg-[#FAF9F6] px-4 py-4 md:hidden dark:border-zinc-800 dark:bg-[#0B0B0D]">
          <nav aria-label="Mobile Navigation" className="flex flex-col gap-2">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={handleNavClick}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-stone-800 transition-colors hover:bg-stone-100 dark:text-stone-200 dark:hover:bg-zinc-900"
              >
                {item.label}
              </a>
            ))}
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onBookClick();
              }}
              className="mt-2 inline-flex w-full items-center justify-center rounded-lg bg-amber-700 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-amber-800 dark:bg-amber-500 dark:text-zinc-950 dark:hover:bg-amber-400"
            >
              Book Event
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
