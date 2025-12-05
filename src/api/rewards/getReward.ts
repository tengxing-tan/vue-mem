import type { Env } from '..'
import { getDb, json, httpError } from '../db'

export async function getRewards(env: Env, request: Request): Promise<Response> {
  try {
    if (!request) return json(env, [], 200)
    const db = getDb(env)
    const results = await db.all(
      `SELECT id, name, points, category, validFrom, validUntil, description, imageUrl
       FROM main.rewards
       WHERE (validFrom IS NULL OR validFrom <= datetime('now','+1 day'))
         AND (validUntil IS NULL OR validUntil >= datetime('now','+1 day'))`,
    )

    return json(env, results, 200)
  } catch (e) {
    return httpError(env, (e as Error).message, 500)
  }
}
