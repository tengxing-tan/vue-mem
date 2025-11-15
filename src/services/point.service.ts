import { type PointModel } from '@/models/point.model'
import { dbPromise } from './db'

type DataModel = PointModel
type PrimaryKey = number

export const addPoint = async (data: DataModel): Promise<IDBValidKey> => {
  const result: IDBValidKey | PrimaryKey = await dbPromise.add('points', data)
  return result
}

export const updatePoint = async (data: PointModel): Promise<void> => {
  try {
    await dbPromise.put(
      'points',
      JSON.parse(
        JSON.stringify({
          ...data,
        }),
      ),
    )
  } catch (error) {
    alert('Failed to add or update point:' + error)
    throw error
  }
}

export const getPoint = async (primaryKey: PrimaryKey): Promise<DataModel | undefined> => {
  return await dbPromise.get('points', primaryKey)
}

export const deletePoint = async (primaryKey: PrimaryKey): Promise<void> => {
  await dbPromise.delete('points', primaryKey)
}

export const getAllPoints = async (): Promise<DataModel[]> => {
  return await dbPromise.getAll('points')
}
