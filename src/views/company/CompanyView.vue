<script setup lang="ts">
import AppButton from '@/components/AppButton.vue'
import AppFormLabel from '@/components/AppFormLabel.vue'
import { useCompanyStore } from '@/composables/useCompanyStore'
import { useJsonDataStore } from '@/composables/useJsonDataStore'
import { onMounted, ref } from 'vue'

const companyEmail = ref(useCompanyStore().getCompanyEmail() ?? '')
const companyId = useCompanyStore().getCompanyId() ?? 0
const uploadResultMsg = ref('')

onMounted(() => {
  if (companyEmail.value.length > 0) {
    uploadResultMsg.value = '👍Email loaded.'
  }
})

const onClickUpload = async (): Promise<void> => {
  if (companyId > 0) {
    return
  }

  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(companyEmail.value)
  if (!isEmailValid) {
    uploadResultMsg.value = '📧Please enter a valid email address.'
    return
  }

  try {
    const data = { email: companyEmail.value }
    const result = await useJsonDataStore().postAction('/api/company', data)

    if (isNaN(result.id)) {
      uploadResultMsg.value = '💤Upload failed. Please try again later.'
      return
    }

    useCompanyStore().setCompanyEmail(companyEmail.value)
    useCompanyStore().setCompanyId(result.id)
    uploadResultMsg.value = '👍Upload successful!'
  } catch {
    uploadResultMsg.value = '💤Upload failed. Please try again later.'
  }
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
          <li v-if="uploadResultMsg.length > 0" class="text-base text-gray-600">
            {{ uploadResultMsg }}
          </li>
        </ul>

        <AppButton
          type="submit"
          :bgColor="companyId > 0 ? 'gray' : 'yellow'"
          @on-click="onClickUpload"
          :disabled="companyId > 0"
        >
          Upload</AppButton
        >
      </AppFormLabel>
    </div>
  </section>
</template>
