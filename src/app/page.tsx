import { redirect } from 'next/navigation'

import { getUser } from '~/api/user/getUser'

export default async function IndexPage() {
  const user = await getUser()
  if (!user) {
    redirect('/login')
  }
  if (user.status !== 'APPROVED') {
    redirect('/user/pending-approval')
  }
  redirect('/dashboard/problem-lists')
}
