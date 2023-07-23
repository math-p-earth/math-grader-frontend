import { redirect } from 'next/navigation'

import { env } from '~/env.mjs'

export default async function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const res = await fetch(`${env.NEXT_PUBLIC_BACKEND_URL}/api/students/me`)
  if (res.status === 401) {
    redirect('/login')
  }
  if (!res.ok) {
    throw new Error('Failed to fetch user')
  }

  return children
}
