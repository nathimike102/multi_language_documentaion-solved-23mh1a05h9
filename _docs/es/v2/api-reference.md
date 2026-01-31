# Referencia API

Documentación completa de la API para la versión 2.

## URL Base

```
https://api.example.com
```

## Autenticación

Todas las solicitudes API requieren autenticación usando un token Bearer.

```bash
Authorization: Bearer SU_CLAVE_API
```

## Endpoints disponibles

### GET /api/v1/users

Obtenga una lista de usuarios.

**Solicitud de ejemplo:**

```bash
curl -X GET "https://api.example.com/api/v1/users" \
  -H "Authorization: Bearer SU_CLAVE_API" \
  -H "Content-Type: application/json"
```

**Respuesta de ejemplo:**

```json
{
  "data": [
    {
      "id": "123",
      "name": "Juan Pérez",
      "email": "juan@example.com"
    }
  ],
  "meta": {
    "total": 1,
    "page": 1,
    "per_page": 10
  }
}
```

### POST /api/v1/users

Crear un nuevo usuario.

### PUT /api/v1/users/{id}

Actualizar un usuario existente.

### DELETE /api/v1/users/{id}

Eliminar un usuario.

## Códigos de respuesta

- `200` - Éxito
- `400` - Solicitud incorrecta
- `401` - No autorizado
- `404` - No encontrado
- `500` - Error del servidor
