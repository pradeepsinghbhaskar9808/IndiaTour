"use client";

import Link from "next/link";
import { useMemo, useRef, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { DESTINATIONS, TOURS } from "@/data/tours";

type SearchSuggestion = {
  title: string;
  subtitle: string;
  image: string;
  href: string;
  badge: string;
  keywords: string;
};

function SearchIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="11" cy="11" r="7" />
      <line x1="16.5" y1="16.5" x2="21" y2="21" />
    </svg>
  );
}

export default function HeroSearchBar() {
  const router = useRouter();
  const wrapRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const suggestions = useMemo<SearchSuggestion[]>(() => {
    const destinationSuggestions = DESTINATIONS.map((destination) => ({
      title: destination.name,
      subtitle: `${destination.tours} tour packages available`,
      image: destination.image,
      href: `/destinations?search=${encodeURIComponent(destination.name)}`,
      badge: "Destination",
      keywords: `${destination.name} destination package holiday`,
    }));

    const tourSuggestions = TOURS.map((tour) => ({
      title: tour.title,
      subtitle: `${tour.location} - ${tour.duration}`,
      image: tour.image,
      href: `/tours/${tour.slug}`,
      badge: tour.country === "India" ? "Domestic" : "International",
      keywords: [
        tour.title,
        tour.location,
        tour.country,
        tour.tag,
        tour.duration,
        tour.description,
      ].join(" "),
    }));

    return [...tourSuggestions, ...destinationSuggestions];
  }, []);

  const filteredSuggestions = useMemo(() => {
    const searchText = query.trim().toLowerCase();

    if (!searchText) {
      return suggestions
        .filter((item) => item.badge === "Domestic" || item.badge === "Destination")
        .slice(0, 6);
    }

    return suggestions
      .filter((item) => item.keywords.toLowerCase().includes(searchText))
      .slice(0, 8);
  }, [query, suggestions]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const openSearch = () => {
    setIsOpen(true);
    window.setTimeout(() => inputRef.current?.focus(), 0);
  };

  const submitSearch = () => {
    const firstSuggestion = filteredSuggestions[0];

    if (firstSuggestion) {
      router.push(firstSuggestion.href);
      setIsOpen(false);
      return;
    }

    if (query.trim()) {
      router.push(`/tours?search=${encodeURIComponent(query.trim())}`);
      setIsOpen(false);
    }
  };

  return (
    <div className="tour-search-wrap" ref={wrapRef}>
      <div className="tour-search-shell">
        <button
          type="button"
          className="tour-search-input-shell"
          onClick={openSearch}
          aria-label="Open tour search suggestions"
        >
          <SearchIcon />
          <span>{query || "Search destination, city, tour, or experience"}</span>
        </button>

        <button type="button" className="tour-search-submit" onClick={submitSearch}>
          Search
        </button>
      </div>

      {isOpen && (
        <div className="tour-search-popover" role="dialog" aria-label="Tour search">
          <div className="tour-search-input-row">
            <SearchIcon />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") submitSearch();
                if (event.key === "Escape") setIsOpen(false);
              }}
              placeholder='Search "Agra", "Golden Triangle", "Dubai"...'
              aria-label="Search tours and destinations"
            />
          </div>

          <div className="tour-search-results">
            <div className="tour-search-results-title">
              {query.trim() ? "Matching tour suggestions" : "Most searched tour packages"}
            </div>

            {filteredSuggestions.length > 0 ? (
              <div className="tour-search-grid">
                {filteredSuggestions.map((item) => (
                  <Link
                    href={item.href}
                    className="tour-search-card"
                    key={`${item.badge}-${item.title}`}
                    onClick={() => setIsOpen(false)}
                  >
                    <img src={item.image} alt={item.title} />
                    <span>
                      <strong>{item.title}</strong>
                      <small>{item.subtitle}</small>
                    </span>
                    <em>{item.badge}</em>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="tour-search-empty">
                No suggestions found. Try Agra, Jaipur, Dubai, Safari, or Golden
                Triangle.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
