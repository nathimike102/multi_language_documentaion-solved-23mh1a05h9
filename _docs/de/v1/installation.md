---
title: Installation
description: So installierst und richtest du die Plattform ein
---

# Installation

Diese Anleitung führt dich durch die Installation.

## Voraussetzungen

Bitte stelle sicher, dass Folgendes installiert ist:

- Node.js 18 oder höher
- npm oder yarn
- Git für Versionskontrolle

## Installationsschritte

### Schritt 1: Repository klonen

```bash
git clone https://github.com/nathimike102/multi_language_documentaion-solved-23mh1a05h9.git
cd project
```

### Schritt 2: Abhängigkeiten installieren

```bash
npm install
# oder
yarn install
```

### Schritt 3: Umgebungsvariablen konfigurieren

Erstelle eine `.env.local` Datei im Projekt:

```bash
NEXT_PUBLIC_API_URL=https://api.example.com
NEXT_PUBLIC_SITE_NAME=My Documentation
```

### Schritt 4: Entwicklungsserver starten

```bash
npm run dev
# oder
yarn dev
```

Öffne [http://localhost:3000](http://localhost:3000), um die App zu sehen.

## Docker-Installation

Für containerisierten Betrieb:

```bash
docker-compose up --build
```

## Fehlerbehebung

### Häufige Probleme

**Port bereits in Verwendung:**

```bash
Error: listen EADDRINUSE: address already in use :::3000
```

Lösung: Port in der Konfiguration ändern oder den Prozess beenden.

**Modul nicht gefunden:**
Stelle sicher, dass alle Abhängigkeiten installiert sind:

```bash
rm -rf node_modules
npm install
```

## Nächste Schritte

Nach der Installation kannst du den Konfigurationsleitfaden ansehen.
