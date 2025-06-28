<script setup lang="ts">
import type { MemberModel } from '@/models/member.model'
import { ref } from 'vue'

const props = defineProps<{
  phoneNo: string
}>()

const emptyForm: MemberModel = {
  id: '',
  name: '',
  phoneNo: '',
  points: 0,
  rewards: [],
  createdAt: new Date(),
  updatedAt: new Date(),
}

const form = ref({ ...emptyForm, phoneNo: props.phoneNo })
</script>

<template>
  <form @submit.prevent="$emit('create', form)">
    <input v-model="form.name" placeholder="Name" :autofocus="true" />
    <input v-model="form.phoneNo" placeholder="Phone Number" />
    <input v-model="form.points" type="number" placeholder="Points" />
    <button type="submit">Create</button>
  </form>
</template>
