<template>
  <div>
    <MdEditor v-model="content" class="h-96" language="en-US" />
    <div class="mt-4 flex justify-end">
      <button @click="$emit('save', content)" class="bg-blue-500 text-white px-4 py-2 rounded">
        {{ saving ? 'Saving...' : 'Save' }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { MdEditor } from 'md-editor-v3'
import 'md-editor-v3/lib/style.css'
import { ref, watch, watchEffect } from 'vue'


const props = defineProps({
  modelValue: String,
  saving: Boolean
})
const emit = defineEmits(['update:modelValue', 'save'])
const content = ref(props.modelValue || '')
watch(() => props.modelValue, v => {
  content.value = v
})
watchEffect(() => emit('update:modelValue', content.value))
</script>
