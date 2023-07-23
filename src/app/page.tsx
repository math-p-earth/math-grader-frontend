import { redirect } from 'next/navigation'

import { env } from '~/env.mjs'

export default async function IndexPage() {
  const res = await fetch(`${env.NEXT_PUBLIC_BACKEND_URL}/api/students/me`, { cache: 'no-store' })
  console.log(`${env.NEXT_PUBLIC_BACKEND_URL}/api/students/me`, res.status)
  if (!res.ok) {
    redirect('/login')
  }
  redirect('/problem-lists')
}
