<script setup lang="ts">
import { useMemberPhoneNoStore } from '@/composables/useMemberPhoneNoStore'
import type { RewardModel } from '@/models/reward.model'
import { computed, ref } from 'vue'
import PhoneNo from './PhoneNo.vue'
import AppModal from '@/components/AppModal.vue'
import { useClientStore } from './useClientStore'
import { RedemptionStatus } from '@/enums/RedemptionStatus'

const props = defineProps<{ reward: RewardModel; memberPoints: number }>()
const emit = defineEmits<{
  (e: 'backHome', value: null): void
}>()

const { getMemberPhoneNo } = useMemberPhoneNoStore()
const { requestRedemption } = useClientStore()
const isShowPhoneNo = ref(false)
const redeemed = ref(false)
const phoneNo = ref(getMemberPhoneNo())
const memberPoints = ref(props.memberPoints)

const nonRedeemable = computed(() => {
  if (!phoneNo.value) return false
  return !!phoneNo.value && memberPoints.value < props.reward.points
})

const onPhoneNoFound = (phoneNoValue: string, memberPointsValue: number) => {
  phoneNo.value = phoneNoValue
  memberPoints.value = memberPointsValue || 0
}

const onRedeem = async () => {
  if (nonRedeemable.value) return

  if (!phoneNo.value) {
    isShowPhoneNo.value = true
    return
  }

  // proceed to request redeem
  if (!props.reward.id) return
  const bodyPayload = {
    rewardId: props.reward.id,
    phoneNo: phoneNo.value,
    status: RedemptionStatus.Pending,
  }
  const response = await requestRedemption(bodyPayload)
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
    <div
      class="flex items-center text-md text-zinc-700 w-max cursor-pointer"
      @click="emit('backHome', null)"
    >
      <i class="ri-arrow-left-s-line" style="font-size: 36px"></i>
      <span>Back home</span>
    </div>
    <PhoneNo
      v-show="isShowPhoneNo"
      @phone-no-found="onPhoneNoFound"
      @close="isShowPhoneNo = false"
    />
    <div v-show="!isShowPhoneNo" class="justify-center overflow-y-scroll pb-28">
      <img
        v-show="reward.imageUrl"
        :src="reward.imageUrl || ''"
        alt=""
        class="object-contain md:object-cover inset-0 w-full max-w-xl mx-auto"
      />
      <div class="py-6 px-4 w-full max-w-xl mx-auto">
        <h1 class="text-2xl font-semibold font-sans text-zinc-900">{{ props.reward.name }}</h1>
        <p class="text-zinc-500">
          <span class="font-semibold text-zinc-800">{{ props.reward.points }}</span> points
        </p>
        <p class="text-zinc-700 pt-6">
          {{ props.reward.description }}
        </p>
      </div>
    </div>

    <div
      class="w-full flex justify-center fixed bottom-0 left-0 bg-white pt-2 pb-6 border-t border-zinc-200"
    >
      <button
        @click="onRedeem"
        class="w-4/5 bg-amber-600 text-white font-bold font-mono py-3 rounded max-w-xl"
        :class="{ 'opacity-60': nonRedeemable }"
        :disabled="nonRedeemable"
      >
        REQUEST REDEEM
      </button>
    </div>
  </div>
</template>
