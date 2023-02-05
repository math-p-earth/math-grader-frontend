import { useGoogleOneTapLogin } from '@react-oauth/google'
import useSWR from 'swr'

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
}
interface UserResponse {
  user: User | null
  token?: string
  exp?: number
}

export function useUser() {
  const { data, error, mutate } = useSWR<UserResponse>(['/students/me'])

  return {
    user: data?.user,
    token: data?.token,
    isLoading: !data && !error,
    error: error,
    mutateUser: mutate,
  }
}
