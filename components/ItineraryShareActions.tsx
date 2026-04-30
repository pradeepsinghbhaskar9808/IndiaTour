"use client";

import { useEffect, useMemo, useState } from "react";

type ItineraryStep = {
  day: string;
  title: string;
  description: string;
};

type ItineraryShareActionsProps = {
  title: string;
  location: string;
  duration: string;
  itinerary: ItineraryStep[];
};

function WhatsAppIcon() {
  return (
    <svg
      width="26"
      height="26"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M4.8 19.2 6 15.9a7.6 7.6 0 1 1 2.6 2.4l-3.8.9Z"
        fill="#25D366"
      />
      <path
        d="M9.2 8.2c.2-.4.3-.4.6-.4h.5c.2 0 .4 0 .5.4.2.5.7 1.7.8 1.8.1.2.1.3 0 .5-.1.2-.2.3-.4.5-.2.2-.3.3-.1.6.2.3.7 1.1 1.5 1.7 1 .9 1.9 1.2 2.2 1.3.3.1.5.1.6-.2.2-.2.7-.8.9-1 .2-.3.4-.2.6-.1.3.1 1.6.8 1.8.9.3.1.4.2.5.3.1.1.1.8-.2 1.5-.3.7-1.5 1.3-2.1 1.3-.5 0-1.1 0-1.8-.2-.4-.1-.9-.3-1.6-.6-2.8-1.2-4.6-4-4.8-4.2-.1-.2-1.1-1.5-1.1-2.8 0-1.3.7-2 1-2.3Z"
        fill="#fff"
      />
    </svg>
  );
}

function PrintIcon() {
  return (
    <svg
      width="26"
      height="26"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M7 8V3h10v5" />
      <path d="M7 17H5a3 3 0 0 1-3-3v-2a3 3 0 0 1 3-3h14a3 3 0 0 1 3 3v2a3 3 0 0 1-3 3h-2" />
      <path d="M7 14h10v7H7z" />
    </svg>
  );
}

function EmailIcon() {
  return (
    <svg
      width="26"
      height="26"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  );
}

export default function ItineraryShareActions({
  title,
  location,
  duration,
  itinerary,
}: ItineraryShareActionsProps) {
  const [currentUrl, setCurrentUrl] = useState("");

  useEffect(() => {
    setCurrentUrl(window.location.href);
  }, []);

  const shareText = useMemo(() => {
    const days = itinerary
      .map((step) => `${step.day}: ${step.title}`)
      .join("\n");

    return `${title}\n${location}\n${duration}\n\nItinerary:\n${days}\n\n${currentUrl}`;
  }, [currentUrl, duration, itinerary, location, title]);

  const encodedText = encodeURIComponent(shareText);
  const encodedSubject = encodeURIComponent(`${title} itinerary`);

  return (
    <div className="itinerary-share-actions" aria-label="Share itinerary">
      <a
        className="itinerary-share-action whatsapp"
        href={`https://wa.me/?text=${encodedText}`}
        target="_blank"
        rel="noreferrer"
      >
        <WhatsAppIcon />
        <span>Send</span>
        <strong>Itinerary</strong>
      </a>

      <button
        type="button"
        className="itinerary-share-action print"
        onClick={() => window.print()}
      >
        <PrintIcon />
        <span>Print</span>
        <strong>Itinerary</strong>
      </button>

      <a
        className="itinerary-share-action email"
        href={`mailto:?subject=${encodedSubject}&body=${encodedText}`}
      >
        <EmailIcon />
        <span>Email</span>
        <strong>Itinerary</strong>
      </a>
    </div>
  );
}
