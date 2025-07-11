<template>
  <div class="page">
    <p style="display: block">{{ $route.params.id || member?.id }}</p>
    <button class="back-btn flexrow" @click="$emit('cancel')">
      <i class="ri-arrow-left-s-line" style="font-size: 24px"></i> Back
    </button>
    <RouterLink :to="`/members`"> link back </RouterLink>

    <div v-if="member" class="sticky-header">
      <h1>{{ member.name }}</h1>

      <div class="flexrow">
        <button @click="$emit('edit', true)">Edit</button>
        <button @click="$emit('remove', member.id)">Remove</button>
      </div>
      <div class="content-wrapper">
        <div class="card">
          <h2>Customer info</h2>
          <div>{{ member.name }}</div>
          <div class="flexrow">
            <div>icon</div>
            <div>{{ member.phoneNo }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useMemberStore } from '@/composables/useMemberStore'
import type { MemberModel } from '@/models/member.model'
import { onMounted, onUpdated } from 'vue'

const props = defineProps<{
  id: string
  member?: MemberModel
}>()

const { getMemberById, member } = useMemberStore()

onUpdated(async () => {
  member.value = (await getMemberById(props.id)) as MemberModel
})
</script>

<style scoped>
.back-btn {
  background: none;
  border: none;
  font-size: 1rem;
  color: var(--vt-c-text-light-1);
}
</style>
