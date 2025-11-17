import { DbObjectStore } from '@/enums/DbObjectStore'
import { openDB } from 'idb'

export const dbPromise = await openDB('tengxingCoolApp', 6, {
  upgrade(db, oldVersion, newVersion, transaction) {
    members()
    points()
    settings()
    rewards()

    function members(): void {
      if (!db.objectStoreNames.contains(DbObjectStore.Members)) {
        db.createObjectStore(DbObjectStore.Members, { keyPath: 'phoneNo' }).createIndex(
          'updatedAtIdx',
          'updatedAt',
        )
        return
      }

      if (!transaction.objectStore(DbObjectStore.Members).indexNames.contains('updatedAtIdx')) {
        transaction.objectStore(DbObjectStore.Members).createIndex('updatedAtIdx', 'updatedAt')
      }
    }

    function points(): void {
      if (!db.objectStoreNames.contains(DbObjectStore.Points)) {
        db.createObjectStore(DbObjectStore.Points, {
          keyPath: 'id',
          autoIncrement: true,
        }).createIndex('createdAtIdx', 'createdAt')
        return
      }

      if (!transaction.objectStore(DbObjectStore.Points).indexNames.contains('createdAtIdx')) {
        transaction.objectStore(DbObjectStore.Points).createIndex('createdAtIdx', 'createdAt')
      }
    }

    function settings(): void {
      if (!db.objectStoreNames.contains(DbObjectStore.Settings)) {
        db.createObjectStore(DbObjectStore.Settings, { keyPath: 'key' })
        return
      }
    }

    function rewards(): void {
      if (!db.objectStoreNames.contains(DbObjectStore.Rewards)) {
        db.createObjectStore(DbObjectStore.Rewards, { keyPath: 'id', autoIncrement: true })
        return
      }
    }
  },
})
