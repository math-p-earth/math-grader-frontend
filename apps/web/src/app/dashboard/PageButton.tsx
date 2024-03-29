import Link from 'next/link'

import { Button } from 'ui/components/ui/button'
import { cn } from 'ui/lib/utils'

export interface PageButtonProps {
	href: string
	isActive?: boolean
	children: React.ReactNode
}

export function PageButton({ href, isActive = false, children }: PageButtonProps) {
	return (
		<Button
			alignment="left"
			className={cn(
				'bg-zinc-800 text-zinc-300 hover:bg-zinc-700 hover:text-zinc-50 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700 dark:hover:text-zinc-50',
				isActive &&
					'bg-zinc-600 text-zinc-50 hover:bg-zinc-600 dark:bg-zinc-600 dark:text-zinc-50 dark:hover:bg-zinc-600',
			)}
			asChild
		>
			<Link href={href}>{children}</Link>
		</Button>
	)
}
