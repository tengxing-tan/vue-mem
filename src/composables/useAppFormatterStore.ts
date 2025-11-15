export function dateFormat(value?: string | Date): string {
  if (!value) return ''
  const d = new Date(value)
  if (isNaN(d.getTime())) return ''
  // return d.toUTCString()
  return d.toDateString()
}
