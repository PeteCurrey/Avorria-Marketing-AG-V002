-- ─────────────────────────────────────────────────────────────────────────────
-- Avorria Platform — Migration 001: Initial Schema
-- ─────────────────────────────────────────────────────────────────────────────
-- Run via: psql $DATABASE_URL -f supabase/migrations/001_initial_schema.sql
-- Or apply via Supabase Dashboard SQL editor.
-- ─────────────────────────────────────────────────────────────────────────────

-- Extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ─── Enums ───────────────────────────────────────────────────────────────────

DO $$ BEGIN
  CREATE TYPE user_role AS ENUM ('CLIENT', 'TEAM', 'ADMIN');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE project_status AS ENUM (
    'ENQUIRY', 'DISCOVERY', 'PLANNING', 'DESIGN',
    'DEVELOPMENT', 'REVIEW', 'LAUNCH', 'COMPLETED', 'ON_HOLD'
  );
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE enquiry_status AS ENUM (
    'NEW', 'REVIEWING', 'CONTACTED', 'QUALIFIED',
    'PROPOSAL', 'WON', 'LOST', 'ARCHIVED'
  );
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE message_direction AS ENUM ('INBOUND', 'OUTBOUND');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE document_category AS ENUM (
    'PROPOSAL', 'CONTRACT', 'SPECIFICATION', 'REPORT', 'INVOICE', 'OTHER'
  );
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE deliverable_type AS ENUM (
    'DESIGN_FILE', 'DEVELOPMENT_RELEASE', 'WEBSITE',
    'REPORT', 'ASSET', 'DOCUMENTATION'
  );
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE organisation_status AS ENUM ('ACTIVE', 'INACTIVE', 'ARCHIVED');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- ─── Timestamp trigger ────────────────────────────────────────────────────────

CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- ─── Organisations ────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS organisations (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name          text NOT NULL,
  slug          text NOT NULL UNIQUE,
  primary_email text,
  website       text,
  status        organisation_status NOT NULL DEFAULT 'ACTIVE',
  created_at    timestamptz NOT NULL DEFAULT now(),
  updated_at    timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS organisations_slug_idx ON organisations(slug);

DROP TRIGGER IF EXISTS organisations_updated_at ON organisations;
CREATE TRIGGER organisations_updated_at
  BEFORE UPDATE ON organisations
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- ─── Profiles ─────────────────────────────────────────────────────────────────
-- Mirrors auth.users — one row per authenticated user.
-- Role stored in app_metadata on auth.users AND here for SQL joins.

CREATE TABLE IF NOT EXISTS profiles (
  id              uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email           text NOT NULL,
  full_name       text,
  role            user_role NOT NULL DEFAULT 'CLIENT',
  organisation_id uuid REFERENCES organisations(id) ON DELETE SET NULL,
  avatar_url      text,
  created_at      timestamptz NOT NULL DEFAULT now(),
  updated_at      timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS profiles_organisation_id_idx ON profiles(organisation_id);
CREATE INDEX IF NOT EXISTS profiles_role_idx ON profiles(role);

DROP TRIGGER IF EXISTS profiles_updated_at ON profiles;
CREATE TRIGGER profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- Auto-create profile on user sign-up
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, role, organisation_id)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data->>'full_name',
    COALESCE((NEW.raw_app_meta_data->>'role')::user_role, 'CLIENT'),
    (NEW.raw_app_meta_data->>'organisation_id')::uuid
  )
  ON CONFLICT (id) DO UPDATE
    SET email = EXCLUDED.email,
        full_name = EXCLUDED.full_name,
        role = EXCLUDED.role,
        organisation_id = EXCLUDED.organisation_id;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- ─── Organisation Memberships ─────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS organisation_memberships (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organisation_id uuid NOT NULL REFERENCES organisations(id) ON DELETE CASCADE,
  user_id         uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  role            text NOT NULL DEFAULT 'MEMBER' CHECK (role IN ('OWNER', 'MEMBER')),
  joined_at       timestamptz NOT NULL DEFAULT now(),
  UNIQUE(organisation_id, user_id)
);

CREATE INDEX IF NOT EXISTS org_memberships_user_idx ON organisation_memberships(user_id);
CREATE INDEX IF NOT EXISTS org_memberships_org_idx  ON organisation_memberships(organisation_id);

-- ─── Projects ─────────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS projects (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organisation_id uuid NOT NULL REFERENCES organisations(id) ON DELETE CASCADE,
  title           text NOT NULL,
  slug            text NOT NULL,
  description     text,
  status          project_status NOT NULL DEFAULT 'ENQUIRY',
  service_ids     text[] NOT NULL DEFAULT '{}',
  start_date      date,
  target_date     date,
  completed_at    timestamptz,
  created_at      timestamptz NOT NULL DEFAULT now(),
  updated_at      timestamptz NOT NULL DEFAULT now(),
  UNIQUE(organisation_id, slug)
);

CREATE INDEX IF NOT EXISTS projects_org_idx    ON projects(organisation_id);
CREATE INDEX IF NOT EXISTS projects_status_idx ON projects(status);

