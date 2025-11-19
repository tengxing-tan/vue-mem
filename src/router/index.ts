import { createRouter, createWebHistory } from 'vue-router'
import { memberRoutes } from './member.route'
import { pointRoutes } from './point.route'
import { rewardRoutes } from './reward.route'
import HomeView from '@/views/HomeView.vue'

const routes = [
  {
    path: '/',
    alias: ['/home'],
    name: 'home',
    meta: { title: 'Home' },
    component: HomeView,
  },
  {
    path: '/company',
    name: 'companyHome',
    meta: { title: 'Company Home' },
    component: () => import('@/views/company/CompanyView.vue'),
  },
  ...memberRoutes,
  ...pointRoutes,
  ...rewardRoutes,
  {
    path: '/:pathMatch(.*)*',
    redirect: { name: 'home' },
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
