"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  DEMO_ACCOUNTS,
  type BookingStatus,
  type PaymentStatus,
  useAuth,
} from "@/components/AuthProvider";
import { TOURS } from "@/data/tours";
import { SITE_CONFIG } from "@/data/site";

type AdminSection =
  | "overview"
  | "tours"
  | "users"
  | "bookings"
  | "payments"
  | "reviews"
  | "content"
  | "settings";

type AdminActivity = {
  id: string;
  type: "User" | "Booking" | "Payment" | "Review";
  title: string;
  description: string;
  occurredAt: string;
  status?: string;
};

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

function menuLabel(section: AdminSection) {
  switch (section) {
    case "overview":
      return "Dashboard Overview";
    case "tours":
      return "Manage Tours";
    case "users":
      return "Manage Users";
    case "bookings":
      return "Manage Bookings";
    case "payments":
      return "Payments";
    case "reviews":
      return "Reviews";
    case "content":
      return "Content Management";
    case "settings":
      return "Settings";
  }
}

export default function AdminDashboardPage() {
  const {
    currentUser,
    isReady,
    users,
    bookings,
    payments,
    reviews,
    toggleUserStatus,
    updateBookingStatus,
    updatePaymentStatus,
    updateReviewStatus,
    deleteReview,
    logout,
  } = useAuth();
  const [activeSection, setActiveSection] = useState<AdminSection>("overview");

  const totalUsers = users.filter((user) => user.role === "user").length;
  const activeUsers = users.filter((user) => user.role === "user" && user.status === "active");
  const totalRevenue = useMemo(
    () =>
      payments.reduce(
        (sum, payment) => (payment.status === "paid" ? sum + payment.amount : sum),
        0,
      ),
    [payments],
  );
  const pendingBookings = bookings.filter((booking) => booking.status === "pending").length;
  const pendingReviews = reviews.filter((review) => review.status === "pending").length;
  const refundedPayments = payments.filter((payment) => payment.status === "refunded").length;
  const inactiveUsers = users.filter(
    (user) => user.role === "user" && user.status === "inactive",
  ).length;

  const recentActivities = useMemo<AdminActivity[]>(() => {
    const userActivity: AdminActivity[] = users
      .filter((user) => user.role === "user")
      .map((user) => ({
        id: `user-${user.id}`,
        type: "User",
        title: `${user.name} account updated`,
        description: `${user.email} is currently ${user.status}.`,
        occurredAt: user.joinedAt,
        status: user.status,
      }));

    const bookingActivity: AdminActivity[] = bookings.map((booking) => ({
      id: `booking-${booking.id}`,
      type: "Booking",
      title: `Booking received for ${booking.tourTitle}`,
      description: `${booking.userName} booked ${booking.totalTravelers} traveler(s) for ${formatCurrency(booking.totalAmount)}.`,
      occurredAt: booking.createdAt,
      status: booking.status,
    }));

    const paymentActivity: AdminActivity[] = payments.map((payment) => ({
      id: `payment-${payment.id}`,
      type: "Payment",
      title: `${payment.status === "refunded" ? "Refund" : "Payment"} recorded`,
      description: `${payment.userName} completed a ${payment.method} transaction for ${formatCurrency(payment.amount)}.`,
      occurredAt: payment.paidAt,
      status: payment.status,
    }));

    const reviewActivity: AdminActivity[] = reviews.map((review) => ({
      id: `review-${review.id}`,
      type: "Review",
      title: `Review submitted for ${review.tourTitle}`,
      description: `${review.userName} left a ${review.rating}/5 review.`,
      occurredAt: review.createdAt,
      status: review.status,
    }));

    return [...userActivity, ...bookingActivity, ...paymentActivity, ...reviewActivity]
      .sort(
        (left, right) =>
          new Date(right.occurredAt).getTime() - new Date(left.occurredAt).getTime(),
      )
      .slice(0, 8);
  }, [bookings, payments, reviews, users]);

  const menuGroups: Array<{
    label: string;
    items: Array<{ id: AdminSection; label: string; badge?: string }>;
  }> = [
    {
      label: "Main",
      items: [{ id: "overview", label: "Dashboard Overview", badge: String(recentActivities.length) }],
    },
    {
      label: "Management",
      items: [
        { id: "tours", label: "Manage Tours", badge: String(TOURS.length) },
        { id: "users", label: "Manage Users", badge: String(totalUsers) },
        { id: "bookings", label: "Manage Bookings", badge: String(bookings.length) },
        { id: "payments", label: "Payments", badge: String(payments.length) },
        { id: "reviews", label: "Reviews", badge: String(reviews.length) },
      ],
    },
    {
      label: "Site",
      items: [
        { id: "content", label: "Content Management" },
        { id: "settings", label: "Settings" },
      ],
    },
  ];

  const activeTitle = menuLabel(activeSection);

  if (!isReady) {
    return (
      <section className="dashboard-page">
        <div className="dashboard-access-card">Loading your admin dashboard...</div>
      </section>
    );
  }

  if (!currentUser) {
    return (
      <section className="dashboard-page admin-dashboard-page">
        <div className="dashboard-access-card">
          <span className="dashboard-access-badge">Admin Login Required</span>
          <h1>The backend control panel is ready.</h1>
          <p>
            Log in with the admin demo account from the home page to open the
            separate backend dashboard and manage the full tour platform.
          </p>
          <div className="dashboard-demo-credentials">
            <div className="dashboard-demo-item">
              <strong>Admin</strong>
              <span>{DEMO_ACCOUNTS.admin.email}</span>
              <span>{DEMO_ACCOUNTS.admin.password}</span>
            </div>
          </div>
          <Link href="/" className="btn-primary dashboard-access-link">
            Back to Home
          </Link>
        </div>
      </section>
    );
  }

  if (currentUser.role !== "admin") {
    return (
      <section className="dashboard-page admin-dashboard-page">
        <div className="dashboard-access-card">
          <span className="dashboard-access-badge">Traveler Session Active</span>
          <h1>This backend panel is for admin accounts only.</h1>
          <p>
            Your current session is a traveler account. Open your traveler dashboard
            to manage your bookings, wishlist, and travel activity.
          </p>
          <Link href="/dashboard" className="btn-primary dashboard-access-link">
            Open Traveler Dashboard
          </Link>
        </div>
      </section>
    );
  }

  const renderSection = () => {
    switch (activeSection) {
      case "overview":
        return (
          <div className="admin-content-stack">
            <section className="admin-section-card">
              <div className="admin-section-head">
                <div>
                  <span className="admin-section-label">Executive Summary</span>
                  <h3>Platform performance overview</h3>
                </div>
              </div>

              <div className="admin-metric-grid">
                <div className="admin-metric-card">
                  <span>Total Users</span>
                  <strong>{totalUsers}</strong>
                </div>
                <div className="admin-metric-card">
                  <span>Active Travelers</span>
                  <strong>{activeUsers.length}</strong>
                </div>
                <div className="admin-metric-card">
                  <span>Total Bookings</span>
                  <strong>{bookings.length}</strong>
                </div>
                <div className="admin-metric-card">
                  <span>Total Revenue</span>
                  <strong>{formatCurrency(totalRevenue)}</strong>
                </div>
              </div>
            </section>

            <div className="admin-overview-layout">
              <section className="admin-section-card">
                <div className="admin-section-head">
                  <div>
                    <span className="admin-section-label">Action Center</span>
                    <h3>Priority items requiring attention</h3>
                  </div>
                </div>

                <div className="admin-priority-grid">
                  <button
                    type="button"
                    className="admin-priority-card"
                    onClick={() => setActiveSection("bookings")}
                  >
                    <span className="admin-priority-label">Pending bookings</span>
                    <strong>{pendingBookings}</strong>
                    <p>Review traveler bookings waiting for approval.</p>
                  </button>
                  <button
                    type="button"
                    className="admin-priority-card"
                    onClick={() => setActiveSection("reviews")}
                  >
                    <span className="admin-priority-label">Pending reviews</span>
                    <strong>{pendingReviews}</strong>
                    <p>Moderate feedback before it appears live.</p>
                  </button>
                  <button
                    type="button"
                    className="admin-priority-card"
                    onClick={() => setActiveSection("payments")}
                  >
                    <span className="admin-priority-label">Refund cases</span>
                    <strong>{refundedPayments}</strong>
                    <p>Check refunded or disputed payment records.</p>
                  </button>
                  <button
                    type="button"
                    className="admin-priority-card"
                    onClick={() => setActiveSection("users")}
                  >
                    <span className="admin-priority-label">Inactive users</span>
                    <strong>{inactiveUsers}</strong>
                    <p>Review disabled traveler accounts and access states.</p>
                  </button>
                </div>
              </section>

              <section className="admin-section-card">
                <div className="admin-section-head">
                  <div>
                    <span className="admin-section-label">Recent Activity</span>
                    <h3>Latest platform activity</h3>
                  </div>
                </div>

                <div className="admin-activity-feed">
                  {recentActivities.map((activity) => (
                    <div key={activity.id} className="admin-activity-item">
                      <div className="admin-activity-badge">{activity.type}</div>
                      <div className="admin-activity-content">
                        <strong>{activity.title}</strong>
                        <p>{activity.description}</p>
                        <div className="admin-activity-meta">
                          <span>{formatDate(activity.occurredAt)}</span>
                          {activity.status ? (
                            <span className={`status-pill status-pill-${activity.status}`}>
                              {activity.status}
                            </span>
                          ) : null}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </div>
        );

      case "tours":
        return (
          <section className="admin-section-card">
            <div className="admin-section-head">
              <div>
                <span className="admin-section-label">Tour Control</span>
                <h3>Add, update, and organize tours</h3>
              </div>
              <button className="dashboard-action-btn">Add New Tour</button>
            </div>

            <div className="admin-tour-grid">
              {TOURS.map((tour) => (
                <article key={tour.slug} className="admin-tour-card">
                  <img className="admin-tour-image" src={tour.image} alt={tour.title} />
                  <div className="admin-tour-content">
                    <div className="admin-tour-head">
                      <div>
                        <strong>{tour.title}</strong>
                        <p>
                          {tour.location} • {formatCurrency(tour.price)} • {tour.duration}
                        </p>
                      </div>
                      <span className="status-pill status-pill-approved">{tour.tag}</span>
                    </div>

                    <div className="admin-chip-row">
                      <span className="admin-chip">Group {tour.info.groupSize}</span>
                      <span className="admin-chip">{tour.info.accommodation}</span>
                      <span className="admin-chip">{tour.info.meals}</span>
                      <span className="admin-chip">Departure {tour.info.departureTime}</span>
                    </div>

                    <div className="admin-tour-detail-grid">
                      <div className="admin-tour-block">
                        <h4>Tour Details</h4>
                        <p>{tour.description}</p>
                      </div>
                      <div className="admin-tour-block">
                        <h4>Upcoming Departures</h4>
                        <div className="admin-departures">
                          {tour.departures.map((departure) => (
                            <span key={departure} className="admin-departure-pill">
                              {departure}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="admin-tour-block admin-tour-block-wide">
                        <h4>Itinerary Preview</h4>
                        <div className="admin-itinerary-list">
                          {tour.itinerary.slice(0, 3).map((item) => (
                            <div key={`${tour.slug}-${item.day}`} className="admin-itinerary-item">
                              <strong>{item.day}</strong>
                              <span>{item.title}</span>
                              <p>{item.description}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="dashboard-actions-row">
                      <button className="dashboard-secondary-btn">Upload Images</button>
                      <button className="dashboard-secondary-btn">Edit Details</button>
                      <button className="dashboard-secondary-btn">Edit Itinerary</button>
                      <button className="dashboard-secondary-btn">Manage Departures</button>
                      <button className="dashboard-danger-btn">Delete Tour</button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        );

      case "users":
        return (
          <section className="admin-section-card">
            <div className="admin-section-head">
              <div>
                <span className="admin-section-label">Traveler Accounts</span>
                <h3>User list and account control</h3>
              </div>
            </div>

            <div className="admin-table">
              <div className="admin-table-head">
                <span>User</span>
                <span>Contact</span>
                <span>Status</span>
                <span>Action</span>
              </div>
              {users
                .filter((user) => user.role === "user")
                .map((user) => (
                  <div key={user.id} className="admin-table-row">
                    <div>
                      <strong>{user.name}</strong>
                      <p>Joined {formatDate(user.joinedAt)}</p>
                    </div>
                    <div>
                      <strong>{user.email}</strong>
                      <p>{user.location}</p>
                    </div>
                    <div>
                      <span className={`status-pill status-pill-${user.status}`}>
                        {user.status}
                      </span>
                    </div>
                    <div className="admin-table-actions">
                      <button
                        className="dashboard-secondary-btn"
                        onClick={() => toggleUserStatus(user.id)}
                      >
                        {user.status === "active" ? "Deactivate" : "Activate"}
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </section>
        );

      case "bookings":
        return (
          <section className="admin-section-card">
            <div className="admin-section-head">
              <div>
                <span className="admin-section-label">Booking Queue</span>
                <h3>Approve, reject, and track travel bookings</h3>
              </div>
            </div>

            <div className="admin-table">
              <div className="admin-table-head">
                <span>Tour</span>
                <span>Traveler</span>
                <span>Departure</span>
                <span>Status</span>
                <span>Actions</span>
              </div>
              {bookings.map((booking) => (
                <div key={booking.id} className="admin-table-row">
                  <div>
                    <strong>{booking.tourTitle}</strong>
                    <p>{formatCurrency(booking.totalAmount)}</p>
                  </div>
                  <div>
                    <strong>{booking.userName}</strong>
                    <p>{booking.totalTravelers} travelers</p>
                  </div>
                  <div>
                    <strong>{formatDate(booking.departureDate)}</strong>
                    <p>{formatDate(booking.createdAt)}</p>
                  </div>
                  <div>
                    <span className={`status-pill status-pill-${booking.status}`}>
                      {booking.status}
                    </span>
                  </div>
                  <div className="admin-table-actions">
                    {(["approved", "pending", "rejected"] as BookingStatus[]).map((status) => (
                      <button
                        key={`${booking.id}-${status}`}
                        className="dashboard-secondary-btn"
                        onClick={() => updateBookingStatus(booking.id, status)}
                      >
                        {status}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        );

      case "payments":
        return (
          <section className="admin-section-card">
            <div className="admin-section-head">
              <div>
                <span className="admin-section-label">Payments Desk</span>
                <h3>Payment records and refund handling</h3>
              </div>
            </div>

            <div className="admin-table">
              <div className="admin-table-head">
                <span>User</span>
                <span>Amount</span>
                <span>Method</span>
                <span>Status</span>
                <span>Action</span>
              </div>
              {payments.map((payment) => (
                <div key={payment.id} className="admin-table-row">
                  <div>
                    <strong>{payment.userName}</strong>
                    <p>{formatDate(payment.paidAt)}</p>
                  </div>
                  <div>
                    <strong>{formatCurrency(payment.amount)}</strong>
                    <p>Booking #{payment.bookingId}</p>
                  </div>
                  <div>
                    <strong>{payment.method}</strong>
                    <p>Transaction recorded</p>
                  </div>
                  <div>
                    <span className={`status-pill status-pill-${payment.status}`}>
                      {payment.status}
                    </span>
                  </div>
                  <div className="admin-table-actions">
                    <button
                      className="dashboard-secondary-btn"
                      onClick={() =>
                        updatePaymentStatus(
                          payment.id,
                          payment.status === "paid"
                            ? ("refunded" as PaymentStatus)
                            : ("paid" as PaymentStatus),
                        )
                      }
                    >
                      {payment.status === "paid" ? "Refund" : "Mark Paid"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        );

      case "reviews":
        return (
          <section className="admin-section-card">
            <div className="admin-section-head">
              <div>
                <span className="admin-section-label">Review Moderation</span>
                <h3>Approve or remove traveler reviews</h3>
              </div>
            </div>

            <div className="admin-table">
              <div className="admin-table-head">
                <span>Tour</span>
                <span>Traveler</span>
                <span>Rating</span>
                <span>Status</span>
                <span>Actions</span>
              </div>
              {reviews.map((review) => (
                <div key={review.id} className="admin-table-row admin-table-row-review">
                  <div>
                    <strong>{review.tourTitle}</strong>
                    <p>{review.comment}</p>
                  </div>
                  <div>
                    <strong>{review.userName}</strong>
                    <p>{formatDate(review.createdAt)}</p>
                  </div>
                  <div>
                    <strong>{review.rating}/5</strong>
                    <p>Traveler score</p>
                  </div>
                  <div>
                    <span className={`status-pill status-pill-${review.status}`}>
                      {review.status}
                    </span>
                  </div>
                  <div className="admin-table-actions">
                    <button
                      className="dashboard-secondary-btn"
                      onClick={() =>
                        updateReviewStatus(
                          review.id,
                          review.status === "approved" ? "pending" : "approved",
                        )
                      }
                    >
                      {review.status === "approved" ? "Move to Pending" : "Approve"}
                    </button>
                    <button
                      className="dashboard-danger-btn"
                      onClick={() => deleteReview(review.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        );

      case "content":
        return (
          <section className="admin-section-card">
            <div className="admin-section-head">
              <div>
                <span className="admin-section-label">Content Control</span>
                <h3>Offers, banners, and marketing content</h3>
              </div>
            </div>

            <div className="admin-two-column-grid">
              <div className="admin-content-card">
                <strong>Blog / offers manage</strong>
                <p>Update offer blocks, seasonal campaigns, and destination highlights.</p>
              </div>
              <div className="admin-content-card">
                <strong>Homepage banners</strong>
                <p>Refresh hero messages, promotional tiles, and featured departures.</p>
              </div>
              <div className="admin-content-card">
                <strong>Promo sections</strong>
                <p>Schedule top deals, curated collections, and last-minute campaign slots.</p>
              </div>
              <div className="admin-content-card">
                <strong>Destination spotlight copy</strong>
                <p>Refresh homepage storytelling, teaser content, and seasonal destination text.</p>
              </div>
            </div>
          </section>
        );

      case "settings":
        return (
          <section className="admin-section-card">
            <div className="admin-section-head">
              <div>
                <span className="admin-section-label">System Settings</span>
                <h3>Website configuration and admin tools</h3>
              </div>
            </div>

            <div className="admin-two-column-grid">
              <div className="admin-content-card">
                <strong>Website settings</strong>
                <p>Update branding, phone numbers, booking labels, and travel policy text.</p>
              </div>
              <div className="admin-content-card">
                <strong>Admin password change</strong>
                <p>Maintain secure backend access for panel administrators.</p>
              </div>
              <div className="admin-content-card">
                <strong>Email settings</strong>
                <p>Control booking alerts, itinerary emails, and traveler notifications.</p>
              </div>
              <div className="admin-content-card">
                <strong>SMS settings</strong>
                <p>Configure departure reminders and booking update messages.</p>
              </div>
            </div>
          </section>
        );
    }
  };

  return (
    <section className="admin-panel-page">
      <div className="admin-panel-shell">
        <aside className="admin-sidebar">
          <div className="admin-brand-block">
            <span className="admin-brand-label">Backend Panel</span>
            <h1>{SITE_CONFIG.shortName} Admin</h1>
            <p>Control tours, departures, itineraries, users, bookings, content, and settings.</p>
          </div>

          <nav className="admin-nav">
            {menuGroups.map((group) => (
              <div key={group.label} className="admin-menu-group">
                <p className="admin-menu-label">{group.label}</p>
                {group.items.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    className={`admin-nav-link admin-nav-button${activeSection === item.id ? " active" : ""}`}
                    onClick={() => setActiveSection(item.id)}
                  >
                    <span>{item.label}</span>
                    {item.badge ? <span className="admin-menu-badge">{item.badge}</span> : null}
                  </button>
                ))}
              </div>
            ))}
          </nav>

          <div className="admin-sidebar-footer">
            <div className="admin-admin-card">
              <span className="admin-brand-label">Signed In</span>
              <strong>{currentUser.name}</strong>
              <p>{currentUser.email}</p>
            </div>
            <div className="admin-sidebar-actions">
              <Link href="/" className="dashboard-secondary-btn admin-link-btn">
                View Website
              </Link>
              <button type="button" className="dashboard-action-btn" onClick={logout}>
                Log Out
              </button>
            </div>
          </div>
        </aside>

        <div className="admin-content">
          <header className="admin-topbar">
            <div>
              <span className="dashboard-kicker">Admin Control Center</span>
              <h2>{activeTitle}</h2>
              <p>
                This backend workspace keeps operations organized with a real admin
                menu, activity tracking, and dedicated management areas for each part
                of the travel platform.
              </p>
            </div>
            <div className="admin-topbar-stats">
              <div className="admin-topbar-stat">
                <span>Total Users</span>
                <strong>{totalUsers}</strong>
              </div>
              <div className="admin-topbar-stat">
                <span>Total Bookings</span>
                <strong>{bookings.length}</strong>
              </div>
              <div className="admin-topbar-stat">
                <span>Total Revenue</span>
                <strong>{formatCurrency(totalRevenue)}</strong>
              </div>
            </div>
          </header>

          <div className="admin-quick-grid">
            <button type="button" className="admin-quick-card" onClick={() => setActiveSection("tours")}>
              <strong>Tour Control</strong>
              <span>Edit tours, itineraries, images, and departures.</span>
            </button>
            <button type="button" className="admin-quick-card" onClick={() => setActiveSection("bookings")}>
              <strong>Booking Queue</strong>
              <span>Approve or reject bookings and review payment flow.</span>
            </button>
            <button type="button" className="admin-quick-card" onClick={() => setActiveSection("users")}>
              <strong>Traveler Accounts</strong>
              <span>Activate or deactivate user access from the admin panel.</span>
            </button>
            <button type="button" className="admin-quick-card" onClick={() => setActiveSection("reviews")}>
              <strong>Review Moderation</strong>
              <span>Approve, hold, or delete public traveler reviews.</span>
            </button>
          </div>

          <div className="admin-sections">{renderSection()}</div>
        </div>
      </div>
    </section>
  );
}
