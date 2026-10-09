# 🚀 Inicio Rápido - Global Big Day Lista de Aves

## 5 Pasos para Empezar

### 1️⃣ Requisitos Previos
- **Node.js** 18.0 o superior ([Descargar](https://nodejs.org/))
- **npm** 9.0 o superior (viene con Node.js)
- **Navegador moderno** (Chrome, Firefox, Safari, Edge)

### 2️⃣ Extrae el Proyecto
```bash
tar -xzf lista-aves-source.tar.gz
cd lista-aves
```

### 3️⃣ Instala Dependencias
```bash
npm install
```
*Esto descargará todas las librerías necesarias (~500 MB)*

### 4️⃣ Inicia el Servidor de Desarrollo
```bash
npm run dev
```

### 5️⃣ Abre en tu Navegador
Navega a: **http://localhost:3000**

¡Listo! 🎉 La aplicación está corriendo localmente.

---

## ⚡ Primeras Acciones

1. **Haz clic en el botón "➕"** (abajo a la derecha)
2. **Completa el formulario:**
   - Nombre común del ave
   - Nombre científico
   - Descripción (opcional)
   - Hora y fecha
3. **Haz clic en "Guardar Ave"**
4. ¡Verás la ave en la lista! 🐦

---

## 📱 Usar en Móvil

### Instalar como PWA (Aplicación)

**En Chrome/Edge (Android):**
1. Abre la app en el navegador
2. Toca el menú (⋯)
3. Toca "Instalar aplicación"
4. Confirma

**En Safari (iPhone/iPad):**
1. Abre la app en Safari
2. Toca el ícono de compartir
3. Toca "Agregar a pantalla de inicio"
4. Confirma

Ahora puedes usar la app **sin conexión a internet** ✅

---

## 🔧 Comandos Útiles

```bash
# Iniciar desarrollo (modo hot-reload)
npm run dev

# Compilar para producción
npm run build

# Iniciar versión compilada
npm start

# Verificar tipos de TypeScript
npm run type-check

# Linting y validación
npm run lint
```

---

## ❓ Solución de Problemas Básica

### "No puedo acceder a http://localhost:3000"
- Asegúrate que el servidor esté corriendo (`npm run dev`)
- Intenta usar `http://127.0.0.1:3000`
- Verifica que el puerto 3000 no esté en uso

### "npm install falla"
```bash
# Limpia la caché
npm cache clean --force

# Intenta de nuevo
npm install
```

### "La app no guarda datos"
- Asegúrate que IndexedDB esté habilitado en tu navegador
- Intenta en navegación privada (incognito)
- Verifica que haya espacio en el dispositivo

### "El tema oscuro no se ve"
- Presiona F12 (DevTools)
- Verifica que `html` tenga la clase `dark`
- Limpia el caché del navegador (Ctrl+Shift+Del)

---

## 📚 Siguiente Paso

Una vez que la app funcione, lee:
- **[INSTRUCCIONES.md](INSTRUCCIONES.md)** - Guía completa
- **[ESTRUCTURA_PROYECTO.md](ESTRUCTURA_PROYECTO.md)** - Cómo funciona
- **[PERSONALIZACION.md](PERSONALIZACION.md)** - Cómo personalizar

---

## 🎯 Características Principales

✅ **Registro offline** - Funciona sin internet  
✅ **Sincronización automática** - Se sincroniza cuando conecta  
✅ **Tema oscuro** - Optimizado para batería  
✅ **Responsivo** - Funciona en móvil, tablet y desktop  
✅ **PWA** - Instalable como app nativa  
✅ **Sin servidor** - Todo local en tu dispositivo  

---

## 💡 Tips

1. **Guarda datos regularmente** - Usa la app aunque no veas cambios
2. **Pon tu ubicación** - Te ayuda a encontrar aves similares
3. **Usa la descripción** - Anota comportamientos interesantes
4. **Sincroniza cuando puedas** - Cuando tengas wifi/datos
5. **Instala como PWA** - Más rápido que abrir en navegador

---

## 📞 Soporte Rápido

**Error específico?** Busca en [INSTRUCCIONES.md](INSTRUCCIONES.md) - Sección "Solución de Problemas"

**¿Necesitas cambiar algo?** Mira [PERSONALIZACION.md](PERSONALIZACION.md)

**¿Quieres entender el código?** Lee [ESTRUCTURA_PROYECTO.md](ESTRUCTURA_PROYECTO.md)

---

**¡Disfruta registrando aves! 🦅🐦🦜**

Creado para Global Big Day 2024
