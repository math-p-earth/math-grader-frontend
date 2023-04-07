import { useEffect } from 'react'

import { useRouter } from 'next/router'

import { useUser } from '../hooks/useUser'

interface ProtectedRoutesProps {
  children: JSX.Element
}

const unprotectedRoutes = ['/login', '/user/pending-approval', '/user/register-success']

export const ProtectedRoutes: React.FC<ProtectedRoutesProps> = ({ children }) => {
  const { user, isLoading } = useUser()
  const router = useRouter()

  useEffect(() => {
    if (isLoading) {
      return
    }
    if (!unprotectedRoutes.includes(router.pathname)) {
      if (!user) {
        router.push('/login')
        return
      }
      if (user.status !== 'APPROVED') {
        router.push('/user/pending-approval')
        return
      }
    }
  }, [isLoading, router, user])

  return children
}
