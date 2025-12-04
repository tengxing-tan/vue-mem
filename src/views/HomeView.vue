<script setup lang="ts">
import { onMounted, ref } from 'vue'
import type { RewardModel } from '@/models/reward.model'
import RewardsBrowse from './client/RewardsBrowse.vue'
import RewardItem from './client/RewardItem.vue'
import { useMemberPhoneNoStore } from '@/composables/useMemberPhoneNoStore'
import PhoneNo from './client/PhoneNo.vue'

const base = import.meta.env.VITE_API_BASE || ''
const selectItem = ref<RewardModel | null>(null)

const { getMemberPhoneNo } = useMemberPhoneNoStore()
const phoneNo = ref(getMemberPhoneNo())
const points = ref<number>(0)
const isShowPhoneNo = ref(false)

const rewards = ref<RewardModel[]>([])
onMounted(async () => {
  const res = await fetch(base + '/api/rewards')
  if (!res.ok) throw new Error(`Request failed: ${res.status}`)
  rewards.value = await res.json()

  if (phoneNo.value) {
    fetchMemberPoints()
  }
})

const fetchMemberPoints = async () => {
  const res2 = await fetch(base + '/api/member/points?phoneNo=' + phoneNo.value)
  if (!res2.ok) throw new Error(`Request failed: ${res2.status}`)
  points.value = (await res2.json()) ?? 0
}

const onPhoneNoFound = (phoneNoValue: string, memberPointsValue: number) => {
  phoneNo.value = phoneNoValue
  points.value = memberPointsValue || 0
}

const backHome = () => {
  selectItem.value = null

  if (!phoneNo.value) {
    phoneNo.value = getMemberPhoneNo()
  }

  if (!points.value && phoneNo.value) {
    fetchMemberPoints()
  }
}
</script>

<template>
  <section class="text-lg">
    <div
      class="flex items-center gap-2 font-sans font-semibold text-md text-zinc-900 border-b-2 border-zinc-200"
    >
      <img src="/img/amigos/amigos-logo.jpg" alt="" class="w-20 h-20 rounded-full" />
      <h1 class="text-zinc-800">Amigos Chinese $ Western Cafe</h1>
    </div>
    <p v-show="phoneNo" class="p-2 text-zinc-600 border-b">
      🍄 You have <span class="font-semibold">{{ points }}</span> points.
    </p>

    <button
      v-show="!phoneNo"
      @click="isShowPhoneNo = !isShowPhoneNo"
      class="text-zinc-700 p-2 border-b w-full text-left"
    >
      📱View your points
    </button>
    <PhoneNo
      v-show="isShowPhoneNo"
      @phone-no-found="onPhoneNoFound"
      @close="isShowPhoneNo = false"
    />
    <RewardItem
      v-if="selectItem"
      :reward="selectItem"
      :memberPoints="points"
      @back-home="backHome"
      class="my-6"
    />
    <RewardsBrowse v-else :rewards="rewards" @select-item="selectItem = $event" />
  </section>
</template>
