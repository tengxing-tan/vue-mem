<script setup lang="ts">
import AppButton from '@/components/AppButton.vue'
import AppFormLabel from '@/components/AppFormLabel.vue'
import { useApiStore } from '@/composables/useApiStore'
import { useCompanyStore } from '@/composables/useCompanyStore'
import router from '@/router'
import { onMounted, ref } from 'vue'

type GetCompanyPayload = {
  email: string
}

type GetCompanyResponse = {
  id: number
}

const companyEmail = ref(useCompanyStore().getCompanyEmail() ?? '')
const companyId = useCompanyStore().getCompanyId() ?? 0
const uploadResultMsg = ref('')
const { postAction } = useApiStore()

onMounted(() => {
  if (companyEmail.value.length > 0) {
    uploadResultMsg.value = '👍Email loaded.'
  }
})

const onSubmit = async (): Promise<void> => {
  if (companyId > 0) {
    return
  }

  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(companyEmail.value)
  if (!isEmailValid) {
    uploadResultMsg.value = '📧Please enter a valid email address.'
    return
  }

  try {
    const data: GetCompanyPayload = { email: companyEmail.value }
    const response = await postAction('/company/id', data)
    const result = (await response.json()) as GetCompanyResponse

    if (!result || isNaN(result.id)) {
      uploadResultMsg.value = '💤Not found.'
      return
    }

    useCompanyStore().setCompanyEmail(companyEmail.value)
    useCompanyStore().setCompanyId(result.id)
    uploadResultMsg.value = '👍Login successful! Please refresh page.'
  } catch {
    uploadResultMsg.value = '💤Login failed. Please try again later.'
  }
}
</script>

<template>
  <section>
    <h1 class="text-4xl font-bold py-6 text-black">Company</h1>
    <form @submit.prevent="onSubmit" class="p-6 my-4 shadow">
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
          <li v-if="uploadResultMsg.length > 0" class="text-base text-gray-600">
            {{ uploadResultMsg }}
          </li>
        </ul>

        <div class="space-x-4">
          <AppButton
            type="submit"
            :bgColor="companyId > 0 ? 'gray' : 'yellow'"
            :disabled="companyId > 0"
          >
            Login</AppButton
          >

          <AppButton v-show="uploadResultMsg.length > 0" @on-click="() => router.go(0)"
            >Refresh</AppButton
          >
        </div>
      </AppFormLabel>
    </form>
  </section>
</template>
