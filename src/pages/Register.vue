<template>
  <div class="min-h-screen flex items-center justify-center">
    <form @submit.prevent="register" class="space-y-4 w-80">
      <h1 class="text-2xl font-bold text-center">Register</h1>
      <input v-model="email" type="email" placeholder="Email" class="w-full p-2 border rounded" required>
      <input v-model="password" type="password" placeholder="Password" class="w-full p-2 border rounded" required>
      <button type="submit" class="w-full bg-blue-500 text-white p-2 rounded" :disabled="loading">
        {{ loading ? 'Loading...' : 'Register' }}
      </button>
      <p class="text-center text-sm">Have an account?
        <RouterLink to="/login" class="text-blue-500">Login</RouterLink>
      </p>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { supabase } from '../supabase/client'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const loading = ref(false)
const router = useRouter()

const register = async () => {
  loading.value = true
  const { error } = await supabase.auth.signUp({ email: email.value, password: password.value })
  loading.value = false
  if (!error) router.push('/notes')
}
</script>
