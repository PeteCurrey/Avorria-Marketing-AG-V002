-- =============================================================================
-- Migration: 005_lobby_schema.sql
-- Description: The Lobby — Editorial Intelligence & Resource Layer Schema
-- =============================================================================

-- Enums
DO $$ BEGIN
  CREATE TYPE lobby_content_type AS ENUM (
    'ARTICLE',
    'GUIDE',
    'NEWS_UPDATE',
    'RESOURCE',
    'ANNOUNCEMENT'
  );
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE lobby_article_status AS ENUM (
    'DRAFT',
    'REVIEW',
    'APPROVED',
    'PUBLISHED',
    'ARCHIVED'
  );
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE lobby_provenance_state AS ENUM (
    'VERIFIED',
    'SOURCE_LINKED',
    'EDITORIAL_ANALYSIS',
    'OPINION',
    'DRAFT'
  );
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- Categories Table (Launch with 5 canonical categories)
CREATE TABLE IF NOT EXISTS lobby_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  display_order INT NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  seo_title TEXT,
  seo_description TEXT,
  og_image TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Tags Table
CREATE TABLE IF NOT EXISTS lobby_tags (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Authors Table (Real team members only)
CREATE TABLE IF NOT EXISTS lobby_authors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  bio TEXT,
  profile_image TEXT,
  slug TEXT UNIQUE NOT NULL,
  social_links JSONB DEFAULT '{}'::jsonb,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Articles Table
CREATE TABLE IF NOT EXISTS lobby_articles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  issue_number TEXT,
  excerpt TEXT NOT NULL,
  body_blocks JSONB NOT NULL DEFAULT '[]'::jsonb,
  content_type lobby_content_type NOT NULL DEFAULT 'ARTICLE',
  category_id UUID REFERENCES lobby_categories(id) ON DELETE SET NULL,
  author_id UUID REFERENCES lobby_authors(id) ON DELETE SET NULL,
  hero_media JSONB,
  thumbnail_media JSONB,
  published_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  status lobby_article_status NOT NULL DEFAULT 'DRAFT',
  featured BOOLEAN NOT NULL DEFAULT false,
  editorial_status lobby_provenance_state NOT NULL DEFAULT 'EDITORIAL_ANALYSIS',
  provenance_rationale TEXT,
  source_references JSONB NOT NULL DEFAULT '[]'::jsonb,
  reading_time_minutes INT NOT NULL DEFAULT 5,
  schema_type TEXT NOT NULL DEFAULT 'Article',
  editorial_notes TEXT,
  related_items JSONB NOT NULL DEFAULT '[]'::jsonb,
  cta_type TEXT DEFAULT 'start-a-project',
  cta_label TEXT,
  cta_url TEXT,
  seo_title TEXT,
  seo_description TEXT,
  canonical_url TEXT,
  og_title TEXT,
  og_description TEXT,
  og_image TEXT,
  no_index BOOLEAN NOT NULL DEFAULT false,
  no_follow BOOLEAN NOT NULL DEFAULT false,
  internal_links JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Article Revisions Table (for auditing and history)
CREATE TABLE IF NOT EXISTS lobby_article_revisions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  article_id UUID NOT NULL REFERENCES lobby_articles(id) ON DELETE CASCADE,
  version INT NOT NULL,
  title TEXT NOT NULL,
  excerpt TEXT,
  body_blocks JSONB NOT NULL DEFAULT '[]'::jsonb,
  author_id UUID REFERENCES lobby_authors(id) ON DELETE SET NULL,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Article Tags Junction Table
CREATE TABLE IF NOT EXISTS lobby_article_tags (
  article_id UUID NOT NULL REFERENCES lobby_articles(id) ON DELETE CASCADE,
  tag_id UUID NOT NULL REFERENCES lobby_tags(id) ON DELETE CASCADE,
  PRIMARY KEY (article_id, tag_id)
);

-- Analytics Table
CREATE TABLE IF NOT EXISTS lobby_analytics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  article_id UUID NOT NULL REFERENCES lobby_articles(id) ON DELETE CASCADE,
  views_count INT NOT NULL DEFAULT 0,
  reads_count INT NOT NULL DEFAULT 0,
  avg_time_seconds INT NOT NULL DEFAULT 0,
  cta_clicks_count INT NOT NULL DEFAULT 0,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_lobby_articles_slug ON lobby_articles(slug);
CREATE INDEX IF NOT EXISTS idx_lobby_articles_status_published_at ON lobby_articles(status, published_at);
CREATE INDEX IF NOT EXISTS idx_lobby_articles_category ON lobby_articles(category_id);
CREATE INDEX IF NOT EXISTS idx_lobby_articles_featured ON lobby_articles(featured) WHERE featured = true;
CREATE INDEX IF NOT EXISTS idx_lobby_categories_slug ON lobby_categories(slug);
CREATE INDEX IF NOT EXISTS idx_lobby_tags_slug ON lobby_tags(slug);
CREATE INDEX IF NOT EXISTS idx_lobby_authors_slug ON lobby_authors(slug);
CREATE INDEX IF NOT EXISTS idx_lobby_revisions_article ON lobby_article_revisions(article_id, version);

-- Enable RLS
ALTER TABLE lobby_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE lobby_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE lobby_authors ENABLE ROW LEVEL SECURITY;
ALTER TABLE lobby_articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE lobby_article_revisions ENABLE ROW LEVEL SECURITY;
ALTER TABLE lobby_article_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE lobby_analytics ENABLE ROW LEVEL SECURITY;

-- ─── RLS Policies ────────────────────────────────────────────────────────────

-- Categories: Public read active; Team/Admin full control
DROP POLICY IF EXISTS "Public read active categories" ON lobby_categories;
CREATE POLICY "Public read active categories" ON lobby_categories
  FOR SELECT USING (is_active = true);

DROP POLICY IF EXISTS "Team full access categories" ON lobby_categories;
CREATE POLICY "Team full access categories" ON lobby_categories
  FOR ALL TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role IN ('TEAM', 'ADMIN')
    )
  );

