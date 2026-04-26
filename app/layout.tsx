import type { Metadata } from "next";
import "../styles/globals.css";
import AppShell from "@/components/AppShell";
import { SITE_CONFIG } from "@/data/site";

export const metadata: Metadata = {
  title: `${SITE_CONFIG.name} - ${SITE_CONFIG.tagline}`,
  description:
    "Discover world-class travel experiences from trusted agencies around the globe. Book unforgettable tours and adventures.",
  metadataBase: new URL(SITE_CONFIG.siteUrl),
  alternates: {
    canonical: "/",
  },
  keywords: [
    "Tajmahal same day tour",
    `${SITE_CONFIG.shortName} tour`,
    "Delhi tour",
    "Agra tour",
    "Jaipur tour",
    "Golden Triangle tour",
    "Taj Mahal tour",
    "India sightseeing tour",
    "India cultural tour",
    "India heritage tour",
    "India historical tour",
  ],
  openGraph: {
    title: SITE_CONFIG.name,
    description:
      "Discover world-class travel experiences from trusted agencies around the globe. Book unforgettable tours and adventures.",
    type: "website",
    url: SITE_CONFIG.siteUrl,
    locale: "en_US",
    siteName: SITE_CONFIG.name,
    images: [
      {
        url: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1200&q=80",
        width: 1200,
        height: 800,
        alt: "Global travel destinations",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_CONFIG.name,
    description:
      "Discover world-class travel experiences from trusted agencies around the globe. Book unforgettable tours and adventures.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0f766e",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
