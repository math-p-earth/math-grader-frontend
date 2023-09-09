import { redirect } from 'next/navigation'

import { getLoggedInUser } from '~/api/user/getUser'

export default async function IndexPage() {
  const user = await getLoggedInUser()
  if (!user) {
    redirect('/login')
  }
  if (user.status !== 'APPROVED') {
    redirect('/user/pending-approval')
  }
  redirect('/dashboard/problem-lists')
}
