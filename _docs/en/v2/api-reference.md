---
title: API Reference
description: Complete API reference for version 2
---

# API Reference

Complete reference for all API endpoints available in version 2.

## Authentication

All API requests require authentication using an API key:

```bash
curl -H "Authorization: Bearer YOUR_API_KEY" \
  https://api.example.com/v2/endpoint
```

## Endpoints

### GET /users

Retrieve a list of users.

**Parameters:**

- `page` (integer): Page number (default: 1)
- `limit` (integer): Items per page (default: 20)
- `sort` (string): Sort field

**Response:**

```json
{
  "data": [
    {
      "id": "123",
      "name": "John Doe",
      "email": "john@example.com"
    }
  ],
  "pagination": {
    "page": 1,
    "total": 100
  }
}
```

### POST /users

Create a new user.

**Request Body:**

```json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "password": "secure_password"
}
```

**Response:**

```json
{
  "id": "124",
  "name": "Jane Doe",
  "email": "jane@example.com",
  "createdAt": "2024-01-01T00:00:00Z"
}
```

### PUT /users/:id

Update an existing user.

### DELETE /users/:id

Delete a user by ID.

## Rate Limiting

API requests are limited to:

- 100 requests per minute for free tier
- 1000 requests per minute for pro tier
- Unlimited for enterprise

## Error Handling

The API uses standard HTTP status codes:

- `200` - Success
- `400` - Bad Request
- `401` - Unauthorized
- `404` - Not Found
- `500` - Server Error

**Error Response:**

```json
{
  "error": {
    "code": "INVALID_REQUEST",
    "message": "Missing required field: email"
  }
}
```
