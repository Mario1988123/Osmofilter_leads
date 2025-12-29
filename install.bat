@echo off
echo ========================================
echo   OSMOFILTER CRM LEADS - INSTALACION
echo ========================================
echo.

REM Verificar si Git está instalado
git --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Git no esta instalado
    echo.
    echo Por favor instala Git desde: https://git-scm.com/download/win
    echo.
    pause
    exit /b 1
)

echo [1/4] Inicializando repositorio Git...
git init
git add .
git commit -m "Configuracion inicial Osmofilter CRM"
echo.

echo [2/4] Ahora necesitas crear el repositorio en GitHub:
echo.
echo 1. Abre https://github.com/new
echo 2. Repository name: osmofilter-crm-leads
echo 3. Dejalo PUBLICO
echo 4. NO marques ninguna opcion (README, .gitignore, license)
echo 5. Click en "Create repository"
echo.
echo Una vez creado, presiona cualquier tecla para continuar...
pause >nul
echo.

set /p username="Introduce tu nombre de usuario de GitHub: "
echo.

echo [3/4] Conectando con GitHub...
git remote add origin https://github.com/%username%/osmofilter-crm-leads.git
git branch -M main
git push -u origin main
echo.

echo [4/4] Subiendo archivos a GitHub...
echo.

echo ========================================
echo   INSTALACION COMPLETADA!
echo ========================================
echo.
echo PROXIMOS PASOS:
echo.
echo 1. Configurar Secrets en GitHub (ver SETUP.md)
echo 2. Activar GitHub Pages (ver SETUP.md)
echo 3. Acceder a tu panel web
echo.
echo Tu panel estara en:
echo https://%username%.github.io/osmofilter-crm-leads/
echo.
echo Lee el archivo SETUP.md para instrucciones detalladas
echo.
pause
