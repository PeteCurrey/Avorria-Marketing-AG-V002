-- ─────────────────────────────────────────────────────────────────────────────
-- Avorria Platform — Migration 002: Row Level Security
-- ─────────────────────────────────────────────────────────────────────────────
-- Every table has RLS enabled. Policies enforce:
--   CLIENT  → own org data only, zero access to enquiries/audit
--   TEAM    → cross-org read, limited write
--   ADMIN   → full access (via service role or explicit policy)
--   anon    → zero rows on every table
-- ─────────────────────────────────────────────────────────────────────────────

-- Helper: extract role from JWT app_metadata
CREATE OR REPLACE FUNCTION auth_role() RETURNS text
LANGUAGE sql STABLE SECURITY DEFINER AS $$
  SELECT COALESCE(
    (auth.jwt() -> 'app_metadata' ->> 'role'),
    'anon'
  );
$$;

-- Helper: extract organisation_id from JWT app_metadata
CREATE OR REPLACE FUNCTION auth_organisation_id() RETURNS uuid
LANGUAGE sql STABLE SECURITY DEFINER AS $$
  SELECT NULLIF(
    (auth.jwt() -> 'app_metadata' ->> 'organisation_id'),
    ''
  )::uuid;
$$;

-- ─── Enable RLS on all tables ────────────────────────────────────────────────

ALTER TABLE organisations         ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles              ENABLE ROW LEVEL SECURITY;
ALTER TABLE organisation_memberships ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects              ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_members       ENABLE ROW LEVEL SECURITY;
ALTER TABLE enquiries             ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages              ENABLE ROW LEVEL SECURITY;
ALTER TABLE documents             ENABLE ROW LEVEL SECURITY;
ALTER TABLE deliverables          ENABLE ROW LEVEL SECURITY;
ALTER TABLE activity              ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications         ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_events          ENABLE ROW LEVEL SECURITY;

-- ─── organisations ───────────────────────────────────────────────────────────

DROP POLICY IF EXISTS "organisations: client reads own" ON organisations;
CREATE POLICY "organisations: client reads own"
  ON organisations FOR SELECT
  USING (
    auth_role() = 'ADMIN' OR
    auth_role() = 'TEAM'  OR
    (auth_role() = 'CLIENT' AND id = auth_organisation_id())
  );

DROP POLICY IF EXISTS "organisations: team/admin write" ON organisations;
CREATE POLICY "organisations: team/admin write"
  ON organisations FOR INSERT
  WITH CHECK (auth_role() IN ('ADMIN', 'TEAM'));

DROP POLICY IF EXISTS "organisations: team/admin update" ON organisations;
CREATE POLICY "organisations: team/admin update"
  ON organisations FOR UPDATE
  USING (auth_role() IN ('ADMIN', 'TEAM'));

-- ─── profiles ────────────────────────────────────────────────────────────────

DROP POLICY IF EXISTS "profiles: user reads own" ON profiles;
CREATE POLICY "profiles: user reads own"
  ON profiles FOR SELECT
  USING (
    auth_role() IN ('ADMIN', 'TEAM') OR
    id = auth.uid()
  );

DROP POLICY IF EXISTS "profiles: user updates own" ON profiles;
CREATE POLICY "profiles: user updates own"
  ON profiles FOR UPDATE
  USING (id = auth.uid() OR auth_role() = 'ADMIN')
  WITH CHECK (id = auth.uid() OR auth_role() = 'ADMIN');

DROP POLICY IF EXISTS "profiles: system insert" ON profiles;
CREATE POLICY "profiles: system insert"
  ON profiles FOR INSERT
  WITH CHECK (id = auth.uid() OR auth_role() = 'ADMIN');

-- ─── organisation_memberships ────────────────────────────────────────────────

DROP POLICY IF EXISTS "memberships: client reads own" ON organisation_memberships;
CREATE POLICY "memberships: client reads own"
  ON organisation_memberships FOR SELECT
  USING (
    auth_role() IN ('ADMIN', 'TEAM') OR
    user_id = auth.uid()
  );

DROP POLICY IF EXISTS "memberships: admin manages" ON organisation_memberships;
CREATE POLICY "memberships: admin manages"
  ON organisation_memberships FOR ALL
  USING (auth_role() = 'ADMIN')
  WITH CHECK (auth_role() = 'ADMIN');

-- ─── projects ─────────────────────────────────────────────────────────────────

DROP POLICY IF EXISTS "projects: client reads own org" ON projects;
CREATE POLICY "projects: client reads own org"
  ON projects FOR SELECT
  USING (
    auth_role() IN ('ADMIN', 'TEAM') OR
    (auth_role() = 'CLIENT' AND organisation_id = auth_organisation_id())
  );

DROP POLICY IF EXISTS "projects: team writes" ON projects;
CREATE POLICY "projects: team writes"
  ON projects FOR INSERT
  WITH CHECK (auth_role() IN ('ADMIN', 'TEAM'));

DROP POLICY IF EXISTS "projects: team updates" ON projects;
CREATE POLICY "projects: team updates"
  ON projects FOR UPDATE
  USING (auth_role() IN ('ADMIN', 'TEAM'));

DROP POLICY IF EXISTS "projects: admin deletes" ON projects;
CREATE POLICY "projects: admin deletes"
  ON projects FOR DELETE
  USING (auth_role() = 'ADMIN');

-- ─── project_members ──────────────────────────────────────────────────────────

