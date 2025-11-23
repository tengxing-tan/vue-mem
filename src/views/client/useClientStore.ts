import type { RedemptionRequestPayload } from '@/api/models/redemptionRequestPayload'
import type { MemberGet } from '@/models/member-get.model'

export function useClientStore() {
  const base = import.meta.env.VITE_API_BASE || ''

  const findPhoneNo = async (phoneNo: string): Promise<MemberGet> => {
    const url = base + '/api/member/get?phoneNo=' + encodeURIComponent(phoneNo)
    const res = await fetch(url)
    if (!res.ok) throw new Error(`Request failed: ${res.status}`)
    return await res.json()
  }

  const requestRedemption = async (bodyPayload: RedemptionRequestPayload): Promise<Response> => {
    const url = base + '/api/redemption/request'
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bodyPayload),
    })
    if (!res.ok) throw new Error(`Request failed: ${res.status}`)
    return res
  }

  return { findPhoneNo, requestRedemption }
}
