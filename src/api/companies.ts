import type { Env } from '.'

export async function createCompany(env: Env, request: Request): Promise<Response> {
  try {
    const payload: { email: string } = await request.json()
    if (!payload.email) {
      return new Response('@tengxing: no company created', {
        status: 400,
        headers: env.corsHeaders,
      })
    }

    let results
    const attempt = await env.D1_VUE_MEM.prepare(
      `
      INSERT INTO main.companies (email)
      SELECT ?1
      WHERE NOT EXISTS (
      SELECT 1 FROM main.companies WHERE email = ?1
      )
      RETURNING id
    `,
    )
      .bind(payload.email)
      .run()

    if (attempt.results.length === 0) {
      const existing = await env.D1_VUE_MEM.prepare(
        `SELECT id FROM main.companies WHERE email = ?1 LIMIT 1`,
      )
        .bind(payload.email)
        .run()
      results = existing.results
    } else {
      results = attempt.results
    }

    return new Response(JSON.stringify(results[0]), {
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
