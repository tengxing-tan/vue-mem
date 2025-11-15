import type { PointStatus } from '@/enums/PointStatus'

export interface PointModel {
  id?: number
  phoneNo: string
  pointsBefore: number
  pointsAfter: number
  createdAt?: Date
  issuedBy: string
  status: PointStatus
}
