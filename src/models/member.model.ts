export interface MemberModel {
  id: string // e.g. 'u123'
  name: string // e.g. 'Tan'
  phoneNo: string // e.g. '12345678'
  points: number // e.g. 100
  rewards: string[] // e.g. ['r1', 'r2']
  createdAt: Date // e.g. new Date()
  updatedAt: Date // e.g. new Date()
}
