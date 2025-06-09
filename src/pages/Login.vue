<template>
  <div class="min-h-screen flex items-center justify-center">
    <form @submit.prevent="login" class="space-y-4 w-80">
      <h1 class="text-2xl font-bold text-center">Login</h1>
      <input v-model="email" type="email" placeholder="Email" class="w-full p-2 border rounded" required>
      <input v-model="password" type="password" placeholder="Password" class="w-full p-2 border rounded" required>
      <button type="submit" class="w-full bg-blue-500 text-white p-2 rounded" :disabled="loading">
        {{ loading ? 'Loading...' : 'Login' }}
      </button>
      <p class="text-center text-sm">No account?
        <RouterLink to="/register" class="text-blue-500">Register</RouterLink>
      </p>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { supabase } from '../supabase/client'
import { useRouter } from 'vue-router'
import { useUserStore } from '../stores/user'
import { useToastStore } from '../stores/toast'

const email = ref('')
const password = ref('')
const loading = ref(false)
const router = useRouter()
const userStore = useUserStore()
const toast = useToastStore()

const login = async () => {
  loading.value = true
  const { error } = await supabase.auth.signInWithPassword({ email: email.value, password: password.value })
  loading.value = false
  if (error) {
    toast.show('Login failed')
  } else {
    await userStore.fetchUser()
    toast.show('Logged in')
    router.push('/notes')
  }
}
</script>
