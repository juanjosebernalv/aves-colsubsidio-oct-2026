# 🎨 Personalización

## Cambios Simples (5-10 minutos)

### 1. Cambiar el Título
**Archivo**: `app/layout.tsx`

```typescript
// Busca:
export const metadata: Metadata = {
  title: 'Global Big Day - Lista de Aves',
  
// Cambia a:
  title: 'Mi Aplicación de Aves - 2024',
```

### 2. Cambiar los Colores Principales
**Archivo**: `tailwind.config.ts`

```typescript
theme: {
  extend: {
    colors: {
      dark: {
        50: '#f1f5f9',      // Texto principal
        900: '#0f172a',     // Fondo principal
        // Cambia los valores hexadecimales
      }
    }
  }
}
```

### 3. Cambiar Colores de Gradientes
**Archivo**: `app/globals.css`

```css
.gradient-primary {
  /* De azul/cian a verde/naranja */
  background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
}
```

### 4. Cambiar Descripciones
**Archivo**: `app/page.tsx`

```typescript
// Busca este texto:
<p className="text-dark-400">
  Registra cada ave que veas durante el Global Big Day
</p>

// Cambia a tu descripción:
<p className="text-dark-400">
  Mi lista personal de observaciones de aves en Piscilago
</p>
```

### 5. Cambiar Mensajes
**Archivo**: `app/page.tsx`

```typescript
// Busca:
"Aún no has registrado aves. ¡Comienza ahora!"

// Cambia a:
"Todavía no hay aves. ¡Agrega tu primer avistamiento!"
```

### 6. Cambiar Iconos
**Archivo**: `app/page.tsx` (busca los emojis)

```typescript
// Algunos emojis útiles:
🐦 🦅 🦜 🪶 🕊️ 🦆 🦢 🐦‍⬛ 🦉 🦚 🦃
```

### 7. Cambiar el Ícono de la App
**Archivo**: `app/layout.tsx`

```typescript
// Busca:
href="data:image/svg+xml,<svg xmlns='...'><text y='75' font-size='75'>🐦</text></svg>"

// Cambia el emoji 🐦 por otro
```

---

## Cambios Moderados (20-30 minutos)

### 1. Agregar Nuevo Campo al Formulario
**Archivo**: `components/AddBirdModal.tsx`

```typescript
// En el estado:
const [formData, setFormData] = useState({
  name: '',
  scientificName: '',
  description: '',
  time: '',
  date: '',
  // Agrega:
  location: '',  // Nueva ubicación
  rarity: 'común',  // Rareza del ave
})

// En el formulario:
<div>
  <label className="block text-sm font-medium text-dark-200 mb-2">
    Ubicación
  </label>
  <input
    type="text"
    name="location"
    value={formData.location}
    onChange={handleChange}
    placeholder="Ej: Bosque Seco, Acuático"
  />
</div>
```

### 2. Cambiar el Layout de la Tarjeta
**Archivo**: `components/BirdCard.tsx`

```typescript
// Cambia el grid de:
<div className="bg-gradient-card rounded-lg p-4 border border-dark-700">

// A:
<div className="bg-gradient-card rounded-xl p-6 border-2 border-blue-500">
```

### 3. Cambiar el Número de Columnas
**Archivo**: `components/BirdListView.tsx`

```typescript
// Busca:
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

// Cambia a más columnas:
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
```

### 4. Agregar Categorías de Aves
**Archivo**: `lib/store.ts`

```typescript
interface Bird {
  id: string
  name: string
  scientificName: string
  description: string
  time: string
  date: string
  category: 'raptor' | 'acuática' | 'terrestre'  // Nuevo
  synced: boolean
}
```

### 5. Cambiar Tamaño de Fuentes
**Archivo**: `app/globals.css`

```css
body {
  /* Cambia el tamaño base de fuente */
  font-size: 16px;  /* De 16px a otro tamaño */
}
```

---

## Cambios Avanzados (1-3 horas)

### 1. Integrar con eBird API

