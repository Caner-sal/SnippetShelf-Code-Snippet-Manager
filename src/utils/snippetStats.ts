import type { CodeSnippet } from '../types'

export interface SnippetStats {
  total: number
  favorites: number
  languagesUsed: number
  mostUsedLanguage: string
  mostUsedTag: string
}

export function computeStats(snippets: CodeSnippet[]): SnippetStats {
  if (snippets.length === 0) {
    return { total: 0, favorites: 0, languagesUsed: 0, mostUsedLanguage: '—', mostUsedTag: '—' }
  }

  const total = snippets.length
  const favorites = snippets.filter((s) => s.isFavorite).length

  const languageCounts: Record<string, number> = {}
  for (const s of snippets) {
    languageCounts[s.language] = (languageCounts[s.language] ?? 0) + 1
  }
  const languagesUsed = Object.keys(languageCounts).length
  const mostUsedLanguage = Object.entries(languageCounts).sort((a, b) => b[1] - a[1])[0][0]

  const tagCounts: Record<string, number> = {}
  for (const s of snippets) {
    for (const tag of s.tags) {
      tagCounts[tag] = (tagCounts[tag] ?? 0) + 1
    }
  }
  const mostUsedTag =
    Object.keys(tagCounts).length > 0
      ? Object.entries(tagCounts).sort((a, b) => b[1] - a[1])[0][0]
      : '—'

  return { total, favorites, languagesUsed, mostUsedLanguage, mostUsedTag }
}

export function getAllTags(snippets: CodeSnippet[]): string[] {
  const tagSet = new Set<string>()
  for (const s of snippets) {
    for (const tag of s.tags) {
      tagSet.add(tag)
    }
  }
  return Array.from(tagSet).sort()
}
