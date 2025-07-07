<script setup lang="ts">
import { ref } from 'vue'
import { useMemberStore } from '@/composables/useMemberStore'
import type { MemberModel } from '@/models/member.model'
import MemberProfile from '@/views/member/MemberProfile.vue'
import MemberProfileEdit from '@/views/member/MemberProfileEdit.vue'
import MemberProfileCreate from '@/views/member/MemberProfileCreate.vue'

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
  if (formValue.id !== '') {
    selectingMember.value = formValue
  }
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
    @create="(formValue: MemberModel) => handleCreateOrUpdateMember(formValue)"
    :phone-no="form.phoneNo"
  />

  <MemberProfileEdit
    v-if="editing && selectingMember"
    @update="
      (formValue: MemberModel) => handleCreateOrUpdateMember({ ...selectingMember, ...formValue })
    "
    @cancel="editing = false"
    :member="selectingMember"
  />

  <div v-else-if="!selectingMember && !creating">
    <input type="checkbox" @click="handleSelectAll" :checked="selection.length > 0" />
    <button @click="removeSelectedMembers">Remove selected</button>
    <ul>
      <li
        v-for="member in filtered(members).sort((a, b) => (a.updatedAt < b.updatedAt ? 1 : -1))"
        :key="member.id"
      >
        <div>
          <input
            type="checkbox"
            name="memberCheckbox"
            @click="handleSelection(member.id, $event)"
          />
          <span @click="selectingMember = member" style="cursor: pointer">{{ member.name }}</span>
          — {{ member.points }} pts. createdAt
          {{ new Date(member.createdAt).toLocaleString('en-MY') }}
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
          <button class="btn" v-if="form.phoneNo" type="button" @click="clearForm">
            <i class="ri-close-line"></i>
          </button>
          <button class="btn" type="submit" @click="onSubmit">
            <i class="ri-search-line"></i>
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<style scoped>
input[type='text'] {
  width: 100%;
  border: none;
}
.center-card {
  display: grid;
  place-items: center;
  max-width: 600px;
  min-height: 60vh;
  margin: 0 auto;
  padding: 1rem;
}
</style>
