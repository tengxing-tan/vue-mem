<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

type ToastType = 'info' | 'success' | 'error' | 'warning'

type ToastMessage = {
  id: number
  type: ToastType
  text: string
  timeout?: number
}

const messages = ref<ToastMessage[]>([])

let nextId = 1

function pushToast(type: ToastType, text: string, timeout = 3500): void {
  const id = nextId++
  messages.value.push({ id, type, text, timeout })
  setTimeout(() => dismiss(id), timeout)
}

function dismiss(id: number): void {
  messages.value = messages.value.filter((m) => m.id !== id)
}

function onEvent(e: CustomEvent<{ type: ToastType; text: string; timeout?: number }>) {
  const { type, text, timeout } = e.detail
  pushToast(type, text, timeout)
}

onMounted(() => {
  window.addEventListener('app:toast', onEvent as EventListener)
})

onUnmounted(() => {
  window.removeEventListener('app:toast', onEvent as EventListener)
})
</script>

<template>
  <div class="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 flex flex-col gap-2 w-[90%] max-w-xl">
    <div
      v-for="m in messages"
      :key="m.id"
      class="px-4 py-3 rounded shadow text-white"
      :class="{
        'bg-blue-600': m.type === 'info',
        'bg-green-600': m.type === 'success',
        'bg-red-600': m.type === 'error',
        'bg-yellow-600': m.type === 'warning',
      }"
    >
      {{ m.text }}
      <button class="ml-4 underline" @click="dismiss(m.id)">Close</button>
    </div>
  </div>
</template>

<style scoped></style>
