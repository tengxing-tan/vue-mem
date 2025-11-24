import type { Env } from '..'

export async function getRewards(env: Env, request: Request): Promise<Response> {
  try {
    if (!request) return new Response()
    const { results } = await env.D1_VUE_MEM.prepare(
      `SELECT
        id,
        name,
        points,
        category,
        validFrom,
        validUntil,
        description,
        imageUrl
      FROM main.rewards
        WHERE validFrom IS NULL OR validFrom <= datetime('now','+1 day')
        AND (validUntil IS NULL OR validUntil >= datetime('now','+1 day'))`,
    ).run()

    return new Response(JSON.stringify(results), {
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
