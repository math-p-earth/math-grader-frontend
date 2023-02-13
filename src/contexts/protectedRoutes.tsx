import { useEffect } from 'react'

import { useRouter } from 'next/router'

import { useUser } from '../hooks/useUser'

interface ProtectedRoutesProps {
  children: JSX.Element
}

const unprotectedRoutes = ['/login']

export const ProtectedRoutes: React.FC<ProtectedRoutesProps> = ({ children }) => {
  const { user } = useUser()
  const router = useRouter()
  useEffect(() => {
    if (!user && !unprotectedRoutes.includes(router.pathname)) {
      router.push('/login')
    }
  }, [user, router])
  return children
}
