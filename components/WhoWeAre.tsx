import React from "react";

const highlights = [
  "Government-approved tourist guide experience",
  "Private, flexible tours across North India",
  "Reliable planning from arrival to departure",
  "Honest pricing with personal local support",
];

const stats = [
  { value: "30+", label: "Years of experience" },
  { value: "100k+", label: "Happy travelers" },
  { value: "1989", label: "Serving guests since" },
];

export default function WhoWeAre() {
  return (
    <section className="who-we-are section" aria-labelledby="who-we-are-title">
      <div className="section-header who-header">
        <div className="section-eyebrow">Who We Are</div>
        <h2 id="who-we-are-title" className="section-title">
          Professional India travel specialists with deep local roots.
        </h2>
        <p className="section-desc who-desc">
          We design private journeys that feel smooth, safe, and personal - led
          by experienced local experts who understand India beyond the guidebook.
        </p>
      </div>

      <div className="who-grid">
        <div className="who-text">
          <p className="lead">
            India Tour is a trusted Agra-based tour and travel company serving
            guests from around the world with care, clarity, and professional
            service.
          </p>

          <p>
            Since 1989, our team has helped travelers experience the Taj Mahal,
            Agra, Rajasthan, Varanasi, Delhi, and many of India's most meaningful
            destinations with confidence. Every itinerary is planned around your
            pace, interests, comfort, and time.
          </p>

          <p>
            From airport assistance and hotel coordination to expert guiding and
            private transport, we focus on the details that make a journey feel
            effortless. Our goal is simple: warm hospitality, dependable service,
            and memorable experiences that show the real spirit of India.
          </p>

          <ul className="who-highlights" aria-label="India Tour highlights">
            {highlights.map((highlight) => (
              <li key={highlight}>{highlight}</li>
            ))}
          </ul>
        </div>

        <div className="who-media">
          <img
            src="https://images.unsplash.com/photo-1564507592333-c60657eea523?w=1000&q=80"
            alt="Taj Mahal India Tour"
          />
          <div className="who-stat-panel" aria-label="India Tour experience">
            {stats.map((stat) => (
              <div className="who-stat" key={stat.label}>
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
