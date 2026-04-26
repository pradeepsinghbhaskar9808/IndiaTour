export const SITE_CONFIG = {
  environment:
    process.env.NEXT_PUBLIC_APP_ENV?.trim() || process.env.NODE_ENV || "development",
  name: process.env.NEXT_PUBLIC_SITE_NAME?.trim() || "Touriza",
  shortName: process.env.NEXT_PUBLIC_SITE_SHORT_NAME?.trim() || "Touriza",
  tagline:
    process.env.NEXT_PUBLIC_SITE_TAGLINE?.trim() || "Gateway to Global Tours",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL?.trim() || "http://localhost:3000",
} as const;
