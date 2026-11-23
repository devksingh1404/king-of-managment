export type EventCategory =
  | 'All'
  | 'Wedding & Shadi'
  | 'Pooja, Katha & Religious'
  | 'Mundan, Baby & Sanskar'
  | 'Birthday & Anniversary'
  | 'Business & Corporate'
  | 'Cultural, College & Public'
  | 'Decor, Tent & AV Sound'
  | 'Catering & Hospitality';

export type GuestScale = 'All' | 'Intimate' | 'Mid-Scale' | 'Grand Gala';

export interface EventService {
  id: string;
  indexLabel: string;
  title: string;
  category: Exclude<EventCategory, 'All'>;
  scale: Exclude<GuestScale, 'All'>;
  guestRange: string;
  startingPrice: string;
  brief: string;
  keywords: string[];
  image: string;
  deliverables: string[];
  setupLeadTime: string;
}

export interface CaseStudy {
  id: string;
  title: string;
  location: string;
  category: string;
  metric: string;
  summary: string;
  image: string;
  featured?: boolean;
}

export interface ClientReview {
  id: string;
  clientName: string;
  roleOrEvent: string;
  neighborhood: string;
  rating: number;
  quote: string;
}

export interface VendorPartner {
  id: string;
  partnerCode: string;
  businessName: string;
  ownerName: string;
  phone: string;
  trade: string;
  area: string;
  experienceYears: string;
  startingRate: string;
  description: string;
  joinedAt: string;
}

export const BUSINESS_INFO = {
  name: 'King of Management',
  city: 'Mirzapur',
  region: 'Uttar Pradesh',
  address: '2nd Floor, Vindhya Plaza, Station Road, Civil Lines, Mirzapur, UP 231001',
  phoneDisplay: '+91 98390 45120',
  phoneHref: 'tel:+919839045120',
  whatsappNumber: '919839045120',
  whatsappUrl:
    'https://wa.me/919839045120?text=Hello%20King%20of%20Management%2C%20I%20would%20like%20to%20enquire%20about%20booking%20an%20event%20in%20Mirzapur.',
  email: 'bookings@kingofmanagement.in',
  hours: 'Mon – Sun · 9:00 AM – 9:30 PM',
  heroImage: '/src/assets/images/hero_royal_event_1795189292524.jpg',
};

export const EVENT_CATEGORIES: EventCategory[] = [
  'All',
  'Wedding & Shadi',
  'Pooja, Katha & Religious',
  'Mundan, Baby & Sanskar',
  'Birthday & Anniversary',
  'Business & Corporate',
  'Cultural, College & Public',
  'Decor, Tent & AV Sound',
  'Catering & Hospitality',
];

export const SEARCH_SUGGESTIONS: string[] = [
  'Royal Wedding & Shadi',
  'Pooja Path & Satyanarayan Katha',
  'Griha Pravesh Pooja',
  'Mundan Sanskar',
  'Newborn Baby Welcome & Chhathi',
  'Namkaran Ceremony',
  'Godbharai & Baby Shower',
  'Annaprashan Ceremony',
  'Janeu / Upanayan Sanskar',
  'Mata Ki Chowki & Jagran',
  'Bhagwat Katha & Bhandara',
  'Birthday Party & Theme Decor',
  'Wedding Anniversary Gala',
  'Haldi & Mehendi Courtyard',
  'Engagement & Ring Ceremony',
  'Tilak & Sagai Setup',
  'Business & Corporate Party',
  'Showroom & Shop Inauguration',
  'College Fest & Farewell',
  'Kavi Sammelan & Cultural Stage',
  'DJ, Sound & Truss Lighting',
  'German Hanger Waterproof Pandal',
  'Shahi Catering & Halwai',
];

export const GUEST_SCALES: { value: GuestScale; label: string }[] = [
  { value: 'All', label: 'Any Guest Scale' },
  { value: 'Intimate', label: 'Intimate (20–120 Guests)' },
  { value: 'Mid-Scale', label: 'Mid-Scale (120–450 Guests)' },
  { value: 'Grand Gala', label: 'Grand Gala (450+ Guests)' },
];

