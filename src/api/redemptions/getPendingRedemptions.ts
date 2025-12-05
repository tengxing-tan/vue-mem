import type { Env } from '..'
import { getDb, json, httpError } from '../db'

export async function getPendingRedemption(env: Env, request: Request): Promise<Response> {
  try {
    if (!request) return new Response()

    const db = getDb(env)
    const results = await db.all(
      `SELECT rw.id as rewardId, rw.name, r.id as redemptionId, r.phoneNo, r.createdAt, rw.points
       FROM main.redemptions r
       JOIN main.rewards rw ON r.rewardId = rw.id
       WHERE status = 0`,
    )

    return json(env, results || null, 200)
  } catch (e) {
    return httpError(env, (e as Error).message, 500)
  }
}
