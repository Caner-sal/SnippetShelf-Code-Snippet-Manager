import type { CodeSnippet, SnippetPreferences, SnippetSortOption } from '../types'

export function searchSnippets(snippets: CodeSnippet[], query: string): CodeSnippet[] {
  if (!query.trim()) return snippets
  const lower = query.toLowerCase()
  return snippets.filter(
    (s) =>
      s.title.toLowerCase().includes(lower) ||
      s.description.toLowerCase().includes(lower) ||
      s.language.toLowerCase().includes(lower) ||
      s.code.toLowerCase().includes(lower) ||
      s.tags.some((tag) => tag.toLowerCase().includes(lower))
  )
}

export function filterByLanguage(
  snippets: CodeSnippet[],
  language: SnippetPreferences['selectedLanguage']
): CodeSnippet[] {
  if (language === 'All') return snippets
  return snippets.filter((s) => s.language === language)
}

export function filterByTag(snippets: CodeSnippet[], tag: string): CodeSnippet[] {
  if (!tag || tag === '') return snippets
  const lower = tag.toLowerCase()
  return snippets.filter((s) => s.tags.some((t) => t.toLowerCase() === lower))
}

export function filterFavorites(snippets: CodeSnippet[], onlyFavorites: boolean): CodeSnippet[] {
  if (!onlyFavorites) return snippets
  return snippets.filter((s) => s.isFavorite)
}

export function sortSnippets(snippets: CodeSnippet[], sortOption: SnippetSortOption): CodeSnippet[] {
  const sorted = [...snippets]
  switch (sortOption) {
    case 'newest':
      return sorted.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    case 'oldest':
      return sorted.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
    case 'title-asc':
      return sorted.sort((a, b) => a.title.localeCompare(b.title))
    case 'language-asc':
      return sorted.sort((a, b) => a.language.localeCompare(b.language))
    case 'updated-desc':
      return sorted.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    default:
      return sorted
  }
}

export function applyAllFilters(snippets: CodeSnippet[], prefs: SnippetPreferences): CodeSnippet[] {
  let result = snippets
  result = searchSnippets(result, prefs.searchQuery)
  result = filterByLanguage(result, prefs.selectedLanguage)
  result = filterByTag(result, prefs.selectedTag)
  result = filterFavorites(result, prefs.onlyFavorites)
  result = sortSnippets(result, prefs.sortOption)
  return result
}