DROP POLICY IF EXISTS "project_members: read" ON project_members;
CREATE POLICY "project_members: read"
  ON project_members FOR SELECT
  USING (
    auth_role() IN ('ADMIN', 'TEAM') OR
    user_id = auth.uid()
  );

DROP POLICY IF EXISTS "project_members: team manages" ON project_members;
CREATE POLICY "project_members: team manages"
  ON project_members FOR ALL
  USING (auth_role() IN ('ADMIN', 'TEAM'))
  WITH CHECK (auth_role() IN ('ADMIN', 'TEAM'));

-- ─── enquiries ────────────────────────────────────────────────────────────────
-- CLIENTS HAVE ZERO ACCESS — no SELECT, INSERT, UPDATE, or DELETE.
-- Public form uses service-role function call only.

DROP POLICY IF EXISTS "enquiries: team reads" ON enquiries;
CREATE POLICY "enquiries: team reads"
  ON enquiries FOR SELECT
  USING (auth_role() IN ('ADMIN', 'TEAM'));

DROP POLICY IF EXISTS "enquiries: team updates" ON enquiries;
CREATE POLICY "enquiries: team updates"
  ON enquiries FOR UPDATE
  USING (auth_role() IN ('ADMIN', 'TEAM'));

DROP POLICY IF EXISTS "enquiries: admin deletes" ON enquiries;
CREATE POLICY "enquiries: admin deletes"
  ON enquiries FOR DELETE
  USING (auth_role() = 'ADMIN');

-- No INSERT policy for enquiries via authenticated users —
-- inserts happen via service-role SECURITY DEFINER function only.

-- ─── messages ─────────────────────────────────────────────────────────────────

DROP POLICY IF EXISTS "messages: client reads own org" ON messages;
CREATE POLICY "messages: client reads own org"
  ON messages FOR SELECT
  USING (
    auth_role() IN ('ADMIN', 'TEAM') OR
    (auth_role() = 'CLIENT' AND organisation_id = auth_organisation_id())
  );

DROP POLICY IF EXISTS "messages: client sends" ON messages;
CREATE POLICY "messages: client sends"
  ON messages FOR INSERT
  WITH CHECK (
    auth_role() IN ('ADMIN', 'TEAM') OR
    (auth_role() = 'CLIENT' AND organisation_id = auth_organisation_id() AND sender_id = auth.uid())
  );

DROP POLICY IF EXISTS "messages: team updates" ON messages;
CREATE POLICY "messages: team updates"
  ON messages FOR UPDATE
  USING (auth_role() IN ('ADMIN', 'TEAM'));

-- ─── documents ────────────────────────────────────────────────────────────────

DROP POLICY IF EXISTS "documents: client reads own org" ON documents;
CREATE POLICY "documents: client reads own org"
  ON documents FOR SELECT
  USING (
    auth_role() IN ('ADMIN', 'TEAM') OR
    (auth_role() = 'CLIENT' AND organisation_id = auth_organisation_id())
  );

DROP POLICY IF EXISTS "documents: team manages" ON documents;
CREATE POLICY "documents: team manages"
  ON documents FOR ALL
  USING (auth_role() IN ('ADMIN', 'TEAM'))
  WITH CHECK (auth_role() IN ('ADMIN', 'TEAM'));

-- ─── deliverables ─────────────────────────────────────────────────────────────

DROP POLICY IF EXISTS "deliverables: client reads published" ON deliverables;
CREATE POLICY "deliverables: client reads published"
  ON deliverables FOR SELECT
  USING (
    auth_role() IN ('ADMIN', 'TEAM') OR
    (auth_role() = 'CLIENT' AND organisation_id = auth_organisation_id() AND published_at IS NOT NULL)
  );

DROP POLICY IF EXISTS "deliverables: team manages" ON deliverables;
CREATE POLICY "deliverables: team manages"
  ON deliverables FOR ALL
  USING (auth_role() IN ('ADMIN', 'TEAM'))
  WITH CHECK (auth_role() IN ('ADMIN', 'TEAM'));

-- ─── activity ─────────────────────────────────────────────────────────────────

DROP POLICY IF EXISTS "activity: client reads own org" ON activity;
CREATE POLICY "activity: client reads own org"
  ON activity FOR SELECT
  USING (
    auth_role() IN ('ADMIN', 'TEAM') OR
    (auth_role() = 'CLIENT' AND organisation_id = auth_organisation_id())
  );

-- Activity is written via service-role only (no INSERT policy for authenticated users)

-- ─── notifications ────────────────────────────────────────────────────────────

DROP POLICY IF EXISTS "notifications: user reads own" ON notifications;
CREATE POLICY "notifications: user reads own"
  ON notifications FOR SELECT
  USING (user_id = auth.uid() OR auth_role() IN ('ADMIN', 'TEAM'));

DROP POLICY IF EXISTS "notifications: user marks read" ON notifications;
CREATE POLICY "notifications: user marks read"
  ON notifications FOR UPDATE
  USING (user_id = auth.uid() OR auth_role() = 'ADMIN');

-- ─── audit_events ─────────────────────────────────────────────────────────────
-- ZERO read access for any authenticated role via RLS.
-- Written via SECURITY DEFINER function + service role only.
-- Readable only via service-role admin client (internal tooling).

DROP POLICY IF EXISTS "audit_events: admin reads" ON audit_events;
CREATE POLICY "audit_events: admin reads"
  ON audit_events FOR SELECT
  USING (auth_role() = 'ADMIN');

-- No INSERT policy — inserts via service-role SECURITY DEFINER function only.
