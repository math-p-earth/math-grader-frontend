'use client'

import { useRouter } from 'next/navigation'

import { useQuery } from '@tanstack/react-query'
import { UserResponse } from '~/api/user/getUser'

import { httpClient } from '../util/httpClient'

export function useUser() {
  const router = useRouter()
  const query = useQuery<UserResponse>(['/students/me'], async () => {
    const res = await httpClient.get<UserResponse>('/students/me')
    return res.data
  })

  const signOut = async () => {
    await httpClient.post('students/logout')
    router.push('/login')
  }

  return {
    query,
    signOut,
  }
}
