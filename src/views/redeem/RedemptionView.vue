<script setup lang="ts">
import AppButton from '@/components/AppButton.vue'
import AppTable from '@/components/AppTable.vue'
import { useApiStore } from '@/composables/useApiStore'
import { dateFormat } from '@/composables/useAppFormatterStore'
import type { RedemptionStatus } from '@/enums/RedemptionStatus'
import { onMounted, ref } from 'vue'

interface RedemptionModel {
  redemptionId: number
  phoneNo: string
  rewardId: number
  name: string
  createdAt: string
  status: RedemptionStatus
  points: number
}

const redemptions = ref<RedemptionModel[]>([])
const pendingUpdatedAt = ref<Date>(new Date())

const headers = ['Phone No', 'Reward', 'Requested At']
const { getAction, postAction } = useApiStore()
const getPendingRedemptions = async () => {
  const response = await getAction('/redemptions/pending')
  redemptions.value = await response.json()
  pendingUpdatedAt.value = new Date()
}

const updateRedemption = async (redemption: RedemptionModel, statusUpdate: RedemptionStatus) => {
  await postAction('/redemption/approve', {
    id: redemption.redemptionId,
    status: statusUpdate,
    points: redemption.points,
  })

  redemption.status = statusUpdate
}

onMounted(async () => {
  await getPendingRedemptions()
})
</script>

<template>
  <section>
    <div class="flex justify-between items-center">
      <h1 class="text-4xl font-bold py-6 text-black">Pending</h1>
      <AppButton bgColor="primary" @onClick="getPendingRedemptions">Refresh</AppButton>
    </div>

    <p class="font-semibold text-zinc-600 pl-2 py-4">
      Updated at: {{ pendingUpdatedAt ? pendingUpdatedAt.toLocaleString() : 'Never' }}
    </p>

    <AppTable :headers="headers">
      <tr
        v-for="redemption in redemptions"
        :key="redemption.redemptionId"
        class="text-gray-900 text-xl"
      >
        <td class="py-3 md:py-5 whitespace-nowrap">{{ redemption.phoneNo }}</td>
        <td class="py-3 md:py-5 whitespace-nowrap">{{ redemption.name }}</td>
        <td class="py-3 md:py-5 whitespace-nowrap">{{ dateFormat(redemption.createdAt) }}</td>
        <td class="py-3 md:py-5 whitespace-nowrap space-x-4">
          <AppButton
            v-show="redemption.status === undefined"
            bgColor="green"
            @onClick="updateRedemption(redemption, 1)"
            >Approve</AppButton
          >
          <AppButton
            v-show="!redemption.status"
            bgColor="red"
            @onClick="updateRedemption(redemption, 2)"
            >Reject</AppButton
          >
          <AppButton
            v-show="redemption.status === 1"
            bgColor="blue"
            @onClick="updateRedemption(redemption, 3)"
            >Complete</AppButton
          >
          <p v-show="redemption.status === 2">Rejected 🚫</p>
          <p v-show="redemption.status === 3">Done ✅</p>
        </td>
      </tr>
    </AppTable>

    <p v-show="!redemptions.length" class="text-gray-500 text-xl py-10 text-center">
      No pending redemptions.
    </p>
  </section>
</template>
