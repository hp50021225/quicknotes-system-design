# QuickNotes Data Model

## Entities & Schema
* **`users`**: `id` (PK, INTEGER), `username` (TEXT), `email` (TEXT UNIQUE), `created_at` (TEXT)
* **`notes`**: `id` (PK, INTEGER), `user_id` (FK to users.id), `title` (TEXT), `body` (TEXT), `created_at` (TEXT)
* **`tags`**: `id` (PK, INTEGER), `name` (TEXT UNIQUE), `user_id` (FK to users.id)
* **`note_tags`**: `note_id` (FK to notes.id), `tag_id` (FK to tags.id), `PRIMARY KEY (note_id, tag_id)`

## Relationships
* **One-to-Many**: Between `users` and `notes` (one user creates many notes).
* **One-to-Many**: Between `users` and `tags` (one user creates custom tags).
* **Many-to-Many**: Between `notes` and `tags` (one note can have multiple tags, and one tag can belong to multiple notes), resolved using the `note_tags` junction table.

## CREATE TABLE SQL Statements

```sql
CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    created_at TEXT NOT NULL
);

CREATE TABLE notes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    title TEXT NOT NULL,
    body TEXT NOT NULL,
    created_at TEXT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE tags (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    user_id INTEGER NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE note_tags (
    note_id INTEGER NOT NULL,
    tag_id INTEGER NOT NULL,
    PRIMARY KEY (note_id, tag_id),
    FOREIGN KEY (note_id) REFERENCES notes(id) ON DELETE CASCADE,
    FOREIGN KEY (tag_id) REFERENCES tags(id) ON DELETE CASCADE
);