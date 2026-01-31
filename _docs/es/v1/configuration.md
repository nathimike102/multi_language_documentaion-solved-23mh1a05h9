---
title: Configuración
description: Cómo configurar tu aplicación
---

# Configuración

Aprende a configurar tu aplicación para un rendimiento óptimo.

## Configuración básica

### Variables de entorno

Están disponibles las siguientes variables de entorno:

| Variable                | Descripción             | Requerido |
| ----------------------- | ----------------------- | --------- |
| `NEXT_PUBLIC_API_URL`   | URL del endpoint de API | Sí        |
| `NEXT_PUBLIC_SITE_NAME` | Nombre del sitio        | No        |
| `NODE_ENV`              | Modo de entorno         | Sí        |

### Configuración de Next.js

Edita `next.config.js` para personalizar tu configuración:

```javascript
module.exports = {
  reactStrictMode: true,
  i18n: {
    locales: ["en", "es", "fr", "de"],
    defaultLocale: "en",
  },
};
```

## Configuración avanzada

### Dominio personalizado

Para usar un dominio personalizado:

1. Actualiza la configuración DNS
2. Configura el certificado SSL
3. Actualiza las variables de entorno

### Optimización de rendimiento

Habilita compresión y caché:

```javascript
const nextConfig = {
  compress: true,
  poweredByHeader: false,
};
```

## Configuración de API

Configura los endpoints de API en tu aplicación:

```javascript
const API_CONFIG = {
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
};
```

## Seguridad

> **Importante:** Nunca subas datos sensibles como claves API al control de versiones.

Usa variables de entorno para la configuración sensible:

```bash
API_KEY=your_secret_key
DATABASE_URL=postgresql://user:password@localhost:5432/db
```

## Conclusión

Con estas opciones de configuración, puedes personalizar la aplicación según tus necesidades.
