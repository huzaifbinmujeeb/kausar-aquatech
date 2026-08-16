# Kausar AquaTech — PRD

## Original problem statement
Premium 4-page website for Kausar AquaTech (The Patel and Akbani Co.), a water bottle manufacturing and customization company in Badnera, Maharashtra. Restrained, minimal, premium design (navy #0B2545 / bone #F4EEE2 / off-white #FBF8F1 / silver #9AA0A6). Pages: Home, About, Order (3-step guided flow with live bottle preview), Contact (branches, phones, form, map). Signature interactions: Three.js GLSL water splash hero + site-wide liquid cursor. User follow-up: make it Awwwards-level — kinetic masked-line hero, numbered manifesto chapters, editorial marquee, framer-motion reveals, lenis smooth scrolling, parallax/3D hero moment.

## Architecture
- Frontend: React 19 + Tailwind + framer-motion + lenis + react-fast-marquee + @react-three/fiber (lazy-loaded GLSL splash) at /frontend
- Backend: FastAPI at /backend/server.py, routes prefixed /api
- DB: MongoDB via MONGO_URL (collections: orders, contact_messages)
- Design reference: /design_guidelines.json

## User personas
- Retail/wholesale buyer requesting bulk quotes
- Event/wedding customer designing a custom label
- Local visitor looking for branch address/phone

## Core requirements (static)
1. Four pages with shared header (logotype, nav, Get a quote) and navy footer (addresses + phones)
2. Order flow: size → variety → cap/label/text (label text required, max 14 chars) → summary with quantity + name/phone → submit
3. Contact form + click-to-call + map embed
4. 3D water splash hero (graceful fallback), liquid cursor (desktop only, inverts on navy), prefers-reduced-motion support
5. Calm sentence-case voice, data-testids on all interactive elements

## Implemented
- Full brand system: Playfair Display + Manrope, palette tokens, label-caps style
- Home: kinetic masked-line hero over GLSL droplet/ripple splash (lazy, WebGL fallback image), slow editorial marquee, 3-up services strip, trust quote + stats, navy footer CTA
- About: masked hero, numbered manifesto chapters 01–03, quality standards list, photo strip, CTA
- Order: sticky live SVG bottle preview (size scale, variety name, cap colour, label paper, custom text), 3 steps + summary, inline label-text validation, quantity stepper, success screen with reference id
- Contact: form → /api/contact, both branch addresses, tel: links, grayscale Google Maps embed of Badnera branch
- Backend: POST/GET /api/orders, POST/GET /api/contact, health /api/ — all verified via curl (422 on empty label text)
- Liquid cursor: spring lag, directional stretch, hover widen, click ripple, dark-section inversion, disabled on touch/reduced-motion
- Lenis smooth scrolling, sonner toasts

## Verified (build-time testing)
- curl: health, order create/list, contact create, validation rejection — all pass
- Screenshots: home hero + services, full order flow (error → fill → summary → placed), about, contact (message sent, form cleared), mobile home + order

## Backlog / next tasks
- P0: Email notification on new order (Resend integration) — awaiting client email address
- P1: Admin view for incoming orders/messages
- P1: Client-supplied real copy for About story (currently placeholder)
- P2: Real facility photography to replace stock images
- P2: More water varieties / cap colours (layout already supports)
- P3 (requested, not started): Stripe payment integration

## Notes
- No authentication in v1 — orders/contact endpoints are open POST/GET
- About-page story and photos are placeholder stock imagery, not client-supplied
