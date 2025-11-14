<script setup lang="ts">
import AppButton from '@/components/AppButton.vue'
import AppFormLabel from '@/components/AppFormLabel.vue'
import AppModal from '@/components/AppModal.vue'
import { useMemberStore } from '@/composables/useMemberStore'
import type { MemberModel } from '@/models/member.model'
import { ref } from 'vue'

const memberPhoneNo = ref('')
const addPoints = ref('')
const member = ref<MemberModel | undefined>()
const showModal = ref(false)

async function onPhoneNoChange() {
  member.value = await useMemberStore().findMemberInIdb(memberPhoneNo.value)
}

const { upsertMember } = useMemberStore()
function onAddPoints() {
  if (!member.value) return
  const pointsToAdd = parseInt(addPoints.value)
  if (isNaN(pointsToAdd) || pointsToAdd <= 0) return
  member.value.points += pointsToAdd
  upsertMember(member.value, false)
  showModal.value = true
}

function selectAll(event: FocusEvent) {
  const target = event.target as HTMLInputElement
  target.select()
}
</script>
<template>
  <section>
    <AppModal v-show="showModal" title="🍄 Points Added " @ok="showModal = false">
      <div class="text-8xl text-emerald-400 w-full grid place-content-center"></div>
    </AppModal>

    <h1 class="text-4xl font-bold py-6 text-black">Add Points</h1>
    <div class="pb-6 flex flex-col gap-4">
      <AppFormLabel label="Phone No" labelId="phoneNo">
        <input
          v-model="memberPhoneNo"
          @focus="selectAll"
          type="text"
          class="mt-1 py-2 md:py-4 px-3 w-full rounded-lg border-4 border-gray-300 shadow text-2xl text-gray-700"
          @input="onPhoneNoChange"
          autofocus
        />
      </AppFormLabel>
      <p class="px-4 border-l-2 border-zinc-400">
        Adding points for
        <span class="font-bold">{{ member ? member?.name || '💎' : '{ member name }' }}</span
        >, current points:
        <span class="font-bold">{{ member ? member?.points || 0 : '{ points }' }}</span>
      </p>
      <AppFormLabel label="Add Points" labelId="addPoints">
        <input
          v-model="addPoints"
          @focus="selectAll"
          type="number"
          id="addPoints"
          class="block w-48 mt-1 py-2 md:py-4 px-3 rounded-lg border-4 border-gray-300 shadow text-2xl text-gray-700"
        />
      </AppFormLabel>
    </div>
    <AppButton type="button" bg-color="green" @click="onAddPoints">Add Points</AppButton>
  </section>
</template>
