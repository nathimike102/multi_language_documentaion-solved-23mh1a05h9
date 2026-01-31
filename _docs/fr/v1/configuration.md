---
title: Configuration
description: Comment configurer votre application
---

# Configuration

Apprenez à configurer votre application pour des performances optimales.

## Configuration de base

### Variables d’environnement

Les variables suivantes sont disponibles :

| Variable                | Description          | Requis |
| ----------------------- | -------------------- | ------ |
| `NEXT_PUBLIC_API_URL`   | URL de l’API         | Oui    |
| `NEXT_PUBLIC_SITE_NAME` | Nom du site          | Non    |
| `NODE_ENV`              | Mode d’environnement | Oui    |

### Configuration Next.js

Modifiez `next.config.js` pour personnaliser la configuration :

```javascript
module.exports = {
  reactStrictMode: true,
  i18n: {
    locales: ["en", "es", "fr", "de"],
    defaultLocale: "en",
  },
};
```

## Configuration avancée

### Domaine personnalisé

Pour utiliser un domaine personnalisé :

1. Mettez à jour vos DNS
2. Configurez le certificat SSL
3. Mettez à jour les variables d’environnement

### Optimisation des performances

Activez la compression et le cache :

```javascript
const nextConfig = {
  compress: true,
  poweredByHeader: false,
};
```

## Configuration de l’API

Configurez les endpoints d’API dans votre application :

```javascript
const API_CONFIG = {
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
};
```

## Sécurité

> **Important :** ne commitez jamais des données sensibles comme des clés API.

Utilisez des variables d’environnement pour les informations sensibles :

```bash
API_KEY=your_secret_key
DATABASE_URL=postgresql://user:password@localhost:5432/db
```

## Conclusion

Avec ces options, vous pouvez adapter l’application à vos besoins.
