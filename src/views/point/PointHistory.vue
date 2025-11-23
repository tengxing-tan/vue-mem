<script setup lang="ts">
import AppTable from '@/components/AppTable.vue'
import { dateFormat } from '@/composables/useAppFormatterStore'
import { usePointStore } from '@/views/point/usePointStore'
import { onMounted } from 'vue'
import { PointStatusDescription } from '@/enums/PointStatus'
import type { PointModel } from '@/models/point.model'

const headers = ['Phone Number', 'Earned Points', 'Balance', 'Status', 'Created At']
const { lazyLoadPointData, points } = usePointStore()

onMounted(() => {
  lazyLoadPointData()
})

const handleEarnedPoints = (point: PointModel) => {
  if (point.pointsAfter - point.pointsBefore > 0) {
    return `➕${point.pointsAfter - point.pointsBefore}`
  }

  return `${point.pointsAfter - point.pointsBefore}`
}
</script>
<template>
  <section class="bg-white">
    <div class="flex justify-between items-center">
      <h1 class="text-4xl font-bold py-6 text-black">Point History</h1>
    </div>

    <AppTable v-if="points.length > 0" :headers="headers">
      <tr
        v-for="point in points.slice().reverse()"
        :key="point.id"
        class="*:text-gray-900 *:first:sticky *:first:left-0 *:first:bg-white *:first:font-medium"
      >
        <td class="px-3 py-2 whitespace-nowrap">{{ point.phoneNo }}</td>
        <td class="px-3 py-2 whitespace-nowrap">{{ handleEarnedPoints(point) }}</td>
        <td class="px-3 py-2 whitespace-nowrap">{{ point.pointsAfter }}</td>
        <td class="px-3 py-2 whitespace-nowrap">{{ PointStatusDescription[point.status] }}</td>
        <td class="px-3 py-2 whitespace-nowrap">{{ dateFormat(point.createdAt) }}</td>
      </tr>
    </AppTable>
  </section>
</template>
