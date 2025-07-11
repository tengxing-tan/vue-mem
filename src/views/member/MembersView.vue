<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useMemberStore } from '@/composables/useMemberStore'
import type { MemberModel } from '@/models/member.model'
import MemberProfileEdit from '@/views/member/MemberProfileEdit.vue'
import MemberProfileCreate from '@/views/member/MemberProfileCreate.vue'
import MemberProfileView from './MemberProfileView.vue'

const {
  member,
  members,
  loadMembers,
  saveMember,
  creating,
  selection,
  removeMember,
  removeSelectedMembers,
} = useMemberStore()

const initMemberForm: MemberModel = {
  id: '',
  name: '',
  phoneNo: '',
  points: 0,
  rewards: [],
  createdAt: new Date(),
  updatedAt: new Date(),
}

const form = ref({ ...initMemberForm })
const editing = ref(false)

onMounted(() => {
  loadMembers()
})

const onSubmit = () => {
  if (form.value.phoneNo.length === 0) {
    return
  }

  const queryMembers = filtered(members.value)

  if (queryMembers.length === 1) {
    handleCrudState(false, queryMembers[0], true)
  } else if (queryMembers.length === 0) {
    handleCrudState(true)
  }
}

const handleCreateOrUpdateMember = async (formValue: MemberModel) => {
  await saveMember(formValue)
  clearForm()
  if (formValue.id !== '') {
    handleCrudState(false, formValue, false)
  }
}

const handleRemoveMember = (id: string) => {
  if (!confirm('Are you sure you want to remove this member?')) return
  removeMember(id)
  clearForm()
}

const clearForm = () => {
  form.value = { ...initMemberForm }
  handleCrudState(false, null, false)
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

function handleCrudState(create?: boolean, read?: MemberModel | null, update?: boolean) {
  creating.value = create || false
  member.value = read || null
  editing.value = update || false
}
</script>

<template>
  <MemberProfileCreate
    v-if="creating"
    @create="(formValue: MemberModel) => handleCreateOrUpdateMember(formValue)"
    :phone-no="form.phoneNo"
  />

  <MemberProfileEdit
    v-if="editing && member"
    @update="(formValue: MemberModel) => handleCreateOrUpdateMember({ ...member, ...formValue })"
    @cancel="editing = false"
    :member="member"
  />

  <div v-else-if="!member && !creating">
    <input type="checkbox" @click="handleSelectAll" :checked="selection.length > 0" />
    <button @click="removeSelectedMembers">Remove selected</button>
    <ul>
      <li
        v-for="itemMember in filtered(members).sort((a, b) => (a.updatedAt < b.updatedAt ? 1 : -1))"
        :key="itemMember.id"
      >
        <div>
          <input
            type="checkbox"
            name="memberCheckbox"
            @click="handleSelection(itemMember.id, $event)"
          />
          <span @click="member = itemMember" style="cursor: pointer">{{ itemMember.name }}</span>
          — {{ itemMember.points }} pts. createdAt
          {{ new Date(itemMember.createdAt).toLocaleString('en-MY') }}
          <router-link :to="{ name: 'memberProfileView', params: { id: itemMember.id } }"
            >view</router-link
          >
        </div>
      </li>
    </ul>
    <router-view />

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
