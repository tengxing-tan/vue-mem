<script setup lang="ts">
import { ref } from 'vue'
import { useMemberStore } from '@/composables/useMemberStore'
import type { MemberModel } from '@/models/member.model'
import MemberListView from './MemberListView.vue'

const { members, saveMember, creating, editingMember } = useMemberStore()

const emptyMemberForm: MemberModel = {
  id: '',
  name: '',
  phoneNo: '',
  points: 0,
  rewards: [],
  createdAt: new Date(),
  updatedAt: new Date(),
}
const form = ref({ ...emptyMemberForm })

const onSubmit = async () => {
  if (creating.value || editingMember.value) {
    await saveMember({ ...form.value })
    handleCancel()
    return
  }

  const filterMembers = members.value.filter((m) => m.phoneNo === form.value.phoneNo) || null

  if (filterMembers.length === 1) {
    editingMember.value = filterMembers[0]
  } else if (filterMembers.length === 0) {
    creating.value = true
  }
}

const handleEditMember = (member: MemberModel) => {
  editingMember.value = member
  form.value = { ...member }
}

const handleCancel = () => {
  form.value = { ...emptyMemberForm }
  editingMember.value = null
  creating.value = false
}
</script>

<template>
  <div>
    <MemberListView :members="members" :phone-no="form.phoneNo" @edit="handleEditMember" />
    <form @submit.prevent="onSubmit">
      <input type="text" v-model="form.phoneNo" placeholder="Phone number" />
      <input
        v-if="creating"
        type="text"
        id="memberName"
        v-model="form.name"
        placeholder="Member Name"
      />

      <input
        v-if="editingMember !== null"
        type="number"
        v-model="form.points"
        placeholder="Member Points"
      />
      <button type="submit">{{ creating ? 'Create' : editingMember ? 'Update' : 'Search' }}</button>
      <button type="button" @click="handleCancel">Cancel</button>
    </form>
  </div>
</template>
