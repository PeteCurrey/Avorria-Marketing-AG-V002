'use server'

import { signIn, signOut } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { z } from 'zod'

// ─── Sign In Action ───────────────────────────────────────────────────────────

const signInSchema = z.object({
  email:    z.string().email('Enter a valid email address.'),
  password: z.string().min(1, 'Password is required.'),
})

export interface SignInFormState {
  error?: string
  fieldErrors?: { email?: string[]; password?: string[] }
}

export async function signInAction(
  _prev: SignInFormState,
  formData: FormData,
): Promise<SignInFormState> {
  const raw = {
    email:    formData.get('email'),
    password: formData.get('password'),
  }

  const parsed = signInSchema.safeParse(raw)
  if (!parsed.success) {
    return { fieldErrors: parsed.error.flatten().fieldErrors }
  }

  const result = await signIn(parsed.data.email, parsed.data.password)

  if (!result.success) {
    return { error: result.error }
  }

  // Redirect is done outside this action to avoid "redirect called inside try/catch"
  redirect(result.redirectTo ?? '/client/dashboard')
}

// ─── Sign Out Action ──────────────────────────────────────────────────────────

export async function signOutAction(): Promise<void> {
  await signOut()
  redirect('/')
}
