export type ToastType = 'info' | 'success' | 'error' | 'warning'

export function showToast(type: ToastType, text: string, timeout?: number): void {
  const event = new CustomEvent('app:toast', {
    detail: { type, text, timeout },
  })
  window.dispatchEvent(event)
}

export const toast = {
  info(text: string, timeout?: number) {
    showToast('info', text, timeout)
  },
  success(text: string, timeout?: number) {
    showToast('success', text, timeout)
  },
  error(text: string, timeout?: number) {
    showToast('error', text, timeout)
  },
  warning(text: string, timeout?: number) {
    showToast('warning', text, timeout)
  },
}
