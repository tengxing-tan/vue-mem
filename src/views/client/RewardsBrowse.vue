<script setup lang="ts">
import type { RewardModel } from '@/models/reward.model'
const props = defineProps<{ rewards: RewardModel[] }>()
const emit = defineEmits<{
  (e: 'selectItem', value: RewardModel): void
}>()
</script>

<template>
  <div class="px-2 pt-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 mb-12">
    <div
      v-for="reward in props.rewards"
      :key="reward.id"
      class="border border-zinc-200 p-4 rounded-lg"
    >
      <div class="block mb-2 max-w-fit" @click="emit('selectItem', reward)">
        <img
          src="/src/img/amigos/ckickenchopspaghetti.jpg"
          alt=""
          class="inset-0 w-full h-fit object-cover"
        />
        <p class="h-20 overflow-clip text-left text-lg/6 font-semibold font-sans">
          {{ reward.name }}
        </p>
        <p class="text-left">
          <span class="font-semibold">{{ reward.points }}</span> points
        </p>
      </div>
    </div>
  </div>
</template>
