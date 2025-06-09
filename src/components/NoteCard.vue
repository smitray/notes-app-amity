<template>
  <div class="p-4 border rounded shadow hover:bg-gray-50 cursor-pointer" @click="$emit('open')">
    <h2 class="font-semibold">{{ title }}</h2>
    <p class="text-xs text-gray-500">{{ date }}</p>
  </div>
</template>

<script setup>
const props = defineProps({
  title: String,
  date: String
})
const emit = defineEmits(['open'])
</script>
