'use client'

import { useEffect, type ReactNode } from 'react'
import styles from './Modal.module.css'

interface ModalProps {
  onClose: () => void
  children: ReactNode
  size?: 'sm' | 'md' | 'lg'
}

export default function Modal({ onClose, children, size = 'md' }: ModalProps) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {onClose()}
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return (
    <div
      className={styles.overlay}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className={`${styles.panel} ${styles[size]}`}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  )
}