export const EVENT_SERVICES: EventService[] = [
  {
    id: 'royal-wedding-mandap',
    indexLabel: '01',
    title: 'Royal Wedding & Mandap Production',
    category: 'Wedding & Shadi',
    scale: 'Grand Gala',
    guestRange: '250 – 1,500 Guests',
    startingPrice: '₹1,85,000',
    brief:
      'End-to-end Shadi planning featuring fresh floral mandaps, Varmala stage choreography, Baraat coordination, and guest hospitality.',
    keywords: ['shadi', 'shaadi', 'wedding', 'vivah', 'mandap', 'baraat', 'reception', 'vidaai'],
    image: '/src/assets/images/service_royal_wedding_1795189291955.jpg',
    deliverables: [
      'Custom floral mandap & brass chandelier rigging',
      'Dedicated wedding floor director & hospitality desk',
      'Varmala hydraulic stage & ambient walkway lighting',
      'Vendor coordination across Mirzapur & Vindhyachal lawns',
    ],
    setupLeadTime: '48 hours prior setup',
  },
  {
    id: 'pooja-path-griha-pravesh',
    indexLabel: '02',
    title: 'Pooja Path, Katha & Griha Pravesh',
    category: 'Pooja, Katha & Religious',
    scale: 'Intimate',
    guestRange: '25 – 300 Guests',
    startingPrice: '₹18,500',
    brief:
      'Sacred setups for Satyanarayan Katha, Griha Pravesh, Rudrabhishek, Sundarkand Paath, Havan Kund, marigold toran decor, and Satvik prasad dining.',
    keywords: [
      'pooja',
      'puja',
      'path',
      'paath',
      'katha',
      'satyanarayan',
      'griha pravesh',
      'havan',
      'yagya',
      'sundarkand',
      'rudrabhishek',
      'vastu',
      'pandit',
      'religious',
    ],
    image: '/src/assets/images/service_pooja_katha_1795190051933.jpg',
    deliverables: [
      'Traditional marigold & mango-leaf toran mandapam',
      'Vedic Havan Kund, brass kalash & Pandit Ji seating',
      'Clean gadde-masnad floor seating & acoustic mic setup',
      'Pure Satvik prasad packaging & family bhoj service',
    ],
    setupLeadTime: '6 hours prior setup',
  },
  {
    id: 'newborn-welcome-mundan',
    indexLabel: '03',
    title: 'Baby Welcome, Chhathi, Namkaran & Mundan',
    category: 'Mundan, Baby & Sanskar',
    scale: 'Intimate',
    guestRange: '30 – 250 Guests',
    startingPrice: '₹22,000',
    brief:
      'Complete celebration planning when a newborn arrives — home welcome floral arches, Chhathi, Namkaran cradle styling, Annaprashan, and Vindhyachal Mundan Sanskar.',
    keywords: [
      'baby',
      'newborn',
      'janm',
      'birth',
      'chhathi',
      'barahi',
      'namkaran',
      'naming',
      'mundan',
      'annaprashan',
      'cradle',
      'jhula',
      'sanskar',
      'bachcha',
    ],
    image: '/src/assets/images/service_baby_mundan_1795190051704.jpg',
    deliverables: [
      'Carved wooden cradle jhula & pastel floral home welcome',
      'Vindhyachal / home Mundan Sanskar tent & dhol team',
      'Custom newborn photo backdrop & return gift hampers',
      'Family mithai, snacks & lunch buffet hospitality',
    ],
    setupLeadTime: '6 hours prior setup',
  },
  {
    id: 'theme-birthday-lounge',
    indexLabel: '04',
    title: 'Theme Birthday & Milestone Lounge',
    category: 'Birthday & Anniversary',
    scale: 'Intimate',
    guestRange: '30 – 200 Guests',
    startingPrice: '₹28,000',
    brief:
      'Custom-built photo backdrops, balloon & floral installations, curated dessert counters, and emcee games for kids, 1st birthdays, and 50th milestones.',
    keywords: ['birthday', 'janamdin', '1st birthday', 'cake', 'party', 'milestone', 'balloon'],
    image: '/src/assets/images/service_birthday_party_1795189292458.jpg',
    deliverables: [
      'Bespoke 3D theme backdrop & LED neon name signage',
      'Curated cake table styling & warm tungsten lighting',
      'Interactive host, magician, or acoustic live set',
      'Return gift hamper coordination & guest seating',
    ],
    setupLeadTime: '8 hours prior setup',
  },
  {
    id: 'corporate-summit-gala',
    indexLabel: '05',
    title: 'Corporate Summit & Business Party',
    category: 'Business & Corporate',
    scale: 'Mid-Scale',
    guestRange: '60 – 600 Guests',
    startingPrice: '₹85,000',
    brief:
      'Structured conference staging, LED presentation walls, badge registration desks, and formal gala dining for dealer meets and annual business parties.',
    keywords: ['business', 'corporate', 'conference', 'seminar', 'office', 'gala', 'award', 'meeting'],
    image: '/src/assets/images/service_corporate_gala_1795189291750.jpg',
    deliverables: [
      'Widescreen P3 LED backdrop & lapel/podium audio array',
      'Branded registration counter & executive lounge seating',
      'Multi-course plated or buffet corporate hospitality',
      'On-site AV technician & minute-by-minute run sheet',
    ],
    setupLeadTime: '24 hours prior setup',
  },
  {
    id: 'sangeet-dj-truss',
    indexLabel: '06',
    title: 'Sangeet Night, DJ & Truss Sound',
    category: 'Decor, Tent & AV Sound',
    scale: 'Grand Gala',
    guestRange: '120 – 1,000 Guests',
    startingPrice: '₹35,000',
    brief:
      'Concert-grade line-array audio, intelligent moving-head beam trusses, LED dance floors, and experienced wedding & party DJs.',
    keywords: ['dj', 'sound', 'sangeet', 'dance', 'light', 'truss', 'music', 'cocktail', 'party'],
    image: '/src/assets/images/service_dj_sound_1795189291963.jpg',
    deliverables: [
      'JBL / QSC line-array sound system with subwoofer stack',
      'DMX programmed truss lighting & warm beam washes',
      'Custom DJ console with cold pyro & CO2 confetti cues',
      'Wireless mics for family sangeet performances',
    ],
    setupLeadTime: '12 hours prior setup',
  },
  {
    id: 'shahi-banquet-catering',
    indexLabel: '07',
    title: 'Shahi Banquet & Live Catering',
    category: 'Catering & Hospitality',
    scale: 'Grand Gala',
    guestRange: '100 – 2,000 Guests',
    startingPrice: '₹650 / Plate',
    brief:
      'Hygienic multi-cuisine wedding and party catering with Banarasi & North Indian live chaat counters, brass chafing displays, and uniformed stewards.',
    keywords: ['catering', 'khana', 'food', 'halwai', 'buffet', 'chaat', 'bhoj', 'banquet'],
    image: '/src/assets/images/service_catering_banquet_1795189292605.jpg',
    deliverables: [
      'Custom vegetarian & royal Mughlai menu tasting',
      'Live chaat, tandoor, mocktail & dessert stations',
      'Hammered brass & fine porcelain buffet presentation',
      'FSSAI-compliant kitchen crew & uniformed service staff',
    ],
    setupLeadTime: '24 hours kitchen prep',
  },
  {
    id: 'haldi-mehendi-courtyard',
    indexLabel: '08',
    title: 'Haldi, Mehendi & Tilak Courtyard',
    category: 'Wedding & Shadi',
    scale: 'Mid-Scale',
    guestRange: '50 – 350 Guests',
    startingPrice: '₹42,000',
    brief:
      'Sunlit marigold & floral canopy styling, artisanal cane seating, brass urli installations, dhol players, and Tilak / Sagai ceremony arrangements.',
    keywords: ['haldi', 'mehendi', 'mehndi', 'tilak', 'sagai', 'dhol', 'courtyard', 'marigold'],
    image: '/src/assets/images/service_haldi_mehendi_1795189292344.jpg',
    deliverables: [
      'Fresh genda phool curtains & vibrant draped ceiling',
      'Cane sofa lounges, printed bolsters & low chowkis',
      'Skilled Rajasthani mehendi artists & live dhol team',
      'Refreshing thandai, lassi & welcome snack counter',
    ],
    setupLeadTime: '10 hours prior setup',
  },
  {
    id: 'godbharai-baby-shower',
    indexLabel: '09',
    title: 'Godbharai, Baby Shower & Maternity Decor',
    category: 'Mundan, Baby & Sanskar',
    scale: 'Intimate',
    guestRange: '30 – 180 Guests',
    startingPrice: '₹24,000',
    brief:
      'Warm pastel floral swing backdrops, mother-to-be lounge seating, custom gender-neutral games, and traditional Godbharai ritual setups.',
    keywords: ['godbharai', 'god bharai', 'baby shower', 'maternity', 'pregnant', 'sadh', 'baby'],
    image: '/src/assets/images/service_baby_mundan_1795190051704.jpg',
    deliverables: [
      'Floral jhula / velvet armchair backdrop for mom-to-be',
      'Traditional thali, shagun baskets & custom welcome board',
      'Host-led family games & live acoustic music',
      'High-tea mocktails, sweets & return gift counters',
    ],
    setupLeadTime: '6 hours prior setup',
  },
  {
    id: 'mata-ki-chowki-jagran',
    indexLabel: '10',
    title: 'Mata Ki Chowki, Jagran & Bhajan Sandhya',
    category: 'Pooja, Katha & Religious',
    scale: 'Grand Gala',
    guestRange: '100 – 1,500 Guests',
    startingPrice: '₹45,000',
    brief:
      'Devotional Darbar backdrop with glowing LED lotus mandir, live bhajan mandali, crisp vocal PA sound, and hygienic prasad / phalahar distribution.',
    keywords: ['mata ki chowki', 'jagran', 'bhajan', 'kirtan', 'sai sandhya', 'devi', 'pooja', 'navratri'],
    image: '/src/assets/images/service_pooja_katha_1795190051933.jpg',
    deliverables: [
      'Illuminated Maa Durga / Deity Darbar floral stage',
      'Experienced Bhajan singer mandali & concert sound system',
      'Waterproof pandal seating & carpeted devotee floor',
      'Dedicated prasad & chai-nashta distribution counters',
    ],
    setupLeadTime: '12 hours prior setup',
  },
  {
    id: 'bhagwat-katha-bhandara',
    indexLabel: '11',
    title: 'Shrimad Bhagwat Katha & Maha Bhandara',
    category: 'Pooja, Katha & Religious',
    scale: 'Grand Gala',
    guestRange: '200 – 3,000 Guests',
    startingPrice: '₹1,10,000',
    brief:
      'Seven-day pandal infrastructure, Vyas Peeth stage, live LED broadcast screens, Kalash Yatra coordination, and large-scale community Bhandara kitchens.',
    keywords: ['bhagwat', 'ramayan', 'katha', 'akhand', 'bhandara', 'prasad', 'kalash yatra', 'pooja'],
    image: '/src/assets/images/service_tent_decor_1795189292412.jpg',
    deliverables: [
      'Carved Vyas Peeth stage & clean waterproof pandal hall',
      'Kalash Yatra procession, dhol & floral shower logistics',
      'Outdoor LED screens & multi-zone speech clarity speakers',
      'Hygienic mass Bhandara cooking & serving volunteers',
    ],
    setupLeadTime: '48 hours prior setup',
  },
  {
    id: 'janeu-annaprashan-sanskar',
    indexLabel: '12',
    title: 'Janeu (Upanayan) & Annaprashan Sanskar',
    category: 'Mundan, Baby & Sanskar',
    scale: 'Mid-Scale',
    guestRange: '60 – 400 Guests',
    startingPrice: '₹36,000',
    brief:
      'Authentic Vedic Yagnopaveet (Janeu) and baby’s first rice-ceremony (Annaprashan) decor with traditional banana-leaf torans, Havan mandap, and family feast.',
    keywords: ['janeu', 'upanayan', 'yagnopaveet', 'annaprashan', 'sanskar', 'ritual', 'baby'],
    image: '/src/assets/images/service_pooja_katha_1795190051933.jpg',
    deliverables: [
      'Sacred Havan pavilion with banana & marigold pillars',
      'Traditional silver/brass Annaprashan feeding setup',
      'Shehnai / ceremonial music & family photography',
      'Pure vegetarian Banarasi feast catering',
    ],
    setupLeadTime: '8 hours prior setup',
  },
  {
    id: 'engagement-ring-stage',
    indexLabel: '13',
    title: 'Engagement, Ring Ceremony & Sagai Stage',
    category: 'Wedding & Shadi',
    scale: 'Mid-Scale',
    guestRange: '100 – 500 Guests',
    startingPrice: '₹55,000',
    brief:
      'Romantic pastel floral arches, crystal candle walkways, ring-platter reveal styling, and warm architectural uplighting for indoor banquets.',
    keywords: ['engagement', 'ring ceremony', 'sagai', 'chunni', 'roka', 'couple', 'stage'],
    image: '/src/assets/images/service_engagement_ring_1795189292179.jpg',
    deliverables: [
      'Sculptural rose & hydrangea arch stage backdrop',
      'Crystal pillar candle aisle & velvet couple seating',
      'Ambient background instrumental & spotlighting',
      'Coordinated welcome signage & guest seating plan',
    ],
    setupLeadTime: '14 hours prior setup',
  },
  {
    id: 'german-hanger-pandal',
    indexLabel: '14',
    title: 'German Hanger & Waterproof Pandal',
    category: 'Decor, Tent & AV Sound',
    scale: 'Grand Gala',
    guestRange: '300 – 2,500 Guests',
    startingPrice: '₹95,000',
    brief:
      'All-weather luxury German hanger structures with pleated ivory ceiling drapes, crystal chandeliers, mist cooling or heating, and wooden flooring.',
    keywords: ['tent', 'pandal', 'german hanger', 'waterproof', 'lawn', 'ac tent', 'chandelier'],
    image: '/src/assets/images/service_tent_decor_1795189292412.jpg',
    deliverables: [
      'Weatherproof aluminum-truss German hanger span',
      'Full carpeted or marble-finish modular flooring',
      'Ceiling chandelier arrays & perimeter facade lighting',
      'Tower ACs, mist fans, or outdoor heaters by season',
    ],
    setupLeadTime: '72 hours structural build',
  },
  {
    id: 'showroom-shop-inauguration',
    indexLabel: '15',
    title: 'Showroom, Office & Shop Inauguration',
    category: 'Business & Corporate',
    scale: 'Mid-Scale',
    guestRange: '40 – 350 Guests',
    startingPrice: '₹26,000',
    brief:
      'Grand opening floral facades, red-carpet ribbon cutting pedestals, Ganesh-Lakshmi pooja arrangements, press invite coordination, and high-tea catering.',
    keywords: ['inauguration', 'opening', 'udghatan', 'showroom', 'shop', 'office', 'ribbon', 'launch'],
    image: '/src/assets/images/service_cultural_inauguration_1795190050573.jpg',
    deliverables: [
      'Fresh marigold & rose entrance arch with branded signage',
      'Ribbon cutting pillars, brass deepak & Pooja samagri',
      'VIP guest welcome, dhol & acoustic sound setup',
      'Packaged mithai boxes & corporate high-tea snacks',
    ],
    setupLeadTime: '8 hours prior setup',
  },
  {
    id: 'product-launch-dealer-meet',
    indexLabel: '16',
    title: 'Product Launch & Dealer Meet',
    category: 'Business & Corporate',
    scale: 'Mid-Scale',
    guestRange: '80 – 450 Guests',
    startingPrice: '₹68,000',
    brief:
      'Turnkey carpet & brass expo dealer conventions, branded display booths, product unveil plinths, and press-ready stage backdrops across Eastern UP.',
    keywords: ['product launch', 'dealer meet', 'expo', 'trade show', 'business', 'corporate', 'exhibition'],
    image: '/src/assets/images/service_corporate_gala_1795189291750.jpg',
    deliverables: [
      'Product reveal plinths with dynamic spotlight cues',
      'Branded step-and-repeat media wall & anchor host',
      'High-tea & networking buffet orchestration',
      '4K highlight reel photography & videography team',
    ],
    setupLeadTime: '24 hours prior setup',
  },
  {
    id: 'college-fest-annual-day',
    indexLabel: '17',
    title: 'College Fest, Freshers, Farewell & Annual Day',
    category: 'Cultural, College & Public',
    scale: 'Grand Gala',
    guestRange: '150 – 2,000 Guests',
    startingPrice: '₹65,000',
    brief:
      'High-energy concert stages, DJ/band sound rigs, alumni & farewell photo booths, trophy presentation podiums, and student crowd barricading.',
    keywords: ['college', 'school', 'annual day', 'freshers', 'farewell', 'fest', 'alumni', 'youth'],
    image: '/src/assets/images/service_dj_sound_1795189291963.jpg',
    deliverables: [
      'Concert truss stage with concert line-array sound',
      'Emcee, live band / DJ & stage LED visuals',
      'Red-carpet farewell photo booth & memory wall',
      'Crowd safety marshals & refreshments counter',
    ],
    setupLeadTime: '24 hours prior setup',
  },
  {
    id: 'cultural-kavi-sammelan-mela',
    indexLabel: '18',
    title: 'Kavi Sammelan, Garba Night & Cultural Mela',
    category: 'Cultural, College & Public',
    scale: 'Grand Gala',
    guestRange: '250 – 3,000 Guests',
    startingPrice: '₹78,000',
    brief:
      'Public & community cultural festivals including Kavi Sammelan, Mushaira, Navratri Garba/Dandiya nights, Holi Milan, and Diwali Carnival stalls.',
    keywords: [
      'kavi sammelan',
      'mushaira',
      'garba',
      'dandiya',
      'holi milan',
      'diwali mela',
      'cultural',
      'public',
      'festival',
      'sabha',
    ],
    image: '/src/assets/images/service_cultural_inauguration_1795190050573.jpg',
    deliverables: [
      'Wide elevated stage with green-room & artist hospitality',
      'Exhibition / food stall pagodas with electric drops',
      'Multi-zone public announcement & stage lighting',
      'VIP enclosure seating & generator power backup',
    ],
    setupLeadTime: '36 hours prior setup',
  },
  {
    id: 'kids-carnival-birthday',
    indexLabel: '19',
    title: 'Kids Carnival & Outdoor Lawn Party',
    category: 'Birthday & Anniversary',
    scale: 'Mid-Scale',
    guestRange: '50 – 250 Guests',
    startingPrice: '₹45,000',
    brief:
      'Safe outdoor carnival stalls, inflatable play zones, tattoo & pottery artists, live popcorn/cotton candy carts, and supervised activity hosts.',
    keywords: ['kids', 'carnival', 'children', 'birthday', 'magic', 'games', 'bouncy', 'party'],
    image: '/src/assets/images/service_birthday_party_1795189292458.jpg',
    deliverables: [
      '4–6 interactive carnival game & craft booths',
      'Kids-friendly gourmet snack & mocktail carts',
      'Dedicated safety attendants & shaded family seating',
      'Custom themed cake pedestal & photo corner',
    ],
    setupLeadTime: '10 hours prior setup',
  },
  {
    id: 'anniversary-cocktail-evening',
    indexLabel: '20',
    title: '25th / 50th Anniversary & Private Soiree',
    category: 'Birthday & Anniversary',
    scale: 'Intimate',
    guestRange: '25 – 180 Guests',
    startingPrice: '₹32,000',
    brief:
      'Candlelit rooftop or garden celebrations with live Sufi/acoustic performers, curated mocktail bar, and heirloom family photo gallery walls.',
    keywords: ['anniversary', 'silver jubilee', 'golden jubilee', '25th', '50th', 'cocktail', 'rooftop', 'family'],
    image: '/src/assets/images/service_engagement_ring_1795189292179.jpg',
    deliverables: [
      'Custom family milestone photo timeline installation',
      'Acoustic duo or Sufi band with warm lounge sound',
      'Artisanal mocktail bar & passed hors d’oeuvres',
      'Intimate round-table linen & floral centerpiece styling',
    ],
    setupLeadTime: '8 hours prior setup',
  },
  {
    id: 'jaimala-royal-entry',
    indexLabel: '21',
    title: 'Varmala Stage & Royal Bride-Groom Entry',
    category: 'Wedding & Shadi',
    scale: 'Grand Gala',
    guestRange: '250 – 1,200 Guests',
    startingPrice: '₹48,000',
    brief:
      'Choreographed Varmala entries featuring revolving lotus stages, cold spark fountains, dhol-nagada escorts, and flower-petal shower canopies.',
    keywords: ['varmala', 'jaimala', 'entry', 'bride', 'groom', 'pyro', 'wedding', 'shadi'],
    image: '/src/assets/images/service_royal_wedding_1795189291955.jpg',
    deliverables: [
      'Motorized revolving or hydraulic Varmala platform',
      'Smokeless cold pyro & dry-ice low-fog atmosphere',
      'Shehnai or royal brass band procession cueing',
      'Synchronized follow-spot lighting for photographers',
    ],
    setupLeadTime: '16 hours prior setup',
  },
  {
    id: 'vip-guest-hospitality',
    indexLabel: '22',
    title: 'VIP Hospitality & Outstation Logistics',
    category: 'Catering & Hospitality',
    scale: 'Mid-Scale',
    guestRange: '40 – 400 Guests',
    startingPrice: '₹38,000',
    brief:
      'Station & Varanasi airport pickups, hotel room welcome hampers, dedicated RSVP desk, and fleet coordination for out-of-town wedding guests.',
    keywords: ['hospitality', 'hotel', 'car', 'fleet', 'pickup', 'vip', 'guest', 'welcome'],
    image: '/src/assets/images/service_catering_banquet_1795189292605.jpg',
    deliverables: [
      'Mirzapur Jn & LBSI Varanasi airport shuttle scheduling',
      '24/7 WhatsApp guest helpdesk & hotel check-in desk',
      'Curated room welcome baskets & itinerary cards',
      'Dedicated fleet marshals at venue parking',
    ],
    setupLeadTime: '7 days advance scheduling',
  },
  {
    id: 'bhandara-prasad-kitchen',
    indexLabel: '23',
    title: 'Bhandara, Langar & Temple Prasad Kitchen',
    category: 'Catering & Hospitality',
    scale: 'Grand Gala',
    guestRange: '200 – 5,000 Guests',
    startingPrice: '₹120 / Thali',
    brief:
      'Pure Sattvic bulk cooking (without onion/garlic), eco-friendly leaf pattals, disciplined queue barricading, and Vindhyachal temple distribution crews.',
    keywords: ['bhandara', 'prasad', 'langar', 'temple', 'vindhyachal', 'satvik', 'feast', 'kitchen'],
    image: '/src/assets/images/service_pooja_katha_1795190051933.jpg',
    deliverables: [
      'Pure desi ghee Sattvic halwa, poori, sabzi & kheer kitchen',
      'Clean steel & biodegradable leaf dining distribution',
      'Drinking water tankers & waste-cleanup crew',
      'Shade canopy & disciplined serving queues',
    ],
    setupLeadTime: '18 hours kitchen prep',
  },
  {
    id: 'led-wall-live-coverage',
    indexLabel: '24',
    title: 'LED Wall, Drone & Cinematic Coverage',
    category: 'Decor, Tent & AV Sound',
    scale: 'Grand Gala',
    guestRange: '100 – 2,000 Guests',
    startingPrice: '₹40,000',
    brief:
      'High-brightness outdoor LED video walls, live multi-camera feed switching, DGCA-compliant drone coverage, and same-day wedding or event highlight edits.',
    keywords: ['led', 'photography', 'videography', 'drone', 'camera', 'prewedding', 'live stream'],
    image: '/src/assets/images/service_dj_sound_1795189291963.jpg',
    deliverables: [
      '8×12 ft or 10×20 ft high-refresh P3 LED display wall',
      'Live multi-cam switching for distant lawn guests',
      'Candid photography, cinematic reel & drone team',
      'Dedicated silent power backup synchronization',
    ],
    setupLeadTime: '12 hours prior setup',
  },
];

