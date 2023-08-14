import { env } from '~/env.mjs'

import { getPayloadToken } from '../auth'
import { handleResponse } from '../handleResponse'

export interface User {
  id: string
  nickname: string
  gender: 'MALE' | 'FEMALE' | 'OTHER' | 'RATHER NOT SAY'
  firstName: string
  lastName: string
  grade: 'M4' | 'M5' | 'M6'
  email: string
  school: string
  contact: {
    phone?: string
    discord?: string
    line?: string
  }
  courses: {
    id: string
    name: string
  }[]
  status: 'PENDING' | 'APPROVED'
}
export interface UserResponse {
  user: User | null
  token?: string
  exp?: number
  collection: 'student'
}

export async function getUser(token: string): Promise<User | null> {
  const res = await fetch(`${env.NEXT_PUBLIC_BACKEND_URL}/api/students/me`, {
    method: 'GET',
    headers: {
      Authorization: `JWT ${token}`,
    },
  })
  if (res.status === 401) {
    return null // unauthorized
  }
  const data = await handleResponse<UserResponse>(res)
  return data.user
}

export async function getLoggedInUser(): Promise<User | null> {
  const token = getPayloadToken()
  if (!token) {
    return null
  }
  return getUser(token)
}
