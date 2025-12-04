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
      class="bg-white border border-zinc-200 p-4 rounded-lg"
    >
      <div class="mb-2" @click="emit('selectItem', reward)">
        <div class="h-fit w-full grid place-items-center aspect-square">
          <img
            v-if="reward.imageUrl"
            :src="
              reward.imageUrl ||
              'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&amp;fit=crop&amp;q=80&amp;w=1160'
            "
            alt=""
            class="h-48 md:h-56 w-full object-contain md:object-cover"
          />
          <i v-else class="ri-gift-line text-zinc-400 text-5xl"></i>
        </div>
        <p class="h-20 overflow-clip text-zinc-700 text-left text-lg/6 font-semibold font-sans">
          {{ reward.name }}
        </p>
        <p class="text-left text-zinc-700">
          <span class="font-semibold text-zinc-700">{{ reward.points }}</span> points
        </p>
      </div>
    </div>
  </div>
</template>
