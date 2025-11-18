import type { Env } from '@/api'
import type { MemberModel } from '@/models/member.model'

/**
 * Prepares upsert statements for members.
 * Reusable anywhere you need to batch member writes.
 */
export function prepareMemberUpserts(
  env: Env,
  companyEmail: string,
  members: MemberModel[],
): D1PreparedStatement[] {
  if (!companyEmail) return []

  const stmt = env.D1_VUE_MEM.prepare(
    `INSERT INTO members (companyEmail, phoneNo, name, points, createdAt, updatedAt, isDeleted)
     VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7)
     ON CONFLICT(phoneNo) DO UPDATE SET
       name=excluded.name,
       points=excluded.points,
       createdAt=members.createdAt,
       updatedAt=excluded.updatedAt,
       isDeleted=excluded.isDeleted`,
  )

  const batch: D1PreparedStatement[] = []
  for (const m of members) {
    if (!m.phoneNo) continue
    batch.push(
      stmt.bind(
        companyEmail,
        m.phoneNo,
        m.name || '',
        m.points ?? 0,
        new Date(m.createdAt || new Date()).toISOString(),
        new Date(m.updatedAt || new Date()).toISOString(),
        m.isDeleted ? 1 : 0,
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
