/**
 * lib/actions/lobby.ts
 * ─────────────────────────────────────────────────────────────────────────────
 * Server Actions for The Lobby editorial system.
 * Enforces role-based permissions (requireTeam for drafts/reviews, requireAdmin
 * for publishing/taxonomy), writes append-only audit events, and invalidates cache.
 * ─────────────────────────────────────────────────────────────────────────────
 */

'use server'

import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import { requireTeam, requireAdmin } from '@/lib/auth'
import { createAdminClient } from '@/lib/supabase/server-admin'
import { writeAuditEvent } from '@/lib/db/audit'
import type { LobbyArticleStatus, LobbyContentType, LobbyProvenanceState } from '@/types/lobby'

// ─── Article Schemas ─────────────────────────────────────────────────────────

const createArticleSchema = z.object({
  title: z.string().min(3).max(250),
  slug: z.string().min(3).max(120).regex(/^[a-z0-9-]+$/, 'Slug: lowercase letters, numbers, hyphens only'),
  excerpt: z.string().min(10).max(600),
  contentType: z.enum(['ARTICLE', 'GUIDE', 'NEWS_UPDATE', 'RESOURCE', 'ANNOUNCEMENT']).default('ARTICLE'),
  categoryId: z.string().uuid().optional().or(z.literal('')),
  authorId: z.string().uuid().optional().or(z.literal('')),
})

const updateArticleSchema = z.object({
  id: z.string().uuid(),
  title: z.string().min(3).max(250),
  slug: z.string().min(3).max(120).regex(/^[a-z0-9-]+$/),
  issueNumber: z.string().max(50).optional(),
  excerpt: z.string().min(10).max(600),
  contentType: z.enum(['ARTICLE', 'GUIDE', 'NEWS_UPDATE', 'RESOURCE', 'ANNOUNCEMENT']),
  categoryId: z.string().uuid().optional().or(z.literal('')),
  authorId: z.string().uuid().optional().or(z.literal('')),
  editorialStatus: z.enum(['VERIFIED', 'SOURCE_LINKED', 'EDITORIAL_ANALYSIS', 'OPINION', 'DRAFT']),
  provenanceRationale: z.string().max(1000).optional(),
  readingTimeMinutes: z.coerce.number().int().min(1).max(120).default(5),
  featured: z.coerce.boolean().default(false),
  bodyBlocksJson: z.string().optional(),
  sourceReferencesJson: z.string().optional(),
  heroImageUrl: z.string().url().optional().or(z.literal('')),
  heroImageAlt: z.string().max(200).optional(),
  seoTitle: z.string().max(120).optional(),
  seoDescription: z.string().max(250).optional(),
  canonicalUrl: z.string().url().optional().or(z.literal('')),
  ctaType: z.string().optional(),
  ctaLabel: z.string().max(80).optional(),
  ctaUrl: z.string().max(500).optional(),
  noIndex: z.coerce.boolean().default(false),
  noFollow: z.coerce.boolean().default(false),
  editorialNotes: z.string().max(2000).optional(),
})

// ─── Article Actions ─────────────────────────────────────────────────────────

export async function createArticleAction(
  _prev: { error?: string; articleId?: string } | null,
  formData: FormData
): Promise<{ error?: string; articleId?: string }> {
  const user = await requireTeam()

  const parsed = createArticleSchema.safeParse({
    title: formData.get('title'),
    slug: formData.get('slug'),
    excerpt: formData.get('excerpt'),
    contentType: formData.get('contentType') || 'ARTICLE',
    categoryId: formData.get('categoryId') || undefined,
    authorId: formData.get('authorId') || undefined,
  })

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? 'Invalid input.' }
  }

  const admin = createAdminClient()
  try {
    const { data, error } = await admin
      .from('lobby_articles')
      .insert({
        title: parsed.data.title,
        slug: parsed.data.slug,
        excerpt: parsed.data.excerpt,
        content_type: parsed.data.contentType,
        category_id: parsed.data.categoryId || null,
        author_id: parsed.data.authorId || null,
        status: 'DRAFT',
        editorial_status: 'DRAFT',
        body_blocks: [],
        source_references: [],
        internal_links: [],
      })
      .select('id')
      .single()

    if (error || !data) {
      return { error: error?.message || 'Failed to create article.' }
    }

    // First revision
    await admin.from('lobby_article_revisions').insert({
      article_id: data.id,
      version: 1,
      title: parsed.data.title,
      excerpt: parsed.data.excerpt,
      body_blocks: [],
      author_id: parsed.data.authorId || null,
      notes: `Created by ${user.email}`,
    })

    await writeAuditEvent({
      actorId: user.id,
      action: 'lobby.article_create',
      resourceType: 'lobby_article',
      resourceId: data.id,
      metadata: { title: parsed.data.title, slug: parsed.data.slug },
    })

    revalidatePath('/admin/lobby')
    revalidatePath('/admin/lobby/articles')
    redirect(`/admin/lobby/articles/${data.id}`)
  } catch (err: any) {
    if (err?.message?.includes('NEXT_REDIRECT')) throw err
    return { error: err?.message || 'Failed to create article.' }
  }
}

