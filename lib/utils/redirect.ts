/**
 * Validates and sanitizes a return/redirect URL.
 * Prevents open redirects, protocol-relative URLs, and loops back to auth routes.
 * Defaults to /client/dashboard.
 */
export function sanitizeClientRedirect(url: string | null | undefined): string {
  if (!url) return '/client/dashboard'

  const trimmed = url.trim()

  // Must be a relative path starting with /client, never //, never backslash
  if (!trimmed.startsWith('/client') || trimmed.startsWith('//') || trimmed.includes('\\')) {
    return '/client/dashboard'
  }

  // Prevent URL loops back to auth pages
  const lower = trimmed.toLowerCase()
  if (
    lower.startsWith('/client/login') ||
    lower.startsWith('/client/forgot-password') ||
    lower.startsWith('/client/reset-password') ||
    lower.startsWith('/client/verify') ||
    lower.startsWith('/client/signup')
  ) {
    return '/client/dashboard'
  }

  // Disallow double slash or encoded slashes
  if (lower.includes('//') || lower.includes('%2f%2f') || lower.includes('%5c')) {
    return '/client/dashboard'
  }

  return trimmed
}
