<script setup lang="ts">
import { onMounted, ref } from 'vue'
import type { RewardModel } from '@/models/reward.model'
import RewardsBrowse from './client/RewardsBrowse.vue'
import RewardItem from './client/RewardItem.vue'
import { useMemberPhoneNoStore } from '@/composables/useMemberPhoneNoStore'

const base = import.meta.env.VITE_API_BASE || ''
const selectItem = ref<RewardModel | null>(null)

const { getMemberPhoneNo } = useMemberPhoneNoStore()
const phoeNo = ref(getMemberPhoneNo())
const points = ref(0)

const rewards = ref<RewardModel[]>([])
onMounted(async () => {
  const res = await fetch(base + '/api/rewards')
  if (!res.ok) throw new Error(`Request failed: ${res.status}`)
  rewards.value = await res.json()

  if (phoeNo.value) {
    const res2 = await fetch(base + '/api/member/points?phoneNo=' + phoeNo.value)
    if (!res2.ok) throw new Error(`Request failed: ${res2.status}`)
    points.value = await res2.json()
  }
})

const backHome = () => {
  selectItem.value = null

  if (!phoeNo.value) {
    phoeNo.value = getMemberPhoneNo()
  }
}
</script>

<template>
  <section class="bg-white">
    <div
      class="flex items-center gap-2 font-sans font-semibold text-md text-zinc-900 border-b-2 border-zinc-200"
    >
      <img src="/img/amigos/amigos-logo.jpg" alt="" class="w-20 h-20 rounded-full" />
      <h1 class="text-zinc-800">Amigos Chinese $ Western Cafe</h1>
    </div>
    <p v-show="phoeNo" class="p-2 pt-4 text-sm text-zinc-600 transition">
      🍄 You have <span class="font-semibold">{{ points }}</span> points.
    </p>
    <RewardItem
      v-if="selectItem"
      :reward="selectItem"
      :memberPoints="points"
      @back-home="backHome"
      class="my-6"
    />
    <RewardsBrowse v-else :rewards="rewards" @select-item="selectItem = $event" />
  </section>
</template>
