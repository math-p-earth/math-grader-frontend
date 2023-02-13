import Image from 'next/image'
import { useRouter } from 'next/router'

import { Box, Typography } from '@mui/material'

import { GoogleLogin } from '@react-oauth/google'

import appLogo from '../../assets/logos/app.png'
import { BACKEND_URL } from '../../env'
import { useUser } from '../../hooks/useUser'
import { errorIsStatus } from '../../util/axios/error'
import { httpClient } from '../../util/httpClient'
import { LoginContainer, PageContainer } from './styled'

export default function LoginPage() {
  const { user, mutateUser } = useUser()
  const router = useRouter()
  if (user) {
    router.push('/')
  }

  return (
    <PageContainer>
      <LoginContainer>
        <Image src={appLogo} alt="App logo" width={100} height={100} />
        <Typography variant="h4" color={'white'} sx={{ mt: 4 }}>
          Sign in to access Math P' Earth
        </Typography>
        <Box
          sx={{
            mt: 4,
            mx: 'auto',
            width: 'fit-content',
          }}
        >
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
            size="large"
            useOneTap={!user}
            cancel_on_tap_outside
          />
        </Box>
      </LoginContainer>
    </PageContainer>
  )
}
