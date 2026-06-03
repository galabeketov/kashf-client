---
name: uzbek-design-system
description: Uzbek national design system added — new SCSS file, three UI components, six updated page components
metadata:
  type: project
---

A full Uzbek/Islamic visual redesign was implemented on 2026-06-01.

**New files created:**
- `styles/uzbek-national.scss` — CSS custom properties, Islamic SVG tile patterns, keyframes (shimmer, float, crescent, spin-slow, sweep), button classes (`uzn-btn-*`), gold line dividers, ornamental divider, hero overlay, glassmorphism stat cards, ivory/dark section backgrounds, service octagon icons, tour cards, about photo frame with gold corner ornaments, dome decor, footer, header nav underlines, locale pill switcher.
- `components/ui/IslamicPattern.jsx` — Pure SVG 12-point girih star, props: size/color/opacity/animated.
- `components/ui/DomeDecor.jsx` — Registan 3-dome silhouette SVG, props: color/opacity/inverted/className.
- `components/ui/OrnamentalDivider.jsx` — Gold line + rotating 8-point star (Rub el Hizb), props: starSize/color/className.

**Updated components:**
- `components/hero/kashf-hero/index.jsx` — IslamicPattern corners, floating CrescentStar SVGs, Bismillah label, uzn-btn-* buttons, uzn-stat-card glassmorphism.
- `components/header/header-kashf/index.jsx` — uzn-logo-name/uzn-logo-sub gold gradient, uzn-locale-pill switcher, uzn-nav-link gold underline, dark navy sticky background.
- `components/home/kashf/ToursSection.jsx` — OrnamentalDivider, uzn-tour-card, uzn-price-badge (gold gradient), uzn-duration-badge (lazur).
- `components/home/kashf/ServicesSection.jsx` — uzn-section-ivory bg, uzn-icon-octagon, uzn-service-card with animated gold top border.
- `components/home/kashf/AboutSection.jsx` — uzn-section-ivory, uzn-photo-frame gold corners, OrnamentalDivider, uzn-about-stat gold-bordered cards.
- `components/home/kashf/CTA.jsx` — uzn-section-dark, DomeDecor at bottom, floating crescents, uzn-btn-gold/outline-gold.
- `components/footer/kashf/index.jsx` — uzn-footer dark navy with Islamic pattern, DomeDecor inverted at top, uzn-logo-name gold gradient, uzn-footer-bottom-bar gold border.

**app/layout.jsx** — Added Cormorant Garamond + Inter to Google Fonts import.
**styles/index.scss** — Added `@import "./uzbek-national"`.

**Why:** User requested premium Silk Road aesthetic — Uzbek national colors, Islamic geometric patterns, dome silhouettes, gold shimmer animations — to differentiate from generic travel sites.

**Build status:** Passes `npm run build` cleanly (only pre-existing SASS `darken()` deprecation warnings from uzbek-theme.scss).
