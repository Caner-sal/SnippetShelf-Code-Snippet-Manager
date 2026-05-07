# SnippetShelf

**A simple React + TypeScript personal code snippet manager.**

Save, organise, search, filter, and copy your favourite code snippets — all in the browser, no backend required.

---

## Features

- **Add & Edit** — Create snippets with title, description, language, code, and tags. Edit or delete at any time.
- **Search** — Case-insensitive full-text search across title, description, language, code, and tags.
- **Filter** — Filter by programming language, tag, or favourites-only.
- **Sort** — Sort by newest, oldest, title A–Z, language A–Z, or recently updated.
- **Detail Modal** — View the full snippet in a focused modal. Close with ESC or by clicking the backdrop.
- **Copy to Clipboard** — One-click copy with success/error feedback.
- **Favourites** — Star snippets for quick access.
- **Dashboard** — At-a-glance stats: total snippets, favourites, languages used, top language, top tag.
- **Persistence** — Data saved to `localStorage`; survives page refreshes.
- **Import / Export** — Export all snippets as JSON, import from a JSON backup.
- **Responsive** — Works on desktop, tablet, and mobile.

---

## Tech Stack

| Layer      | Technology                              |
|------------|-----------------------------------------|
| UI         | React 18 + TypeScript                   |
| Build      | Vite 4                                  |
| Styling    | Plain CSS (CSS variables, Grid, Flexbox) |
| Storage    | Browser localStorage                    |
| Testing    | Vitest + React Testing Library          |

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm 8+

### Installation

