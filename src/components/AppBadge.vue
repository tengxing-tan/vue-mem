<script setup lang="ts">
defineProps(['color'])
</script>
<template>
  <span
    :class="`inline-flex items-center justify-center rounded-full border border-${color}-500 px-2.5 py-0.5 text-${color}-700 text-xs`"
  >
    <slot />
  </span>
</template>