**Archivo**: `lib/ebird.ts` (crear nuevo)

```typescript
export async function searchBirdOnEBird(name: string) {
  const response = await fetch(
    `https://api.ebird.org/v2/ref/taxonomy/ebird?locale=es&key=YOUR_API_KEY&q=${name}`
  )
  return response.json()
}
```

### 2. Agregar Mapas (Leaflet)

```bash
npm install leaflet react-leaflet
```

**Archivo**: `components/BirdMap.tsx` (crear nuevo)

```typescript
'use client'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'

export default function BirdMap({ lat, lng }) {
  return (
    <MapContainer center={[lat, lng]} zoom={13} style={{ height: '400px' }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Marker position={[lat, lng]}>
        <Popup>Aves vistas aquí</Popup>
      </Marker>
    </MapContainer>
  )
}
```

### 3. Agregar Gráficos (Chart.js)

```bash
npm install chart.js react-chartjs-2
```

**Archivo**: `components/BirdStats.tsx` (crear nuevo)

```typescript
import { Line } from 'react-chartjs-2'

export default function BirdStats({ birds }) {
  const data = {
    labels: dates,
    datasets: [{
      label: 'Aves por día',
      data: counts,
      borderColor: 'rgb(75, 192, 192)',
    }],
  }
  return <Line data={data} />
}
```

### 4. Agregar Búsqueda y Filtros

**Archivo**: `app/page.tsx`

```typescript
const [searchTerm, setSearchTerm] = useState('')

const filteredBirds = birds.filter(bird =>
  bird.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
  bird.scientificName.toLowerCase().includes(searchTerm.toLowerCase())
)
```

### 5. Exportar a CSV

**Archivo**: `lib/export.ts` (crear nuevo)

```typescript
export function exportToCSV(birds) {
  const csv = [
    ['Nombre', 'Científico', 'Hora', 'Fecha'],
    ...birds.map(b => [b.name, b.scientificName, b.time, b.date])
  ].map(row => row.join(',')).join('\n')
  
  const blob = new Blob([csv], { type: 'text/csv' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'aves.csv'
  a.click()
}
```

### 6. Agregar Fotografías

**Archivo**: `components/AddBirdModal.tsx`

```typescript
const [image, setImage] = useState<File | null>(null)

const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  if (e.target.files) {
    setImage(e.target.files[0])
  }
}

// En el formulario:
<input type="file" accept="image/*" onChange={handleImageChange} />
```

### 7. Sincronización con eBird

**Archivo**: `lib/sync.ts` (crear nuevo)

```typescript
export async function syncWithEBird(birds) {
  const ebird_api_key = process.env.NEXT_PUBLIC_EBIRD_KEY
  
  for (const bird of birds) {
    await fetch('https://api.ebird.org/v2/submit/upload/ebird', {
      method: 'POST',
      headers: { 'X-eBird-Api-Key': ebird_api_key },
      body: JSON.stringify(bird)
    })
  }
}
```

---

## Paletas de Color Listas

### Paleta Bosque
```
Fondo: #1a1e2e
Primario: #16a34a (verde)
Secundario: #8b5cf6 (púrpura)
```

### Paleta Marina
```
Fondo: #0c1117
Primario: #0ea5e9 (cian)
Secundario: #f97316 (naranja)
```

### Paleta Tropical
```
Fondo: #0f172a
Primario: #ec4899 (rosa)
Secundario: #f59e0b (ámbar)
```

---

## Mejoras Futuras Sugeridas

1. **Autenticación** - Login con Google/GitHub
2. **Sincronización en Nube** - Firebase, Supabase
3. **IA de Identificación** - Detectar aves de fotos
4. **Notificaciones** - Alertas de aves raras
5. **Comunidad** - Compartir avistamientos
6. **Grabación de Audio** - Guardar cantos de aves
7. **Realidad Aumentada** - Ver aves superpuestas

---

**Necesitas ayuda? Mira [ESTRUCTURA_PROYECTO.md](ESTRUCTURA_PROYECTO.md) para entender dónde está todo.**
