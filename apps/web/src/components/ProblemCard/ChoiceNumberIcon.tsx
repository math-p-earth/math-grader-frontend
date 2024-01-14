import { cn } from 'ui/lib/utils'

interface ChoiceNumberIconProps {
	children: React.ReactNode
	className?: string
}

export function ChoiceNumberIcon({ children, className }: ChoiceNumberIconProps) {
	return (
		<div
			className={cn(
				'flex h-7 w-7 items-center justify-center rounded-sm bg-zinc-400 text-sm text-zinc-50 dark:bg-zinc-700/90 dark:text-zinc-100',
				className,
			)}
		>
			{children}
		</div>
	)
}