export const FEATURED_CASE_STUDIES: CaseStudy[] = [
  {
    id: 'sharma-singhania-wedding',
    title: 'Three-Day Heritage Wedding & German Hanger Reception',
    location: 'Civil Lines Lawn, Mirzapur',
    category: 'Wedding & Shadi',
    metric: '1,100 Guests · Zero Weather Disruption',
    summary:
      'Designed an all-weather 18,000 sq. ft. waterproof German hanger with live Banarasi chaat streets and synchronized Varmala lighting completed 6 hours ahead of Baraat arrival.',
    image: '/src/assets/images/hero_royal_event_1795189292524.jpg',
    featured: true,
  },
  {
    id: 'vindhya-carpet-expo-gala',
    title: 'Mirzapur Carpet Exporters Annual Conclave & Awards',
    location: 'Station Road Banquet, Mirzapur',
    category: 'Business & Corporate',
    metric: '320 Delegates · 100% AV Uptime',
    summary:
      'Full stage fabrication, multilingual presenter audio, branded exhibitor booths, and formal four-course dinner service for regional manufacturers and international buyers.',
    image: '/src/assets/images/service_corporate_gala_1795189291750.jpg',
  },
  {
    id: 'aarav-milestone-birthday',
    title: 'Garden Botanical 50th Jubilee & Acoustic Evening',
    location: 'Vindhyachal Road Estate, Mirzapur',
    category: 'Birthday & Anniversary',
    metric: '180 Guests · 4-Hour Custom Build',
    summary:
      'Transformed a private family garden into a warm tungsten-lit celebration lounge with curated dessert bars, live Sufi music, and instant photo keepsake stations.',
    image: '/src/assets/images/service_birthday_party_1795189292458.jpg',
  },
];

