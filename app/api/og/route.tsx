import { ImageResponse } from 'next/og'
import type { NextRequest } from 'next/server'

export const runtime = 'edge'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const title = searchParams.get('title') ?? 'Selected Work'
  const client = searchParams.get('client') ?? 'Avorria'

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          padding: '72px 80px',
          backgroundColor: '#F4F1EB',
          fontFamily: 'sans-serif',
        }}
      >
        {/* Wordmark */}
        <div
          style={{
            position: 'absolute',
            top: 52,
            left: 80,
            fontSize: 18,
            fontWeight: 300,
            letterSpacing: '0.06em',
            color: '#6E6A64',
          }}
        >
          Avorria
        </div>

        {/* Client */}
        <div
          style={{
            fontSize: 15,
            fontWeight: 300,
            color: '#6E6A64',
            letterSpacing: '0.02em',
            marginBottom: 20,
          }}
        >
          {client}
        </div>

        {/* Headline */}
        <div
          style={{
            fontSize: 52,
            fontWeight: 200,
            color: '#232326',
            lineHeight: 1.1,
            letterSpacing: '-0.03em',
            maxWidth: '16ch',
          }}
        >
          {title}
        </div>

        {/* Rose accent line */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: 3,
            backgroundColor: '#B5566B',
          }}
        />
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  )
}
