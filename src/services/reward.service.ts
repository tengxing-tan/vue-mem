import type { RewardModel } from '@/models/reward.model'
import { dbPromise } from './db'

const IDB_STORE = 'rewards'
type PrimaryKey = number
type DataModel = RewardModel

export const create = async (data: DataModel): Promise<IDBValidKey | PrimaryKey> => {
  return await dbPromise.add(IDB_STORE, data)
}

export const update = async (data: DataModel): Promise<void> => {
  try {
    await dbPromise.put(IDB_STORE, data)
  } catch (error) {
    console.error('@tengxing: ' + error)
    throw error
  }
}

export const get = async (primaryKey: PrimaryKey): Promise<DataModel> => {
  return await dbPromise.get(IDB_STORE, primaryKey)
}

export const getAll = async (count?: number): Promise<DataModel[]> => {
  return await dbPromise.getAll(IDB_STORE, undefined, count)
}

export const deleteRow = async (primaryKey: PrimaryKey): Promise<void> => {
  await dbPromise.delete(IDB_STORE, primaryKey)
}
