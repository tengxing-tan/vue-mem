import { type PointModel } from '@/models/point.model'
import { createStoreRepository } from './idb-repo'
import { toast } from './toast'
import { logger } from './logger'

type DataModel = PointModel
type PrimaryKey = number

const repo = createStoreRepository<DataModel, PrimaryKey>('points')

export const addPoint = async (data: DataModel): Promise<IDBValidKey> => {
  const result: IDBValidKey | PrimaryKey = await repo.add(data)
  return result
}

export const updatePoint = async (data: PointModel): Promise<void> => {
  try {
    await repo.put({ ...data })
  } catch (error) {
    logger.error('Failed to add or update point', error, { module: 'point.service' })
    toast.error('Failed to save point. Please try again.')
    throw error
  }
}

export const getPoint = async (primaryKey: PrimaryKey): Promise<DataModel | undefined> => {
  return await repo.get(primaryKey)
}

export const deletePoint = async (primaryKey: PrimaryKey): Promise<void> => {
  await repo.delete(primaryKey)
}

export const getAllPoints = async (): Promise<DataModel[]> => {
  return await repo.getAll()
}

// Index helpers
export const getPointsSince = async (date: Date, limit?: number): Promise<DataModel[]> => {
  const range = IDBKeyRange.lowerBound(date, true)
  const results = await repo.getByIndex('createdAtIdx', range)
  return typeof limit === 'number' ? results.slice(-limit) : results
}

export const getPointsBetween = async (
  start: Date,
  end: Date,
  limit?: number,
): Promise<DataModel[]> => {
  const range = IDBKeyRange.bound(start, end, true, true)
  const results = await repo.getByIndex('createdAtIdx', range)
  return typeof limit === 'number' ? results.slice(0, limit) : results
}

export const getRecentPoints = async (limit: number): Promise<DataModel[]> => {
  const results = await repo.getByIndex('createdAtIdx', IDBKeyRange.lowerBound(new Date(0)))
  return results.slice(-limit)
}
