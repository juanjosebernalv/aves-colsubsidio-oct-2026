# ⌨️ Comandos Útiles

## Desarrollo

### Iniciar en Modo Desarrollo
```bash
npm run dev
```
- Abre http://localhost:3000
- Hot reload automático
- Errores en tiempo real

### Iniciar en Puerto Personalizado
```bash
npm run dev -- -p 3001
```

### Verificar Tipos TypeScript
```bash
npm run type-check
```

---

## Compilación

### Build Producción
```bash
npm run build
```
Genera:
- `.next/` - Archivos compilados
- `.next/static/` - Assets estáticos
- Optimizaciones y compresión

### Iniciar Versión Compilada
```bash
npm start
```

### Build y Start Juntos
```bash
npm run build && npm start
```

---

## Análisis

### Analizar Tamaño del Bundle
```bash
npm run build
# Busca resumen en la consola
```

### Verificar Importes No Utilizados
```bash
npm run type-check
```

---

## Linting y Validación

### Lint del Código
```bash
npm run lint
```

### Lint y Corregir Automáticamente
```bash
npm run lint -- --fix
```

---

## Gestión de Dependencias

### Ver Versiones Instaladas
```bash
npm list
```

### Ver Actualizaciones Disponibles
```bash
npm outdated
```

### Actualizar Todas las Dependencias
```bash
npm update
```

### Actualizar un Paquete Específico
```bash
npm update next@latest
npm update react@latest
```

### Instalar Nueva Dependencia
```bash
npm install nombre-paquete
npm install --save-dev nombre-paquete-dev
```

### Desinstalar Dependencia
```bash
npm uninstall nombre-paquete
```

### Limpiar Caché de npm
```bash
npm cache clean --force
```

---

## Solución de Problemas

### El proyecto no inicia
```bash
# 1. Limpia todo
rm -rf node_modules package-lock.json .next

# 2. Instala de nuevo
npm install

# 3. Intenta iniciar
npm run dev
```

### Error de módulos
```bash
# Opción 1: Limpia y reinstala
rm -rf node_modules
npm install

# Opción 2: Fuerza el re-install
npm install --legacy-peer-deps
```

### Puerto en uso
```bash
# Encuentra qué usa el puerto 3000
lsof -i :3000

# O simplemente usa otro puerto
npm run dev -- -p 3001
```

### Errores de compilación
```bash
# Verifica tipos
npm run type-check

# Ejecuta lint
npm run lint

# Limpia y rebuilds
npm run build
```

### La BD no funciona
```bash
# Abre DevTools (F12)
# Ve a Storage → IndexedDB
# Verifica que exista "BirdsDB"
# Si no, recarga la página
```

---

## Debugging

### Ver Logs de Servidor
```bash
# Los logs aparecen en la terminal donde ejecutaste npm run dev
```

### DevTools del Navegador
```bash
# Windows: F12 o Ctrl+Shift+I
# Mac: Cmd+Option+I
# Linux: F12
```

### Ver Logs de Cliente
```bash
# En DevTools → Console
# Verás todos los console.log() de la app
```

### Debuggear IndexedDB
```bash
# DevTools → Application/Storage → IndexedDB → BirdsDB
# Ver todos los registros de aves
```

### Debuggear localStorage
```bash
# DevTools → Application/Storage → Local Storage
# Ver clave 'birds-store'
```

---

## Deployment

### Deploy a Vercel (Recomendado)
```bash
# 1. Instala Vercel CLI
npm i -g vercel

# 2. Deploy
vercel

# 3. Sigue las instrucciones
```

### Deploy a Netlify
```bash
# 1. Conecta tu repo en netlify.com
# 2. Configuración automática para Next.js
# 3. Deploy automático en cada push
```

### Deploy Manual a Servidor
```bash
# 1. Build
npm run build

# 2. Copia la carpeta .next a tu servidor
# 3. Instala dependencias en servidor
# 4. Ejecuta npm start
```

---

## Seguridad

### Buscar Vulnerabilidades
```bash
npm audit
```

### Reparar Vulnerabilidades Automáticamente
```bash
npm audit fix
```

### Reparar Forzadamente
```bash
npm audit fix --force
```

---

## Performance

### Analizar Tiempo de Build
```bash
time npm run build
```

### Optimizar Imágenes
```bash
# Verifica que no haya imágenes sin optimizar
npm run lint
```

### Analizar Bundle
```bash
npm run build
# Busca "Compiling client and server" en la salida
```

---

## Git

### Ver Estado
```bash
git status
```

### Agregar Cambios
```bash
git add .
```

### Crear Commit
```bash
git commit -m "Descripción de cambios"
```

### Push a Repositorio
```bash
git push origin main
```

### Ver Historial
```bash
git log --oneline -10
```

---

## Scripts Disponibles

```json
{
  "dev": "next dev",           // Desarrollo
  "build": "next build",       // Compilar
  "start": "next start",       // Ejecutar compilado
  "lint": "next lint",         // Verificar código
  "type-check": "tsc --noEmit" // Verificar tipos
}
```

---

## Trucos de Productividad

### Ejecutar Comando Corto
```bash
# En lugar de:
npm run dev

# Puedes usar:
npm run dev  # con tecla Enter
```

### Monitorear Cambios
```bash
# Recompila automáticamente
npm run build -- --watch
```

### Terminal Dividida
```bash
# En VS Code:
# Terminal → Nueva Terminal (Ctrl+Shift+`)
# Una terminal para npm run dev
# Otra para otros comandos
```

### Alias en Terminal
```bash
# En ~/.bashrc o ~/.zshrc
alias nd="npm run dev"
alias nb="npm run build"
alias ns="npm start"

# Entonces puedes usar:
nd  # en lugar de npm run dev
```

---

## Información del Proyecto

### Ver Versiones
```bash
node --version      # v18.x.x
npm --version       # 9.x.x
next --version      # 15.1.3
```

### Espacio en Disco
```bash
# Tamaño actual
du -sh .

# Desglose por carpeta
du -sh node_modules
du -sh .next
du -sh public
```

---

## Tips Finales

1. **Siempre guarda**: Ctrl+S (Cmd+S en Mac)
2. **Limpia caché**: Ctrl+Shift+Delete en el navegador
3. **Reinicia si hay dudas**: Es lo primero a intentar
4. **Lee los errores**: Dicen qué pasó y dónde
5. **Usa DevTools**: Aprenderás mucho

---

**¿Necesitas algo más? Mira [README_INICIO_RAPIDO.md](README_INICIO_RAPIDO.md)**
