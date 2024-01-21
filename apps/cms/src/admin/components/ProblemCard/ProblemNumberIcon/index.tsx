import React from 'react'

interface ProblemNumberIconProps {
	children: React.ReactNode
}

export function ProblemNumberIcon({ children }: ProblemNumberIconProps) {
	return (
		<div className="flex size-8 items-center justify-center bg-zinc-600 font-bold text-zinc-100 dark:bg-zinc-300 dark:text-zinc-700">
			{children}
		</div>
	)
}
