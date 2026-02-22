# Village Masjid – Mosque Website

A production-ready Village Mosque website UI built with **React (TypeScript)**, **Vite**, **Tailwind CSS**, and **React Router**. Mobile-first, accessible, and village-user friendly.

## Tech Stack

- **Framework:** React 19 + TypeScript (Vite)
- **Styling:** Tailwind CSS v4
- **Routing:** React Router v7
- **Icons:** lucide-react
- **Utils:** clsx

## Project Constraints (গ্রাম এলাকার জন্য)

- Fast loading, minimal animation
- Large tap targets (min 44px)
- Bengali-friendly typography (Noto Sans Bengali) + English headings
- Clear donation transparency UI

## Routes

| Path           | Page        |
|----------------|-------------|
| `/`            | Home        |
| `/prayer-times`| Prayer Times|
| `/notices`     | Notices     |
| `/donation`    | Donation    |
| `/committee`   | Committee   |
| `/services`    | Services    |
| `/gallery`     | Gallery     |
| `/contact`     | Contact     |
| `*`            | NotFound    |

## Folder Structure

```
src/
  components/   # Reusable UI (Navbar, Button, PrayerTimeCard, etc.)
  pages/        # Route pages
  data/         # Mock JSON (prayerTimes, notices, donation, etc.)
  types/        # TypeScript interfaces
  utils/        # cn (clsx)
  layouts/      # MainLayout
  assets/
```

## Scripts

```bash
npm install
npm run dev      # Start dev server
npm run build    # Production build
npm run preview  # Preview production build
```

## Data

Mock data lives in `src/data/*.json`. Replace with API calls when integrating a backend; types are in `src/types/index.ts`.

## Design Tokens (Tailwind)

- **Primary:** Deep Green (`#166534`)
- **Accent:** Light Gold / Yellow
- **Text:** Dark Gray
- **Background:** Light Gray
- **Spacing:** 8px concept; section spacing 2rem
