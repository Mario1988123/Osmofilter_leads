# ⚡ INSTRUCCIONES DE INSTALACIÓN - COPIA Y PEGA

## 📋 LO QUE VAS A HACER:

1. Abrir la terminal/CMD
2. Copiar y pegar 4 comandos
3. Configurar 2 secrets en GitHub
4. ¡Listo! Tu panel estará funcionando

---

## 🖥️ PASO 1: ABRIR TERMINAL

**Windows:**
- Presiona `Win + R`
- Escribe `cmd` y presiona Enter

**Mac:**
- Presiona `Cmd + Espacio`
- Escribe `Terminal` y presiona Enter

**Linux:**
- Presiona `Ctrl + Alt + T`

---

## 📝 PASO 2: COPIAR Y PEGAR ESTOS 4 COMANDOS

**COMANDO 1:** Navegar a tu carpeta de proyectos (ajusta la ruta si es necesario)
```bash
cd Documents
```

**COMANDO 2:** Clonar este repositorio
```bash
git clone https://github.com/TU-USUARIO/osmofilter-crm-leads.git
```
⚠️ **IMPORTANTE:** Reemplaza `TU-USUARIO` por tu nombre de usuario de GitHub

**COMANDO 3:** Entrar a la carpeta
```bash
cd osmofilter-crm-leads
```

**COMANDO 4:** Subir todo a GitHub
```bash
git add .
git commit -m "Configuración inicial Osmofilter CRM"
git push origin main
```

---

## 🔐 PASO 3: CONFIGURAR SECRETS EN GITHUB

1. **Abre tu navegador** y ve a:
   ```
   https://github.com/TU-USUARIO/osmofilter-crm-leads
   ```

2. Click en **Settings** (arriba a la derecha)

3. En el menú lateral izquierdo:
   - Click en **Secrets and variables**
   - Click en **Actions**

4. Click en el botón verde **New repository secret**

5. **Añadir SECRET 1:**
   - Name: `GOOGLE_API_KEY`
   - Secret: `AIzaSyCD0ZYbTzL-0jJmafElcnD20TiG4bnQl7I`
   - Click **Add secret**

6. Click nuevamente en **New repository secret**

7. **Añadir SECRET 2:**
   - Name: `SEARCH_ENGINE_ID`
   - Secret: `355217cd922dc41ac`
   - Click **Add secret**

---

## 🌐 PASO 4: ACTIVAR GITHUB PAGES

1. En tu repositorio, click en **Settings**

2. En el menú lateral, busca y click en **Pages**

3. En la sección **Source**:
   - Branch: Selecciona **main**
   - Folder: Selecciona **/ (root)**
   - Click **Save**

4. **Espera 2-3 minutos**

5. Refresca la página

6. Verás un mensaje verde con tu URL:
   ```
   Your site is live at https://TU-USUARIO.github.io/osmofilter-crm-leads/
   ```

---

## ✅ ¡LISTO! ACCEDE A TU PANEL

Tu panel web estará disponible en:
```
https://TU-USUARIO.github.io/osmofilter-crm-leads/
```

---

## 🚀 EJECUTAR LA PRIMERA BÚSQUEDA MANUALMENTE

1. En tu repositorio de GitHub, click en **Actions** (pestaña arriba)

2. En el menú lateral izquierdo, click en **Búsqueda Diaria de Empresas**

3. Click en el botón gris **Run workflow** (a la derecha)

4. Click en el botón verde **Run workflow**

5. Espera 1-2 minutos

6. Refresca tu panel web para ver los resultados

---

## 📅 BÚSQUEDA AUTOMÁTICA

A partir de ahora, **TODOS LOS DÍAS A LAS 9:00 AM** se ejecutará automáticamente la búsqueda.

No tienes que hacer nada más. El sistema:
- ✅ Buscará empresas nuevas
- ✅ Las añadirá al panel
- ✅ Te las mostrará pendientes de revisar

---

## ❓ ¿PROBLEMAS?

**Si algo no funciona:**

1. Verifica que los Secrets estén bien escritos (sin espacios extra)
2. Asegúrate de que GitHub Pages esté activado
3. Revisa en **Actions** si hay algún error en rojo

---

## 🎯 PRÓXIMOS PASOS

Una vez funcionando:

1. **Añade más palabras clave** desde el panel
2. **Revisa las empresas** encontradas
3. **Marca el estado** de cada una
4. **Añade productos** que detectes

---

**¿TODO CLARO? ¡EMPIEZA CON EL COMANDO 1!** 🚀
