import Link from "next/link";

export default function NotFound() {
  return (
    <div
      style={{
        minHeight: "70vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "80px 20px",
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      <div style={{ fontSize: 72, marginBottom: 16 }}>🗺️</div>
      <h1
        style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "clamp(32px, 5vw, 56px)",
          fontWeight: 900,
          marginBottom: 12,
          color: "#1a1a1a",
        }}
      >
        Page Not Found
      </h1>
      <p style={{ fontSize: 16, color: "#6b7280", maxWidth: 400, lineHeight: 1.7, marginBottom: 32 }}>
        Looks like you've wandered off the beaten path. Let's get you back on track.
      </p>
      <div style={{ display: "flex", gap: 12 }}>
        <Link href="/">
          <button
            style={{
              padding: "12px 28px",
              background: "#2ecc7a",
              color: "#fff",
              border: "none",
              borderRadius: 10,
              fontSize: 15,
              fontWeight: 600,
              cursor: "pointer",
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            ← Go Home
          </button>
        </Link>
        <Link href="/tours">
          <button
            style={{
              padding: "12px 28px",
              background: "transparent",
              color: "#1aab60",
              border: "1.5px solid #2ecc7a",
              borderRadius: 10,
              fontSize: 15,
              fontWeight: 600,
              cursor: "pointer",
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            Browse Tours
          </button>
        </Link>
      </div>
    </div>
  );
}
