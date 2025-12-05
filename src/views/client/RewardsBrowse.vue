<script setup lang="ts">
import type { RewardModel } from '@/models/reward.model'
const props = defineProps<{ rewards: RewardModel[] }>()
const emit = defineEmits<{
  (e: 'selectItem', value: RewardModel): void
}>()
</script>

<template>
  <section class="h-full">
    <div class="px-4 grid grid-cols-1 gap-2 mb-12">
      <div
        v-for="reward in props.rewards"
        :key="reward.id"
        class="mb-2 bg-white border border-zinc-200 p-4 rounded-lg shadow h-min"
        @click="emit('selectItem', reward)"
      >
        <div
          v-show="reward.imageUrl && reward.imageUrl.length > 0"
          class="h-fit w-full grid place-items-center aspect-square"
        >
          <img
            :src="reward.imageUrl ?? ''"
            alt=""
            class="h-48 md:h-56 w-full object-contain md:object-cover"
          />
        </div>
        <p class="text-zinc-700 text-left text-lg font-semibold font-sans">
          {{ reward.name }}
        </p>
        <p class="text-left text-base text-zinc-700">
          Point: <span class="font-semibold text-zinc-700">{{ reward.points }}</span>
        </p>
      </div>
    </div>
  </section>
</template>
