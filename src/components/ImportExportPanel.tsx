import { useState, useRef } from 'react'
import type { CodeSnippet, SnippetPreferences } from '../types'
import { exportToJSON, importFromJSON } from '../utils/storage'

interface ImportExportPanelProps {
  snippets: CodeSnippet[]
  preferences: SnippetPreferences
  onImport: (snippets: CodeSnippet[], preferences: SnippetPreferences) => void
  onClose: () => void
}

export function ImportExportPanel({ snippets, preferences, onImport, onClose }: ImportExportPanelProps) {
  const [importError, setImportError] = useState<string | null>(null)
  const [importSuccess, setImportSuccess] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleExport = () => {
    const json = exportToJSON(snippets, preferences)
    const blob = new Blob([json], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `snippetshelf-export-${new Date().toISOString().slice(0, 10)}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  const handleFileImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (event) => {
      processImport(event.target?.result as string)
    }
    reader.readAsText(file)
    e.target.value = ''
  }

  const processImport = (jsonString: string) => {
    setImportError(null)
    setImportSuccess(false)
    try {
      const data = importFromJSON(jsonString)
      onImport(data.snippets, data.preferences)
      setImportSuccess(true)
      setTimeout(() => setImportSuccess(false), 3000)
    } catch (err) {
      setImportError(err instanceof Error ? err.message : 'Failed to import data.')
    }
  }

  return (
    <div className="modal-backdrop" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal-content modal-content--sm">
        <header className="modal-header">
          <h2 className="modal-title">Import / Export</h2>
          <button className="modal-close" onClick={onClose} aria-label="Close" type="button">✕</button>
        </header>

        <div className="import-export-body">
          <section className="ie-section">
            <h3 className="ie-section-title">Export</h3>
            <p className="ie-section-desc">Download all your snippets as a JSON file.</p>
            <button className="btn btn--primary" onClick={handleExport} type="button">
              Download JSON
            </button>
          </section>

          <hr className="ie-divider" />

          <section className="ie-section">
            <h3 className="ie-section-title">Import</h3>
            <p className="ie-section-desc">
              Upload a JSON file to restore snippets. This will replace your current data.
            </p>
            <button
              className="btn btn--secondary"
              onClick={() => fileInputRef.current?.click()}
              type="button"
            >
              Choose File
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept=".json,application/json"
              onChange={handleFileImport}
              style={{ display: 'none' }}
              aria-label="Import JSON file"
            />
            {importError && (
              <p className="ie-error" role="alert">{importError}</p>
            )}
            {importSuccess && (
              <p className="ie-success" role="status">Snippets imported successfully!</p>
            )}
          </section>
        </div>
      </div>
    </div>
  )
}
