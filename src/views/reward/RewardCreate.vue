<script setup lang="ts">
import AppButton from '@/components/AppButton.vue'
import AppFormLabel from '@/components/AppFormLabel.vue'
import { create } from '@/services/reward.service'
import { toRaw } from 'vue'
import RewardCategoryOptions from './RewardCategoryOptions.vue'
import router from '@/router'
import { useRewardStore } from '@/composables/useRewardStore'

const { isValid, reward } = useRewardStore()

const createReward = async () => {
  if (!isValid.value) return

  const idbRewardId = await create(toRaw(reward.value))
  reward.value.id = Number(idbRewardId)
  const response = await fetch('/api/reward/new', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(toRaw(reward.value)),
  }) // server sync

  const res: { id: number } = await response.json()
  router.push('/reward/' + res.id)
}
</script>

<template>
  <section>
    <h1 class="text-4xl font-bold py-6 text-black">Rewards</h1>

    <form @submit.prevent="createReward">
      <div class="pb-6 flex flex-col gap-4">
        <!-- name -->
        <AppFormLabel label="Reward name" labelId="name">
          <div class="flex items-center gap-2">
            <input
              v-model.trim="reward.name"
              type="text"
              class="mt-1 py-2 md:py-4 px-3 w-full rounded border border-gray-300 shadow text-2xl text-gray-700"
              minlength="3"
              required
            />
            <span class="validation"></span>
          </div>
        </AppFormLabel>
        <!-- points -->
        <AppFormLabel label="Reward points" labelId="points">
          <div class="flex items-center gap-2">
            <input
              v-model.number="reward.points"
              type="number"
              class="mt-1 py-2 md:py-4 px-3 w-full rounded border border-gray-300 shadow text-2xl text-gray-700"
              min="0"
            />
            <span class="validation"></span>
          </div>
        </AppFormLabel>
        <!-- category -->
        <AppFormLabel label="Reward category" labelId="category">
          <RewardCategoryOptions v-model:category="reward.category" />
        </AppFormLabel>
        <!-- date -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <AppFormLabel label="Start from" labelId="validFrom">
            <div class="flex items-center gap-2">
              <input
                v-model="reward.validFrom"
                type="date"
                class="mt-1 py-2 md:py-4 px-3 w-full rounded border border-gray-300 shadow text-2xl text-gray-700"
              />
              <span class="validation"></span>
            </div>
          </AppFormLabel>
          <AppFormLabel label="Until" labelId="validUntil">
            <div class="flex items-center gap-2">
              <input
                v-model="reward.validUntil"
                type="date"
                class="mt-1 py-2 md:py-4 px-3 w-full rounded border border-gray-300 shadow text-2xl text-gray-700"
              />
              <span class="validation"></span>
            </div>
          </AppFormLabel>
        </div>
        <!-- description -->
        <AppFormLabel label="Description" labelId="description">
          <textarea
            v-model="reward.description"
            rows="6"
            class="resize-none mt-1 py-2 md:py-4 px-3 w-full rounded border border-gray-300 shadow text-2xl text-gray-700"
          />
        </AppFormLabel>
        <AppFormLabel label="Image URL" labelId="imageUrl">
          <div class="flex items-center gap-2">
            <input
              v-model="reward.imageUrl"
              type="text"
              class="mt-1 py-2 md:py-4 px-3 w-full rounded border border-gray-300 shadow text-2xl text-gray-700"
            />
            <span class="validation"></span>
          </div>
        </AppFormLabel>
        <div class="h-56 w-full">
          <img
            v-if="reward.imageUrl"
            :src="reward.imageUrl"
            alt="Reward Image"
            class="object-contain md:object-cover"
          />
        </div>
      </div>
      <AppButton :bg-color="isValid ? 'green' : 'gray'" @on-click="createReward">Create</AppButton>
    </form>
  </section>
</template>
