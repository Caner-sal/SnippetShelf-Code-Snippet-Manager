import { useMemo } from 'react'
import type { CodeSnippet, SnippetPreferences } from '../types'
import { applyAllFilters } from '../utils/snippetFilters'

export function useSnippetFilters(
  snippets: CodeSnippet[],
  preferences: SnippetPreferences
): CodeSnippet[] {
  return useMemo(() => applyAllFilters(snippets, preferences), [snippets, preferences])
}
