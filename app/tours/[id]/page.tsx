import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { TOURS } from "@/data/tours";
import TourBookingWidget from "@/components/TourBookingWidget";
import TourCard from "@/components/TourCard";

export function generateStaticParams() {
  return TOURS.map((tour) => ({ id: tour.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { id: string };
}): Metadata {
  const tour = TOURS.find((t) => t.slug === params.id);

  if (!tour) {
    return {
      title: "Tour Not Found | India Tour",
      description: "The requested tour could not be found.",
    };
  }

  return {
    title: `${tour.title} | India Tour`,
    description: tour.description,
    keywords: [
      tour.location,
      tour.country,
      tour.tag,
      "safari",
      "adventure",
      "cultural tour",
    ],
    openGraph: {
      title: `${tour.title} | India Tour`,
      description: tour.description,
      type: "article",
      locale: "en_US",
      url: `https://touriza.com/tours/${tour.slug}`,
      siteName: "India Tour",
      images: [
        {
          url: tour.image,
          alt: tour.title,
          width: 1200,
          height: 800,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${tour.title} | India Tour`,
      description: tour.description,
      images: [tour.image],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

interface TourDetailPageProps {
  params: { id: string };
}

export default function TourDetailPage({ params }: TourDetailPageProps) {
  const tour = TOURS.find((t) => t.slug === params.id);

  if (!tour) notFound();

  const related = TOURS.filter((t) => t.id !== tour.id).slice(0, 3);

  return (
    <>
      {/* Page Hero */}
      <div className="page-hero" style={{ height: 280 }}>
        <div
          className="page-hero-bg"
          style={{ backgroundImage: `url('${tour.image}')` }}
        />
        <div className="page-hero-overlay" />
        <div className="page-hero-content">
          <p className="breadcrumb">
            <Link href="/">Home</Link> › <Link href="/tours">Tour</Link> ›{" "}
            <span style={{ color: "rgba(255,255,255,0.6)" }}>{tour.title}</span>
          </p>
          <h1
            className="page-title"
            style={{ fontSize: "clamp(18px,3vw,32px)", maxWidth: 600 }}
          >
            {tour.title}
          </h1>
        </div>
      </div>

      {/* Detail Layout */}
      <div className="tour-detail-layout">
        {/* LEFT */}
        <div>
          {/* Image Gallery */}
          <div className="detail-image-grid">
            {tour.gallery.map((img, i) => (
              <img
                key={i}
                src={img}
                alt={`${tour.title} ${i + 1}`}
                loading="lazy"
                decoding="async"
              />
            ))}
          </div>

          {/* Header */}
          <div className="detail-header">
            <h2 className="detail-title">{tour.title}</h2>
            <div className="detail-badges">
              <span className="day-badge">{tour.days} Day</span>
              <span className="night-badge">{tour.nights} Night</span>
            </div>
          </div>

          {/* Info Boxes */}
          <div className="info-boxes-grid">
            {[
              { icon: "👥", label: "Group Size", value: tour.info.groupSize },
              {
                icon: "🏨",
                label: "Accommodation",
                value: tour.info.accommodation,
              },
              { icon: "🌍", label: "Languages", value: tour.info.languages },
              {
                icon: "📍",
                label: "Meeting Point",
                value: tour.info.meetingPoint,
              },
              {
                icon: "🚌",
                label: "Transportation",
                value: tour.info.transportation,
              },
              {
                icon: "❌",
                label: "Cancellation",
                value: tour.info.cancellation,
              },
              { icon: "💬", label: "Guide Type", value: tour.info.guide },
              {
                icon: "⭐",
                label: "Rating",
                value: `${tour.rating} (${tour.reviews})`,
              },
            ].map((b) => (
              <div key={b.label} className="info-box">
                <div className="info-box-icon">{b.icon}</div>
                <span className="info-box-label">{b.label}</span>
                <span className="info-box-value">{b.value}</span>
              </div>
            ))}
          </div>

          {/* Overview */}
          <h3 className="section-subtitle">Overview</h3>
          <p className="overview-text">{tour.description}</p>

          {/* Highlights */}
          <h3 className="section-subtitle">Highlights</h3>
          <div className="highlights-grid">
            {tour.highlights.map((h) => (
              <div key={h} className="highlight-item">
                <span className="highlight-check">✓</span>
                {h}
              </div>
            ))}
          </div>

          {/* Itinerary */}
          <h3 className="section-subtitle">Itinerary</h3>
          <div className="itinerary-timeline">
            {tour.itinerary.map((step, i) => (
              <div key={i} className="itinerary-step">
                <div className="itinerary-day">{step.day}</div>
                <div className="itinerary-step-title">{step.title}</div>
                <div className="itinerary-desc">{step.description}</div>
              </div>
            ))}
          </div>

          {/* Cost */}
          <h3 className="section-subtitle">Cost</h3>
          <div className="cost-grid">
            <div>
              <div className="cost-list-title included">INCLUDED</div>
              {tour.included.map((item) => (
                <div key={item} className="cost-item">
                  <span className="cost-icon-ok">✓</span>
                  {item}
                </div>
              ))}
            </div>
            <div>
              <div className="cost-list-title not-included">NOT INCLUDED</div>
              {tour.notIncluded.map((item) => (
                <div key={item} className="cost-item">
                  <span className="cost-icon-no">✕</span>
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* FAQ */}
          <h3 className="section-subtitle">FAQ</h3>
          {[
            {
              q: "What is the difficulty level?",
              a: "This tour is rated as moderate difficulty. Activities involve walking 3–5km per day on uneven terrain. Comfortable shoes are recommended.",
            },
            {
              q: "Do I need travel insurance?",
              a: "Yes, travel insurance is strongly recommended. It is not included in the tour price and must be arranged separately before departure.",
            },
            {
              q: "Can I get good connectivity?",
              a: "Most hotels and lodges have Wi-Fi. In remote safari areas, connectivity may be limited — consider this a digital detox opportunity!",
            },
            {
              q: "Is altitude sickness a concern?",
              a: "For our African safari tours, altitude sickness is not typically a concern. Kilimanjaro treks include acclimatization days.",
            },
            {
              q: "Are meals included?",
              a:
                tour.info.meals === "Full Board"
                  ? "Yes, all meals are included — breakfast, lunch, and dinner. We accommodate dietary requirements on request."
                  : `${tour.info.meals} are included. Other meals can be arranged locally.`,
            },
          ].map(({ q, a }) => (
            <details key={q} className="faq-item">
              <summary className="faq-summary">
                {q} <span className="faq-plus">+</span>
              </summary>
              <p className="faq-answer">{a}</p>
            </details>
          ))}
        </div>

        {/* RIGHT — Booking Widget */}
        <TourBookingWidget tour={tour} />
      </div>

      {/* Related Tours */}
      <section
        className="section bg-light-green"
        style={{ margin: "0 -5%", padding: "60px 5%" }}
      >
        <div className="section-header">
          <div className="section-eyebrow">More Like This</div>
          <h2 className="section-title">Related Trips You Might Like</h2>
        </div>
        <div className="tours-grid">
          {related.map((t, i) => (
            <TourCard key={t.id} tour={t} animDelay={i * 0.1} />
          ))}
        </div>
      </section>
    </>
  );
}
