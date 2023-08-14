import { redirect } from 'next/navigation'

import { getLoggedInUser } from '~/api/user/getUser'

export default async function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const user = await getLoggedInUser()
  if (!user) {
    redirect('/login')
  }

  return children
}
