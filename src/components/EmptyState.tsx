interface EmptyStateProps {
  hasFilters: boolean
  onAddNew: () => void
}

export function EmptyState({ hasFilters, onAddNew }: EmptyStateProps) {
  return (
    <div className="empty-state">
      <div className="empty-state-icon" aria-hidden="true">📭</div>
      {hasFilters ? (
        <>
          <h3 className="empty-state-title">No snippets found</h3>
          <p className="empty-state-text">Try changing your search or filters.</p>
        </>
      ) : (
        <>
          <h3 className="empty-state-title">Your shelf is empty</h3>
          <p className="empty-state-text">Add your first snippet to get started.</p>
          <button className="btn btn--primary" onClick={onAddNew} type="button">
            Add Snippet
          </button>
        </>
      )}
    </div>
  )
}
