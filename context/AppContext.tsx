'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { useBirdStore } from '@/lib/store'
import type { BirdRecord, BirdRecordInput } from '@/types/observation'

interface AppContextValue {
  birds: BirdRecord[]
  isLoading: boolean
  isOnline: boolean
  totalBirds: number
  todayBirds: number
  syncedBirds: number
  pendingBirds: number
  addBird: (data: BirdRecordInput) => Promise<void>
  deleteBird: (id: string) => Promise<void>
}

const AppContext = createContext<AppContextValue | null>(null)

export function AppProvider({ children }: { children: ReactNode }) {
  const { birds, addBird: storeAdd, deleteBird: storeDelete, loadFromStorage } = useBirdStore()
  const [isLoading, setIsLoading] = useState(true)
  const [isOnline, setIsOnline] = useState(true)

  useEffect(() => {
    loadFromStorage()
      .catch((err) => console.error('Failed to load birds:', err))
      .finally(() => setIsLoading(false))
  }, [loadFromStorage])

  useEffect(() => {
    if (typeof window === 'undefined') {return}
    setIsOnline(navigator.onLine)
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)
    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)
    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  const totalBirds = birds.length

  const todayBirds = useMemo(() => {
    const today = new Date().toISOString().split('T')[0]
    return birds.filter((b) => b.date === today).length
  }, [birds])

  const syncedBirds = useMemo(() => birds.filter((b) => b.synced).length, [birds])

  const pendingBirds = totalBirds - syncedBirds

  const addBird = useCallback(
    async (data: BirdRecordInput) => {
      await storeAdd({
        ...data,
        id: Date.now().toString(),
        synced: isOnline,
      })
    },
    [storeAdd, isOnline],
  )

  const deleteBird = useCallback(
    async (id: string) => {
      await storeDelete(id)
    },
    [storeDelete],
  )

  const value = useMemo<AppContextValue>(
    () => ({
      birds,
      isLoading,
      isOnline,
      totalBirds,
      todayBirds,
      syncedBirds,
      pendingBirds,
      addBird,
      deleteBird,
    }),
    [birds, isLoading, isOnline, totalBirds, todayBirds, syncedBirds, pendingBirds, addBird, deleteBird],
  )

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useApp(): AppContextValue {
  const ctx = useContext(AppContext)
  if (!ctx) {throw new Error('useApp must be used within AppProvider')}
  return ctx
}
