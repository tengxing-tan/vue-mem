import MemberCreate from '@/views/member/MemberCreate.vue'
import MemberRead from '@/views/member/MemberRead.vue'
import MembersView from '@/views/member/MembersView.vue'

export const memberRoutes = [
  {
    path: '/members',
    name: 'members',
    meta: { title: 'Members home page' },
    component: MembersView,
  },
  {
    path: '/member/read/:phoneNo',
    name: 'memberRead',
    meta: { title: 'Read Member' },
    component: MemberRead,
    props: true,
  },
  {
    path: '/member/create/:phoneNo?',
    name: 'memberCreate',
    meta: { title: 'Create Member' },
    component: MemberCreate,
    props: true,
  },
]
