import Image from 'next/image'
import { redirect } from 'next/navigation'
import { getUser } from '~/api/user/getUser'

import { GoogleLoginButton } from './GoogleLogin'

export default async function LoginPage() {
	const user = await getUser()
	if (user) {
		redirect('/')
	}
	return (
		<div className="flex h-screen flex-col items-center justify-center gap-4">
			<div className="flex items-center gap-4">
				<Image alt="App logo" height={100} src="/images/logos/app.png" width={100} />
				<span className="text-3xl font-semibold">Math P' Earth</span>
			</div>
			<div className="text-2xl font-medium leading-loose">Sign in with Google</div>
			<GoogleLoginButton />
		</div>
	)
}
