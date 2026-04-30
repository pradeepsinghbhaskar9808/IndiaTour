import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { TOURS } from "@/data/tours";
import TourBookingWidget from "@/components/TourBookingWidget";
import TourCard from "@/components/TourCard";
import AlsoSee from "@/components/AlsoSee";
import { SetAlsoSee } from "@/components/seo/SeoContext";
import ItineraryShareActions from "@/components/ItineraryShareActions";

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

function cleanRouteStop(value: string) {
  return value
    .split(/\s+(?:-|to|\u2013|\u2014|\u00e2\u20ac\u201c|\u00e2\u20ac\u201d)\s+/i)[0]
    .replace(/\([^)]*\)/g, "")
    .replace(/\b(arrival in|arrival at|departure from|return to|return from)\b/gi, "")
    .replace(/\b(city highlights|morning ride|local lunch|departure|experience)\b/gi, "")
    .replace(/\s+/g, " ")
    .trim();
}

function getRouteStops(tour: (typeof TOURS)[number]) {
  const titleRoute = tour.title.includes(":")
    ? tour.title.split(":").slice(1).join(":")
    : "";

  const titleStops = titleRoute
    .replace(/\([^)]*\)/g, "")
    .split(/\s+-\s+|\s+to\s+/i)
    .map(cleanRouteStop)
    .filter(Boolean);

  const itineraryStops = tour.itinerary
    .map((step) => cleanRouteStop(step.title))
    .filter(Boolean);

  const locationStops = tour.location
    .split(",")
    .map(cleanRouteStop)
    .filter(Boolean);

  const source =
    titleStops.length >= 2
      ? titleStops
      : itineraryStops.length >= 2
        ? itineraryStops
        : locationStops;

  return source.filter(
    (stop, index, list) =>
      index === 0 || stop.toLowerCase() !== list[index - 1].toLowerCase(),
  );
}

