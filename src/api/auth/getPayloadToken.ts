import { cookies } from 'next/headers'

const payloadTokenCookieName = 'payload-token'

export function getPayloadToken(): string | null {
  const cookieStore = cookies()
  const tokenCookie = cookieStore.get(payloadTokenCookieName)
  if (!tokenCookie) {
    return null
  }
  return tokenCookie.value
}
