# Deploy MUNI Portal to Cloudflare Pages
Write-Host "🚀 Deploying MUNI Portal to Cloudflare Pages..." -ForegroundColor Cyan

# Set location
Set-Location C:\Users\HomePC\Frontend-main

# Ensure dependencies are installed
if (-not (Test-Path "node_modules")) {
    Write-Host "📦 Installing dependencies..." -ForegroundColor Yellow
    npm install
}

# Build the project
Write-Host "🔨 Building production bundle..." -ForegroundColor Yellow
npm run build

# Deploy to Cloudflare Pages using Wrangler
Write-Host "☁️ Deploying to Cloudflare Pages..." -ForegroundColor Green
npx wrangler pages deploy dist --project-name=muni-portal

Write-Host "✅ Deployment complete!" -ForegroundColor Green
Write-Host "🌐 Your site will be available at: https://muni-portal.pages.dev" -ForegroundColor Cyan
