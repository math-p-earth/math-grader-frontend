import React from 'react'

import Image from 'next/image'

import { PageList } from './PageList'

function SidebarHeader() {
  return (
    <div className="flex items-center gap-2.5">
      <Image src="/images/logos/app.png" alt="App logo" width={30} height={30} />
      <span className="text-lg font-semibold">Math P' Earth</span>
    </div>
  )
}

export default function DashboardLayout({ children }) {
  return (
    <React.Fragment>
      <div className="fixed bottom-0 top-0 flex w-64 flex-col gap-8 overflow-y-auto bg-zinc-800 p-6">
        <SidebarHeader />
        <PageList />
      </div>
      <div className="ml-64">{children}</div>
    </React.Fragment>
  )
}
