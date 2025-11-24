<script setup lang="ts">
import AppButton from '@/components/AppButton.vue'
import AppProductCard from '@/components/AppProductCard.vue'
import { DbObjectStore } from '@/enums/DbObjectStore'
import type { RewardModel } from '@/models/reward.model'
import { dbPromise } from '@/services/db'
import { ref } from 'vue'

const showingRewards = ref<RewardModel[]>([])

dbPromise.getAll(DbObjectStore.Rewards).then((rewards: RewardModel[]) => {
  showingRewards.value = rewards
})

const base = import.meta.env.VITE_API_BASE || ''

const fetchRewards = async () => {
  const res = await fetch(base + '/api/rewards')
  if (!res.ok) throw new Error(`Request failed: ${res.status}`)
  showingRewards.value = await res.json()
}
</script>

<template>
  <section>
    <div class="flex justify-between items-center">
      <h1 class="text-4xl font-bold py-6 text-black">Rewards</h1>
      <div class="space-x-2">
        <AppButton bgColor="blue" @onClick="fetchRewards">Refresh</AppButton>
        <RouterLink to="/reward/create">
          <AppButton bgColor="yellow">Add Reward</AppButton>
        </RouterLink>
      </div>
    </div>

    <div class="pt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-12">
      <AppProductCard
        v-for="reward in showingRewards"
        :key="reward.id"
        :title="reward.name"
        :price="reward.points"
        :link="`/reward/${reward.id}`"
        :imgUrl="reward.imageUrl"
      />
    </div>
  </section>
</template>
