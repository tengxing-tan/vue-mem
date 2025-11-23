<script setup lang="ts">
import Button from '@/components/AppButton.vue'
import { useMemberFormStore, useMemberStore } from '@/views/member/useMemberStore'
import { initMemberModel } from '@/form-data/initMemberModel'
import router from '@/router'
import AppFormLabel from '@/components/AppFormLabel.vue'
import { ref } from 'vue'

const props = defineProps<{ phoneNo: string }>()
const memberAlreadyExists = ref(false)
const memberForm = ref({ ...initMemberModel, phoneNo: props.phoneNo })

const { phoneNoMaxLength } = useMemberFormStore()
const { findMemberInIdb } = useMemberStore()

async function onPhoneNoChange() {
  memberAlreadyExists.value = !!(await findMemberInIdb(memberForm.value.phoneNo))
}

async function onSubmit() {
  if (memberForm.value.phoneNo.trim() === '') return
  await useMemberStore().upsertMember(memberForm.value, true) // indexedDB sync
  const memberId = await fetch('/api/member/new', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(memberForm.value),
  }) // server sync

  console.log('Created member with ID:', await memberId.text())
  router.push('/members')
}
</script>

<template>
  <section>
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
            @input="onPhoneNoChange"
          />
          <ul class="text-gray-400 text-sm list-disc pl-5 mt-1" aria-live="polite">
            <li v-show="memberAlreadyExists">
              💎
              <RouterLink
                v-if="memberAlreadyExists"
                :to="`/member/read/${memberForm.phoneNo}`"
                class="underline"
              >
                Member
              </RouterLink>
              already exists. It will be <strong>overwritten</strong>.
            </li>
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
      <Button type="submit" :bg-color="memberForm.phoneNo.trim() === '' ? 'gray' : 'green'"
        >Create</Button
      >
    </form>
  </section>
</template>
