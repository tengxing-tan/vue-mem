<script setup lang="ts">
import { useMemberPhoneNoStore } from '@/composables/useMemberPhoneNoStore'
import type { RewardModel } from '@/models/reward.model'
import { ref } from 'vue'

const props = defineProps<RewardModel>()
const emit = defineEmits<{
  (e: 'backHome', value: null): void
}>()

const { getMemberClientPhoneNo, setMemberClientPhoneNo } = useMemberPhoneNoStore()
const isShowPhoneNo = ref(false)

const onRedeem = () => {
  if (!getMemberClientPhoneNo()) {
    isShowPhoneNo.value = true
    return
  }

  setMemberClientPhoneNo('')
}
</script>

<template>
  <div class="bg-white">
    <div class="pl-2 align-baseline text-md w-max cursor-pointer" @click="emit('backHome', null)">
      <i class="ri-arrow-left-s-line"></i> Back home
    </div>
    <div v-show="isShowPhoneNo">ok</div>
    <div v-show="!isShowPhoneNo" class="overflow-y-scroll pb-28">
      <img
        src="/public/img/amigos/ckickenchopspaghetti.jpg"
        alt=""
        class="inset-0 w-full object-cover"
      />
      <div class="py-6 px-4">
        <h1 class="text-2xl font-semibold font-sans text-zinc-900">{{ props.name }}</h1>
        <p class="text-zinc-500">
          <span class="font-semibold text-zinc-800">{{ props.points }}</span> points
        </p>
        <p class="text-zinc-700 pt-6">
          {{ props.description }}
        </p>
      </div>
    </div>

    <div
      class="w-full flex justify-center fixed bottom-0 left-0 bg-white pt-2 pb-6 border-t border-zinc-200"
    >
      <button
        @click="onRedeem"
        class="w-4/5 bg-amber-600 text-white font-bold font-mono py-3 rounded"
      >
        REDEEM NOW
      </button>
    </div>
  </div>
</template>
