import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { CLIENT_REVIEWS, FEATURED_CASE_STUDIES } from '../data/eventsData';

const PROOF_METRICS = [
  { value: '450+', label: 'Events Delivered Across Mirzapur & Vindhyachal' },
  { value: '98.4%', label: 'On-Time Stage & Catering Handover Rate' },
  { value: '12+ Yrs', label: 'Dedicated Local Vendor & Venue Network' },
  { value: '4.9 / 5', label: 'Verified Family & Corporate Client Rating' },
];

export default function ShowcaseAndReviews() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-advance review slider smoothly unless paused by hover/focus
  useEffect(() => {
    if (isPaused) return;
    const timer = window.setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % CLIENT_REVIEWS.length);
    }, 5000);
    return () => window.clearInterval(timer);
  }, [isPaused]);

  const handlePrev = () => {
    setActiveSlide((prev) => (prev - 1 + CLIENT_REVIEWS.length) % CLIENT_REVIEWS.length);
  };

  const handleNext = () => {
    setActiveSlide((prev) => (prev + 1) % CLIENT_REVIEWS.length);
  };

  const currentReview = CLIENT_REVIEWS[activeSlide];
  const secondaryReview = CLIENT_REVIEWS[(activeSlide + 1) % CLIENT_REVIEWS.length];

  return (
    <>
      {/* Claim-to-Proof Metrics Strip */}
      <section className="border-y border-stone-200 bg-[#F3F1EC] dark:border-zinc-800 dark:bg-[#141418]">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {PROOF_METRICS.map((metric, idx) => (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 'some' }}
                transition={{ duration: 0.3, delay: idx * 0.05, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="font-display text-3xl font-bold tabular-nums text-stone-900 dark:text-stone-100 sm:text-4xl">
                  {metric.value}
                </div>
                <p className="mt-1.5 text-sm leading-snug text-stone-600 dark:text-stone-300">
                  {metric.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Asymmetric Showcase Bento Grid */}
      <section id="showcase" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 'some' }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl"
        >
          <p className="text-xs font-semibold tracking-wider text-amber-700 uppercase dark:text-amber-400">
            Recent Mirzapur Productions
          </p>
          <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-stone-900 text-balance dark:text-stone-100 sm:text-4xl">
            Proven Execution Across Weddings &amp; Galas
          </h2>
          <p className="mt-3 text-base leading-relaxed text-stone-600 dark:text-stone-300">
            Every lawn, banquet hall, and corporate venue comes with tight timelines. Here is how
            our crew delivers reliable outcomes at scale.
          </p>
        </motion.div>

        <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {FEATURED_CASE_STUDIES.map((study, idx) => (
            <motion.article
              key={study.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 'some' }}
              transition={{ duration: 0.35, delay: idx * 0.06, ease: [0.16, 1, 0.3, 1] }}
              className={`group overflow-hidden rounded-2xl border border-stone-200 bg-white dark:border-zinc-800 dark:bg-[#141418] ${
                study.featured ? 'lg:col-span-2' : 'lg:col-span-1'
              }`}
            >
              <div
                className={`relative overflow-hidden bg-stone-200 dark:bg-zinc-800 ${
                  study.featured ? 'aspect-16/9 lg:aspect-21/10' : 'aspect-16/10'
                }`}
              >
                <img
                  src={study.image}
                  alt={`${study.title} in ${study.location}`}
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-103"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent"
                />
                <div className="absolute bottom-4 left-5 right-5 text-white">
                  <p className="text-xs font-medium text-amber-300">
                    {study.category} · {study.location}
                  </p>
                  <p className="mt-1 text-sm font-semibold tabular-nums sm:text-base">
                    {study.metric}
                  </p>
                </div>
              </div>

              <div className="p-6">
                <h3 className="font-display text-xl font-bold text-stone-900 dark:text-stone-100">
                  {study.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-stone-600 dark:text-stone-300">
                  {study.summary}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      {/* Animated Responsive Client Reviews Slider */}
      <section
        id="reviews"
        className="border-t border-stone-200 bg-[#F3F1EC] dark:border-zinc-800 dark:bg-[#141418]"
      >
        <div
          className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onFocus={() => setIsPaused(true)}
          onBlur={() => setIsPaused(false)}
        >
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold tracking-wider text-amber-700 uppercase dark:text-amber-400">
                Client Testimonials
              </p>
              <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-stone-900 text-balance dark:text-stone-100 sm:text-4xl">
                Trusted by Families &amp; Businesses in Mirzapur
              </h2>
              <div className="mt-3 flex items-center gap-2 text-sm font-semibold text-stone-800 tabular-nums dark:text-stone-200">
                <Star className="h-4 w-4 fill-amber-500 text-amber-500" />
                <span>4.9 Average Rating · 148 Local Events Reviewed</span>
              </div>
            </div>

            {/* Slider Controls */}
            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous client review"
                className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-stone-300 bg-white text-stone-800 transition-colors hover:border-amber-700 hover:text-amber-700 dark:border-zinc-700 dark:bg-[#0B0B0D] dark:text-stone-200 dark:hover:border-amber-500 dark:hover:text-amber-400"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                aria-label="Next client review"
                className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-stone-300 bg-white text-stone-800 transition-colors hover:border-amber-700 hover:text-amber-700 dark:border-zinc-700 dark:bg-[#0B0B0D] dark:text-stone-200 dark:hover:border-amber-500 dark:hover:text-amber-400"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Slider Track (1 card on mobile, 2 cards side-by-side on desktop) */}
          <div className="mt-10 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSlide}
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                className="grid grid-cols-1 gap-6 md:grid-cols-2"
              >
                {[currentReview, secondaryReview].map((review, index) => (
                  <blockquote
                    key={`${review.id}-${index}`}
                    className={`flex flex-col justify-between rounded-2xl border border-stone-200 bg-white p-6 dark:border-zinc-800 dark:bg-[#0B0B0D] sm:p-7 ${
                      index === 1 ? 'hidden md:flex' : 'flex'
                    }`}
                  >
                    <div>
                      <div
                        className="flex items-center gap-1"
                        aria-label={`${review.rating} out of 5 stars`}
                      >
                        {Array.from({ length: review.rating }).map((_, starIdx) => (
                          <Star
                            key={starIdx}
                            className="h-4 w-4 fill-amber-500 text-amber-500"
                          />
                        ))}
                      </div>
                      <p className="mt-4 text-sm leading-relaxed text-stone-700 dark:text-stone-300 sm:text-base">
                        “{review.quote}”
                      </p>
                    </div>

                    <footer className="mt-6 border-t border-stone-100 pt-4 dark:border-zinc-800">
                      <div className="text-sm font-bold text-stone-900 dark:text-stone-100">
                        {review.clientName}
                      </div>
                      <div className="mt-0.5 text-xs text-stone-500 dark:text-stone-400">
                        {review.roleOrEvent} · {review.neighborhood}
                      </div>
                    </footer>
                  </blockquote>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Pagination Dots */}
          <div
            role="tablist"
            aria-label="Select testimonial slide"
            className="mt-7 flex items-center justify-center gap-2"
          >
            {CLIENT_REVIEWS.map((rev, idx) => {
              const active = idx === activeSlide;
              return (
                <button
                  key={rev.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  aria-label={`Show review by ${rev.clientName}`}
                  onClick={() => setActiveSlide(idx)}
                  className={`h-2.5 rounded-full transition-all duration-200 ${
                    active
                      ? 'w-7 bg-amber-700 dark:bg-amber-500'
                      : 'w-2.5 bg-stone-300 hover:bg-stone-400 dark:bg-zinc-700 dark:hover:bg-zinc-600'
                  }`}
                />
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
