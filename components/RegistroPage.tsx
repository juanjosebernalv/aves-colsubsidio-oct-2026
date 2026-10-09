'use client'

import { memo, useMemo } from 'react'
import { useMediaQuery } from '@mui/material'
import type { Bird } from '@/data/birds.types'
import DesktopRegistroLayout from './DesktopRegistroLayout'
import MobileRegistroLayout from './MobileRegistroLayout'

interface RegistroPageProps {
  birds: Bird[]
}

export default memo(function RegistroPage({ birds }: RegistroPageProps) {
  const isDesktop = useMediaQuery('(min-width: 1024px)')

  const currentHourData = useMemo(() => {
    const now = new Date()
    const hour = now.getHours()
    const _startMinute = Math.floor(now.getMinutes() / 60) * 60
    return {
      hour,
      startTime: `${String(hour).padStart(2, '0')}:00`,
      endTime: `${String(hour).padStart(2, '0')}:59`,
      elapsed: now.getMinutes(),
    }
  }, [])

  if (isDesktop) {
    return <DesktopRegistroLayout birds={birds} currentHourData={currentHourData} />
  }

  return <MobileRegistroLayout birds={birds} currentHourData={currentHourData} />
})
