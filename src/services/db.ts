import { openDB } from 'idb'

export const dbPromise = await openDB('tengxingCoolApp', 4, {
  upgrade(db, oldVersion, newVersion, transaction, event) {
    if (!db || !oldVersion || !newVersion || !transaction || !event) return

    members()
    points()
    settings()

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
  },
})