export async function updateArticleAction(
  _prev: { error?: string; success?: boolean } | null,
  formData: FormData
): Promise<{ error?: string; success?: boolean }> {
  const user = await requireTeam()

  const parsed = updateArticleSchema.safeParse({
    id: formData.get('id'),
    title: formData.get('title'),
    slug: formData.get('slug'),
    issueNumber: formData.get('issueNumber') || undefined,
    excerpt: formData.get('excerpt'),
    contentType: formData.get('contentType'),
    categoryId: formData.get('categoryId') || undefined,
    authorId: formData.get('authorId') || undefined,
    editorialStatus: formData.get('editorialStatus') || 'EDITORIAL_ANALYSIS',
    provenanceRationale: formData.get('provenanceRationale') || undefined,
    readingTimeMinutes: formData.get('readingTimeMinutes'),
    featured: formData.get('featured') === 'true' || formData.get('featured') === 'on',
    bodyBlocksJson: formData.get('bodyBlocksJson') || undefined,
    sourceReferencesJson: formData.get('sourceReferencesJson') || undefined,
    heroImageUrl: formData.get('heroImageUrl') || undefined,
    heroImageAlt: formData.get('heroImageAlt') || undefined,
    seoTitle: formData.get('seoTitle') || undefined,
    seoDescription: formData.get('seoDescription') || undefined,
    canonicalUrl: formData.get('canonicalUrl') || undefined,
    ctaType: formData.get('ctaType') || 'start-a-project',
    ctaLabel: formData.get('ctaLabel') || undefined,
    ctaUrl: formData.get('ctaUrl') || undefined,
    noIndex: formData.get('noIndex') === 'true' || formData.get('noIndex') === 'on',
    noFollow: formData.get('noFollow') === 'true' || formData.get('noFollow') === 'on',
    editorialNotes: formData.get('editorialNotes') || undefined,
  })

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? 'Invalid article payload.' }
  }

  // Image upload with alt-text required rule
  if (parsed.data.heroImageUrl && !parsed.data.heroImageAlt) {
    return { error: 'Hero image requires descriptive alt-text.' }
  }

  let bodyBlocks: any[] = []
  if (parsed.data.bodyBlocksJson) {
    try {
      bodyBlocks = JSON.parse(parsed.data.bodyBlocksJson)
    } catch {
      return { error: 'Invalid JSON format in body blocks.' }
    }
  }

  let sourceReferences: any[] = []
  if (parsed.data.sourceReferencesJson) {
    try {
      sourceReferences = JSON.parse(parsed.data.sourceReferencesJson)
    } catch {
      return { error: 'Invalid JSON format in source references.' }
    }
  }

  const admin = createAdminClient()
  try {
    const heroMedia = parsed.data.heroImageUrl
      ? { url: parsed.data.heroImageUrl, altText: parsed.data.heroImageAlt || '' }
      : null

    const { error } = await admin
      .from('lobby_articles')
      .update({
        title: parsed.data.title,
        slug: parsed.data.slug,
        issue_number: parsed.data.issueNumber || null,
        excerpt: parsed.data.excerpt,
        content_type: parsed.data.contentType,
        category_id: parsed.data.categoryId || null,
        author_id: parsed.data.authorId || null,
        editorial_status: parsed.data.editorialStatus,
        provenance_rationale: parsed.data.provenanceRationale || null,
        reading_time_minutes: parsed.data.readingTimeMinutes,
        featured: parsed.data.featured,
        body_blocks: bodyBlocks,
        source_references: sourceReferences,
        hero_media: heroMedia,
        seo_title: parsed.data.seoTitle || null,
        seo_description: parsed.data.seoDescription || null,
        canonical_url: parsed.data.canonicalUrl || null,
        cta_type: parsed.data.ctaType || null,
        cta_label: parsed.data.ctaLabel || null,
        cta_url: parsed.data.ctaUrl || null,
        no_index: parsed.data.noIndex,
        no_follow: parsed.data.noFollow,
        editorial_notes: parsed.data.editorialNotes || null,
        updated_at: new Date().toISOString(),
      })
      .eq('id', parsed.data.id)

    if (error) return { error: error.message }

    // Record revision
    const { data: revCount } = await admin
      .from('lobby_article_revisions')
      .select('version')
      .eq('article_id', parsed.data.id)
      .order('version', { ascending: false })
      .limit(1)
      .single()

    const nextVer = (revCount?.version ?? 0) + 1
    await admin.from('lobby_article_revisions').insert({
      article_id: parsed.data.id,
      version: nextVer,
      title: parsed.data.title,
      excerpt: parsed.data.excerpt,
      body_blocks: bodyBlocks,
      author_id: parsed.data.authorId || null,
      notes: `Updated by ${user.email}`,
    })

    await writeAuditEvent({
      actorId: user.id,
      action: 'lobby.article_update',
      resourceType: 'lobby_article',
      resourceId: parsed.data.id,
      metadata: { slug: parsed.data.slug },
    })

    revalidatePath(`/admin/lobby/articles/${parsed.data.id}`)
    revalidatePath(`/lobby/${parsed.data.slug}`)
    revalidatePath('/lobby')
    return { success: true }
  } catch (err: any) {
    return { error: err?.message || 'Failed to update article.' }
  }
}

