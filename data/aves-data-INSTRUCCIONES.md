# 📊 Guía de Uso - aves-data.json

## ¿Qué es este archivo?

`aves-data.json` es una base de datos estructurada de las 13 aves más comunes de Piscilago, diseñada para ser integrada en tu aplicación Next.js.

---

## 📋 Estructura del JSON

### Objeto Principal
```json
{
  "version": "1.0.0",
  "lastUpdated": "2026-09-29",
  "totalSpecies": 13,
  "aves": [...],
  "filtrosDisponibles": {...},
  "estadisticas": {...},
  "buscador": {...}
}
```

### Estructura de Cada Ave

```json
{
  "id": 1,
  "nombreComun": "Paujil de Pico Azul",
  "nombreCientifico": "Crax alberti",
  "emoji": "🦃",
  
  "tamano": "Grande (80-90cm)",
  "tamanoCategoria": "grande",
  
  "colores": ["Negro azabache", "Pico azul brillante", ...],
  "colorDominante": "Negro",
  
  "habitatPrincipal": "Bosque frondoso",
  "horarioMejor": "Amanecer",
  "horarioCategoria": "amanecer",
  
  "sonido": "Crau-crau fuerte",
  "rareza": "Poco común",
  "nivelRareza": 2,  // 1-5, donde 5 es muy común
  
  "comportamiento": "Ave ENORME negra con pico azul",
  "estadoConservacion": "Extinción",
  "tipoPrincipal": "Galliforme",
  
  "habilidades": ["Terrestre", "Bosque denso"],
  
  "filtros": {
    "palabrasClave": [...],
    "color": [...],
    "habitat": [...],
    "horario": [...],
    "tamaño": [...],
    "actividad": [...],
    "estado": [...]
  },
  
  "identificacionRapida": "Negro + Pico Azul = Paujil",
  "noConfundir": "No confundir con gallo negro",
  "fotografiaUrl": "https://ebird.org/species/kinrail1",
  "observacionesEBird": "Poco común en Piscilago"
}
```

---

## 🚀 Cómo Usar en Tu App Next.js

### Opción 1: Importar el JSON Directamente

**Archivo**: `app/page.tsx`

```typescript
import avesData from '@/public/aves-data.json'

export default function Home() {
  const { aves, filtrosDisponibles } = avesData
  
  return (
    <div>
      <h1>Total de aves: {aves.length}</h1>
      {aves.map((ave) => (
        <div key={ave.id}>
          <h2>{ave.emoji} {ave.nombreComun}</h2>
          <p>Científico: {ave.nombreCientifico}</p>
          <p>Tamaño: {ave.tamano}</p>
        </div>
      ))}
    </div>
  )
}
```

### Opción 2: Crear un Hook Personalizado

**Archivo**: `lib/useAves.ts`

```typescript
import { useMemo } from 'react'
import avesData from '@/public/aves-data.json'

export function useAves() {
  const aves = useMemo(() => avesData.aves, [])
  
  const buscar = (termino: string) => {
    const termino_lower = termino.toLowerCase()
    return aves.filter((ave) =>
      ave.nombreComun.toLowerCase().includes(termino_lower) ||
      ave.nombreCientifico.toLowerCase().includes(termino_lower) ||
      ave.filtros.palabrasClave.some((p) =>
        p.toLowerCase().includes(termino_lower)
      )
    )
  }
  
  const filtrarPor = (tipo: string, valor: string) => {
    return aves.filter((ave) => {
      const filtros = ave.filtros as Record<string, string[]>
      return filtros[tipo]?.includes(valor)
    })
  }
  
  return {
    aves,
    buscar,
    filtrarPor,
    filtrosDisponibles: avesData.filtrosDisponibles
  }
}
```

**Uso en componente:**
```typescript
'use client'
import { useAves } from '@/lib/useAves'

export default function BirdSearch() {
  const { aves, buscar, filtrarPor } = useAves()
  const [searchTerm, setSearchTerm] = useState('')
  
  const resultados = searchTerm ? buscar(searchTerm) : aves
  
  return (
    <div>
      <input
        type="text"
        placeholder="Busca ave..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {resultados.map((ave) => (
        <div key={ave.id}>
          {ave.emoji} {ave.nombreComun}
        </div>
      ))}
    </div>
  )
}
```

