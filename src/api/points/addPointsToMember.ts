import type { Env } from '..'
import type { PointNew } from '../models/PointNew'

export async function addPointsToMember(env: Env, request: Request): Promise<Response> {
  try {
    const payload: PointNew = await request.json()
    if (!payload.phoneNo) {
      return new Response('@tengxing: no member founded', {
        status: 400,
        headers: env.corsHeaders,
      })
    }

    const member = await env.D1_VUE_MEM.prepare(`SELECT id FROM main.members WHERE phoneNo = ?`)
      .bind(payload.phoneNo)
      .first<{ id: number }>()

    if (!member) return env.httpNotFound

    await env.D1_VUE_MEM.prepare(
      `INSERT INTO main.points (memberId, points)
     VALUES(?, ?)`,
    )
      .bind(member.id, payload.points)
      .first<{ id: number }>()

    await env.D1_VUE_MEM.prepare(
      `UPDATE main.members
     SET points = points + ?
     WHERE id = ?`,
    )
      .bind(payload.points, member.id)
      .run()

    return new Response(JSON.stringify(member), {
      status: 200,
      headers: { 'Content-Type': 'application/json', ...env.corsHeaders },
    })
  } catch (e) {
    return new Response('Error: ' + (e as Error).message, {
      status: 500,
      headers: env.corsHeaders,
    })
  }
}
