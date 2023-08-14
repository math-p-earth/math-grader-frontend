'use client'

import { useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'
import { useUser } from '~/hooks/useUser'

export function SignOutButton() {
  const { signOut } = useUser()
  const router = useRouter()
  const handleSignOut = async () => {
    await signOut()
    router.push('/login')
  }

  return (
    <Button variant="destructive" onClick={handleSignOut}>
      Sign Out
    </Button>
  )
}
