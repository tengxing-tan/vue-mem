import type { Env } from '.'
import { createCompany } from './companies'
import { handleMemberBatch } from './members/bulk'
import { createNewMember } from './members/createNewMember'
import { getAllMembers } from './members/getAllMembers'
import { getMember } from './members/getMember'
import { getMemberPoints } from './members/getMemberPoints'
import { addPointsToMember } from './points/addPointsToMember'
import { approveRedemption } from './redemptions/approveRedemption'
import { getPendingRedemption } from './redemptions/getPendingRedemptions'
import { setRedemptionRequest } from './redemptions/setRedeemRequest'
import { handleRewardBatch } from './rewards/bulk'
import { getRewards } from './rewards/getReward'

export type ApiRoute = {
  pathName: string
  method: string
  handler: (env: Env, request: Request) => Promise<Response>
}

export const apiRoutes: ApiRoute[] = [
  {
    pathName: '/api/member/get',
    method: 'GET',
    handler: getMember,
  },
  {
    pathName: '/api/member/points',
    method: 'GET',
    handler: getMemberPoints,
  },
  {
    pathName: '/api/member/new',
    method: 'POST',
    handler: createNewMember,
  },
  {
    pathName: '/api/member/getAll',
    method: 'GET',
    handler: getAllMembers,
  },
  {
    pathName: '/api/members/bulk',
    method: 'POST',
    handler: handleMemberBatch,
  },
  {
    pathName: '/api/point/new',
    method: 'POST',
    handler: addPointsToMember,
  },
  {
    pathName: '/api/rewards',
    method: 'GET',
    handler: getRewards,
  },
  {
    pathName: '/api/rewards/bulk',
    method: 'POST',
    handler: handleRewardBatch,
  },
  {
    pathName: '/api/redemption/request',
    method: 'POST',
    handler: setRedemptionRequest,
  },
  {
    pathName: '/api/redemption/approve',
    method: 'POST',
    handler: approveRedemption,
  },
  {
    pathName: '/api/redemptions/pending',
    method: 'GET',
    handler: getPendingRedemption,
  },
  {
    pathName: '/api/company',
    method: 'POST',
    handler: createCompany,
  },
]
