import Image from 'next/image'
import { redirect } from 'next/navigation'

import { getUser } from '~/api/user/getUser'

import { GoogleLoginButton } from './GoogleLogin'

export default async function LoginPage() {
  const user = await getUser()
  console.log('LOGIN PAGE', user)
  if (user) {
    redirect('/')
  }
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-4">
      <div className="flex items-center gap-4">
        <Image src="/images/logos/app.png" alt="App logo" width={100} height={100} />
        <span className="text-3xl font-semibold">Math P' Earth</span>
      </div>
      <div className="text-2xl font-medium leading-loose">Sign in with Google</div>
      <GoogleLoginButton />
    </div>
  )
}
