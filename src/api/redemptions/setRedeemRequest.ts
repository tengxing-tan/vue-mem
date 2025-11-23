import type { Env } from '..'
import type { RedemptionRequestPayload } from '../models/redemptionRequestPayload'

export async function setRedemptionRequest(env: Env, request: Request): Promise<Response> {
  try {
    const payload: RedemptionRequestPayload = await request.json()
    if (payload.phoneNo?.trim() === '' || !payload.rewardId) {
      return new Response('@tengxing: rewardId or phoneNo missing, cannot request redemption', {
        status: 400,
        headers: env.corsHeaders,
      })
    }

    const member = await env.D1_VUE_MEM.prepare(`SELECT id FROM main.members WHERE phoneNo = ?`)
      .bind(payload.phoneNo)
      .first<{ id: number }>()

    if (!member) {
      return new Response(`@tengxing: member with phoneNo ${payload.phoneNo} not found`, {
        status: 404,
        headers: env.corsHeaders,
      })
    }

    const columns = ['memberId', 'phoneNo', 'rewardId', 'status']
    const valuesPlaceholders = columns.map((_, index) => `?${index + 1}`).join(', ')
    const redemption = await env.D1_VUE_MEM.prepare(
      `INSERT INTO main.redemptions (${columns.join(', ')})
     VALUES(${valuesPlaceholders}) RETURNING id`,
    )
      .bind(member.id, payload.phoneNo, payload.rewardId, payload.status)
      .first<{ id: number }>()

    return new Response(JSON.stringify(redemption), {
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
