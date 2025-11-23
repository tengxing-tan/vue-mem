import type { Env } from '..'

export async function getPendingRedemption(env: Env, request: Request): Promise<Response> {
  try {
    if (!request) return new Response()

    const stmt = env.D1_VUE_MEM.prepare(
      `SELECT
        rw.id as rewardId, rw.name, r.id as redemptionId, r.phoneNo, r.createdAt, rw.points
        FROM main.redemptions r
        JOIN main.rewards rw ON r.rewardId = rw.id
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