export const CLIENT_REVIEWS: ClientReview[] = [
  {
    id: 'rev-1',
    clientName: 'Rajeshwari Prasad Dubey',
    roleOrEvent: 'Daughter’s Wedding (850 Guests)',
    neighborhood: 'Civil Lines, Mirzapur',
    rating: 5,
    quote:
      'Before hiring King of Management, coordinating caterers, tent walls, and DJ sound across three days felt overwhelming. Their floor team took over every vendor schedule, delivered the mandap four hours early, and handled sudden evening wind without a single hiccup.',
  },
  {
    id: 'rev-2',
    clientName: 'Anurag Kesarwani',
    roleOrEvent: 'Managing Partner, Kesarwani Rugs · Dealer Meet',
    neighborhood: 'Tarkapur, Mirzapur',
    rating: 5,
    quote:
      'Our previous annual dealer meetings struggled with muffled sound and delayed food service. King of Management built a crisp LED stage, managed 280 delegate badges seamlessly, and kept every session on exact clockwork.',
  },
  {
    id: 'rev-3',
    clientName: 'Priya & Vivek Mishra',
    roleOrEvent: 'Newborn Namkaran & 1st Birthday Celebration',
    neighborhood: 'Vindhyachal, Mirzapur',
    rating: 5,
    quote:
      'We booked them for our baby’s Namkaran cradle decor and later for his first birthday. Their team handled both the traditional floral setup and the family dining with warmth, hygiene, and zero last-minute stress.',
  },
  {
    id: 'rev-4',
    clientName: 'Dr. Sandeep Tiwari',
    roleOrEvent: 'Griha Pravesh Pooja & Satyanarayan Katha',
    neighborhood: 'Chunar Road, Mirzapur',
    rating: 5,
    quote:
      'From arranging the marigold mandapam and clean seating for 180 relatives to pure Satvik prasad bhoj, every detail of our Griha Pravesh was managed respectfully and on time.',
  },
];

