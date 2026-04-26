"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { DEMO_ACCOUNTS, useAuth } from "@/components/AuthProvider";
import { TOURS } from "@/data/tours";

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
}

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
}

export default function UserDashboardPage() {
  const { currentUser, isReady, bookings, payments, reviews } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");

  const userBookings = useMemo(
    () => bookings.filter((booking) => booking.userId === currentUser?.id),
    [bookings, currentUser?.id],
  );

  const userPayments = useMemo(
    () => payments.filter((payment) => payment.userId === currentUser?.id),
    [currentUser?.id, payments],
  );

  const userReviews = useMemo(
    () => reviews.filter((review) => review.userId === currentUser?.id),
    [currentUser?.id, reviews],
  );

  const wishlistTours = useMemo(
    () =>
      TOURS.filter((tour) => currentUser?.wishlist.includes(tour.slug)),
    [currentUser?.wishlist],
  );

  const filteredTours = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();
    if (!query) return TOURS.slice(0, 4);

    return TOURS.filter((tour) =>
      [tour.title, tour.location, tour.tag, tour.country]
        .join(" ")
        .toLowerCase()
        .includes(query),
    ).slice(0, 6);
  }, [searchTerm]);

  if (!isReady) {
    return (
      <section className="dashboard-page">
        <div className="dashboard-access-card">Loading your traveler dashboard...</div>
      </section>
    );
  }

  if (!currentUser) {
    return (
      <section className="dashboard-page">
        <div className="dashboard-access-card">
          <span className="dashboard-access-badge">Demo Login Required</span>
          <h1>Traveler dashboard access is ready.</h1>
          <p>
            Log in with the demo traveler account from the navbar to view bookings,
            wishlist, payments, reviews, and support tools.
          </p>
          <div className="dashboard-demo-credentials">
            <div className="dashboard-demo-item">
              <strong>User</strong>
              <span>{DEMO_ACCOUNTS.user.email}</span>
              <span>{DEMO_ACCOUNTS.user.password}</span>
            </div>
          </div>
          <Link href="/" className="btn-primary dashboard-access-link">
            Back to Home
          </Link>
        </div>
      </section>
    );
  }

  if (currentUser.role === "admin") {
    return (
      <section className="dashboard-page">
        <div className="dashboard-access-card">
          <span className="dashboard-access-badge">Admin Session Active</span>
          <h1>This page is for traveler accounts.</h1>
          <p>
            Your current session is an admin account. Open the admin control panel to
            manage users, bookings, reviews, payments, and tour operations.
          </p>
          <Link href="/admin" className="btn-primary dashboard-access-link">
            Open Admin Panel
          </Link>
        </div>
      </section>
    );
  }

  const totalSpent = userPayments.reduce(
    (sum, payment) => (payment.status === "paid" ? sum + payment.amount : sum),
    0,
  );
  const activeBookings = userBookings.filter(
    (booking) => booking.status === "approved" || booking.status === "pending",
  );

  return (
    <section className="dashboard-page">
      <div className="dashboard-shell">
        <div className="dashboard-hero">
          <div>
            <span className="dashboard-kicker">Traveler Dashboard</span>
            <h1>{currentUser.name.split(" ")[0]}, your next trip is taking shape.</h1>
            <p>
              Keep your profile, bookings, wishlist, payments, reviews, and travel
              support all in one organized place.
            </p>
          </div>
          <div className="dashboard-stat-grid">
            <div className="dashboard-stat-card">
              <span className="dashboard-stat-label">Active Bookings</span>
              <strong>{activeBookings.length}</strong>
            </div>
            <div className="dashboard-stat-card">
              <span className="dashboard-stat-label">Wishlist Tours</span>
              <strong>{wishlistTours.length}</strong>
            </div>
            <div className="dashboard-stat-card">
              <span className="dashboard-stat-label">Paid So Far</span>
              <strong>{formatCurrency(totalSpent)}</strong>
            </div>
          </div>
        </div>

        <div className="dashboard-grid">
          <div className="dashboard-card dashboard-profile-card">
            <div className="dashboard-card-head">
              <h2>Profile Section</h2>
              <span className="status-pill status-pill-approved">Traveler</span>
            </div>
            <div className="dashboard-profile-meta">
              <div>
                <span className="dashboard-meta-label">Email</span>
                <strong>{currentUser.email}</strong>
              </div>
              <div>
                <span className="dashboard-meta-label">Phone</span>
                <strong>{currentUser.phone}</strong>
              </div>
              <div>
                <span className="dashboard-meta-label">Location</span>
                <strong>{currentUser.location}</strong>
              </div>
              <div>
                <span className="dashboard-meta-label">Joined</span>
                <strong>{formatDate(currentUser.joinedAt)}</strong>
              </div>
            </div>
          </div>

          <div className="dashboard-card">
            <div className="dashboard-card-head">
              <h2>My Bookings</h2>
              <Link href="/tours" className="dashboard-inline-link">
                Explore more tours
              </Link>
            </div>
            <div className="dashboard-stack">
              {userBookings.length ? (
                userBookings.map((booking) => (
                  <div key={booking.id} className="dashboard-booking-item">
                    <div>
                      <strong>{booking.tourTitle}</strong>
                      <p>
                        {booking.destination} • {formatDate(booking.departureDate)}
                      </p>
                    </div>
                    <div className="dashboard-booking-side">
                      <span className={`status-pill status-pill-${booking.status}`}>
                        {booking.status}
                      </span>
                      <span>{formatCurrency(booking.totalAmount)}</span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="dashboard-empty-state">
                  No bookings yet. Reserve a tour to see it here.
                </div>
              )}
            </div>
          </div>

          <div className="dashboard-card dashboard-span-2">
            <div className="dashboard-card-head">
              <h2>Search &amp; Explore Tours</h2>
            </div>
            <input
              className="dashboard-search-input"
              type="search"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search destinations, tour tags, or countries"
            />
            <div className="dashboard-tour-grid">
              {filteredTours.map((tour) => (
                <Link key={tour.slug} href={`/tours/${tour.slug}`} className="dashboard-tour-card">
                  <img src={tour.image} alt={tour.title} />
                  <div>
                    <strong>{tour.title}</strong>
                    <span>
                      {tour.location} • {formatCurrency(tour.price)}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div className="dashboard-card">
            <div className="dashboard-card-head">
              <h2>Wishlist / Favorites</h2>
            </div>
            <div className="dashboard-stack">
              {wishlistTours.length ? (
                wishlistTours.map((tour) => (
                  <Link key={tour.slug} href={`/tours/${tour.slug}`} className="dashboard-wishlist-item">
                    <span>{tour.title}</span>
                    <span>❤️</span>
                  </Link>
                ))
              ) : (
                <div className="dashboard-empty-state">
                  Save tours from the card wishlist button to see them here.
                </div>
              )}
            </div>
          </div>

          <div className="dashboard-card">
            <div className="dashboard-card-head">
              <h2>Payments</h2>
            </div>
            <div className="dashboard-stack">
              {userPayments.length ? (
                userPayments.map((payment) => (
                  <div key={payment.id} className="dashboard-payment-item">
                    <div>
                      <strong>{formatCurrency(payment.amount)}</strong>
                      <p>
                        {payment.method} • {formatDate(payment.paidAt)}
                      </p>
                    </div>
                    <span className={`status-pill status-pill-${payment.status}`}>
                      {payment.status}
                    </span>
                  </div>
                ))
              ) : (
                <div className="dashboard-empty-state">No payment history yet.</div>
              )}
            </div>
          </div>

          <div className="dashboard-card">
            <div className="dashboard-card-head">
              <h2>Reviews &amp; Ratings</h2>
            </div>
            <div className="dashboard-stack">
              {userReviews.length ? (
                userReviews.map((review) => (
                  <div key={review.id} className="dashboard-review-item">
                    <div>
                      <strong>{review.tourTitle}</strong>
                      <p>{review.comment}</p>
                    </div>
                    <div className="dashboard-review-side">
                      <span>{review.rating}/5</span>
                      <span className={`status-pill status-pill-${review.status}`}>
                        {review.status}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="dashboard-empty-state">
                  No reviews yet. After your next trip, share your experience here.
                </div>
              )}
            </div>
          </div>

          <div className="dashboard-card">
            <div className="dashboard-card-head">
              <h2>Support / Help</h2>
            </div>
            <div className="dashboard-support-grid">
              <div className="dashboard-support-item">
                <strong>Booking Help</strong>
                <p>Get help with departures, dates, and traveler details.</p>
              </div>
              <div className="dashboard-support-item">
                <strong>Payment Support</strong>
                <p>Track your payment status and ask for billing help.</p>
              </div>
              <div className="dashboard-support-item">
                <strong>Travel Assistance</strong>
                <p>Reach support for itinerary changes, vouchers, and updates.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
