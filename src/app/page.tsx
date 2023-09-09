import { redirect } from 'next/navigation'

// export const dynamic = 'force-dynamic'

export default async function IndexPage() {
  // mustAuthenticated()
  redirect('/dashboard/problem-lists')
}
