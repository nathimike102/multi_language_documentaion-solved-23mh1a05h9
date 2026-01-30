---
title: Instalación
description: Cómo instalar y configurar la plataforma
---

# Instalación

Esta guía te guiará a través del proceso de instalación.

## Requisitos Previos

Antes de comenzar, asegúrate de tener lo siguiente instalado:

- Node.js 18 o superior
- Gestor de paquetes npm o yarn
- Git para control de versiones

## Pasos de Instalación

### Paso 1: Clonar el Repositorio

```bash
git clone https://github.com/example/project.git
cd project
```

### Paso 2: Instalar Dependencias

```bash
npm install
# o
yarn install
```

### Paso 3: Configurar Variables de Entorno

Crea un archivo `.env.local` en el directorio raíz:

```bash
NEXT_PUBLIC_API_URL=https://api.example.com
NEXT_PUBLIC_SITE_NAME=Mi Documentación
```

### Paso 4: Ejecutar el Servidor de Desarrollo

```bash
npm run dev
# o
yarn dev
```

Abre [http://localhost:3000](http://localhost:3000) para ver tu aplicación.

## Instalación con Docker

Para despliegue en contenedores:

```bash
docker-compose up --build
```

## Solución de Problemas

### Problemas Comunes

**Puerto ya en uso:**

```bash
Error: listen EADDRINUSE: address already in use :::3000
```

Solución: Cambia el puerto en tu configuración o elimina el proceso que usa el puerto 3000.

**Módulo no encontrado:**
Asegúrate de que todas las dependencias estén instaladas:

```bash
rm -rf node_modules
npm install
```

## Próximos Pasos

Ahora que tienes la plataforma instalada, consulta la guía de configuración.
