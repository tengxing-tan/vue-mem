export enum PointStatus {
  Failed = 0,
  Issued = 1,
  Redeemed = 2,
}

export const PointStatusDescription: Record<PointStatus, string> = {
  [PointStatus.Failed]: '❌ Failed',
  [PointStatus.Issued]: '✅ Issued',
  [PointStatus.Redeemed]: '🔄 Redeemed',
}
