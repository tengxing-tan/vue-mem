<script setup lang="ts">
import AppButton from '@/components/AppButton.vue'
import AppFormLabel from '@/components/AppFormLabel.vue'
import { useMemberGetStore } from '@/composables/useMemberStore'

const props = defineProps<{
  phoneNo: string
}>()

const { setPhoneNoSearchKey, member } = useMemberGetStore()
setPhoneNoSearchKey(props.phoneNo)

function formatMemberDate(value: unknown): string {
  if (!value) return ''
  const d = new Date(value as any)
  if (isNaN(d.getTime())) return ''
  // return d.toUTCString()
  return d.toDateString()
}
</script>
<template>
  <section>
    <h1 class="text-4xl font-bold py-6 text-black">Member Details</h1>

    <div v-if="member" class="pb-6 flex flex-col gap-4">
      <AppFormLabel label="Name" labelId="name">
        <p class="mt-1 py-2 md:py-4 px-3 w-full text-2xl font-semibold text-gray-700">
          {{ member.name }}
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
          {{ formatMemberDate(member.createdAt) }}
        </p>
      </AppFormLabel>

      <div>
        <RouterLink :to="'/member/update/' + member.phoneNo">
          <AppButton bg-color="green">Update Member</AppButton>
        </RouterLink>
      </div>
    </div>

    <div v-else>
      <p>No member found with phone number: {{ phoneNo }}</p>
    </div>
  </section>
</template>
