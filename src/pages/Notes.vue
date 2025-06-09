<template>
  <div class="p-4 max-w-3xl mx-auto space-y-4">
    <div class="flex justify-between items-center mb-4">
      <h1 class="text-2xl font-bold">Your Notes</h1>
      <div class="space-x-2">
        <button @click="newNote" class="bg-blue-500 text-white px-4 py-2 rounded">New</button>
        <button @click="signOut" class="bg-gray-200 px-4 py-2 rounded">Logout</button>
      </div>
    </div>
    <div v-if="loading" class="text-center">Loading...</div>
    <div v-else-if="notes.length === 0" class="text-center text-gray-500">No notes yet</div>
    <div class="grid gap-4" v-else>
      <NoteCard
        v-for="n in notes"
        :key="n.id"
        :title="n.title"
        :date="formatDate(n.updated_at)"
        @open="openNote(n.id)"
        @delete="deleteNote(n.id)"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { supabase } from '../supabase/client'
import { useRouter } from 'vue-router'
import NoteCard from '../components/NoteCard.vue'
import { useUserStore } from '../stores/user'
import { useToastStore } from '../stores/toast'

const router = useRouter()
const userStore = useUserStore()
const toast = useToastStore()
const notes = ref([])
const loading = ref(true)

const loadNotes = async () => {
  loading.value = true
  const { data } = await supabase.from('notes').select('*').order('updated_at', { ascending: false })
  notes.value = data || []
  loading.value = false
}

const newNote = () => router.push('/notes/new')
const openNote = id => router.push(`/notes/${id}`)
const formatDate = d => new Date(d).toLocaleString()
const deleteNote = async id => {
  const { error } = await supabase.from('notes').delete().eq('id', id)
  if (!error) {
    toast.show('Deleted')
    loadNotes()
  } else {
    toast.show('Failed to delete')
  }
}
const signOut = async () => {
  await userStore.signOut()
  router.push('/login')
}

onMounted(loadNotes)
</script>