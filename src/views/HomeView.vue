<script setup lang="ts">
import { onMounted, ref } from 'vue'
import type { RewardModel } from '@/models/reward.model'
import RewardsBrowse from './client/RewardsBrowse.vue'
import RewardItem from './client/RewardItem.vue'

const base = import.meta.env.VITE_API_BASE || ''
const selectItem = ref<RewardModel | null>(null)

const rewards = ref<RewardModel[]>([])
onMounted(async () => {
  const res = await fetch(base + '/api/rewards')
  if (!res.ok) throw new Error(`Request failed: ${res.status}`)
  rewards.value = await res.json()
})
</script>

<template>
  <section class="bg-white">
    <div
      class="flex items-center gap-2 font-sans font-semibold text-md text-zinc-900 border-b-2 border-zinc-200"
    >
      <img src="/public/img/amigos/amigos-logo.jpg" alt="" class="w-20 h-20 rounded-full" />
      <h1 class="text-zinc-800">Amigos Chinese $ Western Cafe</h1>
    </div>
    <RewardItem v-if="selectItem" v-bind="selectItem" @back-home="selectItem = null" class="my-6" />
    <RewardsBrowse v-else :rewards="rewards" @select-item="selectItem = $event" />
  </section>
</template>
