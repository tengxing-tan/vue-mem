import type { MemberGet } from '@/models/member-get.model'

export function useClientStore() {
  const base = import.meta.env.VITE_API_BASE || ''

  const findPhoneNo = async (phoneNo: string): Promise<MemberGet> => {
    const url = base + '/api/member/get?phoneNo=' + encodeURIComponent(phoneNo)
    const res = await fetch(url)
    if (!res.ok) throw new Error(`Request failed: ${res.status}`)
    return await res.json()
  }

  return { findPhoneNo }
}
