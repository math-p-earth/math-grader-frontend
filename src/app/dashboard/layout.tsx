import React from 'react'

import Image from 'next/image'
import Link from 'next/link'

import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { mustAuthenticated } from '~/api/auth/must-authenticated'
import { MePayload } from '~/api/user/getUser'
import { SignOutButton } from '~/components/SignOutButton'

import { DarkModeSwitch } from './DarkModeSwitch'
import { PageList } from './PageList'

interface ProfileProps {
  user: MePayload
}

function Profile({ user }: ProfileProps) {
  return (
    <div className="flex items-center gap-2">
      <Avatar>
        <AvatarFallback className="bg-zinc-700 dark:bg-zinc-700">
          {user.firstName[0]}
        </AvatarFallback>
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
      <Link href="/" className="flex items-center gap-4">
        <Image src="/images/logos/app.png" alt="App logo" width={30} height={30} />
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

export default async function DashboardLayout({ children }) {
  mustAuthenticated()
  return (
    <React.Fragment>
      <div className="flex items-start">
        <Sidebar />
        <div className="container">
          {/* <HeaderBar /> */}
          <div className="flex-1">{children}</div>
        </div>
      </div>
    </React.Fragment>
  )
}
