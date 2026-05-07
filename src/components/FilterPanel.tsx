import type { SnippetPreferences } from '../types'
import { SNIPPET_LANGUAGES } from '../types'

interface FilterPanelProps {
  preferences: SnippetPreferences
  allTags: string[]
  onChange: (updated: Partial<SnippetPreferences>) => void
}

export function FilterPanel({ preferences, allTags, onChange }: FilterPanelProps) {
  return (
    <div className="filter-panel">
      <div className="filter-group">
        <label className="filter-label" htmlFor="filter-language">Language</label>
        <select
          id="filter-language"
          className="filter-select"
          value={preferences.selectedLanguage}
          onChange={(e) =>
            onChange({ selectedLanguage: e.target.value as SnippetPreferences['selectedLanguage'] })
          }
        >
          <option value="All">All Languages</option>
          {SNIPPET_LANGUAGES.map((lang) => (
            <option key={lang} value={lang}>{lang}</option>
          ))}
        </select>
      </div>

      <div className="filter-group">
        <label className="filter-label" htmlFor="filter-tag">Tag</label>
        <select
          id="filter-tag"
          className="filter-select"
          value={preferences.selectedTag}
          onChange={(e) => onChange({ selectedTag: e.target.value })}
        >
          <option value="">All Tags</option>
          {allTags.map((tag) => (
            <option key={tag} value={tag}>{tag}</option>
          ))}
        </select>
      </div>

      <div className="filter-group filter-group--checkbox">
        <label className="filter-checkbox-label">
          <input
            type="checkbox"
            checked={preferences.onlyFavorites}
            onChange={(e) => onChange({ onlyFavorites: e.target.checked })}
          />
          Favorites only
        </label>
      </div>
    </div>
  )
}
