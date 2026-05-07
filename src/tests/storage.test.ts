import { describe, it, expect, beforeEach } from 'vitest'
import { exportToJSON, importFromJSON, loadFromStorage, STORAGE_KEY } from '../utils/storage'
import { DEFAULT_PREFERENCES } from '../types'
import type { CodeSnippet, SnippetShelfData } from '../types'

const makeSnippet = (overrides: Partial<CodeSnippet> = {}): CodeSnippet => ({
  id: 'test-1',
  title: 'Test',
  description: '',
  language: 'JavaScript',
  code: 'x',
  tags: [],
  isFavorite: false,
  createdAt: '2024-01-01T00:00:00Z',
  updatedAt: '2024-01-01T00:00:00Z',
  ...overrides,
})

describe('exportToJSON', () => {
  it('produces valid JSON string', () => {
    const snippets = [makeSnippet()]
    const json = exportToJSON(snippets, DEFAULT_PREFERENCES)
    expect(() => JSON.parse(json)).not.toThrow()
  })

  it('exported JSON contains snippets', () => {
    const snippets = [makeSnippet({ title: 'My Snippet' })]
    const parsed: SnippetShelfData = JSON.parse(exportToJSON(snippets, DEFAULT_PREFERENCES))
    expect(parsed.snippets[0].title).toBe('My Snippet')
  })
})

describe('importFromJSON', () => {
  it('imports valid JSON data', () => {
    const original = [makeSnippet({ title: 'Imported' })]
    const json = exportToJSON(original, DEFAULT_PREFERENCES)
    const result = importFromJSON(json)
    expect(result.snippets[0].title).toBe('Imported')
  })

  it('throws on invalid JSON', () => {
    expect(() => importFromJSON('not-json')).toThrow()
  })

  it('throws when snippets is not an array', () => {
    expect(() => importFromJSON('{"snippets": "bad"}')).toThrow()
  })

  it('applies safe fallbacks for missing snippet fields', () => {
    const json = JSON.stringify({ snippets: [{ id: 's1' }], preferences: {} })
    const result = importFromJSON(json)
    expect(result.snippets[0].title).toBe('Untitled')
    expect(result.snippets[0].language).toBe('Other')
    expect(result.snippets[0].tags).toEqual([])
    expect(result.snippets[0].isFavorite).toBe(false)
  })

  it('merges preferences with defaults', () => {
    const json = JSON.stringify({ snippets: [], preferences: { onlyFavorites: true } })
    const result = importFromJSON(json)
    expect(result.preferences.onlyFavorites).toBe(true)
    expect(result.preferences.sortOption).toBe(DEFAULT_PREFERENCES.sortOption)
  })
})

describe('loadFromStorage', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('returns default data when localStorage is empty', () => {
    const data = loadFromStorage()
    expect(Array.isArray(data.snippets)).toBe(true)
    expect(data.preferences).toMatchObject(DEFAULT_PREFERENCES)
  })

  it('returns default data on invalid JSON', () => {
    localStorage.setItem(STORAGE_KEY, 'invalid-json')
    const data = loadFromStorage()
    expect(Array.isArray(data.snippets)).toBe(true)
  })

  it('loads previously saved data', () => {
    const saved: SnippetShelfData = {
      snippets: [makeSnippet({ title: 'Persisted' })],
      preferences: DEFAULT_PREFERENCES,
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(saved))
    const data = loadFromStorage()
    expect(data.snippets[0].title).toBe('Persisted')
  })

  it('handles missing snippets field gracefully', () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ preferences: DEFAULT_PREFERENCES }))
    const data = loadFromStorage()
    expect(Array.isArray(data.snippets)).toBe(true)
  })
})
