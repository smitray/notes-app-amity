import { createMemoryHistory } from 'vue-router'
import { setActivePinia, createPinia } from 'pinia'
import { describe, it, expect, vi, beforeEach } from 'vitest'

vi.mock('vue-router', async () => {
  const actual = await vi.importActual('vue-router')
  return { ...actual, createWebHistory: actual.createMemoryHistory }
})

vi.mock('../src/stores/user', () => {
  const store = { user: null, initialized: false, async fetchUser() { this.initialized = true } }
  return { useUserStore: () => store }
})

import { createAppRouter } from '../src/router/index.js'

vi.mock('../src/pages/Login.vue', () => ({ default: {} }))
vi.mock('../src/pages/Register.vue', () => ({ default: {} }))
vi.mock('../src/pages/Notes.vue', () => ({ default: {} }))
vi.mock('../src/pages/NoteEditor.vue', () => ({ default: {} }))
vi.mock('../src/supabase/client', () => ({ supabase: {} }))


describe('router guard', () => {
  let router

  beforeEach(() => {
    setActivePinia(createPinia())
    router = createAppRouter(createMemoryHistory())
  })

  it('redirects unauthenticated users to login', async () => {
    router.push('/notes')
    await router.isReady()
    expect(router.currentRoute.value.path).toBe('/login')
  })
})
