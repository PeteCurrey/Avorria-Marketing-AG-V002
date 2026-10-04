-- ─────────────────────────────────────────────────────────────────────────────
-- Avorria Platform — Migration 007: Supabase-backed Proof Content
-- ─────────────────────────────────────────────────────────────────────────────
-- Tables:
--   - clients (name, logo_url, market, verified, sort)
--   - markets (country, verified)
--   - case_studies (slug, client_id, headline_result, metric_label, metric_value, period, narrative, published, verified)
--   - testimonials (quote, person, role, client_id, verified, consent_documented)
--   - site_copy (key, value)
--
-- Rules:
--   - Public queries return only verified = true (and consent_documented = true for testimonials, published = true for case studies)
--   - RLS enforced. Admin writes only.
--   - Seeded empty.
-- ─────────────────────────────────────────────────────────────────────────────

-- 1. Clients
CREATE TABLE IF NOT EXISTS clients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  logo_url TEXT,
  market TEXT,
  verified BOOLEAN NOT NULL DEFAULT false,
  sort INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 2. Markets
CREATE TABLE IF NOT EXISTS markets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  country TEXT NOT NULL UNIQUE,
  verified BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 3. Case Studies
CREATE TABLE IF NOT EXISTS case_studies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL UNIQUE,
  client_id UUID REFERENCES clients(id) ON DELETE CASCADE,
  headline_result TEXT NOT NULL,
  metric_label TEXT,
  metric_value TEXT,
  period TEXT,
  narrative TEXT,
  published BOOLEAN NOT NULL DEFAULT false,
  verified BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 4. Testimonials
CREATE TABLE IF NOT EXISTS testimonials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  quote TEXT NOT NULL,
  person TEXT NOT NULL,
  role TEXT NOT NULL,
  client_id UUID REFERENCES clients(id) ON DELETE CASCADE,
  verified BOOLEAN NOT NULL DEFAULT false,
  consent_documented BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 5. Site Copy
CREATE TABLE IF NOT EXISTS site_copy (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ─── Indexes ──────────────────────────────────────────────────────────────────
CREATE INDEX IF NOT EXISTS idx_clients_verified ON clients(verified, sort);
CREATE INDEX IF NOT EXISTS idx_markets_verified ON markets(verified);
CREATE INDEX IF NOT EXISTS idx_case_studies_verified ON case_studies(verified, published);
CREATE INDEX IF NOT EXISTS idx_testimonials_verified ON testimonials(verified, consent_documented);

-- ─── Enable Row Level Security ───────────────────────────────────────────────
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE markets ENABLE ROW LEVEL SECURITY;
ALTER TABLE case_studies ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_copy ENABLE ROW LEVEL SECURITY;

-- ─── Public Read Policies (RLS) ─────────────────────────────────────────────
-- Public queries return ONLY rows where verified = true
-- (and consent_documented = true for testimonials, published = true for case studies).

DROP POLICY IF EXISTS "Public read verified clients" ON clients;
CREATE POLICY "Public read verified clients"
  ON clients FOR SELECT
  USING (verified = true);

DROP POLICY IF EXISTS "Public read verified markets" ON markets;
CREATE POLICY "Public read verified markets"
  ON markets FOR SELECT
  USING (verified = true);

DROP POLICY IF EXISTS "Public read verified and published case studies" ON case_studies;
CREATE POLICY "Public read verified and published case studies"
  ON case_studies FOR SELECT
  USING (verified = true AND published = true);

DROP POLICY IF EXISTS "Public read verified and consented testimonials" ON testimonials;
CREATE POLICY "Public read verified and consented testimonials"
  ON testimonials FOR SELECT
  USING (verified = true AND consent_documented = true);

DROP POLICY IF EXISTS "Public read site_copy" ON site_copy;
CREATE POLICY "Public read site_copy"
  ON site_copy FOR SELECT
  USING (true);

-- ─── Admin Write Policies (RLS) ─────────────────────────────────────────────
-- Admin writes only.

DROP POLICY IF EXISTS "Admin write clients" ON clients;
CREATE POLICY "Admin write clients"
  ON clients FOR ALL
  TO authenticated
  USING (auth_role() = 'ADMIN')
  WITH CHECK (auth_role() = 'ADMIN');

DROP POLICY IF EXISTS "Admin write markets" ON markets;
CREATE POLICY "Admin write markets"
  ON markets FOR ALL
  TO authenticated
  USING (auth_role() = 'ADMIN')
  WITH CHECK (auth_role() = 'ADMIN');

DROP POLICY IF EXISTS "Admin write case_studies" ON case_studies;
CREATE POLICY "Admin write case_studies"
  ON case_studies FOR ALL
  TO authenticated
  USING (auth_role() = 'ADMIN')
  WITH CHECK (auth_role() = 'ADMIN');

DROP POLICY IF EXISTS "Admin write testimonials" ON testimonials;
CREATE POLICY "Admin write testimonials"
  ON testimonials FOR ALL
  TO authenticated
  USING (auth_role() = 'ADMIN')
  WITH CHECK (auth_role() = 'ADMIN');

DROP POLICY IF EXISTS "Admin write site_copy" ON site_copy;
CREATE POLICY "Admin write site_copy"
  ON site_copy FOR ALL
  TO authenticated
  USING (auth_role() = 'ADMIN')
  WITH CHECK (auth_role() = 'ADMIN');
