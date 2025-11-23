export interface RewardUpsert {
  name: string
  companyId: number
  points: number
  category: number
  validFrom: Date | null
  validUntil: Date | null
  description: string
}
