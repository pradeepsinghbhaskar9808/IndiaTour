export default function Loading() {
  return (
    <main className="tour-loader" aria-label="Loading tour content">
      <div className="tour-loader-card" role="status" aria-live="polite">
        <div className="tour-loader-map" aria-hidden="true">
          <span className="tour-loader-pin tour-loader-pin-start" />
          <span className="tour-loader-pin tour-loader-pin-end" />
          <span className="tour-loader-route" />
          <span className="tour-loader-plane">&#9992;</span>
        </div>

        <div className="tour-loader-copy">
          <span className="tour-loader-eyebrow">India Tour</span>
          <h1>Preparing your journey</h1>
          <p>Curating routes, stays, guides, and experiences for a smooth trip.</p>
        </div>

        <div className="tour-loader-progress" aria-hidden="true">
          <span />
        </div>
      </div>
    </main>
  );
}
