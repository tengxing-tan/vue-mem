<script setup lang="ts">
import AppBadge from '@/components/AppBadge.vue'
import AppButton from '@/components/AppButton.vue'
import AppTable from '@/components/AppTable.vue'
// import { useJsonDataStore } from '@/composables/useJsonDataStore'
import { useMemberStore } from '@/views/member/useMemberStore'
import router from '@/router'
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
// const { getAllMembersInJson } = useJsonDataStore()
const headers = ['Name', 'Phone No', 'Points']
const { members, lazyLoadMemberData, upsertMember } = useMemberStore()

const routeToMemberRead = (phoneNo: string) => {
  return '/member/read/' + phoneNo
}

onMounted(() => {
  lazyLoadMemberData()
})

async function dumpData() {
  for (let i = 1; i <= 200; i++) {
    await upsertMember(
      {
        phoneNo: Math.floor(1000000000 + Math.random() * 9000000000).toString(),
        name: '',
        points: i,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      true,
    )
  }
  router.go(0)
}
</script>
<template>
  <section>
    <div class="flex justify-between items-center">
      <h1 class="text-4xl font-bold py-6 text-black">All Members</h1>
      <RouterLink to="/member/create">
        <AppButton bgColor="yellow">Add Member</AppButton>
      </RouterLink>
    </div>
    <AppButton bgColor="yellow" v-if="route.query.dump === 'true'" @on-click="dumpData"
      >Dump data</AppButton
    >
    <p class="pb-6">Total members: {{ members.length }}</p>

    <AppTable v-if="members.length > 0" :headers="headers">
      <tr
        v-for="member in members"
        :key="member.phoneNo"
        class="*:text-gray-900 *:first:sticky *:first:left-0 *:first:bg-white *:first:font-medium"
      >
        <td class="px-3 py-2 whitespace-nowrap">
          <RouterLink
            :to="routeToMemberRead(member.phoneNo)"
            class="flex items-center gap-2 text-gray-900 hover:bg-transparent"
          >
            <span class="underline">{{ member.name }} </span>
            <AppBadge v-if="member.isDeleted" color="red">Deleted</AppBadge>
          </RouterLink>
        </td>
        <td class="px-3 py-2 whitespace-nowrap">
          <RouterLink
            :to="routeToMemberRead(member.phoneNo)"
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
