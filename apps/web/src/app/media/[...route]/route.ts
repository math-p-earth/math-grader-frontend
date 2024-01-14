import { NextRequest, NextResponse } from 'next/server'
import { env } from '~/env.mjs'

async function handleRoute(request: NextRequest) {
	const mediaPath = request.nextUrl.pathname.slice('/media'.length)

	const resp = await fetch(`${env.BACKEND_INTERNAL_URL}/media${mediaPath}`, {
		method: request.method,
		duplex: 'half',
		headers: {
			cookie: request.headers.get('cookie') ?? '',
			'content-type': request.headers.get('content-type') || '',
		},
		cache: 'no-store',
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
