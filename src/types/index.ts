export type SnippetLanguage =
  | 'JavaScript'
  | 'TypeScript'
  | 'Python'
  | 'Java'
  | 'C'
  | 'C++'
  | 'SQL'
  | 'HTML'
  | 'CSS'
  | 'Other'

export const SNIPPET_LANGUAGES: SnippetLanguage[] = [
  'JavaScript',
  'TypeScript',
  'Python',
  'Java',
  'C',
  'C++',
  'SQL',
  'HTML',
  'CSS',
  'Other',
]

export type SnippetSortOption =
  | 'newest'
  | 'oldest'
  | 'title-asc'
  | 'language-asc'
  | 'updated-desc'

export interface CodeSnippet {
  id: string
  title: string
  description: string
  language: SnippetLanguage
  code: string
  tags: string[]
  isFavorite: boolean
  createdAt: string
  updatedAt: string
}

export interface SnippetPreferences {
  searchQuery: string
  selectedLanguage: SnippetLanguage | 'All'
  selectedTag: string
  onlyFavorites: boolean
  sortOption: SnippetSortOption
}

export interface SnippetShelfData {
  snippets: CodeSnippet[]
  preferences: SnippetPreferences
}

export const DEFAULT_PREFERENCES: SnippetPreferences = {
  searchQuery: '',
  selectedLanguage: 'All',
  selectedTag: '',
  onlyFavorites: false,
  sortOption: 'newest',
}

export type SnippetFormData = Omit<CodeSnippet, 'id' | 'createdAt' | 'updatedAt'>
