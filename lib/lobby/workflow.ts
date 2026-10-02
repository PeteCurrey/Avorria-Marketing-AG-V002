/**
 * lib/lobby/workflow.ts
 * ─────────────────────────────────────────────────────────────────────────────
 * Publishing workflow state machine for The Lobby.
 * Enforces: Draft → Review → Approved → Published → Archived
 * Rule: NEWS_UPDATE cannot be Approved without ≥1 verified source link.
 * Publishing is an explicit admin action: sets published_at, writes audit
 * event, and revalidates cache paths.
 * ─────────────────────────────────────────────────────────────────────────────
 */
'use server'

import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import { requireAdmin, requireTeam } from '@/lib/auth'
import { createAdminClient } from '@/lib/supabase/server-admin'
import { writeAuditEvent } from '@/lib/db/audit'
import type { LobbyArticleStatus, LobbyBlock } from '@/types/lobby'

// ─── Workflow Transitions ─────────────────────────────────────────────────────

const ALLOWED_TRANSITIONS: Record<LobbyArticleStatus, LobbyArticleStatus[]> = {
  DRAFT:    ['REVIEW'],
  REVIEW:   ['APPROVED', 'DRAFT'],
  APPROVED: ['PUBLISHED', 'REVIEW'],
  PUBLISHED:['ARCHIVED'],
  ARCHIVED: ['DRAFT'],
}

export async function transitionArticleStatusAction(
  _prev: { error?: string } | null,
  formData: FormData
): Promise<{ error?: string }> {
  let user = await requireTeam()
  const admin = createAdminClient()

  const articleId = formData.get('articleId') as string
  const targetStatus = formData.get('targetStatus') as LobbyArticleStatus

  if (!articleId || !targetStatus) return { error: 'Missing article ID or target status.' }

  // Fetch current article
  const { data: article, error: fetchErr } = await admin
    .from('lobby_articles')
    .select('id, status, content_type, source_references, title')
    .eq('id', articleId)
    .single()

  if (fetchErr || !article) return { error: 'Article not found.' }

  const currentStatus = article.status as LobbyArticleStatus
  const allowed = ALLOWED_TRANSITIONS[currentStatus] || []
  if (!allowed.includes(targetStatus)) {
    return { error: `Cannot transition from ${currentStatus} to ${targetStatus}.` }
  }

  // Rule: NEWS_UPDATE cannot be APPROVED without ≥1 source
  if (targetStatus === 'APPROVED' && article.content_type === 'NEWS_UPDATE') {
    const sources = Array.isArray(article.source_references) ? article.source_references : []
    if (sources.length === 0) {
      return { error: 'News updates must have at least one verified source link before approval.' }
    }
  }

  // Publishing requires ADMIN role
  if (targetStatus === 'PUBLISHED') {
    user = await requireAdmin()
  }

  const updatePayload: Record<string, unknown> = {
    status: targetStatus,
    updated_at: new Date().toISOString(),
  }
  if (targetStatus === 'PUBLISHED') {
    updatePayload.published_at = new Date().toISOString()
  }

  const { error: updateErr } = await admin
    .from('lobby_articles')
    .update(updatePayload)
    .eq('id', articleId)

  if (updateErr) return { error: `Failed to update article: ${updateErr.message}` }

  // Audit event
  await writeAuditEvent({
    actorId: user.id,
    action: `lobby_article.${targetStatus.toLowerCase()}`,
    resourceType: 'lobby_article',
    resourceId: articleId,
    metadata: { actorEmail: user.email, from: currentStatus, to: targetStatus, title: article.title },
  })

  // Cache revalidation on publish or archive
  if (targetStatus === 'PUBLISHED' || targetStatus === 'ARCHIVED') {
    revalidatePath('/lobby')
    revalidatePath('/lobby/[slug]', 'page')
    revalidatePath('/lobby/category/[slug]', 'page')
    revalidatePath('/sitemap.xml')
  }

  return {}
}

// ─── Save Article Draft ───────────────────────────────────────────────────────

const saveArticleSchema = z.object({
  id: z.string().uuid().optional(),
  title: z.string().min(2).max(300),
  slug: z.string().min(2).max(120).regex(/^[a-z0-9-]+$/),
  excerpt: z.string().min(10).max(500),
  contentType: z.enum(['ARTICLE', 'GUIDE', 'NEWS_UPDATE', 'RESOURCE', 'ANNOUNCEMENT']),
  categoryId: z.string().uuid().optional(),
  authorId: z.string().uuid().optional(),
  schemaType: z.enum(['Article', 'BlogPosting', 'TechArticle']).default('Article'),
  readingTimeMinutes: z.coerce.number().min(1).max(60).default(5),
  featured: z.coerce.boolean().default(false),
  editorialNotes: z.string().max(2000).optional(),
  seoTitle: z.string().max(160).optional(),
  seoDescription: z.string().max(300).optional(),
  noIndex: z.coerce.boolean().default(false),
  ctaType: z.string().default('start-a-project'),
  ctaLabel: z.string().max(80).optional(),
  ctaUrl: z.string().max(500).optional(),
})

