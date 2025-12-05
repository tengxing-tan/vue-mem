import type { Env } from '..'
import { getDb, json, httpError } from '../db'

type ResquestPayload = {
  id: number
}

export async function deleteReward(env: Env, request: Request): Promise<Response> {
  try {
    const payload: ResquestPayload = await request.json()
    const id = payload.id

    if (!id) {
      return new Response('@tengxing: reward id is required', {
        status: 400,
        headers: env.corsHeaders,
      })
    }

    const db = getDb(env)
    await db.run('DELETE FROM main.rewards WHERE id = ?1', id)

    return json(env, 'OK', 200)
  } catch (e) {
    return httpError(env, (e as Error).message, 500)
  }
}
