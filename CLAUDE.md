# Lista de Aves — Project Rules

## Architecture

```
app/           → Pages (Next.js App Router)
components/    → Feature components
  ui/          → Reusable UI primitives (Button, Modal, FormField)
context/       → Shared application state (AppContext)
lib/           → External integrations (Zustand store, theme)
types/         → Shared TypeScript types
data/          → Static data and its TypeScript types
```

## Rules

### 1. No inline styles
Every component must import a `.module.css` file. All visual classes go in that file using `@apply`.
```tsx
// ✅ Correct
import styles from './MyComponent.module.css'
<div className={styles.card}>

// ❌ Wrong
<div className="bg-surface border rounded-lg p-4">
```

### 2. CSS modules use Tailwind via @apply
Use `@apply` for base styles. Use plain media queries for responsive breakpoints.
```css
/* ✅ Correct */
.grid { @apply grid grid-cols-1 gap-4; }
@media (min-width: 768px) { .grid { grid-template-columns: repeat(2, 1fr); } }

/* ❌ Wrong — responsive @apply not supported in CSS modules */
.grid { @apply grid grid-cols-1 md:grid-cols-2 gap-4; }
```

### 3. Shared types — no duplication
All shared types live in `types/`. Never redefine a type locally if it's already exported.
- `types/observation.ts` → `BirdRecord`, `BirdRecordInput` (user observation records)
- `data/aves.types.ts` → `Bird`, `BirdsData`, etc. (species catalog)

### 4. Shared state via AppContext
Components that need app data must use `useApp()`. Never duplicate state with local useState.
```tsx
// ✅ Correct
const { birds, totalBirds, addBird } = useApp()

// ❌ Wrong — prop drilling or duplicated state
const [birds, setBirds] = useState(storeBirds)
```

`AppContext` exposes: `birds`, `isLoading`, `isOnline`, `totalBirds`, `todayBirds`,
`syncedBirds`, `pendingBirds`, `addBird`, `deleteBird`.

### 5. Reusable UI primitives
Before creating a new component, check `components/ui/`. Use existing primitives:
- `Button` → variants: `primary | secondary | danger | ghost`, sizes: `sm | md | lg`
- `Modal` → overlay + panel + ESC key, sizes: `sm | md | lg`
- `FormField` → label + input/textarea + error message

### 6. Performance
- Wrap feature components in `React.memo` when they receive stable props
- Use `useMemo` for derived computations (grouping, filtering, sorting)
- Use `useCallback` for event handlers passed as props
- FAB and modal open/close handlers in `page.tsx` must be wrapped in `useCallback`

### 7. Zustand store (lib/store.ts)
The store is the persistence layer only. It does NOT:
- Compute derived values (that's AppContext's job)
- Manage UI state (loading spinners, online status, etc.)

### 8. Code language
All identifiers, function names, variable names, and comments must be in English.
String content shown to users (labels, messages) may be in Spanish.

## Tailwind color tokens

| Token | Usage |
|---|---|
| `bg-canvas` | Page background (OLED black) |
| `bg-surface` | Cards, lists |
| `bg-surface-elevated` | Modals, sheets |
| `bg-surface-hover` | Hover / active states |
| `text-primary` / `bg-primary` | Primary action (emerald) |
| `text-secondary` / `bg-secondary` | Taxonomy, metrics (cyan) |
| `text-amber` / `bg-amber` | Conservation alerts |
| `text-on-surface` | Primary text |
| `text-muted` | Secondary text |
| `text-dim` | Disabled / placeholder text |
| `border-tactical` | Hairline borders |

## Typography

| Class | Font | Use |
|---|---|---|
| `font-display` | Space Grotesk | Headlines, bird names |
| `font-body` | Inter | Descriptions, body text |
| `font-mono` | JetBrains Mono | IDs, metrics, tags, badges |
| `text-headline-xl/lg/md` | — | Page and section titles |
| `text-body-lg/md/sm` | — | Paragraphs and labels |
| `text-label-mono` / `text-tag-mono` | — | Compact mono labels |
