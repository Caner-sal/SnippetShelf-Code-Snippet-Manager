import type { CodeSnippet } from '../types'
import { computeStats } from '../utils/snippetStats'

interface DashboardProps {
  snippets: CodeSnippet[]
}

export function Dashboard({ snippets }: DashboardProps) {
  const stats = computeStats(snippets)

  return (
    <section className="dashboard" aria-label="Statistics">
      <div className="dashboard-card">
        <span className="dashboard-value">{stats.total}</span>
        <span className="dashboard-label">Total Snippets</span>
      </div>
      <div className="dashboard-card">
        <span className="dashboard-value">{stats.favorites}</span>
        <span className="dashboard-label">Favorites</span>
      </div>
      <div className="dashboard-card">
        <span className="dashboard-value">{stats.languagesUsed}</span>
        <span className="dashboard-label">Languages Used</span>
      </div>
      <div className="dashboard-card">
        <span className="dashboard-value dashboard-value--sm">{stats.mostUsedLanguage}</span>
        <span className="dashboard-label">Top Language</span>
      </div>
      <div className="dashboard-card">
        <span className="dashboard-value dashboard-value--sm">{stats.mostUsedTag}</span>
        <span className="dashboard-label">Top Tag</span>
      </div>
    </section>
  )
}
