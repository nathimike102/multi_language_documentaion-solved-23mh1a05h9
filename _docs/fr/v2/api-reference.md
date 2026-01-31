# Référence API

Documentation complète de l'API pour la version 2.

## URL de base

```
https://api.example.com
```

## Authentification

Toutes les requêtes API nécessitent une authentification avec un token Bearer.

```bash
Authorization: Bearer VOTRE_CLE_API
```

## Points de terminaison disponibles

### GET /api/v1/users

Récupérer une liste d'utilisateurs.

**Exemple de requête :**

```bash
curl -X GET "https://api.example.com/api/v1/users" \
  -H "Authorization: Bearer VOTRE_CLE_API" \
  -H "Content-Type: application/json"
```

**Exemple de réponse :**

```json
{
  "data": [
    {
      "id": "123",
      "name": "Jean Dupont",
      "email": "jean@example.com"
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

Créer un nouvel utilisateur.

### PUT /api/v1/users/{id}

Mettre à jour un utilisateur existant.

### DELETE /api/v1/users/{id}

Supprimer un utilisateur.

## Codes de réponse

- `200` - Succès
- `400` - Requête invalide
- `401` - Non autorisé
- `404` - Non trouvé
- `500` - Erreur serveur
