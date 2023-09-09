'use client'

import { redirect } from 'next/navigation'

import { Button } from '@/components/ui/button'
import { useUser } from '~/hooks/useUser'

export function SignOutButton() {
  const { signOut } = useUser()

  const handleSignOut = async () => {
    console.log('LOGGING OUT')
    await signOut()
    console.log('REDIRECTING')
    redirect('/login')
  }
  return (
    <Button asChild variant="destructive" onClick={handleSignOut}>
      Sign Out
    </Button>
  )
}
