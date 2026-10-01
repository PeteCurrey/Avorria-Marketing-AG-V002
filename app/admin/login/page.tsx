'use client'

import { useActionState } from 'react'
import Link from 'next/link'
import { signInAction, type SignInFormState } from '@/lib/actions/auth'

const initial: SignInFormState = {}

export default function AdminLoginPage() {
  const [state, action, isPending] = useActionState(signInAction, initial)

  return (
    <div className="min-h-screen bg-[#090909] text-white flex items-center justify-center px-6">
      <div className="w-full max-w-[400px] border border-white/10 bg-[#111] p-8 md:p-10 space-y-8">
        
        {/* Header */}
        <div>
          <Link
            href="/"
            className="text-[10px] font-mono uppercase tracking-[0.25em] text-white/40 hover:text-white transition-colors block mb-4"
          >
            ← AVORRIA PUBLIC SITE
          </Link>
          <div className="border-b border-white/10 pb-4">
            <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 block mb-1">
              STAFF COMMAND CENTER // RESTRICTED ACCESS
            </span>
            <h1 className="text-2xl font-extralight text-white tracking-tight">
              Admin Gateway
            </h1>
          </div>
        </div>

        {/* Global Error Notice */}
        {state.error && (
          <div
            role="alert"
            className="text-xs font-mono text-rose-400 border border-rose-500/30 bg-rose-950/20 px-4 py-3"
          >
            {state.error}
          </div>
        )}

        {/* Login Form */}
        <form action={action} className="space-y-5" noValidate>
          <div>
            <label
              htmlFor="email"
              className="block text-[10px] font-mono uppercase tracking-wider text-white/50 mb-1.5"
            >
              Staff Identifier (Email)
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              placeholder="principal@avorria.com"
              className="w-full bg-white/[0.03] border border-white/10 px-4 py-2.5 text-xs font-mono text-white placeholder-white/20 focus:outline-none focus:border-white/40"
            />
            {state.fieldErrors?.email && (
              <p className="text-[11px] font-light text-rose-400 mt-1">
                {state.fieldErrors.email[0]}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-[10px] font-mono uppercase tracking-wider text-white/50 mb-1.5"
            >
              Access Secret / Token
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="w-full bg-white/[0.03] border border-white/10 px-4 py-2.5 text-xs font-mono text-white focus:outline-none focus:border-white/40"
            />
            {state.fieldErrors?.password && (
              <p className="text-[11px] font-light text-rose-400 mt-1">
                {state.fieldErrors.password[0]}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="w-full border border-white/30 bg-white/10 hover:bg-white hover:text-black transition-all py-3 text-xs font-mono uppercase tracking-widest text-white disabled:opacity-40"
          >
            {isPending ? 'Verifying Credentials...' : 'Authenticate & Enter'}
          </button>
        </form>

        {/* Footer info */}
        <div className="pt-4 border-t border-white/5 text-center">
          <p className="text-[10px] font-mono text-white/30">
            SECURE REPOSITORY ACCESS // MULTI-FACTOR ENFORCED
          </p>
        </div>
      </div>
    </div>
  )
}
