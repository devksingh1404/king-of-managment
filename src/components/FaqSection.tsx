import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';

interface FaqItem {
  question: string;
  answer: string;
}

const FAQ_ITEMS: FaqItem[] = [
  {
    question: 'What types of events does King of Management handle in Mirzapur?',
    answer:
      'We manage every family, religious, and corporate occasion — including Shadi & Reception, Haldi/Mehendi, Engagement, Pooja Path, Satyanarayan Katha, Griha Pravesh, Mata Ki Chowki, Newborn Baby Welcome & Chhathi, Namkaran, Mundan Sanskar, Godbharai, Theme Birthdays, Anniversaries, Showroom Inaugurations, College Fests, and Business Conferences.',
  },
  {
    question: 'Can we book individual services like only Catering, DJ Sound, or Mandap Decor?',
    answer:
      'Yes. You can book a complete end-to-end event package or select standalone services such as Shahi Catering, German Hanger Pandal, Floral Mandap Decor, Truss DJ Sound, LED Walls, or Pandit & Pooja Setup. Request a custom quote and we tailor the crew to your exact requirement.',
  },
  {
    question: 'How do you handle sudden rain, summer heat, or winter cold for outdoor lawns?',
    answer:
      'Our Mirzapur inventory includes waterproof aluminum-truss German Hanger structures with elevated wooden carpeted flooring, mist fans and tower ACs for summer evenings, and patio heaters with enclosed side-wall drapes for winter weddings and Bhagwat Kathas.',
  },
  {
    question: 'Which locations outside Mirzapur city do your teams serve?',
    answer:
      'Our primary operations hub is in Civil Lines, Mirzapur, and our teams regularly execute events across Vindhyachal, Chunar, Ahraura, Kachhwa, Lalganj, Robertsganj (Sonbhadra), Prayagraj highway lawns, and Varanasi.',
  },
  {
    question: 'How early should we confirm our event date?',
    answer:
      'For peak wedding (Lagan) dates and large Bhagwat Katha pandals, we recommend booking 3 to 6 weeks in advance. For Pooja Path, Griha Pravesh, Baby Welcome, Mundan, or Birthday setups, our local team can mobilize complete arrangements with 48 to 72 hours notice.',
  },
  {
    question: 'How can local Mirzapur vendors join King of Management?',
    answer:
      'Tent houses, caterers/halwais, florists, DJ/sound operators, photographers, Pandit Ji mandals, and fleet owners can register directly in our Vendor Partner Network section above. Once verified via WhatsApp, we connect your team to active client bookings with 48-hour settlements.',
  },
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section
      id="faq"
      className="border-t border-stone-200 bg-[#F3F1EC] dark:border-zinc-800 dark:bg-[#141418]"
    >
      <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 'some' }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="text-center"
        >
          <p className="text-xs font-semibold tracking-wider text-amber-700 uppercase dark:text-amber-400">
            Frequently Asked Questions
          </p>
          <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-stone-900 text-balance dark:text-stone-100 sm:text-4xl">
            Everything You Need to Know Before Booking
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-base leading-relaxed text-stone-600 dark:text-stone-300">
            Clear answers on booking timelines, weather-proof structures, custom packages, and
            vendor onboarding in Mirzapur.
          </p>
        </motion.div>

        <div className="mt-10 divide-y divide-stone-200 overflow-hidden rounded-2xl border border-stone-200 bg-white dark:divide-zinc-800 dark:border-zinc-800 dark:bg-[#0B0B0D]">
          {FAQ_ITEMS.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div key={item.question}>
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-stone-50 dark:hover:bg-zinc-900/60 sm:px-6 sm:py-5"
                >
                  <span className="text-sm font-semibold text-stone-900 dark:text-stone-100 sm:text-base">
                    {item.question}
                  </span>
                  <ChevronDown
                    className={`h-5 w-5 shrink-0 text-amber-700 transition-transform duration-200 dark:text-amber-400 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                      className="px-5 pb-5 text-sm leading-relaxed text-stone-600 dark:text-stone-300 sm:px-6"
                    >
                      {item.answer}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
