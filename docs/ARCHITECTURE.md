# Mzansi Votes — Architecture, IA, Backlog, API, Data Strategy

## 1. Architecture
```
Browser (Next.js/React, MapLibre, SW cache)
   │  HTTPS / CDN cache (public GETs)
Next.js app (SSR + Route Handlers)  ──►  Service layer (src/lib)  ──►  Postgres+PostGIS  ◄── Ingestion workers (Node)
                                              │                          Redis (cache, rate-limit)         │
                                              └── Adapters (src/lib/adapters) ◄── IEC, MDB, Treasury, AGSA, SAPS, StatsSA, Eskom, municipal feeds
Admin portal (RBAC, audit log) ─► same service layer; official results are append-only, corrections are new rows
```
**Current implementation (this repo):** Next.js 14 + TS + Tailwind; service layer reads in-memory demo fixtures (`src/data/demo.ts`) and an admin-editable `data/election-state.json` (read per request → election state changes without rebuild). `db/schema.sql` is the target store. Adapters report `not_connected`.

## 2. Information architecture
Home (search, saved area) · My Area (political control, performance, representatives, projects, finances) · Elections (live results, history, map, candidates, voter guide) · Compare (parties, candidates, municipalities, history) · Community (reports, map, meetings, alerts) · Accountability (promises, spending, audits, council activity) · Ask Mzansi (assistant, education, Q&A) · Profile (saved, bookmarks, notifications, language, accessibility, privacy). Mobile: bottom bar = Home / My Area / Elections / Community / More.

## 3. Prioritised backlog
| # | Item | Phase | Status |
|---|---|---|---|
| 1 | App shell, tokens, trust labels, "How do we know this?" | 1 | **Done** |
| 2 | Location search (gazetteer, fuzzy, ward no., coords, ambiguity UI, GPS opt-in) | 1 | **Done (demo gazetteer)** |
| 3 | My Area: governance vs. post-election cards, seats, history, unavailable-data states | 1 | **Done (demo data)** |
| 4 | Election state machine without rebuild | 1 | **Done** |
| 5 | Voter guide (draft, IEC-linked) | 1 | **Done (needs legal/translation review)** |
| 6 | PostGIS schema | 1 | **Done (not yet migrated/wired)** |
| 7 | PostGIS-backed search + MDB/IEC boundary import | 1 | Next |
| 8 | Street-address geocoding provider | 1 | Next |
| 9 | IEC results adapter + reporting progress UI + maps (turnout, winners) | 1 | Blocked on IEC access |
| 10 | Admin portal, RBAC, audit log, correction workflow | 2 | Planned |
| 11 | Finances (Municipal Money, AGSA), indicators, project tracker | 2 | Planned |
| 12 | Party/candidate profiles + comparison | 2 | Planned |
| 13 | Promise tracker, community reporting + moderation, accounts, alerts | 3 | Planned |
| 14 | Source-grounded assistant, i18n (12 languages + SASL), low-data mode | 4 | Planned |

## 4. API (implemented)
- `GET /api/search?q=` → `{kind: match|ambiguous|none|address_unverified, hits[{ward, municipalityName, province, confidence, reason}], note}`. Never auto-resolves approximate or street-address matches.
- `GET /api/suggest?q=` → `{suggestions[]}`
- `GET /api/areas/{wardId}` → ward, municipality, election, 2021 history, `trust`, `source`
- `GET /api/elections/lge-2026` → election state + results (empty until an official feed is connected)

Planned: `/api/municipalities/{id}`, `/api/elections/{slug}/wards/{id}/results`, `/api/parties`, `/api/compare`, `/api/issues` (POST, rate-limited, moderated), `/api/me/*`, `/api/admin/*`. All responses carry `trust` + `source` provenance.

## 5. Data-source integration strategy
Principle: **official first, never pretend**. Each dataset = adapter implementing `DataAdapter` with owner, URL, coverage, period, usage conditions, quality flags, last-verified, last-ingested. Until access is confirmed the adapter is `NotConnectedAdapter` and the UI shows "Data unavailable".
| Dataset | Owner | Plan |
|---|---|---|
| Results, candidate lists, registered-voter aggregates | IEC | Request results API/feed access; ingest immutable rows; official declaration supersedes provisional |
| Ward/VD boundaries by version | MDB / IEC | Import shapefiles into PostGIS with `boundary_versions` |
| Municipal finance, AG outcomes | National Treasury (Municipal Money), AGSA | Public API/PDF extraction → `public_budgets`, `audit_findings` |
| Crime | SAPS | Police-precinct level only; never street-level |
| Labour/census | Stats SA | Label geographic level; no ward claims from district data |
| Outages | Municipal/Eskom feeds | Where published; separate municipal vs. grid faults |
| Council/mayor/coalitions | Municipal records | Editorial entry with source document + verification record |
Verify each licence/terms before ingestion. Geocoding: choose a provider with ZA address coverage and acceptable terms (e.g. self-hosted Nominatim/Pelias or commercial).

## 6. Neutrality, privacy, safety rules (enforced in code/design)
- A party with most votes/seats is never labelled "governing" until council confirmation; seat bars show the majority threshold.
- Address searches never imply registration/voting station; ID numbers never collected.
- Precise locations never stored in analytics; GPS used only on explicit tap and not persisted.
- Colour is never the sole encoding (pattern + labels); party colours confined to charts.
- Admin edits cannot overwrite official results (DB rules + append-only corrections).
