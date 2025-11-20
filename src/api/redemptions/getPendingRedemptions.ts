import type { Env } from '..'

export async function getPendingRedemption(env: Env, request: Request): Promise<Response> {
  try {
    if (!request) return new Response()

    const stmt = env.D1_VUE_MEM.prepare(
      `SELECT
        phoneNo, rewardId, status, redemptions.createdAt
        FROM main.redemptions
        JOIN main.rewards ON redemptions.rewardId = rewards.id
        WHERE status = 0`,
    )
    const { results } = await stmt.run()

    return new Response(JSON.stringify(results || null), {
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
