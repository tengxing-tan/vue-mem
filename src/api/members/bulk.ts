import type { MemberModel } from '@/models/member.model'
import type { Env } from '..'

interface MemberBatchPayload {
  companyEmail: string
  members: MemberModel[]
}

export async function handleMemberBatch(env: Env, request: Request): Promise<Response> {
  if (request.method !== 'POST') return env.httpNotFound

  try {
    const payload: MemberBatchPayload = await request.json()
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
    for (const m of payload.members) {
      batch.push(
        stmt.bind(
          payload.companyEmail,
          m.phoneNo,
          m.name || '',
          m.points ?? 0,
          new Date(m.createdAt || new Date()).toISOString(),
          new Date(m.updatedAt || new Date()).toISOString(),
          m.isDeleted ? 1 : 0,
        ),
      )
    }

    if (batch.length) await env.D1_VUE_MEM.batch(batch)

    return new Response(JSON.stringify({ stored: batch.length }), {
      status: 200,
      headers: { 'Content-Type': 'application/json', ...env.corsHeaders },
    })
  } catch (e) {
    return new Response('Error: ' + (e as Error).message, { status: 500, headers: env.corsHeaders })
  }
}
