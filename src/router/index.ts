import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    meta: { title: 'Home' },
    component: HomeView,
  },
  {
    path: '/about',
    name: 'about',
    meta: { title: 'About' },
    component: () => import('../views/AboutView.vue'),
  },
  {
    path: '/memberList',
    name: 'memberList',
    meta: { title: 'Member List' },
    component: () => import('../views/member/MemberListView.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
