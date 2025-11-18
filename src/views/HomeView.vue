<script setup lang="ts">
import { onMounted, ref } from 'vue'

const base = import.meta.env.VITE_API_BASE || ''

const rewards = ref([])
onMounted(async () => {
  const res = await fetch(base + '/api/rewards')
  if (!res.ok) throw new Error(`Request failed: ${res.status}`)
  rewards.value = await JSONres.json()
})
</script>

<template>
  <section>
    <h1>home</h1>
    <pre>{{ rewards }}</pre>
  </section>
</template>
