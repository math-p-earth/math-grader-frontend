import React from 'react'

import Image from 'next/image'

import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { mustAuthenticated } from '~/api/auth/must-authenticated'
import { MePayload } from '~/api/user/getUser'
import { SignOutButton } from '~/components/SignOutButton'

import { PageList } from './PageList'

function SidebarHeader() {
  return (
    <div className="flex items-center gap-2.5">
      <Image src="/images/logos/app.png" alt="App logo" width={30} height={30} />
      <span className="text-lg font-semibold text-zinc-100">Math P' Earth</span>
    </div>
  )
}

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

export default async function DashboardLayout({ children }) {
  const user = await mustAuthenticated()
  return (
    <React.Fragment>
      {/* Sidebar */}
      <div className="fixed bottom-0 top-0 flex w-64 flex-col gap-8 overflow-y-auto bg-zinc-800 p-6">
        <SidebarHeader />
        <PageList />
        <div className="flex-1" />
        <Profile user={user} />
        <SignOutButton />
      </div>
      <div className="ml-64">{children}</div>
    </React.Fragment>
  )
}
