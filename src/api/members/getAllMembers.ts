import type { Env } from '..'
import { getDb, json, httpError } from '../db'

export async function getAllMembers(env: Env, request: Request): Promise<Response> {
  try {
    if (!request) return json(env, [], 200)
    const db = getDb(env)
    const results = await db.all(
      `SELECT id, phoneNo, name, points FROM main.members WHERE isDeleted = 0`,
    )

    return json(env, results, 200)
  } catch (e) {
    return httpError(env, (e as Error).message, 500)
  }
}