-- Tags: Public read active; Team/Admin full control
DROP POLICY IF EXISTS "Public read active tags" ON lobby_tags;
CREATE POLICY "Public read active tags" ON lobby_tags
  FOR SELECT USING (is_active = true);

DROP POLICY IF EXISTS "Team full access tags" ON lobby_tags;
CREATE POLICY "Team full access tags" ON lobby_tags
  FOR ALL TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role IN ('TEAM', 'ADMIN')
    )
  );

-- Authors: Public read active; Team/Admin full control
DROP POLICY IF EXISTS "Public read active authors" ON lobby_authors;
CREATE POLICY "Public read active authors" ON lobby_authors
  FOR SELECT USING (is_active = true);

DROP POLICY IF EXISTS "Team full access authors" ON lobby_authors;
CREATE POLICY "Team full access authors" ON lobby_authors
  FOR ALL TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role IN ('TEAM', 'ADMIN')
    )
  );

-- Articles: Public read strictly published; Team/Admin full control
DROP POLICY IF EXISTS "Public read published articles only" ON lobby_articles;
CREATE POLICY "Public read published articles only" ON lobby_articles
  FOR SELECT USING (
    status = 'PUBLISHED' AND published_at <= now()
  );

DROP POLICY IF EXISTS "Team full access articles" ON lobby_articles;
CREATE POLICY "Team full access articles" ON lobby_articles
  FOR ALL TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role IN ('TEAM', 'ADMIN')
    )
  );

-- Article Revisions: Team/Admin only
DROP POLICY IF EXISTS "Team full access revisions" ON lobby_article_revisions;
CREATE POLICY "Team full access revisions" ON lobby_article_revisions
  FOR ALL TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role IN ('TEAM', 'ADMIN')
    )
  );

