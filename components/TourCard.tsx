"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/components/AuthProvider";
import type { Tour } from "@/data/tours";

interface TourCardProps {
  tour: Tour;
  animDelay?: number;
}

function StarRating({ rating }: { rating: number }) {
  const full = Math.round(rating);
  return (
    <span className="stars-gold">
      {"★".repeat(full)}
      {"☆".repeat(5 - full)}
    </span>
  );
}

export default function TourCard({ tour, animDelay = 0 }: TourCardProps) {
  const [activeImage, setActiveImage] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const { currentUser, toggleWishlist } = useAuth();

  const gallery = tour.gallery?.length ? tour.gallery : [tour.image];
  const wished = currentUser?.role === "user" && currentUser.wishlist.includes(tour.slug);

  const changeSlide = (direction: number) => {
    setActiveImage(
      (current) => (current + direction + gallery.length) % gallery.length,
    );
  };

  useEffect(() => {
    if (isHovered) return;
    if (gallery.length <= 1) return;

    const interval = window.setInterval(() => {
      setActiveImage((current) => (current + 1) % gallery.length);
    }, 3200);

    return () => window.clearInterval(interval);
  }, [gallery.length, isHovered]);

  return (
    <div
      className="tour-card"
      style={{ animationDelay: `${animDelay}s` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="tour-card-image">
        <div
          className="tour-card-slider-track"
          style={{ transform: `translateX(-${activeImage * 100}%)` }}
        >
          {gallery.map((image, index) => (
            <img
              key={`${tour.id}-${index}`}
              src={image}
              alt={tour.title}
              loading="lazy"
            />
          ))}
        </div>

        <div className="tour-card-image-fade" />

        {tour.discount > 0 && (
          <span className="badge-discount">{tour.discount}% Off</span>
        )}
        {tour.featured && <span className="badge-featured">⭐ Featured</span>}
        {gallery.length > 1 && (
          <>
            <div className="tour-slider-nav">
              <button
                type="button"
                className="tour-slider-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  changeSlide(-1);
                }}
                aria-label={`Previous image for ${tour.title}`}
              >
                ‹
              </button>
              <button
                type="button"
                className="tour-slider-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  changeSlide(1);
                }}
                aria-label={`Next image for ${tour.title}`}
              >
                ›
              </button>
            </div>

            <div className="tour-slider-dots" aria-hidden="true">
              {gallery.map((_, index) => (
                <span
                  key={`${tour.id}-dot-${index}`}
                  className={`tour-slider-dot${index === activeImage ? " active" : ""}`}
                />
              ))}
            </div>
          </>
        )}

        <button
          className="wishlist-btn"
          onClick={(e) => {
            e.stopPropagation();
            const result = toggleWishlist(tour);
            if (!result.ok) {
              window.alert(result.error);
            }
          }}
          aria-label="Add to wishlist"
        >
          <span style={{ color: wished ? "#e74c3c" : "#9ca3af" }}>
            {wished ? "♥" : "♡"}
          </span>
        </button>
      </div>

      <div className="tour-card-body">
        <div className="tour-card-topline">
          <span className="tour-tag">{tour.tag}</span>
          <span className="tour-duration-badge">{tour.duration}</span>
        </div>

        <Link href={`/tours/${tour.slug}`}>
          <h3 className="tour-card-title">{tour.title}</h3>
        </Link>

        <div className="tour-card-meta">
          <span>📍 {tour.location}</span>
          <span>
            <StarRating rating={tour.rating} /> ({tour.reviews})
          </span>
        </div>

        <div className="tour-price-row">
          <span className="price-from">From</span>
          <span className="price-old">${tour.fromPrice.toLocaleString()}</span>
          <span className="price-new">${tour.price.toLocaleString()}</span>
        </div>

        <Link href={`/tours/${tour.slug}`}>
          <button className="view-details-btn">View Details</button>
        </Link>
      </div>
    </div>
  );
}
