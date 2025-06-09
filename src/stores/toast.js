import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useToastStore = defineStore('toast', () => {
  const messages = ref([])
  function show(message, timeout = 3000) {
    const id = Date.now() + Math.random()
    messages.value.push({ id, message })
    setTimeout(() => {
      messages.value = messages.value.filter(m => m.id !== id)
    }, timeout)
  }
  return { messages, show }
})
