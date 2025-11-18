import type { D1Database } from '@cloudflare/workers-types'
import { apiRoutes, type ApiRoute } from './routes'

export interface Env {
  D1_VUE_MEM: D1Database
  corsHeaders: HeadersInit | undefined
  httpNotFound: Response
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    onFetchInit()
    const url = new URL(request.url)
    const apiRoute: ApiRoute | undefined = apiRoutes.find((r) => r.pathName === url.pathname)

    if (!apiRoute) return env.httpNotFound
    return apiRoute.handler(env, request)

    // Helpers
    function onFetchInit() {
      env.corsHeaders = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,HEAD,POST,OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      }
      env.httpNotFound = new Response('Not found', { status: 404, headers: env.corsHeaders })

      if (request.method === 'OPTIONS') {
        return new Response(null, { status: 204, headers: env.corsHeaders })
      }
    }
  },
}
