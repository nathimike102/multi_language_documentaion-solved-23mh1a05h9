# API Referenz

Vollständige API-Dokumentation für Version 2.

## Base URL

```
https://api.example.com
```

## Authentifizierung

Alle API-Anfragen erfordern Authentifizierung mit einem Bearer-Token.

```bash
Authorization: Bearer IHR_API_SCHLÜSSEL
```

## Verfügbare Endpunkte

### GET /api/v1/users

Rufen Sie eine Liste von Benutzern ab.

**Beispielanfrage:**

```bash
curl -X GET "https://api.example.com/api/v1/users" \
  -H "Authorization: Bearer IHR_API_SCHLÜSSEL" \
  -H "Content-Type: application/json"
```

**Beispielantwort:**

```json
{
  "data": [
    {
      "id": "123",
      "name": "Max Mustermann",
      "email": "max@example.com"
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

Erstellen Sie einen neuen Benutzer.

### PUT /api/v1/users/{id}

Aktualisieren Sie einen bestehenden Benutzer.

### DELETE /api/v1/users/{id}

Löschen Sie einen Benutzer.

## Antwortcodes

- `200` - Erfolg
- `400` - Ungültige Anfrage
- `401` - Nicht autorisiert
- `404` - Nicht gefunden
- `500` - Serverfehler
