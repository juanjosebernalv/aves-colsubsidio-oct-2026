'use client'

import { memo, useCallback, useEffect, useState } from 'react'
import { Close, ZoomIn, ZoomOut } from '@mui/icons-material'
import styles from './ImageModal.module.css'

interface ImageModalProps {
  isOpen: boolean
  imageUrl: string
  birdName: string
  onClose: () => void
}

export default memo(function ImageModal({ isOpen, imageUrl, birdName, onClose }: ImageModalProps) {
  const [zoom, setZoom] = useState(100)

  useEffect(() => {
    if (!isOpen) {
      return
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose])

  const handleZoomIn = useCallback(() => {
    setZoom((prev) => Math.min(prev + 20, 300))
  }, [])

  const handleZoomOut = useCallback(() => {
    setZoom((prev) => Math.max(prev - 20, 100))
  }, [])

  const handleBackdropClick = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === e.currentTarget) {
        onClose()
      }
    },
    [onClose],
  )

  if (!isOpen) {
    return null
  }

  return (
    <div
      className={styles.backdrop}
      onClick={handleBackdropClick}
      role="presentation"
    >
      <div className={styles.modal}>
        <div className={styles.header}>
          <h3 className={styles.title}>{birdName}</h3>
          <button
            className={styles.closeBtn}
            onClick={onClose}
            type="button"
            aria-label="Cerrar"
          >
            <Close sx={{ fontSize: 24 }} aria-hidden="true" />
          </button>
        </div>

        <div className={styles.imageContainer}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={imageUrl}
            alt={birdName}
            className={styles.image}
            style={{ transform: `scale(${zoom / 100})` } as React.CSSProperties}
          />
        </div>

        <div className={styles.controls}>
          <button
            className={styles.zoomBtn}
            onClick={handleZoomOut}
            type="button"
            aria-label="Alejar"
            disabled={zoom <= 100}
          >
            <ZoomOut sx={{ fontSize: 20 }} aria-hidden="true" />
          </button>
          <span className={styles.zoomLevel}>{zoom}%</span>
          <button
            className={styles.zoomBtn}
            onClick={handleZoomIn}
            type="button"
            aria-label="Acercar"
            disabled={zoom >= 300}
          >
            <ZoomIn sx={{ fontSize: 20 }} aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  )
})
