-- Mzansi Votes — PostgreSQL 15 + PostGIS schema (target; the demo app uses in-memory fixtures)
-- Principles: history is append-only; official values are immutable; corrections are new rows.
CREATE EXTENSION IF NOT EXISTS postgis;
CREATE EXTENSION IF NOT EXISTS pg_trgm;
CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TYPE trust_level AS ENUM ('official','verified','provisional','reported','community','historical','unavailable','demo');
CREATE TYPE election_state AS ENUM ('awaiting','voting','counting','provisional','official','council_pending','administration_confirmed');
CREATE TYPE municipality_category AS ENUM ('A','B','C');   -- metro / local / district

-- ---------- Geography ----------
CREATE TABLE provinces (id serial PRIMARY KEY, code text UNIQUE NOT NULL, name text NOT NULL);
CREATE TABLE boundary_versions (
  id serial PRIMARY KEY, label text NOT NULL, authority text NOT NULL,           -- e.g. 'MDB 2021', 'IEC 2026'
  valid_from date NOT NULL, valid_to date, source_document_id uuid, UNIQUE(label));
CREATE TABLE municipalities (
  id serial PRIMARY KEY, code text UNIQUE NOT NULL, name text NOT NULL, category municipality_category NOT NULL,
  province_id int NOT NULL REFERENCES provinces, parent_district_id int REFERENCES municipalities,
  alt_names text[] NOT NULL DEFAULT '{}');
CREATE INDEX municipalities_name_trgm ON municipalities USING gin (name gin_trgm_ops);
CREATE TABLE wards (
  id serial PRIMARY KEY, municipality_id int NOT NULL REFERENCES municipalities, ward_number int NOT NULL,
  boundary_version_id int NOT NULL REFERENCES boundary_versions,
  geom geometry(MultiPolygon, 4326) NOT NULL, alt_names text[] NOT NULL DEFAULT '{}',
  UNIQUE (municipality_id, ward_number, boundary_version_id));
CREATE INDEX wards_geom ON wards USING gist (geom);
CREATE TABLE voting_districts (id serial PRIMARY KEY, vd_code text NOT NULL, ward_id int NOT NULL REFERENCES wards,
  geom geometry(MultiPolygon, 4326), UNIQUE (vd_code, ward_id));
CREATE TABLE voting_stations (id serial PRIMARY KEY, voting_district_id int REFERENCES voting_districts, name text NOT NULL,
  location geometry(Point, 4326), election_id int, source_document_id uuid);
CREATE TABLE places (  -- gazetteer for search: suburbs, townships, villages, informal settlements
  id serial PRIMARY KEY, name text NOT NULL, alt_names text[] NOT NULL DEFAULT '{}', kind text NOT NULL,
  location geometry(Point, 4326) NOT NULL, municipality_id int REFERENCES municipalities, source text NOT NULL);
CREATE INDEX places_name_trgm ON places USING gin (name gin_trgm_ops);

-- ---------- Elections ----------
CREATE TABLE elections (id serial PRIMARY KEY, slug text UNIQUE NOT NULL, name text NOT NULL,
  kind text NOT NULL CHECK (kind IN ('local','national','provincial','by_election')), election_date date,
  state election_state NOT NULL DEFAULT 'awaiting', boundary_version_id int REFERENCES boundary_versions);
CREATE TABLE electoral_events (id serial PRIMARY KEY, election_id int NOT NULL REFERENCES elections, kind text NOT NULL, occurred_at timestamptz NOT NULL, notes text);
CREATE TABLE ballot_types (id serial PRIMARY KEY, code text UNIQUE NOT NULL, name text NOT NULL);  -- ward, PR, district
CREATE TABLE parties (id serial PRIMARY KEY, name text NOT NULL, abbreviation text, logo_url text, website text, founded date, colour text);
CREATE TABLE candidates (id serial PRIMARY KEY, full_name text NOT NULL, party_id int REFERENCES parties, is_independent boolean NOT NULL DEFAULT false,
  election_id int NOT NULL REFERENCES elections, ward_id int REFERENCES wards, bio text, photo_url text, photo_licence text, source_document_id uuid,
  CHECK (is_independent = (party_id IS NULL)));
CREATE TABLE municipal_councils (id serial PRIMARY KEY, municipality_id int NOT NULL REFERENCES municipalities, election_id int NOT NULL REFERENCES elections,
  total_seats int, constituted_on date, UNIQUE (municipality_id, election_id));
