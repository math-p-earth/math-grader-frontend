import React from 'react'

import Image from 'next/image'

import { mustAuthenticated } from '~/api/auth/must-authenticated'
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

export default async function DashboardLayout({ children }) {
  await mustAuthenticated()
  return (
    <React.Fragment>
      <div className="fixed bottom-0 top-0 flex w-64 flex-col gap-8 overflow-y-auto bg-zinc-800 p-6">
        <SidebarHeader />
        <PageList />
        <div className="flex-1" />
        <SignOutButton />
      </div>
      <div className="ml-64">{children}</div>
    </React.Fragment>
  )
}
