import Image from 'next/image'
import { redirect } from 'next/navigation'

import { getLoggedInUser } from '~/api/user/getUser'

export default async function RegisterSuccessPage() {
  const user = await getLoggedInUser()
  if (!user) {
    redirect('/login')
  }
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-4">
      <div className="flex items-center gap-4">
        <Image src="/images/logos/app.png" alt="App logo" width={100} height={100} />
        <span className="text-3xl font-semibold text-zinc-900">Math P' Earth</span>
      </div>
      <h2>✅ Success!</h2>
      <p>
        Your account,
        <span className="font-semibold">{` ${user.firstName} ${user.lastName}`}</span>, has been
        created. Please contact an administrator to approve your account.
      </p>
      {/* TODO: add signout button */}
    </div>
  )
}
