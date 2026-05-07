import { describe, it, expect } from 'vitest'
import { computeStats, getAllTags } from '../utils/snippetStats'
import type { CodeSnippet } from '../types'

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

const snippets: CodeSnippet[] = [
  makeSnippet({ id: '1', language: 'JavaScript', tags: ['utility', 'performance'], isFavorite: true }),
  makeSnippet({ id: '2', language: 'TypeScript', tags: ['utility'], isFavorite: false }),
  makeSnippet({ id: '3', language: 'JavaScript', tags: ['array', 'utility'], isFavorite: true }),
  makeSnippet({ id: '4', language: 'Python', tags: ['python'], isFavorite: false }),
]

describe('computeStats', () => {
  it('counts total snippets', () => {
    expect(computeStats(snippets).total).toBe(4)
  })

  it('counts favorite snippets', () => {
    expect(computeStats(snippets).favorites).toBe(2)
  })

  it('counts distinct languages used', () => {
    expect(computeStats(snippets).languagesUsed).toBe(3)
  })

  it('finds most used language', () => {
    expect(computeStats(snippets).mostUsedLanguage).toBe('JavaScript')
  })

  it('finds most used tag', () => {
    expect(computeStats(snippets).mostUsedTag).toBe('utility')
  })

  it('returns safe defaults for empty array', () => {
    const stats = computeStats([])
    expect(stats.total).toBe(0)
    expect(stats.favorites).toBe(0)
    expect(stats.languagesUsed).toBe(0)
    expect(stats.mostUsedLanguage).toBe('—')
    expect(stats.mostUsedTag).toBe('—')
  })
})

describe('getAllTags', () => {
  it('returns sorted unique tags', () => {
    const tags = getAllTags(snippets)
    expect(tags).toContain('utility')
    expect(tags).toContain('python')
    expect(new Set(tags).size).toBe(tags.length)
  })

  it('returns empty array for no snippets', () => {
    expect(getAllTags([])).toEqual([])
  })
})
