<script setup lang="ts">
import AppButton from '@/components/AppButton.vue'
import AppFormLabel from '@/components/AppFormLabel.vue'
import { computed, ref } from 'vue'
import { useClientStore } from './useClientStore'
import type { MemberGet } from '@/models/member-get.model'
import { useMemberPhoneNoStore } from '@/composables/useMemberPhoneNoStore'

const emit = defineEmits<{
  (e: 'phone-no-found', value: string, memberPoints: number): void
  (e: 'close', value: null): void
}>()

const { setMemberPhoneNo } = useMemberPhoneNoStore()
const { findPhoneNo } = useClientStore()

const phoneNo = ref('')
const isPhoneNoValid = computed(() => /^\d{2,15}$/.test(phoneNo.value))
const resultMessage = ref('')
const cookieSet = ref(false)

const onSubmit = async () => {
  if (!isPhoneNoValid.value) return
  resultMessage.value = ''

  const member: MemberGet = await findPhoneNo(phoneNo.value)
  if (!member || member.isDeleted) {
    resultMessage.value = '❌ Please register at the counter.'
    return
  }

  setMemberPhoneNo(member.phoneNo)
  resultMessage.value = '✅ OK. You can redeem now!'
  emit('phone-no-found', member.phoneNo, member.points || 0)
  cookieSet.value = true
}
</script>

<template>
  <div class="p-6">
    <form @submit.prevent="onSubmit">
      <AppFormLabel label="Phone No" labelId="phoneNo">
        <div class="flex items-center gap-2">
          <input
            v-model="phoneNo"
            @input="resultMessage = ''"
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
      <p v-show="isPhoneNoValid && resultMessage !== ''" class="text-zinc-700 font-semibold">
        {{ resultMessage }}
      </p>
      <div class="py-6 flex items-center gap-4">
        <AppButton v-show="!cookieSet" type="submit" :bgColor="isPhoneNoValid ? 'amber' : 'zinc'">
          Find
        </AppButton>
        <AppButton type="button" @onClick="() => emit('close', null)"> Close </AppButton>
      </div>
    </form>
  </div>
</template>
