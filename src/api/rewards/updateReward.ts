import type { Env } from '..'
import type { RewardNew } from '../models/rewardNew'
import { getDb, json, httpError } from '../db'

export async function updateReward(env: Env, request: Request): Promise<Response> {
  try {
    const payload: RewardNew = await request.json()
    if (!payload.name) {
      return new Response('@tengxing: no reward created', {
        status: 400,
        headers: env.corsHeaders,
      })
    }

    const db = getDb(env)
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
    const rewardId = await db.first<{ id: number }>(
      `UPDATE main.rewards SET ${columns
        .slice(1)
        .map((col, index) => `${col} = ?${index + 2}`)
        .join(', ')} WHERE id = ?1 RETURNING id`,
      payload.id ?? null,
      payload.name ?? null,
      payload.points ?? null,
      payload.category ?? null,
      payload.validFrom ?? null,
      payload.validUntil ?? null,
      payload.description ?? null,
      payload.imageUrl ?? null,
    )

    return json(env, rewardId, 200)
  } catch (e) {
    return httpError(env, (e as Error).message, 500)
  }
}
