import Image from 'next/image'
import { redirect } from 'next/navigation'
import { getUser } from '~/api/user/getUser'
import { SignOutButton } from '~/components/SignOutButton'

export default async function RegisterSuccessPage() {
	const user = await getUser()
	if (!user) {
		redirect('/login')
	}
	if (user.status === 'APPROVED') {
		redirect('/')
	}

	return (
		<div className="flex h-screen flex-col items-center gap-8">
			<div className="mt-64 flex items-center gap-4">
				<Image alt="App logo" height={100} src="/images/logos/app.png" width={100} />
				<span className="text-3xl font-semibold">Math P' Earth</span>
			</div>
			<p className="text-2xl font-bold">✅ Success!</p>
			<p>
				Your account,
				<span className="font-semibold">{` ${user.firstName} ${user.lastName}`}</span>, has been created. Please contact
				an administrator to approve your account.
			</p>
			<SignOutButton />
		</div>
	)
}
