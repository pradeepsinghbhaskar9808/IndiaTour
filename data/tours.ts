import { SITE_CONFIG } from "@/data/site";

export interface Tour {
  id: number;
  slug: string;
  title: string;
  location: string;
  country: string;
  nights: number;
  days: number;
  rating: number;
  reviews: number;
  fromPrice: number;
  price: number;
  discount: number;
  featured: boolean;
  image: string;
  gallery: string[];
  departures: string[];
  tag: string;
  duration: string;
  description: string;
  highlights: string[];
  itinerary: { day: string; title: string; description: string }[];
  included: string[];
  notIncluded: string[];
  info: {
    groupSize: string;
    accommodation: string;
    languages: string;
    meetingPoint: string;
    transportation: string;
    cancellation: string;
    guide: string;
    minAge: string;
    meals: string;
    departureTime: string;
  };
}

export const TOURS: Tour[] = [
  {
    id: 1,
    slug: "discover-ancient-egypt",
    title: "Discover the Mysteries of Ancient Egypt",
    location: "Egypt, Dubai",
    country: "Egypt",
    nights: 3,
    days: 4,
    rating: 4.8,
    reviews: 124,
    fromPrice: 1200,
    price: 1000,
    discount: 17,
    featured: true,
    image: "https://images.unsplash.com/photo-1568322445389-f64ac2515020?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1568322445389-f64ac2515020?w=800&q=80",
      "https://images.unsplash.com/photo-1553913861-c0fddf2619ee?w=600&q=80",
      "https://images.unsplash.com/photo-1539768942893-daf53e448371?w=600&q=80",
    ],
    departures: ["May 27, 2026", "May 28, 2026", "May 29, 2026"],
    tag: "Historical",
    duration: "4 Days · 3 Nights",
    description:
      "Join us on an unforgettable journey through ancient monuments, top attractions, and hidden gems. This premium tour combines world-class accommodations with expert local guidance, ensuring an experience of a lifetime. From the iconic pyramids to hidden desert oases, every moment is crafted with care and precision.",
    highlights: [
      "Explore the Great Sphinx & Giza Pyramids",
      "Nile River Cruise aboard a Dahabeya",
      "Hot Air Balloon over Luxor at Sunrise",
      "Private Tour of Valley of the Kings",
      "Visit the incomparable Karnak Temple",
      "Experience Local Bedouin Hospitality",
    ],
    itinerary: [
      { day: "Day 1", title: "Arrival in Cairo — Welcome to Egypt", description: "Meet your guide at Cairo International Airport. Transfer to your luxury hotel. Evening orientation walk through Khan el-Khalili bazaar." },
      { day: "Day 2", title: "Giza Pyramids & Sphinx — Morning Ride", description: "An early start to reach the pyramids before the crowds. Private access to the interior of Khufu's Pyramid. Camel ride around the plateau." },
      { day: "Day 3", title: "Luxor — Karnak Temple & Valley of Kings", description: "Morning flight to Luxor. Visit the incomparable Karnak Temple complex. Afternoon exploration of the Valley of the Kings with a private Egyptologist." },
      { day: "Day 4", title: "Hot Air Balloon & Departure", description: "Sunrise hot air balloon flight over the West Bank. After landing, visit the Luxor Museum before your departure transfer." },
    ],
    included: ["5-star hotels for 3 nights", "Meals: Breakfast + Dinner", "Entry fees to all sites", "Professional English guide", "Private AC transport", "Nile dahabeya cabin"],
    notIncluded: ["International flights", "Travel insurance", "Personal expenses", "Visa fees", "Tips & gratuities", "Alcohol & beverages"],
    info: {
      groupSize: "Up to 12",
      accommodation: "5 Star Hotels",
      languages: "EN, FR, DE",
      meetingPoint: "Cairo Airport",
      transportation: "Private AC Bus",
      cancellation: "Free up to 7 days",
      guide: "Professional Certified",
      minAge: "5+ Years",
      meals: "Breakfast, Dinner",
      departureTime: "10:00 AM",
    },
  },
  {
    id: 2,
    slug: "cape-to-kruger-south-africa",
    title: "Cape to Kruger: The Best of South Africa",
    location: "South Africa",
    country: "South Africa",
    nights: 4,
    days: 5,
    rating: 4.9,
    reviews: 98,
    fromPrice: 1200,
    price: 1000,
    discount: 17,
    featured: true,
    image: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=800&q=80",
      "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=600&q=80",
      "https://images.unsplash.com/photo-1489493887464-892be6d1daae?w=600&q=80",
    ],
    departures: ["May 26, 2026", "May 27, 2026", "May 28, 2026"],
    tag: "Wildlife",
    duration: "5 Days · 4 Nights",
    description: "Experience the stunning contrasts of South Africa, from cosmopolitan Cape Town and the Cape Peninsula to the untamed wilderness of Kruger National Park. This expertly curated journey reveals the true soul of this remarkable country.",
    highlights: [
      "Table Mountain cable car experience",
      "Cape Peninsula scenic drive",
      "Kruger National Park Big 5 safari",
      "Cape Winelands tasting tour",
      "Boulders Beach penguin colony",
      "Sunset river cruise on the Zambezi",
    ],
    itinerary: [
      { day: "Day 1", title: "Arrival in Cape Town", description: "Welcome dinner overlooking the V&A Waterfront with panoramic views of Table Mountain." },
      { day: "Day 2", title: "Cape Peninsula & Boulders Beach", description: "Full-day tour of the Cape Peninsula, Chapman's Peak, and the famous penguin colony." },
      { day: "Day 3", title: "Cape Winelands", description: "Morning wine tasting in Stellenbosch and Franschhoek with gourmet lunch included." },
      { day: "Day 4–5", title: "Kruger National Park Safari", description: "Fly to Kruger. Two full days of game drives seeking the Big 5 in open 4x4 vehicles." },
    ],
    included: ["4-star hotels & lodges", "All meals on safari", "Park entrance fees", "Expert safari guides", "Airport transfers", "Wine tasting fees"],
    notIncluded: ["International flights", "Travel insurance", "Souvenirs", "Visa fees", "Laundry services"],
    info: {
      groupSize: "Up to 10",
      accommodation: "4–5 Star Hotels",
      languages: "EN",
      meetingPoint: "Cape Town Airport",
      transportation: "Private 4x4 & Bus",
      cancellation: "Free up to 14 days",
      guide: "Expert Safari Guide",
      minAge: "8+ Years",
      meals: "All Inclusive",
      departureTime: "08:00 AM",
    },
  },
  {
    id: 3,
    slug: "serengeti-big-5-safari",
    title: "Serengeti Big 5 Safari",
    location: "Tanzania",
    country: "Tanzania",
    nights: 6,
    days: 7,
    rating: 4.7,
    reviews: 211,
    fromPrice: 1000,
    price: 500,
    discount: 50,
    featured: true,
    image: "https://www.shutterstock.com/image-photo/african-big-five-landscape-nature-260nw-2381365399.jpg",
    gallery: [
      "https://thumbs.dreamstime.com/b/wild-african-animals-composition-big-five-savannah-nature-bokeh-background-serengeti-wildlife-area-tanzania-africa-131109390.jpg",
      "https://images.unsplash.com/photo-1551918120-9739cb430c6d?w=600&q=80",
      "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=600&q=80",
    ],
    departures: ["May 26, 2026", "May 27, 2026", "May 28, 2026"],
    tag: "Safari",
    duration: "7 Days · 6 Nights",
    description: "Witness the greatest wildlife spectacle on Earth. The Great Migration sees over two million wildebeest, zebras, and gazelles traverse the Serengeti plains in a breathtaking annual cycle of life.",
    highlights: [
      "Witness the Great Wildebeest Migration",
      "Big 5 sightings in the Serengeti",
      "Ngorongoro Crater game drive",
      "Authentic bush camp experience",
      "Visit a traditional Maasai village",
      "Sunrise hot air balloon safari",
    ],
    itinerary: [
      { day: "Day 1–2", title: "Ngorongoro Crater", description: "Arrive in Arusha. Transfer to Ngorongoro for an afternoon game drive in the ancient caldera." },
      { day: "Day 3–5", title: "Central Serengeti — Migration Zone", description: "Three days in the heart of the Serengeti. Morning and evening game drives from a luxury tented camp." },
      { day: "Day 6", title: "Hot Air Balloon Safari", description: "Pre-dawn balloon launch over the Serengeti followed by a bush champagne breakfast." },
      { day: "Day 7", title: "Departure from Arusha", description: "Final morning game drive, transfer to Kilimanjaro Airport for your departure flight." },
    ],
    included: ["Luxury tented camps 6 nights", "All meals", "Game drives", "Park fees & conservation fees", "Maasai village visit", "Balloon safari"],
    notIncluded: ["International flights", "Visa ($50)", "Travel insurance", "Tips", "Personal items"],
    info: {
      groupSize: "Up to 8",
      accommodation: "Luxury Tented Camps",
      languages: "EN, SW",
      meetingPoint: "Kilimanjaro Airport",
      transportation: "4x4 Land Cruiser",
      cancellation: "Free up to 30 days",
      guide: "TANAPA Certified",
      minAge: "6+ Years",
      meals: "Full Board",
      departureTime: "06:00 AM",
    },
  },

  {
    id: 4,
    slug: "golden-triangle-delhi-agra-jaipur",
    title: "Golden Triangle: Delhi - Agra - Jaipur (3 Nights)",
    location: "Delhi, Agra, Jaipur",
    country: "India",
    nights: 3,
    days: 4,
    rating: 4.7,
    reviews: 320,
    fromPrice: 350,
    price: 300,
    discount: 14,
    featured: true,
    image: "https://kashmirmountains.com/wp-content/uploads/Golden-Triangle-Delhi-Agra-Jaipur-Tour.jpg",
    gallery: [
      "https://kashmirmountains.com/wp-content/uploads/Golden-Triangle-Delhi-Agra-Jaipur-Tour.jpg",
      "https://images.unsplash.com/photo-1549880338-65ddcdfd017b?w=600&q=80",
      "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?w=600&q=80",
    ],
    departures: ["May 10, 2026", "Jun 05, 2026", "Jul 01, 2026"],
    tag: "Cultural",
    duration: "4 Days · 3 Nights",
    description:
      "Experience India's iconic Golden Triangle on this immersive 4-day journey. Explore bustling Delhi, witness the majestic Taj Mahal in Agra, and discover the pink city of Jaipur with expert local guides and comfortable stays.",
    highlights: [
      "Sunrise visit to the Taj Mahal",
      "Explore the historic Red Fort and Qutub Minar in Delhi",
      "Amber Fort and City Palace in Jaipur",
      "Local markets & traditional Rajasthani cuisine",
    ],
    itinerary: [
      { day: "Day 1", title: "Arrival in Delhi & City Highlights", description: "Arrival in Delhi. Visit India Gate, Humayun's Tomb and Qutub Minar. Evening at Connaught Place and welcome dinner." },
      { day: "Day 2", title: "Delhi to Agra — Taj Mahal", description: "Early morning transfer to Agra. Sunrise visit to the Taj Mahal, followed by a tour of Agra Fort. Overnight in Agra." },
      { day: "Day 3", title: "Agra to Jaipur via Fatehpur Sikri", description: "Drive to Jaipur with a stop at the UNESCO site Fatehpur Sikri. Afternoon visit to the City Palace and local bazaars in Jaipur." },
      { day: "Day 4", title: "Amber Fort & Departure", description: "Morning visit to Amber Fort with optional elephant or jeep ride. Transfer back to Delhi or Jaipur airport for departure." },
    ],
    included: ["2 nights hotel (3–4★)", "All breakfasts", "Private AC transport", "English-speaking guide", "Taj Mahal & Fort entry fees"],
    notIncluded: ["International flights", "Lunches & dinners unless stated", "Travel insurance", "Tips and personal expenses"],
    info: {
      groupSize: "Up to 16",
      accommodation: "3–4 Star Hotels",
      languages: "EN, HI",
      meetingPoint: "Indira Gandhi International Airport (DEL)",
      transportation: "Private AC Car",
      cancellation: "Free up to 7 days",
      guide: "Local English-speaking guide",
      minAge: "5+ Years",
      meals: "Breakfast",
      departureTime: "07:00 AM",
    },
  },

  {
    id: 7,
    slug: "agra-day-trip-from-delhi",
    title: "Agra Day Trip from Delhi",
    location: "Agra",
    country: "India",
    nights: 0,
    days: 1,
    rating: 4.6,
    reviews: 210,
    fromPrice: 90,
    price: 80,
    discount: 11,
    featured: false,
    image: "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=800&q=80",
      "https://images.unsplash.com/photo-1505685296765-3a2736de412f?w=600&q=80",
    ],
    departures: ["Daily"],
    tag: "Day Trip",
    duration: "1 Day",
    description: "Perfect for travelers short on time — visit the Taj Mahal and Agra Fort on a comfortable day trip from Delhi with a knowledgeable guide and private transport.",
    highlights: ["Sunrise at the Taj Mahal", "Guided tour of Agra Fort", "Photo stop at Itmad-ud-Daulah (Baby Taj)", "Scenic drive with local snacks"],
    itinerary: [
      { day: "Day 1", title: "Early Departure and Taj Mahal", description: "Depart Delhi early morning. Arrive in Agra for a sunrise visit to the Taj Mahal with guided tour and photo time." },
      { day: "Day 1", title: "Agra Fort & Local Lunch", description: "Visit Agra Fort and Itmad-ud-Daulah. Break for optional local lunch before return journey to Delhi." },
      { day: "Day 1", title: "Return to Delhi", description: "Drive back to Delhi arriving in the evening. Drop-off at your hotel or Delhi station/airport." },
    ],
    included: ["Private round-trip transport from Delhi", "Entrance fees to Taj Mahal & Agra Fort", "English-speaking guide", "Bottled water"],
    notIncluded: ["Lunch (optional)", "Tips and gratuities", "Personal expenses"],
    info: {
      groupSize: "Up to 8",
      accommodation: "Not Included (Day Trip)",
      languages: "EN, HI",
      meetingPoint: "Hotel pickup in Delhi",
      transportation: "Private Sedan/Minivan",
      cancellation: "Free up to 48 hours",
      guide: "Local certified guide",
      minAge: "All ages",
      meals: "None included",
      departureTime: "03:30 AM",
    },
  },

  {
    id: 5,
    slug: "kenya-safari-tour",
    title: "Wild Heart of Africa: Kenya Safari Tour",
    location: "Kenya",
    country: "Kenya",
    nights: 4,
    days: 5,
    rating: 4.9,
    reviews: 145,
    fromPrice: 1200,
    price: 1000,
    discount: 17,
    featured: false,
    image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&q=80",
      "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=600&q=80",
      "https://images.unsplash.com/photo-1568322445389-f64ac2515020?w=600&q=80",
    ],
    departures: ["May 26, 2026", "May 27, 2026", "May 28, 2026"],
    tag: "Wildlife",
    duration: "5 Days · 4 Nights",
    description: "Kenya is safari perfection. From the iconic Masai Mara to the dramatic landscapes of Amboseli with Kilimanjaro as a backdrop, this tour delivers Africa at its most magnificent.",
    highlights: [
      "Masai Mara game drives",
      "Amboseli with Kilimanjaro backdrop",
      "Authentic Maasai cultural visit",
      "Lake Nakuru flamingo sightings",
      "Big 5 wildlife encounters",
      "Sundowner drinks on the savanna",
    ],
    itinerary: [
      { day: "Day 1", title: "Arrival in Nairobi", description: "Welcome briefing at your hotel. Optional Giraffe Centre and Elephant Orphanage visit." },
      { day: "Day 2–3", title: "Masai Mara Game Reserve", description: "Two full days of game drives in the world-famous Masai Mara ecosystem." },
      { day: "Day 4", title: "Amboseli National Park", description: "Drive to Amboseli for spectacular views of Kilimanjaro and large elephant herds." },
      { day: "Day 5", title: "Return to Nairobi & Departure", description: "Morning game drive, return to Nairobi for your onward departure." },
    ],
    included: ["Eco-lodges 4 nights", "Full board", "Park fees", "Expert Maasai guides", "4x4 game drives", "Cultural village visit"],
    notIncluded: ["International flights", "Visa ($51)", "Travel insurance", "Tips", "Souvenirs"],
    info: {
      groupSize: "Up to 8",
      accommodation: "Eco-Lodges & Camps",
      languages: "EN, SW",
      meetingPoint: "Nairobi Airport",
      transportation: "4x4 Land Cruiser",
      cancellation: "Free up to 21 days",
      guide: "KWS Certified Guide",
      minAge: "6+ Years",
      meals: "Full Board",
      departureTime: "07:30 AM",
    },
  },
  {
    id: 6,
    slug: "morocco-sahara-to-souks",
    title: "Colors of Morocco: Sahara to Souks",
    location: "Morocco",
    country: "Morocco",
    nights: 4,
    days: 5,
    rating: 4.8,
    reviews: 190,
    fromPrice: 1200,
    price: 1000,
    discount: 17,
    featured: false,
    image: "https://images.unsplash.com/photo-1489493887464-892be6d1daae?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1489493887464-892be6d1daae?w=800&q=80",
      "https://images.unsplash.com/photo-1548019104-e9cbdbb3f9cb?w=600&q=80",
      "https://images.unsplash.com/photo-1597212618440-806262de4f6b?w=600&q=80",
    ],
    departures: ["May 26, 2026", "May 27, 2026", "May 28, 2026"],
    tag: "Cultural",
    duration: "5 Days · 4 Nights --",
    description: "Immerse yourself in the intoxicating colours, aromas, and textures of Morocco. From the labyrinthine medinas of Fes and Marrakech to the infinite silence of the Sahara desert under a billion stars.",
    highlights: [
      "Camel trek in the Sahara Desert",
      "Sleep under the stars in a desert camp",
      "Fes Medina UNESCO World Heritage Tour",
      "Marrakech Djemaa el-Fna experience",
      "Atlas Mountains Berber village visit",
      "Traditional Moroccan hammam spa",
    ],
    itinerary: [
      { day: "Day 1", title: "Arrival in Marrakech", description: "Check in to your riad in the medina. Evening exploration of Djemaa el-Fna square." },
      { day: "Day 2", title: "Atlas Mountains & Aït Benhaddou", description: "4x4 drive over the High Atlas to the UNESCO-listed Aït Benhaddou kasbah." },
      { day: "Day 3–4", title: "Sahara Desert Experience", description: "Camel trek into the Erg Chebbi dunes. Overnight in a luxury desert camp under the stars." },
      { day: "Day 5", title: "Fes & Departure", description: "Drive to Fes for a morning medina tour. Transfer to airport for your departure." },
    ],
    included: ["Riads & desert camp 4 nights", "Breakfast daily", "Camel trek", "4x4 transport", "Licensed guides", "Hammam experience"],
    notIncluded: ["International flights", "Lunches & dinners", "Travel insurance", "Tips", "Personal shopping"],
    info: {
      groupSize: "Up to 12",
      accommodation: "Traditional Riads & Camp",
      languages: "EN, FR, AR",
      meetingPoint: "Marrakech Airport",
      transportation: "4x4 & Camel",
      cancellation: "Free up to 7 days",
      guide: "Licensed Guide",
      minAge: "5+ Years",
      meals: "Breakfast",
      departureTime: "09:00 AM",
    },
  },
];

