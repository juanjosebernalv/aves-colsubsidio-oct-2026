# 🏗️ Estructura del Proyecto

## Árbol de Archivos

```
lista-aves/
├── app/
│   ├── layout.tsx           # Layout principal de la app
│   ├── page.tsx             # Página de inicio
│   ├── globals.css          # Estilos globales
│   ├── favicon.ico          # Ícono del navegador
│
├── components/
│   ├── AddBirdModal.tsx     # Modal para agregar aves
│   ├── BirdCard.tsx         # Tarjeta individual de ave
│   ├── BirdListView.tsx     # Vista de lista de aves
│   ├── StatsPanel.tsx       # Panel de estadísticas
│   ├── SyncStatus.tsx       # Indicador de sincronización
│
├── lib/
│   ├── store.ts             # Gestión de estado (Zustand)
│   ├── theme-provider.tsx   # Proveedor de tema oscuro
│
├── public/
│   ├── manifest.json        # Configuración PWA
│   ├── favicon.svg          # Ícono personalizado
│
├── package.json             # Dependencias y scripts
├── tsconfig.json            # Configuración TypeScript
├── tailwind.config.ts       # Configuración Tailwind CSS
├── next.config.ts           # Configuración Next.js
├── postcss.config.mjs       # Configuración PostCSS
├── .eslintrc.json           # Reglas ESLint
├── .gitignore               # Archivos ignorados en git
│
└── README_INICIO_RAPIDO.md  # Guía rápida
```

---

## Componentes Principales

### AddBirdModal.tsx
```
Función: Formulario modal para registrar nuevas aves
Inputs:
  - name: string (nombre común)
  - scientificName: string (nombre científico)
  - description: string (descripción opcional)
  - time: string (hora de avistamiento)
  - date: string (fecha de avistamiento)

Validación: Todos los campos excepto description son requeridos
Gestión de errores: Muestra mensajes al usuario
```

### BirdCard.tsx
```
Función: Tarjeta individual que muestra un ave
Props:
  - bird: Bird (objeto del ave)
  - onDelete: () => void (callback para eliminar)

Características:
  - Eliminar con confirmación
  - Indicador de sincronización
  - Información formateada
```

### BirdListView.tsx
```
Función: Contenedor que agrupa y muestra todas las aves
Props:
  - birds: Bird[] (lista de aves)

Características:
  - Agrupa por fecha
  - Ordena de más reciente a antiguo
  - Responsive (1, 2, 3 columnas)
```

### StatsPanel.tsx
```
Función: Muestra estadísticas en tarjetas
Props:
  - total: number (total de aves)
  - today: number (aves de hoy)
  - synced: number (aves sincronizadas)

Características:
  - Gradientes personalizados
  - Iconos expresivos
  - Diseño responsivo
```

### SyncStatus.tsx
```
Función: Muestra estado de conexión y sincronización
Props:
  - syncedCount: number (aves sincronizadas)
  - totalCount: number (total de aves)

Características:
  - Detección de conexión online/offline
  - Badge de almacenamiento local
  - Alerta de registros pendientes
```

---

## Sistema de Almacenamiento

### Flujo de Datos
```
Usuario Input
    ↓
AddBirdModal (validación)
    ↓
useBirdStore.addBird()
    ↓
IndexedDB (principal)
├─ localStorage (respaldo)
    ↓
Estado React actualizado
    ↓
Componentes re-renderizados
```

### IndexedDB
- Base de datos: `BirdsDB`
- Store: `birds`
- Keypath: `id` (timestamp único)
- Capacidad: Prácticamente ilimitada (GB)

### localStorage
- Key: `birds-store`
- Capacidad: ~5-10 MB
- Solo para respaldo si IndexedDB falla

---

## Gestión de Estado

### useBirdStore (Zustand)
```typescript
interface Bird {
  id: string              // Identificador único
  name: string           // Nombre común
  scientificName: string // Nombre científico
  description: string    // Notas opcionales
  time: string          // Hora (HH:mm)
  date: string          // Fecha (YYYY-MM-DD)
  synced: boolean       // Estado de sincronización
}

Métodos:
- addBird(bird)        // Agregar nuevo ave
- deleteBird(id)       // Eliminar ave
- updateBird(id, data) // Actualizar ave
- loadFromStorage()    // Cargar desde BD
- clearAll()          // Eliminar todo
- markAsSynced(ids)   // Marcar como sincronizado
```

---

## Sistema de Temas

### Colores Oscuros (dark-900 a dark-50)
```
dark-900: #0f172a  (Fondo principal - muy oscuro)
dark-800: #1e293b  (Fondo secundario)
dark-700: #334155  (Bordes y fondos terciarios)
dark-600: #475569  (Hover states)
dark-400: #94a3b8  (Texto secundario)
dark-300: #cbd5e1  (Texto terciario)
dark-200: #e2e8f0  (Texto aclarado)
dark-50:  #f1f5f9 (Texto principal)
```

### Gradientes Personalizados
```css
.gradient-primary   → Azul a gris oscuro
.gradient-card      → Gris a gris más claro
.gradient-stat      → Estadísticas con colores vivos
```

### Animaciones
```css
.animate-fade-in    → Desvanecimiento suave
.animate-slide-up   → Deslizamiento hacia arriba
```

---

## Puntos de Responsividad

### Tailwind Breakpoints
```
sm: 640px   (Tablets pequeñas)
md: 768px   (Tablets)
lg: 1024px  (Desktops pequeños)
xl: 1280px  (Desktops grandes)
```

### Grid Responsivo
```
Mobile (1 col):   grid-cols-1
Tablet (2 cols):  md:grid-cols-2
Desktop (3 cols): lg:grid-cols-3
```

---

## Configuraciones Clave

### next.config.ts
```
reactStrictMode: true  → Detecta problemas en desarrollo
```

### tailwind.config.ts
```
darkMode: 'class'  → Tema oscuro por clase CSS
```

### tsconfig.json
```
strict: true       → Verificación de tipos estricta
baseUrl: '.'       → Rutas desde raíz
paths: @/*         → Alias para importaciones
```

---

## Tamaño del Proyecto

### Dependencias
- Total: ~550 MB instalado
- Bundle producción: ~200 KB (gzipped)
- Assets: ~50 KB

### Base de Datos
- Cada registro de ave: ~500 bytes
- Con 10,000 aves: ~5 MB

---

## Puntos de Entrada

### 1. Servidor
`next dev` → Carga `app/layout.tsx`

### 2. Cliente
`app/page.tsx` → Renderiza interfaz principal

### 3. Componentes
Importados en `page.tsx`:
- AddBirdModal
- BirdListView
- StatsPanel
- SyncStatus

---

## Checklist de Características

- [x] Agregar aves
- [x] Ver lista de aves
- [x] Agrupar por fecha
- [x] Eliminar aves
- [x] Almacenar offline
- [x] Sincronización automática
- [x] Indicador de estado
- [x] Estadísticas en tiempo real
- [x] Tema oscuro
- [x] Responsivo (móvil/tablet/desktop)
- [x] PWA instalable
- [x] Validación de formularios
- [x] Animaciones suaves

---

**¿Quieres modificar algo? Mira [PERSONALIZACION.md](PERSONALIZACION.md)**
