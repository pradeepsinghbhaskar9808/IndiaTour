"use client";

import { useEffect, useState } from "react";

type CookiePreferences = {
  essential: true;
  analytics: boolean;
  marketing: boolean;
};

const STORAGE_KEY = "india-tour-cookie-consent";

const defaultPreferences: CookiePreferences = {
  essential: true,
  analytics: false,
  marketing: false,
};

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [preferences, setPreferences] =
    useState<CookiePreferences>(defaultPreferences);

  useEffect(() => {
    const savedConsent = window.localStorage.getItem(STORAGE_KEY);
    setIsVisible(!savedConsent);
  }, []);

  const saveConsent = (nextPreferences: CookiePreferences) => {
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        ...nextPreferences,
        savedAt: new Date().toISOString(),
      }),
    );
    setIsVisible(false);
  };

  const acceptAll = () => {
    saveConsent({
      essential: true,
      analytics: true,
      marketing: true,
    });
  };

  const acceptEssential = () => {
    saveConsent(defaultPreferences);
  };

  const togglePreference = (name: "analytics" | "marketing") => {
    setPreferences((current) => ({
      ...current,
      [name]: !current[name],
    }));
  };

  if (!isVisible) return null;

  return (
    <section
      className="cookie-consent"
      aria-labelledby="cookie-consent-title"
      role="dialog"
      aria-modal="false"
    >
      <div className="cookie-consent-icon" aria-hidden="true">
        i
      </div>

      <div className="cookie-consent-content">
        <p className="cookie-consent-eyebrow">Privacy preferences</p>
        <h2 id="cookie-consent-title">Can we use cookies?</h2>
        <p>
          We use essential cookies to keep the website working. With your
          permission, we also use analytics and marketing cookies to improve
          tours, offers, and booking experience.
        </p>

        {showPreferences && (
          <div className="cookie-options" aria-label="Cookie preferences">
            <label className="cookie-option">
              <span>
                <strong>Essential cookies</strong>
                <small>Required for security, forms, and basic website use.</small>
              </span>
              <input type="checkbox" checked disabled />
            </label>

            <label className="cookie-option">
              <span>
                <strong>Analytics cookies</strong>
                <small>Help us understand visits and improve popular pages.</small>
              </span>
              <input
                type="checkbox"
                checked={preferences.analytics}
                onChange={() => togglePreference("analytics")}
              />
            </label>

            <label className="cookie-option">
              <span>
                <strong>Marketing cookies</strong>
                <small>Help us show relevant offers and travel updates.</small>
              </span>
              <input
                type="checkbox"
                checked={preferences.marketing}
                onChange={() => togglePreference("marketing")}
              />
            </label>
          </div>
        )}
      </div>

      <div className="cookie-consent-actions">
        {showPreferences ? (
          <button
            type="button"
            className="cookie-btn cookie-btn-primary"
            onClick={() => saveConsent(preferences)}
          >
            Save choices
          </button>
        ) : (
          <button
            type="button"
            className="cookie-btn cookie-btn-primary"
            onClick={acceptAll}
          >
            Accept all
          </button>
        )}

        <button
          type="button"
          className="cookie-btn cookie-btn-secondary"
          onClick={acceptEssential}
        >
          Essential only
        </button>

        <button
          type="button"
          className="cookie-btn cookie-btn-link"
          onClick={() => setShowPreferences((current) => !current)}
        >
          {showPreferences ? "Hide options" : "Cookie options"}
        </button>
      </div>
    </section>
  );
}
