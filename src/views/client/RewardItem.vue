<script setup lang="ts">
import { useMemberPhoneNoStore } from '@/composables/useMemberPhoneNoStore'
import type { RewardModel } from '@/models/reward.model'
import { ref } from 'vue'
import PhoneNo from './PhoneNo.vue'
import AppModal from '@/components/AppModal.vue'
import { useClientStore } from './useClientStore'
import { RedemptionStatus } from '@/enums/RedemptionStatus'

const props = defineProps<RewardModel>()
const emit = defineEmits<{
  (e: 'backHome', value: null): void
}>()

const { getMemberPhoneNo } = useMemberPhoneNoStore()
const { requestRedemption } = useClientStore()
const isShowPhoneNo = ref(false)
const redeemed = ref(false)

const onRedeem = async () => {
  const phoneNo = getMemberPhoneNo()
  if (!phoneNo) {
    isShowPhoneNo.value = true
    return
  }

  // proceed to request redeem
  if (!props.id) return
  const bodaoyPayload = {
    rewardId: props.id,
    phoneNo: phoneNo,
    status: RedemptionStatus.Pending,
  }
  const response = await requestRedemption(bodaoyPayload)
  const result: { id?: string } = await response.json()
  if (!result.id) {
    alert('Failed to request redeem. Please try again later.')
  }

  redeemed.value = true
}
</script>

<template>
  <div class="bg-white">
    <AppModal v-show="redeemed" title=" Sent redeem request ✅ " @ok="redeemed = false">
      <p class="text-zinc-700">Please check with counter</p>
    </AppModal>
    <div class="pl-2 align-baseline text-md w-max cursor-pointer" @click="emit('backHome', null)">
      <i class="ri-arrow-left-s-line"></i> Back home
    </div>
    <PhoneNo v-show="isShowPhoneNo" @phone-no-found="onRedeem" />
    <div v-show="!isShowPhoneNo" class="overflow-y-scroll pb-28">
      <img src="/img/amigos/ckickenchopspaghetti.jpg" alt="" class="inset-0 w-full object-cover" />
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
        REQUEST REDEEM
      </button>
    </div>
  </div>
</template>
