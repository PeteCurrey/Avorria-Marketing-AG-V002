import { defineConfig } from 'vitest/config'
import path from 'path'

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    include: ['tests/**/*.test.ts'],
    exclude: ['node_modules', '.next'],
    testTimeout: 20000,
    hookTimeout: 10000,
    setupFiles: ['tests/setup.ts'],
    // Allow server-only modules to be imported in test environment
    server: {
      deps: {
        inline: ['server-only'],
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '.'),
      // Stub server-only so unit tests can import server modules
      'server-only': path.resolve(__dirname, 'tests/__mocks__/server-only.ts'),
      // Stub next/headers for server action tests
      'next/headers': path.resolve(__dirname, 'tests/__mocks__/next-headers.ts'),
      // Stub next/cache
      'next/cache': path.resolve(__dirname, 'tests/__mocks__/next-cache.ts'),
    },
  },
})
