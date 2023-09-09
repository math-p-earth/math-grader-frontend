import { redirect } from 'next/navigation'

import { mustAuthenticated } from '~/api/auth/must-authenticated'

export default async function IndexPage() {
  mustAuthenticated()
  redirect('/dashboard/problem-lists')
}
