import type { Env } from '..'

export async function getMember(env: Env, request: Request): Promise<Response> {
  try {
    if (!request) return new Response()

    const url = new URL(request.url)
    const queryParams = url.searchParams
    const phoneNo = queryParams.get('phoneNo')

    if (!phoneNo) {
      return new Response('Missing phoneNo parameter', {
        status: 400,
        headers: env.corsHeaders,
      })
    }

    const stmt = env.D1_VUE_MEM.prepare(
      `SELECT
        id, name, phoneNo, points, isDeleted
      FROM main.members
        WHERE phoneNo = ?`,
    ).bind(phoneNo)
    const member = await stmt.first()

    return new Response(JSON.stringify(member || null), {
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
