import { createRouter, createWebHistory } from 'vue-router'
import { memberRoutes } from './member.route'
import { pointRoutes } from './point.route'
import { rewardRoutes } from './reward.route'
import CompanyView from '@/views/company/CompanyView.vue'
import HomeView from '@/views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    meta: { title: 'Home' },
    component: HomeView,
  },
  {
    path: '/company',
    name: 'companyHome',
    meta: { title: 'Company Home' },
    component: CompanyView,
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