export const DESTINATIONS = [
  { name: "New York", tours: 12, image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=400&q=80" },
  { name: "Maldives", tours: 8, image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=400&q=80" },
  { name: "Greek Islands", tours: 10, image: "https://images.unsplash.com/photo-1555993539-1732b0258235?w=400&q=80" },
  { name: "Dubai", tours: 15, image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400&q=80" },
  { name: "Morocco", tours: 9, image: "https://images.unsplash.com/photo-1597212618440-806262de4f6b?w=400&q=80" },
  { name: "Croatia", tours: 7, image: "https://images.unsplash.com/photo-1555990538-1ac13fce3aef?w=400&q=80" },
];

export const TESTIMONIALS = [
  { name: "Sarah K.", location: "New York, USA", rating: 5, text: "Absolutely mind-blowing experience! Every detail was taken care of, the hotels were perfect and the guides incredibly knowledgeable. Already planning my next trip!" },
  { name: "Priya M.", location: "London, UK", rating: 5, text: `${SITE_CONFIG.name} made our honeymoon truly unforgettable. The safari exceeded all our expectations and everything went flawlessly. Would recommend to everyone!` },
  { name: "James R.", location: "Sydney, AU", rating: 5, text: "Seamless booking, amazing itinerary, and everything ran on time. The team went above and beyond at every step of the journey." },
  { name: "Amira S.", location: "Dubai, UAE", rating: 5, text: "From the moment we landed to the final farewell, everything was perfect. The guides were passionate and the scenery was simply breathtaking." },
];
