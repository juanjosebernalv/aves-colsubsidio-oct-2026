'use client'

import type { Bird } from '@/data/birds.types'
import birdsData from '@/data/birds-data.json'
import RegistroPage from '@/components/RegistroPage'

export default function RecordingPage() {
  const birds = (birdsData.birds || []) as Bird[]

  return <RegistroPage birds={birds} />
}
