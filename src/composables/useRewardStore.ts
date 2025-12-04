import { RewardCategory } from '@/enums/RewareCategory'
import type { RewardModel } from '@/models/reward.model'
import { create } from '@/services/reward.service'
import { computed, ref } from 'vue'

export function useRewardStore() {
  const validation = (reward: RewardModel): boolean => !!reward.name

  const reward = ref<RewardModel>({
    name: '',
    description: '',
    points: 0,
    category: RewardCategory.Beverage,
    validFrom: new Date(),
    validUntil: null,
    imageUrl: null,
  })

  const isValid = computed(() => validation(reward.value))

  const createReward = async (reward: RewardModel) => {
    await create(reward)
  }

  return { reward, isValid, createReward }
}
