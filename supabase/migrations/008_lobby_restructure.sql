-- Migration: 008_lobby_restructure.sql
-- Description: Align lobby_articles with standard content fields (body, published, author_name)
-- and add RLS policy for published content. Seeded empty.

ALTER TABLE lobby_articles ADD COLUMN IF NOT EXISTS body TEXT;
ALTER TABLE lobby_articles ADD COLUMN IF NOT EXISTS published BOOLEAN DEFAULT true;
ALTER TABLE lobby_articles ADD COLUMN IF NOT EXISTS author_name TEXT DEFAULT 'Peter Currey';
ALTER TABLE lobby_articles ALTER COLUMN excerpt DROP NOT NULL;

-- Ensure RLS allows public select on published articles
DROP POLICY IF EXISTS "Public read published lobby articles" ON lobby_articles;
CREATE POLICY "Public read published lobby articles" ON lobby_articles
  FOR SELECT USING (
    (published = true OR status = 'PUBLISHED')
    AND (published_at IS NULL OR published_at <= now())
  );
