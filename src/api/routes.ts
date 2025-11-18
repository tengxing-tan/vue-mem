import type { Env } from '.'
import { handleMemberBatch } from './members/bulk'

export type ApiRoute = {
  pathName: string
  handler: (env: Env, request: Request) => Promise<Response>
}

export const apiRoutes: ApiRoute[] = [
  {
    pathName: '/api/members/bulk',
    handler: handleMemberBatch,
  },
]
