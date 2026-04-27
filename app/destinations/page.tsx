import type { Metadata } from "next";
import Link from "next/link";
import { DESTINATIONS } from "@/data/tours";
import { SITE_CONFIG } from "@/data/site";
import { SetAlsoSee } from "@/components/seo/SeoContext";

export const metadata: Metadata = {
  title: `Destinations | ${SITE_CONFIG.name}`,
  description:
    "Explore popular travel destinations curated by India Tour, from tropical islands to historic cities and desert escapes.",
  keywords: [
    "destinations",
    "travel destinations",
    "tour destinations",
    "global travel",
    "India Tour",
  ],
  openGraph: {
    title: `Destinations | ${SITE_CONFIG.name}`,
    description:
      "Explore our most popular worldwide destinations and discover new travel inspiration.",
    type: "website",
    locale: "en_US",
    siteName: SITE_CONFIG.name,
    images: [
      {
        url: "https://images.unsplash.com/photo-1493558103817-58b2924bce98?w=1200&q=80",
        width: 1200,
        height: 800,
        alt: "Global travel destinations",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `Destinations | ${SITE_CONFIG.name}`,
    description:
      "Explore our most popular worldwide destinations and discover new travel inspiration.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function DestinationsPage() {
  return (
    <>
      <SetAlsoSee items={DESTINATIONS.map((d) => d.name)} />
      <div className="page-hero" style={{ height: 280 }}>
        <div
          className="page-hero-bg"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1493558103817-58b2924bce98?w=1600&q=80')",
          }}
        />
        <div className="page-hero-overlay" />
        <div className="page-hero-content">
          <p className="breadcrumb">
            <Link href="/">Home</Link> ›{" "}
            <Link href="/destinations">Destinations</Link>
          </p>
          <h1
            className="page-title"
            style={{ fontSize: "clamp(18px,3vw,32px)", maxWidth: 600 }}
          >
            Discover top travel destinations with India Tour.
          </h1>
        </div>
      </div>

      <div className="section" style={{ padding: "60px 5%" }}>
        <div className="destinations-grid" style={{ gap: 24 }}>
          {DESTINATIONS.map((destination) => (
            <Link
              key={destination.name}
              href="/tours"
              className="destination-card"
            >
              <div
                className="destination-card-image"
                style={{
                  backgroundImage: `url('${destination.image}')`,
                }}
              />
              <div className="destination-card-body">
                <h3>{destination.name}</h3>
                <p>{destination.tours} curated tours available</p>
                <span className="btn-outline">Browse tours</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
