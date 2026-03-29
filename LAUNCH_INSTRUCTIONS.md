# 🚀 Dynamic Gateway - Launch Instructions

## Quick Start

### Option 1: Using the Launch Script (Recommended)
```powershell
cd c:\Users\HomePC\Frontend-main
.\start-dynamic-gateway.ps1
```

### Option 2: Manual Start
```powershell
cd c:\Users\HomePC\Frontend-main
npm start
```

---

## What Port Will It Use?

**Short answer:** Vite will automatically find an available port.

**Typical ports:**
- **Preferred:** 8080 (configured in vite.config.ts)
- **Fallback:** 8081, 8082, 8083, etc.

**Why not port 3000?**
- Port 3000 was originally intended
- Often blocked by PowerShell or other processes on Windows
- Port 3001: Form.io API (Docker)
- Port 3002: Webhook Server (Docker)

---

## Login Credentials

### Platform Owner (Admin)
- **Email:** `admin@platform.local`
- **Password:** `PlatformOwner123!`

### Municipality Admin
- **Email:** `muni@city.gov`
- **Password:** `Muni123!`

### Demo User
- **Email:** `demo@muni.gov.il`
- **Password:** `demo123`

---

## Prerequisites

### 1. Docker Services Must Be Running
```powershell
cd c:\Users\HomePC\formio-docker
docker-compose up -d
```

**Required services:**
- formio-server (Port 3001) - Form.io API
- formio-mongo (Port 27017) - MongoDB
- webhook-server (Port 3002) - AI Processing

**Optional:**
- formio-app (Port 4200) - Form.io Admin UI

### 2. Check Services Status
```powershell
docker-compose ps
```

---

## Troubleshooting

### Port Already in Use
**Problem:** Vite says port is in use

**Solution:** Vite will automatically try the next port. Just wait for it to start.

### Form.io Backend Not Running
**Problem:** Login fails or API errors

**Solution:**
```powershell
cd c:\Users\HomePC\formio-docker
docker-compose up -d formio-api formio-mongo
```

### Browser Doesn't Open Automatically
**Problem:** Vite starts but browser doesn't open

**Solution:** Manually open the URL shown in the terminal:
```
➜ Local:   http://localhost:8083/
```

### Node Modules Missing
**Problem:** Import errors or module not found

**Solution:**
```powershell
cd c:\Users\HomePC\Frontend-main
npm install
```

---

## Architecture Overview

```
┌──────────────────────────────────────┐
│   DYNAMIC GATEWAY (Frontend-main)   │
│   React + TypeScript + Vite         │
│   Port: 8080+ (auto-selected)       │
│   → Your custom UI for managing     │
│      municipal sites                │
└──────────────────────────────────────┘
                 ↓ HTTP API
┌──────────────────────────────────────┐
│   FORM.IO BACKEND (Docker)          │
│   Port: 3001                        │
│   → Headless backend for:           │
│     • User authentication           │
│     • Form definitions              │
│     • Submission storage            │
│     • Role management               │
└──────────────────────────────────────┘
                 ↓
┌──────────────────────────────────────┐
│   MONGODB (Docker)                  │
│   Port: 27017                       │
│   → Database storage                │
└──────────────────────────────────────┘
```

---

## What You'll See

### Landing Page
- Hero section with "Dynamic Gateway" branding
- Login button → redirects to `/login`

### Login Page
- Form.io rendered login form
- Email + Password fields
- Submit → authenticates against Form.io API

### After Login
- Dashboard (main menu)
- Site management features
- Municipal site configuration
- Form builder (Domino)
- 8 Business processes

---

## URLs Reference

| Service | URL | Purpose |
|---------|-----|---------|
| **Dynamic Gateway** | http://localhost:8083 (varies) | Main platform UI |
| **Form.io API** | http://localhost:3001 | Backend API |
| **Form.io Admin** | http://localhost:4200 | Form.io admin panel (optional) |
| **MongoDB** | mongodb://localhost:27017 | Database |
| **Webhook Server** | http://localhost:3002 | AI processing |

---

## Development Notes

### Hot Module Replacement (HMR)
Vite has HMR enabled. Changes to source files will automatically reload in the browser.

### Source Code Location
```
c:\Users\HomePC\Frontend-main\src\
  ├── app.tsx              # Main app component
  ├── routes\              # Route definitions
  ├── pages\               # Page components
  ├── components\          # Reusable components
  ├── services\            # API services
  └── store\               # State management
```

### Backend Configuration
The API endpoint is configured in vite.config.ts:
```typescript
VITE_API_ENDPOINT: 'https://be.dev.pivoters.com/pivoters/api'
```

For local development with Form.io backend, you may need to update this.

---

## Support

If you encounter issues:
1. Check Docker services are running
2. Check no port conflicts (3001, 3002 must be free for Docker)
3. Verify node_modules are installed
4. Check terminal output for specific errors

For Form.io backend issues:
```powershell
docker logs formio-server --tail 50
```

For MongoDB issues:
```powershell
docker logs formio-mongo --tail 50
```
