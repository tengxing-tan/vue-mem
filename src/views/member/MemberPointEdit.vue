<script setup lang="ts">
import { useMemberStore } from '@/composables/useMemberStore'
import type { MemberModel } from '@/models/member.model'
import { ref } from 'vue'

const { editingMember, saveMember } = useMemberStore()

defineProps<{
  points?: number
}>()

const points = ref<number>(0)

const onSubmit = async () => {
  if (editingMember.value !== null) {
    saveMember({
      ...editingMember.value,
      points: points.value,
    })
  }
}
</script>

<template>
  <input type="number" v-model="points" placeholder="Member Points" />
</template>
