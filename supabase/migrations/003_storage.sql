-- ─────────────────────────────────────────────────────────────────────────────
-- Avorria Platform — Migration 003: Storage Buckets
-- ─────────────────────────────────────────────────────────────────────────────
-- Run in Supabase Dashboard or via service-role client.
-- All buckets are private — no public access.
-- Org-scoped paths: {organisation_id}/{filename}
-- ─────────────────────────────────────────────────────────────────────────────

-- ─── Secure enquiry insert function ──────────────────────────────────────────
-- Public form calls this via service-role. No INSERT policy exists on enquiries
-- for authenticated users — this function is the only write path.
CREATE OR REPLACE FUNCTION insert_enquiry(
  p_name            text,
  p_company         text,
  p_email           text,
  p_website         text,
  p_what_building   text,
  p_problem_solving text,
  p_services        text[],
  p_budget          text,
  p_timeline        text,
  p_additional      text,
  p_ip_hash         text
)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_id uuid;
BEGIN
  INSERT INTO enquiries (
    name, company, email, website,
    what_building, problem_solving,
    services, budget, timeline, additional,
    ip_hash
  ) VALUES (
    p_name, p_company, p_email, p_website,
    p_what_building, p_problem_solving,
    p_services, p_budget, p_timeline, p_additional,
    p_ip_hash
  )
  RETURNING id INTO v_id;
  RETURN v_id;
END;
$$;

-- ─── Secure audit event writer ────────────────────────────────────────────────
CREATE OR REPLACE FUNCTION write_audit_event(
  p_actor_id        uuid,
  p_action          text,
  p_resource_type   text,
  p_resource_id     uuid,
  p_organisation_id uuid,
  p_metadata        jsonb,
  p_ip_address      text,
  p_user_agent      text
)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_id uuid;
BEGIN
  INSERT INTO audit_events (
    actor_id, action, resource_type, resource_id,
    organisation_id, metadata, ip_address, user_agent
  ) VALUES (
    p_actor_id, p_action, p_resource_type, p_resource_id,
    p_organisation_id, p_metadata, p_ip_address, p_user_agent
  )
  RETURNING id INTO v_id;
  RETURN v_id;
END;
$$;

-- ─── Storage buckets (Supabase Storage API) ───────────────────────────────────
-- NOTE: Storage bucket creation is done via Supabase Dashboard or management API.
-- The policies below assume buckets named 'client-documents' and 'deliverables'
-- already exist. Create them via Dashboard → Storage → New bucket (private).

-- Storage RLS for client-documents bucket
-- Path convention: {organisation_id}/{filename}
-- Clients read their own org files only; TEAM/ADMIN read all.
DROP POLICY IF EXISTS "client-documents: client reads own" ON storage.objects;
CREATE POLICY "client-documents: client reads own"
  ON storage.objects FOR SELECT
  USING (
    bucket_id = 'client-documents' AND (
      auth_role() IN ('ADMIN', 'TEAM') OR
      (auth_role() = 'CLIENT' AND (storage.foldername(name))[1] = auth_organisation_id()::text)
    )
  );

DROP POLICY IF EXISTS "client-documents: team uploads" ON storage.objects;
CREATE POLICY "client-documents: team uploads"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'client-documents' AND
    auth_role() IN ('ADMIN', 'TEAM')
  );

DROP POLICY IF EXISTS "client-documents: team deletes" ON storage.objects;
CREATE POLICY "client-documents: team deletes"
  ON storage.objects FOR DELETE
  USING (
    bucket_id = 'client-documents' AND
    auth_role() = 'ADMIN'
  );

-- deliverables bucket — published deliverables readable by client
DROP POLICY IF EXISTS "deliverables: client reads own" ON storage.objects;
CREATE POLICY "deliverables: client reads own"
  ON storage.objects FOR SELECT
  USING (
    bucket_id = 'deliverables' AND (
      auth_role() IN ('ADMIN', 'TEAM') OR
      (auth_role() = 'CLIENT' AND (storage.foldername(name))[1] = auth_organisation_id()::text)
    )
  );

DROP POLICY IF EXISTS "deliverables: team uploads" ON storage.objects;
CREATE POLICY "deliverables: team uploads"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'deliverables' AND
    auth_role() IN ('ADMIN', 'TEAM')
  );
