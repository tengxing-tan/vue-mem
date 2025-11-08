import AllMembers from '@/views/member/AllMembers.vue'
import MemberCreate from '@/views/member/MemberCreate.vue'
import MemberRead from '@/views/member/MemberRead.vue'
import MemberUpdate from '@/views/member/MemberUpdate.vue'

export const memberRoutes = [
  {
    path: '/members',
    name: 'members',
    meta: { title: 'Member List' },
    component: AllMembers,
    children: [],
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
  {
    path: '/member/update/:phoneNo',
    name: 'memberUpdate',
    meta: { title: 'Update Member' },
    component: MemberUpdate,
    props: true,
  },
]
