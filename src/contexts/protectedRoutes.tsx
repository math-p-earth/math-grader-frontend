import { useRouter } from 'next/router'

import { useUserLegacy } from '../hooks/useUserLegacy'

interface ProtectedRoutesProps {
  children: JSX.Element
}

const unprotectedRoutes = ['/login', '/user/pending-approval', '/user/register-success']

export const ProtectedRoutes: React.FC<ProtectedRoutesProps> = ({ children }) => {
  const { user, isLoading } = useUserLegacy()
  const router = useRouter()
  if (isLoading) {
    return null
  }

  if (!unprotectedRoutes.includes(router.pathname)) {
    if (!user) {
      router.push('/login')
      return null
    }
    if (user.status !== 'APPROVED') {
      router.push('/user/pending-approval')
      return null
    }
  }
  return children
}
