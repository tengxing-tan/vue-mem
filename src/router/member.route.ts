import MemberProfileView from '@/views/member/MemberProfileView.vue'
import MembersView from '@/views/member/MembersView.vue'

export const memberRoutes = [
  {
    path: '/members',
    name: 'members',
    meta: { title: 'Member List' },
    component: MembersView,
    children: [
      {
        path: ':id',
        name: 'memberProfileView',
        meta: { title: 'Member Profile' },
        component: MemberProfileView,
        props: true,
      },
    ],
  },
]
