<script setup lang="ts">
import type { MemberModel } from '@/models/member.model'

defineProps<{
  member: MemberModel
}>()
</script>

<template>
  <div class="page">
    <button class="back-btn flexrow" @click="$emit('cancel')">
      <i class="ri-arrow-left-s-line" style="font-size: 24px"></i> Back
    </button>
    <div class="sticky-header">
      <h1>{{ member.name }}</h1>

      <div class="flexrow">
        <button @click="$emit('edit', true)">Edit</button>
        <button @click="$emit('remove', member.id)">Remove</button>
      </div>
    </div>
    <div class="content-wrapper">
      <div class="card">
        <h2>Customer infof</h2>
        <div class="flexrow">
          <div>icon</div>
          <div>{{ member.phoneNo }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.back-btn {
  background: none;
  border: none;
  font-size: 1rem;
  color: var(--vt-c-text-light-1);
}
</style>
