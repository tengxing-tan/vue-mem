import { PointStatus } from '@/enums/PointStatus'
import { type PointModel } from '@/models/point.model'
import {
  addPoint,
  deletePoint,
  getAllPoints,
  getPoint,
  updatePoint,
} from '@/services/point.service'
import { ref } from 'vue'

export function usePointStore() {
  const points = ref<PointModel[]>([])
  const loaded = ref(false)
  const lazyLoadPointData = async () => {
    if (!loaded.value) {
      points.value = await getAllPoints()
      loaded.value = true
    }
  }

  async function findPoint(id: number): Promise<PointModel | undefined> {
    await lazyLoadPointData()
    return points.value?.find((p) => p.id === id)
  }

  async function findPointInIdb(id: number): Promise<PointModel | undefined> {
    return await getPoint(id)
  }

  async function upsertPoint(pointUpdate: PointModel, isNew: boolean) {
    if (isNew) {
      const result = await addPoint(pointUpdate)
      if (!result) return

      pointUpdate.id = result as number
    }

    await updatePoint({ ...pointUpdate, status: PointStatus.Issued })
  }

  async function deletePointFromIdb(id: number) {
    await deletePoint(id)
  }

  return {
    lazyLoadPointData,
    findPoint,
    findPointInIdb,
    upsertPoint,
    deletePointFromIdb,
    points,
  }
}
