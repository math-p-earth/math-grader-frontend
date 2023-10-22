'use client'

import { useRouter } from 'next/navigation'

import { useQuery } from '@tanstack/react-query'

import { httpClient } from '../util/httpClient'

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
export function useUser() {
  const router = useRouter()
  const query = useQuery<UserResponse>(['me'], async () => {
    const res = await httpClient.get<UserResponse>('/students/me')
    return res.data
  })

  const signOut = async () => {
    await httpClient.post('students/logout')
    await query.refetch()
    router.push('/login')
  }

  return {
    query,
    signOut,
  }
}
