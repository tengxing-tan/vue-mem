export const memberRoutes = [
  {
    path: '/members',
    name: 'members',
    meta: { title: 'Members home page' },
    component: () => import('@/views/member/MembersView.vue'),
  },
  {
    path: '/member/read/:phoneNo',
    name: 'memberRead',
    meta: { title: 'Read Member' },
    component: () => import('@/views/member/MemberRead.vue'),
    props: true,
  },
  {
    path: '/member/create/:phoneNo?',
    name: 'memberCreate',
    meta: { title: 'Create Member' },
    component: () => import('@/views/member/MemberCreate.vue'),
    props: true,
  },
  {
    path: '/member/dump',
    name: 'memberDump',
    meta: { title: 'Dump Member' },
    component: () => import('@/views/member/MemberDump.vue'),
    props: true,
  },
]
