import type { BatchDataPayload } from '@/api/models/batchDataPayload'
import type { MemberModel } from '@/models/member.model'

interface PostResponse {
  id: number
}

export function useJsonDataStore() {
  const serializeJsonData = <T>(data: T[]) => JSON.stringify(data, null, 2)
  const base = import.meta.env.VITE_API_BASE || ''

  const sendMembersJson = async (
    data: MemberModel[],
    companyEmail: string,
  ): Promise<{ stored: number } | void> => {
    const url = base + '/api/members/bulk'
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ companyEmail, members: data }),
    })
    if (!res.ok) throw new Error(`Request failed: ${res.status}`)
    return await res.json()
  }

  const bulkInsert = async <T>(data: T[]) => {
    const url = base + '/api/rewards/bulk'
    const body: BatchDataPayload<T> = {
      companyId: 10000,
      data,
    }
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
    if (!res.ok) throw new Error(`Request failed: ${res.status}`)
    return await res.json()
  }

  const postAction = async <T>(endpoint: string, body: T): Promise<PostResponse> => {
    const res = await fetch(base + endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
    if (!res.ok) throw new Error(`Request failed: ${res.status}`)
    return await res.json()
  }

  return { serializeJsonData, sendMembersJson, bulkInsert, postAction }
}
