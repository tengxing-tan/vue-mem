<script setup lang="ts">
import AppButton from '@/components/AppButton.vue'
import AppFormLabel from '@/components/AppFormLabel.vue'
import { computed, ref } from 'vue'
import { useClientStore } from './useClientStore'
import type { MemberGet } from '@/models/member-get.model'
import { useMemberPhoneNoStore } from '@/composables/useMemberPhoneNoStore'

const { setMemberPhoneNo } = useMemberPhoneNoStore()
const { findPhoneNo } = useClientStore()

const phoneNo = ref('')
const isPhoneNoValid = computed(() => /^\d{2,15}$/.test(phoneNo.value))
const resultMessage = ref('')

const onFind = async () => {
  if (!isPhoneNoValid.value) return

  const member: MemberGet = await findPhoneNo(phoneNo.value)
  if (!member || member.isDeleted) {
    resultMessage.value = '❌ Please register at the counter.'
    return
  }

  setMemberPhoneNo(member.phoneNo)
  resultMessage.value = '✅ OK. You can redeem now!'
}
</script>

<template>
  <div class="p-6">
    <form @submit.prevent="onFind">
      <AppFormLabel label="Phone No" labelId="phoneNo">
        <div class="flex items-center gap-2">
          <input
            v-model="phoneNo"
            type="text"
            class="mt-1 py-2 md:py-4 px-3 w-full rounded-lg border-4 border-gray-300 shadow text-2xl text-gray-700"
            :class="!isPhoneNoValid && 'border-rose-200'"
            autofocus
            minlength="2"
            maxlength="15"
            placeholder="012345678"
            required
          />
          <span class="validation"></span>
        </div>
      </AppFormLabel>
      <div class="py-6 flex items-center gap-4">
        <AppButton type="submit" :bgColor="isPhoneNoValid ? 'amber' : 'zinc'" @onClick="onFind"
          >Find</AppButton
        >
        <p v-show="isPhoneNoValid && resultMessage !== ''" class="text-zinc-700 font-semibold">
          {{ resultMessage }}
        </p>
      </div>
    </form>
  </div>
</template>
