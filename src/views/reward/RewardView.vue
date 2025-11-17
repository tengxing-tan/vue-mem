<script setup lang="ts">
import AppButton from '@/components/AppButton.vue'
import AppProductCard from '@/components/AppProductCard.vue'
import { useJsonDataStore } from '@/composables/useJsonDataStore'
import { DbObjectStore } from '@/enums/DbObjectStore'
import type { RewardModel } from '@/models/reward.model'
import { dbPromise } from '@/services/db'
import { ref } from 'vue'

const rewardsInJson = ref('')
const showingRewards = ref<RewardModel[]>([])

dbPromise.getAll(DbObjectStore.Rewards).then((rewards: RewardModel[]) => {
  rewardsInJson.value = useJsonDataStore().serializeJsonData(rewards)
  showingRewards.value = rewards
})
</script>

<template>
  <section>
    <div class="flex justify-between items-center">
      <h1 class="text-4xl font-bold py-6 text-black">Rewards</h1>
      <RouterLink to="/reward/create">
        <AppButton bgColor="yellow">Add Reward</AppButton>
      </RouterLink>
    </div>

    <div class="pt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-12">
      <AppProductCard
        v-for="reward in showingRewards"
        :key="reward.id"
        :title="reward.name"
        :price="reward.points"
        :link="`/reward/${reward.id}`"
      />
    </div>
    <pre>{{ rewardsInJson }}</pre>
  </section>
</template>