// ─── Status Workflow Action ───────────────────────────────────────────────────

const ALLOWED_TRANSITIONS: Record<LobbyArticleStatus, LobbyArticleStatus[]> = {
  DRAFT: ['REVIEW'],
  REVIEW: ['APPROVED', 'DRAFT'],
  APPROVED: ['PUBLISHED', 'REVIEW'],
  PUBLISHED: ['ARCHIVED'],
  ARCHIVED: ['DRAFT'],
}

export async function setArticleStatusAction(
  articleId: string,
  newStatus: LobbyArticleStatus
): Promise<{ error?: string; success?: boolean }> {
  let user = await requireTeam()

  const admin = createAdminClient()
  const { data: article, error: fetchErr } = await admin
    .from('lobby_articles')
    .select('id, status, content_type, source_references, title, slug')
    .eq('id', articleId)
    .single()

  if (fetchErr || !article) {
    return { error: 'Article not found.' }
  }

  const currentStatus = article.status as LobbyArticleStatus
  const allowed = ALLOWED_TRANSITIONS[currentStatus] || []
  if (!allowed.includes(newStatus)) {
    return { error: `Invalid transition from ${currentStatus} to ${newStatus}.` }
  }

  // Enforce rule: NEWS_UPDATE cannot be Approved without at least one source link
  if (newStatus === 'APPROVED' && article.content_type === 'NEWS_UPDATE') {
    const sources = Array.isArray(article.source_references) ? article.source_references : []
    if (sources.length === 0) {
      return { error: 'NEWS_UPDATE requires at least one source link before it can be approved.' }
    }
  }

  // Transitioning to PUBLISHED requires full ADMIN privileges
  if (newStatus === 'PUBLISHED') {
    user = await requireAdmin()
  }

  try {
    const updatePayload: Record<string, any> = {
      status: newStatus,
      updated_at: new Date().toISOString(),
    }

    if (newStatus === 'PUBLISHED') {
      updatePayload.published_at = new Date().toISOString()
    }

    const { data: updated, error } = await admin
      .from('lobby_articles')
      .update(updatePayload)
      .eq('id', articleId)
      .select('slug, status')
      .single()

    if (error) return { error: error.message }

    await writeAuditEvent({
      actorId: user.id,
      action: 'lobby.article_status_change',
      resourceType: 'lobby_article',
      resourceId: articleId,
      metadata: { old_status: currentStatus, new_status: newStatus, title: article.title },
    })

    revalidatePath('/admin/lobby')
    revalidatePath('/admin/lobby/articles')
    revalidatePath(`/admin/lobby/articles/${articleId}`)
    revalidatePath('/lobby')
    revalidatePath('/sitemap.xml')
    if (updated?.slug) {
      revalidatePath(`/lobby/${updated.slug}`)
    }
    return { success: true }
  } catch (err: any) {
    return { error: err?.message || 'Failed to update publication status.' }
  }
}

// ─── Taxonomy Actions (Admin Only) ──────────────────────────────────────────

const categorySchema = z.object({
  id: z.string().uuid().optional(),
  name: z.string().min(2).max(100),
  slug: z.string().min(2).max(80).regex(/^[a-z0-9-]+$/),
  description: z.string().max(400).optional(),
  displayOrder: z.coerce.number().int().default(0),
  isActive: z.coerce.boolean().default(true),
  seoTitle: z.string().max(120).optional(),
  seoDescription: z.string().max(250).optional(),
})

