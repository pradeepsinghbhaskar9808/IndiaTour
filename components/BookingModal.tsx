"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/AuthProvider";
import type { Tour } from "@/data/tours";
import { SITE_CONFIG } from "@/data/site";

interface BookingModalProps {
  tour: Tour;
  onClose: () => void;
}

const CAL_DAYS = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

export default function BookingModal({ tour, onClose }: BookingModalProps) {
  const router = useRouter();
  const { createBooking, currentUser } = useAuth();
  const [step, setStep] = useState(0);
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [adults, setAdults] = useState(0);
  const [children, setChildren] = useState(0);

  const total = adults * tour.price + children * Math.round(tour.price * 0.6);

  const calDays: Array<number | null> = [];
  for (let i = 0; i < 5; i += 1) calDays.push(null);
  for (let day = 1; day <= 31; day += 1) calDays.push(day);

  const handleCheckout = () => {
    if (!selectedDay) return;

    const result = createBooking({
      tour,
      selectedDay,
      adults,
      children,
    });

    if (!result.ok) {
      window.alert(result.error);
      return;
    }

    window.alert(
      `Booking saved!\n\nTour: ${tour.title}\nDate: May ${selectedDay}, 2026\nAdults: ${adults} | Children: ${children}\nTotal: $${total.toLocaleString()}\n\nYou can review it from your dashboard in ${SITE_CONFIG.name}.`,
    );

    onClose();

    if (currentUser?.role === "user") {
      router.push("/dashboard");
    }
  };

  return (
    <div
      className="modal-backdrop"
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="modal-container">
        <div className="modal-grid">
          <div className="modal-main">
            <div className="modal-tabs">
              <button
                className={`modal-tab${step === 0 ? " active" : ""}`}
                onClick={() => setStep(0)}
              >
                Date and Time
              </button>
              <button
                className={`modal-tab${step === 1 ? " active" : ""}`}
                onClick={() => selectedDay && setStep(1)}
              >
                Package Type
              </button>
            </div>

            {step === 0 ? (
              <div style={{ animation: "calendarFade 0.3s ease" }}>
                <div className="calendar-widget">
                  <div className="calendar-header">
                    <span className="calendar-month-label">May 2026</span>
                    <div style={{ display: "flex", gap: 6 }}>
                      <button className="calendar-nav-btn">&lt;</button>
                      <button className="calendar-nav-btn">&gt;</button>
                    </div>
                  </div>
                  <div className="calendar-grid">
                    {CAL_DAYS.map((dayLabel) => (
                      <div key={dayLabel} className="calendar-day-header">
                        {dayLabel}
                      </div>
                    ))}
                    {calDays.map((day, index) => {
                      const available = day !== null && day >= 26;
                      const selected = day === selectedDay;

                      return (
                        <div
                          key={`${day ?? "blank"}-${index}`}
                          className={[
                            "calendar-day",
                            !day ? "disabled" : "",
                            day && !available ? "disabled" : "",
                            available ? "available" : "",
                            selected ? "selected" : "",
                          ].join(" ")}
                          onClick={() => available && day && setSelectedDay(day)}
                        >
                          {day ?? ""}
                        </div>
                      );
                    })}
                  </div>
                </div>
                <button
                  className="continue-btn"
                  disabled={!selectedDay}
                  onClick={() => setStep(1)}
                >
                  Continue
                </button>
              </div>
            ) : (
              <div style={{ animation: "calendarFade 0.3s ease" }}>
                <div className="travellers-header">
                  <span>Travelers</span>
                  <span>Quantity</span>
                </div>

                <div className="traveller-row">
                  <div>
                    <div className="traveller-name">Adult</div>
                    <div className="traveller-price">
                      <s style={{ color: "#ccc" }}>${tour.fromPrice.toLocaleString()}</s>{" "}
                      <span className="traveller-price-amount">
                        ${tour.price.toLocaleString()}
                      </span>{" "}
                      / Person
                    </div>
                  </div>
                  <div className="qty-control">
                    <button
                      className="qty-btn"
                      disabled={adults === 0}
                      onClick={() => setAdults((current) => Math.max(0, current - 1))}
                    >
                      -
                    </button>
                    <span className="qty-num">{adults}</span>
                    <button className="qty-btn" onClick={() => setAdults((current) => current + 1)}>
                      +
                    </button>
                  </div>
                </div>

                <div className="traveller-row">
                  <div>
                    <div className="traveller-name">Child</div>
                    <div className="traveller-price">
                      <s style={{ color: "#ccc" }}>
                        ${Math.round(tour.fromPrice * 0.58).toLocaleString()}
                      </s>{" "}
                      <span className="traveller-price-amount">
                        ${Math.round(tour.price * 0.6).toLocaleString()}
                      </span>{" "}
                      / Person
                    </div>
                  </div>
                  <div className="qty-control">
                    <button
                      className="qty-btn"
                      disabled={children === 0}
                      onClick={() => setChildren((current) => Math.max(0, current - 1))}
                    >
                      -
                    </button>
                    <span className="qty-num">{children}</span>
                    <button
                      className="qty-btn"
                      onClick={() => setChildren((current) => current + 1)}
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="step-actions">
                  <button className="back-btn" onClick={() => setStep(0)}>
                    Back
                  </button>
                  <button
                    className="checkout-btn"
                    disabled={adults + children === 0}
                    onClick={handleCheckout}
                  >
                    Proceed To Checkout
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="modal-summary">
            <div className="summary-close-row">
              <h3 className="summary-title">Booking Summary</h3>
              <button className="modal-close" onClick={onClose}>
                X
              </button>
            </div>
            <p className="summary-tour-name">{tour.title.toUpperCase()}</p>
            <p className="summary-date-row">
              Starting Date:{" "}
              <span className="summary-date-val">
                {selectedDay ? `May ${selectedDay}, 2026` : "-"}
              </span>
            </p>
            <span className="summary-pkg-badge">Traveler booking</span>
            <div className="summary-total-row">
              <span>Total:</span>
              <span className="summary-total-amount">${total.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
