import type { Env } from '..'
import type { RedemptionUpdate } from '../models/redemptionUpdate'

export async function approveRedemption(env: Env, request: Request): Promise<Response> {
  try {
    if (!request) return new Response()

    const payload: RedemptionUpdate = await request.json()

    const stmt = env.D1_VUE_MEM.prepare(
      `UPDATE main.redemptions SET status = ? WHERE id = ? RETURNING memberId, rewardId`,
    ).bind(payload.status, payload.id)

    const { results } = await stmt.run()

    if (!!results && payload.status === 3) {
      const deductPoint = env.D1_VUE_MEM.prepare(
        `UPDATE members SET points = points - ? WHERE id = ?`,
      ).bind(payload.points, results[0]?.memberId)

      await deductPoint.run()
    }

    return new Response(JSON.stringify(results || null), {
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
