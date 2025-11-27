import type { Env } from '..'
import type { RewardNew } from '../models/rewardNew'

export async function updateReward(env: Env, request: Request): Promise<Response> {
  try {
    const payload: RewardNew = await request.json()
    if (!payload.name) {
      return new Response('@tengxing: no reward created', {
        status: 400,
        headers: env.corsHeaders,
      })
    }

    const columns = [
      'id',
      'name',
      'points',
      'category',
      'validFrom',
      'validUntil',
      'description',
      'imageUrl',
    ]
    const rewardId = await env.D1_VUE_MEM.prepare(
      `UPDATE main.rewards SET ${columns
        .slice(1)
        .map((col, index) => `${col} = ?${index + 2}`)
        .join(', ')} WHERE id = ?1 RETURNING id`,
    )
      .bind(
        payload.id,
        payload.name,
        payload.points,
        payload.category,
        payload.validFrom,
        payload.validUntil,
        payload.description,
        payload.imageUrl,
      )
      .first<{ id: number }>()

    return new Response(JSON.stringify(rewardId), {
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
