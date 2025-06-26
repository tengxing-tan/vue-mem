import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routeViews = {
  home: HomeView,
  about: () => import('../views/AboutView.vue'),
  memberList: () => import('../views/member/MemberListView.vue'),
  editMember: () => import('../views/member/MemberEdit.vue'),
}

const routes = Object.entries(routeViews).map(([name, component]) => ({
  path: name === 'home' ? '/' : `/${name}`,
  name,
  component,
}))

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
