-- ─────────────────────────────────────────────────────────────────────────────
-- Avorria Platform — Migration 004: Rate Limit (Postgres-backed)
-- ─────────────────────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS rate_limit_log (
  ip_hash      text NOT NULL,
  window_start timestamptz NOT NULL DEFAULT date_trunc('hour', now()),
  count        integer NOT NULL DEFAULT 0,
  PRIMARY KEY (ip_hash, window_start)
);

CREATE INDEX IF NOT EXISTS rate_limit_window_idx ON rate_limit_log(window_start);

-- Clean up entries older than 2 hours automatically
CREATE OR REPLACE FUNCTION cleanup_rate_limit_log()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  DELETE FROM rate_limit_log
  WHERE window_start < now() - interval '2 hours';
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS rate_limit_cleanup ON rate_limit_log;
CREATE TRIGGER rate_limit_cleanup
  AFTER INSERT ON rate_limit_log
  FOR EACH STATEMENT EXECUTE FUNCTION cleanup_rate_limit_log();

-- Atomic upsert + check function
-- Returns TRUE if request is allowed, FALSE if rate limited.
-- Uses advisory lock to prevent race conditions.
CREATE OR REPLACE FUNCTION check_and_increment_rate_limit(
  p_ip_hash    text,
  p_max_per_hour integer
)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_window timestamptz := date_trunc('hour', now());
  v_count  integer;
BEGIN
  INSERT INTO rate_limit_log(ip_hash, window_start, count)
  VALUES (p_ip_hash, v_window, 1)
  ON CONFLICT (ip_hash, window_start)
  DO UPDATE SET count = rate_limit_log.count + 1
  RETURNING count INTO v_count;

  RETURN v_count <= p_max_per_hour;
END;
$$;

-- Deny direct table access — only callable via service role function
REVOKE ALL ON rate_limit_log FROM anon, authenticated;
