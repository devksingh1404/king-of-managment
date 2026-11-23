import { FormEvent } from 'react';
import { CloudSun, MapPin, Moon, Search, SlidersHorizontal, Sun } from 'lucide-react';
import { motion } from 'motion/react';
import {
  BUSINESS_INFO,
  EVENT_CATEGORIES,
  EventCategory,
  GUEST_SCALES,
  GuestScale,
  SEARCH_SUGGESTIONS,
} from '../data/eventsData';
import { WeatherState } from './LocationWeatherModal';

interface HeroSectionProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  selectedCategory: EventCategory;
  onCategoryChange: (cat: EventCategory) => void;
  selectedScale: GuestScale;
  onScaleChange: (scale: GuestScale) => void;
  onSearchSubmit: () => void;
  isDark: boolean;
  onToggleTheme: () => void;
  weather: WeatherState | null;
  onOpenWeatherModal: () => void;
}

export default function HeroSection({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  selectedScale,
  onScaleChange,
  onSearchSubmit,
  isDark,
  onToggleTheme,
  weather,
  onOpenWeatherModal,
}: HeroSectionProps) {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSearchSubmit();
  };

  return (
    <section
      id="top"
      className="relative overflow-hidden border-b border-stone-200 bg-zinc-950 dark:border-zinc-800"
    >
      {/* Background image with measured contrast scrim */}
      <div className="absolute inset-0">
        <img
          src={BUSINESS_INFO.heroImage}
          alt="King of Management grand wedding and evening event production in Mirzapur"
          referrerPolicy="no-referrer"
          className="h-full w-full object-cover object-center"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-b from-zinc-950/80 via-zinc-950/65 to-zinc-950/92"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-amber-950/40 via-transparent to-zinc-950/75"
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 pb-14 pt-6 sm:px-6 sm:pb-20 sm:pt-8 lg:px-8 lg:pb-24">
        {/* Hero Utility Strip (Regional Marker + Weather & Dark Mode Controls) */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-wrap items-center justify-between gap-3 border-b border-white/15 pb-5"
        >
          <div className="flex items-center gap-2 text-xs font-medium text-stone-200 sm:text-sm">
            <MapPin className="h-4 w-4 shrink-0 text-amber-400" />
            <span>
              Mirzapur, Uttar Pradesh · Weddings, Pooja Path, Mundan, Baby Welcome, Parties &amp;
              Corporate
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              type="button"
              onClick={onOpenWeatherModal}
              className="inline-flex h-10 items-center gap-2 rounded-lg border border-white/20 bg-zinc-900/70 px-3 text-xs font-medium text-stone-100 backdrop-blur-md whitespace-nowrap shrink-0 transition-colors hover:border-amber-400/70 hover:bg-zinc-900"
            >
              <CloudSun className="h-4 w-4 text-amber-400" />
              <span className="tabular-nums">
                {weather
                  ? `${weather.city} · ${weather.temperature}°C ${weather.conditionLabel}`
                  : 'Check Event Weather'}
              </span>
            </button>

            <button
              type="button"
              onClick={onToggleTheme}
              aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
              className="inline-flex h-10 items-center gap-2 rounded-lg border border-white/20 bg-zinc-900/70 px-3 text-xs font-medium text-stone-100 backdrop-blur-md whitespace-nowrap shrink-0 transition-colors hover:border-amber-400/70 hover:bg-zinc-900"
            >
              {isDark ? (
                <>
                  <Sun className="h-4 w-4 text-amber-400" />
                  <span>Light</span>
                </>
              ) : (
                <>
                  <Moon className="h-4 w-4 text-amber-400" />
                  <span>Dark</span>
                </>
              )}
            </button>
          </div>
        </motion.div>

        {/* Dominant Headline & Value Proposition */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 max-w-3xl sm:mt-12"
        >
          <p className="text-xs font-semibold tracking-wider text-amber-400 uppercase">
            Mirzapur’s All-Occasion Event Management
          </p>
          <h1
            className="mt-3 font-display font-bold tracking-tight text-white text-balance"
            style={{ fontSize: 'clamp(2.25rem, 4.2vw, 3.75rem)', lineHeight: 1.08 }}
          >
            From Royal Shadi &amp; Pooja Path to Baby Welcome &amp; Corporate Galas.
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-stone-200 sm:text-lg">
            Every celebration in Mirzapur under one roof — Weddings, Mundan, Namkaran, Godbharai,
            Griha Pravesh, Satyanarayan Katha, Birthdays, Showroom Openings, DJ Sound &amp; Shahi
            Catering.
          </p>
        </motion.div>

        {/* Horizontal Event Filter & Search Bar Overlaid on Hero (Clean, No Quick Filter Row) */}
        <motion.form
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
          onSubmit={handleSubmit}
          aria-label="Filter and search event services"
          className="mt-8 rounded-2xl border border-white/15 bg-white/95 p-3.5 shadow-2xl backdrop-blur-md dark:border-zinc-700/80 dark:bg-zinc-900/95 sm:mt-10 sm:p-4"
        >
          <div className="grid grid-cols-1 gap-3 md:grid-cols-12 md:items-center">
            {/* Search input with rich event autocomplete */}
            <div className="md:col-span-5">
              <label
                htmlFor="hero-event-search"
                className="mb-1 block px-1 text-xs font-medium text-stone-500 dark:text-stone-400"
              >
                Search Any Event, Pooja or Celebration
              </label>
              <div className="relative">
                <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
                <input
                  id="hero-event-search"
                  type="text"
                  list="event-search-suggestions"
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  placeholder="Shadi, Pooja Path, Mundan, Baby Welcome, Birthday, DJ..."
                  className="h-11 w-full rounded-lg border border-stone-200 bg-stone-50 pl-10 pr-3 text-sm text-stone-900 placeholder:text-stone-400 focus:border-amber-700 focus:bg-white focus:outline-none dark:border-zinc-700 dark:bg-zinc-950 dark:text-stone-100 dark:placeholder:text-stone-500 dark:focus:border-amber-500"
                />
                <datalist id="event-search-suggestions">
                  {SEARCH_SUGGESTIONS.map((item) => (
                    <option key={item} value={item} />
                  ))}
                </datalist>
              </div>
            </div>

            {/* Complete Event Type Select */}
            <div className="md:col-span-3">
              <label
                htmlFor="hero-category-select"
                className="mb-1 block px-1 text-xs font-medium text-stone-500 dark:text-stone-400"
              >
                Event Category
              </label>
              <div className="relative">
                <SlidersHorizontal className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
                <select
                  id="hero-category-select"
                  value={selectedCategory}
                  onChange={(e) => onCategoryChange(e.target.value as EventCategory)}
                  className="h-11 w-full appearance-none rounded-lg border border-stone-200 bg-stone-50 pl-9 pr-8 text-sm font-medium text-stone-900 focus:border-amber-700 focus:bg-white focus:outline-none dark:border-zinc-700 dark:bg-zinc-950 dark:text-stone-100 dark:focus:border-amber-500"
                >
                  {EVENT_CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat === 'All' ? 'All Event Types' : cat}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Guest Scale Select */}
            <div className="md:col-span-2">
              <label
                htmlFor="hero-scale-select"
                className="mb-1 block px-1 text-xs font-medium text-stone-500 dark:text-stone-400"
              >
                Guest Scale
              </label>
              <select
                id="hero-scale-select"
                value={selectedScale}
                onChange={(e) => onScaleChange(e.target.value as GuestScale)}
                className="h-11 w-full rounded-lg border border-stone-200 bg-stone-50 px-3 text-sm font-medium text-stone-900 focus:border-amber-700 focus:bg-white focus:outline-none dark:border-zinc-700 dark:bg-zinc-950 dark:text-stone-100 dark:focus:border-amber-500"
              >
                {GUEST_SCALES.map((item) => (
                  <option key={item.value} value={item.value}>
                    {item.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Submit button */}
            <div className="md:col-span-2 md:self-end">
              <button
                type="submit"
                className="inline-flex h-11 w-full items-center justify-center rounded-lg bg-amber-700 px-4 text-sm font-semibold text-white whitespace-nowrap shrink-0 transition-colors hover:bg-amber-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-700 dark:bg-amber-500 dark:text-zinc-950 dark:hover:bg-amber-400"
              >
                Find Services
              </button>
            </div>
          </div>
        </motion.form>
      </div>
    </section>
  );
}
