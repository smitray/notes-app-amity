<template>
  <div class="p-4 border rounded shadow flex justify-between items-start">
    <div class="cursor-pointer flex-1" @click="$emit('open')">
      <h2 class="font-semibold">{{ title }}</h2>
      <p class="text-xs text-gray-500">{{ date }}</p>
    </div>
    <button @click.stop="$emit('delete')" class="text-red-500 text-sm">Delete</button>
  </div>
</template>

<script setup>
const props = defineProps({
  title: String,
  date: String
})
const emit = defineEmits(['open', 'delete'])
</script>
