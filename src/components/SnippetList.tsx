import type { CodeSnippet } from '../types'
import { SnippetCard } from './SnippetCard'
import { EmptyState } from './EmptyState'

interface SnippetListProps {
  snippets: CodeSnippet[]
  hasActiveFilters: boolean
  onView: (snippet: CodeSnippet) => void
  onEdit: (snippet: CodeSnippet) => void
  onDelete: (id: string) => void
  onToggleFavorite: (id: string) => void
  onAddNew: () => void
}

export function SnippetList({
  snippets,
  hasActiveFilters,
  onView,
  onEdit,
  onDelete,
  onToggleFavorite,
  onAddNew,
}: SnippetListProps) {
  if (snippets.length === 0) {
    return <EmptyState hasFilters={hasActiveFilters} onAddNew={onAddNew} />
  }

  return (
    <div className="snippet-grid" aria-label={`${snippets.length} snippet${snippets.length !== 1 ? 's' : ''}`}>
      {snippets.map((snippet) => (
        <SnippetCard
          key={snippet.id}
          snippet={snippet}
          onView={onView}
          onEdit={onEdit}
          onDelete={onDelete}
          onToggleFavorite={onToggleFavorite}
        />
      ))}
    </div>
  )
}
