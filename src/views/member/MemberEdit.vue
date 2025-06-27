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
  } else if (filterMembers.length === 0 && form.value.phoneNo.length > 0) {
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
      <div class="center-card">
        <div class="input-group">
          <input class="" type="text" v-model="form.phoneNo" placeholder="Phone number" />
          <button v-if="creating" class="submit-btn" type="submit">
            {{ creating ? 'Create' : 'Update' }}
          </button>
          <button v-else class="submit-btn" type="submit">
            <img src="@/assets/send.svg" alt="Send" style="width: 24px; height: 24px" />
          </button>
        </div>
      </div>

      <input
        id="memberName"
        v-model="form.name"
        v-if="creating"
        placeholder="Member Name"
        type="text"
      />

      <button type="submit">{{ creating ? 'Create' : editingMember ? 'Update' : 'Search' }}</button>
      <button type="button" @click="handleCancel">Cancel</button>
    </form>
  </div>
</template>

<style scoped>
.input-group {
  display: flex;
  justify-content: space-between;
  gap: 0.5rem;
  width: 100%;
  padding: 0.75rem 1rem;
  font-size: 1rem;
  font-family: inherit;
  color: #2c3e50;
  background-color: #ffffff;
  border: 2px solid #dcdfe6;
  border-radius: 8px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  transition: all 0.2s ease-in-out;
}
.input-group:focus-within {
  border-color: #42b983;
  box-shadow: 0 0 0 3px rgba(66, 185, 131, 0.2);
}
.input-group input {
  width: 100%;
  border: none;
}
.input-group input:focus {
  outline: none;
}
.input-group input::placeholder {
  color: #a0aec0;
}
.center-card {
  display: grid;
  place-items: center;
  max-width: 600px;
  min-height: 60vh;
  margin: 0 auto;
  padding: 1rem;
}
.submit-btn {
  background: none;
  border: none;
  cursor: pointer;
}
</style>
