import { useState } from 'react';
import { CalendarCheck, MessageCircle, Phone, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { BUSINESS_INFO } from '../data/eventsData';

interface FloatingContactButtonProps {
  onBookClick: () => void;
}

export default function FloatingContactButton({ onBookClick }: FloatingContactButtonProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-2.5">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.96 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-end gap-2"
          >
            <a
              href={BUSINESS_INFO.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-11 items-center gap-2 rounded-full bg-[#15803D] px-4 text-xs font-semibold text-white shadow-lg transition-transform hover:scale-103 hover:bg-[#166534]"
            >
              <MessageCircle className="h-4 w-4" />
              <span>WhatsApp Chat</span>
            </a>

            <a
              href={BUSINESS_INFO.phoneHref}
              className="inline-flex h-11 items-center gap-2 rounded-full bg-stone-900 px-4 text-xs font-semibold text-white shadow-lg transition-transform hover:scale-103 hover:bg-stone-800 dark:bg-stone-100 dark:text-zinc-950"
            >
              <Phone className="h-4 w-4 text-amber-400 dark:text-amber-700" />
              <span className="tabular-nums">Call {BUSINESS_INFO.phoneDisplay}</span>
            </a>

            <button
              type="button"
              onClick={() => {
                setOpen(false);
                onBookClick();
              }}
              className="inline-flex h-11 items-center gap-2 rounded-full border border-stone-200 bg-white px-4 text-xs font-semibold text-stone-900 shadow-lg transition-transform hover:scale-103 dark:border-zinc-700 dark:bg-zinc-900 dark:text-stone-100"
            >
              <CalendarCheck className="h-4 w-4 text-amber-700 dark:text-amber-400" />
              <span>Book Event Quote</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-label={open ? 'Close quick contact menu' : 'Open quick contact options'}
        aria-expanded={open}
        className="inline-flex h-12 items-center gap-2 rounded-full bg-amber-700 px-4 text-sm font-semibold text-white shadow-xl transition-transform hover:scale-103 hover:bg-amber-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-700 dark:bg-amber-500 dark:text-zinc-950 dark:hover:bg-amber-400"
      >
        {open ? (
          <>
            <X className="h-4 w-4" />
            <span>Close</span>
          </>
        ) : (
          <>
            <MessageCircle className="h-4 w-4" />
            <span>Contact Us</span>
          </>
        )}
      </button>
    </div>
  );
}
