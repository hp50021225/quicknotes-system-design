# QuickNotes API Design Specification

## 1. Endpoints Overview

### Get All Notes
- **Endpoint:** `GET /api/notes`
- **Description:** Retrieves a paginated list of all notes for the authenticated user.
- **Success Response (200 OK):**
```json
{
  "status": "success",
  "results": 2,
  "data": {
    "notes": [
      {
        "id": "note_9f8e7d6c5b4a",
        "title": "Project Roadmap",
        "content": "Outline Q3 deliverables and milestone dates.",
        "createdAt": "2026-11-07T10:30:00Z"
      },
      {
        "id": "note_1a2b3c4d5e6f",
        "title": "Grocery List",
        "content": "Milk, eggs, coffee beans, whole grain bread.",
        "createdAt": "2026-11-07T11:00:00Z"
      }
    ]
  }
}
{
  "title": "Weekly Sprint Goals",
  "content": "Complete user authentication module and database migration."
}
{
  "status": "success",
  "data": {
    "note": {
      "id": "note_7a8b9c0d1e2f",
      "title": "Weekly Sprint Goals",
      "content": "Complete user authentication module and database migration.",
      "createdAt": "2026-11-07T12:15:00Z",
      "updatedAt": "2026-11-07T12:15:00Z"
    }
  }
}
{
  "status": "error",
  "code": 400,
  "message": "Invalid request payload provided."
}
