'use client'

import { useRouter } from 'next/navigation'
import { useUser } from '~/hooks/useUser'

import { Button } from 'ui/components/ui/button'

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
		<Button className={className} variant="destructive" onClick={handleSignOut}>
			Sign Out
		</Button>
	)
}
