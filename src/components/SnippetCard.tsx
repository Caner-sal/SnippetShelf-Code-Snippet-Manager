import type { CodeSnippet } from '../types'
import { useClipboard } from '../hooks/useClipboard'
import { formatDate } from '../utils/date'

interface SnippetCardProps {
  snippet: CodeSnippet
  onView: (snippet: CodeSnippet) => void
  onEdit: (snippet: CodeSnippet) => void
  onDelete: (id: string) => void
  onToggleFavorite: (id: string) => void
}

export function SnippetCard({ snippet, onView, onEdit, onDelete, onToggleFavorite }: SnippetCardProps) {
  const { copy, copied, error } = useClipboard()

  const handleDelete = () => {
    if (window.confirm(`Delete "${snippet.title}"?`)) {
      onDelete(snippet.id)
    }
  }

  return (
    <article className="snippet-card">
      <header className="snippet-card__header">
        <div className="snippet-card__title-row">
          <h3 className="snippet-card__title">{snippet.title}</h3>
          <button
            className={`btn-icon btn-icon--favorite${snippet.isFavorite ? ' active' : ''}`}
            onClick={() => onToggleFavorite(snippet.id)}
            aria-label={snippet.isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            type="button"
          >
            {snippet.isFavorite ? '★' : '☆'}
          </button>
        </div>
        <span className={`language-badge language-badge--${snippet.language.toLowerCase().replace(/[^a-z]/g, '')}`}>
          {snippet.language}
        </span>
      </header>

      {snippet.description && (
        <p className="snippet-card__description">{snippet.description}</p>
      )}

      <pre className="snippet-card__code-preview" aria-label="Code preview">
        <code>{snippet.code.slice(0, 200)}{snippet.code.length > 200 ? '…' : ''}</code>
      </pre>

      {snippet.tags.length > 0 && (
        <div className="snippet-card__tags">
          {snippet.tags.map((tag) => (
            <span key={tag} className="tag">{tag}</span>
          ))}
        </div>
      )}

      <footer className="snippet-card__footer">
        <span className="snippet-card__date">{formatDate(snippet.createdAt)}</span>
        <div className="snippet-card__actions">
          <button
            className={`btn btn--sm${copied ? ' btn--success' : ''}`}
            onClick={() => copy(snippet.code)}
            type="button"
            aria-label="Copy code"
          >
            {copied ? '✓ Copied' : 'Copy'}
          </button>
          {error && <span className="copy-error" role="alert">{error}</span>}
          <button className="btn btn--sm btn--secondary" onClick={() => onView(snippet)} type="button">
            View
          </button>
          <button className="btn btn--sm btn--secondary" onClick={() => onEdit(snippet)} type="button">
            Edit
          </button>
          <button className="btn btn--sm btn--danger" onClick={handleDelete} type="button">
            Delete
          </button>
        </div>
      </footer>
    </article>
  )
}
