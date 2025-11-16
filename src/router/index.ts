import { createRouter, createWebHistory } from 'vue-router'
import { memberRoutes } from './member.route'
import PointView from '@/views/point/PointView.vue'
import { pointRoutes } from './point.route'
import { rewardRoutes } from './reward.route'

const routes = [
  {
    path: '/',
    name: 'home',
    meta: { title: 'Home' },
    component: PointView,
  },
  ...memberRoutes,
  ...pointRoutes,
  ...rewardRoutes,
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
