import type { RewardModel } from '@/models/reward.model'
import { createStoreRepository } from './idb-repo'
import { toast } from './toast'
import { logger } from './logger'

type PrimaryKey = number
type DataModel = RewardModel

const repo = createStoreRepository<DataModel, PrimaryKey>('rewards')

export const create = async (data: DataModel): Promise<IDBValidKey | PrimaryKey> => {
  return await repo.add(data)
}

export const update = async (data: DataModel): Promise<void> => {
  try {
    await repo.put(data)
  } catch (error) {
    logger.error('Failed to update reward', error, { module: 'reward.service' })
    toast.error('Failed to save reward. Please try again.')
    throw error
  }
}

export const get = async (primaryKey: PrimaryKey): Promise<DataModel> => {
  return (await repo.get(primaryKey)) as DataModel
}

export const getAll = async (count?: number): Promise<DataModel[]> => {
  return await repo.getAll(count)
}

export const deleteRow = async (primaryKey: PrimaryKey): Promise<void> => {
  await repo.delete(primaryKey)
}
