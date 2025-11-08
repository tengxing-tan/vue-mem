<script setup lang="ts">
defineProps(['bgColor', 'type'])
defineEmits(['onClick'])
</script>
<template>
  <button
    :type="type || 'button'"
    class="group relative inline-block focus:ring-2 focus:outline-hidden"
    @click="$emit('onClick')"
  >
    <span
      :class="[
        `bg-${bgColor}-300`,
        'absolute inset-0 translate-x-1.5 translate-y-1.5 transition-transform group-hover:translate-x-0 group-hover:translate-y-0',
      ]"
    ></span>

    <span
      class="relative inline-block border-2 border-current px-8 md:px-12 py-3 md:py-4 text-sm md:text-lg font-bold tracking-widest text-black"
    >
      <slot />
    </span>
  </button>
</template>
