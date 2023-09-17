'use client'

import { redirect } from 'next/navigation'

import { GoogleLogin } from '@react-oauth/google'
import { env } from '~/env.mjs'
import { useUser } from '~/hooks/useUser'
import { errorIsStatus } from '~/util/axios/error'
import { httpClient } from '~/util/httpClient'

export function GoogleLoginButton() {
  const { query } = useUser()
  if (query.isSuccess && query.data.user) {
    redirect('/')
  }
  return (
    <GoogleLogin
      onSuccess={async (response) => {
        if (response.credential) {
          try {
            await httpClient.post('auth/google/verify', {
              idToken: response.credential,
            })
            await query.refetch()
            window.location.href = '/' // use window.location.href to trigger a server-side rerender
          } catch (err) {
            // 404 means new users
            if (errorIsStatus(err, 404)) {
              const url = new URL('/admin/students/register', env.NEXT_PUBLIC_BACKEND_URL)
              url.searchParams.set('idToken', response.credential)
              url.searchParams.set('redirectUrl', `${window.location.origin}/user/register-success`)
              window.location.href = url.toString()
            }
            // TODO: handle other errors (notification)
          }
        }
      }}
      auto_select
      size="large"
      useOneTap
      cancel_on_tap_outside
    />
  )
}
