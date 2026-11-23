import { useState, useEffect } from 'react';
import { ArrowRight, CheckCircle2, Clock, Sparkles, Users, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import {
  EVENT_CATEGORIES,
  EventCategory,
  EventService,
  GuestScale,
} from '../data/eventsData';

interface ServicesSectionProps {
  services: EventService[];
  selectedCategory: EventCategory;
  onCategoryChange: (cat: EventCategory) => void;
  selectedScale: GuestScale;
  searchQuery: string;
  onResetFilters: () => void;
  onSelectServiceForBooking: (serviceTitle: string) => void;
}

const DEFAULT_VISIBLE_COUNT = 8;
const LOAD_MORE_STEP = 6;

export default function ServicesSection({
  services,
  selectedCategory,
  onCategoryChange,
  selectedScale,
  searchQuery,
  onResetFilters,
  onSelectServiceForBooking,
}: ServicesSectionProps) {
  const [visibleCount, setVisibleCount] = useState<number>(DEFAULT_VISIBLE_COUNT);
  const [activeService, setActiveService] = useState<EventService | null>(null);
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

  useEffect(() => {
    setVisibleCount(DEFAULT_VISIBLE_COUNT);
  }, [selectedCategory, selectedScale, searchQuery]);

  useEffect(() => {
    if (!activeService) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveService(null);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [activeService]);

  const visibleServices = services.slice(0, visibleCount);
  const remainingCount = Math.max(0, services.length - visibleCount);
  const hasActiveFilter =
    selectedCategory !== 'All' || selectedScale !== 'All' || searchQuery.trim().length > 0;

  return (
    <section id="services" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 'some' }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between"
      >
        <div className="max-w-2xl">
          <p className="text-xs font-semibold tracking-wider text-amber-700 uppercase dark:text-amber-400">
            Curated Event Services
          </p>
          <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-stone-900 text-balance dark:text-stone-100 sm:text-4xl">
            Every Celebration, Engineered to Order
          </h2>
          <p className="mt-3 text-base leading-relaxed text-stone-600 dark:text-stone-300">
            Browse our Mirzapur event production services below. Filter by occasion or open any
            card to review full setup deliverables and request a personalized plan.
          </p>
        </div>

        {/* Result count & reset */}
        <div className="flex items-center gap-4 text-sm text-stone-600 dark:text-stone-300">
          <span className="tabular-nums font-medium">
            Showing {visibleServices.length} of {services.length} services
          </span>
          {hasActiveFilter && (
            <button
              type="button"
              onClick={onResetFilters}
              className="text-sm font-semibold text-amber-700 underline-offset-4 hover:underline dark:text-amber-400"
            >
              Reset filters
            </button>
          )}
        </div>
      </motion.div>

      {/* Category Segmented Filter Tabs */}
      <div
        role="tablist"
        aria-label="Filter services by category"
        className="mt-8 flex flex-wrap items-center gap-1.5 rounded-xl border border-stone-200 bg-stone-100/80 p-1.5 dark:border-zinc-800 dark:bg-zinc-900"
      >
        {EVENT_CATEGORIES.map((category) => {
          const isActive = selectedCategory === category;
          return (
            <button
              key={category}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => onCategoryChange(category)}
              className={`rounded-lg px-3.5 py-2 text-xs font-semibold whitespace-nowrap shrink-0 transition-colors sm:text-sm ${
                isActive
                  ? 'bg-white text-stone-900 shadow-sm dark:bg-amber-500 dark:text-zinc-950'
                  : 'text-stone-600 hover:text-stone-900 dark:text-stone-300 dark:hover:text-white'
              }`}
            >
              {category}
            </button>
          );
        })}
      </div>

      {/* Empty State */}
      {services.length === 0 ? (
        <div className="mt-12 rounded-2xl border border-stone-200 bg-white p-12 text-center dark:border-zinc-800 dark:bg-zinc-900">
          <p className="font-display text-xl font-bold text-stone-900 dark:text-stone-100">
            No matching event services found
          </p>
          <p className="mt-2 text-sm text-stone-600 dark:text-stone-400">
            Try clearing your search term or switching to All Event Types to view our full catalog.
          </p>
          <button
            type="button"
            onClick={onResetFilters}
            className="mt-5 inline-flex h-11 items-center justify-center rounded-lg bg-amber-700 px-5 text-sm font-semibold text-white transition-colors hover:bg-amber-800 dark:bg-amber-500 dark:text-zinc-950 dark:hover:bg-amber-400"
          >
            Show All Services
          </button>
        </div>
      ) : (
        <>
          {/* 8 Default Services Grid (Zero Price Display) */}
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {visibleServices.map((service, idx) => {
              const imgFailed = failedImages[service.id];
              return (
                <motion.article
                  key={service.id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 'some' }}
                  transition={{
                    duration: 0.32,
                    delay: Math.min((idx % 4) * 0.05, 0.15),
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-stone-200 bg-white transition-transform duration-200 hover:-translate-y-0.5 dark:border-zinc-800 dark:bg-[#141418]"
                >
                  {/* 4:3 Media Frame */}
                  <button
                    type="button"
                    onClick={() => setActiveService(service)}
                    className="relative aspect-4/3 w-full overflow-hidden bg-stone-200 text-left dark:bg-zinc-800"
                    aria-label={`View details for ${service.title}`}
                  >
                    {imgFailed ? (
                      <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-stone-200 via-amber-50 to-stone-300 p-4 text-center dark:from-zinc-800 dark:via-zinc-900 dark:to-zinc-950">
                        <Sparkles className="h-7 w-7 text-amber-700 dark:text-amber-400" />
                        <span className="mt-2 text-xs font-medium text-stone-700 dark:text-stone-300">
                          {service.title}
                        </span>
                      </div>
                    ) : (
                      <img
                        src={service.image}
                        alt={`${service.title} by King of Management Mirzapur`}
                        referrerPolicy="no-referrer"
                        loading="lazy"
                        onError={() =>
                          setFailedImages((prev) => ({ ...prev, [service.id]: true }))
                        }
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    )}
                  </button>

                  {/* Card Body — Unboxed zero-pill metadata, no prices */}
                  <div className="flex flex-1 flex-col p-5">
                    <div className="flex flex-wrap items-center gap-1.5 text-xs text-stone-500 dark:text-stone-400">
                      <span className="font-medium text-amber-700 dark:text-amber-400">
                        {service.category}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span className="tabular-nums">{service.guestRange}</span>
                    </div>

                    <h3 className="mt-2 text-base font-bold leading-snug text-stone-900 dark:text-stone-100">
                      <button
                        type="button"
                        onClick={() => setActiveService(service)}
                        className="text-left transition-colors hover:text-amber-700 dark:hover:text-amber-400"
                      >
                        {service.indexLabel}. {service.title}
                      </button>
                    </h3>

                    <p className="mt-2 flex-1 text-sm leading-relaxed text-stone-600 line-clamp-3 dark:text-stone-300">
                      {service.brief}
                    </p>

                    <div className="mt-5 flex items-center justify-between border-t border-stone-100 pt-4 dark:border-zinc-800">
                      <span className="text-xs font-medium text-stone-500 dark:text-stone-400">
                        {service.setupLeadTime}
                      </span>

                      <button
                        type="button"
                        onClick={() => setActiveService(service)}
                        className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold text-amber-800 whitespace-nowrap shrink-0 transition-colors hover:bg-amber-50 dark:text-amber-400 dark:hover:bg-amber-500/10"
                      >
                        View Details
                        <ArrowRight className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>

          {/* Load More Control */}
          {remainingCount > 0 && (
            <div className="mt-10 flex justify-center">
              <button
                type="button"
                onClick={() => setVisibleCount((prev) => prev + LOAD_MORE_STEP)}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-stone-300 bg-white px-7 text-sm font-semibold text-stone-900 transition-colors hover:border-amber-700 hover:bg-amber-50/60 dark:border-zinc-700 dark:bg-zinc-900 dark:text-stone-100 dark:hover:border-amber-500 dark:hover:bg-zinc-800"
              >
                <span>Load More Services ({remainingCount} more)</span>
              </button>
            </div>
          )}
        </>
      )}

      {/* Service Detail Modal (No Prices Displayed) */}
      <AnimatePresence>
        {activeService && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="service-modal-title"
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/65 p-4 backdrop-blur-sm"
            onClick={(e) => {
              if (e.target === e.currentTarget) setActiveService(null);
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.97, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97, y: 12 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-stone-200 bg-[#FAF9F6] shadow-2xl dark:border-zinc-800 dark:bg-[#141418]"
            >
              <button
                type="button"
                onClick={() => setActiveService(null)}
                aria-label="Close service details"
                className="absolute right-4 top-4 z-10 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-950/70 text-white backdrop-blur-sm transition-colors hover:bg-zinc-950"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="aspect-16/9 w-full overflow-hidden bg-stone-200 dark:bg-zinc-800">
                <img
                  src={activeService.image}
                  alt={activeService.title}
                  referrerPolicy="no-referrer"
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="p-6 sm:p-8">
                <div className="flex flex-wrap items-center gap-2 text-xs text-stone-500 dark:text-stone-400">
                  <span className="font-semibold text-amber-700 dark:text-amber-400">
                    {activeService.category}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span className="inline-flex items-center gap-1 tabular-nums">
                    <Users className="h-3.5 w-3.5" />
                    {activeService.guestRange}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span className="inline-flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" />
                    {activeService.setupLeadTime}
                  </span>
                </div>

                <h3
                  id="service-modal-title"
                  className="mt-2 font-display text-2xl font-bold text-stone-900 dark:text-stone-100 sm:text-3xl"
                >
                  {activeService.indexLabel}. {activeService.title}
                </h3>

                <p className="mt-3 text-base leading-relaxed text-stone-600 dark:text-stone-300">
                  {activeService.brief}
                </p>

                <div className="mt-6 border-t border-stone-200 pt-5 dark:border-zinc-800">
                  <h4 className="text-sm font-semibold text-stone-900 dark:text-stone-100">
                    Included in This Setup
                  </h4>
                  <ul className="mt-3 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                    {activeService.deliverables.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2 text-sm text-stone-700 dark:text-stone-300"
                      >
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-amber-700 dark:text-amber-400" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-7 flex flex-wrap items-center justify-between gap-4 border-t border-stone-200 pt-5 dark:border-zinc-800">
                  <span className="text-sm font-medium text-stone-600 dark:text-stone-300">
                    Custom tailored to your Mirzapur venue &amp; guest count
                  </span>

                  <button
                    type="button"
                    onClick={() => {
                      const chosen = activeService.title;
                      setActiveService(null);
                      onSelectServiceForBooking(chosen);
                    }}
                    className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-amber-700 px-6 text-sm font-semibold text-white transition-colors hover:bg-amber-800 dark:bg-amber-500 dark:text-zinc-950 dark:hover:bg-amber-400"
                  >
                    Request Custom Quote
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
