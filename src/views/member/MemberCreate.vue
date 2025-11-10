<script setup lang="ts">
import Button from '@/components/AppButton.vue'
import { useMemberAddOrUpdateStore } from '@/composables/useMemberStore'
import { initMemberModel } from '@/form-data/initMemberModel'
import router from '@/router'
import { ref } from 'vue'
import { useMemberFormValidation } from '@/composables/useMemberFormValidation'
import AppFormLabel from '@/components/AppFormLabel.vue'

const props = defineProps<{ phoneNo: string }>()

const memberForm = ref({ ...initMemberModel, phoneNo: props.phoneNo })
const { handleCreateMember } = useMemberAddOrUpdateStore()

const { formErrors, isValid } = useMemberFormValidation(memberForm)

async function onSubmit() {
  if (!isValid.value) return
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
            minlength="2"
            :aria-invalid="formErrors.name.length > 0"
            :class="{ 'border-gray-500': formErrors.name.length }"
          />
          <ul
            v-show="formErrors.name.length"
            class="text-gray-600 text-sm list-disc pl-5 mt-1"
            aria-live="polite"
          >
            <li v-for="e in formErrors.name" :key="e">{{ e }}</li>
          </ul>
        </AppFormLabel>
        <AppFormLabel label="Phone number" labelId="phoneNo">
          <input
            v-model="memberForm.phoneNo"
            type="text"
            class="mt-1 py-2 md:py-4 px-3 w-full rounded border border-gray-300 shadow text-2xl text-gray-700"
            placeholder="Phone number"
            minlength="10"
            maxlength="15"
            :aria-invalid="formErrors.phoneNo.length > 0"
            :class="{ 'border-gray-500': formErrors.phoneNo.length }"
          />
          <ul
            v-show="formErrors.phoneNo.length"
            class="text-gray-800 text-sm list-disc pl-5 mt-1"
            aria-live="polite"
          >
            <li v-for="e in formErrors.phoneNo" :key="e">{{ e }}</li>
          </ul>
        </AppFormLabel>
        <AppFormLabel label="Points" labelId="points">
          <input
            v-model.number="memberForm.points"
            type="number"
            min="0"
            class="mt-1 py-2 md:py-4 px-3 w-full rounded border border-gray-300 shadow text-2xl text-gray-700"
            placeholder="Points"
            :aria-invalid="formErrors.points.length > 0"
            :class="{ 'border-gray-500': formErrors.points.length }"
          />
          <ul
            v-show="formErrors.points.length"
            class="text-gray-800 text-sm list-disc pl-5 mt-1"
            aria-live="polite"
          >
            <li v-for="e in formErrors.points" :key="e">{{ e }}</li>
          </ul>
        </AppFormLabel>
      </div>
      <Button type="submit" :disabled="!isValid" :bg-color="!isValid ? 'white' : 'green'"
        >Create</Button
      >
    </form>
  </div>
</template>
