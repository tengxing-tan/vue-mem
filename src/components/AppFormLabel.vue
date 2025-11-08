<script setup lang="ts">
defineProps<{
  labelId: string
  label: string
}>()
</script>
<template>
  <label :for="labelId">
    <span class="font-medium text-gray-700">{{ label }}</span>
    <slot />
  </label>
</template>