CREATE TABLE council_seats (council_id int REFERENCES municipal_councils, party_id int REFERENCES parties, ward_seats int NOT NULL DEFAULT 0, pr_seats int NOT NULL DEFAULT 0,
  trust trust_level NOT NULL, PRIMARY KEY (council_id, party_id));
CREATE TABLE elected_councillors (id serial PRIMARY KEY, council_id int NOT NULL REFERENCES municipal_councils, candidate_id int REFERENCES candidates,
  ward_id int REFERENCES wards, kind text NOT NULL CHECK (kind IN ('ward','pr')), party_id int REFERENCES parties,
  term_start date NOT NULL, term_end date, end_reason text, contact_office jsonb);
CREATE TABLE mayors (id serial PRIMARY KEY, council_id int NOT NULL REFERENCES municipal_councils, person_name text NOT NULL, party_id int REFERENCES parties,
  elected_on date NOT NULL, ended_on date, source_document_id uuid NOT NULL);
CREATE TABLE coalition_arrangements (id serial PRIMARY KEY, council_id int NOT NULL REFERENCES municipal_councils, announced_on date, confirmed_on date,
  status text NOT NULL CHECK (status IN ('announced','confirmed','dissolved')), source_document_id uuid);
CREATE TABLE coalition_members (coalition_id int REFERENCES coalition_arrangements, party_id int REFERENCES parties, PRIMARY KEY (coalition_id, party_id));

-- Official results are immutable: corrections insert a new row with supersedes_id; the original is never updated.
CREATE TABLE election_results (
  id bigserial PRIMARY KEY, election_id int NOT NULL REFERENCES elections, ballot_type_id int NOT NULL REFERENCES ballot_types,
  ward_id int REFERENCES wards, voting_district_id int REFERENCES voting_districts, municipality_id int REFERENCES municipalities,
  party_id int REFERENCES parties, candidate_id int REFERENCES candidates, votes int NOT NULL CHECK (votes >= 0),
  trust trust_level NOT NULL, source_document_id uuid NOT NULL, source_value jsonb NOT NULL,   -- raw as published
  published_at timestamptz NOT NULL, ingested_at timestamptz NOT NULL DEFAULT now(), supersedes_id bigint REFERENCES election_results);
CREATE INDEX results_lookup ON election_results (election_id, ward_id, ballot_type_id);
CREATE TABLE reporting_progress (election_id int, ward_id int, vds_total int, vds_reported int, as_of timestamptz, PRIMARY KEY (election_id, ward_id, as_of));
CREATE TABLE registered_voter_aggregates (election_id int, ward_id int, registered int NOT NULL, PRIMARY KEY (election_id, ward_id));  -- aggregates only; never individuals

-- ---------- Performance & finance ----------
CREATE TABLE indicator_sources (id serial PRIMARY KEY, owner text NOT NULL, url text, usage_conditions text, geography text, cadence text, quality_flags text[]);
CREATE TABLE municipal_indicators (id serial PRIMARY KEY, code text UNIQUE NOT NULL, category text NOT NULL, name text NOT NULL, unit text, responsible_sphere text, higher_is_better boolean);
CREATE TABLE indicator_observations (id bigserial PRIMARY KEY, indicator_id int NOT NULL REFERENCES municipal_indicators, source_id int NOT NULL REFERENCES indicator_sources,
  municipality_id int REFERENCES municipalities, ward_id int REFERENCES wards, geographic_level text NOT NULL, period_start date NOT NULL, period_end date NOT NULL,
  value numeric, trust trust_level NOT NULL, ingested_at timestamptz NOT NULL DEFAULT now(), last_verified date);
CREATE TABLE public_budgets (id serial PRIMARY KEY, municipality_id int NOT NULL REFERENCES municipalities, fin_year int NOT NULL, kind text NOT NULL, amount_zar numeric NOT NULL, audited boolean NOT NULL, source_document_id uuid NOT NULL);
CREATE TABLE audit_findings (id serial PRIMARY KEY, municipality_id int NOT NULL REFERENCES municipalities, fin_year int NOT NULL, outcome text NOT NULL, irregular_zar numeric, fruitless_zar numeric, source_document_id uuid NOT NULL);
CREATE TABLE infrastructure_projects (id serial PRIMARY KEY, name text NOT NULL, municipality_id int REFERENCES municipalities, ward_id int REFERENCES wards, location geometry(Point,4326),
  agency text, contractor text, budget_zar numeric, spent_zar numeric, started date, expected_completion date, status text, delay_notes text, source_document_id uuid);

