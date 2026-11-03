# QuickNotes API Design Document

## REST Endpoints
| Method | Path | Description | Success Status |
| :--- | :--- | :--- | :--- |
| GET | `/api/v1/notes` | Retrieve all notes for authenticated user | 200 OK |
| POST | `/api/v1/notes` | Create a new note | 201 Created |
| GET | `/api/v1/notes/{id}` | Retrieve a specific note by ID | 200 OK |
| PUT | `/api/v1/notes/{id}` | Fully update an existing note | 200 OK |
| DELETE | `/api/v1/notes/{id}` | Delete a note | 204 No Content |
| GET | `/api/v1/tags` | List all user tags | 200 OK |

## JSON Examples

### Creating a Note (`POST /api/v1/notes`)
**Request Body:**
```json
{
  "title": "Weekly Planning",
  "body": "Finish system design assignments and review deployment scripts.",
  "tag_ids": [2, 4]
}