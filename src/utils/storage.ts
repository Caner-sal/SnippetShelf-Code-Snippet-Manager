import type { SnippetShelfData, CodeSnippet, SnippetPreferences } from '../types'
import { DEFAULT_PREFERENCES } from '../types'
import { sampleSnippets } from '../data/sampleSnippets'

export const STORAGE_KEY = 'snippetshelf-data-v1'

export function getDefaultData(): SnippetShelfData {
  return {
    snippets: sampleSnippets,
    preferences: DEFAULT_PREFERENCES,
  }
}

export function loadFromStorage(): SnippetShelfData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return getDefaultData()
    const parsed = JSON.parse(raw) as Partial<SnippetShelfData>
    return {
      snippets: Array.isArray(parsed.snippets) ? parsed.snippets : sampleSnippets,
      preferences: parsed.preferences
        ? { ...DEFAULT_PREFERENCES, ...parsed.preferences }
        : DEFAULT_PREFERENCES,
    }
  } catch {
    return getDefaultData()
  }
}

export function saveToStorage(data: SnippetShelfData): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  } catch {
    // Silently fail if storage is unavailable
  }
}

export function exportToJSON(snippets: CodeSnippet[], preferences: SnippetPreferences): string {
  const data: SnippetShelfData = { snippets, preferences }
  return JSON.stringify(data, null, 2)
}

export function importFromJSON(jsonString: string): SnippetShelfData {
  const parsed = JSON.parse(jsonString) as unknown

  if (!parsed || typeof parsed !== 'object') {
    throw new Error('Invalid format: expected a JSON object.')
  }

  const obj = parsed as Record<string, unknown>

  if (!Array.isArray(obj.snippets)) {
    throw new Error('Invalid format: "snippets" must be an array.')
  }

  const snippets: CodeSnippet[] = (obj.snippets as unknown[]).map((item, index) => {
    if (!item || typeof item !== 'object') {
      throw new Error(`Invalid snippet at index ${index}.`)
    }
    const s = item as Record<string, unknown>
    return {
      id: typeof s.id === 'string' ? s.id : `imported-${index}`,
      title: typeof s.title === 'string' ? s.title : 'Untitled',
      description: typeof s.description === 'string' ? s.description : '',
      language: typeof s.language === 'string' ? (s.language as CodeSnippet['language']) : 'Other',
      code: typeof s.code === 'string' ? s.code : '',
      tags: Array.isArray(s.tags) ? (s.tags as string[]).filter((t) => typeof t === 'string') : [],
      isFavorite: typeof s.isFavorite === 'boolean' ? s.isFavorite : false,
      createdAt: typeof s.createdAt === 'string' ? s.createdAt : new Date().toISOString(),
      updatedAt: typeof s.updatedAt === 'string' ? s.updatedAt : new Date().toISOString(),
    }
  })

  const prefObj = obj.preferences && typeof obj.preferences === 'object'
    ? (obj.preferences as Record<string, unknown>)
    : {}

  const preferences: SnippetPreferences = {
    ...DEFAULT_PREFERENCES,
    ...(typeof prefObj.searchQuery === 'string' ? { searchQuery: prefObj.searchQuery } : {}),
    ...(typeof prefObj.selectedLanguage === 'string' ? { selectedLanguage: prefObj.selectedLanguage as SnippetPreferences['selectedLanguage'] } : {}),
    ...(typeof prefObj.selectedTag === 'string' ? { selectedTag: prefObj.selectedTag } : {}),
    ...(typeof prefObj.onlyFavorites === 'boolean' ? { onlyFavorites: prefObj.onlyFavorites } : {}),
    ...(typeof prefObj.sortOption === 'string' ? { sortOption: prefObj.sortOption as SnippetPreferences['sortOption'] } : {}),
  }

  return { snippets, preferences }
}
