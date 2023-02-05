import { GoogleLogin } from '@react-oauth/google'

import { useUser } from '../hooks/useUser'
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
            await httpClient.post('auth/google/verify', {
              idToken: response.credential,
            })
            mutateUser()
          }}
          useOneTap
          cancel_on_tap_outside
        />
      )}
    </>
  )
}
