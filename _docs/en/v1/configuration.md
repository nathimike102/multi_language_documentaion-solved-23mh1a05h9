---
title: Configuration
description: How to configure your application
---

# Configuration

Learn how to configure your application for optimal performance.

## Basic Configuration

### Environment Variables

The following environment variables are available:

| Variable                | Description      | Required |
| ----------------------- | ---------------- | -------- |
| `NEXT_PUBLIC_API_URL`   | API endpoint URL | Yes      |
| `NEXT_PUBLIC_SITE_NAME` | Site name        | No       |
| `NODE_ENV`              | Environment mode | Yes      |

### Next.js Configuration

Edit `next.config.js` to customize your setup:

```javascript
module.exports = {
  reactStrictMode: true,
  i18n: {
    locales: ["en", "es", "fr", "de"],
    defaultLocale: "en",
  },
};
```

## Advanced Configuration

### Custom Domain

To use a custom domain:

1. Update your DNS settings
2. Configure SSL certificate
3. Update environment variables

### Performance Optimization

Enable compression and caching:

```javascript
const nextConfig = {
  compress: true,
  poweredByHeader: false,
};
```

## API Configuration

Configure API endpoints in your application:

```javascript
const API_CONFIG = {
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
};
```

## Security

> **Important:** Never commit sensitive data like API keys to version control.

Use environment variables for sensitive configuration:

```bash
API_KEY=your_secret_key
DATABASE_URL=postgresql://user:password@localhost:5432/db
```

## Conclusion

With these configuration options, you can customize the application to meet your needs.
