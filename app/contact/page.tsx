import type { Metadata } from "next";
import Link from "next/link";
import { SITE_CONFIG } from "@/data/site";
import { SetAlsoSee } from "@/components/seo/SeoContext";

export const metadata: Metadata = {
  title: `Contact Us | ${SITE_CONFIG.name}`,
  description:
    "Get in touch with India Tour for questions, bookings, or travel support. We're ready to help you plan your next adventure.",
  keywords: [
    "contact India Tour",
    "travel support",
    "book a tour",
    "travel inquiry",
  ],
  openGraph: {
    title: `Contact Us | ${SITE_CONFIG.name}`,
    description:
      "Reach out to India Tour for help with travel planning, inquiries, or bookings.",
    type: "website",
    locale: "en_US",
    siteName: SITE_CONFIG.name,
    images: [
      {
        url: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=1200&q=80",
        width: 1200,
        height: 800,
        alt: "Travel contact support",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `Contact Us | ${SITE_CONFIG.name}`,
    description:
      "Need a custom itinerary or travel support? Contact India Tour today.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ContactPage() {
  return (
    <>
      <SetAlsoSee
        items={[
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
        ]}
      />
      <div className="page-hero" style={{ height: 280 }}>
        <div
          className="page-hero-bg"
          style={{
            backgroundImage:
              "url('https://www.shutterstock.com/image-photo/contact-us-customer-service-operator-600nw-407228887.jpg')",
          }}
        />
        <div className="page-hero-overlay" />
        <div className="page-hero-content">
          <p className="breadcrumb">
            <Link href="/">Home</Link> › <Link href="/contact">Contact</Link>
          </p>
          <h1
            className="page-title"
            style={{ fontSize: "clamp(18px,3vw,32px)", maxWidth: 600 }}
          >
            We're here to help you travel with confidence.
          </h1>
        </div>
      </div>

      <div className="section" style={{ padding: "60px 5%" }}>
        <div className="content-grid" style={{ gap: 32 }}>
          <div>
            <p className="section-lead">
              Questions about a destination, departure dates, or the booking
              process? Send us a message and our travel advisors will respond
              quickly.
            </p>

            <form className="contact-form" style={{ maxWidth: 640 }}>
              <label>
                Name
                <input type="text" name="name" placeholder="Your name" />
              </label>
              <label>
                Email
                <input type="email" name="email" placeholder="Your email" />
              </label>
              <label>
                Subject
                <input type="text" name="subject" placeholder="Subject" />
              </label>
              <label>
                Message
                <textarea
                  name="message"
                  rows={6}
                  placeholder="How can we help you?"
                />
              </label>
              <button type="submit" className="btn-primary">
                Send Message
              </button>
            </form>
          </div>

          <div style={{ minWidth: 320 }}>
            <div className="about-card">
              <h3>Contact Details</h3>
              <p>
                <strong>Email:</strong> support@indiatour.org.in
              </p>
              <p>
                <strong>Phone:</strong> +1 (800) 123-4567
              </p>
              <p>
                <strong>Office Hours:</strong> Mon–Fri, 9am–6pm GMT
              </p>

              <div style={{ marginTop: 24 }}>
                <h4>Follow Us</h4>
                <p>
                  Stay connected for new tours, updates, and travel inspiration.
                </p>
                <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                  {[
                    { label: "Instagram", href: "#" },
                    { label: "Facebook", href: "#" },
                    { label: "Twitter", href: "#" },
                  ].map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      className="btn-outline"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
