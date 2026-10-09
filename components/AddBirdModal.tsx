'use client'

import { useState, useCallback, type ChangeEvent } from 'react'
import { Close as CloseIcon } from '@mui/icons-material'
import Modal from '@/components/ui/Modal'
import FormField from '@/components/ui/FormField'
import Button from '@/components/ui/Button'
import { useApp } from '@/context/AppContext'
import type { BirdRecordInput } from '@/types/observation'
import styles from './AddBirdModal.module.css'

interface AddBirdModalProps {
  onClose: () => void
  initialData?: Partial<BirdRecordInput>
}

const buildDefaultForm = (prefill?: Partial<BirdRecordInput>): BirdRecordInput => ({
  name: prefill?.name ?? '',
  scientificName: prefill?.scientificName ?? '',
  description: prefill?.description ?? '',
  time: new Date().toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit' }),
  date: new Date().toISOString().split('T')[0],
})

export default function AddBirdModal({ onClose, initialData }: AddBirdModalProps) {
  const [formData, setFormData] = useState<BirdRecordInput>(() => buildDefaultForm(initialData))
  const [errors, setErrors] = useState<Partial<Record<keyof BirdRecordInput, string>>>({})
  const { addBird } = useApp()

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target
      setFormData((prev) => ({ ...prev, [name]: value }))
      setErrors((prev) => {
        const next = { ...prev }
        delete next[name as keyof BirdRecordInput]
        return next
      })
    },
    [],
  )

  const validate = useCallback((): boolean => {
    const next: Partial<Record<keyof BirdRecordInput, string>> = {}
    if (!formData.name.trim()) {next.name = 'El nombre del ave es requerido'}
    if (!formData.scientificName.trim()) {next.scientificName = 'El nombre científico es requerido'}
    if (!formData.time.trim()) {next.time = 'La hora es requerida'}
    if (!formData.date.trim()) {next.date = 'La fecha es requerida'}
    setErrors(next)
    return Object.keys(next).length === 0
  }, [formData])

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault()
      if (!validate()) {return}
      await addBird(formData)
      onClose()
    },
    [validate, addBird, formData, onClose],
  )

  return (
    <Modal onClose={onClose} size="md">
      <div className={styles.header}>
        <h2 className={styles.title}>📝 Registrar Ave</h2>
        <button className={styles.closeBtn} onClick={onClose} aria-label="Cerrar">
          <CloseIcon />
        </button>
      </div>

      <form onSubmit={handleSubmit} className={styles.form}>
        <FormField
          label="Nombre Común"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Ej: Loro Gavilán"
          error={errors.name}
          required
        />
        <FormField
          label="Nombre Científico"
          name="scientificName"
          value={formData.scientificName}
          onChange={handleChange}
          placeholder="Ej: Ibycter americanus"
          error={errors.scientificName}
          required
        />
        <FormField
          as="textarea"
          label="Descripción"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Notas adicionales sobre la observación..."
          rows={3}
        />
        <FormField
          label="Hora"
          name="time"
          type="time"
          value={formData.time}
          onChange={handleChange}
          error={errors.time}
          required
        />
        <FormField
          label="Fecha"
          name="date"
          type="date"
          value={formData.date}
          onChange={handleChange}
          error={errors.date}
          required
        />

        <div className={styles.actions}>
          <Button type="button" variant="secondary" fullWidth onClick={onClose}>
            Cancelar
          </Button>
          <Button type="submit" variant="primary" fullWidth>
            Guardar Ave
          </Button>
        </div>
      </form>
    </Modal>
  )
}
