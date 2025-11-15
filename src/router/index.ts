import { createRouter, createWebHistory } from 'vue-router'
import { memberRoutes } from './member.route'
import AllMembers from '@/views/member/MembersView.vue'
import PointView from '@/views/point/PointView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    meta: { title: 'Home' },
    component: AllMembers,
  },
  ...memberRoutes,
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

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
