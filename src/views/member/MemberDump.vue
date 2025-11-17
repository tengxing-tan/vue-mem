<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { getCompanyEmail, setCompanyEmail } from '@/services/setting.service'
import router from '@/router'
import { useJsonDataStore } from '@/composables/useJsonDataStore'
import { useMemberStore } from './useMemberStore'
import AppButton from '@/components/AppButton.vue'
import AppFormLabel from '@/components/AppFormLabel.vue'

const companyEmail = ref('')
const pendingUpload = ref(false)
const uploadResultMsg = ref('')

const { members, lazyLoadMemberData, upsertMember } = useMemberStore()

onMounted(async () => {
  await lazyLoadMemberData()
  companyEmail.value = (await getCompanyEmail('companyEmail'))?.value.toString() || ''
})

async function handleDumpData() {
  if (!confirm('This will insert 200 dummy members into the database. Continue?')) {
    return
  }

  for (let i = 1; i <= 200; i++) {
    await upsertMember(
      {
        phoneNo: Math.floor(1000000000 + Math.random() * 9000000000).toString(),
        name: '',
        points: i,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      true,
    )
  }
  router.go(0)
}

const onClickUpload = async (): Promise<void> => {
  if (pendingUpload.value) return

  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(companyEmail.value)
  if (!isEmailValid) {
    uploadResultMsg.value = '📧Please enter a valid email address.'
    return
  }

  pendingUpload.value = true
  await setCompanyEmail('companyEmail', companyEmail.value)
  try {
    await useJsonDataStore().sendMembersJson(members.value, companyEmail.value)
  } catch (error) {
    uploadResultMsg.value = '💤Upload failed. Please try again later.'
    console.error('Error uploading members JSON:', error)
    pendingUpload.value = false
    return
  }

  pendingUpload.value = false
  uploadResultMsg.value = '👍Upload successful!'
}
</script>
<template>
  <section>
    <h1 class="text-4xl font-bold py-6 text-black">JSON Representation</h1>
    <AppButton bgColor="white" @on-click="handleDumpData">Dump data</AppButton>
    <div class="p-6 my-4 shadow">
      <AppFormLabel label="Company email" labelId="companyEmail">
        <input
          v-model="companyEmail"
          type="email"
          class="mt-1 py-2 md:py-4 px-3 w-full rounded border border-gray-300 shadow text-2xl text-gray-700"
          placeholder="Company email"
          autocomplete="email"
        />

        <ul class="text-gray-400 text-sm list-disc pl-5 mt-1 mb-6" aria-live="polite">
          <li>So I can remember who are your members</li>
          <li class="text-base text-gray-600">{{ uploadResultMsg }}</li>
        </ul>

        <AppButton bgColor="yellow" @on-click="onClickUpload">
          <span v-if="pendingUpload" class="inline-block absolute left-6 animate-spin"
            ><i class="ri-loader-line"></i
          ></span>
          Upload</AppButton
        >
      </AppFormLabel>
    </div>
    <pre>{{ useJsonDataStore().serializeJsonData(members) }}</pre>
  </section>
</template>
