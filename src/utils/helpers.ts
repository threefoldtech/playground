export function downloadAsFile(name: string, data: string) {
  const a = document.createElement('a')
  a.download = name
  a.href = `data:text/raw;charset=utf-8,${encodeURIComponent(data)}`
  document.body.appendChild(a)
  a.click()
  a.remove()
}

export function normalizeError(error: unknown, fallbackError: string) {
  return (
    typeof error === 'string'
      ? error
      : error && typeof error === 'object' && 'message' in error
      ? error.message
      : fallbackError
  ) as string
}