export default function TourDetailPage({ params }: TourDetailPageProps) {
  const tour = TOURS.find((t) => t.slug === params.id);

  if (!tour) notFound();

  const related = TOURS.filter((t) => t.id !== tour.id).slice(0, 3);
  const routeStops = getRouteStops(tour);
  const seoAlsoItems = [
    tour.location,
    tour.country,
    tour.tag,
    ...tour.highlights.slice(0, 6),
  ].filter(Boolean);

  // set also-see items for the footer via client context (client component)
  const mapQuery = encodeURIComponent(`${tour.title}, ${tour.location}`);
  const infoBoxes = [
    { icon: "GS", label: "Group Size", value: tour.info.groupSize },
    { icon: "HT", label: "Accommodation", value: tour.info.accommodation },
    { icon: "LN", label: "Languages", value: tour.info.languages },
    { icon: "MP", label: "Meeting Point", value: tour.info.meetingPoint },
    { icon: "TR", label: "Transportation", value: tour.info.transportation },
    { icon: "CL", label: "Cancellation", value: tour.info.cancellation },
    { icon: "GD", label: "Guide Type", value: tour.info.guide },
    { icon: "RT", label: "Rating", value: `${tour.rating} (${tour.reviews})` },
  ];
  const faqs = [
    {
      q: "What is the difficulty level?",
      a: "This tour is rated as moderate difficulty. Activities involve walking 3-5km per day on uneven terrain. Comfortable shoes are recommended.",
    },
    {
      q: "Do I need travel insurance?",
      a: "Yes, travel insurance is strongly recommended. It is not included in the tour price and must be arranged separately before departure.",
    },
    {
      q: "Can I get good connectivity?",
      a: "Most hotels and lodges have Wi-Fi. In remote safari areas, connectivity may be limited.",
    },
    {
      q: "Is altitude sickness a concern?",
      a: "For our African safari tours, altitude sickness is not typically a concern. Kilimanjaro treks include acclimatization days.",
    },
    {
      q: "Are meals included?",
      a:
        tour.info.meals === "Full Board"
          ? "Yes, all meals are included: breakfast, lunch, and dinner. We accommodate dietary requirements on request."
          : `${tour.info.meals} are included. Other meals can be arranged locally.`,
    },
  ];

  return (
    <>
      <SetAlsoSee items={seoAlsoItems} />
      <div className="page-hero" style={{ height: 280 }}>
        <div
          className="page-hero-bg"
          style={{ backgroundImage: `url('${tour.image}')` }}
        />
        <div className="page-hero-overlay" />
        <div className="page-hero-content">
          <p className="breadcrumb">
            <Link href="/">Home</Link> / <Link href="/tours">Tour</Link> /{" "}
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

      <div className="tour-detail-layout">
        <div>
          <div className="detail-image-grid">
            {tour.gallery.map((img, i) => (
              <img
                key={img}
                src={img}
                alt={`${tour.title} ${i + 1}`}
                loading="lazy"
                decoding="async"
              />
            ))}
          </div>

          <div className="detail-header">
            <div className="detail-title-group">
              <h2 className="detail-title">{tour.title}</h2>
              <div className="tour-route-line" aria-label="Tour route">
                <span className="tour-route-icon" aria-hidden="true">
                  <svg
                    width="17"
                    height="17"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 21s7-4.5 7-11a7 7 0 1 0-14 0c0 6.5 7 11 7 11Z" />
                    <circle cx="12" cy="10" r="2.5" />
                  </svg>
                </span>
                <div className="tour-route-stops">
                  {routeStops.map((stop, index) => (
                    <span className="tour-route-stop-wrap" key={`${stop}-${index}`}>
                      <span className="tour-route-stop">
                        {stop}
                      </span>
                      {index < routeStops.length - 1 ? (
                        <span className="tour-route-arrow" aria-hidden="true">
                          &rarr;
                        </span>
                      ) : null}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className="detail-badges">
              <span className="day-badge">{tour.days} Day</span>
              <span className="night-badge">{tour.nights} Night</span>
            </div>
          </div>

          <div className="tour-detail-tabs">
            <input
              defaultChecked
              id={`tab-itinerary-${tour.slug}`}
              name={`tour-tabs-${tour.slug}`}
              type="radio"
            />
            <input
              id={`tab-details-${tour.slug}`}
              name={`tour-tabs-${tour.slug}`}
              type="radio"
            />
            <input
              id={`tab-information-${tour.slug}`}
              name={`tour-tabs-${tour.slug}`}
              type="radio"
            />
            <input
              id={`tab-know-${tour.slug}`}
              name={`tour-tabs-${tour.slug}`}
              type="radio"
            />
            <input
              id={`tab-cancellation-${tour.slug}`}
              name={`tour-tabs-${tour.slug}`}
              type="radio"
            />
            <input
              id={`tab-upgrades-${tour.slug}`}
              name={`tour-tabs-${tour.slug}`}
              type="radio"
            />

            <div className="tour-tabs-nav" aria-label="Tour detail sections">
              <label htmlFor={`tab-itinerary-${tour.slug}`}>Itinerary</label>
              <label htmlFor={`tab-details-${tour.slug}`}>Tour Details</label>
              <label htmlFor={`tab-information-${tour.slug}`}>
                Tour Information
              </label>
              <label htmlFor={`tab-know-${tour.slug}`}>Need to Know</label>
              <label htmlFor={`tab-cancellation-${tour.slug}`}>
                Cancellation Policy
              </label>
              {/* <label htmlFor={`tab-upgrades-${tour.slug}`}>Upgrades</label> */}
            </div>

            <div className="tour-tabs-panels">
              <section className="tour-tab-panel tab-panel-itinerary">
                <div className="tab-section-head">
                  <span>{tour.duration}</span>
                  <h3>Day-by-Day Itinerary</h3>
                </div>
                <div className="itinerary-content-grid">
                  <div className="itinerary-timeline">
                    {tour.itinerary.map((step, i) => (
                      <details
                        key={`${step.day}-${step.title}`}
                        className="itinerary-step"
                        open={i === 0}
                      >
                        <summary>
                          <span className="itinerary-day">{step.day}</span>
                          <span className="itinerary-step-title">
                            {step.title}
                          </span>
                        </summary>
                        <div className="itinerary-desc">
                          {step.description}
                        </div>
                      </details>
                    ))}
                  </div>
                  <div className="tour-map-card">
                    <iframe
                      title={`${tour.title} map`}
                      src={`https://www.google.com/maps?q=${mapQuery}&output=embed`}
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    />
                    <div className="tour-map-caption">
                      <strong>{tour.location}</strong>
                      <span>Route map and surrounding area</span>
                    </div>
                    <ItineraryShareActions
                      title={tour.title}
                      location={tour.location}
                      duration={tour.duration}
                      itinerary={tour.itinerary}
                    />
                  </div>
                </div>
              </section>

              <section className="tour-tab-panel tab-panel-details">
                <div className="tab-section-head">
                  <span>Overview</span>
                  <h3>Tour Details</h3>
                </div>
                <p className="overview-text">{tour.description}</p>
                <div className="highlights-grid">
                  {tour.highlights.map((h) => (
                    <div key={h} className="highlight-item">
                      <span className="highlight-check">✓</span>
                      {h}
                    </div>
                  ))}
                </div>
                <div className="cost-grid tab-cost-grid">
                  <div>
                    <div className="cost-list-title included">Included</div>
                    {tour.included.map((item) => (
                      <div key={item} className="cost-item">
                        <span className="cost-icon-ok">✓</span>
                        {item}
                      </div>
                    ))}
                  </div>
                  <div>
                    <div className="cost-list-title not-included">
                      Not Included
                    </div>
                    {tour.notIncluded.map((item) => (
                      <div key={item} className="cost-item">
                        <span className="cost-icon-no">x</span>
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              <section className="tour-tab-panel tab-panel-information">
                <div className="tab-section-head">
                  <span>Practical Details</span>
                  <h3>Tour Information</h3>
                </div>
                <div className="info-boxes-grid">
                  {infoBoxes.map((b) => (
                    <div key={b.label} className="info-box">
                      <div className="info-box-icon">{b.icon}</div>
                      <span className="info-box-label">{b.label}</span>
                      <span className="info-box-value">{b.value}</span>
                    </div>
                  ))}
                </div>
                <div className="tour-info-list">
                  <div>
                    <span>Minimum Age</span>
                    <strong>{tour.info.minAge}</strong>
                  </div>
                  <div>
                    <span>Meals</span>
                    <strong>{tour.info.meals}</strong>
                  </div>
                  <div>
                    <span>Departure Time</span>
                    <strong>{tour.info.departureTime}</strong>
                  </div>
                </div>
              </section>

              <section className="tour-tab-panel tab-panel-know">
                <div className="tab-section-head">
                  <span>Before You Travel</span>
                  <h3>Need to Know</h3>
                </div>
                {faqs.map(({ q, a }) => (
                  <details key={q} className="faq-item">
                    <summary className="faq-summary">
                      {q} <span className="faq-plus">+</span>
                    </summary>
                    <p className="faq-answer">{a}</p>
                  </details>
                ))}
              </section>

              <section className="tour-tab-panel tab-panel-cancellation">
                <div className="tab-section-head">
                  <span>Booking Terms</span>
                  <h3>Cancellation Policy</h3>
                </div>
                <div className="policy-panel">
                  <p>
                    This tour offers {tour.info.cancellation.toLowerCase()}.
                    Cancellation requests must be sent in writing and are
                    processed from the date we receive the request.
                  </p>
                  <p>
                    After the free cancellation window, supplier fees, permit
                    costs, and non-refundable hotel or transport charges may
                    apply. Travel insurance is recommended for added protection.
                  </p>
                </div>
              </section>

              {/* <section className="tour-tab-panel tab-panel-upgrades">
                <div className="tab-section-head">
                  <span>Optional Add-ons</span>
                  <h3>Upgrades</h3>
                </div>
                <div className="upgrade-grid">
                  {[
                    {
                      title: "Private Guide",
                      text: "Add a dedicated guide for a more flexible daily pace.",
                    },
                    {
                      title: "Premium Stay",
                      text: `Upgrade selected nights from ${tour.info.accommodation}.`,
                    },
                    {
                      title: "Private Transfers",
                      text: "Choose door-to-door transfers for arrival and departure days.",
                    },
                  ].map((upgrade) => (
                    <div key={upgrade.title} className="upgrade-card">
                      <h4>{upgrade.title}</h4>
                      <p>{upgrade.text}</p>
                    </div>
                  ))}
                </div>
              </section> */}
            </div>
          </div>
        </div>

        <TourBookingWidget tour={tour} />
      </div>

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

      <div style={{ padding: "40px 5%" }}>
        <AlsoSee items={seoAlsoItems} title="Top Trending Domestic Tour Package" />
      </div>
    </>
  );
}
