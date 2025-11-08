import type { MemberModel } from '@/models/member.model'

export const initMemberModel: MemberModel = {
  name: '',
  phoneNo: '',
  points: 0,
  createdAt: new Date(),
  updatedAt: new Date(),
}
