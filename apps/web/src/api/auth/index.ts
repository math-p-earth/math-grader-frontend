import { cookies } from 'next/headers'
import { env } from '~/env.mjs'

import { handleResponse } from '../handleResponse'

const payloadTokenCookieName = 'payload-token'

export function getPayloadToken(): string | null {
	const cookieStore = cookies()
	const tokenCookie = cookieStore.get(payloadTokenCookieName)
	if (!tokenCookie) {
		return null
	}
	return tokenCookie.value
}

export async function signOut(): Promise<void> {
	const token = getPayloadToken()
	if (!token) {
		return
	}

	const res = await fetch(`${env.BACKEND_INTERNAL_URL}/api/students/logout`, {
		method: 'GET',
		headers: {
			Authorization: `JWT ${token}`,
		},
	})
	await handleResponse(res)
	return
}
