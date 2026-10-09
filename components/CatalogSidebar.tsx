'use client'

import { memo, useCallback } from 'react'
import type { Bird } from '@/data/birds.types'
import { COLOR_HEX } from '@/lib/birdColors'
import styles from './CatalogSidebar.module.css'

interface CatalogSidebarProps {
  searchQuery: string
  endemicOnly: boolean
  selectedColors: Set<string>
  selectedFamilies: Set<string>
  selectedHabitats: Set<string>
  onSearchChange: (query: string) => void
  onEndemicChange: (value: boolean) => void
  onColorChange: (color: string, checked: boolean) => void
  onFamilyChange: (family: string, checked: boolean) => void
  onHabitatChange: (habitat: string, checked: boolean) => void
  onReset: () => void
  birds: Bird[]
}

const HABITAT_OPTIONS = ['Bosque húmedo', 'Bosque seco', 'Montaña', 'Páramo', 'Selva amazónica', 'Sabana', 'Urbano']
const FEATHER_TYPES = ['Brillante', 'Iridiscente', 'Liso', 'Rayado', 'Opaco']

export default memo(function CatalogSidebar({
  searchQuery,
  endemicOnly,
  selectedColors,
  selectedFamilies,
  selectedHabitats,
  onSearchChange,
  onEndemicChange,
  onColorChange,
  onFamilyChange,
  onHabitatChange,
  onReset,
  birds,
}: CatalogSidebarProps) {
  const uniqueFamilies = [...new Set(birds.map((b) => b.mainType))].sort()
  const uniqueColors = [...new Set(birds.flatMap((b) => b.filters.color))].sort()

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    onSearchChange(e.target.value)
  }, [onSearchChange])

  const handleEndemicChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    onEndemicChange(e.target.checked)
  }, [onEndemicChange])

  const handleColorChange = useCallback((color: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    onColorChange(color, e.target.checked)
  }, [onColorChange])

  const handleFamilyChange = useCallback((family: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    onFamilyChange(family, e.target.checked)
  }, [onFamilyChange])

  const handleHabitatChange = useCallback((habitat: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    onHabitatChange(habitat, e.target.checked)
  }, [onHabitatChange])

  return (
    <aside className={styles.sidebar}>
      <div className={styles.container}>
        {/* Sidebar Header */}
        <div className={styles.header}>
          <div className={styles.headerTitle}>
            <span className={styles.tuneIcon}>🎚️</span>
            <h2 className={styles.title}>Filtros</h2>
          </div>
          <button className={styles.resetBtn} onClick={onReset} type="button">
            Reiniciar
          </button>
        </div>

        {/* Search */}
        <div className={styles.section}>
          <label className={styles.searchLabel} htmlFor="catalog-search">
            <span>Buscar</span>
            <span className={styles.idLabel}>ID RÁPIDA</span>
          </label>
          <div className={styles.searchBox}>
            <input
              className={styles.searchInput}
              id="catalog-search"
              placeholder="Nombre del ave..."
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <span className={styles.searchIcon}>🔍</span>
          </div>
        </div>

        {/* Endemic Toggle */}
        <div className={styles.endemicCard}>
          <label className={styles.checkboxLabel} htmlFor="filter-endemic-sidebar">
            <span className={styles.endemicIcon}>✓</span>
            <span className={styles.endemicText}>Solo endémicas</span>
          </label>
          <input
            className={styles.checkbox}
            id="filter-endemic-sidebar"
            type="checkbox"
            checked={endemicOnly}
            onChange={handleEndemicChange}
          />
        </div>

        {/* Colors */}
        <div className={styles.filterGroup}>
          <div className={styles.groupHeader}>
            <h3 className={styles.groupTitle}>Color</h3>
            <span className={styles.groupCount}>{uniqueColors.length}</span>
          </div>
          <div className={styles.colorGrid}>
            {uniqueColors.map((color) => (
              <label key={color} className={styles.colorCheckbox}>
                <input
                  type="checkbox"
                  checked={selectedColors.has(color)}
                  onChange={handleColorChange(color)}
                />
                <span
                  className={styles.colorSwatch}
                  style={{ backgroundColor: COLOR_HEX[color] ?? '#64748B' } as React.CSSProperties}
                />
                <span className={styles.colorName}>{color}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Family */}
        <div className={styles.filterGroup}>
          <h3 className={styles.groupTitle}>Familia Taxonómica</h3>
          <div className={styles.checkboxList}>
            {uniqueFamilies.map((family) => (
              <label key={family} className={styles.checkboxItem}>
                <input
                  type="checkbox"
                  checked={selectedFamilies.has(family)}
                  onChange={handleFamilyChange(family)}
                />
                <span>{family}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Habitat */}
        <div className={styles.filterGroup}>
          <h3 className={styles.groupTitle}>Hábitat</h3>
          <div className={styles.checkboxList}>
            {HABITAT_OPTIONS.map((habitat) => (
              <label key={habitat} className={styles.checkboxItem}>
                <input
                  type="checkbox"
                  checked={selectedHabitats.has(habitat)}
                  onChange={handleHabitatChange(habitat)}
                />
                <span>{habitat}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Feather Type */}
        <div className={styles.filterGroup}>
          <h3 className={styles.groupTitle}>Tipo de Plumaje</h3>
          <div className={styles.tagList}>
            {FEATHER_TYPES.map((featherType) => (
              <button key={featherType} className={styles.tagButton} type="button">
                {featherType}
              </button>
            ))}
          </div>
        </div>
      </div>
    </aside>
  )
})
