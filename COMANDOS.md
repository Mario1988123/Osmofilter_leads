# 📋 COMANDOS PARA COPIAR Y PEGAR

## SI USAS WINDOWS:

Abre CMD (Win + R, escribe `cmd`, Enter) y copia estos comandos UNO POR UNO:

```bash
cd Documents
```

Luego descarga y descomprime el ZIP de este proyecto, y ejecuta:

```bash
cd osmofilter-crm-leads
```

```bash
git init
```

```bash
git add .
```

```bash
git commit -m "Configuración inicial Osmofilter CRM"
```

Ahora crea el repositorio en GitHub (https://github.com/new):
- Repository name: `osmofilter-crm-leads`
- PUBLIC
- Click "Create repository"

Cuando esté creado, reemplaza TU-USUARIO por tu usuario de GitHub y ejecuta:

```bash
git remote add origin https://github.com/TU-USUARIO/osmofilter-crm-leads.git
```

```bash
git branch -M main
```

```bash
git push -u origin main
```

---

## SI USAS MAC/LINUX:

Abre Terminal y ejecuta estos comandos:

```bash
cd ~/Documents
```

Descarga y descomprime el ZIP, luego:

```bash
cd osmofilter-crm-leads
chmod +x install.sh
./install.sh
```

---

## CONFIGURAR SECRETS (TODOS LOS SISTEMAS)

1. Ve a: `https://github.com/TU-USUARIO/osmofilter-crm-leads/settings/secrets/actions`

2. Click "New repository secret"

3. Añade:
   ```
   Name: GOOGLE_API_KEY
   Value: AIzaSyCD0ZYbTzL-0jJmafElcnD20TiG4bnQl7I
   ```

4. Click "Add secret"

5. Click nuevamente "New repository secret"

6. Añade:
   ```
   Name: SEARCH_ENGINE_ID
   Value: 355217cd922dc41ac
   ```

7. Click "Add secret"

---

## ACTIVAR GITHUB PAGES

1. Ve a: `https://github.com/TU-USUARIO/osmofilter-crm-leads/settings/pages`

2. Source: `Deploy from a branch`

3. Branch: `main` → Folder: `/ (root)`

4. Click `Save`

5. Espera 2-3 minutos

---

## ACCEDER AL PANEL

Tu panel estará en:
```
https://TU-USUARIO.github.io/osmofilter-crm-leads/
```

---

## ✅ ¡LISTO!

El sistema buscará empresas automáticamente todos los días a las 9 AM.

Puedes ejecutar búsquedas manuales en:
`https://github.com/TU-USUARIO/osmofilter-crm-leads/actions`
