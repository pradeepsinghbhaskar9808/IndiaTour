"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Seo from "@/components/Seo";
import { SetAlsoSee } from "@/components/seo/SeoContext";
import AlsoSee from "@/components/AlsoSee";
import WhoWeAre from "@/components/WhoWeAre";
import TourCard from "@/components/TourCard";
import HeroSearchBar from "@/components/HeroSearchBar";
import { TOURS, DESTINATIONS, TESTIMONIALS } from "@/data/tours";
import { SITE_CONFIG } from "@/data/site";

const ALSO_SEE_ITEMS = [
  "About US",
  "Holidays",
  "International Tour Packages",
  "India Tour Packages",
  "International Honeymoon Packages",
  "India Honeymoon Packages",
  "Flight Booking",
  "Hotel Booking",
  "Blog",
  "Press Room",
  "Privacy Policy",
  "Sitemap",
  "Store Locator",
  "Terms And Conditions",
  "International Travel Guideline",
  "India Travel Guidelines",
  "Assured Safe Travel Program",
  "SOTC INDIA",
  "Corporate Website",
  "SOTC Android App",
  "SOTC Travel Ltd.",
];

const FILTERS = [
  "All Trips",
  "Croatia",
  "Dubai",
  "Greek Islands",
  "Maldives",
  "Morocco",
  "New York",
];
const HERO_SLIDES = [
  "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1600&q=80",
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1600&q=80",
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1600&q=80",
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1600&q=80",
];

const PROMOS = [
  {
    title: "Save Up to 30% On Next Adventure!",
    badge: "Book Today",
    images: [
      "https://images.unsplash.com/photo-1488085061387-422e29b40080?w=600&q=80",
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=600&q=80",
      "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=600&q=80",
    ],
    bg: "linear-gradient(135deg,rgba(0,0,0,0.5),rgba(0,0,0,0.2))",
  },
  {
    title: "Fly High 30% OFF On Air Tickets!",
    badge: "Book Today",
    images: [
      "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=600&q=80",
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=80",
      "https://images.unsplash.com/photo-1517479149777-5f3b1511d5ad?w=600&q=80",
    ],
    bg: "linear-gradient(135deg,rgba(46,204,122,0.6),rgba(0,0,0,0.3))",
  },
  {
    title: "Explore The World With 20% Off",
    badge: "Book Now",
    images: [
      "https://images.unsplash.com/photo-1527631746610-bca00a040d60?w=600&q=80",
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600&q=80",
      "https://images.unsplash.com/photo-1493558103817-58b2924bce98?w=600&q=80",
    ],
    bg: "linear-gradient(135deg,rgba(0,0,0,0.52),rgba(0,0,0,0.18))",
  },
];

