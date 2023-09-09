'use client'

import { useRouter } from 'next/router'

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
    <Button asChild variant="destructive" onClick={handleSignOut}>
      Sign Out
    </Button>
  )
}
