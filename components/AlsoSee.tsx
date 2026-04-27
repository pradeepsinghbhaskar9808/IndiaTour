import Link from "next/link";

interface AlsoSeeProps {
  items: string[];
  title?: string;
}

export default function AlsoSee({ items, title = "Also see" }: AlsoSeeProps) {
  if (!items || items.length === 0) return null;

  const uniq = Array.from(new Set(items)).slice(0, 30);

  return (
    <div className="also-see" style={{ marginTop: 28 }}>
      <div className="section-header" style={{ marginBottom: 12 }}>
        <div className="section-eyebrow">{title}</div>
      </div>

      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        {uniq.map((item) => (
          <Link
            key={item}
            href={`/tours?search=${encodeURIComponent(item)}`}
            className="seo-link"
            style={{
              padding: "6px 10px",
              borderRadius: 6,
              background: "#f3f4f6",
              color: "#0f172a",
              textDecoration: "none",
              fontSize: 13,
            }}
          >
            {item}
          </Link>
        ))}
      </div>
    </div>
  );
}
