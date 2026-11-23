import { useEffect, useState, FormEvent } from 'react';
import {
  Cloud,
  CloudDrizzle,
  CloudFog,
  CloudLightning,
  CloudRain,
  CloudSnow,
  Compass,
  Droplets,
  Loader2,
  MapPin,
  Search,
  Sun,
  Wind,
  X,
} from 'lucide-react';

export interface WeatherState {
  city: string;
  region: string;
  temperature: number;
  feelsLike: number;
  humidity: number;
  windSpeed: number;
  weatherCode: number;
  conditionLabel: string;
  advisory: string;
  source: 'gps' | 'search' | 'default';
}

interface GeocodingResult {
  id: number;
  name: string;
  admin1?: string;
  country?: string;
  latitude: number;
  longitude: number;
}

interface LocationWeatherModalProps {
  isOpen: boolean;
  onClose: () => void;
  weather: WeatherState | null;
  onWeatherUpdate: (next: WeatherState) => void;
}

const QUICK_CITIES = [
  { name: 'Mirzapur', region: 'Uttar Pradesh', lat: 25.1337, lon: 82.5644 },
  { name: 'Varanasi', region: 'Uttar Pradesh', lat: 25.3176, lon: 82.9739 },
  { name: 'Prayagraj', region: 'Uttar Pradesh', lat: 25.4358, lon: 81.8463 },
  { name: 'Lucknow', region: 'Uttar Pradesh', lat: 26.8467, lon: 80.9462 },
];

function interpretWeatherCode(code: number, temp: number): { label: string; advisory: string } {
  if (code === 0) {
    return {
      label: 'Clear Sky',
      advisory:
        temp >= 32
          ? 'Warm clear weather — ideal for evening garden receptions with mist fans or AC German hangers.'
          : 'Crisp clear sky — ideal conditions for open-air Mandap, Haldi courtyard, and rooftop parties.',
    };
  }
  if (code >= 1 && code <= 3) {
    return {
      label: 'Partly Cloudy',
      advisory:
        'Comfortable sky cover — great for daytime outdoor Baraat processions, lawn dining, and stage photography.',
    };
  }
  if (code === 45 || code === 48) {
    return {
      label: 'Misty / Foggy',
      advisory:
        'Low visibility mist — we recommend enclosed chandelier pandals, warm patio heaters, and high-lumen walkway lights.',
    };
  }
  if ((code >= 51 && code <= 67) || (code >= 80 && code <= 82)) {
    return {
      label: 'Rain / Showers',
      advisory:
        'Rain detected — book our waterproof German Hanger Pandal with elevated wooden flooring for zero disruption.',
    };
  }
  if (code >= 71 && code <= 77) {
    return {
      label: 'Cold / Snow',
      advisory: 'Chilly weather — indoor heated banquet halls and hot beverage stations recommended.',
    };
  }
  if (code >= 95) {
    return {
      label: 'Thunderstorm',
      advisory:
        'Storm alert — shift to indoor banquet halls or reinforced waterproof structures with silent power backup.',
    };
  }
  return {
    label: 'Pleasant',
    advisory: 'Balanced weather — suitable for both indoor banquet halls and decorated outdoor lawns.',
  };
}

function WeatherIcon({ code, className }: { code: number; className?: string }) {
  if (code === 0) return <Sun className={className} />;
  if (code >= 1 && code <= 3) return <Cloud className={className} />;
  if (code === 45 || code === 48) return <CloudFog className={className} />;
  if (code >= 51 && code <= 57) return <CloudDrizzle className={className} />;
  if ((code >= 61 && code <= 67) || (code >= 80 && code <= 82)) return <CloudRain className={className} />;
  if (code >= 71 && code <= 77) return <CloudSnow className={className} />;
  if (code >= 95) return <CloudLightning className={className} />;
  return <Sun className={className} />;
}

