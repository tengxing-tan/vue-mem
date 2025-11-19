<script setup lang="ts">
import AppFormLabel from '@/components/AppFormLabel.vue'
import { ref } from 'vue'

const phoneNo = ref('')
</script>

<template>
  <AppFormLabel label="Phone No" labelId="phoneNo">
    <input
      v-model="phoneNo"
      type="text"
      class="mt-1 py-2 md:py-4 px-3 w-full rounded-lg border-4 border-gray-300 shadow text-2xl text-gray-700"
      autofocus
    />
  </AppFormLabel>
</template>
