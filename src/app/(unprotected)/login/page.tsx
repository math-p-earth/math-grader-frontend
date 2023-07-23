import Image from 'next/image'

import { GoogleLoginButton } from './components/GoogleLogin'

export default function LoginPage() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-4 bg-zinc-50  dark:bg-zinc-900">
      <div className="flex items-center gap-4">
        <Image src="/images/logos/app.png" alt="App logo" width={100} height={100} />
        <span className="text-3xl font-semibold text-zinc-900">Math P' Earth</span>
      </div>
      <div className="text-2xl font-medium leading-loose text-zinc-900">Sign in with Google</div>
      <GoogleLoginButton />
    </div>
  )
}
