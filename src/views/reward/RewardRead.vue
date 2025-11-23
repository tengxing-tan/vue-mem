<script setup lang="ts">
import AppButton from '@/components/AppButton.vue'
import AppFormLabel from '@/components/AppFormLabel.vue'
import { dateFormat } from '@/composables/useAppFormatterStore'
import { DbObjectStore } from '@/enums/DbObjectStore'
import type { RewardModel } from '@/models/reward.model'
import { dbPromise } from '@/services/db'
import { onMounted, ref } from 'vue'
import RewardUpdate from './RewardUpdate.vue'

const props = defineProps<{
  rewardId: string
}>()

const reward = ref<RewardModel>()
const isRewardUpdate = ref(false)

onMounted(() => {
  dbPromise.get(DbObjectStore.Rewards, Number(props.rewardId)).then((rewardData: RewardModel) => {
    reward.value = rewardData
  })
})

const updateRewardEmit = (updated: RewardModel) => {
  reward.value = updated
  isRewardUpdate.value = false
}
</script>

<template>
  <section v-if="isRewardUpdate">
    <RewardUpdate :rewardData="reward" @updateReward="updateRewardEmit" />
  </section>
  <section v-else>
    <div class="flex justify-between items-center">
      <h1 class="text-4xl font-bold py-6 text-black">Reward</h1>
    </div>

    <div v-if="!reward" class="pb-6 flex flex-col gap-4">
      <p>Loading reward details...</p>
    </div>
    <div v-else class="pb-6 flex flex-col gap-4">
      <AppFormLabel label="Name" labelId="name">
        <p class="mt-1 py-2 md:py-4 px-3 w-full text-2xl font-semibold text-gray-700">
          {{ reward.name }}
        </p>
      </AppFormLabel>
      <AppFormLabel label="Points" labelId="points">
        <p class="mt-1 py-2 md:py-4 px-3 w-full text-2xl font-semibold text-gray-700">
          {{ reward.points }}
        </p>
      </AppFormLabel>
      <!-- date -->
      <AppFormLabel label="Promotion duration" labelId="validFrom">
        <p class="mt-1 py-2 md:py-4 px-3 w-full text-2xl font-semibold text-gray-700">
          {{ dateFormat(reward.validFrom) }} - {{ dateFormat(reward.validUntil) }}
        </p>
      </AppFormLabel>
      <AppFormLabel label="Description" labelId="description">
        <p class="mt-1 py-2 md:py-4 px-3 w-full text-2xl font-semibold text-gray-700">
          {{ reward.description }}
        </p>
      </AppFormLabel>
    </div>
    <div class="space-x-4">
      <AppButton bg-color="green" @on-click="isRewardUpdate = true">Update</AppButton>
      <RouterLink to="/reward">
        <AppButton>Back</AppButton>
      </RouterLink>
    </div>
  </section>
</template>
