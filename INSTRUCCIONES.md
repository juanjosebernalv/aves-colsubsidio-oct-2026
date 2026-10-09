# 📖 Instrucciones Completas

## Instalación Detallada

### Requisitos Previos
- Node.js 18.0+ ([descargar](https://nodejs.org/))
- npm 9.0+ (incluido con Node.js)
- 2GB de espacio libre en disco
- Navegador moderno

### Paso 1: Preparar el Proyecto
```bash
# Extrae el archivo
tar -xzf lista-aves-source.tar.gz

# Entra en el directorio
cd lista-aves

# Verifica que tengas Node.js
node --version  # debe ser v18.0.0 o superior
npm --version   # debe ser 9.0.0 o superior
```

### Paso 2: Instalar Dependencias
```bash
npm install
```
Esto instala:
- `next@15.1.3` - Framework React
- `react@19` - Librería de interfaz
- `tailwindcss@3.4` - Estilos CSS
- `@mui/icons-material@6.5` - Iconos
- `zustand@4.5` - Gestión de estado
- `typescript@5.7` - Verificación de tipos

### Paso 3: Iniciar en Desarrollo
```bash
npm run dev
```

Verás algo como:
```
▲ Next.js 15.1.3
  Local:        http://localhost:3000
  Environments: .env.local

ready - started server on 0.0.0.0:3000, url: http://localhost:3000
```

### Paso 4: Abre en tu Navegador
Navega a: **http://localhost:3000**

---

## Características Implementadas

### ✅ Registro de Aves
- Modal para agregar nuevas aves
- Campos: nombre común, científico, descripción, hora, fecha
- Validación de formularios
- Feedback visual

### ✅ Almacenamiento Offline
- IndexedDB como base de datos principal
- localStorage como respaldo
- Sincronización automática cuando conecta
- Indicador de estado de sincronización

### ✅ Interfaz Oscura
- Tema oscuro por defecto
- Colores optimizados para batería
- Transiciones suaves
- Responsive en todos los dispositivos

### ✅ Estadísticas
- Total de aves registradas
- Aves registradas hoy
- Aves sincronizadas
- Contador en tiempo real

### ✅ PWA (Progressive Web App)
- Instalable en dispositivos móviles
- Funciona sin conexión
- Icono en pantalla de inicio
- Carga rápida

---

## Compilación para Producción

### Build Estático
```bash
npm run build
npm start
```

### Build para Servidor
```bash
npm run build
# El servidor sirve desde `.next/`
npm start
```

### Deploy a Vercel (Recomendado)
```bash
# Instala Vercel CLI
npm i -g vercel

# Deploy
vercel
```

---

## Uso de la Aplicación

### Agregar un Ave
1. Haz clic en el botón **➕** (abajo a la derecha)
2. Completa los campos:
   - **Nombre Común**: Ej. "Loro Gavilán"
   - **Nombre Científico**: Ej. "Ibycter americanus"
   - **Descripción**: Notas adicionales
   - **Hora**: Automática, puedes cambiar
   - **Fecha**: Hoy por defecto
3. Haz clic en **"Guardar Ave"**

### Ver Tus Registros
- Las aves aparecen en la lista principal
- Agrupadas por fecha
- Ordenadas por hora (más reciente primero)

### Eliminar un Registro
1. En la tarjeta del ave, haz clic en **"Eliminar"**
2. Confirma la acción

### Sincronización
- Automática cuando conectas a internet
- Puedes sincronizar manualmente desde el panel de estado
- ✅ verde = sincronizado
- ⏳ naranja = pendiente de sincronizar

---

## Instalar como PWA

### Android (Chrome)
1. Abre la app en Chrome
2. Toca el menú (⋮) → "Instalar aplicación"
3. Confirma con "Instalar"
4. La app aparecerá en tu inicio

### iPhone/iPad (Safari)
1. Abre en Safari
2. Toca el ícono de compartir (↗)
3. "Agregar a pantalla de inicio"
4. Nombra la app y confirma

### Desktop (Chrome/Edge)
1. Haz clic en el ícono a la derecha de la barra de direcciones
2. "Instalar" o "Instalar aplicación"
3. Se abrirá como ventana separada

---

## Solución de Problemas

### "Error: Cannot find module 'next'"
```bash
rm -rf node_modules package-lock.json
npm install
```

### "Puerto 3000 ya está en uso"
```bash
# Usa otro puerto
npm run dev -- -p 3001
```

### "Los datos no se guardan"
- Asegúrate que IndexedDB esté habilitado
- Prueba en una pestaña normal (no privada)
- Verifica que tengas espacio en el dispositivo

### "La app es lenta"
```bash
# Limpia caché
rm -rf .next node_modules
npm install
npm run build
```

### "TypeScript muestra errores"
```bash
npm run type-check
```

---

## Seguridad y Privacidad

- **Sin servidor**: Todo almacenado localmente
- **Sin rastreo**: No recopilamos datos
- **Sin anuncios**: Aplicación limpia
- **Datos encriptados**: Solo en tu dispositivo
- **Open source**: Código transparente

---

## Próximos Pasos

1. Leer [ESTRUCTURA_PROYECTO.md](ESTRUCTURA_PROYECTO.md) para entender la arquitectura
2. Revisar [PERSONALIZACION.md](PERSONALIZACION.md) para personalizaciones
3. Explorar [COMANDOS_UTILES.md](COMANDOS_UTILES.md) para más comandos

---

**¡Disfruta la app! 🐦**
