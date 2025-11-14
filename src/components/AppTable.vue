<script setup lang="ts">
defineProps<{ headers: string[] }>()
</script>
<template>
  <div class="overflow-x-auto">
    <table class="min-w-full divide-y-2 divide-gray-200">
      <thead class="text-left">
        <tr class="*:text-gray-900 *:first:sticky *:first:left-0 *:first:bg-white">
          <th
            v-for="header in headers"
            :key="header"
            class="px-3 py-2 whitespace-nowrap font-semibold"
          >
            {{ header }}
          </th>
        </tr>
      </thead>

      <tbody class="divide-y divide-gray-200">
        <slot />
      </tbody>
    </table>
  </div>
</template>
