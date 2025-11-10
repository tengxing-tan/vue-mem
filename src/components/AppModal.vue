<script setup lang="ts">
import AppButton from './AppButton.vue'

defineProps<{
  title: string
}>()
defineEmits(['ok'])
</script>

<template>
  <div
    class="fixed inset-0 z-50 grid place-content-center bg-black/20 p-4 transition-all"
    role="dialog"
    aria-modal="true"
    aria-labelledby="modalTitle"
  >
    <div class="w-full min-w-96 max-w-md rounded-lg bg-white p-6 shadow-lg">
      <h2 id="modalTitle" class="text-xl font-bold text-gray-900 sm:text-2xl">{{ title }}</h2>

      <div class="mt-4">
        <p class="text-pretty text-gray-700">
          <slot />
        </p>
      </div>

      <footer class="mt-6 flex justify-end gap-2">
        <AppButton type="button" @on-click="$emit('ok')">OK</AppButton>
      </footer>
    </div>
  </div>
</template>
