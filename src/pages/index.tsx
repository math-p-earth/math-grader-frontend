import { GoogleLogin } from '@react-oauth/google'

import { BACKEND_URL } from '../env'
import { useUser } from '../hooks/useUser'
import { errorIsStatus } from '../util/axios/error'
import { httpClient } from '../util/httpClient'

export default function Home() {
  const { user, mutateUser } = useUser()

  return (
    <>
      {user ? (
        <div
          style={{
            color: 'white',
          }}
        >
          <p>id: {user.id}</p>
          <p>email: {user.email}</p>
          <p>nickname: {user.nickname}</p>
          <p>firstName: {user.firstName}</p>
          <button
            onClick={async () => {
              await httpClient.post('students/logout')
              mutateUser()
            }}
          >
            Log out
          </button>
        </div>
      ) : (
        <GoogleLogin
          onSuccess={async (response) => {
            try {
              await httpClient.post('auth/google/verify', {
                idToken: response.credential,
              })
              mutateUser()
            } catch (err) {
              // 404 means new users
              if (errorIsStatus(err, 404)) {
                const url = new URL('/admin/students/register', BACKEND_URL)
                url.searchParams.set('idToken', response.credential)
                url.searchParams.set('redirectUrl', window.location.href)
                window.location.href = url.toString()
              }
              // TODO: handle other errors (notification)
            }
          }}
          useOneTap
          cancel_on_tap_outside
        />
      )}
    </>
  )
}
