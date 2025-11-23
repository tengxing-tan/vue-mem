<script setup lang="ts">
import { RewardCategory } from '@/enums/RewareCategory'
import { ref } from 'vue'

const reward = ref({
  category: RewardCategory.Beverage,
})
</script>

<template>
  <fieldset class="flex gap-4 p-4 pb-6">
    <label for="beverage" class="flex items-center border rounded-lg shadow w-min p-4">
      <input
        type="radio"
        id="beverage"
        name="category"
        :value="RewardCategory.Beverage"
        v-model="reward.category"
        class="my-0.5 size-5 rounded border-gray-300 shadow-sm"
      />
      <div class="px-2">
        <span class="font-medium text-gray-700">Beverage</span>
      </div>
    </label>
    <label for="food" class="flex items-center border rounded-lg shadow w-min p-4">
      <input
        type="radio"
        id="food"
        name="category"
        :value="RewardCategory.Food"
        v-model="reward.category"
        class="my-0.5 size-5 rounded border-gray-300 shadow-sm"
      />
      <div class="px-2">
        <span class="font-medium text-gray-700">Food</span>
      </div>
    </label>
  </fieldset>
</template>
