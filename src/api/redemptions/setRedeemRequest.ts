import type { Env } from '..'
import type { RedemptionRequestPayload } from '../models/redemptionRequestPayload'
import { getDb, json, httpError } from '../db'

export async function setRedemptionRequest(env: Env, request: Request): Promise<Response> {
  try {
    const payload: RedemptionRequestPayload = await request.json()
    if (payload.phoneNo?.trim() === '' || !payload.rewardId) {
      return new Response('@tengxing: rewardId or phoneNo missing, cannot request redemption', {
        status: 400,
        headers: env.corsHeaders,
      })
    }

    const db = getDb(env)
    const member = await db.first<{ id: number }>(
      `SELECT id FROM main.members WHERE phoneNo = ?1`,
      payload.phoneNo,
    )

    if (!member) {
      return new Response(`@tengxing: member with phoneNo ${payload.phoneNo} not found`, {
        status: 404,
        headers: env.corsHeaders,
      })
    }

    const columns = ['memberId', 'phoneNo', 'rewardId', 'status']
    const placeholders = columns.map((_, i) => `?${i + 1}`).join(', ')
    const redemption = await db.first<{ id: number }>(
      `INSERT INTO main.redemptions (${columns.join(', ')}) VALUES(${placeholders}) RETURNING id`,
      member.id,
      payload.phoneNo,
      payload.rewardId,
      payload.status,
    )

    return json(env, redemption, 200)
  } catch (e) {
    return httpError(env, (e as Error).message, 500)
  }
}
