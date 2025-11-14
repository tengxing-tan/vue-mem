<script setup lang="ts">
import AppButton from '@/components/AppButton.vue'
import AppFormLabel from '@/components/AppFormLabel.vue'
import { useMemberStore } from '@/composables/useMemberStore'
import type { MemberModel } from '@/models/member.model'
import { onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'

const props = defineProps<{
  member: MemberModel
}>()

const emits = defineEmits<{
  (e: 'updated'): void
}>()

const memberForm = ref({ ...props.member })

const { upsertMember } = useMemberStore()

onMounted(async () => {})

const onSubmitUpdateMember = async () => {
  if (!memberForm.value) return

  await upsertMember({ ...memberForm.value, isDeleted: false }, false)
  emits('updated')
}

const onDelete = async () => {
  if (!memberForm.value) return

  await upsertMember({ ...memberForm.value, isDeleted: true }, false)
  emits('updated')
}
</script>

<template>
  <div>
    <h1 class="text-4xl font-bold py-6 text-black">Update member</h1>

    <form v-if="memberForm" @submit.prevent="onSubmitUpdateMember()">
      <div class="pb-6 flex flex-col gap-4">
        <AppFormLabel label="Name" labelId="name">
          <input
            v-model="memberForm.name"
            type="text"
            class="mt-1 py-2 md:py-4 px-3 w-full rounded border border-gray-300 shadow text-2xl text-gray-700"
            placeholder="Name"
          />
          <ul class="text-gray-400 text-sm list-disc pl-5 mt-1" aria-live="polite">
            <li>No name also fine.</li>
          </ul>
        </AppFormLabel>
        <AppFormLabel label="Phone number" labelId="phoneNo">
          <input
            v-model="memberForm.phoneNo"
            type="text"
            class="opacity-60 mt-1 py-2 md:py-4 px-3 w-full rounded border border-gray-300 shadow text-2xl text-gray-700"
            placeholder="Phone number"
            disabled
          />
          <ul class="text-gray-400 text-sm list-disc pl-5 mt-1" aria-live="polite">
            <li>
              Cannot change phone number,
              <RouterLink to="/member/create" class="underline font-semibold"
                >create new
              </RouterLink>
              one please.
            </li>
          </ul>
        </AppFormLabel>
        <AppFormLabel label="Points" labelId="points">
          <input
            v-model="memberForm.points"
            type="number"
            class="mt-1 py-2 md:py-4 px-3 w-full rounded border border-gray-300 shadow text-2xl text-gray-700"
            placeholder="Points"
          />
        </AppFormLabel>
      </div>

      <div class="flex justify-between items-center">
        <div class="space-x-4">
          <AppButton type="submit" bg-color="green">OK</AppButton>
          <AppButton type="button" @on-click="$emit('updated')">Back</AppButton>
        </div>
        <AppButton v-if="!memberForm.isDeleted" type="button" bg-color="rose" @on-click="onDelete"
          >Delete</AppButton
        >
      </div>
    </form>
    <div v-else>
      <p class="text-sm text-gray-500">Member not found.</p>
      <RouterLink to="/members">Back to members</RouterLink>
    </div>
  </div>
</template>
