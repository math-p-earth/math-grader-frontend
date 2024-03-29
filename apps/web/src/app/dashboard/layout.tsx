import React from 'react'

import Image from 'next/image'
import Link from 'next/link'
import { mustAuthenticated } from '~/api/auth/must-authenticated'
import { MePayload } from '~/api/user/getUser'
import { SignOutButton } from '~/components/SignOutButton'

import { Avatar, AvatarFallback } from 'ui/components/ui/avatar'
import { cn } from 'ui/lib/utils'

import { DarkModeSwitch } from './DarkModeSwitch'
import { PageList } from './PageList'

export const dynamic = 'force-dynamic'

interface ProfileProps {
	user: MePayload
}

function Profile({ user }: ProfileProps) {
	return (
		<div className="flex items-center gap-2">
			<Avatar>
				<AvatarFallback className="bg-zinc-700 dark:bg-zinc-700">{user.firstName[0]}</AvatarFallback>
			</Avatar>
			<span>
				{user.firstName} {user.lastName}
			</span>
		</div>
	)
}

// hide for now, no use case
function _HeaderBar() {
	return (
		<header className="supports-backdrop-blur:bg-background/60 sticky top-0 z-50 w-full border-b border-border bg-background/90 backdrop-blur">
			<div className="container flex h-14 items-center">
				<div className="flex flex-1 items-center justify-end gap-4"></div>
			</div>
		</header>
	)
}

async function Sidebar() {
	const user = await mustAuthenticated()
	return (
		<div className="sticky top-0 flex h-screen w-64 shrink-0 flex-col gap-8 overflow-y-auto bg-zinc-800 p-6 text-zinc-100">
			<Link className="flex items-center gap-4" href="/">
				<Image alt="App logo" height={30} src="/images/logos/app.png" width={30} />
				<span className="text-lg font-semibold ">Math P' Earth</span>
			</Link>
			<PageList />
			<div className="flex-1" />
			<Profile user={user} />
			<div className="flex w-full items-center gap-4">
				<DarkModeSwitch />
				<SignOutButton className="flex-1" />
			</div>
		</div>
	)
}

interface FooterProps {
	className?: string
}

function Footer({ className }: FooterProps) {
	return (
		<footer className={cn('py-8 text-center text-xs text-zinc-400 dark:text-zinc-500', className)}>
			Made with ❤️ by{' '}
			<a className="font-bold underline" href="https://github.com/bombnp" rel="noreferrer" target="_blank">
				@bombnp
			</a>
			. Sources available on{' '}
			<a
				className="font-bold underline"
				href="https://github.com/math-p-earth/math-grader-frontend"
				rel="noreferrer"
				target="_blank"
			>
				GitHub
			</a>
			.
		</footer>
	)
}

interface DashboardLayoutProps {
	children: React.ReactNode
}

export default async function DashboardLayout({ children }: DashboardLayoutProps) {
	await mustAuthenticated()
	return (
		<React.Fragment>
			<div className="flex items-start">
				<Sidebar />
				<div className="container flex min-h-screen flex-col">
					{/* <HeaderBar /> */}
					<div className="flex-grow">{children}</div>
					<Footer className="flex-shrink-0" />
				</div>
			</div>
		</React.Fragment>
	)
}
