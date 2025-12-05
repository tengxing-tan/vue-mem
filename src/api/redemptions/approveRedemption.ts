import type { Env } from '..'
import type { RedemptionUpdate } from '../models/redemptionUpdate'
import { getDb, json, httpError } from '../db'

export async function approveRedemption(env: Env, request: Request): Promise<Response> {
  try {
    if (!request) return new Response()

    const payload: RedemptionUpdate = await request.json()

    const db = getDb(env)
    const { results } = await db
      .prepare(
        `UPDATE main.redemptions SET status = ?1 WHERE id = ?2 RETURNING memberId, rewardId`,
        payload.status,
        payload.id,
      )
      .run()

    if (!!results && payload.status === 3) {
      await db.run(
        `UPDATE main.members SET points = points - ?1 WHERE id = ?2`,
        payload.points,
        (results[0] as any)?.memberId,
      )
    }

    return json(env, results || null, 200)
  } catch (e) {
    return httpError(env, (e as Error).message, 500)
  }
}
