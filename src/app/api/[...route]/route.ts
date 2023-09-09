import { NextRequest, NextResponse } from 'next/server'

import { env } from '~/env.mjs'

async function handleRoute(request: NextRequest) {
  const endpoint = request.nextUrl.pathname.slice('/api'.length)
  const resp = await fetch(`${env.BACKEND_INTERNAL_URL}/api${endpoint}`, {
    method: request.method,
    body: request.body,
    duplex: 'half',
    headers: {
      accept: 'application/json',
      cookie: request.headers.get('cookie') ?? '',
      'content-type': request.headers.get('content-type') || '',
    },
  } as RequestInit & { duplex: 'half' })
  return new NextResponse(resp.body, {
    status: resp.status,
    headers: {
      'content-type': resp.headers.get('content-type') || '',
      'set-cookie': resp.headers.get('set-cookie') || '',
    },
  })
}

export async function GET(request: NextRequest) {
  return handleRoute(request)
}

export async function POST(request: NextRequest) {
  return handleRoute(request)
}
