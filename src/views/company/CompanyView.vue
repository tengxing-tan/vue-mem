<script setup lang="ts">
import AppButton from '@/components/AppButton.vue'
import AppFormLabel from '@/components/AppFormLabel.vue'
import { useCompanyStore } from '@/composables/useCompanyStore'
import { useJsonDataStore } from '@/composables/useJsonDataStore'
import { ref } from 'vue'

const companyEmail = ref('')
const uploadResultMsg = ref('')

const onClickUpload = async (): Promise<void> => {
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(companyEmail.value)
  if (!isEmailValid) {
    uploadResultMsg.value = '📧Please enter a valid email address.'
    return
  }

  const data = { email: companyEmail.value }
  const result = await useJsonDataStore().postAction('/api/company', data)
  if (isNaN(result.id)) {
    uploadResultMsg.value = '💤Upload failed. Please try again later.'
    return
  }

  useCompanyStore().setCompanyEmail(companyEmail.value)
  useCompanyStore().setCompanyId(result.id)
  uploadResultMsg.value = '👍Upload successful!'
}
</script>

<template>
  <section>
    <h1 class="text-4xl font-bold py-6 text-black">Company</h1>
    <div class="p-6 my-4 shadow">
      <AppFormLabel label="Company email" labelId="companyEmail">
        <input
          v-model="companyEmail"
          type="email"
          class="mt-1 py-2 md:py-4 px-3 w-full rounded border border-gray-300 shadow text-2xl text-gray-700"
          placeholder="Company email"
          autocomplete="email"
          autofocus
        />

        <ul class="text-gray-400 text-sm list-disc pl-5 mt-1 mb-6" aria-live="polite">
          <li>So I can remember who are your members</li>
          <li class="text-base text-gray-600">{{ uploadResultMsg }}</li>
        </ul>

        <AppButton type="submit" bgColor="yellow" @on-click="onClickUpload"> Upload</AppButton>
      </AppFormLabel>
    </div>
  </section>
</template>
