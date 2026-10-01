/**
 * Platform Types
 * ─────────────────────────────────────────────────────────────────────────────
 * Central type definitions for the Avorria platform.
 * Covers: authentication, organisations, projects, enquiries, messages,
 * documents, deliverables, activity and audit events.
 *
 * These types are intentionally database-agnostic — they describe the domain
 * model without coupling to a specific ORM or persistence layer.
 * CMS or database migration should only require updating the data layer,
 * not these type definitions.
 * ─────────────────────────────────────────────────────────────────────────────
 */

// ─── Roles ───────────────────────────────────────────────────────────────────

export type UserRole = 'CLIENT' | 'TEAM' | 'ADMIN'

// ─── User & Session ───────────────────────────────────────────────────────────

export interface User {
  id: string
  email: string
  name: string
  role: UserRole
  organisationId: string | null
  createdAt: string
  lastSignInAt: string | null
}

export interface Session {
  user: User
  expiresAt: string
}

// ─── Organisation (Multi-Tenant) ─────────────────────────────────────────────

export interface Organisation {
  id: string
  name: string
  slug: string
  primaryEmail: string | null
  website: string | null
  createdAt: string
  status: 'ACTIVE' | 'INACTIVE' | 'ARCHIVED'
}

export interface OrganisationMembership {
  id: string
  organisationId: string
  userId: string
  role: 'OWNER' | 'MEMBER'
  joinedAt: string
}

// ─── Project Status ────────────────────────────────────────────────────────────

export type ProjectStatus =
  | 'ENQUIRY'
  | 'DISCOVERY'
  | 'PLANNING'
  | 'DESIGN'
  | 'DEVELOPMENT'
  | 'REVIEW'
  | 'LAUNCH'
  | 'COMPLETED'
  | 'ON_HOLD'

export const PROJECT_STATUS_LABELS: Record<ProjectStatus, string> = {
  ENQUIRY:     'Enquiry',
  DISCOVERY:   'Discovery',
  PLANNING:    'Planning',
  DESIGN:      'Design',
  DEVELOPMENT: 'Development',
  REVIEW:      'Review',
  LAUNCH:      'Launch',
  COMPLETED:   'Completed',
  ON_HOLD:     'On Hold',
}

// ─── Project ──────────────────────────────────────────────────────────────────

export interface Project {
  id: string
  organisationId: string
  title: string
  slug: string
  description: string | null
  status: ProjectStatus
  serviceIds: string[]
  startDate: string | null
  targetDate: string | null
  completedAt: string | null
  createdAt: string
  updatedAt: string
}

export interface ProjectMember {
  id: string
  projectId: string
  userId: string
  role: 'LEAD' | 'MEMBER' | 'OBSERVER'
  addedAt: string
}

// ─── Enquiry ──────────────────────────────────────────────────────────────────

export type EnquiryStatus =
  | 'NEW'
  | 'REVIEWING'
  | 'CONTACTED'
  | 'QUALIFIED'
  | 'PROPOSAL'
  | 'WON'
  | 'LOST'
  | 'ARCHIVED'

export const ENQUIRY_STATUS_LABELS: Record<EnquiryStatus, string> = {
  NEW:       'New',
  REVIEWING: 'Reviewing',
  CONTACTED: 'Contacted',
  QUALIFIED: 'Qualified',
  PROPOSAL:  'Proposal',
  WON:       'Won',
  LOST:      'Lost',
  ARCHIVED:  'Archived',
}

export interface Enquiry {
  id: string
  // Contact
  name: string
  company: string | null
  email: string
  website: string | null
  // Project
  description: string
  problem: string | null
  services: string[]
  budget: string | null
  timeline: string | null
  additionalInfo: string | null
  // Meta
  status: EnquiryStatus
  assignedTo: string | null
  organisationId: string | null   // set when enquiry is converted to a client
  createdAt: string
  updatedAt: string
}

// ─── Message ──────────────────────────────────────────────────────────────────

export type MessageDirection = 'INBOUND' | 'OUTBOUND'

export interface Message {
  id: string
  organisationId: string
  projectId: string | null
  senderId: string
  direction: MessageDirection
  subject: string | null
  body: string
  readAt: string | null
  createdAt: string
}

// ─── Document ─────────────────────────────────────────────────────────────────

export type DocumentCategory =
  | 'PROPOSAL'
  | 'CONTRACT'
  | 'SPECIFICATION'
  | 'REPORT'
  | 'INVOICE'
  | 'OTHER'

export const DOCUMENT_CATEGORY_LABELS: Record<DocumentCategory, string> = {
  PROPOSAL:      'Proposal',
  CONTRACT:      'Contract',
  SPECIFICATION: 'Specification',
  REPORT:        'Report',
  INVOICE:       'Invoice',
  OTHER:         'Document',
}

export interface Document {
  id: string
  organisationId: string
  projectId: string | null
  title: string
  category: DocumentCategory
  url: string | null
  fileSize: number | null
  mimeType: string | null
  uploadedBy: string
  createdAt: string
}

// ─── Deliverable ──────────────────────────────────────────────────────────────

export type DeliverableType =
  | 'DESIGN_FILE'
  | 'DEVELOPMENT_RELEASE'
  | 'WEBSITE'
  | 'REPORT'
  | 'ASSET'
  | 'DOCUMENTATION'

export const DELIVERABLE_TYPE_LABELS: Record<DeliverableType, string> = {
  DESIGN_FILE:          'Design File',
  DEVELOPMENT_RELEASE:  'Development Release',
  WEBSITE:              'Website',
  REPORT:               'Report',
  ASSET:                'Asset',
  DOCUMENTATION:        'Documentation',
}

export interface Deliverable {
  id: string
  organisationId: string
  projectId: string | null
  title: string
  description: string | null
  type: DeliverableType
  url: string | null
  publishedAt: string | null
  publishedBy: string | null
  createdAt: string
}

// ─── Activity / Audit Events ──────────────────────────────────────────────────

export type ActivityEventType =
  | 'USER_CREATED'
  | 'USER_SIGNED_IN'
  | 'ORGANISATION_CREATED'
  | 'PROJECT_CREATED'
  | 'PROJECT_STATUS_CHANGED'
  | 'ENQUIRY_CREATED'
  | 'ENQUIRY_STATUS_CHANGED'
  | 'MESSAGE_SENT'
  | 'DOCUMENT_UPLOADED'
  | 'DELIVERABLE_PUBLISHED'
  | 'PERMISSION_CHANGED'
  | 'SETTINGS_CHANGED'

export interface ActivityEvent {
  id: string
  actorId: string | null        // null for system events
  eventType: ActivityEventType
  resourceType: string          // e.g. 'Project', 'Enquiry'
  resourceId: string | null
  organisationId: string | null
  metadata: Record<string, unknown>
  createdAt: string
}

// ─── Notification ─────────────────────────────────────────────────────────────

export interface Notification {
  id: string
  userId: string
  title: string
  body: string | null
  href: string | null
  readAt: string | null
  createdAt: string
}
