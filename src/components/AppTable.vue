<script setup lang="ts">
defineProps(['headers', 'rows', 'baseUrl', 'queryParam'])
// const headers = ['Name', 'Phone No']
// const rows = [
//   { name: 'John Doe', phonoNo: '1234567890' },
//   { name: 'Jane Smith', phonoNo: '0987654321' },
// ]
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
