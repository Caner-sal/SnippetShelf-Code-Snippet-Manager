import { describe, it, expect } from 'vitest'
import {
  searchSnippets,
  filterByLanguage,
  filterByTag,
  filterFavorites,
  sortSnippets,
} from '../utils/snippetFilters'
import type { CodeSnippet } from '../types'

const makeSnippet = (overrides: Partial<CodeSnippet> = {}): CodeSnippet => ({
  id: 'test-1',
  title: 'Test Snippet',
  description: 'A test description',
  language: 'JavaScript',
  code: 'console.log("hello")',
  tags: ['utility'],
  isFavorite: false,
  createdAt: '2024-01-01T00:00:00Z',
  updatedAt: '2024-01-01T00:00:00Z',
  ...overrides,
})

const snippets: CodeSnippet[] = [
  makeSnippet({ id: '1', title: 'Debounce', language: 'JavaScript', tags: ['utility', 'performance'], isFavorite: true, createdAt: '2024-03-01T00:00:00Z', updatedAt: '2024-03-01T00:00:00Z' }),
  makeSnippet({ id: '2', title: 'Deep Clone', language: 'TypeScript', tags: ['utility'], isFavorite: false, createdAt: '2024-01-01T00:00:00Z', updatedAt: '2024-04-01T00:00:00Z' }),
  makeSnippet({ id: '3', title: 'SQL Pagination', language: 'SQL', tags: ['sql', 'query'], isFavorite: false, code: 'SELECT * FROM users LIMIT 10', createdAt: '2024-02-01T00:00:00Z', updatedAt: '2024-02-01T00:00:00Z' }),
  makeSnippet({ id: '4', title: 'Python Retry', language: 'Python', tags: ['python', 'utility'], isFavorite: true, createdAt: '2024-04-01T00:00:00Z', updatedAt: '2024-01-01T00:00:00Z' }),
]

describe('searchSnippets', () => {
  it('returns all snippets when query is empty', () => {
    expect(searchSnippets(snippets, '')).toHaveLength(4)
  })

  it('searches by title (case-insensitive)', () => {
    const result = searchSnippets(snippets, 'debounce')
    expect(result).toHaveLength(1)
    expect(result[0].id).toBe('1')
  })

  it('searches by title uppercase', () => {
    const result = searchSnippets(snippets, 'DEEP')
    expect(result).toHaveLength(1)
    expect(result[0].id).toBe('2')
  })

  it('searches by tag', () => {
    const result = searchSnippets(snippets, 'sql')
    expect(result.some((s) => s.id === '3')).toBe(true)
  })

  it('searches by code content', () => {
    const result = searchSnippets(snippets, 'SELECT')
    expect(result).toHaveLength(1)
    expect(result[0].id).toBe('3')
  })

  it('searches by language', () => {
    const result = searchSnippets(snippets, 'python')
    expect(result).toHaveLength(1)
    expect(result[0].id).toBe('4')
  })

  it('returns empty array when no match', () => {
    expect(searchSnippets(snippets, 'xyz-nonexistent')).toHaveLength(0)
  })
})

describe('filterByLanguage', () => {
  it('returns all snippets when "All"', () => {
    expect(filterByLanguage(snippets, 'All')).toHaveLength(4)
  })

  it('filters by language', () => {
    const result = filterByLanguage(snippets, 'TypeScript')
    expect(result).toHaveLength(1)
    expect(result[0].id).toBe('2')
  })
})

describe('filterByTag', () => {
  it('returns all when tag is empty string', () => {
    expect(filterByTag(snippets, '')).toHaveLength(4)
  })

  it('filters by exact tag', () => {
    const result = filterByTag(snippets, 'utility')
    expect(result.length).toBeGreaterThanOrEqual(3)
  })

  it('is case-insensitive', () => {
    const result = filterByTag(snippets, 'UTILITY')
    expect(result.length).toBeGreaterThanOrEqual(3)
  })
})

describe('filterFavorites', () => {
  it('returns all when onlyFavorites is false', () => {
    expect(filterFavorites(snippets, false)).toHaveLength(4)
  })

  it('returns only favorites', () => {
    const result = filterFavorites(snippets, true)
    expect(result).toHaveLength(2)
    expect(result.every((s) => s.isFavorite)).toBe(true)
  })
})

describe('sortSnippets', () => {
  it('sorts by newest first', () => {
    const result = sortSnippets(snippets, 'newest')
    expect(result[0].id).toBe('4')
  })

  it('sorts by oldest first', () => {
    const result = sortSnippets(snippets, 'oldest')
    expect(result[0].id).toBe('2')
  })

  it('sorts by title A-Z', () => {
    const result = sortSnippets(snippets, 'title-asc')
    expect(result[0].title).toBe('Debounce')
  })

  it('sorts by language A-Z', () => {
    const result = sortSnippets(snippets, 'language-asc')
    expect(result[0].language).toBe('JavaScript')
  })

  it('sorts by recently updated', () => {
    const result = sortSnippets(snippets, 'updated-desc')
    expect(result[0].id).toBe('2')
  })

  it('does not mutate the original array', () => {
    const original = [...snippets]
    sortSnippets(snippets, 'title-asc')
    expect(snippets).toEqual(original)
  })
})
