'use client'

import { Button } from 'ui/components/ui/button'
import { useRouter } from 'next/navigation'
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
		<Button className={className} variant="destructive" onClick={handleSignOut}>
			Sign Out
		</Button>
	)
}
