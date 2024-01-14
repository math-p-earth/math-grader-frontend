import { redirect } from 'next/navigation'

import { MePayload, getUser } from '../user/getUser'

export async function mustAuthenticated(): Promise<MePayload> {
	const user = await getUser()
	if (!user) {
		redirect('/login')
	}
	if (user.status !== 'APPROVED') {
		redirect('/user/pending-approval')
	}
	return user
}