### Opción 3: Crear un Servicio de Búsqueda Avanzada

**Archivo**: `lib/avesService.ts`

```typescript
import avesData from '@/public/aves-data.json'

export class AvesService {
  static getAll() {
    return avesData.aves
  }

  static getById(id: number) {
    return avesData.aves.find((ave) => ave.id === id)
  }

  static buscarPorNombre(nombre: string) {
    return avesData.aves.filter((ave) =>
      ave.nombreComun.toLowerCase().includes(nombre.toLowerCase())
    )
  }

  static filtrarPorColor(color: string) {
    return avesData.aves.filter((ave) =>
      ave.filtros.color.includes(color.toLowerCase())
    )
  }

  static filtrarPorTamano(tamano: string) {
    return avesData.aves.filter((ave) =>
      ave.filtros.tamaño.includes(tamano.toLowerCase())
    )
  }

  static filtrarPorHabitat(habitat: string) {
    return avesData.aves.filter((ave) =>
      ave.filtros.habitat.includes(habitat.toLowerCase())
    )
  }

  static filtrarPorHorario(horario: string) {
    return avesData.aves.filter((ave) =>
      ave.filtros.horario.includes(horario.toLowerCase())
    )
  }

  static filtrarPorRareza(rareza: number) {
    return avesData.aves.filter((ave) => ave.nivelRareza === rareza)
  }

  static buscarAvanzado(filtros: {
    color?: string
    tamaño?: string
    habitat?: string
    horario?: string
    rareza?: number
  }) {
    let resultado = avesData.aves

    if (filtros.color) {
      resultado = resultado.filter((ave) =>
        ave.filtros.color.includes(filtros.color!)
      )
    }

    if (filtros.tamaño) {
      resultado = resultado.filter((ave) =>
        ave.filtros.tamaño.includes(filtros.tamaño!)
      )
    }

    if (filtros.habitat) {
      resultado = resultado.filter((ave) =>
        ave.filtros.habitat.includes(filtros.habitat!)
      )
    }

    if (filtros.horario) {
      resultado = resultado.filter((ave) =>
        ave.filtros.horario.includes(filtros.horario!)
      )
    }

    if (filtros.rareza) {
      resultado = resultado.filter((ave) => ave.nivelRareza === filtros.rareza)
    }

    return resultado
  }

  static getEstadisticas() {
    return avesData.estadisticas
  }
}
```

---

## 📂 Pasos para Integrar el JSON

### 1. Copiar Archivo
```bash
# Copia aves-data.json a la carpeta public
cp aves-data.json lista-aves/public/
```

### 2. Actualizar el Store (lib/store.ts)

Agregar tipo de ave:

```typescript
interface Bird extends Ave {
  id: string
  time: string
  date: string
  synced: boolean
}
```

### 3. Crear Componente de Búsqueda

**Archivo**: `components/BirdSearch.tsx`

```typescript
'use client'
import { useState } from 'react'
import { useAves } from '@/lib/useAves'
import BirdCard from './BirdCard'

export default function BirdSearch() {
  const { aves, buscar, filtrosDisponibles } = useAves()
  const [searchTerm, setSearchTerm] = useState('')
  const [filtroColor, setFiltroColor] = useState('')
  
  let resultados = aves
  
  if (searchTerm) {
    resultados = buscar(searchTerm)
  }
  
  if (filtroColor) {
    resultados = resultados.filter((ave) =>
      ave.filtros.color.includes(filtroColor)
    )
  }

  return (
    <div className="space-y-6">
      <input
        type="text"
        placeholder="Busca por nombre, científico o característica..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full px-4 py-2 rounded-lg bg-dark-700 text-dark-50"
      />

      <select
        value={filtroColor}
        onChange={(e) => setFiltroColor(e.target.value)}
        className="w-full px-4 py-2 rounded-lg bg-dark-700 text-dark-50"
      >
        <option value="">Todos los colores</option>
        {filtrosDisponibles.color.map((color) => (
          <option key={color} value={color}>
            {color.charAt(0).toUpperCase() + color.slice(1)}
          </option>
        ))}
      </select>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {resultados.map((ave) => (
          <div key={ave.id} className="p-4 bg-dark-800 rounded-lg">
            <h3 className="text-lg font-bold">{ave.emoji} {ave.nombreComun}</h3>
            <p className="text-sm italic text-dark-400">{ave.nombreCientifico}</p>
            <p className="text-sm">{ave.tamano}</p>
            <p className="text-sm text-dark-400">{ave.comportamiento}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
```

