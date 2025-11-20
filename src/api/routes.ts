import type { Env } from '.'
import { createCompany } from './companies'
import { handleMemberBatch } from './members/bulk'
import { getMember } from './members/getMember'
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
    pathName: '/api/members/bulk',
    method: 'POST',
    handler: handleMemberBatch,
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
    pathName: '/api/company',
    method: 'POST',
    handler: createCompany,
  },
]
