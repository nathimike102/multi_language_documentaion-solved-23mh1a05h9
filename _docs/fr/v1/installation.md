---
title: Installation
description: Comment installer et configurer la plateforme
---

# Installation

Ce guide vous accompagne dans le processus d’installation.

## Prérequis

Assurez-vous d’avoir installé :

- Node.js 18 ou supérieur
- npm ou yarn
- Git pour le contrôle de version

## Étapes d’installation

### Étape 1 : Cloner le dépôt

```bash
git clone https://github.com/nathimike102/multi_language_documentaion-solved-23mh1a05h9.git
cd project
```

### Étape 2 : Installer les dépendances

```bash
npm install
# ou
yarn install
```

### Étape 3 : Configurer les variables d’environnement

Créez un fichier `.env.local` à la racine :

```bash
NEXT_PUBLIC_API_URL=https://api.example.com
NEXT_PUBLIC_SITE_NAME=My Documentation
```

### Étape 4 : Démarrer le serveur de développement

```bash
npm run dev
# ou
yarn dev
```

Ouvrez [http://localhost:3000](http://localhost:3000) pour voir l’application.

## Installation via Docker

Pour un déploiement conteneurisé :

```bash
docker-compose up --build
```

## Dépannage

### Problèmes courants

**Port déjà utilisé :**

```bash
Error: listen EADDRINUSE: address already in use :::3000
```

Solution : changez le port dans votre configuration ou arrêtez le processus utilisant le port 3000.

**Module introuvable :**
Assurez-vous que toutes les dépendances sont installées :

```bash
rm -rf node_modules
npm install
```

## Étapes suivantes

Maintenant que la plateforme est installée, consultez le guide de configuration.
