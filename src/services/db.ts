import { openDB } from 'idb'

export const dbPromise = await openDB('tengxingCoolApp', 1, {
  upgrade(db) {
    if (!db.objectStoreNames.contains('members')) {
      db.createObjectStore('members', { keyPath: 'id' }) // primary key id
    }
    if (!db.objectStoreNames.contains('rewards')) {
      db.createObjectStore('rewards', { keyPath: 'id' })
    }
  },
})
