<template>
  <div class="fixed top-4 right-4 space-y-2 z-50">
    <div v-for="t in store.messages" :key="t.id" class="bg-gray-800 text-white px-4 py-2 rounded shadow">
      {{ t.message }}
    </div>
  </div>
</template>

<script setup>
import { useToastStore } from '../stores/toast'
const store = useToastStore()
</script>
