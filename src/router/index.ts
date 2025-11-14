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
    path: '/points',
    name: 'points',
    meta: { title: 'Points' },
    component: PointView,
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
