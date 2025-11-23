import PointView from '@/views/point/PointView.vue'

export const pointRoutes = [
  {
    path: '/point',
    name: 'point',
    meta: { title: 'Point' },
    component: PointView,
  },
  {
    path: '/point/history',
    name: 'pointHistory',
    meta: { title: 'Point History' },
    component: () => import('@/views/point/PointHistory.vue'),
  },
]
