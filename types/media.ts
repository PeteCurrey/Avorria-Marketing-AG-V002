/**
 * Avorria — Project Media Registry Types
 * 
 * Formal data model for project media assets, galleries, and provenance.
 */

export interface MediaAsset {
  src: string
  alt: string
  caption?: string
  width: number
  height: number
  aspectRatio?: '16/9' | '4/3' | '21/9' | '4/5' | '1/1' | '9/16'
  type?: 'image' | 'video' | 'schematic'
  poster?: string
  figureNumber?: string
  spec?: string
  provenance: string
}

export interface ProjectMediaPackage {
  slug: string
  title: string
  client: string
  industry: string
  year: number
  hero: MediaAsset
  thumbnail: MediaAsset
  gallery: MediaAsset[]
  secondary?: MediaAsset
  mobile?: MediaAsset
  video?: {
    src: string
    poster: string
    alt: string
  }
}
