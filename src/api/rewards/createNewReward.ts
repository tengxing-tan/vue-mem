import type { Env } from '..'
import type { RewardNew } from '../models/rewardNew'
import { getDb, json, httpError } from '../db'

export async function createNewReward(env: Env, request: Request): Promise<Response> {
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
    const placeholders = columns.map((_, i) => `?${i + 1}`).join(', ')
    const rewardId = await db.first<{ id: number }>(
      `INSERT INTO main.rewards (${columns.join(', ')}) VALUES(${placeholders}) RETURNING id`,
      payload.id,
      payload.name,
      payload.points,
      payload.category,
      payload.validFrom,
      payload.validUntil,
      payload.description,
      payload.imageUrl,
    )

    return json(env, rewardId, 200)
  } catch (e) {
    return httpError(env, (e as Error).message, 500)
  }
}
