import type { MemberModel } from '@/models/member.model'

export function useJsonDataStore() {
  const serializeJsonData = <T>(data: T[]) => JSON.stringify(data, null, 2)

  const sendMembersJson = async (
    data: MemberModel[],
    companyEmail: string,
  ): Promise<{ stored: number } | void> => {
    const base = import.meta.env.VITE_API_BASE || ''
    const url = base.replace(/\/$/, '') + '/api/members/bulk'
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ companyEmail, members: data }),
    })
    if (!res.ok) throw new Error(`Request failed: ${res.status}`)
    return await res.json()
  }

  return { serializeJsonData, sendMembersJson }
}
