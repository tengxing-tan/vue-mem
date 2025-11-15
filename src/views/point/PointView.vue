<script setup lang="ts">
import AppButton from '@/components/AppButton.vue'
import AppFormLabel from '@/components/AppFormLabel.vue'
import AppModal from '@/components/AppModal.vue'
import { useMemberStore } from '@/views/member/useMemberStore'
import { usePointStore } from '@/views/point/usePointStore'
import { PointStatus } from '@/enums/PointStatus'
import type { MemberModel } from '@/models/member.model'
import { ref } from 'vue'

const memberPhoneNo = ref('')
const addPoints = ref('')
const member = ref<MemberModel | undefined>()
const showModal = ref(false)

const { findMemberInIdb, upsertMember } = useMemberStore()
const { upsertPoint } = usePointStore()

async function onPhoneNoChange() {
  member.value = await findMemberInIdb(memberPhoneNo.value)
}

function onAddPoints() {
  if (!member.value) return
  const pointsToAdd = parseInt(addPoints.value)
  if (isNaN(pointsToAdd) || pointsToAdd <= 0) return
  showModal.value = true

  upsertPoint(
    {
      phoneNo: member.value.phoneNo,
      pointsBefore: member.value.points,
      pointsAfter: member.value.points + pointsToAdd,
      createdAt: new Date(),
      issuedBy: 'Amigos',
      status: PointStatus.Issued,
    },
    true,
  )

  member.value.points += pointsToAdd
  upsertMember(member.value, false)
}
</script>
<template>
  <section class="bg-white">
    <AppModal v-show="showModal" title="🍄 Points Added " @ok="showModal = false">
      <div class="text-6xl text-store-700 w-full p-4 grid place-content-center">
        {{ addPoints }}
      </div>
    </AppModal>

    <div class="flex justify-between">
      <h1 class="text-4xl font-bold py-6 text-black">Add Points</h1>
      <RouterLink to="/point/history">
        <AppButton type="button" bg-color="yellow">Full History</AppButton>
      </RouterLink>
    </div>
    <div class="pb-6 flex flex-col gap-4">
      <AppFormLabel label="Phone No" labelId="phoneNo">
        <input
          v-model="memberPhoneNo"
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
          type="number"
          id="addPoints"
          class="block w-48 mt-1 py-2 md:py-4 px-3 rounded-lg border-4 border-gray-300 shadow text-2xl text-gray-700"
        />
      </AppFormLabel>
    </div>
    <AppButton type="button" :bg-color="!member ? 'gray' : 'green'" @click="onAddPoints"
      >Add Points</AppButton
    >
  </section>
</template>
