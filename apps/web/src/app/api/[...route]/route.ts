import { NextRequest, NextResponse } from 'next/server'
import { env } from '~/env.mjs'

interface RouteRevalidateTime {
	readonly [key: string]: number
}

const routeRevalidateTime: RouteRevalidateTime = {
	'/students/me': 60, // 1 min
}

async function handleRoute(request: NextRequest) {
	const query = request.nextUrl.search
	const endpoint = request.nextUrl.pathname.slice('/api'.length)
	const revalidate = endpoint in routeRevalidateTime ? routeRevalidateTime[endpoint] : 0

	const resp = await fetch(`${env.BACKEND_INTERNAL_URL}/api${endpoint}${query}`, {
		method: request.method,
		body: request.body,
		duplex: 'half',
		headers: {
			accept: 'application/json',
			cookie: request.headers.get('cookie') ?? '',
			'content-type': request.headers.get('content-type') || '',
		},
		next: {
			revalidate: revalidate,
		},
	} as RequestInit & { duplex: 'half' })
	return new NextResponse(resp.body, {
		status: resp.status,
		headers: {
			'content-type': resp.headers.get('content-type') || '',
			'content-disposition': resp.headers.get('content-disposition') || '',
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
