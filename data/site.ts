export const SITE_CONFIG = {
  environment:
    process.env.NEXT_PUBLIC_APP_ENV?.trim() || process.env.NODE_ENV || "development",
  name: process.env.NEXT_PUBLIC_SITE_NAME?.trim() || "India Tour",
  shortName: process.env.NEXT_PUBLIC_SITE_SHORT_NAME?.trim() || "India Tour",
  tagline:
    process.env.NEXT_PUBLIC_SITE_TAGLINE?.trim() || "Gateway to Global Tours",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL?.trim() || "http://localhost:3000",
} as const;

// Additional site-wide values derived from environment variables
const parseList = (v?: string) =>
  v && v.trim() ? v.split(",").map((s) => s.trim()).filter(Boolean) : [];

export const SITE_OPTIONS = {
  analyticsId: process.env.NEXT_PUBLIC_ANALYTICS_ID || "",
  supportEmail: process.env.NEXT_PUBLIC_SUPPORT_EMAIL || "support@touriza.com",
  supportPhone: process.env.NEXT_PUBLIC_SUPPORT_PHONE || "+1 (800) 123-4567",
  logo: process.env.NEXT_PUBLIC_LOGO_URL || "",
  defaultLocale: process.env.NEXT_PUBLIC_DEFAULT_LOCALE || "en",
  defaultKeywords:
    parseList(process.env.NEXT_PUBLIC_DEFAULT_KEYWORDS) || [
      "tours",
      "travel",
      "holiday packages",
    ],
  footerAlsoSee: parseList(process.env.NEXT_PUBLIC_FOOTER_ALSO_SEE) || [],
  social: {
    twitter: process.env.NEXT_PUBLIC_TWITTER || "",
    instagram: process.env.NEXT_PUBLIC_INSTAGRAM || "",
    facebook: process.env.NEXT_PUBLIC_FACEBOOK || "",
  },
} as const;
