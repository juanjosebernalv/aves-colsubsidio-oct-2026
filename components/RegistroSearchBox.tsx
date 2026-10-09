'use client'

import { memo, useCallback } from 'react'
import { Search, Mic, PhotoCamera } from '@mui/icons-material'
import styles from './RegistroSearchBox.module.css'

interface RegistroSearchBoxProps {
  searchQuery: string
  onSearch: (query: string) => void
  onReset: () => void
  _availableColors?: string[]
  availableSizes: string[]
  selectedColors: Set<string>
  selectedSizes: Set<string>
  endemicOnly: boolean
  onColorToggle: (color: string, checked: boolean) => void
  onSizeToggle: (size: string, checked: boolean) => void
  onEndemicToggle: (checked: boolean) => void
}

const colorMap: Record<string, string> = {
  naranja: '#f97316',
  azul: '#06b6d4',
  verde: '#4edea3',
  amarillo: '#eab308',
  negro: '#050505',
  rojo: '#ef4444',
  blanco: '#ffffff',
  gris: '#94a3b8',
}

const sizeLabels: Record<string, string> = {
  diminuto: '<15 cm (Colibrí)',
  pequeño: '15-25 cm',
  mediano_pequeño: '25-35 cm (Barranquero)',
  mediano: '35-40 cm',
  mediano_grande: '40-50 cm (Tucán)',
  grande: '>50 cm (Pava)',
  muy_grande: '>1 m (Cóndor)',
}

export default memo(function RegistroSearchBox({
  searchQuery,
  onSearch,
  onReset,
  _availableColors,
  availableSizes,
  selectedColors,
  selectedSizes,
  endemicOnly,
  onColorToggle,
  onSizeToggle,
  onEndemicToggle,
}: RegistroSearchBoxProps) {
  const filterCount = selectedColors.size + selectedSizes.size + (endemicOnly ? 1 : 0)

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onSearch(e.target.value)
    },
    [onSearch],
  )

  return (
    <section className={styles.searchSection}>
      <div className={styles.searchBox}>
        <div className={styles.searchInputWrapper}>
          <Search sx={{ fontSize: 22 }} />
          <input
            className={styles.searchInput}
            placeholder="Buscar por código eBird (ej. COCORU, RUPERU), nombre común (Gallito, Barranquero) o científico..."
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <div className={styles.searchTools}>
            <button className={styles.toolBtn} title="Dictado por voz para campo">
              <Mic sx={{ fontSize: 18 }} />
              <span className={styles.toolLabel}>DICTADO VOZ</span>
            </button>
            <button className={styles.toolBtn} title="Escanear con Visor Térmico o Óptico">
              <PhotoCamera sx={{ fontSize: 20 }} />
            </button>
            <div className={styles.oledBadge}>
              <span>⚡</span>
              <span>OLED SAVER ACTIVO</span>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.filterContainer}>
        <div className={styles.colorFilters}>
          <span className={styles.filterLabel}>Color Base:</span>
          <div className={styles.buttonGroup}>
            {['naranja', 'azul', 'verde', 'amarillo', 'negro', 'rojo'].map((color) => (
              <button
                key={color}
                className={`${styles.colorBtn} ${selectedColors.has(color) ? styles.colorBtnActive : ''}`}
                onClick={() => onColorToggle(color, !selectedColors.has(color))}
              >
                <span className={styles.colorDot} style={{ backgroundColor: colorMap[color] }} />
                <span>{color.charAt(0).toUpperCase() + color.slice(1)}</span>
              </button>
            ))}
          </div>
        </div>

        <div className={styles.sizeFilters}>
          <span className={styles.filterLabel}>Talla Referencia:</span>
          <div className={styles.buttonGroup}>
            {availableSizes.slice(0, 4).map((size) => (
              <button
                key={size}
                className={`${styles.sizeBtn} ${selectedSizes.has(size) ? styles.sizeBtnActive : ''}`}
                onClick={() => onSizeToggle(size, !selectedSizes.has(size))}
              >
                {sizeLabels[size] || size}
              </button>
            ))}
          </div>

          <div className={styles.tagsGroup}>
            <button
              className={`${styles.tagBtn} ${endemicOnly ? styles.tagBtnActive : ''}`}
              onClick={() => onEndemicToggle(!endemicOnly)}
            >
              Endémica COL
            </button>
            <button className={styles.tagBtn}>Cola raqueta</button>
            <button className={styles.tagBtn}>Cresta eréctil</button>
            <button className={styles.tagBtn}>Con audio voucher</button>
          </div>
        </div>

        <div className={styles.filterFooter}>
          <span className={styles.filterCount}>
            {filterCount} filtros aplicados • 8 de 12 especies candidatas
          </span>
          <button className={styles.resetBtn} onClick={onReset}>
            Restablecer
          </button>
        </div>
      </div>
    </section>
  )
})
