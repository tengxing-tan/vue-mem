import { RewardCategory } from '@/enums/RewareCategory'
import type { RewardModel } from '@/models/reward.model'
import { computed, ref } from 'vue'

export function useRewardStore() {
  const validation = (reward: RewardModel): boolean =>
    !!reward.name && reward.points >= 0 && !!reward.category

  const reward = ref<RewardModel>({
    name: '',
    description: '',
    points: 0,
    category: RewardCategory.Beverage,
    validFrom: new Date(),
    validUntil: null,
  })

  const isValid = computed(() => validation(reward.value))

  return { reward, isValid }
}
