import type { Env } from '..'
import { executeBatch, prepareRewardUpserts } from './helpers'
import type { RewardUpsert } from './rewardUpsert'
import type { BatchDataPayload } from '../models/batchDataPayload'

export async function handleRewardBatch(env: Env, request: Request): Promise<Response> {
  try {
    const payload: BatchDataPayload<RewardUpsert> = await request.json()
    if (!payload.companyId || !Array.isArray(payload.data)) {
      return new Response('@tengxing: no rewards', { status: 400, headers: env.corsHeaders })
    }

    const rewardsUpsert: RewardUpsert[] = payload.data.map((reward) => ({
      name: reward.name,
      companyId: payload.companyId,
      points: reward.points,
      category: reward.category,
      validFrom: reward.validFrom,
      validUntil: reward.validUntil,
      description: reward.description,
    }))

    const statements = prepareRewardUpserts(env, rewardsUpsert)
    await executeBatch(env, statements)

    return new Response(JSON.stringify({ stored: statements.length }), {
      status: 200,
      headers: { 'Content-Type': 'application/json', ...env.corsHeaders },
    })
  } catch (e) {
    return new Response('Error: ' + (e as Error).message, { status: 500, headers: env.corsHeaders })
  }
}
