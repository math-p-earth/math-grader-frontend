'use client'

import { useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'
import { useUser } from '~/hooks/useUser'

interface SignOutButtonProps {
  className?: string
}

export function SignOutButton({ className }: SignOutButtonProps) {
  const { signOut } = useUser()
  const router = useRouter()
  const handleSignOut = async () => {
    await signOut()
    router.push('/login')
  }

  return (
    <Button variant="destructive" onClick={handleSignOut} className={className}>
      Sign Out
    </Button>
  )
}
