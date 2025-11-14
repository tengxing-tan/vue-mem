<script setup lang="ts">
import Button from '@/components/AppButton.vue'
import { useMemberAddOrUpdateStore, useMemberFormStore } from '@/composables/useMemberStore'
import { initMemberModel } from '@/form-data/initMemberModel'
import router from '@/router'
import { ref } from 'vue'
import AppFormLabel from '@/components/AppFormLabel.vue'

const props = defineProps<{ phoneNo: string }>()
const { phoneNoMaxLength } = useMemberFormStore()

const memberForm = ref({ ...initMemberModel, phoneNo: props.phoneNo })
const { handleCreateMember } = useMemberAddOrUpdateStore()

async function onSubmit() {
  await handleCreateMember(memberForm.value)
  router.push('/members')
}
</script>

<template>
  <div>
    <h1 class="text-4xl font-bold py-6 text-black">Create member</h1>
    <form @submit.prevent="onSubmit">
      <div class="pb-6 flex flex-col gap-4">
        <AppFormLabel label="Name" labelId="name">
          <input
            v-model="memberForm.name"
            type="text"
            class="mt-1 py-2 md:py-4 px-3 w-full rounded border border-gray-300 shadow text-2xl text-gray-700"
            placeholder="Name"
            minlength="0"
            maxlength="100"
          />
          <ul class="text-gray-400 text-sm list-disc pl-5 mt-1" aria-live="polite">
            <li>No name also fine.</li>
          </ul>
        </AppFormLabel>
        <AppFormLabel label="Phone number" labelId="phoneNo">
          <input
            v-model="memberForm.phoneNo"
            type="text"
            class="mt-1 py-2 md:py-4 px-3 w-full rounded border border-gray-300 shadow text-2xl text-gray-700"
            placeholder="Phone number"
            minlength="1"
            :maxlength="phoneNoMaxLength"
          />
          <ul class="text-gray-400 text-sm list-disc pl-5 mt-1" aria-live="polite">
            <li>
              Length: {{ memberForm.phoneNo.length }} / {{ phoneNoMaxLength }}
              <span v-show="memberForm.phoneNo.length >= 10">👍</span>
            </li>
          </ul>
        </AppFormLabel>
        <AppFormLabel label="Points" labelId="points">
          <input
            v-model.number="memberForm.points"
            type="number"
            min="0"
            class="mt-1 py-2 md:py-4 px-3 w-full rounded border border-gray-300 shadow text-2xl text-gray-700"
            placeholder="Points"
          />
        </AppFormLabel>
      </div>
      <Button type="submit" bg-color="green">Create</Button>
    </form>
  </div>
</template>
