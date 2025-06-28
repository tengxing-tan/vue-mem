<script setup lang="ts">
import { ref } from 'vue'
import { useMemberStore } from '@/composables/useMemberStore'
import type { MemberModel } from '@/models/member.model'
import MemberProfile from '@/components/MemberProfile.vue'
import MemberProfileEdit from '@/components/MemberProfileEdit.vue'
import MemberProfileCreate from '@/components/MemberProfileCreate.vue'

const {
  members,
  saveMember,
  creating,
  selectingMember,
  selection,
  removeMember,
  removeSelectedMembers,
} = useMemberStore()

const emptyForm: MemberModel = {
  id: '',
  name: '',
  phoneNo: '',
  points: 0,
  rewards: [],
  createdAt: new Date(),
  updatedAt: new Date(),
}

const form = ref({ ...emptyForm })
const editing = ref(false)

const onSubmit = async () => {
  if (form.value.phoneNo.length === 0) {
    return
  }

  const existingMember = filtered(members.value)

  if (existingMember.length === 1) {
    selectingMember.value = existingMember[0]
  } else if (existingMember.length === 0) {
    creating.value = true
  }
}

const handleCreateOrUpdateMember = async (formValue: MemberModel) => {
  await saveMember(formValue)
  clearForm()
}

const handleRemoveMember = (id: string) => {
  if (!confirm('Are you sure you want to remove this member?')) return
  removeMember(id)
  clearForm()
}

const clearForm = () => {
  form.value = { ...emptyForm }
  selectingMember.value = null
  creating.value = false
  editing.value = false
}

const handleSelection = (memberId: string, event: Event) => {
  const checkbox = event.target as HTMLInputElement
  if (checkbox.checked) {
    selection.value.push(memberId)
  } else {
    selection.value = selection.value.filter((id) => id !== memberId)
  }
}

const handleSelectAll = (event: Event) => {
  const selectAllCheckbox = event.target as HTMLInputElement
  const memberCheckboxes = document.querySelectorAll<HTMLInputElement>(
    'input[name="memberCheckbox"]',
  )
  if (selectAllCheckbox.checked) {
    selection.value = members.value.map((m) => m.id)
  } else {
    selection.value = []
  }
  memberCheckboxes.forEach((checkbox) => (checkbox.checked = selectAllCheckbox.checked))
}

// Helper function
const filtered = (members: MemberModel[]) => {
  return form.value.phoneNo.length > 0
    ? members.filter(
        (m) => m.phoneNo === form.value.phoneNo || m.phoneNo.includes(form.value.phoneNo),
      )
    : members
}
</script>

<template>
  <MemberProfile
    v-if="selectingMember && !editing"
    @edit="editing = true"
    @remove="handleRemoveMember(selectingMember.id)"
    @cancel="clearForm"
    :member="selectingMember"
  />

  <MemberProfileCreate
    v-if="creating"
    @create="(formValue) => handleCreateOrUpdateMember(formValue)"
    :phone-no="form.phoneNo"
  />

  <MemberProfileEdit
    v-if="editing && selectingMember"
    @update="(formValue) => handleCreateOrUpdateMember({ ...selectingMember, ...formValue })"
    @cancel="editing = false"
    :member="selectingMember"
  />

  <div v-else-if="!selectingMember && !creating">
    <input type="checkbox" @click="handleSelectAll" :checked="selection.length > 0" />
    <button @click="removeSelectedMembers">Remove selected</button>
    <ul>
      <li v-for="member in filtered(members)" :key="member.id">
        <div>
          <input
            type="checkbox"
            name="memberCheckbox"
            @click="handleSelection(member.id, $event)"
          />
          <span @click="selectingMember = member" style="cursor: pointer">{{ member.name }}</span>
          — {{ member.points }} pts. createdAt
          {{ new Date(member.createdAt).toLocaleString() }}
        </div>
      </li>
    </ul>
    <form @submit.prevent="onSubmit">
      <div v-if="creating">
        <input type="text" v-model="form.name" placeholder="Member Name" />
      </div>
      <div class="center-card">
        <div class="input-group">
          <input class="" type="text" v-model="form.phoneNo" placeholder="Phone number" />
          <button type="button" @click="clearForm">x</button>
          <button class="submit-btn" type="submit">
            <img src="@/assets/send.svg" alt="Send" style="width: 24px; height: 24px" />
          </button>
        </div>
      </div>
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
