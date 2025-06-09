<template>
  <div class="p-4 max-w-3xl mx-auto">
    <div class="mb-4 flex justify-between items-center">
      <h1 class="text-xl font-semibold">{{ isNew ? 'New Note' : 'Edit Note' }}</h1>
      <button @click="goBack" class="text-blue-500">Back</button>
    </div>
    <input v-model="title" placeholder="Title" class="w-full mb-4 p-2 border rounded" />
    <Editor v-model="content" :saving="saving" @save="save" />
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { supabase } from '../supabase/client'
import { useUserStore } from '../stores/user'
import Editor from '../components/Editor.vue'

const router = useRouter()
const route = useRoute()
const id = route.params.id
const title = ref('')
const content = ref('')
const saving = ref(false)
const isNew = computed(() => id === 'new')
const userStore = useUserStore()

const load = async () => {
  if (isNew.value) return
  const { data } = await supabase.from('notes').select('*').eq('id', id).single()
  title.value = data.title
  content.value = data.content
}

const save = async () => {
  saving.value = true
  const payload = { title: title.value, content: content.value }
  if (isNew.value) {
    await supabase.from('notes').insert({ ...payload, user_id: userStore.user.id })
  } else {
    await supabase.from('notes').update(payload).eq('id', id)
  }
  saving.value = false
  router.push('/notes')
}

const goBack = () => router.push('/notes')

onMounted(load)
</script>
