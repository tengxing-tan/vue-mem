import type { RewardCategory } from '@/enums/RewareCategory'

export interface RewardModel {
  id?: number
  name: string
  description: string
  points: number
  category: RewardCategory
  validFrom: Date | null
  validUntil: Date | null
}
