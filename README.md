# 🔍 Osmofilter CRM Leads

Sistema automático de búsqueda y gestión de empresas del sector de tratamiento de agua.

## ✨ Características

- 📋 **Panel web completo** para gestión de empresas
- 🔍 **Búsqueda automática diaria** en Google
- ✅ **Sistema de estados** (Captado, Mi Cliente, Cliente Compañero, En Proceso)
- 🛠️ **Detección de productos** vendidos por cada empresa
- 🎯 **Gestión de palabras clave** personalizables
- ❓ **Sistema de revisión** para páginas dudosas
- 📊 **Estadísticas** en tiempo real

## 🚀 Configuración Inicial

### Paso 1: Configurar Secrets en GitHub

1. Ve a tu repositorio en GitHub
2. Click en **Settings** (arriba a la derecha)
3. En el menú lateral → **Secrets and variables** → **Actions**
4. Click en **New repository secret**
5. Añade estos 2 secrets:

**Secret 1:**
- Name: `GOOGLE_API_KEY`
- Value: `AIzaSyCD0ZYbTzL-0jJmafElcnD20TiG4bnQl7I`

**Secret 2:**
- Name: `SEARCH_ENGINE_ID`
- Value: `355217cd922dc41ac`

### Paso 2: Activar GitHub Pages

1. En tu repositorio → **Settings** → **Pages**
2. En **Source** selecciona: **Deploy from a branch**
3. En **Branch** selecciona: **main** y carpeta **/ (root)**
4. Click en **Save**
5. Espera 1-2 minutos

### Paso 3: Acceder al Panel

Tu panel estará disponible en:
```
https://TU-USUARIO.github.io/osmofilter-crm-leads/
```

## 📅 Búsqueda Automática

- **Se ejecuta automáticamente** todos los días a las 9:00 AM
- Busca empresas usando las palabras clave configuradas
- Añade empresas nuevas automáticamente
- Páginas dudosas van a revisión manual

### Ejecutar búsqueda manualmente

1. Ve a tu repositorio en GitHub
2. Click en la pestaña **Actions**
3. En el lateral izquierdo, click en **Búsqueda Diaria de Empresas**
4. Click en **Run workflow** (botón gris a la derecha)
5. Click en el botón verde **Run workflow**
6. Espera 1-2 minutos y refresca la página del panel

## 📖 Cómo Usar el Panel

### 📋 Empresas
- **Filtrar** por estado, producto o búsqueda
- **Editar** empresas para cambiar estado, añadir productos, notas
- **Eliminar** empresas que no sean relevantes

### 🛠️ Productos
- **Añadir** productos que detectes en las empresas
- Ver cuántas empresas venden cada producto
- **Filtrar** empresas por producto

### 🔍 Palabras Clave
- **Añadir** nuevas palabras clave para futuras búsquedas
- Ver cuántos resultados ha encontrado cada palabra
- **Eliminar** keywords que no sean útiles

### ❓ En Duda
- **Revisar** páginas que el sistema no pudo clasificar
- **Añadir** a empresas o **Descartar**

## 🎯 Estados de Empresas

- ⏳ **Pendiente**: Recién encontrada, sin revisar
- ✅ **Captado**: Empresa identificada como potencial cliente
- 👤 **Mi Cliente**: Tu cliente personal
- 👥 **Cliente Compañero**: Cliente de otro comercial
- 🔄 **En Proceso**: Negociación en curso

## 🔧 Personalización

### Añadir más palabras clave
Edita el archivo `data/keywords.json` o usa el panel web.

### Modificar frecuencia de búsqueda
Edita `.github/workflows/daily-search.yml` línea 5:
```yaml
- cron: '0 8 * * *'  # Cambiar hora aquí (formato: minuto hora * * *)
```

## 📊 Archivos de Datos

- `data/companies.json` - Base de datos de empresas
- `data/keywords.json` - Palabras clave de búsqueda
- `data/products.json` - Productos detectados
- `data/doubts.json` - Páginas pendientes de revisión

## 🆘 Soporte

Si necesitas ayuda:
1. Verifica que los Secrets estén configurados correctamente
2. Revisa los logs en GitHub Actions para ver errores
3. Asegúrate de que GitHub Pages esté activado

---

**Creado para Osmofilter** 🚰💧