DROP TRIGGER IF EXISTS projects_updated_at ON projects;
CREATE TRIGGER projects_updated_at
  BEFORE UPDATE ON projects
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- ─── Project Members ──────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS project_members (
  id         uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  user_id    uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  role       text NOT NULL DEFAULT 'MEMBER' CHECK (role IN ('LEAD', 'MEMBER', 'OBSERVER')),
  added_at   timestamptz NOT NULL DEFAULT now(),
  UNIQUE(project_id, user_id)
);

-- ─── Enquiries ────────────────────────────────────────────────────────────────
-- Internal only — clients NEVER access this table (enforced by RLS).

CREATE TABLE IF NOT EXISTS enquiries (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name            text NOT NULL,
  company         text,
  email           text NOT NULL,
  website         text,
  what_building   text NOT NULL,
  problem_solving text,
  services        text[] NOT NULL DEFAULT '{}',
  budget          text,
  timeline        text,
  additional      text,
  status          enquiry_status NOT NULL DEFAULT 'NEW',
  assigned_to     uuid REFERENCES profiles(id) ON DELETE SET NULL,
  organisation_id uuid REFERENCES organisations(id) ON DELETE SET NULL,
  ip_hash         text,   -- SHA-256 of IP, not raw IP
  created_at      timestamptz NOT NULL DEFAULT now(),
  updated_at      timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS enquiries_status_idx  ON enquiries(status);
CREATE INDEX IF NOT EXISTS enquiries_email_idx   ON enquiries(email);
CREATE INDEX IF NOT EXISTS enquiries_created_idx ON enquiries(created_at DESC);

DROP TRIGGER IF EXISTS enquiries_updated_at ON enquiries;
CREATE TRIGGER enquiries_updated_at
  BEFORE UPDATE ON enquiries
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- ─── Messages ─────────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS messages (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organisation_id uuid NOT NULL REFERENCES organisations(id) ON DELETE CASCADE,
  project_id      uuid REFERENCES projects(id) ON DELETE SET NULL,
  sender_id       uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  direction       message_direction NOT NULL,
  subject         text,
  body            text NOT NULL,
  read_at         timestamptz,
  created_at      timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS messages_org_idx     ON messages(organisation_id);
CREATE INDEX IF NOT EXISTS messages_project_idx ON messages(project_id);
CREATE INDEX IF NOT EXISTS messages_sender_idx  ON messages(sender_id);

-- ─── Documents ────────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS documents (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organisation_id uuid NOT NULL REFERENCES organisations(id) ON DELETE CASCADE,
  project_id      uuid REFERENCES projects(id) ON DELETE SET NULL,
  title           text NOT NULL,
  category        document_category NOT NULL DEFAULT 'OTHER',
  storage_path    text,       -- Supabase Storage path (not public URL)
  file_size       bigint,
  mime_type       text,
  uploaded_by     uuid NOT NULL REFERENCES profiles(id),
  created_at      timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS documents_org_idx     ON documents(organisation_id);
CREATE INDEX IF NOT EXISTS documents_project_idx ON documents(project_id);

-- ─── Deliverables ─────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS deliverables (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organisation_id uuid NOT NULL REFERENCES organisations(id) ON DELETE CASCADE,
  project_id      uuid REFERENCES projects(id) ON DELETE SET NULL,
  title           text NOT NULL,
  description     text,
  type            deliverable_type NOT NULL,
  url             text,
  published_at    timestamptz,
  published_by    uuid REFERENCES profiles(id),
  created_at      timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS deliverables_org_idx ON deliverables(organisation_id);

-- ─── Activity ─────────────────────────────────────────────────────────────────
-- Append-only activity feed for client-visible events.

CREATE TABLE IF NOT EXISTS activity (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  actor_id        uuid REFERENCES profiles(id) ON DELETE SET NULL,
  event_type      text NOT NULL,
  resource_type   text NOT NULL,
  resource_id     uuid,
  organisation_id uuid REFERENCES organisations(id) ON DELETE CASCADE,
  metadata        jsonb NOT NULL DEFAULT '{}',
  created_at      timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS activity_org_idx     ON activity(organisation_id);
CREATE INDEX IF NOT EXISTS activity_created_idx ON activity(created_at DESC);

-- ─── Notifications ────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS notifications (
  id         uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id    uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  title      text NOT NULL,
  body       text,
  href       text,
  read_at    timestamptz,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS notifications_user_idx ON notifications(user_id);

-- ─── Audit Events ─────────────────────────────────────────────────────────────
-- Append-only. NEVER readable by clients. Never deletable.

CREATE TABLE IF NOT EXISTS audit_events (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  actor_id        uuid REFERENCES profiles(id) ON DELETE SET NULL,
  action          text NOT NULL,
  resource_type   text NOT NULL,
  resource_id     uuid,
  organisation_id uuid REFERENCES organisations(id) ON DELETE SET NULL,
  metadata        jsonb NOT NULL DEFAULT '{}',
  ip_address      text,
  user_agent      text,
  created_at      timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS audit_events_actor_idx   ON audit_events(actor_id);
CREATE INDEX IF NOT EXISTS audit_events_created_idx ON audit_events(created_at DESC);
CREATE INDEX IF NOT EXISTS audit_events_org_idx     ON audit_events(organisation_id);
