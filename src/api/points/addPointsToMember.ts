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

    const memberId = await env.D1_VUE_MEM.prepare(`SELECT id FROM main.members WHERE phoneNo = ?`)
      .bind(payload.phoneNo)
      .first<{ id: number }>()

    console.log('memberId', memberId)
    if (!memberId) return env.httpNotFound

    await env.D1_VUE_MEM.prepare(
      `INSERT INTO main.points (memberId, points)
     VALUES(?, ?)`,
    )
      .bind(memberId.id, payload.points)
      .first<{ id: number }>()

    return new Response(JSON.stringify(memberId), {
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
