import Link from "next/link";

interface AlsoSeeProps {
  items: string[];
  title?: string;
}

export default function AlsoSee({ items, title = "Also see" }: AlsoSeeProps) {
  if (!items || items.length === 0) return null;

  const uniq = Array.from(new Set(items)).slice(0, 30);

  return (
    <section className="also-see" aria-labelledby="also-see-title">
      <div className="also-see-header">
        <div>
          <div className="section-eyebrow">Trending searches</div>
          <h2 id="also-see-title">{title}</h2>
        </div>
        <span className="also-see-count">{uniq.length} packages</span>
      </div>

      <div className="also-see-links">
        {uniq.map((item) => (
          <Link
            key={item}
            href={`/tours?search=${encodeURIComponent(item)}`}
            className="seo-link"
          >
            <span>{item}</span>
            {/* <small aria-hidden="true">View</small> */}
          </Link>
        ))}
      </div>
    </section>
  );
}
