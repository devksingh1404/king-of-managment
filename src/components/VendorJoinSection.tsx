import { FormEvent, useEffect, useState } from 'react';
import {
  Briefcase,
  CheckCircle2,
  MapPin,
  MessageCircle,
  ShieldCheck,
  UserPlus,
} from 'lucide-react';
import { motion } from 'motion/react';
import {
  BUSINESS_INFO,
  INITIAL_VENDORS,
  MIRZAPUR_SERVICE_ZONES,
  VENDOR_TRADES,
  VendorPartner,
} from '../data/eventsData';

const STORAGE_KEY = 'kom_registered_vendors_v1';

export default function VendorJoinSection() {
  const [vendors, setVendors] = useState<VendorPartner[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as VendorPartner[];
        if (Array.isArray(parsed) && parsed.length > 0) {
          return [...parsed, ...INITIAL_VENDORS];
        }
      }
    } catch {
      // Ignore storage read issues
    }
    return INITIAL_VENDORS;
  });

  const [tradeFilter, setTradeFilter] = useState<string>('All');
  const [businessName, setBusinessName] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [phone, setPhone] = useState('');
  const [trade, setTrade] = useState(VENDOR_TRADES[0]);
  const [area, setArea] = useState(MIRZAPUR_SERVICE_ZONES[0]);
  const [experienceYears, setExperienceYears] = useState('');
  const [description, setDescription] = useState('');
  const [formError, setFormError] = useState('');
  const [createdPartner, setCreatedPartner] = useState<VendorPartner | null>(null);

  useEffect(() => {
    try {
      const customOnly = vendors.filter(
        (v) => !INITIAL_VENDORS.some((init) => init.id === v.id)
      );
      localStorage.setItem(STORAGE_KEY, JSON.stringify(customOnly));
    } catch {
      // Ignore storage write issues
    }
  }, [vendors]);

  const handleRegisterVendor = (e: FormEvent) => {
    e.preventDefault();
    const cleanedPhone = phone.replace(/\D/g, '');
    if (businessName.trim().length < 2) {
      setFormError('Please enter your business or shop name.');
      return;
    }
    if (ownerName.trim().length < 2) {
      setFormError('Please enter the owner or contact person name.');
      return;
    }
    if (cleanedPhone.length < 10) {
      setFormError('Please enter a valid 10-digit WhatsApp or mobile number.');
      return;
    }
    if (description.trim().length < 8) {
      setFormError('Please briefly describe your services or equipment.');
      return;
    }

    setFormError('');
    const randomNum = Math.floor(200 + Math.random() * 799);
    const newVendor: VendorPartner = {
      id: `vnd-user-${Date.now()}`,
      partnerCode: `KOM-MZP-${randomNum}`,
      businessName: businessName.trim(),
      ownerName: ownerName.trim(),
      phone: phone.trim(),
      trade,
      area,
      experienceYears: experienceYears.trim() ? `${experienceYears.trim()} Years` : 'Verified Team',
      startingRate: '',
      description: description.trim(),
      joinedAt: 'Just Joined',
    };

    setVendors((prev) => [newVendor, ...prev]);
    setCreatedPartner(newVendor);
    setTradeFilter('All');
    setBusinessName('');
    setOwnerName('');
    setPhone('');
    setExperienceYears('');
    setDescription('');
  };

  const filteredVendors =
    tradeFilter === 'All' ? vendors : vendors.filter((v) => v.trade === tradeFilter);

  return (
    <section
      id="vendors"
      className="border-t border-stone-200 bg-white dark:border-zinc-800 dark:bg-[#0B0B0D]"
    >
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 'some' }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between"
        >
          <div className="max-w-2xl">
            <p className="text-xs font-semibold tracking-wider text-amber-700 uppercase dark:text-amber-400">
              Vendor Partner Network · Mirzapur
            </p>
            <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-stone-900 text-balance dark:text-stone-100 sm:text-4xl">
              Join King of Management as an Event Vendor
            </h2>
            <p className="mt-3 text-base leading-relaxed text-stone-600 dark:text-stone-300">
              Are you a tent house, halwai/caterer, florist, DJ sound operator, photographer,
              Pandit Ji, or fleet owner in Mirzapur? Register your business to receive direct
              wedding, pooja, birthday, and corporate bookings.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-semibold text-stone-700 dark:text-stone-300">
            <ShieldCheck className="h-4 w-4 text-amber-700 dark:text-amber-400" />
            <span>48-Hour Direct Settlements · Zero Listing Fees</span>
          </div>
        </motion.div>

        <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-start">
          {/* Left: Vendor Join Form (No Rate/Price Fields) */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 'some' }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6"
          >
            <div className="rounded-2xl border border-stone-200 bg-[#FAF9F6] p-6 dark:border-zinc-800 dark:bg-[#141418] sm:p-8">
              {createdPartner ? (
                <div className="py-6 text-center">
                  <CheckCircle2 className="mx-auto h-12 w-12 text-[#15803D] dark:text-emerald-400" />
                  <p className="mt-3 text-xs font-semibold tracking-wider text-amber-700 uppercase tabular-nums dark:text-amber-400">
                    Partner Code: {createdPartner.partnerCode}
                  </p>
                  <h3 className="mt-1 font-display text-2xl font-bold text-stone-900 dark:text-stone-100">
                    Welcome, {createdPartner.businessName}
                  </h3>
                  <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-stone-600 dark:text-stone-300">
                    Your vendor profile under{' '}
                    <span className="font-semibold">{createdPartner.trade}</span> is now listed in
                    our Mirzapur Partner Roster. Complete instant verification on WhatsApp to start
                    receiving event leads.
                  </p>

                  <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                    <a
                      href={`https://wa.me/${BUSINESS_INFO.whatsappNumber}?text=${encodeURIComponent(
                        `Hello King of Management, I registered as a Vendor Partner (${createdPartner.partnerCode}).\nBusiness: ${createdPartner.businessName}\nOwner: ${createdPartner.ownerName}\nTrade: ${createdPartner.trade}\nArea: ${createdPartner.area}\nPhone: ${createdPartner.phone}`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-[#15803D] px-5 text-sm font-semibold text-white transition-colors hover:bg-[#166534]"
                    >
                      <MessageCircle className="h-4 w-4" />
                      Verify on WhatsApp
                    </a>

                    <button
                      type="button"
                      onClick={() => setCreatedPartner(null)}
                      className="inline-flex h-11 items-center justify-center rounded-lg border border-stone-300 bg-white px-5 text-sm font-semibold text-stone-800 transition-colors hover:bg-stone-100 dark:border-zinc-700 dark:bg-zinc-900 dark:text-stone-200 dark:hover:bg-zinc-800"
                    >
                      Register Another Vendor
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleRegisterVendor} noValidate className="space-y-4">
                  <div className="flex items-center gap-2.5">
                    <UserPlus className="h-5 w-5 text-amber-700 dark:text-amber-400" />
                    <h3 className="font-display text-xl font-bold text-stone-900 dark:text-stone-100">
                      Vendor Partner Registration
                    </h3>
                  </div>

                  {formError && (
                    <div
                      role="alert"
                      className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-xs font-medium text-red-800 dark:border-red-900/50 dark:bg-red-950/40 dark:text-red-300"
                    >
                      {formError}
                    </div>
                  )}

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="vendor-business-name"
                        className="block text-xs font-semibold text-stone-700 dark:text-stone-300"
                      >
                        Business / Shop Name *
                      </label>
                      <input
                        id="vendor-business-name"
                        type="text"
                        required
                        value={businessName}
                        onChange={(e) => setBusinessName(e.target.value)}
                        placeholder="e.g., Maa Vindhyavasini Tent House"
                        className="mt-1.5 h-11 w-full rounded-lg border border-stone-300 bg-white px-3.5 text-sm text-stone-900 placeholder:text-stone-400 focus:border-amber-700 focus:outline-none dark:border-zinc-700 dark:bg-zinc-900 dark:text-stone-100 dark:placeholder:text-stone-500 dark:focus:border-amber-500"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="vendor-owner-name"
                        className="block text-xs font-semibold text-stone-700 dark:text-stone-300"
                      >
                        Owner / Contact Name *
                      </label>
                      <input
                        id="vendor-owner-name"
                        type="text"
                        required
                        value={ownerName}
                        onChange={(e) => setOwnerName(e.target.value)}
                        placeholder="e.g., Amit Tiwari"
                        className="mt-1.5 h-11 w-full rounded-lg border border-stone-300 bg-white px-3.5 text-sm text-stone-900 placeholder:text-stone-400 focus:border-amber-700 focus:outline-none dark:border-zinc-700 dark:bg-zinc-900 dark:text-stone-100 dark:placeholder:text-stone-500 dark:focus:border-amber-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="vendor-phone"
                        className="block text-xs font-semibold text-stone-700 dark:text-stone-300"
                      >
                        WhatsApp / Mobile Number *
                      </label>
                      <input
                        id="vendor-phone"
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+91 98390 XXXXX"
                        className="mt-1.5 h-11 w-full rounded-lg border border-stone-300 bg-white px-3.5 text-sm tabular-nums text-stone-900 placeholder:text-stone-400 focus:border-amber-700 focus:outline-none dark:border-zinc-700 dark:bg-zinc-900 dark:text-stone-100 dark:placeholder:text-stone-500 dark:focus:border-amber-500"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="vendor-trade"
                        className="block text-xs font-semibold text-stone-700 dark:text-stone-300"
                      >
                        Vendor Service Category *
                      </label>
                      <select
                        id="vendor-trade"
                        value={trade}
                        onChange={(e) => setTrade(e.target.value)}
                        className="mt-1.5 h-11 w-full rounded-lg border border-stone-300 bg-white px-3 text-sm text-stone-900 focus:border-amber-700 focus:outline-none dark:border-zinc-700 dark:bg-zinc-900 dark:text-stone-100 dark:focus:border-amber-500"
                      >
                        {VENDOR_TRADES.map((item) => (
                          <option key={item} value={item}>
                            {item}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="vendor-area"
                        className="block text-xs font-semibold text-stone-700 dark:text-stone-300"
                      >
                        Service Area
                      </label>
                      <select
                        id="vendor-area"
                        value={area}
                        onChange={(e) => setArea(e.target.value)}
                        className="mt-1.5 h-11 w-full rounded-lg border border-stone-300 bg-white px-3 text-sm text-stone-900 focus:border-amber-700 focus:outline-none dark:border-zinc-700 dark:bg-zinc-900 dark:text-stone-100 dark:focus:border-amber-500"
                      >
                        {MIRZAPUR_SERVICE_ZONES.map((zone) => (
                          <option key={zone} value={zone}>
                            {zone}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="vendor-exp"
                        className="block text-xs font-semibold text-stone-700 dark:text-stone-300"
                      >
                        Experience (Years)
                      </label>
                      <input
                        id="vendor-exp"
                        type="number"
                        min={1}
                        max={60}
                        value={experienceYears}
                        onChange={(e) => setExperienceYears(e.target.value)}
                        placeholder="e.g., 8"
                        className="mt-1.5 h-11 w-full rounded-lg border border-stone-300 bg-white px-3.5 text-sm tabular-nums text-stone-900 placeholder:text-stone-400 focus:border-amber-700 focus:outline-none dark:border-zinc-700 dark:bg-zinc-900 dark:text-stone-100 dark:placeholder:text-stone-500 dark:focus:border-amber-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="vendor-description"
                      className="block text-xs font-semibold text-stone-700 dark:text-stone-300"
                    >
                      Equipment, Team Size &amp; Specialties *
                    </label>
                    <textarea
                      id="vendor-description"
                      rows={3}
                      required
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Describe your tent inventory, sound wattage, catering capacity, pooja expertise, or crew strength..."
                      className="mt-1.5 w-full rounded-lg border border-stone-300 bg-white p-3.5 text-sm text-stone-900 placeholder:text-stone-400 focus:border-amber-700 focus:outline-none dark:border-zinc-700 dark:bg-zinc-900 dark:text-stone-100 dark:placeholder:text-stone-500 dark:focus:border-amber-500"
                    />
                  </div>

                  <button
                    type="submit"
                    className="inline-flex h-12 w-full items-center justify-center rounded-xl bg-stone-900 px-6 text-sm font-semibold text-white transition-colors hover:bg-stone-800 dark:bg-amber-500 dark:text-zinc-950 dark:hover:bg-amber-400"
                  >
                    Join Vendor Partner Network
                  </button>
                </form>
              )}
            </div>
          </motion.div>

          {/* Right: Live Active Partner Roster (No Prices) */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 'some' }}
            transition={{ duration: 0.35, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6"
          >
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="font-display text-xl font-bold text-stone-900 dark:text-stone-100">
                  Active Mirzapur Partner Roster
                </h3>
                <p className="text-xs text-stone-500 tabular-nums dark:text-stone-400">
                  {filteredVendors.length} active partner{filteredVendors.length === 1 ? '' : 's'}
                </p>
              </div>

              <div className="sm:w-64">
                <label htmlFor="vendor-roster-filter" className="sr-only">
                  Filter registered vendors by trade
                </label>
                <select
                  id="vendor-roster-filter"
                  value={tradeFilter}
                  onChange={(e) => setTradeFilter(e.target.value)}
                  className="h-10 w-full rounded-lg border border-stone-200 bg-[#FAF9F6] px-3 text-xs font-medium text-stone-800 focus:border-amber-700 focus:outline-none dark:border-zinc-800 dark:bg-zinc-900 dark:text-stone-200 dark:focus:border-amber-500"
                >
                  <option value="All">All Vendor Trades</option>
                  {VENDOR_TRADES.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mt-5 space-y-4">
              {filteredVendors.length === 0 ? (
                <div className="rounded-xl border border-stone-200 bg-[#FAF9F6] p-6 text-center text-sm text-stone-600 dark:border-zinc-800 dark:bg-[#141418] dark:text-stone-400">
                  No registered vendors in this category yet. Submit the form to be the first partner
                  in {tradeFilter}!
                </div>
              ) : (
                filteredVendors.slice(0, 5).map((vendor) => (
                  <article
                    key={vendor.id}
                    className="rounded-xl border border-stone-200 bg-[#FAF9F6] p-5 transition-colors dark:border-zinc-800 dark:bg-[#141418]"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-stone-500 dark:text-stone-400">
                      <span className="font-semibold text-amber-700 dark:text-amber-400">
                        {vendor.trade}
                      </span>
                      <span className="tabular-nums">
                        {vendor.partnerCode} · {vendor.joinedAt}
                      </span>
                    </div>

                    <h4 className="mt-1.5 text-base font-bold text-stone-900 dark:text-stone-100">
                      {vendor.businessName}
                    </h4>

                    <p className="mt-1.5 text-sm leading-relaxed text-stone-600 dark:text-stone-300">
                      {vendor.description}
                    </p>

                    <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-stone-200/80 pt-3 text-xs text-stone-600 dark:border-zinc-800 dark:text-stone-400">
                      <span className="inline-flex items-center gap-1.5">
                        <MapPin className="h-3.5 w-3.5 text-stone-400" />
                        {vendor.area}
                      </span>
                      <span className="inline-flex items-center gap-1.5 tabular-nums">
                        <Briefcase className="h-3.5 w-3.5 text-stone-400" />
                        {vendor.experienceYears}
                      </span>
                    </div>
                  </article>
                ))
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
