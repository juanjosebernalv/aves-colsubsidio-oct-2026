'use client'

import { memo, useState, useCallback } from 'react'
import { Delete as DeleteIcon, Check as CheckIcon } from '@mui/icons-material'
import Modal from '@/components/ui/Modal'
import Button from '@/components/ui/Button'
import { useApp } from '@/context/AppContext'
import type { BirdRecord } from '@/types/observation'
import styles from './BirdCard.module.css'

interface BirdCardProps {
  bird: BirdRecord
}

function BirdCard({ bird }: BirdCardProps) {
  const [showConfirm, setShowConfirm] = useState(false)
  const { deleteBird } = useApp()

  const openConfirm = useCallback(() => setShowConfirm(true), [])
  const closeConfirm = useCallback(() => setShowConfirm(false), [])

  const handleDelete = useCallback(async () => {
    await deleteBird(bird.id)
    setShowConfirm(false)
  }, [deleteBird, bird.id])

  return (
    <>
      <article className={styles.card}>
        <div className={styles.header}>
          <div className={styles.info}>
            <h3 className={styles.name}>{bird.name}</h3>
            <p className={styles.scientific}>{bird.scientificName}</p>
          </div>
          <div className={styles.badges}>
            <span
              className={`${styles.syncBadge} ${bird.synced ? styles.synced : styles.pending}`}
              title={bird.synced ? 'Sincronizado' : 'Pendiente'}
            >
              {bird.synced ? <CheckIcon sx={{ fontSize: 14 }} /> : <span>●</span>}
            </span>
          </div>
        </div>

        {bird.description && (
          <p className={styles.description}>{bird.description}</p>
        )}

        <div className={styles.meta}>
          <span>🕐 {bird.time}</span>
          <span>📅 {new Date(bird.date).toLocaleDateString('es-CO')}</span>
        </div>

        <Button variant="danger" fullWidth size="sm" onClick={openConfirm}>
          <DeleteIcon sx={{ fontSize: 16 }} /> Eliminar
        </Button>
      </article>

      {showConfirm && (
        <Modal onClose={closeConfirm} size="sm">
          <div className={styles.confirmContent}>
            <h3 className={styles.confirmTitle}>¿Eliminar registro?</h3>
            <p className={styles.confirmText}>
              ¿Estás seguro de que deseas eliminar el registro de{' '}
              <strong>{bird.name}</strong>? Esta acción no se puede deshacer.
            </p>
            <div className={styles.confirmActions}>
              <Button variant="secondary" fullWidth onClick={closeConfirm}>
                Cancelar
              </Button>
              <Button variant="danger" fullWidth onClick={handleDelete}>
                Eliminar
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </>
  )
}

export default memo(BirdCard)
