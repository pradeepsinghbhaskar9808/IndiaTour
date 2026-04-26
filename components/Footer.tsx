import { SITE_CONFIG } from "@/data/site";

export default function Footer() {
  const quickLinks = [
    "Tour Three",
    "Tour Two",
    "About Us",
    "Teams",
    "My Account",
  ];
  const popularLoc = [
    "Tour",
    "Tour Types",
    "Tour Activities",
    "Destinations",
    "Contact",
  ];
  const destinations = [
    "New York",
    "Maldives",
    "Dubai Coastline",
    "Bali Indonesia",
    "Greek Islands",
  ];

  return (
    <footer className="footer">
      <div className="footer-grid">
        {/* Brand */}
        <div>
          <span className="footer-brand">{SITE_CONFIG.name}</span>
          <p className="footer-desc">
            We take care of every detail so you can travel with confidence and
            ease. Your adventure, our passion.
          </p>
          <div className="footer-app-btns">
            {/* <button className="footer-app-btn">🍎 App Store</button> */}
            <button className="footer-app-btn">▶ Google Play</button>
          </div>
        </div>

        {/* Quick Links */}
        <div className="footer-col">
          <h5>Quick Links</h5>
          {quickLinks.map((l) => (
            <a key={l} href="#">
              {l}
            </a>
          ))}
        </div>

        {/* Popular Location */}
        <div className="footer-col">
          <h5>Popular Location</h5>
          {popularLoc.map((l) => (
            <a key={l} href="#">
              {l}
            </a>
          ))}
        </div>

        {/* Destination */}
        <div className="footer-col">
          <h5>Destination</h5>
          {destinations.map((d) => (
            <a key={d} href="#">
              {d}
            </a>
          ))}
        </div>

        {/* Newsletter */}
        <div className="footer-col">
          <h5>Newsletter</h5>
          <p
            style={{
              fontSize: 13,
              opacity: 0.62,
              marginBottom: 12,
              lineHeight: 1.65,
            }}
          >
            Subscribe to our newsletter for travel deals &amp; tips.
          </p>
          <input
            className="footer-newsletter-input"
            type="email"
            placeholder="Email address..."
          />
          <button className="footer-subscribe-btn">Subscribe</button>
        </div>
      </div>

      <div className="footer-bottom">
        <span>
          ©ReactThemes. All Rights Reserved. Design by {SITE_CONFIG.name}
        </span>
        <div className="footer-payments">
          {["VISA", "MC", "PayPal", "Skrill"].map((p) => (
            <span key={p} className="payment-badge">
              {p}
            </span>
          ))}
        </div>
      </div>
    </footer>
  );
}
