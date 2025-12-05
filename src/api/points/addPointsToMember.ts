import type { Env } from '..'
import type { PointNew } from '../models/PointNew'
import { getDb, json, httpError } from '../db'

export async function addPointsToMember(env: Env, request: Request): Promise<Response> {
  try {
    const payload: PointNew = await request.json()
    if (!payload.phoneNo) {
      return new Response('@tengxing: no member founded', {
        status: 400,
        headers: env.corsHeaders,
      })
    }

    const db = getDb(env)
    const member = await db.first<{ id: number }>(
      `SELECT id FROM main.members WHERE phoneNo = ?1`,
      payload.phoneNo,
    )

    if (!member) return env.httpNotFound

    await db.run(
      `INSERT INTO main.points (memberId, points) VALUES(?1, ?2)`,
      member.id,
      payload.points,
    )

    await db.run(
      `UPDATE main.members SET points = points + ?1 WHERE id = ?2`,
      payload.points,
      member.id,
    )

    return json(env, member, 200)
  } catch (e) {
    return httpError(env, (e as Error).message, 500)
  }
}
