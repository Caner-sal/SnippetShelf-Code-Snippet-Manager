# SnippetShelf — Requirements

## Feature Summary

SnippetShelf is a browser-based, no-backend personal code snippet manager. Users can save, organise, search, filter, and copy code snippets. Data is persisted in localStorage.

---

## User Stories

### Snippet Management
- As a student developer, I want to save code snippets so that I can reuse useful code later.
- As a student developer, I want to edit a snippet so that I can keep it up to date.
- As a student developer, I want to delete a snippet so that I can remove outdated code.
- As a student developer, I want to mark a snippet as favourite so that I can find my most-used snippets quickly.

### Discovery
- As a student developer, I want to search snippets by title, description, language, code, or tags so that I can quickly find what I need.
- As a student developer, I want to filter snippets by programming language so that I can browse only relevant snippets.
- As a student developer, I want to filter by tag so that I can explore snippets by topic.
- As a student developer, I want to see only my favourite snippets so that I can focus on what matters most.
- As a student developer, I want to sort snippets by date, title, or language so that I can organise my shelf.

### Detail & Copy
- As a student developer, I want to view the full snippet in a modal so that I can read the complete code without distraction.
- As a student developer, I want to copy snippet code to the clipboard so that I can paste it into my project immediately.

### Dashboard
- As a student developer, I want to see statistics about my snippets so that I can understand my collection at a glance.

### Data Persistence
- As a student developer, I want my snippets to survive a page refresh so that I never lose my work.
- As a student developer, I want to export my snippets as JSON so that I can back them up.
- As a student developer, I want to import a JSON backup so that I can restore or transfer my snippets.

---

## Acceptance Criteria

### Snippet creation
- Title is required; empty title prevents submission.
- Code content is required; empty code prevents submission.
- Language must be selected from the controlled list.
- Tags are optional, comma-separated.
- createdAt and updatedAt are set automatically on creation.

### Snippet editing
- All fields are editable except id and createdAt.
- updatedAt is updated to the current time on save.

### Search
- Case-insensitive match against title, description, language, code, and tags.
- Empty query returns all snippets.

### Filters
- Language filter: All or specific language.
- Tag filter: All or specific tag.
- Favourites filter: show only isFavorite === true when enabled.
- Empty state shown when no results.

### Sort
- Newest: descending by createdAt.
- Oldest: ascending by createdAt.
- Title A–Z: alphabetical.
- Language A–Z: alphabetical.
- Recently Updated: descending by updatedAt.

### Copy
- Uses navigator.clipboard.writeText.
- Fallback to execCommand on failure.
- Brief success/error feedback shown.

### localStorage
- Key: snippetshelf-data-v1.
- Invalid or missing data returns safe defaults.
- Preferences (search query, filters, sort) are persisted.

### Import / Export
- Export: valid JSON file download.
- Import: accepts valid JSON, rejects invalid JSON with friendly error message.
- Missing fields in imported snippets use safe fallbacks.

---

## Out-of-Scope Items

- Login / registration / authentication
- Backend API
- Database
- Cloud sync
- Code execution
- AI code generation
- Syntax highlighting (optional future improvement)
- Payment
- Collaboration
- CSV export (future improvement)

---

## Risks / Notes

- localStorage has a ~5 MB limit; very large snippet collections may fail silently.
- Clipboard API requires HTTPS in production; fallback is provided for HTTP dev environments.
- No data validation beyond required fields; users can input arbitrary text.
