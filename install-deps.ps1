# Install MUNI Dependencies

# Set Node.js in PATH
$env:Path = "C:\Program Files\nodejs;" + $env:Path

# Navigate to Frontend-main
Set-Location C:\Users\HomePC\Frontend-main

# Install dependencies
Write-Host "Installing MUNI website dependencies..." -ForegroundColor Green
npm install

Write-Host "`nInstallation complete!" -ForegroundColor Green
