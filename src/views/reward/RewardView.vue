<script setup lang="ts">
import AppButton from '@/components/AppButton.vue'
</script>

<template>
  <section>
    <div class="flex justify-between items-center">
      <h1 class="text-4xl font-bold py-6 text-black">Rewards</h1>
      <RouterLink to="/reward/create">
        <AppButton bgColor="yellow">Add Reward</AppButton>
      </RouterLink>
    </div>
  </section>
</template>