export async function saveCategoryAction(
  _prev: { error?: string; success?: boolean } | null,
  formData: FormData
): Promise<{ error?: string; success?: boolean }> {
  const user = await requireAdmin()

  const parsed = categorySchema.safeParse({
    id: formData.get('id') || undefined,
    name: formData.get('name'),
    slug: formData.get('slug'),
    description: formData.get('description') || undefined,
    displayOrder: formData.get('displayOrder'),
    isActive: formData.get('isActive') === 'true' || formData.get('isActive') === 'on',
    seoTitle: formData.get('seoTitle') || undefined,
    seoDescription: formData.get('seoDescription') || undefined,
  })

  if (!parsed.success) return { error: parsed.error.issues[0]?.message ?? 'Invalid input.' }

  const admin = createAdminClient()
  try {
    if (parsed.data.id) {
      const { error } = await admin
        .from('lobby_categories')
        .update({
          name: parsed.data.name,
          slug: parsed.data.slug,
          description: parsed.data.description || null,
          display_order: parsed.data.displayOrder,
          is_active: parsed.data.isActive,
          seo_title: parsed.data.seoTitle || null,
          seo_description: parsed.data.seoDescription || null,
          updated_at: new Date().toISOString(),
        })
        .eq('id', parsed.data.id)

      if (error) return { error: error.message }
    } else {
      const { error } = await admin.from('lobby_categories').insert({
        name: parsed.data.name,
        slug: parsed.data.slug,
        description: parsed.data.description || null,
        display_order: parsed.data.displayOrder,
        is_active: parsed.data.isActive,
        seo_title: parsed.data.seoTitle || null,
        seo_description: parsed.data.seoDescription || null,
      })

      if (error) return { error: error.message }
    }

    await writeAuditEvent({
      actorId: user.id,
      action: parsed.data.id ? 'lobby.category_update' : 'lobby.category_create',
      resourceType: 'lobby_category',
      resourceId: parsed.data.slug,
      metadata: { name: parsed.data.name },
    })

    revalidatePath('/admin/lobby/categories')
    revalidatePath('/lobby')
    return { success: true }
  } catch (err: any) {
    return { error: err?.message || 'Failed to save category.' }
  }
}

export async function toggleCategoryAction(categoryId: string, currentActive: boolean): Promise<void> {
  const user = await requireAdmin()
  const admin = createAdminClient()
  await admin.from('lobby_categories').update({ is_active: !currentActive }).eq('id', categoryId)
  await writeAuditEvent({
    actorId: user.id,
    action: 'lobby.category_toggle',
    resourceType: 'lobby_category',
    resourceId: categoryId,
    metadata: { is_active: !currentActive },
  })
  revalidatePath('/admin/lobby/categories')
  revalidatePath('/lobby')
}

// ─── Tag Actions ─────────────────────────────────────────────────────────────

export async function saveTagAction(
  _prev: { error?: string; success?: boolean } | null,
  formData: FormData
): Promise<{ error?: string; success?: boolean }> {
  const user = await requireAdmin()
  const name = formData.get('name') as string
  const slug = formData.get('slug') as string
  const description = (formData.get('description') as string) || undefined

  if (!name || !slug) return { error: 'Name and slug are required.' }

  const admin = createAdminClient()
  try {
    await admin.from('lobby_tags').insert({ name, slug, description: description || null })
    await writeAuditEvent({
      actorId: user.id,
      action: 'lobby.tag_create',
      resourceType: 'lobby_tag',
      resourceId: slug,
      metadata: { name },
    })
    revalidatePath('/admin/lobby/tags')
    return { success: true }
  } catch (err: any) {
    return { error: err?.message || 'Failed to create tag.' }
  }
}

// ─── Author Actions (Real team members only) ─────────────────────────────────

export async function saveAuthorAction(
  _prev: { error?: string; success?: boolean } | null,
  formData: FormData
): Promise<{ error?: string; success?: boolean }> {
  const user = await requireAdmin()
  const name = formData.get('name') as string
  const role = formData.get('role') as string
  const bio = (formData.get('bio') as string) || undefined
  const slug = formData.get('slug') as string
  const linkedin = (formData.get('linkedin') as string) || undefined

  if (!name || !role || !slug) return { error: 'Name, role, and slug are required.' }

  const admin = createAdminClient()
  try {
    const socialLinks = linkedin ? { linkedin } : {}
    await admin.from('lobby_authors').insert({ name, role, bio: bio || null, slug, social_links: socialLinks })
    await writeAuditEvent({
      actorId: user.id,
      action: 'lobby.author_create',
      resourceType: 'lobby_author',
      resourceId: slug,
      metadata: { name },
    })
    revalidatePath('/admin/lobby/authors')
    return { success: true }
  } catch (err: any) {
    return { error: err?.message || 'Failed to save author.' }
  }
}
