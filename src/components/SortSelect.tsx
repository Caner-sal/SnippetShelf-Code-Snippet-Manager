import type { SnippetSortOption } from '../types'

interface SortSelectProps {
  value: SnippetSortOption
  onChange: (value: SnippetSortOption) => void
}

const SORT_OPTIONS: { value: SnippetSortOption; label: string }[] = [
  { value: 'newest', label: 'Newest First' },
  { value: 'oldest', label: 'Oldest First' },
  { value: 'title-asc', label: 'Title A–Z' },
  { value: 'language-asc', label: 'Language A–Z' },
  { value: 'updated-desc', label: 'Recently Updated' },
]

export function SortSelect({ value, onChange }: SortSelectProps) {
  return (
    <div className="sort-select">
      <label className="filter-label" htmlFor="sort-option">Sort by</label>
      <select
        id="sort-option"
        className="filter-select"
        value={value}
        onChange={(e) => onChange(e.target.value as SnippetSortOption)}
      >
        {SORT_OPTIONS.map((opt) => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
    </div>
  )
}
