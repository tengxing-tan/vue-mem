import type { Env } from '@/api'
import type { RewardUpsert } from '../models/rewardUpsert'

/**
 * Prepares upsert statements for members.
 * Reusable anywhere you need to batch member writes.
 */
export function prepareRewardUpserts(env: Env, rewards: RewardUpsert[]): D1PreparedStatement[] {
  const columnsUpsert = [
    'name',
    'companyId',
    'points',
    'category',
    'validFrom',
    'validUntil',
    'description',
    'imageUrl',
  ]
  const valuesPlaceholders = columnsUpsert.map((_, index) => `?${index + 1}`).join(', ')
  const stmt = env.D1_VUE_MEM.prepare(
    `INSERT INTO main.rewards (${columnsUpsert.join(', ')})
     VALUES(${valuesPlaceholders}) RETURNING id`,
  )

  const batch: D1PreparedStatement[] = []
  for (const reward of rewards) {
    batch.push(
      stmt.bind(
        reward.name,
        reward.companyId,
        reward.points,
        reward.category,
        reward.validFrom,
        reward.validUntil,
        reward.description,
        reward.imageUrl,
      ),
    )
  }
  return batch
}

/**
 * Executes batch in chunks for large payloads.
 */
export async function executeBatch(env: Env, statements: D1PreparedStatement[], chunkSize = 100) {
  for (let i = 0; i < statements.length; i += chunkSize) {
    const slice = statements.slice(i, i + chunkSize)
    if (slice.length) await env.D1_VUE_MEM.batch(slice)
  }
}
