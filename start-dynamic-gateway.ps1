# Start Dynamic Gateway (Frontend-main)
# This script starts the Dynamic Gateway React application
# It will automatically find an available port and start Vite

Write-Host "`n╔═══════════════════════════════════════════════════════╗" -ForegroundColor Green
Write-Host "║  🚀 DYNAMIC GATEWAY - STARTUP SCRIPT                  ║" -ForegroundColor Green
Write-Host "╚═══════════════════════════════════════════════════════╝`n" -ForegroundColor Green

# Check if we're in the right directory
$expectedDir = "c:\Users\HomePC\Frontend-main"
$currentDir = Get-Location

if ($currentDir.Path -ne $expectedDir) {
    Write-Host "📂 Changing to Frontend-main directory..." -ForegroundColor Yellow
    Push-Location $expectedDir
}

# Check if Docker services are running
Write-Host "🐳 Checking Docker services..." -ForegroundColor Cyan
$formioServer = docker ps --filter "name=formio-server" --format "{{.Status}}"
$formioMongo = docker ps --filter "name=formio-mongo" --format "{{.Status}}"

if (-not $formioServer -or -not $formioMongo) {
    Write-Host "⚠️  Form.io backend not running!" -ForegroundColor Yellow
    Write-Host "   Run this from formio-docker directory: docker-compose up -d`n" -ForegroundColor Gray
} else {
    Write-Host "✅ Form.io backend is running" -ForegroundColor Green
}

# Check if node_modules exists
if (-not (Test-Path "node_modules")) {
    Write-Host "`n⚠️  node_modules not found. Running npm install..." -ForegroundColor Yellow
    npm install
}

Write-Host "`n▶️  Starting Vite dev server..." -ForegroundColor Cyan
Write-Host "   (Vite will auto-select an available port)`n" -ForegroundColor Gray

# Start the development server
npm start

# Note: The script will keep running while the server is active
# Press Ctrl+C to stop the server
