<script setup lang="ts">
import { useMemberStore } from '@/composables/useMemberStore'
import type { MemberModel } from '@/models/member.model'

const { loading, removeMember } = useMemberStore()

const props = defineProps<{
  members: MemberModel[]
  phoneNo: string
}>()

const filtered = (members: MemberModel[]) => {
  return props.phoneNo.length > 0
    ? members.filter((m) => m.phoneNo === props.phoneNo || m.phoneNo.includes(props.phoneNo))
    : members
}

const handleRemoveMember = (id: string) => {
  if (!confirm('Are you sure you want to remove this member?')) return
  removeMember(id)
}
</script>

<template>
  <div v-if="loading">Loading members...</div>
  <ul v-else>
    <li v-for="member in filtered(members)" :key="member.id">
      {{ member.name }} — {{ member.points }} pts. createdAt
      {{ new Date(member.createdAt).toLocaleString() }}
      <button @click="$emit('edit', member)">E</button>
      <button @click="handleRemoveMember(member.id)">R</button>
    </li>
  </ul>
</template>
