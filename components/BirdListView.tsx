'use client'

import { memo, useMemo } from 'react'
import type { BirdRecord } from '@/types/observation'
import BirdCard from './BirdCard'
import styles from './BirdListView.module.css'

interface BirdListViewProps {
  birds: BirdRecord[]
}

function BirdListView({ birds }: BirdListViewProps) {
  const { groupedBirds, sortedDates } = useMemo(() => {
    const grouped = birds.reduce<Record<string, BirdRecord[]>>((acc, bird) => {
      if (!acc[bird.date]) {acc[bird.date] = []}
      acc[bird.date].push(bird)
      return acc
    }, {})

    const sorted = Object.keys(grouped).sort(
      (a, b) => new Date(b).getTime() - new Date(a).getTime(),
    )

    return { groupedBirds: grouped, sortedDates: sorted }
  }, [birds])

  return (
    <div className={styles.list}>
      {sortedDates.map((date) => (
        <div key={date}>
          <div className={styles.dateHeader}>
            <h2 className={styles.dateTitle}>
              📅{' '}
              {new Date(date).toLocaleDateString('es-CO', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </h2>
            <p className={styles.dateCount}>
              {groupedBirds[date].length} ave
              {groupedBirds[date].length !== 1 ? 's' : ''} registrada
              {groupedBirds[date].length !== 1 ? 's' : ''}
            </p>
          </div>

          <div className={styles.grid}>
            {groupedBirds[date]
              .slice()
              .sort((a, b) => b.time.localeCompare(a.time))
              .map((bird) => (
                <BirdCard key={bird.id} bird={bird} />
              ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export default memo(BirdListView)
