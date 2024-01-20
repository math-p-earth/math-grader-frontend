import * as React from 'react'

import { type VariantProps, cva } from 'class-variance-authority'

import { cn } from '../../lib/utils'

const badgeVariants = cva(
	'inline-flex items-center rounded-full border border-zinc-200 px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-zinc-950 focus:ring-offset-2 dark:border-zinc-800 dark:focus:ring-zinc-300',
	{
		variants: {
			variant: {
				default:
					'border-transparent bg-zinc-900 text-zinc-50 hover:bg-zinc-900/80 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-50/80',
				secondary:
					'border-transparent bg-zinc-100 text-zinc-900 hover:bg-zinc-100/80 dark:bg-zinc-800 dark:text-zinc-50 dark:hover:bg-zinc-800/80',
				destructive:
					'border-transparent bg-red-500 text-zinc-50 hover:bg-red-500/80 dark:bg-red-900 dark:text-zinc-50 dark:hover:bg-red-900/80',
				outline: 'text-zinc-950 dark:text-zinc-50',
				color: 'border-transparent',
			},
			badgeColor: {
				none: '',
				red: 'bg-red-500 text-zinc-50 hover:bg-red-500/80 dark:bg-red-800 dark:text-zinc-50 dark:hover:bg-red-800/80',
				'red-light':
					'bg-red-200 text-zinc-800 hover:bg-red-200/80 dark:bg-red-600 dark:text-zinc-50 dark:hover:bg-red-600/80',
				orange:
					'bg-orange-500 text-zinc-50 hover:bg-orange-500/80 dark:bg-orange-800 dark:text-zinc-50 dark:hover:bg-orange-800/80',
				'orange-light':
					'bg-orange-200 text-zinc-800 hover:bg-orange-200/80 dark:bg-orange-600 dark:text-zinc-50 dark:hover:bg-orange-600/80',
				yellow:
					'bg-yellow-500 text-zinc-50 hover:bg-yellow-500/80 dark:bg-yellow-800 dark:text-zinc-50 dark:hover:bg-yellow-800/80',
				'yellow-light':
					'bg-yellow-200 text-zinc-800 hover:bg-yellow-200/80 dark:bg-yellow-600 dark:text-zinc-50 dark:hover:bg-yellow-600/80',
				green:
					'bg-green-500 text-zinc-50 hover:bg-green-500/80 dark:bg-green-800 dark:text-zinc-50 dark:hover:bg-green-800/80',
				'green-light':
					'bg-green-200 text-zinc-800 hover:bg-green-200/80 dark:bg-green-600 dark:text-zinc-50 dark:hover:bg-green-600/80',
				blue: 'bg-blue-500 text-zinc-50 hover:bg-blue-500/80 dark:bg-blue-800 dark:text-zinc-50 dark:hover:bg-blue-800/80',
				'blue-light':
					'bg-blue-200 text-zinc-800 hover:bg-blue-200/80 dark:bg-blue-600 dark:text-zinc-50 dark:hover:bg-blue-600/80',
				sky: 'bg-sky-500 text-zinc-50 hover:bg-sky-500/80 dark:bg-sky-800 dark:text-zinc-50 dark:hover:bg-sky-800/80',
				'sky-light':
					'bg-sky-200 text-zinc-800 hover:bg-sky-200/80 dark:bg-sky-600 dark:text-zinc-50 dark:hover:bg-sky-600/80',
			},
		},
		defaultVariants: {
			variant: 'default',
			badgeColor: 'none',
		},
	},
)

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, badgeColor, ...props }: BadgeProps) {
	return <div className={cn(badgeVariants({ variant, badgeColor }), className)} {...props} />
}

export { Badge, badgeVariants }
