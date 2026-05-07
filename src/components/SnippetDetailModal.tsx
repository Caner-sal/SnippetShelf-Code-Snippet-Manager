import { useEffect } from 'react'
import type { CodeSnippet } from '../types'
import { useClipboard } from '../hooks/useClipboard'
import { formatDate } from '../utils/date'

interface SnippetDetailModalProps {
  snippet: CodeSnippet
  onClose: () => void
  onToggleFavorite: (id: string) => void
  onEdit: (snippet: CodeSnippet) => void
}

export function SnippetDetailModal({ snippet, onClose, onToggleFavorite, onEdit }: SnippetDetailModalProps) {
  const { copy, copied, error } = useClipboard()

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose()
  }

  return (
    <div
      className="modal-backdrop"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="modal-content">
        <header className="modal-header">
          <div className="modal-title-row">
            <h2 id="modal-title" className="modal-title">{snippet.title}</h2>
            <span className={`language-badge language-badge--${snippet.language.toLowerCase().replace(/[^a-z]/g, '')}`}>
              {snippet.language}
            </span>
          </div>
          <div className="modal-header-actions">
            <button
              className={`btn-icon btn-icon--favorite${snippet.isFavorite ? ' active' : ''}`}
              onClick={() => onToggleFavorite(snippet.id)}
              aria-label={snippet.isFavorite ? 'Remove from favorites' : 'Add to favorites'}
              type="button"
            >
              {snippet.isFavorite ? '★' : '☆'}
            </button>
            <button
              className="modal-close"
              onClick={onClose}
              aria-label="Close"
              type="button"
            >
              ✕
            </button>
          </div>
        </header>

        {snippet.description && (
          <p className="modal-description">{snippet.description}</p>
        )}

        <div className="modal-code-wrapper">
          <div className="modal-code-toolbar">
            <button
              className={`btn btn--sm${copied ? ' btn--success' : ''}`}
              onClick={() => copy(snippet.code)}
              type="button"
            >
              {copied ? '✓ Copied!' : 'Copy Code'}
            </button>
            {error && <span className="copy-error" role="alert">{error}</span>}
          </div>
          <pre className="modal-code">
            <code>{snippet.code}</code>
          </pre>
        </div>

        {snippet.tags.length > 0 && (
          <div className="modal-tags">
            {snippet.tags.map((tag) => (
              <span key={tag} className="tag">{tag}</span>
            ))}
          </div>
        )}

        <footer className="modal-footer">
          <div className="modal-dates">
            <span>Created: {formatDate(snippet.createdAt)}</span>
            {snippet.updatedAt !== snippet.createdAt && (
              <span>Updated: {formatDate(snippet.updatedAt)}</span>
            )}
          </div>
          <div className="modal-footer-actions">
            <button className="btn btn--secondary" onClick={() => { onEdit(snippet); onClose() }} type="button">
              Edit
            </button>
            <button className="btn btn--secondary" onClick={onClose} type="button">
              Close
            </button>
          </div>
        </footer>
      </div>
    </div>
  )
}
