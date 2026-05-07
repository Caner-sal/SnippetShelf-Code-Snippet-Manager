import { useState, useEffect } from 'react'
import type { CodeSnippet, SnippetFormData } from '../types'
import { SNIPPET_LANGUAGES } from '../types'

interface SnippetFormProps {
  initialData?: CodeSnippet
  onSubmit: (data: SnippetFormData) => void
  onCancel: () => void
}

const EMPTY_FORM: SnippetFormData = {
  title: '',
  description: '',
  language: 'JavaScript',
  code: '',
  tags: [],
  isFavorite: false,
}

export function SnippetForm({ initialData, onSubmit, onCancel }: SnippetFormProps) {
  const [form, setForm] = useState<SnippetFormData>(EMPTY_FORM)
  const [tagsInput, setTagsInput] = useState('')
  const [errors, setErrors] = useState<{ title?: string; code?: string }>({})

  useEffect(() => {
    if (initialData) {
      setForm({
        title: initialData.title,
        description: initialData.description,
        language: initialData.language,
        code: initialData.code,
        tags: initialData.tags,
        isFavorite: initialData.isFavorite,
      })
      setTagsInput(initialData.tags.join(', '))
    } else {
      setForm(EMPTY_FORM)
      setTagsInput('')
    }
    setErrors({})
  }, [initialData])

  const validate = (): boolean => {
    const newErrors: { title?: string; code?: string } = {}
    if (!form.title.trim()) newErrors.title = 'Title is required.'
    if (!form.code.trim()) newErrors.code = 'Code content is required.'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    const tags = tagsInput
      .split(',')
      .map((t) => t.trim().toLowerCase())
      .filter(Boolean)
    onSubmit({ ...form, tags })
  }

  const set = <K extends keyof SnippetFormData>(key: K, value: SnippetFormData[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  const isEditing = !!initialData

  return (
    <div className="modal-backdrop" onClick={(e) => e.target === e.currentTarget && onCancel()}>
      <div className="modal-content modal-content--form">
        <header className="modal-header">
          <h2 className="modal-title">{isEditing ? 'Edit Snippet' : 'Add New Snippet'}</h2>
          <button className="modal-close" onClick={onCancel} aria-label="Close" type="button">✕</button>
        </header>

        <form className="snippet-form" onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label className="form-label" htmlFor="form-title">Title *</label>
            <input
              id="form-title"
              className={`form-input${errors.title ? ' form-input--error' : ''}`}
              type="text"
              value={form.title}
              onChange={(e) => set('title', e.target.value)}
              placeholder="e.g. Debounce Function"
              maxLength={100}
            />
            {errors.title && <span className="form-error">{errors.title}</span>}
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="form-description">Description</label>
            <textarea
              id="form-description"
              className="form-input form-textarea"
              value={form.description}
              onChange={(e) => set('description', e.target.value)}
              placeholder="Short description of what this snippet does…"
              rows={2}
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="form-language">Language *</label>
            <select
              id="form-language"
              className="form-input"
              value={form.language}
              onChange={(e) => set('language', e.target.value as SnippetFormData['language'])}
            >
              {SNIPPET_LANGUAGES.map((lang) => (
                <option key={lang} value={lang}>{lang}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="form-code">Code *</label>
            <textarea
              id="form-code"
              className={`form-input form-textarea form-textarea--code${errors.code ? ' form-input--error' : ''}`}
              value={form.code}
              onChange={(e) => set('code', e.target.value)}
              placeholder="Paste your code here…"
              rows={10}
              spellCheck={false}
            />
            {errors.code && <span className="form-error">{errors.code}</span>}
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="form-tags">Tags (comma-separated)</label>
            <input
              id="form-tags"
              className="form-input"
              type="text"
              value={tagsInput}
              onChange={(e) => setTagsInput(e.target.value)}
              placeholder="e.g. utility, react, performance"
            />
          </div>

          <div className="form-group form-group--checkbox">
            <label className="filter-checkbox-label">
              <input
                type="checkbox"
                checked={form.isFavorite}
                onChange={(e) => set('isFavorite', e.target.checked)}
              />
              Mark as favorite
            </label>
          </div>

          <div className="form-actions">
            <button className="btn btn--secondary" type="button" onClick={onCancel}>
              Cancel
            </button>
            <button className="btn btn--primary" type="submit">
              {isEditing ? 'Save Changes' : 'Add Snippet'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
