<script setup lang="ts">
import AppBadge from '@/components/AppBadge.vue'
import AppButton from '@/components/AppButton.vue'
import AppFormLabel from '@/components/AppFormLabel.vue'
import { useMemberStore } from '@/views/member/useMemberStore'
import { defineAsyncComponent, onMounted, ref } from 'vue'
import { dateFormat } from '@/composables/useAppFormatterStore'
import type { MemberModel } from '@/models/member.model'

const props = defineProps<{
  phoneNo: string
}>()

const MemberUpdate = defineAsyncComponent(() => import('./MemberUpdate.vue'))

const member = ref<MemberModel | undefined>(undefined)
const showMemberUpdate = ref(false)

onMounted(async () => {
  member.value = await useMemberStore().findMemberInIdb(props.phoneNo)
})
</script>
<template>
  <section v-if="!showMemberUpdate">
    <h1 class="text-4xl font-bold py-6 text-black">Member Details</h1>

    <div v-if="member" class="pb-6 flex flex-col gap-4">
      <AppFormLabel label="Name" labelId="name">
        <p class="mt-1 py-2 md:py-4 px-3 w-full text-2xl font-semibold text-gray-700">
          {{ member.name }}
          <AppBadge v-if="member.isDeleted" color="red">Deleted</AppBadge>
        </p>
      </AppFormLabel>
      <AppFormLabel label="Phone No" labelId="phoneNo">
        <p class="mt-1 py-2 md:py-4 px-3 w-full text-2xl font-semibold text-gray-700">
          {{ member.phoneNo }}
        </p>
      </AppFormLabel>
      <AppFormLabel label="Points" labelId="points">
        <p class="mt-1 py-2 md:py-4 px-3 w-full text-2xl font-semibold text-gray-700">
          {{ member.points }}
        </p>
      </AppFormLabel>
      <AppFormLabel label="Joined since" labelId="createdAt">
        <p class="mt-1 py-2 md:py-4 px-3 w-full text-2xl font-semibold text-gray-700">
          {{ dateFormat(member.createdAt) }}
        </p>
      </AppFormLabel>

      <div class="space-x-4">
        <AppButton bg-color="green" @on-click="showMemberUpdate = true">Update</AppButton>
        <RouterLink to="/members">
          <AppButton>Back</AppButton>
        </RouterLink>
      </div>
    </div>

    <div v-else>
      <p>No member found with phone number: {{ phoneNo }}</p>
    </div>
  </section>
  <section v-else>
    <MemberUpdate v-if="member" :member="member" @updated="showMemberUpdate = false" />
  </section>
</template>
