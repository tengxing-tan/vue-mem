import type { Env } from '..'
import type { MemberNew } from '../models/memberNew'
import { getDb, json, httpError } from '../db'

export async function createNewMember(env: Env, request: Request): Promise<Response> {
  try {
    const payload: MemberNew = await request.json()
    if (!payload.phoneNo) {
      return new Response('@tengxing: no member created', {
        status: 400,
        headers: env.corsHeaders,
      })
    }

    const db = getDb(env)
    const columns = ['phoneNo', 'name', 'points']
    const placeholders = columns.map((_, i) => `?${i + 1}`).join(', ')
    const memberId = await db.first<{ id: number }>(
      `INSERT INTO main.members (${columns.join(', ')}) VALUES(${placeholders}) RETURNING id`,
      payload.phoneNo,
      payload.name,
      payload.points,
    )

    return json(env, memberId, 200)
  } catch (e) {
    return httpError(env, (e as Error).message, 500)
  }
}
