type LogContext = { module?: string; meta?: Record<string, unknown> }

function format(context?: LogContext): string {
  if (!context) return ''
  const parts = [] as string[]
  if (context.module) parts.push(`[${context.module}]`)
  if (context.meta) parts.push(JSON.stringify(context.meta))
  return parts.join(' ')
}

export const logger = {
  info(message: string, context?: LogContext): void {
    console.info(message, format(context))
  },
  warn(message: string, context?: LogContext): void {
    console.warn(message, format(context))
  },
  error(message: string, error?: unknown, context?: LogContext): void {
    console.error(message, format(context), error)
  },
}
