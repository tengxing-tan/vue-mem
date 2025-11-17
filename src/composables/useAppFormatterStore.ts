export function dateFormat(value?: string | Date | null): string {
  if (!value) return ''
  const d = new Date(value)
  if (isNaN(d.getTime())) return ''

  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short', // 'Aug'
    day: 'numeric', // '8' or '08' depending on locale
  })
}
