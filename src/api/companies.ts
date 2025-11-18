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

    const columns = ['email']
    const valuesPlaceholders = columns.map((_, index) => `?${index + 1}`).join(', ')
    const { results } = await env.D1_VUE_MEM.prepare(
      `INSERT INTO main.companies (${columns.join(', ')})
     VALUES(${valuesPlaceholders}) RETURNING id`,
    )
      .bind(payload.email)
      .run()

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
