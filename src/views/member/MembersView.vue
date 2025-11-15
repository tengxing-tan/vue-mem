<script setup lang="ts">
import AppBadge from '@/components/AppBadge.vue'
import AppButton from '@/components/AppButton.vue'
import AppTable from '@/components/AppTable.vue'
import { useJsonDataStore } from '@/composables/useJsonDataStore'
import { useMemberStore } from '@/views/member/useMemberStore'
import router from '@/router'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { dbPromise } from '@/services/db'
import AppFormLabel from '@/components/AppFormLabel.vue'
import { getCompanyEmail, setCompanyEmail } from '@/services/setting.service'
import type { MemberModel } from '@/models/member.model'

const route = useRoute()
const dumpData = route.query.dump === 'true'
const totalMembers = ref(0)
const showingMembers = ref([] as MemberModel[])
const filter = ref({
  phoneNo: '',
  member: undefined as MemberModel[] | undefined,
})
const companyEmail = ref('')
const headers = ['Name', 'Phone No', 'Points']
const { members, lazyLoadMemberData, upsertMember, loadAllMembers } = useMemberStore()

const routeToMemberRead = (phoneNo: string) => {
  return '/member/read/' + phoneNo
}

onMounted(async () => {
  await lazyLoadMemberData()
  showingMembers.value = members.value
  totalMembers.value = (await dbPromise.getAllKeys('members')).length
  companyEmail.value = (await getCompanyEmail('companyEmail'))?.value.toString() || ''
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

async function handleDumpData() {
  if (!confirm('This will insert 200 dummy members into the database. Continue?')) {
    return
  }

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

const onClickUpload = async () => {
  await setCompanyEmail('companyEmail', companyEmail.value)
  await useJsonDataStore().sendMembersJson(members.value, companyEmail.value)
}
</script>
<template>
  <section v-if="!dumpData">
    <div class="flex justify-between items-center">
      <h1 class="text-4xl font-bold py-6 text-black">All Members</h1>
      <RouterLink to="/member/create">
        <AppButton bgColor="yellow">Add Member</AppButton>
      </RouterLink>
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
      <tr
        v-for="member in showingMembers"
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
  </section>

  <section v-else>
    <h1 class="text-4xl font-bold py-6 text-black">JSON Representation</h1>
    <AppButton bgColor="white" v-if="dumpData" @on-click="handleDumpData">Dump data</AppButton>
    <div class="p-6 my-4 shadow">
      <AppFormLabel label="Company email" labelId="companyEmail">
        <input
          v-model="companyEmail"
          type="email"
          class="mt-1 py-2 md:py-4 px-3 w-full rounded border border-gray-300 shadow text-2xl text-gray-700"
          placeholder="Company email"
          autocomplete="email"
        />

        <ul class="text-gray-400 text-sm list-disc pl-5 mt-1 mb-6" aria-live="polite">
          <li>So I can remember who are your members</li>
        </ul>
        <AppButton bgColor="yellow" @on-click="onClickUpload">Upload</AppButton>
      </AppFormLabel>
    </div>

    <pre>{{ useJsonDataStore().getAllMembersInJson(members) }}</pre>
  </section>
</template>
