<script setup lang="ts">
import { useMemberPhoneNoStore } from '@/composables/useMemberPhoneNoStore'
import type { RewardModel } from '@/models/reward.model'
import { computed, ref } from 'vue'
import PhoneNo from './PhoneNo.vue'
import AppModal from '@/components/AppModal.vue'
import { useClientStore } from './useClientStore'
import { RedemptionStatus } from '@/enums/RedemptionStatus'
import AppButton from '@/components/AppButton.vue'

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
  <div class="h-full">
    <AppModal v-show="redeemed" title=" Sent redeem request ✅ " @ok="redeemed = false">
      <p class="text-zinc-700">Please check with counter</p>
    </AppModal>

    <!-- Back button -->
    <div
      class="pt-4 flex items-center text-md text-zinc-700 w-max cursor-pointer"
      @click="emit('backHome', null)"
    >
      <i class="ri-arrow-left-s-line" style="font-size: 36px"></i>
      <span class="pb-px">Back home</span>
    </div>

    <!-- Phone number input -->
    <PhoneNo
      v-show="isShowPhoneNo"
      @phone-no-found="onPhoneNoFound"
      @close="isShowPhoneNo = false"
    />

    <!-- Reward details -->
    <div
      v-show="!isShowPhoneNo"
      class="flex flex-col justify-center overflow-y-scroll p-4 pb-28 bg-white rounded-md shadow m-4"
    >
      <img
        v-show="reward.imageUrl"
        :src="reward.imageUrl || ''"
        alt=""
        class="object-contain md:object-cover inset-0 w-full max-w-xl mx-auto"
      />
      <div class="w-full max-w-xl mx-auto">
        <h1 class="text-2xl font-semibold font-sans text-zinc-900">{{ props.reward.name }}</h1>
        <p class="text-left text-base text-zinc-700">
          Point: <span class="font-semibold text-zinc-700">{{ reward.points }}</span>
        </p>
        <p class="text-zinc-700 pt-6">
          {{ props.reward.description }}
        </p>
      </div>
    </div>

    <div class="w-full flex justify-center fixed bottom-0 left-0 bg-white py-6">
      <AppButton bg-color="orange" @click="onRedeem">REQUEST REDEEM</AppButton>
    </div>
  </div>
</template>
