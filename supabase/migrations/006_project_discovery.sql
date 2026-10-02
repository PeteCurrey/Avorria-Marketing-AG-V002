-- =============================================================================
-- Migration: 006_project_discovery.sql
-- Description: Project Discovery Engine & Intelligent Briefing Schema
-- System of Record: Supabase (Postgres)
-- =============================================================================

-- 1. Discovery Project Lifecycle State
DO $$ BEGIN
  CREATE TYPE discovery_project_state AS ENUM (
    'DRAFT',
    'IN_PROGRESS',
    'READY_FOR_REVIEW',
    'SUBMITTED',
    'PROCESSING',
    'COMPLETED',
    'ERROR'
  );
EXCEPTION WHEN duplicate_object THEN null; END $$;

-- 2. Completeness Understanding Level
DO $$ BEGIN
  CREATE TYPE discovery_understanding_level AS ENUM (
    'UNDERSTOOD',
    'PARTIALLY_UNDERSTOOD',
    'NOT_YET_DEFINED'
  );
EXCEPTION WHEN duplicate_object THEN null; END $$;

-- 3. Discovery Projects (System of record for discovery sessions)
CREATE TABLE IF NOT EXISTS discovery_projects (
  id                    UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_token_hash    TEXT NOT NULL UNIQUE,
  status                discovery_project_state NOT NULL DEFAULT 'DRAFT',
  current_stage         INT NOT NULL DEFAULT 1,

  -- Client Identity
  client_name           TEXT,
  client_email          TEXT,
  client_role           TEXT,
  client_phone          TEXT,
  company_name          TEXT,
  company_website       TEXT,

  -- Extracted & Structured Discovery Attributes
  core_problem          TEXT,
  desired_outcomes      TEXT[] NOT NULL DEFAULT '{}',
  project_types         TEXT[] NOT NULL DEFAULT '{}',
  existing_systems      JSONB NOT NULL DEFAULT '{}'::jsonb,
  budget_bracket        TEXT,
  timing_bracket        TEXT,
  deadline_constraint   TEXT,
  additional_context    TEXT,

  -- Factual Completeness Matrix
  completeness_matrix   JSONB NOT NULL DEFAULT '{
    "business": "NOT_YET_DEFINED",
    "problem": "NOT_YET_DEFINED",
    "objective": "NOT_YET_DEFINED",
    "audience": "NOT_YET_DEFINED",
    "technical_environment": "NOT_YET_DEFINED",
    "materials": "NOT_YET_DEFINED",
    "timing": "NOT_YET_DEFINED",
    "budget": "NOT_YET_DEFINED"
  }'::jsonb,

  -- Active Adaptive Follow-up
  pending_follow_up     JSONB,

  -- Compiled Brief Artifacts
  client_brief          JSONB,
  internal_discovery_pack JSONB,

  -- System Linkages upon conversion
  organisation_id       UUID REFERENCES organisations(id) ON DELETE SET NULL,
  project_id            UUID REFERENCES projects(id) ON DELETE SET NULL,
  enquiry_id            UUID REFERENCES enquiries(id) ON DELETE SET NULL,

  -- Auditing & Network Telemetry
  ip_hash               TEXT,
  user_agent            TEXT,
  created_at            TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at            TIMESTAMPTZ NOT NULL DEFAULT now(),
  submitted_at          TIMESTAMPTZ
);

-- 4. Discovery Project Answers (Preserves exact raw inputs per stage)
CREATE TABLE IF NOT EXISTS discovery_answers (
  id                    UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id            UUID NOT NULL REFERENCES discovery_projects(id) ON DELETE CASCADE,
  stage_number          INT NOT NULL,
  stage_slug            TEXT NOT NULL,
  raw_input             JSONB NOT NULL,
  extracted_data        JSONB,
  client_corrections    JSONB,
  version               INT NOT NULL DEFAULT 1,
  created_at            TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at            TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(project_id, stage_slug)
);