-- ---------- Accountability ----------
CREATE TABLE political_commitments (id serial PRIMARY KEY, text text NOT NULL, party_id int REFERENCES parties, person_name text, announced_on date, source_document_id uuid NOT NULL,
  institution text, deadline date, funding_zar numeric, status text NOT NULL DEFAULT 'unable_to_verify'
  CHECK (status IN ('not_started','in_progress','delivered','partially_delivered','missed_deadline','cancelled','unable_to_verify')), verified_on date);
CREATE TABLE commitment_milestones (id serial PRIMARY KEY, commitment_id int NOT NULL REFERENCES political_commitments, description text, occurred_on date, evidence_document_id uuid);

-- ---------- Community ----------
CREATE TABLE community_issues (id uuid PRIMARY KEY DEFAULT gen_random_uuid(), reference text UNIQUE NOT NULL, category text NOT NULL, description text NOT NULL,
  ward_id int REFERENCES wards,
  location_public geometry(Point,4326),       -- coarsened (~500 m grid) for public display
  location_exact bytea,                        -- encrypted; only moderators/routing
  public_ok boolean NOT NULL DEFAULT false, platform_status text NOT NULL DEFAULT 'pending_moderation', municipal_ticket_ref text, municipal_status text,
  created_at timestamptz NOT NULL DEFAULT now());
CREATE TABLE issue_updates (id bigserial PRIMARY KEY, issue_id uuid NOT NULL REFERENCES community_issues, actor text NOT NULL, note text, created_at timestamptz NOT NULL DEFAULT now());

-- ---------- Users (optional accounts) ----------
CREATE TABLE user_accounts (id uuid PRIMARY KEY DEFAULT gen_random_uuid(), email_hash text UNIQUE, locale text DEFAULT 'en', created_at timestamptz DEFAULT now(), deleted_at timestamptz);
CREATE TABLE saved_locations (id serial PRIMARY KEY, user_id uuid NOT NULL REFERENCES user_accounts ON DELETE CASCADE, ward_id int REFERENCES wards, municipality_id int REFERENCES municipalities, label text);
CREATE TABLE user_notifications (id bigserial PRIMARY KEY, user_id uuid NOT NULL REFERENCES user_accounts ON DELETE CASCADE, topic text NOT NULL, payload jsonb, sent_at timestamptz);

-- ---------- Provenance & audit ----------
CREATE TABLE official_documents (id uuid PRIMARY KEY DEFAULT gen_random_uuid(), owner text NOT NULL, url text, title text, published_on date, sha256 text, retrieved_at timestamptz, usage_conditions text);
CREATE TABLE data_verification_records (id bigserial PRIMARY KEY, entity_table text NOT NULL, entity_id text NOT NULL, verified_by text NOT NULL, verified_at timestamptz NOT NULL DEFAULT now(), method text, notes text);
CREATE TABLE audit_logs (id bigserial PRIMARY KEY, actor text NOT NULL, action text NOT NULL, entity_table text, entity_id text, before jsonb, after jsonb, at timestamptz NOT NULL DEFAULT now(), ip inet);
-- audit_logs is append-only
CREATE RULE audit_no_update AS ON UPDATE TO audit_logs DO INSTEAD NOTHING;
CREATE RULE audit_no_delete AS ON DELETE TO audit_logs DO INSTEAD NOTHING;
CREATE RULE results_no_update AS ON UPDATE TO election_results DO INSTEAD NOTHING;
CREATE RULE results_no_delete AS ON DELETE TO election_results DO INSTEAD NOTHING;

-- Ward lookup used by /api/search for coordinates (authoritative: polygon containment, NOT nearest centroid):
--   SELECT * FROM wards w JOIN boundary_versions b ON b.id=w.boundary_version_id
--   WHERE ST_Covers(w.geom, ST_SetSRID(ST_Point($lon,$lat),4326)) AND b.valid_from <= $election_date AND (b.valid_to IS NULL OR b.valid_to >= $election_date);
