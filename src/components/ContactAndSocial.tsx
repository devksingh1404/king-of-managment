import { FormEvent, useEffect, useState } from 'react';
import {
  CheckCircle2,
  Clock,
  Facebook,
  Instagram,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Youtube,
} from 'lucide-react';
import { motion } from 'motion/react';
import { BUSINESS_INFO, EVENT_SERVICES } from '../data/eventsData';

interface ContactAndSocialProps {
  preselectedService: string;
}

export default function ContactAndSocial({ preselectedService }: ContactAndSocialProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [eventType, setEventType] = useState(preselectedService || EVENT_SERVICES[0].title);
  const [eventDate, setEventDate] = useState('');
  const [guests, setGuests] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (preselectedService) {
      setEventType(preselectedService);
      setSubmitted(false);
    }
  }, [preselectedService]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const cleanedPhone = phone.replace(/\D/g, '');
    if (name.trim().length < 2) {
      setError('Please enter your full name.');
      return;
    }
    if (cleanedPhone.length < 10) {
      setError('Please enter a valid 10-digit mobile number so our Mirzapur desk can call you.');
      return;
    }
    setError('');
    setSubmitted(true);
  };

  const socialLinks = [
    {
      name: 'Instagram',
      handle: '@kingofmanagement.mzp',
      href: 'https://instagram.com',
      icon: Instagram,
    },
    {
      name: 'Facebook',
      handle: 'King of Management Mirzapur',
      href: 'https://facebook.com',
      icon: Facebook,
    },
    {
      name: 'YouTube',
      handle: 'King of Management Reels',
      href: 'https://youtube.com',
      icon: Youtube,
    },
  ];

  return (
    <section id="contact" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-start">
        {/* Left: Direct Contact, Phone, WhatsApp & Social Channels */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 'some' }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5"
        >
          <p className="text-xs font-semibold tracking-wider text-amber-700 uppercase dark:text-amber-400">
            Book Your Event in Mirzapur
          </p>
          <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-stone-900 text-balance dark:text-stone-100 sm:text-4xl">
            Speak Directly With Our Planning Desk
          </h2>
          <p className="mt-3 text-base leading-relaxed text-stone-600 dark:text-stone-300">
            Share your event date and venue lawn or banquet hall. We provide tailored setup
            proposals within 24 hours with complete clarity.
          </p>

          {/* Trendy Phone & WhatsApp Direct Action Strip */}
          <div className="mt-7 flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
            <a
              href={BUSINESS_INFO.phoneHref}
              className="inline-flex h-12 flex-1 items-center justify-center gap-2.5 rounded-xl bg-stone-900 px-5 text-sm font-semibold text-white whitespace-nowrap transition-colors hover:bg-stone-800 dark:bg-stone-100 dark:text-zinc-950 dark:hover:bg-white"
            >
              <Phone className="h-4 w-4 text-amber-400 dark:text-amber-700" />
              <span className="tabular-nums">{BUSINESS_INFO.phoneDisplay}</span>
            </a>

            <a
              href={BUSINESS_INFO.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 flex-1 items-center justify-center gap-2.5 rounded-xl bg-[#15803D] px-5 text-sm font-semibold text-white whitespace-nowrap transition-colors hover:bg-[#166534]"
            >
              <MessageCircle className="h-4 w-4" />
              <span>Chat on WhatsApp</span>
            </a>
          </div>

          {/* Office & Availability Details */}
          <div className="mt-8 space-y-4 border-t border-stone-200 pt-6 text-sm text-stone-600 dark:border-zinc-800 dark:text-stone-300">
            <div className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-amber-700 dark:text-amber-400" />
              <span>{BUSINESS_INFO.address}</span>
            </div>
            <div className="flex items-center gap-3">
              <Clock className="h-4 w-4 shrink-0 text-amber-700 dark:text-amber-400" />
              <span>{BUSINESS_INFO.hours}</span>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="h-4 w-4 shrink-0 text-amber-700 dark:text-amber-400" />
              <a
                href={`mailto:${BUSINESS_INFO.email}`}
                className="font-medium text-stone-900 hover:text-amber-700 dark:text-stone-100 dark:hover:text-amber-400"
              >
                {BUSINESS_INFO.email}
              </a>
            </div>
          </div>

          {/* Social Media Links Section */}
          <div className="mt-8 border-t border-stone-200 pt-6 dark:border-zinc-800">
            <h3 className="text-sm font-semibold text-stone-900 dark:text-stone-100">
              Follow Our Live Event Reels &amp; Decor Portfolio
            </h3>
            <div className="mt-3 grid grid-cols-1 gap-2.5 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2.5 rounded-xl border border-stone-200 bg-white px-3.5 py-2.5 text-xs font-medium text-stone-700 transition-colors hover:border-amber-700 hover:text-amber-800 dark:border-zinc-800 dark:bg-[#141418] dark:text-stone-200 dark:hover:border-amber-500 dark:hover:text-amber-400"
                  >
                    <Icon className="h-4 w-4 shrink-0 text-amber-700 dark:text-amber-400" />
                    <div className="min-w-0">
                      <div className="font-semibold">{social.name}</div>
                      <div className="truncate text-[11px] text-stone-500 dark:text-stone-400">
                        {social.handle}
                      </div>
                    </div>
                  </a>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* Right: Validated Booking & Quote Form */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 'some' }}
          transition={{ duration: 0.35, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-7"
        >
          <div className="rounded-2xl border border-stone-200 bg-white p-6 dark:border-zinc-800 dark:bg-[#141418] sm:p-8">
            {submitted ? (
              <div className="py-8 text-center">
                <CheckCircle2 className="mx-auto h-12 w-12 text-[#15803D] dark:text-emerald-400" />
                <h3 className="mt-4 font-display text-2xl font-bold text-stone-900 dark:text-stone-100">
                  Inquiry Received for {eventType}
                </h3>
                <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-stone-600 dark:text-stone-300">
                  Thank you, <span className="font-semibold">{name}</span>. Our Mirzapur event
                  coordinator will call <span className="tabular-nums font-semibold">{phone}</span>{' '}
                  shortly with venue availability and custom setup plans.
                </p>
                <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                  <a
                    href={`https://wa.me/${BUSINESS_INFO.whatsappNumber}?text=${encodeURIComponent(
                      `Hi King of Management, I am ${name} (${phone}). I just requested a quote for ${eventType}${
                        eventDate ? ` on ${eventDate}` : ''
                      }.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-[#15803D] px-5 text-sm font-semibold text-white transition-colors hover:bg-[#166534]"
                  >
                    <MessageCircle className="h-4 w-4" />
                    Send Instantly on WhatsApp
                  </a>
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setName('');
                      setPhone('');
                      setMessage('');
                    }}
                    className="inline-flex h-11 items-center justify-center rounded-lg border border-stone-300 px-5 text-sm font-semibold text-stone-800 transition-colors hover:bg-stone-100 dark:border-zinc-700 dark:text-stone-200 dark:hover:bg-zinc-800"
                  >
                    Submit Another Request
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                <div>
                  <h3 className="font-display text-2xl font-bold text-stone-900 dark:text-stone-100">
                    Request Custom Event Quote
                  </h3>
                  <p className="mt-1 text-sm text-stone-500 dark:text-stone-400">
                    Fill in your event details and receive a tailored proposal.
                  </p>
                </div>

                {error && (
                  <div
                    role="alert"
                    className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800 dark:border-red-900/50 dark:bg-red-950/40 dark:text-red-300"
                  >
                    {error}
                  </div>
                )}

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="block text-xs font-semibold text-stone-700 dark:text-stone-300"
                    >
                      Your Full Name *
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g., Rahul Verma"
                      className="mt-1.5 h-11 w-full rounded-lg border border-stone-300 bg-stone-50 px-3.5 text-sm text-stone-900 placeholder:text-stone-400 focus:border-amber-700 focus:bg-white focus:outline-none dark:border-zinc-700 dark:bg-zinc-900 dark:text-stone-100 dark:placeholder:text-stone-500 dark:focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="contact-phone"
                      className="block text-xs font-semibold text-stone-700 dark:text-stone-300"
                    >
                      Mobile / WhatsApp Number *
                    </label>
                    <input
                      id="contact-phone"
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98390 XXXXX"
                      className="mt-1.5 h-11 w-full rounded-lg border border-stone-300 bg-stone-50 px-3.5 text-sm tabular-nums text-stone-900 placeholder:text-stone-400 focus:border-amber-700 focus:bg-white focus:outline-none dark:border-zinc-700 dark:bg-zinc-900 dark:text-stone-100 dark:placeholder:text-stone-500 dark:focus:border-amber-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                  <div className="sm:col-span-1">
                    <label
                      htmlFor="contact-event-type"
                      className="block text-xs font-semibold text-stone-700 dark:text-stone-300"
                    >
                      Service / Event Type
                    </label>
                    <select
                      id="contact-event-type"
                      value={eventType}
                      onChange={(e) => setEventType(e.target.value)}
                      className="mt-1.5 h-11 w-full rounded-lg border border-stone-300 bg-stone-50 px-3 text-sm text-stone-900 focus:border-amber-700 focus:bg-white focus:outline-none dark:border-zinc-700 dark:bg-zinc-900 dark:text-stone-100 dark:focus:border-amber-500"
                    >
                      {EVENT_SERVICES.map((svc) => (
                        <option key={svc.id} value={svc.title}>
                          {svc.title}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="contact-date"
                      className="block text-xs font-semibold text-stone-700 dark:text-stone-300"
                    >
                      Preferred Event Date
                    </label>
                    <input
                      id="contact-date"
                      type="date"
                      value={eventDate}
                      onChange={(e) => setEventDate(e.target.value)}
                      className="mt-1.5 h-11 w-full rounded-lg border border-stone-300 bg-stone-50 px-3.5 text-sm tabular-nums text-stone-900 focus:border-amber-700 focus:bg-white focus:outline-none dark:border-zinc-700 dark:bg-zinc-900 dark:text-stone-100 dark:focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="contact-guests"
                      className="block text-xs font-semibold text-stone-700 dark:text-stone-300"
                    >
                      Expected Guests
                    </label>
                    <input
                      id="contact-guests"
                      type="number"
                      min={10}
                      max={10000}
                      value={guests}
                      onChange={(e) => setGuests(e.target.value)}
                      placeholder="e.g., 350"
                      className="mt-1.5 h-11 w-full rounded-lg border border-stone-300 bg-stone-50 px-3.5 text-sm tabular-nums text-stone-900 placeholder:text-stone-400 focus:border-amber-700 focus:bg-white focus:outline-none dark:border-zinc-700 dark:bg-zinc-900 dark:text-stone-100 dark:placeholder:text-stone-500 dark:focus:border-amber-500"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="contact-message"
                    className="block text-xs font-semibold text-stone-700 dark:text-stone-300"
                  >
                    Venue Location &amp; Special Notes
                  </label>
                  <textarea
                    id="contact-message"
                    rows={3}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Mention venue lawn/hall in Mirzapur, theme preferences, catering needs, or stage requirements..."
                    className="mt-1.5 w-full rounded-lg border border-stone-300 bg-stone-50 p-3.5 text-sm text-stone-900 placeholder:text-stone-400 focus:border-amber-700 focus:bg-white focus:outline-none dark:border-zinc-700 dark:bg-zinc-900 dark:text-stone-100 dark:placeholder:text-stone-500 dark:focus:border-amber-500"
                  />
                </div>

                <button
                  type="submit"
                  className="inline-flex h-12 w-full items-center justify-center rounded-xl bg-amber-700 px-6 text-sm font-semibold text-white transition-colors hover:bg-amber-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-700 dark:bg-amber-500 dark:text-zinc-950 dark:hover:bg-amber-400"
                >
                  Request Free Event Proposal
                </button>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
