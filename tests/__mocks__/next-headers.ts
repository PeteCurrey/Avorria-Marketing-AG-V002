// Stub for 'next/headers' in vitest environment.
export const headers = async () => ({
  get: (_key: string) => null,
  has: (_key: string) => false,
  entries: () => [],
  forEach: () => {},
  keys: () => [],
  values: () => [],
})

export const cookies = async () => ({
  get: (_key: string) => undefined,
  getAll: () => [],
  has: (_key: string) => false,
  set: () => {},
  delete: () => {},
})
