---
title: Konfiguration
description: So konfigurierst du deine Anwendung
---

# Konfiguration

Lerne, wie du die Anwendung optimal konfigurierst.

## Grundkonfiguration

### Umgebungsvariablen

Folgende Variablen sind verfügbar:

| Variable                | Beschreibung     | Erforderlich |
| ----------------------- | ---------------- | ------------ |
| `NEXT_PUBLIC_API_URL`   | API-Endpoint-URL | Ja           |
| `NEXT_PUBLIC_SITE_NAME` | Seitenname       | Nein         |
| `NODE_ENV`              | Umgebungsmodus   | Ja           |

### Next.js-Konfiguration

Bearbeite `next.config.js`, um die Konfiguration anzupassen:

```javascript
module.exports = {
  reactStrictMode: true,
  i18n: {
    locales: ["en", "es", "fr", "de"],
    defaultLocale: "en",
  },
};
```

## Erweiterte Konfiguration

### Eigene Domain

Für eine eigene Domain:

1. DNS-Einträge aktualisieren
2. SSL-Zertifikat konfigurieren
3. Umgebungsvariablen anpassen

### Performance-Optimierung

Komprimierung und Caching aktivieren:

```javascript
const nextConfig = {
  compress: true,
  poweredByHeader: false,
};
```

## API-Konfiguration

API-Endpunkte in der App konfigurieren:

```javascript
const API_CONFIG = {
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
};
```

## Sicherheit

> **Wichtig:** Sensible Daten wie API-Keys niemals ins Repository committen.

Verwende Umgebungsvariablen für sensible Konfiguration:

```bash
API_KEY=your_secret_key
DATABASE_URL=postgresql://user:password@localhost:5432/db
```

## Fazit

Mit diesen Optionen kannst du die Anwendung an deine Bedürfnisse anpassen.
