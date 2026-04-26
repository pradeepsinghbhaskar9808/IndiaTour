# India Tour — Travel & Tours Website

A production-grade **Next.js 14** travel website with 3 fully animated pages, a booking modal, and real-world component architecture.

---

## 🗂 Folder Structure

```
india-tour/
├── app/
│   ├── layout.tsx              ← Root layout (Navbar + Footer wrapped)
│   ├── page.tsx                ← Home page
│   ├── not-found.tsx           ← Custom 404 page
│   └── tours/
│       ├── page.tsx            ← Tours listing page
│       └── [id]/
│           └── page.tsx        ← Tour detail page (dynamic route)
├── components/
│   ├── Navbar.tsx              ← Sticky navbar with scroll effect
│   ├── Footer.tsx              ← Full footer with newsletter
│   ├── TourCard.tsx            ← Reusable tour card (wishlist, badges, price)
│   ├── BookingModal.tsx        ← 2-step booking modal (calendar + travellers)
│   └── ScrollTopButton.tsx     ← Scroll-to-top floating button
├── data/
│   └── tours.ts                ← All tour data, destinations, testimonials
├── styles/
│   └── globals.css             ← All CSS (animations, layout, components)
├── public/                     ← Static assets
├── package.json
├── next.config.js
└── tsconfig.json
```

---

## 🚀 Getting Started

### 1. Install dependencies
```bash
cd india-tour
npm install
```

### 2. Configure environments
This project now includes separate Next.js environment files:

- `.env.development` for `npm run dev`
- `.env.production` for `npm run build` and `npm run start`
- `.env.example` as the editable template

The app reads the following public variables from `data/site.ts`:

```bash
NEXT_PUBLIC_APP_ENV
NEXT_PUBLIC_SITE_NAME
NEXT_PUBLIC_SITE_SHORT_NAME
NEXT_PUBLIC_SITE_TAGLINE
NEXT_PUBLIC_SITE_URL
```

### 3. Start dev server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Run production locally
```bash
npm run build
npm run start
```

---

## 📄 Pages

| Route | Description |
|-------|-------------|
| `/` | Home page — Hero, promo banners, destinations, popular tours, testimonials, newsletter |
| `/tours` | Tours listing — Sidebar filters, search bar, sort, paginated grid |
| `/tours/[slug]` | Tour detail — Gallery, itinerary, FAQ, booking widget |

---

## ✨ Features

- **Sticky Navbar** with scroll-based shadow and active link highlighting
- **Hero Section** with full-screen background, animated search bar, and stats
- **Tour Cards** with discount badges, wishlist toggle, departure dates
- **Filter Sidebar** with price/duration sliders and checkbox filters
- **Booking Modal** — 2-step flow: calendar date picker → traveller quantity with live total
- **Tour Detail** — Image gallery, info boxes, itinerary timeline, cost breakdown, FAQ accordion
- **Responsive** — Works on mobile, tablet, and desktop
- **Animations** — `fadeUp`, `badgePop`, `modalSlide`, `calendarFade`, `float` keyframes
- **TypeScript** throughout

---

## 🎨 Design

- **Fonts:** Playfair Display (headings) + DM Sans (body)
- **Color:** Forest green (`#2ecc7a`) with cream backgrounds
- **Motion:** CSS keyframe animations with staggered reveal delays

---

## 🔧 Customisation

Edit `data/tours.ts` to add/modify tours. The detail page auto-generates from the `slug` field.
