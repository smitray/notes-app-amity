import { setActivePinia, createPinia } from 'pinia'
import { describe, it, expect, vi, beforeEach } from 'vitest'

vi.mock('../src/supabase/client', () => ({
  supabase: {
    auth: {
      getUser: vi.fn(() => Promise.resolve({ data: { user: { id: '1', email: 'a@test.com' } } })),
      signOut: vi.fn(() => Promise.resolve()),
    }
  }
}))

import { useUserStore } from '../src/stores/user'

describe('user store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('fetchUser sets user and initialized', async () => {
    const store = useUserStore()
    await store.fetchUser()
    expect(store.user.email).toBe('a@test.com')
    expect(store.initialized).toBe(true)
  })

  it('signOut clears user', async () => {
    const store = useUserStore()
    store.user = { id: '1' }
    await store.signOut()
    expect(store.user).toBeNull()
  })
})
