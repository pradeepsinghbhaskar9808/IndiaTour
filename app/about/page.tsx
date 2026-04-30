// "use client";

import type { Metadata } from "next";
import Link from "next/link";
import { SITE_CONFIG } from "@/data/site";
import { SetAlsoSee } from "@/components/seo/SeoContext";
import WhoWeAre from "@/components/WhoWeAre";

export const metadata: Metadata = {
  title: `About Us | ${SITE_CONFIG.name}`,
  description:
    "Learn how India Tour crafts unforgettable global travel experiences with expert guides, curated itineraries, and premium support.",
  keywords: [
    "about India Tour",
    "travel agency",
    "tour operator",
    "global tours",
    "travel experiences",
  ],
  openGraph: {
    title: `About Us | ${SITE_CONFIG.name}`,
    description:
      "Learn how India Tour crafts unforgettable global travel experiences with expert guides, curated itineraries, and premium support.",
    type: "website",
    locale: "en_US",
    siteName: SITE_CONFIG.name,
    images: [
      {
        url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=80",
        width: 1200,
        height: 800,
        alt: "Travel planning and adventure",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `About Us | ${SITE_CONFIG.name}`,
    description:
      "Discover the mission, values, and travel expertise behind India Tour.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function AboutPage() {
  return (
    <>
      <SetAlsoSee
        items={[
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
        ]}
      />
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
            <Link href="/">Home</Link> › <Link href="/about">About</Link>
          </p>
          <h1
            className="page-title"
            style={{ fontSize: "clamp(18px,3vw,32px)", maxWidth: 600 }}
          >
            Trusted travel design for every adventure.
          </h1>
        </div>
      </div>

      <WhoWeAre />

      <div className="section" style={{ padding: "60px 5%" }}>
        <div className="content-grid" style={{ gap: 32 }}>
          <div>
            <p className="section-lead">
              {SITE_CONFIG.name} Ricky is your gateway to extraordinary journeys
              around the world. We build seamless travel experiences with expert
              planning, local partners, and responsible hospitality.
            </p>

            <div className="info-grid">
              <div>
                <h3>Our mission</h3>
                <p>
                  To connect travelers with unforgettable destinations through
                  thoughtfully curated tours, empowering every guest with
                  confidence, comfort, and local insight.
                </p>
              </div>
              <div>
                <h3>Why choose us?</h3>
                <ul className="feature-list">
                  <li>Handpicked itineraries for authentic experiences</li>
                  <li>Trusted local guides and premium accommodations</li>
                  <li>Easy booking, transparent pricing, and 24/7 support</li>
                </ul>
              </div>
            </div>

            <div className="content-block">
              <h3>Personalized travel with global reach</h3>
              <p>
                From cultural explorations in Morocco to safari adventures in
                Africa, our travel experts gather the best itineraries and local
                experiences for travelers who want more than a checklist.
              </p>
            </div>

            <Link href="/tours">
              <button className="btn-primary" style={{ marginTop: 16 }}>
                View Tours
              </button>
            </Link>
          </div>

          <div style={{ minWidth: 320 }}>
            <div className="about-card">
              <h3>What we offer</h3>
              <p>
                Customized tour planning, vetted experiences, and reliable
                support from booking through departure.
              </p>
              <ul className="feature-list">
                <li>Flexible dates and small-group departures</li>
                <li>Expert local guides with deep destination knowledge</li>
                <li>Well-designed stays and curated dining options</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
