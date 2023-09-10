import jwt from 'jsonwebtoken'
import z from 'zod'

import { getPayloadToken, signOut } from '../auth'

const jwtPayloadSchema = z.object({
  email: z.string(),
  id: z.string(),
  status: z.enum(['PENDING', 'APPROVED']),
  nickname: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  collection: z.enum(['students']),
  iat: z.number(),
  exp: z.number(),
})
export type MePayload = z.infer<typeof jwtPayloadSchema>

export async function getUser(): Promise<MePayload | null> {
  const token = getPayloadToken()
  if (!token) {
    return null
  }

  try {
    const payload = jwtPayloadSchema.parse(jwt.decode(token))
    return payload
  } catch (e) {
    // attempt to sign out and catch errors
    try {
      await signOut()
    } catch (signOutError) {
      console.error('Error while signing out: ', signOutError)
    }

    if (e instanceof jwt.TokenExpiredError) {
      return null
    }
    console.error('Error parsing JWT payload: ', e)
    return null
  }
}
