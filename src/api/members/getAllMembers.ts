import type { Env } from '..'

export async function getAllMembers(env: Env, request: Request): Promise<Response> {
  try {
    if (!request) return new Response()
    const { results } = await env.D1_VUE_MEM.prepare(
      `SELECT
        id,
        phoneNo,
        name,
        points
      FROM main.members
        WHERE isDeleted = 0`,
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
