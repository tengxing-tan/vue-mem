import type { MemberModel } from '@/models/member.model'
import type { Env } from '..'
import { executeBatch, prepareMemberUpserts } from './helpers'

interface MemberBatchPayload {
  members: MemberModel[]
}

export async function handleMemberBatch(env: Env, request: Request): Promise<Response> {
  try {
    const payload: MemberBatchPayload = await request.json()
    if (!Array.isArray(payload.members)) {
      return new Response('Invalid payload', { status: 400, headers: env.corsHeaders })
    }

    const statements = prepareMemberUpserts(env, payload.members)
    await executeBatch(env, statements)

    return new Response(JSON.stringify({ stored: statements.length }), {
      status: 200,
      headers: { 'Content-Type': 'application/json', ...env.corsHeaders },
    })
  } catch (e) {
    return new Response('Error: ' + (e as Error).message, { status: 500, headers: env.corsHeaders })
  }
}
