interface ProblemNumberIconProps {
	children: React.ReactNode
}

export function ProblemNumberIcon({ children }: ProblemNumberIconProps) {
	return (
		<div className="flex h-8 w-8 items-center justify-center rounded-sm  bg-orange-300 text-zinc-900 dark:bg-orange-700/90 dark:text-zinc-100">
			{children}
		</div>
	)
}
