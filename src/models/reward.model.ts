export interface RewardModel {
  id?: number
  name: string
  description: string
  points: number
  category: RewardCategory
  validFrom: Date
  validUntil: Date
}

enum RewardCategory {
  Food = 1,
  Beverage = 2,
}
