#!/bin/bash

echo "========================================"
echo "  OSMOFILTER CRM LEADS - INSTALACIÓN"
echo "========================================"
echo ""

# Verificar si Git está instalado
if ! command -v git &> /dev/null; then
    echo "❌ ERROR: Git no está instalado"
    echo ""
    echo "Por favor instala Git:"
    echo "  Mac: brew install git"
    echo "  Linux: sudo apt-get install git"
    echo ""
    exit 1
fi

echo "[1/4] Inicializando repositorio Git..."
git init
git add .
git commit -m "Configuración inicial Osmofilter CRM"
echo ""

echo "[2/4] Ahora necesitas crear el repositorio en GitHub:"
echo ""
echo "1. Abre https://github.com/new"
echo "2. Repository name: osmofilter-crm-leads"
echo "3. Déjalo PÚBLICO"
echo "4. NO marques ninguna opción (README, .gitignore, license)"
echo "5. Click en 'Create repository'"
echo ""
read -p "Una vez creado, presiona ENTER para continuar..."
echo ""

read -p "Introduce tu nombre de usuario de GitHub: " username
echo ""

echo "[3/4] Conectando con GitHub..."
git remote add origin https://github.com/$username/osmofilter-crm-leads.git
git branch -M main
git push -u origin main
echo ""

echo "[4/4] Subiendo archivos a GitHub..."
echo ""

echo "========================================"
echo "  ✅ INSTALACIÓN COMPLETADA!"
echo "========================================"
echo ""
echo "PRÓXIMOS PASOS:"
echo ""
echo "1. Configurar Secrets en GitHub (ver SETUP.md)"
echo "2. Activar GitHub Pages (ver SETUP.md)"
echo "3. Acceder a tu panel web"
echo ""
echo "Tu panel estará en:"
echo "https://$username.github.io/osmofilter-crm-leads/"
echo ""
echo "Lee el archivo SETUP.md para instrucciones detalladas"
echo ""
