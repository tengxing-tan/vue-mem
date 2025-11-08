<script setup lang="ts">
import Button from '@/components/AppButton.vue'
import AppFormLabel from '@/components/AppFormLabel.vue'
import { useMemberAddOrUpdateStore, useMemberGetStore } from '@/composables/useMemberStore'
import type { MemberModel } from '@/models/member.model'
import router from '@/router'
import { ref } from 'vue'
import { useMemberFormValidation } from '@/composables/useMemberFormValidation'
import { RouterLink } from 'vue-router'

const props = defineProps<{
  phoneNo: string
}>()

const { setPhoneNoSearchKey, member } = useMemberGetStore()
setPhoneNoSearchKey(props.phoneNo)

const memberForm = ref({ ...member })
const initMemberForm = (member: MemberModel | undefined) => {
  memberForm.value = member
  return !!member
}

const { handleUpdateMember } = useMemberAddOrUpdateStore()
const { formErrors, isValid } = useMemberFormValidation(memberForm)

const onSubmitUpdateMember = async () => {
  if (!memberForm.value || !isValid.value) return

  await handleUpdateMember(memberForm.value)
  router.push('/member/read/' + memberForm.value.phoneNo)
}

const onActivateOrDelete = async () => {
  if (!memberForm.value) return

  await handleUpdateMember({ ...memberForm.value, isDeleted: !memberForm.value.isDeleted })
  router.push('/members')
}
</script>

<template>
  <div>
    <h1 class="text-4xl font-bold py-6 text-black">Update member</h1>

    <form v-if="initMemberForm(member) && memberForm" @submit.prevent="onSubmitUpdateMember()">
      <div class="pb-6 flex flex-col gap-4">
        <AppFormLabel label="Name" labelId="name">
          <input
            v-model="memberForm.name"
            type="text"
            class="mt-1 py-2 md:py-4 px-3 w-full rounded border border-gray-300 shadow text-2xl"
            placeholder="Name"
            :aria-invalid="formErrors.name.length > 0"
            :class="{ 'border-gray-500': formErrors.name.length }"
          />
          <ul
            v-show="formErrors.name.length"
            class="text-gray-600 text-xs list-disc pl-5 mt-1"
            aria-live="polite"
          >
            <li v-for="e in formErrors.name" :key="e">{{ e }}</li>
          </ul>
        </AppFormLabel>
        <AppFormLabel label="Phone number" labelId="phoneNo">
          <input
            v-model="memberForm.phoneNo"
            type="text"
            class="mt-1 py-2 md:py-4 px-3 w-full rounded border border-gray-300 shadow text-2xl"
            placeholder="Phone number"
            disabled
            :aria-invalid="formErrors.phoneNo.length > 0"
            :class="{ 'border-gray-500': formErrors.phoneNo.length }"
          />
          <ul
            v-show="formErrors.phoneNo.length"
            class="text-gray-600 text-xs list-disc pl-5 mt-1"
            aria-live="polite"
          >
            <li v-for="e in formErrors.phoneNo" :key="e">{{ e }}</li>
          </ul>
        </AppFormLabel>
        <AppFormLabel label="Points" labelId="points">
          <input
            v-model="memberForm.points"
            type="number"
            class="mt-1 py-2 md:py-4 px-3 w-full rounded border border-gray-300 shadow text-2xl"
            placeholder="Points"
            :aria-invalid="formErrors.points.length > 0"
            :class="{ 'border-gray-500': formErrors.points.length }"
          />
          <ul
            v-show="formErrors.points.length"
            class="text-gray-600 text-xs list-disc pl-5 mt-1"
            aria-live="polite"
          >
            <li v-for="e in formErrors.points" :key="e">{{ e }}</li>
          </ul>
        </AppFormLabel>
      </div>

      <div class="flex gap-4">
        <Button type="submit" bg-color="green" :disabled="!isValid">✒️OK</Button>
        <Button
          type="button"
          :bg-color="memberForm.isDeleted ? 'white' : 'rose'"
          @on-click="onActivateOrDelete"
          >{{ memberForm.isDeleted ? '🟢Activate' : '🔴Delete' }}</Button
        >
      </div>
    </form>
    <div v-else>
      <p class="text-sm text-gray-500">Member not found.</p>
      <RouterLink to="/members">Back to members</RouterLink>
    </div>
  </div>
</template>
