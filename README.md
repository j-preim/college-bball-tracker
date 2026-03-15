# College Basketball Tracker

Frontend-only Vite deployment for Vercel.

## Local development

```bash
cd client
npm install
npm run dev
```

## Production build

```bash
cd client
npm install
npm run build
```

## Vercel settings

- Build Command: `cd client && npm install && npm run build`
- Output Directory: `client/dist`

## Data files

Static data is loaded from:

- `client/public/initSched.json`
- `client/public/bettingLines.json`

Entries/auth are intentionally disabled in this deployment until the backend is rebuilt.