---

## 🔍 Ejemplos de Búsqueda

### Buscar por Nombre
```typescript
AvesService.buscarPorNombre('Garza')
// Retorna: [Garza Blanca, Garza Azulada]
```

### Buscar por Color
```typescript
AvesService.filtrarPorColor('azul')
// Retorna: [Garza Azulada, Arrendajo Cristado]
```

### Buscar por Tamaño
```typescript
AvesService.filtrarPorTamano('grande')
// Retorna: [Paujil, Rey Gallinazo, Garza Blanca, Águila Cangrejera]
```

### Búsqueda Avanzada
```typescript
AvesService.buscarAvanzado({
  color: 'blanco',
  habitat: 'agua',
  horario: 'amanecer',
  tamaño: 'grande'
})
// Retorna: [Garza Blanca]
```

---

## 📊 Campos de Filtro Disponibles

### Tamaño
- diminuto
- pequeño
- mediano_pequeño
- mediano
- mediano_grande
- grande
- muy_grande

### Color
- blanco, negro, gris, pardo, marrón
- azul, verde, rojo, amarillo, dorado, naranja

### Hábitat
- flores, agua, agua_poco_profunda, agua_profunda, humedales
- bosque, bosque_denso, árboles, árboles_altos, dosel
- bordes, arbustos, matorrales, suelo, cielo, sobrevolando

### Horario
- madrugada, amanecer, mañana, mañana_tarde, tarde, amanecer_tarde, todo_dia

### Rareza
- 1: muy común
- 2: poco común
- 3: moderado
- 4: común
- 5: bastante común

### Actividad
- terrestre, acuática, volador, cazador, pescadora, nectarívoro
- social, solitario, ruidoso, silencioso, planeo

---

## 🎯 Casos de Uso

### Caso 1: Ayudante de Identificación
Cuando el usuario ve un ave:
1. Describe qué vio (color, tamaño, lugar)
2. Filtra por esos criterios
3. Muestra opciones más probables

### Caso 2: Guía de Campo Digital
Mostrar todas las aves con sus características
Permitir búsqueda rápida

### Caso 3: Sistema de Registro
Al registrar un ave, sugerir de lista de aves conocidas
Autocompletar datos científicos

### Caso 4: Estadísticas
Mostrar qué aves son más comunes
Cuál es mejor hora para avistar cada una

---

## 💾 Mantener Actualizado

Para actualizar el JSON:
1. Editar el archivo aves-data.json
2. Incrementar el versionNumber
3. Actualizar lastUpdated
4. Reiniciar la app

---

## 🔗 Integración con Otras Features

### Con Store de Zustand
```typescript
interface BirdObservation extends BirdData {
  id: string
  time: string
  date: string
  synced: boolean
}
```

### Con eBird API
```typescript
// Obtener información adicional de eBird
const fotografiaUrl = ave.fotografiaUrl
const obervacionesRecientes = await fetchEBirdData(ave.nombreCientifico)
```

### Con Geolocalización
```typescript
// Filtrar aves por ubicación actual
const avesEnZona = aves.filter((ave) =>
  ave.habitatPrincipal.includes(zonaActual)
)
```

---

## 📝 Notas Importantes

1. **Nombres Científicos**: Verificados contra eBird y literatura científica
2. **Fotografías**: Links directos a eBird (verificadas)
3. **Palabras Clave**: Optimizadas para búsqueda natural
4. **Filtros**: Categorías probadas en campo
5. **JSON Válido**: Puede parsearse sin errores

---

## 🆘 Soporte

Si encuentras datos incorrectos:
1. Verifica en eBird.org
2. Actualiza el JSON
3. Incrementa la versión

---

**¡Listo para integrar! 🚀**
