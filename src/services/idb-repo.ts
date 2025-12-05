import { dbPromise } from './db'

type Key = IDBValidKey

export interface StoreRepository<T, K extends Key = Key> {
  add(data: T): Promise<K>
  put(data: T): Promise<void>
  get(key: K): Promise<T | undefined>
  getAll(limit?: number): Promise<T[]>
  delete(key: K): Promise<void>
  getByIndex<I = unknown>(indexName: string, query: IDBKeyRange | Key): Promise<T[]>
  count(): Promise<number>
}

export function createStoreRepository<T, K extends Key = Key>(
  storeName: string,
): StoreRepository<T, K> {
  return {
    async add(data: T): Promise<K> {
      const db = await dbPromise
      // Ensure plain object serialization to avoid proxies/reactivity
      const payload = JSON.parse(JSON.stringify(data)) as T
      return (await db.add(storeName, payload)) as K
    },
    async put(data: T): Promise<void> {
      const db = await dbPromise
      const payload = JSON.parse(JSON.stringify(data)) as T
      await db.put(storeName, payload)
    },
    async get(key: K): Promise<T | undefined> {
      const db = await dbPromise
      return (await db.get(storeName, key)) as T | undefined
    },
    async getAll(limit?: number): Promise<T[]> {
      const db = await dbPromise
      return (await db.getAll(storeName, undefined, limit)) as T[]
    },
    async delete(key: K): Promise<void> {
      const db = await dbPromise
      await db.delete(storeName, key)
    },
    async getByIndex<I = unknown>(indexName: string, query: IDBKeyRange | Key): Promise<T[]> {
      const db = await dbPromise
      const tx = db.transaction(storeName)
      const store = tx.store
      const index = store.index(indexName)
      const results: T[] = []
      let cursor = await index.openCursor(query)
      while (cursor) {
        results.push(cursor.value as T)
        cursor = await cursor.continue()
      }
      await tx.done
      return results
    },
    async count(): Promise<number> {
      const db = await dbPromise
      return await db.count(storeName)
    },
  }
}
