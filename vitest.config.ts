import { defineConfig } from 'vitest/config'
import path from 'path'

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    // Run RLS tests with network access (real Supabase)
    // Regular unit tests can run in isolation
    include: ['tests/**/*.test.ts'],
    exclude: ['node_modules', '.next'],
    testTimeout: 20000, // RLS tests hit real network
    hookTimeout: 10000,
    setupFiles: ['tests/setup.ts'],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '.'),
    },
  },
})