export default function LocationWeatherModal({
  isOpen,
  onClose,
  weather,
  onWeatherUpdate,
}: LocationWeatherModalProps) {
  const [statusMessage, setStatusMessage] = useState<string>('Detecting your location for live weather...');
  const [loading, setLoading] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchResults, setSearchResults] = useState<GeocodingResult[]>([]);
  const [searchError, setSearchError] = useState<string>('');
  const [searching, setSearching] = useState<boolean>(false);

  const fetchWeatherForCoords = async (
    lat: number,
    lon: number,
    cityLabel: string,
    regionLabel: string,
    source: WeatherState['source']
  ) => {
    setLoading(true);
    try {
      const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m&timezone=auto`;
      const res = await fetch(url);
      if (!res.ok) throw new Error('Weather service unavailable');
      const data = await res.json();
      const current = data.current;
      const temp = Math.round(current.temperature_2m);
      const code = Number(current.weather_code ?? 0);
      const interpreted = interpretWeatherCode(code, temp);

      onWeatherUpdate({
        city: cityLabel,
        region: regionLabel,
        temperature: temp,
        feelsLike: Math.round(current.apparent_temperature),
        humidity: Math.round(current.relative_humidity_2m),
        windSpeed: Math.round(current.wind_speed_10m),
        weatherCode: code,
        conditionLabel: interpreted.label,
        advisory: interpreted.advisory,
        source,
      });
      setStatusMessage(
        source === 'gps'
          ? `Live weather synced for your current location (${cityLabel}).`
          : source === 'search'
          ? `Showing live weather for ${cityLabel}.`
          : `Showing live Mirzapur weather. Allow GPS or search your city below.`
      );
    } catch {
      setStatusMessage('Could not reach live weather right now. You can continue or try searching again.');
    } finally {
      setLoading(false);
    }
  };

  const detectCurrentLocation = () => {
    if (!('geolocation' in navigator)) {
      setStatusMessage('Geolocation is not supported in this browser. Showing Mirzapur weather.');
      fetchWeatherForCoords(25.1337, 82.5644, 'Mirzapur', 'Uttar Pradesh', 'default');
      return;
    }

    setLoading(true);
    setStatusMessage('Requesting location permission to personalize your event weather...');

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        let resolvedCity = 'Your Location';
        let resolvedRegion = 'India';
        try {
          const geoRes = await fetch(
            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
          );
          if (geoRes.ok) {
            const geoData = await geoRes.json();
            resolvedCity =
              geoData.city || geoData.locality || geoData.principalSubdivision || 'Your Location';
            resolvedRegion = geoData.principalSubdivision || geoData.countryName || '';
          }
        } catch {
          // Reverse geocode fallback handled cleanly
        }
        await fetchWeatherForCoords(latitude, longitude, resolvedCity, resolvedRegion, 'gps');
      },
      () => {
        setStatusMessage(
          'Location permission declined — showing live Mirzapur weather. Search any city manually below.'
        );
        fetchWeatherForCoords(25.1337, 82.5644, 'Mirzapur', 'Uttar Pradesh', 'default');
      },
      { enableHighAccuracy: false, timeout: 7000, maximumAge: 300000 }
    );
  };

  // Trigger automatic location detection immediately when page loads
  useEffect(() => {
    if (!weather) {
      detectCurrentLocation();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen, onClose]);

  const handleManualSearch = async (e: FormEvent) => {
    e.preventDefault();
    const trimmed = searchQuery.trim();
    if (!trimmed) {
      setSearchError('Please enter a city name to search.');
      return;
    }
    setSearchError('');
    setSearching(true);
    try {
      const res = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(trimmed)}&count=5&language=en&format=json`
      );
      if (!res.ok) throw new Error('Search failed');
      const data = await res.json();
      const results: GeocodingResult[] = data.results || [];
      if (results.length === 0) {
        setSearchResults([]);
        setSearchError(`No matching location found for "${trimmed}". Try Mirzapur, Varanasi, or Delhi.`);
      } else {
        setSearchResults(results);
        // Automatically select the top match for immediate feedback
        const top = results[0];
        await fetchWeatherForCoords(
          top.latitude,
          top.longitude,
          top.name,
          top.admin1 || top.country || '',
          'search'
        );
      }
    } catch {
      setSearchError('Unable to search locations right now. Please try a quick city below.');
    } finally {
      setSearching(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="location-weather-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/65 p-4 backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-stone-200 bg-[#FAF9F6] p-6 shadow-2xl dark:border-zinc-800 dark:bg-[#141418] sm:p-7">
        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close location and weather popup"
          className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-lg text-stone-500 transition-colors hover:bg-stone-200/70 hover:text-stone-900 dark:text-stone-400 dark:hover:bg-zinc-800 dark:hover:text-stone-100"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="pr-8">
          <p className="text-xs font-medium tracking-wide text-amber-700 dark:text-amber-400">
            King of Management · Mirzapur Event Weather Desk
          </p>
          <h2
            id="location-weather-title"
            className="mt-1 font-display text-2xl font-bold tracking-tight text-stone-900 dark:text-stone-100"
          >
            Live Location &amp; Event Weather
          </h2>
          <p className="mt-1.5 text-sm text-stone-600 dark:text-stone-400">{statusMessage}</p>
        </div>

        {/* Manual location search bar */}
        <form onSubmit={handleManualSearch} className="mt-5">
          <label htmlFor="manual-location-input" className="sr-only">
            Search city or location manually
          </label>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
              <input
                id="manual-location-input"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Enter city (e.g., Mirzapur, Varanasi, Lucknow)"
                className="h-11 w-full rounded-lg border border-stone-300 bg-white pl-10 pr-3 text-sm text-stone-900 placeholder:text-stone-400 focus:border-amber-700 focus:outline-none dark:border-zinc-700 dark:bg-zinc-900 dark:text-stone-100 dark:placeholder:text-stone-500 dark:focus:border-amber-500"
              />
            </div>
            <button
              type="submit"
              disabled={searching}
              className="inline-flex h-11 items-center justify-center rounded-lg bg-stone-900 px-4 text-sm font-semibold text-white whitespace-nowrap shrink-0 transition-colors hover:bg-stone-800 disabled:opacity-60 dark:bg-amber-500 dark:text-zinc-950 dark:hover:bg-amber-400"
            >
              {searching ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Check'}
            </button>
          </div>
          {searchError && (
            <p className="mt-2 text-xs text-red-600 dark:text-red-400">{searchError}</p>
          )}
        </form>

        {/* Search result suggestions if multiple */}
        {searchResults.length > 1 && (
          <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
            <span className="text-stone-500 dark:text-stone-400">Matches:</span>
            {searchResults.slice(0, 4).map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() =>
                  fetchWeatherForCoords(
                    item.latitude,
                    item.longitude,
                    item.name,
                    item.admin1 || item.country || '',
                    'search'
                  )
                }
                className="rounded-md border border-stone-200 bg-white px-2.5 py-1 font-medium text-stone-700 transition-colors hover:border-amber-600 hover:text-amber-700 dark:border-zinc-700 dark:bg-zinc-900 dark:text-stone-300 dark:hover:border-amber-500 dark:hover:text-amber-400"
              >
                {item.name}
                {item.admin1 ? `, ${item.admin1}` : ''}
              </button>
            ))}
          </div>
        )}

        {/* Quick city buttons + Detect GPS button */}
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={detectCurrentLocation}
            className="inline-flex items-center gap-1.5 rounded-md border border-amber-700/30 bg-amber-50 px-2.5 py-1.5 text-xs font-semibold text-amber-800 transition-colors hover:bg-amber-100 dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-300 dark:hover:bg-amber-500/20"
          >
            <Compass className="h-3.5 w-3.5" />
            Use My GPS
          </button>
          {QUICK_CITIES.map((c) => (
            <button
              key={c.name}
              type="button"
              onClick={() => fetchWeatherForCoords(c.lat, c.lon, c.name, c.region, 'search')}
              className="rounded-md border border-stone-200 bg-white px-2.5 py-1.5 text-xs font-medium text-stone-700 transition-colors hover:border-stone-400 dark:border-zinc-800 dark:bg-zinc-900 dark:text-stone-300 dark:hover:border-zinc-600"
            >
              {c.name}
            </button>
          ))}
        </div>

        {/* Live Weather Display Card */}
        <div className="mt-5 rounded-xl border border-stone-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900/90">
          {loading ? (
            <div className="flex items-center justify-center gap-3 py-6 text-sm text-stone-600 dark:text-stone-300">
              <Loader2 className="h-5 w-5 animate-spin text-amber-700 dark:text-amber-400" />
              <span>Fetching live weather forecast...</span>
            </div>
          ) : weather ? (
            <div>
              <div className="flex items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-1.5 text-sm font-semibold text-stone-900 dark:text-stone-100">
                    <MapPin className="h-4 w-4 text-amber-700 dark:text-amber-400" />
                    <span>
                      {weather.city}
                      {weather.region ? `, ${weather.region}` : ''}
                    </span>
                  </div>
                  <p className="mt-0.5 text-xs text-stone-500 dark:text-stone-400">
                    {weather.conditionLabel} · Feels like {weather.feelsLike}°C
                  </p>
                </div>

                <div className="flex items-center gap-2.5">
                  <WeatherIcon
                    code={weather.weatherCode}
                    className="h-8 w-8 text-amber-700 dark:text-amber-400"
                  />
                  <span className="text-3xl font-bold tabular-nums text-stone-900 dark:text-stone-100">
                    {weather.temperature}°C
                  </span>
                </div>
              </div>

              <div className="mt-3 flex items-center gap-5 border-t border-stone-100 pt-3 text-xs text-stone-600 tabular-nums dark:border-zinc-800 dark:text-stone-300">
                <span className="inline-flex items-center gap-1.5">
                  <Droplets className="h-3.5 w-3.5 text-stone-400" />
                  Humidity {weather.humidity}%
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Wind className="h-3.5 w-3.5 text-stone-400" />
                  Wind {weather.windSpeed} km/h
                </span>
              </div>

              <p className="mt-3 rounded-lg bg-stone-50 p-3 text-xs leading-relaxed text-stone-700 dark:bg-zinc-950 dark:text-stone-300">
                <strong className="font-semibold text-stone-900 dark:text-stone-100">
                  Event Planning Tip:{' '}
                </strong>
                {weather.advisory}
              </p>
            </div>
          ) : (
            <div className="py-4 text-center text-sm text-stone-500 dark:text-stone-400">
              Search a city above or enable GPS to view live event weather.
            </div>
          )}
        </div>

        <div className="mt-5 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-11 items-center justify-center rounded-lg bg-amber-700 px-5 text-sm font-semibold text-white transition-colors hover:bg-amber-800 dark:bg-amber-500 dark:text-zinc-950 dark:hover:bg-amber-400"
          >
            Continue to King of Management
          </button>
        </div>
      </div>
    </div>
  );
}
