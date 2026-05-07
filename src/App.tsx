import { useState, useMemo } from 'react'
import type { CodeSnippet, SnippetPreferences, SnippetFormData } from './types'
import { loadFromStorage, saveToStorage, STORAGE_KEY } from './utils/storage'
import { generateId, nowISO } from './utils/date'
import { getAllTags } from './utils/snippetStats'
import { useSnippetFilters } from './hooks/useSnippetFilters'
import { Dashboard } from './components/Dashboard'
import { SearchBar } from './components/SearchBar'
import { FilterPanel } from './components/FilterPanel'
import { SortSelect } from './components/SortSelect'
import { SnippetList } from './components/SnippetList'
import { SnippetDetailModal } from './components/SnippetDetailModal'
import { SnippetForm } from './components/SnippetForm'
import { ImportExportPanel } from './components/ImportExportPanel'

const initialData = loadFromStorage()

export default function App() {
  const [snippets, setSnippets] = useState<CodeSnippet[]>(initialData.snippets)
  const [preferences, setPreferences] = useState<SnippetPreferences>(initialData.preferences)

  const [selectedSnippet, setSelectedSnippet] = useState<CodeSnippet | null>(null)
  const [editingSnippet, setEditingSnippet] = useState<CodeSnippet | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [showImportExport, setShowImportExport] = useState(false)

  const filteredSnippets = useSnippetFilters(snippets, preferences)
  const allTags = useMemo(() => getAllTags(snippets), [snippets])

  const persist = (nextSnippets: CodeSnippet[], nextPrefs: SnippetPreferences) => {
    saveToStorage({ snippets: nextSnippets, preferences: nextPrefs })
  }

  const updatePrefs = (partial: Partial<SnippetPreferences>) => {
    const next = { ...preferences, ...partial }
    setPreferences(next)
    persist(snippets, next)
  }

  const hasActiveFilters =
    preferences.searchQuery !== '' ||
    preferences.selectedLanguage !== 'All' ||
    preferences.selectedTag !== '' ||
    preferences.onlyFavorites

  const handleAddSnippet = (data: SnippetFormData) => {
    const now = nowISO()
    const newSnippet: CodeSnippet = {
      ...data,
      id: generateId(),
      createdAt: now,
      updatedAt: now,
    }
    const next = [newSnippet, ...snippets]
    setSnippets(next)
    persist(next, preferences)
    setShowForm(false)
  }

  const handleEditSnippet = (data: SnippetFormData) => {
    if (!editingSnippet) return
    const updated: CodeSnippet = {
      ...editingSnippet,
      ...data,
      updatedAt: nowISO(),
    }
    const next = snippets.map((s) => (s.id === updated.id ? updated : s))
    setSnippets(next)
    persist(next, preferences)
    setEditingSnippet(null)
    setShowForm(false)
    if (selectedSnippet?.id === updated.id) setSelectedSnippet(updated)
  }

  const handleDeleteSnippet = (id: string) => {
    const next = snippets.filter((s) => s.id !== id)
    setSnippets(next)
    persist(next, preferences)
    if (selectedSnippet?.id === id) setSelectedSnippet(null)
  }

  const handleToggleFavorite = (id: string) => {
    const next = snippets.map((s) =>
      s.id === id ? { ...s, isFavorite: !s.isFavorite, updatedAt: nowISO() } : s
    )
    setSnippets(next)
    persist(next, preferences)
    if (selectedSnippet?.id === id) {
      setSelectedSnippet((prev) => prev && { ...prev, isFavorite: !prev.isFavorite })
    }
  }

  const handleImport = (newSnippets: CodeSnippet[], newPrefs: SnippetPreferences) => {
    setSnippets(newSnippets)
    setPreferences(newPrefs)
    persist(newSnippets, newPrefs)
  }

  const openEditForm = (snippet: CodeSnippet) => {
    setEditingSnippet(snippet)
    setShowForm(true)
  }

  const closeForm = () => {
    setEditingSnippet(null)
    setShowForm(false)
  }

  const handleResetStorage = () => {
    if (window.confirm('Reset all data to defaults? This cannot be undone.')) {
      localStorage.removeItem(STORAGE_KEY)
      window.location.reload()
    }
  }

  return (
    <div className="app">
      <header className="app-header">
        <div className="app-header__inner">
          <div className="app-header__brand">
            <span className="app-logo" aria-hidden="true">📚</span>
            <h1 className="app-title">SnippetShelf</h1>
            <span className="app-subtitle">Personal Code Snippet Manager</span>
          </div>
          <div className="app-header__actions">
            <button
              className="btn btn--primary"
              onClick={() => { setEditingSnippet(null); setShowForm(true) }}
              type="button"
            >
              + Add Snippet
            </button>
            <button
              className="btn btn--secondary"
              onClick={() => setShowImportExport(true)}
              type="button"
            >
              Import / Export
            </button>
            <button
              className="btn btn--ghost btn--sm"
              onClick={handleResetStorage}
              type="button"
              title="Reset all data"
            >
              Reset
            </button>
          </div>
        </div>
      </header>

      <main className="app-main">
        <Dashboard snippets={snippets} />

        <section className="controls-section" aria-label="Search and filter">
          <SearchBar
            value={preferences.searchQuery}
            onChange={(val) => updatePrefs({ searchQuery: val })}
          />
          <div className="controls-row">
            <FilterPanel
              preferences={preferences}
              allTags={allTags}
              onChange={updatePrefs}
            />
            <SortSelect
              value={preferences.sortOption}
              onChange={(val) => updatePrefs({ sortOption: val })}
            />
          </div>
        </section>

        <section className="results-section" aria-label="Snippets">
          <div className="results-header">
            <span className="results-count">
              {filteredSnippets.length} snippet{filteredSnippets.length !== 1 ? 's' : ''}
              {hasActiveFilters ? ' found' : ''}
            </span>
          </div>
          <SnippetList
            snippets={filteredSnippets}
            hasActiveFilters={hasActiveFilters}
            onView={setSelectedSnippet}
            onEdit={openEditForm}
            onDelete={handleDeleteSnippet}
            onToggleFavorite={handleToggleFavorite}
            onAddNew={() => { setEditingSnippet(null); setShowForm(true) }}
          />
        </section>
      </main>

      {selectedSnippet && (
        <SnippetDetailModal
          snippet={selectedSnippet}
          onClose={() => setSelectedSnippet(null)}
          onToggleFavorite={handleToggleFavorite}
          onEdit={openEditForm}
        />
      )}

      {showForm && (
        <SnippetForm
          initialData={editingSnippet ?? undefined}
          onSubmit={editingSnippet ? handleEditSnippet : handleAddSnippet}
          onCancel={closeForm}
        />
      )}

      {showImportExport && (
        <ImportExportPanel
          snippets={snippets}
          preferences={preferences}
          onImport={handleImport}
          onClose={() => setShowImportExport(false)}
        />
      )}
    </div>
  )
}
