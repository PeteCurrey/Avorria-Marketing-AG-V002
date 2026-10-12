'use client'

import { useState } from 'react'
import Link from 'next/link'

interface Channel {
  id: string
  label: string
  targetId?: string
  href?: string
  count?: string
}

const CHANNELS: Channel[] = [
  { id: 'all', label: 'ALL CHANNELS', targetId: 'mosaic' },
  { id: 'build', label: '01 // BUILD', targetId: 'disciplines' },
  { id: 'search', label: '02 // SEARCH', targetId: 'disciplines' },
  { id: 'systems', label: '03 // SYSTEMS', targetId: 'disciplines' },
  { id: 'leaderboard', label: '04 // BENCHMARKS', targetId: 'leaderboard' },
  { id: 'lobby', label: '05 // THE LOBBY', targetId: 'lobby-editorial' },
  { id: 'teardowns', label: 'TEARDOWNS', href: '/the-lobby/category/analysis' },
]

export function ChannelFilterBar() {
  const [activeChannel, setActiveChannel] = useState('all')

  const handleScrollTo = (targetId?: string, channelId?: string) => {
    if (channelId) setActiveChannel(channelId)
    if (!targetId) return

    const el = document.getElementById(targetId)
    if (el) {
      const navOffset = 80
      const elementPosition = el.getBoundingClientRect().top + window.scrollY
      window.scrollTo({
        top: elementPosition - navOffset,
        behavior: 'smooth',
      })
    }
  }

  return (
    <nav
      aria-label="Content Channels"
      className="sticky top-16 md:top-20 z-40 w-full bg-[#0A0B0E]/95 backdrop-blur-md border-y border-white/10 select-none"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 flex items-center justify-between gap-4 py-2.5">
        {/* Horizontal Scroll Pill Rail */}
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-none py-1 -my-1 max-w-full">
          <span className="text-[0.625rem] uppercase tracking-[0.2em] font-extralight text-white/40 shrink-0 mr-1 hidden sm:inline">
            CHANNELS:
          </span>

          {CHANNELS.map((channel) => {
            const isActive = activeChannel === channel.id

            if (channel.href) {
              return (
                <Link
                  key={channel.id}
                  href={channel.href}
                  className={[
                    'shrink-0 px-3.5 py-1.5 rounded-full text-[0.6875rem] uppercase tracking-[0.14em] font-light transition-all duration-200 border',
                    'border-white/10 text-white/70 hover:border-white/40 hover:text-white hover:bg-white/5',
                  ].join(' ')}
                >
                  {channel.label}
                </Link>
              )
            }

            return (
              <button
                key={channel.id}
                type="button"
                onClick={() => handleScrollTo(channel.targetId, channel.id)}
                className={[
                  'shrink-0 px-3.5 py-1.5 rounded-full text-[0.6875rem] uppercase tracking-[0.14em] font-light transition-all duration-200 border cursor-pointer',
                  isActive
                    ? 'border-[var(--color-cobalt)] bg-[var(--color-cobalt)] text-white shadow-[0_0_15px_rgba(49,87,255,0.4)]'
                    : 'border-white/10 text-white/70 hover:border-white/30 hover:text-white hover:bg-white/5',
                ].join(' ')}
              >
                {channel.label}
              </button>
            )
          })}
        </div>

        {/* Live Studio Engine Telemetry Badge */}
        <div className="hidden lg:flex items-center gap-2.5 shrink-0 pl-4 border-l border-white/10 text-[0.625rem] tracking-[0.16em] uppercase font-extralight text-white/50">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>ENGINE 4.2 · COMMISSIONS OPEN</span>
        </div>
      </div>
    </nav>
  )
}
