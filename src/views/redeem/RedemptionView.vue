<script setup lang="ts">
import AppTable from '@/components/AppTable.vue'
import { useApiStore } from '@/composables/useApiStore'
import { onMounted, ref } from 'vue'

interface RedemptionModel {
  phoneNo: string
  rewardId: number
  status: string
  createdAt: string
}

const redemptions = ref<RedemptionModel[]>([])

const headers = ['Phone No', 'Reward', 'Status', 'Requested At']
const { getAction } = useApiStore()
const getPendingRedemptions = async () => {
  const response = await getAction('/redemptions/pending')
  redemptions.value = await response.json()
}

onMounted(async () => {
  await getPendingRedemptions()
})
</script>

<template>
  <section>
    <div class="flex justify-between items-center">
      <h1 class="text-4xl font-bold py-6 text-black">All Members</h1>
      <RouterLink to="/member/create">
        <AppButton bgColor="yellow">Add Member</AppButton>
      </RouterLink>
    </div>

    <AppTable :headers="headers">
      <tr
        v-for="redemption in redemptions"
        :key="redemption.rewardId"
        class="*:text-gray-900 *:first:sticky *:first:left-0 *:first:bg-white *:first:font-medium"
      >
        <td class="px-3 py-2 whitespace-nowrap">{{ redemption.phoneNo }}</td>
        <td class="px-3 py-2 whitespace-nowrap">{{ redemption.rewardId }}</td>
        <td class="px-3 py-2 whitespace-nowrap">{{ redemption.status }}</td>
      </tr>
    </AppTable>
  </section>
</template>
