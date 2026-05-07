import { useState, useCallback } from 'react'

interface UseClipboardReturn {
  copy: (text: string) => Promise<void>
  copied: boolean
  error: string | null
}

export function useClipboard(resetDelay = 2000): UseClipboardReturn {
  const [copied, setCopied] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const copy = useCallback(
    async (text: string) => {
      setError(null)
      try {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          await navigator.clipboard.writeText(text)
        } else {
          // Fallback for environments without Clipboard API
          const textarea = document.createElement('textarea')
          textarea.value = text
          textarea.style.position = 'fixed'
          textarea.style.opacity = '0'
          document.body.appendChild(textarea)
          textarea.focus()
          textarea.select()
          const success = document.execCommand('copy')
          document.body.removeChild(textarea)
          if (!success) throw new Error('execCommand copy failed')
        }
        setCopied(true)
        setTimeout(() => setCopied(false), resetDelay)
      } catch {
        setError('Failed to copy. Please copy manually.')
        setTimeout(() => setError(null), 3000)
      }
    },
    [resetDelay]
  )

  return { copy, copied, error }
}
