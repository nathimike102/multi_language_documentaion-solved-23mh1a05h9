---
title: Installation
description: How to install and set up the platform
---

# Installation

This guide will walk you through the installation process.

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js 18 or higher
- npm or yarn package manager
- Git for version control

## Installation Steps

### Step 1: Clone the Repository

```bash
git clone https://github.com/example/project.git
cd project
```

### Step 2: Install Dependencies

```bash
npm install
# or
yarn install
```

### Step 3: Configure Environment Variables

Create a `.env.local` file in the root directory:

```bash
NEXT_PUBLIC_API_URL=https://api.example.com
NEXT_PUBLIC_SITE_NAME=My Documentation
```

### Step 4: Run the Development Server

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) to view your application.

## Docker Installation

For containerized deployment:

```bash
docker-compose up --build
```

## Troubleshooting

### Common Issues

**Port already in use:**

```bash
Error: listen EADDRINUSE: address already in use :::3000
```

Solution: Change the port in your configuration or kill the process using port 3000.

**Module not found:**
Ensure all dependencies are installed:

```bash
rm -rf node_modules
npm install
```

## Next Steps

Now that you have the platform installed, check out the configuration guide.
