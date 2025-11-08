import { openDB } from 'idb'

export const dbPromise = await openDB('tengxingCoolApp', 1.1, {
  upgrade(db) {
    if (!db.objectStoreNames.contains('members')) {
      db.createObjectStore('members', { keyPath: 'phoneNo' }) // primary key phoneNo
    }
    if (!db.objectStoreNames.contains('rewards')) {
      db.createObjectStore('rewards', { keyPath: 'id' })
    }
  },
})
