export const rewardRoutes = [
  {
    path: '/reward',
    name: 'reward',
    meta: { title: 'Reward' },
    component: () => import('@/views/reward/RewardView.vue'),
  },
]
