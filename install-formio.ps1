# Install Form.io packages for MUNI

# Set Node.js in PATH
$env:Path = "C:\Program Files\nodejs;" + $env:Path

# Navigate to Frontend-main
Set-Location C:\Users\HomePC\Frontend-main

# Install Form.io packages
Write-Host "Installing Form.io packages..." -ForegroundColor Green
npm install formiojs@4.14.12 @formio/react@5.3.0 --save

Write-Host "`nForm.io packages installed!" -ForegroundColor Green
