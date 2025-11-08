export interface MemberModel {
  name: string
  phoneNo: string // unique, 10 - 12 digits: 012xxx
  points: number
  createdAt: Date
  updatedAt: Date
  isDeleted?: boolean
}
