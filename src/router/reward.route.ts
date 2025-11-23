export const rewardRoutes = [
  {
    path: '/reward',
    name: 'reward',
    meta: { title: 'Reward' },
    component: () => import('@/views/reward/RewardView.vue'),
  },
  {
    path: '/reward/create',
    name: 'rewardCreate',
    meta: { title: 'Reward Create' },
    component: () => import('@/views/reward/RewardCreate.vue'),
  },
  {
    path: '/reward/:rewardId',
    name: 'rewardRead',
    meta: { title: 'Reward Read' },
    component: () => import('@/views/reward/RewardRead.vue'),
    props: true,
  },
]
