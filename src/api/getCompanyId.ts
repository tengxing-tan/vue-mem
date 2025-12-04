import type { Env } from '.'

type ResquestPayload = {
  email: string
}

type ResponsePayload = {
  id: number
}

export async function getCompanyId(env: Env, request: Request): Promise<Response> {
  try {
    if (!request) return new Response()

    const payload: ResquestPayload = await request.json()
    const company = await env.D1_VUE_MEM.prepare(
      `SELECT
        id
      FROM main.companies
        WHERE email = ?1 AND verified = 1`,
    )
      .bind(payload.email)
      .first<ResponsePayload>()

    return new Response(JSON.stringify(company), {
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
