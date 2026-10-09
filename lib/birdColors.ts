import type { Bird } from '@/data/birds.types'

export const COLOR_HEX: Record<string, string> = {
  negro: '#1C1C1E',
  blanco: '#E5E7EB',
  gris: '#64748B',
  pardo: '#92400E',
  marrón: '#78350F',
  azul: '#0EA5E9',
  verde: '#10B981',
  rojo: '#EF4444',
  amarillo: '#EAB308',
  dorado: '#D97706',
  naranja: '#F97316',
}

export const DOMINANT_GRADIENT: Record<string, [string, string]> = {
  Negro: ['#18181B', '#27272A'],
  Blanco: ['#1E293B', '#334155'],
  Pardo: ['#451A03', '#78350F'],
  Azul: ['#0C4A6E', '#0369A1'],
  Verde: ['#022C22', '#064E3B'],
  Rojo: ['#450A0A', '#7F1D1D'],
  Amarillo: ['#422006', '#78350F'],
  Naranja: ['#431407', '#7C2D12'],
}

export type StatusVariant = 'endemic' | 'threatened' | 'stable' | 'rare'

export function isEndemicBird(bird: Bird): boolean {
  const check = (s: string) =>
    s.toLowerCase().includes('endémico') || s.toLowerCase().includes('endemico')
  return bird.filters.status.some(check) || bird.filters.keywords.some(check)
}

export function getStatusVariant(conservationStatus: string, endemic: boolean): StatusVariant {
  if (endemic) { return 'endemic' }
  const s = conservationStatus.toLowerCase()
  if (s.includes('extinción') || s.includes('crítico') || s.includes('amenazado') || s.includes('extinto')) {
    return 'threatened'
  }
  if (s.includes('estable') || s.includes('común') || s.includes('abundante')) { return 'stable' }
  return 'rare'
}

export function getDominantGradient(dominantColor: string): [string, string] {
  return DOMINANT_GRADIENT[dominantColor] ?? ['#0B0F12', '#1A232D']
}
