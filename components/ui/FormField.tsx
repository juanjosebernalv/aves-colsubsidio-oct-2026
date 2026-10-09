import type { ChangeEvent } from 'react'
import styles from './FormField.module.css'

interface FormFieldProps {
  label: string
  name: string
  value: string
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  error?: string
  required?: boolean
  as?: 'input' | 'textarea'
  type?: string
  placeholder?: string
  rows?: number
}

export default function FormField({
  label,
  name,
  value,
  onChange,
  error,
  required,
  as = 'input',
  type = 'text',
  placeholder,
  rows = 3,
}: FormFieldProps) {
  const inputClass = [styles.input, error ? styles.inputError : ''].filter(Boolean).join(' ')

  return (
    <div className={styles.field}>
      <label className={styles.label} htmlFor={name}>
        {label}
        {required && <span className={styles.required}>*</span>}
      </label>

      {as === 'textarea' ? (
        <textarea
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          rows={rows}
          className={inputClass}
        />
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={inputClass}
        />
      )}

      {error && <p className={styles.error}>{error}</p>}
    </div>
  )
}
