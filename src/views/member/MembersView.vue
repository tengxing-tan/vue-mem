<script setup lang="ts">
import AppBadge from '@/components/AppBadge.vue'
import AppButton from '@/components/AppButton.vue'
import AppTable from '@/components/AppTable.vue'
import { useMemberStore } from '@/views/member/useMemberStore'
import { onMounted, ref } from 'vue'
import { dbPromise } from '@/services/db'
import AppFormLabel from '@/components/AppFormLabel.vue'
import type { MemberModel } from '@/models/member.model'

const totalMembers = ref(0)
const showingMembers = ref([] as MemberModel[])
const filter = ref({
  phoneNo: '',
  member: undefined as MemberModel[] | undefined,
})
const headers = ['Name', 'Phone No', 'Points']
const { members, lazyLoadMemberData, loadAllMembers } = useMemberStore()

const routeToMemberRead = (phoneNo: string) => {
  return '/member/read/' + phoneNo
}

onMounted(async () => {
  await lazyLoadMemberData()
  showingMembers.value = members.value
  totalMembers.value = (await dbPromise.getAllKeys('members')).length
})

const onPhoneNoChange = async () => {
  filter.value.member = await useMemberStore().filterMembers(filter.value.phoneNo)
  showingMembers.value = filter.value.member ? filter.value.member : members.value
}

const showAll = async () => {
  if (showingMembers.value.length === totalMembers.value) {
    return
  }

  await loadAllMembers()
  showingMembers.value = members.value
}

const refresh = async () => {
  const response = await fetch('/api/member/getAll', { method: 'GET' })
  const fetchedMembers = (await response.json()) as MemberModel[]
  for (const m of fetchedMembers) {
    await useMemberStore().upsertMember(m, false)
  }
  showingMembers.value = members.value = fetchedMembers
}
</script>
<template>
  <section>
    <div class="flex justify-between items-center">
      <h1 class="text-4xl font-bold py-6 text-black">All Members</h1>
      <div class="space-x-4">
        <button @click="refresh" class="p-4 active:underline underline-offset-4">🔃Refresh</button>
        <RouterLink to="/member/create">
          <AppButton bgColor="yellow">Add Member</AppButton>
        </RouterLink>
      </div>
    </div>

    <AppFormLabel label="Phone No" labelId="phoneNo">
      <input
        v-model="filter.phoneNo"
        type="text"
        class="mt-1 py-2 md:py-4 px-3 w-full rounded-lg border-4 border-gray-300 shadow text-2xl text-gray-700"
        @input="onPhoneNoChange"
        autofocus
      />
    </AppFormLabel>

    <!-- Showing 202 / 202 members.  -->
    <p class="pt-2 pb-6 text-sm text-zinc-600 transition">
      Showing {{ showingMembers.length }} / {{ totalMembers }} members.
      <input
        v-show="showingMembers.length !== totalMembers"
        type="button"
        value="Show all"
        class="underline cursor-pointer"
        @click="showAll"
      />
    </p>

    <AppTable v-if="showingMembers.length > 0" :headers="headers">
      <tr v-for="member in showingMembers" :key="member.phoneNo">
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
        <td class="px-3 py-2 text-gray-900 whitespace-nowrap">
          {{ member.points }}
        </td>
      </tr>
    </AppTable>
  </section>
</template>