-- Article Tags: Public read if article published; Team/Admin full control
DROP POLICY IF EXISTS "Public read article tags" ON lobby_article_tags;
CREATE POLICY "Public read article tags" ON lobby_article_tags
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM lobby_articles
      WHERE lobby_articles.id = lobby_article_tags.article_id
      AND lobby_articles.status = 'PUBLISHED'
      AND lobby_articles.published_at <= now()
    )
  );

DROP POLICY IF EXISTS "Team full access article tags" ON lobby_article_tags;
CREATE POLICY "Team full access article tags" ON lobby_article_tags
  FOR ALL TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role IN ('TEAM', 'ADMIN')
    )
  );

-- Analytics: Team/Admin only
DROP POLICY IF EXISTS "Team read analytics" ON lobby_analytics;
CREATE POLICY "Team read analytics" ON lobby_analytics
  FOR SELECT TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role IN ('TEAM', 'ADMIN')
    )
  );

-- ─── Seed Data: Five Launch Categories ────────────────────────────────────────

INSERT INTO lobby_categories (name, slug, description, display_order, is_active, seo_title, seo_description)
VALUES
  (
    'Search',
    'search',
    'Google search dynamics, core algorithm shifts, technical search architecture, and indexation mechanics.',
    1,
    true,
    'Search Intelligence & Algorithmic Shifts — The Lobby // Avorria',
    'Empirical teardowns of Google updates, crawl behaviour, and sovereign search engineering.'
  ),
  (
    'Platforms',
    'platforms',
    'Google Ads, Meta, social platform auctions, machine-learning delivery, and attribution telemetry.',
    2,
    true,
    'Platforms (Google Ads, Meta, Social) — The Lobby // Avorria',
    'Technical teardowns of algorithmic auctions, ad infrastructure, and machine-learning attribution.'
  ),
  (
    'Websites',
    'websites',
    'Website strategy, interaction latency (INP), conversion telemetry, and modern frontend systems.',
    3,
    true,
    'Websites & Architecture — The Lobby // Avorria',
    'Technical analysis covering interaction latency, Core Web Vitals, and sovereign web engineering.'
  ),
  (
    'Marketing',
    'marketing',
    'Unit economics, funnel mechanics, commercial growth frameworks, and digital positioning for growing businesses.',
    4,
    true,
    'Marketing Intelligence — The Lobby // Avorria',
    'Empirical marketing intelligence and growth mechanics for modern business leaders.'
  ),
  (
    'Avorria',
    'avorria',
    'Internal engineering logs, open benchmarks, studio dispatches, and releases from the Avorria workshop.',
    5,
    true,
    'Avorria Dispatches & Benchmarks — The Lobby // Avorria',
    'Engineering logs, open benchmarks, and announcements from the Avorria studio desk.'
  )
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  display_order = EXCLUDED.display_order,
  is_active = EXCLUDED.is_active;

-- ─── Seed Data: Verified Real Team Authors ────────────────────────────────────

INSERT INTO lobby_authors (name, role, bio, slug, is_active, social_links)
VALUES
  (
    'Peter Currey',
    'Principal, Technical Strategy & Systems Architecture',
    'Directs digital architecture and software engineering at Avorria. Specialises in high-concurrency web systems, technical SEO engineering, and forensic UX teardowns.',
    'peter-currey',
    true,
    '{"linkedin": "https://linkedin.com/company/avorria"}'::jsonb
  ),
  (
    'Avorria Editorial Desk',
    'Digital Intelligence & Research Bureau',
    'The analytical research unit of Avorria, monitoring algorithmic shifts across Google, Meta, technical infrastructure, and software economics.',
    'editorial-desk',
    true,
    '{"github": "https://github.com/avorria"}'::jsonb
  )
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  role = EXCLUDED.role,
  bio = EXCLUDED.bio,
  is_active = EXCLUDED.is_active;
