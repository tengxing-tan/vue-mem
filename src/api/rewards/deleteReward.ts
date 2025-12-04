import type { Env } from '..'

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

    await env.D1_VUE_MEM.prepare('DELETE FROM main.rewards WHERE id = ?1').bind(id).first()

    return new Response('OK', {
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
