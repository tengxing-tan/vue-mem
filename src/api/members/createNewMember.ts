import type { Env } from '..'
import type { MemberNew } from '../models/memberNew'

export async function createNewMember(env: Env, request: Request): Promise<Response> {
  try {
    const payload: MemberNew = await request.json()
    if (!payload.phoneNo) {
      return new Response('@tengxing: no member created', {
        status: 400,
        headers: env.corsHeaders,
      })
    }

    const columns = ['phoneNo', 'name', 'points']
    const valuesPlaceholders = columns.map((_, index) => `?${index + 1}`).join(', ')
    const memberId = await env.D1_VUE_MEM.prepare(
      `INSERT INTO main.members (${columns.join(', ')})
     VALUES(${valuesPlaceholders}) RETURNING id`,
    )
      .bind(payload.phoneNo, payload.name, payload.points)
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