export default function HomePage() {
  const [activeFilter, setActiveFilter] = useState("All Trips");
  const [promoIndexes, setPromoIndexes] = useState(() => PROMOS.map(() => 0));
  const [activeDestination, setActiveDestination] = useState(0);
  const [isDestinationHovered, setIsDestinationHovered] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [isTestimonialHovered, setIsTestimonialHovered] = useState(false);

  const filteredTours =
    activeFilter === "All Trips"
      ? TOURS
      : TOURS.filter(
          (t) =>
            t.tag === activeFilter ||
            t.location.includes(activeFilter) ||
            t.country === activeFilter,
        );

  const changePromoSlide = (promoIndex: number, direction: number) => {
    setPromoIndexes((current) =>
      current.map((activeIndex, index) => {
        if (index !== promoIndex) return activeIndex;

        const totalImages = PROMOS[promoIndex].images.length;
        return (activeIndex + direction + totalImages) % totalImages;
      }),
    );
  };

  useEffect(() => {
    const interval = window.setInterval(() => {
      setPromoIndexes((current) =>
        current.map((activeIndex, promoIndex) => {
          const totalImages = PROMOS[promoIndex].images.length;
          return (activeIndex + 1) % totalImages;
        }),
      );
    }, 3500);

    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    if (isDestinationHovered) return;

    const interval = window.setInterval(() => {
      setActiveDestination((current) => (current + 1) % DESTINATIONS.length);
    }, 3200);

    return () => window.clearInterval(interval);
  }, [isDestinationHovered]);

  useEffect(() => {
    if (isTestimonialHovered) return;

    const interval = window.setInterval(() => {
      setActiveTestimonial((current) => (current + 1) % TESTIMONIALS.length);
    }, 3600);

    return () => window.clearInterval(interval);
  }, [isTestimonialHovered]);

  // Places to See in India: derive unique locations from tours with country === 'India'
  const indiaPlaces = Array.from(
    new Map(
      TOURS.filter((t) => t.country === "India").map((t) => [t.slug, t]),
    ).values(),
  ).slice(0, 6);

  const changeDestinationSlide = (direction: number) => {
    setActiveDestination(
      (current) =>
        (current + direction + DESTINATIONS.length) % DESTINATIONS.length,
    );
  };

  return (
    <>
      {/* central list used both for footer context and visible homepage section */}
      <SetAlsoSee
        items={ALSO_SEE_ITEMS}
      />
      <Seo
        title={`${SITE_CONFIG?.name ?? "India Tour"} - ${SITE_CONFIG?.tagline ?? "Global Tours"}`}
        description={
          "Discover world-class travel experiences from trusted agencies around the globe. Book unforgettable tours and adventures."
        }
        keywords={["india tour","tours", "travel", "book tours", "holiday packages", "top destinations"]}
      />
      <section className="hero-section">
        <div className="hero-slider" aria-hidden="true">
          {HERO_SLIDES.map((image, index) => (
            <div
              key={image}
              className="hero-slide"
              style={{
                backgroundImage: `url('${image}')`,
                animationDelay: `${index * 6}s`,
              }}
            />
          ))}
        </div>
        <div className="hero-overlay" />
        <div className="hero-content">
          <p className="hero-eyebrow">Your journey starts here</p>
          <h1 className="hero-title">
            Gateway to
            <br />
            <span className="highlight">Global Tours</span>
          </h1>
          <p className="hero-subtitle">
            Discover world-class travel experiences from trusted agencies around
            the globe. Unforgettable adventures await.
          </p>

          <div className="hero-stats">
            {[
              { num: "5000+", label: "Tours Available" },
              { num: "120+", label: "Destinations" },
              { num: "98%", label: "Happy Guests" },
              { num: "15yr", label: "Experience" },
            ].map((s) => (
              <div key={s.label} style={{ textAlign: "center" }}>
                <span className="hero-stat-num">{s.num}</span>
                <div className="hero-stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <HeroSearchBar />
<section className="section bg-cream">
  <div className="section" style={{ paddingBottom: 0 }}>
        <div className="promo-grid">
          {PROMOS.map((p, promoIndex) => (
            <div key={p.title} className="promo-card">
              <div className="promo-slider" aria-hidden="true">
                <div
                  className="promo-slider-track"
                  style={{
                    transform: `translateX(-${promoIndexes[promoIndex] * 100}%)`,
                  }}
                >
                  {p.images.map((image) => (
                    <img
                      key={image}
                      src={image}
                      alt={p.title}
                      className="promo-slide-image"
                      loading="lazy"
                      decoding="async"
                    />
                  ))}
                </div>
              </div>

              <div className="promo-nav">
                <button
                  type="button"
                  className="promo-nav-btn"
                  onClick={() => changePromoSlide(promoIndex, -1)}
                  aria-label={`Previous image for ${p.title}`}
                >
                  ‹
                </button>
                <button
                  type="button"
                  className="promo-nav-btn"
                  onClick={() => changePromoSlide(promoIndex, 1)}
                  aria-label={`Next image for ${p.title}`}
                >
                  ›
                </button>
              </div>

              <div className="promo-overlay" style={{ background: p.bg }}>
                <span className="promo-badge">{p.badge}</span>
                <div className="promo-title">{p.title}</div>
                <button className="promo-action-btn">Book Now</button>
              </div>
            </div>
          ))}
        </div>
      </div>
</section>
      
 {/* Places to See in India */}
        <section className="section bg-light-green">
          <div className="section-header">
            <div className="section-eyebrow">Discover India</div>
            <h2 className="section-title">Places to See in India</h2>
          </div>

          <p className="section-desc">
            Explore a curated selection of India's most iconic destinations — from
            the timeless Taj Mahal and vibrant markets of Jaipur to serene backwaters
            and tropical coastlines. Handpicked tours offer authentic experiences,
            local guides, and seamless logistics so you can focus on making memories.
          </p>

          <div className="india-places-grid">
            {indiaPlaces.map((p) => (
              <Link key={p.slug} href={`/tours/${p.slug}`} className="india-place-card">
                <div className="india-place-image" style={{ backgroundImage: `url('${p.image}')` }} />
                <div className="india-place-body">
                  <div className="india-place-name">{p.title}</div>
                  <div className="india-place-meta">{p.location} · {p.duration}</div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      <section className="section">
        <div className="section-header">
          <div className="section-eyebrow">Explore the World</div>
          <h2 className="section-title">Top Destinations</h2>
        </div>
        <div
          className="destinations-showcase"
          onMouseEnter={() => setIsDestinationHovered(true)}
          onMouseLeave={() => setIsDestinationHovered(false)}
        >
          <button
            type="button"
            className="dest-nav-btn dest-nav-prev"
            onClick={() => changeDestinationSlide(-1)}
            aria-label="Previous destination"
          >
            ‹
          </button>

          <div className="destinations-grid">
            {DESTINATIONS.map((d, i) => {
              const rawOffset =
                (i - activeDestination + DESTINATIONS.length) %
                DESTINATIONS.length;
              const offset =
                rawOffset > Math.floor(DESTINATIONS.length / 2)
                  ? rawOffset - DESTINATIONS.length
                  : rawOffset;
              const isActive = i === activeDestination;

              return (
                <div
                  key={d.name}
                  className={`dest-card${isActive ? " is-active" : ""}`}
                  data-offset={offset}
                >
                  <img src={d.image} alt={d.name} loading="lazy" />
                  <div className="dest-shine" aria-hidden="true" />
                  <div className="dest-overlay">
                    <div className="dest-tag">Featured Escape</div>
                    <div className="dest-name">{d.name}</div>
                    <div className="dest-count">{d.tours} Tours</div>
                  </div>
                </div>
              );
            })}
          </div>

          <button
            type="button"
            className="dest-nav-btn dest-nav-next"
            onClick={() => changeDestinationSlide(1)}
            aria-label="Next destination"
          >
            ›
          </button>
        </div>

        <div className="dest-dots" aria-label="Destination slider">
          {DESTINATIONS.map((d, index) => (
            <button
              key={d.name}
              type="button"
              className={`dest-dot${index === activeDestination ? " active" : ""}`}
              onClick={() => setActiveDestination(index)}
              aria-label={`Go to ${d.name}`}
            />
          ))}
        </div>
      </section>

      {/* Who We Are */}
      <WhoWeAre />

      <section
        className="section bg-light-green"
        style={{  padding: "80px 5%" }}
      >
        <div className="section-header">
          <div className="section-eyebrow">Handpicked For You</div>
          <h2 className="section-title">Popular Tour Packages</h2>
        </div>

        <div className="filter-tabs">
          {FILTERS.map((f) => (
            <button
              key={f}
              className={`filter-tab-btn${activeFilter === f ? " active" : ""}`}
              onClick={() => setActiveFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="tours-grid">
          {filteredTours.map((tour, i) => (
            <TourCard key={tour.id} tour={tour} animDelay={i * 0.07} />
          ))}
        </div>

        <div style={{ textAlign: "center", marginTop: 40 }}>
          <Link href="/tours">
            <button
              className="btn-primary"
              style={{ padding: "12px 32px", fontSize: 15 }}
            >
              Browse All Tours →
            </button>
          </Link>
        </div>

       
      </section>

      <section className="section">
        <div className="section-header">
          <div className="section-eyebrow">Real Reviews</div>
          <h2 className="section-title">What Our Guests Say</h2>
        </div>
        <div
          className="testimonials-slider-wrap"
          onMouseEnter={() => setIsTestimonialHovered(true)}
          onMouseLeave={() => setIsTestimonialHovered(false)}
        >
          <button
            type="button"
            className="testimonial-nav-btn testimonial-nav-prev"
            onClick={() =>
              setActiveTestimonial(
                (current) =>
                  (current - 1 + TESTIMONIALS.length) % TESTIMONIALS.length,
              )
            }
            aria-label="Previous testimonial"
          >
            ‹
          </button>

          <div className="testimonials-grid">
            {TESTIMONIALS.map((t, i) => {
              const rawOffset =
                (i - activeTestimonial + TESTIMONIALS.length) %
                TESTIMONIALS.length;
              const offset =
                rawOffset > Math.floor(TESTIMONIALS.length / 2)
                  ? rawOffset - TESTIMONIALS.length
                  : rawOffset;

              return (
                <div
                  key={t.name}
                  className={`testimonial-card${i === activeTestimonial ? " is-active" : ""}`}
                  data-offset={offset}
                >
                  <div className="testimonial-quote-mark">“</div>
                  <div className="testimonial-stars">
                    {"★".repeat(t.rating)}
                  </div>
                  <p className="testimonial-text">{t.text}</p>
                  <div className="testimonial-author">
                    <div className="author-avatar">{t.name[0]}</div>
                    <div>
                      <div className="author-name">{t.name}</div>
                      <div className="author-loc">{t.location}</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <button
            type="button"
            className="testimonial-nav-btn testimonial-nav-next"
            onClick={() =>
              setActiveTestimonial(
                (current) => (current + 1) % TESTIMONIALS.length,
              )
            }
            aria-label="Next testimonial"
          >
            ›
          </button>
        </div>

        <div className="testimonial-dots" aria-label="Testimonials slider">
          {TESTIMONIALS.map((t, index) => (
            <button
              key={t.name}
              type="button"
              className={`testimonial-dot${index === activeTestimonial ? " active" : ""}`}
              onClick={() => setActiveTestimonial(index)}
              aria-label={`Go to review by ${t.name}`}
            />
          ))}
        </div>
      </section>
      <section className="section bg-light-green">
         {/* Also See section (visible on homepage) */}
        <AlsoSee items={ALSO_SEE_ITEMS} title="Also See" />
     
      </section>

      
    </>
  );
}