-- 5. Discovery Uploaded Materials
CREATE TABLE IF NOT EXISTS discovery_files (
  id                    UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id            UUID NOT NULL REFERENCES discovery_projects(id) ON DELETE CASCADE,
  file_name             TEXT NOT NULL,
  file_size_bytes       BIGINT NOT NULL,
  mime_type             TEXT NOT NULL,
  storage_path          TEXT NOT NULL,
  extracted_summary     TEXT,
  category              TEXT NOT NULL DEFAULT 'OTHER',
  created_at            TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 6. Discovery AI Interaction Audit Log
CREATE TABLE IF NOT EXISTS discovery_ai_interactions (
  id                    UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id            UUID NOT NULL REFERENCES discovery_projects(id) ON DELETE CASCADE,
  interaction_type      TEXT NOT NULL, -- 'EXTRACTION', 'CLASSIFICATION', 'FOLLOW_UP', 'SYNTHESIS', 'BRIEF_GENERATION'
  model                 TEXT NOT NULL,
  input_tokens          INT,
  output_tokens         INT,
  prompt_summary        TEXT,
  raw_response          JSONB,
  structured_output     JSONB,
  status                TEXT NOT NULL DEFAULT 'SUCCESS', -- 'SUCCESS', 'FAILED', 'RECOVERED'
  error_message         TEXT,
  created_at            TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 7. Discovery Brief Revisions (Immutable versioned briefs)
CREATE TABLE IF NOT EXISTS discovery_brief_revisions (
  id                    UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id            UUID NOT NULL REFERENCES discovery_projects(id) ON DELETE CASCADE,
  version               INT NOT NULL DEFAULT 1,
  brief_type            TEXT NOT NULL, -- 'CLIENT_BRIEF' | 'INTERNAL_DISCOVERY_PACK'
  content               JSONB NOT NULL,
  created_at            TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 8. Indexes for High-Velocity Queries
CREATE INDEX IF NOT EXISTS idx_discovery_projects_token ON discovery_projects(session_token_hash);
CREATE INDEX IF NOT EXISTS idx_discovery_projects_status ON discovery_projects(status);
CREATE INDEX IF NOT EXISTS idx_discovery_projects_updated ON discovery_projects(updated_at DESC);
CREATE INDEX IF NOT EXISTS idx_discovery_answers_project ON discovery_answers(project_id);
CREATE INDEX IF NOT EXISTS idx_discovery_files_project ON discovery_files(project_id);
CREATE INDEX IF NOT EXISTS idx_discovery_ai_project ON discovery_ai_interactions(project_id);
CREATE INDEX IF NOT EXISTS idx_discovery_brief_revisions_project ON discovery_brief_revisions(project_id, version);

-- 9. Updated At Triggers
DROP TRIGGER IF EXISTS discovery_projects_updated_at ON discovery_projects;
CREATE TRIGGER discovery_projects_updated_at
  BEFORE UPDATE ON discovery_projects
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

DROP TRIGGER IF EXISTS discovery_answers_updated_at ON discovery_answers;
CREATE TRIGGER discovery_answers_updated_at
  BEFORE UPDATE ON discovery_answers
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- 10. Row Level Security
ALTER TABLE discovery_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE discovery_answers ENABLE ROW LEVEL SECURITY;
ALTER TABLE discovery_files ENABLE ROW LEVEL SECURITY;
ALTER TABLE discovery_ai_interactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE discovery_brief_revisions ENABLE ROW LEVEL SECURITY;

-- Team and Admin can inspect all discovery projects & answers
DROP POLICY IF EXISTS "discovery_projects: team reads" ON discovery_projects;
CREATE POLICY "discovery_projects: team reads"
  ON discovery_projects FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role IN ('TEAM', 'ADMIN')
    )
  );

DROP POLICY IF EXISTS "discovery_answers: team reads" ON discovery_answers;
CREATE POLICY "discovery_answers: team reads"
  ON discovery_answers FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role IN ('TEAM', 'ADMIN')
    )
  );

DROP POLICY IF EXISTS "discovery_files: team reads" ON discovery_files;
CREATE POLICY "discovery_files: team reads"
  ON discovery_files FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role IN ('TEAM', 'ADMIN')
    )
  );

DROP POLICY IF EXISTS "discovery_ai_interactions: team reads" ON discovery_ai_interactions;
CREATE POLICY "discovery_ai_interactions: team reads"
  ON discovery_ai_interactions FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role IN ('TEAM', 'ADMIN')
    )
  );

DROP POLICY IF EXISTS "discovery_brief_revisions: team reads" ON discovery_brief_revisions;
CREATE POLICY "discovery_brief_revisions: team reads"
  ON discovery_brief_revisions FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role IN ('TEAM', 'ADMIN')
    )
  );

-- 11. Discovery Materials Storage Bucket Policies
-- Note: Bucket 'discovery-materials' should be created via dashboard or admin script.
DROP POLICY IF EXISTS "discovery-materials: team reads all" ON storage.objects;
CREATE POLICY "discovery-materials: team reads all"
  ON storage.objects FOR SELECT
  USING (
    bucket_id = 'discovery-materials' AND
    auth_role() IN ('ADMIN', 'TEAM')
  );