export async function saveArticleAction(
  _prev: { error?: string; articleId?: string } | null,
  formData: FormData
): Promise<{ error?: string; articleId?: string }> {
  const user = await requireTeam()
  const admin = createAdminClient()

  // Parse blocks JSON from hidden field
  let bodyBlocks: LobbyBlock[] = []
  try {
    const blocksRaw = formData.get('bodyBlocks') as string
    if (blocksRaw) bodyBlocks = JSON.parse(blocksRaw)
  } catch { bodyBlocks = [] }

  // Parse source references
  let sourceReferences: unknown[] = []
  try {
    const srcRaw = formData.get('sourceReferences') as string
    if (srcRaw) sourceReferences = JSON.parse(srcRaw)
  } catch { sourceReferences = [] }

  const parsed = saveArticleSchema.safeParse({
    id: formData.get('id') || undefined,
    title: formData.get('title'),
    slug: formData.get('slug'),
    excerpt: formData.get('excerpt'),
    contentType: formData.get('contentType'),
    categoryId: formData.get('categoryId') || undefined,
    authorId: formData.get('authorId') || undefined,
    schemaType: formData.get('schemaType') || 'Article',
    readingTimeMinutes: formData.get('readingTimeMinutes') || 5,
    featured: formData.get('featured') === 'true',
    editorialNotes: formData.get('editorialNotes') || undefined,
    seoTitle: formData.get('seoTitle') || undefined,
    seoDescription: formData.get('seoDescription') || undefined,
    noIndex: formData.get('noIndex') === 'true',
    ctaType: formData.get('ctaType') || 'start-a-project',
    ctaLabel: formData.get('ctaLabel') || undefined,
    ctaUrl: formData.get('ctaUrl') || undefined,
  })

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? 'Invalid article data.' }
  }

  const payload = {
    title: parsed.data.title,
    slug: parsed.data.slug,
    excerpt: parsed.data.excerpt,
    content_type: parsed.data.contentType,
    category_id: parsed.data.categoryId ?? null,
    author_id: parsed.data.authorId ?? null,
    schema_type: parsed.data.schemaType,
    reading_time_minutes: parsed.data.readingTimeMinutes,
    featured: parsed.data.featured,
    editorial_notes: parsed.data.editorialNotes ?? null,
    body_blocks: bodyBlocks,
    source_references: sourceReferences,
    seo_title: parsed.data.seoTitle ?? null,
    seo_description: parsed.data.seoDescription ?? null,
    no_index: parsed.data.noIndex,
    cta_type: parsed.data.ctaType,
    cta_label: parsed.data.ctaLabel ?? null,
    cta_url: parsed.data.ctaUrl ?? null,
    updated_at: new Date().toISOString(),
  }

  let articleId = parsed.data.id

  try {
    if (articleId) {
      const { error } = await admin
        .from('lobby_articles')
        .update(payload)
        .eq('id', articleId)
      if (error) return { error: `Save failed: ${error.message}` }

      // Record revision
      const { data: revCount } = await admin
        .from('lobby_article_revisions')
        .select('version')
        .eq('article_id', articleId)
        .order('version', { ascending: false })
        .limit(1)
        .single()

      const nextVersion = ((revCount as any)?.version ?? 0) + 1
      await admin.from('lobby_article_revisions').insert({
        article_id: articleId,
        version: nextVersion,
        title: parsed.data.title,
        excerpt: parsed.data.excerpt,
        body_blocks: bodyBlocks,
        author_id: parsed.data.authorId ?? null,
        notes: `Saved by ${user.email} at ${new Date().toISOString()}`,
      })
    } else {
      // Create new draft
      const { data, error } = await admin
        .from('lobby_articles')
        .insert({ ...payload, status: 'DRAFT' })
        .select('id')
        .single()
      if (error || !data) return { error: `Create failed: ${error?.message}` }
      articleId = data.id

      // First revision
      await admin.from('lobby_article_revisions').insert({
        article_id: articleId,
        version: 1,
        title: parsed.data.title,
        excerpt: parsed.data.excerpt,
        body_blocks: bodyBlocks,
        author_id: parsed.data.authorId ?? null,
        notes: `Created by ${user.email}`,
      })
    }

    await writeAuditEvent({
      actorId: user.id,
      action: 'lobby_article.save',
      resourceType: 'lobby_article',
      resourceId: articleId!,
      metadata: { actorEmail: user.email },
    })

    return { articleId }
  } catch (err: any) {
    return { error: err.message ?? 'Unexpected error saving article.' }
  }
}

// ─── Get Revisions ────────────────────────────────────────────────────────────

export async function getArticleRevisions(articleId: string) {
  await requireTeam()
  const admin = createAdminClient()
  const { data } = await admin
    .from('lobby_article_revisions')
    .select('id, version, title, excerpt, created_at, notes, author_id')
    .eq('article_id', articleId)
    .order('version', { ascending: false })
  return data ?? []
}
