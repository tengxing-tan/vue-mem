<script setup lang="ts">
import { ref } from 'vue'
import type { MemberModel } from '@/models/member.model'

const props = defineProps<{
  member: MemberModel
}>()

const form = ref({ ...props.member })
</script>

<template>
  <div>
    <button type="button" @click="$emit('cancel')">Cancel</button>
    <h2>Edit Member</h2>
    <form @submit.prevent="$emit('update', form)">
      <input v-model="form.name" placeholder="Name" :autofocus="true" />
      <input v-model="form.phoneNo" placeholder="Phone Number" />
      <input v-model="form.points" type="number" placeholder="Points" />
      <button type="submit">Update</button>
    </form>
  </div>
</template>
