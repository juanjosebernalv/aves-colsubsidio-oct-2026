export interface BirdRecord {
  id: string
  name: string
  scientificName: string
  description: string
  time: string
  date: string
  synced: boolean
}

export type BirdRecordInput = Omit<BirdRecord, 'id' | 'synced'>
