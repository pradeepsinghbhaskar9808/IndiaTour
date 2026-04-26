"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { DEMO_ACCOUNTS, useAuth } from "@/components/AuthProvider";
import { SITE_CONFIG } from "@/data/site";

type AuthMode = "login" | "signup";

type AuthModalProps = {
  initialMode: AuthMode;
  isOpen: boolean;
  onClose: () => void;
};

type FeedbackState = {
  tone: "success" | "error";
  text: string;
};

type AuthModeContent = {
  visualBadge: string;
  visualTitle: string;
  visualCopy: string;
  spotlightTitle: string;
  spotlightCopy: string;
  formTitle: string;
  formSubtitle: string;
  helperPill: string;
  helperNote: string;
  submitLabel: string;
  rememberLabel: string;
  footerPrompt: string;
  footerAction: string;
  metrics: Array<{ value: string; label: string }>;
  benefits: string[];
};

const AUTH_CONTENT: Record<AuthMode, AuthModeContent> = {
  login: {
    visualBadge: "Traveler Check-In",
    visualTitle: "Return to your saved tours, bookings, and next escape.",
    visualCopy:
      "Pick up your itinerary, booking updates, and dream destinations without losing your travel momentum.",
    spotlightTitle: "Your trip plans stay together",
    spotlightCopy:
      "From wishlists to confirmed departures, your travel details are ready whenever you come back.",
    formTitle: "Welcome back, traveler",
    formSubtitle:
      "Log in to manage bookings, revisit saved tours, and continue planning your next journey.",
    helperPill: "Demo access ready",
    helperNote:
      "Use the traveler or admin demo account below, or create a new traveler account of your own.",
    submitLabel: "Enter My Trips",
    rememberLabel: "Keep me signed in for faster trip access",
    footerPrompt: "New to Touriza?",
    footerAction: "Start your travel account",
    metrics: [
      { value: "12k+", label: "Happy travelers" },
      { value: "98%", label: "Smooth tour bookings" },
    ],
    benefits: [
      "Manage every tour booking in one place",
      "Save favorite trips, stays, and wishlists",
      "Check out faster for your next getaway",
    ],
  },
  signup: {
    visualBadge: "Start Your Journey",
    visualTitle: "Create your travel account and turn ideas into booked adventures.",
    visualCopy:
      "Start with one organized space for wishlists, tour enquiries, confirmations, and member-only offers.",
    spotlightTitle: "Built for trip planning",
    spotlightCopy:
      "Sign up once and keep every itinerary, favorite stay, and travel enquiry neatly organized.",
    formTitle: "Create your travel account",
    formSubtitle:
      "Sign up to unlock member fares, save dream tours, and keep all your travel plans in one place.",
    helperPill: "Fast traveler sign up",
    helperNote:
      "New sign-ups create traveler accounts. Use the admin demo credentials only from the login tab.",
    submitLabel: "Start My Journey",
    rememberLabel: "Send me travel deals and tour offers",
    footerPrompt: "Already traveling with us?",
    footerAction: "Log in to your trips",
    metrics: [
      { value: "24/7", label: "Trip access" },
      { value: "4.9/5", label: "Traveler rating" },
    ],
    benefits: [
      "Unlock members-only travel and tour offers",
      "Track enquiries, departures, and confirmations",
      "Receive curated itineraries and destination updates",
    ],
  },
};

