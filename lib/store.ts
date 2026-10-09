import { create } from 'zustand'
import type { BirdRecord } from '@/types/observation'

interface BirdStore {
  birds: BirdRecord[]
  addBird: (bird: BirdRecord) => Promise<void>
  deleteBird: (id: string) => Promise<void>
  updateBird: (id: string, updates: Partial<BirdRecord>) => Promise<void>
  loadFromStorage: () => Promise<void>
  clearAll: () => Promise<void>
  markAsSynced: (ids: string[]) => Promise<void>
}

const DB_NAME = 'BirdsDB'
const STORE_NAME = 'birds'
const LS_KEY = 'birds-store'

const initDB = (): Promise<IDBDatabase> =>
  new Promise((resolve, reject) => {
    if (typeof indexedDB === 'undefined') {
      reject(new Error('IndexedDB not available'))
      return
    }
    const request = indexedDB.open(DB_NAME, 1)
    request.onerror = () => reject(request.error)
    request.onsuccess = () => resolve(request.result)
    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id' })
      }
    }
  })

const withIDB = async <T>(
  mode: IDBTransactionMode,
  operation: (store: IDBObjectStore) => IDBRequest<T>,
): Promise<T> => {
  const db = await initDB()
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, mode)
    const req = operation(tx.objectStore(STORE_NAME))
    req.onsuccess = () => resolve(req.result)
    tx.onerror = () => reject(tx.error)
  })
}

const lsGet = (): BirdRecord[] => JSON.parse(localStorage.getItem(LS_KEY) || '[]')
const lsSet = (birds: BirdRecord[]) => localStorage.setItem(LS_KEY, JSON.stringify(birds))

export const useBirdStore = create<BirdStore>((set, get) => ({
  birds: [],

  addBird: async (bird) => {
    try {
      try {
        await withIDB('readwrite', (store) => store.add(bird))
      } catch {
        lsSet([...lsGet(), bird])
      }
      set((state) => ({ birds: [...state.birds, bird] }))
    } catch (err) {
      console.error('addBird failed:', err)
    }
  },

  deleteBird: async (id) => {
    try {
      try {
        await withIDB('readwrite', (store) => store.delete(id))
      } catch {
        lsSet(lsGet().filter((b) => b.id !== id))
      }
      set((state) => ({ birds: state.birds.filter((b) => b.id !== id) }))
    } catch (err) {
      console.error('deleteBird failed:', err)
    }
  },

  updateBird: async (id, updates) => {
    try {
      try {
        const db = await initDB()
        await new Promise<void>((resolve, reject) => {
          const tx = db.transaction(STORE_NAME, 'readwrite')
          const store = tx.objectStore(STORE_NAME)
          const req = store.get(id)
          req.onsuccess = () => {
            if (req.result) {store.put({ ...req.result, ...updates })}
          }
          tx.oncomplete = () => resolve()
          tx.onerror = () => reject(tx.error)
        })
      } catch {
        lsSet(lsGet().map((b) => (b.id === id ? { ...b, ...updates } : b)))
      }
      set((state) => ({
        birds: state.birds.map((b) => (b.id === id ? { ...b, ...updates } : b)),
      }))
    } catch (err) {
      console.error('updateBird failed:', err)
    }
  },

  loadFromStorage: async () => {
    try {
      try {
        const result = await withIDB<BirdRecord[]>('readonly', (store) => store.getAll())
        set({ birds: result })
      } catch {
        const stored = localStorage.getItem(LS_KEY)
        if (stored) {set({ birds: JSON.parse(stored) })}
      }
    } catch (err) {
      console.error('loadFromStorage failed:', err)
    }
  },

  clearAll: async () => {
    try {
      try {
        await withIDB('readwrite', (store) => store.clear())
      } catch {
        localStorage.removeItem(LS_KEY)
      }
      set({ birds: [] })
    } catch (err) {
      console.error('clearAll failed:', err)
    }
  },

  markAsSynced: async (ids) => {
    await Promise.all(ids.map((id) => get().updateBird(id, { synced: true })))
  },
}))
