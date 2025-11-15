import type { D1Database, D1PreparedStatement } from '@cloudflare/workers-types'

export interface Env {
  DB: D1Database
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url)
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    }

    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: corsHeaders })
    }
    if (request.method === 'POST' && url.pathname === '/api/members/bulk') {
      try {
        const payload = await request.json()
        if (!Array.isArray(payload)) return new Response('Expected array', { status: 400 })

        const stmt = await env.DB.prepare(
          `INSERT INTO members (phoneNo, name, points, createdAt, updatedAt, isDeleted)
           VALUES (?1, ?2, ?3, ?4, ?5, ?6)
           ON CONFLICT(phoneNo) DO UPDATE SET
             name=excluded.name,
             points=excluded.points,
             createdAt=members.createdAt,
             updatedAt=excluded.updatedAt,
             isDeleted=excluded.isDeleted`,
        )

        const batch: D1PreparedStatement[] = []
        for (const m of payload) {
          batch.push(
            stmt.bind(
              m.phoneNo,
              m.name || '',
              m.points ?? 0,
              new Date(m.createdAt || new Date()).toISOString(),
              new Date(m.updatedAt || new Date()).toISOString(),
              m.isDeleted ? 1 : 0,
            ),
          )
        }

        if (batch.length) await env.DB.batch(batch)

        return new Response(JSON.stringify({ stored: batch.length }), {
          status: 200,
          headers: { 'Content-Type': 'application/json', ...corsHeaders },
        })
      } catch (e) {
        return new Response('Error: ' + (e as Error).message, { status: 500, headers: corsHeaders })
      }
    }

    return new Response('Not found', { status: 404, headers: corsHeaders })
  },
}
