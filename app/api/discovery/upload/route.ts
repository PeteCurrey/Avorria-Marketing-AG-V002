import { NextResponse } from 'next/server'
import { getDiscoveryProjectByToken, recordDiscoveryFile } from '@/lib/db/discovery'
import { createAdminClient } from '@/lib/supabase/server-admin'

const ALLOWED_MIME_TYPES = [
  'application/pdf',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  'image/png',
  'image/jpeg',
  'image/svg+xml',
  'application/zip'
]

const MAX_FILE_SIZE = 25 * 1024 * 1024 // 25MB

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { sessionToken, fileName, fileSize, mimeType } = body

    if (!sessionToken || !fileName || !fileSize || !mimeType) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    if (!ALLOWED_MIME_TYPES.includes(mimeType)) {
      return NextResponse.json({ error: 'Unsupported file type' }, { status: 400 })
    }

    if (fileSize > MAX_FILE_SIZE) {
      return NextResponse.json({ error: 'File exceeds 25MB limit' }, { status: 400 })
    }

    const project = await getDiscoveryProjectByToken(sessionToken)
    if (!project) {
      return NextResponse.json({ error: 'Invalid session' }, { status: 401 })
    }

    const supabase = createAdminClient()
    const fileExt = fileName.split('.').pop()
    const timestamp = Date.now()
    const safeName = fileName.replace(/[^a-zA-Z0-9.\-_]/g, '_')
    const storagePath = `${project.id}/${timestamp}-${safeName}`

    const { data, error } = await supabase.storage
      .from('discovery-materials')
      .createSignedUploadUrl(storagePath)

    if (error || !data) {
      console.error('Storage error:', error)
      return NextResponse.json({ error: 'Could not generate upload URL' }, { status: 500 })
    }

    const fileId = await recordDiscoveryFile({
      projectId: project.id,
      fileName,
      mimeType: mimeType,
      fileSizeBytes: fileSize,
      storagePath,
    })

    return NextResponse.json({
      signedUrl: data.signedUrl,
      storagePath,
      fileId: fileId
    })
  } catch (error) {
    console.error('Upload route error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
