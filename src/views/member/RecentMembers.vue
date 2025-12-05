<script setup lang="ts">
import AppTable from '@/components/AppTable.vue'
import AppButton from '@/components/AppButton.vue'
import type { MemberModel } from '@/models/member.model'
import { onMounted, ref } from 'vue'
import { getRecentMembers } from '@/services/member.service'
import AppFormLabel from '@/components/AppFormLabel.vue'

const headers = ['Name', 'Phone No', 'Points', 'Updated At']
const showingMembers = ref<MemberModel[]>([])
const limit = ref(20)

const loadRecent = async () => {
  showingMembers.value = await getRecentMembers(limit.value)
}

onMounted(loadRecent)

const routeToMemberRead = (phoneNo: string) => `/member/read/${phoneNo}`
</script>

<template>
  <section>
    <div class="flex justify-between items-center">
      <h1 class="text-4xl font-bold py-6 text-black">Recent Members</h1>
      <div class="space-x-4">
        <AppButton bgColor="blue" @on-click="loadRecent">Refresh</AppButton>
      </div>
    </div>

    <AppFormLabel label="Show last" labelId="limit">
      <div class="flex items-center gap-2">
        <input
          v-model.number="limit"
          type="number"
          min="1"
          class="mt-1 py-2 md:py-4 px-3 w-24 rounded border border-gray-300 shadow text-2xl text-gray-700"
        />
        <span class="text-gray-600">members</span>
      </div>
    </AppFormLabel>

    <AppTable v-if="showingMembers.length > 0" :headers="headers">
      <tr v-for="member in showingMembers" :key="member.phoneNo">
        <td class="px-3 py-2 whitespace-nowrap">
          <RouterLink :to="routeToMemberRead(member.phoneNo)" class="text-gray-900 underline">
            {{ member.name || '—' }}
          </RouterLink>
        </td>
        <td class="px-3 py-2 whitespace-nowrap">
          <RouterLink :to="routeToMemberRead(member.phoneNo)" class="text-gray-900 underline">
            {{ member.phoneNo }}
          </RouterLink>
        </td>
        <td class="px-3 py-2 text-gray-900 whitespace-nowrap">{{ member.points ?? 0 }}</td>
        <td class="px-3 py-2 text-gray-900 whitespace-nowrap">
          {{ member.updatedAt?.toString() }}
        </td>
      </tr>
    </AppTable>
    <p v-else class="text-gray-600">No recent members found.</p>
  </section>
</template>
