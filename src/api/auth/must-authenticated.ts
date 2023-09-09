import { redirect } from 'next/navigation'

import { getUser } from '../user/getUser'

export async function mustAuthenticated() {
  const user = await getUser()
  if (!user) {
    redirect('/login')
  }
  if (user.status !== 'APPROVED') {
    redirect('/user/pending-approval')
  }
}
