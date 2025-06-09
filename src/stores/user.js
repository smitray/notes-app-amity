import { defineStore } from 'pinia'
import { supabase } from '../supabase/client'

export const useUserStore = defineStore('user', {
  state: () => ({ user: null, initialized: false }),
  actions: {
    async fetchUser() {
      const { data } = await supabase.auth.getUser()
      this.user = data.user
      this.initialized = true
    },
    async signOut() {
      await supabase.auth.signOut()
      this.user = null
      this.initialized = false
    }
  }
})