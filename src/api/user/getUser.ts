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
export type JwtPayload = z.infer<typeof jwtPayloadSchema>

export async function getUser(): Promise<JwtPayload | null> {
  const token = getPayloadToken()
  if (!token) {
    return null
  }

  try {
    const payload = jwtPayloadSchema.parse(jwt.decode(token))
    return payload
  } catch (e) {
    await signOut()
    if (e instanceof jwt.TokenExpiredError) {
      return null
    }
    console.error('Error parsing JWT payload: ', e)
    return null
  }
}
