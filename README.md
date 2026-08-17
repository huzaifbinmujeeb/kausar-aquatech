# Kausar AquaTech

Premium 4-page website for Kausar AquaTech (The Patel and Akbani Co.) — a water
bottle manufacturer in Badnera, Maharashtra. React 19 + Tailwind frontend,
FastAPI + MongoDB backend.

## Structure

```
kausar-aquatech/
├── backend/
│   ├── server.py          # FastAPI app: /api/orders, /api/contact
│   ├── requirements.txt
│                    
├── frontend/
│   ├── src/
│   │   ├── components/      # Header, Footer, LiquidCursor, WaterSplash,
│   │   │                     BottlePreview, Reveal, ui/sonner
│   │   ├── pages/            # Home, About, Order, Contact
│   │   ├── App.js, index.js, index.css, App.css
│   ├── public/index.html
│   ├── package.json
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   ├── craco.config.js
│                  
├── design_guidelines.json   # Original design spec this build follows
├── memory/PRD.md            # Build notes / product requirements doc
└── README.md
```

## Running with Docker (easiest)

Requires Docker + Docker Compose. From the project root:

```bash
docker compose up --build
```

This starts three containers: MongoDB, the FastAPI backend on
`http://localhost:8000`, and the React frontend on `http://localhost:3000`.
Open `http://localhost:3000` once the frontend container finishes compiling
(watch the logs — first boot takes a minute or two for `yarn install`).

To stop everything: `Ctrl+C`, then `docker compose down` (add `-v` to also
wipe the Mongo data volume).

## Running locally (without Docker)

**Backend**
```bash
cd backend
pip install -r requirements.txt
# requires a running MongoDB at the MONGO_URL in .env
uvicorn server:app --reload --port 8000
```

**Frontend**
```bash
cd frontend
yarn install
# set REACT_APP_BACKEND_URL in .env to wherever the backend is running
yarn start
```

## Notes on this reconstruction

This folder was assembled from a chat/build transcript that contained some
files more than once (an early placeholder version and a final version).
Where duplicates existed, the **final, feature-complete version** was used:

- `server.py` — the version with `Order`/`ContactMessage` models and routes
  (not the early `status_checks` placeholder)
- `tailwind.config.js` — the version with the custom navy/bone/paper brand
  palette and Playfair Display/Manrope fonts
- `App.js` — the version with routing, Lenis smooth scroll, and the
  Header/Footer/LiquidCursor shell (not the original CRA starter page)
- `design_guidelines.json` — included once (was duplicated three times in
  the source material)

Two files were **not present anywhere in the source material** but are
required for the app to actually run, so they were added:

- `craco.config.js` — sets up the `@` → `src` path alias that every
  component/page import relies on (`package.json` already pointed `start`/
  `build` at `craco`, but no config file was ever given)
- `frontend/src/components/ui/sonner.jsx` — a minimal shadcn-style wrapper
  around the `sonner` toast library, since `App.js` imports
  `Toaster` from `@/components/ui/sonner` but that file was never included

Everything else — page content, copy, styling, the GLSL water-splash shader,
the liquid cursor, the order flow and validation — is reproduced exactly as
it appeared in the source transcript.
