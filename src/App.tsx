import { useEffect, useMemo, useState } from 'react';
import { MotionConfig } from 'motion/react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import ServicesSection from './components/ServicesSection';
import ShowcaseAndReviews from './components/ShowcaseAndReviews';
import VendorJoinSection from './components/VendorJoinSection';
import FaqSection from './components/FaqSection';
import ContactAndSocial from './components/ContactAndSocial';
import Footer from './components/Footer';
import FloatingContactButton from './components/FloatingContactButton';
import LocationWeatherModal, { WeatherState } from './components/LocationWeatherModal';
import {
  EVENT_SERVICES,
  EventCategory,
  GuestScale,
} from './data/eventsData';

export default function App() {
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof document !== 'undefined') {
      return document.documentElement.classList.contains('dark');
    }
    return false;
  });

  // Page-load location & live weather modal state (opens immediately on load as requested)
  const [weatherModalOpen, setWeatherModalOpen] = useState<boolean>(true);
  const [weather, setWeather] = useState<WeatherState | null>(null);

  // Hero & Services filter state
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<EventCategory>('All');
  const [selectedScale, setSelectedScale] = useState<GuestScale>('All');

  // Booking form pre-selected service
  const [preselectedService, setPreselectedService] = useState<string>('');

  // Sync dark class on <html>
  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    try {
      localStorage.setItem('kom_theme', isDark ? 'dark' : 'light');
    } catch {
      // Ignore storage failures in restricted contexts
    }
  }, [isDark]);

  const filteredServices = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return EVENT_SERVICES.filter((svc) => {
      const matchesCategory =
        selectedCategory === 'All' || svc.category === selectedCategory;
      const matchesScale = selectedScale === 'All' || svc.scale === selectedScale;
      const matchesQuery =
        !query ||
        svc.title.toLowerCase().includes(query) ||
        svc.category.toLowerCase().includes(query) ||
        svc.brief.toLowerCase().includes(query) ||
        svc.keywords.some((kw) => kw.toLowerCase().includes(query)) ||
        svc.deliverables.some((d) => d.toLowerCase().includes(query));
      return matchesCategory && matchesScale && matchesQuery;
    });
  }, [searchQuery, selectedCategory, selectedScale]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectServiceForBooking = (serviceTitle: string) => {
    setPreselectedService(serviceTitle);
    scrollToSection('contact');
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSelectedScale('All');
  };

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen overflow-x-hidden bg-[#FAF9F6] text-[#141413] transition-colors dark:bg-[#0B0B0D] dark:text-[#F5F4F0]">
        <Header onBookClick={() => scrollToSection('contact')} />

        <main>
          <HeroSection
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            selectedScale={selectedScale}
            onScaleChange={setSelectedScale}
            onSearchSubmit={() => scrollToSection('services')}
            isDark={isDark}
            onToggleTheme={() => setIsDark((prev) => !prev)}
            weather={weather}
            onOpenWeatherModal={() => setWeatherModalOpen(true)}
          />

          <ServicesSection
            services={filteredServices}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            selectedScale={selectedScale}
            searchQuery={searchQuery}
            onResetFilters={handleResetFilters}
            onSelectServiceForBooking={handleSelectServiceForBooking}
          />

          <ShowcaseAndReviews />

          <VendorJoinSection />

          <FaqSection />

          <ContactAndSocial preselectedService={preselectedService} />
        </main>

        <Footer
          onSelectCategory={setSelectedCategory}
          isDark={isDark}
          onToggleTheme={() => setIsDark((prev) => !prev)}
        />

        <FloatingContactButton onBookClick={() => scrollToSection('contact')} />

        <LocationWeatherModal
          isOpen={weatherModalOpen}
          onClose={() => setWeatherModalOpen(false)}
          weather={weather}
          onWeatherUpdate={setWeather}
        />
      </div>
    </MotionConfig>
  );
}
