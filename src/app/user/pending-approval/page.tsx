import Image from 'next/image'
import { redirect } from 'next/navigation'

import { getLoggedInUser } from '~/api/user/getUser'
import { SignOutButton } from '~/components/SignOutButton'

export default async function RegisterSuccessPage() {
  const user = await getLoggedInUser()
  if (!user) {
    redirect('/login')
  }
  if (user.status === 'APPROVED') {
    redirect('/')
  }

  return (
    <div className="flex h-screen flex-col items-center gap-8">
      <div className="mt-64 flex items-center gap-4">
        <Image src="/images/logos/app.png" alt="App logo" width={100} height={100} />
        <span className="text-3xl font-semibold text-zinc-900">Math P' Earth</span>
      </div>
      <p className="text-2xl font-bold">
        You are logged in as {user.firstName} {user.lastName}.
      </p>
      <p>
        However, your account has not been approved yet. Please contact an administrator to gain
        access.
      </p>
      <SignOutButton />
    </div>
  )
}
