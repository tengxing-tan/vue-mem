<script setup lang="ts">
import AppBadge from '@/components/AppBadge.vue'
import Button from '@/components/AppButton.vue'
import AppTable from '@/components/AppTable.vue'
import { useJsonDataStore } from '@/composables/useJsonDataStore'
import { useMemberInitStore } from '@/composables/useMemberStore'

const { members } = useMemberInitStore()
const { getAllMembersInJson } = useJsonDataStore()
const headers = ['Name', 'Phone No', 'Points']
// const rows = members.map(member => ({
//   name: member.name,
//   phoneNo: member.phoneNo,
//   points: member.points,
//   isDeleted: member.isDeleted ? 'Yes' : 'No',
// }))

const routeToUpdateMember = (phoneNo: string) => {
  return '/member/update/' + phoneNo
}
</script>
<template>
  <section>
    <div class="flex justify-between items-center">
      <h1 class="text-4xl font-bold py-6 text-black">All Members</h1>
      <RouterLink to="/member/create">
        <Button bgColor="yellow">Add Member</Button>
      </RouterLink>
    </div>

    <AppTable :headers="headers" :rows="members" baseUrl="/member/update/" queryParam="phoneNo">
      <tr
        v-for="member in members"
        :key="member.phoneNo"
        class="*:text-gray-900 *:first:sticky *:first:left-0 *:first:bg-white *:first:font-medium"
      >
        <td class="px-3 py-2 whitespace-nowrap">
          <RouterLink
            :to="routeToUpdateMember(member.phoneNo)"
            class="flex items-center gap-2 text-gray-900 hover:bg-transparent"
          >
            <span class="underline">{{ member.name }} </span>
            <AppBadge v-if="member.isDeleted" color="red">Deleted</AppBadge>
          </RouterLink>
        </td>
        <td class="px-3 py-2 whitespace-nowrap">
          <RouterLink
            :to="routeToUpdateMember(member.phoneNo)"
            class="text-gray-900 underline hover:bg-transparent"
          >
            {{ member.phoneNo }}
          </RouterLink>
        </td>
        <td class="px-3 py-2 whitespace-nowrap">
          {{ member.points }}
        </td>
      </tr>
    </AppTable>
    <!---
    <h1>JSON Representation</h1>
    <pre>{{ getAllMembersInJson() }}</pre>
  --></section>
</template>
