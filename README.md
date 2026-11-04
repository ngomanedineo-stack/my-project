# Mzansi Votes
Nonpartisan South African elections & civic accountability platform. *Know Your Area. Know Your Leaders. Know Your Vote.*

> **All data in this build is fictional demonstration data** (fake parties, people, box-shaped "ward" polygons). No official source is connected. See `docs/ARCHITECTURE.md`.

## Run
```bash
npm install && npm run dev      # http://localhost:3000
npm test                        # search/geo unit tests
npm run build && npm start
```
Try searches: `Soweto`, `Sandton`, `Khayelitsa` (typo), `Johannesburg Ward 80`, `-26.107,28.057`, `12 Main Street` (not guessed).
Change election stage without rebuilding: edit `data/election-state.json` (`awaiting|voting|counting|provisional|official|council_pending|administration_confirmed`) and reload the area page.

## Layout
`src/lib` search, results math, adapters · `src/data/demo.ts` labelled fixtures · `src/app` pages + API · `db/schema.sql` PostGIS schema · `docs/` PRD, IA, backlog, API, data strategy.

## Not built yet (honest list)
PostGIS wiring, real boundaries/geocoder, IEC results feed, admin portal & auth, party/candidate pages & comparison, finance/indicator dashboards, promise tracker, community reporting, accounts/alerts, AI assistant, 12-language i18n, low-data mode, election map pages. See backlog.
