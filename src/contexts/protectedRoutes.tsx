import { useRouter } from 'next/router'

import { useUser } from '../hooks/useUser'

interface ProtectedRoutesProps {
  children: JSX.Element
}

const unprotectedRoutes = ['/login']

export const ProtectedRoutes: React.FC<ProtectedRoutesProps> = ({ children }) => {
  const { user, isLoading } = useUser()
  const router = useRouter()
  if (isLoading) {
    return null
  }
  if (!user && !unprotectedRoutes.includes(router.pathname)) {
    router.push('/login')
    return null
  }
  return children
}
