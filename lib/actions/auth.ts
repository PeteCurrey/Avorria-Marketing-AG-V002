'use server'

import { signIn, signOut } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { z } from 'zod'

import { sanitizeClientRedirect } from '@/lib/utils/redirect'

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
    redirect: formData.get('redirect'),
  }

  const parsed = signInSchema.safeParse(raw)
  if (!parsed.success) {
    return { fieldErrors: parsed.error.flatten().fieldErrors }
  }

  let result
  try {
    result = await signIn(parsed.data.email, parsed.data.password)
  } catch (err) {
    console.error('[Auth Sign In Exception]:', err)
    return { error: 'Unable to connect to authentication services. Please check your connection and try again.' }
  }

  if (!result.success) {
    return { error: result.error || 'Invalid email or password.' }
  }

  // Redirect staff users to admin portal/MFA if applicable
  if (result.redirectTo?.startsWith('/admin')) {
    redirect(result.redirectTo)
  }

  const destination = sanitizeClientRedirect(raw.redirect as string | null)
  redirect(destination)
}

// ─── Sign Out Action ──────────────────────────────────────────────────────────

export async function signOutAction(): Promise<void> {
  await signOut()
  redirect('/')
}

// ─── Forgot Password Action ─────────────────────────────────────────────────

const forgotPasswordSchema = z.object({
  email: z.string().email('Enter a valid email address.'),
})

export interface ForgotPasswordFormState {
  error?: string
  success?: boolean
  message?: string
  fieldErrors?: { email?: string[] }
}

export async function forgotPasswordAction(
  _prev: ForgotPasswordFormState,
  formData: FormData,
): Promise<ForgotPasswordFormState> {
  const raw = {
    email: formData.get('email'),
  }

  const parsed = forgotPasswordSchema.safeParse(raw)
  if (!parsed.success) {
    return { fieldErrors: parsed.error.flatten().fieldErrors }
  }

  const { sendPasswordReset } = await import('@/lib/auth')
  const result = await sendPasswordReset(parsed.data.email)

  if (result.error) {
    return { error: result.error }
  }

  return {
    success: true,
    message: 'If an account exists with that email address, a password reset link has been sent.',
  }
}

// ─── Reset Password Action ──────────────────────────────────────────────────

const resetPasswordSchema = z
  .object({
    password: z.string().min(8, 'Password must be at least 8 characters.'),
    confirmPassword: z.string().min(1, 'Confirm your password.'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match.',
    path: ['confirmPassword'],
  })

export interface ResetPasswordFormState {
  error?: string
  fieldErrors?: { password?: string[]; confirmPassword?: string[] }
}

export async function resetPasswordAction(
  _prev: ResetPasswordFormState,
  formData: FormData,
): Promise<ResetPasswordFormState> {
  const raw = {
    password: formData.get('password'),
    confirmPassword: formData.get('confirmPassword'),
  }

  const parsed = resetPasswordSchema.safeParse(raw)
  if (!parsed.success) {
    return { fieldErrors: parsed.error.flatten().fieldErrors }
  }

  const { createClient } = await import('@/lib/supabase/server')
  const supabase = await createClient()
  const { error } = await supabase.auth.updateUser({
    password: parsed.data.password,
  })

  if (error) {
    return { error: error.message }
  }

  redirect('/client/login?status=password-updated')
}

