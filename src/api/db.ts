import type { D1Database } from '@cloudflare/workers-types'
import type { Env } from '.'

type BindParams = Array<string | number | null | boolean | Date>

export class D1Client {
  private db: D1Database
  constructor(db: D1Database) {
    this.db = db
  }

  prepare(sql: string, ...params: BindParams) {
    return this.db.prepare(sql).bind(...params)
  }

  async first<T>(sql: string, ...params: BindParams): Promise<T | null> {
    return await this.prepare(sql, ...params).first<T>()
  }

  async all<T = unknown>(sql: string, ...params: BindParams): Promise<T[]> {
    const { results } = await this.prepare(sql, ...params).run()
    return results as T[]
  }

  async run(sql: string, ...params: BindParams): Promise<void> {
    await this.prepare(sql, ...params).run()
  }
}

export function getDb(env: Env): D1Client {
  return new D1Client(env.D1_VUE_MEM)
}

export function json(env: Env, data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json', ...(env.corsHeaders || {}) },
  })
}

export function httpError(env: Env, message: string, status = 500): Response {
  return new Response('Error: ' + message, { status, headers: env.corsHeaders })
}
