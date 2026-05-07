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

Open [http://localhost:5173](http://localhost:5173) in your browser.

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
│   └── SortSelect.tsx        # Sort order selector
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