export const VENDOR_TRADES: string[] = [
  'Tent House & German Hanger',
  'Catering, Halwai & Sweet Maker',
  'Flower & Mandap Decorator',
  'DJ, Truss Sound & LED Wall',
  'Photography, Videography & Drone',
  'Pandit Ji, Katha & Bhajan Mandali',
  'Mehendi, Makeup & Dhol Artists',
  'Lighting, Silent Generator & Mist Fan',
  'Band, Baggi, Horse & VIP Fleet',
  'Custom Cake, Bakery & Return Gifts',
];

export const MIRZAPUR_SERVICE_ZONES: string[] = [
  'Mirzapur City & Civil Lines',
  'Vindhyachal & Astabhuja',
  'Chunar & Ahraura',
  'Kachhwa & Lalganj',
  'All Mirzapur + Varanasi / Sonbhadra',
];

export const INITIAL_VENDORS: VendorPartner[] = [
  {
    id: 'vnd-1',
    partnerCode: 'KOM-MZP-104',
    businessName: 'Vindhya Shahi Tent & Hanger Works',
    ownerName: 'Mahendra Pratap Singh',
    phone: '+91 94152 88310',
    trade: 'Tent House & German Hanger',
    area: 'Mirzapur City & Civil Lines',
    experienceYears: '14 Years',
    startingRate: '₹45,000 / Event',
    description: 'Waterproof German hanger spans, wooden carpeted stages, and crystal chandeliers.',
    joinedAt: 'Verified Partner',
  },
  {
    id: 'vnd-2',
    partnerCode: 'KOM-MZP-118',
    businessName: 'Maa Annapurna Satvik & Shahi Caterers',
    ownerName: 'Rameshwar Halwai',
    phone: '+91 98391 64209',
    trade: 'Catering, Halwai & Sweet Maker',
    area: 'Vindhyachal & Astabhuja',
    experienceYears: '18 Years',
    startingRate: '₹550 / Plate',
    description: 'Wedding multi-cuisine buffets, live Banarasi chaat, and pure Bhandara prasad kitchens.',
    joinedAt: 'Verified Partner',
  },
  {
    id: 'vnd-3',
    partnerCode: 'KOM-MZP-129',
    businessName: 'Kashi-Mirzapur Floral & Mandap Studio',
    ownerName: 'Saurabh Maurya',
    phone: '+91 97934 12045',
    trade: 'Flower & Mandap Decorator',
    area: 'All Mirzapur + Varanasi / Sonbhadra',
    experienceYears: '9 Years',
    startingRate: '₹15,000 / Setup',
    description: 'Fresh marigold, orchid mandaps, newborn welcome arches, and Pooja toran decor.',
    joinedAt: 'Verified Partner',
  },
];
