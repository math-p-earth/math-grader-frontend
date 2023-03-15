import { useRouter } from 'next/router'

import { Button, Typography } from '@mui/material'

import { useUser } from '../../../hooks/useUser'
import { FlexContainer, PageContainer } from './styled'

export default function RegisterSuccessPage() {
  const { user, signOut } = useUser()
  const router = useRouter()
  if (!user) {
    router.push('/login')
    return null
  }
  if (user.status === 'APPROVED') {
    router.push('/')
    return null
  }

  return (
    <PageContainer>
      <FlexContainer>
        <Typography variant="h4" color={'white'}>
          ✅ Success!
        </Typography>
        <Typography variant="h6" color={'white'}>
          Your account, {user.firstName} {user.lastName}, has been created. Please contact an
          administrator to approve your account.
        </Typography>
        <Button size="small" variant="contained" color="error" onClick={signOut}>
          Sign out
        </Button>
      </FlexContainer>
    </PageContainer>
  )
}
