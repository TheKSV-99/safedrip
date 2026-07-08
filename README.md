# SafeDrip — Smart IV Monitoring System

> **IV Safety. Every Drop Matters.**

SafeDrip is a real-time IV monitoring platform designed for clinical-grade reliability. This repository contains the official product website built with a modern React stack.

---

## Tech Stack

| Layer        | Technology                          |
| ------------ | ----------------------------------- |
| Framework    | React 19 + TypeScript               |
| Build        | Vite 8                              |
| Styling      | Tailwind CSS v4 (CSS-first config)  |
| Animations   | Framer Motion                       |
| Icons        | Lucide React                        |
| Routing      | React Router v7                     |
| Deployment   | GitHub Pages                        |

## Getting Started

### Prerequisites

- **Node.js** ≥ 20
- **npm** ≥ 10

### Install

```bash
npm install
```

### Development

```bash
npm run dev
```

Opens the dev server at `http://localhost:5173`.

### Production Build

```bash
npm run build
```

Output goes to `dist/`.

### Preview Production Build

```bash
npm run preview
```

### Deploy to GitHub Pages

```bash
npm run deploy
```

## Project Structure

```
src/
├── components/
│   ├── layout/          # Navbar, Footer, Layout (root wrapper)
│   └── ui/              # Button, Card, Section (reusable primitives)
├── lib/
│   ├── animations.ts    # Framer Motion presets & variants
│   ├── constants.ts     # Brand, navigation, footer data
│   └── utils.ts         # Utility helpers (cn, etc.)
├── pages/
│   └── Home.tsx          # Landing page
├── App.tsx               # Route definitions
├── main.tsx              # React entry point
└── index.css             # Tailwind v4 design system & global styles
```

## Design System

### Colors

- **Brand** — Medical blue scale (`brand-50` → `brand-950`)
- **Accent** — Medical green scale (`accent-50` → `accent-950`)
- **Surface** — Neutral gray scale (`surface-50` → `surface-950`)

### Typography

Uses **Inter** from Google Fonts with a custom type scale:

| Token       | Size       | Use Case                    |
| ----------- | ---------- | --------------------------- |
| `display`   | 4.5rem     | Hero headlines              |
| `headline`  | 3.25rem    | Section headings            |
| `title`     | 2rem       | Card titles, sub-sections   |
| `subtitle`  | 1.375rem   | Descriptions                |
| `body-lg`   | 1.125rem   | Lead paragraphs             |
| `body`      | 1rem       | Default body text           |
| `caption`   | 0.875rem   | Labels, nav links           |
| `overline`  | 0.75rem    | Section overlines, badges   |

### Animations

Shared Framer Motion variants in `src/lib/animations.ts`:

- `fadeIn` / `fadeUp` / `fadeDown` — entrance transitions
- `scaleIn` — card/product reveals
- `slideInLeft` / `slideInRight` — lateral entrances
- `staggerContainer` + `staggerItem` — sequenced list reveals

### Components

| Component | Path                           | Description                          |
| --------- | ------------------------------ | ------------------------------------ |
| `Button`  | `components/ui/Button.tsx`     | 3 variants, 2 sizes, icon support    |
| `Card`    | `components/ui/Card.tsx`       | 4 variants, hover elevation          |
| `Section` | `components/ui/Section.tsx`    | Themed section with animated header  |
| `Navbar`  | `components/layout/Navbar.tsx` | Glass nav with mobile menu           |
| `Footer`  | `components/layout/Footer.tsx` | Dark footer with link grid           |
| `Layout`  | `components/layout/Layout.tsx` | Root layout with Outlet              |

## Browser Support

- Chrome / Edge (latest 2)
- Firefox (latest 2)
- Safari (latest 2)
- Mobile Safari / Chrome (iOS & Android)

## License

Proprietary — © SafeDrip Technologies. All rights reserved.