export default function AuthModal({
  initialMode,
  isOpen,
  onClose,
}: AuthModalProps) {
  const router = useRouter();
  const { login, signup } = useAuth();
  const [mode, setMode] = useState<AuthMode>(initialMode);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [feedback, setFeedback] = useState<FeedbackState | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    setMode(initialMode);
    setFullName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setShowPassword(false);
    setShowConfirmPassword(false);
    setFeedback(null);
  }, [initialMode, isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  const activeContent = AUTH_CONTENT[mode];

  const handleModeChange = (nextMode: AuthMode) => {
    setMode(nextMode);
    setFeedback(null);
    setShowPassword(false);
    setShowConfirmPassword(false);
  };

  const fillDemoAccount = (role: "user" | "admin") => {
    setMode("login");
    setEmail(DEMO_ACCOUNTS[role].email);
    setPassword(DEMO_ACCOUNTS[role].password);
    setConfirmPassword("");
    setFeedback(null);
  };

  if (!isOpen) return null;

  return (
    <div className="auth-modal-backdrop" role="presentation" onClick={onClose}>
      <div
        className="auth-modal-shell"
        role="dialog"
        aria-modal="true"
        aria-labelledby="auth-modal-title"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="auth-modal-panel">
          <div className="auth-modal-visual">
            <div className="auth-visual-content">
              <div className="auth-visual-badge">{activeContent.visualBadge}</div>
              <h2 className="auth-visual-title">{activeContent.visualTitle}</h2>
              <p className="auth-visual-copy">
                {activeContent.visualCopy} with {SITE_CONFIG.name}.
              </p>
            </div>

            <div className="auth-visual-bottom">
              <div className="auth-visual-metrics">
                {activeContent.metrics.map((metric) => (
                  <div key={metric.label} className="auth-metric-card">
                    <span className="auth-metric-value">{metric.value}</span>
                    <span className="auth-metric-label">{metric.label}</span>
                  </div>
                ))}
              </div>

              <div className="auth-visual-spotlight">
                <p className="auth-spotlight-title">{activeContent.spotlightTitle}</p>
                <p className="auth-spotlight-copy">{activeContent.spotlightCopy}</p>
              </div>

              <ul className="auth-benefits-list">
                {activeContent.benefits.map((benefit) => (
                  <li key={benefit}>{benefit}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="auth-modal-card">
            <div className="auth-modal-header">
              <div>
                <p className="auth-kicker">
                  {mode === "login"
                    ? `Welcome back to ${SITE_CONFIG.shortName}`
                    : `Start with ${SITE_CONFIG.shortName}`}
                </p>
                <h3 id="auth-modal-title" className="auth-modal-title">
                  {activeContent.formTitle}
                </h3>
                <p className="auth-modal-subtitle">{activeContent.formSubtitle}</p>
              </div>
              <button
                type="button"
                className="auth-close-btn"
                onClick={onClose}
                aria-label="Close authentication modal"
              >
                X
              </button>
            </div>

            <div className="auth-switcher" role="tablist" aria-label="Authentication forms">
              <button
                type="button"
                className={`auth-switch-btn${mode === "login" ? " active" : ""}`}
                role="tab"
                aria-selected={mode === "login"}
                onClick={() => handleModeChange("login")}
              >
                Log In
              </button>
              <button
                type="button"
                className={`auth-switch-btn${mode === "signup" ? " active" : ""}`}
                role="tab"
                aria-selected={mode === "signup"}
                onClick={() => handleModeChange("signup")}
              >
                Sign Up
              </button>
            </div>

            <div className="auth-form-intro">
              <span className="auth-form-chip">{activeContent.helperPill}</span>
              <p className="auth-form-note">{activeContent.helperNote}</p>
            </div>

            {mode === "login" ? (
              <div className="auth-demo-credentials">
                <button
                  type="button"
                  className="auth-demo-btn"
                  onClick={() => fillDemoAccount("user")}
                >
                  <span className="auth-demo-title">Demo User</span>
                  <span className="auth-demo-copy">
                    {DEMO_ACCOUNTS.user.email} / {DEMO_ACCOUNTS.user.password}
                  </span>
                </button>
                <button
                  type="button"
                  className="auth-demo-btn"
                  onClick={() => fillDemoAccount("admin")}
                >
                  <span className="auth-demo-title">Demo Admin</span>
                  <span className="auth-demo-copy">
                    {DEMO_ACCOUNTS.admin.email} / {DEMO_ACCOUNTS.admin.password}
                  </span>
                </button>
              </div>
            ) : null}

            <form
              className="auth-form"
              onSubmit={(event) => {
                event.preventDefault();

                if (mode === "signup" && password !== confirmPassword) {
                  setFeedback({
                    tone: "error",
                    text: "Your travel account passwords do not match yet. Please recheck them and try again.",
                  });
                  return;
                }

                if (mode === "login") {
                  const result = login(email, password);

                  if (!result.ok) {
                    setFeedback({ tone: "error", text: result.error });
                    return;
                  }

                  setFeedback({
                    tone: "success",
                    text:
                      result.user.role === "admin"
                        ? `Welcome back, ${result.user.name}. Your admin control panel is ready.`
                        : `Welcome back, ${result.user.name}. Your trip dashboard is ready for your next adventure.`,
                  });

                  onClose();
                  router.push(result.user.role === "admin" ? "/admin" : "/dashboard");
                  return;
                }

                const result = signup(fullName, email, password);

                if (!result.ok) {
                  setFeedback({ tone: "error", text: result.error });
                  return;
                }

                setFeedback({
                  tone: "success",
                  text: `Travel account created for ${result.user.name}. You are ready to start planning your next tour.`,
                });

                onClose();
                router.push("/dashboard");
              }}
            >
              {mode === "signup" ? (
                <label className="auth-field">
                  <span className="auth-label">Full name</span>
                  <input
                    className="auth-input"
                    type="text"
                    name="fullName"
                    value={fullName}
                    onChange={(event) => setFullName(event.target.value)}
                    placeholder="Aarav Sharma"
                    autoComplete="name"
                    required
                  />
                </label>
              ) : null}

              <label className="auth-field">
                <span className="auth-label">Email address</span>
                <input
                  className="auth-input"
                  type="email"
                  name="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="you@example.com"
                  autoComplete="email"
                  required
                />
              </label>

              <label className="auth-field">
                <span className="auth-label">Password</span>
                <div className="auth-password-wrap">
                  <input
                    className="auth-input auth-input-password"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="Enter your travel account password"
                    autoComplete={mode === "login" ? "current-password" : "new-password"}
                    minLength={6}
                    required
                  />
                  <button
                    type="button"
                    className="auth-password-toggle"
                    onClick={() => setShowPassword((current) => !current)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </label>

              {mode === "signup" ? (
                <label className="auth-field">
                  <span className="auth-label">Confirm password</span>
                  <div className="auth-password-wrap">
                    <input
                      className="auth-input auth-input-password"
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      value={confirmPassword}
                      onChange={(event) => setConfirmPassword(event.target.value)}
                      placeholder="Confirm your travel account password"
                      autoComplete="new-password"
                      minLength={6}
                      required
                    />
                    <button
                      type="button"
                      className="auth-password-toggle"
                      onClick={() => setShowConfirmPassword((current) => !current)}
                      aria-label={
                        showConfirmPassword ? "Hide confirm password" : "Show confirm password"
                      }
                    >
                      {showConfirmPassword ? "Hide" : "Show"}
                    </button>
                  </div>
                </label>
              ) : null}

              <div className="auth-row">
                <label className="auth-check">
                  <input type="checkbox" name="remember" defaultChecked={mode === "login"} />
                  <span>{activeContent.rememberLabel}</span>
                </label>

                {mode === "login" ? (
                  <button type="button" className="auth-text-link">
                    Forgot your travel password?
                  </button>
                ) : (
                  <span className="auth-policy-text">
                    By continuing, you agree to our travel booking policy.
                  </span>
                )}
              </div>

              <button type="submit" className="auth-submit-btn">
                {activeContent.submitLabel}
              </button>

              <div className="auth-alt-action">
                <span>{activeContent.footerPrompt}</span>
                <button
                  type="button"
                  className="auth-text-link auth-inline-link"
                  onClick={() => handleModeChange(mode === "login" ? "signup" : "login")}
                >
                  {activeContent.footerAction}
                </button>
              </div>

              {feedback ? (
                <p
                  className={`auth-feedback auth-feedback-${feedback.tone}`}
                  role={feedback.tone === "error" ? "alert" : "status"}
                >
                  {feedback.text}
                </p>
              ) : null}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
