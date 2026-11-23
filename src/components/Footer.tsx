import { FormEvent, useState } from 'react';
import { Check, Facebook, Instagram, MessageCircle, Moon, Phone, Sun, Youtube } from 'lucide-react';
import { BUSINESS_INFO, EVENT_CATEGORIES, EventCategory } from '../data/eventsData';

interface FooterProps {
  onSelectCategory: (category: EventCategory) => void;
  isDark: boolean;
  onToggleTheme: () => void;
}

export default function Footer({ onSelectCategory, isDark, onToggleTheme }: FooterProps) {
  const [email, setEmail] = useState('');
  const [newsletterError, setNewsletterError] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletterSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmed = email.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setNewsletterError('Please enter a valid email address.');
      return;
    }
    setNewsletterError('');
    setSubscribed(true);
    setEmail('');
  };

  const handleQuickCategory = (cat: EventCategory) => {
    onSelectCategory(cat);
    const el = document.getElementById('services');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-stone-200 bg-[#F3F1EC] dark:border-zinc-800 dark:bg-[#0F0F12]">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
          {/* Brand & Mirzapur Summary */}
          <div className="md:col-span-4">
            <a
              href="#top"
              className="font-display text-2xl font-bold tracking-tight text-stone-900 dark:text-stone-100"
            >
              King of Management
            </a>
            <p className="mt-3 text-sm leading-relaxed text-stone-600 dark:text-stone-400">
              Full-service event planning, wedding mandap production, theme birthdays, corporate
              conferences, and hospitality catering in Mirzapur, Uttar Pradesh.
            </p>

            <div className="mt-5 flex flex-wrap items-center gap-2.5">
              <a
                href={BUSINESS_INFO.phoneHref}
                aria-label="Call King of Management"
                className="inline-flex h-10 items-center gap-2 rounded-lg border border-stone-300 bg-white px-3 text-xs font-semibold text-stone-800 transition-colors hover:border-amber-700 dark:border-zinc-700 dark:bg-zinc-900 dark:text-stone-200 dark:hover:border-amber-500"
              >
                <Phone className="h-3.5 w-3.5 text-amber-700 dark:text-amber-400" />
                <span className="tabular-nums">{BUSINESS_INFO.phoneDisplay}</span>
              </a>

              <a
                href={BUSINESS_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Chat on WhatsApp"
                className="inline-flex h-10 items-center gap-1.5 rounded-lg bg-[#15803D] px-3 text-xs font-semibold text-white transition-colors hover:bg-[#166534]"
              >
                <MessageCircle className="h-3.5 w-3.5" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-2">
            <h3 className="text-sm font-semibold text-stone-900 dark:text-stone-100">
              Quick Links
            </h3>
            <ul className="mt-3.5 space-y-2.5 text-sm text-stone-600 dark:text-stone-400">
              <li>
                <a href="#top" className="hover:text-amber-700 dark:hover:text-amber-400">
                  Home
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-amber-700 dark:hover:text-amber-400">
                  All Services
                </a>
              </li>
              <li>
                <a href="#showcase" className="hover:text-amber-700 dark:hover:text-amber-400">
                  Event Showcase
                </a>
              </li>
              <li>
                <a href="#reviews" className="hover:text-amber-700 dark:hover:text-amber-400">
                  Client Reviews
                </a>
              </li>
              <li>
                <a href="#vendors" className="hover:text-amber-700 dark:hover:text-amber-400">
                  Join as Vendor
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-amber-700 dark:hover:text-amber-400">
                  Event FAQs
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-amber-700 dark:hover:text-amber-400">
                  Book Quote
                </a>
              </li>
            </ul>
          </div>

          {/* Event Categories */}
          <div className="md:col-span-2">
            <h3 className="text-sm font-semibold text-stone-900 dark:text-stone-100">
              Categories
            </h3>
            <ul className="mt-3.5 space-y-2.5 text-sm text-stone-600 dark:text-stone-400">
              {EVENT_CATEGORIES.filter((c) => c !== 'All').map((cat) => (
                <li key={cat}>
                  <button
                    type="button"
                    onClick={() => handleQuickCategory(cat)}
                    className="text-left hover:text-amber-700 dark:hover:text-amber-400"
                  >
                    {cat}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Dynamic Newsletter & Theme Switch */}
          <div className="md:col-span-4">
            <h3 className="text-sm font-semibold text-stone-900 dark:text-stone-100">
              Seasonal Event Guides &amp; Offers
            </h3>
            <p className="mt-2 text-xs leading-relaxed text-stone-600 dark:text-stone-400">
              Subscribe for Mirzapur auspicious wedding dates, German hanger availability, and
              pooja or party decor checklists.
            </p>

            {subscribed ? (
              <div className="mt-4 flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-xs font-medium text-emerald-800 dark:border-emerald-900/50 dark:bg-emerald-950/40 dark:text-emerald-300">
                <Check className="h-4 w-4 shrink-0" />
                <span>Subscribed! Watch your inbox for our Mirzapur event planner guide.</span>
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} noValidate className="mt-4">
                <label htmlFor="footer-newsletter-email" className="sr-only">
                  Email address for newsletter
                </label>
                <div className="flex gap-2">
                  <input
                    id="footer-newsletter-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="h-11 min-w-0 flex-1 rounded-lg border border-stone-300 bg-white px-3.5 text-sm text-stone-900 placeholder:text-stone-400 focus:border-amber-700 focus:outline-none dark:border-zinc-700 dark:bg-zinc-900 dark:text-stone-100 dark:placeholder:text-stone-500 dark:focus:border-amber-500"
                  />
                  <button
                    type="submit"
                    className="inline-flex h-11 items-center justify-center rounded-lg bg-amber-700 px-4 text-sm font-semibold text-white whitespace-nowrap shrink-0 transition-colors hover:bg-amber-800 dark:bg-amber-500 dark:text-zinc-950 dark:hover:bg-amber-400"
                  >
                    Subscribe
                  </button>
                </div>
                {newsletterError && (
                  <p className="mt-1.5 text-xs text-red-600 dark:text-red-400">
                    {newsletterError}
                  </p>
                )}
              </form>
            )}

            <div className="mt-5 flex items-center justify-between border-t border-stone-200 pt-4 dark:border-zinc-800">
              <div className="flex items-center gap-3">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="King of Management on Instagram"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-stone-200 bg-white text-stone-600 transition-colors hover:border-amber-700 hover:text-amber-700 dark:border-zinc-800 dark:bg-zinc-900 dark:text-stone-300 dark:hover:border-amber-500 dark:hover:text-amber-400"
                >
                  <Instagram className="h-4 w-4" />
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="King of Management on Facebook"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-stone-200 bg-white text-stone-600 transition-colors hover:border-amber-700 hover:text-amber-700 dark:border-zinc-800 dark:bg-zinc-900 dark:text-stone-300 dark:hover:border-amber-500 dark:hover:text-amber-400"
                >
                  <Facebook className="h-4 w-4" />
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="King of Management on YouTube"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-stone-200 bg-white text-stone-600 transition-colors hover:border-amber-700 hover:text-amber-700 dark:border-zinc-800 dark:bg-zinc-900 dark:text-stone-300 dark:hover:border-amber-500 dark:hover:text-amber-400"
                >
                  <Youtube className="h-4 w-4" />
                </a>
              </div>

              <button
                type="button"
                onClick={onToggleTheme}
                className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-stone-200 bg-white px-3 text-xs font-medium text-stone-700 transition-colors hover:border-stone-400 dark:border-zinc-800 dark:bg-zinc-900 dark:text-stone-200 dark:hover:border-zinc-600"
              >
                {isDark ? <Sun className="h-3.5 w-3.5 text-amber-400" /> : <Moon className="h-3.5 w-3.5 text-amber-700" />}
                <span>{isDark ? 'Light Mode' : 'Dark Mode'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Copyright Row */}
        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-stone-200 pt-6 text-xs text-stone-500 sm:flex-row sm:items-center dark:border-zinc-800 dark:text-stone-400">
          <p>© {new Date().getFullYear()} King of Management · Mirzapur, Uttar Pradesh.</p>
          <p>Weddings · Birthdays · Corporate Events · Catering &amp; Decor</p>
        </div>
      </div>
    </footer>
  );
}