```bash
# Clone the repository
git clone https://github.com/Caner-sal/SnippetShelf-Code-Snippet-Manager.git
cd SnippetShelf-Code-Snippet-Manager

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:5174](http://localhost:5174) in your browser.

> **Note:** The dev server runs on port **5174** (not the default 5173) to avoid conflicts with other Vite projects running simultaneously. If 5174 is also in use, Vite will automatically increment to the next available port (5175, etc.).

### Build for production

```bash
npm run build
npm run preview
```

### Run tests

```bash
npm test
```

---

## Usage

1. **Add a snippet** — Click **+ Add Snippet** and fill in the form. Title and code are required.
2. **Search** — Type in the search box at the top. Results update instantly.
3. **Filter** — Use the Language, Tag, and Favourites dropdowns/checkbox below the search bar.
4. **Sort** — Select a sort order from the **Sort by** dropdown.
5. **View details** — Click **View** on any card to open the full detail modal.
6. **Copy code** — Click **Copy** on a card or inside the detail modal.
7. **Favourite** — Click ☆ / ★ to toggle favourite status.
8. **Edit / Delete** — Use the **Edit** and **Delete** buttons on each card.
9. **Export** — Click **Import / Export** → **Download JSON** to save a backup.
10. **Import** — Click **Import / Export** → **Choose File** to restore from a JSON backup.

---

## Project Structure

```
src/
├── components/
│   ├── Dashboard.tsx          # Stats overview
│   ├── EmptyState.tsx         # No-results view
│   ├── FilterPanel.tsx        # Language / tag / favourite filters
│   ├── ImportExportPanel.tsx  # JSON import & export
│   ├── SearchBar.tsx          # Full-text search input
│   ├── SnippetCard.tsx        # Individual snippet card
│   ├── SnippetDetailModal.tsx # Full snippet view modal
│   ├── SnippetForm.tsx        # Add / edit form
│   ├── SnippetList.tsx        # Grid of cards
│   └── SortSelect.tsx         # Sort order selector
├── data/
│   └── sampleSnippets.ts      # 12 built-in example snippets
├── hooks/
│   ├── useClipboard.ts        # Copy-to-clipboard with fallback
│   ├── useLocalStorage.ts     # Generic localStorage hook
│   └── useSnippetFilters.ts   # Memoised filter/sort pipeline
├── tests/
│   ├── snippetFilters.test.ts
│   ├── snippetStats.test.ts
│   └── storage.test.ts
├── types/
│   └── index.ts               # TypeScript interfaces & enums
├── utils/
│   ├── date.ts                # Date formatting & ID generation
│   ├── snippetFilters.ts      # Pure filter & sort functions
│   ├── snippetStats.ts        # Dashboard statistics
│   └── storage.ts             # localStorage helpers & import/export
├── App.tsx                    # Root component & state management
├── main.tsx                   # React entry point
├── index.css                  # Global styles
└── setupTests.ts              # Vitest setup
```

---

## Screenshots

> _Screenshots will be added after the first deployment. See the Features section for a description of each view._

| View | Description |
|------|-------------|
| Dashboard | Total snippets, favourites, language stats |
| Snippet Grid | Responsive card layout with language badges |
| Detail Modal | Full code block with copy button |
| Add/Edit Form | Validated form with code editor textarea |
| Import/Export | Simple JSON backup panel |

---

## Known Issues & Fixes Applied During Development

This section documents problems encountered while building this project and how they were resolved. Useful if you fork this repo or run into the same issues.

---

### 1. `npm create vite@latest` fails on Node.js 18.12.0

**Error:**
```
SyntaxError: The requested module 'node:util' does not provide an export named 'styleText'
```

**Cause:** The latest `create-vite` (v6+) requires Node.js 18.18+ or Node.js 20+. Node.js 18.12.0 is missing the `styleText` export in `node:util`.

**Fix:** Use `create-vite@4` which is compatible with Node.js 18.12.0:
```bash
npm create vite@4 . -- --template react-ts
```

---

### 2. `vite.config.ts` — `test` property TypeScript error

**Cause:** When you import `defineConfig` from `vite`, TypeScript does not know about the `test` property because it belongs to Vitest, not Vite. Without the reference directive, you may see:
```
Object literal may only specify known properties, and 'test' does not exist in type 'UserConfig'
```

**Fix:** Add the Vitest reference directive at the top of `vite.config.ts`:
```ts
/// <reference types="vitest" />
import { defineConfig } from 'vite'
```

This tells TypeScript to merge Vitest's type augmentations with Vite's config type.

---

### 3. Dev server port conflict — another Vite project already on port 5173

**Symptom:** Running `npm run dev` opens the wrong project in the browser (a different Vite app running on the default port 5173).

**Fix:** Set a custom port in `vite.config.ts`:
```ts
server: {
  port: 5174,
},
```

Do **not** add `strictPort: true` (see issue 4 below).

---

### 4. `strictPort: true` crashes the dev server on restart

**Symptom:** After adding `strictPort: true`, restarting the dev server throws:
```
Error: Port 5174 is already in use
```
This happens because the previous process did not fully release the port before the new one started.

**Fix:** Remove `strictPort: true`. Without it, Vite automatically increments to the next available port (5175, 5176, …) instead of crashing:
```ts
server: {
  port: 5174,   // preferred port — no strictPort
},
```

---

### 5. Unused import TypeScript errors breaking the build

**Errors seen during build:**
```
error TS6133: 'DEFAULT_PREFERENCES' is declared but its value is never read.
error TS6133: 'vi' is declared but its value is never read.
```

**Cause:** `tsconfig.json` has `"noUnusedLocals": true`. Any imported symbol that is never used in a file will fail the build.

**Fix:** Remove the unused imports:
- Removed `DEFAULT_PREFERENCES` from `src/App.tsx`
- Removed `vi` from `src/tests/storage.test.ts`

**Lesson:** Always run `npm run build` (not just `npm run dev`) before committing. `tsc` catches these errors; the dev server does not.

---

### 6. `.claude/settings.local.json` accidentally staged for commit

**Cause:** The `.claude/settings.local.json` file is created automatically by Claude Code and contains machine-specific tool permissions. It should never be committed to a public repository.

**Fix:**
1. Add the path to `.gitignore`:
   ```
   .claude/settings.local.json
   ```
2. Remove it from the git index:
   ```bash
   git rm --cached -f .claude/settings.local.json
   ```

---

## Future Improvements

- Dark mode toggle
- Syntax highlighting (e.g. Shiki or Prism)
- Markdown description support
- CSV export
- GitHub Pages deployment
- PWA / offline support
- Folder / category system
- Pin snippets to the top
- Keyboard shortcuts
- Duplicate snippet detection

---

## Author

**Caner Sal**
- GitHub: [@Caner-sal](https://github.com/Caner-sal)

---

## License

[MIT](LICENSE)
