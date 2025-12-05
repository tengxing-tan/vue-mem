import type { Env } from '.'
import { getDb, json, httpError } from './db'

export async function createCompany(env: Env, request: Request): Promise<Response> {
  try {
    const payload: { email: string } = await request.json()
    if (!payload.email) {
      return new Response('@tengxing: no company created', {
        status: 400,
        headers: env.corsHeaders,
      })
    }

    const db = getDb(env)
    let results
    const attempt = await db
      .prepare(
        `
      INSERT INTO main.companies (email)
      SELECT ?1
      WHERE NOT EXISTS (
      SELECT 1 FROM main.companies WHERE email = ?1
      )
      RETURNING id
    `,
        payload.email,
      )
      .run()

    if (attempt.results.length === 0) {
      const existing = await db
        .prepare(`SELECT id FROM main.companies WHERE email = ?1 LIMIT 1`, payload.email)
        .run()
      results = existing.results
    } else {
      results = attempt.results
    }

    return json(env, results[0], 200)
  } catch (e) {
    return httpError(env, (e as Error).message, 500)
  }
}
