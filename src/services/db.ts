import { openDB } from 'idb'

export const dbPromise = await openDB('tengxingCoolApp', 6, {
  upgrade(db, oldVersion, newVersion, transaction) {
    members()
    points()
    settings()
    rewards()

    function members(): void {
      if (!db.objectStoreNames.contains('members')) {
        db.createObjectStore('members', { keyPath: 'phoneNo' }).createIndex(
          'updatedAtIdx',
          'updatedAt',
        )
        return
      }

      if (!transaction.objectStore('members').indexNames.contains('updatedAtIdx')) {
        transaction.objectStore('members').createIndex('updatedAtIdx', 'updatedAt')
      }
    }

    function points(): void {
      if (!db.objectStoreNames.contains('points')) {
        db.createObjectStore('points', { keyPath: 'id', autoIncrement: true }).createIndex(
          'createdAtIdx',
          'createdAt',
        )
        return
      }

      if (!transaction.objectStore('points').indexNames.contains('createdAtIdx')) {
        transaction.objectStore('points').createIndex('createdAtIdx', 'createdAt')
      }
    }

    function settings(): void {
      if (!db.objectStoreNames.contains('settings')) {
        db.createObjectStore('settings', { keyPath: 'key' })
        return
      }
    }

    function rewards(): void {
      if (!db.objectStoreNames.contains('rewards')) {
        db.createObjectStore('rewards', { keyPath: 'id', autoIncrement: true })
        return
      }
    }
  },
})
