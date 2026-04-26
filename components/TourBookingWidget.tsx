"use client";
import { useState } from "react";
import type { Tour } from "@/data/tours";
import BookingModal from "@/components/BookingModal";

interface TourBookingWidgetProps {
  tour: Tour;
}

export default function TourBookingWidget({ tour }: TourBookingWidgetProps) {
  const [bookingOpen, setBookingOpen] = useState(false);

  return (
    <>
      <div className="booking-widget">
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            gap: 8,
            marginBottom: 4,
          }}
        >
          <span className="booking-price">${tour.price.toLocaleString()}</span>
          <span className="booking-price-old">
            ${tour.fromPrice.toLocaleString()}
          </span>
          <span
            style={{ fontSize: 12, color: "var(--green)", fontWeight: 600 }}
          >
            / Person
          </span>
        </div>

        <div className="booking-rating-bar">
          <span style={{ color: "#f59e0b", fontSize: 13 }}>
            {"★".repeat(Math.round(tour.rating))}
          </span>
          <span
            style={{
              fontSize: 13,
              color: "var(--green-dark)",
              fontWeight: 600,
            }}
          >
            {tour.rating}
          </span>
          <span style={{ fontSize: 12, color: "var(--muted)" }}>
            ({tour.reviews} reviews)
          </span>
        </div>

        <button
          className="check-avail-btn"
          onClick={() => setBookingOpen(true)}
        >
          Check Availability
        </button>

        <div className="widget-info">
          <div className="widget-info-title">Information</div>
          {[
            { key: "Departure", val: tour.info.meetingPoint },
            { key: "Departure Time", val: tour.info.departureTime },
            { key: "Return", val: tour.info.meetingPoint },
            { key: "Duration", val: `${tour.days} Days` },
            { key: "Group Size", val: tour.info.groupSize },
            { key: "Min Age", val: tour.info.minAge },
            { key: "Languages", val: tour.info.languages },
            { key: "Meals", val: tour.info.meals },
            { key: "Accommodation", val: tour.info.accommodation },
            { key: "Transportation", val: tour.info.transportation },
            { key: "Cancellation", val: tour.info.cancellation },
          ].map((r) => (
            <div key={r.key} className="widget-info-row">
              <span className="widget-info-key">{r.key}</span>
              <span className="widget-info-val">{r.val}</span>
            </div>
          ))}
        </div>
      </div>

      {bookingOpen && (
        <BookingModal tour={tour} onClose={() => setBookingOpen(false)} />
      )}
    </>
  );
}
