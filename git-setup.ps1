# Run this script after Git is installed to initialize the repo and set config.
# In PowerShell: .\git-setup.ps1
# Or: powershell -ExecutionPolicy Bypass -File .\git-setup.ps1

Set-Location $PSScriptRoot

if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
    Write-Host "Git is not installed or not in PATH. Install Git from https://git-scm.com/ then run this script again." -ForegroundColor Red
    exit 1
}

if (Test-Path .git) {
    Write-Host "Repository already initialized." -ForegroundColor Yellow
} else {
    git init
    Write-Host "Git repository initialized." -ForegroundColor Green
}

# Set local config for this repo (change name/email if you like)
git config user.name "Administrator"
git config user.email "administrator@localhost"
Write-Host "Git user.name and user.email set for this repo." -ForegroundColor Green
Write-Host "To use your own identity, run:"
Write-Host '  git config user.name "Your Name"'
Write-Host '  git config user.email "your@email.com"'
