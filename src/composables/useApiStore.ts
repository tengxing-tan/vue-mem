export function useApiStore() {
  const postAction = async <T>(endpoint: string, body: T) => {
    const base = import.meta.env.VITE_API_BASE || ''

    const url = base + endpoint
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
    if (!res.ok) throw new Error(`Request failed: ${res.status}`)
    return await res.json()
  }

  const getAction = async (endpoint: string): Promise<Response> => {
    const base = import.meta.env.VITE_API_BASE || ''
    const url = base + '/api' + endpoint
    const res = await fetch(url, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })
    if (!res.ok) throw new Error(`Request failed: ${res.status}`)
    return res
  }

  return { postAction, getAction }
}
