import { createClient } from '@supabase/supabase-js'
import { describe, it, expect, beforeAll, afterAll } from 'vitest'

const url = process.env.VITE_SUPABASE_URL
const key = process.env.VITE_SUPABASE_KEY

if (!url || !key) {
  describe.skip('supabase note CRUD', () => {
    it('skipped', () => {})
  })
} else {
  const supabase = createClient(url, key)
  let user
  let noteId
  const email = `test${Date.now()}@example.com`
  const password = 'pass1234'

  describe('supabase note CRUD', () => {
    beforeAll(async () => {
      const { data, error } = await supabase.auth.signUp({ email, password })
      if (error) throw error
      user = data.user
    })

    it('creates a note', async () => {
      const { data, error } = await supabase
        .from('notes')
        .insert({ title: 'test', content: 'hello', user_id: user.id })
        .select()
        .single()
      expect(error).toBeNull()
      noteId = data.id
      expect(data.content).toBe('hello')
    })

    it('reads the note', async () => {
      const { data, error } = await supabase
        .from('notes')
        .select('*')
        .eq('id', noteId)
        .single()
      expect(error).toBeNull()
      expect(data.id).toBe(noteId)
    })

    it('updates the note', async () => {
      const { error } = await supabase
        .from('notes')
        .update({ title: 'updated' })
        .eq('id', noteId)
      expect(error).toBeNull()
      const { data } = await supabase
        .from('notes')
        .select('title')
        .eq('id', noteId)
        .single()
      expect(data.title).toBe('updated')
    })

    it('deletes the note', async () => {
      const { error } = await supabase.from('notes').delete().eq('id', noteId)
      expect(error).toBeNull()
    })

    afterAll(async () => {
      await supabase.auth.signOut()
    })
  })
}
