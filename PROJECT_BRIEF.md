# SnippetShelf — Project Brief

This file is a summary reference for Claude Code subagents.

For the full original brief see: `SnippetShelf_AGENT_PROJECT_BRIEF.md`

## Quick Summary

- **Project:** SnippetShelf — Personal Code Snippet Manager
- **Stack:** React + TypeScript + Vite + Plain CSS
- **Testing:** Vitest + React Testing Library
- **Storage:** localStorage (key: `snippetshelf-data-v1`)
- **No backend, no auth, no cloud sync.**

## Key Files

| File | Purpose |
|------|---------|
| `src/types/index.ts` | TypeScript interfaces & enums |
| `src/data/sampleSnippets.ts` | 12 built-in example snippets |
| `src/utils/snippetFilters.ts` | Pure filter & sort functions |
| `src/utils/snippetStats.ts` | Dashboard statistics |
| `src/utils/storage.ts` | localStorage & import/export |
| `src/App.tsx` | Root state management |

## Commands

```bash
npm run dev      # Start dev server
npm run build    # Production build
npm test         # Run tests
```

## Subagents

See `.claude/agents/` for agent definitions.
