import type { Env } from '.'
import { getDb, json, httpError } from './db'

type ResquestPayload = {
  email: string
}

type ResponsePayload = {
  id: number
}

export async function getCompanyId(env: Env, request: Request): Promise<Response> {
  try {
    if (!request) return json(env, null, 200)

    const payload: ResquestPayload = await request.json()
    const db = getDb(env)
    const company = await db.first<ResponsePayload>(
      `SELECT
        id
      FROM main.companies
        WHERE email = ?1 AND verified = 1`,
      payload.email,
    )

    return json(env, company, 200)
  } catch (e) {
    return httpError(env, (e as Error).message, 500)
  }
}
