/**
 * types/supabase.ts
 * ─────────────────────────────────────────────────────────────────────────────
 * Supabase database type definitions.
 * Generated via: pnpm supabase gen types typescript --project-id <id>
 * Until the CLI is configured, this is a typed stub covering the tables
 * defined in Phase 2B migrations.
 * ─────────────────────────────────────────────────────────────────────────────
 */

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type UserRole = 'CLIENT' | 'TEAM' | 'ADMIN'
export type ProjectStatus = 'ENQUIRY' | 'DISCOVERY' | 'PLANNING' | 'DESIGN' | 'DEVELOPMENT' | 'REVIEW' | 'LAUNCH' | 'COMPLETED' | 'ON_HOLD'
export type EnquiryStatus = 'NEW' | 'REVIEWING' | 'CONTACTED' | 'QUALIFIED' | 'PROPOSAL' | 'WON' | 'LOST' | 'ARCHIVED'
export type MessageDirection = 'INBOUND' | 'OUTBOUND'
export type DocumentCategory = 'PROPOSAL' | 'CONTRACT' | 'SPECIFICATION' | 'REPORT' | 'INVOICE' | 'OTHER'
export type DeliverableType = 'DESIGN_FILE' | 'DEVELOPMENT_RELEASE' | 'WEBSITE' | 'REPORT' | 'ASSET' | 'DOCUMENTATION'

export interface Database {
  public: {
    Tables: {
      organisations: {
        Row: {
          id: string
          name: string
          slug: string
          primary_email: string | null
          website: string | null
          status: 'ACTIVE' | 'INACTIVE' | 'ARCHIVED'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          primary_email?: string | null
          website?: string | null
          status?: 'ACTIVE' | 'INACTIVE' | 'ARCHIVED'
          created_at?: string
          updated_at?: string
        }
        Update: Partial<Database['public']['Tables']['organisations']['Insert']>
      }
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string | null
          role: UserRole
          organisation_id: string | null
          avatar_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          email: string
          full_name?: string | null
          role?: UserRole
          organisation_id?: string | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: Partial<Database['public']['Tables']['profiles']['Insert']>
      }
      enquiries: {
        Row: {
          id: string
          name: string
          company: string | null
          email: string
          website: string | null
          what_building: string
          problem_solving: string | null
          services: string[]
          budget: string | null
          timeline: string | null
          additional: string | null
          status: EnquiryStatus
          assigned_to: string | null
          organisation_id: string | null
          ip_hash: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          company?: string | null
          email: string
          website?: string | null
          what_building: string
          problem_solving?: string | null
          services?: string[]
          budget?: string | null
          timeline?: string | null
          additional?: string | null
          status?: EnquiryStatus
          assigned_to?: string | null
          organisation_id?: string | null
          ip_hash?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: Partial<Database['public']['Tables']['enquiries']['Insert']>
      }
      projects: {
        Row: {
          id: string
          organisation_id: string
          title: string
          slug: string
          description: string | null
          status: ProjectStatus
          service_ids: string[]
          start_date: string | null
          target_date: string | null
          completed_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          organisation_id: string
          title: string
          slug: string
          description?: string | null
          status?: ProjectStatus
          service_ids?: string[]
          start_date?: string | null
          target_date?: string | null
          completed_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: Partial<Database['public']['Tables']['projects']['Insert']>
      }
      project_members: {
        Row: {
          id: string
          project_id: string
          user_id: string
          role: 'LEAD' | 'MEMBER' | 'OBSERVER'
          added_at: string
        }
        Insert: Omit<Database['public']['Tables']['project_members']['Row'], 'id' | 'added_at'>
        Update: Partial<Database['public']['Tables']['project_members']['Insert']>
      }
      messages: {
        Row: {
          id: string
          organisation_id: string
          project_id: string | null
          sender_id: string
          direction: MessageDirection
          subject: string | null
          body: string
          read_at: string | null
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['messages']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['messages']['Insert']>
      }
      documents: {
        Row: {
          id: string
          organisation_id: string
          project_id: string | null
          title: string
          category: DocumentCategory
          storage_path: string | null
          file_size: number | null
          mime_type: string | null
          uploaded_by: string
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['documents']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['documents']['Insert']>
      }
      deliverables: {
        Row: {
          id: string
          organisation_id: string
          project_id: string | null
          title: string
          description: string | null
          type: DeliverableType
          url: string | null
          published_at: string | null
          published_by: string | null
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['deliverables']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['deliverables']['Insert']>
      }
      activity: {
        Row: {
          id: string
          actor_id: string | null
          event_type: string
          resource_type: string
          resource_id: string | null
          organisation_id: string | null
          metadata: Json
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['activity']['Row'], 'id' | 'created_at'>
        Update: never
      }
      notifications: {
        Row: {
          id: string
          user_id: string
          title: string
          body: string | null
          href: string | null
          read_at: string | null
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['notifications']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['notifications']['Insert']>
      }
      audit_events: {
        Row: {
          id: string
          actor_id: string | null
          action: string
          resource_type: string
          resource_id: string | null
          organisation_id: string | null
          metadata: Json
          ip_address: string | null
          user_agent: string | null
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['audit_events']['Row'], 'id' | 'created_at'>
        Update: never
      }
      rate_limit_log: {
        Row: {
          ip_hash: string
          window_start: string
          count: number
        }
        Insert: Database['public']['Tables']['rate_limit_log']['Row']
        Update: Partial<Database['public']['Tables']['rate_limit_log']['Row']>
      }
    }
    Functions: {
      check_and_increment_rate_limit: {
        Args: { p_ip_hash: string; p_max_per_hour: number }
        Returns: boolean
      }
      write_audit_event: {
        Args: {
          p_actor_id: string | null
          p_action: string
          p_resource_type: string
          p_resource_id: string | null
          p_organisation_id: string | null
          p_metadata: Record<string, unknown>
          p_ip_address: string | null
          p_user_agent: string | null
        }
        Returns: void
      }
    }
    Enums: {
      user_role: UserRole
      project_status: ProjectStatus
      enquiry_status: EnquiryStatus
      message_direction: MessageDirection
      document_category: DocumentCategory
      deliverable_type: DeliverableType
    }
  }
}
